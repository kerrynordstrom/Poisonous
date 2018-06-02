const http = require('http');
const request = require('request');
const cheerio = require('cheerio');
const util = require('util');
const EventEmitter = require('events').EventEmitter;
const STATUS_CODES = http.STATUS_CODES;

function Scraper(url) {
  this.url = url;
  this.init(url);
}

Scraper.prototype.init = function (url) {
  let model;
  this.on('loaded', function (html) {
    model = this.parsePage(html, url);
    this.emit('complete', model);
  });
  this.loadWebPage(url);
};

Scraper.prototype.loadWebPage = function (url) {
  console.log('\n\nLoading ' + url);
  http.get(this.url, function (res) {
    let body = '';

    if (res.statusCode !== 200) {
      return this.emit('error', STATUS_CODES[res.statusCode]);
    }
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      this.emit('loaded', body);
    });
  })
    .on('error', function (err) {
      this.emit('error', err);
    });
};

/*
 * Parse html and return an object
**/

Scraper.prototype.parsePage = function (html, url) {

  let $ = cheerio.load(html);

  $('.content').each(function (index, element) {
    let poisonousTo = $(element).find('p:nth-child(6)');
    let poisonDescription = $(element).find('.pf-content');
    let levelOfToxicity = $(element).find('p:nth-child(7)');
    let symptoms = $(element).find('ul');
    let alternateNames = $(element).find('p:nth-child(14)');

  let model = {
    name: 'String',
    type: 'Stringstring',
    poisonousTo: poisonousTo.text().split(': ').slice(1),
    description: poisonDescription.text().replace(/\n/g, ''),
    levelOfToxicity: levelOfToxicity.text().split(': ').slice(1).join(''),
    symptoms: poisonList[index]['symptoms'] = symptoms.text().split(/\n/),
    alternateNamesn: alternateNames.text().replace(/\\/g, '').split(': ').slice(1),
  }
  return model;
  })
}
module.exports = Scraper;


/*
 * Make it an EventEmitter
**/
util.inherits(Scraper, EventEmitter);