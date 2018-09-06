export default [
  {
    title: "账号管理",
    icon: "account",
    li: [
      {
        label: "个人信息",
        url: "info"
      },
      {
        label: "安全中心",
        url: "safe"
      },
      {
        label: "银行卡管理",
        url: "bank"
      }
    ]
  },
  {
    title: "投注管理",
    icon: "betting",
    li: [
      {
        label: "投注记录",
        url: "betrecord",
      },
      {
        label: "追号记录",
        url: "tracenumber",
      },
    ],
  },
  {
    title: "活动中心",
    icon: "promotion",
    li: [
      {
        label: "每日签到",
        url: "sign"
      },
      // {
      //   label: "优惠管理",
      //   url: "info"
      // }
    ]
  },
  {
    title: "资金管理",
    icon: "property",
    li: [
      {
        label: "在线入款",
        url: "recharge"
      },
      {
        label: "在线取款",
        url: "getcash"
      },
      {
        label: "交易记录",
        url: "dealrecord"
      },
      {
        label: "充值记录",
        url: "rechargerecord"
      },
      {
        label: "取款记录",
        url: "getrecord"
      },
      {
        label: "现金交易",
        url: "cashTransaction",
        iconPosition: "-56px -268px"
      }
    ]
  },

  {
    title: "代理中心",
    icon: "agent",
    li: [
      {
        label: "代理说明",
        url: "agentThat",
        iconPosition: "-30px -268px"
      },
      {
        label: "代理报表",
        url: "theReport",
        iconPosition: "4px -298px"
      },
      {
        label: "下级报表",
        url: "theLower",
        iconPosition: "-28px -298px"
      },
      {
        label: "下级开户",
        url: "lowerLevelAccount",
        iconPosition: "0px -184px"
      },
      {
        label: "下级管理",
        url: "lowerManage",
        iconPosition: "-60px -185px"
      },
      {
        label: "投注明细",
        url: "devotethedetail",
        iconPosition: "-55px -212px"
      },
      {
        label: "交易明细",
        url: "trading",
        iconPosition: "-56px -268px"
      }
    ]
  },
  {
    title: "消息管理",
    icon: "message",
    li: [
      {
        label: "站内信",
        url: "info"
      },
      {
        label: "网站公告",
        url: "notice",
        li:[
          {
            label:"公告详情",
            url:'noticeInfo'
          }
        ]
      },
      {
        label: "我的留言",
        url: "leavemessage"
      }
    ]
  }
];
