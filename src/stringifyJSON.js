// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var cat = [[[0,1],2],[3,4]];
/*
var stringifyJSON = function(obj) {
  var stringified = '';


  var writer = function(workingOn, toDo) {

	if(Array.isArray(workingOn)){
		if(!nestedTest(workingOn) )
  		stringified += arrayWriter(workingOn);
  	}

  	else if(typeof workingOn === 'object') {
  		stringified += objectWriter(workingOn);
  	}

  	else if()


  
  if(Array.isArray(obj)) {
  	if(!Array.isArray(obj[0])) {
  		return arrayWriter(obj) + stringifyJSON(obj.slice();
  	}


  		return stringifyJSON(obj[0]);
  	}
  	else

  	return arrayWriter(obj);
  }
  else if(typeof obj === 'object') {
  	objectWriter(obj);
  }
  else if(typeof obj === 'string') {
  	writer('\""', obj, '\"');
  }
  else {
  	//writer('',obj);
  }
};

var basicElements = function(input) {
	if()

};

var 
*/
var nestedTest = function(potentiallyNested) {

	var isObject = function(testee) {
		return function() {
			return typeof testee === 'object';
		};
	};

	return _.some(potentiallyNested, Array.isArray) || _.some(potentiallyNested, isObject);
};

stringifyArray = function(nestedArray, result) {

  var nestedChecker = function(potentiallyNestedArray) {
  return _.some(potentiallyNestedArray, Array.isArray);
};
    if(result === undefined) {
      result = '[';
    }
    var stringifier = function(current, rest) {
      if((current === undefined || current.length === 0) && (rest.length === 0)) {
        return result;
      }

      else if(current[0] === undefined) {                 //  Clause to catch arrays wrapped in arrays
        result += ']';
        stringifier(rest.shift(), rest);
      }

      else if(Array.isArray(current[0])) {       // If first element is an array

        if(result.slice(-2) !== ', ' && result.slice(-1) !== '[') {          //CURRENT WORKING AREA
          result += ', ';
        }

        result += '[';
        rest.unshift(current.slice(1));          // Put slice everything else onto REST, recur off of first element
        stringifier(current[0], rest);                // Does not write to result.
      }
      else if (!nestedChecker(current)) {        //  If first element is not an array and there are no arrays in current
        if(result.slice(-2) !== ', ' && result.slice(-1) !== '[') {
          result += ', ' + current[0];
        }
        else {
          result += current[0];
        }
        for(var i=1 ; i<current.length ; i++) {  //  Iterate through and copy over
          result += ', ' + current[i];                  //  Writes to result
        }
        result += ']';
        stringifier(rest.shift(), rest);                //  Recurs
      }
      else {                                     // Otherwise later elements in current are arrays, just take first element.
        result += current[0] + ', ';
        rest.unshift(current.slice(1));
        stringifier(rest.shift(), rest);
      }
    };
    stringifier(nestedArray, []);
    var openParen = result.split(/[\[]/g).length-1;
    var closeParen = result.split(/[\]]/g).length-1;
    var parens = openParen - closeParen;
    while(parens >0) {
      parens--;
      result+= ']';
    }
    return result;
};

var objectWriter = function(obj) {
	var result = '{', keyVar, objVar;
	for(var key in obj) {
		keyVar = stringTester(key);
		objVar = stringTester(obj[key]);
		result += keyVar + ':' + objVar;
	}
	return result += '}';
};

var stringTester = function(input) {
	var result;
	if(typeof input === 'string') {
		result = "\"" + input + "\"";
	}
	else {
		result = input;
	}
	return result;
};