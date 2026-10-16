const fs = require('fs');
const tgt = 'c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/index.html';
const app = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/app.js', 'utf8');
const html = fs.readFileSync(tgt, 'utf8');

// extract the resource block (pages) and resource modals
const resStart = html.indexOf('<!-- ====== 资源管理模块');
const resEnd = html.indexOf('/*BLOCK:resource*/') === -1 ? html.indexOf('<!--BLOCK:empty-->') : html.indexOf('<!--BLOCK:resource-->');
const resPages = html.substring(resStart, resEnd);
const opStart = html.indexOf('modals.resourceOpResult');
const opEnd = html.indexOf('modals.reportTemplateConfig');
const resModals = html.substring(opStart, opEnd);
const resHtml = resPages + '\n' + resModals;

// extract handler names
const handlers = new Set();
let re = /@(?:click|change|input|submit|keyup|keydown)\.[\w.]+="([A-Za-z_$][\w.$]*)\(?/g;
let re2 = /@(?:click|change|input|submit|keyup|keydown)="([A-Za-z_$][\w.$]*)\(?/g;
let m;
while ((m = re.exec(resHtml))) handlers.add(m[1]);
while ((m = re2.exec(resHtml))) handlers.add(m[1]);

// collect app.js method names (methods: { ... } block) - rough: lines matching 'name: function'
const methodNames = new Set();
const mre = /^\s{4,}[A-Za-z_$][\w$]*\s*:\s*function/gm;
let mm;
// Better: find 'methods: {' then '{' balanced until closing
const methodsStart = app.indexOf('methods: {');
if (methodsStart === -1) { console.log('NO methods: !!'); }
const methodsBlock = app.substring(methodsStart, methodsStart + 3) ; // placeholder
// Extract method keys from app using regex on 'key: function'
let k;
let kRe = /([A-Za-z_$][\w$]*)\s*:\s*function\s*\(/g;
while ((k = kRe.exec(app))) methodNames.add(k[1]);

const missing = [...handlers].filter(h => !methodNames.has(h) && !h.startsWith('pagination.'));
console.log('Total handlers:', handlers.size);
console.log('MISSING handlers:', JSON.stringify(missing, null, 0));

// also check modals.* and modalData.* top-level vs app data keys
// check mockData refs
const mockRe = /mockData\.([A-Za-z_$][\w$]*)/g;
const mockRefs = new Set(); while((m = mockRe.exec(resHtml))) mockRefs.add(m[1]);
console.log('mockData refs:', [...mockRefs].join(', '));