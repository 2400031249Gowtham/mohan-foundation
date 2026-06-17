const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('sample_course.html', 'utf8');
const $ = cheerio.load(html);

$('.tab-pane').each((i, el) => {
  console.log('TAB ID:', $(el).attr('id'));
  console.log($(el).text().trim().substring(0, 200).replace(/\n/g, ' '));
  console.log('---');
});
