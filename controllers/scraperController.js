'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const PoisonsSchema = require('./models');

const fs = require('fs');
const http = require('http');
const httpAgent = new http.Agent();
httpAgent.maxSockets = 15;

let poisonsRef = [];
let allPoisons = [];
let allUrls = [];

rp('http://www.petpoisonhelpline.com/poisons/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
  let $ = cheerio.load(html);

  let poisonsByAlpha = $(".link-poison", ".alphebetical-blocks").toArray();

  poisonsByAlpha.map( (x, i) => {
    poisonsRef.push(x);
    allUrls.push(poisonsRef[i].attribs["href"]);
  });
  return allUrls;
  }
}).then( async function () {

  let poisonPromises = allUrls.map( function(url) {
    let newPoison = {};
    return rp({ uri: `${url}`, pool: httpAgent }, function (error, response, html) {
      if (!error && response.statusCode == 200) { 
        let $ = cheerio.load(html);
            let poisonName = $('.entry p:contains("Pictured:")').text().toLowerCase();
            let poisonType = $('.entry p:contains("Poison type:")').text().toLowerCase();
            let poisonousTo = $('.entry p:contains("Poisonous to:")').text().toLowerCase();
            let poisonDescription = $('.pf-alignright').next().text().toLowerCase();
            let levelOfToxicity = $('.entry p:contains("Level of toxicity:")').text().toLowerCase();
            let symptoms = $('.entry ul').map(function() {
              return $(this).text().toLowerCase();
            }).toArray();
            let alternateNames = $('.entry p:contains("Alternate names:")').text().toLowerCase();

            newPoison["poisonName"] = poisonName.split(': ').slice(1).toString();
            newPoison["poisonType"]= poisonType.split(': ').slice(1).toString();
            newPoison['poisonousTo'] = poisonousTo.split(': ').slice(1).join('').split(',');
            newPoison['description'] = poisonDescription.replace(/\n/g, '');
            newPoison['levelOfToxicity'] = levelOfToxicity.replace(/\n/g, '').split(': ').slice(1).join('');
            newPoison['symptoms'] = symptoms.toString().split('\n');
            newPoison['alternateNames'] = alternateNames.replace(/\n/g, ' ').split(': ').slice(1).join('').split(',');

            allPoisons.push(newPoison);
      }
    })
  })
    return Promise.all(poisonPromises).then(async function () {
      console.log('all poisons', allPoisons);
      let data = JSON.stringify(allPoisons, null, 2);
      console.log('we made it to the last .then', data);
      fs.writeFile('poison-list.json', data, 'utf8', function (err) { 
        if (err) throw err;
        console.log('Data written to file');
      })
    })
  }).catch( function (err) {
  console.log(err);
  });
