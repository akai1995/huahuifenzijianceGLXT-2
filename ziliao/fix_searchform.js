const fs = require('fs');
const base = 'c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/';
const app = base + 'app.js';
const idx = base + 'index.html';

// 1) index.html: resource search bindings -> resourceSearchForm
let h = fs.readFileSync(idx, 'utf8');
const hCount = (h.match(/searchForm\.resource/g) || []).length;
h = h.split('searchForm.resource').join('resourceSearchForm.resource');
fs.writeFileSync(idx, h);

// 2) app.js: resource computed filters + reset methods -> resourceSearchForm
let a = fs.readFileSync(app, 'utf8');
const aCount = (a.match(/searchForm\.resource/g) || []).length;
a = a.split('searchForm.resource').join('resourceSearchForm.resource');
// 3) restore generic searchForm + add resourceSearchForm in data()
const before = "searchForm: Object.assign({}, RESOURCE_SEARCHFORM),";
const after = "searchForm: { module: '', type: '', keyword: '' },\n        resourceSearchForm: Object.assign({}, RESOURCE_SEARCHFORM),";
if (!a.includes(before)) { console.log('ERROR: data searchForm line not found'); process.exit(1); }
a = a.split(before).join(after);
fs.writeFileSync(app, a);

console.log('index.html replaced', hCount);
console.log('app.js replaced', aCount);
console.log('data line updated:', a.includes('resourceSearchForm: Object.assign'));
console.log('index has resourceSearchForm.resourcePerson:', h.includes('resourceSearchForm.resourcePerson'));