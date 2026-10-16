const fs = require('fs');
const srcCss = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/ziliao/花花V4-资源管理列表/style.css', 'utf8');

const wanted = ['status-tag','status-success','status-warning','status-gray','status-red','status-blue','status-orange','form-input','pagination-info','pagination-controls','bg-green','bg-blue','bg-orange','bg-purple','bg-red','bg-yellow'];

// Extract rule blocks containing a selector that exactly matches `.x` or starts with `.x,` or contains `.x `
function extract(sel) {
  const re = new RegExp('(?:^|[\\n}])([^{}]*' + sel + '[^{}]*)\\{([^{}]*)\\}', 'g');
  let out = [], m;
  while ((m = re.exec(srcCss))) {
    // ensure the selector token matches: word boundary check .x not followed by word char or -
    if (new RegExp('\\.' + sel + '(?![\\w-])').test(m[1])) {
      out.push(m[1].trim() + '{\n' + m[2].trim() + '\n}');
    }
  }
  return out;
}

const collected = {};
wanted.forEach(s => { collected[s] = extract(s); });

// print
Object.keys(collected).forEach(k => {
  console.log('\n#### ' + k + ' (' + collected[k].length + ')');
  collected[k].forEach(r => console.log(r + '\n'));
});