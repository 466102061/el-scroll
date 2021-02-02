import { 
	addEventListener, 
	removeEventListener 
} from '../event/event.js'
import {
	getNodeTargetByStyle,
	formatStyleValueForNumber
} from '../utils/dom-helper.js'
import Emitter from '../emitter/emitter.js'
import { isMobile, objectProtoType } from '../utils/utils.js'
import { resetBrowersAnimationFrame } from '../utils/animation-frame.js'

class Scroll extends Emitter{
	constructor(setting, eventMap){
		let options = setting || {};
        super(options);
		this.options = options;
        this.eventMap = eventMap || {};
        this.$el = options.el;

        this.startTime = 0;
        this.lastTime = 0;
        this.currentTime = null;

        this.startY = 0;
        this.lastY = 0;
        this.currentY = null;
        this.oldY = null;//每次滚动前，已平移的y值
        this.resetY = null;//间歇性滚动，重置平移的y值

        this.minScrollY = 0;
        this.maxScrollY = null;//最大可滚动步数(临界值)
        this.distance = null;//匀减速运动-步数
        this.isSlowMotion = false;//是否执行了匀减速运动
        this.deceleration = 0.0006;//加速度
        
        this.speed = 500;//css平移速度(时间ms)
        this.timer = null;//requestAnimationFrame定时器
        this.isReadyToMove = false;//是否是执行了touchstart/mousedown

        this.isMobile = isMobile();

		//重写requestAnimationFrame
		resetBrowersAnimationFrame();

        //设置滚动最大步数(临界值)
		this.resetMaxScrollY();

		//绑定事件
	    addEventListener(this);

	    //回调 - 插件已安装
        if(objectProtoType.isFunction(this.options.created)){
            this.options.created({ ctx: this });
        }

	    return this;
	}
    // 设置最大值
    resetMaxScrollY(){
        let oDiv = getNodeTargetByStyle(this.$el, 'overflowY', 'hidden');
        let height = formatStyleValueForNumber(document.defaultView.getComputedStyle(oDiv)['height']);
        let clientHeight = Math.abs(height) > 0 ? Math.abs(height) : document.documentElement.clientHeight;
        this.maxScrollY = Math.max(this.$el.clientHeight - clientHeight, 0);
    }
	destroy(){
		//绑定事件
		removeEventListener(this);

        //回调 - 插件卸载
        if(objectProtoType.isFunction(this.options.destroy)){
            this.options.destroy({ ctx: this });
        }
	}
}

export default Scroll;