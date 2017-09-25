const fs = require('fs');
const d3 = require('d3');
const csvIn = fs.readFileSync('wpp2017.csv', 'utf8');
const dataIn = d3.csvParse(csvIn);
const name = d => d['Region, subregion, country or area *'];
const years = d3.range(1950, 2015 + 1);
const africa = dataIn.filter(d => name(d) === 'AFRICA')[0];
const dataOut = years.map(year => ({
  year,
  population: +africa[year].replace(/ /g, '')
}));
const csvOut = d3.csvFormat(dataOut);
fs.writeFileSync('africa.csv', csvOut);
