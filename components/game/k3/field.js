function setBallList(playid) {
  switch (playid) {
    case 1: //和值
      return [
        {
          name: "和值",
          option: [
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            "大",
            "小",
            "单",
            "双"
          ].map((v, k) => {
            if (k < 16) {
              return { label: v, value: k + 4, selected: false, odds: false };
            } else {
              return {
                label: v,
                value: k - 16,
                selected: false,
                odds: false
              };
            }
          })
        }
        // {
        //   name: "",
        //   option: ["大", "小", "单", "双"].map((v, k) => ({
        //     label: v,
        //     value: k,
        //   })),
        // },
      ];
      break;
    case 7:
      return [
        {
          name: "复选",
          option: ["1 1", "2 2", "3 3", "4 4", "5 5", "6 6"].map((v, k) => ({
            label: v,
            value: k + 1,
            selected: false,
            odds: false
          }))
        }
      ];

      break;
    case 5: //胆拖
    case 10: // 二不同号
      return [
        {
          name: "胆码",
          option: [1, 2, 3, 4, 5, 6].map((v, k) => ({
            label: v,
            value: k + 1,
            selected: false,
            odds: false
          }))
        },
        {
          name: "拖码",
          option: [1, 2, 3, 4, 5, 6].map((v, k) => ({
            label: v,
            value: k + 1,
            selected: false,
            odds: false
          }))
        }
      ];
      break;
    case 14: //双面盘
      return [
        {
          name: "号码一",
          option: ["大", "小", "单", "双"].map((v, k) => ({
            label: v,
            value: k,
            selected: false,
            odds: false
          }))
        },
        {
          name: "号码二",
          option: ["大", "小", "单", "双"].map((v, k) => ({
            label: v,
            value: k + 4,
            selected: false,
            odds: false
          }))
        },
        {
          name: "号码三",
          option: ["大", "小", "单", "双"].map((v, k) => ({
            label: v,
            value: k + 8,
            selected: false,
            odds: false
          }))
        },
        {
          name: "混合",
          option: ["半顺", "红号", "大红", "小红"].map((v, k) => ({
            label: v,
            value: k + 12,
            selected: false,
            odds: false
          }))
        }
      ];
      // this.typeNum = 0;
      // this.playersChl = ;
      break;
    case 15: //	三同号
      return [
        {
          name: "通选",
          class: "long",
          option: [
            {
              label: "三同号通选",
              value: 0,
              selected: false,
              odds: false
            }
          ]
        },
        {
          name: "单选",
          option: ["1 1 1", "2 2 2", "3 3 3", "4 4 4", "5 5 5", "6 6 6"].map(
            (v, k) => ({
              label: v,
              value: k + 1,
              selected: false,
              odds: false
            })
          )
        }
      ];
      break;
  }
}

export default setBallList;
