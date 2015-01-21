// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className){
	var desiredElements = [], remainingNodes = [];
	
	var nodeCheckerRecursiveRouter = function(node) {
		if(matchesClass(node, className)) {
			desiredElements.push(node);
		}

		if(node.hasChildNodes()) {
			childNodeTraverser(node);
		}
		else {
			nodeCheckerRecursiveRouter(remainingNodes.shift());
		}
	};


	var childNodeTraverser = function(aNode) {

		if(aNode === [] && remainingNodes === []) {
			return desiredElements;
		}

		var children = textNodeRemover(aNode.childNodes);
		var remaining = children.slice(1);
		if(remaining.length > 0) {
			for(var i=remaining.length-1 ; i>=0 ; i--) {
				remainingNodes.unshift(remaining[i]);
			}
		}
		nodeCheckerRecursiveRouter(children[0]);
	};

	nodeCheckerRecursiveRouter(document.body);
	return desiredElements;

};



var matchesClass = function(node, desiredClass) {
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