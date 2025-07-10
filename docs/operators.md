
# Operators

The Quill language has a few operators built into the language, with most of them being syntactic sugar:

|Precedence|Expression|Translates To|
|-|-|-|
|1|`f(a, b, ...)`|(stays the same)|
|1|`o.name`|(stays the same)|
|2|`-x`|`X::u_minus(x)`|
|2|`!x`|`X::not(x)`|
|3|`a * b`|`A::multiply(a, b)`|
|3|`a / b`|`A::div(a, b)`|
|3|`a % b`|`A::rem(a, b)`|
|4|`a + b`|`A::plus(a, b)`|
|4|`a - b`|`A::minus(a, b)`|
|5|`a < b`|`A::lt(a, b)`|
|5|`a > b`|`A::gt(a, b)`|
|5|`a <= b`|`A::lt_eq(a, b)`|
|5|`a >= b`|`A::gt_eq(a, b)`|
|6|`a == b`|`A::eq(a, b)`|
|6|`a != b`|`A::not_eq(a, b)`|
|7|`a && b`|[`if a { b } else { false }`](control_flow.md)|
|8|`a \|\| b`|[`if a { true } else { b }`](control_flow.md)|
|9|`x \|> f(a, b, ...)`|`f(x, a, b, ...)`|

*`X` and `A` represent the full paths of the types of the variables `x` and `a` respectively.*

According to these rules writing `5 + 10` then just means that you are calling `std::Int::plus(5, 10)` (since `5` is of type `Int`). This can be used to implement operator overloading for any desired type.