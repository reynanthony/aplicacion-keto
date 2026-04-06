const fs = require('fs');
const path = require('path');

const dir = 'c:\\KetoLab';

function getHtmlFiles(directory) {
  const files = fs.readdirSync(directory);
  let results = [];
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else {
      if (fullPath.endsWith('.html')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(dir);

// Performance: Inject loading="lazy" in images
for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace <img src="..." /> but ignore those already having lazy
  content = content.replace(/<img\s+(?![^>]*loading=["']lazy["'])[^>]+>/gi, match => {
    // Insert loading="lazy" into the tag
    return match.replace('<img ', '<img loading="lazy" ');
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Performance Lazy-load updated: ${file}`);
  }
}

console.log('Fase 3: Optimización PWA Completa');
