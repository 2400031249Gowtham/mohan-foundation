const { execSync } = require('child_process');
const fs = require('fs');
try {
  const content = execSync('git show HEAD:app/register/page.tsx').toString();
  fs.writeFileSync('restored_register.tsx', content);
} catch (e) {
  console.error(e);
}
