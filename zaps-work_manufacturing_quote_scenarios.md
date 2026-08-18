# zaps.work 制造报价场景梳理

版本：2026-07-14

本文将下一批制造类报价需求整理为四个场景：FDM 小批量零件、光固化打印、亚克力招牌、定制礼品雕刻。四个场景共享 zaps.work 的报价引擎，但不强行使用同一套输入表单。

## 1. 产品判断

这四个场景都在回答同一个问题：

> 把材料、设备、人工和一次性准备成本，转成一份可以发给客户的报价。

它们的差异主要在成本发生方式：

| 场景 | 主要成本结构 | 最重要的报价问题 |
| --- | --- | --- |
| FDM Printing Quote | 材料、机器时间、失败损耗、支撑拆除、批量人工 | 一批零件怎样分摊调机和失败风险 |
| Resin Printing Quote | 树脂、支撑、排版、清洗固化、破损风险 | 模型数量增加后，树脂和后处理怎样变化 |
| Acrylic Sign Quote | 板材、排版损耗、切割、雕刻、组装、五金、设计 | 一张板材如何分摊到多个招牌 |
| Custom Engraving Quote | 产品胚件、起版、单件加工、设计确认、数量阶梯价 | 小批量和大批量如何使用不同单价 |

## 2. 共享报价引擎

四个工具都应复用以下能力：

- 多项目或多数量报价。
- 全局货币和单位系统。
- 一次性成本与按件成本分开。
- 目标毛利、税、折扣和最低价格保护。
- 成本明细、利润和毛利率展示。
- PDF、CSV、复制摘要。
- 客户资料默认留在浏览器，不进入分析数据库。
- 匿名分析只记录场景、单位、数量、成本类别和报价结果。
- 可选字段默认关闭，减少首次填写干扰。

新增的通用能力：

### 2.1 成本作用域

每个成本项都应明确属于哪一种：

| 作用域 | 示例 | 默认计算方式 |
| --- | --- | --- |
| Quote once | 调机、起版、设计、文件检查 | 整张报价只计算一次 |
| Per item | 每件后处理、每件组装、每件包装 | 成本 × 数量 |
| Per batch | 一批排版、一次清洗、一次装卸 | 每批计算一次 |
| Per unit time | 机器时间、加工时间、人工时间 | 时间 × 费率 |
| Risk reserve | 失败、破损、返工 | 按用户输入比例预留 |

### 2.2 数量价格阶梯

不要把所有折扣都做成一个模糊的百分比。第一版可以支持 3 个数量区间：

| 区间 | 价格规则 |
| --- | --- |
| 1 件 | 单件价格 |
| 2–9 件 | 小批量单价或折扣 |
| 10 件以上 | 批量单价或折扣 |

后续再支持任意数量区间。报价预览中只展示实际命中的区间，不把内部公式全部暴露给客户。

## 3. 场景一：FDM Printing Quote

### 3.1 目标用户

接小批量零件订单的 FDM 打印店、创客工作室和个人打印服务商。

### 3.2 核心输入

#### 订单层

- 项目名称。
- 数量。
- 单件或整批输入模式。
- 目标毛利。
- 批量折扣。
- 税、包装、运费和其他费用。

#### 打印层

- 材料：PLA、PETG、ABS、TPU、其他。
- 每件耗材重量，或整批耗材重量。
- 每件打印时间，或整批打印时间。
- 支撑耗材重量或支撑比例。
- 打印机费率。
- 调机时间，一次性。
- 文件检查或切片准备时间，一次性。

#### 后处理与风险

- 支撑拆除时间，按件。
- 打磨或后处理时间，按件。
- 失败率或失败预留。
- 包装时间与包装成本。

### 3.3 计算边界

第一版不解析 STL、3MF 或 G-code，用户手动输入切片器统计数据。必须明确提示：

> 请从切片器输入每件或整批的耗材和打印时间，工具不会自动读取模型文件。

推荐公式：

```text
material = (filament + support) × material_rate × quantity
machine = print_time × machine_rate × quantity
setup_labor = setup_minutes × labor_rate
post_process = support_removal_minutes × labor_rate × quantity
risk_reserve = (material + machine + post_process) × failure_rate
direct_cost = material + machine + setup_labor + post_process + risk_reserve + other_costs
quote = direct_cost / (1 - target_margin) - batch_discount
```

需要在界面中明确“打印时间是每件还是整批”，避免批量订单被重复计算。

### 3.4 MVP 不做

- 自动读取模型尺寸或体积。
- 自动判断支撑量。
- 多台打印机排程。
- 订单状态、库存和付款管理。

### 3.5 SEO 入口

- `FDM 3D printing quote calculator`
- `3D printing batch pricing calculator`
- `how to price small batch 3D prints`

## 4. 场景二：Resin Printing Quote

### 4.1 目标用户

打印微缩模型、手办、桌游模型和高细节模型的光固化打印服务商。

### 4.2 核心输入

#### 树脂与排版

- 树脂类型。
- 模型树脂体积，按件或整批。
- 支撑树脂体积，按件或整批。
- 清洗液或耗材成本。
- 排版数量。
- 每层或整批打印时间。
- 失败或破损率。

#### 后处理

- 支撑拆除时间。
- 清洗时间。
- 固化时间。
- 清洗液、手套和耗材成本。
- 打磨、底漆或其他后处理。

#### 订单层

- 数量。
- 包装。
- 破损补印预留。
- 目标毛利和数量折扣。

### 4.3 关键模型

光固化不能只按树脂价格计算。后处理和破损风险是与 FDM 最大的差异：

```text
resin_cost = (model_resin + support_resin + vat_waste) × resin_rate
machine_cost = print_time × machine_rate
post_process = cleaning + curing + support_removal + finishing
failure_reserve = (resin_cost + machine_cost + post_process) × damage_rate
direct_cost = resin_cost + machine_cost + post_process + failure_reserve + packaging
```

第一版只支持手动输入切片器给出的体积和时间，不自动解析 Chitubox、Lychee 或 STL 文件。

### 4.4 与 FDM 的关系

建议独立页面，而不是在 FDM 页面里加一个“技术选择”后塞入所有字段：

- 搜索意图不同。
- 成本字段不同。
- 页面说明、FAQ 和示例不同。
- 但底层共享数量、一次性成本、风险、后处理和报价导出模块。

## 5. 场景三：Acrylic Sign Quote

### 5.1 目标用户

制作亚克力门牌、店招、活动牌和带切割、雕刻、组装的定制招牌工作室。

### 5.2 核心输入

#### 板材

- 亚克力颜色和厚度。
- 板材尺寸。
- 板材采购价。
- 成品尺寸和数量。
- 板材利用率或损耗率。
- 透明保护膜、背胶等材料。

#### 加工

- 切割长度或切割时间。
- 雕刻面积、长度或时间。
- 打孔数量。
- 折弯或热加工时间。
- 机器费率。
- 设置和文件检查时间。

#### 组装与交付

- 组装时间。
- 五金成本。
- 胶水、支架、螺丝等辅料。
- 设计或排版费。
- 包装、运输和安装。

### 5.3 关键模型

这个场景比通用激光切割多了“成品单位”和“板材单位”的转换：

```text
sheet_material = sheet_price × required_sheets
required_sheets = ceil(required_area / usable_sheet_area)
cut_cost = cut_time × machine_rate
engrave_cost = engrave_time × machine_rate
assembly_cost = assembly_minutes × labor_rate
design_fee = quote_once
direct_cost = sheet_material + cut_cost + engrave_cost + assembly_cost + hardware + design_fee
quote = direct_cost / (1 - target_margin)
```

第一版可以先让用户直接输入“预计使用板材成本”，避免马上做真正的二维排版算法。板材尺寸和利用率作为第二阶段字段。

### 5.4 页面建议

独立命名为 `Acrylic Sign Quote`，不要只叫 `Laser Cutting Calculator`。用户搜索的是招牌报价，而不是机器成本。

## 6. 场景四：Custom Engraving Quote

### 6.1 目标用户

制作木牌、金属名片、皮革、杯子、奖牌、礼品和企业定制物料的雕刻服务商。

### 6.2 核心输入

#### 产品与材料

- 产品类型。
- 产品胚件单价。
- 材料或表面类型。
- 数量。
- 包装和配件。

#### 起版与设计

- 起版费，一次性。
- 设计或文件处理费，一次性。
- 打样费。
- 客户修改次数或额外修改费。
- 证明稿确认时间。

#### 加工

- 单件雕刻时间。
- 机器费率。
- 固定夹具或定位时间，一次性。
- 清洁、上色、填漆或其他后处理。
- 急件费。

### 6.3 数量阶梯

雕刻报价的核心不是单一毛利率，而是“数量越多，起版成本被摊薄”：

```text
setup_cost = artwork_fee + jig_setup_fee + proof_fee
unit_cost = blank_cost + engraving_time × machine_rate + finishing_per_unit + packaging
batch_cost = setup_cost + unit_cost × quantity + other_costs
unit_price = batch_cost / quantity
```

报价界面应展示：

- 1 件价格。
- 10 件价格。
- 50 件价格。
- 当前数量命中的单价。

### 6.4 与 Acrylic Sign 的关系

两者都可能使用激光设备，但不应合并为一个表单：

- Acrylic Sign 以板材利用率和成品尺寸为核心。
- Custom Engraving 以产品胚件、起版费和单件加工时间为核心。
- 两者可以共享“加工时间、设计费、夹具费、数量阶梯价”组件。

## 7. 推荐开发顺序

| 优先级 | 工具 | 原因 | 预计复用程度 |
| --- | --- | --- | --- |
| 1 | FDM Printing Quote | 现有 3D 打印基础最接近；小批量和批量折扣有明确需求 | 很高 |
| 2 | Resin Printing Quote | 与 FDM 共享打印报价骨架，但能覆盖不同材料和高价值模型 | 很高 |
| 3 | Custom Engraving Quote | 字段相对清晰，数量阶梯价有明确搜索意图 | 中高 |
| 4 | Acrylic Sign Quote | 价值高，但板材排版、利用率和成品尺寸更复杂 | 中等 |

推荐先做一个 **FDM Batch Quote vertical slice**：

1. 只支持 FDM。
2. 支持 1–100 件。
3. 明确区分一次性成本和按件成本。
4. 支持支撑拆除、失败预留和批量折扣。
5. 手动输入切片器统计，不解析模型文件。
6. 复用现有 PDF、CSV、隐私和多语言框架。

## 8. 统一验收标准

每个新工具上线前都必须满足：

- 默认输入可以在 2 分钟内完成一次报价。
- 所有影响最终价格的字段都进入计算，不存在只展示不生效的字段。
- 一次性成本不会因为数量增加而重复计算。
- 按件成本会随数量正确变化。
- 风险预留、折扣和目标毛利的计算关系可解释。
- 结果区显示直接成本、报价、利润和毛利率。
- PDF 和 CSV 使用同一份报价结果。
- 空值、负数、过大数量和无效时间有明确保护。
- 移动端优先显示表单，再显示结果。
- 页面具备独立标题、描述、FAQ、canonical、`hreflang`、sitemap 和相关指南内链。
- 客户姓名、邮箱、电话、地址、公司详情和报价备注不进入分析数据库。

## 9. 暂不做的能力

以下能力先不放入第一版，避免工具变成复杂 ERP：

- STL、3MF、G-code、SVG 或 CAD 文件自动解析。
- 自动排版和真正的材料嵌套优化。
- 打印机或激光机队列排程。
- 客户账户、订单状态和付款。
- 库存、供应商采购价同步。
- 自动发送邮件和 CRM 集成。

第一阶段的定位仍然是：**透明的成本输入 + 可解释的报价结果 + 浏览器内生成的客户报价单**。
