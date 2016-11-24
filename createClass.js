
function createClass(className, list) {
  newClass = new Object,
  newClass.name = className,
  newClass.parents = list,

  newClass.new = function(newObject) {
      console.log("hello"); 
    };

  return newClass;
};



class1 = (createClass("first", "list"));
class1.new("newObject");
createClass("first", null);

