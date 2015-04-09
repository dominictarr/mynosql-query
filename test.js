var tape = require('tape')
var parse = require('./')

function test(str, expected) {
  tape('parses:' + JSON.stringify(str), function (t) {

    t.deepEqual(parse(str), expected)
    t.end()

  })
}

test('foo=bar', [{path: ['foo'], eq: 'bar'}])
test('foo=bar, baz>10', [
  {path: ['foo'], eq: 'bar'},
  {path: ['baz'], gt: 10},
])
test('foo=bar, baz < 10 > 5', [
  {path: ['foo'], eq: 'bar'},
  {path: ['baz'], gt: 5, lt: 10},
])
test('foo=bar, baz < 10 >= 5', [
  {path: ['foo'], eq: 'bar'},
  {path: ['baz'], gte: 5, lt: 10},
])

