var myObject = {

prototypes : [],
	
create : function(prototypeList) {
    var newObject = {};
    newObject.__proto__ = myObject;
	
    if (prototypeList != null && prototypeList.length > 0) {
        for(var newProto in prototypeList) {
			print("added proto which is a: "+typeof newProto)

            if (this.prototypes.indexOf(newProto) == -1) {
                this.prototypes.push(newProto);
            }
        }
    }
    return newObject;
},

// myObject.call = myObject.bind(myObject);

call : function(methodName, args) {

    if (this.hasOwnProperty(methodName)) {
        return "I have the method";
        // eval(methodName + "(" + args + ");");

    } else {
        if (this.prototypes.length > 0) {
            print("I have prototypes, amount: " + prototypes.length);
            for(var p in prototypes) {
                print("prototype is a " + typeof p);
                print("prototype have call method: "+p.hasOwnProperty("call"));
                //p.call(methodName, args);
            }
        }

    }


}

};



var obj1 = myObject.create(null);
obj1.name = "obj1";
obj1.func = function(arg) {
    return "func1: " + arg;
};

var punkt = myObject.create(null);
punkt.name = "punkt";
punkt.x = 0;
punkt.y = 0;

var protoList = [obj1, punkt];
for(proto in protoList)
	print(typeof proto);


var punktKorv = myObject.create(protoList);
punktKorv.name = "punktkorv"

print("obj1 call:");
print("obj1.call returnerar: " + obj1.call("func", "hejsan"));
print("punktkorv call:");
print("punktkorv.call returnerar: " + punktKorv.call("func", "hejsan"));
//print(punktKorv.x);