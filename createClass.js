
function createClass(className, superClassList) {

  var testVar = {
    allClasses: [],

    create(className, superClassList) {
      if (testVar.allClasses.length > 0) {
        console.log("length > 0");
        for (var i = 0; i < allClasses.length; i++) {
          if (className == allClasses[i]) {
            console.log("allready a class");
            break;
          }
        }
      };
        
      newClass = new Object,
      newClass.name = className,
      newClass.parents = superClassList,

      newClass.new = function(newObject) {
        console.log("object: " + newObject + ", class: " + newClass.name );
      };

      testVar.allClasses.push(newClass.name);
      console.log(testVar.allClasses.length);

      return newClass;
    },
  }
  
  return testVar.create(className, superClassList);
}



class1 = createClass("first", []);
class2 = createClass("second", []);
// class3 = createClass("third", []);

class1.new("first object 1");
class2.new("second object 1");
// class2.new("second object 1");


