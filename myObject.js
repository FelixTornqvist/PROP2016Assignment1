
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
		print(this.name+" started call-function");
		print("have own proto-list: "+this.hasOwnProperty("prototypes"));
		print("amount of protos: "+this.prototypes.length);

		if (methodName in this) {
			print("object have own function");
			//return this.name+" have the function";
	    	return eval("this."+methodName + "(" + args + ");");
		} else {
	  		print("search for function in protos:");

	  		for (var i = 0;  i < this.prototypes.length; i++) {
				var currentProto = this.prototypes[i];

	  			print("\ti="+i+" name:" + currentProto.name + " type:" + typeof currentProto);

	  			try{
	  				var result = currentProto.call(methodName, args);
	  				return result;
	  			}catch(exception){

	  				if(exception == "could not find function"){
	  					print(this.name + " continues the search for the allmighty function..");
	  					continue;
	  				}
	  				else 
	  					throw exception;
	  			}
  			}
  			// comes here if there's no prototypes left to test
  			print("No (more) protos in this object");
  			throw "could not find function";
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

print("** punkt getPosition test **");
print("punkt returned: "+punkt.call("getPosition", ""));

print();

print("** färgPunkt getPosition test **");
print("färgPunkt returned: "+färgPunkt.call("getPosition", ""));
print();
print("** färgPunkt getFärg test **");
print("färgPunkt returned: "+färgPunkt.call("getFärg", ""));