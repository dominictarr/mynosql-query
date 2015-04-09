# mynosql-query

cli friendly one-line queries for [mynosql](https://github.com/dominictarr/mynosql).

Has about the same level of expressiveness as SQL where queries.

## Example

``` js

var parse = require('mynosql-query')

var db = require('mynosql')(require('level')(pathToDb))

pull(
  db.query(parse('name=mynosql, version > 1.0.0')),
  pull.collect(console.log)
)

```

## Syntax

`<path><operator:value>+,...`

`path` may be joined by dots and may contain wildcards.

`foo.bar.baz` or `foo.*.baz`.

`operator:value` is a an operator `>,>=,<,<=,=,!=` and a value (string or number)
More than one range operator can be used.
i.e. foo.bar > 10 < 5 read as (foo.bar is greater than 10 and smaller than 5)

To match multiple paths, join the parts of the query together with `,`.

i.e. `foo.bar > 10, baz=true`

## License

MIT
