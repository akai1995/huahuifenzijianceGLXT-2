const fs = require('fs');
const h = fs.readFileSync('c:/Users/Administrator/Desktop/花卉分子检测管理系统/huahuifenzijianceGLXT/index.html', 'utf8');
['resourcePersonAdd','resourcePersonEdit','resourcePersonView','resourceEquipmentAdd','resourceEquipmentEdit','resourceEquipmentView','resourcePurchaseApprove','resourcePurchaseAccept','resourcePurchaseAdd','resourceOpResult']
.forEach(k => console.log(k, (h.indexOf('v-if="modals.' + k) > -1) ? 'MODAL_OK' : 'MISSING'));