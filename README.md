### el-scroll
A plugin that can makes element scrolling smooth.

#### Notes | [Update](https://github.com/466102061/el-scroll/blob/main/doc/Rupdate.md) | [简体中文](https://github.com/466102061/el-scroll/blob/main/doc/README-ZH.md)
+ The parent element of scrolling target, overflow fields must be hidden.

#### Install
```
npm i el-scroll  or yarn add el-scroll
```

#### Useage
```
import ElScroll from 'el-scroll'

let scroller = new ElScroll('#J_scroll');

//events
scroller.on('scroll', ({ctx, dist})=>{
  console.log('scrolling and scrollY is ', dist);
});

scroller.on('beforeScrollEnd', ({ctx, dist})=>{
  console.log('before scrolling stops and scrollY is ', dist);
  //Returns a negative number that determines where the final scrolling stops.
  return dist;
});

scroller.on('scrollEnd', ({ctx, dist})=>{
  console.log('scrolling stops and scrollY is ', dist);
});
```
#### examples
+ [examples/index.html](https://github.com/466102061/el-scroll/tree/main/examples)
#### Configuration

+ let scroller = new ElScroll(options)
+ options(String)

| param | type | require | default | desc |
| :----: | :----: | :----: | :----: | :---- |
| options | String | yes | -- | scroll target id or class. |

+ options(HTMLDivElement)

| param | type | require | default | desc |
| :----: | :----: | :----: | :----: | :---- |
| options | HTMLDivElement | yes | -- | scroll target HTMLDivElement. |

+ options(Object)

| param | type | require | default | desc |
| :----: | :----: | :----: | :----: | :---- |
| options.el | HTMLDivElement | yes | -- | scroll target HTMLDivElement. |
| options.click | Boolean | -- | false | enable click event. |
| options.created | Function | -- | -- | created callback. |
| options.destroy | Function | -- | -- | destroy callback. |

+ scroller

| method | desc |
| :----:| :---- |
| scroller.on('scroll', callback) | scroll event callback. |
| scroller.on('beforeScrollEnd', callback) | before scrolling stops callback, and you can return a negative number that determines where the final scrolling stops. |
| scroller.on('scrollEnd', callback) | scrolling stops callback. |
| scroller.resetMaxScrollY() | When the scrolling target height changes, reset the scrollable scrollY. |

