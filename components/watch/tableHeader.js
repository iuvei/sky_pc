// 根据彩票类型获取彩票位数
function getTrendDigitByType(gameType) {
  switch (gameType) {
    case GameType.SSC:
    case GameType.DPC:
    case GameType.PCDD:
    case GameType.PL3:
      return getArrayByNum(9, true);
    case GameType.PK10:
      return getArrayByNum(10);
    case GameType.K3:
      return getArrayByNum(6);
    case GameType.TEN1C5:
      return getArrayByNum(11);
  }
}
export const getTrendBallArr = {
  ssc: new Array(10).fill(1).map((v, k) => k),
  "3d": new Array(10).fill(1).map((v, k) => k),
  "11x5": new Array(11).fill(1).map((v, k) => k + 1),
  pk10: new Array(10).fill(1).map((v, k) => k + 1),
  k3: new Array(6).fill(1).map((v, k) => k + 1),
  lhc: new Array(49).fill(1).map((v, k) => k + 1),
  pcdd: new Array(10).fill(1).map((v, k) => k),
};
export const getTrendHeads = {
  ssc: ["万位走势", "千位走势", "百位走势", "十位走势", "个位走势"],
  "3d": ["百位走势", "十位走势", "个位走势"],
  "11x5": ["一位走势", "二位走势", "三位走势", "四位走势", "五位走势"],
  pk10: [
    "冠军",
    "亚军",
    "季军",
    "第四名",
    "第五名",
    "第六名",
    "第七名",
    "第八名",
    "第九名",
    "第十名",
  ],
  k3: ["一位走势", "二位走势", "三位走势"],
  lhc: ["第一位", "第二位", "第三位", "第四位", "第五位", "第六位", "第七位"],
  pcdd: ["正码一", "正码二", "正码三"],
};

// export default { getTrendBallArr, getTrendHeads };
