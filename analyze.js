const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('sample_course.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Nav Tabs ---');
$('.nav-tabs .nav-link').each((i, el) => console.log($(el).text().trim()));

console.log('\n--- Tab Content IDs ---');
$('.tab-pane').each((i, el) => console.log($(el).attr('id')));

console.log('\n--- First Tab Content ---');
console.log($('.tab-pane').first().text().trim().substring(0, 500));
