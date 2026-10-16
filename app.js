/* ============================================================
   分子检测 LIMS 管理系统 app.js
   科研管理 / 质量管理 / 培训管理 / 统计分析
   Vue3 + ECharts5 内存 mock 数据，风格与 文档/index.html 一致
   ============================================================ */
(function () {
  'use strict';

  var PRIMARY = '#059669';
  var GRAY = '#9CA3AF';

  /* ---------- 状态标签配色 ---------- */
  var STATUS_TAGS = {
    '在研': 'tag-blue', '已结题': 'tag-green', '进行中': 'tag-blue',
    '已完成': 'tag-green', '已完成': 'tag-green', '待开始': 'tag-orange',
    '待审批': 'tag-orange', '已审批': 'tag-green', '通过': 'tag-green',
    '未通过': 'tag-red', '有效': 'tag-green', '即将到期': 'tag-orange',
    '已过期': 'tag-red', '已发布': 'tag-green', '起草中': 'tag-orange',
    '待处理': 'tag-orange', '处理中': 'tag-blue', '已解决': 'tag-green',
    '已关闭': 'tag-gray', '转正': 'tag-green', '在控': 'tag-green',
    '待收集': 'tag-orange', '已收集': 'tag-blue', '收集完成': 'tag-green',
    '待召开': 'tag-orange', '编制中': 'tag-blue', '已提交': 'tag-orange',
    '已批准': 'tag-green', '待验证': 'tag-orange', '不通过': 'tag-red',
    '警告': 'tag-orange', '失控': 'tag-red', '满意': 'tag-green',
    '不满意': 'tag-red', '记录中': 'tag-blue', '已完成': 'tag-green',
    '待完成': 'tag-orange', '待开始': 'tag-orange', '未开始': 'tag-gray',
    '废止': 'tag-gray', '修订中': 'tag-blue', '整改中': 'tag-blue',
    '符合': 'tag-green', '不符合': 'tag-red', '观察项': 'tag-orange',
    '不适用': 'tag-gray', '严重': 'tag-red', '一般': 'tag-orange',
    '待整改': 'tag-orange', '已验证': 'tag-green', '合格': 'tag-green',
    '待执行': 'tag-orange', '执行中': 'tag-blue', '基本合格': 'tag-orange',
    '不合格': 'tag-red', '已审核': 'tag-green', '已退回': 'tag-red',
    '已录入': 'tag-green', '待录入': 'tag-orange', '待评价': 'tag-orange',
    '已处理': 'tag-green', '已确认': 'tag-green', '待确认': 'tag-orange',
    '可疑': 'tag-orange', '有问题': 'tag-orange', '已提交': 'tag-orange',
    '验证中': 'tag-blue', '待审批': 'tag-blue', '已通过': 'tag-green', '已驳回': 'tag-red', '草稿': 'tag-gray', '已发布': 'tag-green', '已作废': 'tag-gray',
    '待受理': 'tag-orange', '已受理': 'tag-green', '待调查': 'tag-orange', '已调查': 'tag-green',
    '基本满意': 'tag-orange', '紧急': 'tag-red', '轻微': 'tag-gray',
    '待分析': 'tag-orange', '分析中': 'tag-blue', '待实施': 'tag-orange', '实施中': 'tag-blue', '待审核': 'tag-orange',
    '在用': 'tag-green', '停用': 'tag-gray', '启用': 'tag-green', '已停用': 'tag-gray', '已发布': 'tag-green',
    '在职': 'tag-green', '借调': 'tag-orange', '离职': 'tag-gray',
    '法定假日': 'tag-red', '调休日': 'tag-orange', '公司假日': 'tag-blue', '周末': 'tag-gray',
    '正常': 'tag-green', '禁用': 'tag-gray', '成功': 'tag-green', '失败': 'tag-red', '内置': 'tag-blue',
    '自定义': 'tag-purple', '业务字典': 'tag-green', '基础字典': 'tag-blue', '系统字典': 'tag-orange',
    '状态标记': 'tag-cyan', '权限标记': 'tag-purple', '检测术语': 'tag-blue', '报告术语': 'tag-green',
    '显示': 'tag-green', '隐藏': 'tag-gray', '是': 'tag-green', '否': 'tag-gray',
    '已关联': 'tag-green', '未关联': 'tag-gray',
    '分子检测科': 'tag-blue', '免疫检测科': 'tag-purple', '病理科': 'tag-orange', '基因测序科': 'tag-cyan'
  };

  /* ---------- 内审通用枚举 ---------- */
  var AUDIT_ELEMENTS = ['组织', '管理体系文件控制', '合同评审', '样品管理', '采购服务与供应品', '仪器设备', '期间核查', '量值溯源', '人员', '设施与环境', '记录控制', '检测结果有效性', '结果报告', '投诉', '不符合工作', '纠正措施', '预防措施', '数据控制', '内部审核', '管理评审'];
  var AUDIT_DEPTS = ['质量管理部门', '检测实验室', '业务受理部', '设备管理部', '试剂耗材部', '样品管理组', '报告编制组', '人事部'];

  /* ---------- 质量监督通用枚举 ---------- */
  var QS_PLAN_TYPE = ['周期性监督', '专项监督'];
  var QS_TASK_STATUS = ['待执行', '执行中', '已完成'];
  var QS_EVAL_RESULT = ['合格', '基本合格', '不合格'];
  var QS_AUDIT_STATUS = ['待审核', '已审核', '已退回'];
  var QS_METHODS = ['现场观察', '查阅记录', '面谈询问', '实际操作', '留样复测'];

  /* ---------- 质量控制通用枚举 ---------- */
  var QC_PLAN_METHOD = ['室内质控', '平行样', '空白样', '加标回收'];
  var QC_DATA_STATUS = ['待评价', '已录入'];
  var QC_CONTROL_STATUS = ['在控', '警告', '失控'];
  var QC_EVAL_RULES = ['无', '1-2s', 'R-4s', '2-2s', '4-1s', '8x', '10x'];
  var QC_NC_STATUS = ['待处理', '处理中', '已处理'];
  var QC_FREQ = ['每批', '每天', '每周', '每月'];

  /* ---------- 能力验证通用枚举 ---------- */
  var PT_PLAN_TYPE = ['PT计划', '实验室间比对'];
  var PT_SIGNUP_STATUS = ['待确认', '已确认'];
  var PT_EVAL_RESULT = ['满意', '可疑', '不满意'];
  var PT_RECTIFY_STATUS = ['待整改', '整改中', '已验证'];
  var PT_ITEMS = ['HIV抗体', '乙肝表面抗原', '丙肝抗体', '沙眼衣原体', '淋球菌', '结核分枝杆菌', 'HPV-DNA'];
  var PT_ORGS = ['CNAS能力验证', '省临床检验中心', '国家卫健委临检中心', '区域实验室间比对'];

  /* ---------- 客户投诉通用枚举 ---------- */
  var CPT_LEVEL = ['紧急', '严重', '一般', '轻微'];
  var CPT_TYPE = ['服务质量', '检测周期', '重复收费', '报告错误', '样品管理', '其他'];
  var CPT_SOURCE = ['电话', '邮件', '来访', '书面', '在线平台'];
  var CPT_STATUS = ['待受理', '已受理', '处理中', '已反馈', '已关闭'];
  var CPT_INV_STATUS = ['待调查', '调查中', '已调查'];
  var CPT_HANDLE_STATUS = ['待处理', '处理中', '已完成'];
  var CPT_FB_STATUS = ['待反馈', '已反馈'];
  var CPT_SATISFY = ['满意', '基本满意', '不满意'];

  /* ---------- 整改流程通用枚举 ---------- */
  var RCT_SOURCE = ['内审发现', '质量监督', '客户投诉', '能力验证', '管理评审', '质量控制', '其他'];
  var RCT_LEVEL = ['紧急', '严重', '一般', '轻微'];
  var RCT_APPLY_STATUS = ['待审批', '已批准', '已驳回'];
  var RCT_ANALYSIS_STATUS = ['待分析', '分析中', '已完成'];
  var RCT_ANALYSIS_METHOD = ['5Why分析', '鱼骨图', '头脑风暴', '流程分析', '现场调查'];
  var RCT_MEASURE_STATUS = ['待实施', '实施中', '已完成'];
  var RCT_MEASURE_TYPE = ['纠正', '纠正措施', '预防措施'];
  var RCT_VERIFY_STATUS = ['待验证', '已验证'];
  var RCT_VERIFY_METHOD = ['现场核查', '资料审查', '试验验证', '抽查复核'];
  var RCT_VERIFY_RESULT = ['通过', '不通过'];
  var RCT_AUDIT_STATUS = ['待审核', '已审核'];
  var RCT_LEDGER_STATUS = ['整改中', '已完成', '已关闭'];

  /* ---------- 通用枚举选项 ---------- */
  var PROJ_STATUS = ['在研', '已结题', '待立项'];
  var QC_STATUS = ['在控', '警告', '失控'];
  var AUDIT_STATUS = ['待开始', '进行中', '已完成'];
  var TRAIN_STATUS = ['进行中', '已完成', '待开始', '待审批', '已审批'];
  var CERT_STATUS = ['有效', '即将到期', '已过期'];

  /* ---------- 各页面表单字段配置（同时用于弹窗表单） ---------- */
  var FIELDS = {
    'research-project': [
      { key: 'id', label: '项目编号', type: 'input', required: true },
      { key: 'name', label: '项目名称', type: 'input', required: true },
      { key: 'type', label: '项目类型', type: 'select', required: true, options: ['应用基础研究', '应用研究', '试验发展', '产业化示范'] },
      { key: 'leader', label: '负责人', type: 'input', required: true },
      { key: 'period', label: '起止时间', type: 'input', placeholder: '如 2025.01 - 2026.12' },
      { key: 'budget', label: '经费(万元)', type: 'number' },
      { key: 'percent', label: '进度(%)', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: PROJ_STATUS }
    ],
    'research-experiment': [
      { key: 'id', label: '实验编号', type: 'input', required: true },
      { key: 'name', label: '实验名称', type: 'input', required: true },
      { key: 'type', label: '类型', type: 'select', options: ['实验记录', '科研样品', '测序项目', '实验模板'] },
      { key: 'project', label: '关联项目', type: 'input' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'count', label: '样品数', type: 'number' },
      { key: 'status', label: '数据状态', type: 'select', options: ['记录中', '已完成', '待开始'] }
    ],
    'research-result': [
      { key: 'id', label: '成果编号', type: 'input', required: true },
      { key: 'name', label: '成果名称', type: 'input', required: true },
      { key: 'type', label: '类型', type: 'select', options: ['学术论文', '发明专利', '获奖成果', '成果转化'] },
      { key: 'owner', label: '第一完成人', type: 'input' },
      { key: 'date', label: '登记日期', type: 'date' },
      { key: 'level', label: '级别', type: 'select', options: ['国家级', '省部级', '厅局级', '校级'] },
      { key: 'status', label: '状态', type: 'select', options: ['已登记', '已审核', '待审核'] }
    ],
    'research-cooperation': [
      { key: 'id', label: '编号', type: 'input', required: true },
      { key: 'name', label: '名称/主题', type: 'input', required: true },
      { key: 'type', label: '类型', type: 'select', options: ['合作协议', '学术交流', '培训讲座', '技术服务', '平台共建'] },
      { key: 'partner', label: '合作单位/对象', type: 'input' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'time', label: '时间', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: ['进行中', '已完成', '待开始'] }
    ],
    'quality-review-plan-mgmt': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '计划名称', type: 'input', required: true },
      { key: 'type', label: '计划类型', type: 'select', options: ['年度计划', '季度计划', '专项计划', '临时计划'] },
      { key: 'period', label: '评审周期', type: 'select', options: ['年度', '半年度', '季度', '月度'] },
      { key: 'maker', label: '编制人', type: 'input' },
      { key: 'makeDate', label: '编制日期', type: 'date' },
      { key: 'approver', label: '审批人', type: 'input' },
      { key: 'approveDate', label: '审批日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: ['待审批', '已审批', '已发布', '已废止'] }
    ],
    'quality-review': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '评审主题', type: 'input', required: true },
      { key: 'type', label: '评审类型', type: 'select', options: ['管理评审', '质量评审', '专项评审'] },
      { key: 'date', label: '评审日期', type: 'date' },
      { key: 'host', label: '主持人', type: 'input' },
      { key: 'count', label: '参加人数', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-review-plan-exec': [
      { key: 'id', label: '执行编号', type: 'input', required: true },
      { key: 'plan', label: '关联计划', type: 'input', placeholder: '如 PM-2026-01' },
      { key: 'task', label: '执行任务', type: 'input', required: true },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'dept', label: '责任部门', type: 'input' },
      { key: 'startDate', label: '开始日期', type: 'date' },
      { key: 'endDate', label: '结束日期', type: 'date' },
      { key: 'progress', label: '完成进度(%)', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['未开始', '进行中', '已完成', '已延期'] }
    ],
    'quality-review-input': [
      { key: 'id', label: '资料编号', type: 'input', required: true },
      { key: 'name', label: '资料名称', type: 'input', required: true },
      { key: 'type', label: '资料类别', type: 'select', options: ['质量方针与目标', '检测工作量', '人员能力', '资源配置', '设施环境', '设备状况', '内外审核结果', '投诉与反馈', '能力验证结果', '改进建议'] },
      { key: 'dept', label: '责任部门', type: 'input' },
      { key: 'collector', label: '收集人', type: 'input' },
      { key: 'deadline', label: '截止日期', type: 'date' },
      { key: 'status', label: '收集状态', type: 'select', options: ['待收集', '已收集', '收集完成'] }
    ],
    'quality-review-meeting': [
      { key: 'id', label: '会议编号', type: 'input', required: true },
      { key: 'name', label: '会议主题', type: 'input', required: true },
      { key: 'location', label: '会议地点', type: 'input' },
      { key: 'time', label: '召开时间', type: 'date' },
      { key: 'host', label: '主持人', type: 'input' },
      { key: 'count', label: '参会人数', type: 'number' },
      { key: 'minutes', label: '会议纪要', type: 'textarea' },
      { key: 'status', label: '状态', type: 'select', options: ['待召开', '进行中', '已完成'] }
    ],
    'quality-review-report': [
      { key: 'id', label: '报告编号', type: 'input', required: true },
      { key: 'name', label: '报告名称', type: 'input', required: true },
      { key: 'plan', label: '关联计划', type: 'input', placeholder: '如 PL-2026-04' },
      { key: 'author', label: '编制人', type: 'input' },
      { key: 'date', label: '编制日期', type: 'date' },
      { key: 'approver', label: '批准人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['编制中', '已提交', '已批准'] }
    ],
    'quality-review-rectify': [
      { key: 'id', label: '整改编号', type: 'input', required: true },
      { key: 'plan', label: '关联评审计划', type: 'input', placeholder: '如 PL-2026-04' },
      { key: 'reason', label: '整改事项', type: 'input', required: true },
      { key: 'requirement', label: '整改要求', type: 'textarea' },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'deadline', label: '整改期限', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS },
      { key: 'verify', label: '验证结果', type: 'select', options: ['待验证', '通过', '不通过'] }
    ],
    'quality-audit': [
      { key: 'id', label: '审核编号', type: 'input', required: true },
      { key: 'name', label: '内审主题', type: 'input', required: true },
      { key: 'type', label: '审核类型', type: 'select', options: ['要素审核', '部门审核', '专项审核'] },
      { key: 'date', label: '审核日期', type: 'date' },
      { key: 'leader', label: '审核组长', type: 'input' },
      { key: 'nc', label: '不符合项(项)', type: 'number' },
      { key: 'percent', label: '完成率(%)', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-clause-element': [
      { key: 'id', label: '条款编号', type: 'input', required: true },
      { key: 'element', label: '审核要素', type: 'select', required: true, options: AUDIT_ELEMENTS },
      { key: 'standard', label: '依据标准', type: 'select', options: ['ISO/IEC 17025', 'RB/T 214-2017', 'CNAS-CL01'] },
      { key: 'content', label: '条款要求', type: 'textarea', required: true },
      { key: 'point', label: '审核要点', type: 'textarea' },
      { key: 'status', label: '条款状态', type: 'select', options: ['有效', '修订中', '废止'] }
    ],
    'quality-audit-clause-dept': [
      { key: 'id', label: '条款编号', type: 'input', required: true },
      { key: 'dept', label: '受审部门', type: 'select', required: true, options: AUDIT_DEPTS },
      { key: 'element', label: '对应要素', type: 'select', options: AUDIT_ELEMENTS },
      { key: 'duty', label: '部门职责要点', type: 'textarea', required: true },
      { key: 'content', label: '审核要点内容', type: 'textarea' },
      { key: 'status', label: '条款状态', type: 'select', options: ['有效', '修订中', '废止'] }
    ],
    'quality-audit-year': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '计划名称', type: 'input', required: true },
      { key: 'year', label: '审核年度', type: 'input', placeholder: '如 2026' },
      { key: 'count', label: '内审次数(次)', type: 'number' },
      { key: 'scope', label: '覆盖范围', type: 'select', options: ['全要素全部门', '重点要素', '新增项目', '监督性内审'] },
      { key: 'time', label: '计划时间', type: 'input', placeholder: '如 2026.03 - 2026.11' },
      { key: 'leader', label: '审核组长', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-plan': [
      { key: 'id', label: '实施编号', type: 'input', required: true },
      { key: 'plan', label: '关联年度计划', type: 'input', placeholder: '如 NS-2026-年度' },
      { key: 'name', label: '内审项目', type: 'input', required: true },
      { key: 'type', label: '审核类型', type: 'select', options: ['要素审核', '部门审核', '专项审核'] },
      { key: 'scope', label: '审核范围', type: 'input', placeholder: '如 检测实验室/要素：人员' },
      { key: 'startDate', label: '开始日期', type: 'date' },
      { key: 'endDate', label: '结束日期', type: 'date' },
      { key: 'auditor', label: '审核员', type: 'input' },
      { key: 'leader', label: '审核组长', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-meeting': [
      { key: 'id', label: '会议编号', type: 'input', required: true },
      { key: 'name', label: '会议名称', type: 'input', required: true },
      { key: 'type', label: '会议类型', type: 'select', options: ['首次会议', '审核组内部会议', '末次会议'] },
      { key: 'time', label: '召开时间', type: 'date' },
      { key: 'location', label: '会议地点', type: 'input' },
      { key: 'host', label: '主持人', type: 'input' },
      { key: 'count', label: '参加人数', type: 'number' },
      { key: 'minutes', label: '会议内容', type: 'textarea' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-checklist': [
      { key: 'id', label: '检查表编号', type: 'input', required: true },
      { key: 'audit', label: '关联内审', type: 'input', placeholder: '如 NS-2026-02' },
      { key: 'element', label: '审核要素', type: 'select', options: AUDIT_ELEMENTS },
      { key: 'dept', label: '受审部门', type: 'select', options: AUDIT_DEPTS },
      { key: 'item', label: '检查内容', type: 'textarea', required: true },
      { key: 'method', label: '检查方式', type: 'select', options: ['查阅记录', '现场观察', '面谈', '实际操作'] },
      { key: 'result', label: '检查结果', type: 'select', options: ['符合', '不符合', '观察项', '不适用'] },
      { key: 'evidence', label: '证据说明', type: 'textarea' }
    ],
    'quality-audit-nc': [
      { key: 'id', label: '不符合项编号', type: 'input', required: true },
      { key: 'audit', label: '关联内审', type: 'input', placeholder: '如 NS-2026-02' },
      { key: 'level', label: '严重程度', type: 'select', options: ['严重', '一般', '观察项'] },
      { key: 'element', label: '涉及要素', type: 'select', options: AUDIT_ELEMENTS },
      { key: 'dept', label: '责任部门', type: 'select', options: AUDIT_DEPTS },
      { key: 'content', label: '不符合事实', type: 'textarea', required: true },
      { key: 'requirement', label: '条款要求', type: 'textarea' },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'deadline', label: '整改期限', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: ['待整改', '整改中', '已完成', '已关闭'] },
      { key: 'verify', label: '验证结果', type: 'select', options: ['待验证', '通过', '不通过'] }
    ],
    'quality-audit-rectify': [
      { key: 'id', label: '整改编号', type: 'input', required: true },
      { key: 'nc', label: '关联不符合项', type: 'input', placeholder: '如 NC-2026-003' },
      { key: 'reason', label: '整改事项', type: 'input', required: true },
      { key: 'measure', label: '纠正措施', type: 'textarea' },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'deadline', label: '整改期限', type: 'date' },
      { key: 'verifyDate', label: '验证日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: ['整改中', '已完成', '已验证'] },
      { key: 'verify', label: '验证结果', type: 'select', options: ['待验证', '通过', '不通过'] }
    ],
    'quality-audit-report': [
      { key: 'id', label: '报告编号', type: 'input', required: true },
      { key: 'name', label: '报告名称', type: 'input', required: true },
      { key: 'audit', label: '关联内审', type: 'input', placeholder: '如 NS-2026-02' },
      { key: 'summary', label: '审核结论', type: 'textarea' },
      { key: 'totalNc', label: '不符合项总数', type: 'number' },
      { key: 'closedNc', label: '已关闭不符合项', type: 'number' },
      { key: 'author', label: '编制人', type: 'input' },
      { key: 'date', label: '编制日期', type: 'date' },
      { key: 'approver', label: '批准人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['编制中', '已提交', '已批准'] }
    ],
    'quality-supervise': [
      { key: 'id', label: '监督编号', type: 'input', required: true },
      { key: 'type', label: '监督类型', type: 'select', options: ['周期性监督', '日常监督', '专项监督'] },
      { key: 'leader', label: '监督员', type: 'input' },
      { key: 'target', label: '被监督对象', type: 'input' },
      { key: 'date', label: '监督日期', type: 'date' },
      { key: 'issue', label: '发现问题', type: 'textarea' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-supervise-plan-periodic': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '计划名称', type: 'input', required: true },
      { key: 'cycle', label: '监督周期', type: 'select', options: ['月度', '季度', '半年', '年度'] },
      { key: 'target', label: '监督对象', type: 'input', placeholder: '如 检测实验室/样品接收岗' },
      { key: 'focus', label: '监督重点', type: 'textarea' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'time', label: '计划时间', type: 'input', placeholder: '如 2026.01 - 2026.12' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-supervise-plan-special': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '专项监督名称', type: 'input', required: true },
      { key: 'object', label: '监督项目', type: 'input', placeholder: '如 新冠核酸检测专项' },
      { key: 'standard', label: '依据标准', type: 'select', options: ['ISO/IEC 17025', 'RB/T 214-2017', '检测方法标准', '体系程序文件'] },
      { key: 'focus', label: '监督重点', type: 'textarea' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'date', label: '计划日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-supervise-task': [
      { key: 'id', label: '任务编号', type: 'input', required: true },
      { key: 'plan', label: '关联计划', type: 'input', placeholder: '如 JD-2026-P1' },
      { key: 'name', label: '任务名称', type: 'input', required: true },
      { key: 'target', label: '监督对象', type: 'input' },
      { key: 'leader', label: '监督员', type: 'input' },
      { key: 'time', label: '任务时间', type: 'date' },
      { key: 'deadline', label: '要求完成日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: QS_TASK_STATUS }
    ],
    'quality-supervise-record': [
      { key: 'id', label: '记录编号', type: 'input', required: true },
      { key: 'task', label: '关联任务', type: 'input', placeholder: '如 RW-2026-001' },
      { key: 'target', label: '被监督对象', type: 'input' },
      { key: 'leader', label: '监督员', type: 'input' },
      { key: 'date', label: '监督日期', type: 'date' },
      { key: 'method', label: '监督方式', type: 'select', options: QS_METHODS },
      { key: 'content', label: '监督内容', type: 'textarea' },
      { key: 'issue', label: '发现问题', type: 'textarea' },
      { key: 'handle', label: '处理情况', type: 'textarea' },
      { key: 'status', label: '状态', type: 'select', options: ['待评价', '已记录'] }
    ],
    'quality-supervise-eval': [
      { key: 'id', label: '评价编号', type: 'input', required: true },
      { key: 'record', label: '关联记录', type: 'input', placeholder: '如 JL-2026-001' },
      { key: 'target', label: '被监督对象', type: 'input' },
      { key: 'judge', label: '评价人', type: 'input' },
      { key: 'date', label: '评价日期', type: 'date' },
      { key: 'score', label: '评价得分(分)', type: 'number' },
      { key: 'result', label: '评价结果', type: 'select', options: QS_EVAL_RESULT },
      { key: 'opinion', label: '评价意见', type: 'textarea' }
    ],
    'quality-supervise-audit': [
      { key: 'id', label: '审核编号', type: 'input', required: true },
      { key: 'eval', label: '关联评价', type: 'input', placeholder: '如 PJ-2026-001' },
      { key: 'target', label: '监督对象', type: 'input' },
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'date', label: '审核日期', type: 'date' },
      { key: 'opinion', label: '审核意见', type: 'textarea' },
      { key: 'status', label: '状态', type: 'select', options: QS_AUDIT_STATUS }
    ],
    'quality-supervise-stat': [
      { key: 'id', label: '统计编号', type: 'input', required: true },
      { key: 'period', label: '统计期间', type: 'input', placeholder: '如 2026年上半年' },
      { key: 'type', label: '监督类别', type: 'select', options: QS_PLAN_TYPE },
      { key: 'count', label: '监督次数(次)', type: 'number' },
      { key: 'issue', label: '发现问题(项)', type: 'number' },
      { key: 'fixed', label: '已整改(项)', type: 'number' },
      { key: 'fixRate', label: '整改率(%)', type: 'number' },
      { key: 'qualifyRate', label: '合格率(%)', type: 'number' }
    ],
    'quality-supervise-upload': [
      { key: 'id', label: '上传编号', type: 'input', required: true, placeholder: '如 SC-2026-009' },
      { key: 'plan', label: '关联计划', type: 'input', placeholder: '如 ZC-2026-P1 / RW-2026-001' },
      { key: 'result', label: '计划结果', type: 'textarea', required: true, placeholder: '请填写本次监督计划/任务的执行结果、监督结论等' },
      { key: 'files', label: '附件文件', type: 'textarea', placeholder: '每行一个文件名，如：\n监督记录扫描件.pdf\n证据照片.zip' }
    ],
    'quality-control-plan-internal': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '质控项目', type: 'input', required: true, placeholder: '如 乙肝表面抗原定量' },
      { key: 'sample', label: '质控品批号', type: 'input' },
      { key: 'freq', label: '质控频次', type: 'select', options: QC_FREQ },
      { key: 'mean', label: '靶值(均值)', type: 'number' },
      { key: 'sd', label: '标准差(SD)', type: 'number' },
      { key: 'limit', label: '质控限', type: 'select', options: ['±2SD', '±3SD'] },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-plan-parallel': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '平行样计划名称', type: 'input', required: true },
      { key: 'sample', label: '样本类型', type: 'input', placeholder: '如 血清样本' },
      { key: 'dups', label: '平行次数', type: 'number' },
      { key: 'diff', label: '允许偏差(%)', type: 'number' },
      { key: 'focus', label: '覆盖检测项目', type: 'input' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-plan-blank': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '空白样计划名称', type: 'input', required: true },
      { key: 'sample', label: '空白基质', type: 'input', placeholder: '如 纯水/阴性基质' },
      { key: 'blankLimit', label: '空白限值(Ct)', type: 'number' },
      { key: 'focus', label: '覆盖检测项目', type: 'input' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'date', label: '计划日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-plan-recovery': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '加标回收计划名称', type: 'input', required: true },
      { key: 'sample', label: '样本基质', type: 'input' },
      { key: 'spike', label: '加标浓度', type: 'input', placeholder: '如 100 IU/mL' },
      { key: 'recovery', label: '理论回收率(%)', type: 'number' },
      { key: 'low', label: '允许下限(%)', type: 'number' },
      { key: 'high', label: '允许上限(%)', type: 'number' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-task': [
      { key: 'id', label: '任务编号', type: 'input', required: true },
      { key: 'plan', label: '关联计划', type: 'input', placeholder: '如 NQ-2026-I1' },
      { key: 'name', label: '任务名称', type: 'input', required: true },
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'leader', label: '执行人', type: 'input' },
      { key: 'time', label: '任务时间', type: 'date' },
      { key: 'deadline', label: '要求完成日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: QS_TASK_STATUS }
    ],
    'quality-control-data': [
      { key: 'id', label: '记录编号', type: 'input', required: true },
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'batch', label: '批次', type: 'input', placeholder: '如 B2026-041' },
      { key: 'sample', label: '质控品批号', type: 'input' },
      { key: 'value', label: '测定值', type: 'number' },
      { key: 'mean', label: '靶值', type: 'number' },
      { key: 'sd', label: 'SD', type: 'number' },
      { key: 'date', label: '检测日期', type: 'date' },
      { key: 'leader', label: '检测人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QC_DATA_STATUS }
    ],
    'quality-control-eval': [
      { key: 'id', label: '评价编号', type: 'input', required: true },
      { key: 'record', label: '关联数据', type: 'input', placeholder: '如 SJ-2026-001' },
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'batch', label: '批次', type: 'input' },
      { key: 'value', label: '测定值', type: 'number' },
      { key: 'mean', label: '靶值', type: 'number' },
      { key: 'sd', label: 'SD', type: 'number' },
      { key: 'rule', label: '违例规则', type: 'select', options: QC_EVAL_RULES },
      { key: 'result', label: '评价结果', type: 'select', options: QC_CONTROL_STATUS },
      { key: 'judge', label: '评价人', type: 'input' },
      { key: 'date', label: '评价日期', type: 'date' }
    ],
    'quality-control-audit': [
      { key: 'id', label: '审核编号', type: 'input', required: true },
      { key: 'eval', label: '关联评价', type: 'input', placeholder: '如 PG-2026-001' },
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'batch', label: '批次', type: 'input' },
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'date', label: '审核日期', type: 'date' },
      { key: 'opinion', label: '审核意见', type: 'textarea' },
      { key: 'status', label: '状态', type: 'select', options: QS_AUDIT_STATUS }
    ],
    'quality-control-nc': [
      { key: 'id', label: '失控编号', type: 'input', required: true },
      { key: 'eval', label: '关联评价', type: 'input', placeholder: '如 PG-2026-002' },
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'batch', label: '批次', type: 'input' },
      { key: 'reason', label: '失控原因分析', type: 'textarea' },
      { key: 'handle', label: '纠正措施', type: 'textarea' },
      { key: 'deadline', label: '计划完成日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: QC_NC_STATUS }
    ],
    'quality-control-stat': [
      { key: 'id', label: '统计编号', type: 'input', required: true },
      { key: 'period', label: '统计期间', type: 'input', placeholder: '如 2026年Q1' },
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'batches', label: '质控批次数', type: 'number' },
      { key: 'inControl', label: '在控批次数', type: 'number' },
      { key: 'warning', label: '警告批次数', type: 'number' },
      { key: 'outOf', label: '失控批次数', type: 'number' },
      { key: 'rate', label: '在控率(%)', type: 'number' }
    ],
    'quality-proficiency-plan-pt': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: 'PT计划名称', type: 'input', required: true },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS },
      { key: 'item', label: '参加项目', type: 'select', options: PT_ITEMS },
      { key: 'date', label: '计划时间', type: 'input', placeholder: '如 2026.03 - 2026.05' },
      { key: 'fee', label: '费用(元)', type: 'number' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-proficiency-plan-compare': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '比对计划名称', type: 'input', required: true },
      { key: 'partner', label: '比对实验室', type: 'input' },
      { key: 'item', label: '比对项目', type: 'select', options: PT_ITEMS },
      { key: 'date', label: '计划时间', type: 'input' },
      { key: 'standard', label: '判定标准', type: 'select', options: ['Z值≤2', '相对偏差≤10%', '变异系数≤15%'] },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-proficiency-signup': [
      { key: 'id', label: '报名编号', type: 'input', required: true },
      { key: 'plan', label: '关联计划', type: 'input', placeholder: '如 PT-2026-01' },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS },
      { key: 'item', label: '参加项目', type: 'select', options: PT_ITEMS },
      { key: 'applicant', label: '报名人', type: 'input' },
      { key: 'date', label: '报名日期', type: 'date' },
      { key: 'deadline', label: '缴费截止', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: PT_SIGNUP_STATUS }
    ],
    'quality-proficiency-record': [
      { key: 'id', label: '记录编号', type: 'input', required: true },
      { key: 'plan', label: '关联计划', type: 'input' },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS },
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'code', label: '样品编号', type: 'input' },
      { key: 'receive', label: '接收日期', type: 'date' },
      { key: 'testDate', label: '检测日期', type: 'date' },
      { key: 'result', label: '测定结果', type: 'input', placeholder: '如 阳性/浓度值' },
      { key: 'leader', label: '检测人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['进行中', '已完成'] }
    ],
    'quality-proficiency-review': [
      { key: 'id', label: '评审表编号', type: 'input', required: true },
      { key: 'plan', label: '关联计划', type: 'input' },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS },
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'result', label: '测定结果', type: 'input' },
      { key: 'zScore', label: 'Z值', type: 'number' },
      { key: 'evaluation', label: '能力评定', type: 'select', options: PT_EVAL_RESULT },
      { key: 'reviewer', label: '评审人', type: 'input' },
      { key: 'date', label: '评审日期', type: 'date' }
    ],
    'quality-proficiency-audit': [
      { key: 'id', label: '审核编号', type: 'input', required: true },
      { key: 'review', label: '关联评审表', type: 'input', placeholder: '如 PS-2026-01' },
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'date', label: '审核日期', type: 'date' },
      { key: 'opinion', label: '审核意见', type: 'textarea' },
      { key: 'status', label: '状态', type: 'select', options: QS_AUDIT_STATUS }
    ],
    'quality-proficiency-stat': [
      { key: 'id', label: '统计编号', type: 'input', required: true },
      { key: 'period', label: '统计期间', type: 'input', placeholder: '如 2026年度' },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS },
      { key: 'items', label: '参加项数', type: 'number' },
      { key: 'satisfactory', label: '满意项数', type: 'number' },
      { key: 'questionable', label: '可疑项数', type: 'number' },
      { key: 'unsatisfactory', label: '不满意项数', type: 'number' },
      { key: 'rate', label: '满意率(%)', type: 'number' }
    ],
    'quality-proficiency-rectify': [
      { key: 'id', label: '整改编号', type: 'input', required: true },
      { key: 'review', label: '关联评审表', type: 'input', placeholder: '如 PS-2026-03' },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS },
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'result', label: '原评定结果', type: 'select', options: PT_EVAL_RESULT },
      { key: 'reason', label: '原因分析', type: 'textarea' },
      { key: 'measure', label: '纠正措施', type: 'textarea' },
      { key: 'deadline', label: '完成期限', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: PT_RECTIFY_STATUS }
    ],
    'quality-control': [
      { key: 'id', label: '编号', type: 'input', required: true },
      { key: 'name', label: '项目名称', type: 'input', required: true },
      { key: 'type', label: '类型', type: 'select', options: ['室内质控', '室间质控'] },
      { key: 'method', label: '质控方法', type: 'select', options: ['标准物质', '控制图', '平行样', '留样复测'] },
      { key: 'date', label: '计划日期', type: 'date' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'eval', label: '结果评价', type: 'select', options: QC_STATUS },
      { key: 'status', label: '状态', type: 'select', options: ['待开始', '进行中', '已完成'] }
    ],
    'quality-proficiency': [
      { key: 'id', label: '项目编号', type: 'input', required: true },
      { key: 'name', label: '能力验证项目', type: 'input', required: true },
      { key: 'org', label: '组织机构', type: 'input' },
      { key: 'regDate', label: '报名时间', type: 'date' },
      { key: 'resultDate', label: '结果时间', type: 'date' },
      { key: 'result', label: '结果评定', type: 'select', options: ['满意', '不满意', '有问题'] },
      { key: 'rectify', label: '整改状态', type: 'select', options: ['未要求', '完成', '整改中'] }
    ],
    'quality-system-doc': [
      { key: 'id', label: '文件编号', type: 'input', required: true },
      { key: 'name', label: '文件名称', type: 'input', required: true },
      { key: 'type', label: '文件类型', type: 'select', options: ['质量手册', '程序文件', '作业指导书', '记录表格'] },
      { key: 'version', label: '版本号', type: 'input', placeholder: '如 V2.0' },
      { key: 'date', label: '发布日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: ['已发布', '起草中'] }
    ],
    'quality-complaint': [
      { key: 'title', label: '投诉标题', type: 'input', required: true },
      { key: 'level', label: '重要程度', type: 'select', options: ['严重', '一般', '轻微'] },
      { key: 'customer', label: '投诉客户', type: 'input' },
      { key: 'date', label: '投诉日期', type: 'date' },
      { key: 'content', label: '投诉内容', type: 'textarea', required: true },
      { key: 'status', label: '处理状态', type: 'select', options: ['待处理', '处理中', '已解决', '已关闭'] }
    ],
    'quality-complaint-register': [
      { key: 'id', label: '投诉编号', type: 'input', required: true, placeholder: '如 TS-2026-017' },
      { key: 'title', label: '投诉标题', type: 'input', required: true },
      { key: 'type', label: '投诉类型', type: 'select', options: CPT_TYPE },
      { key: 'customer', label: '投诉客户', type: 'input' },
      { key: 'phone', label: '联系电话', type: 'input' },
      { key: 'source', label: '来源', type: 'select', options: CPT_SOURCE },
      { key: 'level', label: '重要程度', type: 'select', options: CPT_LEVEL },
      { key: 'date', label: '投诉日期', type: 'date' },
      { key: 'operator', label: '登记人', type: 'input' },
      { key: 'content', label: '投诉内容', type: 'textarea', required: true, full: true },
      { key: 'status', label: '状态', type: 'select', options: CPT_STATUS }
    ],
    'quality-complaint-investigate': [
      { key: 'id', label: '调查编号', type: 'input', required: true },
      { key: 'complaintNo', label: '投诉编号', type: 'input' },
      { key: 'investigator', label: '调查人', type: 'input' },
      { key: 'date', label: '调查时间', type: 'date' },
      { key: 'method', label: '调查方式', type: 'select', options: ['现场核查', '电话沟通', '资料核查', '访谈', '留样复测'] },
      { key: 'conclusion', label: '调查结论', type: 'textarea', full: true },
      { key: 'status', label: '状态', type: 'select', options: CPT_INV_STATUS }
    ],
    'quality-complaint-handle': [
      { key: 'id', label: '处理编号', type: 'input', required: true },
      { key: 'complaintNo', label: '投诉编号', type: 'input' },
      { key: 'dept', label: '责任部门', type: 'input' },
      { key: 'leader', label: '处理人', type: 'input' },
      { key: 'measure', label: '处理措施', type: 'textarea', full: true },
      { key: 'result', label: '处理结果', type: 'input' },
      { key: 'finishDate', label: '完成时间', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: CPT_HANDLE_STATUS }
    ],
    'quality-complaint-feedback': [
      { key: 'id', label: '反馈编号', type: 'input', required: true },
      { key: 'complaintNo', label: '投诉编号', type: 'input' },
      { key: 'person', label: '反馈人', type: 'input' },
      { key: 'way', label: '反馈方式', type: 'select', options: ['电话回访', '邮件', '上门回访', '平台反馈'] },
      { key: 'date', label: '反馈时间', type: 'date' },
      { key: 'satisfaction', label: '客户满意度', type: 'select', options: CPT_SATISFY },
      { key: 'content', label: '反馈内容', type: 'textarea', full: true },
      { key: 'status', label: '状态', type: 'select', options: CPT_FB_STATUS }
    ],
    'quality-complaint-stat': [
      { key: 'month', label: '月份', type: 'input', placeholder: '如 2026-01' },
      { key: 'total', label: '投诉数', type: 'number' },
      { key: 'inTime', label: '及时处理数', type: 'number' },
      { key: 'rate', label: '及时率', type: 'input', placeholder: '如 100%' },
      { key: 'satisfaction', label: '平均满意度', type: 'input', placeholder: '如 98%' }
    ],
    'quality-corrective': [
      { key: 'id', label: '整改编号', type: 'input', required: true },
      { key: 'reason', label: '整改原因', type: 'input', required: true },
      { key: 'source', label: '来源', type: 'select', options: ['内审发现', '质量监督', '客户投诉', '能力验证', '管理评审'] },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'deadline', label: '整改期限', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: ['进行中', '已完成', '待验证'] },
      { key: 'verify', label: '验证结果', type: 'select', options: ['通过', '不通过', '待验证'] }
    ],
    'system-org-dept': [
      { key: 'code', label: '机构编码', type: 'input', required: true },
      { key: 'name', label: '机构名称', type: 'input', required: true },
      { key: 'type', label: '机构类型', type: 'select', options: ['检测实验室', '管理部门', '辅助部门', '派出机构'] },
      { key: 'parent', label: '上级机构', type: 'input' },
      { key: 'leader', label: '负责人', type: 'input' },
      { key: 'phone', label: '联系电话', type: 'input' },
      { key: 'address', label: '办公地点', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['在用', '停用'] }
    ],
    'system-org-position': [
      { key: 'code', label: '岗位编码', type: 'input', required: true },
      { key: 'name', label: '岗位名称', type: 'input', required: true },
      { key: 'dept', label: '所属部门', type: 'input' },
      { key: 'cat', label: '岗位类别', type: 'select', options: ['管理岗', '技术岗', '辅助岗', '关键岗位'] },
      { key: 'level', label: '职级', type: 'select', options: ['初级', '中级', '高级', '专家'] },
      { key: 'total', label: '编制数', type: 'number' },
      { key: 'onPost', label: '在岗人数', type: 'number' },
      { key: 'duty', label: '岗位职责', type: 'textarea', full: true },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-org-person': [
      { key: 'no', label: '工号', type: 'input', required: true },
      { key: 'name', label: '姓名', type: 'input', required: true },
      { key: 'dept', label: '所属部门', type: 'input' },
      { key: 'position', label: '岗位', type: 'input' },
      { key: 'grade', label: '职级', type: 'select', options: ['初级', '中级', '高级', '专家'] },
      { key: 'type', label: '用工性质', type: 'select', options: ['在编', '聘用', '劳务'] },
      { key: 'joinDate', label: '入职日期', type: 'date' },
      { key: 'phone', label: '联系电话', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['在职', '借调', '离职'] }
    ],
    'system-org-holiday': [
      { key: 'date', label: '日期', type: 'date', required: true },
      { key: 'name', label: '节日名称', type: 'input', required: true },
      { key: 'type', label: '类型', type: 'select', options: ['法定假日', '调休日', '公司假日', '周末'] },
      { key: 'makeup', label: '是否调休', type: 'select', options: ['是', '否'] },
      { key: 'remark', label: '备注', type: 'input' }
    ],
    'system-org-workcal': [
      { key: 'year', label: '年度', type: 'select', options: ['2025', '2026', '2027'] },
      { key: 'month', label: '月份', type: 'select', options: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
      { key: 'workDays', label: '工作日', type: 'number' },
      { key: 'restDays', label: '休息日', type: 'number' },
      { key: 'holiDays', label: '节假日', type: 'number' },
      { key: 'attendance', label: '出勤率', type: 'input', placeholder: '如 96%' },
      { key: 'status', label: '状态', type: 'select', options: ['已发布', '草稿'] }
    ],
    'system-perm-user': [
      { key: 'account', label: '登录账号', type: 'input', required: true },
      { key: 'name', label: '姓名', type: 'input', required: true },
      { key: 'dept', label: '所属部门', type: 'input' },
      { key: 'role', label: '角色', type: 'select', options: ['系统管理员', '实验室主管', '检测分析师', '质量管理员'] },
      { key: 'phone', label: '手机号', type: 'input' },
      { key: 'lastLogin', label: '最近登录', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['正常', '禁用'] }
    ],
    'system-perm-role': [
      { key: 'name', label: '角色名称', type: 'input', required: true },
      { key: 'code', label: '角色标识', type: 'input' },
      { key: 'users', label: '成员数', type: 'number' },
      { key: 'permissionScope', label: '权限范围', type: 'select', options: ['全部', '本部门', '本人数据'] },
      { key: 'desc', label: '角色描述', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-perm-config': [
      { key: 'module', label: '模块名称', type: 'input', required: true },
      { key: 'funcPerms', label: '功能权限', type: 'input' },
      { key: 'dataScope', label: '数据权限', type: 'select', options: ['全部数据', '本部门', '本人数据'] },
      { key: 'roles', label: '适用角色', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-perm-oplog': [
      { key: 'user', label: '操作人', type: 'input' },
      { key: 'action', label: '操作内容', type: 'input' },
      { key: 'module', label: '所属模块', type: 'input' },
      { key: 'time', label: '操作时间', type: 'date' },
      { key: 'result', label: '结果', type: 'select', options: ['成功', '失败'] }
    ],
    'system-perm-login': [
      { key: 'user', label: '登录账号', type: 'input' },
      { key: 'name', label: '姓名', type: 'input' },
      { key: 'ip', label: 'IP 地址', type: 'input' },
      { key: 'device', label: '登录设备', type: 'input' },
      { key: 'time', label: '登录时间', type: 'date' },
      { key: 'status', label: '结果', type: 'select', options: ['成功', '失败'] }
    ],
    'system-dict-type': [
      { key: 'code', label: '字典编码', type: 'input', required: true },
      { key: 'name', label: '字典名称', type: 'input', required: true },
      { key: 'type', label: '字典类型', type: 'select', options: ['业务字典', '基础字典', '系统字典'] },
      { key: 'items', label: '条目数', type: 'number' },
      { key: 'remark', label: '说明', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-dict-char': [
      { key: 'name', label: '字符名称', type: 'input', required: true },
      { key: 'value', label: '字符值', type: 'input', required: true },
      { key: 'category', label: '分类', type: 'select', options: ['状态标记', '权限标记', '检测术语', '报告术语'] },
      { key: 'remark', label: '说明', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-dict-enum': [
      { key: 'dictCode', label: '所属字典', type: 'input', required: true },
      { key: 'code', label: '枚举编码', type: 'input', required: true },
      { key: 'name', label: '显示名称', type: 'input', required: true },
      { key: 'order', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-num-report': [
      { key: 'name', label: '规则名称', type: 'input', required: true },
      { key: 'prefix', label: '编号前缀', type: 'input', required: true },
      { key: 'seqLength', label: '序号位数', type: 'number' },
      { key: 'yearMode', label: '年份模式', type: 'select', options: ['无', 'YY', 'YYYY'] },
      { key: 'sep', label: '分隔符', type: 'select', options: ['无', '-', '/', '空格'] },
      { key: 'currentSeq', label: '当前序号', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] },
      { key: 'remark', label: '说明', type: 'input' }
    ],
    'system-num-sample': [
      { key: 'name', label: '规则名称', type: 'input', required: true },
      { key: 'prefix', label: '编号前缀', type: 'input', required: true },
      { key: 'seqLength', label: '序号位数', type: 'number' },
      { key: 'yearMode', label: '年份模式', type: 'select', options: ['无', 'YY', 'YYYY'] },
      { key: 'sep', label: '分隔符', type: 'select', options: ['无', '-', '/', '空格'] },
      { key: 'currentSeq', label: '当前序号', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] },
      { key: 'remark', label: '说明', type: 'input' }
    ],
    'system-num-task': [
      { key: 'name', label: '规则名称', type: 'input', required: true },
      { key: 'prefix', label: '编号前缀', type: 'input', required: true },
      { key: 'seqLength', label: '序号位数', type: 'number' },
      { key: 'yearMode', label: '年份模式', type: 'select', options: ['无', 'YY', 'YYYY'] },
      { key: 'sep', label: '分隔符', type: 'select', options: ['无', '-', '/', '空格'] },
      { key: 'currentSeq', label: '当前序号', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] },
      { key: 'remark', label: '说明', type: 'input' }
    ],
    'system-num-other': [
      { key: 'name', label: '规则名称', type: 'input', required: true },
      { key: 'prefix', label: '编号前缀', type: 'input', required: true },
      { key: 'seqLength', label: '序号位数', type: 'number' },
      { key: 'yearMode', label: '年份模式', type: 'select', options: ['无', 'YY', 'YYYY'] },
      { key: 'sep', label: '分隔符', type: 'select', options: ['无', '-', '/', '空格'] },
      { key: 'currentSeq', label: '当前序号', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] },
      { key: 'remark', label: '说明', type: 'input' }
    ],
    'system-cfg-flow': [
      { key: 'step', label: '步骤名称', type: 'input', required: true },
      { key: 'role', label: '处理角色', type: 'input' },
      { key: 'icon', label: '图标', type: 'input' },
      { key: 'must', label: '是否必经', type: 'select', options: ['是', '否'] },
      { key: 'timeout', label: '超时小时', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-cfg-line': [
      { key: 'name', label: '生产线名称', type: 'input', required: true },
      { key: 'dept', label: '负责科室', type: 'select', options: ['分子检测科', '免疫检测科', '病理科', '基因测序科'] },
      { key: 'type', label: '适用检测类型', type: 'select', options: ['分子检测', '免疫检测', '病理检测', '基因测序'] },
      { key: 'steps', label: '流程步骤数', type: 'number' },
      { key: 'flow', label: '关联工作流', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-cfg-approve': [
      { key: 'name', label: '流程名称', type: 'input', required: true },
      { key: 'levels', label: '审批层级', type: 'number' },
      { key: 'initiator', label: '发起角色', type: 'input' },
      { key: 'trigger', label: '触发单据', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-cfg-version': [
      { key: 'flow', label: '流程名称', type: 'input', required: true },
      { key: 'version', label: '版本号', type: 'input' },
      { key: 'content', label: '修订内容', type: 'input' },
      { key: 'operator', label: '修订人', type: 'input' },
      { key: 'time', label: '修订时间', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['已发布', '草稿', '已停用'] }
    ],
    'system-lib-cat': [
      { key: 'code', label: '分类编码', type: 'input', required: true },
      { key: 'name', label: '分类名称', type: 'input', required: true },
      { key: 'parent', label: '上级分类', type: 'input' },
      { key: 'level', label: '分类层级', type: 'select', options: ['一级', '二级', '三级'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-product': [
      { key: 'code', label: '产品编码', type: 'input', required: true },
      { key: 'name', label: '产品名称', type: 'input', required: true },
      { key: 'cat', label: '所属分类', type: 'select', options: ['鲜切花', '盆花', '种苗', '种球', '组培苗', '土壤', '水样'] },
      { key: 'sampleType', label: '样品类型', type: 'input' },
      { key: 'storage', label: '保存条件', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-project': [
      { key: 'code', label: '项目编码', type: 'input', required: true },
      { key: 'name', label: '项目名称', type: 'input', required: true },
      { key: 'cat', label: '所属分类', type: 'select', options: ['分子检测', '病理检测', '免疫检测', '基因测序'] },
      { key: 'subcat', label: '所属子类', type: 'input' },
      { key: 'unit', label: '计量单位', type: 'input' },
      { key: 'limit', label: '检测限', type: 'input' },
      { key: 'method', label: '检测方法', type: 'input' },
      { key: 'turnaround', label: '检测周期', type: 'input' },
      { key: 'sampleQty', label: '样品用量', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-standard': [
      { key: 'code', label: '标准编号', type: 'input', required: true },
      { key: 'name', label: '标准名称', type: 'input' },
      { key: 'agency', label: '发布机构', type: 'select', options: ['GB/T', 'ISO', '行业标准'] },
      { key: 'category', label: '方法分类', type: 'input' },
      { key: 'year', label: '发布年份', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['在用', '停用'] }
    ],
    'system-lib-line': [
      { key: 'name', label: '生产线名称', type: 'input', required: true },
      { key: 'target', label: '服务方向', type: 'input' },
      { key: 'capacity', label: '日产能', type: 'number' },
      { key: 'projectCount', label: '涉及项目数', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-link': [
      { key: 'product', label: '产品（样品）', type: 'select', options: ['月季鲜切花', '百合鲜切花', '康乃馨鲜切花', '蝴蝶兰盆花', '红掌盆花', '月季种苗', '康乃馨种苗', '百合种球', '兰花组培苗', '栽培基质土壤', '灌溉水样'] },
      { key: 'project', label: '项目名称', type: 'input', required: true },
      { key: 'standard', label: '标准编号', type: 'input' },
      { key: 'name', label: '方法名称', type: 'input' },
      { key: 'type', label: '方法类型', type: 'select', options: ['定性', '定量', '半定量'] },
      { key: 'status', label: '关联状态', type: 'select', options: ['已关联', '未关联'] }
    ],
    'system-env-mproj': [
      { key: 'code', label: '项目编码', type: 'input', required: true },
      { key: 'name', label: '项目名称', type: 'input', required: true },
      { key: 'cat', label: '分类', type: 'select', options: ['嗅探检测', '直读检测', '移动采样'] },
      { key: 'unit', label: '单位', type: 'input' },
      { key: 'limit', label: '检测限', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-vessel': [
      { key: 'code', label: '容器编码', type: 'input', required: true },
      { key: 'name', label: '容器名称', type: 'input', required: true },
      { key: 'capacity', label: '容量', type: 'input' },
      { key: 'material', label: '材质', type: 'select', options: ['塑料', '玻璃', 'PET'] },
      { key: 'projectIds', label: '关联项目', type: 'multiselect', optionsFrom: 'system-env-mproj', optionLabel: 'name', optionValue: 'code', full: true, render: 'projectTags' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-method': [
      { key: 'name', label: '方法名称', type: 'input', required: true },
      { key: 'temp', label: '保存温度', type: 'input' },
      { key: 'timeLimit', label: '保存时限', type: 'input' },
      { key: 'container', label: '容器要求', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-ster': [
      { key: 'name', label: '消毒方式', type: 'input', required: true },
      { key: 'agent', label: '消毒药剂', type: 'input' },
      { key: 'concentration', label: '使用浓度', type: 'input' },
      { key: 'duration', label: '作用时间', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-param': [
      { key: 'name', label: '参数名称', type: 'input', required: true },
      { key: 'unit', label: '单位', type: 'input' },
      { key: 'precision', label: '精度', type: 'input' },
      { key: 'mode', label: '检测模式', type: 'select', options: ['现场', '实验室', '双模式'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-param': [
      { key: 'code', label: '参数编码', type: 'input', required: true },
      { key: 'name', label: '参数名称', type: 'input', required: true },
      { key: 'value', label: '参数值', type: 'input', required: true },
      { key: 'unit', label: '单位', type: 'input' },
      { key: 'category', label: '参数分类', type: 'select', options: ['系统参数', '业务参数', '安全参数', '性能参数'] },
      { key: 'remark', label: '说明', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-notify': [
      { key: 'code', label: '模板编码', type: 'input', required: true },
      { key: 'name', label: '通知名称', type: 'input', required: true },
      { key: 'channel', label: '通知渠道', type: 'select', options: ['站内信', '邮件', '短信', '微信', '钉钉'] },
      { key: 'trigger', label: '触发事件', type: 'input' },
      { key: 'receiver', label: '接收对象', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-backup': [
      { key: 'code', label: '任务编码', type: 'input', required: true },
      { key: 'name', label: '备份任务', type: 'input', required: true },
      { key: 'type', label: '备份类型', type: 'select', options: ['全量备份', '增量备份', '差异备份', '日志备份'] },
      { key: 'cycle', label: '执行周期', type: 'input' },
      { key: 'size', label: '备份大小', type: 'input' },
      { key: 'lastTime', label: '最近执行', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-archive': [
      { key: 'code', label: '策略编码', type: 'input', required: true },
      { key: 'name', label: '归档策略', type: 'input', required: true },
      { key: 'target', label: '归档对象', type: 'input' },
      { key: 'trigger', label: '触发条件', type: 'input' },
      { key: 'retention', label: '保留期限', type: 'input' },
      { key: 'storage', label: '存储位置', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-log': [
      { key: 'code', label: '日志编号', type: 'input', required: true },
      { key: 'type', label: '日志类型', type: 'select', options: ['操作日志', '系统日志', '异常日志', '安全日志', '性能日志'] },
      { key: 'user', label: '操作用户', type: 'input' },
      { key: 'module', label: '功能模块', type: 'input' },
      { key: 'ip', label: 'IP地址', type: 'input' },
      { key: 'time', label: '记录时间', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['正常', '异常'] }
    ],
    'system-set-device': [
      { key: 'code', label: '设备编码', type: 'input', required: true },
      { key: 'name', label: '设备名称', type: 'input', required: true },
      { key: 'deviceType', label: '设备类型', type: 'select', options: ['色谱仪', '质谱仪', '光谱仪', 'PCR仪', '测序仪', '显微镜'] },
      { key: 'vendor', label: '设备厂商', type: 'input' },
      { key: 'connectType', label: '连接方式', type: 'select', options: ['TCP/IP', '串口', 'USB', '蓝牙', 'Wi-Fi'] },
      { key: 'port', label: '端口/串口号', type: 'input' },
      { key: 'policy', label: '采集策略', type: 'select', options: ['实时采集', '定时采集', '手动采集', '触发采集'] },
      { key: 'connectStatus', label: '连接状态', type: 'select', options: ['在线', '离线', '告警'] },
      { key: 'progress', label: '采集进度%', type: 'number' },
      { key: 'lastTime', label: '最近采集时间', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-pdf': [
      { key: 'code', label: '规则编码', type: 'input', required: true },
      { key: 'name', label: '规则名称', type: 'input', required: true },
      { key: 'template', label: '解析模板', type: 'input' },
      { key: 'vendor', label: '来源厂商', type: 'input' },
      { key: 'parseMode', label: '解析方式', type: 'select', options: ['文本提取', '表格解析', '区域识别', '混合解析'] },
      { key: 'keyword', label: '匹配关键词', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-protocol': [
      { key: 'code', label: '协议编码', type: 'input', required: true },
      { key: 'name', label: '协议名称', type: 'input', required: true },
      { key: 'vendor', label: '设备厂商', type: 'input' },
      { key: 'transport', label: '协议标准', type: 'select', options: ['ASTM', 'HL7', 'RS232', 'TCP', 'LIS', 'LOINC'] },
      { key: 'endpoint', label: '接入方式', type: 'input' },
      { key: 'targetTable', label: '入库表', type: 'input' },
      { key: 'lastTime', label: '最近抓取时间', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-form': [
      { key: 'code', label: '模板编码', type: 'input', required: true },
      { key: 'name', label: '表单名称', type: 'input', required: true },
      { key: 'doc', label: '关联单据', type: 'select', options: ['委托单', '抽样单', '接样单', '报告单', '质控单'] },
      { key: 'fields', label: '字段数', type: 'number' },
      { key: 'version', label: '版本', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-column': [
      { key: 'code', label: '配置编码', type: 'input', required: true },
      { key: 'module', label: '所属模块', type: 'input', required: true },
      { key: 'group', label: '模块分类', type: 'select', options: ['业务模块', '质量模块', '系统模块', '统计模块'] },
      { key: 'cols', label: '列数量', type: 'number' },
      { key: 'visible', label: '显示列', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-report': [
      { key: 'code', label: '样式编码', type: 'input', required: true },
      { key: 'name', label: '报表名称', type: 'input', required: true },
      { key: 'type', label: '报表类型', type: 'select', options: ['检测报告', '样品标签', '质控图表', '统计报表', '标签打印'] },
      { key: 'size', label: '纸张尺寸', type: 'input' },
      { key: 'version', label: '版本', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-query': [
      { key: 'code', label: '配置编码', type: 'input', required: true },
      { key: 'name', label: '查询名称', type: 'input', required: true },
      { key: 'type', label: '类型', type: 'select', options: ['统计图表', '汇总表格', '导出表格', '趋势看板'] },
      { key: 'source', label: '数据来源', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-home': [
      { key: 'code', label: '模块编码', type: 'input', required: true },
      { key: 'name', label: '模块名称', type: 'input', required: true },
      { key: 'cat', label: '模块分类', type: 'select', options: ['快捷入口', '数据看板', '待办事项', '消息通知'] },
      { key: 'pos', label: '布局位置', type: 'input' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'quality-corrective-apply': [
      { key: 'id', label: '申请编号', type: 'input', required: true },
      { key: 'problem', label: '整改事项', type: 'input', required: true },
      { key: 'source', label: '来源', type: 'select', options: RCT_SOURCE },
      { key: 'level', label: '严重程度', type: 'select', options: RCT_LEVEL },
      { key: 'applicant', label: '申请人', type: 'input' },
      { key: 'date', label: '申请日期', type: 'date' },
      { key: 'dept', label: '责任部门', type: 'input' },
      { key: 'deadline', label: '整改期限', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: RCT_APPLY_STATUS }
    ],
    'quality-corrective-analysis': [
      { key: 'id', label: '分析编号', type: 'input', required: true },
      { key: 'applyNo', label: '关联申请', type: 'input' },
      { key: 'method', label: '分析方法', type: 'select', options: RCT_ANALYSIS_METHOD },
      { key: 'rootCause', label: '根本原因', type: 'textarea', full: true },
      { key: 'analyst', label: '分析人', type: 'input' },
      { key: 'date', label: '分析日期', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: RCT_ANALYSIS_STATUS }
    ],
    'quality-corrective-measure': [
      { key: 'id', label: '措施编号', type: 'input', required: true },
      { key: 'applyNo', label: '关联申请', type: 'input' },
      { key: 'type', label: '措施类型', type: 'select', options: RCT_MEASURE_TYPE },
      { key: 'measure', label: '纠正措施', type: 'textarea', full: true },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'deadline', label: '计划完成时间', type: 'date' },
      { key: 'result', label: '实施结果', type: 'textarea', full: true },
      { key: 'status', label: '状态', type: 'select', options: RCT_MEASURE_STATUS }
    ],
    'quality-corrective-verify': [
      { key: 'id', label: '验证编号', type: 'input', required: true },
      { key: 'applyNo', label: '关联申请', type: 'input' },
      { key: 'verifier', label: '验证人', type: 'input' },
      { key: 'date', label: '验证日期', type: 'date' },
      { key: 'method', label: '验证方式', type: 'select', options: RCT_VERIFY_METHOD },
      { key: 'result', label: '验证结果', type: 'select', options: RCT_VERIFY_RESULT },
      { key: 'conclusion', label: '验证结论', type: 'textarea', full: true },
      { key: 'status', label: '状态', type: 'select', options: RCT_VERIFY_STATUS }
    ],
    'quality-corrective-audit': [
      { key: 'id', label: '审核编号', type: 'input', required: true },
      { key: 'applyNo', label: '关联申请', type: 'input' },
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'date', label: '审核日期', type: 'date' },
      { key: 'opinion', label: '审核意见', type: 'textarea', full: true },
      { key: 'result', label: '审核结论', type: 'select', options: RCT_VERIFY_RESULT },
      { key: 'status', label: '状态', type: 'select', options: RCT_AUDIT_STATUS }
    ],
    'quality-corrective-ledger': [
      { key: 'id', label: '台账编号', type: 'input', required: true },
      { key: 'applyNo', label: '关联申请', type: 'input' },
      { key: 'problem', label: '整改事项', type: 'input' },
      { key: 'source', label: '来源', type: 'select', options: RCT_SOURCE },
      { key: 'dept', label: '责任部门', type: 'input' },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'deadline', label: '整改期限', type: 'date' },
      { key: 'finishDate', label: '完成日期', type: 'date' },
      { key: 'verify', label: '验证结果', type: 'select', options: ['通过', '不通过', '待验证'] },
      { key: 'status', label: '状态', type: 'select', options: RCT_LEDGER_STATUS }
    ],
    'training-plan': [
      { key: 'id', label: '计划编号', type: 'input', required: true },
      { key: 'name', label: '培训主题', type: 'input', required: true },
      { key: 'type', label: '培训类型', type: 'select', options: ['内训', '外训'] },
      { key: 'time', label: '计划时间', type: 'input', placeholder: '如 2026.03 - 2026.04' },
      { key: 'hours', label: '课时', type: 'number' },
      { key: 'teacher', label: '讲师', type: 'input' },
      { key: 'target', label: '培训对象', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['待审批', '已审批', '进行中', '已完成'] }
    ],
    'training-implement': [
      { key: 'id', label: '班次编号', type: 'input', required: true },
      { key: 'name', label: '培训班名称', type: 'input', required: true },
      { key: 'method', label: '培训方式', type: 'select', options: ['理论', '实操', '线上线下'] },
      { key: 'date', label: '培训日期', type: 'date' },
      { key: 'teacher', label: '讲师', type: 'input' },
      { key: 'count', label: '报名人数', type: 'number' },
      { key: 'rate', label: '签到率(%)', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['进行中', '已完成', '待开始'] }
    ],
    'training-exam': [
      { key: 'id', label: '考核编号', type: 'input', required: true },
      { key: 'name', label: '考核名称', type: 'input', required: true },
      { key: 'method', label: '考核方式', type: 'select', options: ['理论考试', '实操考核'] },
      { key: 'training', label: '关联培训', type: 'input' },
      { key: 'date', label: '考核时间', type: 'date' },
      { key: 'count', label: '参考人数', type: 'number' },
      { key: 'pass', label: '及格率(%)', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: ['进行中', '已完成', '待开始'] }
    ],
    'training-certificate': [
      { key: 'id', label: '证书编号', type: 'input', required: true },
      { key: 'name', label: '持证人', type: 'input', required: true },
      { key: 'type', label: '证书类型', type: 'select', options: ['培训合格证', '上岗证', '能力验证证书', '检测报告授权证'] },
      { key: 'issueDate', label: '发证日期', type: 'date' },
      { key: 'expireDate', label: '有效期至', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: CERT_STATUS }
    ],
    'knowledge-center': [
      { key: 'name', label: '知识标题', type: 'input', required: true },
      { key: 'category', label: '分类', type: 'select', options: ['操作手册', '标准规范', '质控指南', '仪器维护', '安全防护', '经验总结'] },
      { key: 'content', label: '知识内容', type: 'textarea', required: true, full: true }
    ],
    'quality-system-doc': [
      { key: 'code', label: '文件编号', type: 'input', required: true },
      { key: 'name', label: '文件名称', type: 'input', required: true },
      { key: 'cat', label: '文件分类', type: 'select', options: ['质量手册', '程序文件', '作业指导书', '质量记录', '表格模板', '外来文件'] },
      { key: 'sub', label: '所属目录', type: 'input', placeholder: '程序文件/作业指导书必填' },
      { key: 'version', label: '版本号', type: 'input', placeholder: '如：A/1' },
      { key: 'status', label: '状态', type: 'select', options: ['草稿', '待审批', '已发布', '已作废'] },
      { key: 'controlled', label: '受控状态', type: 'select', options: ['受控', '非受控'] },
      { key: 'controlNo', label: '受控号', type: 'input', placeholder: '受控文件填写' },
      { key: 'author', label: '编制人', type: 'input' },
      { key: 'reviseDesc', label: '本次修订说明', type: 'textarea', full: true, placeholder: '填写后保存将自动生成新版本记录' },
      { key: 'content', label: '文件内容', type: 'textarea', full: true }
    ],
    'quality-corrective-extra': [],
    'stat-query': []
  };

  /* ---------- 各页面搜索字段 ---------- */
  var SEARCH = {
    'research-project': [
      { key: 'name', label: '项目名称', type: 'input' },
      { key: 'type', label: '项目类型', type: 'select', options: FIELDS['research-project'][2].options },
      { key: 'status', label: '状态', type: 'select', options: PROJ_STATUS }
    ],
    'research-experiment': [
      { key: 'name', label: '实验名称', type: 'input' },
      { key: 'type', label: '类型', type: 'select', options: ['实验记录', '科研样品', '测序项目', '实验模板'] },
      { key: 'status', label: '数据状态', type: 'select', options: ['记录中', '已完成', '待开始'] }
    ],
    'research-result': [
      { key: 'name', label: '成果名称', type: 'input' },
      { key: 'type', label: '类型', type: 'select', options: ['学术论文', '发明专利', '获奖成果', '成果转化'] },
      { key: 'status', label: '状态', type: 'select', options: ['已登记', '已审核', '待审核'] }
    ],
    'research-cooperation': [
      { key: 'name', label: '名称/主题', type: 'input' },
      { key: 'type', label: '类型', type: 'select', options: ['合作协议', '学术交流', '培训讲座', '技术服务', '平台共建'] },
      { key: 'status', label: '状态', type: 'select', options: ['进行中', '已完成', '待开始'] }
    ],
    'quality-review-plan-mgmt': [
      { key: 'name', label: '计划名称', type: 'input' },
      { key: 'type', label: '计划类型', type: 'select', options: ['年度计划', '季度计划', '专项计划', '临时计划'] },
      { key: 'status', label: '状态', type: 'select', options: ['待审批', '已审批', '已发布', '已废止'] }
    ],
    'quality-review': [
      { key: 'name', label: '评审主题', type: 'input' },
      { key: 'type', label: '评审类型', type: 'select', options: ['管理评审', '质量评审', '专项评审'] },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-review-plan-exec': [
      { key: 'task', label: '执行任务', type: 'input' },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['未开始', '进行中', '已完成', '已延期'] }
    ],
    'quality-review-input': [
      { key: 'name', label: '资料名称', type: 'input' },
      { key: 'type', label: '资料类别', type: 'select', options: ['质量方针与目标', '检测工作量', '人员能力', '资源配置', '设施环境', '设备状况', '内外审核结果', '投诉与反馈', '能力验证结果', '改进建议'] },
      { key: 'status', label: '收集状态', type: 'select', options: ['待收集', '已收集', '收集完成'] }
    ],
    'quality-review-meeting': [
      { key: 'name', label: '会议主题', type: 'input' },
      { key: 'host', label: '主持人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['待召开', '进行中', '已完成'] }
    ],
    'quality-review-report': [
      { key: 'name', label: '报告名称', type: 'input' },
      { key: 'author', label: '编制人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['编制中', '已提交', '已批准'] }
    ],
    'quality-review-rectify': [
      { key: 'reason', label: '整改事项', type: 'input' },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit': [
      { key: 'name', label: '内审主题', type: 'input' },
      { key: 'type', label: '审核类型', type: 'select', options: ['要素审核', '部门审核', '专项审核'] },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-clause-element': [
      { key: 'element', label: '审核要素', type: 'select', options: AUDIT_ELEMENTS },
      { key: 'standard', label: '依据标准', type: 'select', options: ['ISO/IEC 17025', 'RB/T 214-2017', 'CNAS-CL01'] },
      { key: 'status', label: '条款状态', type: 'select', options: ['有效', '修订中', '废止'] }
    ],
    'quality-audit-clause-dept': [
      { key: 'dept', label: '受审部门', type: 'select', options: AUDIT_DEPTS },
      { key: 'element', label: '对应要素', type: 'select', options: AUDIT_ELEMENTS },
      { key: 'status', label: '条款状态', type: 'select', options: ['有效', '修订中', '废止'] }
    ],
    'quality-audit-year': [
      { key: 'name', label: '计划名称', type: 'input' },
      { key: 'scope', label: '覆盖范围', type: 'select', options: ['全要素全部门', '重点要素', '新增项目', '监督性内审'] },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-plan': [
      { key: 'name', label: '内审项目', type: 'input' },
      { key: 'type', label: '审核类型', type: 'select', options: ['要素审核', '部门审核', '专项审核'] },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-meeting': [
      { key: 'name', label: '会议名称', type: 'input' },
      { key: 'type', label: '会议类型', type: 'select', options: ['首次会议', '审核组内部会议', '末次会议'] },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-audit-checklist': [
      { key: 'audit', label: '关联内审', type: 'input' },
      { key: 'element', label: '审核要素', type: 'select', options: AUDIT_ELEMENTS },
      { key: 'result', label: '检查结果', type: 'select', options: ['符合', '不符合', '观察项', '不适用'] }
    ],
    'quality-audit-nc': [
      { key: 'audit', label: '关联内审', type: 'input' },
      { key: 'level', label: '严重程度', type: 'select', options: ['严重', '一般', '观察项'] },
      { key: 'status', label: '状态', type: 'select', options: ['待整改', '整改中', '已完成', '已关闭'] }
    ],
    'quality-audit-rectify': [
      { key: 'reason', label: '整改事项', type: 'input' },
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['整改中', '已完成', '已验证'] }
    ],
    'quality-audit-report': [
      { key: 'name', label: '报告名称', type: 'input' },
      { key: 'author', label: '编制人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['编制中', '已提交', '已批准'] }
    ],
    'quality-supervise': [
      { key: 'type', label: '监督类型', type: 'select', options: ['周期性监督', '日常监督', '专项监督'] },
      { key: 'leader', label: '监督员', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-supervise-plan-periodic': [
      { key: 'name', label: '计划名称', type: 'input' },
      { key: 'cycle', label: '监督周期', type: 'select', options: ['月度', '季度', '半年', '年度'] },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-supervise-plan-special': [
      { key: 'name', label: '专项监督名称', type: 'input' },
      { key: 'object', label: '监督项目', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-supervise-task': [
      { key: 'name', label: '任务名称', type: 'input' },
      { key: 'target', label: '监督对象', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QS_TASK_STATUS }
    ],
    'quality-supervise-record': [
      { key: 'target', label: '被监督对象', type: 'input' },
      { key: 'method', label: '监督方式', type: 'select', options: QS_METHODS },
      { key: 'status', label: '状态', type: 'select', options: ['待评价', '已记录'] }
    ],
    'quality-supervise-eval': [
      { key: 'target', label: '被监督对象', type: 'input' },
      { key: 'judge', label: '评价人', type: 'input' },
      { key: 'result', label: '评价结果', type: 'select', options: QS_EVAL_RESULT }
    ],
    'quality-supervise-audit': [
      { key: 'target', label: '监督对象', type: 'input' },
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QS_AUDIT_STATUS }
    ],
    'quality-supervise-stat': [
      { key: 'period', label: '统计期间', type: 'input' },
      { key: 'type', label: '监督类别', type: 'select', options: QS_PLAN_TYPE }
    ],
    'quality-supervise-upload': [
      { key: 'plan', label: '关联计划', type: 'input' },
      { key: 'submitter', label: '提交人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['草稿', '待审核', '已通过', '已驳回'] }
    ],
    'quality-control-plan-internal': [
      { key: 'name', label: '质控项目', type: 'input' },
      { key: 'freq', label: '质控频次', type: 'select', options: QC_FREQ },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-plan-parallel': [
      { key: 'name', label: '计划名称', type: 'input' },
      { key: 'sample', label: '样本类型', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-plan-blank': [
      { key: 'name', label: '计划名称', type: 'input' },
      { key: 'sample', label: '空白基质', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-plan-recovery': [
      { key: 'name', label: '计划名称', type: 'input' },
      { key: 'sample', label: '样本基质', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-control-task': [
      { key: 'name', label: '任务名称', type: 'input' },
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QS_TASK_STATUS }
    ],
    'quality-control-data': [
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'batch', label: '批次', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QC_DATA_STATUS }
    ],
    'quality-control-eval': [
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'rule', label: '违例规则', type: 'select', options: QC_EVAL_RULES },
      { key: 'result', label: '评价结果', type: 'select', options: QC_CONTROL_STATUS }
    ],
    'quality-control-audit': [
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QS_AUDIT_STATUS }
    ],
    'quality-control-nc': [
      { key: 'project', label: '检测项目', type: 'input' },
      { key: 'handle', label: '纠正措施', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QC_NC_STATUS }
    ],
    'quality-control-stat': [
      { key: 'period', label: '统计期间', type: 'input' },
      { key: 'project', label: '检测项目', type: 'input' }
    ],
    'quality-proficiency-plan-pt': [
      { key: 'name', label: 'PT计划名称', type: 'input' },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-proficiency-plan-compare': [
      { key: 'name', label: '比对计划名称', type: 'input' },
      { key: 'partner', label: '比对实验室', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: AUDIT_STATUS }
    ],
    'quality-proficiency-signup': [
      { key: 'item', label: '参加项目', type: 'select', options: PT_ITEMS },
      { key: 'applicant', label: '报名人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: PT_SIGNUP_STATUS }
    ],
    'quality-proficiency-record': [
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'code', label: '样品编号', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['进行中', '已完成'] }
    ],
    'quality-proficiency-review': [
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'reviewer', label: '评审人', type: 'input' },
      { key: 'evaluation', label: '能力评定', type: 'select', options: PT_EVAL_RESULT }
    ],
    'quality-proficiency-audit': [
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: QS_AUDIT_STATUS }
    ],
    'quality-proficiency-stat': [
      { key: 'period', label: '统计期间', type: 'input' },
      { key: 'org', label: '组织机构', type: 'select', options: PT_ORGS }
    ],
    'quality-complaint-register': [
      { key: 'title', label: '投诉标题', type: 'input' },
      { key: 'level', label: '重要程度', type: 'select', options: CPT_LEVEL },
      { key: 'status', label: '状态', type: 'select', options: CPT_STATUS }
    ],
    'quality-complaint-investigate': [
      { key: 'investigator', label: '调查人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: CPT_INV_STATUS }
    ],
    'quality-complaint-handle': [
      { key: 'leader', label: '处理人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: CPT_HANDLE_STATUS }
    ],
    'quality-complaint-feedback': [
      { key: 'satisfaction', label: '满意度', type: 'select', options: CPT_SATISFY },
      { key: 'status', label: '状态', type: 'select', options: CPT_FB_STATUS }
    ],
    'quality-complaint-stat': [
      { key: 'month', label: '月份', type: 'input' }
    ],
    'quality-proficiency-rectify': [
      { key: 'item', label: '检测项目', type: 'select', options: PT_ITEMS },
      { key: 'result', label: '原评定结果', type: 'select', options: PT_EVAL_RESULT },
      { key: 'status', label: '状态', type: 'select', options: PT_RECTIFY_STATUS }
    ],
    'system-org-dept': [
      { key: 'name', label: '机构名称', type: 'input' },
      { key: 'type', label: '机构类型', type: 'select', options: ['检测实验室', '管理部门', '辅助部门', '派出机构'] },
      { key: 'status', label: '状态', type: 'select', options: ['在用', '停用'] }
    ],
    'system-org-position': [
      { key: 'name', label: '岗位名称', type: 'input' },
      { key: 'cat', label: '岗位类别', type: 'select', options: ['管理岗', '技术岗', '辅助岗', '关键岗位'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-org-person': [
      { key: 'name', label: '姓名', type: 'input' },
      { key: 'dept', label: '所属部门', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['在职', '借调', '离职'] }
    ],
    'system-org-holiday': [
      { key: 'name', label: '节日名称', type: 'input' },
      { key: 'type', label: '类型', type: 'select', options: ['法定假日', '调休日', '公司假日', '周末'] }
    ],
    'system-org-workcal': [
      { key: 'year', label: '年度', type: 'select', options: ['2025', '2026', '2027'] },
      { key: 'status', label: '状态', type: 'select', options: ['已发布', '草稿'] }
    ],
    'system-perm-user': [
      { key: 'name', label: '姓名', type: 'input' },
      { key: 'role', label: '角色', type: 'select', options: ['系统管理员', '实验室主管', '检测分析师', '质量管理员'] },
      { key: 'status', label: '状态', type: 'select', options: ['正常', '禁用'] }
    ],
    'system-perm-role': [
      { key: 'name', label: '角色名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-perm-config': [
      { key: 'module', label: '模块名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-perm-oplog': [
      { key: 'user', label: '操作人', type: 'input' },
      { key: 'result', label: '结果', type: 'select', options: ['成功', '失败'] }
    ],
    'system-perm-login': [
      { key: 'user', label: '登录账号', type: 'input' },
      { key: 'status', label: '结果', type: 'select', options: ['成功', '失败'] }
    ],
    'system-dict-type': [
      { key: 'name', label: '字典名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-dict-char': [
      { key: 'name', label: '字符名称', type: 'input' },
      { key: 'category', label: '分类', type: 'select', options: ['状态标记', '权限标记', '检测术语', '报告术语'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-dict-enum': [
      { key: 'name', label: '显示名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-num-report': [
      { key: 'name', label: '规则名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-num-sample': [
      { key: 'name', label: '规则名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-num-task': [
      { key: 'name', label: '规则名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-num-other': [
      { key: 'name', label: '规则名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-cfg-flow': [
      { key: 'step', label: '步骤名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-cfg-line': [
      { key: 'name', label: '生产线名称', type: 'input' },
      { key: 'dept', label: '负责科室', type: 'select', options: ['分子检测科', '免疫检测科', '病理科', '基因测序科'] },
      { key: 'type', label: '适用检测类型', type: 'select', options: ['分子检测', '免疫检测', '病理检测', '基因测序'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-cfg-approve': [
      { key: 'name', label: '流程名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-cfg-version': [
      { key: 'flow', label: '流程名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['已发布', '草稿', '已停用'] }
    ],
    'quality-corrective-apply': [
      { key: 'problem', label: '整改事项', type: 'input' },
      { key: 'level', label: '严重程度', type: 'select', options: RCT_LEVEL },
      { key: 'status', label: '状态', type: 'select', options: RCT_APPLY_STATUS }
    ],
    'quality-corrective-analysis': [
      { key: 'analyst', label: '分析人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: RCT_ANALYSIS_STATUS }
    ],
    'quality-corrective-measure': [
      { key: 'leader', label: '责任人', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: RCT_MEASURE_STATUS }
    ],
    'quality-corrective-verify': [
      { key: 'verifier', label: '验证人', type: 'input' },
      { key: 'result', label: '验证结果', type: 'select', options: RCT_VERIFY_RESULT },
      { key: 'status', label: '状态', type: 'select', options: RCT_VERIFY_STATUS }
    ],
    'quality-corrective-audit': [
      { key: 'auditor', label: '审核人', type: 'input' },
      { key: 'result', label: '审核结论', type: 'select', options: RCT_VERIFY_RESULT },
      { key: 'status', label: '状态', type: 'select', options: RCT_AUDIT_STATUS }
    ],
    'quality-corrective-ledger': [
      { key: 'problem', label: '整改事项', type: 'input' },
      { key: 'source', label: '来源', type: 'select', options: RCT_SOURCE },
      { key: 'status', label: '状态', type: 'select', options: RCT_LEDGER_STATUS }
    ],
    'quality-control': [
      { key: 'name', label: '项目名称', type: 'input' },
      { key: 'type', label: '类型', type: 'select', options: ['室内质控', '室间质控'] },
      { key: 'status', label: '状态', type: 'select', options: ['待开始', '进行中', '已完成'] },
      { key: 'eval', label: '结果评价', type: 'select', options: QC_STATUS }
    ],
    'quality-proficiency': [
      { key: 'name', label: '验证项目', type: 'input' },
      { key: 'result', label: '结果评定', type: 'select', options: ['满意', '不满意', '有问题'] },
      { key: 'rectify', label: '整改状态', type: 'select', options: ['未要求', '完成', '整改中'] }
    ],
    'training-plan': [
      { key: 'name', label: '培训主题', type: 'input' },
      { key: 'type', label: '培训类型', type: 'select', options: ['内训', '外训'] },
      { key: 'status', label: '状态', type: 'select', options: ['待审批', '已审批', '进行中', '已完成'] }
    ],
    'training-certificate': [
      { key: 'name', label: '持证人', type: 'input' },
      { key: 'type', label: '证书类型', type: 'select', options: ['培训合格证', '上岗证', '能力验证证书', '检测报告授权证'] },
      { key: 'status', label: '状态', type: 'select', options: CERT_STATUS }
    ],
    'system-lib-cat': [
      { key: 'name', label: '分类名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-product': [
      { key: 'name', label: '产品名称', type: 'input' },
      { key: 'cat', label: '所属分类', type: 'select', options: ['鲜切花', '盆花', '种苗', '种球', '组培苗', '土壤', '水样'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-project': [
      { key: 'name', label: '项目名称', type: 'input' },
      { key: 'cat', label: '所属分类', type: 'select', options: ['分子检测', '免疫检测', '病理检测', '基因测序'] },
      { key: 'subcat', label: '所属子类', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-standard': [
      { key: 'name', label: '标准名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['在用', '停用'] }
    ],
    'system-lib-line': [
      { key: 'name', label: '生产线名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-lib-link': [
      { key: 'product', label: '产品（样品）', type: 'select', options: ['月季鲜切花', '百合鲜切花', '康乃馨鲜切花', '蝴蝶兰盆花', '红掌盆花', '月季种苗', '康乃馨种苗', '百合种球', '兰花组培苗', '栽培基质土壤', '灌溉水样'] },
      { key: 'project', label: '项目名称', type: 'input' },
      { key: 'status', label: '关联状态', type: 'select', options: ['已关联', '未关联'] }
    ],
    'system-env-mproj': [
      { key: 'name', label: '项目名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-vessel': [
      { key: 'name', label: '容器名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-method': [
      { key: 'name', label: '方法名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-ster': [
      { key: 'name', label: '消毒方式', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-env-param': [
      { key: 'name', label: '参数名称', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-param': [
      { key: 'name', label: '参数名称', type: 'input' },
      { key: 'category', label: '参数分类', type: 'select', options: ['系统参数', '业务参数', '安全参数', '性能参数'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-notify': [
      { key: 'name', label: '通知名称', type: 'input' },
      { key: 'channel', label: '通知渠道', type: 'select', options: ['站内信', '邮件', '短信', '微信', '钉钉'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-backup': [
      { key: 'name', label: '备份任务', type: 'input' },
      { key: 'type', label: '备份类型', type: 'select', options: ['全量备份', '增量备份', '差异备份', '日志备份'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-archive': [
      { key: 'name', label: '归档策略', type: 'input' },
      { key: 'target', label: '归档对象', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-log': [
      { key: 'type', label: '日志类型', type: 'select', options: ['操作日志', '系统日志', '异常日志', '安全日志', '性能日志'] },
      { key: 'user', label: '操作用户', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['正常', '异常'] }
    ],
    'system-set-device': [
      { key: 'name', label: '设备名称', type: 'input' },
      { key: 'deviceType', label: '设备类型', type: 'select', options: ['色谱仪', '质谱仪', '光谱仪', 'PCR仪', '测序仪', '显微镜'] },
      { key: 'connectStatus', label: '连接状态', type: 'select', options: ['在线', '离线', '告警'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-pdf': [
      { key: 'name', label: '规则名称', type: 'input' },
      { key: 'vendor', label: '来源厂商', type: 'input' },
      { key: 'parseMode', label: '解析方式', type: 'select', options: ['文本提取', '表格解析', '区域识别', '混合解析'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-set-protocol': [
      { key: 'name', label: '协议名称', type: 'input' },
      { key: 'vendor', label: '设备厂商', type: 'input' },
      { key: 'transport', label: '协议标准', type: 'select', options: ['ASTM', 'HL7', 'RS232', 'TCP', 'LIS', 'LOINC'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-form': [
      { key: 'name', label: '表单名称', type: 'input' },
      { key: 'doc', label: '关联单据', type: 'select', options: ['委托单', '抽样单', '接样单', '报告单', '质控单'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-column': [
      { key: 'module', label: '所属模块', type: 'input' },
      { key: 'group', label: '模块分类', type: 'select', options: ['业务模块', '质量模块', '系统模块', '统计模块'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-report': [
      { key: 'name', label: '报表名称', type: 'input' },
      { key: 'type', label: '报表类型', type: 'select', options: ['检测报告', '样品标签', '质控图表', '统计报表', '标签打印'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-query': [
      { key: 'name', label: '查询名称', type: 'input' },
      { key: 'type', label: '类型', type: 'select', options: ['统计图表', '汇总表格', '导出表格', '趋势看板'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'system-ui-home': [
      { key: 'name', label: '模块名称', type: 'input' },
      { key: 'cat', label: '模块分类', type: 'select', options: ['快捷入口', '数据看板', '待办事项', '消息通知'] },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用'] }
    ],
    'stat-query': [
      { key: 'org', label: '委托单位', type: 'input' },
      { key: 'item', label: '检测项目', type: 'input' },
      { key: 'status', label: '状态', type: 'select', options: ['已完成', '进行中', '待受理', '待出具报告'] }
    ]
  };

  /* ---------- 各页面详情字段配置（覆盖通用展示） ---------- */
  var DETAIL = {
    'research-project': {
      title: '科研项目详情',
      fields: [
        { key: 'id', label: '项目编号' }, { key: 'name', label: '项目名称' }, { key: 'type', label: '项目类型' },
        { key: 'leader', label: '负责人' }, { key: 'period', label: '起止时间' }, { key: 'budget', label: '经费' },
        { key: 'percent', label: '进度', render: 'percent' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'research-experiment': {
      fields: [
        { key: 'id', label: '实验编号' }, { key: 'name', label: '实验名称' }, { key: 'type', label: '类型' },
        { key: 'project', label: '关联项目' }, { key: 'leader', label: '负责人' },
        { key: 'count', label: '样品数' }, { key: 'status', label: '数据状态', tag: true }
      ]
    },
    'research-result': {
      fields: [
        { key: 'id', label: '成果编号' }, { key: 'name', label: '成果名称' }, { key: 'type', label: '类型' },
        { key: 'owner', label: '第一完成人' }, { key: 'date', label: '登记日期' },
        { key: 'level', label: '级别' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'research-cooperation': {
      fields: [
        { key: 'id', label: '编号' }, { key: 'name', label: '名称/主题' }, { key: 'type', label: '类型' },
        { key: 'partner', label: '合作单位/对象' }, { key: 'leader', label: '负责人' },
        { key: 'time', label: '时间' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-review-plan-mgmt': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '计划名称' }, { key: 'type', label: '计划类型' },
        { key: 'period', label: '评审周期' }, { key: 'maker', label: '编制人' }, { key: 'makeDate', label: '编制日期' },
        { key: 'approver', label: '审批人' }, { key: 'approveDate', label: '审批日期' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-review': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '评审主题' }, { key: 'type', label: '评审类型' },
        { key: 'date', label: '评审日期' }, { key: 'host', label: '主持人' },
        { key: 'count', label: '参加人数' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-review-plan-exec': {
      fields: [
        { key: 'id', label: '执行编号' }, { key: 'plan', label: '关联计划' }, { key: 'task', label: '执行任务' },
        { key: 'leader', label: '责任人' }, { key: 'dept', label: '责任部门' },
        { key: 'startDate', label: '开始日期' }, { key: 'endDate', label: '结束日期' },
        { key: 'progress', label: '完成进度(%)' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-review-input': {
      fields: [
        { key: 'id', label: '资料编号' }, { key: 'name', label: '资料名称' }, { key: 'type', label: '资料类别' },
        { key: 'dept', label: '责任部门' }, { key: 'collector', label: '收集人' },
        { key: 'deadline', label: '截止日期' }, { key: 'status', label: '收集状态', tag: true }
      ]
    },
    'quality-review-meeting': {
      fields: [
        { key: 'id', label: '会议编号' }, { key: 'name', label: '会议主题' }, { key: 'location', label: '会议地点' },
        { key: 'time', label: '召开时间' }, { key: 'host', label: '主持人' }, { key: 'count', label: '参会人数' },
        { key: 'minutes', label: '会议纪要', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-review-report': {
      fields: [
        { key: 'id', label: '报告编号' }, { key: 'name', label: '报告名称' }, { key: 'plan', label: '关联计划' },
        { key: 'author', label: '编制人' }, { key: 'date', label: '编制日期' },
        { key: 'approver', label: '批准人' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-review-rectify': {
      fields: [
        { key: 'id', label: '整改编号' }, { key: 'plan', label: '关联评审计划' }, { key: 'reason', label: '整改事项' },
        { key: 'requirement', label: '整改要求', full: true }, { key: 'leader', label: '责任人' },
        { key: 'deadline', label: '整改期限' }, { key: 'status', label: '状态', tag: true },
        { key: 'verify', label: '验证结果', tag: true }
      ]
    },
    'quality-audit': {
      progress: true,
      fields: [
        { key: 'id', label: '审核编号' }, { key: 'name', label: '内审主题' }, { key: 'type', label: '审核类型' },
        { key: 'date', label: '审核日期' }, { key: 'leader', label: '审核组长' },
        { key: 'nc', label: '不符合项' }, { key: 'percent', label: '完成率', render: 'percent' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-audit-clause-element': {
      fields: [
        { key: 'id', label: '条款编号' }, { key: 'element', label: '审核要素' }, { key: 'standard', label: '依据标准' },
        { key: 'content', label: '条款要求', full: true }, { key: 'point', label: '审核要点', full: true },
        { key: 'status', label: '条款状态', tag: true }
      ]
    },
    'quality-audit-clause-dept': {
      fields: [
        { key: 'id', label: '条款编号' }, { key: 'dept', label: '受审部门' }, { key: 'element', label: '对应要素' },
        { key: 'duty', label: '部门职责要点', full: true }, { key: 'content', label: '审核要点内容', full: true },
        { key: 'status', label: '条款状态', tag: true }
      ]
    },
    'quality-audit-year': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '计划名称' }, { key: 'year', label: '审核年度' },
        { key: 'count', label: '内审次数' }, { key: 'scope', label: '覆盖范围' }, { key: 'time', label: '计划时间' },
        { key: 'leader', label: '审核组长' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-audit-plan': {
      progress: true,
      fields: [
        { key: 'id', label: '实施编号' }, { key: 'plan', label: '关联年度计划' }, { key: 'name', label: '内审项目' },
        { key: 'type', label: '审核类型' }, { key: 'scope', label: '审核范围', full: true },
        { key: 'startDate', label: '开始日期' }, { key: 'endDate', label: '结束日期' },
        { key: 'auditor', label: '审核员' }, { key: 'leader', label: '审核组长' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-audit-meeting': {
      fields: [
        { key: 'id', label: '会议编号' }, { key: 'name', label: '会议名称' }, { key: 'type', label: '会议类型' },
        { key: 'time', label: '召开时间' }, { key: 'location', label: '会议地点' }, { key: 'host', label: '主持人' },
        { key: 'count', label: '参加人数' }, { key: 'minutes', label: '会议内容', full: true },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-audit-checklist': {
      fields: [
        { key: 'id', label: '检查表编号' }, { key: 'audit', label: '关联内审' }, { key: 'element', label: '审核要素' },
        { key: 'dept', label: '受审部门' }, { key: 'item', label: '检查内容', full: true },
        { key: 'method', label: '检查方式' }, { key: 'result', label: '检查结果', tag: true },
        { key: 'evidence', label: '证据说明', full: true }
      ]
    },
    'quality-audit-nc': {
      fields: [
        { key: 'id', label: '不符合项编号' }, { key: 'audit', label: '关联内审' }, { key: 'level', label: '严重程度', tag: true },
        { key: 'element', label: '涉及要素' }, { key: 'dept', label: '责任部门' },
        { key: 'content', label: '不符合事实', full: true }, { key: 'requirement', label: '条款要求', full: true },
        { key: 'leader', label: '责任人' }, { key: 'deadline', label: '整改期限' },
        { key: 'status', label: '状态', tag: true }, { key: 'verify', label: '验证结果', tag: true }
      ]
    },
    'quality-audit-rectify': {
      fields: [
        { key: 'id', label: '整改编号' }, { key: 'nc', label: '关联不符合项' }, { key: 'reason', label: '整改事项' },
        { key: 'measure', label: '纠正措施', full: true }, { key: 'leader', label: '责任人' },
        { key: 'deadline', label: '整改期限' }, { key: 'verifyDate', label: '验证日期' },
        { key: 'status', label: '状态', tag: true }, { key: 'verify', label: '验证结果', tag: true }
      ]
    },
    'quality-audit-report': {
      fields: [
        { key: 'id', label: '报告编号' }, { key: 'name', label: '报告名称' }, { key: 'audit', label: '关联内审' },
        { key: 'summary', label: '审核结论', full: true }, { key: 'totalNc', label: '不符合项总数' },
        { key: 'closedNc', label: '已关闭不符合项' }, { key: 'author', label: '编制人' },
        { key: 'date', label: '编制日期' }, { key: 'approver', label: '批准人' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-supervise': {
      fields: [
        { key: 'id', label: '监督编号' }, { key: 'type', label: '监督类型' }, { key: 'leader', label: '监督员' },
        { key: 'target', label: '被监督对象' }, { key: 'date', label: '监督日期' },
        { key: 'issue', label: '发现问题' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-supervise-plan-periodic': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '计划名称' }, { key: 'cycle', label: '监督周期' },
        { key: 'target', label: '监督对象' }, { key: 'focus', label: '监督重点', full: true },
        { key: 'leader', label: '负责人' }, { key: 'time', label: '计划时间' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-supervise-plan-special': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '专项监督名称' }, { key: 'object', label: '监督项目' },
        { key: 'standard', label: '依据标准' }, { key: 'focus', label: '监督重点', full: true },
        { key: 'leader', label: '负责人' }, { key: 'date', label: '计划日期' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-supervise-task': {
      fields: [
        { key: 'id', label: '任务编号' }, { key: 'plan', label: '关联计划' }, { key: 'name', label: '任务名称' },
        { key: 'target', label: '监督对象' }, { key: 'leader', label: '监督员' },
        { key: 'time', label: '任务时间' }, { key: 'deadline', label: '要求完成日期' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-supervise-record': {
      fields: [
        { key: 'id', label: '记录编号' }, { key: 'task', label: '关联任务' }, { key: 'target', label: '被监督对象' },
        { key: 'leader', label: '监督员' }, { key: 'date', label: '监督日期' }, { key: 'method', label: '监督方式' },
        { key: 'content', label: '监督内容', full: true }, { key: 'issue', label: '发现问题', full: true },
        { key: 'handle', label: '处理情况', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-supervise-eval': {
      fields: [
        { key: 'id', label: '评价编号' }, { key: 'record', label: '关联记录' }, { key: 'target', label: '被监督对象' },
        { key: 'judge', label: '评价人' }, { key: 'date', label: '评价日期' }, { key: 'score', label: '评价得分' },
        { key: 'result', label: '评价结果', tag: true }, { key: 'opinion', label: '评价意见', full: true }
      ]
    },
    'quality-supervise-audit': {
      fields: [
        { key: 'id', label: '审核编号' }, { key: 'eval', label: '关联评价' }, { key: 'target', label: '监督对象' },
        { key: 'auditor', label: '审核人' }, { key: 'date', label: '审核日期' },
        { key: 'opinion', label: '审核意见', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-supervise-stat': {
      fields: [
        { key: 'id', label: '统计编号' }, { key: 'period', label: '统计期间' }, { key: 'type', label: '监督类别' },
        { key: 'count', label: '监督次数' }, { key: 'issue', label: '发现问题' }, { key: 'fixed', label: '已整改' },
        { key: 'fixRate', label: '整改率', render: 'percent' }, { key: 'qualifyRate', label: '合格率', render: 'percent' }
      ]
    },
    'quality-supervise-upload': {
      fields: [
        { key: 'id', label: '上传编号' }, { key: 'plan', label: '关联计划' },
        { key: 'result', label: '计划结果', full: true }, { key: 'files', label: '附件文件', full: true },
        { key: 'submitter', label: '提交人' }, { key: 'submitTime', label: '提交时间' },
        { key: 'status', label: '状态', tag: true },
        { key: 'auditor', label: '审核人' }, { key: 'auditTime', label: '审核时间' },
        { key: 'auditOpinion', label: '审核意见', full: true }
      ]
    },
    'quality-control-plan-internal': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '质控项目' }, { key: 'sample', label: '质控品批号' },
        { key: 'freq', label: '质控频次' }, { key: 'mean', label: '靶值' }, { key: 'sd', label: '标准差' },
        { key: 'limit', label: '质控限' }, { key: 'focus', label: '质控规则', full: true }, { key: 'leader', label: '负责人' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-plan-parallel': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '计划名称' }, { key: 'sample', label: '样本类型' },
        { key: 'dups', label: '平行次数' }, { key: 'diff', label: '允许偏差' }, { key: 'focus', label: '覆盖检测项目' },
        { key: 'leader', label: '负责人' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-plan-blank': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '计划名称' }, { key: 'sample', label: '空白基质' },
        { key: 'blankLimit', label: '空白限值' }, { key: 'focus', label: '覆盖检测项目' },
        { key: 'leader', label: '负责人' }, { key: 'date', label: '计划日期' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-plan-recovery': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '计划名称' }, { key: 'sample', label: '样本基质' },
        { key: 'spike', label: '加标浓度' }, { key: 'recovery', label: '理论回收率' },
        { key: 'low', label: '允许下限' }, { key: 'high', label: '允许上限' },
        { key: 'leader', label: '负责人' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-task': {
      fields: [
        { key: 'id', label: '任务编号' }, { key: 'plan', label: '关联计划' }, { key: 'name', label: '任务名称' },
        { key: 'project', label: '检测项目' }, { key: 'leader', label: '执行人' },
        { key: 'time', label: '任务时间' }, { key: 'deadline', label: '要求完成日期' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-data': {
      fields: [
        { key: 'id', label: '记录编号' }, { key: 'project', label: '检测项目' }, { key: 'batch', label: '批次' },
        { key: 'sample', label: '质控品批号' }, { key: 'value', label: '测定值' }, { key: 'mean', label: '靶值' },
        { key: 'sd', label: 'SD' }, { key: 'date', label: '检测日期' }, { key: 'leader', label: '检测人' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-eval': {
      fields: [
        { key: 'id', label: '评价编号' }, { key: 'record', label: '关联数据' }, { key: 'project', label: '检测项目' },
        { key: 'batch', label: '批次' }, { key: 'value', label: '测定值' }, { key: 'mean', label: '靶值' },
        { key: 'sd', label: 'SD' }, { key: 'rule', label: 'Westgard规则', tag: true },
        { key: 'result', label: '评价结果', tag: true }, { key: 'judge', label: '评价人' }, { key: 'date', label: '评价日期' }
      ]
    },
    'quality-control-audit': {
      fields: [
        { key: 'id', label: '审核编号' }, { key: 'eval', label: '关联评价' }, { key: 'project', label: '检测项目' },
        { key: 'batch', label: '批次' }, { key: 'auditor', label: '审核人' }, { key: 'date', label: '审核日期' },
        { key: 'opinion', label: '审核意见', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-nc': {
      fields: [
        { key: 'id', label: '失控编号' }, { key: 'eval', label: '关联评价' }, { key: 'project', label: '检测项目' },
        { key: 'batch', label: '批次' }, { key: 'reason', label: '失控原因分析', full: true },
        { key: 'handle', label: '纠正措施', full: true }, { key: 'deadline', label: '计划完成日期' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control-stat': {
      fields: [
        { key: 'id', label: '统计编号' }, { key: 'period', label: '统计期间' }, { key: 'project', label: '检测项目' },
        { key: 'batches', label: '质控批次数' }, { key: 'inControl', label: '在控批次数' },
        { key: 'warning', label: '警告批次数' }, { key: 'outOf', label: '失控批次数' },
        { key: 'rate', label: '在控率', render: 'percent' }
      ]
    },
    'quality-proficiency-plan-pt': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: 'PT计划名称' }, { key: 'org', label: '组织机构' },
        { key: 'item', label: '参加项目' }, { key: 'date', label: '计划时间' }, { key: 'fee', label: '费用' },
        { key: 'leader', label: '负责人' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-proficiency-plan-compare': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '比对计划名称' }, { key: 'partner', label: '比对实验室' },
        { key: 'item', label: '比对项目' }, { key: 'date', label: '计划时间' }, { key: 'standard', label: '判定标准' },
        { key: 'leader', label: '负责人' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-proficiency-signup': {
      fields: [
        { key: 'id', label: '报名编号' }, { key: 'plan', label: '关联计划' }, { key: 'org', label: '组织机构' },
        { key: 'item', label: '参加项目' }, { key: 'applicant', label: '报名人' },
        { key: 'date', label: '报名日期' }, { key: 'deadline', label: '缴费截止' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-proficiency-record': {
      fields: [
        { key: 'id', label: '记录编号' }, { key: 'plan', label: '关联计划' }, { key: 'org', label: '组织机构' },
        { key: 'item', label: '检测项目' }, { key: 'code', label: '样品编号' }, { key: 'receive', label: '接收日期' },
        { key: 'testDate', label: '检测日期' }, { key: 'result', label: '测定结果' }, { key: 'leader', label: '检测人' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-proficiency-review': {
      fields: [
        { key: 'id', label: '评审表编号' }, { key: 'plan', label: '关联计划' }, { key: 'org', label: '组织机构' },
        { key: 'item', label: '检测项目' }, { key: 'result', label: '测定结果' }, { key: 'zScore', label: 'Z值' },
        { key: 'evaluation', label: '能力评定', tag: true }, { key: 'reviewer', label: '评审人' }, { key: 'date', label: '评审日期' }
      ]
    },
    'quality-proficiency-audit': {
      fields: [
        { key: 'id', label: '审核编号' }, { key: 'review', label: '关联评审表' }, { key: 'item', label: '检测项目' },
        { key: 'auditor', label: '审核人' }, { key: 'date', label: '审核日期' },
        { key: 'opinion', label: '审核意见', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-proficiency-stat': {
      fields: [
        { key: 'id', label: '统计编号' }, { key: 'period', label: '统计期间' }, { key: 'org', label: '组织机构' },
        { key: 'items', label: '参加项数' }, { key: 'satisfactory', label: '满意项数' },
        { key: 'questionable', label: '可疑项数' }, { key: 'unsatisfactory', label: '不满意项数' },
        { key: 'rate', label: '满意率', render: 'percent' }
      ]
    },
    'quality-proficiency-rectify': {
      fields: [
        { key: 'id', label: '整改编号' }, { key: 'review', label: '关联评审表' }, { key: 'org', label: '组织机构' },
        { key: 'item', label: '检测项目' }, { key: 'result', label: '原评定结果', tag: true },
        { key: 'reason', label: '原因分析', full: true }, { key: 'measure', label: '纠正措施', full: true },
        { key: 'deadline', label: '完成期限' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-control': {
      fields: [
        { key: 'id', label: '编号' }, { key: 'name', label: '项目名称' }, { key: 'type', label: '类型' },
        { key: 'method', label: '质控方法' }, { key: 'date', label: '计划日期' }, { key: 'leader', label: '负责人' },
        { key: 'eval', label: '结果评价', tag: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-proficiency': {
      fields: [
        { key: 'id', label: '项目编号' }, { key: 'name', label: '能力验证项目' }, { key: 'org', label: '组织机构' },
        { key: 'regDate', label: '报名时间' }, { key: 'resultDate', label: '结果时间' },
        { key: 'result', label: '结果评定', tag: true }, { key: 'rectify', label: '整改状态', tag: true }
      ]
    },
    'quality-system-doc': {
      fields: [
        { key: 'id', label: '文件编号' }, { key: 'name', label: '文件名称' }, { key: 'type', label: '文件类型' },
        { key: 'version', label: '版本号' }, { key: 'date', label: '发布日期' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-complaint': {
      fields: [
        { key: 'title', label: '投诉标题' }, { key: 'level', label: '重要程度', tag: true },
        { key: 'customer', label: '投诉客户' }, { key: 'date', label: '投诉日期' },
        { key: 'content', label: '投诉内容', full: true }, { key: 'status', label: '处理状态', tag: true }
      ]
    },
    'quality-complaint-register': {
      fields: [
        { key: 'id', label: '投诉编号' }, { key: 'title', label: '投诉标题' },
        { key: 'type', label: '投诉类型' }, { key: 'customer', label: '投诉客户' },
        { key: 'phone', label: '联系电话' }, { key: 'source', label: '来源' },
        { key: 'level', label: '重要程度', tag: true }, { key: 'date', label: '投诉日期' },
        { key: 'operator', label: '登记人' }, { key: 'status', label: '状态', tag: true },
        { key: 'content', label: '投诉内容', full: true }
      ]
    },
    'quality-complaint-investigate': {
      fields: [
        { key: 'id', label: '调查编号' }, { key: 'complaintNo', label: '投诉编号' },
        { key: 'investigator', label: '调查人' }, { key: 'date', label: '调查时间' },
        { key: 'method', label: '调查方式' }, { key: 'status', label: '状态', tag: true },
        { key: 'conclusion', label: '调查结论', full: true }
      ]
    },
    'quality-complaint-handle': {
      fields: [
        { key: 'id', label: '处理编号' }, { key: 'complaintNo', label: '投诉编号' },
        { key: 'dept', label: '责任部门' }, { key: 'leader', label: '处理人' },
        { key: 'finishDate', label: '完成时间' }, { key: 'status', label: '状态', tag: true },
        { key: 'measure', label: '处理措施', full: true }, { key: 'result', label: '处理结果', full: true }
      ]
    },
    'quality-complaint-feedback': {
      fields: [
        { key: 'id', label: '反馈编号' }, { key: 'complaintNo', label: '投诉编号' },
        { key: 'person', label: '反馈人' }, { key: 'way', label: '反馈方式' },
        { key: 'date', label: '反馈时间' }, { key: 'satisfaction', label: '客户满意度', tag: true },
        { key: 'status', label: '状态', tag: true },
        { key: 'content', label: '反馈内容', full: true }
      ]
    },
    'quality-complaint-stat': {
      fields: [
        { key: 'month', label: '月份' }, { key: 'total', label: '投诉数' },
        { key: 'inTime', label: '及时处理数' }, { key: 'rate', label: '及时率', tag: true },
        { key: 'satisfaction', label: '平均满意度', tag: true }
      ]
    },
    'system-org-dept': {
      fields: [
        { key: 'code', label: '机构编码' }, { key: 'name', label: '机构名称', bold: true },
        { key: 'type', label: '机构类型' }, { key: 'parent', label: '上级机构' },
        { key: 'leader', label: '负责人' }, { key: 'phone', label: '联系电话' },
        { key: 'address', label: '办公地点' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-org-position': {
      fields: [
        { key: 'code', label: '岗位编码' }, { key: 'name', label: '岗位名称', bold: true },
        { key: 'dept', label: '所属部门' }, { key: 'cat', label: '岗位类别' },
        { key: 'level', label: '职级' }, { key: 'total', label: '编制数' },
        { key: 'onPost', label: '在岗人数' }, { key: 'status', label: '状态', tag: true },
        { key: 'duty', label: '岗位职责', full: true }
      ]
    },
    'system-org-person': {
      fields: [
        { key: 'no', label: '工号' }, { key: 'name', label: '姓名', bold: true },
        { key: 'dept', label: '所属部门' }, { key: 'position', label: '岗位' },
        { key: 'grade', label: '职级' }, { key: 'type', label: '用工性质' },
        { key: 'joinDate', label: '入职日期' }, { key: 'phone', label: '联系电话' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-org-holiday': {
      fields: [
        { key: 'date', label: '日期' }, { key: 'name', label: '节日名称', bold: true },
        { key: 'type', label: '类型', tag: true }, { key: 'makeup', label: '是否调休', tag: true },
        { key: 'remark', label: '备注' }
      ]
    },
    'system-org-workcal': {
      fields: [
        { key: 'year', label: '年度' }, { key: 'month', label: '月份' },
        { key: 'workDays', label: '工作日' }, { key: 'restDays', label: '休息日' },
        { key: 'holiDays', label: '节假日' }, { key: 'attendance', label: '出勤率', tag: true },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-perm-user': {
      fields: [
        { key: 'account', label: '登录账号' }, { key: 'name', label: '姓名', bold: true },
        { key: 'dept', label: '所属部门' }, { key: 'role', label: '角色' },
        { key: 'phone', label: '手机号' }, { key: 'lastLogin', label: '最近登录' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-perm-role': {
      fields: [
        { key: 'name', label: '角色名称', bold: true }, { key: 'code', label: '角色标识' },
        { key: 'users', label: '成员数' }, { key: 'permissionScope', label: '权限范围', tag: true },
        { key: 'status', label: '状态', tag: true }, { key: 'desc', label: '角色描述', full: true }
      ]
    },
    'system-perm-config': {
      fields: [
        { key: 'module', label: '模块名称', bold: true }, { key: 'dataScope', label: '数据权限', tag: true },
        { key: 'roles', label: '适用角色' }, { key: 'status', label: '状态', tag: true },
        { key: 'funcPerms', label: '功能权限', full: true }
      ]
    },
    'system-perm-oplog': {
      fields: [
        { key: 'user', label: '操作人' }, { key: 'module', label: '所属模块' },
        { key: 'time', label: '操作时间' }, { key: 'result', label: '结果', tag: true },
        { key: 'action', label: '操作内容', full: true }
      ]
    },
    'system-perm-login': {
      fields: [
        { key: 'user', label: '登录账号' }, { key: 'name', label: '姓名', bold: true },
        { key: 'ip', label: 'IP 地址' }, { key: 'device', label: '登录设备' },
        { key: 'time', label: '登录时间' }, { key: 'status', label: '结果', tag: true }
      ]
    },
    'system-dict-type': {
      fields: [
        { key: 'code', label: '字典编码' }, { key: 'name', label: '字典名称', bold: true },
        { key: 'type', label: '字典类型', tag: true }, { key: 'items', label: '条目数' },
        { key: 'remark', label: '说明', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-dict-char': {
      fields: [
        { key: 'name', label: '字符名称', bold: true }, { key: 'value', label: '字符值' },
        { key: 'category', label: '分类', tag: true }, { key: 'remark', label: '说明', full: true },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-dict-enum': {
      fields: [
        { key: 'dictCode', label: '所属字典' }, { key: 'code', label: '枚举编码' },
        { key: 'name', label: '显示名称', bold: true }, { key: 'order', label: '排序' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-num-report': {
      fields: [
        { key: 'name', label: '规则名称', bold: true }, { key: 'prefix', label: '编号前缀' },
        { key: 'seqLength', label: '序号位数' }, { key: 'yearMode', label: '年份模式' },
        { key: 'sep', label: '分隔符' }, { key: 'currentSeq', label: '当前序号' },
        { key: 'remark', label: '说明', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-num-sample': {
      fields: [
        { key: 'name', label: '规则名称', bold: true }, { key: 'prefix', label: '编号前缀' },
        { key: 'seqLength', label: '序号位数' }, { key: 'yearMode', label: '年份模式' },
        { key: 'sep', label: '分隔符' }, { key: 'currentSeq', label: '当前序号' },
        { key: 'remark', label: '说明', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-num-task': {
      fields: [
        { key: 'name', label: '规则名称', bold: true }, { key: 'prefix', label: '编号前缀' },
        { key: 'seqLength', label: '序号位数' }, { key: 'yearMode', label: '年份模式' },
        { key: 'sep', label: '分隔符' }, { key: 'currentSeq', label: '当前序号' },
        { key: 'remark', label: '说明', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-num-other': {
      fields: [
        { key: 'name', label: '规则名称', bold: true }, { key: 'prefix', label: '编号前缀' },
        { key: 'seqLength', label: '序号位数' }, { key: 'yearMode', label: '年份模式' },
        { key: 'sep', label: '分隔符' }, { key: 'currentSeq', label: '当前序号' },
        { key: 'remark', label: '说明', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-cfg-flow': {
      fields: [
        { key: 'step', label: '步骤名称', bold: true }, { key: 'role', label: '处理角色' },
        { key: 'icon', label: '图标' }, { key: 'must', label: '是否必经', tag: true },
        { key: 'timeout', label: '超时小时' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-cfg-line': {
      fields: [
        { key: 'name', label: '生产线名称', bold: true }, { key: 'dept', label: '负责科室', tag: true },
        { key: 'type', label: '适用检测类型' },
        { key: 'steps', label: '流程步骤数' }, { key: 'flow', label: '关联工作流' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-cfg-approve': {
      fields: [
        { key: 'name', label: '流程名称', bold: true }, { key: 'levels', label: '审批层级' },
        { key: 'initiator', label: '发起角色' }, { key: 'trigger', label: '触发单据' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-cfg-version': {
      fields: [
        { key: 'flow', label: '流程名称', bold: true }, { key: 'version', label: '版本号' },
        { key: 'content', label: '修订内容' }, { key: 'operator', label: '修订人' },
        { key: 'time', label: '修订时间' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-lib-cat': {
      fields: [
        { key: 'code', label: '分类编码', bold: true }, { key: 'name', label: '分类名称' },
        { key: 'parent', label: '上级分类' }, { key: 'level', label: '分类层级', tag: true },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-lib-product': {
      fields: [
        { key: 'code', label: '产品编码', bold: true }, { key: 'name', label: '产品名称' },
        { key: 'cat', label: '所属分类', tag: true }, { key: 'sampleType', label: '样品类型' },
        { key: 'storage', label: '保存条件' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-lib-project': {
      fields: [
        { key: 'code', label: '项目编码', bold: true }, { key: 'name', label: '项目名称' },
        { key: 'cat', label: '所属分类', tag: true }, { key: 'subcat', label: '所属子类', tag: true },
        { key: 'unit', label: '计量单位' }, { key: 'limit', label: '检测限' },
        { key: 'method', label: '检测方法' }, { key: 'turnaround', label: '检测周期' },
        { key: 'sampleQty', label: '样品用量' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-lib-standard': {
      fields: [
        { key: 'code', label: '标准编号', bold: true }, { key: 'name', label: '标准名称' },
        { key: 'agency', label: '发布机构', tag: true }, { key: 'category', label: '方法分类' },
        { key: 'year', label: '发布年份' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-lib-line': {
      fields: [
        { key: 'name', label: '生产线名称', bold: true }, { key: 'target', label: '服务方向' },
        { key: 'capacity', label: '日产能' }, { key: 'projectCount', label: '涉及项目数' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-lib-link': {
      fields: [
        { key: 'product', label: '产品（样品）' }, { key: 'project', label: '项目名称', bold: true },
        { key: 'standard', label: '标准编号' }, { key: 'name', label: '方法名称' },
        { key: 'type', label: '方法类型', tag: true }, { key: 'status', label: '关联状态', tag: true }
      ]
    },
    'system-env-mproj': {
      fields: [
        { key: 'code', label: '项目编码', bold: true }, { key: 'name', label: '项目名称' },
        { key: 'cat', label: '分类', tag: true }, { key: 'unit', label: '单位' },
        { key: 'limit', label: '检测限' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-env-vessel': {
      fields: [
        { key: 'code', label: '容器编码', bold: true }, { key: 'name', label: '容器名称' },
        { key: 'capacity', label: '容量' }, { key: 'material', label: '材质', tag: true },
        { key: 'projectIds', label: '关联项目', render: 'projectTags' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-env-method': {
      fields: [
        { key: 'name', label: '方法名称', bold: true }, { key: 'temp', label: '保存温度' },
        { key: 'timeLimit', label: '保存时限' }, { key: 'container', label: '容器要求' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-env-ster': {
      fields: [
        { key: 'name', label: '消毒方式', bold: true }, { key: 'agent', label: '消毒药剂' },
        { key: 'concentration', label: '使用浓度' }, { key: 'duration', label: '作用时间' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-env-param': {
      fields: [
        { key: 'name', label: '参数名称', bold: true }, { key: 'unit', label: '单位' },
        { key: 'precision', label: '精度' }, { key: 'mode', label: '检测模式', tag: true },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-param': {
      fields: [
        { key: 'code', label: '参数编码', bold: true }, { key: 'name', label: '参数名称' },
        { key: 'value', label: '参数值', bold: true }, { key: 'unit', label: '单位' },
        { key: 'category', label: '参数分类', tag: true }, { key: 'remark', label: '说明' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-notify': {
      fields: [
        { key: 'code', label: '模板编码', bold: true }, { key: 'name', label: '通知名称' },
        { key: 'channel', label: '通知渠道', tag: true }, { key: 'trigger', label: '触发事件' },
        { key: 'receiver', label: '接收对象' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-backup': {
      fields: [
        { key: 'code', label: '任务编码', bold: true }, { key: 'name', label: '备份任务' },
        { key: 'type', label: '备份类型', tag: true }, { key: 'cycle', label: '执行周期' },
        { key: 'size', label: '备份大小' }, { key: 'lastTime', label: '最近执行' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-archive': {
      fields: [
        { key: 'code', label: '策略编码', bold: true }, { key: 'name', label: '归档策略' },
        { key: 'target', label: '归档对象' }, { key: 'trigger', label: '触发条件' },
        { key: 'retention', label: '保留期限' }, { key: 'storage', label: '存储位置' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-log': {
      fields: [
        { key: 'code', label: '日志编号', bold: true }, { key: 'type', label: '日志类型', tag: true },
        { key: 'user', label: '操作用户' }, { key: 'module', label: '功能模块' },
        { key: 'ip', label: 'IP地址' }, { key: 'time', label: '记录时间' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-device': {
      fields: [
        { key: 'code', label: '设备编码', bold: true }, { key: 'name', label: '设备名称' },
        { key: 'deviceType', label: '设备类型', tag: true }, { key: 'vendor', label: '设备厂商' },
        { key: 'connectType', label: '连接方式', tag: true }, { key: 'port', label: '端口/串口号' },
        { key: 'policy', label: '采集策略', tag: true }, { key: 'connectStatus', label: '连接状态', tag: true },
        { key: 'progress', label: '采集进度%' }, { key: 'lastTime', label: '最近采集时间' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-pdf': {
      fields: [
        { key: 'code', label: '规则编码', bold: true }, { key: 'name', label: '规则名称' },
        { key: 'template', label: '解析模板' }, { key: 'vendor', label: '来源厂商' },
        { key: 'parseMode', label: '解析方式', tag: true }, { key: 'keyword', label: '匹配关键词' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-set-protocol': {
      fields: [
        { key: 'code', label: '协议编码', bold: true }, { key: 'name', label: '协议名称' },
        { key: 'vendor', label: '设备厂商' }, { key: 'transport', label: '协议标准', tag: true },
        { key: 'endpoint', label: '接入方式' }, { key: 'targetTable', label: '入库表' },
        { key: 'lastTime', label: '最近抓取时间' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-ui-form': {
      fields: [
        { key: 'code', label: '模板编码', bold: true }, { key: 'name', label: '表单名称' },
        { key: 'doc', label: '关联单据', tag: true }, { key: 'fields', label: '字段数' },
        { key: 'version', label: '版本' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-ui-column': {
      fields: [
        { key: 'code', label: '配置编码', bold: true }, { key: 'module', label: '所属模块' },
        { key: 'group', label: '模块分类', tag: true }, { key: 'cols', label: '列数量' },
        { key: 'visible', label: '显示列' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-ui-report': {
      fields: [
        { key: 'code', label: '样式编码', bold: true }, { key: 'name', label: '报表名称' },
        { key: 'type', label: '报表类型', tag: true }, { key: 'size', label: '纸张尺寸' },
        { key: 'version', label: '版本' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-ui-query': {
      fields: [
        { key: 'code', label: '配置编码', bold: true }, { key: 'name', label: '查询名称' },
        { key: 'type', label: '类型', tag: true }, { key: 'source', label: '数据来源' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'system-ui-home': {
      fields: [
        { key: 'code', label: '模块编码', bold: true }, { key: 'name', label: '模块名称' },
        { key: 'cat', label: '模块分类', tag: true }, { key: 'pos', label: '布局位置' },
        { key: 'sort', label: '排序' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-corrective': {
      fields: [
        { key: 'id', label: '整改编号' }, { key: 'reason', label: '整改原因' }, { key: 'source', label: '来源' },
        { key: 'leader', label: '负责人' }, { key: 'deadline', label: '整改期限' },
        { key: 'status', label: '状态', tag: true }, { key: 'verify', label: '验证结果', tag: true }
      ]
    },
    'quality-corrective-apply': {
      fields: [
        { key: 'id', label: '申请编号' }, { key: 'problem', label: '整改事项' },
        { key: 'source', label: '来源' }, { key: 'level', label: '严重程度', tag: true },
        { key: 'applicant', label: '申请人' }, { key: 'date', label: '申请日期' },
        { key: 'dept', label: '责任部门' }, { key: 'deadline', label: '整改期限' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-corrective-analysis': {
      fields: [
        { key: 'id', label: '分析编号' }, { key: 'applyNo', label: '关联申请' },
        { key: 'method', label: '分析方法' }, { key: 'rootCause', label: '根本原因', full: true },
        { key: 'analyst', label: '分析人' }, { key: 'date', label: '分析日期' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-corrective-measure': {
      fields: [
        { key: 'id', label: '措施编号' }, { key: 'applyNo', label: '关联申请' },
        { key: 'type', label: '措施类型' }, { key: 'measure', label: '纠正措施', full: true },
        { key: 'leader', label: '责任人' }, { key: 'deadline', label: '计划完成时间' },
        { key: 'result', label: '实施结果', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-corrective-verify': {
      fields: [
        { key: 'id', label: '验证编号' }, { key: 'applyNo', label: '关联申请' },
        { key: 'verifier', label: '验证人' }, { key: 'date', label: '验证日期' },
        { key: 'method', label: '验证方式' }, { key: 'result', label: '验证结果', tag: true },
        { key: 'conclusion', label: '验证结论', full: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-corrective-audit': {
      fields: [
        { key: 'id', label: '审核编号' }, { key: 'applyNo', label: '关联申请' },
        { key: 'auditor', label: '审核人' }, { key: 'date', label: '审核日期' },
        { key: 'opinion', label: '审核意见', full: true }, { key: 'result', label: '审核结论', tag: true },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'quality-corrective-ledger': {
      fields: [
        { key: 'id', label: '台账编号' }, { key: 'applyNo', label: '关联申请' },
        { key: 'problem', label: '整改事项' }, { key: 'source', label: '来源' },
        { key: 'dept', label: '责任部门' }, { key: 'leader', label: '责任人' },
        { key: 'deadline', label: '整改期限' }, { key: 'finishDate', label: '完成日期' },
        { key: 'verify', label: '验证结果', tag: true }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'training-plan': {
      fields: [
        { key: 'id', label: '计划编号' }, { key: 'name', label: '培训主题' }, { key: 'type', label: '培训类型' },
        { key: 'time', label: '计划时间' }, { key: 'hours', label: '课时' }, { key: 'teacher', label: '讲师' },
        { key: 'target', label: '培训对象' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'training-implement': {
      progress: true,
      fields: [
        { key: 'id', label: '班次编号' }, { key: 'name', label: '培训班名称' }, { key: 'method', label: '培训方式' },
        { key: 'date', label: '培训日期' }, { key: 'teacher', label: '讲师' },
        { key: 'count', label: '报名人数' }, { key: 'rate', label: '签到率', render: 'percent' },
        { key: 'status', label: '状态', tag: true }
      ]
    },
    'training-exam': {
      fields: [
        { key: 'id', label: '考核编号' }, { key: 'name', label: '考核名称' }, { key: 'method', label: '考核方式' },
        { key: 'training', label: '关联培训' }, { key: 'date', label: '考核时间' }, { key: 'count', label: '参考人数' },
        { key: 'pass', label: '及格率', render: 'percent' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'training-certificate': {
      fields: [
        { key: 'id', label: '证书编号' }, { key: 'name', label: '持证人' }, { key: 'type', label: '证书类型' },
        { key: 'issueDate', label: '发证日期' }, { key: 'expireDate', label: '有效期至' }, { key: 'status', label: '状态', tag: true }
      ]
    },
    'stat-query': {
      fields: [
        { key: 'id', label: '编号' }, { key: 'name', label: '名称/单号' }, { key: 'org', label: '委托单位' },
        { key: 'item', label: '检测项目' }, { key: 'owner', label: '负责人' }, { key: 'date', label: '完成日期' },
        { key: 'status', label: '状态', tag: true }
      ]
    }
  };

  /* ---------- Mock 数据 ---------- */
  function buildData() {
    return {
      'research-project': [
        { id: 'KYXM-2025-001', name: '花卉种质资源分子鉴定技术研究', type: '应用基础研究', leader: '张丽华', period: '2025.01 - 2026.12', budget: 30, percent: 65, status: '在研' },
        { id: 'KYXM-2025-002', name: '切花月季抗病基因筛选与分子育种', type: '应用研究', leader: '李建平', period: '2024.06 - 2026.06', budget: 45, percent: 80, status: '在研' },
        { id: 'KYXM-2024-005', name: '高原特色花卉病毒检测技术体系构建', type: '应用基础研究', leader: '王秀云', period: '2023.09 - 2025.09', budget: 25, percent: 100, status: '已结题' },
        { id: 'KYXM-2024-009', name: '康乃馨脱毒种苗快速繁殖技术研发', type: '试验发展', leader: '赵明伟', period: '2024.01 - 2025.12', budget: 18, percent: 90, status: '在研' },
        { id: 'KYXM-2026-001', name: '花卉组织培养智能化控制系统研发', type: '产业化示范', leader: '陈思远', period: '2026.01 - 2027.12', budget: 60, percent: 20, status: '在研' },
        { id: 'KYXM-2025-008', name: '百合种球病毒率检测与净化技术研究', type: '应用研究', leader: '周晓梅', period: '2025.03 - 2026.03', budget: 22, percent: 55, status: '在研' },
        { id: 'KYXM-2023-012', name: '云南特色兰花种质资源收集与评价', type: '应用基础研究', leader: '孙国栋', period: '2023.01 - 2024.12', budget: 35, percent: 100, status: '已结题' },
        { id: 'KYXM-2026-003', name: '鲜花电商供应链质量追溯平台', type: '产业化示范', leader: '杨丽', period: '2026.02 - 2027.01', budget: 50, percent: 10, status: '在研' },
        { id: 'KYXM-2024-015', name: '非洲菊保鲜与冷链物流关键技术', type: '应用研究', leader: '马晓东', period: '2024.05 - 2025.10', budget: 28, percent: 100, status: '已结题' },
        { id: 'KYXM-2025-011', name: '观赏植物花期调控因子分子解析', type: '应用基础研究', leader: '吴静', period: '2025.07 - 2026.12', budget: 40, percent: 35, status: '在研' },
        { id: 'KYXM-2026-005', name: '花卉种业知识产权运营体系建设', type: '产业化示范', leader: '郑华', period: '2026.03 - 2027.02', budget: 15, percent: 5, status: '待立项' }
      ],
      'research-experiment': [
        { id: 'SYSY-2026-0112', name: '月季灰霉病抗性鉴定实验', type: '实验记录', project: '切花月季抗病基因筛选', leader: '李建平', count: 48, status: '记录中' },
        { id: 'SYSY-2026-0108', name: '花卉病毒RT-PCR检测', type: '实验记录', project: '高原特色花卉病毒检测', leader: '王秀云', count: 96, status: '已完成' },
        { id: 'SYSY-2026-0095', name: '百合种球组织培养实验', type: '实验记录', project: '百合种球病毒率检测', leader: '周晓梅', count: 60, status: '已完成' },
        { id: 'KYYP-2026-0321', name: '切花月季叶片DNA样本库', type: '科研样品', project: '分子鉴定技术研究', leader: '张丽华', count: 320, status: '记录中' },
        { id: 'KYYP-2026-0305', name: '兰花种质叶片样本集', type: '科研样品', project: '兰花种质资源评价', leader: '孙国栋', count: 156, status: '已完成' },
        { id: 'CXCE-2026-072', name: '康乃馨转录组测序项目', type: '测序项目', project: '脱毒种苗快速繁育', leader: '赵明伟', count: 24, status: '记录中' },
        { id: 'CXCE-2026-068', name: '花卉病毒组高通量测序', type: '测序项目', project: '病毒检测技术体系', leader: '王秀云', count: 12, status: '已完成' },
        { id: 'SYMB-2026-015', name: '实验原始记录模板', type: '实验模板', project: '质量体系文件', leader: '质控部', count: 1, status: '已完成' },
        { id: 'SYSY-2026-0092', name: '非洲菊冷藏处理实验', type: '实验记录', project: '非洲菊保鲜技术', leader: '马晓东', count: 40, status: '待开始' },
        { id: 'SYMB-2026-018', name: '测序数据分析流程模板', type: '实验模板', project: '测序平台建设', leader: '信息部', count: 1, status: '已完成' }
      ],
      'research-result': [
        { id: 'CG-2025-042', name: '基于SSR标记的花卉品种鉴定方法', type: '学术论文', owner: '张丽华', date: '2025-11-20', level: '省部级', status: '已登记', tag: 'info' },
        { id: 'CG-2025-036', name: '切花月季抗灰霉病QTL定位', type: '学术论文', owner: '李建平', date: '2025-09-15', level: '国家级', status: '已登记', tag: 'info' },
        { id: 'CG-2026-003', name: '一种组培苗快速生根营养液及方法', type: '发明专利', owner: '赵明伟', date: '2026-01-12', level: '国家级', status: '已审核', tag: 'green' },
        { id: 'CG-2025-028', name: '脱毒康乃馨种苗繁育技术体系', type: '获奖成果', owner: '赵明伟', date: '2025-08-01', level: '省部级', status: '已登记', tag: 'orange' },
        { id: 'CG-2026-007', name: '花卉病毒检测试剂盒技术转让', type: '成果转化', owner: '王秀云', date: '2026-02-20', level: '厅局级', status: '已审核', tag: 'cyan' },
        { id: 'CG-2025-031', name: '云南高山杜鹃种质评价研究', type: '学术论文', owner: '孙国栋', date: '2025-10-10', level: '校级', status: '待审核', tag: 'gray' },
        { id: 'CG-2026-011', name: '鲜花冷链物流温控装置专利', type: '发明专利', owner: '马晓东', date: '2026-03-05', level: '国家级', status: '待审核', tag: 'gray' },
        { id: 'CG-2024-019', name: '花卉种质资源信息数据库', type: '获奖成果', owner: '杨丽', date: '2024-12-18', level: '厅局级', status: '已登记', tag: 'purple' }
      ],
      'research-cooperation': [
        { id: 'HZ-2026-011', name: '云南农业大学花卉分子育种联合研究', type: '合作协议', partner: '云南农业大学', leader: '张丽华', time: '2026-03-15', status: '进行中' },
        { id: 'HZ-2025-028', name: '国际园艺学会切花生产研讨会', type: '学术交流', partner: '荷兰瓦赫宁根大学', leader: '李建平', time: '2025-10-22', status: '已完成' },
        { id: 'HZ-2026-005', name: '花卉组培技术实操培训班', type: '培训讲座', partner: '云南花卉产业联盟', leader: '赵明伟', time: '2026-02-08', status: '已完成' },
        { id: 'HZ-2025-033', name: '鲜切花采后处理技术服务', type: '技术服务', partner: '云南锦苑花卉公司', leader: '马晓东', time: '2025-11-30', status: '已完成' },
        { id: 'HZ-2026-014', name: '省级花卉种质资源平台共建', type: '平台共建', partner: '云南省农科院', leader: '孙国栋', time: '2026-04-01', status: '进行中' },
        { id: 'HZ-2026-002', name: '分子检测与基因育种学术沙龙', type: '学术交流', partner: '西南林业大学', leader: '张丽华', time: '2026-01-16', status: '待开始' },
        { id: 'HZ-2025-019', name: '花卉病虫害检测合作协议', type: '合作协议', partner: '斗南花卉市场质检中心', leader: '王秀云', time: '2025-08-12', status: '已完成' },
        { id: 'HZ-2026-018', name: '鲜花电商供应链技术服务', type: '技术服务', partner: '云南花易宝电商平台', leader: '杨丽', time: '2026-05-10', status: '进行中' }
      ],
      'quality-review-plan-mgmt': [
        { id: 'PM-2026-01', name: '2026年度管理评审工作计划', type: '年度计划', period: '年度', maker: '王秀云', makeDate: '2025-12-15', approver: '张丽华', approveDate: '2025-12-25', status: '已发布' },
        { id: 'PM-2026-02', name: '2026年上半年管理评审计划', type: '季度计划', period: '半年度', maker: '王秀云', makeDate: '2026-03-05', approver: '张丽华', approveDate: '2026-03-12', status: '已发布' },
        { id: 'PM-2026-03', name: '实验室扩项能力专项评审计划', type: '专项计划', period: '季度', maker: '孙国栋', makeDate: '2026-02-20', approver: '张丽华', approveDate: '2026-02-28', status: '已发布' },
        { id: 'PM-2026-04', name: '2026年下半年管理评审工作计划', type: '年度计划', period: '半年度', maker: '王秀云', makeDate: '2026-06-10', approver: '张丽华', approveDate: '2026-06-20', status: '已审批' },
        { id: 'PM-2026-Q3', name: '2026年第三季度质量评审计划', type: '季度计划', period: '季度', maker: '王秀云', makeDate: '2026-06-25', approver: '', approveDate: '', status: '待审批' },
        { id: 'PM-2026-05', name: '检测数据质量月度评审计划', type: '临时计划', period: '月度', maker: '吴静', makeDate: '2026-04-28', approver: '王秀云', approveDate: '2026-05-05', status: '已发布' },
        { id: 'PM-2025-01', name: '2025年度管理评审工作计划', type: '年度计划', period: '年度', maker: '王秀云', makeDate: '2024-12-18', approver: '张丽华', approveDate: '2024-12-28', status: '已废止' },
        { id: 'PM-2026-06', name: '内审结果复盘专项评审计划', type: '专项计划', period: '季度', maker: '王秀云', makeDate: '2026-07-05', approver: '', approveDate: '', status: '待审批' }
      ],
      'quality-review': [
        { id: 'PL-2026-04', name: '2026年上半年管理评审', type: '管理评审', host: '张丽华', date: '2026-06-25', count: 18, status: '进行中' },
        { id: 'PL-2026-01', name: '2026年度质量体系运行评审', type: '质量评审', host: '王秀云', date: '2026-01-20', count: 22, status: '已完成' },
        { id: 'PL-2025-03', name: '实验室资质认定专项评审', type: '专项评审', host: '张丽华', date: '2025-09-18', count: 12, status: '已完成' },
        { id: 'PL-2025-02', name: '2025年下半年管理评审', type: '管理评审', host: '张丽华', date: '2025-12-26', count: 16, status: '已完成' },
        { id: 'PL-2026-02', name: '2026年扩项能力评审', type: '专项评审', host: '孙国栋', date: '2026-03-30', count: 15, status: '已完成' },
        { id: 'PL-2026-03', name: '检测数据质量月度评审', type: '质量评审', host: '王秀云', date: '2026-05-15', count: 20, status: '进行中' },
        { id: 'PL-2025-01', name: '2025年上半年管理评审', type: '管理评审', host: '张丽华', date: '2025-06-27', count: 17, status: '已完成' },
        { id: 'PL-2026-05', name: '2026年下半年管理评审', type: '管理评审', host: '张丽华', date: '2026-12-25', count: 0, status: '待开始' }
      ],
      'quality-review-plan-exec': [
        { id: 'EX-2026-01', plan: 'PM-2026-01', task: '下达年度评审工作部署通知', leader: '王秀云', dept: '质量管理部门', startDate: '2026-01-05', endDate: '2026-01-12', progress: 100, status: '已完成' },
        { id: 'EX-2026-02', plan: 'PM-2026-02', task: '组建评审工作组并明确分工', leader: '张丽华', dept: '中心领导', startDate: '2026-03-15', endDate: '2026-03-22', progress: 100, status: '已完成' },
        { id: 'EX-2026-03', plan: 'PM-2026-02', task: '收集评审输入资料并汇总', leader: '王秀云', dept: '质量管理部门', startDate: '2026-05-20', endDate: '2026-06-08', progress: 75, status: '进行中' },
        { id: 'EX-2026-04', plan: 'PM-2026-02', task: '组织召开评审会议', leader: '张丽华', dept: '中心领导', startDate: '2026-06-25', endDate: '2026-06-25', progress: 100, status: '已完成' },
        { id: 'EX-2026-05', plan: 'PM-2026-03', task: '完成扩项项目能力验证', leader: '孙国栋', dept: '检测实验室', startDate: '2026-03-01', endDate: '2026-03-28', progress: 100, status: '已完成' },
        { id: 'EX-2026-06', plan: 'PM-2026-04', task: '编制下半年评审工作部署', leader: '王秀云', dept: '质量管理部门', startDate: '2026-07-01', endDate: '2026-07-15', progress: 30, status: '进行中' },
        { id: 'EX-2026-07', plan: 'PM-2026-04', task: '评审输入资料责任分工落实', leader: '王秀云', dept: '质量管理部门', startDate: '2026-07-20', endDate: '2026-08-10', progress: 0, status: '未开始' },
        { id: 'EX-2026-08', plan: 'PM-2026-05', task: '检测数据月度统计分析', leader: '吴静', dept: '检测实验室', startDate: '2026-05-10', endDate: '2026-05-14', progress: 100, status: '已完成' },
        { id: 'EX-2026-09', plan: 'PM-2026-Q3', task: 'Q3质量评审计划立项', leader: '王秀云', dept: '质量管理部门', startDate: '2026-07-05', endDate: '2026-07-15', progress: 0, status: '已延期' },
        { id: 'EX-2026-10', plan: 'PM-2026-06', task: '内审结果复盘与建议梳理', leader: '王秀云', dept: '质量管理部门', startDate: '2026-07-10', endDate: '2026-07-25', progress: 0, status: '未开始' }
      ],
      'quality-review-input': [
        { id: 'ZL-2026-SR01', name: '2026上半年质量方针与目标完成情况', type: '质量方针与目标', dept: '质量管理部门', collector: '王秀云', deadline: '2026-05-20', status: '收集完成' },
        { id: 'ZL-2026-SR02', name: '检测工作量与样品类型变化统计', type: '检测工作量', dept: '业务受理部', collector: '马晓东', deadline: '2026-05-25', status: '收集完成' },
        { id: 'ZL-2026-SR03', name: '人员配置与能力发展报告', type: '人员能力', dept: '人事部', collector: '李建平', deadline: '2026-05-28', status: '已收集' },
        { id: 'ZL-2026-SR04', name: '设施环境与资源保障情况', type: '资源配置', dept: '后勤保障部', collector: '陈思远', deadline: '2026-05-30', status: '已收集' },
        { id: 'ZL-2026-SR05', name: '内部审核与外部评审结果汇总', type: '内外审核结果', dept: '质量管理部门', collector: '王秀云', deadline: '2026-05-30', status: '已收集' },
        { id: 'ZL-2026-SR06', name: '客户投诉与满意度分析报告', type: '投诉与反馈', dept: '业务受理部', collector: '孙国栋', deadline: '2026-06-05', status: '待收集' },
        { id: 'ZL-2026-SR07', name: '能力验证与质控结果统计', type: '能力验证结果', dept: '检测实验室', collector: '吴静', deadline: '2026-06-05', status: '待收集' },
        { id: 'ZL-2026-SR08', name: '仪器设备运行与维护状况', type: '设备状况', dept: '设备管理部', collector: '陈思远', deadline: '2026-06-08', status: '待收集' }
      ],
      'quality-review-meeting': [
        { id: 'HY-2026-M01', name: '2026年上半年管理评审预备会', location: '3楼会议室', time: '2026-06-18', host: '张丽华', count: 15, minutes: '布置评审输入资料收集任务，明确各责任部门分工。', status: '已完成' },
        { id: 'HY-2026-M02', name: '2026年上半年管理评审会议', location: '学术报告厅', time: '2026-06-25', host: '张丽华', count: 18, minutes: '听取各部门汇报，审议质量目标完成情况并形成评审决议。', status: '已完成' },
        { id: 'HY-2026-M03', name: '整改措施落实进度通报会', location: '3楼会议室', time: '2026-07-10', host: '王秀云', count: 12, minutes: '通报整改跟踪进展，协调跨部门整改事项。', status: '进行中' },
        { id: 'HY-2026-M04', name: '2026年度质量体系运行评审会', location: '学术报告厅', time: '2026-08-15', host: '张丽华', count: 0, minutes: '待召开。', status: '待召开' },
        { id: 'HY-2025-M05', name: '2025年下半年管理评审会议', location: '学术报告厅', time: '2025-12-26', host: '张丽华', count: 16, minutes: '审议2025年质量体系运行情况。', status: '已完成' },
        { id: 'HY-2026-M06', name: '评审决议宣贯专题会', location: '3楼会议室', time: '2026-07-01', host: '王秀云', count: 20, minutes: '宣贯管理评审决议，部署下半年质量工作。', status: '已完成' },
        { id: 'HY-2026-M07', name: '扩项能力评审准备会', location: '3楼会议室', time: '2026-03-20', host: '孙国栋', count: 10, minutes: '部署实验室扩项能力评审准备工作。', status: '已完成' },
        { id: 'HY-2026-M08', name: '检测数据质量月度评审会', location: '2楼会议室', time: '2026-05-15', host: '王秀云', count: 20, minutes: '月度检测数据质量分析。', status: '已完成' }
      ],
      'quality-review-report': [
        { id: 'BG-2026-R01', name: '2026年上半年管理评审报告', plan: 'PL-2026-04', author: '王秀云', date: '2026-06-30', approver: '张丽华', status: '已批准' },
        { id: 'BG-2026-R02', name: '2026年度质量体系运行评审报告', plan: 'PL-2026-01', author: '王秀云', date: '2026-01-28', approver: '张丽华', status: '已批准' },
        { id: 'BG-2025-R03', name: '实验室资质认定专项评审报告', plan: 'PL-2025-03', author: '孙国栋', date: '2025-09-25', approver: '张丽华', status: '已批准' },
        { id: 'BG-2025-R04', name: '2025年下半年管理评审报告', plan: 'PL-2025-02', author: '王秀云', date: '2025-12-30', approver: '张丽华', status: '已批准' },
        { id: 'BG-2026-R05', name: '2026年扩项能力评审报告', plan: 'PL-2026-02', author: '孙国栋', date: '2026-04-10', approver: '张丽华', status: '已批准' },
        { id: 'BG-2026-R06', name: '检测数据质量月度评审报告', plan: 'PL-2026-03', author: '吴静', date: '2026-05-20', approver: '王秀云', status: '编制中' },
        { id: 'BG-2025-R07', name: '2025年上半年管理评审报告', plan: 'PL-2025-01', author: '王秀云', date: '2025-07-02', approver: '张丽华', status: '已批准' },
        { id: 'BG-2026-R08', name: '2026年下半年管理评审报告', plan: 'PL-2026-05', author: '王秀云', date: '', approver: '', status: '编制中' }
      ],
      'quality-review-rectify': [
        { id: 'ZG-2026-P01', plan: 'PL-2026-01', reason: '部分程序文件更新滞后', requirement: '按新版标准完成程序文件修订并发布', leader: '王秀云', deadline: '2026-03-10', status: '已完成', verify: '通过' },
        { id: 'ZG-2026-P02', plan: 'PL-2026-04', reason: '检测报告审核环节存在缺漏', requirement: '落实报告二级审核制度，加强过程监督', leader: '吴静', deadline: '2026-07-20', status: '进行中', verify: '待验证' },
        { id: 'ZG-2026-P03', plan: 'PL-2026-04', reason: '试剂验收记录归档不及时', requirement: '完善试剂验收记录归档流程', leader: '陈思远', deadline: '2026-07-15', status: '进行中', verify: '不通过' },
        { id: 'ZG-2026-P04', plan: 'PL-2026-02', reason: '扩项项目人员持证不足', requirement: '组织扩项项目检测人员资质培训与考核', leader: '赵明伟', deadline: '2026-06-30', status: '已完成', verify: '通过' },
        { id: 'ZG-2026-P05', plan: 'PL-2026-01', reason: '样品保存环境温湿度记录不完整', requirement: '完善样品库温湿度自动监测与记录', leader: '周晓梅', deadline: '2026-04-30', status: '已完成', verify: '通过' },
        { id: 'ZG-2026-P06', plan: 'PL-2026-03', reason: '月度数据异常分析滞后', requirement: '建立检测数据月度统计分析机制', leader: '吴静', deadline: '2026-06-10', status: '已完成', verify: '通过' },
        { id: 'ZG-2026-P07', plan: 'PL-2026-05', reason: '下半年资源配置规划待制定', requirement: '编制2026下半年资源配置计划', leader: '孙国栋', deadline: '2026-09-30', status: '待开始', verify: '待验证' },
        { id: 'ZG-2025-P08', plan: 'PL-2025-02', reason: '投诉处理响应时间超限', requirement: '优化投诉处理流程，缩短响应时间', leader: '孙国栋', deadline: '2026-02-15', status: '已完成', verify: '通过' }
      ],
      'quality-audit': [
        { id: 'NS-2026-02', name: '2026年质量管理体系内部审核', type: '要素审核', leader: '王秀云', date: '2026-05-12', nc: 6, percent: 85, status: '进行中' },
        { id: 'NS-2025-03', name: '2025年度内审（全覆盖）', type: '要素审核', leader: '王秀云', date: '2025-11-08', nc: 12, percent: 100, status: '已完成' },
        { id: 'NS-2026-01', name: '检测部质量运行监督审核', type: '部门审核', leader: '王秀云', date: '2026-02-28', nc: 3, percent: 100, status: '已完成' },
        { id: 'NS-2025-02', name: '仪器设备管理专项审核', type: '专项审核', leader: '陈思远', date: '2025-09-20', nc: 5, percent: 100, status: '已完成' },
        { id: 'NS-2025-01', name: '2025年上半年内部审核', type: '要素审核', leader: '王秀云', date: '2025-06-14', nc: 9, percent: 100, status: '已完成' },
        { id: 'NS-2026-03', name: '样品管理流程专项审核', type: '专项审核', leader: '周晓梅', date: '2026-04-18', nc: 4, percent: 60, status: '进行中' },
        { id: 'NS-2026-04', name: '2026年下半年内部审核', type: '要素审核', leader: '王秀云', date: '2026-11-10', nc: 0, percent: 0, status: '待开始' },
        { id: 'NS-2025-04', name: '检测报告质量专项内审', type: '专项审核', leader: '吴静', date: '2025-12-06', nc: 7, percent: 100, status: '已完成' }
      ],
      'quality-audit-clause-element': [
        { id: 'TK-YS-001', element: '人员', standard: 'ISO/IEC 17025', content: '实验室应有足够数量具备相应能力的人员，确保检测活动有效开展。', point: '核查人员档案、培训记录、授权上岗情况及能力确认记录。', status: '有效' },
        { id: 'TK-YS-002', element: '仪器设备', standard: 'ISO/IEC 17025', content: '实验室应配备检测所需设备，设备应满足准确度要求并保持良好状态。', point: '核查设备台账、检定校准证书、维护保养及使用记录。', status: '有效' },
        { id: 'TK-YS-003', element: '量值溯源', standard: 'RB/T 214-2017', content: '测量设备应通过溯源链溯源至国家或国际计量标准。', point: '核查标准和参考物质的溯源证书及校准状态标识。', status: '有效' },
        { id: 'TK-YS-004', element: '样品管理', standard: 'ISO/IEC 17025', content: '实验室应具有检测样品接收、标识、保护、保存和处置的完整程序。', point: '核查样品编号规则、保存环境监控及处置记录。', status: '有效' },
        { id: 'TK-YS-005', element: '合同评审', standard: 'RB/T 214-2017', content: '实验室应在合同签订前评审其是否有能力和资源满足合同要求。', point: '核查合同评审记录、方法确认及偏离处理情况。', status: '修订中' },
        { id: 'TK-YS-006', element: '记录控制', standard: 'ISO/IEC 17025', content: '实验室应保存清晰的原始记录，记录应包含充分信息以便追溯。', point: '核查原始记录完整性、修改规范及存档管理。', status: '有效' },
        { id: 'TK-YS-007', element: '检测结果有效性', standard: 'CNAS-CL01', content: '实验室应有监控检测结果有效性的程序，包括内部质控和外部比对。', point: '核查质控图、盲样测试、能力验证及留样再测记录。', status: '有效' },
        { id: 'TK-YS-008', element: '结果报告', standard: 'CNAS-CL01', content: '实验室出具的报告应准确、清晰、客观，并包含规定信息。', point: '核查报告模板、审核批准流程及报告修改控制。', status: '修订中' },
        { id: 'TK-YS-009', element: '内部审核', standard: 'ISO/IEC 17025', content: '实验室应按策划的时间间隔进行内部审核，以验证体系运行持续符合要求。', point: '核查内审计划、检查表、不符合项及纠正措施落实情况。', status: '有效' },
        { id: 'TK-YS-010', element: '设施与环境', standard: 'RB/T 214-2017', content: '实验室设施与环境条件应满足检测活动要求，并对结果有效性加以监控。', point: '核查环境监控记录、区域划分及侵入控制要求。', status: '有效' }
      ],
      'quality-audit-clause-dept': [
        { id: 'TK-BM-001', dept: '质量管理部门', element: '内部审核', duty: '编制内审计划与检查表，组织年度内审实施，跟踪不符合项整改。', content: '核查质量管理体系文件受控情况、内审报告及整改验证记录。', status: '有效' },
        { id: 'TK-BM-002', dept: '检测实验室', element: '人员', duty: '确保检测人员持证上岗并定期培训考核，规范操作流程。', content: '核查人员资质档案、培训考核记录及岗位授权文件。', status: '有效' },
        { id: 'TK-BM-003', dept: '检测实验室', element: '检测结果有效性', duty: '执行内部质控计划，落实平行样、盲样和能力验证。', content: '核查质控样品数据、趋势分析及异常处理记录。', status: '有效' },
        { id: 'TK-BM-004', dept: '业务受理部', element: '合同评审', duty: '开展委托方需求评审，规范委托协议与客户沟通记录。', content: '核查合同评审记录、委托单信息及变更沟通记录。', status: '有效' },
        { id: 'TK-BM-005', dept: '设备管理部', element: '仪器设备', duty: '建立设备台账，按时检定校准，做好期间核查与维护。', content: '核查设备台账、校准证书有效期及维护保养记录。', status: '有效' },
        { id: 'TK-BM-006', dept: '试剂耗材部', element: '采购服务与供应品', duty: '规范供应商评价、试剂验收与存储管理，保证供应品质量。', content: '核查供应商档案、验收记录及库存管理台账。', status: '修订中' },
        { id: 'TK-BM-007', dept: '样品管理组', element: '样品管理', duty: '规范样品接收、标识、保存与处置流程。', content: '核查样品编号、保存环境温湿度记录及处置审批记录。', status: '有效' },
        { id: 'TK-BM-008', dept: '报告编制组', element: '结果报告', duty: '规范报告编制、二级审核及报告修改控制流程。', content: '核查报告模板版本、审核签名及报告存留备份。', status: '有效' },
        { id: 'TK-BM-009', dept: '人事部', element: '人员', duty: '组织年度培训计划制定与实施，建立人员能力评价档案。', content: '核查培训计划、考核记录及人员能力评价表。', status: '有效' }
      ],
      'quality-audit-year': [
        { id: 'ND-2026', name: '2026年度内部审核计划', year: '2026', count: 2, scope: '全要素全部门', time: '2026.03 - 2026.11', leader: '王秀云', status: '进行中' },
        { id: 'ND-2025', name: '2025年度内部审核计划', year: '2025', count: 2, scope: '全要素全部门', time: '2025.03 - 2025.11', leader: '王秀云', status: '已完成' },
        { id: 'ND-2026-S1', name: '2026年新增项目补充内审计划', year: '2026', count: 1, scope: '新增项目', time: '2026.07', leader: '孙国栋', status: '进行中' },
        { id: 'ND-2024', name: '2024年度内部审核计划', year: '2024', count: 2, scope: '全要素全部门', time: '2024.03 - 2024.11', leader: '王秀云', status: '已完成' },
        { id: 'ND-2027', name: '2027年度内部审核计划（草案）', year: '2027', count: 2, scope: '全要素全部门', time: '2027.03 - 2027.11', leader: '', status: '待开始' },
        { id: 'ND-2026-S2', name: '2026年下半年重点要素内审计划', year: '2026', count: 1, scope: '重点要素', time: '2026.10 - 2026.11', leader: '王秀云', status: '待开始' }
      ],
      'quality-audit-plan': [
        { id: 'SS-2026-01', plan: 'ND-2026', name: '2026年质量管理体系内部审核', type: '要素审核', scope: '全要素 20 项', startDate: '2026-05-11', endDate: '2026-05-12', auditor: '赵明伟、吴静', leader: '王秀云', status: '进行中' },
        { id: 'SS-2026-02', plan: 'ND-2026-S1', name: '新增分子检测项目专项审核', type: '专项审核', scope: '新增项目中心', startDate: '2026-07-20', endDate: '2026-07-21', auditor: '孙国栋、周晓梅', leader: '孙国栋', status: '待开始' },
        { id: 'SS-2026-03', plan: 'ND-2026', name: '检测部质量运行监督审核', type: '部门审核', scope: '检测实验室', startDate: '2026-02-26', endDate: '2026-02-28', auditor: '王秀云、吴静', leader: '王秀云', status: '已完成' },
        { id: 'SS-2025-01', plan: 'ND-2025', name: '2025年度内部审核（上半年）', type: '要素审核', scope: '全要素 20 项', startDate: '2025-06-12', endDate: '2025-06-14', auditor: '赵明伟、周晓梅', leader: '王秀云', status: '已完成' },
        { id: 'SS-2025-02', plan: 'ND-2025', name: '2025年度内部审核（下半年）', type: '要素审核', scope: '全要素 20 项', startDate: '2025-11-06', endDate: '2025-11-08', auditor: '赵明伟、吴静', leader: '王秀云', status: '已完成' },
        { id: 'SS-2026-04', plan: 'ND-2026-S2', name: '下半年重点要素内审', type: '要素审核', scope: '重点要素 8 项', startDate: '2026-11-09', endDate: '2026-11-10', auditor: '赵明伟、吴静', leader: '王秀云', status: '待开始' }
      ],
      'quality-audit-meeting': [
        { id: 'NSHY-2026-001', name: '2026年内审首次会议', type: '首次会议', time: '2026-05-11', location: '3楼会议室', host: '王秀云', count: 16, minutes: '宣布审核目的与范围，明确审核日程与分工，强调审核纪律。', status: '已完成' },
        { id: 'NSHY-2026-002', name: '2026年内审末次会议', type: '末次会议', time: '2026-05-12', location: '3楼会议室', host: '王秀云', count: 18, minutes: '通报审核发现，确认不符合项清单并商定整改期限。', status: '已完成' },
        { id: 'NSHY-2026-003', name: '2026年新增项目内审首次会议', type: '首次会议', time: '2026-07-20', location: '2楼会议室', host: '孙国栋', count: 10, minutes: '部署新增项目专项审核安排。', status: '待开始' },
        { id: 'NSHY-2026-004', name: '审核组每日碰头会（第1天）', type: '审核组内部会议', time: '2026-05-11', location: '审核组工作室', host: '赵明伟', count: 4, minutes: '汇总当日审核发现，研判不符合项证据充分性。', status: '已完成' },
        { id: 'NSHY-2025-001', name: '2025年内审首次会议', type: '首次会议', time: '2025-06-12', location: '学术报告厅', host: '王秀云', count: 20, minutes: '宣布2025年上半年内审启动。', status: '已完成' },
        { id: 'NSHY-2025-002', name: '2025年内审末次会议', type: '末次会议', time: '2025-06-14', location: '学术报告厅', host: '王秀云', count: 20, minutes: '通报上半年内审结论与整改要求。', status: '已完成' }
      ],
      'quality-audit-checklist': [
        { id: 'JCB-2026-01', audit: 'NS-2026-02', element: '人员', dept: '检测实验室', item: '核查检测人员上岗授权与培训考核记录，确认能力满足要求。', method: '查阅记录', result: '符合', evidence: '人员档案齐全，授权文件有效。' },
        { id: 'JCB-2026-02', audit: 'NS-2026-02', element: '仪器设备', dept: '设备管理部', item: '抽查主要仪器检定/校准证书有效性及维护保养记录。', method: '查阅记录', result: '不符合', evidence: 'PCR仪校准超期 12 天，无期间核查记录。' },
        { id: 'JCB-2026-03', audit: 'NS-2026-02', element: '样品管理', dept: '样品管理组', item: '现场核查样品库温度记录与样品标识状态。', method: '现场观察', result: '观察项', evidence: '样品库温湿度记录有 2 天空缺。' },
        { id: 'JCB-2026-04', audit: 'NS-2026-02', element: '记录控制', dept: '检测实验室', item: '抽查原始记录完整性及修改规范性。', method: '实际操作', result: '符合', evidence: '记录修改符合划改签字要求。' },
        { id: 'JCB-2026-05', audit: 'NS-2026-02', element: '合同评审', dept: '业务受理部', item: '核查委托合同评审记录及能力确认情况。', method: '面谈', result: '不符合', evidence: '新项目委托未执行能力确认评审。' },
        { id: 'JCB-2026-06', audit: 'NS-2026-02', element: '结果报告', dept: '报告编制组', item: '抽查报告二级审核签名及报告信息完整性。', method: '查阅记录', result: '符合', evidence: '报告审核流程规范。' },
        { id: 'JCB-2026-07', audit: 'NS-2026-02', element: '量值溯源', dept: '设备管理部', item: '核查计量标准与参考物质的溯源证书。', method: '查阅记录', result: '不适用', evidence: '本年度无新增参考物质。' },
        { id: 'JCB-2026-08', audit: 'NS-2026-02', element: '设施与环境', dept: '检测实验室', item: '现场确认功能区划分与环境监控设施运行。', method: '现场观察', result: '符合', evidence: '功能分区明确，监控设施运行正常。' }
      ],
      'quality-audit-nc': [
        { id: 'NC-2026-001', audit: 'NS-2026-02', level: '严重', element: '仪器设备', dept: '设备管理部', content: '荧光定量PCR仪超过校准有效期 12 天仍用于检测，且未开展期间核查。', requirement: 'ISO/IEC 17025 仪器设备与量值溯源要求。', leader: '陈思远', deadline: '2026-05-26', status: '整改中', verify: '待验证' },
        { id: 'NC-2026-002', audit: 'NS-2026-02', level: '一般', element: '合同评审', dept: '业务受理部', content: '新增分子检测项目委托前未进行能力与资源确认评审。', requirement: 'RB/T 214 合同评审要求。', leader: '孙国栋', deadline: '2026-05-20', status: '已完成', verify: '通过' },
        { id: 'NC-2026-003', audit: 'NS-2026-02', level: '一般', element: '样品管理', dept: '样品管理组', content: '样品库温湿度记录存在 2 天空缺，未完整监控。', requirement: 'CNAS-CL01 设施与环境监控要求。', leader: '周晓梅', deadline: '2026-05-18', status: '已完成', verify: '通过' },
        { id: 'NC-2026-004', audit: 'NS-2026-03', level: '严重', element: '采购服务与供应品', dept: '试剂耗材部', content: '部分试剂验收记录未及时归档，供应商评价未按期开展。', requirement: 'RB/T 214 采购服务与供应品要求。', leader: '陈思远', deadline: '2026-05-15', status: '待整改', verify: '待验证' },
        { id: 'NC-2025-001', audit: 'NS-2025-03', level: '一般', element: '人员', dept: '检测实验室', content: '两名新进检测人员未完成授权即独立出具检测数据。', requirement: 'ISO/IEC 17025 人员能力要求。', leader: '赵明伟', deadline: '2025-11-20', status: '已关闭', verify: '通过' },
        { id: 'NC-2026-005', audit: 'NS-2026-02', level: '观察项', element: '记录控制', dept: '报告编制组', content: '部分报告电子存档未按版本规则命名，检索存在不便。', requirement: 'CNAS-CL01 记录控制要求。', leader: '吴静', deadline: '2026-06-05', status: '整改中', verify: '待验证' }
      ],
      'quality-audit-rectify': [
        { id: 'ZG-2026-A01', nc: 'NC-2026-001', reason: 'PCR仪校准超期且无期间核查', measure: '立即停用该设备送检校准，校准到期前完成期间核查程序文件修订并组织培训。', leader: '陈思远', deadline: '2026-05-26', verifyDate: '', status: '整改中', verify: '待验证' },
        { id: 'ZG-2026-A02', nc: 'NC-2026-002', reason: '新增项目未开展能力确认评审', measure: '补充完成该项目能力与方法确认评审，形成评审记录归档。', leader: '孙国栋', deadline: '2026-05-20', verifyDate: '2026-05-19', status: '已验证', verify: '通过' },
        { id: 'ZG-2026-A03', nc: 'NC-2026-003', reason: '样品库温湿度记录空缺', measure: '启用自动温湿度监测仪并与报警联动，补录缺失期间数据。', leader: '周晓梅', deadline: '2026-05-18', verifyDate: '2026-05-17', status: '已验证', verify: '通过' },
        { id: 'ZG-2026-A04', nc: 'NC-2026-004', reason: '试剂验收记录归档不及时', measure: '修订试剂验收管理流程，明确归档时限并设专人复核。', leader: '陈思远', deadline: '2026-05-15', verifyDate: '', status: '整改中', verify: '待验证' },
        { id: 'ZG-2026-A05', nc: 'NC-2026-005', reason: '报告电子存档命名不规范', measure: '制定报告电子存档命名规则并清理历史档案。', leader: '吴静', deadline: '2026-06-05', verifyDate: '', status: '整改中', verify: '待验证' },
        { id: 'ZG-2025-A01', nc: 'NC-2025-001', reason: '新进人员未授权即出数据', measure: '组织能力考核并完成两名人员授权，建立培训-考核-授权闭环。', leader: '赵明伟', deadline: '2025-11-20', verifyDate: '2025-11-18', status: '已验证', verify: '通过' }
      ],
      'quality-audit-report': [
        { id: 'NSBG-2026-01', name: '2026年质量管理体系内部审核报告', audit: 'NS-2026-02', summary: '体系运行总体有效，共发现不符合项 6 项（严重 2 项、一般 3 项、观察项 1 项），已完成整改 3 项。', totalNc: 6, closedNc: 3, author: '王秀云', date: '2026-06-05', approver: '张丽华', status: '已批准' },
        { id: 'NSBG-2026-02', name: '2026年新增项目专项内审报告', audit: 'NS-2026-03', summary: '新增项目体系运行情况基本符合要求，发现不符合项 4 项，正在整改。', totalNc: 4, closedNc: 1, author: '孙国栋', date: '2026-07-30', approver: '', status: '编制中' },
        { id: 'NSBG-2025-01', name: '2025年度内部审核报告（下半年）', audit: 'NS-2025-03', summary: '全年两次内审覆盖全部要素与部门，共发现不符合项 21 项，均已按期完成整改并通过验证。', totalNc: 21, closedNc: 21, author: '王秀云', date: '2025-11-30', approver: '张丽华', status: '已批准' },
        { id: 'NSBG-2025-02', name: '2026年下半年内部审核报告', audit: 'NS-2026-04', summary: '审核尚未开展。', totalNc: 0, closedNc: 0, author: '王秀云', date: '', approver: '', status: '编制中' },
        { id: 'NSBG-2025-03', name: '2025年上半年内部审核报告', audit: 'NS-2025-01', summary: '上半年内审发现 9 项不符合项，均已关闭。', totalNc: 9, closedNc: 9, author: '王秀云', date: '2025-07-05', approver: '张丽华', status: '已批准' }
      ],
      'quality-supervise': [
        { id: 'JD-2026-021', name: '样品接收环节周期监督', type: '周期性监督', leader: '周晓梅', target: '样品接收岗', date: '2026-03-05', issue: '样品交接记录签名不完整', status: '已完成' },
        { id: 'JD-2026-022', name: '分子检测操作规范性监督', type: '日常监督', leader: '王秀云', target: '分子检测组', date: '2026-03-12', issue: '未发现异常', status: '已完成' },
        { id: 'JD-2026-030', name: '检测报告出具流程监督', type: '专项监督', leader: '吴静', target: '报告编制岗', date: '2026-04-20', issue: '报告二级审核缺失', status: '进行中' },
        { id: 'JD-2026-033', name: '试剂验收环节监督', type: '周期性监督', leader: '陈思远', target: '试剂库', date: '2026-05-08', issue: '验收记录未及时归档', status: '进行中' },
        { id: 'JD-2025-040', name: '仪器校准期间核查监督', type: '专项监督', leader: '陈思远', target: '仪器管理组', date: '2025-12-15', issue: '未发现异常', status: '已完成' },
        { id: 'JD-2026-008', name: '数据录入准确性监督', type: '日常监督', leader: '赵明伟', target: '数据录入岗', date: '2026-01-22', issue: '录入偏差2例已更正', status: '已完成' },
        { id: 'JD-2026-036', name: '无菌操作规范性监督', type: '日常监督', leader: '赵明伟', target: '组培室', date: '2026-06-10', issue: '待检查', status: '待开始' },
        { id: 'JD-2026-040', name: '样品保存状态专项监督', type: '专项监督', leader: '周晓梅', target: '样品库', date: '2026-07-01', issue: '待检查', status: '待开始' }
      ],
      'quality-supervise-plan-periodic': [
        { id: 'ZC-2026-P1', name: '2026年周期性质量监督计划', cycle: '季度', target: '样品接收/检测/报告全流程', focus: '规范样品交接、检测操作、数据记录、报告审核各关键环节', leader: '王秀云', time: '2026.01 - 2026.12', status: '进行中' },
        { id: 'ZC-2026-P2', name: '试剂耗材采购验收定期监督', cycle: '月度', target: '试剂耗材部/试剂库', focus: '供应商资质、验收记录、库存效期管理', leader: '陈思远', time: '2026.01 - 2026.12', status: '进行中' },
        { id: 'ZC-2026-P3', name: '设备维护与期间核查定期监督', cycle: '半年', target: '设备管理部', focus: '设备台账、校准有效期、期间核查执行情况', leader: '孙国栋', time: '2026.01 - 2026.12', status: '进行中' },
        { id: 'ZC-2027-P1', name: '2027年周期性质量监督计划', cycle: '季度', target: '全流程关键岗位', focus: '覆盖全部关键监督点', leader: '王秀云', time: '2027.01 - 2027.12', status: '待开始' },
        { id: 'ZC-2025-P2', name: '2025年下半年检测过程定期监督', cycle: '月度', target: '检测实验室', focus: '操作规范性、记录完整性', leader: '王秀云', time: '2025.07 - 2025.12', status: '已完成' }
      ],
      'quality-supervise-plan-special': [
        { id: 'ZX-2026-01', name: '新冠肺炎核酸检测专项监督', object: '新冠核酸检测项目', standard: '检测方法标准', focus: '人员防护、样本处理、扩增与结果判读全过程', leader: '赵明伟', date: '2026-03-18', status: '已完成' },
        { id: 'ZX-2026-02', name: '生物安全防护专项监督', object: '检测实验室生物安全', standard: '体系程序文件', focus: '个人防护、废弃物处置、应急演练', leader: '周晓梅', date: '2026-07-08', status: '已完成' },
        { id: 'ZX-2026-03', name: '检测报告质量专项监督', object: '报告编制与审核', standard: 'RB/T 214-2017', focus: '报告信息完整性、审核流程、修改控制', leader: '吴静', date: '2026-09-10', status: '进行中' },
        { id: 'ZX-2026-04', name: '新入职人员培训效果专项监督', object: '新进检测人员', standard: 'ISO/IEC 17025', focus: '培训考核、授权上岗、实操规范性', leader: '孙国栋', date: '2026-10-15', status: '待开始' },
        { id: 'ZX-2025-01', name: '仪器设备期间核查专项监督', object: '主要检测设备', standard: '体系程序文件', focus: '期间核查方法与记录完备性', leader: '陈思远', date: '2025-11-05', status: '已完成' }
      ],
      'quality-supervise-task': [
        { id: 'RW-2026-001', plan: 'ZC-2026-P1', name: '一季度样品交接环节监督', target: '样品接收岗', leader: '周晓梅', time: '2026-03-05', deadline: '2026-03-10', status: '已完成' },
        { id: 'RW-2026-002', plan: 'ZC-2026-P2', name: '试剂验收记录月度抽查', target: '试剂库', leader: '陈思远', time: '2026-05-08', deadline: '2026-05-15', status: '已完成' },
        { id: 'RW-2026-003', plan: 'ZC-2026-P3', name: '设备校准与期间核查核查', target: '设备管理部', leader: '孙国栋', time: '2026-06-12', deadline: '2026-06-20', status: '已完成' },
        { id: 'RW-2026-004', plan: 'ZX-2026-03', name: '报告审核流程专项检查', target: '报告编制组', leader: '吴静', time: '2026-09-10', deadline: '2026-09-25', status: '执行中' },
        { id: 'RW-2026-005', plan: 'ZC-2026-P1', name: '原始记录修改规范性抽查', target: '检测实验室', leader: '吴静', time: '2026-08-15', deadline: '2026-08-22', status: '执行中' },
        { id: 'RW-2026-006', plan: 'ZX-2026-04', name: '新进人员实操考核监督', target: '新进检测人员', leader: '孙国栋', time: '2026-10-15', deadline: '2026-10-25', status: '待执行' },
        { id: 'RW-2026-007', plan: 'ZX-2026-02', name: '生物安全防护现场监督', target: '检测实验室', leader: '赵明伟', time: '2026-07-08', deadline: '2026-07-15', status: '已完成' }
      ],
      'quality-supervise-record': [
        { id: 'JL-2026-001', task: 'RW-2026-001', target: '样品接收岗', leader: '周晓梅', date: '2026-03-05', method: '现场观察', content: '样品交接、编号、分装流程全程观察', issue: '样品交接记录签名不完整（2份）', handle: '当场要求补签并强调交接规范', status: '已记录' },
        { id: 'JL-2026-002', task: 'RW-2026-002', target: '试剂库', leader: '陈思远', date: '2026-05-08', method: '查阅记录', content: '抽查当月到货试剂验收记录', issue: '2 批次验收记录未及时归档', handle: '督促完善验收流程并补全记录', status: '已记录' },
        { id: 'JL-2026-003', task: 'RW-2026-003', target: '设备管理部', leader: '孙国栋', date: '2026-06-12', method: '查阅记录', content: '核查设备台账、校准证书及期间核查记录', issue: '期间核查计划未按期执行（2台）', handle: '要求排期补做期间核查', status: '待评价' },
        { id: 'JL-2026-004', task: 'RW-2026-004', target: '报告编制组', leader: '吴静', date: '2026-09-10', method: '实际操作', content: '随机抽取近期报告核查二级审核', issue: '发现 1 份报告缺二级审核签名', handle: '退回补审并通报批评', status: '待评价' },
        { id: 'JL-2026-005', task: 'RW-2026-005', target: '检测实验室', leader: '吴静', date: '2026-08-15', method: '现场观察', content: '观察检测原始数据记录过程', issue: '原始记录修改未划改签字', handle: '当场纠正并宣贯记录修改规范', status: '待评价' },
        { id: 'JL-2026-006', task: 'RW-2026-007', target: '检测实验室', leader: '赵明伟', date: '2026-07-08', method: '现场观察', content: '生物安全防护设施及废弃物处置检查', issue: '未发现异常', handle: '无', status: '已记录' }
      ],
      'quality-supervise-eval': [
        { id: 'PJ-2026-001', record: 'JL-2026-001', target: '样品接收岗', judge: '王秀云', date: '2026-03-12', score: 92, result: '合格', opinion: '基本符合要求，签名完整性问题已现场纠正，后续观察。' },
        { id: 'PJ-2026-002', record: 'JL-2026-002', target: '试剂库', judge: '王秀云', date: '2026-05-12', score: 88, result: '合格', opinion: '验收流程已完善，持续关注归档及时性。' },
        { id: 'PJ-2026-003', record: 'JL-2026-003', target: '设备管理部', judge: '王秀云', date: '2026-06-15', score: 75, result: '基本合格', opinion: '设备管理整体规范，期间核查滞后需重点整改。' },
        { id: 'PJ-2026-004', record: 'JL-2026-004', target: '报告编制组', judge: '孙国栋', date: '2026-09-14', score: 70, result: '基本合格', opinion: '报告质量把关存在疏漏，需加强二级审核培训。' },
        { id: 'PJ-2026-005', record: 'JL-2026-005', target: '检测实验室', judge: '孙国栋', date: '2026-08-19', score: 82, result: '合格', opinion: '记录规范性有待加强，已安排专项宣贯。' },
        { id: 'PJ-2025-001', record: 'JL-2025-006', target: '检测实验室', judge: '王秀云', date: '2025-12-15', score: 95, result: '合格', opinion: '生物安全防护落实到位。' }
      ],
      'quality-supervise-audit': [
        { id: 'SH-2026-001', eval: 'PJ-2026-001', target: '样品接收岗', auditor: '张丽华', date: '2026-03-15', opinion: '评价客观合理，同意结果。', status: '已审核' },
        { id: 'SH-2026-002', eval: 'PJ-2026-002', target: '试剂库', auditor: '张丽华', date: '2026-05-14', opinion: '同意评价意见，督促部门整改闭环。', status: '已审核' },
        { id: 'SH-2026-003', eval: 'PJ-2026-003', target: '设备管理部', auditor: '张丽华', date: '2026-06-18', opinion: '评价结果待补充整改跟踪情况后复核。', status: '待审核' },
        { id: 'SH-2026-004', eval: 'PJ-2026-004', target: '报告编制组', auditor: '张丽华', date: '', opinion: '待评价流程完成后审核。', status: '待审核' },
        { id: 'SH-2026-005', eval: 'PJ-2026-005', target: '检测实验室', auditor: '张丽华', date: '2026-08-22', opinion: '同意结果，需跟踪记录修改内训落实情况。', status: '已审核' },
        { id: 'SH-2025-001', eval: 'PJ-2025-001', target: '检测实验室', auditor: '张丽华', date: '2025-12-18', opinion: '同意评价，予以归档。', status: '已审核' }
      ],
      'quality-supervise-stat': [
        { id: 'TJ-2026-S1', period: '2026年上半年', type: '周期性监督', count: 14, issue: 6, fixed: 5, fixRate: 83, qualifyRate: 92 },
        { id: 'TJ-2026-S2', period: '2026年上半年', type: '专项监督', count: 5, issue: 3, fixed: 3, fixRate: 100, qualifyRate: 88 },
        { id: 'TJ-2025-H2', period: '2025年下半年', type: '周期性监督', count: 16, issue: 8, fixed: 8, fixRate: 100, qualifyRate: 90 },
        { id: 'TJ-2025-H2Z', period: '2025年下半年', type: '专项监督', count: 6, issue: 4, fixed: 4, fixRate: 100, qualifyRate: 85 },
        { id: 'TJ-2026-Q3', period: '2026年第三季度', type: '周期性监督', count: 8, issue: 4, fixed: 2, fixRate: 50, qualifyRate: 86 },
        { id: 'TJ-2026-Q3Z', period: '2026年第三季度', type: '专项监督', count: 3, issue: 1, fixed: 0, fixRate: 0, qualifyRate: 95 }
      ],
      'quality-supervise-upload': [
        { id: 'SC-2026-001', plan: 'ZC-2026-P1', result: '一季度样品接收环节监督：交接记录签名完整性提升，现场纠正2份漏签；建议加强新员工交接规范培训。', files: '样品接收监督记录扫描件.pdf\n现场纠正照片.zip', submitter: '周晓梅', submitTime: '2026-03-10', status: '已通过', auditor: '张丽华', auditTime: '2026-03-12', auditOpinion: '监督记录详实，结论客观，予以归档。' },
        { id: 'SC-2026-002', plan: 'RW-2026-002', result: '试剂验收记录月度抽查：发现2批次未及时归档，已督促补全；流程整体规范。', files: '试剂验收抽查记录.xlsx', submitter: '陈思远', submitTime: '2026-05-15', status: '已通过', auditor: '张丽华', auditTime: '2026-05-18', auditOpinion: '同意评价意见，需持续关注归档及时性。' },
        { id: 'SC-2026-003', plan: 'RW-2026-003', result: '设备期间核查执行情况：2台设备未按期执行期间核查，已安排排期补做；其余设备校准证书均在有效期内。', files: '设备台账核查表.xlsx\n期间核查计划.pdf', submitter: '孙国栋', submitTime: '2026-06-18', status: '待审核', auditor: '', auditTime: '', auditOpinion: '' },
        { id: 'SC-2026-004', plan: 'RW-2026-004', result: '报告审核专项检查：抽检报告50份，发现1份缺二级审核签名，已退回补审并通报批评；建议加强报告签发流程把关。', files: '报告抽检清单.xlsx\n整改通知单.docx', submitter: '吴静', submitTime: '2026-09-18', status: '待审核', auditor: '', auditTime: '', auditOpinion: '' },
        { id: 'SC-2026-005', plan: 'ZC-2026-P1', result: '二季度原始记录修改规范性抽查：发现3处修改未划改签字，已当场纠正并组织专项宣贯。', files: '记录修改抽查清单.pdf', submitter: '吴静', submitTime: '2026-08-20', status: '已驳回', auditor: '张丽华', auditTime: '2026-08-22', auditOpinion: '需补充宣贯培训签到表与照片后重新提交。' },
        { id: 'SC-2026-006', plan: 'ZX-2026-02', result: '生物安全防护专项监督：个人防护、废弃物处置、应急通道均符合要求；建议定期开展应急演练。', files: '生物安全检查表.pdf\n现场照片.zip', submitter: '赵明伟', submitTime: '2026-07-12', status: '已通过', auditor: '张丽华', auditTime: '2026-07-15', auditOpinion: '同意，予以归档。' },
        { id: 'SC-2026-007', plan: 'RW-2026-006', result: '', files: '', submitter: '', submitTime: '', status: '草稿', auditor: '', auditTime: '', auditOpinion: '' },
        { id: 'SC-2026-008', plan: 'ZC-2026-P2', result: '8月份试剂耗材验收定期监督：本月抽检3批次，验收记录及时归档，无异常。', files: '', submitter: '陈思远', submitTime: '', status: '草稿', auditor: '', auditTime: '', auditOpinion: '' }
      ],
      'quality-control-plan-internal': [
        { id: 'NQ-2026-I1', name: '乙肝表面抗原定量室内质控', sample: 'BD-PC-2601', freq: '每批', mean: 3.5, sd: 0.15, limit: '±3SD', focus: 'Westgard多规则：1-2s/2-2s/R-4s/4-1s/10x', leader: '王秀云', status: '进行中' },
        { id: 'NQ-2026-I2', name: 'HIV抗体检测室内质控', sample: 'HIV-QC-2508', freq: '每批', mean: 2.8, sd: 0.2, limit: '±3SD', focus: '定性弱阳性质控，每日2个浓度水平', leader: '李建平', status: '进行中' },
        { id: 'NQ-2026-I3', name: '核酸提取浓度室内质控', sample: 'DNA-QC-2602', freq: '每天', mean: 98.2, sd: 1.1, limit: '±2SD', focus: '提取量一致性监控', leader: '吴静', status: '进行中' },
        { id: 'NQ-2026-I4', name: 'PCR扩增仪温度校正质控', sample: 'PCR-QC-2604', freq: '每月', mean: 95.0, sd: 0.5, limit: '±2SD', focus: '梯度温度准确性验证', leader: '赵明伟', status: '待开始' },
        { id: 'NQ-2025-I5', name: '梅毒螺旋体抗体室内质控', sample: 'TP-QC-2506', freq: '每批', mean: 4.2, sd: 0.3, limit: '±3SD', focus: '双水平质控品覆盖阴/阳判断', leader: '王秀云', status: '已完成' }
      ],
      'quality-control-plan-parallel': [
        { id: 'PX-2026-01', name: '血清样本核酸提取平行样计划', sample: '血清样本', dups: 3, diff: 5, focus: 'HIV/乙肝/丙肝核酸检测', leader: '周晓梅', status: '进行中' },
        { id: 'PX-2026-02', name: '拭子样本检测平行样计划', sample: '咽拭子样本', dups: 2, diff: 8, focus: '沙眼衣原体/淋球菌', leader: '吴静', status: '进行中' },
        { id: 'PX-2026-03', name: '植物组织样本提取平行样计划', sample: '花卉组织样本', dups: 2, diff: 10, focus: '病毒RNA提取与检测', leader: '孙国栋', status: '待开始' },
        { id: 'PX-2025-04', name: '全血样本核酸提取平行样', sample: '全血样本', dups: 3, diff: 5, focus: '结核分枝杆菌检测', leader: '周晓梅', status: '已完成' }
      ],
      'quality-control-plan-blank': [
        { id: 'BK-2026-01', name: '核酸检测空白对照计划', sample: '纯水空白', blankLimit: 38, focus: 'PCR扩增污染监控', leader: '吴静', date: '2026-02-10', status: '进行中' },
        { id: 'BK-2026-02', name: '样本处理空白对照计划', sample: '阴性基质', blankLimit: 0, focus: '提取试剂与操作污染监控', leader: '王秀云', date: '2026-03-05', status: '进行中' },
        { id: 'BK-2026-03', name: '反应体系空白对照计划', sample: '纯水空白', blankLimit: 38, focus: '试剂批间空白验证', leader: '陈思远', date: '2026-05-18', status: '待开始' }
      ],
      'quality-control-plan-recovery': [
        { id: 'HS-2026-01', name: '血清加标回收计划', sample: '血清基质', spike: '100 IU/mL', recovery: 100, low: 90, high: 110, leader: '王秀云', status: '进行中' },
        { id: 'HS-2026-02', name: '植物组织加标回收计划', sample: '花卉组织匀浆', spike: '10^4 copies/mL', recovery: 95, low: 85, high: 105, leader: '孙国栋', status: '待开始' },
        { id: 'HS-2025-03', name: '全血加标回收计划', sample: '全血样本', spike: '50 IU/mL', recovery: 98, low: 88, high: 108, leader: '周晓梅', status: '已完成' }
      ],
      'quality-control-task': [
        { id: 'RZ-2026-001', plan: 'NQ-2026-I1', name: '每批乙肝表面抗原室内质控', project: '乙肝表面抗原', leader: '王秀云', time: '2026-03-02', deadline: '2026-03-09', status: '已完成' },
        { id: 'RZ-2026-002', plan: 'PX-2026-01', name: '血清样本平行样检测', project: 'HIV/丙肝核酸检测', leader: '周晓梅', time: '2026-04-10', deadline: '2026-04-20', status: '已完成' },
        { id: 'RZ-2026-003', plan: 'BK-2026-01', name: 'PCR空白对照监控', project: '核酸检测', leader: '吴静', time: '2026-05-15', deadline: '2026-05-30', status: '执行中' },
        { id: 'RZ-2026-004', plan: 'NQ-2026-I3', name: '每日核酸提取浓度质控', project: '核酸提取', leader: '吴静', time: '2026-06-01', deadline: '2026-06-30', status: '执行中' },
        { id: 'RZ-2026-005', plan: 'HS-2026-01', name: '血清加标回收实验', project: '乙肝表面抗原', leader: '王秀云', time: '2026-08-10', deadline: '2026-08-25', status: '待执行' },
        { id: 'RZ-2026-006', plan: 'NQ-2026-I4', name: 'PCR仪温度校正质控', project: 'PCR扩增仪', leader: '赵明伟', time: '2026-09-01', deadline: '2026-09-12', status: '待执行' }
      ],
      'quality-control-data': [
        { id: 'SJ-2026-001', project: '乙肝表面抗原', batch: 'SJ-20260302', sample: 'BD-PC-2601', value: 3.45, mean: 3.5, sd: 0.15, date: '2026-03-02', leader: '王秀云', status: '已录入' },
        { id: 'SJ-2026-002', project: '乙肝表面抗原', batch: 'SJ-20260305', sample: 'BD-PC-2601', value: 3.62, mean: 3.5, sd: 0.15, date: '2026-03-05', leader: '王秀云', status: '已录入' },
        { id: 'SJ-2026-003', project: 'HIV抗体', batch: 'SJ-20260308', sample: 'HIV-QC-2508', value: 2.7, mean: 2.8, sd: 0.2, date: '2026-03-08', leader: '李建平', status: '已录入' },
        { id: 'SJ-2026-004', project: '核酸提取', batch: 'SJ-20260601', sample: 'DNA-QC-2602', value: 101.5, mean: 98.2, sd: 1.1, date: '2026-06-01', leader: '吴静', status: '待评价' },
        { id: 'SJ-2026-005', project: '核酸提取', batch: 'SJ-20260602', sample: 'DNA-QC-2602', value: 96.8, mean: 98.2, sd: 1.1, date: '2026-06-02', leader: '吴静', status: '待评价' },
        { id: 'SJ-2026-006', project: '梅毒螺旋体', batch: 'SJ-20250901', sample: 'TP-QC-2506', value: 4.1, mean: 4.2, sd: 0.3, date: '2025-09-01', leader: '王秀云', status: '已录入' }
      ],
      'quality-control-eval': [
        { id: 'PG-2026-001', record: 'SJ-2026-001', project: '乙肝表面抗原', batch: 'SJ-20260302', value: 3.45, mean: 3.5, sd: 0.15, rule: '无', result: '在控', judge: '王秀云', date: '2026-03-03' },
        { id: 'PG-2026-002', record: 'SJ-2026-002', project: '乙肝表面抗原', batch: 'SJ-20260305', value: 3.62, mean: 3.5, sd: 0.15, rule: '2-2s', result: '失控', judge: '王秀云', date: '2026-03-06' },
        { id: 'PG-2026-003', record: 'SJ-2026-004', project: '核酸提取', batch: 'SJ-20260601', value: 101.5, mean: 98.2, sd: 1.1, rule: '1-2s', result: '警告', judge: '吴静', date: '2026-06-02' },
        { id: 'PG-2026-004', record: 'SJ-2026-005', project: '核酸提取', batch: 'SJ-20260602', value: 96.8, mean: 98.2, sd: 1.1, rule: '无', result: '在控', judge: '吴静', date: '2026-06-03' },
        { id: 'PG-2026-005', record: 'SJ-2026-006', project: '梅毒螺旋体', batch: 'SJ-20250901', value: 4.1, mean: 4.2, sd: 0.3, rule: '无', result: '在控', judge: '王秀云', date: '2025-09-02' },
        { id: 'PG-2026-006', record: 'SJ-2026-003', project: 'HIV抗体', batch: 'SJ-20260308', value: 2.7, mean: 2.8, sd: 0.2, rule: '无', result: '在控', judge: '李建平', date: '2026-03-09' }
      ],
      'quality-control-audit': [
        { id: 'SH-2026-001', eval: 'PG-2026-001', project: '乙肝表面抗原', batch: 'SJ-20260302', auditor: '张丽华', date: '2026-03-04', opinion: '判定正确，数据在控，同意归档。', status: '已审核' },
        { id: 'SH-2026-002', eval: 'PG-2026-002', project: '乙肝表面抗原', batch: 'SJ-20260305', auditor: '张丽华', date: '2026-03-07', opinion: '失控判定合理，转失控处理流程。', status: '已审核' },
        { id: 'SH-2026-003', eval: 'PG-2026-003', project: '核酸提取', batch: 'SJ-20260601', auditor: '张丽华', date: '', opinion: '待复核Westgard规则判读。', status: '待审核' },
        { id: 'SH-2026-004', eval: 'PG-2026-004', project: '核酸提取', batch: 'SJ-20260602', auditor: '张丽华', date: '2026-06-04', opinion: '在控判定正确。', status: '已审核' },
        { id: 'SH-2026-005', eval: 'PG-2026-005', project: '梅毒螺旋体', batch: 'SJ-20250901', auditor: '张丽华', date: '2025-09-03', opinion: '无异常。', status: '已审核' }
      ],
      'quality-control-nc': [
        { id: 'SK-2026-001', eval: 'PG-2026-002', project: '乙肝表面抗原', batch: 'SJ-20260305', reason: '连续两点超过2SD，疑为标准品批号变更导致系统偏差', handle: '更换质控品并复查质控数据，重新评估均值与SD', deadline: '2026-03-15', status: '已处理' },
        { id: 'SK-2026-002', eval: 'PG-2026-003', project: '核酸提取', batch: 'SJ-20260601', reason: '单点超2SD，疑为试剂开瓶批次差异', handle: '核对试剂批号，追加空白对照与平行样验证', deadline: '2026-06-12', status: '处理中' },
        { id: 'SK-2026-003', eval: 'PG-2026-005', project: '梅毒螺旋体', batch: 'SJ-20250901', reason: '质控仪设备温度漂移', handle: '工程师校准设备温度模块', deadline: '2025-09-15', status: '已处理' }
      ],
      'quality-control-stat': [
        { id: 'QZ-2026-Q1', period: '2026年Q1', project: '乙肝表面抗原', batches: 26, inControl: 24, warning: 1, outOf: 1, rate: 92 },
        { id: 'QZ-2026-Q1', period: '2026年Q1', project: 'HIV抗体', batches: 22, inControl: 21, warning: 1, outOf: 0, rate: 95 },
        { id: 'QZ-2026-Q2', period: '2026年Q2', project: '乙肝表面抗原', batches: 24, inControl: 22, warning: 1, outOf: 1, rate: 92 },
        { id: 'QZ-2026-Q2', period: '2026年Q2', project: '核酸提取', batches: 30, inControl: 28, warning: 1, outOf: 1, rate: 93 },
        { id: 'QZ-2025-H2', period: '2025年H2', project: '梅毒螺旋体', batches: 26, inControl: 25, warning: 1, outOf: 0, rate: 96 }
      ],
      'quality-proficiency-plan-pt': [
        { id: 'PT-2026-01', name: '2026年HIV抗体检测能力验证', org: 'CNAS能力验证', item: 'HIV抗体', date: '2026.03 - 2026.05', fee: 2000, leader: '王秀云', status: '进行中' },
        { id: 'PT-2026-02', name: '2026年乙肝表面抗原能力验证', org: '国家卫健委临检中心', item: '乙肝表面抗原', date: '2026.06 - 2026.08', fee: 1800, leader: '李建平', status: '进行中' },
        { id: 'PT-2026-03', name: '2026年HPV-DNA检测能力验证', org: '省临床检验中心', item: 'HPV-DNA', date: '2026.09 - 2026.11', fee: 2200, leader: '赵明伟', status: '待开始' },
        { id: 'PT-2025-04', name: '2025年结核分枝杆菌能力验证', org: 'CNAS能力验证', item: '结核分枝杆菌', date: '2025.04 - 2025.06', fee: 2000, leader: '周晓梅', status: '已完成' },
        { id: 'PT-2025-05', name: '2025年沙眼衣原体能力验证', org: '省临床检验中心', item: '沙眼衣原体', date: '2025.09 - 2025.11', fee: 1600, leader: '吴静', status: '已完成' }
      ],
      'quality-proficiency-plan-compare': [
        { id: 'BD-2026-01', name: 'RNA提取阳性判读实验室间比对', partner: '市疾控中心检验科', item: 'HIV抗体', date: '2026.04 - 2026.06', standard: 'Z值≤2', leader: '王秀云', status: '进行中' },
        { id: 'BD-2026-02', name: '病毒载量检测实验室间比对', partner: '省农科院检测中心', item: 'HPV-DNA', date: '2026.07 - 2026.09', standard: '相对偏差≤10%', leader: '赵明伟', status: '待开始' },
        { id: 'BD-2025-03', name: '定性检测结果实验室间比对', partner: '医科大学附属医院', item: '淋球菌', date: '2025.05 - 2025.07', standard: 'Z值≤2', leader: '周晓梅', status: '已完成' }
      ],
      'quality-proficiency-signup': [
        { id: 'BM-2026-001', plan: 'PT-2026-01', org: 'CNAS能力验证', item: 'HIV抗体', applicant: '王秀云', date: '2026-03-02', deadline: '2026-03-20', status: '已确认' },
        { id: 'BM-2026-002', plan: 'PT-2026-02', org: '国家卫健委临检中心', item: '乙肝表面抗原', applicant: '李建平', date: '2026-06-01', deadline: '2026-06-20', status: '待确认' },
        { id: 'BM-2026-003', plan: 'PT-2026-03', org: '省临床检验中心', item: 'HPV-DNA', applicant: '赵明伟', date: '2026-08-15', deadline: '2026-09-05', status: '待确认' },
        { id: 'BM-2026-004', plan: 'BD-2026-01', org: '区域实验室间比对', item: 'HIV抗体', applicant: '周晓梅', date: '2026-04-06', deadline: '2026-04-20', status: '已确认' },
        { id: 'BM-2025-005', plan: 'PT-2025-05', org: '省临床检验中心', item: '沙眼衣原体', applicant: '吴静', date: '2025-09-01', deadline: '2025-09-15', status: '已确认' }
      ],
      'quality-proficiency-record': [
        { id: 'PTJL-2026-001', plan: 'PT-2026-01', org: 'CNAS能力验证', item: 'HIV抗体', code: 'PT-2603A', receive: '2026-04-05', testDate: '2026-04-10', result: '阳性(判读一致)', leader: '王秀云', status: '已完成' },
        { id: 'PTJL-2026-002', plan: 'PT-2026-01', org: 'CNAS能力验证', item: 'HIV抗体', code: 'PT-2603B', receive: '2026-04-05', testDate: '2026-04-10', result: '阴性(判读一致)', leader: '王秀云', status: '已完成' },
        { id: 'PTJL-2026-003', plan: 'BD-2026-01', org: '区域实验室间比对', item: 'HIV抗体', code: 'JB-2604X', receive: '2026-05-06', testDate: '', result: '', leader: '周晓梅', status: '进行中' },
        { id: 'PTJL-2026-004', plan: 'PT-2026-02', org: '国家卫健委临检中心', item: '乙肝表面抗原', code: 'PT-2606C', receive: '', testDate: '', result: '', leader: '李建平', status: '进行中' },
        { id: 'PTJL-2025-005', plan: 'PT-2025-04', org: 'CNAS能力验证', item: '结核分枝杆菌', code: 'PT-2504A', receive: '2025-05-02', testDate: '2025-05-12', result: '阳性(判读一致)', leader: '周晓梅', status: '已完成' }
      ],
      'quality-proficiency-review': [
        { id: 'PS-2026-01', plan: 'PT-2026-01', org: 'CNAS能力验证', item: 'HIV抗体', result: '全部判读一致', zScore: 0.8, evaluation: '满意', reviewer: '张丽华', date: '2026-06-28' },
        { id: 'PS-2026-02', plan: 'PT-2026-02', org: '国家卫健委临检中心', item: '乙肝表面抗原', result: '待结果返回', zScore: 0, evaluation: '满意', reviewer: '张丽华', date: '2026-06-28' },
        { id: 'PS-2026-03', plan: 'BD-2026-01', org: '区域实验室间比对', item: 'HIV抗体', result: '1份结果偏差', zScore: 2.6, evaluation: '可疑', reviewer: '张丽华', date: '2026-07-05' },
        { id: 'PS-2025-04', plan: 'PT-2025-04', org: 'CNAS能力验证', item: '结核分枝杆菌', result: '全部判读一致', zScore: 0.6, evaluation: '满意', reviewer: '张丽华', date: '2025-07-20' },
        { id: 'PS-2025-05', plan: 'PT-2025-05', org: '省临床检验中心', item: '沙眼衣原体', result: '2份结果偏差', zScore: 3.2, evaluation: '不满意', reviewer: '张丽华', date: '2025-12-18' }
      ],
      'quality-proficiency-audit': [
        { id: 'SHPT-2026-001', review: 'PS-2026-01', item: 'HIV抗体', auditor: '刘志强', date: '2026-07-02', opinion: '评审表信息完整，能力评定正确。', status: '已审核' },
        { id: 'SHPT-2026-002', review: 'PS-2026-03', item: 'HIV抗体', auditor: '刘志强', date: '2026-07-08', opinion: '可疑结果需发起整改跟踪。', status: '已审核' },
        { id: 'SHPT-2026-003', review: 'PS-2026-05', item: '沙眼衣原体', auditor: '刘志强', date: '2025-12-22', opinion: '不满意结果，启动纠正措施。', status: '已审核' },
        { id: 'SHPT-2026-004', review: 'PS-2026-02', item: '乙肝表面抗原', auditor: '刘志强', date: '', opinion: '待结果返回后审核。', status: '待审核' }
      ],
      'quality-proficiency-stat': [
        { id: 'PTTJ-2026', period: '2026年度', org: 'CNAS能力验证', items: 6, satisfactory: 5, questionable: 1, unsatisfactory: 0, rate: 83 },
        { id: 'PTTJ-2025', period: '2025年度', org: 'CNAS能力验证', items: 8, satisfactory: 6, questionable: 1, unsatisfactory: 1, rate: 75 },
        { id: 'PTTJ-2025-Q', period: '2025年度', org: '省临床检验中心', items: 6, satisfactory: 5, questionable: 0, unsatisfactory: 1, rate: 83 },
        { id: 'PTTJ-2026-J', period: '2026年度', org: '区域实验室间比对', items: 4, satisfactory: 3, questionable: 1, unsatisfactory: 0, rate: 75 }
      ],
      'quality-proficiency-rectify': [
        { id: 'ZG-2026-001', review: 'PS-2026-03', org: '区域实验室间比对', item: 'HIV抗体', result: '可疑', reason: '1份弱阳性样本漏检，疑为试剂灵敏度批次差异', measure: '更换试剂批次并复测，加强弱阳性样本判读培训', deadline: '2026-07-20', status: '整改中' },
        { id: 'ZG-2026-002', review: 'PS-2026-05', org: '省临床检验中心', item: '沙眼衣原体', result: '不满意', reason: '2份样本判断错误，疑为人员操作规范问题', measure: '组织操作培训考核，修订SOP并复核', deadline: '2026-01-10', status: '已验证' },
        { id: 'ZG-2026-003', review: 'PS-2026-02', org: '国家卫健委临检中心', item: '乙肝表面抗原', result: '满意', reason: '', measure: '', deadline: '', status: '待整改' }
      ],
      'quality-control': [
        { id: 'ZK-2026-005', name: '病毒核酸检测室内质控', type: '室内质控', method: '标准物质', date: '2026-03-10', leader: '王秀云', eval: '在控', status: '已完成' },
        { id: 'ZK-2026-008', name: 'DNA浓度测定质控', type: '室内质控', method: '控制图', date: '2026-04-15', leader: '吴静', eval: '警告', status: '进行中' },
        { id: 'ZK-2026-011', name: 'PCR扩增效率质控', type: '室内质控', method: '平行样', date: '2026-05-20', leader: '李建平', eval: '在控', status: '已完成' },
        { id: 'ZK-2026-002', name: '全国花卉病毒能力验证', type: '室间质控', method: '标准物质', date: '2026-01-18', leader: '王秀云', eval: '在控', status: '已完成' },
        { id: 'ZK-2026-013', name: '测序文库质量质控', type: '室内质控', method: '控制图', date: '2026-06-01', leader: '赵明伟', eval: '失控', status: '进行中' },
        { id: 'ZK-2025-016', name: '组培苗无菌检测质控', type: '室内质控', method: '留样复测', date: '2025-12-10', leader: '周晓梅', eval: '在控', status: '已完成' },
        { id: 'ZK-2026-016', name: '试剂盒批次间一致性验证', type: '室内质控', method: '平行样', date: '2026-07-08', leader: '陈思远', eval: '待测', status: '待开始' },
        { id: 'ZK-2026-018', name: '第三方比对质控计划', type: '室间质控', method: '标准物质', date: '2026-08-01', leader: '王秀云', eval: '待测', status: '待开始' }
      ],
      'quality-proficiency': [
        { id: 'NL-2026-003', name: '花卉种子病毒检测能力验证', org: '中国合格评定国家认可委员会', regDate: '2026-01-10', resultDate: '2026-03-28', result: '满意', rectify: '未要求' },
        { id: 'NL-2025-008', name: '植物DNA提取纯度能力验证', org: '中国检科院', regDate: '2025-06-15', resultDate: '2025-09-01', result: '满意', rectify: '未要求' },
        { id: 'NL-2025-012', name: '农残快速检测能力验证', org: '农业农村部质检中心', regDate: '2025-10-08', resultDate: '2025-12-20', result: '有问题', rectify: '整改中' },
        { id: 'NL-2026-006', name: '细菌学鉴定能力验证', org: '云南省疾控中心', regDate: '2026-02-20', resultDate: '2026-05-15', result: '满意', rectify: '未要求' },
        { id: 'NL-2026-010', name: '病毒RNA定量检测能力验证', org: '中国合格评定国家认可委员会', regDate: '2026-04-12', resultDate: '2026-07-10', result: '满意', rectify: '未要求' },
        { id: 'NL-2025-015', name: '花卉组织培养清洁度验证', org: '云南省花卉协会', regDate: '2025-11-01', resultDate: '2026-01-08', result: '不满意', rectify: '完成' },
        { id: 'NL-2026-012', name: '切花保鲜剂效果比对', org: '国际园艺学会', regDate: '2026-05-05', resultDate: '2026-08-15', result: '待测', rectify: '未要求' },
        { id: 'NL-2026-001', name: '土壤微生物检测能力验证', org: '云南省质检院', regDate: '2026-01-05', resultDate: '2026-03-01', result: '满意', rectify: '未要求' }
      ],
      'quality-system-doc': [
        { id: 'QM-001', name: '质量手册（2026版）', type: '质量手册', version: 'V4.0', date: '2026-01-15', status: '已发布' },
        { id: 'QP-102', name: '样品管理程序', type: '程序文件', version: 'V3.2', date: '2025-10-08', status: '已发布' },
        { id: 'QP-106', name: '检测结果质量控制程序', type: '程序文件', version: 'V3.0', date: '2025-12-12', status: '已发布' },
        { id: 'WI-208', name: '分子检测标准操作规程', type: '作业指导书', version: 'V5.1', date: '2026-02-20', status: '已发布' },
        { id: 'WI-215', name: '仪器设备维护保养规程', type: '作业指导书', version: 'V2.4', date: '2025-09-30', status: '起草中' },
        { id: 'RF-301', name: '样品受理记录表', type: '记录表格', version: 'V1.8', date: '2025-08-01', status: '已发布' },
        { id: 'QP-110', name: '不符合工作控制程序', type: '程序文件', version: 'V2.6', date: '2026-03-18', status: '已发布' },
        { id: 'WI-220', name: '内审实施作业指导书', type: '作业指导书', version: 'V3.0', date: '2026-04-10', status: '起草中' }
      ],
      'quality-complaint': [
        { id: 'TS-2026-012', title: '检测报告出具延期', level: '轻微', customer: '云南锦苑花卉公司', date: '2026-03-02', content: '委托检测报告较约定时间延迟3天', status: '已解决' },
        { id: 'TS-2026-013', title: '检测费用异议', level: '一般', customer: '斗南物流中心', date: '2026-03-08', content: '对检测费用计价标准提出异议，要求核对', status: '处理中' },
        { id: 'TS-2026-014', title: '样品标签信息错误', level: '严重', customer: '昆明鲜切花卉合作社', date: '2026-03-15', content: '接收样品标签与委托单信息不符，可能导致混样', status: '待处理' },
        { id: 'TS-2026-006', title: '检测结果电话咨询响应慢', level: '轻微', customer: '云南省农科院', date: '2026-01-20', content: '电话咨询检测结果多次无人接听', status: '已关闭' },
        { id: 'TS-2026-011', title: '报告下载链接失效', level: '轻微', customer: '花易宝电商平台', date: '2026-02-18', content: '线上报告下载链接无法打开', status: '已解决' },
        { id: 'TS-2026-015', title: '重复收费投诉', level: '严重', customer: '云南花知晓公司', date: '2026-03-22', content: '同一批次样品被重复计费两次', status: '处理中' },
        { id: 'TS-2026-001', title: '纸质报告邮寄丢失', level: '一般', customer: '西南林业大学', date: '2025-12-28', content: '纸质检测报告邮寄途中丢失，急需补发', status: '已关闭' },
        { id: 'TS-2026-016', title: '个性化检测需求未响应', level: '一般', customer: '昆明华科农业', date: '2026-03-28', content: '客户提出特殊检测参数未得到及时确认', status: '待处理' }
      ],
      'quality-complaint-register': [
        { id: 'TS-2026-014', title: '样品标签信息错误', type: '样品管理', customer: '昆明鲜切花卉合作社', phone: '138****6631', source: '电话', level: '严重', date: '2026-03-15', operator: '杨洁', content: '接收样品标签与委托单信息不符，可能导致混样。', status: '已受理' },
        { id: 'TS-2026-016', title: '个性化检测需求未响应', type: '服务质量', customer: '昆明华科农业', phone: '139****2210', source: '邮件', level: '一般', date: '2026-03-28', operator: '杨洁', content: '客户提出特殊检测参数未得到及时确认，造成项目延期。', status: '调查中' },
        { id: 'TS-2026-015', title: '重复收费投诉', type: '重复收费', customer: '云南花知晓公司', phone: '136****8820', source: '来访', level: '严重', date: '2026-03-22', operator: '杨洁', content: '同一批次样品被重复计费两次。', status: '处理中' },
        { id: 'TS-2026-017', title: '报告结果表述不清', type: '报告错误', customer: '云南锦苑花卉公司', phone: '137****4401', source: '在线平台', level: '一般', date: '2026-04-02', operator: '杨洁', content: '检测报告部分项目结论表述不清晰，客户存疑。', status: '待受理' },
        { id: 'TS-2026-018', title: '检测周期超出承诺', type: '检测周期', customer: '斗南物流中心', phone: '131****9058', source: '电话', level: '轻微', date: '2026-04-06', operator: '杨洁', content: '常规检测周期超出承诺天数，影响客户出货安排。', status: '已受理' }
      ],
      'quality-complaint-investigate': [
        { id: 'DC-2026-001', complaintNo: 'TS-2026-014', investigator: '赵敏', date: '2026-03-16', method: '现场核查', conclusion: '经核查为样品交接环节标签粘贴错误，系操作人员疏忽所致。', status: '已调查' },
        { id: 'DC-2026-002', complaintNo: 'TS-2026-015', investigator: '赵敏', date: '2026-03-23', method: '资料核查', conclusion: '核查收费系统发现同批样品系统重复生成计费单，属系统逻辑缺陷。', status: '已调查' },
        { id: 'DC-2026-003', complaintNo: 'TS-2026-017', investigator: '李伟', date: '2026-04-03', method: '资料核查', conclusion: '报告中部分术语未附解释说明，不符合报告解释性文件要求。', status: '调查中' },
        { id: 'DC-2026-004', complaintNo: 'TS-2026-016', investigator: '李伟', date: '2026-03-29', method: '电话沟通', conclusion: '与客户确认特殊参数需求，需评估检测能力后确认可行性。', status: '已调查' }
      ],
      'quality-complaint-handle': [
        { id: 'CL-2026-001', complaintNo: 'TS-2026-014', dept: '样品管理组', leader: '马晓东', measure: '立即与客户核对原样信息，更正标签并补充书面说明；开展样品交接专项检查。', result: '已完成标签更正，客户确认无误', finishDate: '2026-03-18', status: '已完成' },
        { id: 'CL-2026-002', complaintNo: 'TS-2026-015', dept: '业务受理部', leader: '孙国栋', measure: '排查收费系统重复计费逻辑，对受影响批次予以退费并致歉。', result: '多收费项已全额退还', finishDate: '2026-03-25', status: '已完成' },
        { id: 'CL-2026-003', complaintNo: 'TS-2026-016', dept: '检测实验室', leader: '周晓梅', measure: '组织技术评估，明确特殊参数检测可行性并回复客户排期。', result: '', finishDate: '', status: '处理中' },
        { id: 'CL-2026-004', complaintNo: 'TS-2026-017', dept: '报告编制组', leader: '张工', measure: '修订报告解释性说明模板，补充专业术语注释。', result: '', finishDate: '', status: '待处理' }
      ],
      'quality-complaint-feedback': [
        { id: 'FK-2026-001', complaintNo: 'TS-2026-014', person: '杨洁', way: '电话回访', date: '2026-03-18', satisfaction: '满意', content: '客户对处理速度表示认可，建议加强交接环节复核。', status: '已反馈' },
        { id: 'FK-2026-002', complaintNo: 'TS-2026-015', person: '孙国栋', way: '邮件', date: '2026-03-26', satisfaction: '满意', content: '客户已确认收款，对处理结果满意。', status: '已反馈' },
        { id: 'FK-2026-003', complaintNo: 'TS-2026-016', person: '杨洁', way: '电话回访', date: '2026-04-01', satisfaction: '基本满意', content: '客户希望尽快给出可行性结论。', status: '待反馈' }
      ],
      'quality-complaint-stat': [
        { month: '2026-01', total: 2, inTime: 2, rate: '100%', satisfaction: '98%' },
        { month: '2026-02', total: 3, inTime: 3, rate: '100%', satisfaction: '95%' },
        { month: '2026-03', total: 4, inTime: 3, rate: '75%', satisfaction: '92%' },
        { month: '2026-04', total: 2, inTime: 2, rate: '100%', satisfaction: '97%' }
      ],
      'system-org-dept': [
        { code: 'JG-01', name: '花卉分子检测中心', type: '检测实验室', parent: '中心总部', leader: '陈思远', phone: '0871-68800001', address: 'A栋1层', status: '在用' },
        { code: 'JG-02', name: '病原鉴定实验室', type: '检测实验室', parent: '花卉分子检测中心', leader: '李建平', phone: '0871-68800012', address: 'A栋2层', status: '在用' },
        { code: 'JG-03', name: '质量管理部门', type: '管理部门', parent: '中心总部', leader: '王秀云', phone: '0871-68800020', address: 'B栋3层', status: '在用' },
        { code: 'JG-04', name: '业务受理部', type: '辅助部门', parent: '中心总部', leader: '孙国栋', phone: '0871-68800030', address: 'B栋1层', status: '在用' },
        { code: 'JG-05', name: '测序平台部', type: '检测实验室', parent: '花卉分子检测中心', leader: '赵敏', phone: '0871-68800015', address: 'A栋3层', status: '在用' },
        { code: 'JG-06', name: '组培检测组', type: '检测实验室', parent: '花卉分子检测中心', leader: '周晓梅', phone: '0871-68800018', address: 'A栋4层', status: '在用' },
        { code: 'JG-07', name: '昆明分中心', type: '派出机构', parent: '中心总部', leader: '马晓东', phone: '0871-68800050', address: '呈贡区', status: '在用' },
        { code: 'JG-08', name: '农残检测组', type: '检测实验室', parent: '花卉分子检测中心', leader: '张洁', phone: '0871-68800022', address: 'A栋2层', status: '停用' },
        { code: 'JG-09', name: '人事教育部', type: '管理部门', parent: '中心总部', leader: '魏秀兰', phone: '0871-68800040', address: 'B栋2层', status: '在用' },
        { code: 'JG-10', name: '测序数据分析组', type: '检测实验室', parent: '花卉分子检测中心', leader: '杨兴科', phone: '0871-68800016', address: 'A栋3层', status: '在用' },
        { code: 'JG-11', name: '斗南检测工作站', type: '派出机构', parent: '中心总部', leader: '罗海燕', phone: '0871-68800055', address: '斗南花卉市场', status: '在用' }
      ],
      'system-org-position': [
        { code: 'GW-001', name: '中心主任', dept: '中心总部', cat: '管理岗', level: '专家', total: 1, onPost: 1, duty: '全面负责中心检测业务、质量管理与体系建设。', status: '启用' },
        { code: 'GW-002', name: '技术负责人', dept: '质量管理部门', cat: '关键岗位', level: '高级', total: 1, onPost: 1, duty: '负责检测技术策划、新方法开发与结果确认。', status: '启用' },
        { code: 'GW-003', name: '质量负责人', dept: '质量管理部门', cat: '关键岗位', level: '高级', total: 1, onPost: 1, duty: '负责质量管理体系运行、内审与管理评审组织。', status: '启用' },
        { code: 'GW-004', name: '检测分析员', dept: '病原鉴定实验室', cat: '技术岗', level: '中级', total: 8, onPost: 7, duty: '承担样品分子检测、结果记录与质控工作。', status: '启用' },
        { code: 'GW-005', name: '授权签字人', dept: '花卉分子检测中心', cat: '关键岗位', level: '高级', total: 3, onPost: 3, duty: '对签发报告的技术准确性与合规性负责。', status: '启用' },
        { code: 'GW-006', name: '样品管理员', dept: '业务受理部', cat: '辅助岗', level: '初级', total: 2, onPost: 2, duty: '负责样品接收、登记、流转与留样管理。', status: '启用' },
        { code: 'GW-007', name: '设备管理员', dept: '质量管理部门', cat: '辅助岗', level: '中级', total: 1, onPost: 1, duty: '负责仪器设备台账、校准与维护保养管理。', status: '启用' },
        { code: 'GW-008', name: '测序操作员', dept: '测序平台部', cat: '技术岗', level: '中级', total: 4, onPost: 3, duty: '负责高通量测序平台操作与数据分析。', status: '停用' }
      ],
      'system-org-person': [
        { no: 'GH-2026001', name: '陈思远', dept: '中心总部', position: '中心主任', grade: '专家', type: '在编', joinDate: '2015-03-10', phone: '138****0001', status: '在职' },
        { no: 'GH-2026002', name: '王秀云', dept: '质量管理部门', position: '质量负责人', grade: '高级', type: '在编', joinDate: '2016-07-22', phone: '138****0002', status: '在职' },
        { no: 'GH-2026003', name: '李建平', dept: '病原鉴定实验室', position: '技术负责人', grade: '高级', type: '在编', joinDate: '2017-01-15', phone: '138****0003', status: '在职' },
        { no: 'GH-2026004', name: '赵敏', dept: '测序平台部', position: '检测分析员', grade: '中级', type: '在编', joinDate: '2019-04-08', phone: '138****0004', status: '在职' },
        { no: 'GH-2026005', name: '孙国栋', dept: '业务受理部', position: '样品管理员', grade: '初级', type: '聘用', joinDate: '2021-09-01', phone: '138****0005', status: '在职' },
        { no: 'GH-2026006', name: '周晓梅', dept: '组培检测组', position: '检测分析员', grade: '中级', type: '在编', joinDate: '2018-11-20', phone: '138****0006', status: '在职' },
        { no: 'GH-2026007', name: '马晓东', dept: '昆明分中心', position: '分中心主任', grade: '高级', type: '在编', joinDate: '2016-12-05', phone: '138****0007', status: '借调' },
        { no: 'GH-2026008', name: '吴静', dept: '质量管理部门', position: '设备管理员', grade: '中级', type: '聘用', joinDate: '2022-06-13', phone: '138****0008', status: '在职' }
      ],
      'system-org-holiday': [
        { date: '2026-01-01', name: '元旦', type: '法定假日', makeup: '否', remark: '放假1天' },
        { date: '2026-02-17', name: '春节', type: '法定假日', makeup: '是', remark: '除夕至初六放假7天' },
        { date: '2026-04-05', name: '清明节', type: '法定假日', makeup: '否', remark: '放假1天' },
        { date: '2026-05-01', name: '劳动节', type: '法定假日', makeup: '是', remark: '放假5天' },
        { date: '2026-06-19', name: '端午节', type: '法定假日', makeup: '否', remark: '放假1天' },
        { date: '2026-09-25', name: '中秋节', type: '法定假日', makeup: '否', remark: '放假1天' },
        { date: '2026-10-01', name: '国庆节', type: '法定假日', makeup: '是', remark: '放假7天' },
        { date: '2026-08-08', name: '公司成立纪念日', type: '公司假日', makeup: '否', remark: '全员带薪休假' }
      ],
      'system-org-workcal': [
        { year: '2026', month: '1月', workDays: 18, restDays: 8, holiDays: 5, attendance: '96%', status: '已发布' },
        { year: '2026', month: '2月', workDays: 16, restDays: 8, holiDays: 4, attendance: '95%', status: '已发布' },
        { year: '2026', month: '3月', workDays: 22, restDays: 9, holiDays: 0, attendance: '97%', status: '已发布' },
        { year: '2026', month: '4月', workDays: 21, restDays: 8, holiDays: 1, attendance: '96%', status: '已发布' },
        { year: '2026', month: '5月', workDays: 18, restDays: 9, holiDays: 4, attendance: '94%', status: '已发布' },
        { year: '2026', month: '6月', workDays: 21, restDays: 8, holiDays: 1, attendance: '96%', status: '已发布' },
        { year: '2026', month: '7月', workDays: 23, restDays: 8, holiDays: 0, attendance: '', status: '草稿' }
      ],
      // ==================== 用户权限 ====================
      'system-perm-user': [
        { account: 'chensiyuan', name: '陈思远', dept: '花卉分子检测中心', phone: '13888880001', role: '系统管理员', lastLogin: '2026-09-16 09:12', status: '正常' },
        { account: 'zhangshen', name: '张深', dept: '花卉分子检测中心', phone: '13888880002', role: '实验室主管', lastLogin: '2026-09-16 08:40', status: '正常' },
        { account: 'sunweifeng', name: '孙卫锋', dept: '检测实验室', phone: '13888880003', role: '检测分析师', lastLogin: '2026-09-15 17:23', status: '正常' },
        { account: 'liting', name: '李婷', dept: '检测实验室', phone: '13888880004', role: '检测分析师', lastLogin: '2026-09-15 16:48', status: '正常' },
        { account: 'songguodong', name: '宋国栋', dept: '质量控制部', phone: '13888880005', role: '质量管理员', lastLogin: '2026-09-15 15:02', status: '正常' },
        { account: 'zhouxiangmei', name: '周香梅', dept: '质量控制部', phone: '13888880006', role: '质量管理员', lastLogin: '2026-09-14 10:30', status: '正常' },
        { account: 'zhangjie', name: '张洁', dept: '管理部门', phone: '13888880007', role: '检测分析师', lastLogin: '2026-08-30 14:10', status: '禁用' },
        { account: 'yuxiaoyan', name: '于晓燕', dept: '管理部门', phone: '13888880008', role: '实验室主管', lastLogin: '2026-08-12 09:00', status: '禁用' }
      ],
      'system-perm-role': [
        { name: '系统管理员', code: 'ROLE_ADMIN', users: 1, permissionScope: '全部', desc: '系统最高权限，可管理用户、角色、权限配置及全部业务模块', status: '启用' },
        { name: '实验室主管', code: 'ROLE_SUPERVISOR', users: 2, permissionScope: '本部门', desc: '管理本部门检测任务分配、报告审核与人员绩效', status: '启用' },
        { name: '检测分析师', code: 'ROLE_ANALYST', users: 3, permissionScope: '本人数据', desc: '执行样品检测、实验记录、数据录入与结果分析', status: '启用' },
        { name: '质量管理员', code: 'ROLE_QA', users: 2, permissionScope: '本部门', desc: '负责质量控制、能力验证、内审与不符合项管理', status: '启用' },
        { name: '报告签发人', code: 'ROLE_SIGNER', users: 1, permissionScope: '全部', desc: '对检测报告进行审批签发，具备最终审查权限', status: '启用' },
        { name: '访客', code: 'ROLE_GUEST', users: 0, permissionScope: '本人数据', desc: '只读浏览公开数据，无任何编辑权限', status: '停用' }
      ],
      'system-perm-config': [
        { module: '业务受理', funcPerms: '委托登记、样品接收、合同评审', dataScope: '全部数据', roles: '系统管理员、实验室主管', status: '启用' },
        { module: '实验检测', funcPerms: '任务领取、实验记录、结果录入', dataScope: '本人数据', roles: '检测分析师', status: '启用' },
        { module: '质量控制', funcPerms: '质控计划、质控数据、失控处理、统计分析', dataScope: '本部门', roles: '质量管理员、实验室主管', status: '启用' },
        { module: '能力验证', funcPerms: '计划制定、报名管理、结果评审', dataScope: '本部门', roles: '质量管理员', status: '启用' },
        { module: '报告管理', funcPerms: '报告书写、审核签发、报告打印', dataScope: '全部数据', roles: '实验室主管、报告签发人', status: '启用' },
        { module: '科研管理', funcPerms: '科研项目、实验管理、成果管理', dataScope: '本部门', roles: '实验室主管、检测分析师', status: '启用' },
        { module: '质量管理', funcPerms: '内审管理、质量监督、管理评审、不符合项', dataScope: '本部门', roles: '质量管理员', status: '启用' },
        { module: '统计分析', funcPerms: '业务统计、资源统计、科研统计、培训统计', dataScope: '全部数据', roles: '系统管理员、实验室主管', status: '启用' },
        { module: '系统管理', funcPerms: '用户权限、组织机构、数据字典', dataScope: '全部数据', roles: '系统管理员', status: '启用' }
      ],
      'system-perm-oplog': [
        { user: '陈思远', action: '创建用户账号 zhaomin', module: '用户权限', time: '2026-09-16 10:05', result: '成功' },
        { user: '陈思远', action: '为角色 检测分析师 分配采样模块权限', module: '用户权限', time: '2026-09-16 09:58', result: '成功' },
        { user: '张深', action: '修改样品接收表单字段配置', module: '业务受理', time: '2026-09-16 09:31', result: '成功' },
        { user: '孙卫锋', action: '导出实验记录 2026 年 9 月清单', module: '实验检测', time: '2026-09-16 09:12', result: '成功' },
        { user: '李婷', action: '提交实验记录 SW-2026-0915-008', module: '实验检测', time: '2026-09-15 17:02', result: '成功' },
        { user: '宋国栋', action: '配置失控处理流程节点提醒', module: '质量控制', time: '2026-09-15 15:40', result: '成功' },
        { user: '张洁', action: '尝试删除历史质控记录（无权限）', module: '质量控制', time: '2026-08-30 14:22', result: '失败' },
        { user: '于晓燕', action: '登录系统被拒绝（账号已禁用）', module: '登录认证', time: '2026-08-12 09:01', result: '失败' }
      ],
      'system-perm-login': [
        { user: 'chensiyuan', name: '陈思远', ip: '192.168.1.101', device: 'Windows 11 · Chrome', time: '2026-09-16 09:12', status: '成功' },
        { user: 'zhangshen', name: '张深', ip: '192.168.1.102', device: 'Windows 11 · Edge', time: '2026-09-16 08:40', status: '成功' },
        { user: 'sunweifeng', name: '孙卫锋', ip: '192.168.1.103', device: 'Windows 10 · Chrome', time: '2026-09-16 08:36', status: '成功' },
        { user: 'liting', name: '李婷', ip: '192.168.1.104', device: 'Windows 11 · Edge', time: '2026-09-16 08:31', status: '成功' },
        { user: 'songguodong', name: '宋国栋', ip: '192.168.1.105', device: 'Windows 10 · Firefox', time: '2026-09-16 08:28', status: '成功' },
        { user: 'chensiyuan', name: '陈思远', ip: '10.0.0.15', device: 'Android · Chrome', time: '2026-09-15 21:10', status: '成功' },
        { user: 'zhangjie', name: '张洁', ip: '192.168.1.110', device: 'Windows 11 · Chrome', time: '2026-08-30 14:10', status: '成功' },
        { user: 'yuxiaoyan', name: '于晓燕', ip: '192.168.1.111', device: 'Windows 10 · Chrome', time: '2026-08-12 09:00', status: '失败' }
      ],
      // ==================== 系统字典 ====================
      'system-dict-type': [
        { code: 'SAMPLE_STATUS', name: '样品状态字典', type: '业务字典', items: 5, remark: '样品流转各阶段状态定义', status: '启用' },
        { code: 'SAMPLE_TYPE', name: '样品类型字典', type: '业务字典', items: 5, remark: '样品来源与类型分类定义', status: '启用' },
        { code: 'REPORT_STATUS', name: '报告状态字典', type: '业务字典', items: 3, remark: '检测报告编制与签发状态', status: '启用' },
        { code: 'RESULT_UNIT', name: '结果单位字典', type: '基础字典', items: 7, remark: '常用计量单位与符号映射', status: '启用' },
        { code: 'DETECT_METHOD', name: '检测方法字典', type: '基础字典', items: 9, remark: '分子生物学检测方法编码', status: '启用' },
        { code: 'SYS_PARAM', name: '系统参数字典', type: '系统字典', items: 3, remark: '系统内置关键参数定义，仅供系统管理员维护', status: '启用' }
      ],
      'system-dict-char': [
        { name: '正负号', value: '±', category: '报告术语', remark: '检测结果偏差范围表示，如 ±0.5mg/L', status: '启用' },
        { name: '小于等于', value: '≤', category: '报告术语', remark: '检出限类结果规范表示', status: '启用' },
        { name: '大于等于', value: '≥', category: '报告术语', remark: '限量标准对照表示', status: '启用' },
        { name: '微', value: 'µ', category: '检测术语', remark: '微摩尔等浓度单位缩写 µM、µg', status: '启用' },
        { name: '摄氏度', value: '℃', category: '检测术语', remark: '实验温度记录用符号', status: '启用' },
        { name: '千分号', value: '‰', category: '检测术语', remark: '酶活性单位常用千分号表示', status: '启用' },
        { name: '角标数字', value: '¹²³', category: '权限标记', remark: '样品编号上标角标自定义', status: '停用' },
        { name: '阴阳性符号', value: '－/＋', category: '状态标记', remark: '定性结果阴阳性表示', status: '启用' }
      ],
      'system-dict-enum': [
        { dictCode: 'SAMPLE_STATUS', code: 'PENDING', name: '待接收', order: 1, status: '启用' },
        { dictCode: 'SAMPLE_STATUS', code: 'RECEIVED', name: '已接收', order: 2, status: '启用' },
        { dictCode: 'SAMPLE_STATUS', code: 'DETECTING', name: '检测中', order: 3, status: '启用' },
        { dictCode: 'SAMPLE_STATUS', code: 'REVIEWING', name: '审核中', order: 4, status: '启用' },
        { dictCode: 'SAMPLE_STATUS', code: 'DONE', name: '已完成', order: 5, status: '启用' },
        { dictCode: 'REPORT_STATUS', code: 'DRAFT', name: '草稿', order: 1, status: '启用' },
        { dictCode: 'REPORT_STATUS', code: 'REVIEWED', name: '已审核', order: 2, status: '启用' },
        { dictCode: 'REPORT_STATUS', code: 'SIGNED', name: '已签发', order: 3, status: '启用' },
        { dictCode: 'SAMPLE_TYPE', code: 'FRESH', name: '新鲜组织', order: 1, status: '启用' },
        { dictCode: 'SAMPLE_TYPE', code: 'PARAFFIN', name: '石蜡组织', order: 2, status: '启用' },
        { dictCode: 'SAMPLE_TYPE', code: 'BLOOD', name: '血液', order: 3, status: '启用' }
      ],
      // ==================== 编号规则 ====================
      'system-num-report': [
        { name: '检测报告编号', prefix: 'BG', seqLength: 4, yearMode: 'YYYY', sep: '-', currentSeq: 1024, status: '启用', remark: '检测报告唯一编号' },
        { name: '样品报告编号', prefix: 'YP', seqLength: 4, yearMode: 'YYYY', sep: '-', currentSeq: 786, status: '启用', remark: '样品检测报告编号规则' },
        { name: '质控报告编号', prefix: 'ZK', seqLength: 4, yearMode: 'YYYY', sep: '/', currentSeq: 356, status: '启用', remark: '质量控制报告编号规则' },
        { name: '测量审核报告', prefix: 'CS', seqLength: 4, yearMode: 'YY', sep: '-', currentSeq: 128, status: '启用', remark: '测量审核活动报告编号' },
        { name: '旧版报告编号', prefix: 'BG', seqLength: 3, yearMode: '无', sep: '无', currentSeq: 9999, status: '停用', remark: '历史遗留编号，已停用' }
      ],
      'system-num-sample': [
        { name: '样品编号', prefix: 'YP', seqLength: 5, yearMode: 'YYYY', sep: '-', currentSeq: 2351, status: '启用', remark: '样品接收入库唯一编号' },
        { name: '外来样品编号', prefix: 'WL', seqLength: 5, yearMode: 'YY', sep: '-', currentSeq: 823, status: '启用', remark: '外部委托样品编号规则' },
        { name: '环境监测样品', prefix: 'HJ', seqLength: 5, yearMode: 'YYYY', sep: '/', currentSeq: 412, status: '启用', remark: '环境因子监测样品编号' },
        { name: '科研样品编号', prefix: 'KY', seqLength: 5, yearMode: '无', sep: '-', currentSeq: 618, status: '启用', remark: '科研项目样品编号规则' }
      ],
      'system-num-task': [
        { name: '检测任务单', prefix: 'RW', seqLength: 4, yearMode: 'YYYY', sep: '-', currentSeq: 862, status: '启用', remark: '检测任务单号规则' },
        { name: '采样任务单', prefix: 'CY', seqLength: 4, yearMode: 'YY', sep: '-', currentSeq: 545, status: '启用', remark: '采样现场任务单编号' },
        { name: '样品流转单', prefix: 'LZ', seqLength: 4, yearMode: 'YYYY', sep: '/', currentSeq: 1390, status: '启用', remark: '样品内部流转单编号' },
        { name: '旧格式任务单', prefix: 'RW', seqLength: 3, yearMode: '无', sep: '无', currentSeq: 999, status: '停用', remark: '历史任务单格式，已废弃' }
      ],
      'system-num-other': [
        { name: '合同编号', prefix: 'HT', seqLength: 4, yearMode: 'YYYY', sep: '-', currentSeq: 203, status: '启用', remark: '年度合同签订编号' },
        { name: '委托协议编号', prefix: 'WT', seqLength: 4, yearMode: 'YYYY', sep: '-', currentSeq: 468, status: '启用', remark: '委托检测协议编号' },
        { name: '收费通知单', prefix: 'SF', seqLength: 4, yearMode: 'YY', sep: '-', currentSeq: 317, status: '启用', remark: '费用收取通知单编号' },
        { name: '仪器设备编号', prefix: 'SB', seqLength: 3, yearMode: '无', sep: '/', currentSeq: 128, status: '启用', remark: '设备资产台账编号' }
      ],
      // ==================== 流程配置 ====================
      'system-cfg-flow': [
        { step: '开始', role: '系统', icon: 'fa-play', must: '是', timeout: 1, status: '启用' },
        { step: '接样登记', role: '接样员', icon: 'fa-boxes-stacked', must: '是', timeout: 4, status: '启用' },
        { step: '任务分派', role: '调度员', icon: 'fa-user-gear', must: '是', timeout: 8, status: '启用' },
        { step: '检测执行', role: '检测员', icon: 'fa-flask-vial', must: '是', timeout: 48, status: '启用' },
        { step: '结果审核', role: '审核员', icon: 'fa-clipboard-check', must: '是', timeout: 12, status: '启用' },
        { step: '报告签发', role: '授权签字人', icon: 'fa-file-signature', must: '是', timeout: 24, status: '启用' },
        { step: '归档', role: '档案员', icon: 'fa-folder-closed', must: '是', timeout: 6, status: '启用' },
        { step: '结束', role: '系统', icon: 'fa-circle-check', must: '是', timeout: 1, status: '启用' }
      ],
      'system-cfg-line': [
        { name: '分子检测生产线', dept: '分子检测科', type: '分子检测', steps: 7, flow: '分子检测科流程', status: '启用', flowSteps: [{ name: '接样登记', role: '接样员', icon: 'fa-boxes-stacked' }, { name: '核酸提取', role: '检测员', icon: 'fa-dna' }, { name: 'PCR扩增', role: '检测员', icon: 'fa-flask-vial' }, { name: '结果判读', role: '检测员', icon: 'fa-microscope' }, { name: '结果审核', role: '审核员', icon: 'fa-clipboard-check' }, { name: '报告签发', role: '授权签字人', icon: 'fa-file-signature' }, { name: '归档', role: '档案员', icon: 'fa-folder-closed' }] },
        { name: '免疫检测生产线', dept: '免疫检测科', type: '免疫检测', steps: 6, flow: '免疫检测科流程', status: '启用', flowSteps: [{ name: '接样登记', role: '接样员', icon: 'fa-boxes-stacked' }, { name: '血清制备', role: '检测员', icon: 'fa-vial-circle-check' }, { name: '免疫测定', role: '检测员', icon: 'fa-droplet' }, { name: '结果审核', role: '审核员', icon: 'fa-clipboard-check' }, { name: '报告签发', role: '授权签字人', icon: 'fa-file-signature' }, { name: '归档', role: '档案员', icon: 'fa-folder-closed' }] },
        { name: '病理检测生产线', dept: '病理科', type: '病理检测', steps: 6, flow: '病理科流程', status: '启用', flowSteps: [{ name: '接样登记', role: '接样员', icon: 'fa-boxes-stacked' }, { name: '标本固定', role: '病理技师', icon: 'fa-prescription-bottle' }, { name: '切片制片', role: '病理技师', icon: 'fa-cut' }, { name: '镜检诊断', role: '病理医师', icon: 'fa-microscope' }, { name: '报告签发', role: '授权签字人', icon: 'fa-file-signature' }, { name: '归档', role: '档案员', icon: 'fa-folder-closed' }] },
        { name: '基因测序生产线', dept: '基因测序科', type: '基因测序', steps: 7, flow: '基因测序科流程', status: '启用', flowSteps: [{ name: '接样登记', role: '接样员', icon: 'fa-boxes-stacked' }, { name: '文库构建', role: '测序工程师', icon: 'fa-layer-group' }, { name: '上机测序', role: '测序工程师', icon: 'fa-server' }, { name: '生信分析', role: '生信分析员', icon: 'fa-chart-line' }, { name: '结果审核', role: '审核员', icon: 'fa-clipboard-check' }, { name: '报告签发', role: '授权签字人', icon: 'fa-file-signature' }, { name: '归档', role: '档案员', icon: 'fa-folder-closed' }] }
      ],
      'system-cfg-approve': [
        { name: '报告签发审批', levels: 2, initiator: '检测员', trigger: '检测报告', status: '启用' },
        { name: '加急审批', levels: 1, initiator: '业务员', trigger: '任务单', status: '启用' },
        { name: '合同审批', levels: 3, initiator: '业务员', trigger: '检测合同', status: '启用' },
        { name: '异常处理审批', levels: 2, initiator: '检测员', trigger: '异常报告', status: '停用' }
      ],
      'system-cfg-version': [
        { flow: '检测任务主流程', version: 'V1.0', content: '初始版本', operator: '管理员', time: '2026-03-01', status: '已停用' },
        { flow: '检测任务主流程', version: 'V1.1', content: '新增加急审批分支', operator: '管理员', time: '2026-05-12', status: '已发布' },
        { flow: '检测任务主流程', version: 'V2.0', content: '简化审批层级', operator: '管理员', time: '2026-07-20', status: '已发布' },
        { flow: '测序任务主流程', version: 'V1.0', content: '测序流程新建', operator: '管理员', time: '2026-08-03', status: '草稿' },
        { flow: '报告签发流程', version: 'V1.2', content: '调整签字人权限', operator: '管理员', time: '2026-09-01', status: '草稿' }
      ],
      // ==================== 项目库配置 ====================
      'system-lib-cat': [
        { code: 'BH', name: '花卉产品', parent: '', level: '一级', status: '启用' },
        { code: 'BH-XQ', name: '鲜切花', parent: '花卉产品', level: '二级', status: '启用' },
        { code: 'BH-PH', name: '盆花', parent: '花卉产品', level: '二级', status: '启用' },
        { code: 'BH-ZM', name: '种苗', parent: '花卉产品', level: '二级', status: '启用' },
        { code: 'JC', name: '分子检测', parent: '', level: '一级', status: '启用' },
        { code: 'JC-PCR', name: '荧光定量PCR检测', parent: '分子检测', level: '二级', status: '启用' },
        { code: 'JC-JS', name: '基因测序', parent: '分子检测', level: '二级', status: '启用' }
      ],
      'system-lib-product': [
        { code: 'CP-001', name: '月季鲜切花', cat: '鲜切花', sampleType: '花瓣/叶片', storage: '2-8℃冷藏', status: '启用' },
        { code: 'CP-002', name: '百合鲜切花', cat: '鲜切花', sampleType: '花瓣/花蕾', storage: '2-8℃冷藏', status: '启用' },
        { code: 'CP-003', name: '康乃馨鲜切花', cat: '鲜切花', sampleType: '花瓣', storage: '2-6℃冷藏', status: '启用' },
        { code: 'CP-004', name: '蝴蝶兰盆花', cat: '盆花', sampleType: '叶片', storage: '常温避光', status: '启用' },
        { code: 'CP-005', name: '红掌盆花', cat: '盆花', sampleType: '叶片/苞片', storage: '常温避光', status: '启用' },
        { code: 'CP-006', name: '月季种苗', cat: '种苗', sampleType: '茎段', storage: '4℃保湿', status: '启用' },
        { code: 'CP-007', name: '康乃馨种苗', cat: '种苗', sampleType: '茎尖', storage: '4℃保湿', status: '停用' },
        { code: 'CP-008', name: '百合种球', cat: '种球', sampleType: '鳞片', storage: '-2~4℃冷藏', status: '启用' },
        { code: 'CP-009', name: '兰花组培苗', cat: '组培苗', sampleType: '组培苗体', storage: '无菌培养', status: '启用' },
        { code: 'CP-010', name: '栽培基质土壤', cat: '土壤', sampleType: '根际土壤', storage: '密封4℃', status: '启用' },
        { code: 'CP-011', name: '灌溉水样', cat: '水样', sampleType: '水样', storage: '避光冷藏', status: '停用' }
      ],
      'system-lib-project': [
        { code: 'XM-001', name: '切花月季灰霉病分子检测', cat: '分子检测', subcat: '荧光定量PCR检测', unit: '批', limit: '10³ copies/μL', method: 'TaqMan探针法', turnaround: '3个工作日', sampleQty: '5-10g', status: '启用' },
        { code: 'XM-002', name: '百合种球病毒检测', cat: '分子检测', subcat: '荧光定量PCR检测', unit: '批', limit: '5 copies/μL', method: 'SYBR Green法', turnaround: '3个工作日', sampleQty: '3-5个种球', status: '启用' },
        { code: 'XM-003', name: '兰花花叶病免疫鉴定', cat: '免疫检测', subcat: 'ELISA检测', unit: '份', limit: 'B/C级', method: 'DAS-ELISA', turnaround: '2个工作日', sampleQty: '0.5g叶片', status: '启用' },
        { code: 'XM-004', name: '康乃馨根腐病病理鉴定', cat: '病理检测', subcat: '形态学鉴定', unit: '项', limit: '形态学', method: '切片镜检', turnaround: '5个工作日', sampleQty: '根段10cm', status: '启用' },
        { code: 'XM-005', name: '种质资源全基因组测序', cat: '基因测序', subcat: '全基因组测序', unit: 'G', limit: '≥30×', method: 'Illumina NovaSeq', turnaround: '15个工作日', sampleQty: 'DNA 5μg', status: '启用' },
        { code: 'XM-006', name: '月季病毒组高通量测序', cat: '基因测序', subcat: '转录组测序', unit: 'G', limit: '≥10×', method: 'Illumina HiSeq', turnaround: '12个工作日', sampleQty: 'RNA 3μg', status: '停用' },
        { code: 'XM-007', name: '菊花病毒RT-PCR检测', cat: '分子检测', subcat: 'RT-PCR检测', unit: '批', limit: '10² copies/μL', method: '一步法RT-PCR', turnaround: '2个工作日', sampleQty: '2g叶片', status: '启用' },
        { code: 'XM-008', name: '蝴蝶兰病毒多重PCR检测', cat: '分子检测', subcat: 'RT-PCR检测', unit: '批', limit: '10² copies/μL', method: '多重RT-PCR', turnaround: '3个工作日', sampleQty: '1g叶片', status: '启用' },
        { code: 'XM-009', name: '红掌内源激素ELISA检测', cat: '免疫检测', subcat: 'ELISA检测', unit: '份', limit: 'pg/mL', method: '间接ELISA', turnaround: '3个工作日', sampleQty: '0.3g苞片', status: '启用' },
        { code: 'XM-010', name: '月季黑斑病组织切片鉴定', cat: '病理检测', subcat: '形态学鉴定', unit: '项', limit: '形态学', method: '石蜡切片', turnaround: '7个工作日', sampleQty: '病斑叶片', status: '启用' },
        { code: 'XM-011', name: '百合转录组de novo测序', cat: '基因测序', subcat: '转录组测序', unit: 'G', limit: '≥20×', method: 'Illumina NovaSeq', turnaround: '15个工作日', sampleQty: 'RNA 5μg', status: '启用' },
        { code: 'XM-012', name: '牡丹全基因组重测序', cat: '基因测序', subcat: '全基因组测序', unit: 'G', limit: '≥10×', method: 'Illumina HiSeq', turnaround: '10个工作日', sampleQty: 'DNA 3μg', status: '启用' }
      ],
      'system-lib-standard': [
        { code: 'GB/T 28063-2011', name: '月季黑斑病检测技术规程', agency: 'GB/T', category: '分子检测', year: 2011, status: '在用' },
        { code: 'GB/T 28077-2011', name: '百合病毒检测技术规程', agency: 'GB/T', category: '分子检测', year: 2011, status: '在用' },
        { code: 'GB/T 23401-2009', name: '花卉种苗病毒检测操作规程', agency: 'GB/T', category: '分子检测', year: 2009, status: '在用' },
        { code: 'ISO 20304', name: '植物病原核酸检测通用要求', agency: 'ISO', category: '分子检测', year: 2020, status: '在用' },
        { code: 'NY/T 3246-2018', name: '花卉病虫害田间监测技术规范', agency: '行业标准', category: '病理检测', year: 2018, status: '停用' },
        { code: 'GB/T 19495', name: '转基因产品检测方法通则', agency: 'GB/T', category: '基因测序', year: 2018, status: '在用' }
      ],
      'system-lib-line': [
        { name: '分子快检线', target: '病毒/病害分子快检', capacity: 120, projectCount: 38, status: '启用' },
        { name: '测序分析线', target: '高通量测序与生信分析', capacity: 16, projectCount: 21, status: '启用' },
        { name: '血清免疫线', target: '植物病毒免疫检测', capacity: 80, projectCount: 14, status: '启用' },
        { name: '病理显微线', target: '组织病理形态鉴定', capacity: 40, projectCount: 9, status: '停用' }
      ],
      'system-lib-link': [
        { product: '月季鲜切花', project: '切花月季灰霉病分子检测', standard: 'GB/T 28063-2011', name: '荧光PCR定性法', type: '定性', status: '已关联' },
        { product: '百合鲜切花', project: '百合种球病毒检测', standard: 'GB/T 28077-2011', name: 'RT-PCR定量法', type: '定量', status: '已关联' },
        { product: '蝴蝶兰盆花', project: '兰花花叶病免疫鉴定', standard: 'ISO 20304', name: 'DAS-ELISA法', type: '半定量', status: '已关联' },
        { product: '兰花组培苗', project: '种质资源全基因组测序', standard: 'GB/T 19495', name: 'NGS全基因组法', type: '定量', status: '已关联' },
        { product: '康乃馨种苗', project: '康乃馨根腐病病理鉴定', standard: 'NY/T 3246-2018', name: '病原形态学鉴定法', type: '定性', status: '未关联' },
        { product: '栽培基质土壤', project: '切花月季灰霉病分子检测', standard: 'GB/T 28063-2011', name: '实时荧光定量法', type: '定量', status: '已关联' },
        { product: '灌溉水样', project: '切花月季灰霉病分子检测', standard: 'GB/T 19495', name: 'RT-PCR定量法', type: '定量', status: '未关联' }
      ],
      // ==================== 环境业务配置 ====================
      'system-env-mproj': [
        { code: 'MB-001', name: '切花月季灰霉病嗅探检测', cat: '嗅探检测', unit: '批', limit: '10³ copies/μL', status: '启用' },
        { code: 'MB-002', name: '百合种球病毒移动采样', cat: '移动采样', unit: '份', limit: '5 copies/μL', status: '启用' },
        { code: 'MB-003', name: '温湿度直读监测项目', cat: '直读检测', unit: '点', limit: '±0.5℃', status: '启用' },
        { code: 'MB-004', name: '空气孢子量移动嗅探', cat: '嗅探检测', unit: '点', limit: '≥1000 spores/m³', status: '启用' },
        { code: 'MB-005', name: '光照强度直读监测', cat: '直读检测', unit: '勒克斯', limit: '5000-80000 lx', status: '停用' }
      ],
      'system-env-vessel': [
        { code: 'V-PE-01', name: '聚乙烯采样袋', capacity: '25L', material: '塑料', projectIds: ['MB-001', 'MB-002', 'MB-004'], status: '启用' },
        { code: 'V-GL-02', name: '玻璃采样瓶', capacity: '500mL', material: '玻璃', projectIds: ['MB-002'], status: '启用' },
        { code: 'V-PE-03', name: '牛奶瓶采样容器', capacity: '2L', material: 'PET', projectIds: ['MB-002', 'MB-003'], status: '启用' },
        { code: 'V-CC-04', name: '真空采样瓶', capacity: '250mL', material: '玻璃', projectIds: ['MB-001'], status: '停用' },
        { code: 'V-ZP-05', name: '自封平口袋', capacity: '40×30cm', material: '塑料', projectIds: ['MB-002', 'MB-004'], status: '启用' }
      ],
      'system-env-method': [
        { name: '低温冷链保存法', cat: '冷藏', temp: '2-8℃', timeLimit: '72小时', container: '保温箱/冷藏箱', status: '启用' },
        { name: '速冻深冻保存法', cat: '冷冻', temp: '-20℃', timeLimit: '30天', container: '超低温冰箱', status: '启用' },
        { name: '常温干燥保存法', cat: '常温', temp: '15-25℃', timeLimit: '7天', container: '干燥器/密封袋', status: '启用' },
        { name: '液氮冷冻保存法', cat: '冷冻', temp: '-196℃', timeLimit: '12个月', container: '液氮罐', status: '启用' },
        { name: '遮光阴凉保存法', cat: '常温', temp: '≤25℃', timeLimit: '48小时', container: '阴凉柜', status: '停用' }
      ],
      'system-env-ster': [
        { name: '75%酒精擦拭消毒', agent: '乙醇', concentration: '75%', duration: '30秒', status: '启用' },
        { name: '紫外灯照射消毒', agent: '紫外线', concentration: '254nm', duration: '30分钟', status: '启用' },
        { name: '次氯酸钠溶液浸泡', agent: '次氯酸钠', concentration: '500ppm', duration: '15分钟', status: '启用' },
        { name: '高压蒸汽灭菌', agent: '高压蒸汽', concentration: '121℃', duration: '20分钟', status: '启用' },
        { name: '过氧化氢雾化消毒', agent: '过氧化氢', concentration: '3%', duration: '20分钟', status: '停用' }
      ],
      'system-env-param': [
        { name: '大气温度', unit: '℃', precision: '0.1℃', mode: '双模式', status: '启用' },
        { name: '相对湿度', unit: '%RH', precision: '1%', mode: '现场', status: '启用' },
        { name: '土壤水分', unit: '%vol', precision: '0.5%', mode: '现场', status: '启用' },
        { name: '孢子浓度', unit: '个/m³', precision: '10', mode: '实验室', status: '启用' },
        { name: '光照强度', unit: 'lx', precision: '10lx', mode: '双模式', status: '启用' },
        { name: '二氧化碳浓度', unit: 'ppm', precision: '1ppm', mode: '实验室', status: '停用' }
      ],
      // ==================== 系统设置 ====================
      'system-set-param': [
        { code: 'SYS-001', name: '系统名称', value: '花卉分子检测管理系统', unit: '', category: '系统参数', remark: '全局系统显示名称', status: '启用' },
        { code: 'SYS-002', name: '系统版本', value: 'V5.2.1', unit: '', category: '系统参数', remark: '当前发布版本号', status: '启用' },
        { code: 'SYS-003', name: '会话超时', value: '30', unit: '分钟', category: '安全参数', remark: '用户登录会话保持时长', status: '启用' },
        { code: 'SYS-004', name: '密码有效期', value: '90', unit: '天', category: '安全参数', remark: '密码到期强制更换周期', status: '启用' },
        { code: 'SYS-005', name: '上传文件大小', value: '50', unit: 'MB', category: '性能参数', remark: '单文件上传最大限制', status: '启用' },
        { code: 'SYS-006', name: '报告自动归档', value: '7', unit: '天', category: '业务参数', remark: '报告出具后自动归档时长', status: '启用' },
        { code: 'SYS-007', name: '样品保存期限', value: '30', unit: '天', category: '业务参数', remark: '检测后样品留存时长', status: '启用' },
        { code: 'SYS-008', name: '并发连接数', value: '200', unit: '个', category: '性能参数', remark: '系统最大并发连接', status: '启用' },
        { code: 'SYS-009', name: '登录失败锁定', value: '5', unit: '次', category: '安全参数', remark: '连续登录失败锁定阈值', status: '启用' },
        { code: 'SYS-010', name: '数据缓存时长', value: '24', unit: '小时', category: '性能参数', remark: '前端数据缓存有效期', status: '停用' }
      ],
      'system-set-notify': [
        { code: 'NTF-001', name: '委托受理通知', channel: '站内信', trigger: '委托单提交', receiver: '受理员', status: '启用' },
        { code: 'NTF-002', name: '报告出具通知', channel: '邮件', trigger: '报告签发', receiver: '委托人', status: '启用' },
        { code: 'NTF-003', name: '样品超期预警', channel: '短信', trigger: '样品到期前3天', receiver: '样品管理员', status: '启用' },
        { code: 'NTF-004', name: '质控异常告警', channel: '微信', trigger: '质控数据失控', receiver: '质量负责人', status: '启用' },
        { code: 'NTF-005', name: '设备校准提醒', channel: '钉钉', trigger: '校准到期前7天', receiver: '设备管理员', status: '启用' },
        { code: 'NTF-006', name: '整改任务催办', channel: '站内信', trigger: '整改到期前3天', receiver: '整改责任人', status: '启用' },
        { code: 'NTF-007', name: '系统升级公告', channel: '邮件', trigger: '升级任务下发', receiver: '全体用户', status: '停用' },
        { code: 'NTF-008', name: '登录异常告警', channel: '短信', trigger: '异地登录检测', receiver: '账号本人', status: '启用' }
      ],
      'system-set-backup': [
        { code: 'BK-001', name: '数据库全量备份', type: '全量备份', cycle: '每日 02:00', size: '2.4GB', lastTime: '2026-09-16 02:00:15', status: '启用' },
        { code: 'BK-002', name: '文件附件增量备份', type: '增量备份', cycle: '每日 04:00', size: '186MB', lastTime: '2026-09-16 04:00:08', status: '启用' },
        { code: 'BK-003', name: '系统日志备份', type: '日志备份', cycle: '每小时', size: '12MB', lastTime: '2026-09-16 09:00:02', status: '启用' },
        { code: 'BK-004', name: '周度差异备份', type: '差异备份', cycle: '每周日 01:00', size: '580MB', lastTime: '2026-09-15 01:00:12', status: '启用' },
        { code: 'BK-005', name: '报告归档备份', type: '增量备份', cycle: '每月1日 03:00', size: '4.2GB', lastTime: '2026-09-01 03:00:25', status: '启用' },
        { code: 'BK-006', name: '历史数据冷备份', type: '全量备份', cycle: '每季度末', size: '18.6GB', lastTime: '2026-06-30 02:00:00', status: '停用' }
      ],
      'system-set-archive': [
        { code: 'AR-001', name: '委托单归档', target: '委托单数据', trigger: '出具报告后7天', retention: '5年', storage: '归档服务器A', status: '启用' },
        { code: 'AR-002', name: '检测报告归档', target: '报告文件', trigger: '报告签发即归档', retention: '永久', storage: '归档服务器B', status: '启用' },
        { code: 'AR-003', name: '样品数据归档', target: '样品流转记录', trigger: '样品销毁后30天', retention: '3年', storage: '归档服务器A', status: '启用' },
        { code: 'AR-004', name: '质控数据归档', target: '质控记录', trigger: '年度结束', retention: '5年', storage: '归档服务器B', status: '启用' },
        { code: 'AR-005', name: '操作日志归档', target: '系统日志', trigger: '日志保留30天后', retention: '1年', storage: '日志服务器', status: '启用' },
        { code: 'AR-006', name: '人员档案归档', target: '人员记录', trigger: '离职后90天', retention: '10年', storage: '归档服务器C', status: '启用' },
        { code: 'AR-007', name: '设备档案归档', target: '设备记录', trigger: '设备报废即归档', retention: '永久', storage: '归档服务器C', status: '停用' }
      ],
      'system-set-log': [
        { code: 'LOG-20260916-001', type: '操作日志', user: '管理员', module: '系统设置-参数配置', ip: '192.168.1.10', time: '2026-09-16 09:12:35', status: '正常' },
        { code: 'LOG-20260916-002', type: '操作日志', user: '张三', module: '委托受理', ip: '192.168.1.21', time: '2026-09-16 09:18:42', status: '正常' },
        { code: 'LOG-20260916-003', type: '异常日志', user: '李四', module: '报告出具', ip: '192.168.1.35', time: '2026-09-16 09:25:18', status: '异常' },
        { code: 'LOG-20260916-004', type: '安全日志', user: '王五', module: '用户登录', ip: '110.52.36.118', time: '2026-09-16 09:31:55', status: '异常' },
        { code: 'LOG-20260916-005', type: '操作日志', user: '赵六', module: '样品管理', ip: '192.168.1.42', time: '2026-09-16 09:45:22', status: '正常' },
        { code: 'LOG-20260916-006', type: '系统日志', user: '系统', module: '定时备份', ip: '127.0.0.1', time: '2026-09-16 02:00:15', status: '正常' },
        { code: 'LOG-20260916-007', type: '性能日志', user: '系统', module: '内存监控', ip: '127.0.0.1', time: '2026-09-16 10:00:00', status: '正常' },
        { code: 'LOG-20260916-008', type: '安全日志', user: '管理员', module: '权限配置', ip: '192.168.1.10', time: '2026-09-16 10:15:30', status: '正常' }
      ],
      'system-set-device': [
        { code: 'DEV-001', name: '气相色谱仪 GC-2030', deviceType: '色谱仪', vendor: '岛津', connectType: 'TCP/IP', port: '192.168.1.101:502', policy: '实时采集', connectStatus: '在线', progress: 92, lastTime: '2026-09-18 09:42:18', status: '启用' },
        { code: 'DEV-002', name: '液相色谱仪 LC-2030', deviceType: '色谱仪', vendor: '岛津', connectType: 'TCP/IP', port: '192.168.1.102:502', policy: '定时采集', connectStatus: '在线', progress: 76, lastTime: '2026-09-18 09:30:08', status: '启用' },
        { code: 'DEV-003', name: '质谱仪 Xevo TQ-S', deviceType: '质谱仪', vendor: '沃特世', connectType: 'TCP/IP', port: '192.168.1.103:8000', policy: '实时采集', connectStatus: '在线', progress: 88, lastTime: '2026-09-18 09:45:32', status: '启用' },
        { code: 'DEV-004', name: '光谱仪 UV-1900i', deviceType: '光谱仪', vendor: '岛津', connectType: 'USB', port: 'COM3', policy: '触发采集', connectStatus: '在线', progress: 45, lastTime: '2026-09-18 08:55:11', status: '启用' },
        { code: 'DEV-005', name: 'PCR仪 QuantStudio 5', deviceType: 'PCR仪', vendor: '赛默飞', connectType: '串口', port: 'COM5', policy: '手动采集', connectStatus: '离线', progress: 0, lastTime: '2026-09-17 18:22:40', status: '启用' },
        { code: 'DEV-006', name: '测序仪 MiSeq', deviceType: '测序仪', vendor: 'Illumina', connectType: 'TCP/IP', port: '192.168.1.110:5000', policy: '触发采集', connectStatus: '告警', progress: 32, lastTime: '2026-09-18 09:10:25', status: '启用' },
        { code: 'DEV-007', name: '荧光显微镜 Axio Imager', deviceType: '显微镜', vendor: '蔡司', connectType: 'Wi-Fi', port: '192.168.1.120', policy: '手动采集', connectStatus: '在线', progress: 18, lastTime: '2026-09-18 07:50:02', status: '启用' },
        { code: 'DEV-008', name: '原子吸收仪 PinAAcle 900H', deviceType: '光谱仪', vendor: '珀金埃尔默', connectType: 'TCP/IP', port: '192.168.1.115:502', policy: '定时采集', connectStatus: '离线', progress: 0, lastTime: '2026-09-17 22:15:00', status: '停用' }
      ],
      'system-set-pdf': [
        { code: 'PDF-001', name: '岛津GC检测报告解析', template: '岛津GC通用模板', vendor: '岛津', parseMode: '文本提取', keyword: 'Sample|Result|Conc', status: '启用', mappings: [{ source: 'Sample Name', target: '样品名称' }, { source: 'Result', target: '检测结果' }, { source: 'Conc.', target: '浓度值' }, { source: 'Date', target: '检测日期' }, { source: 'Operator', target: '检测员' }] },
        { code: 'PDF-002', name: '沃特世MS报告解析', template: '沃特世MS模板', vendor: '沃特世', parseMode: '表格解析', keyword: 'Compound|Area|Ratio', status: '启用', mappings: [{ source: 'Compound', target: '化合物' }, { source: 'Area', target: '峰面积' }, { source: 'Ratio', target: '比值' }, { source: 'RT', target: '保留时间' }] },
        { code: 'PDF-003', name: '赛默飞PCR报告解析', template: '赛默飞PCR模板', vendor: '赛默飞', parseMode: '区域识别', keyword: 'Ct|Amplification', status: '启用', mappings: [{ source: 'Sample', target: '样品编号' }, { source: 'Ct', target: 'Ct值' }, { source: 'Target', target: '靶基因' }, { source: 'Result', target: '判定结论' }] },
        { code: 'PDF-004', name: 'Illumina测序报告解析', template: 'Illumina通用模板', vendor: 'Illumina', parseMode: '混合解析', keyword: 'Reads|Q30|Variant', status: '启用', mappings: [{ source: 'Sample ID', target: '样品编号' }, { source: 'Reads', target: 'reads数' }, { source: 'Q30%', target: 'Q30比例' }, { source: 'Variant', target: '变异位点' }] },
        { code: 'PDF-005', name: '蔡司显微镜图像报告解析', template: '蔡司图像模板', vendor: '蔡司', parseMode: '区域识别', keyword: 'Image|Scale|Mag', status: '启用', mappings: [{ source: 'Image Name', target: '图像名称' }, { source: 'Scale', target: '标尺' }, { source: 'Mag', target: '放大倍数' }] },
        { code: 'PDF-006', name: '珀金埃尔默AA报告解析', template: '珀金埃尔默AA模板', vendor: '珀金埃尔默', parseMode: '表格解析', keyword: 'Element|Conc|SD', status: '停用', mappings: [{ source: 'Element', target: '元素' }, { source: 'Conc', target: '浓度' }, { source: 'SD', target: '标准偏差' }] }
      ],
      'system-set-protocol': [
        { code: 'PROT-001', name: 'ASTM E1394 通用协议', vendor: '通用标准', transport: 'ASTM', endpoint: 'TCP监听 9100', targetTable: 'lab_result_data', lastTime: '2026-09-18 09:45:18', status: '启用', mappings: [{ source: 'H| patient_id', target: '患者编号', type: 'String' }, { source: 'O| sample_id', target: '样品编号', type: 'String' }, { source: 'R| result_value', target: '检测结果', type: 'Number' }, { source: 'R| unit', target: '结果单位', type: 'String' }, { source: 'R| abnormal_flag', target: '异常标志', type: 'String' }] },
        { code: 'PROT-002', name: 'HL7 LIS对接协议', vendor: '通用标准', transport: 'HL7', endpoint: 'MLLP 2576', targetTable: 'lis_result_data', lastTime: '2026-09-18 09:30:45', status: '启用', mappings: [{ source: 'PID-3', target: '患者编号', type: 'String' }, { source: 'OBR-4', target: '检测项目', type: 'String' }, { source: 'OBX-5', target: '检测结果', type: 'String' }, { source: 'OBX-6', target: '结果单位', type: 'String' }, { source: 'OBX-11', target: '异常状态', type: 'String' }] },
        { code: 'PROT-003', name: '岛津LC/GC底层协议', vendor: '岛津', transport: 'RS232', endpoint: 'COM3 9600,n,8,1', targetTable: 'shimadzu_raw', lastTime: '2026-09-18 09:42:18', status: '启用', mappings: [{ source: 'SampleNo', target: '样品序号', type: 'Int' }, { source: 'PeakName', target: '化合物名', type: 'String' }, { source: 'Area', target: '峰面积', type: 'Number' }, { source: 'RT', target: '保留时间', type: 'Number' }] },
        { code: 'PROT-004', name: '沃特世MS原始数据协议', vendor: '沃特世', transport: 'TCP', endpoint: 'TCP 192.168.1.103:8000', targetTable: 'waters_raw', lastTime: '2026-09-18 09:45:32', status: '启用', mappings: [{ source: 'SampleID', target: '样品编号', type: 'String' }, { source: 'Compound', target: '化合物', type: 'String' }, { source: 'Area', target: '峰面积', type: 'Number' }, { source: 'Ratio', target: '比值', type: 'Number' }] },
        { code: 'PROT-005', name: '赛默飞PCR底层协议', vendor: '赛默飞', transport: 'LIS', endpoint: 'API代理 7788', targetTable: 'thermo_pcr', lastTime: '2026-09-17 18:22:40', status: '启用', mappings: [{ source: 'WellID', target: '孔位编号', type: 'String' }, { source: 'SampleID', target: '样品编号', type: 'String' }, { source: 'CtValue', target: 'Ct值', type: 'Number' }, { source: 'Call', target: '判定结果', type: 'String' }] },
        { code: 'PROT-006', name: 'Illumina测序底层协议', vendor: 'Illumina', transport: 'LOINC', endpoint: 'REST API', targetTable: 'illumina_seq', lastTime: '2026-09-18 09:10:25', status: '启用', mappings: [{ source: 'SampleID', target: '样品编号', type: 'String' }, { source: 'ReadCount', target: 'reads数', type: 'Int' }, { source: 'Q30Percent', target: 'Q30比例', type: 'Number' }, { source: 'VariantList', target: '变异列表', type: 'JSON' }] }
      ],
      // ==================== 界面自定义 ====================
      'system-ui-form': [
        { code: 'FM-WT-01', name: '检测委托单（标准版）', doc: '委托单', fields: 18, version: 'V3.2', status: '启用', uiFields: [{ name: '客户名称', type: 'text', required: true }, { name: '联系电话', type: 'text', required: true }, { name: '样品类型', type: 'select', required: true }, { name: '样品数量', type: 'number', required: false }, { name: '送样日期', type: 'date', required: true }, { name: '检测项目', type: 'select', required: true }, { name: '备注', type: 'textarea', required: false }] },
        { code: 'FM-WT-02', name: '检测委托单（移动采样版）', doc: '委托单', fields: 15, version: 'V1.4', status: '启用', uiFields: [{ name: '委托单位', type: 'text', required: true }, { name: '采样人', type: 'text', required: true }, { name: '采样日期', type: 'date', required: true }, { name: '检测类别', type: 'select', required: true }, { name: '是否加急', type: 'radio', required: false }] },
        { code: 'FM-CY-01', name: '样品抽样单', doc: '抽样单', fields: 12, version: 'V2.0', status: '启用', uiFields: [{ name: '样品编号', type: 'text', required: true }, { name: '抽样地点', type: 'text', required: true }, { name: '抽样日期', type: 'date', required: true }, { name: '抽样方式', type: 'select', required: false }] },
        { code: 'FM-CY-02', name: '土壤专项抽样单', doc: '抽样单', fields: 16, version: 'V1.5', status: '停用', uiFields: [{ name: '地块编号', type: 'text', required: true }, { name: '土壤类型', type: 'select', required: true }, { name: '采样深度', type: 'text', required: false }, { name: '检测项目', type: 'checkbox', required: true }, { name: '备注', type: 'textarea', required: false }] },
        { code: 'FM-JY-01', name: '样品接样单', doc: '接样单', fields: 14, version: 'V2.1', status: '启用', uiFields: [{ name: '接样编号', type: 'text', required: true }, { name: '样品状态', type: 'select', required: true }, { name: '接样人', type: 'text', required: true }, { name: '接样日期', type: 'date', required: true }] },
        { code: 'FM-BG-01', name: '检测报告单（通用）', doc: '报告单', fields: 22, version: 'V4.0', status: '启用', uiFields: [{ name: '报告编号', type: 'text', required: true }, { name: '样品名称', type: 'text', required: true }, { name: '检测结论', type: 'select', required: true }, { name: '报告日期', type: 'date', required: true }, { name: '签发人', type: 'text', required: false }] },
        { code: 'FM-ZK-01', name: '室内质控记录单', doc: '质控单', fields: 10, version: 'V1.2', status: '启用', uiFields: [{ name: '质控项目', type: 'text', required: true }, { name: '质控水平', type: 'select', required: true }, { name: '测定值', type: 'number', required: true }, { name: '质控日期', type: 'date', required: true }] },
        { code: 'FM-ZK-02', name: '失控处理记录单', doc: '质控单', fields: 9, version: 'V1.0', status: '停用', uiFields: [{ name: '失控项目', type: 'text', required: true }, { name: '失控原因', type: 'textarea', required: true }, { name: '处理措施', type: 'textarea', required: false }, { name: '处理人', type: 'text', required: true }] }
      ],
      'system-ui-column': [
        { code: 'CL-01', module: '委托受理列表', group: '业务模块', cols: 8, visible: 6, status: '启用', fields: [{ name: '委托编号', type: 'text', enabled: true }, { name: '委托单位', type: 'text', enabled: true }, { name: '样品名称', type: 'text', enabled: true }, { name: '检测项目', type: 'text', enabled: true }, { name: '受理日期', type: 'date', enabled: true }, { name: '委托人', type: 'text', enabled: true }, { name: '联系电话', type: 'text', enabled: false }, { name: '状态', type: 'select', enabled: true }] },
        { code: 'CL-02', module: '样品管理列表', group: '业务模块', cols: 10, visible: 8, status: '启用', fields: [{ name: '样品编号', type: 'text', enabled: true }, { name: '样品名称', type: 'text', enabled: true }, { name: '样品类型', type: 'select', enabled: true }, { name: '采样日期', type: 'date', enabled: true }, { name: '保存条件', type: 'text', enabled: true }, { name: '数量', type: 'number', enabled: true }, { name: '状态', type: 'select', enabled: true }, { name: '备注', type: 'textarea', enabled: false }, { name: '创建人', type: 'text', enabled: true }, { name: '更新时间', type: 'date', enabled: true }] },
        { code: 'CL-03', module: '检测任务列表', group: '业务模块', cols: 9, visible: 7, status: '启用', fields: [{ name: '任务编号', type: 'text', enabled: true }, { name: '检测项目', type: 'text', enabled: true }, { name: '责任人', type: 'text', enabled: true }, { name: '开始时间', type: 'date', enabled: true }, { name: '完成时间', type: 'date', enabled: true }, { name: '优先级', type: 'select', enabled: true }, { name: '状态', type: 'select', enabled: true }, { name: '设备编号', type: 'text', enabled: false }, { name: '操作', type: 'text', enabled: true }] },
        { code: 'CL-04', module: '报告管理列表', group: '业务模块', cols: 8, visible: 8, status: '启用', fields: [{ name: '报告编号', type: 'text', enabled: true }, { name: '报告名称', type: 'text', enabled: true }, { name: '签发人', type: 'text', enabled: true }, { name: '签发日期', type: 'date', enabled: true }, { name: '报告类型', type: 'select', enabled: true }, { name: '状态', type: 'select', enabled: true }, { name: '复核人', type: 'text', enabled: true }, { name: '打印次数', type: 'number', enabled: true }] },
        { code: 'CL-05', module: '质量控制列表', group: '质量模块', cols: 9, visible: 5, status: '启用', fields: [{ name: '质控编号', type: 'text', enabled: true }, { name: '质控项目', type: 'text', enabled: true }, { name: '质控人', type: 'text', enabled: true }, { name: '质控时间', type: 'date', enabled: true }, { name: '失控说明', type: 'textarea', enabled: true }, { name: '状态', type: 'select', enabled: true }, { name: '判定结论', type: 'select', enabled: false }, { name: '复核人', type: 'text', enabled: false }, { name: '备注', type: 'textarea', enabled: false }] },
        { code: 'CL-06', module: '能力验证列表', group: '质量模块', cols: 8, visible: 6, status: '启用', fields: [{ name: '验证编号', type: 'text', enabled: true }, { name: '验证项目', type: 'text', enabled: true }, { name: '机构', type: 'text', enabled: true }, { name: '报名时间', type: 'date', enabled: true }, { name: '结果', type: 'select', enabled: true }, { name: '状态', type: 'select', enabled: true }, { name: '证书编号', type: 'text', enabled: false }, { name: '备注', type: 'textarea', enabled: false }] },
        { code: 'CL-07', module: '内审检查表', group: '质量模块', cols: 7, visible: 5, status: '停用', fields: [{ name: '检查项', type: 'text', enabled: true }, { name: '检查要点', type: 'textarea', enabled: true }, { name: '检查结果', type: 'select', enabled: true }, { name: '责任部门', type: 'text', enabled: true }, { name: '检查人', type: 'text', enabled: true }, { name: '整改期限', type: 'date', enabled: false }, { name: '备注', type: 'textarea', enabled: false }] },
        { code: 'CL-08', module: '用户管理列表', group: '系统模块', cols: 7, visible: 6, status: '启用', fields: [{ name: '用户名', type: 'text', enabled: true }, { name: '姓名', type: 'text', enabled: true }, { name: '角色', type: 'select', enabled: true }, { name: '部门', type: 'text', enabled: true }, { name: '电话', type: 'text', enabled: true }, { name: '状态', type: 'select', enabled: true }, { name: '上次登录', type: 'date', enabled: false }] },
        { code: 'CL-09', module: '业务统计列表', group: '统计模块', cols: 8, visible: 6, status: '启用', fields: [{ name: '统计期间', type: 'text', enabled: true }, { name: '委托量', type: 'number', enabled: true }, { name: '任务量', type: 'number', enabled: true }, { name: '报告量', type: 'number', enabled: true }, { name: '完成率', type: 'number', enabled: true }, { name: '状态', type: 'select', enabled: true }, { name: '同比', type: 'number', enabled: false }, { name: '备注', type: 'textarea', enabled: false }] }
      ],
      'system-ui-report': [
        { code: 'RP-01', name: '检测报告（标准样式）', type: '检测报告', size: 'A4', version: 'V5.1', status: '启用', fields: [{ name: '报告编号', type: 'text', print: true }, { name: '样品名称', type: 'text', print: true }, { name: '检测项目', type: 'text', print: true }, { name: '检测结论', type: 'select', print: true }, { name: '签发人', type: 'text', print: true }, { name: '报告日期', type: 'date', print: true }], style: { paper: 'A4', orient: '纵向', margin: '10mm', fontSize: '14', titleSize: '20', showHeader: true, showPageNo: true } },
        { code: 'RP-02', name: '检测报告（简化样式）', type: '检测报告', size: 'A4', version: 'V2.0', status: '启用', fields: [{ name: '报告编号', type: 'text', print: true }, { name: '样品名称', type: 'text', print: true }, { name: '检测结论', type: 'select', print: true }, { name: '签发人', type: 'text', print: true }, { name: '报告日期', type: 'date', print: true }], style: { paper: 'A4', orient: '纵向', margin: '8mm', fontSize: '13', titleSize: '18', showHeader: false, showPageNo: true } },
        { code: 'RP-03', name: '样品条码标签', type: '样品标签', size: '60×40mm', version: 'V3.0', status: '启用', fields: [{ name: '样品编号', type: 'text', print: true }, { name: '样品名称', type: 'text', print: true }, { name: '条码', type: 'text', print: true }, { name: '采样日期', type: 'date', print: true }], style: { paper: '60×40mm', orient: '纵向', margin: '2mm', fontSize: '12', titleSize: '14', showHeader: false, showPageNo: false } },
        { code: 'RP-04', name: '样品瓶标签', type: '样品标签', size: '40×30mm', version: 'V1.1', status: '启用', fields: [{ name: '样品编号', type: 'text', print: true }, { name: '样品名称', type: 'text', print: true }, { name: '保存条件', type: 'text', print: true }], style: { paper: '40×30mm', orient: '纵向', margin: '1mm', fontSize: '11', titleSize: '13', showHeader: false, showPageNo: false } },
        { code: 'RP-05', name: '质控图打印样式', type: '质控图表', size: 'A4', version: 'V1.5', status: '启用', fields: [{ name: '质控项目', type: 'text', print: true }, { name: '质控日期', type: 'date', print: true }, { name: '质控人', type: 'text', print: true }, { name: '质控图', type: 'chart', print: true }], style: { paper: 'A4', orient: '横向', margin: '10mm', fontSize: '14', titleSize: '20', showHeader: true, showPageNo: true } },
        { code: 'RP-06', name: '月度统计报表', type: '统计报表', size: 'A4横向', version: 'V2.2', status: '启用', fields: [{ name: '统计期间', type: 'text', print: true }, { name: '委托量', type: 'number', print: true }, { name: '任务量', type: 'number', print: true }, { name: '报告量', type: 'number', print: true }, { name: '完成率', type: 'number', print: true }], style: { paper: 'A4', orient: '横向', margin: '10mm', fontSize: '13', titleSize: '20', showHeader: true, showPageNo: true } },
        { code: 'RP-07', name: '样品运输标签', type: '标签打印', size: '80×100mm', version: 'V1.0', status: '停用', fields: [{ name: '样品编号', type: 'text', print: true }, { name: '样品名称', type: 'text', print: true }, { name: '运输条件', type: 'text', print: true }, { name: '目的地', type: 'text', print: true }, { name: '联系人', type: 'text', print: true }], style: { paper: '80×100mm', orient: '横向', margin: '3mm', fontSize: '12', titleSize: '15', showHeader: true, showPageNo: false } }
      ],
      'system-ui-query': [
        { code: 'QY-01', name: '委托量月度趋势', type: '统计图表', source: '委托业务数据', status: '启用' },
        { code: 'QY-02', name: '检测项目分布统计', type: '统计图表', source: '检测任务数据', status: '启用' },
        { code: 'QY-03', name: '部门检测量汇总', type: '汇总表格', source: '检测任务数据', status: '启用' },
        { code: 'QY-04', name: '报告及时率导出', type: '导出表格', source: '报告管理数据', status: '启用' },
        { code: 'QY-05', name: '质控合格率趋势', type: '趋势看板', source: '质量控制数据', status: '启用' },
        { code: 'QY-06', name: '设备使用率统计', type: '统计图表', source: '设备管理数据', status: '停用' },
        { code: 'QY-07', name: '客户满意度调查', type: '汇总表格', source: '客户反馈数据', status: '启用' }
      ],
      'system-ui-home': [
        { code: 'HM-01', name: '快捷入口', cat: '快捷入口', pos: '左上', sort: 1, status: '启用' },
        { code: 'HM-02', name: '待办事项', cat: '待办事项', pos: '左中', sort: 2, status: '启用' },
        { code: 'HM-03', name: '检测量统计看板', cat: '数据看板', pos: '右上', sort: 3, status: '启用' },
        { code: 'HM-04', name: '消息通知', cat: '消息通知', pos: '右中', sort: 4, status: '启用' },
        { code: 'HM-05', name: '质控预警看板', cat: '数据看板', pos: '右下', sort: 5, status: '启用' },
        { code: 'HM-06', name: '我的预约', cat: '待办事项', pos: '左下', sort: 6, status: '停用' },
        { code: 'HM-07', name: '成果产出排行', cat: '数据看板', pos: '中右', sort: 7, status: '启用' }
      ],
      'quality-corrective': [
        { id: 'ZG-2026-015', reason: '样品交接记录不完整', source: '质量监督', leader: '周晓梅', deadline: '2026-03-20', status: '已完成', verify: '通过' },
        { id: 'ZG-2026-018', reason: 'PCR扩增效率偏低', source: '质量控制', leader: '李建平', deadline: '2026-04-10', status: '待验证', verify: '待验证' },
        { id: 'ZG-2026-020', reason: '农残检测结果偏离', source: '能力验证', leader: '马晓东', deadline: '2026-05-15', status: '进行中', verify: '待验证' },
        { id: 'ZG-2025-032', reason: '内审发现文件未及时更新', source: '内审发现', leader: '王秀云', deadline: '2025-12-30', status: '已完成', verify: '通过' },
        { id: 'ZG-2026-006', reason: '投诉处理超时', source: '客户投诉', leader: '孙国栋', deadline: '2026-02-15', status: '已完成', verify: '通过' },
        { id: 'ZG-2026-022', reason: '报告二级审核缺失', source: '质量监督', leader: '吴静', deadline: '2026-05-28', status: '进行中', verify: '待验证' },
        { id: 'ZG-2026-024', reason: '试剂验收记录归档滞后', source: '管理评审', leader: '陈思远', deadline: '2026-06-20', status: '进行中', verify: '不通过' },
        { id: 'ZG-2026-003', reason: '样品标签打印模板更新', source: '客户投诉', leader: '周晓梅', deadline: '2026-01-31', status: '已完成', verify: '通过' }
      ],
      'quality-corrective-apply': [
        { id: 'ZG-SQ-2026-001', problem: '荧光定量PCR仪在校准有效期届满后仍用于检测', source: '内审发现', level: '严重', applicant: '陈思远', date: '2026-05-28', dept: '设备管理部', deadline: '2026-06-15', status: '已批准' },
        { id: 'ZG-SQ-2026-002', problem: '部分试剂验收记录未及时归档', source: '质量监督', level: '一般', applicant: '吴静', date: '2026-06-02', dept: '试剂耗材部', deadline: '2026-06-20', status: '待审批' },
        { id: 'ZG-SQ-2026-003', problem: '报告电子存档命名不符合版本规则', source: '客户投诉', level: '轻微', applicant: '张洁', date: '2026-06-05', dept: '报告编制组', deadline: '2026-06-25', status: '已批准' },
        { id: 'ZG-SQ-2026-004', problem: '能力验证结果评定不规范', source: '能力验证', level: '严重', applicant: '马晓东', date: '2026-06-10', dept: '检测实验室', deadline: '2026-07-05', status: '已批准' },
        { id: 'ZG-SQ-2026-005', problem: '管理评审整改措施落实滞后', source: '管理评审', level: '一般', applicant: '王秀云', date: '2026-06-18', dept: '质量管理部门', deadline: '2026-07-15', status: '待审批' }
      ],
      'quality-corrective-analysis': [
        { id: 'ZGFX-2026-001', applyNo: 'ZG-SQ-2026-001', method: '5Why分析', rootCause: '设备校准周期计划未纳入年度计量管理台账，无专人跟踪校准到期时间。', analyst: '陈思远', date: '2026-05-30', status: '已完成' },
        { id: 'ZGFX-2026-002', applyNo: 'ZG-SQ-2026-003', method: '流程分析', rootCause: '报告归档流程缺少电子文件命名规范检查环节，归档人员沿用旧习惯。', analyst: '张洁', date: '2026-06-06', status: '已完成' },
        { id: 'ZGFX-2026-003', applyNo: 'ZG-SQ-2026-004', method: '鱼骨图', rootCause: '评定人员对结果评定规则掌握不一致，缺少统一作业指导书。', analyst: '马晓东', date: '2026-06-12', status: '分析中' },
        { id: 'ZGFX-2026-004', applyNo: 'ZG-SQ-2026-005', method: '头脑风暴', rootCause: '整改任务未明确责任人与完成时限，缺少跟踪提醒机制。', analyst: '王秀云', date: '2026-06-19', status: '待分析' }
      ],
      'quality-corrective-measure': [
        { id: 'ZGCS-2026-001', applyNo: 'ZG-SQ-2026-001', type: '纠正', measure: '立即停用校准超期设备并送检校准，校准合格后方可投入使用。', leader: '陈思远', deadline: '2026-06-10', result: '设备已完成校准并合格，期间核查程序文件同步修订。', status: '已完成' },
        { id: 'ZGCS-2026-002', applyNo: 'ZG-SQ-2026-003', type: '纠正措施', measure: '修订报告归档作业指导书，明确电子文件命名规则并设置检查节点。', leader: '张洁', deadline: '2026-06-20', result: '作业指导书已修订并组织相关岗位培训。', status: '实施中' },
        { id: 'ZGCS-2026-003', applyNo: 'ZG-SQ-2026-004', type: '纠正措施', measure: '编制能力验证结果评定作业指导书并组织评定人员专项培训。', leader: '马晓东', deadline: '2026-07-02', result: '', status: '待实施' },
        { id: 'ZGCS-2026-004', applyNo: 'ZG-SQ-2026-005', type: '预防措施', measure: '建立整改任务台账，明确责任人、时限并设置跟踪提醒。', leader: '王秀云', deadline: '2026-07-12', result: '', status: '待实施' }
      ],
      'quality-corrective-verify': [
        { id: 'ZGYZ-2026-001', applyNo: 'ZG-SQ-2026-001', verifier: '孙国栋', date: '2026-06-12', method: '现场核查', result: '通过', conclusion: '设备校准合规，期间核查制度已落实，验证通过。', status: '已验证' },
        { id: 'ZGYZ-2026-002', applyNo: 'ZG-SQ-2026-003', verifier: '孙国栋', date: '2026-06-22', method: '资料审查', result: '通过', conclusion: '归档命名规则已执行，抽查样本符合规范。', status: '已验证' },
        { id: 'ZGYZ-2026-003', applyNo: 'ZG-SQ-2026-004', verifier: '张丽华', date: '', method: '现场核查', result: '待验证', conclusion: '', status: '待验证' }
      ],
      'quality-corrective-audit': [
        { id: 'ZGSH-2026-001', applyNo: 'ZG-SQ-2026-001', auditor: '张丽华', date: '2026-06-15', opinion: '整改过程记录完整，验证结论有效，同意关闭。', result: '通过', status: '已审核' },
        { id: 'ZGSH-2026-002', applyNo: 'ZG-SQ-2026-003', auditor: '张丽华', date: '2026-06-25', opinion: '措施落实到位，同意关闭。', result: '通过', status: '已审核' },
        { id: 'ZGSH-2026-003', applyNo: 'ZG-SQ-2026-002', auditor: '', date: '', opinion: '', result: '待验证', status: '待审核' }
      ],
      'quality-corrective-ledger': [
        { id: 'ZGTZ-2026-001', applyNo: 'ZG-SQ-2026-001', problem: '荧光定量PCR仪校准超期仍用于检测', source: '内审发现', dept: '设备管理部', leader: '陈思远', deadline: '2026-06-15', finishDate: '2026-06-15', verify: '通过', status: '已关闭' },
        { id: 'ZGTZ-2026-002', applyNo: 'ZG-SQ-2026-003', problem: '报告电子存档命名不符合版本规则', source: '客户投诉', dept: '报告编制组', leader: '张洁', deadline: '2026-06-25', finishDate: '2026-06-24', verify: '通过', status: '已关闭' },
        { id: 'ZGTZ-2026-003', applyNo: 'ZG-SQ-2026-004', problem: '能力验证结果评定不规范', source: '能力验证', dept: '检测实验室', leader: '马晓东', deadline: '2026-07-05', finishDate: '', verify: '待验证', status: '整改中' },
        { id: 'ZGTZ-2026-004', applyNo: 'ZG-SQ-2026-005', problem: '管理评审整改措施落实滞后', source: '管理评审', dept: '质量管理部门', leader: '王秀云', deadline: '2026-07-15', finishDate: '', verify: '待验证', status: '整改中' }
      ],
      'training-plan': [
        { id: 'JH-2026-008', name: '分子检测操作技术提升培训', type: '内训', time: '2026.03 - 2026.04', hours: 24, teacher: '王秀云', target: '检测人员', status: '已审批' },
        { id: 'JH-2026-001', name: '检验检测机构资质认定培训', type: '外训', time: '2026.01 - 2026.01', hours: 16, teacher: '外部专家', target: '质量管理人员', status: '已完成' },
        { id: 'JH-2026-009', name: '二代测序数据分析培训', type: '内训', time: '2026.04 - 2026.05', hours: 32, teacher: '赵明伟', target: '测序技术人员', status: '已审批' },
        { id: 'JH-2026-012', name: '实验室安全与生物安全培训', type: '内训', time: '2026.05 - 2026.05', hours: 8, teacher: '安委会', target: '全体人员', status: '待审批' },
        { id: 'JH-2025-015', name: '仪器设备期间核查实操培训', type: '内训', time: '2025.10 - 2025.10', hours: 12, teacher: '陈思远', target: '设备管理员', status: '已完成' },
        { id: 'JH-2026-014', name: 'GB/T 27025-2019 宣贯培训', type: '外训', time: '2026.06 - 2026.06', hours: 16, teacher: '外部专家', target: '全员', status: '待审批' },
        { id: 'JH-2026-002', name: '花卉病毒检测国家标准解读', type: '内训', time: '2026.02 - 2026.02', hours: 10, teacher: '王秀云', target: '检测人员', status: '已完成' },
        { id: 'JH-2026-016', name: '数据安全与保密意识培训', type: '内训', time: '2026.07 - 2026.07', hours: 6, teacher: '信息部', target: '全体人员', status: '待审批' }
      ],
      'training-implement': [
        { id: 'BC-2026-004', name: '分子检测操作技术提升班', method: '实操', date: '2026-04-08', teacher: '王秀云', count: 16, rate: 100, status: '已完成' },
        { id: 'BC-2026-001', name: '资质认定宣贯班', method: '理论', date: '2026-01-18', teacher: '外部专家', count: 24, rate: 96, status: '已完成' },
        { id: 'BC-2026-005', name: '二代测序数据分析班', method: '线上线下', date: '2026-04-20', teacher: '赵明伟', count: 12, rate: 92, status: '已完成' },
        { id: 'BC-2026-007', name: '实验室安全培训（第一期）', method: '理论', date: '2026-05-18', teacher: '安委会', count: 30, rate: 88, status: '进行中' },
        { id: 'BC-2025-012', name: '设备期间核查实操班', method: '实操', date: '2025-10-20', teacher: '陈思远', count: 8, rate: 100, status: '已完成' },
        { id: 'BC-2026-002', name: '病毒检测国家标准解读班', method: '理论', date: '2026-02-12', teacher: '王秀云', count: 18, rate: 100, status: '已完成' },
        { id: 'BC-2026-009', name: '数据安全与保密培训班', method: '理论', date: '2026-07-05', teacher: '信息部', count: 0, rate: 0, status: '待开始' },
        { id: 'BC-2026-010', name: '组培技术提升班', method: '实操', date: '2026-07-15', teacher: '赵明伟', count: 0, rate: 0, status: '待开始' }
      ],
      'training-exam': [
        { id: 'KH-2026-004', name: '分子检测操作技能考核', method: '实操考核', training: '分子检测操作技术提升班', date: '2026-04-15', count: 16, pass: 94, status: '已完成' },
        { id: 'KH-2026-001', name: '资质认定理论知识考试', method: '理论考试', training: '资质认定宣贯班', date: '2026-01-25', count: 24, pass: 92, status: '已完成' },
        { id: 'KH-2026-005', name: '测序数据分析结业考核', method: '实操考核', training: '二代测序数据分析班', date: '2026-05-10', count: 12, pass: 100, status: '已完成' },
        { id: 'KH-2025-010', name: '设备核查操作考核', method: '实操考核', training: '设备期间核查实操班', date: '2025-10-28', count: 8, pass: 100, status: '已完成' },
        { id: 'KH-2026-002', name: '病毒检测国家标准考核', method: '理论考试', training: '国标解读班', date: '2026-02-20', count: 18, pass: 89, status: '已完成' },
        { id: 'KH-2026-008', name: '实验室安全知识考核', method: '理论考试', training: '安全培训（第一期）', date: '2026-05-30', count: 12, pass: 75, status: '进行中' },
        { id: 'KH-2026-010', name: '数据安全知识考核', method: '理论考试', training: '数据安全培训班', date: '2026-07-10', count: 0, pass: 0, status: '待开始' },
        { id: 'KH-2026-011', name: '组培实操技能考核', method: '实操考核', training: '组培技术提升班', date: '2026-07-25', count: 0, pass: 0, status: '待开始' }
      ],
      'training-certificate': [
        { id: 'ZS-2026-0108', name: '李婷', type: '培训合格证', issueDate: '2026-04-20', expireDate: '2028-04-19', status: '有效' },
        { id: 'ZS-2026-0023', name: '张涛', type: '上岗证', issueDate: '2026-01-30', expireDate: '2029-01-29', status: '有效' },
        { id: 'ZS-2025-0086', name: '刘芳', type: '能力验证证书', issueDate: '2025-09-15', expireDate: '2027-09-14', status: '有效' },
        { id: 'ZS-2024-0045', name: '王强', type: '检测报告授权证', issueDate: '2024-11-01', expireDate: '2026-10-31', status: '即将到期' },
        { id: 'ZS-2023-0033', name: '杨帆', type: '检测报告授权证', issueDate: '2023-03-20', expireDate: '2026-03-19', status: '已过期' },
        { id: 'ZS-2026-0095', name: '陈晨', type: '上岗证', issueDate: '2026-03-10', expireDate: '2029-03-09', status: '有效' },
        { id: 'ZS-2025-0120', name: '赵磊', type: '培训合格证', issueDate: '2025-12-28', expireDate: '2027-12-27', status: '有效' },
        { id: 'ZS-2026-0150', name: '周雨', type: '能力验证证书', issueDate: '2026-05-08', expireDate: '2028-05-07', status: '有效' }
      ],
      'stat-query-delegate': [
        { id: 'WT-2026-0182', name: '切花月季病毒检测委托', org: '云南锦苑花卉公司', item: '花卉病毒RT-PCR检测', owner: '李婷', date: '2026-03-18', status: '已完成', cat: 'delegate' },
        { id: 'WT-2026-0190', name: '康乃馨种苗质量检测', org: '昆明鲜切花合作社', item: '种苗病原菌检测', owner: '张涛', date: '2026-03-24', status: '已完成', cat: 'delegate' },
        { id: 'WT-2026-0205', name: '月季灰霉病分子鉴定', org: '云南农科院', item: '病原菌鉴定', owner: '刘芳', date: '2026-04-02', status: '已完成', cat: 'delegate' },
        { id: 'WT-2026-0218', name: '花卉保鲜剂成分分析', org: '花易宝电商平台', item: '成分定性定量', owner: '王强', date: '2026-04-20', status: '进行中', cat: 'delegate' },
        { id: 'WT-2026-0225', name: '兰花病毒普查检测', org: '西南林业大学', item: '病毒检测', owner: '陈晨', date: '2026-05-06', status: '待受理', cat: 'delegate' },
        { id: 'WT-2026-0198', name: '百合种球净化检测', org: '昆明华科农业', item: '病毒率检测', owner: '赵磊', date: '2026-03-28', status: '已完成', cat: 'delegate' },
        { id: 'WT-2026-0108', name: '鲜切花农残委托检测', org: '斗南物流中心', item: '农残快速检测', owner: '周雨', date: '2026-02-15', status: '已完成', cat: 'delegate' },
        { id: 'WT-2026-0232', name: '土壤微生物多样性检测', org: '云南质检院', item: '微生物检测', owner: '李婷', date: '2026-05-12', status: '待受理', cat: 'delegate' }
      ],
      'stat-query-report': [
        { id: 'BG-2026-0118', name: '切花月季病毒检测报告', org: '云南锦苑花卉公司', item: '病毒RT-PCR检测', owner: '张涛', date: '2026-03-25', status: '已出具', cat: 'report' },
        { id: 'BG-2026-0126', name: '康乃馨种苗质量检测报告', org: '昆明鲜切花合作社', item: '病原菌检测', owner: '刘芳', date: '2026-03-30', status: '已出具', cat: 'report' },
        { id: 'BG-2026-0130', name: '月季灰霉病鉴定报告', org: '云南农科院', item: '病原菌鉴定', owner: '王强', date: '2026-04-08', status: '已出具', cat: 'report' },
        { id: 'BG-2026-0138', name: '保鲜剂成分分析报告', org: '花易宝电商平台', item: '成分分析', owner: '陈晨', date: '2026-04-25', status: '待出具', cat: 'report' },
        { id: 'BG-2026-0080', name: '鲜切花农残检测报告', org: '斗南物流中心', item: '农残检测', owner: '赵磊', date: '2026-02-20', status: '已出具', cat: 'report' },
        { id: 'BG-2026-0142', name: '百合种球净化检测报告', org: '昆明华科农业', item: '病毒率检测', owner: '周雨', date: '2026-04-01', status: '已出具', cat: 'report' },
        { id: 'BG-2025-0102', name: '兰花病毒普查报告', org: '西南林业大学', item: '病毒检测', owner: '李婷', date: '2025-12-12', status: '已出具', cat: 'report' },
        { id: 'BG-2026-0145', name: '土壤微生物检测报告', org: '云南质检院', item: '微生物检测', owner: '张涛', date: '2026-05-15', status: '待出具', cat: 'report' }
      ],
      'stat-query-sample': [
        { id: 'YP-2026-3182', name: '月季叶片样本库-批次A', org: '锦苑花卉', item: 'DNA提取', owner: '刘芳', date: '2026-03-20', status: '已入库', cat: 'sample' },
        { id: 'YP-2026-3190', name: '康乃馨茎段样本', org: '昆明鲜切花合作社', item: '组培检测', owner: '陈晨', date: '2026-03-26', status: '已入库', cat: 'sample' },
        { id: 'YP-2026-3215', name: '兰花种质叶片样本', org: '西南林业大学', item: '病毒检测', owner: '赵磊', date: '2026-04-05', status: '检测中', cat: 'sample' },
        { id: 'YP-2026-3228', name: '土壤样本批号S-06', org: '云南质检院', item: '微生物检测', owner: '周雨', date: '2026-04-22', status: '检测中', cat: 'sample' },
        { id: 'YP-2026-3250', name: '百合种球组织样本', org: '昆明华科农业', item: '病毒率检测', owner: '李婷', date: '2026-05-02', status: '待检测', cat: 'sample' },
        { id: 'YP-2026-3262', name: '月季花朵保鲜样本', org: '花易宝电商平台', item: '成分分析', owner: '张涛', date: '2026-05-10', status: '待检测', cat: 'sample' },
        { id: 'YP-2026-3275', name: '农残检测样品批号N-12', org: '斗南物流中心', item: '农残检测', owner: '刘芳', date: '2026-05-16', status: '待接收', cat: 'sample' },
        { id: 'YP-2026-3195', name: '月季灰霉病组织样本', org: '云南农科院', item: '病原菌鉴定', owner: '王强', date: '2026-03-28', status: '已入库', cat: 'sample' }
      ]
    };
  }

  /* ---------- 各页面统计卡片 ---------- */
  function statsOf(page, data) {
    var arr = data[page] || [];
    switch (page) {
      case 'research-project':
        return [
          { label: '在研项目', value: arr.filter(function (r) { return r.status === '在研'; }).length, icon: 'fa-flask', color: 'green' },
          { label: '已结题项目', value: arr.filter(function (r) { return r.status === '已结题'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待立项', value: arr.filter(function (r) { return r.status === '待立项'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '在研经费(万元)', value: arr.filter(function (r) { return r.status === '在研'; }).reduce(function (s, r) { return s + (Number(r.budget) || 0); }, 0), icon: 'fa-coins', color: 'purple' }
        ];
      case 'research-experiment':
        return [
          { label: '实验记录', value: arr.filter(function (r) { return r.type === '实验记录'; }).length, icon: 'fa-clipboard-list', color: 'green' },
          { label: '科研样品', value: arr.filter(function (r) { return r.type === '科研样品'; }).length, icon: 'fa-box', color: 'blue' },
          { label: '测序项目', value: arr.filter(function (r) { return r.type === '测序项目'; }).length, icon: 'fa-dna', color: 'purple' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '记录中'; }).length, icon: 'fa-spinner', color: 'orange' }
        ];
      case 'research-result':
        return [
          { label: '学术论文', value: arr.filter(function (r) { return r.type === '学术论文'; }).length, icon: 'fa-file-lines', color: 'blue' },
          { label: '发明专利', value: arr.filter(function (r) { return r.type === '发明专利'; }).length, icon: 'fa-lightbulb', color: 'green' },
          { label: '获奖成果', value: arr.filter(function (r) { return r.type === '获奖成果'; }).length, icon: 'fa-trophy', color: 'orange' },
          { label: '成果转化', value: arr.filter(function (r) { return r.type === '成果转化'; }).length, icon: 'fa-arrow-right-arrow-left', color: 'purple' }
        ];
      case 'research-cooperation':
        return [
          { label: '合作单位', value: arr.filter(function (r) { return r.type === '合作协议' || r.type === '平台共建'; }).length, icon: 'fa-building', color: 'green' },
          { label: '学术交流', value: arr.filter(function (r) { return r.type === '学术交流'; }).length, icon: 'fa-people-group', color: 'blue' },
          { label: '培训讲座', value: arr.filter(function (r) { return r.type === '培训讲座'; }).length, icon: 'fa-chalkboard-user', color: 'orange' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'purple' }
        ];
      case 'quality-review-plan-mgmt':
        return [
          { label: '计划总数', value: arr.length, icon: 'fa-clipboard-list', color: 'green' },
          { label: '已发布', value: arr.filter(function (r) { return r.status === '已发布'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待审批', value: arr.filter(function (r) { return r.status === '待审批'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '已废止', value: arr.filter(function (r) { return r.status === '已废止'; }).length, icon: 'fa-ban', color: 'red' }
        ];
      case 'quality-review':
        return [
          { label: '年度评审', value: 6, icon: 'fa-clipboard-check', color: 'green' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '评审完成率', value: Math.round(arr.filter(function (r) { return r.status === '已完成'; }).length / arr.length * 100) + '%', icon: 'fa-ranking-star', color: 'purple' }
        ];
      case 'quality-review-plan-exec':
        return [
          { label: '执行任务', value: arr.length, icon: 'fa-list-check', color: 'green' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '已延期', value: arr.filter(function (r) { return r.status === '已延期'; }).length, icon: 'fa-triangle-exclamation', color: 'red' }
        ];
      case 'quality-review-input':
        return [
          { label: '资料总数', value: arr.length, icon: 'fa-folder-open', color: 'green' },
          { label: '收集完成', value: arr.filter(function (r) { return r.status === '收集完成'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '已收集', value: arr.filter(function (r) { return r.status === '已收集'; }).length, icon: 'fa-file-circle-check', color: 'purple' },
          { label: '待收集', value: arr.filter(function (r) { return r.status === '待收集'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-review-meeting':
        return [
          { label: '会议总数', value: arr.length, icon: 'fa-people-roof', color: 'green' },
          { label: '已召开', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '待召开', value: arr.filter(function (r) { return r.status === '待召开'; }).length, icon: 'fa-calendar-plus', color: 'purple' }
        ];
      case 'quality-review-report':
        return [
          { label: '报告总数', value: arr.length, icon: 'fa-file-circle-check', color: 'green' },
          { label: '已批准', value: arr.filter(function (r) { return r.status === '已批准'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '编制中', value: arr.filter(function (r) { return r.status === '编制中'; }).length, icon: 'fa-pen-ruler', color: 'orange' },
          { label: '已提交', value: arr.filter(function (r) { return r.status === '已提交'; }).length, icon: 'fa-arrow-right-to-bracket', color: 'purple' }
        ];
      case 'quality-review-rectify':
        return [
          { label: '整改总数', value: arr.length, icon: 'fa-toolbox', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '验证通过率', value: (arr.length ? Math.round(arr.filter(function (r) { return r.verify === '通过'; }).length / arr.length * 100) : 0) + '%', icon: 'fa-ranking-star', color: 'purple' }
        ];
      case 'quality-audit':
        return [
          { label: '年度内审', value: 4, icon: 'fa-magnifying-glass-chart', color: 'green' },
          { label: '已发现不符合项', value: arr.reduce(function (s, r) { return s + (Number(r.nc) || 0); }, 0), icon: 'fa-circle-exclamation', color: 'red' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '整改率', value: '92%', icon: 'fa-hand-holding-medical', color: 'purple' }
        ];
      case 'quality-audit-clause-element':
        return [
          { label: '要素条款', value: arr.length, icon: 'fa-list-check', color: 'green' },
          { label: '有效', value: arr.filter(function (r) { return r.status === '有效'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '修订中', value: arr.filter(function (r) { return r.status === '修订中'; }).length, icon: 'fa-pen-ruler', color: 'orange' },
          { label: '废止', value: arr.filter(function (r) { return r.status === '废止'; }).length, icon: 'fa-ban', color: 'red' }
        ];
      case 'quality-audit-clause-dept':
        return [
          { label: '部门条款', value: arr.length, icon: 'fa-building-shield', color: 'green' },
          { label: '有效', value: arr.filter(function (r) { return r.status === '有效'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '修订中', value: arr.filter(function (r) { return r.status === '修订中'; }).length, icon: 'fa-pen-ruler', color: 'orange' },
          { label: '覆盖部门', value: (function () { var s = {}; arr.forEach(function (r) { s[r.dept] = 1; }); return Object.keys(s).length; })(), icon: 'fa-sitemap', color: 'purple' }
        ];
      case 'quality-audit-year':
        return [
          { label: '年度计划', value: arr.length, icon: 'fa-calendar-check', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-audit-plan':
        return [
          { label: '实施计划', value: arr.length, icon: 'fa-calendar-days', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-audit-meeting':
        return [
          { label: '会议总数', value: arr.length, icon: 'fa-people-roof', color: 'green' },
          { label: '首次会议', value: arr.filter(function (r) { return r.type === '首次会议'; }).length, icon: 'fa-flag-checkered', color: 'blue' },
          { label: '末次会议', value: arr.filter(function (r) { return r.type === '末次会议'; }).length, icon: 'fa-flag', color: 'purple' },
          { label: '待召开', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-calendar-plus', color: 'orange' }
        ];
      case 'quality-audit-checklist':
        return [
          { label: '检查表', value: arr.length, icon: 'fa-clipboard-list', color: 'green' },
          { label: '符合', value: arr.filter(function (r) { return r.result === '符合'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '不符合', value: arr.filter(function (r) { return r.result === '不符合'; }).length, icon: 'fa-circle-xmark', color: 'red' },
          { label: '观察项', value: arr.filter(function (r) { return r.result === '观察项'; }).length, icon: 'fa-eye', color: 'orange' }
        ];
      case 'quality-audit-nc':
        return [
          { label: '不符合项', value: arr.length, icon: 'fa-circle-exclamation', color: 'red' },
          { label: '严重', value: arr.filter(function (r) { return r.level === '严重'; }).length, icon: 'fa-triangle-exclamation', color: 'red' },
          { label: '一般', value: arr.filter(function (r) { return r.level === '一般'; }).length, icon: 'fa-circle-exclamation', color: 'orange' },
          { label: '已关闭', value: arr.filter(function (r) { return r.status === '已关闭'; }).length, icon: 'fa-circle-check', color: 'green' }
        ];
      case 'quality-audit-rectify':
        return [
          { label: '整改总数', value: arr.length, icon: 'fa-toolbox', color: 'green' },
          { label: '已验证通过', value: arr.filter(function (r) { return r.verify === '通过'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '整改中', value: arr.filter(function (r) { return r.status === '整改中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '待验证', value: arr.filter(function (r) { return r.verify === '待验证'; }).length, icon: 'fa-hourglass-half', color: 'purple' }
        ];
      case 'quality-audit-report':
        return [
          { label: '报告总数', value: arr.length, icon: 'fa-file-circle-check', color: 'green' },
          { label: '已批准', value: arr.filter(function (r) { return r.status === '已批准'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '编制中', value: arr.filter(function (r) { return r.status === '编制中'; }).length, icon: 'fa-pen-ruler', color: 'orange' },
          { label: '已提交', value: arr.filter(function (r) { return r.status === '已提交'; }).length, icon: 'fa-arrow-right-to-bracket', color: 'purple' }
        ];
      case 'quality-supervise':
        return [
          { label: '监督计划', value: arr.length, icon: 'fa-user-shield', color: 'green' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '发现问题', value: arr.filter(function (r) { return r.issue && r.issue.indexOf('未发现') === -1 && r.issue.indexOf('待检查') === -1; }).length, icon: 'fa-triangle-exclamation', color: 'red' },
          { label: '待完成', value: arr.filter(function (r) { return r.status === '待开始' || r.status === '进行中'; }).length, icon: 'fa-clock', color: 'orange' }
        ];
      case 'quality-supervise-plan-periodic':
        return [
          { label: '周期计划', value: arr.length, icon: 'fa-calendar-week', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-supervise-plan-special':
        return [
          { label: '专项计划', value: arr.length, icon: 'fa-bullseye', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-supervise-task':
        return [
          { label: '任务总数', value: arr.length, icon: 'fa-tasks', color: 'green' },
          { label: '执行中', value: arr.filter(function (r) { return r.status === '执行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待执行', value: arr.filter(function (r) { return r.status === '待执行'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-supervise-record':
        return [
          { label: '监督记录', value: arr.length, icon: 'fa-clipboard-check', color: 'green' },
          { label: '已记录', value: arr.filter(function (r) { return r.status === '已记录'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待评价', value: arr.filter(function (r) { return r.status === '待评价'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '发现问题', value: arr.filter(function (r) { return r.issue && r.issue.indexOf('未发现') === -1; }).length, icon: 'fa-triangle-exclamation', color: 'red' }
        ];
      case 'quality-supervise-eval':
        return [
          { label: '评价记录', value: arr.length, icon: 'fa-scale-balanced', color: 'green' },
          { label: '合格', value: arr.filter(function (r) { return r.result === '合格'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '基本合格', value: arr.filter(function (r) { return r.result === '基本合格'; }).length, icon: 'fa-circle-exclamation', color: 'orange' },
          { label: '不合格', value: arr.filter(function (r) { return r.result === '不合格'; }).length, icon: 'fa-circle-xmark', color: 'red' }
        ];
      case 'quality-supervise-audit':
        return [
          { label: '审核记录', value: arr.length, icon: 'fa-file-shield', color: 'green' },
          { label: '已审核', value: arr.filter(function (r) { return r.status === '已审核'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待审核', value: arr.filter(function (r) { return r.status === '待审核'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '已退回', value: arr.filter(function (r) { return r.status === '已退回'; }).length, icon: 'fa-rotate-left', color: 'red' }
        ];
      case 'quality-supervise-stat':
        return [
          { label: '统计记录', value: arr.length, icon: 'fa-chart-line', color: 'green' },
          { label: '总监督次数', value: arr.reduce(function (s, r) { return s + (Number(r.count) || 0); }, 0), icon: 'fa-magnifying-glass-chart', color: 'blue' },
          { label: '发现问题', value: arr.reduce(function (s, r) { return s + (Number(r.issue) || 0); }, 0), icon: 'fa-triangle-exclamation', color: 'red' },
          { label: '平均合格率', value: (function () { var t = 0; arr.forEach(function (r) { t += Number(r.qualifyRate) || 0; }); return arr.length ? Math.round(t / arr.length) + '%' : '0%'; })(), icon: 'fa-percent', color: 'purple' }
        ];
      case 'quality-supervise-upload':
        return [
          { label: '上传记录', value: arr.length, icon: 'fa-cloud-arrow-up', color: 'green' },
          { label: '已通过', value: arr.filter(function (r) { return r.status === '已通过'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待审核', value: arr.filter(function (r) { return r.status === '待审核'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '草稿', value: arr.filter(function (r) { return r.status === '草稿'; }).length, icon: 'fa-pen-ruler', color: 'purple' }
        ];
      case 'quality-control-plan-internal':
        return [
          { label: '室内质控计划', value: arr.length, icon: 'fa-flask-vial', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-control-plan-parallel':
        return [
          { label: '平行样计划', value: arr.length, icon: 'fa-lines-leaning', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-control-plan-blank':
        return [
          { label: '空白样计划', value: arr.length, icon: 'fa-circle-dashed', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-control-plan-recovery':
        return [
          { label: '加标回收计划', value: arr.length, icon: 'fa-vial-circle-check', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-control-task':
        return [
          { label: '质控任务', value: arr.length, icon: 'fa-tasks', color: 'green' },
          { label: '执行中', value: arr.filter(function (r) { return r.status === '执行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待执行', value: arr.filter(function (r) { return r.status === '待执行'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-control-data':
        return [
          { label: '质控数据', value: arr.length, icon: 'fa-database', color: 'green' },
          { label: '已录入', value: arr.filter(function (r) { return r.status === '已录入'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待评价', value: arr.filter(function (r) { return r.status === '待评价'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '超靶值', value: arr.filter(function (r) { return Number(r.value) && Number(r.value) > Number(r.mean) + Number(r.sd); }).length, icon: 'fa-triangle-exclamation', color: 'red' }
        ];
      case 'quality-control-eval':
        return [
          { label: '评价记录', value: arr.length, icon: 'fa-chart-line', color: 'green' },
          { label: '在控', value: arr.filter(function (r) { return r.result === '在控'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '警告', value: arr.filter(function (r) { return r.result === '警告'; }).length, icon: 'fa-circle-exclamation', color: 'orange' },
          { label: '失控', value: arr.filter(function (r) { return r.result === '失控'; }).length, icon: 'fa-ban', color: 'red' }
        ];
      case 'quality-control-audit':
        return [
          { label: '审核记录', value: arr.length, icon: 'fa-file-shield', color: 'green' },
          { label: '已审核', value: arr.filter(function (r) { return r.status === '已审核'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待审核', value: arr.filter(function (r) { return r.status === '待审核'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '已退回', value: arr.filter(function (r) { return r.status === '已退回'; }).length, icon: 'fa-rotate-left', color: 'red' }
        ];
      case 'quality-control-nc':
        return [
          { label: '失控记录', value: arr.length, icon: 'fa-triangle-exclamation', color: 'green' },
          { label: '已处理', value: arr.filter(function (r) { return r.status === '已处理'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '处理中', value: arr.filter(function (r) { return r.status === '处理中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '待处理', value: arr.filter(function (r) { return r.status === '待处理'; }).length, icon: 'fa-hourglass-half', color: 'red' }
        ];
      case 'quality-control-stat':
        return [
          { label: '统计记录', value: arr.length, icon: 'fa-chart-pie', color: 'green' },
          { label: '总批次数', value: arr.reduce(function (s, r) { return s + (Number(r.batches) || 0); }, 0), icon: 'fa-flask', color: 'blue' },
          { label: '失控批次数', value: arr.reduce(function (s, r) { return s + (Number(r.outOf) || 0); }, 0), icon: 'fa-ban', color: 'red' },
          { label: '平均在控率', value: (function () { var t = 0; arr.forEach(function (r) { t += Number(r.rate) || 0; }); return arr.length ? Math.round(t / arr.length) + '%' : '0%'; })(), icon: 'fa-percent', color: 'purple' }
        ];
      case 'quality-proficiency-plan-pt':
        return [
          { label: 'PT计划', value: arr.length, icon: 'fa-medal', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-proficiency-plan-compare':
        return [
          { label: '比对计划', value: arr.length, icon: 'fa-code-compare', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待开始', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-proficiency-signup':
        return [
          { label: '报名记录', value: arr.length, icon: 'fa-file-signature', color: 'green' },
          { label: '已确认', value: arr.filter(function (r) { return r.status === '已确认'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待确认', value: arr.filter(function (r) { return r.status === '待确认'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '覆盖项目', value: (function () { var ks = {}; arr.forEach(function (r) { if (r.item) ks[r.item] = 1; }); return Object.keys(ks).length; })(), icon: 'fa-flask', color: 'purple' }
        ];
      case 'quality-proficiency-record':
        return [
          { label: '验证记录', value: arr.length, icon: 'fa-clipboard-check', color: 'green' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '待检测', value: arr.filter(function (r) { return !r.testDate; }).length, icon: 'fa-hourglass-half', color: 'orange' }
        ];
      case 'quality-proficiency-review':
        return [
          { label: '评审表', value: arr.length, icon: 'fa-clipboard-list', color: 'green' },
          { label: '满意', value: arr.filter(function (r) { return r.evaluation === '满意'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '可疑', value: arr.filter(function (r) { return r.evaluation === '可疑'; }).length, icon: 'fa-circle-exclamation', color: 'orange' },
          { label: '不满意', value: arr.filter(function (r) { return r.evaluation === '不满意'; }).length, icon: 'fa-circle-xmark', color: 'red' }
        ];
      case 'quality-proficiency-audit':
        return [
          { label: '审核记录', value: arr.length, icon: 'fa-file-shield', color: 'green' },
          { label: '已审核', value: arr.filter(function (r) { return r.status === '已审核'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '待审核', value: arr.filter(function (r) { return r.status === '待审核'; }).length, icon: 'fa-hourglass-half', color: 'orange' },
          { label: '已退回', value: arr.filter(function (r) { return r.status === '已退回'; }).length, icon: 'fa-rotate-left', color: 'red' }
        ];
      case 'quality-proficiency-stat':
        return [
          { label: '统计记录', value: arr.length, icon: 'fa-chart-column', color: 'green' },
          { label: '总参加项数', value: arr.reduce(function (s, r) { return s + (Number(r.items) || 0); }, 0), icon: 'fa-flask', color: 'blue' },
          { label: '不满意项数', value: arr.reduce(function (s, r) { return s + (Number(r.unsatisfactory) || 0); }, 0), icon: 'fa-circle-xmark', color: 'red' },
          { label: '平均满意率', value: (function () { var t = 0; arr.forEach(function (r) { t += Number(r.rate) || 0; }); return arr.length ? Math.round(t / arr.length) + '%' : '0%'; })(), icon: 'fa-percent', color: 'purple' }
        ];
      case 'quality-proficiency-rectify':
        return [
          { label: '整改记录', value: arr.length, icon: 'fa-toolbox', color: 'green' },
          { label: '已验证', value: arr.filter(function (r) { return r.status === '已验证'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '整改中', value: arr.filter(function (r) { return r.status === '整改中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '待整改', value: arr.filter(function (r) { return r.status === '待整改'; }).length, icon: 'fa-hourglass-half', color: 'red' }
        ];
      case 'quality-control':
        return [
          { label: '质控计划', value: arr.length, icon: 'fa-bullseye', color: 'green' },
          { label: '在控', value: arr.filter(function (r) { return r.eval === '在控'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '警告', value: arr.filter(function (r) { return r.eval === '警告'; }).length, icon: 'fa-circle-exclamation', color: 'orange' },
          { label: '失控', value: arr.filter(function (r) { return r.eval === '失控'; }).length, icon: 'fa-ban', color: 'red' }
        ];
      case 'quality-proficiency':
        return [
          { label: '验证项目', value: arr.length, icon: 'fa-medal', color: 'green' },
          { label: '满意', value: arr.filter(function (r) { return r.result === '满意'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '有问题/不满意', value: arr.filter(function (r) { return r.result === '有问题' || r.result === '不满意'; }).length, icon: 'fa-triangle-exclamation', color: 'red' },
          { label: '整改中', value: arr.filter(function (r) { return r.rectify === '整改中'; }).length, icon: 'fa-toolbox', color: 'orange' }
        ];
      case 'quality-system-doc':
        return [
          { label: '文件总数', value: arr.length, icon: 'fa-folder-tree', color: 'green' },
          { label: '已发布', value: arr.filter(function (r) { return r.status === '已发布'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '质量手册', value: arr.filter(function (r) { return r.type === '质量手册'; }).length, icon: 'fa-book', color: 'purple' },
          { label: '程序文件', value: arr.filter(function (r) { return r.type === '程序文件'; }).length, icon: 'fa-file-lines', color: 'orange' }
        ];
      case 'quality-complaint':
        return [
          { label: '投诉总数', value: arr.length, icon: 'fa-comment-dots', color: 'red' },
          { label: '待处理', value: arr.filter(function (r) { return r.status === '待处理'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '处理中', value: arr.filter(function (r) { return r.status === '处理中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已解决', value: arr.filter(function (r) { return r.status === '已解决'; }).length, icon: 'fa-circle-check', color: 'green' }
        ];
      case 'quality-complaint-register':
        return [
          { label: '投诉登记', value: arr.length, icon: 'fa-comment-dots', color: 'red' },
          { label: '待受理', value: arr.filter(function (r) { return r.status === '待受理'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '处理中', value: arr.filter(function (r) { return r.status === '处理中' || r.status === '调查中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已关闭', value: arr.filter(function (r) { return r.status === '已关闭'; }).length, icon: 'fa-circle-check', color: 'green' }
        ];
      case 'quality-complaint-investigate':
        return [
          { label: '调查记录', value: arr.length, icon: 'fa-magnifying-glass', color: 'blue' },
          { label: '待调查', value: arr.filter(function (r) { return r.status === '待调查'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '调查中', value: arr.filter(function (r) { return r.status === '调查中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '已调查', value: arr.filter(function (r) { return r.status === '已调查'; }).length, icon: 'fa-circle-check', color: 'green' }
        ];
      case 'quality-complaint-handle':
        return [
          { label: '处理记录', value: arr.length, icon: 'fa-toolbox', color: 'purple' },
          { label: '待处理', value: arr.filter(function (r) { return r.status === '待处理'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '处理中', value: arr.filter(function (r) { return r.status === '处理中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' }
        ];
      case 'quality-complaint-feedback':
        return [
          { label: '反馈记录', value: arr.length, icon: 'fa-comment-sms', color: 'green' },
          { label: '已反馈', value: arr.filter(function (r) { return r.status === '已反馈'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '待反馈', value: arr.filter(function (r) { return r.status === '待反馈'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '满意及以上', value: arr.filter(function (r) { return r.satisfaction === '满意' || r.satisfaction === '基本满意'; }).length, icon: 'fa-face-smile', color: 'blue' }
        ];
      case 'quality-complaint-stat':
        return [
          { label: '累计投诉', value: arr.reduce(function (s, r) { return s + (Number(r.total) || 0); }, 0), icon: 'fa-comment-dots', color: 'red' },
          { label: '及时处理', value: arr.reduce(function (s, r) { return s + (Number(r.inTime) || 0); }, 0), icon: 'fa-bolt', color: 'green' },
          { label: '平均及时率', value: Math.round(arr.reduce(function (s, r) { return s + (parseFloat(r.rate) || 0); }, 0) / arr.length) + '%', icon: 'fa-gauge-high', color: 'blue' },
          { label: '平均满意度', value: Math.round(arr.reduce(function (s, r) { return s + (parseFloat(r.satisfaction) || 0); }, 0) / arr.length) + '%', icon: 'fa-face-smile', color: 'purple' }
        ];
      case 'quality-corrective':
        return [
          { label: '整改总数', value: arr.length, icon: 'fa-check-to-slot', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '验证通过率', value: Math.round(arr.filter(function (r) { return r.verify === '通过'; }).length / arr.length * 100) + '%', icon: 'fa-ranking-star', color: 'purple' }
        ];
      case 'quality-corrective-apply':
        return [
          { label: '申请总数', value: arr.length, icon: 'fa-file-pen', color: 'green' },
          { label: '待审批', value: arr.filter(function (r) { return r.status === '待审批'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '已批准', value: arr.filter(function (r) { return r.status === '已批准'; }).length, icon: 'fa-stamp', color: 'blue' },
          { label: '严重问题', value: arr.filter(function (r) { return r.level === '严重' || r.level === '紧急'; }).length, icon: 'fa-triangle-exclamation', color: 'red' }
        ];
      case 'quality-corrective-analysis':
        return [
          { label: '分析记录', value: arr.length, icon: 'fa-magnifying-glass-chart', color: 'blue' },
          { label: '待分析', value: arr.filter(function (r) { return r.status === '待分析'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '分析中', value: arr.filter(function (r) { return r.status === '分析中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' }
        ];
      case 'quality-corrective-measure':
        return [
          { label: '措施总数', value: arr.length, icon: 'fa-list-check', color: 'purple' },
          { label: '待实施', value: arr.filter(function (r) { return r.status === '待实施'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '实施中', value: arr.filter(function (r) { return r.status === '实施中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' }
        ];
      case 'quality-corrective-verify':
        return [
          { label: '验证记录', value: arr.length, icon: 'fa-clipboard-check', color: 'blue' },
          { label: '待验证', value: arr.filter(function (r) { return r.status === '待验证' || r.result === '待验证'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '已验证', value: arr.filter(function (r) { return r.status === '已验证'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '验证通过', value: arr.filter(function (r) { return r.result === '通过'; }).length, icon: 'fa-thumbs-up', color: 'green' }
        ];
      case 'quality-corrective-audit':
        return [
          { label: '审核记录', value: arr.length, icon: 'fa-gavel', color: 'purple' },
          { label: '待审核', value: arr.filter(function (r) { return r.status === '待审核'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '已审核', value: arr.filter(function (r) { return r.status === '已审核'; }).length, icon: 'fa-stamp', color: 'green' },
          { label: '审核通过', value: arr.filter(function (r) { return r.result === '通过'; }).length, icon: 'fa-thumbs-up', color: 'green' }
        ];
      case 'quality-corrective-ledger':
        return [
          { label: '台账总数', value: arr.length, icon: 'fa-book-bookmark', color: 'green' },
          { label: '整改中', value: arr.filter(function (r) { return r.status === '整改中'; }).length, icon: 'fa-spinner', color: 'orange' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '已关闭', value: arr.filter(function (r) { return r.status === '已关闭'; }).length, icon: 'fa-lock', color: 'green' }
        ];
      case 'training-plan':
        return [
          { label: '培训计划', value: arr.length, icon: 'fa-calendar-check', color: 'green' },
          { label: '已审批', value: arr.filter(function (r) { return r.status === '已审批' || r.status === '已完成'; }).length, icon: 'fa-stamp', color: 'blue' },
          { label: '待审批', value: arr.filter(function (r) { return r.status === '待审批'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '年度计划', value: 12, icon: 'fa-calendar-days', color: 'purple' }
        ];
      case 'training-implement':
        return [
          { label: '培训班次', value: arr.length, icon: 'fa-chalkboard-user', color: 'green' },
          { label: '进行中', value: arr.filter(function (r) { return r.status === '进行中'; }).length, icon: 'fa-spinner', color: 'blue' },
          { label: '已完成', value: arr.filter(function (r) { return r.status === '已完成'; }).length, icon: 'fa-circle-check', color: 'green' },
          { label: '累计参训', value: arr.reduce(function (s, r) { return s + (Number(r.count) || 0); }, 0) + ' 人次', icon: 'fa-users', color: 'purple' }
        ];
      case 'training-exam':
        return [
          { label: '考核场次', value: arr.length, icon: 'fa-file-circle-check', color: 'green' },
          { label: '参考人数', value: arr.reduce(function (s, r) { return s + (Number(r.count) || 0); }, 0), icon: 'fa-users', color: 'blue' },
          { label: '平均及格率', value: arr.filter(function (r) { return Number(r.pass) > 0; }).length ? Math.round(arr.filter(function (r) { return Number(r.pass) > 0; }).reduce(function (s, r) { return s + Number(r.pass); }, 0) / arr.filter(function (r) { return Number(r.pass) > 0; }).length) + '%' : '0%', icon: 'fa-ranking-star', color: 'green' },
          { label: '待考核', value: arr.filter(function (r) { return r.status === '待开始'; }).length, icon: 'fa-clock', color: 'orange' }
        ];
      case 'training-certificate':
        return [
          { label: '证书总数', value: arr.length, icon: 'fa-certificate', color: 'green' },
          { label: '有效', value: arr.filter(function (r) { return r.status === '有效'; }).length, icon: 'fa-circle-check', color: 'blue' },
          { label: '即将到期', value: arr.filter(function (r) { return r.status === '即将到期'; }).length, icon: 'fa-clock', color: 'orange' },
          { label: '已过期', value: arr.filter(function (r) { return r.status === '已过期'; }).length, icon: 'fa-circle-exclamation', color: 'red' }
        ];
      case 'knowledge-center':
        return [
          { label: '知识条目', value: 58, icon: 'fa-book-open', color: 'green' },
          { label: '操作手册', value: 16, icon: 'fa-book', color: 'blue' },
          { label: '标准规范', value: 9, icon: 'fa-file-shield', color: 'purple' },
          { label: '本月更新', value: 5, icon: 'fa-pen-to-square', color: 'orange' }
        ];
      case 'stat-query':
        return [
          { label: '委托单', value: 186, icon: 'fa-file-signature', color: 'green' },
          { label: '报告份数', value: 172, icon: 'fa-file-circle-check', color: 'blue' },
          { label: '样品数', value: 1280, icon: 'fa-boxes-stacked', color: 'purple' },
          { label: '本月新增', value: 24, icon: 'fa-plus', color: 'orange' }
        ];
      case 'stat-business':
        return [
          { label: '年委托量', value: 186, icon: 'fa-handshake', color: 'green' },
          { label: '年报告量', value: 172, icon: 'fa-file-lines', color: 'blue' },
          { label: '年营收(万元)', value: 156.8, icon: 'fa-coins', color: 'purple' },
          { label: '检测项目', value: 42, icon: 'fa-flask-vial', color: 'orange' }
        ];
      case 'stat-quality':
        return [
          { label: '质控合格率', value: '98.6%', icon: 'fa-bullseye', color: 'green' },
          { label: '不符合项(年)', value: 18, icon: 'fa-circle-exclamation', color: 'red' },
          { label: '整改完成率', value: '95%', icon: 'fa-check-to-slot', color: 'blue' },
          { label: '顾客投诉率', value: '0.8%', icon: 'fa-comment-dots', color: 'orange' }
        ];
      case 'stat-resource':
        return [
          { label: '设备总数', value: 46, icon: 'fa-microscope', color: 'green' },
          { label: '平均使用率', value: '78%', icon: 'fa-gauge-high', color: 'blue' },
          { label: '持证上岗率', value: '96%', icon: 'fa-id-badge', color: 'purple' },
          { label: '外派培训人次', value: 32, icon: 'fa-person-walking-arrow-right', color: 'orange' }
        ];
      case 'stat-research':
        return [
          { label: '在研项目', value: 6, icon: 'fa-flask', color: 'green' },
          { label: '年科研经费', value: '128万', icon: 'fa-coins', color: 'purple' },
          { label: '年度论文', value: 8, icon: 'fa-file-lines', color: 'blue' },
          { label: '成果转化', value: 3, icon: 'fa-arrow-right-arrow-left', color: 'orange' }
        ];
      case 'stat-training':
        return [
          { label: '培训场次', value: 18, icon: 'fa-chalkboard-user', color: 'green' },
          { label: '参训人次', value: 132, icon: 'fa-users', color: 'blue' },
          { label: '考核通过率', value: '93%', icon: 'fa-award', color: 'purple' },
          { label: '满意度', value: '96%', icon: 'fa-face-smile', color: 'orange' }
        ];
      default:
        return [];
    }
  }

  /* ---------- 表格页签过滤规则 ---------- */
  function filterByTab(page, tab, rows) {
    var list = rows || [];
    switch (page) {
      case 'research-project':
        if (tab === 'run') return list.filter(function (r) { return r.status === '在研'; });
        if (tab === 'done') return list.filter(function (r) { return r.status === '已结题'; });
        return list;
      case 'research-experiment':
        var map = { sample: '科研样品', seq: '测序项目', template: '实验模板' };
        if (tab === 'all') return list;
        return list.filter(function (r) { return r.type === map[tab]; });
      case 'research-result':
        var rmap = { paper: '学术论文', patent: '发明专利', award: '获奖成果', transfer: '成果转化' };
        if (!rmap[tab]) return list;
        return list.filter(function (r) { return r.type === rmap[tab]; });
      case 'quality-review':
        if (tab === 'report') return list.filter(function (r) { return r.name.indexOf('报告') > -1 || r.type === '专项评审'; });
        if (tab === 'input') return list.filter(function (r) { return r.name.indexOf('输入') > -1 || r.type === '质量评审'; });
        return list;
      case 'quality-control':
        var cmap = { plan: '室内质控', task: '室间质控' };
        if (tab === 'data') return list;
        return list.filter(function (r) { return r.type === cmap[tab]; });
      case 'stat-query':
        return list.filter(function (r) { return r.cat === tab; });
      default:
        return list;
    }
  }

  /* ---------- 菜单数据 ---------- */
  // 导航结构完全按照 文档/index.html 的顺序：工作台 → 业务受理 → 采样管理 →
  // 检测试验 → 报告管理 → 科研管理 → 资源管理 → 质量管理 → 培训管理 → 统计分析 → 系统管理
  var MENU = [
    {
      key: 'workbench', name: '首页', icon: 'fa-gauge-high',
      children: []
    },
    {
      key: 'business', name: '业务受理', icon: 'fa-briefcase',
      children: [
        { key: 'customer', name: '客户管理' },
        { key: 'sampling-entrust', name: '采样委托' },
        { key: 'delivery-entrust', name: '送样委托' },
        { key: 'contract-review', name: '合同评审' },
        { key: 'contract', name: '合同管理' },
        { key: 'fee', name: '费用管理' }
      ]
    },
    {
      key: 'sampling', name: '采样管理', icon: 'fa-location-dot',
      children: [
        { key: 'sampling-plan', name: '采样安排' },
        { key: 'sampling-prepare', name: '采样准备' },
        { key: 'device-return', name: '设备领用归还' },
        { key: 'onsite-test', name: '现场检测' },
        { key: 'sample-in', name: '样品入库' },
        { key: 'sampling-archive', name: '采样归档' },
        { key: 'mobile-sampling', name: '移动采样端' }
      ]
    },
    {
      key: 'test', name: '检测试验', icon: 'fa-flask-vial',
      children: [
        { key: 'sample-mgmt', name: '样品管理' },
        { key: 'test-arrange', name: '检测安排' },
        { key: 'data-entry', name: '数据填报' },
        { key: 'data-check', name: '数据校核' },
        { key: 'data-audit', name: '数据审核' },
        { key: 'outsource', name: '委外管理' },
        { key: 'data-archive', name: '数据归档' },
        { key: 'daq', name: '仪器数据采集（DAQ）' }
      ]
    },
    {
      key: 'eln', name: '电子实验记录', icon: 'fa-book-open',
      children: [
        { key: 'eln-record', name: '实验记录' },
        { key: 'eln-template', name: '记录模板管理' }
      ]
    },
    {
      key: 'report', name: '报告管理', icon: 'fa-file-lines',
      children: [
        { key: 'report-write', name: '报告编制' },
        { key: 'report-audit', name: '报告审核' },
        { key: 'report-issue', name: '报告签发' },
        { key: 'report-print', name: '报告打印' },
        { key: 'report-rework', name: '报告返工' },
        { key: 'report-archive', name: '报告归档' },
        { key: 'report-template', name: '报告模板管理' }
      ]
    },
    {
      key: 'research', name: '科研管理', icon: 'fa-flask',
      children: [
        { key: 'research-project', name: '科研项目' },
        { key: 'research-experiment', name: '科研实验' },
        { key: 'research-result', name: '科研成果' },
        { key: 'research-cooperation', name: '合作交流' }
      ]
    },
    {
      key: 'resource', name: '资源管理', icon: 'fa-boxes-stacked',
      children: [
        { key: 'resourcePerson', name: '人员管理' },
        { key: 'resourceEquipment', name: '设备管理' },
        { key: 'resourceStandard', name: '标准依据' },
        { key: 'resourceSupplier', name: '供应商管理' },
        { key: 'resourceReagent', name: '试剂耗材管理' },
        { key: 'resourceConsumable', name: '易耗品管理' },
        { key: 'resourceSolution', name: '滴定溶液管理' },
        { key: 'resourceHazardous', name: '危化品管理' },
        { key: 'resourceBiological', name: '生物试剂管理' },
        { key: 'resourceReference', name: '标准物质管理' },
        { key: 'resourcePurchase', name: '采购管理' }
      ]
    },
    {
      key: 'quality', name: '质量管理', icon: 'fa-shield-halved',
      children: [
        { key: 'quality-review', name: '管理评审' },
        { key: 'quality-audit', name: '内部审核' },
        { key: 'quality-supervise', name: '质量监督' },
        { key: 'quality-control', name: '质量控制' },
        { key: 'quality-proficiency', name: '能力验证' },
        { key: 'quality-system-doc', name: '体系文件' },
        { key: 'quality-complaint', name: '客户投诉' },
        { key: 'quality-corrective', name: '整改流程' }
      ]
    },
    {
      key: 'training', name: '培训管理', icon: 'fa-chalkboard-user',
      children: [
        { key: 'training-plan', name: '培训计划' },
        { key: 'training-implement', name: '培训实施' },
        { key: 'training-exam', name: '培训考核' },
        { key: 'training-certificate', name: '证书管理' },
        { key: 'knowledge-center', name: '知识中心' }
      ]
    },
    {
      key: 'stat', name: '统计分析', icon: 'fa-chart-line',
      children: [
        { key: 'stat-query', name: '数据查询' },
        { key: 'stat-business', name: '业务统计' },
        { key: 'stat-quality', name: '质量统计' },
        { key: 'stat-resource', name: '资源统计' },
        { key: 'stat-research', name: '科研统计' },
        { key: 'stat-training', name: '培训统计' }
      ]
    },
    {
      key: 'system', name: '系统管理', icon: 'fa-gear',
      children: [
        { key: 'organization', name: '组织机构' },
        { key: 'user-permission', name: '用户权限' },
        { key: 'dictionary', name: '系统字典' },
        { key: 'number-rule', name: '编号规则' },
        { key: 'process-config', name: '流程配置' },
        { key: 'ui-custom', name: '界面自定义' },
        { key: 'project-lib', name: '项目库配置' },
        { key: 'env-config', name: '环境业务配置' },
        { key: 'system-settings', name: '系统设置' }
      ]
    }
  ];

  /* ---------- 页面名称映射 ---------- */
  var PAGE_NAME = {};
  MENU.forEach(function (g) {
    (g.children || []).forEach(function (c) { PAGE_NAME[c.key] = c.name; });
  });
  PAGE_NAME['stat-query'] = '数据查询';

  /* ---------- 已实现页面（有内容 v-if 模板的页面） ---------- */
  var BUILT_PAGES = [
    'research-project', 'research-experiment', 'research-result', 'research-cooperation',
    'quality-review', 'quality-audit', 'quality-supervise', 'quality-control', 'quality-proficiency',
    'quality-system-doc', 'quality-complaint', 'quality-corrective',
    'training-plan', 'training-implement', 'training-exam', 'training-certificate', 'knowledge-center',
    'stat-query', 'stat-business', 'stat-quality', 'stat-resource', 'stat-research', 'stat-training'
  ];

  /* ============================
     图表（ECharts）
     ============================ */
  var MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  var YEARS = ['2023', '2024', '2025', '2026'];

  function axisBase() {
    return {
      axisLine: { lineStyle: { color: '#E5E7EB' } },
      axisTick: { show: false },
      axisLabel: { color: '#6B7280' },
      splitLine: { lineStyle: { color: '#F3F4F6' } }
    };
  }

  var CHART_DEFS = {
    'sb-trend': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['委托量', '报告量'], right: 10, top: 0, textStyle: { color: '#6B7280' } },
          grid: { left: 40, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '委托量', type: 'line', smooth: true, data: [12, 15, 18, 17, 20, 22, 19, 24, 21, 23, 26, 24], areaStyle: { opacity: 0.08 } },
            { name: '报告量', type: 'line', smooth: true, data: [11, 14, 17, 16, 19, 21, 18, 22, 20, 22, 24, 23], areaStyle: { opacity: 0.08 } }
          ]
        };
      }
    },
    'sb-pie': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#F59E0B', '#8B5CF6', '#06B6D4'],
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          legend: { orient: 'vertical', right: 8, top: 20, textStyle: { color: '#6B7280', fontSize: 12 } },
          series: [{
            type: 'pie', radius: ['42%', '68%'], center: ['38%', '52%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { show: false },
            data: [
              { value: 68, name: '病毒检测' }, { value: 42, name: '病原菌鉴定' },
              { value: 30, name: '农残检测' }, { value: 26, name: '组培检测' },
              { value: 20, name: '其他' }
            ]
          }]
        };
      }
    },
    'sb-revenue': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 50, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', name: '万元' }, axisBase()),
          series: [{
            name: '收入', type: 'bar', barWidth: 14,
            itemStyle: { borderRadius: [4, 4, 0, 0] },
            data: [8.2, 9.5, 11.6, 10.8, 12.5, 14.2, 12.8, 15.6, 13.9, 14.8, 16.2, 15.8]
          }]
        };
      }
    },
    'sbv-m': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 40, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [{ name: '业务量', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [12, 15, 18, 17, 20, 22, 19, 24, 21, 23, 26, 24] }]
        };
      }
    },
    'sbv-q': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['业务量', '报告量'], right: 10, top: 0, textStyle: { color: '#6B7280' } },
          grid: { left: 40, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['一季度', '二季度', '三季度', '四季度'] }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '业务量', type: 'bar', barWidth: 14, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [54, 61, 66, 73] },
            { name: '报告量', type: 'line', smooth: true, data: [50, 57, 61, 68] }
          ]
        };
      }
    },
    'sbv-y': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 40, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['2023', '2024', '2025', '2026'] }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [{ name: '业务量', type: 'bar', barWidth: 22, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [132, 158, 179, 186] }]
        };
      }
    },
    'sbv-type': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'],
          tooltip: { trigger: 'item' },
          legend: { bottom: 0, textStyle: { color: '#6B7280', fontSize: 11 } },
          series: [{
            type: 'pie', radius: ['40%', '62%'], center: ['50%', '45%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#6B7280', fontSize: 11 },
            data: [
              { value: 62, name: '分子检测' }, { value: 48, name: '病原检测' },
              { value: 35, name: '农残检测' }, { value: 26, name: '品质分析' },
              { value: 15, name: '转基因检测' }, { value: 11, name: '其他' }
            ]
          }]
        };
      }
    },
    'sbv-dept': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: 76, right: 32, top: 12, bottom: 24 },
          xAxis: Object.assign({ type: 'value' }, axisBase()),
          yAxis: Object.assign({ type: 'category', data: ['组培检测组', '农残检测组', '病原鉴定组', '测序平台', '分子检测组'] }, axisBase()),
          series: [{ name: '业务量', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [0, 4, 4, 0] }, data: [24, 32, 48, 18, 64] }]
        };
      }
    },
    'sbc-new': {
      option: function () {
        return {
          color: ['#3B82F6'],
          tooltip: { trigger: 'axis' },
          grid: { left: 40, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [{ name: '新增客户', type: 'line', smooth: true, areaStyle: { opacity: 0.08 }, data: [6, 8, 5, 9, 7, 10, 7, 11, 8, 9, 12, 9] }]
        };
      }
    },
    'sbc-active': {
      option: function () {
        return {
          color: ['#10B981', '#F59E0B', '#EF4444'],
          tooltip: { trigger: 'item' },
          legend: { bottom: 0, textStyle: { color: '#6B7280', fontSize: 11 } },
          series: [{
            type: 'pie', radius: ['38%', '60%'], center: ['50%', '45%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#6B7280', fontSize: 11 },
            data: [
              { value: 68, name: '活跃客户' }, { value: 44, name: '一般客户' }, { value: 14, name: '潜在客户' }
            ]
          }]
        };
      }
    },
    'sbc-rank': {
      option: function () {
        return {
          color: ['#8B5CF6'],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: 76, right: 32, top: 12, bottom: 24 },
          xAxis: Object.assign({ type: 'value' }, axisBase()),
          yAxis: Object.assign({ type: 'category', data: ['绿植研究所', '花卉科技园', '种业集团', '农科院中心', '检测联盟'] }, axisBase()),
          series: [{ name: '委托量', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [0, 4, 4, 0] }, data: [28, 24, 19, 16, 13] }]
        };
      }
    },
    'sbs-count': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 40, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [{ name: '样品数', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [86, 102, 98, 112, 105, 120, 108, 126, 115, 118, 132, 128] }]
        };
      }
    },
    'sbs-type': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'],
          tooltip: { trigger: 'item' },
          legend: { bottom: 0, textStyle: { color: '#6B7280', fontSize: 11 } },
          series: [{
            type: 'pie', radius: ['40%', '62%'], center: ['50%', '45%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#6B7280', fontSize: 11 },
            data: [
              { value: 420, name: '叶片' }, { value: 280, name: '土壤' },
              { value: 210, name: '种苗' }, { value: 150, name: '花蕾' },
              { value: 90, name: '水样' }, { value: 130, name: '其他' }
            ]
          }]
        };
      }
    },
    'sbd-cycle': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['实际周期', '标准周期'], right: 10, top: 0, textStyle: { color: '#6B7280' } },
          grid: { left: 40, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', min: 4, max: 8 }, axisBase()),
          series: [
            { name: '实际周期', type: 'line', smooth: true, data: [5.6, 5.9, 5.4, 6.2, 5.8, 5.7, 6.1, 5.5, 5.9, 5.6, 5.4, 5.8] },
            { name: '标准周期', type: 'line', smooth: true, lineStyle: { type: 'dashed' }, data: [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5] }
          ]
        };
      }
    },
    'sbd-timeout': {
      option: function () {
        return {
          color: ['#EF4444'],
          tooltip: { trigger: 'axis' },
          grid: { left: 40, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', axisLabel: { formatter: '{value}%' } }, axisBase()),
          series: [{ name: '超时率', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [4.2, 3.8, 4.6, 3.5, 3.9, 3.2, 3.6, 3.0, 3.4, 3.1, 2.8, 3.2] }]
        };
      }
    },
    'sbr-count': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 40, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [{ name: '报告数', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [11, 14, 17, 16, 19, 21, 18, 22, 20, 22, 24, 23] }]
        };
      }
    },
    'sbr-rework': {
      option: function () {
        return {
          color: ['#F59E0B'],
          tooltip: { trigger: 'axis' },
          grid: { left: 40, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', axisLabel: { formatter: '{value}%' } }, axisBase()),
          series: [{ name: '返工率', type: 'line', smooth: true, areaStyle: { opacity: 0.08 }, data: [6.2, 5.8, 6.4, 5.2, 5.6, 4.9, 5.3, 4.7, 5.0, 4.5, 4.8, 4.5] }]
        };
      }
    },
    'sbf-fee': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 50, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', name: '万元' }, axisBase()),
          series: [{ name: '收费金额', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [8.2, 9.5, 11.6, 10.8, 12.5, 14.2, 12.8, 15.6, 13.9, 14.8, 16.2, 15.8] }]
        };
      }
    },
    'sbf-arrears': {
      option: function () {
        return {
          color: ['#10B981', '#F59E0B', '#EF4444'],
          tooltip: { trigger: 'item' },
          legend: { bottom: 0, textStyle: { color: '#6B7280', fontSize: 11 } },
          series: [{
            type: 'pie', radius: ['38%', '60%'], center: ['50%', '45%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#6B7280', fontSize: 11 },
            data: [
              { value: 92, name: '已回款' }, { value: 6, name: '欠费' }, { value: 2, name: '呆账' }
            ]
          }]
        };
      }
    },
    'sbf-trend': {
      option: function () {
        return {
          color: ['#8B5CF6'],
          tooltip: { trigger: 'axis' },
          grid: { left: 50, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['2023', '2024', '2025', '2026'] }, axisBase()),
          yAxis: Object.assign({ type: 'value', name: '万元' }, axisBase()),
          series: [{ name: '收入', type: 'line', smooth: true, areaStyle: { opacity: 0.08 }, data: [108.5, 126.3, 144.8, 156.8] }]
        };
      }
    },
    'sq-qc': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 44, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', min: 90, max: 100 }, axisBase()),
          series: [{
            name: '质控合格率', type: 'line', smooth: true,
            markLine: { data: [{ yAxis: 98, name: '目标线' }], lineStyle: { color: '#F59E0B', type: 'dashed' }, label: { color: '#F59E0B' } },
            data: [98.2, 97.8, 98.6, 99.0, 98.4, 99.2, 98.8, 99.0, 98.6, 99.1, 98.9, 98.6]
          }]
        };
      }
    },
    'complaint-chart': {
      option: function () {
        return {
          color: ['#EF4444', PRIMARY],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['投诉数', '及时处理数'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '投诉数', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [2, 1, 3, 2, 4, 2, 3, 1, 2, 3, 2, 1] },
            { name: '及时处理数', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [2, 1, 2, 2, 4, 2, 3, 1, 2, 2, 2, 1] }
          ]
        };
      }
    },
    'corrective-chart': {
      option: function () {
        return {
          color: ['#EF4444', PRIMARY],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['整改申请', '已完成整改'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '整改申请', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [1, 0, 2, 1, 3, 2, 4, 2, 3, 1, 2, 2] },
            { name: '已完成整改', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [1, 0, 1, 1, 3, 2, 3, 2, 3, 1, 2, 1] }
          ]
        };
      }
    },
    'sq-nc': {
      option: function () {
        return {
          color: ['#EF4444', '#F59E0B', '#3B82F6', PRIMARY, '#8B5CF6'],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['监督发现', '内审发现', '能力验证', '客户投诉', '质控异常'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '监督发现', type: 'bar', stack: 'nc', data: [3, 2, 2, 1] },
            { name: '内审发现', type: 'bar', stack: 'nc', data: [4, 6, 3, 0] },
            { name: '能力验证', type: 'bar', stack: 'nc', data: [1, 0, 1, 0] },
            { name: '客户投诉', type: 'bar', stack: 'nc', data: [2, 1, 1, 1] },
            { name: '质控异常', type: 'bar', stack: 'nc', data: [1, 2, 0, 1] }
          ]
        };
      }
    },
    'sr-device': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: 8, right: 40, top: 16, bottom: 24, containLabel: true },
          xAxis: Object.assign({ type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6B7280' } }, axisBase()),
          yAxis: Object.assign({ type: 'category', data: ['荧光定量PCR仪', '凝胶成像系统', '测序仪', '超净工作台', '离心机', '培养箱'] }, axisBase()),
          series: [{
            type: 'bar', barWidth: 12,
            itemStyle: { borderRadius: [0, 4, 4, 0] },
            data: [92, 78, 65, 85, 74, 70]
          }]
        };
      }
    },
    'sr-reagent': {
      option: function () {
        return {
          color: ['#8B5CF6'],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: 8, right: 30, top: 16, bottom: 24, containLabel: true },
          xAxis: Object.assign({ type: 'category', data: ['提取试剂盒', 'PCR引物', '测序试剂', '培养基', '无水乙醇', '一次性耗材', '标签打印纸', '防护用品'] }, axisBase()),
          yAxis: Object.assign({ type: 'value', name: '盒/件' }, axisBase()),
          series: [{
            type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0] },
            data: [120, 86, 64, 58, 44, 38, 30, 24],
            label: { show: true, position: 'top', color: '#6B7280', fontSize: 11 }
          }]
        };
      }
    },
    'srr-fund': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6'],
          tooltip: { trigger: 'axis' },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['项目数', '经费(万元)'] },
          grid: { left: 44, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: YEARS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '项目数', type: 'bar', barWidth: 18, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [6, 8, 9, 6] },
            { name: '经费(万元)', type: 'line', smooth: true, data: [95, 120, 148, 128] }
          ]
        };
      }
    },
    'srr-ach': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#F59E0B', '#8B5CF6'],
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          legend: { center: 'bottom', textStyle: { color: '#6B7280' } },
          series: [{
            type: 'pie', radius: '62%', center: ['50%', '45%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#6B7280', fontSize: 11 },
            data: [
              { value: 18, name: '学术论文' }, { value: 9, name: '发明专利' },
              { value: 6, name: '获奖成果' }, { value: 4, name: '成果转化' }
            ]
          }]
        };
      }
    },
    'srt-out': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#F59E0B', '#8B5CF6'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['学术论文', '发明专利', '获奖成果', '成果转化'], right: 10, top: 0, textStyle: { color: '#6B7280' } },
          grid: { left: 40, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['2022', '2023', '2024', '2025', '2026'] }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '学术论文', type: 'line', smooth: true, data: [6, 10, 13, 16, 18], areaStyle: { opacity: 0.06 } },
            { name: '发明专利', type: 'line', smooth: true, data: [2, 4, 5, 7, 9], areaStyle: { opacity: 0.06 } },
            { name: '获奖成果', type: 'line', smooth: true, data: [1, 2, 3, 5, 6], areaStyle: { opacity: 0.06 } },
            { name: '成果转化', type: 'line', smooth: true, data: [0, 1, 1, 2, 4], areaStyle: { opacity: 0.06 } }
          ]
        };
      }
    },
    'srt-bar': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['产出总数', '新增产出'], right: 10, top: 0, textStyle: { color: '#6B7280' } },
          grid: { left: 40, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['2022', '2023', '2024', '2025', '2026'] }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '产出总数', type: 'bar', barWidth: 14, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [9, 17, 22, 30, 37] },
            { name: '新增产出', type: 'bar', barWidth: 14, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [9, 8, 5, 8, 7] }
          ]
        };
      }
    },
    'st-classes': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6'],
          tooltip: { trigger: 'axis' },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['场次', '参训人次'] },
          grid: { left: 44, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS.slice(0, 8) }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '场次', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [3, 2, 3, 4, 2, 3, 1, 2] },
            { name: '参训人次', type: 'line', smooth: true, data: [28, 18, 22, 30, 16, 26, 12, 20] }
          ]
        };
      }
    },
    'st-pass': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 44, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['01', '02', '03', '04', '05', '06', '07', '08'] }, axisBase()),
          yAxis: Object.assign({ type: 'value', min: 60, max: 100 }, axisBase()),
          series: [{
            name: '考核通过率', type: 'line', smooth: true, areaStyle: { opacity: 0.08 },
            data: [92, 94, 89, 100, 94, 96, 88, 91]
          }]
        };
      }
    },
    'qc-chart': {
      option: function () {
        var base = [98.1, 97.6, 98.8, 98.3, 97.9, 99.0, 98.5, 98.7, 98.2, 98.9, 98.4, 98.6];
        return {
          color: [PRIMARY, '#F59E0B', '#F59E0B', '#EF4444'],
          tooltip: { trigger: 'axis' },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['测定值', '±2SD'] },
          grid: { left: 44, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', min: 96, max: 100 }, axisBase()),
          series: [
            { name: '测定值', type: 'line', smooth: true, symbolSize: 6, data: base },
            { name: '±2SD', type: 'line', step: 'end', lineStyle: { opacity: 0.6 }, data: null }
          ].concat([
            { name: 'UCL', type: 'line', data: [99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2], lineStyle: { type: 'dashed', color: '#EF4444' }, symbol: 'none' },
            { name: 'LCL', type: 'line', data: [97.2, 97.2, 97.2, 97.2, 97.2, 97.2, 97.2, 97.2, 97.2, 97.2, 97.2, 97.2], lineStyle: { type: 'dashed', color: '#EF4444' }, symbol: 'none' },
            { name: '靶值', type: 'line', data: [98.2, 98.2, 98.2, 98.2, 98.2, 98.2, 98.2, 98.2, 98.2, 98.2, 98.2, 98.2], lineStyle: { type: 'dashed', color: '#F59E0B' }, symbol: 'none' }
          ])
        };
      }
    },
    'pt-chart': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#F59E0B', '#EF4444'],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['满意', '有问题', '不满意'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: YEARS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '满意', type: 'bar', stack: 'pt', data: [5, 4, 3] },
            { name: '有问题', type: 'bar', stack: 'pt', data: [1, 2, 1] },
            { name: '不满意', type: 'bar', stack: 'pt', data: [0, 1, 0] }
          ]
        };
      }
    },
    /* 质量统计-质控结果统计 */
    'sqo-occ': {
      option: function () {
        return {
          color: ['#EF4444', PRIMARY],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['失控次数', '已闭环'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '失控次数', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [0, 1, 0, 2, 1, 0, 1, 1, 0, 0, 1, 0] },
            { name: '已闭环', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0] }
          ]
        };
      }
    },
    /* 质量统计-能力验证结果统计 */
    'sqp-result': {
      option: function () {
        return {
          color: [PRIMARY, '#F59E0B', '#EF4444'],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['满意', '可疑', '不满意'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: YEARS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '满意', type: 'bar', stack: 'sqp', data: [5, 4, 3, 4] },
            { name: '可疑', type: 'bar', stack: 'sqp', data: [1, 2, 1, 1] },
            { name: '不满意', type: 'bar', stack: 'sqp', data: [0, 1, 0, 0] }
          ]
        };
      }
    },
    'sqp-satisfy': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6'],
          tooltip: { trigger: 'axis' },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['参加次数', '满意率'] },
          grid: { left: 44, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: YEARS }, axisBase()),
          yAxis: [
            Object.assign({ type: 'value' }, axisBase()),
            Object.assign({ type: 'value', name: '%', min: 70, max: 100 }, axisBase())
          ],
          series: [
            { name: '参加次数', type: 'bar', barWidth: 16, itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [6, 7, 4, 5] },
            { name: '满意率', type: 'line', smooth: true, yAxisIndex: 1, markLine: { data: [{ yAxis: 90, name: '目标' }], lineStyle: { color: '#F59E0B', type: 'dashed' }, label: { color: '#F59E0B' } }, data: [83.3, 71.4, 87.5, 92] }
          ]
        };
      }
    },
    /* 质量统计-不符合项统计 */
    'sqn-trend': {
      option: function () {
        return {
          color: ['#EF4444', PRIMARY],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['本月新增', '本月关闭'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '本月新增', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [3, 2, 2, 1, 0, 2, 1, 1, 2, 0, 1, 1] },
            { name: '本月关闭', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1] }
          ]
        };
      }
    },
    /* 质量统计-客户投诉统计 */
    'sqc-trend': {
      option: function () {
        return {
          color: ['#EF4444', PRIMARY],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { top: 0, right: 6, textStyle: { color: '#6B7280' }, data: ['投诉数', '及时处理数'] },
          grid: { left: 40, right: 10, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '投诉数', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [2, 1, 3, 2, 4, 2, 3, 1, 2, 3, 2, 1] },
            { name: '及时处理数', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [2, 1, 2, 2, 4, 2, 3, 1, 2, 2, 2, 1] }
          ]
        };
      }
    },
    'sqc-type': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'],
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          legend: { center: 'bottom', textStyle: { color: '#6B7280' } },
          series: [{
            type: 'pie', radius: '62%', center: ['50%', '45%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#6B7280', fontSize: 11 },
            data: [
              { value: 8, name: '服务质量' }, { value: 5, name: '检测周期' },
              { value: 3, name: '报告错误' }, { value: 2, name: '重复收费' },
              { value: 1, name: '样品管理' }
            ]
          }]
        };
      }
    },
    /* 质量统计-整改完成率统计 */
    'qsr-rate': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 44, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value', min: 0, max: 100, name: '%' }, axisBase()),
          series: [{
            name: '整改完成率', type: 'line', smooth: true,
            markLine: { data: [{ yAxis: 90, name: '目标线' }], lineStyle: { color: '#F59E0B', type: 'dashed' }, label: { color: '#F59E0B' } },
            data: [84, 86, 88, 85, 90, 88, 91, 90, 92, 90, 91, 92]
          }]
        };
      }
    },
    'qsr-status': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#EF4444'],
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          legend: { center: 'bottom', textStyle: { color: '#6B7280' } },
          series: [{
            type: 'pie', radius: '62%', center: ['50%', '45%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#6B7280', fontSize: 11 },
            data: [
              { value: 18, name: '已完成' }, { value: 3, name: '整改中' },
              { value: 2, name: '超期未完成' }
            ]
          }]
        };
      }
    },
    'home-trend': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#F59E0B'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['委托量', '报告量', '检测量'], right: 10, top: 0, textStyle: { color: '#6B7280' } },
          grid: { left: 40, right: 16, top: 36, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: MONTHS }, axisBase()),
          yAxis: Object.assign({ type: 'value' }, axisBase()),
          series: [
            { name: '委托量', type: 'line', smooth: true, data: [12, 15, 18, 17, 20, 22, 19, 24, 21, 23, 26, 24], areaStyle: { opacity: 0.08 } },
            { name: '报告量', type: 'line', smooth: true, data: [11, 14, 17, 16, 19, 21, 18, 22, 20, 22, 24, 23] },
            { name: '检测量', type: 'bar', barWidth: 10, itemStyle: { borderRadius: [3, 3, 0, 0] }, data: [20, 25, 28, 26, 32, 35, 30, 38, 33, 36, 40, 38] }
          ]
        };
      }
    },
    'home-pie': {
      option: function () {
        return {
          color: [PRIMARY, '#3B82F6', '#F59E0B', '#8B5CF6', '#06B6D4'],
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          legend: { orient: 'vertical', right: 6, top: 18, textStyle: { color: '#6B7280', fontSize: 11 } },
          series: [{
            type: 'pie', radius: ['42%', '66%'], center: ['40%', '52%'],
            itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
            label: { show: false },
            data: [
              { value: 68, name: '分子检测' }, { value: 42, name: '免疫检测' },
              { value: 30, name: '病理检测' }, { value: 26, name: '基因测序' },
              { value: 20, name: '其他' }
            ]
          }]
        };
      }
    },
    'home-bar': {
      option: function () {
        return {
          color: [PRIMARY],
          tooltip: { trigger: 'axis' },
          grid: { left: 46, right: 16, top: 24, bottom: 24 },
          xAxis: Object.assign({ type: 'category', data: ['分子检测科', '免疫检测科', '病理科', '基因测序科', '综合办'] }, axisBase()),
          yAxis: Object.assign({ type: 'value', name: '单数' }, axisBase()),
          series: [{
            name: '本月任务量', type: 'bar', barWidth: 18,
            itemStyle: { borderRadius: [4, 4, 0, 0] },
            data: [86, 52, 41, 63, 28]
          }]
        };
      }
    }
  };

  var chartInstances = {};

  function renderChart(id) {
    var el = document.getElementById(id);
    if (!el || !window.echarts) return;
    if (chartInstances[id]) { chartInstances[id].dispose(); }
    var inst = window.echarts.init(el);
    var def = CHART_DEFS[id];
    if (def) inst.setOption(def.option());
    chartInstances[id] = inst;
  }

  function renderPageCharts() {
    Object.keys(CHART_DEFS).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) renderChart(id);
    });
  }

  /* ---------- 通知提示 ---------- */
  var toastTimer = null;
  function showToast(msg, type) {
    var wrap = document.getElementById('app-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'app-toast-wrap';
      document.body.appendChild(wrap);
    }
    var t = document.createElement('div');
    t.className = 'app-toast ' + (type === 'error' ? 'app-toast-error' : '');
    t.innerHTML = (type === 'error'
      ? '<i class="fa-solid fa-circle-exclamation"></i><span>' + msg + '</span>'
      : '<i class="fa-solid fa-circle-check"></i><span>' + msg + '</span>');
    wrap.appendChild(t);
    setTimeout(function () {
      t.classList.add('app-toast-out');
      setTimeout(function () { wrap.removeChild(t); }, 300);
    }, 2400);
  }

  /* ============================
     资源管理模块（从源项目 V4 完整搬运）
     ============================ */
  var RESOURCE_MOCK = {
    resourcePersonList: [
      { id: 1, empNo: 'EMP2023001', name: '陈建华', gender: '男', dept: '分子检测室', post: '室主任', education: '博士', hireDate: '2020-03-15', certCount: 5, status: '在职' },
      { id: 2, empNo: 'EMP2023002', name: '李文博', gender: '男', dept: '分子检测室', post: '检测员', education: '硕士', hireDate: '2021-07-01', certCount: 3, status: '在职' },
      { id: 3, empNo: 'EMP2023003', name: '张志强', gender: '男', dept: '基因测序室', post: '技术主管', education: '硕士', hireDate: '2020-09-10', certCount: 4, status: '在职' },
      { id: 4, empNo: 'EMP2023004', name: '刘思远', gender: '女', dept: '质量管理室', post: '质量主管', education: '本科', hireDate: '2019-05-20', certCount: 6, status: '在职' },
      { id: 5, empNo: 'EMP2023005', name: '周明远', gender: '男', dept: '样品制备室', post: '检测员', education: '本科', hireDate: '2022-08-15', certCount: 2, status: '在职' },
      { id: 6, empNo: 'EMP2023006', name: '赵晓东', gender: '男', dept: '分子检测室', post: '复核员', education: '硕士', hireDate: '2021-11-08', certCount: 3, status: '在职' },
      { id: 7, empNo: 'EMP2023007', name: '钱伟明', gender: '男', dept: '综合办公室', post: '管理员', education: '本科', hireDate: '2018-04-12', certCount: 1, status: '在职' },
      { id: 8, empNo: 'EMP2023008', name: '孙建国', gender: '男', dept: '基因测序室', post: '检测员', education: '本科', hireDate: '2026-09-01', certCount: 1, status: '试用期' },
      { id: 9, empNo: 'EMP2023009', name: '吴海涛', gender: '男', dept: '样品制备室', post: '检测员', education: '硕士', hireDate: '2026-09-10', certCount: 0, status: '试用期' },
      { id: 10, empNo: 'EMP2023010', name: '郑晓燕', gender: '女', dept: '质量管理室', post: '检测员', education: '本科', hireDate: '2023-02-20', certCount: 2, status: '离职' }
    ],
    resourceEquipmentList: [
      { id: 1, equipNo: 'EQ-001', name: '实时荧光定量PCR仪', model: 'CFX96-01', manufacturer: 'Bio-Rad', purchaseDate: '2022-05-10', calibrateExpire: '2026-12-31', status: '正常运行', location: '分子检测室A区' },
      { id: 2, equipNo: 'EQ-002', name: '实时荧光定量PCR仪', model: 'CFX96-02', manufacturer: 'Bio-Rad', purchaseDate: '2022-05-10', calibrateExpire: '2026-12-31', status: '正常运行', location: '分子检测室A区' },
      { id: 3, equipNo: 'EQ-003', name: '高通量测序仪', model: 'NovaSeq-01', manufacturer: 'Illumina', purchaseDate: '2023-03-20', calibrateExpire: '2026-10-15', status: '待校准', location: '基因测序室' },
      { id: 4, equipNo: 'EQ-004', name: '高速冷冻离心机', model: '5424R-01', manufacturer: 'Eppendorf', purchaseDate: '2021-08-15', calibrateExpire: '2027-01-20', status: '正常运行', location: '样品制备室' },
      { id: 5, equipNo: 'EQ-005', name: '凝胶成像系统', model: 'GelDoc-01', manufacturer: 'Bio-Rad', purchaseDate: '2022-11-08', calibrateExpire: '2026-11-30', status: '正常运行', location: '分子检测室B区' },
      { id: 6, equipNo: 'EQ-006', name: '超微量分光光度计', model: 'NanoDrop-01', manufacturer: 'Thermo Fisher', purchaseDate: '2021-06-25', calibrateExpire: '2026-09-30', status: '待校准', location: '样品制备室' },
      { id: 7, equipNo: 'EQ-007', name: '生物安全柜', model: 'BSC-1300IIA2', manufacturer: '苏州安泰', purchaseDate: '2022-04-18', calibrateExpire: '2027-04-18', status: '正常运行', location: '分子检测室B区' },
      { id: 8, equipNo: 'EQ-008', name: '恒温金属浴', model: 'HB-202', manufacturer: '杭州奥盛', purchaseDate: '2023-01-10', calibrateExpire: '2027-01-10', status: '正常运行', location: '样品制备室' },
      { id: 9, equipNo: 'EQ-009', name: '电泳仪电源', model: 'PowerPac Basic', manufacturer: 'Bio-Rad', purchaseDate: '2020-12-05', calibrateExpire: '2026-08-15', status: '维修中', location: '分子检测室B区' },
      { id: 10, equipNo: 'EQ-010', name: '纯水仪', model: 'Milli-Q-01', manufacturer: 'Millipore', purchaseDate: '2021-09-30', calibrateExpire: '2027-03-15', status: '正常运行', location: '公共实验区' }
    ],
    resourceStandardList: [
      { id: 1, stdNo: 'GB/T 19495-2004', name: '转基因产品检测 抽样和制样方法', type: '国家标准', publishDate: '2004-04-05', effectDate: '2004-10-01', status: '现行', projectCount: 8 },
      { id: 2, stdNo: 'NY/T 2593-2014', name: '植物品种鉴定 DNA分子标记法', type: '行业标准', publishDate: '2014-03-24', effectDate: '2014-06-01', status: '现行', projectCount: 12 },
      { id: 3, stdNo: 'GB/T 36821-2018', name: '花卉主要病害检测技术规程', type: '国家标准', publishDate: '2018-09-17', effectDate: '2019-04-01', status: '现行', projectCount: 6 },
      { id: 4, stdNo: 'GB/T 19557.1-2004', name: '植物新品种特异性、一致性和稳定性测试指南 总则', type: '国家标准', publishDate: '2004-06-15', effectDate: '2004-12-01', status: '现行', projectCount: 5 },
      { id: 5, stdNo: 'NY/T 2594-2014', name: '植物品种鉴定 SSR分子标记法', type: '行业标准', publishDate: '2014-03-24', effectDate: '2014-06-01', status: '现行', projectCount: 10 },
      { id: 6, stdNo: 'GB/T 38576-2020', name: '转基因植物及其产品成分检测 实时荧光定量PCR法', type: '国家标准', publishDate: '2020-03-31', effectDate: '2020-10-01', status: '现行', projectCount: 7 },
      { id: 7, stdNo: 'DB53/T 714-2015', name: '云南特色花卉品种鉴定技术规范', type: '地方标准', publishDate: '2015-12-10', effectDate: '2016-03-01', status: '现行', projectCount: 4 },
      { id: 8, stdNo: 'GB/T 34756-2017', name: '观赏植物品种鉴定 DNA指纹方法', type: '国家标准', publishDate: '2017-11-01', effectDate: '2018-05-01', status: '即将过期', projectCount: 3 },
      { id: 9, stdNo: 'NY/T 2589-2014', name: '植物新品种特异性、一致性和稳定性测试指南 菊花', type: '行业标准', publishDate: '2014-03-24', effectDate: '2014-06-01', status: '现行', projectCount: 2 },
      { id: 10, stdNo: 'GB/T 33916-2017', name: '动植物转基因成分检测 抽样指南', type: '国家标准', publishDate: '2017-07-12', effectDate: '2018-02-01', status: '现行', projectCount: 6 }
    ],
    resourceSupplierList: [
      { id: 1, supplierNo: 'SUP-001', name: '昆明博奥生物技术有限公司', type: '试剂耗材', contact: '王经理', phone: '13808711234', rating: 'A级', status: '合格' },
      { id: 2, supplierNo: 'SUP-002', name: '云南华大基因科技服务有限公司', type: '技术服务', contact: '李总监', phone: '13888005678', rating: 'A级', status: '合格' },
      { id: 3, supplierNo: 'SUP-003', name: '上海生工生物工程云南分公司', type: '试剂耗材', contact: '张经理', phone: '13987654321', rating: 'B级', status: '合格' },
      { id: 4, supplierNo: 'SUP-004', name: '昆明科翔仪器有限公司', type: '仪器设备', contact: '陈经理', phone: '13708709876', rating: 'B级', status: '合格' },
      { id: 5, supplierNo: 'SUP-005', name: '云南中检标物科技有限公司', type: '标准物质', contact: '刘经理', phone: '13888551111', rating: 'A级', status: '合格' },
      { id: 6, supplierNo: 'SUP-006', name: '昆明赛默飞世尔科技有限公司', type: '综合供应商', contact: '赵经理', phone: '13908802222', rating: 'A级', status: '合格' },
      { id: 7, supplierNo: 'SUP-007', name: '云南某贸易有限公司', type: '试剂耗材', contact: '钱总', phone: '13700003333', rating: 'D级', status: '黑名单' },
      { id: 8, supplierNo: 'SUP-008', name: '玉溪科创实验器材有限公司', type: '耗材采购', contact: '孙经理', phone: '13987774444', rating: 'C级', status: '待评审' }
    ],
    resourceReagentList: [
      { id: 1, reagentNo: 'RG-001', name: 'Taq DNA聚合酶', spec: '500U', category: '酶类试剂', manufacturer: 'TaKaRa', stock: 8, unit: '支', batchNo: 'TAK20260301', expireDate: '2027-03-15', status: '正常', inMonth: false },
      { id: 2, reagentNo: 'RG-002', name: 'dNTP Mix (2.5mM each)', spec: '1mL', category: '酶类试剂', manufacturer: 'Thermo Fisher', stock: 5, unit: '支', batchNo: 'THM20260110', expireDate: '2027-01-20', status: '正常', inMonth: false },
      { id: 3, reagentNo: 'RG-003', name: 'DNA Marker DL2000', spec: '50次', category: '标准品', manufacturer: 'TaKaRa', stock: 12, unit: '支', batchNo: 'TAK20260502', expireDate: '2027-05-10', status: '正常', inMonth: true },
      { id: 4, reagentNo: 'RG-004', name: '琼脂糖', spec: '100g', category: '琼脂糖凝胶', manufacturer: 'Sigma-Aldrich', stock: 2, unit: '瓶', batchNo: 'SIG20260208', expireDate: '2027-02-28', status: '低库存', inMonth: false },
      { id: 5, reagentNo: 'RG-005', name: 'Tris-盐酸缓冲液', spec: '500mL', category: '缓冲液', manufacturer: 'Solarbio', stock: 6, unit: '瓶', batchNo: 'SOL20260401', expireDate: '2027-04-15', status: '正常', inMonth: false },
      { id: 6, reagentNo: 'RG-006', name: 'PCR引物 (CaMV35S-F)', spec: 'OD值2', category: '引物探针', manufacturer: '上海生工', stock: 1, unit: '管', batchNo: 'SG20260815', expireDate: '2026-09-20', status: '即将过期', inMonth: true },
      { id: 7, reagentNo: 'RG-007', name: 'TaqMan探针 (NOS-T)', spec: 'OD值1', category: '引物探针', manufacturer: 'Thermo Fisher', stock: 3, unit: '管', batchNo: 'THM20260601', expireDate: '2027-06-15', status: '正常', inMonth: false },
      { id: 8, reagentNo: 'RG-008', name: '植物基因组DNA提取试剂盒', spec: '50次', category: '核酸提取试剂', manufacturer: '天根生化', stock: 15, unit: '盒', batchNo: 'TIAN20260320', expireDate: '2027-03-25', status: '正常', inMonth: true },
      { id: 9, reagentNo: 'RG-009', name: '反转录试剂盒', spec: '100次', category: '酶类试剂', manufacturer: 'TaKaRa', stock: 1, unit: '盒', batchNo: 'TAK20260105', expireDate: '2026-09-30', status: '即将过期', inMonth: false },
      { id: 10, reagentNo: 'RG-010', name: 'SYBR Green qPCR Mix', spec: '5mL', category: '酶类试剂', manufacturer: 'Bio-Rad', stock: 4, unit: '瓶', batchNo: 'BIO20260515', expireDate: '2027-05-20', status: '正常', inMonth: false }
    ],
    resourceConsumableList: [
      { id: 1, itemNo: 'CS-001', name: '1.5mL离心管', spec: '500支/包', category: '离心管类', unit: '包', currentStock: 25, safetyStock: 10, status: '正常' },
      { id: 2, itemNo: 'CS-002', name: '0.2mL PCR八连管', spec: '120条/盒', category: '离心管类', unit: '盒', currentStock: 8, safetyStock: 15, status: '低库存' },
      { id: 3, itemNo: 'CS-003', name: '1000μL枪头', spec: '1000支/盒', category: '吸头枪头', unit: '盒', currentStock: 18, safetyStock: 10, status: '正常' },
      { id: 4, itemNo: 'CS-004', name: '200μL枪头', spec: '1000支/盒', category: '吸头枪头', unit: '盒', currentStock: 5, safetyStock: 10, status: '低库存' },
      { id: 5, itemNo: 'CS-005', name: '10μL枪头', spec: '1000支/盒', category: '吸头枪头', unit: '盒', currentStock: 12, safetyStock: 10, status: '正常' },
      { id: 6, itemNo: 'CS-006', name: '9cm培养皿', spec: '500套/箱', category: '培养耗材', unit: '箱', currentStock: 3, safetyStock: 5, status: '低库存' },
      { id: 7, itemNo: 'CS-007', name: '定性滤纸 Φ11cm', spec: '100张/盒', category: '滤纸膜类', unit: '盒', currentStock: 15, safetyStock: 5, status: '正常' },
      { id: 8, itemNo: 'CS-008', name: '一次性手套(M)', spec: '100只/盒', category: '防护用品', unit: '盒', currentStock: 30, safetyStock: 20, status: '正常' }
    ],
    resourceSolutionList: [
      { id: 1, solNo: 'SL-001', name: 'EDTA标准溶液', concentration: '0.05 mol/L', preparer: '周明远', prepareDate: '2026-09-05', expireDate: '2026-12-05', calibrateStatus: '已标定', inMonth: true },
      { id: 2, solNo: 'SL-002', name: '盐酸标准溶液', concentration: '0.1 mol/L', preparer: '赵晓东', prepareDate: '2026-09-08', expireDate: '2026-12-08', calibrateStatus: '待标定', inMonth: true },
      { id: 3, solNo: 'SL-003', name: '氢氧化钠标准溶液', concentration: '0.1 mol/L', preparer: '李文博', prepareDate: '2026-08-20', expireDate: '2026-11-20', calibrateStatus: '已标定', inMonth: false },
      { id: 4, solNo: 'SL-004', name: '硝酸银标准溶液', concentration: '0.1 mol/L', preparer: '周明远', prepareDate: '2026-07-15', expireDate: '2026-09-15', calibrateStatus: '已标定', status: '已过期', inMonth: false },
      { id: 5, solNo: 'SL-005', name: '高锰酸钾标准溶液', concentration: '0.02 mol/L', preparer: '孙建国', prepareDate: '2026-09-12', expireDate: '2026-12-12', calibrateStatus: '待标定', inMonth: true },
      { id: 6, solNo: 'SL-006', name: '硫代硫酸钠标准溶液', concentration: '0.1 mol/L', preparer: '赵晓东', prepareDate: '2026-08-10', expireDate: '2026-11-10', calibrateStatus: '已标定', inMonth: false }
    ],
    resourceHazardousList: [
      { id: 1, hazNo: 'HZ-001', name: '无水乙醇', level: '易燃', spec: '500mL/瓶', stock: 20, location: '危化品柜A区', doubleLock: true, status: '正常' },
      { id: 2, hazNo: 'HZ-002', name: '甲醛溶液(37%)', level: '有毒', spec: '500mL/瓶', stock: 5, location: '危化品柜A区', doubleLock: true, status: '低库存' },
      { id: 3, hazNo: 'HZ-003', name: '乙腈', level: '易燃', spec: '4L/瓶', stock: 3, location: '危化品柜B区', doubleLock: true, status: '正常' },
      { id: 4, hazNo: 'HZ-004', name: '乙醚', level: '易燃', spec: '500mL/瓶', stock: 2, location: '防爆柜', doubleLock: true, status: '即将过期' },
      { id: 5, hazNo: 'HZ-005', name: '浓硫酸', level: '腐蚀', spec: '500mL/瓶', stock: 6, location: '危化品柜C区', doubleLock: true, status: '正常' },
      { id: 6, hazNo: 'HZ-006', name: '浓盐酸', level: '腐蚀', spec: '500mL/瓶', stock: 8, location: '危化品柜C区', doubleLock: true, status: '正常' }
    ],
    resourceBiologicalList: [
      { id: 1, bioNo: 'BIO-001', name: '大肠杆菌 DH5α', type: '菌株', source: 'TAKARA', location: '-80℃冰箱1号', passageCount: 3, status: '良好' },
      { id: 2, bioNo: 'BIO-002', name: '农杆菌 EHA105', type: '菌株', source: 'BioVector', location: '-80℃冰箱1号', passageCount: 2, status: '良好' },
      { id: 3, bioNo: 'BIO-003', name: '根癌农杆菌 LBA4404', type: '菌株', source: '实验室保藏', location: '-80℃冰箱1号', passageCount: 5, status: '良好' },
      { id: 4, bioNo: 'BIO-004', name: '质粒 pCAMBIA1301', type: '质粒', source: 'Clontech', location: '-20℃冰箱2号', passageCount: 0, status: '良好' },
      { id: 5, bioNo: 'BIO-005', name: '质粒 pBI121', type: '质粒', source: '实验室保藏', location: '-20℃冰箱2号', passageCount: 0, status: '良好' },
      { id: 6, bioNo: 'BIO-006', name: '质粒 pET-28a(+)', type: '质粒', source: 'Novagen', location: '-20℃冰箱2号', passageCount: 0, status: '良好' },
      { id: 7, bioNo: 'BIO-007', name: '拟南芥原生质体细胞', type: '细胞系', source: '实验室分离', location: '液氮罐A区', passageCount: 8, status: '良好' },
      { id: 8, bioNo: 'BIO-008', name: '烟草BY-2悬浮细胞系', type: '细胞系', source: 'ATCC', location: '培养室', passageCount: 12, status: '待传代' }
    ],
    resourceReferenceList: [
      { id: 1, refNo: 'RM-001', name: '转基因水稻基因组DNA标准物质', spec: '10μg/瓶', grade: '一级标准物质', manufacturer: '中国计量科学研究院', batchNo: 'GBW10087', stock: 4, expireDate: '2027-06-30', status: '正常' },
      { id: 2, refNo: 'RM-002', name: '转基因大豆标准物质', spec: '10g/瓶', grade: '一级标准物质', manufacturer: '中国计量科学研究院', batchNo: 'GBW10042', stock: 2, expireDate: '2026-12-15', status: '即将过期' },
      { id: 3, refNo: 'RM-003', name: 'DNA分子量标准 100bp Ladder', spec: '50次', grade: '工作标准品', manufacturer: 'TaKaRa', batchNo: 'TAK20260310', stock: 6, expireDate: '2027-03-20', status: '正常' },
      { id: 4, refNo: 'RM-004', name: '蛋白质分子量标准', spec: '25次', grade: '工作标准品', manufacturer: 'Bio-Rad', batchNo: 'BIO20260401', stock: 3, expireDate: '2027-04-10', status: '正常' },
      { id: 5, refNo: 'RM-005', name: '实时荧光定量PCR质粒标准品', spec: '1000拷贝/μL', grade: '工作标准品', manufacturer: '自制', batchNo: 'ZY20260501', stock: 1, expireDate: '2026-11-30', status: '低库存' },
      { id: 6, refNo: 'RM-006', name: '气相色谱校准用混合标样', spec: '1mL/瓶', grade: '二级标准物质', manufacturer: '坛墨质检', batchNo: 'TM20260215', stock: 2, expireDate: '2027-02-28', status: '待核查' },
      { id: 7, refNo: 'RM-007', name: '总DNA质控样品', spec: '50ng/μL', grade: '质控品', manufacturer: 'Promega', batchNo: 'PRO20260108', stock: 5, expireDate: '2027-01-15', status: '正常' },
      { id: 8, refNo: 'RM-008', name: 'PCR阳性对照质粒', spec: '20μL/管', grade: '工作标准品', manufacturer: '自制', batchNo: 'ZY20260601', stock: 2, expireDate: '2026-12-20', status: '待核查' }
    ],
    resourcePurchaseList: [
      { id: 1, purNo: 'PO202609001', purType: '试剂采购', applicant: '李文博', applyDate: '2026-09-05', amount: '¥8,560.00', status: '已完成', approveProgress: '3/3' },
      { id: 2, purNo: 'PO202609002', purType: '耗材采购', applicant: '周明远', applyDate: '2026-09-08', amount: '¥3,280.00', status: '采购中', approveProgress: '2/3' },
      { id: 3, purNo: 'PO202609003', purType: '设备采购', applicant: '张志强', applyDate: '2026-09-10', amount: '¥68,000.00', status: '待审批', approveProgress: '0/3' },
      { id: 4, purNo: 'PO202608001', purType: '试剂采购', applicant: '赵晓东', applyDate: '2026-08-15', amount: '¥12,450.00', status: '已完成', approveProgress: '3/3' },
      { id: 5, purNo: 'PO202609004', purType: '服务采购', applicant: '陈建华', applyDate: '2026-09-12', amount: '¥25,000.00', status: '待审批', approveProgress: '1/3' },
      { id: 6, purNo: 'PO202608002', purType: '耗材采购', applicant: '吴海涛', applyDate: '2026-08-22', amount: '¥5,680.00', status: '已完成', approveProgress: '3/3' },
      { id: 7, purNo: 'PO202609005', purType: '试剂采购', applicant: '孙建国', applyDate: '2026-09-15', amount: '¥9,320.00', status: '采购中', approveProgress: '2/3' },
      { id: 8, purNo: 'PO202607001', purType: '设备采购', applicant: '张志强', applyDate: '2026-07-10', amount: '¥15,800.00', status: '已驳回', approveProgress: '1/3' }
    ]
  };

  var RESOURCE_MODALS = {
    resourcePersonAdd: false, resourcePersonView: false, resourcePersonEdit: false, resourcePersonDelete: false,
    resourcePersonCert: false, resourcePersonTrain: false,
    resourceEquipmentAdd: false, resourceEquipmentView: false, resourceEquipmentEdit: false, resourceEquipmentDelete: false,
    resourceEquipmentCalibrate: false, resourceEquipmentUsage: false, resourceEquipmentQrcode: false,
    resourceStandardAdd: false, resourceStandardView: false, resourceStandardEdit: false, resourceStandardDelete: false,
    resourceStandardMethod: false, resourceStandardProjects: false,
    resourceSupplierAdd: false, resourceSupplierView: false, resourceSupplierEdit: false, resourceSupplierDelete: false,
    resourceSupplierReview: false, resourceSupplierEvaluate: false,
    resourceReagentAdd: false, resourceReagentView: false, resourceReagentEdit: false, resourceReagentIn: false, resourceReagentOut: false, resourceReagentCheck: false,
    resourceConsumableAdd: false, resourceConsumableView: false, resourceConsumableEdit: false, resourceConsumableRecord: false, resourceConsumableStats: false,
    resourceSolutionAdd: false, resourceSolutionView: false, resourceSolutionCalibrate: false, resourceSolutionPrepare: false,
    resourceHazardousAdd: false, resourceHazardousView: false, resourceHazardousEdit: false, resourceHazardousRecord: false, resourceHazardousMsds: false, resourceHazardousWaste: false,
    resourceBiologicalAdd: false, resourceBiologicalView: false, resourceBiologicalEdit: false, resourceBiologicalPassage: false, resourceBiologicalStorage: false,
    resourceReferenceAdd: false, resourceReferenceView: false, resourceReferenceEdit: false, resourceReferenceIn: false, resourceReferenceUse: false, resourceReferenceCheck: false,
    resourcePurchaseAdd: false, resourcePurchaseView: false, resourcePurchaseApprove: false, resourcePurchaseAccept: false,
    resourceOpResult: false
  };

  var RESOURCE_MODALDATA = {
    resourcePersonItem: {}, resourceEquipmentItem: {}, resourceStandardItem: {}, resourceSupplierItem: {},
    resourceReagentItem: {}, resourceConsumableItem: {}, resourceSolutionItem: {}, resourceHazardousItem: {},
    resourceBiologicalItem: {}, resourceReferenceItem: {}, resourcePurchaseItem: {},
    resourceReferenceUse: {},
    resourceOpResult: { title: '', message: '' }
  };

  var RESOURCE_SEARCHFORM = {
    resourcePerson: { name: '', empNo: '', dept: '', post: '', status: '' },
    resourceEquipment: { equipNo: '', name: '', type: '', status: '', manufacturer: '' },
    resourceStandard: { stdNo: '', name: '', type: '', status: '' },
    resourceSupplier: { name: '', creditCode: '', type: '', rating: '' },
    resourceReagent: { reagentNo: '', name: '', category: '', status: '' },
    resourceConsumable: { itemNo: '', name: '', category: '' },
    resourceSolution: { solNo: '', name: '', concRange: '', status: '' },
    resourceHazardous: { hazNo: '', name: '', level: '', status: '' },
    resourceBiological: { bioNo: '', name: '', type: '', location: '' },
    resourceReference: { refNo: '', name: '', grade: '', status: '' },
    resourcePurchase: { purNo: '', applicant: '', purType: '', status: '' }
  };

  var RESOURCE_PAGINATION = {
    resourcePerson: { page: 1, size: 10, total: 10 },
    resourceEquipment: { page: 1, size: 10, total: 10 },
    resourceStandard: { page: 1, size: 10, total: 10 },
    resourceSupplier: { page: 1, size: 10, total: 8 },
    resourceReagent: { page: 1, size: 10, total: 10 },
    resourceConsumable: { page: 1, size: 10, total: 8 },
    resourceSolution: { page: 1, size: 10, total: 6 },
    resourceHazardous: { page: 1, size: 10, total: 6 },
    resourceBiological: { page: 1, size: 10, total: 8 },
    resourceReference: { page: 1, size: 10, total: 8 },
    resourcePurchase: { page: 1, size: 10, total: 8 }
  };

  /* ============================
     Vue 应用
     ============================ */
  var App = {
    data: function () {
      var data = buildData();
      return {
        loading: true,
        collapsed: false,
        menuData: MENU,
        builtPages: BUILT_PAGES,
        openMenus: [],
        activeMenuKey: 'workbench',
        activeTab: 'workbench',
        tabs: [{ key: 'workbench', name: '首页' }],
        homeRole: 'admin',
        homeModuleEdit: false,
        homeModules: ['business', 'test', 'report', 'quality'],
        homeModulePool: [
          { key: 'business', name: '业务受理', icon: 'fa-briefcase', desc: '客户/委托/合同/费用' },
          { key: 'sampling', name: '采样管理', icon: 'fa-location-dot', desc: '采样安排/样品入库' },
          { key: 'test', name: '检测试验', icon: 'fa-flask-vial', desc: '样品/安排/数据' },
          { key: 'eln', name: '电子实验记录', icon: 'fa-book-open', desc: '实验记录/模板' },
          { key: 'report', name: '报告管理', icon: 'fa-file-lines', desc: '编制/审核/签发' },
          { key: 'research', name: '科研管理', icon: 'fa-flask', desc: '项目/实验/成果' },
          { key: 'resource', name: '资源管理', icon: 'fa-boxes-stacked', desc: '人员/设备/试剂' },
          { key: 'quality', name: '质量管理', icon: 'fa-shield-halved', desc: '内审/监督/质控' },
          { key: 'training', name: '培训管理', icon: 'fa-chalkboard-user', desc: '计划/实施/考试' },
          { key: 'stat', name: '统计分析', icon: 'fa-chart-pie', desc: '业务/质量/科研' },
          { key: 'system', name: '系统管理', icon: 'fa-gear', desc: '组织/权限/配置' }
        ],
        homeTodos: [],
        homeAlerts: [],
        pageData: data,
        fields: FIELDS,
        statusTags: STATUS_TAGS,
        pageIndex: 1,
        pageSize: 8,
        searchForm: { module: '', type: '', keyword: '' },
        resourceSearchForm: Object.assign({}, RESOURCE_SEARCHFORM),
        mockData: RESOURCE_MOCK,
        modalData: RESOURCE_MODALDATA,
        pagination: RESOURCE_PAGINATION,
        moreActionsOpen: '',
        moreIdx: -1,
        moreType: '',
        moreOpen: null,
        rTab: 'all',
        reTab: 'all',
        rResultTab: 'paper',
        qrTab: 'planMgmt',
        qaTab: 'clause',
        qaClauseMode: 'element',
        qsTab: 'plan',
        qsPlanMode: 'periodic',
        qcTab: 'plan',
        qcPlanMode: 'internal',
        pfTab: 'plan',
        pfPlanMode: 'pt',
        qcChartVisible: false,
        uploadVisible: false,
        uploadPage: '',
        uploadTarget: null,
        uploadResult: '',
        uploadFiles: [],
        approveVisible: false,
        approveTarget: null,
        approveComment: '',
        approvePage: '',
        exportPickerVisible: false,
        exportPickerTitle: '',
        exportPickerItems: [],
        exportPickerChecked: {},
        exportPickerAll: true,
        bizQuery: { start: '', end: '', period: 'month', kw: '' },
        bizQueryApplied: false,
        docTreeNode: 'all',
        docSearch: '',
        sysDocExpand: { qp: true, sop: true },
        sysDocTree: [
          { name: '质量手册', key: 'qm' },
          { name: '程序文件', key: 'qp', children: ['文件控制程序', '记录控制程序', '内部审核程序', '管理评审程序', '不符合工作控制程序', '纠正措施程序', '预防措施程序', '能力验证程序'] },
          { name: '作业指导书', key: 'sop', children: ['样品采集作业指导书', '样品检测作业指导书', '仪器设备操作作业指导书'] },
          { name: '质量记录', key: 'qr' },
          { name: '表格模板', key: 'fr' },
          { name: '外来文件', key: 'ef' }
        ],
        sysDocs: [
          { id: 1, code: 'HY/QM/001', name: '质量手册（第A版）', cat: '质量手册', sub: '', version: 'A/1', status: '已发布', controlled: '受控', controlNo: 'XH-QM-001', author: '张工', publishDate: '2026-01-15', fileIcon: 'fa-file-shield', fileColor: '#EF4444', size: '3.2MB', update: '2026-01-15', category: '体系文件', content: '<p>本手册依据 GB/T 27025-2019 编制，规定了实验室质量管理体系的结构、职责与运行要求，适用于体系文件的编制、审批、发布、分发、受控与作废管理……</p>', files: [], versions: [
            { ver: 'A/0', desc: '首次发布', operator: '李主任', time: '2025-10-20' },
            { ver: 'A/1', desc: '更新分子检测范围及设备清单', operator: '张工', time: '2026-01-15' }
          ] },
          { id: 2, code: 'HY/PD/011', name: '文件控制程序', cat: '程序文件', sub: '文件控制程序', version: 'B/0', status: '已发布', controlled: '受控', controlNo: 'XH-PD-011', author: '王工', publishDate: '2026-02-05', fileIcon: 'fa-file-lines', fileColor: '#3B82F6', size: '1.6MB', update: '2026-02-05', category: '体系文件', content: '<p>规定体系文件的编制、审核、批准、发放、使用、更改、作废和回收的全过程受控要求，确保各部门使用的文件均为现行有效版本……</p>', files: [], versions: [
            { ver: 'A/0', desc: '首次发布', operator: '李主任', time: '2025-09-12' },
            { ver: 'B/0', desc: '机构调整后整体改版', operator: '王工', time: '2026-02-05' }
          ] },
          { id: 3, code: 'HY/PD/012', name: '记录控制程序', cat: '程序文件', sub: '记录控制程序', version: 'A/0', status: '已发布', controlled: '受控', controlNo: 'XH-PD-012', author: '王工', publishDate: '2025-11-08', fileIcon: 'fa-file-lines', fileColor: '#3B82F6', size: '1.2MB', update: '2025-11-08', category: '体系文件', content: '<p>规定质量记录和技术记录的标识、贮存、保护、检索、保存期限和处置要求……</p>', files: [], versions: [
            { ver: 'A/0', desc: '首次发布', operator: '李主任', time: '2025-11-08' }
          ] },
          { id: 4, code: 'HY/PD/013', name: '内部审核程序', cat: '程序文件', sub: '内部审核程序', version: 'A/0', status: '已发布', controlled: '受控', controlNo: 'XH-PD-013', author: '李主任', publishDate: '2025-12-01', fileIcon: 'fa-file-lines', fileColor: '#3B82F6', size: '1.4MB', update: '2025-12-01', category: '体系文件', content: '<p>规定了内部审核的策划、实施、报告及不符合项整改验证的流程与职责……</p>', files: [], versions: [
            { ver: 'A/0', desc: '首次发布', operator: '李主任', time: '2025-12-01' }
          ] },
          { id: 5, code: 'HY/SOP/031', name: '核酸提取作业指导书', cat: '作业指导书', sub: '样品检测作业指导书', version: 'A/1', status: '草稿', controlled: '受控', controlNo: 'XH-SOP-031', author: '周工', publishDate: '', fileIcon: 'fa-file-pen', fileColor: '#F59E0B', size: '980KB', update: '2026-03-18', category: '体系文件', content: '<p>规定了植物组织 DNA/RNA 提取的操作步骤、试剂配比与注意事项……</p>', files: [], versions: [
            { ver: 'A/0', desc: '首次发布', operator: '周工', time: '2025-06-20' },
            { ver: 'A/1', desc: '优化试剂用量并增补污染防控条款', operator: '周工', time: '2026-03-18' }
          ] },
          { id: 6, code: 'HY/QR/041', name: '质量记录清单', cat: '质量记录', sub: '', version: 'A/0', status: '已发布', controlled: '受控', controlNo: 'XH-QR-041', author: '张工', publishDate: '2025-10-30', fileIcon: 'fa-list-check', fileColor: '#8B5CF6', size: '560KB', update: '2025-10-30', category: '体系文件', content: '<p>汇总实验室各类质量记录的编号、名称、保存部门与保存期限……</p>', files: [], versions: [
            { ver: 'A/0', desc: '首次发布', operator: '张工', time: '2025-10-30' }
          ] },
          { id: 7, code: 'HY/FR/051', name: '检测原始记录表', cat: '表格模板', sub: '', version: 'A/0', status: '已发布', controlled: '受控', controlNo: 'XH-FR-051', author: '张工', publishDate: '2025-12-20', fileIcon: 'fa-table', fileColor: '#0891B2', size: '420KB', update: '2025-12-20', category: '体系文件', content: '<p>检测原始记录表模板，覆盖样品信息、检测条件、结果计算与复核签字栏……</p>', files: [], versions: [
            { ver: 'A/0', desc: '首次发布', operator: '张工', time: '2025-12-20' }
          ] },
          { id: 8, code: 'GB/T 27025-2019', name: '检测和校准实验室能力的通用要求', cat: '外来文件', sub: '', version: '2019版', status: '已发布', controlled: '非受控', controlNo: '', author: '国家标准委', publishDate: '2020-07-01', fileIcon: 'fa-file-lines', fileColor: '#6B7280', size: '1.9MB', update: '2020-07-01', category: '体系文件', content: '<p>国家标准 GB/T 27025-2019《检测和校准实验室能力的通用要求》……</p>', files: [], versions: [
            { ver: '2019版', desc: '标准发布', operator: '国家标准委', time: '2020-07-01' }
          ] }
        ],
        docVersionVisible: false,
        docVersionTarget: null,
        complaintTab: 'register',
        correctiveTab: 'apply',
        bizTab: 'volume',
        bizPeriod: 'month',
        sciTab: 'project',
        qStatTab: 'qc',
        orgTab: 'dept',
        permTab: 'user',
        dictTab: 'type',
        numTab: 'report',
        cfgTab: 'flow',
        libTab: 'cat',
        envTab: 'mproj',
        setTab: 'param',
        uiTab: 'form',
        selectedProjectCode: '',
        projCfgDraft: null,
        projTreeExpanded: {},
        editingCatIdx: null,
        editingSubcatIdx: null,
        selectedReport: 'RP-01',
        rptDraftFields: [],
        rptDraftStyle: {},
        queryTab: 'delegate',
        resultTabs: [
          { key: 'paper', name: '论文' }, { key: 'patent', name: '专利' },
          { key: 'award', name: '获奖' }, { key: 'transfer', name: '成果转化' }
        ],
        queryTabs: [
          { key: 'delegate', name: '委托查询' }, { key: 'report', name: '报告查询' }, { key: 'sample', name: '样品查询' }
        ],
        typeTag: { all: 'tag-green', sample: 'tag-blue', seq: 'tag-purple', template: 'tag-cyan' },
        baseRows: {},
        kanbanCols: [
          { key: 'todo', name: '待处理' }, { key: 'doing', name: '处理中' }, { key: 'done', name: '已解决' }
        ],
        complaintList: [],
        modals: Object.assign({ form: false, detail: false, del: false, collect: false, pdfCollect: false, protocolGrab: false }, RESOURCE_MODALS),
        deviceCollect: {
          device: {},
          config: { policy: '实时采集', interval: '每30秒', scope: '最新一批', channel: '检测主通道', autoParse: true },
          running: false,
          done: false,
          progress: 0,
          statusText: '等待开始采集',
          collected: [],
          rounds: 0,
          errors: 0,
          lastTime: '-',
          _timer: null,
          _seq: 0
        },
        protocolGrab: {
          rule: {},
          config: { policy: '一次性抓取', interval: '每30秒', scope: '最新一批', channel: '数据通道', parseLevel: '字段级解析', keepRaw: true, autoStore: true },
          running: false,
          done: false,
          progress: 0,
          statusText: '等待开始抓取',
          collected: [],
          rounds: 0,
          errors: 0,
          lastTime: '-',
          _timer: null,
          _seq: 0
        },
        pdfCollect: {
          step: 1,
          ruleCode: '',
          files: [],
          collected: [],
          progress: 0,
          parsing: false,
          done: false,
          statusText: '等待开始解析',
          parsedCount: 0,
          failedCount: 0,
          _timer: null,
          _seq: 0
        },
        formPage: '',
        formEdit: false,
        formSchema: [],
        formData: {},
        detailRow: null,
        detailPage: 'research-project',
        detailTitle: '详情',
        detailSections: [],
        detailProgress: null,
        detailEditBtn: true,
        deleteTarget: null,
        deletePage: '',
        aiveDrawer: false,
        settings: { orgName: '云南省花卉技术培训推广中心', primary: '#059669', calendar: '周一至周五', retention: '永久保留' },
        docPreview: null,
        knowledgeCats: [
          { name: '操作手册', count: 16, update: '2026-03-02', icon: 'fa-book', bg: '#ECFDF5', color: '#059669' },
          { name: '标准规范', count: 9, update: '2026-02-18', icon: 'fa-file-shield', bg: '#EFF6FF', color: '#3B82F6' },
          { name: '质控指南', count: 12, update: '2026-03-10', icon: 'fa-bullseye', bg: '#F5F3FF', color: '#8B5CF6' },
          { name: '仪器维护', count: 8, update: '2026-02-26', icon: 'fa-microscope', bg: '#FFF7ED', color: '#EA580C' },
          { name: '安全防护', count: 7, update: '2026-03-05', icon: 'fa-helmet-safety', bg: '#FEF2F2', color: '#EF4444' },
          { name: '经验总结', count: 6, update: '2026-03-12', icon: 'fa-lightbulb', bg: '#CFFAFE', color: '#0891B2' }
        ],
        currentCat: '操作手册',
        knowledgeDocs: [
          { id: 1, name: '分子检测标准操作规程 V5.1', category: '操作手册', size: '2.4MB', update: '2026-02-20', fileIcon: 'fa-file-word', fileColor: '#3B82F6', content: '<p>本规程适用于分子检测实验室…</p>' },
          { id: 2, name: '样品采集与保存指南', category: '操作手册', size: '1.8MB', update: '2026-01-12', fileIcon: 'fa-file-lines', fileColor: '#8B5CF6', content: '<p>样品采集要点与保存条件说明…</p>' },
          { id: 3, name: 'GB/T 27025-2019 要点解读', category: '标准规范', size: '1.2MB', update: '2026-02-18', fileIcon: 'fa-file-shield', fileColor: '#EF4444', content: '<p>检测和校准实验室能力的通用要求…</p>' },
          { id: 4, name: 'Levey-Jennings 质控图绘制指引', category: '质控指南', size: '860KB', update: '2026-03-10', fileIcon: 'fa-file-chart-line', fileColor: '#F59E0B', content: '<p>质控图绘制与判读方法…</p>' }
        ],
        deptRank: [
          { name: '分子检测组', value: 64 }, { name: '病原鉴定组', value: 48 },
          { name: '农残检测组', value: 32 }, { name: '组培检测组', value: 24 },
          { name: '测序平台', value: 18 }
        ],
        qualityMetrics: [
          { name: '检测报告及时率', quarter: 'Q1', value: '98.2%', trend: '↑ 0.5%', target: '≥98%', done: true },
          { name: '质控合格率', quarter: 'Q1', value: '98.6%', trend: '↑ 0.3%', target: '≥98%', done: true },
          { name: '设备完好率', quarter: 'Q1', value: '96.8%', trend: '↑ 1.0%', target: '≥95%', done: true },
          { name: '客户投诉率', quarter: 'Q2', value: '1.2%', trend: '↓ 0.4%', target: '≤1%', done: false },
          { name: '检测报告及时率', quarter: 'Q2', value: '98.5%', trend: '↑ 0.3%', target: '≥98%', done: true },
          { name: '质控合格率', quarter: 'Q2', value: '99.0%', trend: '↑ 0.4%', target: '≥98%', done: true }
        ],
        staffMetrics: [
          { dept: '分子检测组', total: 12, cert: 12, senior: 4, signer: 2, trainTimes: 8 },
          { dept: '病原鉴定组', total: 8, cert: 8, senior: 3, signer: 1, trainTimes: 6 },
          { dept: '农残检测组', total: 6, cert: 5, senior: 2, signer: 1, trainTimes: 4 },
          { dept: '组培检测组', total: 10, cert: 9, senior: 3, signer: 1, trainTimes: 5 },
          { dept: '测序平台', total: 6, cert: 6, senior: 2, signer: 1, trainTimes: 6 },
          { dept: '质量与科研岗', total: 8, cert: 8, senior: 4, signer: 2, trainTimes: 3 }
        ],
        researchMetrics: [
          { year: 2023, running: 4, newProj: 3, done: 2, funding: 95, rate: 88, papers: 5 },
          { year: 2024, running: 5, newProj: 4, done: 2, funding: 120, rate: 90, papers: 6 },
          { year: 2025, running: 6, newProj: 4, done: 3, funding: 148, rate: 92, papers: 8 },
          { year: 2026, running: 6, newProj: 2, done: 0, funding: 128, rate: 75, papers: 2 }
        ],
        trainingMetrics: [
          { type: '内训', count: 10, people: 96, hours: 140, satisfaction: 96, certCount: 66 },
          { type: '外训', count: 8, people: 36, hours: 96, satisfaction: 95, certCount: 24 },
          { type: '在线学习', count: 14, people: 88, hours: 56, satisfaction: 92, certCount: 40 },
          { type: '实操带教', count: 6, people: 24, hours: 72, satisfaction: 98, certCount: 18 }
        ],
        ptRectifyData: [
          { year: 2024, done: 4, total: 5 }, { year: 2025, done: 3, total: 4 }, { year: 2026, done: 5, total: 5 }
        ]
      };
    },
    computed: {
      pageConfig: function () {
        var map = {};
        this.menuData.forEach(function (g) {
          (g.children || []).forEach(function (c) { map[c.key] = c.name; });
        });
        map['workbench'] = '首页';
        return map;
      },
      /* ---------- 首页（个人门户） ---------- */
      homeRoleName: function () {
        var m = { admin: '系统管理员', tech: '检测员', audit: '审核员', sign: '授权签字人', quality: '质量管理员' };
        return m[this.homeRole] || '系统管理员';
      },
      homeRoleModules: function () {
        // 不同角色可见的功能组（大模块 key）
        var m = {
          admin: ['business', 'sampling', 'test', 'eln', 'report', 'research', 'resource', 'quality', 'training', 'stat', 'system'],
          tech: ['sampling', 'test', 'eln', 'report', 'research', 'quality'],
          audit: ['test', 'report', 'quality', 'stat'],
          sign: ['business', 'report', 'quality', 'stat'],
          quality: ['test', 'quality', 'resource', 'stat']
        };
        return m[this.homeRole] || [];
      },
      homeStats: function () {
        var m = {
          admin: [
            { label: '本月委托量', value: 156, icon: 'fa-briefcase', color: 'green' },
            { label: '在检样品', value: 342, icon: 'fa-flask-vial', color: 'blue' },
            { label: '待签发报告', value: 23, icon: 'fa-file-signature', color: 'orange' },
            { label: '本月收入(万)', value: 158.6, icon: 'fa-circle-dollar', color: 'purple' }
          ],
          tech: [
            { label: '待检测任务', value: 18, icon: 'fa-flask-vial', color: 'blue' },
            { label: '今日已测样品', value: 46, icon: 'fa-circle-check', color: 'green' },
            { label: '待填报数据', value: 12, icon: 'fa-keyboard', color: 'orange' },
            { label: '质控合格率', value: '98.2%', icon: 'fa-bullseye', color: 'purple' }
          ],
          audit: [
            { label: '待审核报告', value: 23, icon: 'fa-file-lines', color: 'orange' },
            { label: '待复核数据', value: 15, icon: 'fa-clipboard-check', color: 'blue' },
            { label: '今日审核通过', value: 31, icon: 'fa-circle-check', color: 'green' },
            { label: '超时预警', value: 3, icon: 'fa-triangle-exclamation', color: 'red' }
          ],
          sign: [
            { label: '待签发报告', value: 9, icon: 'fa-file-signature', color: 'orange' },
            { label: '今日已签发', value: 14, icon: 'fa-circle-check', color: 'green' },
            { label: '授权项目', value: 36, icon: 'fa-pen-ruler', color: 'blue' },
            { label: '月度签发量', value: 208, icon: 'fa-chart-line', color: 'purple' }
          ],
          quality: [
            { label: '待整改项', value: 6, icon: 'fa-toolbox', color: 'orange' },
            { label: '本月质控计划', value: 24, icon: 'fa-bullseye', color: 'blue' },
            { label: '质控合格率', value: '97.6%', icon: 'fa-circle-check', color: 'green' },
            { label: '不符合项', value: 4, icon: 'fa-triangle-exclamation', color: 'red' }
          ]
        };
        return m[this.homeRole] || m.admin;
      },
      homeTodoList: function () {
        var m = {
          admin: [
            { title: '待审合同', desc: '云南花卉集团检测合同（3份待审）', tag: '合同', color: 'tag-orange' },
            { title: '待签发报告', desc: '报告号 BG-20260917-012 待签发', tag: '签发', color: 'tag-blue' },
            { title: '待处理投诉', desc: '客户投诉 2 条待处理', tag: '投诉', color: 'tag-red' },
            { title: '待审整改', desc: '内审不符合项整改验证 3 项', tag: '整改', color: 'tag-purple' }
          ],
          tech: [
            { title: '待检测任务', desc: '18 个样品待安排检测', tag: '任务', color: 'tag-blue' },
            { title: '待填报数据', desc: '12 个实验记录待填报', tag: '填报', color: 'tag-orange' },
            { title: '待提交审核', desc: '5 份检测数据待提交审核', tag: '审核', color: 'tag-purple' }
          ],
          audit: [
            { title: '待审核报告', desc: '23 份报告待二级审核', tag: '报告', color: 'tag-orange' },
            { title: '待复核数据', desc: '15 条检测数据待复核', tag: '数据', color: 'tag-blue' },
            { title: '异常数据提醒', desc: '3 份数据超期未审核', tag: '异常', color: 'tag-red' }
          ],
          sign: [
            { title: '待签发报告', desc: '9 份报告待授权签发', tag: '签发', color: 'tag-orange' },
            { title: '待确认改单', desc: '2 份报告返工单待确认', tag: '改单', color: 'tag-blue' }
          ],
          quality: [
            { title: '待整改项', desc: '6 项不符合待整改', tag: '整改', color: 'tag-red' },
            { title: '待实施质控', desc: '24 个质控计划待实施', tag: '质控', color: 'tag-blue' },
            { title: '待监督抽查', desc: '本月监督抽查待执行', tag: '监督', color: 'tag-purple' }
          ]
        };
        return m[this.homeRole] || [];
      },
      homeAlertList: function () {
        var m = {
          admin: [
            { title: '报告签发超时预警', desc: '3 份报告已超过承诺时限', level: '重要', color: 'tag-red' },
            { title: '仪器校准到期', desc: '凝胶成像系统将于 3 天后到期', level: '提醒', color: 'tag-orange' },
            { title: '质控结果异常', desc: '荧光定量PCR仪 8 月质控不合格', level: '重要', color: 'tag-red' }
          ],
          tech: [
            { title: '样品保存超时', desc: '2 个样品超过保存时限', level: '重要', color: 'tag-red' },
            { title: '试剂余量不足', desc: '核酸提取试剂余量低于安全线', level: '提醒', color: 'tag-orange' }
          ],
          audit: [
            { title: '数据审核超期', desc: '3 条检测数据超期未审核', level: '重要', color: 'tag-red' },
            { title: '报告退回提醒', desc: '2 份报告被退回待复核', level: '提醒', color: 'tag-orange' }
          ],
          sign: [
            { title: '授权签字人轮值提醒', desc: '本周轮值授权签字人：张工', level: '提醒', color: 'tag-blue' },
            { title: '报告改单待确认', desc: '2 份报告返工单待确认', level: '提醒', color: 'tag-orange' }
          ],
          quality: [
            { title: '不符合项整改超期', desc: '2 项不符合超过整改期限', level: '重要', color: 'tag-red' },
            { title: '能力验证报名提醒', desc: '下月能力验证报名截止', level: '提醒', color: 'tag-orange' }
          ]
        };
        return m[this.homeRole] || [];
      },
      homeModulesList: function () {
        var self = this;
        return this.homeModules.map(function (k) {
          var pool = self.homeModulePool.filter(function (p) { return p.key === k; })[0];
          return pool || { key: k, name: k, icon: 'fa-circle', desc: '' };
        });
      },
      homeModuleUnused: function () {
        var self = this;
        return this.homeModulePool.filter(function (p) { return self.homeModules.indexOf(p.key) === -1; });
      },
      filteredResourcePersonList: function () {
        var sf = this.resourceSearchForm.resourcePerson;
        return this.mockData.resourcePersonList.filter(function (item) {
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.empNo && item.empNo.indexOf(sf.empNo) === -1) return false;
          if (sf.dept && item.dept.indexOf(sf.dept) === -1) return false;
          if (sf.post && item.post.indexOf(sf.post) === -1) return false;
          if (sf.status && item.status.indexOf(sf.status) === -1) return false;
          return true;
        });
      },
      filteredResourceEquipmentList: function () {
        var sf = this.resourceSearchForm.resourceEquipment;
        return this.mockData.resourceEquipmentList.filter(function (item) {
          if (sf.equipNo && item.equipNo.indexOf(sf.equipNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.type && item.type.indexOf(sf.type) === -1) return false;
          if (sf.status && item.status.indexOf(sf.status) === -1) return false;
          if (sf.manufacturer && item.manufacturer.indexOf(sf.manufacturer) === -1) return false;
          return true;
        });
      },
      filteredResourceStandardList: function () {
        var sf = this.resourceSearchForm.resourceStandard;
        return this.mockData.resourceStandardList.filter(function (item) {
          if (sf.stdNo && item.stdNo.indexOf(sf.stdNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.type && item.type.indexOf(sf.type) === -1) return false;
          if (sf.status && item.status.indexOf(sf.status) === -1) return false;
          return true;
        });
      },
      filteredResourceSupplierList: function () {
        var sf = this.resourceSearchForm.resourceSupplier;
        return this.mockData.resourceSupplierList.filter(function (item) {
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.creditCode && item.creditCode.indexOf(sf.creditCode) === -1) return false;
          if (sf.type && item.type.indexOf(sf.type) === -1) return false;
          if (sf.rating && item.rating.indexOf(sf.rating) === -1) return false;
          return true;
        });
      },
      filteredResourceReagentList: function () {
        var sf = this.resourceSearchForm.resourceReagent;
        return this.mockData.resourceReagentList.filter(function (item) {
          if (sf.reagentNo && item.reagentNo.indexOf(sf.reagentNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.category && item.category.indexOf(sf.category) === -1) return false;
          if (sf.status && item.status.indexOf(sf.status) === -1) return false;
          return true;
        });
      },
      filteredResourceConsumableList: function () {
        var sf = this.resourceSearchForm.resourceConsumable;
        return this.mockData.resourceConsumableList.filter(function (item) {
          if (sf.itemNo && item.itemNo.indexOf(sf.itemNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.category && item.category.indexOf(sf.category) === -1) return false;
          return true;
        });
      },
      filteredResourceSolutionList: function () {
        var sf = this.resourceSearchForm.resourceSolution;
        return this.mockData.resourceSolutionList.filter(function (item) {
          if (sf.solNo && item.solNo.indexOf(sf.solNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.concRange && item.concentration.indexOf(sf.concRange) === -1) return false;
          if (sf.status && (item.status || '').indexOf(sf.status) === -1) return false;
          return true;
        });
      },
      filteredResourceHazardousList: function () {
        var sf = this.resourceSearchForm.resourceHazardous;
        return this.mockData.resourceHazardousList.filter(function (item) {
          if (sf.hazNo && item.hazNo.indexOf(sf.hazNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.level && item.level.indexOf(sf.level) === -1) return false;
          if (sf.status && item.status.indexOf(sf.status) === -1) return false;
          return true;
        });
      },
      filteredResourceBiologicalList: function () {
        var sf = this.resourceSearchForm.resourceBiological;
        return this.mockData.resourceBiologicalList.filter(function (item) {
          if (sf.bioNo && item.bioNo.indexOf(sf.bioNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.type && item.type.indexOf(sf.type) === -1) return false;
          if (sf.location && item.location.indexOf(sf.location) === -1) return false;
          return true;
        });
      },
      filteredResourceReferenceList: function () {
        var sf = this.resourceSearchForm.resourceReference;
        return this.mockData.resourceReferenceList.filter(function (item) {
          if (sf.refNo && item.refNo.indexOf(sf.refNo) === -1) return false;
          if (sf.name && item.name.indexOf(sf.name) === -1) return false;
          if (sf.grade && item.grade.indexOf(sf.grade) === -1) return false;
          if (sf.status && item.status.indexOf(sf.status) === -1) return false;
          return true;
        });
      },
      filteredResourcePurchaseList: function () {
        var sf = this.resourceSearchForm.resourcePurchase;
        return this.mockData.resourcePurchaseList.filter(function (item) {
          if (sf.purNo && item.purNo.indexOf(sf.purNo) === -1) return false;
          if (sf.applicant && item.applicant.indexOf(sf.applicant) === -1) return false;
          if (sf.purType && item.purType.indexOf(sf.purType) === -1) return false;
          if (sf.status && item.status.indexOf(sf.status) === -1) return false;
          return true;
        });
      },
      searchSchema: function () {
        if (this.activeTab === 'quality-review') return SEARCH[this.qualityReviewKey] || [];
        if (this.activeTab === 'quality-audit') return SEARCH[this.qualityAuditKey] || [];
        if (this.activeTab === 'quality-supervise') return SEARCH[this.qualitySuperviseKey] || [];
        if (this.activeTab === 'quality-control') return SEARCH[this.qualityControlKey] || [];
        if (this.activeTab === 'quality-proficiency') return SEARCH[this.qualityProficiencyKey] || [];
        if (this.activeTab === 'quality-complaint') return SEARCH[this.complaintKey] || [];
        if (this.activeTab === 'quality-corrective') return SEARCH[this.correctiveKey] || [];
        if (this.activeTab === 'organization') return SEARCH[this.orgKey] || [];
        if (this.activeTab === 'user-permission') return SEARCH[this.permKey] || [];
        if (this.activeTab === 'dictionary') return SEARCH[this.dictKey] || [];
        if (this.activeTab === 'number-rule') return SEARCH[this.numKey] || [];
        if (this.activeTab === 'process-config') return SEARCH[this.cfgKey] || [];
        if (this.activeTab === 'project-lib') return SEARCH[this.libKey] || [];
        if (this.activeTab === 'env-config') return SEARCH[this.envKey] || [];
        if (this.activeTab === 'system-settings') return SEARCH[this.setKey] || [];
        if (this.activeTab === 'ui-custom') return SEARCH[this.uiKey] || [];
        return SEARCH[this.activeTab] || [];
      },
      activeStats: function () {
        if (this.activeTab === 'quality-system-doc') {
          var sd = this.sysDocs || [];
          return [
            { label: '体系文件', value: sd.length, icon: 'fa-folder-tree', color: 'green' },
            { label: '受控文件', value: sd.filter(function (d) { return d.controlled === '受控'; }).length, icon: 'fa-lock', color: 'blue' },
            { label: '现行有效', value: sd.filter(function (d) { return d.status === '已发布'; }).length, icon: 'fa-circle-check', color: 'purple' },
            { label: '待审批', value: sd.filter(function (d) { return d.status === '待审批'; }).length, icon: 'fa-clock', color: 'orange' }
          ];
        }
        if (this.activeTab === 'quality-review') return statsOf(this.qualityReviewKey, this.pageData);
        if (this.activeTab === 'quality-audit') return statsOf(this.qualityAuditKey, this.pageData);
        if (this.activeTab === 'quality-supervise') return statsOf(this.qualitySuperviseKey, this.pageData);
        if (this.activeTab === 'quality-control') return statsOf(this.qualityControlKey, this.pageData);
        if (this.activeTab === 'quality-proficiency') return statsOf(this.qualityProficiencyKey, this.pageData);
        if (this.activeTab === 'quality-complaint') return statsOf(this.complaintKey, this.pageData);
        if (this.activeTab === 'quality-corrective') return statsOf(this.correctiveKey, this.pageData);
        if (this.activeTab === 'stat-business') return this.bizStats;
        if (this.activeTab === 'stat-quality') return this.qStats;
        if (this.activeTab === 'organization') return this.orgStats;
        if (this.activeTab === 'user-permission') return this.permStats;
        if (this.activeTab === 'dictionary') return this.dictStats;
        if (this.activeTab === 'number-rule') return this.numStats;
        if (this.activeTab === 'process-config') return this.cfgStats;
        if (this.activeTab === 'project-lib') return this.libStats;
        if (this.activeTab === 'env-config') return this.envStats;
        if (this.activeTab === 'system-settings') return this.setStats;
        if (this.activeTab === 'ui-custom') return this.uiStats;
        return statsOf(this.activeTab, this.pageData);
      },
      orgStats: function () {
        var map = {
          dept: [
            { label: '机构总数', value: 11, icon: 'fa-building-columns', color: 'green' },
            { label: '检测实验室', value: 6, icon: 'fa-flask-vial', color: 'blue' },
            { label: '管理部门', value: 2, icon: 'fa-users-gear', color: 'purple' },
            { label: '在用机构', value: 10, icon: 'fa-circle-check', color: 'orange' }
          ],
          position: [
            { label: '岗位总数', value: 8, icon: 'fa-briefcase', color: 'blue' },
            { label: '关键岗位', value: 3, icon: 'fa-shield-halved', color: 'red' },
            { label: '技术岗位', value: 3, icon: 'fa-microscope', color: 'green' },
            { label: '编制数', value: 26, icon: 'fa-hashtag', color: 'purple' }
          ],
          person: [
            { label: '在职人员', value: 8, icon: 'fa-users', color: 'green' },
            { label: '在编人员', value: 6, icon: 'fa-id-badge', color: 'blue' },
            { label: '聘用人员', value: 2, icon: 'fa-handshake', color: 'orange' },
            { label: '借调人员', value: 1, icon: 'fa-person-walking-arrow-right', color: 'purple' }
          ],
          holiday: [
            { label: '节假日总数', value: 8, icon: 'fa-calendar-days', color: 'purple' },
            { label: '法定假日', value: 7, icon: 'fa-flag', color: 'red' },
            { label: '调休安排', value: 3, icon: 'fa-arrows-rotate', color: 'orange' },
            { label: '带薪休假', value: 1, icon: 'fa-umbrella-beach', color: 'green' }
          ],
          workcal: [
            { label: '年度工作日', value: 268, icon: 'fa-calendar-check', color: 'green' },
            { label: '休息日', value: 97, icon: 'fa-calendar-minus', color: 'blue' },
            { label: '平均出勤率', value: '95.7%', icon: 'fa-gauge-high', color: 'purple' },
            { label: '已发布月份', value: 6, icon: 'fa-circle-check', color: 'orange' }
          ]
        };
        return map[this.orgTab] || [];
      },
      personDepts: function () {
        var seen = {};
        (this.pageData['system-org-person'] || []).forEach(function (p) { seen[p.dept] = 1; });
        return Object.keys(seen);
      },
      permStats: function () {
        var map = {
          user: [
            { label: '用户总数', value: 8, icon: 'fa-users', color: 'green' },
            { label: '正常账号', value: 6, icon: 'fa-circle-check', color: 'blue' },
            { label: '已禁用', value: 2, icon: 'fa-user-slash', color: 'red' },
            { label: '今日登录', value: 8, icon: 'fa-right-to-bracket', color: 'orange' }
          ],
          role: [
            { label: '角色总数', value: 6, icon: 'fa-user-shield', color: 'green' },
            { label: '启用角色', value: 5, icon: 'fa-circle-check', color: 'blue' },
            { label: '停用角色', value: 1, icon: 'fa-circle-minus', color: 'gray' },
            { label: '已分配用户', value: 9, icon: 'fa-user-group', color: 'orange' }
          ],
          config: [
            { label: '权限配置项', value: 9, icon: 'fa-key', color: 'green' },
            { label: '功能权限', value: 9, icon: 'fa-bars-progress', color: 'blue' },
            { label: '数据权限', value: 3, icon: 'fa-database', color: 'purple' },
            { label: '启用配置', value: 9, icon: 'fa-circle-check', color: 'orange' }
          ],
          oplog: [
            { label: '操作日志总数', value: 8, icon: 'fa-clipboard-list', color: 'green' },
            { label: '操作成功', value: 6, icon: 'fa-circle-check', color: 'blue' },
            { label: '操作失败', value: 2, icon: 'fa-circle-xmark', color: 'red' },
            { label: '今日操作', value: 3, icon: 'fa-bolt', color: 'orange' }
          ],
          login: [
            { label: '登录记录', value: 8, icon: 'fa-right-to-bracket', color: 'green' },
            { label: '登录成功', value: 7, icon: 'fa-circle-check', color: 'blue' },
            { label: '登录失败', value: 1, icon: 'fa-shield-halved', color: 'red' },
            { label: '最近登录', value: '09:12', icon: 'fa-clock', color: 'orange' }
          ]
        };
        return map[this.permTab] || [];
      },
      dictStats: function () {
        var map = {
          type: [
            { label: '字典总数', value: 6, icon: 'fa-book', color: 'green' },
            { label: '业务字典', value: 3, icon: 'fa-briefcase', color: 'blue' },
            { label: '基础字典', value: 2, icon: 'fa-layer-group', color: 'purple' },
            { label: '启用字典', value: 6, icon: 'fa-circle-check', color: 'orange' }
          ],
          char: [
            { label: '字符总数', value: 8, icon: 'fa-font', color: 'green' },
            { label: '报告术语', value: 3, icon: 'fa-file-lines', color: 'blue' },
            { label: '检测术语', value: 3, icon: 'fa-flask-vial', color: 'purple' },
            { label: '启用字符', value: 7, icon: 'fa-circle-check', color: 'orange' }
          ],
          enum: [
            { label: '枚举总数', value: 11, icon: 'fa-list', color: 'green' },
            { label: '样品状态', value: 5, icon: 'fa-flask-vial', color: 'blue' },
            { label: '报告状态', value: 3, icon: 'fa-file-signature', color: 'orange' },
            { label: '样品类型', value: 3, icon: 'fa-boxes-stacked', color: 'purple' }
          ]
        };
        return map[this.dictTab] || [];
      },
      numStats: function () {
        var self = this;
        function cards(key, names) {
          var rows = self.pageData[key] || [];
          var active = 0, stopped = 0, maxSeq = 0;
          rows.forEach(function (r) {
            if (r.status === '启用') active++;
            else if (r.status === '停用') stopped++;
            var n = Number(r.currentSeq);
            if (n > maxSeq) maxSeq = n;
          });
          return [
            { label: names[0], value: rows.length, icon: 'fa-hashtag', color: 'green' },
            { label: names[1], value: active, icon: 'fa-circle-check', color: 'blue' },
            { label: names[2], value: stopped, icon: 'fa-circle-minus', color: 'orange' },
            { label: names[3], value: maxSeq, icon: 'fa-arrow-trend-up', color: 'purple' }
          ];
        }
        var map = {
          report: cards('system-num-report', ['报告规则总数', '已启用规则', '已停用规则', '当前最大序号']),
          sample: cards('system-num-sample', ['样品规则总数', '已启用规则', '已停用规则', '当前最大序号']),
          task: cards('system-num-task', ['任务单规则总数', '已启用规则', '已停用规则', '当前最大序号']),
          other: cards('system-num-other', ['单据规则总数', '已启用规则', '已停用规则', '当前最大序号'])
        };
        return map[this.numTab] || [];
      },
      cfgStats: function () {
        var self = this;
        function flowCards(key, names) {
          var rows = self.pageData[key] || [];
          var must = 0, active = 0, maxTo = 0;
          rows.forEach(function (r) {
            if (r.must === '是') must++;
            if (r.status === '启用') active++;
            var n = Number(r.timeout);
            if (n > maxTo) maxTo = n;
          });
          return [
            { label: names[0], value: rows.length, icon: 'fa-diagram-project', color: 'green' },
            { label: names[1], value: must, icon: 'fa-circle-check', color: 'blue' },
            { label: names[2], value: active, icon: 'fa-check', color: 'orange' },
            { label: names[3], value: maxTo, icon: 'fa-clock', color: 'purple' }
          ];
        }
        function rowCards(key, names, matchKeys) {
          var rows = self.pageData[key] || [];
          var c2 = 0, c3 = 0, active = 0;
          rows.forEach(function (r) {
            if (Number(r.levels) === 2) c2++;
            else if (Number(r.levels) === 3) c3++;
            if (r.status === '启用') active++;
          });
          return [
            { label: names[0], value: rows.length, icon: 'fa-diagram-project', color: 'green' },
            { label: names[1], value: c2, icon: 'fa-sitemap', color: 'blue' },
            { label: names[2], value: c3, icon: 'fa-circle-check', color: 'orange' },
            { label: names[3], value: active, icon: 'fa-check', color: 'purple' }
          ];
        }
        function verCards(key, names) {
          var rows = self.pageData[key] || [];
          var pub = 0, draft = 0, stop = 0;
          rows.forEach(function (r) {
            if (r.status === '已发布') pub++;
            else if (r.status === '草稿') draft++;
            else if (r.status === '已停用') stop++;
          });
          return [
            { label: names[0], value: rows.length, icon: 'fa-diagram-project', color: 'green' },
            { label: names[1], value: pub, icon: 'fa-circle-check', color: 'blue' },
            { label: names[2], value: draft, icon: 'fa-file-pen', color: 'orange' },
            { label: names[3], value: stop, icon: 'fa-ban', color: 'purple' }
          ];
        }
        function lineCards(key, names) {
          var rows = self.pageData[key] || [];
          var mol = 0, seq = 0, active = 0;
          rows.forEach(function (r) {
            if (r.dept === '分子检测科') mol++;
            else if (r.dept === '基因测序科') seq++;
            if (r.status === '启用') active++;
          });
          return [
            { label: names[0], value: rows.length, icon: 'fa-diagram-project', color: 'green' },
            { label: names[1], value: mol, icon: 'fa-flask-vial', color: 'blue' },
            { label: names[2], value: seq, icon: 'fa-dna', color: 'orange' },
            { label: names[3], value: active, icon: 'fa-circle-check', color: 'purple' }
          ];
        }
        var map = {
          flow: flowCards('system-cfg-flow', ['流程节点总数', '必经节点', '启用节点', '最大超时小时']),
          line: lineCards('system-cfg-line', ['生产线总数', '分子检测科', '基因测序科', '启用产线']),
          approve: rowCards('system-cfg-approve', ['审批流程总数', '二级审批', '三级审批', '启用流程']),
          version: verCards('system-cfg-version', ['版本总数', '已发布', '草稿', '已停用'])
        };
        return map[this.cfgTab] || [];
      },
      /* 组织机构 · 节假日年度日历（12 个月格子，含节日标记） */
      orgCalendar: function () {
        var rows = this.pageData['system-org-holiday'] || [];
        var map = {};
        rows.forEach(function (r) { if (r.date) map[r.date] = r; });
        var months = [];
        var names = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        for (var m = 0; m < 12; m++) {
          var mm = (m + 1) < 10 ? '0' + (m + 1) : String(m + 1);
          var offset = new Date(2026, m, 1).getDay();
          var daysIn = new Date(2026, m + 1, 0).getDate();
          var cells = [];
          var items = [];
          for (var i = 0; i < offset; i++) cells.push({ blank: true });
          for (var d = 1; d <= daysIn; d++) {
            var ds = '2026-' + mm + '-' + (d < 10 ? '0' + d : d);
            var h = map[ds] || null;
            if (h) items.push(h);
            cells.push({ blank: false, d: d, holiday: h, row: h });
          }
          while (cells.length % 7 !== 0) cells.push({ blank: true });
          months.push({ key: '2026-' + mm, label: names[m], cells: cells, items: items, count: items.length });
        }
        return months;
      },
      /* 组织机构 · 人员按部门分组 */
      orgPersonGroups: function () {
        var rows = this.filteredRows;
        if (this.activeTab !== 'organization') return [];
        var map = {};
        var order = [];
        rows.forEach(function (r) {
          var d = r.dept || '未分配';
          if (!map[d]) { map[d] = []; order.push(d); }
          map[d].push(r);
        });
        return order.map(function (d) { return { dept: d, list: map[d] }; });
      },
      qStats: function () {
        var map = {
          qc: [
            { label: '质控合格率', value: '98.6%', icon: 'fa-bullseye', color: 'green' },
            { label: '质控项目', value: 42, icon: 'fa-flask-vial', color: 'blue' },
            { label: '失控处理', value: 6, icon: 'fa-triangle-exclamation', color: 'orange' },
            { label: '质控评价覆盖率', value: '100%', icon: 'fa-ranking-star', color: 'purple' }
          ],
          pf: [
            { label: '参加能力验证', value: 12, icon: 'fa-medal', color: 'green' },
            { label: '满意结果', value: 11, icon: 'fa-thumbs-up', color: 'blue' },
            { label: '可疑结果', value: 1, icon: 'fa-question', color: 'orange' },
            { label: '满意率', value: '91.7%', icon: 'fa-ranking-star', color: 'purple' }
          ],
          nc: [
            { label: '不符合项总数', value: 18, icon: 'fa-circle-exclamation', color: 'red' },
            { label: '已整改', value: 16, icon: 'fa-circle-check', color: 'green' },
            { label: '整改完成率', value: '88.9%', icon: 'fa-check-to-slot', color: 'blue' },
            { label: '验证关闭', value: 15, icon: 'fa-lock', color: 'purple' }
          ],
          complaint: [
            { label: '投诉总数', value: 8, icon: 'fa-comment-dots', color: 'orange' },
            { label: '已处理', value: 7, icon: 'fa-circle-check', color: 'green' },
            { label: '处理及时率', value: '87.5%', icon: 'fa-bolt', color: 'blue' },
            { label: '客户满意度', value: '98%', icon: 'fa-face-smile', color: 'purple' }
          ],
          rectify: [
            { label: '整改任务', value: 22, icon: 'fa-list-check', color: 'blue' },
            { label: '已完成', value: 18, icon: 'fa-circle-check', color: 'green' },
            { label: '完成率', value: '81.8%', icon: 'fa-check-to-slot', color: 'purple' },
            { label: '超期未完成', value: 2, icon: 'fa-hourglass-half', color: 'red' }
          ]
        };
        return map[this.qStatTab] || [];
      },
      bizStats: function () {
        var map = {
          volume: [
            { label: '年委托量', value: 186, icon: 'fa-handshake', color: 'green' },
            { label: '年报告量', value: 172, icon: 'fa-file-lines', color: 'blue' },
            { label: '年营收(万元)', value: 156.8, icon: 'fa-coins', color: 'purple' },
            { label: '检测项目', value: 42, icon: 'fa-flask-vial', color: 'orange' }
          ],
          customer: [
            { label: '客户总数', value: 126, icon: 'fa-users', color: 'green' },
            { label: '本月新增', value: 9, icon: 'fa-user-plus', color: 'blue' },
            { label: '活跃客户', value: 68, icon: 'fa-user-check', color: 'purple' },
            { label: '合作机构', value: 14, icon: 'fa-building', color: 'orange' }
          ],
          sample: [
            { label: '样品总数', value: 1280, icon: 'fa-boxes-stacked', color: 'green' },
            { label: '本月接收', value: 132, icon: 'fa-box-open', color: 'blue' },
            { label: '样品类型', value: 6, icon: 'fa-layer-group', color: 'purple' },
            { label: '平均周转(天)', value: 4.2, icon: 'fa-rotate', color: 'orange' }
          ],
          cycle: [
            { label: '平均周期(天)', value: 5.8, icon: 'fa-stopwatch', color: 'green' },
            { label: '标准周期(天)', value: 6.5, icon: 'fa-flag-checkered', color: 'blue' },
            { label: '超时率', value: '3.2%', icon: 'fa-triangle-exclamation', color: 'red' },
            { label: '周期达标率', value: '96.8%', icon: 'fa-bullseye', color: 'purple' }
          ],
          report: [
            { label: '报告总数', value: 172, icon: 'fa-file-circle-check', color: 'green' },
            { label: '本月报告', value: 18, icon: 'fa-file-pen', color: 'blue' },
            { label: '返工率', value: '4.5%', icon: 'fa-rotate-left', color: 'orange' },
            { label: '电子报告率', value: '98%', icon: 'fa-desktop', color: 'purple' }
          ],
          fee: [
            { label: '收费金额(万元)', value: 156.8, icon: 'fa-sack-dollar', color: 'green' },
            { label: '欠费金额(万元)', value: 12.6, icon: 'fa-hourglass-half', color: 'orange' },
            { label: '欠费比例', value: '8.0%', icon: 'fa-percent', color: 'red' },
            { label: '回款率', value: '92%', icon: 'fa-circle-check', color: 'blue' }
          ]
        };
        return map[this.bizTab] || [];
      },
      qualityReviewKey: function () {
        var map = { planMgmt: 'quality-review-plan-mgmt', plan: 'quality-review', planExec: 'quality-review-plan-exec', input: 'quality-review-input', meeting: 'quality-review-meeting', report: 'quality-review-report', rectify: 'quality-review-rectify' };
        return map[this.qrTab] || 'quality-review-plan-mgmt';
      },
      qualityAuditKey: function () {
        var map = {
          clause: 'quality-audit-clause-' + this.qaClauseMode,
          year: 'quality-audit-year', plan: 'quality-audit-plan', meeting: 'quality-audit-meeting',
          checklist: 'quality-audit-checklist', nc: 'quality-audit-nc', rectify: 'quality-audit-rectify',
          report: 'quality-audit-report'
        };
        return map[this.qaTab] || 'quality-audit';
      },
      qualitySuperviseKey: function () {
        var map = {
          plan: 'quality-supervise-plan-' + this.qsPlanMode,
          task: 'quality-supervise-task', record: 'quality-supervise-record', eval: 'quality-supervise-eval',
          audit: 'quality-supervise-audit', upload: 'quality-supervise-upload', stat: 'quality-supervise-stat'
        };
        return map[this.qsTab] || 'quality-supervise';
      },
      qualityControlKey: function () {
        var map = {
          plan: 'quality-control-plan-' + this.qcPlanMode,
          task: 'quality-control-task', data: 'quality-control-data', eval: 'quality-control-eval',
          audit: 'quality-control-audit', nc: 'quality-control-nc', stat: 'quality-control-stat'
        };
        return map[this.qcTab] || 'quality-control';
      },
      qualityProficiencyKey: function () {
        var map = {
          plan: 'quality-proficiency-plan-' + this.pfPlanMode,
          signup: 'quality-proficiency-signup', record: 'quality-proficiency-record', review: 'quality-proficiency-review',
          audit: 'quality-proficiency-audit', stat: 'quality-proficiency-stat', rectify: 'quality-proficiency-rectify'
        };
        return map[this.pfTab] || 'quality-proficiency';
      },
      queryTabName: function () {
        var tabs = this.queryTabs;
        for (var i = 0; i < tabs.length; i++) {
          if (tabs[i].key === this.queryTab) return tabs[i].name;
        }
        return '委托';
      },
      formPageTitle: function () {
        var m = { 'quality-review-plan-mgmt': '评审计划管理', 'quality-review-input': '收集任务', 'quality-review-meeting': '会议', 'quality-review-report': '报告', 'quality-review-rectify': '整改', 'quality-review-plan-exec': '计划执行任务',
          'quality-audit-clause-element': '要素审核条款', 'quality-audit-clause-dept': '部门审核条款', 'quality-audit-year': '年度计划',
          'quality-audit-plan': '实施计划', 'quality-audit-meeting': '会议', 'quality-audit-checklist': '检查表',
          'quality-audit-nc': '不符合项', 'quality-audit-rectify': '纠正措施', 'quality-audit-report': '内审报告',
          'quality-supervise-plan-periodic': '周期性计划', 'quality-supervise-plan-special': '专项监督计划',
          'quality-supervise-task': '监督任务', 'quality-supervise-record': '监督记录', 'quality-supervise-eval': '监督评价',
          'quality-supervise-audit': '监督审核', 'quality-supervise-stat': '监督结果统计', 'quality-supervise-upload': '上传资料',
          'quality-control-plan-internal': '室内质控计划', 'quality-control-plan-parallel': '平行样计划',
          'quality-control-plan-blank': '空白样计划', 'quality-control-plan-recovery': '加标回收计划',
          'quality-control-task': '质控任务', 'quality-control-data': '质控数据', 'quality-control-eval': '质控评价',
          'quality-control-audit': '质控审核', 'quality-control-nc': '失控处理', 'quality-control-stat': '质控统计',
          'quality-proficiency-plan-pt': 'PT计划', 'quality-proficiency-plan-compare': '比对计划',
          'quality-proficiency-signup': '验证报名', 'quality-proficiency-record': '验证记录',
          'quality-proficiency-review': '结果评审表', 'quality-proficiency-audit': '评审审核',
          'quality-proficiency-stat': '结果统计', 'quality-proficiency-rectify': '结果整改',
          'quality-system-doc': '体系文件',
          'quality-complaint-register': '投诉登记', 'quality-complaint-investigate': '投诉调查',
          'quality-complaint-handle': '投诉处理', 'quality-complaint-feedback': '投诉反馈',
          'quality-complaint-stat': '投诉统计',
          'quality-corrective-apply': '整改申请', 'quality-corrective-analysis': '原因分析',
          'quality-corrective-measure': '纠正措施', 'quality-corrective-verify': '整改验证',
          'quality-corrective-audit': '整改审核', 'quality-corrective-ledger': '整改台账',
          'system-org-dept': '机构', 'system-org-position': '岗位', 'system-org-person': '人员',
          'system-org-holiday': '节假日', 'system-org-workcal': '工作日历',
          'system-dict-type': '字典类型', 'system-dict-char': '特殊字符', 'system-dict-enum': '枚举值',
          'system-perm-user': '用户', 'system-perm-role': '角色', 'system-perm-config': '权限配置',
          'system-perm-oplog': '操作日志', 'system-perm-login': '登录日志',
          'system-num-report': '报告编号规则', 'system-num-sample': '样品编号规则', 'system-num-task': '任务单编号规则', 'system-num-other': '其他单据编号规则',
          'system-cfg-flow': '流程节点', 'system-cfg-line': '生产线', 'system-cfg-approve': '审批流程', 'system-cfg-version': '流程版本',
          'system-lib-cat': '分类', 'system-lib-product': '产品（样品）', 'system-lib-project': '检验项目', 'system-lib-standard': '标准方法', 'system-lib-line': '生产线', 'system-lib-link': '关联配置',
          'system-env-mproj': '移动端项目', 'system-env-vessel': '采样容器', 'system-env-method': '保存方法', 'system-env-ster': '消毒方式', 'system-env-param': '现场参数',
          'system-set-param': '系统参数', 'system-set-notify': '消息通知', 'system-set-backup': '备份任务', 'system-set-archive': '归档策略', 'system-set-log': '系统日志', 'system-set-device': '仪器设备', 'system-set-pdf': 'PDF解析规则', 'system-set-protocol': '协议解析规则',
          'system-ui-form': '表单模板', 'system-ui-column': '列配置', 'system-ui-report': '报表样式', 'system-ui-query': '统计查询', 'system-ui-home': '首页布局' };
        if (m[this.formPage]) return m[this.formPage];
        return (PAGE_NAME[this.formPage] || '记录');
      },
      pageKind: function () {
        if (this.activeTab === 'workbench') return 'home';
        if (this.activeTab === 'stat-query') return 'stat-query';
        if (this.activeTab === 'quality-review') return 'quality-review';
        if (this.activeTab === 'quality-audit') return 'audit';
        if (this.activeTab === 'quality-supervise') return 'supervise';
        if (this.activeTab === 'quality-control') return 'qc';
        if (this.activeTab === 'quality-proficiency') return 'pf';
        if (this.activeTab === 'quality-system-doc') return 'sysdoc';
        if (this.activeTab === 'knowledge-center') return 'knowledge';
        if (this.activeTab === 'quality-complaint') return 'complaint';
        if (this.activeTab === 'quality-corrective') return 'corrective';
        if (this.activeTab === 'organization') return 'org';
        if (this.activeTab === 'user-permission') return 'perm';
        if (this.activeTab === 'dictionary') return 'dict';
        if (this.activeTab === 'number-rule') return 'num';
        if (this.activeTab === 'process-config') return 'cfg';
        if (this.activeTab === 'project-lib') return 'lib';
        if (this.activeTab === 'env-config') return 'env';
        if (this.activeTab === 'system-settings') return 'set';
        if (this.activeTab === 'ui-custom') return 'ui';
        if ((this.activeTab || '').indexOf('resource') === 0) return 'resource';
        if ((this.activeTab || '').indexOf('stat-') === 0) return 'stat';
        if (this.builtPages.indexOf(this.activeTab) > -1) return 'plain';
        return 'empty';
      },
      currentTabs: function () {
        if (this.activeTab === 'research-result') {
          return [{ k: 'all', n: '全部' }].concat(this.resultTabs);
        }
        var map = {
          'research-project': [ { k: 'all', n: '全部' }, { k: 'run', n: '在研' }, { k: 'done', n: '已结题' } ],
          'research-experiment': [ { k: 'all', n: '全部' }, { k: 'sample', n: '科研样品' }, { k: 'seq', n: '测序项目' }, { k: 'template', n: '实验模板' } ],
          'quality-control': [ { k: 'plan', n: '室内质控' }, { k: 'task', n: '室间质控' }, { k: 'data', n: '全部' } ]
        };
        return map[this.activeTab] || [];
      },
      currentTabKey: function () {
        var m = { 'research-project': this.rTab, 'research-experiment': this.reTab, 'research-result': this.rResultTab, 'quality-control': this.qcTab };
        return m[this.activeTab] || '';
      },
      qrAddLabel: function () {
        var m = { planMgmt: '新增计划', plan: '新增评审计划', planExec: '新增执行任务', input: '新增收集任务', meeting: '新增会议', report: '新增报告', rectify: '新增整改' };
        return m[this.qrTab] || '新增计划';
      },
      qaAddLabel: function () {
        var m = { clause: '新增条款', year: '新增年度计划', plan: '新增实施计划', meeting: '新增会议', checklist: '新增检查表', nc: '新增不符合项', rectify: '新增纠正措施', report: '新增内审报告' };
        return m[this.qaTab] || '新增条款';
      },
      qsAddLabel: function () {
        var m = { plan: this.qsPlanMode === 'periodic' ? '新增周期计划' : '新增专项计划', task: '生成监督任务', record: '新增监督记录', eval: '新增监督评价', audit: '新增监督审核', upload: '上传资料', stat: '新增统计' };
        return m[this.qsTab] || '新增计划';
      },
      qcAddLabel: function () {
        var m = { plan: { internal: '新增室内质控计划', parallel: '新增平行样计划', blank: '新增空白样计划', recovery: '新增加标回收计划' }[this.qcPlanMode], task: '生成质控任务', data: '录入质控数据', eval: '新增质控评价', audit: '新增质控审核', nc: '新增失控处理', stat: '新增统计' };
        return m[this.qcTab] || '新增计划';
      },
      pfAddLabel: function () {
        var m = { plan: this.pfPlanMode === 'pt' ? '新增PT计划' : '新增比对计划', signup: '新增报名', record: '新增记录', review: '新增评审表', audit: '新增评审审核', stat: '新增统计', rectify: '新增整改' };
        return m[this.pfTab] || '新增计划';
      },
      complaintKey: function () {
        var map = {
          register: 'quality-complaint-register', investigate: 'quality-complaint-investigate',
          handle: 'quality-complaint-handle', feedback: 'quality-complaint-feedback', stat: 'quality-complaint-stat'
        };
        return map[this.complaintTab] || 'quality-complaint';
      },
      complaintAddLabel: function () {
        var m = { register: '新增登记', investigate: '新增调查', handle: '新增处理', feedback: '新增反馈', stat: '新增统计' };
        return m[this.complaintTab] || '新增记录';
      },
      correctiveKey: function () {
        var map = {
          apply: 'quality-corrective-apply', analysis: 'quality-corrective-analysis',
          measure: 'quality-corrective-measure', verify: 'quality-corrective-verify',
          audit: 'quality-corrective-audit', ledger: 'quality-corrective-ledger'
        };
        return map[this.correctiveTab] || 'quality-corrective';
      },
      correctiveAddLabel: function () {
        var m = { apply: '新增申请', analysis: '新增分析', measure: '新增措施', verify: '新增验证', audit: '新增审核', ledger: '新增台账' };
        return m[this.correctiveTab] || '新增记录';
      },
      orgKey: function () {
        var map = {
          dept: 'system-org-dept', position: 'system-org-position',
          person: 'system-org-person', holiday: 'system-org-holiday', workcal: 'system-org-workcal'
        };
        return map[this.orgTab] || 'system-org-dept';
      },
      orgAddLabel: function () {
        var m = { dept: '新增机构', position: '新增岗位', person: '新增人员', holiday: '新增节假日', workcal: '新增月历' };
        return m[this.orgTab] || '新增记录';
      },
      permKey: function () {
        var map = {
          user: 'system-perm-user', role: 'system-perm-role', config: 'system-perm-config',
          oplog: 'system-perm-oplog', login: 'system-perm-login'
        };
        return map[this.permTab] || 'system-perm-user';
      },
      permAddLabel: function () {
        var m = { user: '新增用户', role: '新增角色', config: '新增权限项', oplog: '新增操作记录', login: '新增登录记录' };
        return m[this.permTab] || '新增记录';
      },
      dictKey: function () {
        var map = { type: 'system-dict-type', char: 'system-dict-char', enum: 'system-dict-enum' };
        return map[this.dictTab] || 'system-dict-type';
      },
      dictAddLabel: function () {
        var m = { type: '新增字典类型', char: '新增字符', enum: '新增枚举值' };
        return m[this.dictTab] || '新增记录';
      },
      numKey: function () {
        var map = { report: 'system-num-report', sample: 'system-num-sample', task: 'system-num-task', other: 'system-num-other' };
        return map[this.numTab] || 'system-num-report';
      },
      numAddLabel: function () {
        var m = { report: '新增报告编号规则', sample: '新增样品编号规则', task: '新增任务单编号规则', other: '新增其他单据编号规则' };
        return m[this.numTab] || '新增记录';
      },
      cfgKey: function () {
        var map = { flow: 'system-cfg-flow', line: 'system-cfg-line', approve: 'system-cfg-approve', version: 'system-cfg-version' };
        return map[this.cfgTab] || 'system-cfg-flow';
      },
      cfgAddLabel: function () {
        var m = { flow: '新增节点', line: '新增生产线', approve: '新增审批流程', version: '新增流程版本' };
        return m[this.cfgTab] || '新增记录';
      },
      cfgLineGroups: function () {
        var order = ['分子检测科', '免疫检测科', '病理科', '基因测序科'];
        var map = {};
        (this.pageData['system-cfg-line'] || []).forEach(function (r) { (map[r.dept] = map[r.dept] || []).push(r); });
        var out = [];
        order.forEach(function (c) { if (map[c]) out.push({ dept: c, list: map[c] }); });
        Object.keys(map).forEach(function (c) { if (out.filter(function (o) { return o.dept === c; }).length === 0) out.push({ dept: c, list: map[c] }); });
        return out;
      },
      libKey: function () {
        var map = { cat: 'system-lib-cat', product: 'system-lib-product', project: 'system-lib-project', standard: 'system-lib-standard', line: 'system-lib-line', link: 'system-lib-link' };
        return map[this.libTab] || 'system-lib-cat';
      },
      libAddLabel: function () {
        var m = { cat: '新增分类', product: '新增产品（样品）', project: '新增检验项目', standard: '新增标准方法', line: '新增生产线', link: '新增关联' };
        return m[this.libTab] || '新增记录';
      },
      libStats: function () {
        var sumOf = function (key, field) {
          return (this.pageData[key] || []).reduce(function (s, r) { return s + (Number(r[field]) || 0); }, 0);
        }.bind(this);
        var dist = function (key, value, field) {
          if (value === undefined) return (this.pageData[key] || []).length;
          return (this.pageData[key] || []).filter(function (r) { return (field ? r[field] : r.status) === value; }).length;
        }.bind(this);
        var sectors = {};
        (this.pageData['system-lib-link'] || []).forEach(function (r) { sectors[r.standard] = true; });
        var linkStd = Object.keys(sectors).length;
        var map = {
          cat: [
            { label: '分类总数', value: dist('system-lib-cat'), icon: 'fa-folder-tree', color: 'green' },
            { label: '一级分类', value: dist('system-lib-cat', '一级', 'level'), icon: 'fa-folder-open', color: 'blue' },
            { label: '二级分类', value: dist('system-lib-cat', '二级', 'level'), icon: 'fa-layer-group', color: 'purple' },
            { label: '启用分类', value: dist('system-lib-cat', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          product: [
            { label: '产品总数', value: dist('system-lib-product'), icon: 'fa-box', color: 'green' },
            { label: '鲜切花', value: dist('system-lib-product', '鲜切花', 'cat'), icon: 'fa-seedling', color: 'blue' },
            { label: '盆花', value: dist('system-lib-product', '盆花', 'cat'), icon: 'fa-fan', color: 'purple' },
            { label: '启用产品', value: dist('system-lib-product', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          project: [
            { label: '项目总数', value: dist('system-lib-project'), icon: 'fa-flask-vial', color: 'green' },
            { label: '分子检测', value: dist('system-lib-project', '分子检测', 'cat'), icon: 'fa-dna', color: 'blue' },
            { label: '基因测序', value: dist('system-lib-project', '基因测序', 'cat'), icon: 'fa-biohazard', color: 'purple' },
            { label: '启用项目', value: dist('system-lib-project', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          standard: [
            { label: '标准总数', value: dist('system-lib-standard'), icon: 'fa-book', color: 'green' },
            { label: 'GB/T', value: dist('system-lib-standard', 'GB/T', 'agency'), icon: 'fa-shield-halved', color: 'blue' },
            { label: 'ISO', value: dist('system-lib-standard', 'ISO', 'agency'), icon: 'fa-globe', color: 'purple' },
            { label: '在用', value: dist('system-lib-standard', '在用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          line: [
            { label: '产线总数', value: dist('system-lib-line'), icon: 'fa-industry', color: 'green' },
            { label: '在产', value: dist('system-lib-line', '启用'), icon: 'fa-play', color: 'blue' },
            { label: '涉及项目', value: sumOf('system-lib-line', 'projectCount'), icon: 'fa-diagram-project', color: 'purple' },
            { label: '停用', value: dist('system-lib-line', '停用'), icon: 'fa-circle-xmark', color: 'gray' }
          ],
          link: [
            { label: '关联总数', value: dist('system-lib-link'), icon: 'fa-link', color: 'green' },
            { label: '已关联', value: dist('system-lib-link', '已关联'), icon: 'fa-circle-check', color: 'blue' },
            { label: '未关联', value: dist('system-lib-link', '未关联'), icon: 'fa-circle-xmark', color: 'gray' },
            { label: '覆盖标准数', value: linkStd, icon: 'fa-book-open', color: 'orange' }
          ]
        };
        return map[this.libTab] || [];
      },
      envKey: function () {
        var map = { mproj: 'system-env-mproj', vessel: 'system-env-vessel', method: 'system-env-method', ster: 'system-env-ster', param: 'system-env-param' };
        return map[this.envTab] || 'system-env-mproj';
      },
      envAddLabel: function () {
        var m = { mproj: '新增移动端项目', vessel: '新增采样容器', method: '新增保存方法', ster: '新增消毒方式', param: '新增现场参数' };
        return m[this.envTab] || '新增记录';
      },
      envStats: function () {
        var dist = function (key, value, field) {
          if (value === undefined) return (this.pageData[key] || []).length;
          return (this.pageData[key] || []).filter(function (r) { return (field ? r[field] : r.status) === value; }).length;
        }.bind(this);
        var map = {
          mproj: [
            { label: '移动端项目数', value: dist('system-env-mproj'), icon: 'fa-mobile-screen', color: 'green' },
            { label: '嗅探检测', value: dist('system-env-mproj', '嗅探检测', 'cat'), icon: 'fa-wind', color: 'blue' },
            { label: '直读检测', value: dist('system-env-mproj', '直读检测', 'cat'), icon: 'fa-gauge', color: 'purple' },
            { label: '启用项目', value: dist('system-env-mproj', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          vessel: [
            { label: '容器总数', value: dist('system-env-vessel'), icon: 'fa-prescription-bottle', color: 'green' },
            { label: '塑料容器', value: dist('system-env-vessel', '塑料', 'material'), icon: 'fa-bottle-water', color: 'blue' },
            { label: '玻璃容器', value: dist('system-env-vessel', '玻璃', 'material'), icon: 'fa-flask', color: 'purple' },
            { label: '可关联项目', value: 38, icon: 'fa-link', color: 'orange' }
          ],
          method: [
            { label: '保存方法数', value: dist('system-env-method'), icon: 'fa-warehouse', color: 'green' },
            { label: '冷藏', value: dist('system-env-method', '冷藏', 'cat'), icon: 'fa-snowflake', color: 'blue' },
            { label: '冷冻', value: dist('system-env-method', '冷冻', 'cat'), icon: 'fa-icicles', color: 'purple' },
            { label: '启用', value: dist('system-env-method', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          ster: [
            { label: '消毒方式数', value: dist('system-env-ster'), icon: 'fa-spray-can', color: 'green' },
            { label: '化学消毒', value: 3, icon: 'fa-flask-vial', color: 'blue' },
            { label: '物理消毒', value: 2, icon: 'fa-radiation', color: 'purple' },
            { label: '启用', value: dist('system-env-ster', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          param: [
            { label: '现场参数总数', value: dist('system-env-param'), icon: 'fa-satellite-dish', color: 'green' },
            { label: '现场模式', value: dist('system-env-param', '现场', 'mode'), icon: 'fa-location-dot', color: 'blue' },
            { label: '双模式', value: dist('system-env-param', '双模式', 'mode'), icon: 'fa-arrows-rotate', color: 'purple' },
            { label: '启用', value: dist('system-env-param', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ]
        };
        return map[this.envTab] || [];
      },
      setKey: function () {
        var map = { param: 'system-set-param', notify: 'system-set-notify', backup: 'system-set-backup', archive: 'system-set-archive', log: 'system-set-log', device: 'system-set-device', pdf: 'system-set-pdf', protocol: 'system-set-protocol' };
        return map[this.setTab] || 'system-set-param';
      },
      enabledPdfRules: function () {
        return (this.pageData['system-set-pdf'] || []).filter(function (r) { return r.status === '启用'; });
      },
      setAddLabel: function () {
        var m = { param: '新增系统参数', notify: '新增通知模板', backup: '新增备份任务', archive: '新增归档策略', log: '新增日志记录', device: '新增仪器设备', pdf: '新增PDF解析规则', protocol: '新增协议解析规则' };
        return m[this.setTab] || '新增记录';
      },
      setStats: function () {
        var dist = function (key, value, field) {
          if (value === undefined) return (this.pageData[key] || []).length;
          return (this.pageData[key] || []).filter(function (r) { return (field ? r[field] : r.status) === value; }).length;
        }.bind(this);
        var map = {
          param: [
            { label: '参数总数', value: dist('system-set-param'), icon: 'fa-sliders', color: 'green' },
            { label: '系统参数', value: dist('system-set-param', '系统参数', 'category'), icon: 'fa-gear', color: 'blue' },
            { label: '安全参数', value: dist('system-set-param', '安全参数', 'category'), icon: 'fa-shield-halved', color: 'purple' },
            { label: '启用', value: dist('system-set-param', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          notify: [
            { label: '通知模板数', value: dist('system-set-notify'), icon: 'fa-bell', color: 'green' },
            { label: '站内信', value: dist('system-set-notify', '站内信', 'channel'), icon: 'fa-envelope', color: 'blue' },
            { label: '短信通知', value: dist('system-set-notify', '短信', 'channel'), icon: 'fa-message', color: 'purple' },
            { label: '启用', value: dist('system-set-notify', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          backup: [
            { label: '备份任务数', value: dist('system-set-backup'), icon: 'fa-database', color: 'green' },
            { label: '全量备份', value: dist('system-set-backup', '全量备份', 'type'), icon: 'fa-box-archive', color: 'blue' },
            { label: '增量备份', value: dist('system-set-backup', '增量备份', 'type'), icon: 'fa-layer-group', color: 'purple' },
            { label: '启用', value: dist('system-set-backup', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          archive: [
            { label: '归档策略数', value: dist('system-set-archive'), icon: 'fa-box-archive', color: 'green' },
            { label: '永久保留', value: dist('system-set-archive', '永久', 'retention'), icon: 'fa-infinity', color: 'blue' },
            { label: '5年保留', value: dist('system-set-archive', '5年', 'retention'), icon: 'fa-clock-rotate-left', color: 'purple' },
            { label: '启用', value: dist('system-set-archive', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          log: [
            { label: '日志总数', value: dist('system-set-log'), icon: 'fa-file-lines', color: 'green' },
            { label: '操作日志', value: dist('system-set-log', '操作日志', 'type'), icon: 'fa-pen-to-square', color: 'blue' },
            { label: '异常日志', value: dist('system-set-log', '异常日志', 'type'), icon: 'fa-triangle-exclamation', color: 'red' },
            { label: '安全日志', value: dist('system-set-log', '安全日志', 'type'), icon: 'fa-shield-halved', color: 'purple' }
          ],
          device: [
            { label: '设备总数', value: dist('system-set-device'), icon: 'fa-microscope', color: 'green' },
            { label: '在线设备', value: dist('system-set-device', '在线', 'connectStatus'), icon: 'fa-circle-check', color: 'blue' },
            { label: '离线告警', value: dist('system-set-device', '离线', 'connectStatus') + dist('system-set-device', '告警', 'connectStatus'), icon: 'fa-triangle-exclamation', color: 'red' },
            { label: '启用', value: dist('system-set-device', '启用'), icon: 'fa-plug-circle-check', color: 'orange' }
          ],
          pdf: [
            { label: '解析规则数', value: dist('system-set-pdf'), icon: 'fa-file-pdf', color: 'green' },
            { label: '文本提取', value: dist('system-set-pdf', '文本提取', 'parseMode'), icon: 'fa-font', color: 'blue' },
            { label: '表格解析', value: dist('system-set-pdf', '表格解析', 'parseMode'), icon: 'fa-table', color: 'purple' },
            { label: '启用', value: dist('system-set-pdf', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          protocol: [
            { label: '协议规则数', value: dist('system-set-protocol'), icon: 'fa-handshake', color: 'green' },
            { label: 'ASTM协议', value: dist('system-set-protocol', 'ASTM', 'transport'), icon: 'fa-file-contract', color: 'blue' },
            { label: 'HL7协议', value: dist('system-set-protocol', 'HL7', 'transport'), icon: 'fa-database', color: 'purple' },
            { label: '启用', value: dist('system-set-protocol', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ]
        };
        return map[this.setTab] || [];
      },
      uiKey: function () {
        var map = { form: 'system-ui-form', column: 'system-ui-column', report: 'system-ui-report', query: 'system-ui-query', home: 'system-ui-home' };
        return map[this.uiTab] || 'system-ui-form';
      },
      uiAddLabel: function () {
        var m = { form: '新增表单模板', column: '新增列配置', report: '新增报表样式', query: '新增统计查询', home: '新增首页模块' };
        return m[this.uiTab] || '新增记录';
      },
      uiStats: function () {
        var dist = function (key, value, field) {
          if (value === undefined) return (this.pageData[key] || []).length;
          return (this.pageData[key] || []).filter(function (r) { return (field ? r[field] : r.status) === value; }).length;
        }.bind(this);
        var map = {
          form: [
            { label: '表单模板数', value: dist('system-ui-form'), icon: 'fa-file-lines', color: 'green' },
            { label: '委托单', value: dist('system-ui-form', '委托单', 'doc'), icon: 'fa-file-signature', color: 'blue' },
            { label: '抽样单', value: dist('system-ui-form', '抽样单', 'doc'), icon: 'fa-clipboard-list', color: 'purple' },
            { label: '启用', value: dist('system-ui-form', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          column: [
            { label: '列配置数', value: dist('system-ui-column'), icon: 'fa-table-columns', color: 'green' },
            { label: '业务模块', value: 6, icon: 'fa-briefcase', color: 'blue' },
            { label: '质量模块', value: 5, icon: 'fa-shield-halved', color: 'purple' },
            { label: '启用', value: dist('system-ui-column', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          report: [
            { label: '报表样式数', value: dist('system-ui-report'), icon: 'fa-print', color: 'green' },
            { label: '检测报告', value: dist('system-ui-report', '检测报告', 'type'), icon: 'fa-file-pdf', color: 'blue' },
            { label: '标签打印', value: dist('system-ui-report', '标签打印', 'type'), icon: 'fa-tags', color: 'purple' },
            { label: '启用', value: dist('system-ui-report', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          query: [
            { label: '查询配置数', value: dist('system-ui-query'), icon: 'fa-chart-simple', color: 'green' },
            { label: '统计图标', value: dist('system-ui-query', '统计图表', 'type'), icon: 'fa-chart-column', color: 'blue' },
            { label: '导出表格', value: dist('system-ui-query', '导出表格', 'type'), icon: 'fa-file-excel', color: 'purple' },
            { label: '启用', value: dist('system-ui-query', '启用'), icon: 'fa-circle-check', color: 'orange' }
          ],
          home: [
            { label: '首页模块数', value: dist('system-ui-home'), icon: 'fa-house', color: 'green' },
            { label: '已启用', value: dist('system-ui-home', '启用'), icon: 'fa-circle-check', color: 'blue' },
            { label: '快捷入口', value: dist('system-ui-home', '快捷入口', 'cat'), icon: 'fa-bolt', color: 'purple' },
            { label: '待启用', value: dist('system-ui-home', '停用'), icon: 'fa-circle-minus', color: 'orange' }
          ]
        };
        return map[this.uiTab] || [];
      },
      uiFieldPills: function () {
        var mod = (this.searchForm.module || '').trim();
        if (!mod) return [];
        var rec = (this.pageData['system-ui-column'] || []).filter(function (r) { return r.module === mod; })[0];
        return rec ? (rec.fields || []) : [];
      },
      uiReportSel: function () {
        var list = this.pageData['system-ui-report'] || [];
        for (var i = 0; i < list.length; i++) { if (list[i].code === this.selectedReport) return list[i]; }
        return list[0] || null;
      },
      uiReportFields: function () {
        var r = this.uiReportSel;
        return (r && Array.isArray(r.fields)) ? r.fields : [];
      },
      rptPrintCount: function () {
        return this.uiReportFields.filter(function (f) { return f.print; }).length;
      },
      rptPreviewStyle: function () {
        var r = this.uiReportSel;
        if (!r || !r.style) return {};
        var s = r.style;
        var land = s.orient === '横向';
        return {
          width: land ? '320px' : '240px',
          minHeight: land ? '180px' : '300px',
          padding: (s.margin || '10mm').replace('mm', 'px') || '10px',
          fontSize: (s.fontSize || '14').replace('px', '') + 'px',
          titleSize: (s.titleSize || '20').replace('px', '') + 'px'
        };
      },
      libProductGroups: function () {
        var order = ['鲜切花', '盆花', '种苗', '种球', '组培苗', '土壤', '水样'];
        var map = {};
        (this.pageData['system-lib-product'] || []).forEach(function (r) { (map[r.cat] = map[r.cat] || []).push(r); });
        var out = [];
        order.forEach(function (c) { if (map[c]) out.push({ cat: c, list: map[c] }); });
        Object.keys(map).forEach(function (c) { if (out.filter(function (o) { return o.cat === c; }).length === 0) out.push({ cat: c, list: map[c] }); });
        return out;
      },
      libProjectGroups: function () {
        var order = ['分子检测', '病理检测', '免疫检测', '基因测序'];
        var map = {};
        (this.pageData['system-lib-project'] || []).forEach(function (r) { (map[r.cat] = map[r.cat] || []).push(r); });
        var out = [];
        order.forEach(function (c) { if (map[c]) out.push({ cat: c, list: map[c] }); });
        Object.keys(map).forEach(function (c) { if (out.filter(function (o) { return o.cat === c; }).length === 0) out.push({ cat: c, list: map[c] }); });
        return out;
      },
      libProjectTree: function () {
        var catOrder = ['分子检测', '免疫检测', '病理检测', '基因测序'];
        var projects = this.pageData['system-lib-project'] || [];
        var catMap = {};
        projects.forEach(function (r) {
          var c = r.cat || '未分类';
          var s = r.subcat || '默认子类';
          if (!catMap[c]) catMap[c] = {};
          if (!catMap[c][s]) catMap[c][s] = [];
          catMap[c][s].push(r);
        });
        var out = [];
        catOrder.forEach(function (c) {
          if (catMap[c]) {
            var subs = Object.keys(catMap[c]).map(function (s) {
              return { name: s, list: catMap[c][s] };
            });
            out.push({ cat: c, children: subs });
          }
        });
        Object.keys(catMap).forEach(function (c) {
          if (out.filter(function (o) { return o.cat === c; }).length === 0) {
            var subs = Object.keys(catMap[c]).map(function (s) {
              return { name: s, list: catMap[c][s] };
            });
            out.push({ cat: c, children: subs });
          }
        });
        return out;
      },
      selectedProject: function () {
        var code = this.selectedProjectCode;
        if (!code) return null;
        var list = this.pageData['system-lib-project'] || [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].code === code) return list[i];
        }
        return null;
      },
      libSubcatOptions: function () {
        var cat = this.projCfgDraft && this.projCfgDraft.cat;
        if (!cat) return [];
        var projects = this.pageData['system-lib-project'] || [];
        var subs = [];
        projects.forEach(function (r) {
          if (r.cat === cat && subs.indexOf(r.subcat) === -1) subs.push(r.subcat);
        });
        return subs;
      },
      pagedDataCount: function (key, value, field) {
        var list = this.pageData[key] || [];
        if (!Array.isArray(list)) list = [];
        if (value === undefined) return list.length;
        return list.filter(function (r) {
          if (!field) return r.status === value;
          var v = r[field] !== undefined ? r[field] : r.status;
          return v === value;
        }).length;
      },
      activeGroupName: function () {
        var self = this;
        var name = '';
        this.menuData.forEach(function (g) {
          if (g.key === self.activeTab && !(g.children && g.children.length)) { name = g.name; return; }
          (g.children || []).forEach(function (c) { if (c.key === self.activeTab) name = g.name; });
        });
        return name;
      },
      curDocs: function () {
        var cat = this.currentCat;
        return this.knowledgeDocs.filter(function (d) { return d.category === cat; });
      },
      curSysDocs: function () {
        var self = this;
        var node = this.docTreeNode;
        var kw = (this.docSearch || '').trim().toLowerCase();
        return (this.sysDocs || []).filter(function (d) {
          if (node !== 'all') {
            if (node.indexOf('::') > -1) {
              var p = node.split('::');
              if (d.cat !== p[0] || d.sub !== p[1]) return false;
            } else if (d.cat !== node) return false;
          }
          if (kw) {
            var s = String((d.name || '') + (d.code || '') + (d.author || '')).toLowerCase();
            if (s.indexOf(kw) === -1) return false;
          }
          return true;
        });
      },
      filteredRows: function () {
        var page = this.activeTab;
        var rows = this.pageData[page] || [];
        if (page === 'stat-query') {
          rows = (this.pageData['stat-query-delegate'] || []).concat(this.pageData['stat-query-report'] || []).concat(this.pageData['stat-query-sample'] || []);
        }
        // 页签过滤
        if (page === 'quality-review') {
          page = this.qualityReviewKey;
          rows = this.pageData[page] || [];
        } else if (page === 'quality-audit') {
          page = this.qualityAuditKey;
          rows = this.pageData[page] || [];
        } else if (page === 'quality-supervise') {
          page = this.qualitySuperviseKey;
          rows = this.pageData[page] || [];
        } else if (page === 'quality-control') {
          page = this.qualityControlKey;
          rows = this.pageData[page] || [];
        } else if (page === 'quality-proficiency') {
          page = this.qualityProficiencyKey;
          rows = this.pageData[page] || [];
        } else if (page === 'quality-complaint') {
          page = this.complaintKey;
          rows = this.pageData[page] || [];
        } else if (page === 'quality-corrective') {
          page = this.correctiveKey;
          rows = this.pageData[page] || [];
        } else if (page === 'organization') {
          page = this.orgKey;
          rows = this.pageData[page] || [];
        } else if (page === 'user-permission') {
          page = this.permKey;
          rows = this.pageData[page] || [];
        } else if (page === 'dictionary') {
          page = this.dictKey;
          rows = this.pageData[page] || [];
        } else if (page === 'number-rule') {
          page = this.numKey;
          rows = this.pageData[page] || [];
        } else if (page === 'process-config') {
          page = this.cfgKey;
          rows = this.pageData[page] || [];
        } else if (page === 'project-lib') {
          page = this.libKey;
          rows = this.pageData[page] || [];
        } else if (page === 'env-config') {
          page = this.envKey;
          rows = this.pageData[page] || [];
        } else if (page === 'system-settings') {
          page = this.setKey;
          rows = this.pageData[page] || [];
        } else if (page === 'ui-custom') {
          page = this.uiKey;
          rows = this.pageData[page] || [];
        } else if (page === 'quality-system-doc') {
          rows = this.curSysDocs;
        } else {
          var tabMap = { 'research-project': this.rTab, 'research-experiment': this.reTab, 'research-result': this.rResultTab, 'quality-control': this.qcTab, 'stat-query': this.queryTab };
          if (tabMap[page]) rows = filterByTab(page, tabMap[page], rows);
        }
        // 搜索过滤
        var schema = SEARCH[page] || [];
        var form = this.searchForm;
        if (schema.length && Array.isArray(rows)) {
          rows = rows.filter(function (r) {
            var ok = true;
            schema.forEach(function (f) {
              var v = form[f.key];
              if (v) {
                var raw = r[f.key] === undefined ? r[f.label] : r[f.key];
                var rv = (raw === null || raw === undefined) ? '' : (typeof raw === 'object' ? JSON.stringify(raw) : String(raw)).toLowerCase();
                if (rv.indexOf(String(v).toLowerCase()) === -1) ok = false;
              }
            });
            return ok;
          });
        }
        return Array.isArray(rows) ? rows : [];
      },
      pagedRows: function () {
        var start = (this.pageIndex - 1) * this.pageSize;
        var fr = this.filteredRows;
        return Array.isArray(fr) ? fr.slice(start, start + this.pageSize) : [];
      },
      itemsByStatus: function () {
        var map = { todo: [], doing: [], done: [] };
        var list = this.pageData['quality-complaint'] || [];
        list.forEach(function (r) {
          if (r.status === '待处理') map.todo.push(r);
          else if (r.status === '处理中') map.doing.push(r);
          else map.done.push(r);
        });
        return map;
      },
      countByStatus: function () {
        var map = this.itemsByStatus;
        return { todo: map.todo.length, doing: map.doing.length, done: map.done.length };
      }
    },
    watch: {
      activeTab: function () {
        // 重置页索引与搜索
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.qcChartVisible = false;
        this.$nextTick(function () { renderPageCharts(); });
      },
      queryTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
      },
      qrTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      qaTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
      },
      qaClauseMode: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
      },
      qsTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
      },
      qsPlanMode: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
      },
      qcTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      qcPlanMode: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      pfTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      pfPlanMode: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      complaintTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      correctiveTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      orgTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      permTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      dictTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      numTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      cfgTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      libTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      envTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      setTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      uiTab: function () {
        this.pageIndex = 1;
        this.searchForm = {};
        this.moreOpen = null;
        this.$nextTick(function () { renderPageCharts(); });
      },
      bizTab: function () {
        this.$nextTick(function () { renderPageCharts(); });
      },
      bizPeriod: function () {
        this.$nextTick(function () { renderPageCharts(); });
      },
      sciTab: function () {
        this.$nextTick(function () { renderPageCharts(); });
      },
      qStatTab: function () {
        this.$nextTick(function () { renderPageCharts(); });
      }
    },
    mounted: function () {
      var self = this;
      setTimeout(function () { self.loading = false; }, 600);
      this.$nextTick(function () { renderPageCharts(); });
      // 初始停留在第一个已实现页面（科研项目）
      // 若当前页签不是已实现页面，则跳转到第一个已实现页面（此处保持 research-project）
      window.addEventListener('resize', function () {
        Object.keys(chartInstances).forEach(function (id) {
          var el = document.getElementById(id);
          if (el && chartInstances[id]) chartInstances[id].resize();
        });
      });
      // 处理看板分类列
      this.buildComplaintMap();
      this.baseRows = JSON.parse(JSON.stringify(this.pageData));
      // 表格多选框：表头全选 / 行勾选联动
      document.addEventListener('change', function (e) {
        var t = e.target;
        if (!t || !t.classList) return;
        var table = t.closest('table.data-table');
        if (!table) return;
        if (t.classList.contains('check-all')) {
          table.querySelectorAll('tbody input.row-check').forEach(function (r) { r.checked = t.checked; });
        } else if (t.classList.contains('row-check')) {
          self.syncRowCheck(table);
        }
      });
    },
    methods: {
      /* ----- 资源管理（从源项目 V4 搬运） ----- */
      closeMore: function () {
        this.moreOpen = null;
        this.moreActionsOpen = '';
        this.moreIdx = -1;
        this.moreType = '';
      },
      openResourcePersonAdd: function () { this.modalData.resourcePersonItem = {}; this.modals.resourcePersonAdd = true; },
      openResourcePersonEdit: function (row) { this.modalData.resourcePersonItem = JSON.parse(JSON.stringify(row)); this.modals.resourcePersonEdit = true; },
      openResourcePersonView: function (row) { this.modalData.resourcePersonItem = JSON.parse(JSON.stringify(row)); this.modals.resourcePersonView = true; },
      saveResourcePerson: function () { this.modals.resourcePersonAdd = false; this.modals.resourcePersonEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '人员信息已保存' }; },
      resourcePersonDelete: function (row) { this.modalData.resourcePersonItem = row; this.modals.resourcePersonDelete = true; },
      confirmResourcePersonDelete: function () {
        var idx = this.mockData.resourcePersonList.findIndex(function (x) { return x.id === this.modalData.resourcePersonItem.id; }.bind(this));
        if (idx > -1) this.mockData.resourcePersonList.splice(idx, 1);
        this.modals.resourcePersonDelete = false;
        this.modals.resourceOpResult = true;
        this.modalData.resourceOpResult = { title: '删除成功', message: '人员已删除' };
      },
      resourcePersonSearch: function () { this.pagination.resourcePerson.page = 1; },
      resourcePersonReset: function () { this.resourceSearchForm.resourcePerson = { name: '', empNo: '', dept: '', post: '', status: '' }; this.pagination.resourcePerson.page = 1; },
      resourcePersonBatchImport: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量导入', message: '请选择Excel文件进行人员批量导入' }; },
      openResourcePersonCert: function (row) { this.modalData.resourcePersonItem = JSON.parse(JSON.stringify(row)); this.modals.resourcePersonCert = true; },
      openResourcePersonTrain: function (row) { this.modalData.resourcePersonItem = JSON.parse(JSON.stringify(row)); this.modals.resourcePersonTrain = true; },
      openResourceEquipmentAdd: function () { this.modalData.resourceEquipmentItem = {}; this.modals.resourceEquipmentAdd = true; },
      openResourceEquipmentEdit: function (row) { this.modalData.resourceEquipmentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceEquipmentEdit = true; },
      openResourceEquipmentView: function (row) { this.modalData.resourceEquipmentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceEquipmentView = true; },
      saveResourceEquipment: function () { this.modals.resourceEquipmentAdd = false; this.modals.resourceEquipmentEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '设备信息已保存' }; },
      resourceEquipmentSearch: function () { this.pagination.resourceEquipment.page = 1; },
      resourceEquipmentReset: function () { this.resourceSearchForm.resourceEquipment = { equipNo: '', name: '', type: '', status: '', manufacturer: '' }; this.pagination.resourceEquipment.page = 1; },
      resourceEquipmentBatchCalibrate: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量校准', message: '已提交设备批量校准计划' }; },
      openResourceEquipmentCalibrate: function (row) { this.modalData.resourceEquipmentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceEquipmentCalibrate = true; },
      openResourceEquipmentUsage: function (row) { this.modalData.resourceEquipmentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceEquipmentUsage = true; },
      openResourceEquipmentQrcode: function (row) { this.modalData.resourceEquipmentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceEquipmentQrcode = true; },
      openResourceStandardAdd: function () { this.modalData.resourceStandardItem = {}; this.modals.resourceStandardAdd = true; },
      openResourceStandardEdit: function (row) { this.modalData.resourceStandardItem = JSON.parse(JSON.stringify(row)); this.modals.resourceStandardEdit = true; },
      openResourceStandardView: function (row) { this.modalData.resourceStandardItem = JSON.parse(JSON.stringify(row)); this.modals.resourceStandardView = true; },
      saveResourceStandard: function () { this.modals.resourceStandardAdd = false; this.modals.resourceStandardEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '标准信息已保存' }; },
      resourceStandardSearch: function () { this.pagination.resourceStandard.page = 1; },
      resourceStandardReset: function () { this.resourceSearchForm.resourceStandard = { stdNo: '', name: '', type: '', status: '' }; this.pagination.resourceStandard.page = 1; },
      resourceStandardBatchCheck: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量查新', message: '标准查新任务已提交，结果将通过系统消息通知' }; },
      openResourceStandardMethod: function (row) { this.modalData.resourceStandardItem = JSON.parse(JSON.stringify(row)); this.modals.resourceStandardMethod = true; },
      openResourceStandardProjects: function (row) { this.modalData.resourceStandardItem = JSON.parse(JSON.stringify(row)); this.modals.resourceStandardProjects = true; },
      openResourceSupplierAdd: function () { this.modalData.resourceSupplierItem = {}; this.modals.resourceSupplierAdd = true; },
      openResourceSupplierEdit: function (row) { this.modalData.resourceSupplierItem = JSON.parse(JSON.stringify(row)); this.modals.resourceSupplierEdit = true; },
      openResourceSupplierView: function (row) { this.modalData.resourceSupplierItem = JSON.parse(JSON.stringify(row)); this.modals.resourceSupplierView = true; },
      saveResourceSupplier: function () { this.modals.resourceSupplierAdd = false; this.modals.resourceSupplierEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '供应商信息已保存' }; },
      resourceSupplierSearch: function () { this.pagination.resourceSupplier.page = 1; },
      resourceSupplierReset: function () { this.resourceSearchForm.resourceSupplier = { name: '', creditCode: '', type: '', rating: '' }; this.pagination.resourceSupplier.page = 1; },
      resourceSupplierBatchReview: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量评审', message: '已创建供应商批量评审任务' }; },
      openResourceSupplierReview: function (row) { this.modalData.resourceSupplierItem = JSON.parse(JSON.stringify(row)); this.modals.resourceSupplierReview = true; },
      openResourceSupplierEvaluate: function (row) { this.modalData.resourceSupplierItem = JSON.parse(JSON.stringify(row)); this.modals.resourceSupplierEvaluate = true; },
      openResourceReagentAdd: function () { this.modalData.resourceReagentItem = {}; this.modals.resourceReagentAdd = true; },
      openResourceReagentEdit: function (row) { this.modalData.resourceReagentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReagentEdit = true; },
      openResourceReagentView: function (row) { this.modalData.resourceReagentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReagentView = true; },
      saveResourceReagent: function () { this.modals.resourceReagentAdd = false; this.modals.resourceReagentEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '试剂信息已保存' }; },
      resourceReagentSearch: function () { this.pagination.resourceReagent.page = 1; },
      resourceReagentReset: function () { this.resourceSearchForm.resourceReagent = { reagentNo: '', name: '', category: '', status: '' }; this.pagination.resourceReagent.page = 1; },
      resourceReagentBatchIn: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量入库', message: '请选择试剂进行批量入库操作' }; },
      openResourceReagentIn: function (row) { this.modalData.resourceReagentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReagentIn = true; },
      openResourceReagentOut: function (row) { this.modalData.resourceReagentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReagentOut = true; },
      openResourceReagentCheck: function (row) { this.modalData.resourceReagentItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReagentCheck = true; },
      saveResourceReagentIn: function () { this.modals.resourceReagentIn = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '入库成功', message: '试剂入库记录已保存' }; },
      saveResourceReagentOut: function () { this.modals.resourceReagentOut = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '出库成功', message: '试剂出库记录已保存' }; },
      openResourceConsumableAdd: function () { this.modalData.resourceConsumableItem = {}; this.modals.resourceConsumableAdd = true; },
      openResourceConsumableEdit: function (row) { this.modalData.resourceConsumableItem = JSON.parse(JSON.stringify(row)); this.modals.resourceConsumableEdit = true; },
      openResourceConsumableView: function (row) { this.modalData.resourceConsumableItem = JSON.parse(JSON.stringify(row)); this.modals.resourceConsumableView = true; },
      saveResourceConsumable: function () { this.modals.resourceConsumableAdd = false; this.modals.resourceConsumableEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '易耗品信息已保存' }; },
      resourceConsumableSearch: function () { this.pagination.resourceConsumable.page = 1; },
      resourceConsumableReset: function () { this.resourceSearchForm.resourceConsumable = { itemNo: '', name: '', category: '' }; this.pagination.resourceConsumable.page = 1; },
      resourceConsumableBatchOut: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量出库', message: '已提交易耗品批量出库申请' }; },
      openResourceConsumableRecord: function (row) { this.modalData.resourceConsumableItem = JSON.parse(JSON.stringify(row)); this.modals.resourceConsumableRecord = true; },
      openResourceConsumableStats: function (row) { this.modalData.resourceConsumableItem = JSON.parse(JSON.stringify(row)); this.modals.resourceConsumableStats = true; },
      openResourceSolutionAdd: function () { this.modalData.resourceSolutionItem = {}; this.modals.resourceSolutionAdd = true; },
      openResourceSolutionView: function (row) { this.modalData.resourceSolutionItem = JSON.parse(JSON.stringify(row)); this.modals.resourceSolutionView = true; },
      saveResourceSolution: function () { this.modals.resourceSolutionAdd = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '滴定溶液信息已保存' }; },
      resourceSolutionSearch: function () { this.pagination.resourceSolution.page = 1; },
      resourceSolutionReset: function () { this.resourceSearchForm.resourceSolution = { solNo: '', name: '', concRange: '', status: '' }; this.pagination.resourceSolution.page = 1; },
      resourceSolutionBatchAudit: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量标定审核', message: '标定记录审核已提交' }; },
      openResourceSolutionCalibrate: function (row) { this.modalData.resourceSolutionItem = JSON.parse(JSON.stringify(row)); this.modals.resourceSolutionCalibrate = true; },
      openResourceSolutionPrepare: function (row) { this.modalData.resourceSolutionItem = JSON.parse(JSON.stringify(row)); this.modals.resourceSolutionPrepare = true; },
      saveResourceSolutionCalibrate: function () { this.modals.resourceSolutionCalibrate = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '标定记录已保存', message: '溶液标定记录已保存' }; },
      openResourceHazardousAdd: function () { this.modalData.resourceHazardousItem = {}; this.modals.resourceHazardousAdd = true; },
      openResourceHazardousEdit: function (row) { this.modalData.resourceHazardousItem = JSON.parse(JSON.stringify(row)); this.modals.resourceHazardousEdit = true; },
      openResourceHazardousView: function (row) { this.modalData.resourceHazardousItem = JSON.parse(JSON.stringify(row)); this.modals.resourceHazardousView = true; },
      saveResourceHazardous: function () { this.modals.resourceHazardousAdd = false; this.modals.resourceHazardousEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '危化品信息已保存' }; },
      resourceHazardousSearch: function () { this.pagination.resourceHazardous.page = 1; },
      resourceHazardousReset: function () { this.resourceSearchForm.resourceHazardous = { hazNo: '', name: '', level: '', status: '' }; this.pagination.resourceHazardous.page = 1; },
      resourceHazardousBatchCheck: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量盘点', message: '危化品盘点任务已创建' }; },
      openResourceHazardousRecord: function (row) { this.modalData.resourceHazardousItem = JSON.parse(JSON.stringify(row)); this.modals.resourceHazardousRecord = true; },
      openResourceHazardousMsds: function (row) { this.modalData.resourceHazardousItem = JSON.parse(JSON.stringify(row)); this.modals.resourceHazardousMsds = true; },
      openResourceHazardousWaste: function (row) { this.modalData.resourceHazardousItem = JSON.parse(JSON.stringify(row)); this.modals.resourceHazardousWaste = true; },
      openResourceBiologicalAdd: function () { this.modalData.resourceBiologicalItem = {}; this.modals.resourceBiologicalAdd = true; },
      openResourceBiologicalEdit: function (row) { this.modalData.resourceBiologicalItem = JSON.parse(JSON.stringify(row)); this.modals.resourceBiologicalEdit = true; },
      openResourceBiologicalView: function (row) { this.modalData.resourceBiologicalItem = JSON.parse(JSON.stringify(row)); this.modals.resourceBiologicalView = true; },
      saveResourceBiological: function () { this.modals.resourceBiologicalAdd = false; this.modals.resourceBiologicalEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '生物试剂信息已保存' }; },
      resourceBiologicalSearch: function () { this.pagination.resourceBiological.page = 1; },
      resourceBiologicalReset: function () { this.resourceSearchForm.resourceBiological = { bioNo: '', name: '', type: '', location: '' }; this.pagination.resourceBiological.page = 1; },
      resourceBiologicalBatchPassage: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量传代', message: '生物试剂批量传代任务已创建' }; },
      openResourceBiologicalPassage: function (row) { this.modalData.resourceBiologicalItem = JSON.parse(JSON.stringify(row)); this.modals.resourceBiologicalPassage = true; },
      openResourceBiologicalStorage: function (row) { this.modalData.resourceBiologicalItem = JSON.parse(JSON.stringify(row)); this.modals.resourceBiologicalStorage = true; },
      openResourceReferenceAdd: function () { this.modalData.resourceReferenceItem = {}; this.modals.resourceReferenceAdd = true; },
      openResourceReferenceEdit: function (row) { this.modalData.resourceReferenceItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReferenceEdit = true; },
      openResourceReferenceView: function (row) { this.modalData.resourceReferenceItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReferenceView = true; },
      saveResourceReference: function () { this.modals.resourceReferenceAdd = false; this.modals.resourceReferenceEdit = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '标准物质信息已保存' }; },
      resourceReferenceSearch: function () { this.pagination.resourceReference.page = 1; },
      resourceReferenceReset: function () { this.resourceSearchForm.resourceReference = { refNo: '', name: '', grade: '', status: '' }; this.pagination.resourceReference.page = 1; },
      resourceReferenceBatchCheck: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量期间核查', message: '期间核查任务已下发' }; },
      openResourceReferenceIn: function (row) { this.modalData.resourceReferenceItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReferenceIn = true; },
      openResourceReferenceUse: function (row) { this.modalData.resourceReferenceItem = JSON.parse(JSON.stringify(row)); this.modalData.resourceReferenceUse = JSON.parse(JSON.stringify(row)); this.modals.resourceReferenceUse = true; },
      openResourceReferenceCheck: function (row) { this.modalData.resourceReferenceItem = JSON.parse(JSON.stringify(row)); this.modals.resourceReferenceCheck = true; },
      saveResourceReferenceIn: function () { this.modals.resourceReferenceIn = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '入库成功', message: '标准物质入库记录已保存' }; },
      saveResourceReferenceUse: function () { this.modals.resourceReferenceUse = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '领用成功', message: '标准物质领用记录已保存' }; },
      openResourcePurchaseAdd: function () { this.modalData.resourcePurchaseItem = {}; this.modals.resourcePurchaseAdd = true; },
      openResourcePurchaseView: function (row) { this.modalData.resourcePurchaseItem = JSON.parse(JSON.stringify(row)); this.modals.resourcePurchaseView = true; },
      saveResourcePurchase: function () { this.modals.resourcePurchaseAdd = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '保存成功', message: '采购申请已提交' }; },
      resourcePurchaseSearch: function () { this.pagination.resourcePurchase.page = 1; },
      resourcePurchaseReset: function () { this.resourceSearchForm.resourcePurchase = { purNo: '', applicant: '', purType: '', status: '' }; this.pagination.resourcePurchase.page = 1; },
      resourcePurchaseBatchSummary: function () { this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '批量汇总', message: '采购申请汇总表已生成' }; },
      openResourcePurchaseApprove: function (row) { this.modalData.resourcePurchaseItem = JSON.parse(JSON.stringify(row)); this.modals.resourcePurchaseApprove = true; },
      openResourcePurchaseAccept: function (row) { this.modalData.resourcePurchaseItem = JSON.parse(JSON.stringify(row)); this.modals.resourcePurchaseAccept = true; },
      saveResourcePurchaseApprove: function () { this.modals.resourcePurchaseApprove = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '审批完成', message: '采购申请审批意见已保存' }; },
      saveResourcePurchaseAccept: function () { this.modals.resourcePurchaseAccept = false; this.modals.resourceOpResult = true; this.modalData.resourceOpResult = { title: '验收完成', message: '采购到货验收已完成' }; },
      /* ----- 菜单/页签 ----- */
      toggleMenu: function (key) {
        var idx = this.openMenus.indexOf(key);
        if (idx > -1) this.openMenus.splice(idx, 1);
        else this.openMenus.push(key);
      },
      openPage: function (key, name) {
        this.activeTab = key;
        this.activeMenuKey = key;
        var exist = null;
        this.tabs.forEach(function (t) { if (t.key === key) exist = t; });
        if (!exist) this.tabs.push({ key: key, name: name || PAGE_NAME[key] || key });
      },
      /* ---------- 首页（个人门户） ---------- */
      setHomeRole: function (role) {
        this.homeRole = role;
        // 切换权限后，按角色权限范围重置常用模块
        var map = {
          admin: ['business', 'test', 'report', 'quality'],
          tech: ['test', 'eln', 'report'],
          audit: ['test', 'report', 'quality'],
          sign: ['report', 'business'],
          quality: ['test', 'quality', 'resource']
        };
        this.homeModules = (map[role] || this.homeModules).slice();
        showToast('已切换为「' + this.homeRoleName + '」视图');
      },
      openHomeModule: function (key) {
        var g = null;
        this.menuData.forEach(function (m) { if (m.key === key) g = m; });
        if (!g) { showToast('模块暂未开放', 'error'); return; }
        if (g.children && g.children.length) {
          this.openPage(g.children[0].key, g.children[0].name);
        } else {
          this.openPage(g.key, g.name);
        }
      },
      toggleHomeModuleEdit: function () {
        this.homeModuleEdit = !this.homeModuleEdit;
      },
      addHomeModule: function (key) {
        if (this.homeModules.indexOf(key) > -1) return;
        this.homeModules.push(key);
        showToast('已添加常用模块');
      },
      removeHomeModule: function (key) {
        var i = this.homeModules.indexOf(key);
        if (i > -1) this.homeModules.splice(i, 1);
        showToast('已移除常用模块');
      },
      /* 表格多选框：表头全选 / 行勾选联动 */
      syncRowCheck: function (table) {
        var boxes = table.querySelectorAll('tbody input.row-check');
        var all = true;
        boxes.forEach(function (b) { if (!b.checked) all = false; });
        var head = table.querySelector('thead input.check-all');
        if (head) head.checked = all;
      },
      closeTab: function (key) {
        var idx = -1;
        this.tabs.forEach(function (t, i) { if (t.key === key) idx = i; });
        if (idx < 0) return;
        this.tabs.splice(idx, 1);
        if (this.activeTab === key) {
          // 兜底跳到第一个已实现页面（科研项目），避免关闭后落入建设中页面
          var next = this.tabs[this.tabs.length - 1] || { key: 'research-project', name: '科研项目' };
          if (next) this.openPage(next.key, next.name);
        }
      },
      pageIcon: function (page) {
        var map = {
          'research-project': 'fa-flask', 'research-experiment': 'fa-clipboard-list', 'research-result': 'fa-trophy',
          'research-cooperation': 'fa-handshake', 'quality-audit': 'fa-magnifying-glass-chart',
          'quality-supervise': 'fa-user-shield', 'quality-control': 'fa-bullseye', 'quality-proficiency': 'fa-medal',
          'quality-system-doc': 'fa-folder-tree', 'quality-corrective': 'fa-check-to-slot',
          'training-plan': 'fa-calendar-check', 'training-implement': 'fa-chalkboard-user',
          'training-exam': 'fa-file-circle-check', 'training-certificate': 'fa-certificate'
        };
        return map[page] || 'fa-file-lines';
      },
      menuGroupActive: function (g) {
        if (!g.children || !g.children.length) return g.key === this.activeTab;
        var self = this;
        var hit = false;
        (g.children || []).forEach(function (c) { if (c.key === self.activeTab) hit = true; });
        return hit;
      },
      setPageTab: function (k) {
        var m = { 'research-project': 'rTab', 'research-experiment': 'reTab', 'research-result': 'rResultTab', 'quality-control': 'qcTab' };
        var key = m[this.activeTab];
        if (key) this[key] = k;
      },
      statusClass: function (status) {
        return STATUS_TAGS[status] || 'tag-gray';
      },
      buildComplaintMap: function () {
        // 占位：数据实时计算
      },
      showChart: function (id) {
        if (!id) id = 'qc-chart';
        if (id === 'qc-chart') this.qcChartVisible = true;
        this.$nextTick(function () { renderChart(id); });
      },
      openChartItem: function (row) {
        this.qcChartVisible = true;
        this.$nextTick(function () { renderChart('qc-chart'); });
      },
      /* ----- 结果记录与线上审批 ----- */
      openUpload: function (page, row) {
        this.uploadPage = page;
        this.uploadTarget = row;
        this.uploadResult = row.result || '';
        this.uploadFiles = (row.files || []).slice();
        this.uploadVisible = true;
      },
      pickFiles: function (e) {
        var self = this;
        var files = e.target.files || [];
        for (var i = 0; i < files.length; i++) {
          self.uploadFiles.push({ name: files[i].name, size: files[i].size });
        }
        e.target.value = '';
      },
      removeFile: function (i) {
        this.uploadFiles.splice(i, 1);
      },
      submitUpload: function () {
        if (!this.uploadTarget) return;
        var row = this.uploadTarget;
        row.result = this.uploadResult;
        row.files = this.uploadFiles.slice();
        row.status = '待审批';
        row.submitTime = new Date().toISOString().slice(0, 10);
        this.uploadVisible = false;
        this.uploadPage = '';
        this.uploadTarget = null;
        showToast('资料已上传，已提交线上审批');
      },
      openApprove: function (page, row) {
        this.approveTarget = row;
        this.approveComment = '';
        this.approvePage = page || '';
        this.approveVisible = true;
      },
      submitApprove: function (ok) {
        if (!this.approveTarget) return;
        var row = this.approveTarget;
        var isDoc = this.approvePage === 'quality-system-doc';
        row.status = ok ? (isDoc ? '已发布' : '已通过') : '已驳回';
        row.approver = '管理员';
        row.approveComment = this.approveComment;
        row.approveTime = new Date().toISOString().slice(0, 10);
        if (ok && isDoc) row.publishDate = row.publishDate || new Date().toISOString().slice(0, 10);
        this.approveVisible = false;
        this.approveTarget = null;
        showToast(ok ? (isDoc ? '审批通过，文件已发布' : '审批已通过') : '已驳回，可修改资料后重新提交');
      },
      /* ----- 质量监督·上传功能：提交审核与审核 ----- */
      submitForAudit: function (row) {
        if (!row) return;
        if (!row.result || !String(row.result).trim()) { showToast('请先填写计划结果后再提交审核'); return; }
        row.status = '待审核';
        row.submitter = row.submitter || '管理员';
        row.submitTime = new Date().toISOString().slice(0, 10);
        showToast('已提交审核，等待审核人处理');
      },
      auditQsUpload: function (row, ok) {
        if (!row) return;
        if (ok) {
          var pass = window.prompt('请输入审核意见（通过）：', '同意，资料完整，结果符合要求。');
          if (pass === null) return;
          row.auditOpinion = pass;
          row.status = '已通过';
          showToast('审核已通过');
        } else {
          var rej = window.prompt('请输入驳回原因：', '');
          if (rej === null || !rej.trim()) return;
          row.auditOpinion = rej;
          row.status = '已驳回';
          showToast('已驳回，可修改后重新提交');
        }
        row.auditor = '管理员';
        row.auditTime = new Date().toISOString().slice(0, 10);
      },
      /* ----- 搜索 ----- */
      doSearch: function () {
        this.pageIndex = 1;
        showToast('查询完成，共 ' + this.filteredRows.length + ' 条');
      },
      resetSearch: function () {
        this.searchForm = {};
        this.pageIndex = 1;
        showToast('已重置查询条件');
      },
      /* ----- 分页 ----- */
      prevPage: function () {
        if (this.pageIndex > 1) this.pageIndex--;
      },
      nextPage: function () {
        var max = Math.ceil(this.filteredRows.length / this.pageSize) || 1;
        if (this.pageIndex < max) this.pageIndex++;
      },
      /* ----- 检验项目库：树+配置面板 ----- */
      selectProject: function (code) {
        this.selectedProjectCode = code;
        var p = this.selectedProject;
        if (p) {
          this.projCfgDraft = {
            code: p.code, name: p.name, cat: p.cat, subcat: p.subcat,
            unit: p.unit, limit: p.limit, method: p.method,
            turnaround: p.turnaround, sampleQty: p.sampleQty, status: p.status
          };
        }
      },
      onProjCatChange: function () {
        var subs = this.libSubcatOptions;
        if (subs.length && subs.indexOf(this.projCfgDraft.subcat) === -1) {
          this.projCfgDraft.subcat = subs[0];
        }
      },
      toggleProjTreeNode: function (key) {
        var obj = {};
        obj[key] = !this.projTreeExpanded[key];
        this.projTreeExpanded = Object.assign({}, this.projTreeExpanded, obj);
      },
      isProjNodeOpen: function (key) {
        return this.projTreeExpanded[key] !== false;
      },
      saveProjectConfig: function () {
        var d = this.projCfgDraft;
        if (!d || !this.selectedProjectCode) { showToast('请先选择项目', 'error'); return; }
        var list = this.pageData['system-lib-project'] || [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].code === this.selectedProjectCode) {
            var oldCat = list[i].cat;
            var oldSubcat = list[i].subcat;
            list[i].name = d.name;
            list[i].cat = d.cat;
            list[i].subcat = d.subcat;
            list[i].unit = d.unit;
            list[i].limit = d.limit;
            list[i].method = d.method;
            list[i].turnaround = d.turnaround;
            list[i].sampleQty = d.sampleQty;
            list[i].status = d.status;
            if (oldCat !== d.cat || oldSubcat !== d.subcat) {
              this.pageData['system-lib-project'] = list.slice();
            }
            break;
          }
        }
        showToast('项目配置已保存');
      },
      startEditCat: function (gi) {
        this.editingCatIdx = gi;
      },
      commitEditCat: function (oldName, event) {
        var newName = (event.target.value || '').trim();
        this.editingCatIdx = null;
        if (!newName) { showToast('分类名称不能为空', 'error'); return; }
        if (newName === oldName) return;
        var list = this.pageData['system-lib-project'] || [];
        list.forEach(function (r) { if (r.cat === oldName) r.cat = newName; });
        this.pageData['system-lib-project'] = list.slice();
        showToast('分类名称已更新');
      },
      startEditSubcat: function (gi, si) {
        this.editingSubcatIdx = gi + '_' + si;
      },
      commitEditSubcat: function (oldName, event) {
        var newName = (event.target.value || '').trim();
        this.editingSubcatIdx = null;
        if (!newName) { showToast('子类名称不能为空', 'error'); return; }
        if (newName === oldName) return;
        var list = this.pageData['system-lib-project'] || [];
        list.forEach(function (r) { if (r.subcat === oldName) r.subcat = newName; });
        this.pageData['system-lib-project'] = list.slice();
        showToast('子类名称已更新');
      },
      /* ----- 弹窗表单 ----- */
      openForm: function (page, row) {
        this.formPage = page;
        this.formEdit = !!row;
        this.formSchema = (FIELDS[page] || []).map(function (f) {
          return Object.assign({}, f);
        }).filter(function (f) {
          // 表单模板的"字段数"由字段配置自动统计，无需手动填写
          return !(page === 'system-ui-form' && f.key === 'fields');
        });
        var d = {};
        this.formSchema.forEach(function (f) { d[f.key] = (f.type === 'multiselect') ? [] : ''; });
        if (page === 'system-ui-form') {
          d.uiFields = (row && row.uiFields) ? row.uiFields.map(function (x) { return { name: x.name, type: x.type || 'text', required: !!x.required }; }) : [];
        }
        if (row) {
          Object.keys(row).forEach(function (k) {
            if (k in d) {
              var f = this.formSchema.filter(function (x) { return x.key === k; })[0];
              if (f && f.type === 'multiselect') {
                d[k] = Array.isArray(row[k]) ? row[k].slice() : [];
              } else {
                d[k] = row[k];
              }
            }
          }.bind(this));
        }
        this.formData = d;
        this.modals.form = true;
      },
      /* ----- 多选字段：选项与勾选 ----- */
      multiOptions: function (f) {
        if (f.options) return f.options;
        if (f.optionsFrom) {
          var list = this.pageData[f.optionsFrom] || [];
          var valKey = f.optionValue || 'code';
          var labelKey = f.optionLabel || 'name';
          return list.map(function (x) { return { value: x[valKey], label: x[labelKey] }; });
        }
        return [];
      },
      toggleMulti: function (f, value) {
        var arr = this.formData[f.key] || [];
        var idx = arr.indexOf(value);
        if (idx >= 0) { arr.splice(idx, 1); } else { arr.push(value); }
        this.formData[f.key] = arr.slice();
      },
      isMultiChecked: function (f, value) {
        var arr = this.formData[f.key] || [];
        return arr.indexOf(value) >= 0;
      },
      vesselProjectNames: function (row) {
        var ids = row && row.projectIds ? row.projectIds : [];
        var list = this.pageData['system-env-mproj'] || [];
        return ids.map(function (id) {
          var p = list.filter(function (x) { return x.code === id; })[0];
          return p ? p.name : id;
        });
      },
      addUiField: function () {
        this.formData.uiFields.push({ name: '', type: 'text', required: false });
      },
      removeUiField: function (idx) {
        this.formData.uiFields.splice(idx, 1);
      },
      /* ----- 列表列自定义：字段管理 ----- */
      addColField: function () {
        var rec = this.uiColRec();
        if (!rec) { showToast('请先选择左侧模块', 'error'); return; }
        if (!Array.isArray(rec.fields)) rec.fields = [];
        rec.fields.push({ name: '新字段' + (rec.fields.length + 1), type: 'text', enabled: true });
        this.syncColCount(rec);
      },
      removeColField: function (idx) {
        var rec = this.uiColRec();
        if (!rec) return;
        rec.fields.splice(idx, 1);
        this.syncColCount(rec);
      },
      toggleColField: function (f) {
        f.enabled = !f.enabled;
        this.syncColCount(this.uiColRec());
      },
      syncColCount: function (rec) {
        if (!rec) return;
        rec.cols = rec.fields.length;
        rec.visible = rec.fields.filter(function (x) { return x.enabled; }).length;
      },
      uiColRec: function () {
        var mod = (this.searchForm.module || '').trim();
        if (!mod) return null;
        return (this.pageData['system-ui-column'] || []).filter(function (r) { return r.module === mod; })[0] || null;
      },
      /* ----- 报表自定义：字段与打印样式 ----- */
      selectReport: function (r) {
        this.selectedReport = r.code;
      },
      addRptField: function () {
        var r = this.uiReportSel;
        if (!r) return;
        if (!Array.isArray(r.fields)) r.fields = [];
        r.fields.push({ name: '新字段' + (r.fields.length + 1), type: 'text', print: true });
      },
      removeRptField: function (idx) {
        var r = this.uiReportSel;
        if (!r || !Array.isArray(r.fields)) return;
        r.fields.splice(idx, 1);
      },
      toggleRptField: function (f) {
        f.print = !f.print;
      },
      printReport: function () {
        var r = this.uiReportSel;
        if (!r) return;
        var cnt = (r.fields || []).filter(function (x) { return x.print; }).length;
        this.toast('已按「' + r.name + '」样式生成打印预览，共 ' + cnt + ' 个打印字段');
        setTimeout(function () { window.print(); }, 300);
      },
      rptSample: function (type) {
        var m = { text: '示例文本内容', number: '123.45', date: '2026-09-17', select: '选项一', textarea: '多行示例内容', chart: '（图表区域）', barcode: '|||12345678|||' };
        return m[type] || m.text;
      },
      submitForm: function () {
        var page = this.formPage;
        var d = this.formData;
        // 简单必填校验
        for (var i = 0; i < this.formSchema.length; i++) {
          var f = this.formSchema[i];
          if (f.required && !d[f.key]) { showToast('请填写「' + f.label + '」', 'error'); return; }
        }
        if (page === 'quality-system-doc') {
          var sl = this.sysDocs;
          var sEdit = false;
          var today = new Date().toISOString().slice(0, 10);
          sl.forEach(function (r) { if (String(r.id) === String(d.id)) sEdit = true; });
          if (sEdit) {
            sl.forEach(function (r) {
              if (String(r.id) !== String(d.id)) return;
              if (d.reviseDesc && r.version !== d.version) {
                (r.versions = r.versions || []).unshift({ ver: d.version, desc: d.reviseDesc, operator: '管理员', time: today });
              }
              Object.keys(d).forEach(function (k) { if (k !== 'reviseDesc') r[k] = d[k]; });
            });
          } else {
            var nd = Object.assign({}, d);
            nd.id = sl.length ? Math.max.apply(null, sl.map(function (x) { return x.id; })) + 1 : 1;
            nd.status = nd.status || '草稿';
            nd.controlled = nd.controlled || '受控';
            nd.cat = nd.cat || '质量手册';
            nd.fileIcon = 'fa-file-lines';
            nd.fileColor = '#3B82F6';
            nd.size = '—';
            nd.update = today;
            nd.category = '体系文件';
            nd.files = nd.files || [];
            nd.versions = [{ ver: nd.version || 'A/0', desc: '首次编制', operator: nd.author || '管理员', time: today }];
            sl.unshift(nd);
          }
          this.modals.form = false;
          showToast(sEdit ? '保存成功' : '新增成功');
          return;
        }
        if (page === 'knowledge-center') {
          var docs = this.knowledgeDocs;
          docs.unshift({
            id: docs.length ? docs[0].id + 1 : 1,
            name: d.name, category: d.category, size: '新增', update: new Date().toISOString().slice(0, 10),
            fileIcon: 'fa-file-lines', fileColor: '#8B5CF6', content: '<p>' + (d.content || '') + '</p>'
          });
          if (this.currentCat !== d.category) this.currentCat = d.category;
          this.modals.form = false;
          showToast('知识已发布');
          return;
        }
        var list = this.pageData[page] || [];
        var editing = false;
        if (page === 'system-ui-form') {
          // 字段信息：过滤空行并自动统计字段数
          var fl = (d.uiFields || []).filter(function (x) { return (x.name || '').trim() !== ''; });
          d.uiFields = fl.map(function (x) { return { name: x.name.trim(), type: x.type || 'text', required: !!x.required }; });
          d.fields = d.uiFields.length;
          delete d.fieldNote;
        }
        list.forEach(function (r) {
          if (page === 'system-ui-form' ? (r.code === d.code) : (r.id === d.id)) {
            editing = true;
            Object.assign(r, d);
          }
        });
        if (!editing) {
          var nr = Object.assign({}, d);
          if (page === 'quality-complaint') nr.status = nr.status || '待处理';
          if (page === 'research-result') nr.tag = nr.tag || 'info';
          if (page === 'quality-supervise-upload') {
            nr.status = nr.status || '草稿';
            nr.submitter = nr.submitter || '管理员';
            nr.submitTime = '';
            nr.auditor = '';
            nr.auditTime = '';
            nr.auditOpinion = '';
          }
          list.unshift(nr);
          this.pageData[page] = list;
        }
        this.modals.form = false;
        showToast(editing ? '保存成功' : '新增成功');
      },
      openArticleForm: function () {
        this.openForm('knowledge-center');
      },
      /* ----- 详情 ----- */
      openDetail: function (page, row) {
        var cfg = DETAIL[page];
        this.detailPage = page;
        this.detailRow = row;
        this.detailTitle = row.name || row.title || row.id;
        this.detailEditBtn = page !== 'stat-query';
        var sections = [];
        var items = [];
        var mprojList = this.pageData['system-env-mproj'] || [];
        if (cfg && cfg.fields) {
          cfg.fields.forEach(function (f) {
            var v = row[f.key];
            if (v === undefined || v === null || v === '') return;
            var val = v;
            var tag = false;
            if (f.render === 'projectTags' && Array.isArray(v)) {
              val = v.map(function (id) {
                var p = mprojList.filter(function (x) { return x.code === id; })[0];
                return p ? p.name : id;
              }).join('、');
            } else if (f.render === 'percent') val = v + '%';
            else if (typeof v === 'string' && STATUS_TAGS[v]) tag = true;
            else if (f.tag) tag = true;
            items.push({ label: f.label, value: val, tag: tag, color: STATUS_TAGS[v] || 'tag-gray', full: f.full });
          });
        } else {
          Object.keys(row).forEach(function (k) {
            items.push({ label: k, value: row[k], full: false });
          });
        }
        // 通用字段补充
        sections.push({ title: '基本信息', items: items });
        // 表单模板：展示字段明细
        if (page === 'system-ui-form' && Array.isArray(row.uiFields) && row.uiFields.length) {
          var fItems = row.uiFields.map(function (x, i) {
            var tMap = { text: '文本', number: '数字', select: '下拉选择', date: '日期', textarea: '多行文本', radio: '单选', checkbox: '复选' };
            return { label: (i + 1) + '. ' + x.name, value: (tMap[x.type] || x.type) + (x.required ? '（必填）' : ''), full: false };
          });
          sections.push({ title: '字段配置', items: fItems });
        }
        // 报表模板：展示字段明细与打印样式
        if (page === 'system-ui-report') {
          if (Array.isArray(row.fields) && row.fields.length) {
            var tMap2 = { text: '文本', number: '数字', select: '下拉选择', date: '日期', textarea: '多行文本', radio: '单选', checkbox: '复选', chart: '图表', barcode: '条码' };
            var rpItems = row.fields.map(function (x, i) {
              return { label: (i + 1) + '. ' + (x.name || '未命名'), value: (tMap2[x.type] || x.type) + (x.print ? '（打印）' : '（不打印）'), full: false };
            });
            sections.push({ title: '打印字段（' + row.fields.length + '）', items: rpItems });
          }
          if (row.style) {
            var orientMap = { '纵向': '纵向', '横向': '横向' };
            var marginMap = { '5mm': '窄（5mm）', '10mm': '标准（10mm）', '15mm': '宽（15mm）', '20mm': '特宽（20mm）' };
            var st = row.style;
            sections.push({ title: '打印样式', items: [
              { label: '纸张方向', value: orientMap[st.orient] || st.orient || '—' },
              { label: '页边距', value: marginMap[st.margin] || st.margin || '—' },
              { label: '正文字号', value: (st.fontSize || '—') + 'px' },
              { label: '标题字号', value: (st.titleSize || '—') + 'px' },
              { label: '打印表头', value: st.showHeader ? '是' : '否' },
              { label: '打印页码', value: st.showPageNo ? '是' : '否' }
            ] });
          }
        }
        this.detailSections = sections;
        if (cfg && (cfg.progress || page === 'research-project')) {
          var p = row.percent !== undefined ? Number(row.percent) : (row.rate !== undefined ? Number(row.rate) : 0);
          var done = row.status === '已完成';
          var current = row.status === '进行中';
          this.detailProgress = {
            percent: p,
            steps: page === 'research-project'
              ? [ { name: '立项', done: true }, { name: '中期检查', done: true }, { name: '评估', done: done && false, current: !done }, { name: '结题', done: done } ]
              : [ { name: '待开始', done: done }, { name: '进行中', done: done || current, current: current }, { name: '已完成', done: done } ]
          };
        } else {
          this.detailProgress = null;
        }
        this.modals.detail = true;
      },
      renderVal: function (item) {
        if (item.tag) return '<span class="tag ' + item.color + '">' + item.value + '</span>';
        return String(item.value);
      },
      /* ----- 删除 ----- */
      askDelete: function (page, row) {
        this.deletePage = page;
        this.deleteTarget = row;
        this.modals.del = true;
      },
      confirmDelete: function () {
        var page = this.deletePage;
        var id = this.deleteTarget && this.deleteTarget.id;
        if (page === 'quality-system-doc') {
          var dl = this.sysDocs;
          for (var j = dl.length - 1; j >= 0; j--) {
            if (dl[j].id === id) { dl.splice(j, 1); break; }
          }
          this.modals.del = false;
          showToast('删除成功');
          return;
        }
        var list = this.pageData[page] || [];
        var key = this.deleteTarget && this.deleteTarget.id !== undefined ? 'id' : 'code';
        var target = key === 'id' ? (this.deleteTarget && this.deleteTarget.id) : (this.deleteTarget && this.deleteTarget.code);
        for (var i = list.length - 1; i >= 0; i--) {
          if (list[i][key] === target) { list.splice(i, 1); break; }
        }
        this.modals.del = false;
        showToast('删除成功');
      },
      /* ----- 设备数据采集工作台 ----- */
      openDeviceCollect: function (row) {
        // 设备离线时给出提示但允许进入工作台查看历史
        this.deviceCollect.device = Object.assign({}, row);
        // 复用设备当前策略作为默认值
        if (row.policy) this.deviceCollect.config.policy = row.policy;
        this.deviceCollect.running = false;
        this.deviceCollect.done = false;
        this.deviceCollect.progress = 0;
        this.deviceCollect.statusText = row.connectStatus === '离线' ? '设备离线，仅可查看历史' : '等待开始采集';
        this.deviceCollect.collected = [];
        this.deviceCollect.rounds = 0;
        this.deviceCollect.errors = 0;
        this.deviceCollect.lastTime = '-';
        this.deviceCollect._seq = 0;
        this.modals.collect = true;
      },
      closeDeviceCollect: function () {
        if (this.deviceCollect._timer) { clearInterval(this.deviceCollect._timer); this.deviceCollect._timer = null; }
        this.deviceCollect.running = false;
        this.modals.collect = false;
      },
      _deviceCollectTick: function () {
        var dc = this.deviceCollect;
        if (!dc.running) return;
        // 进度推进
        if (dc.progress < 100) {
          dc.progress = Math.min(100, dc.progress + Math.floor(8 + Math.random() * 12));
        }
        // 产生本轮采集数据
        var now = new Date();
        var ts = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0')
          + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
        var sample = this._buildDeviceSample(dc.device, ts);
        sample.forEach(function (s) {
          s.id = 'DC-' + String(++dc._seq).padStart(4, '0');
        });
        dc.collected = sample.concat(dc.collected).slice(0, 50);
        dc.rounds += 1;
        dc.lastTime = ts;
        dc.statusText = '采集进行中 · 第' + dc.rounds + '轮 · 进度 ' + dc.progress + '%';
        // 偶发异常
        if (Math.random() < 0.1) {
          dc.errors += 1;
          dc.collected.unshift({
            id: 'DC-ERR-' + String(++dc._seq).padStart(4, '0'),
            target: '系统异常',
            source: 'device.status',
            value: '采集超时重试',
            unit: '',
            type: 'String',
            channel: dc.config.channel,
            time: ts,
            status: '异常'
          });
        }
        // 完成
        if (dc.progress >= 100) {
          dc.running = false;
          dc.done = true;
          dc.statusText = '采集完成 · 已抓取 ' + dc.collected.length + ' 条 · 异常 ' + dc.errors + ' 次';
          if (dc._timer) { clearInterval(dc._timer); dc._timer = null; }
          if (dc.config.autoParse) showToast('采集完成，已自动解析入库');
        }
      },
      startDeviceCollect: function () {
        var dc = this.deviceCollect;
        if (dc.device.connectStatus === '离线') { showToast('设备离线，无法启动采集'); return; }
        if (dc.running) return;
        dc.running = true;
        dc.done = false;
        dc.progress = 0;
        dc.statusText = '正在建立连接...';
        var self = this;
        // 启动定时轮询
        var intervalMs = 2000;
        if (dc.config.policy === '定时采集') {
          intervalMs = (dc.config.interval === '每5秒' ? 1500 : (dc.config.interval === '每30秒' ? 2000 : (dc.config.interval === '每1分钟' ? 2500 : (dc.config.interval === '每5分钟' ? 3000 : 3500))));
        } else if (dc.config.policy === '实时采集') {
          intervalMs = 1500;
        }
        this._deviceCollectTick();
        dc._timer = setInterval(function () { self._deviceCollectTick(); }, intervalMs);
        showToast('已启动采集任务');
      },
      stopDeviceCollect: function () {
        var dc = this.deviceCollect;
        if (!dc.running) return;
        if (dc._timer) { clearInterval(dc._timer); dc._timer = null; }
        dc.running = false;
        dc.statusText = '已手动停止 · 累计 ' + dc.collected.length + ' 条';
        showToast('采集已停止');
      },
      importDeviceRaw: function () {
        var dc = this.deviceCollect;
        if (dc.running) { showToast('采集进行中，请先停止'); return; }
        // 一次性抓取底层数据（根据协议解析规则）
        var now = new Date();
        var ts = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0')
          + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
        var sample = this._buildDeviceSample(dc.device, ts);
        sample.forEach(function (s) {
          s.id = 'DC-' + String(++dc._seq).padStart(4, '0');
        });
        dc.collected = sample.concat(dc.collected).slice(0, 50);
        dc.rounds += 1;
        dc.lastTime = ts;
        dc.progress = 100;
        dc.done = true;
        dc.statusText = '底层数据抓取完成 · 共 ' + dc.collected.length + ' 条';
        if (dc.config.autoParse) showToast('底层数据已抓取并自动解析入库');
        else showToast('底层数据已抓取');
      },
      clearDeviceCollect: function () {
        var dc = this.deviceCollect;
        if (dc.running) { showToast('采集进行中，无法清空'); return; }
        dc.collected = [];
        dc.rounds = 0;
        dc.errors = 0;
        dc.progress = 0;
        dc.done = false;
        dc.statusText = '已清空预览，等待开始采集';
        dc.lastTime = '-';
      },
      /* ----- 通过PDF文件采集数据 ----- */
      openPdfCollect: function () {
        this.pdfCollect.step = 1;
        this.pdfCollect.ruleCode = '';
        this.pdfCollect.files = [];
        this.pdfCollect.collected = [];
        this.pdfCollect.progress = 0;
        this.pdfCollect.parsing = false;
        this.pdfCollect.done = false;
        this.pdfCollect.statusText = '等待开始解析';
        this.pdfCollect.parsedCount = 0;
        this.pdfCollect.failedCount = 0;
        this.pdfCollect._seq = 0;
        // 默认预选第一条启用的规则
        var list = this.enabledPdfRules;
        if (list.length) this.pdfCollect.ruleCode = list[0].code;
        this.modals.pdfCollect = true;
      },
      closePdfCollect: function () {
        if (this.pdfCollect._timer) { clearInterval(this.pdfCollect._timer); this.pdfCollect._timer = null; }
        this.pdfCollect.parsing = false;
        this.modals.pdfCollect = false;
      },
      resetPdfCollect: function () {
        if (this.pdfCollect._timer) { clearInterval(this.pdfCollect._timer); this.pdfCollect._timer = null; }
        this.pdfCollect.files.forEach(function (f) { f.parsing = false; f.parsed = false; f.statusText = '待解析'; });
        this.pdfCollect.collected = [];
        this.pdfCollect.progress = 0;
        this.pdfCollect.parsing = false;
        this.pdfCollect.done = false;
        this.pdfCollect.parsedCount = 0;
        this.pdfCollect.failedCount = 0;
        this.pdfCollect.statusText = '等待开始解析';
        this.pdfCollect.step = 2;
        showToast('已重置，可重新开始解析');
      },
      pdfCollectStepNext: function () {
        if (this.pdfCollect.step === 1) {
          if (!this.pdfCollect.ruleCode) { showToast('请先选择PDF解析规则'); return; }
          this.pdfCollect.step = 2;
        } else {
          this.pdfCollect.step += 1;
        }
      },
      pdfCollectStepBack: function () {
        if (this.pdfCollect.step > 1) this.pdfCollect.step -= 1;
      },
      _formatFileSize: function (bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
      },
      _addPdfFiles: function (fileList) {
        var self = this;
        var arr = Array.prototype.slice.call(fileList || []);
        arr.forEach(function (f) {
          if (!/\.pdf$/i.test(f.name)) { showToast('文件 ' + f.name + ' 不是PDF格式，已跳过'); return; }
          self.pdfCollect.files.push({
            name: f.name,
            size: f.size,
            sizeText: self._formatFileSize(f.size),
            statusText: '待解析',
            parsing: false,
            parsed: false,
            _raw: f
          });
        });
      },
      onPdfFileChange: function (e) {
        this._addPdfFiles(e.target.files);
        // 重置 input 以便重复选择同一文件
        e.target.value = '';
      },
      onPdfFileDrop: function (e) {
        this._addPdfFiles(e.dataTransfer ? e.dataTransfer.files : []);
      },
      onPdfFileDragOver: function () { /* 拖拽悬停效果由CSS控制 */ },
      removePdfFile: function (idx) {
        this.pdfCollect.files.splice(idx, 1);
      },
      _currentPdfRule: function () {
        var code = this.pdfCollect.ruleCode;
        var list = this.pageData['system-set-pdf'] || [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].code === code) return list[i];
        }
        return null;
      },
      _pdfParseTick: function () {
        var pc = this.pdfCollect;
        if (!pc.parsing) return;
        // 找到下一个待解析的文件
        var nextFile = null;
        for (var i = 0; i < pc.files.length; i++) {
          if (!pc.files[i].parsing && !pc.files[i].parsed) { nextFile = pc.files[i]; break; }
        }
        if (nextFile) {
          nextFile.parsing = true;
          nextFile.statusText = '解析中...';
          var self = this;
          setTimeout(function () {
            self._parseOnePdfFile(nextFile);
          }, 600 + Math.random() * 400);
        } else {
          // 全部完成
          if (pc._timer) { clearInterval(pc._timer); pc._timer = null; }
          pc.parsing = false;
          pc.done = true;
          pc.progress = 100;
          pc.statusText = '解析完成 · 共解析 ' + pc.parsedCount + ' 个 · 失败 ' + pc.failedCount + ' 个';
          pc.step = 4;
          showToast('PDF解析完成，共解析出 ' + pc.collected.length + ' 条数据');
        }
      },
      _parseOnePdfFile: function (file) {
        var pc = this.pdfCollect;
        var rule = this._currentPdfRule();
        if (!rule) {
          file.parsing = false;
          file.statusText = '解析失败：规则丢失';
          pc.failedCount += 1;
          return;
        }
        // 5%概率解析失败
        if (Math.random() < 0.05) {
          file.parsing = false;
          file.parsed = false;
          file.statusText = '解析失败：PDF与规则不匹配';
          pc.failedCount += 1;
          // 进度推进
          pc.progress = Math.min(95, Math.floor((pc.parsedCount + pc.failedCount) / pc.files.length * 100));
          return;
        }
        // 生成解析结果数据
        var now = new Date();
        var ts = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0')
          + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
        var sample = this._buildPdfSample(rule, file.name, ts);
        sample.forEach(function (s) {
          s.id = 'PC-' + String(++pc._seq).padStart(4, '0');
        });
        pc.collected = pc.collected.concat(sample);
        file.parsing = false;
        file.parsed = true;
        file.statusText = '解析成功 · ' + sample.length + ' 条';
        pc.parsedCount += 1;
        // 更新总进度
        pc.progress = Math.min(95, Math.floor((pc.parsedCount + pc.failedCount) / pc.files.length * 100));
        pc.statusText = '正在解析 ' + file.name + ' · 已完成 ' + pc.parsedCount + '/' + pc.files.length;
      },
      _buildPdfSample: function (rule, fileName, ts) {
        // 根据规则的mappings生成对应的采集数据（演示）
        var matched = rule.parseMode || '文本提取';
        // 通过规则名称前缀匹配设备类型，便于生成对应字段值
        var name = rule.name || '';
        var typeKey = '';
        if (/色谱|GC|LC/.test(name)) typeKey = '色谱';
        else if (/质谱|MS/.test(name)) typeKey = '质谱';
        else if (/PCR/.test(name)) typeKey = 'PCR';
        else if (/测序|Illumina|MiSeq/.test(name)) typeKey = '测序';
        else if (/显微镜|蔡司|图像/.test(name)) typeKey = '显微';
        else if (/原子|吸收|AA|光谱|UV/.test(name)) typeKey = '光谱';
        else typeKey = '通用';
        // 基于规则的 mappings 生成数据
        var rows = [];
        (rule.mappings || []).forEach(function (m) {
          var val = '';
          var unit = '';
          var src = m.source;
          var tgt = m.target;
          if (/sample|样品|Sample/i.test(src)) val = 'SMP-' + Math.floor(1000 + Math.random() * 9000);
          else if (/compound|化合物|Compound/i.test(src)) val = ['乙烯', '赤霉素', '生长素', '细胞分裂素', '脱落酸'][Math.floor(Math.random() * 5)];
          else if (/rt|保留时间/i.test(src)) { val = (1.2 + Math.random() * 0.6).toFixed(3); unit = 'min'; }
          else if (/area|峰面积/i.test(src)) { val = Math.floor(80000 + Math.random() * 40000); unit = typeKey === '质谱' ? 'cps' : 'mV·s'; }
          else if (/conc|浓度/i.test(src)) { val = (5 + Math.random() * 3).toFixed(2); unit = 'mg/L'; }
          else if (/date|日期|Date/i.test(src)) val = ts.split(' ')[0];
          else if (/operator|检测员/i.test(src)) val = ['张工', '李工', '王工'][Math.floor(Math.random() * 3)];
          else if (/mw|分子量/i.test(src)) { val = (346.37 + Math.random() * 0.02).toFixed(2); unit = 'Da'; }
          else if (/sn|信噪比|S\/N/i.test(src)) val = (35 + Math.random() * 15).toFixed(1);
          else if (/ct|CtValue|Ct值/i.test(src)) val = (18 + Math.random() * 12).toFixed(2);
          else if (/target|靶基因|Target/i.test(src)) val = ['ACTIN', 'GAPDH', 'Ubiquitin'][Math.floor(Math.random() * 3)];
          else if (/call|判定结果|Call/i.test(src)) val = Math.random() > 0.3 ? '阳性' : '阴性';
          else if (/well|孔位/i.test(src)) val = 'A' + (Math.floor(Math.random() * 12) + 1);
          else if (/reads|ReadCount/i.test(src)) { val = Math.floor(8000000 + Math.random() * 2000000); unit = 'reads'; }
          else if (/q30|Q30/i.test(src)) { val = (88 + Math.random() * 6).toFixed(2); unit = '%'; }
          else if (/gc|GCPercent|GC含量/i.test(src)) { val = (45 + Math.random() * 6).toFixed(2); unit = '%'; }
          else if (/variant|变异/i.test(src)) val = 'chr3:' + (10000 + Math.floor(Math.random() * 9000)) + ' A>G';
          else if (/image|图像/i.test(src)) val = 'IMG-' + Math.floor(1000 + Math.random() * 9000) + '.tif';
          else if (/mag|放大/i.test(src)) val = [40, 100, 200, 400][Math.floor(Math.random() * 4)] + 'x';
          else if (/scale|标尺/i.test(src)) { val = (10 + Math.random() * 5).toFixed(1); unit = 'µm'; }
          else if (/fluor|荧光/i.test(src)) { val = (1200 + Math.random() * 400).toFixed(0); unit = 'AU'; }
          else if (/element|元素/i.test(src)) val = ['氮', '磷', '钾', '钙', '镁'][Math.floor(Math.random() * 5)];
          else if (/abs|吸光度/i.test(src)) { val = (0.2 + Math.random() * 0.5).toFixed(4); unit = 'Abs'; }
          else val = '示例值-' + Math.floor(1000 + Math.random() * 9000);
          rows.push({
            sourceFile: fileName,
            source: src,
            target: tgt,
            value: val,
            unit: unit,
            matched: matched,
            time: ts,
            status: '正常'
          });
        });
        return rows;
      },
      startPdfParse: function () {
        var pc = this.pdfCollect;
        if (!pc.files.length) { showToast('请先上传PDF文件'); return; }
        if (pc.parsing) return;
        pc.parsing = true;
        pc.done = false;
        pc.progress = 0;
        pc.parsedCount = 0;
        pc.failedCount = 0;
        pc.collected = [];
        pc.statusText = '正在解析...';
        pc.step = 3;
        // 重置所有文件状态
        pc.files.forEach(function (f) { f.parsing = false; f.parsed = false; f.statusText = '排队中'; });
        var self = this;
        // 启动轮询解析
        this._pdfParseTick();
        pc._timer = setInterval(function () { self._pdfParseTick(); }, 800);
      },
      /* ----- 协议底层数据抓取工作台 ----- */
      openProtocolGrab: function (row) {
        this.protocolGrab.rule = Object.assign({}, row);
        // 根据协议默认策略调整
        if (row.transport === 'ASTM' || row.transport === 'HL7') this.protocolGrab.config.policy = '持续监听';
        else if (row.transport === 'RS232') this.protocolGrab.config.policy = '定时轮询';
        else this.protocolGrab.config.policy = '一次性抓取';
        this.protocolGrab.running = false;
        this.protocolGrab.done = false;
        this.protocolGrab.progress = 0;
        this.protocolGrab.statusText = row.status === '停用' ? '协议已停用，仅可查看历史' : '等待开始抓取';
        this.protocolGrab.collected = [];
        this.protocolGrab.rounds = 0;
        this.protocolGrab.errors = 0;
        this.protocolGrab.lastTime = '-';
        this.protocolGrab._seq = 0;
        this.modals.protocolGrab = true;
      },
      closeProtocolGrab: function () {
        if (this.protocolGrab._timer) { clearInterval(this.protocolGrab._timer); this.protocolGrab._timer = null; }
        this.protocolGrab.running = false;
        this.modals.protocolGrab = false;
      },
      _protocolGrabTick: function () {
        var pg = this.protocolGrab;
        if (!pg.running) return;
        // 进度推进
        if (pg.progress < 100) {
          pg.progress = Math.min(100, pg.progress + Math.floor(8 + Math.random() * 12));
        }
        // 产生本轮抓取数据
        var now = new Date();
        var ts = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0')
          + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
        var sample = this._buildProtocolSample(pg.rule, ts);
        sample.forEach(function (s) {
          s.id = 'PG-' + String(++pg._seq).padStart(4, '0');
        });
        pg.collected = sample.concat(pg.collected).slice(0, 50);
        pg.rounds += 1;
        pg.lastTime = ts;
        pg.statusText = '抓取进行中 · 第' + pg.rounds + '轮 · 进度 ' + pg.progress + '%';
        // 偶发异常
        if (Math.random() < 0.08) {
          pg.errors += 1;
          pg.collected.unshift({
            id: 'PG-ERR-' + String(++pg._seq).padStart(4, '0'),
            target: '系统异常',
            source: 'device.timeout',
            value: '连接超时重试',
            unit: '',
            type: 'String',
            frame: 'ERR|timeout',
            time: ts,
            status: '异常'
          });
        }
        // 完成
        if (pg.progress >= 100) {
          pg.running = false;
          pg.done = true;
          pg.statusText = '抓取完成 · 已解析 ' + pg.collected.length + ' 条 · 异常 ' + pg.errors + ' 次';
          if (pg._timer) { clearInterval(pg._timer); pg._timer = null; }
          if (pg.config.autoStore) showToast('抓取完成，已自动解析入库');
        }
      },
      startProtocolGrab: function () {
        var pg = this.protocolGrab;
        if (pg.rule.status === '停用') { showToast('协议已停用，无法启动抓取'); return; }
        if (pg.running) return;
        pg.running = true;
        pg.done = false;
        pg.progress = 0;
        pg.statusText = '正在建立协议连接...';
        var self = this;
        // 启动定时轮询
        var intervalMs = 2000;
        if (pg.config.policy === '定时轮询') {
          intervalMs = (pg.config.interval === '每5秒' ? 1500 : (pg.config.interval === '每30秒' ? 2000 : (pg.config.interval === '每1分钟' ? 2500 : (pg.config.interval === '每5分钟' ? 3000 : 3500))));
        } else if (pg.config.policy === '持续监听') {
          intervalMs = 1500;
        }
        this._protocolGrabTick();
        pg._timer = setInterval(function () { self._protocolGrabTick(); }, intervalMs);
        showToast('已启动协议底层数据抓取');
      },
      stopProtocolGrab: function () {
        var pg = this.protocolGrab;
        if (!pg.running) return;
        if (pg._timer) { clearInterval(pg._timer); pg._timer = null; }
        pg.running = false;
        pg.statusText = '已手动停止 · 累计 ' + pg.collected.length + ' 条';
        showToast('抓取已停止');
      },
      parseProtocolRaw: function () {
        // 一次性解析底层报文（不启动持续轮询）
        var pg = this.protocolGrab;
        if (pg.running) { showToast('抓取进行中，请先停止'); return; }
        var now = new Date();
        var ts = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0')
          + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
        var sample = this._buildProtocolSample(pg.rule, ts);
        sample.forEach(function (s) {
          s.id = 'PG-' + String(++pg._seq).padStart(4, '0');
        });
        pg.collected = sample.concat(pg.collected).slice(0, 50);
        pg.rounds += 1;
        pg.lastTime = ts;
        pg.progress = 100;
        pg.done = true;
        pg.statusText = '底层报文解析完成 · 共 ' + pg.collected.length + ' 条';
        if (pg.config.autoStore) showToast('底层报文已解析并自动入库');
        else showToast('底层报文已解析');
      },
      clearProtocolGrab: function () {
        var pg = this.protocolGrab;
        if (pg.running) { showToast('抓取进行中，无法清空'); return; }
        pg.collected = [];
        pg.rounds = 0;
        pg.errors = 0;
        pg.progress = 0;
        pg.done = false;
        pg.statusText = '已清空预览，等待开始抓取';
        pg.lastTime = '-';
      },
      _buildProtocolSample: function (rule, ts) {
        // 根据协议标准的mappings生成对应的底层报文数据（演示）
        var transport = rule.transport || 'ASTM';
        var channel = this.protocolGrab.config.channel;
        var parseLevel = this.protocolGrab.config.parseLevel;
        var rows = [];
        (rule.mappings || []).forEach(function (m) {
          var val = '';
          var unit = '';
          var src = m.source;
          var tgt = m.target;
          var type = m.type || 'String';
          // 生成报文帧（按协议标准格式）
          var frame = '';
          if (transport === 'ASTM') {
            // ASTM E1394: H|...\^...|或 O|...|或 R|...
            var seg = src.split('|')[0].trim();
            var field = src.split('|')[1] || src;
            if (seg === 'H') frame = 'H|\\^&||PS||ASSAY||P|E|1394|' + ts.replace(/[-: ]/g, '');
            else if (seg === 'O') frame = 'O|1|' + field + '||ALL||||||N';
            else if (seg === 'R') frame = 'R|1|^^' + field + '|' + (Math.random() * 100).toFixed(2) + '|' + (unit || 'mg/L') + '|N||F||' + ts;
            else frame = 'R|1|' + field + '|value|unit|N||admin|' + ts;
          } else if (transport === 'HL7') {
            // HL7 v2.x: PID|...|或 OBR|...|或 OBX|...
            var seg2 = src.split('-')[0];
            if (seg2 === 'PID') frame = 'PID|||' + (Math.floor(1000 + Math.random() * 9000)) + '||DOE^JOHN||19700101|M';
            else if (seg2 === 'OBR') frame = 'OBR|1||' + (Math.floor(1000 + Math.random() * 9000)) + '|' + field + '^LAB|||' + ts;
            else if (seg2 === 'OBX') frame = 'OBX|1|NM|' + field + '||' + (Math.random() * 100).toFixed(2) + '|' + (unit || 'mg/L') + '|N|||F|||' + ts;
            else frame = 'OBX|1|ST|' + field + '|^value|' + ts;
          } else if (transport === 'RS232') {
            // RS232 串口：原始字节流（十六进制）
            var hex = '';
            for (var k = 0; k < 16; k++) hex += Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0') + ' ';
            frame = '02 ' + hex.trim() + ' 03';
          } else if (transport === 'TCP') {
            // TCP socket：JSON 报文
            frame = '{"cmd":"query","field":"' + src + '","ts":"' + ts + '"}';
          } else if (transport === 'LIS') {
            // LIS API：REST 报文
            frame = 'GET /api/results?sample=' + (Math.floor(1000 + Math.random() * 9000)) + '&field=' + src;
          } else if (transport === 'LOINC') {
            // LOINC：编码字段
            frame = 'LOINC:' + src + '=' + (Math.random() * 100).toFixed(2) + '|' + (unit || 'mg/L');
          } else {
            frame = 'RAW|' + src + '=' + (Math.random() * 100).toFixed(2);
          }
          // 生成字段值
          if (/sample|样品|Sample|SampleID/i.test(src)) val = 'SMP-' + Math.floor(1000 + Math.random() * 9000);
          else if (/compound|化合物|Compound/i.test(src)) val = ['乙烯', '赤霉素', '生长素'][Math.floor(Math.random() * 3)];
          else if (/rt|保留时间/i.test(src)) { val = (1.2 + Math.random() * 0.6).toFixed(3); unit = 'min'; }
          else if (/area|峰面积/i.test(src)) { val = Math.floor(80000 + Math.random() * 40000); unit = 'mV·s'; }
          else if (/conc|浓度/i.test(src)) { val = (5 + Math.random() * 3).toFixed(2); unit = 'mg/L'; }
          else if (/patient|患者/i.test(src)) val = 'P' + Math.floor(1000 + Math.random() * 9000);
          else if (/date|日期|Date/i.test(src)) val = ts.split(' ')[0];
          else if (/operator|检测员/i.test(src)) val = ['张工', '李工', '王工'][Math.floor(Math.random() * 3)];
          else if (/mw|分子量/i.test(src)) { val = (346.37 + Math.random() * 0.02).toFixed(2); unit = 'Da'; }
          else if (/sn|信噪比|S\/N/i.test(src)) val = (35 + Math.random() * 15).toFixed(1);
          else if (/ct|CtValue|Ct值/i.test(src)) val = (18 + Math.random() * 12).toFixed(2);
          else if (/target|靶基因|Target/i.test(src)) val = ['ACTIN', 'GAPDH'][Math.floor(Math.random() * 2)];
          else if (/call|判定结果|Call/i.test(src)) val = Math.random() > 0.3 ? '阳性' : '阴性';
          else if (/well|孔位/i.test(src)) val = 'A' + (Math.floor(Math.random() * 12) + 1);
          else if (/reads|ReadCount/i.test(src)) { val = Math.floor(8000000 + Math.random() * 2000000); unit = 'reads'; }
          else if (/q30|Q30/i.test(src)) { val = (88 + Math.random() * 6).toFixed(2); unit = '%'; }
          else if (/gc|GCPercent|GC含量/i.test(src)) { val = (45 + Math.random() * 6).toFixed(2); unit = '%'; }
          else if (/variant|变异/i.test(src)) val = 'chr3:' + (10000 + Math.floor(Math.random() * 9000)) + ' A>G';
          else if (/image|图像/i.test(src)) val = 'IMG-' + Math.floor(1000 + Math.random() * 9000) + '.tif';
          else if (/mag|放大/i.test(src)) val = [40, 100, 200, 400][Math.floor(Math.random() * 4)] + 'x';
          else if (/scale|标尺/i.test(src)) { val = (10 + Math.random() * 5).toFixed(1); unit = 'µm'; }
          else if (/fluor|荧光/i.test(src)) { val = (1200 + Math.random() * 400).toFixed(0); unit = 'AU'; }
          else if (/element|元素/i.test(src)) val = ['氮', '磷', '钾'][Math.floor(Math.random() * 3)];
          else if (/abs|吸光度/i.test(src)) { val = (0.2 + Math.random() * 0.5).toFixed(4); unit = 'Abs'; }
          else val = (Math.random() * 100).toFixed(2);
          rows.push({
            target: tgt,
            source: src,
            value: val,
            unit: unit,
            type: type,
            frame: parseLevel === '完整报文' ? frame : (parseLevel === '字段级解析' ? src : frame + ' [' + src + ']'),
            channel: channel,
            time: ts,
            status: '正常'
          });
        });
        return rows;
      },
      _buildDeviceSample: function (device, ts) {
        // 根据设备类型生成对应的检测数据字段（演示）
        var type = device.deviceType;
        var channel = this.deviceCollect.config.channel;
        var rows = [];
        if (type === '色谱仪') {
          rows = [
            { target: '样品编号', source: 'SampleID', value: 'SMP-' + Math.floor(1000 + Math.random() * 9000), unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '化合物', source: 'Compound', value: '乙烯', unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '保留时间', source: 'RT', value: (1.2 + Math.random() * 0.6).toFixed(3), unit: 'min', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '峰面积', source: 'Area', value: Math.floor(80000 + Math.random() * 20000), unit: 'mV·s', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '浓度', source: 'Conc', value: (5 + Math.random() * 3).toFixed(2), unit: 'mg/L', type: 'Number', channel: channel, time: ts, status: '正常' }
          ];
        } else if (type === '质谱仪') {
          rows = [
            { target: '样品编号', source: 'SampleID', value: 'MS-' + Math.floor(1000 + Math.random() * 9000), unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '化合物', source: 'Compound', value: '赤霉素', unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '分子量', source: 'MW', value: (346.37 + Math.random() * 0.02).toFixed(2), unit: 'Da', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '峰面积', source: 'Area', value: Math.floor(120000 + Math.random() * 30000), unit: 'cps', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '信噪比', source: 'S/N', value: (35 + Math.random() * 15).toFixed(1), unit: '', type: 'Number', channel: channel, time: ts, status: '正常' }
          ];
        } else if (type === 'PCR仪') {
          rows = [
            { target: '孔位编号', source: 'WellID', value: 'A' + (Math.floor(Math.random() * 12) + 1), unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '样品编号', source: 'SampleID', value: 'PCR-' + Math.floor(1000 + Math.random() * 9000), unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '靶基因', source: 'Target', value: 'ACTIN', unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: 'Ct值', source: 'CtValue', value: (18 + Math.random() * 12).toFixed(2), unit: '', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '判定结果', source: 'Call', value: Math.random() > 0.3 ? '阳性' : '阴性', unit: '', type: 'String', channel: channel, time: ts, status: '正常' }
          ];
        } else if (type === '测序仪') {
          rows = [
            { target: '样品编号', source: 'SampleID', value: 'SEQ-' + Math.floor(1000 + Math.random() * 9000), unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: 'reads数', source: 'ReadCount', value: Math.floor(8000000 + Math.random() * 2000000), unit: 'reads', type: 'Int', channel: channel, time: ts, status: '正常' },
            { target: 'Q30比例', source: 'Q30Percent', value: (88 + Math.random() * 6).toFixed(2), unit: '%', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: 'GC含量', source: 'GCPercent', value: (45 + Math.random() * 6).toFixed(2), unit: '%', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '变异位点', source: 'VariantList', value: 'chr3:' + (10000 + Math.floor(Math.random() * 9000)) + ' A>G', unit: '', type: 'JSON', channel: channel, time: ts, status: '正常' }
          ];
        } else if (type === '显微镜') {
          rows = [
            { target: '图像名称', source: 'ImageName', value: 'IMG-' + Math.floor(1000 + Math.random() * 9000) + '.tif', unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '放大倍数', source: 'Mag', value: [40, 100, 200, 400][Math.floor(Math.random() * 4)] + 'x', unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '标尺', source: 'Scale', value: (10 + Math.random() * 5).toFixed(1), unit: 'µm', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '荧光强度', source: 'Fluor', value: (1200 + Math.random() * 400).toFixed(0), unit: 'AU', type: 'Number', channel: channel, time: ts, status: '正常' }
          ];
        } else {
          rows = [
            { target: '样品编号', source: 'SampleID', value: 'SP-' + Math.floor(1000 + Math.random() * 9000), unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '元素/指标', source: 'Element', value: '氮', unit: '', type: 'String', channel: channel, time: ts, status: '正常' },
            { target: '吸光度', source: 'Abs', value: (0.2 + Math.random() * 0.5).toFixed(4), unit: 'Abs', type: 'Number', channel: channel, time: ts, status: '正常' },
            { target: '浓度', source: 'Conc', value: (5 + Math.random() * 3).toFixed(2), unit: 'mg/L', type: 'Number', channel: channel, time: ts, status: '正常' }
          ];
        }
        return rows;
      },
      /* ----- 行操作 ----- */
      rowAction: function (row, msg) {
        showToast('操作成功：' + (msg || ''));
      },
      toggleMore: function (key) {
        this.moreOpen = this.moreOpen === key ? null : key;
      },
      /* ----- 用户权限辅助 ----- */
      setUserPwd: function (row) {
        this.toast('已重置账号 ' + (row.account || row.name) + ' 的密码为初始密码 Pwd@123456');
      },
      toggleUserStatus: function (row) {
        row.status = row.status === '正常' ? '禁用' : '正常';
        this.toast('账号 ' + row.name + ' 已' + row.status);
      },
      /* ----- 组织机构卡片视图辅助 ----- */
      moreKey: function (row) {
        return this.activeTab + '-' + (row.code || row.no || row.date || row.month || row.year || row.id || 'r');
      },
      postRate: function (row) {
        var t = Number(row.total) || 0;
        var o = Number(row.onPost) || 0;
        if (!t) return '0%';
        return Math.min(100, Math.round(o / t * 100)) + '%';
      },
      wcPct: function (row, kind) {
        var w = Number(row.workDays) || 0;
        var t = Number(row.restDays) || 0;
        var h = Number(row.holiDays) || 0;
        var sum = w + t + h;
        if (!sum) return '0%';
        var v = kind === 'work' ? w : (kind === 'rest' ? t : h);
        return Math.round(v / sum * 100) + '%';
      },
      posPct: function (row) {
        var t = Number(row.total) || 0;
        if (!t) return 0;
        return Math.round((Number(row.onPost) || 0) / t * 100);
      },
      personsOf: function (dept) {
        return (this.pageData['system-org-person'] || []).filter(function (p) { return p.dept === dept; });
      },
      holidaysOf: function (m) {
        return (this.pageData['system-org-holiday'] || []).filter(function (h) { return Number(String(h.date).slice(5, 7)) === m; });
      },
      calGrid: function (m) {
        var y = 2026, cells = [];
        var first = new Date(y, m - 1, 1).getDay();
        var dim = new Date(y, m, 0).getDate();
        var map = {};
        this.holidaysOf(m).forEach(function (h) { map[Number(String(h.date).slice(8))] = h; });
        for (var i = 0; i < first; i++) cells.push({ blank: true });
        for (var d = 1; d <= dim; d++) cells.push({ d: d, h: map[d] || null });
        return cells;
      },
      catTagClass: function (cat) {
        var map = { '管理岗': 'tag-blue', '技术岗': 'tag-green', '辅助岗': 'tag-cyan', '关键岗位': 'tag-orange' };
        return map[cat] || 'tag-gray';
      },
      levelTagClass: function (lv) {
        var map = { '初级': 'tag-gray', '中级': 'tag-blue', '高级': 'tag-purple', '专家': 'tag-orange' };
        return map[lv] || 'tag-gray';
      },
      avatarColor: function (name) {
        var s = String(name || '人').charCodeAt(0) || 0;
        return (s % 5) + 1;
      },
      statusDotClass: function (s) {
        if (s === '借调') return 'dot-warn';
        if (s === '离职') return 'dot-off';
        return 'dot-ok';
      },
      /* ----- 体系文件 ----- */
      selectDocNode: function (node) {
        this.docTreeNode = node;
        this.pageIndex = 1;
      },
      toggleDocNode: function (key) {
        this.$set(this.sysDocExpand, key, !this.sysDocExpand[key]);
      },
      docCount: function (c) {
        return (this.sysDocs || []).filter(function (d) { return d.cat === c.name; }).length;
      },
      openVersion: function (row) {
        this.docVersionTarget = row;
        this.docVersionVisible = true;
      },
      publishDoc: function (row) {
        row.status = '已发布';
        row.publishDate = row.publishDate || new Date().toISOString().slice(0, 10);
        showToast('文件已发布');
      },
      voidDoc: function (row) {
        row.status = '已作废';
        showToast('文件已作废');
      },
      /* ----- 知识中心 ----- */
      selectCat: function (name) {
        this.currentCat = name;
        this.pageIndex = 1;
      },
      viewDoc: function (doc) {
        this.docPreview = Object.assign({ fileIcon: 'fa-file-lines', fileColor: '#059669', size: '—', update: '—', category: '体系文件' }, doc);
      },
      /* ----- 设置 ----- */
      saveSettings: function () {
        this.aiveDrawer = false;
        showToast('设置已保存');
      },
      exportPage: function (page) {
        var n = (this.pageData[page] || []).length;
        showToast('已导出 Excel（' + page + '，共 ' + n + ' 条）');
      },
      runBizQuery: function () {
        var q = this.bizQuery;
        if (q.start && q.end && q.start > q.end) { showToast('开始日期不能晚于结束日期'); return; }
        this.bizPeriod = q.period || 'month';
        this.bizQueryApplied = true;
        var parts = [];
        if (q.start) parts.push('起 ' + q.start);
        if (q.end) parts.push('止 ' + q.end);
        parts.push('周期 ' + this.bizTabLabel2(q.period));
        if (q.kw) parts.push('关键词「' + q.kw + '」');
        showToast('已应用查询：' + parts.join('，'));
      },
      resetBizQuery: function () {
        this.bizQuery = { start: '', end: '', period: 'month', kw: '' };
        this.bizPeriod = 'month';
        this.bizQueryApplied = false;
        showToast('查询条件已重置');
      },
      bizTabLabel2: function (p) {
        var m = { month: '按月', quarter: '按季度', year: '按年度' };
        return m[p] || '按月';
      },
      bizTabLabel: function (t) {
        var m = { volume: '业务量统计', customer: '客户统计', sample: '样品统计', cycle: '检测周期统计', report: '报告统计', fee: '费用统计' };
        return m[t] || '';
      },
      bizExportItems: function (bizTab) {
        var groups = {
          volume: [
            { key: 'sbv-m', name: '业务量趋势（按月）', desc: '12 行 × 2 列：月份、业务量', headers: ['月份', '业务量'], rows: MONTHS.map(function (m, i) { return [m, [12, 15, 18, 17, 20, 22, 19, 24, 21, 23, 26, 24][i]]; }) },
            { key: 'sbv-q', name: '业务量趋势（按季度）', desc: '4 行 × 3 列：季度、业务量、报告量', headers: ['季度', '业务量', '报告量'], rows: [['一季度', 54, 50], ['二季度', 61, 57], ['三季度', 66, 61], ['四季度', 73, 68]] },
            { key: 'sbv-y', name: '业务量趋势（按年度）', desc: '4 行 × 2 列：年度、业务量', headers: ['年度', '业务量'], rows: [['2023', 132], ['2024', 158], ['2025', 179], ['2026', 186]] },
            { key: 'sbv-type', name: '检测类型分布', desc: '6 行 × 2 列：类型、数量', headers: ['类型', '数量'], rows: [['分子检测', 62], ['病原检测', 48], ['农残检测', 35], ['品质分析', 26], ['转基因检测', 15], ['其他', 11]] },
            { key: 'sbv-dept', name: '科室业务量排行', desc: '5 行 × 2 列：科室、业务量', headers: ['科室', '业务量'], rows: [['分子检测组', 64], ['病原鉴定组', 48], ['农残检测组', 32], ['组培检测组', 24], ['测序平台', 18]] }
          ],
          customer: [
            { key: 'sbc-new', name: '新增客户趋势', desc: '12 行 × 2 列：月份、新增客户数', headers: ['月份', '新增客户'], rows: MONTHS.map(function (m, i) { return [m, [6, 8, 5, 9, 7, 10, 7, 11, 8, 9, 12, 9][i]]; }) },
            { key: 'sbc-active', name: '活跃客户分布', desc: '3 行 × 2 列：客户类型、数量', headers: ['客户类型', '数量'], rows: [['活跃客户', 68], ['一般客户', 44], ['潜在客户', 14]] },
            { key: 'sbc-rank', name: '客户业务量排名', desc: '5 行 × 2 列：客户、委托量', headers: ['客户', '委托量'], rows: [['绿植研究所', 28], ['花卉科技园', 24], ['种业集团', 19], ['农科院中心', 16], ['检测联盟', 13]] }
          ],
          sample: [
            { key: 'sbs-count', name: '样品数量趋势', desc: '12 行 × 2 列：月份、样品数', headers: ['月份', '样品数'], rows: MONTHS.map(function (m, i) { return [m, [86, 102, 98, 112, 105, 120, 108, 126, 115, 118, 132, 128][i]]; }) },
            { key: 'sbs-type', name: '样品类型分布', desc: '6 行 × 2 列：类型、数量', headers: ['类型', '数量'], rows: [['叶片', 420], ['土壤', 280], ['种苗', 210], ['花蕾', 150], ['其他', 130], ['水样', 90]] }
          ],
          cycle: [
            { key: 'sbd-cycle', name: '平均检测周期', desc: '12 行 × 3 列：月份、实际周期、标准周期', headers: ['月份', '实际周期(天)', '标准周期(天)'], rows: MONTHS.map(function (m, i) { return [m, [5.6, 5.9, 5.4, 6.2, 5.8, 5.7, 6.1, 5.5, 5.9, 5.6, 5.4, 5.8][i], 6.5]; }) },
            { key: 'sbd-timeout', name: '超时率趋势', desc: '12 行 × 2 列：月份、超时率', headers: ['月份', '超时率(%)'], rows: MONTHS.map(function (m, i) { return [m, [4.2, 3.8, 4.6, 3.5, 3.9, 3.2, 3.6, 3.0, 3.4, 3.1, 2.8, 3.2][i]]; }) }
          ],
          report: [
            { key: 'sbr-count', name: '报告数量趋势', desc: '12 行 × 2 列：月份、报告数', headers: ['月份', '报告数'], rows: MONTHS.map(function (m, i) { return [m, [11, 14, 17, 16, 19, 21, 18, 22, 20, 22, 24, 23][i]]; }) },
            { key: 'sbr-rework', name: '返工率趋势', desc: '12 行 × 2 列：月份、返工率', headers: ['月份', '返工率(%)'], rows: MONTHS.map(function (m, i) { return [m, [6.2, 5.8, 6.4, 5.2, 5.6, 4.9, 5.3, 4.7, 5.0, 4.5, 4.8, 4.5][i]]; }) }
          ],
          fee: [
            { key: 'sbf-fee', name: '月度收费金额', desc: '12 行 × 2 列：月份、收费金额(万元)', headers: ['月份', '收费金额(万元)'], rows: MONTHS.map(function (m, i) { return [m, [8.2, 9.5, 11.6, 10.8, 12.5, 14.2, 12.8, 15.6, 13.9, 14.8, 16.2, 15.8][i]]; }) },
            { key: 'sbf-arrears', name: '欠费情况', desc: '3 行 × 2 列：欠费类别、数量', headers: ['欠费类别', '数量'], rows: [['已结清', 86], ['欠费1月内', 11], ['欠费超1月', 3]] },
            { key: 'sbf-trend', name: '年度收入趋势', desc: '4 行 × 2 列：年度、收入(万元)', headers: ['年度', '收入(万元)'], rows: [['2023', 98.4], ['2024', 121.6], ['2025', 146.8], ['2026', 164.2]] }
          ]
        };
        return groups[bizTab] || [];
      },
      openExportPicker: function (page) {
        if (page !== 'stat-business') { this.exportPage(page); return; }
        var items = this.bizExportItems(this.bizTab);
        if (!items.length) { showToast('当前子页签无可导出数据'); return; }
        var checked = {};
        items.forEach(function (it) { checked[it.key] = true; });
        this.exportPickerItems = items;
        this.exportPickerChecked = checked;
        this.exportPickerAll = true;
        this.exportPickerTitle = '导出 Excel · ' + this.bizTabLabel(this.bizTab);
        this.exportPickerVisible = true;
      },
      toggleExportItem: function (key) {
        this.exportPickerChecked[key] = !this.exportPickerChecked[key];
        this.syncExportAll();
      },
      toggleAllExport: function () {
        var self = this;
        var to = !this.exportPickerAll;
        this.exportPickerItems.forEach(function (it) { self.exportPickerChecked[it.key] = to; });
        this.exportPickerAll = to;
      },
      syncExportAll: function () {
        var self = this;
        this.exportPickerAll = this.exportPickerItems.every(function (it) { return self.exportPickerChecked[it.key]; });
      },
      confirmExport: function () {
        var self = this;
        var picked = this.exportPickerItems.filter(function (it) { return self.exportPickerChecked[it.key]; });
        if (!picked.length) { showToast('请至少选择一项数据'); return; }
        var csv = '\uFEFF';
        picked.forEach(function (it) {
          csv += '# ' + it.name + '\r\n';
          csv += it.headers.join(',') + '\r\n';
          it.rows.forEach(function (row) {
            csv += row.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',') + '\r\n';
          });
          csv += '\r\n';
        });
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = '业务统计导出_' + (self.bizTab || 'all') + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.exportPickerVisible = false;
        showToast('已导出 ' + picked.length + ' 个数据项');
      },
      toast: function (msg) { showToast(msg); }
    }
  };

  var app = window.Vue.createApp(App);
  app.mount('#app');
})();