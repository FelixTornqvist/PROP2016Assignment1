
var myObject = {
	prototypes: [],
	
	create: function(prototypeList) {
		var newObject = Object.create(this);
		var newProtoList = this.prototypes.slice(); // .slice() to create a new array object

		if (prototypeList != null && prototypeList.length > 0) {

			for (var i = 0;  i < prototypeList.length; i++) {
				var newProto = prototypeList[i];
 
				if (newProtoList.indexOf(newProto) == -1) {
						newProtoList.push(newProto);
				} else {
					print("prototype already added");
				}
			} 
		}
		newObject.prototypes = newProtoList;
		return newObject;
	},

	call: function(methodName, args) {
		if (methodName in this) {
			//return this.name+" have the function";
        return eval("this." + methodName + "('" + args + "');");
		} else {
	  		for (var i = 0;  i < this.prototypes.length; i++) {
				var currentProto = this.prototypes[i];
	  			try {
	  				var result = currentProto.call(methodName, args);
	  				return result;
	  			}catch(exception){
	  				if(exception == "could not find function"){
	  					continue;
	  				}
	  				else 
	  					throw exception;
	  			}
  			}
  			throw "could not find function";
  		}
	},
};

function createClass(className, superClassList) {
  var newClass = myObject.create(superClassList);
  newClass.name = className;
  newClass.new = function() {
    return new Object(this);
  };
  return newClass;
};

// var obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// var obj1 = myObject.create([obj0]);
// var obj2 = myObject.create([]);
// obj2.func = function(arg) { return "func2: " + arg; };
// var obj3 = myObject.create([obj1, obj2]);
// var result = obj3.call("func", ["hello"]);
// print("result " + result);


var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);

var obj3 = class3.new();
print("1: " + obj3.name);

var result = obj3.call("func", ["hello"]);

print("Result " + result);
