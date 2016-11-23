function myObject() {};

var name = "myObject";

var prototypes = [];
myObject.prototypes = prototypes;

myObject.create = function(prototypeList) {
    var newObject = {};
    newObject.__proto__ = myObject;
    if (prototypeList != null) {
        for(var newProto in prototypeList) {

            if (this.prototypes.indexOf(newProto) == -1) {
                this.prototypes.push(newProto);
            } else {
                print("not added to list");
            }
        }
    }
    return newObject;
};

// myObject.call = myObject.bind(myObject);

myObject.call = function(methodName, args) {

    if (this.hasOwnProperty(methodName)) {
        return "yes";
        // eval(methodName + "(" + args + ");");

    } else {
        if (this.prototypes.length > 0) {
            print("hahhaa " + prototypes.length);
            for(var p in prototypes) {
                print("index " + prototypes[p]);

                print(p.hasOwnProperty("call"));
                p.call(methodName, args);
            }
        }

    }


};

// 



var obj1 = myObject.create(null);
obj1.name = "obj1";

obj1.func = function(arg) {
    return "func1: " + arg;
};

print(obj1.func("korv"));

var punkt = myObject.create(null);
punkt.name = "punkt";
punkt.x = 0;
punkt.y = 0;

// print(punkt.x + ":" + punkt.y);

var punktKorv = myObject.create([obj1, punkt]);
punktKorv.name = "punktkorv"

// punktKorv.func = function(arg) {
//     return "punktKorv: " + arg;
// };
print(myObject.hasOwnProperty("call"));

print("ibj1 hade call " + obj1.call("func", "hejsan"));
print("punktkorv funkade " + punktKorv.call("func", "hejsan"));
//print(punktKorv.x);