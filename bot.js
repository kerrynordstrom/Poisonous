let Model = require('./model');
const rp = require('request-promise');
let cheerio = require('cheerio');
let Scraper = require('./newScraper');
let Pages = [];

let poisonNames = [];

function generateUrls(posionNames) {
  var url = 'http://www.petpoisonhelpline.com/';
  let urls = [];
  var i;
  for (i = 1; i < poisonNames.length + 1; i++) {
    urls.push(url + poisonNames[i]);
  }
  return urls;
}

  rp('http://www.petpoisonhelpline.com/poisons/', 
  
  function (error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      
      $('span.pph_poisonList_typeDisplay').each(function (index, element) {

        let poisonItem = $(element).parent().attr('href').split('/');
        let result = poisonItem[poisonItem.length - 2]
        
        poisonNames.push(result)
      })
      return poisonNames;
    }
  }).then ( function () {
    Pages = generateUrls(poisonNames);
})
.then( function() {
  let numberOfParallelRequests = 20;
  for (var i = 0; i < numberOfParallelRequests; i++) {

    wizard();
  }
})

function wizard() {
  // if the Pages array is empty, we are Done!!
  
  if (!Pages.length) {
    return console.log('Done!!!!');
  }

  let url = Pages.pop();
  let scraper = new Scraper(url);
  let model;
  console.log('Requests Left: ' + Pages.length);
  // if the error occurs we still want to create our
  // next request
  scraper.on('error', function (error) {
    console.log(error);
    wizard();
  });
  // if the request completed successfully
  // we want to store the results in our database
  scraper.on('complete', function (listing) {
    model = new Model(listing);

    model.save(function (err) {
      if (err) {
        console.log('Database err saving: ' + url);
      }
    });
    wizard();
  });
}

// store all urls in a global variable  




