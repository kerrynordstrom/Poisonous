'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs');
 

let allPoisons = [];
let allUrls = [];

rp('http://www.petpoisonhelpline.com/poisons/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
  let $ = cheerio.load(html);

  let poisonsByAlpha = $(".link-poison", ".alphebetical-blocks").toArray();

  poisonsByAlpha.map( (x, i) => {
    allPoisons.push(x);
    allUrls.push(allPoisons[i].attribs["href"]);
  });
  console.log(allUrls);

  // $('li[id*=block]', '.alphebetical-blocks').each(function (index, element) {
  //   allPoisons[index] = $(this)
  //     .text()
  //     .replace(/\t\n/gi, "")
  //     .trim();
  //   // poisonList[index]['poison-name'] = poisonItem.eq(0).text().replace(/\t/gi, '').toLowerCase().substring(0, poisonItem.eq(0).text().indexOf('\t'));
  //   // poisonList[index]['poison-type'] = poisonItem.find('[class=pph_poisonList_typeDisplay]').text().trim().toLowerCase();
  //   // poisonList[index]['reference-url'] = poisonItem.attr('href')
  //   });
    // console.log(allPoisons);
  }
}).then( function (allUrls) {

  for (let url of allUrls) {
      rp({ uri: `${url}`, pool: httpAgent }, function (error, response, html) {
      if (!error && response.statusCode == 200) { 
        let $ = cheerio.load(html);

        console.log($);

  //         $('.content').each(function (index, element) {
  //           let poisonousTo = $(element).find('p:nth-child(6)');
  //           poisonList[index]['poisonous-to'] = poisonousTo.text().split(': ').slice(1);
            
  //           let poisonDescription = $(element).find('.pf-content');
  //           poisonList[index]['description'] = poisonDescription.text().replace(/\n/g, '');

  //           let levelOfToxicity = $(element).find('p:nth-child(7)');
  //           poisonList[index]['level-of-toxicity'] = levelOfToxicity.text().split(': ').slice(1).join('');
            
  //           let symptoms = $(element).find('ul');
  //           poisonList[index]['symptoms'] = symptoms.text().split(/\n/);

  //           let alternateNames = $(element).find('p:nth-child(14)');
  //           poisonList[index]['alternate-names'] = alternateNames.text().replace(/\\/g, '').split(': ').slice(1);

  //         })
      }
    })
  }
  }).then(function () {
    // let data = JSON.stringify(poisonList, null, 2);
    // fs.writeFileSync('poison-list.json', data, function (err) { 
    //   if (err) throw err;
    //   console.log('Data written to file');
    // })
  }).catch( function (err) {
  console.log(err);
  });
