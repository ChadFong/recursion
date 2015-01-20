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

	if(Array.isArray(toWrite)){
		written += arrayWriter(toWrite);
		toWrite = end.splice(0,1);
 	 	writer(written, toWrite, end);
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
	var first;
	if(typeof array[0] === 'string'){
		first = "\"" + array[0] + "\"";
	}
	else {first = array[0];}
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
	var result = '{';
	for(var key in obj) {
		result += key + ':' + obj[key];
	}
	return result += '}';
};