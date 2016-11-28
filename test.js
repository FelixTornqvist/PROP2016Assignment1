function protoBlueprint(mother) {
	var owner = mother;
	var prototypes = [];

	this.getPrototypes = function() {
		return prototypes.slice();
	};

	this.setPrototypes = function(newProtos) {
		var oldProtos = prototypes;
		prototypes = newProtos;
		if (this.protosContainsOwner(owner)) {
			prototypes = oldProtos;
			throw "You Shall Not PASS!      ...this prototype";
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
		var newProtoList = this.prototypes.getPrototypes().slice();

		if (prototypeList != null && prototypeList.length > 0) {
			for (var i = 0;  i < prototypeList.length; i++) {
				var newProto = prototypeList[i];
				if (newProtoList.indexOf(newProto) == -1) {
						newProtoList.push(newProto);
				}
			} 
		}
		newObject.prototypes = new protoBlueprint(newObject);
		newObject.prototypes.setPrototypes(newProtoList);

		return newObject;
	},

	call : function(funcName, parameters) {
		if (funcName in this) {
      return eval("this." + funcName + "('" + parameters + "');");
		} else {
			var myProtos = this.prototypes.getPrototypes();
	  		for (var i = 0;  i < myProtos.length; i++) {
				var currentProto = myProtos[i];
	  			try {
	  				var result = currentProto.call(funcName, parameters);
	  				return result;
	  			} catch (exception) {
	  				if (exception == "could not find function") {
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
  	return Object.create(this); 
  };
  
  return newClass;
};