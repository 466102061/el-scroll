const pkg = require('../../package.json')

//参数配置
export let setting = {
	el: '',						//滚动元素
	longPressTime: 350,			//长按时间
	stopDefaultEvent: true,     //是否阻止浏览器默认事件、事件冒泡等
}

//默认配置
export let defaultSetting = {
	version: pkg.version,		//版本号
}

//滚动监听事件
export let eventMap = {
	"tap": "tap",							//单击click
	"longPress": "longPress",				//长按
	"destroy": "destroy",					//销毁
	"scroll": "scroll",					    //滚动中
	"scrollEnd": "scrollEnd",				//滚动停止前
	"beforeScrollEnd": "beforeScrollEnd",  //滚动停止
}
