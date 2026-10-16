const fs = require('fs');
const html = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/index.html', 'utf8');
const css = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/style.css', 'utf8');

const resStart = html.indexOf('<!-- ====== 资源管理模块');
const resEnd = html.indexOf('<!--BLOCK:resource-->');
const resPages = html.substring(resStart, resEnd);
const opStart = html.indexOf('modals.resourceOpResult');
const opEnd = html.indexOf('modals.reportTemplateConfig');
const resHtml = resPages + '\n' + html.substring(opStart, opEnd);

const classes = new Set();
let re = /class="([^"]+)"/g, m;
while ((m = re.exec(resHtml))) {
  m[1].split(/\s+/).forEach(c => {
    if (/^[A-Za-z][A-Za-z0-9_-]*$/.test(c) && !/^(fa|fa-)($|-)/.test(c) ) classes.add(c);
  });
}
// exclude fa-* (FontAwesome webfont)
const missing = [...classes].filter(c => !c.startsWith('fa') && !css.includes('.' + c + '{') && !css.includes('.' + c + ' '));
console.log('Plain static classes used (excl. fa-*):', classes.size);
console.log('MISSING from style.css:');
console.log(missing.join(', '));