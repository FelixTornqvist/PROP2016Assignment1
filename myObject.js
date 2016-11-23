function myObject() {};

var name = "myObject";

var myObject = {
  create: function(prototypeList) {
    var newObject = {};

    if(!prototypeList || prototypeList.length === 0) {

    }
    prototypeList.forEach(function(prototype) {


    });
  },
  create: function(prototypeList) {
    var newObject = {};

    newObject.prototype = myObject;

    if (prototypeList != null) {
      console.log(prototypeList.length);
    

      for (var i = 0;  i < prototypeList.length; i++) {
       console.log(typeof prototypeList[i]);  
       if (this.indexOf(newP
        proto) == -1) {
           console.log("newProto " + typeof newProto);
           this.push(newProto);
         } else {
           console.log("not added to list");
         }
      } 
    } 
    return newObject;
  },

  call: function(methodName, args) {
    if (this.hasOwnProperty(methodName)) {
      return "yes";
      // eval(methodName + "(" + args + ");");
    } else {
      if (this.length > 0) {
        console.log("hahhaa " + this.length);
        for(var p in this) {
          console.log("index " + typeof p);

          console.log(p.hasOwnProperty("call"));
          p.call(methodName, args);
        }
      }
    }
  },
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

console.log("obj1 from outside " + typeof obj1);

var tempList = [[obj1], [punkt]];



var punktKorv = myObject.create([obj1, punkt]);

punktKorv.name = "punktkorv"


console.log(myObject.hasOwnProperty("call"));

console.log("obj1 hade call " + obj1.call("func", "hejsan"));
console.log("punktkorv funkade " + punktKorv.call("func", "hejsan"));
// console.log(obj1.func("korv"));

// console.log(punkt.x + ":" + punkt.y);

// var punktKorv = myObject.create(tempList);

// punktKorv.func = function(arg) {
//     return "punktKorv: " + arg;
// };
//console.log(punktKorv.x);