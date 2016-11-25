function protoBlueprint(mother) {
	var owner = mother;
	var prototypes = [];
	this.getPrototypes = function() {
		return prototypes;
	};

	this.setPrototypes = function(newProtos) {
		var oldProtos = prototypes;
		prototypes = newProtos;

		if (this.protosContainsOwner(owner)) {
			print("FORBIDDEN!!");		// should maybe use a throw statement instread
			prototypes = oldProtos;
			return false;
		} else {
			return true;
		}
	};

	this.protosContainsOwner = function(superOwner) {
		var containsOwner = false;

		for (var i = 0; i < prototypes.length; i++) {
			var proto = prototypes[i];
			
			if (proto == superOwner) {
				containsOwner = true;
			} else {
				containsOwner = proto.prototypes.protosContainsOwner(superOwner);
			}

			if (containsOwner)
				break;
		}

		return containsOwner;
	}
};


var myObject = {

	prototypes : new protoBlueprint,

	create : function(prototypeList) {
		var newObject = Object.create(this);
		var newProtoList = this.prototypes.getPrototypes().slice(); // .slice() to create a new array object

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
		newObject.prototypes = new protoBlueprint(newObject);
		newObject.prototypes.setPrototypes(newProtoList);
		return newObject;
	},

	call : function(methodName, args) {
		if (methodName in this) {
			//return this.name+" have the function";
        	return eval("this." + methodName + "('" + args + "');");
		} else {
			var myProtos = this.prototypes.getPrototypes();

	  		for (var i = 0;  i < myProtos.length; i++) {
				var currentProto = myProtos[i];

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
	}
};

function createClass(className, superClassList) {
  var newClass = myObject.create(superClassList);
  newClass.name = className;
  newClass.new = function() {
    return new Object(this);
  };
  return newClass;
};



/*--- test code ---*/
var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);

print("result " + result);

class2.newFunk = function(arg){
	return "class2 newFunk :"+arg;
}
print(obj3.call("newFunk", "call from obj3"));

class0.prototypes.setPrototypes([class0]);
class0.prototypes.setPrototypes([class1]);
class0.prototypes.setPrototypes([class3]);
class0.prototypes.setPrototypes([class2]);
// class0.call("korv", [null]);