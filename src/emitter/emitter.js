export default class Emitter{
	constructor(){
		this.events = [];
	}
	on(type, listener, prepend = false){
		if(!this.events[type]){
			this.events[type] = [];
		}
		if(prepend){
			this.events[type].unshift(listener);
		}else{
			this.events[type].push(listener);
		}
	}
	off(type, callback){
		let msg = `${type} event does not exist and does not need to be off.`;
		if(this.events[type]){
			this.events[type] = [];
			msg = `off ${type} event success.`;
		}
		callback && callback({ msg });
	}
	emit(type, ...args){
		let res = [];
		let listeners = this.events[type];
		if(!listeners || listeners.length == 0) return null;
		listeners.forEach((listener, index)=>{
			res[index] = listener(...args);
		});
		return res;
	}
}