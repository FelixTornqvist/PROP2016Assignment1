function protoBlueprint(){
		var prototypes = [];
		this.getPrototypes = function(){
			return prototypes;
		};
		this.setPrototypes = function(newProtos){
			prototypes = newProtos;
		};
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
		newObject.prototypes = new protoBlueprint;
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



/*--- test code ---*/

//--punkt--
var punkt = myObject.create(null);
punkt.name = "punkt";
punkt.x = 0;
punkt.y = 0;
punkt.getPosition = function(){
	return this.x + " : " + this.y;
}


//--färg--
var färg = myObject.create(null);
färg.name = "färg";
färg.färg = "grön";
färg.getFärg = function(){
	return "färgen är "+this.färg;
}

//--färgpunkt--
var färgPunkt = myObject.create([punkt, färg]);
färgPunkt.name = "färgpunkt";

var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
obj1.name = "obj1";

print("before the call");
print(obj1.call("func", ["Hello"]));
print("after the call");


obj1.func = function(arg) { return "func1 " + arg; };
print(obj1.call("func", ["Hello again"]));
var obj2 = myObject.create([obj1, obj0]);
print(obj2.call("func", ["A third hello"]));

