const fs = require('fs');
const path = require('path');

const filePath = path.resolve('app/register/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace className=" inside <input, <select, <textarea
content = content.replace(/<(input|select|textarea)\s+([^>]*?)className="/g, '<$1 $2className="text-gray-600 placeholder:text-gray-400 ');

// Replace className={` inside <input, <select, <textarea
content = content.replace(/<(input|select|textarea)\s+([^>]*?)className=\{`/g, '<$1 $2className={`text-gray-600 placeholder:text-gray-400 ');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done');
