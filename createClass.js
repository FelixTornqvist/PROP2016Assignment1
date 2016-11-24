
function createClass(className, superClassList) {
  var allClasses = [];

  createClass.classExists = function(className, superClassList, allClasses) {

    if (allClasses.length < 1) {
      newClass = new Object,
      newClass.name = className,
      newClass.parents = superClassList,

      newClass.new = function(newObject) {
          console.log("hello nr: " + allClasses.length); 
        };
        allClasses.push(newClass); // binding problem
      return newClass;
    };
  }
  return createClass.classExists(className, superClassList, allClasses);
};



class1 = (createClass("first", "list"));
class1.new("newObject");
class1.new("newObject");
class1.new("newObject");


