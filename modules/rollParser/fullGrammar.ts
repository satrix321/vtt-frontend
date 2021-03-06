export default `
Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Roll
  
  
Roll "roll"
 = _ left:[0-9]+ "d" right:[0-9]+ {
      let parsedLeft = parseInt(left.join(""), 10);
      let parsedRight = parseInt(right.join(""), 10);
      let sum = 0;
      for (let i = 0; i < parsedLeft; i++) {
        sum += Math.floor((Math.random() * parsedRight) + 1);
      }
      return sum;
    }
  / Integer

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \\t\\n\\r]*
`
