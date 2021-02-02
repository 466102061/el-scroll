const pkg = require('../../package.json')

//参数配置
export let setting = {
	el: '',						//滚动元素
	click: false,				//滚动容器内，是否可点击
	version: pkg.version,		//版本号
	created: (res)=>{},			//插件安装完成回调
	destroy: (res)=>{},			//插件卸载完成回调
}

//滚动监听事件
export let eventMap = {
	"scroll" : "scroll",					//滚动中
	"scrollEnd" : "scrollEnd",				//滚动停止前
	"beforeScrollEnd" : "beforeScrollEnd",  //滚动停止
}
