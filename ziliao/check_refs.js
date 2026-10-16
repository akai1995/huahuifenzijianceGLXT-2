const fs=require('fs');
const dir='c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/';
for(const f of ['index.html','app.js']){
  const t=fs.readFileSync(dir+f,'utf8').split('\n');
  for(const key of ["'staff'","'device'","'standard'","'document'","'titrant'","'bio-reagent'","'reference-material'","'resourcePerson'","'resourceEquipment'","'resourcePurchase'"]){
    const hits=[];
    t.forEach((ln,i)=>{ if(ln.includes(key) && key!=="'resourcePerson'" && key!=="'resourceEquipment'" && key!=="'resourcePurchase'") hits.push(i+1); });
    // only report old-keys occurrences outside the new MENU block we just added
    if(hits.length) console.log(f,key,'lines:',hits.join(','));
  }
}
console.log('done');