
var myObject = {
	prototypes: [],
	
	create: function(prototypeList) {
		var newObject = Object.create(this);
		var newProtoList = this.prototypes.slice(); // .slice() to create a new array object

		if (prototypeList != null && prototypeList.length > 0) {

			for (var i = 0;  i < prototypeList.length; i++) {
				var newProto = prototypeList[i];
 
				if (newProtoList.indexOf(newProto) == -1) {
					
					print("added prototype");
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
		print(this.name+" reached call-function");
		print("have own proto-list: "+this.hasOwnProperty("prototypes"));
		print("amount of protos: "+this.prototypes.length);

		if (methodName in this) {
			print("object have own function");
			return this.name+" have the function";
	    	// return eval(methodName + "(" + args + ");");
		} else {
	  		print("search for function in prototypes:");

	  		for (var i = 0;  i < this.prototypes.length; i++) {
				var currentProto = this.prototypes[i];

	  			print("\t"+i+" type: " + typeof currentProto);
				return currentProto.call(methodName, args);
  			}
  		}
	},
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


print();

print("* punkt getPosition");
print("punkt returned: "+punkt.call("getPosition", ""));

print();

print("* färgPunkt getPosition");
print("färgPunkt returned: "+färgPunkt.call("getPosition", ""));
print();
print("* färgPunkt getFärg");
print("färgPunkt returned: "+färgPunkt.call("getFärg", ""));