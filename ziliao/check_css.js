const fs = require('fs');
const html = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/index.html', 'utf8');
const css = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/style.css', 'utf8');

const resStart = html.indexOf('<!-- ====== 资源管理模块');
const resEnd = html.indexOf('<!--BLOCK:resource-->');
const resPages = html.substring(resStart, resEnd);
const opStart = html.indexOf('modals.resourceOpResult');
const opEnd = html.indexOf('modals.reportTemplateConfig');
const resModals = html.substring(opStart, opEnd);
const resHtml = resPages + '\n' + resModals;

// collect all class tokens in resource html
const classes = new Set();
let re = /class="([^"]+)"/g, m;
while ((m = re.exec(resHtml))) {
  m[1].split(/\s+/).forEach(c => { if (c && c.length) classes.add(c); });
}
re = /:class="[^"]*'([\w-]+)'/g; // forget dynamic, skip

const missing = [...classes].filter(c => !css.includes('.' + c));
console.log('Total distinct classes used:', classes.size);
console.log('MISSING from style.css:');
console.log(missing.join(', '));