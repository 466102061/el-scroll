/**
** @desc 获取想要的参数的目标节点，并指定属性以及属性值
** @param { String } element
** @param { String } attr
** @param { String } value
**
** @return element
**/
function getNodeTargetByStyle(element, attr, value){
    let currentNode = element;
    while (currentNode && currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let target = document.defaultView.getComputedStyle(currentNode)[attr];
        if (value && value.indexOf(target) > -1) {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
}

// 获取100px中100的值
function formatStyleValueForNumber(str){
    return Number(String(str).match(/\+?\-?\d+/g)[0]);
}

export {
	getNodeTargetByStyle,
	formatStyleValueForNumber
}