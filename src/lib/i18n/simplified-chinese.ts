import type { Locale } from "./config";

const characterMap = new Map<string, string>([
  ["萬", "万"], ["與", "与"], ["為", "为"], ["個", "个"], ["價", "价"], ["費", "费"], ["計", "计"], ["報", "报"], ["單", "单"], ["實", "实"], ["際", "际"], ["產", "产"], ["業", "业"], ["務", "务"], ["處", "处"], ["讀", "读"], ["寫", "写"], ["檔", "档"], ["檢", "检"], ["關", "关"], ["於", "于"], ["開", "开"], ["顯", "显"], ["儲", "储"], ["資", "资"], ["訊", "讯"], ["總", "总"], ["體", "体"], ["網", "网"], ["頁", "页"], ["覽", "览"], ["導", "导"], ["電", "电"], ["腦", "脑"], ["機", "机"], ["線", "线"], ["錄", "录"], ["輸", "输"], ["點", "点"], ["擊", "击"], ["時", "时"], ["間", "间"], ["幣", "币"], ["貨", "货"], ["稅", "税"], ["運", "运"], ["勞", "劳"], ["員", "员"], ["場", "场"], ["風", "风"], ["險", "险"], ["損", "损"], ["壞", "坏"], ["範", "范"], ["圍", "围"], ["選", "选"], ["擇", "择"], ["設", "设"], ["備", "备"], ["專", "专"], ["屬", "属"], ["節", "节"], ["區", "区"], ["國", "国"], ["歷", "历"], ["經", "经"], ["濟", "济"], ["預", "预"], ["測", "测"], ["檯", "台"], ["畫", "画"], ["圖", "图"], ["複", "复"], ["雜", "杂"], ["項", "项"], ["稱", "称"], ["號", "号"], ["組", "组"], ["織", "织"], ["統", "统"], ["維", "维"], ["護", "护"], ["應", "应"], ["讓", "让"], ["這", "这"], ["還", "还"], ["從", "从"], ["來", "来"], ["會", "会"], ["對", "对"], ["將", "将"], ["後", "后"], ["裡", "里"], ["內", "内"], ["門", "门"], ["長", "长"], ["廣", "广"], ["進", "进"], ["遠", "远"], ["達", "达"], ["過", "过"], ["邊", "边"], ["轉", "转"], ["換", "换"], ["變", "变"], ["調", "调"], ["簡", "简"], ["語", "语"], ["隱", "隐"], ["顧", "顾"], ["聯", "联"], ["絡", "络"], ["郵", "邮"], ["碼", "码"], ["庫", "库"], ["瀏", "浏"], ["覽", "览"], ["匯", "汇"], ["據", "据"], ["無", "无"], ["認", "认"], ["證", "证"], ["權", "权"], ["責", "责"], ["啟", "启"], ["擴", "扩"], ["縮", "缩"], ["觀", "观"], ["態", "态"], ["錯", "错"], ["誤", "误"], ["結", "结"], ["給", "给"], ["戶", "户"], ["發", "发"], ["傳", "传"], ["監", "监"], ["驗", "验"], ["註", "注"], ["釋", "释"], ["層", "层"], ["編", "编"], ["輯", "辑"], ["靜", "静"], ["載", "载"], ["類", "类"], ["劃", "划"], ["術", "术"], ["義", "义"], ["額", "额"], ["雙", "双"], ["礙", "碍"], ["階", "阶"], ["軟", "软"], ["連", "连"], ["級", "级"], ["別", "别"], ["試", "试"], ["審", "审"], ["議", "议"], ["題", "题"], ["優", "优"], ["現", "现"], ["黃", "黄"], ["麗", "丽"], ["衛", "卫"], ["醫", "医"], ["愛", "爱"], ["樂", "乐"], ["聽", "听"], ["齊", "齐"], ["龍", "龙"], ["灣", "湾"]
]);

const terminologyMap = new Map<string, string>([
  ["雷射", "激光"],
  ["列印", "打印"],
  ["设定", "设置"],
]);

function simplify(value: unknown): unknown {
  if (typeof value === "string") {
    const simplified = value.replace(/[\s\S]/g, (character) => characterMap.get(character) ?? character);
    return [...terminologyMap].reduce((result, [traditional, simplifiedTerm]) => result.replaceAll(traditional, simplifiedTerm), simplified);
  }
  if (Array.isArray(value)) return value.map(simplify);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, simplify(entry)]));
  return value;
}

export function toSimplifiedChinese<T>(value: T): T {
  return simplify(value) as T;
}

export function withSimplifiedChinese<T extends { "zh-hant": unknown }>(translations: T): T & { "zh-hans": T["zh-hant"] } {
  return { ...translations, "zh-hans": toSimplifiedChinese(translations["zh-hant"]) };
}

export function getLocalizedValue<T>(translations: { "zh-hant": T } & Partial<Record<Locale, T>>, locale: Locale): T {
  const value = translations[locale] ?? translations["zh-hant"];
  return locale === "zh-hans" ? toSimplifiedChinese(value) : value;
}
