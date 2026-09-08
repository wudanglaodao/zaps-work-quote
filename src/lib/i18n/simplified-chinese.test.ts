import { describe, expect, it } from "vitest";
import { getPressBrakeTonnageCopy } from "./press-brake-tonnage";
import { getSheetMetalBendCopy } from "./sheet-metal-bend";
import { toSimplifiedChinese } from "./simplified-chinese";

describe("Simplified Chinese converter & localized copies", () => {
  it("converts mechanical and fabrication terminology accurately", () => {
    expect(toSimplifiedChinese("折彎機噸位計算器")).toBe("折弯机吨位计算器");
    expect(toSimplifiedChinese("板金空彎每公尺所需噸數")).toBe("钣金空气折弯每米所需吨数");
    expect(toSimplifiedChinese("不鏽鋼、鋁合金與高強度鋼")).toBe("不锈钢、铝合金与高强度钢");
    expect(toSimplifiedChinese("自訂材質與安全係數")).toBe("自定义材质与安全系数");
    expect(toSimplifiedChinese("機台的最大加工能力")).toBe("机床的最大加工能力");
  });

  it("produces authentic Simplified Chinese for press-brake-tonnage copy", () => {
    const copy = getPressBrakeTonnageCopy("zh-hans");
    expect(copy.heading).toBe("折弯机吨位计算器");
    expect(copy.intro).toContain("钣金");
    expect(copy.intro).toContain("折弯机");
    expect(copy.intro).toContain("每米");
    expect(copy.materialOptions.stainlessSteel).toBe("不锈钢 (650 MPa)");
    expect(copy.materialOptions.aluminum).toBe("铝 (250 MPa)");
    expect(copy.tonnageWithSafety).toBe("含安全系数吨位");
    expect(copy.recommendedDieOpening).toBe("推荐 V 模开口");
    expect(copy.capacityWarning).toContain("机床");
  });

  it("produces authentic Simplified Chinese for sheet-metal-bend copy", () => {
    const copy = getSheetMetalBendCopy("zh-hans");
    expect(copy.heading).toBe("钣金折弯展开计算器");
    expect(copy.materialOptions.stainlessSteel).toContain("不锈钢");
    expect(copy.materialOptions.aluminum).toContain("铝合金");
  });
});
