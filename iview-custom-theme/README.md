# 样式库说明

## 目录

|-- animation (动画)

|-- common (全局样式)

|-- components (组件样式)

|-- mixins (混入)

## 通过安装工具修改

这里引入的目的是为了避免引入所有组件的 CSS 导致文件过大，同时自订了主题样式和部分样式

如果没有使用 webpack，可以用我们提供的工具 iview-theme 来编译。

首先需要安装主题生成工具，从 npm 全局或在项目中局部安装，以全局安装为例：

```
npm install iview-theme -g
```

然后在业务工程里新建一个目录，用来存放主题文件，使用下面的命令初始化主题，这时会从 iView 仓库拉取最新的样式文件：
这里是 iview-custom-theme

```
iview-theme init iview-custom-theme
```

如需拉取指定版本号的 iView，使用下面的命令。（实际运行下面命令时，需将 xxx 替换成项目所使用的 iView 版本，如 “ v2.14.3 ”）

```
iview-theme init my-theme xxx
```

最后编辑 `my-theme/custom.less` 文件，用命令编译即可：

```
cd my-theme
iview-theme build -o dist/
```

最终会在指定的目录下编译为 `iview.css` 的文件，只需在入口处引用它就可以了，比如在 main.js 文件：

```
import Vue from 'vue';
import iView from 'iview';
import '../my-theme/dist/iview.css';

Vue.use(iView);
```

这里是编译好后和 fonts 目录放入 static 文件夹即可
