var splitter = /(<=|<|>=|>|!=|=|[?])/

function isNumber(s) {
  return !isNaN(+s)
}

var operators = {
  "<=": "lte",
  "<" : "lt",
  ">=": "gte",
  ">" : "gt",
  "=" : "eq",
  '!=': "neq",
  "?" : 'ok'
}

function coearse(n) {
  return isNumber(n) ? +n : n
}

function parse (str) {
  return str
    .split(',')
    .map(function (subquery) {
      //split on operator
      subquery = subquery.split(splitter).map(function (s) {
        return s.trim()
      })
      var q = {
        path: subquery.shift().split('.').map(function (e) {
          return e === '*' ? true : e
        })
      }
      while(subquery.length) {
        var s
        var op = operators[s = subquery.shift()]
        if(!op)
          throw new Error(s + 'is not a valid operator, expected: < <= > >= or =')
        if(!subquery[0])
          throw new Error('missing operand for ' + s)
        q[op] = coearse(subquery.shift())
     }
      return q
    })
}

module.exports = parse

if(!module.parent && process.title != 'browser')
  console.log(parse(process.argv.slice(2).join(' ')))
