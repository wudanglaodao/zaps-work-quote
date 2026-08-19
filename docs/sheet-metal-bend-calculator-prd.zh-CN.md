# 需求规格与设计文档：钣金折弯扣除量与展开长度计算器 (Sheet Metal Bend Calculator PRD)

> 状态：规划就绪 (Ready for Development)<br>
> 路径：`/calculators/sheet-metal-bend-calculator`<br>
> 目标分类：实物生产与制造 (Fabrication & Manufacturing)<br>
> 联动工具：激光切割报价计算器 (`/calculators/laser-cutting-cost-calculator`)

---

## 1. 用户价值与核心场景

### 1.1 核心痛点
- 钣金加工下料前，零件图纸标注的是外尺寸（如 L 型件外边长 $A=50\text{mm}, B=50\text{mm}$）。
- 板材折弯时外侧受拉伸、内侧受压缩，展开下料长度并不是 $A+B$，而是需要减去 **折弯扣除量 (Bend Deduction, BD)**。
- 传统操作需要查繁琐的折弯系数经验表或打开大型 CAD 软件。

### 1.2 解决方案
提供一个轻量、直观且支持交互图形的网页计算器：
1. 输入板厚、折弯角度、内 R 角、法兰边长。
2. 自动匹配材料的推荐 $K\text{-Factor}$ 或允许手动微调。
3. 毫秒级计算 **展开下料长度 (Flat Pattern Length)**、**折弯补偿量 (Bend Allowance, BA)**、**折弯扣除量 (Bend Deduction, BD)** 和 **外退量 (Setback, OSSB)**。
4. 提供动态交互式 **折弯截面示意图**（带中性层标识与尺寸标注）。
5. 提供 **“一键将展开尺寸带入激光切割报价单”** 快捷按钮。

---

## 2. 数学模型与工程计算公式

### 2.1 输入参数
- **板材材质 (Material)**：冷轧碳钢 (CRS, $K=0.44$)、不锈钢 (SUS304, $K=0.45$)、铝合金 (6061/5052, $K=0.40$)、黄铜 ($K=0.42$)、自定义 ($0.20 \sim 0.50$)。
- **板厚 $T$ (Thickness)**：单位 mm / inch。
- **折弯内角半径 $R$ (Inside Bend Radius)**：单位 mm / inch。
- **折弯角度 $\theta$ (Bend Angle / Included Angle)**：默认 $90^\circ$，支持 $1^\circ \sim 179^\circ$。
- **法兰外边长 $A, B$ (Flange Lengths)**：边 1 长度与边 2 长度。

### 2.2 计算公式
1. **外退量 (Outer Setback, OSSB)**：
   $$OSSB = \tan\left(\frac{\theta}{2}\right) \times (R + T)$$
2. **折弯补偿量 (Bend Allowance, BA)**：
   $$BA = \frac{\pi \times \theta}{180} \times (R + K \times T)$$
3. **折弯扣除量 (Bend Deduction, BD)**：
   $$BD = 2 \times OSSB - BA$$
4. **单折弯展开下料总长度 ($L_{\text{flat}}$)**：
   $$L_{\text{flat}} = A + B - BD$$
5. **多折弯扩展 (U 型件 / 多法兰件)**：
   $$L_{\text{flat}} = \sum A_i - (N_{\text{bends}} \times BD)$$

---

## 3. UI 布局与交互设计

```
+-------------------------------------------------------------------+
|                        SHEET METAL BEND CALCULATOR                |
+---------------------------------+---------------------------------+
|  [参数输入面板]                  |  [动态截面示意图]                |
|  - 材质选择: [冷轧碳钢 ▼]         |     |                             |
|  - K-Factor: [0.44] (自动/手动) |     |  A (50mm)                   |
|  - 板厚 T:   [2.0 mm]           |     +---------------+             |
|  - 内 R 角:  [1.5 mm]           |                     |             |
|  - 折弯角度: [90°] (带滑块)     |          中性层(红虚线)| B (50mm)  |
|  - 边长 A:   [50.0 mm]          |                     |             |
|  - 边长 B:   [50.0 mm]          +---------------------------------+
|                                 |  [计算结果输出]                  |
|                                 |  展开下料长度:  96.48 mm          |
|                                 |  折弯扣除量 BD: 3.52 mm          |
|                                 |  折弯补偿 BA:   3.48 mm          |
|                                 |  外退量 OSSB:   3.50 mm          |
|                                 +---------------------------------+
|                                 |  [操作与联动]                    |
|                                 |  [复制数据] [导出PDF参数卡]      |
|                                 |  [👉 将展开尺寸带入激光切割报价单] |
+---------------------------------+---------------------------------+
```

---

## 4. 多语言与单位切换
- **公制 (Metric - mm)** 与 **英制 (Imperial - inch)** 即时无缝双向换算。
- 完整支持现有 12 种语言（en, zh-hant, zh-hans, de, ja, es, fr, pt-br, ko, it, nl, pl）。
