const fs = require('fs');
const log = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/ziliao/_extracted.log', 'utf8');
const pm = log.indexOf('MODALS====');
const pages = log.substring(7, pm).replace(/\n$/, '');
const modals = log.substring(pm + 10).replace(/\n$/, '');
const tgt = 'c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/index.html';
let out = fs.readFileSync(tgt, 'utf8');

const resBlock = '  <!-- ====== 资源管理模块（迁移自花花V4资源管理列表） ====== -->\n  <div v-if="pageKind === \'resource\'">\n' + pages + '\n  </div>\n  <!--BLOCK:resource-->';

if (out.indexOf('<!--BLOCK:empty-->') === -1) { console.log('ERROR: BLOCK:empty not found'); process.exit(1); }
const mm = out.match(/<\/div>\r?\n\s*<script src="app\.js/);
if (!mm) { console.log('ERROR: root close+script not found'); process.exit(1); }

out = out.replace('<!--BLOCK:empty-->', '<!--BLOCK:empty-->\n' + resBlock);
out = out.replace(mm[0], modals + '\n' + mm[0]);

fs.writeFileSync(tgt, out);
console.log('DONE. new file size:', out.length, 'bytes');
console.log('pageKind resource present:', out.indexOf("pageKind === 'resource'") !== -1);
console.log('resourceOpResult modal present:', out.indexOf('modals.resourceOpResult') !== -1);