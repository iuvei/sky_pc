# pccp

> pccp

## 版本更新记录

### V1.0.1.8

1. 添加 getSysinfo 接口的缓存为 5 分钟
2. 修复资讯详情显示不对的问题
3. 修复优惠活动展开时没有显示完成的问题
4. 修复注册邀请码显示不对的问题

### V1.0.1.7

1. 删除 getSysinfo 接口的缓存
2. 修复用户晋级活动判断

### V1.0.1.6

1. 修复 PK10 有时不自动开奖，开奖隔一期的问题
2. 修复页面经常报错的问题
3. 世界之窗浏览器提示升级浏览器
4. 修复选择单式移出输入框后报错的问题
5. 修复部分彩种全选后无法下注的问题
6. 修复 3D 无法投注的问题

### V1.0.1.5

1. 更改帮助部分 用户中心 改为 我的账户
2. 更改帮助 提款条件部分条款
3. 添加 meta 头，双核浏览器默认使用 webkit 内核渲染
4. 修复代理中心投注明细显示投注总额和单注金额不对的问题
5. 修复代理中心查询问题和投注记录没有翻页的问题
6. 修复单式投注排序和部分单式投注错误的问题
7. 修复首页进入 3D 投注报错的问题
8. 修复充值选项过多过长时文字重叠的问题
9. 修复手机购彩页面背景图显示问题
10. 修复六合彩生肖显示不对的问题

### V1.0.0.4

1. 充值页面数据初始化报错 2.系统轮播图缓存时间修改为 5 分钟

### V1.0.0.1

1.  添加版本控制
2.  登陆后不显示免费试玩
3.  首页彩种低频彩混入足球
4.  开奖公告样式偏移问题
5.  无活动记录提示

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
