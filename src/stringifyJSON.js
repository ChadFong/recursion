// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if(Array.isArray(obj)){
  	writer('[', obj, ']');
  }
  else if(typeof obj === 'object') {
  	writer('{', obj, '}');
  }
  else if(typeof obj === 'string') {
  	writer('\'', obj, '\'');
  }
  else {
  	writer('',obj);
  }
};

var writer = function (written, toWrite, end) {

// Needs a base-case

	if(Array.isArray(toWrite)){
		written += arrayWriter(toWrite);
		toWrite = end.splice(0,1);
 	 	writer(written, toWrite, end); // Incorrect implementation — filler.  end will go to null
	}
	else if(typeof toWrite === 'object') {
		writer('{', toWrite, '}');
	}
	else if(typeof toWrite === 'string') {
	  	writer('\'', toWrite, '\'');
	}
	else {
	  	writer('',toWrite);
	  }
};

var arrayWriter = function(array) {
	var first = stringTester(array[0]);
	var result = '[' + first;
	for(var i=1 ; i<array.length ; i++) {
		if(typeof array[i] === 'string'){
			result += ', ' +"\"" + array[i] + "\"";
		}
		else{
		result += ', ' + array[i];
	}
	}
	return result += ']';
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