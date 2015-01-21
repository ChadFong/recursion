// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
/*
var getElementsByClassName = function(className){
	var desiredElements = [], remainingNodes = [];
	if(document.body.className === className) {
		desiredElements.push(document.body);
	}
	var nodeFinder = function(aNode) {
		var children = textNodeRemover(aNode.childNodes);
		remainingNodes.unshift(children.slice(1));
		if(children[0].classList)

	}

};
*/
var classMatcher = function(node, desiredClass) {
	var testResult = true;
	var classArray = desiredClass.split(/[\ ]/g);
	for(var i=0 ; i<classArray.length ; i++) {
		if(!node.classList.contains(classArray[i])) {
			testResult = false;
		}
	}
	return testResult;
};

var textNodeRemover = function(array) {
	var textNodes = [];
	_.each(array, function(aNode) {
		if(aNode.nodeType !== 3) {
			textNodes.push(aNode);
		}
	});
	return textNodes;
};