// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

/*
Original Implementation:
var test = new SpeedTest(meerkat, [[[0,1],[2,3,[{'x':3, 'four': [[[[3]]]]},5,[6,[7]]],8]]], 100000);
Average execution time across 100000 repetitions: 0.03304ms

Best Practices Implementation:
 Average execution time across 100000 repetitions: 0.03038ms
*/

var tester = function (input) {
	var a = stringifyJSON(input);
	var b = JSON.stringify(input);
	var c = (a === b);
	console.log('mine: '+a + ' ___ goal: ' + b + ' same? :' + c);
};


function SpeedTest(testImplement, testParams, repetitions) {
	this.testImplement = testImplement;
	this.testParams = testParams;
	this.repetitions = repetitions || 10000;
	this.average = 0;
}

SpeedTest.prototype = {
	startTest : function() {
		var beginTime, endTime, sumTimes = 0;
		for(var i=0, x=this.repetitions ; i<x ; i++) {
			beginTime = +new Date();
			this.testImplement(this.testParams);
			endTime = +new Date();
			sumTimes += endTime - beginTime;
		}
		this.average = sumTimes/this.repetitions;
		return console.log("Average execution time across " + this.repetitions + " repetitions: " + this.average + "ms");
	}
};

var stringifyJSON = function(obj) {
	var stringifiedJSON = '',
		failsTester = function(input) {
			for(var key in input) {
				if(typeof input[key] === 'function' || input[key] === undefined) {
					stringifiedJSON = "{}";
				}
			}
			if(stringifiedJSON !== "{}"){
				return JSONstringifier(obj, []);
			}
		},

		JSONstringifier = function(current, rest) {
			if(current === undefined) {          //Base case
				return stringifiedJSON;
			}
			if(Array.isArray(current)) {
				stringifiedJSON += stringifyArray(current);
				JSONstringifier(rest.shift(), rest);
			}
			else if(typeof current === 'object' && current !== null) {
				stringifiedJSON += stringifyObject(current);
				JSONstringifier(rest.shift(), rest);
			}
			else {
				stringifiedJSON += stringifyElement(current);
				JSONstringifier(rest.shift(), rest);
			}
		};
		failsTester(obj);                       //  Contains the executable for JSONstringifier.  Tests for fail cases first.
		return stringifiedJSON;
	};

var stringifyArray = function(nestedArray) {
	var nestedArrayChecker = function(potentiallyNestedArray) {
		return _.some(potentiallyNestedArray, Array.isArray);
	},
		stringifiedArray = '[',
		objectInArrayChecker = function(input, prepend, append) {
		if(typeof input === 'object' && input !== null) {
			stringifiedArray += prepend + stringifyObject(input) + append;
		}
		else {
			stringifiedArray += prepend + stringifyElement(input) + append;
		}
	},

		arrayStringifier = function(current, rest) {
		if((current === undefined || current.length === 0) && (rest.length === 0)) {
			return stringifiedArray;
		}
		else if(current[0] === undefined) {                          //  Clause to catch arrays wrapped in arrays
			stringifiedArray += ']';
			arrayStringifier(rest.shift(), rest);
		}
		else if(Array.isArray(current[0])) {                         // If first element is an array
			if(stringifiedArray.slice(-1) !== ',' && stringifiedArray.slice(-1) !== '[') {
				stringifiedArray+= ',';
			}
			stringifiedArray += '[';
			rest.unshift(current.slice(1));                          // Put slice everything else onto REST, recur off of first element
			arrayStringifier(current[0], rest);                      // Does not write to stringifiedArray.
		}
		else if (!nestedArrayChecker(current)) {                     //  If first element is not an array and there are no arrays in current
			if(stringifiedArray.slice(-1) !== ',' && stringifiedArray.slice(-1) !== '[') {
				objectInArrayChecker(current[0], ',', '');
			}
			else {
				objectInArrayChecker(current[0], '', '');
			}
			for(var i=1, x=current.length ; i<x ; i++) {                  //  Iterate through and copy over
				objectInArrayChecker(current[i],',', '');                //  Writes to stringifiedArray
		}
		stringifiedArray += ']';
		arrayStringifier(rest.shift(), rest);                        //  Recurs
		}
		else {                                                       // Otherwise later elements in current are arrays, just take first element.
			objectInArrayChecker(current[0], '', ',');
			rest.unshift(current.slice(1));
    		arrayStringifier(rest.shift(), rest);
    	}
	};

	arrayStringifier(nestedArray, []);
	var openParen = stringifiedArray.split(/[\[]/g).length-1,
		closeParen = stringifiedArray.split(/[\]]/g).length-1,
		parens = openParen - closeParen;
	while(parens >0) {
  	parens--;
  	stringifiedArray+= ']';
	}
	return stringifiedArray;
};

var stringifyObject = function(obj) {
	var result = '{', keyVar, objVar;
	for(var key in obj) {
		keyVar = stringifyElement(key);
		objVar = stringifyElement(obj[key]);
		if(Array.isArray(objVar)) {
			result += keyVar + ':' + stringifyArray(objVar) + ',';
		}
		else if (typeof objVar === 'object' && objVar !== null) {
			result += keyVar + ':' + stringifyObject(objVar) + ',';
		}
		else {
		result += keyVar + ':' + objVar + ',';
		}
	}
	result = result.replace(/,$/,'');
	return result += '}';
};

var stringifyElement = function(input) {
	var stringifiedElement;
	if(typeof input === 'string') {
		stringifiedElement = "\"" + input + "\"";
	}
	else {
		stringifiedElement = input;
	}
	return stringifiedElement;
};