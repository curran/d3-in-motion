const fs = require('fs');
const d3 = require('d3');
const csv1In = fs.readFileSync('wpp2017.csv', 'utf8');
const csv2In = fs.readFileSync('wpp2017-medium-variant.csv', 'utf8');
const data1In = d3.csvParse(csv1In);
const data2In = d3.csvParse(csv2In);
const dataIn = data1In.map((d, i) => Object.assign(d, data2In[i]));
const name = d => d['Region, subregion, country or area *'];
const years = d3.range(1950,2100 + 1);
const africa = dataIn.filter(d => name(d) === 'AFRICA')[0];
const dataOut = years.map(year => ({
  year,
  population: +africa[year].replace(/ /g, '')
}));
const csvOut = d3.csvFormat(dataOut);
fs.writeFileSync('africa.csv', csvOut);
