const fs = require('fs');
const path = require('path');

const dir = 'c:\\KetoLab';

function walk(directory) {
  const files = fs.readdirSync(directory);
  let results = [];
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('images') && !fullPath.includes('icons')) {
        results = results.concat(walk(fullPath));
      }
    } else {
      if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const files = walk(dir);

let showToastRegex = /function\s+showToast\s*\([^)]*\)\s*\{[^}]*\}[\s\S]*?(?=<\/script>|\n\n|function)/g;

for (const file of files) {
  // Skip utils.js so we don't break the base implementation
  if (file.endsWith('utils.js')) continue;

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Remove duplicated showToast function definitions (up to a reasonable boundary)
  // To be safe, we replace exactly the known variants:
  // variant 1
  content = content.replace(/function showToast\(message\)\s*\{\s*var toast = document.getElementById\('toast'\);[\s\S]*?3000\);\s*\}/g, '');
  // variant 2 (msg)
  content = content.replace(/function showToast\(msg\)\s*\{\s*var toast = document.getElementById\('toast'\);[\s\S]*?3000\);\s*\}/g, '');
  // variant 3 with message parameter
  content = content.replace(/function showToast\(message,\s*type\)\s*\{[\s\S]*?3000\);\s*\}/g, '');

  let alertRegex = /\balert\s*\(([^)]+)\)/g;
  content = content.replace(alertRegex, (match, p1) => {
    return `window.showToast(${p1}, 3000, "warning")`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Refactored: ${file}`);
  }
}
console.log('Done refactoring showToast and alert.');
