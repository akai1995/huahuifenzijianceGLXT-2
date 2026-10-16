const fs = require('fs');
const SRC = 'c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/ziliao/花花V4-资源管理列表/index.html';
const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/);
const pagesRange = [3382, 4058];
const modalsRange = [9870, 11116];
function seg(range) { return lines.slice(range[0]-1, range[1]).join('\n'); }
const html = seg(pagesRange) + '\n' + seg(modalsRange);

const handlers = new Set();
let m;
{
  const re = /@[a-z:.]+(?:\.[a-z]+)?="([a-zA-Z_$][\w.$]*)\(?/g;
  while ((m = re.exec(html))) handlers.add(m[1]);
}

const helpers = new Set();
{
  const stripped = html.replace(/v-model="[^"]*"/g, '');
  const re = /(?:{{|[:(])[^}]*?\b([a-zA-Z_$][\w$]*)\s*\(/g;
  let m2;
  while ((m2 = re.exec(stripped))) helpers.add(m2[1]);
}

const topRefs = new Set();
{
  const re = /\b(mockData\.\w+|searchForm\.\w+|pagination\.\w+|modals\.\w+|filteredResource\w+|modalData\.\w+)\b/g;
  let m3;
  while ((m3 = re.exec(html))) topRefs.add(m3[1]);
}

const models = new Set();
{
  const re = /v-model="([a-zA-Z_$][\w$.]*)"/g;
  let m4;
  while ((m4 = re.exec(html))) models.add(m4[1]);
}

console.log('=== HANDLERS ===');
console.log([...handlers].sort().join('\n'));
console.log('\n=== FUNCTION CALLS IN INTERPOLATION/CLASS ===');
console.log([...helpers].sort().join('\n'));
console.log('\n=== TOP-LEVEL DATA REFS ===');
console.log([...topRefs].sort().join('\n'));
console.log('\n=== DISTINCT v-model TOP-LEVEL KEYS ===');
const modelTop = [...models].map(x => x.split('.')[0]);
console.log([...new Set(modelTop)].sort().join('\n'));