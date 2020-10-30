export default `
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