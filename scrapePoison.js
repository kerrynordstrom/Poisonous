'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');

const http = require('http')
let httpAgent = new http.Agent()
httpAgent.maxSockets = 10;

const fs = require('fs');
 

let poisonList = [];

rp('http://www.petpoisonhelpline.com/poisons/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
  let $ = cheerio.load(html);

  $('span.pph_poisonList_typeDisplay').each(function (index, element) {

    poisonList[index] = {};

    let poisonItem = $(element).parent();
    poisonList[index]['poison-name'] = poisonItem.eq(0).text().replace(/\t/gi, '').toLowerCase().substring(0, poisonItem.eq(0).text().indexOf('\t'));
    poisonList[index]['poison-type'] = poisonItem.find('[class=pph_poisonList_typeDisplay]').text().trim().toLowerCase();
    poisonList[index]['reference-url'] = poisonItem.attr('href')
    });
  }
}).then( function () {
  for (let poison of poisonList) {
      rp({ uri: `${poison['reference-url']}`, pool: httpAgent }, function (error, response, html) {
      if (!error && response.statusCode == 200) { 
        let $ = cheerio.load(html);

          $('.content').each(function (index, element) {
            let poisonousTo = $(element).find('p:nth-child(6)');
            poisonList[index]['poisonous-to'] = poisonousTo.text().split(': ').slice(1);
            
            let poisonDescription = $(element).find('.pf-content');
            poisonList[index]['description'] = poisonDescription.text().replace(/\n/g, '');

            let levelOfToxicity = $(element).find('p:nth-child(7)');
            poisonList[index]['level-of-toxicity'] = levelOfToxicity.text().split(': ').slice(1).join('');
            
            let symptoms = $(element).find('ul');
            poisonList[index]['symptoms'] = symptoms.text().split(/\n/);

            let alternateNames = $(element).find('p:nth-child(14)');
            poisonList[index]['alternate-names'] = alternateNames.text().replace(/\\/g, '').split(': ').slice(1);

          })
      }
    })
  }
  }).then(function (poisonList) {
    let data = JSON.stringify(poisonList, null, 2);
    fs.writeFileSync('poison-list.json', data, function (err) { 
      if (err) throw err;
      console.log('Data written to file');
    })
  }).catch( function (err) {
  console.log(err);
  });
