### el-scroll
自定义元素滚动插件。

#### 注意事项 | [版本更新](https://github.com/466102061/el-scroll/blob/main/doc/update.md) | [English](https://github.com/466102061/el-scroll#readme)
+ 滚动元素的父节点(即滚动容器), overflow 字段必须为 hidden.

#### Install
```
npm i el-scroll  or yarn add el-scroll
```

#### Useage
```
import ElScroll from 'el-scroll'

let scroller = new ElScroll('#J_scroll');

//events
scroller.on('scroll', ({ctx, dist, event})=>{
  console.log('scrolling and scrollY is ', dist);
});

scroller.on('beforeScrollEnd', ({ctx, dist, event})=>{
  console.log('before scrolling stops and scrollY is ', dist);
  //Returns a negative number that determines where the final scrolling stops.
  return dist;
});

scroller.on('scrollEnd', ({ctx, dist, event})=>{
  console.log('scrolling stops and scrollY is ', dist);
});

scroller.on('tap', ({ctx, event})=>{
  console.log('tap event', event);
});

scroller.on('longPress', ({ctx, event})=>{
  console.log('longPress event', event);
});

scroller.on('destroy', ()=>{
  console.log('destroy callback');
});
```
#### examples
+ [examples/index.html](https://github.com/466102061/el-scroll/tree/main/examples)
#### Configuration

+ let scroller = new ElScroll(options)
+ options(String)

| 字段 | 类型 | 是否必须 | 默认值 | 描述 |
| :----: | :----: | :----: | :----: | :---- |
| options | String | yes | -- | 滚动元素的id或class. |

+ options(HTMLDivElement)

| 字段 | 类型 | 是否必须 | 默认值 | 描述 |
| :----: | :----: | :----: | :----: | :---- |
| options | HTMLDivElement | yes | -- | 滚动元素-HTMLDivElement. |

+ options(Object)

| 字段 | 类型 | 是否必须 | 默认值 | 描述 |
| :----: | :----: | :----: | :----: | :---- |
| options.el | HTMLDivElement | yes | -- | 滚动元素-HTMLDivElement. |
| options.longPressTime | Number | -- | 350 | 长按时间间隔 |
| options.stopDefaultEvent | Boolean | -- | true | 是否阻止浏览器的默认事件，比如：点击、长按等|

+ scroller

| 方法 | 描述 |
| :----:| :---- |
| scroller.on('scroll', callback) | 滚动事件回调. |
| scroller.on('beforeScrollEnd', callback) | 滚动停止前回调，在该回调返回一个(负数)值，可控制最终停止位置. |
| scroller.on('scrollEnd', callback) | 滚动停止回调. |
| scroller.on('tap', callback) | 单击回调. |
| scroller.on('longPress', callback) | 长按回调. |
| scroller.on('destroy', callback) | 插件销毁回调. |
| scroller.destroy() | 插件销毁. |
| scroller.resetMaxScrollY() | 当滚动元素的高度发生变化，需调用此函数，来重置可滚动的scrollY值. |

