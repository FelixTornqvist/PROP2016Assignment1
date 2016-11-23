function myObject() {};

var prototypes = [];
myObject.prototypes = prototypes;

myObject.create = function(prototypeList) {
    var newObject = {};
    newObject.__proto__ = myObject;
    if (prototypeList != null) {
        for(newProto in prototypeList) {
            if (prototypes.indexOf(newProto) == -1) {
                prototypes.push(newProto);
                print("added to list");
            } else {
                print("not added to list");
            }
        }
    }
    return newObject;
};

//  funkar inte men borde funka så nåt är fel
myObject.call = myObject.bind(myObject);

myObject.call = function(methodName, args) {

    //       this i call refererar till call och inte myObject
    print(this.hasOwnProperty(methodName));
    print(this.toString());

    if(this[methodName] == 'func') {


        print("inside typeof");
        eval(methodName + "(" + args + ");");
    }

    print("outside  :( ");
};

// 



var obj1 = myObject.create(null);

obj1.func = function(arg) {
    return "func1: " + arg;
};

print(obj1.func("korv"));

var punkt = myObject.create(null);
punkt.x = 0;
punkt.y = 0;

// print(punkt.x + ":" + punkt.y);

var punktKorv = myObject.create([obj1, punkt]);
print(punktKorv.call("func", "hejsan"));
//print(punktKorv.x);