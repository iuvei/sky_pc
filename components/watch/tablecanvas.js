//封装一个折线图的函数
/**
 * el dom
 * canvasList 数据
 * widths  单元格宽
 * hei  单元格高
 * color 颜色
 * start 是否为0开始
 */
function getBrokenLine(el, data, widths, hei, color, startWithZero) {
  clearRect(el);
  let ctx = el.getContext("2d");
  ctx.lineWidth = 2;
  // var maxNum = Math.max.apply(null, data); //求数组中的最大值
  // console.log(maxNum);
  var padding = widths / 2, //边距
    x0 = padding, //原点x轴坐标
    y0 = el.height - padding; //原点y轴坐标

  //中断（坐标轴和折线的）连接
  ctx.stroke();
  ctx.beginPath();

  // 开始绘制起点
  let d0 = parseInt(data[0]) > 0 ? parseInt(data[0]) : startWithZero ? 0 : 1;

  if (startWithZero) {
    x0 = (d0 == 0 ? 0 : widths * d0) + widths / 2;
  } else {
    x0 = (d0 == 1 ? 0 : widths * (d0 - 1)) + widths / 2;
  }
  y0 = hei / 2;
  ctx.moveTo(x0, y0);
  for (let i = 1; i < data.length; i++) {
    // 判断是0开头还是1开头
    if (!startWithZero) {
      let c0 = parseInt(data[i]) > 0 ? parseInt(data[i]) : 1;
      let pointX = c0 == 1 ? widths / 2 : widths * (c0 - 1) + widths / 2,
        pointY = hei * i + hei / 2;
      ctx.lineTo(pointX, pointY);
    } else {
      let c0 = parseInt(data[i]) > 0 ? parseInt(data[i]) : 0;
      let pointX = c0 == 0 ? widths / 2 : widths * c0 + widths / 2,
        pointY = hei * i + hei / 2;
      // 设置偏移值
      ctx.lineTo(pointX, pointY);
    }
  }
  ctx.strokeStyle = color;
  ctx.stroke();
}
/**开始画线 */

function drawLine(el, canvasList, start, cell, color) {
  clearRect(el);
  let ctx = el.getContext("2d");
  // ctx.scale(2, 2); // 放大画布消除模糊
  ctx.lineWidth = 2;
  getBrokenLine(
    el,
    canvasList,
    color,
    // this.canvaskuan,
    // this.canvasUnitHeight,
    cell,
    cell,
    start == 0
  );
}
function clearRect(el) {
  let ctx = el.getContext("2d");
  // ;
  el.height = el.height;
  ctx.clearRect(0, 0, el.width, el.height);
}

export default function(el, { value }, vm) {
  setTimeout(() => {
    getBrokenLine(
      el,
      value.data,
      value.cell,
      value.cell,
      value.color,
      !value.start
    );
  }, 0);
}
