
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

## The Pipe Operator

From the above list of operators, `|>` is the operator the least amount of people will be familiar with. It has a fairly basic purpose - it inserts the expression on the left as the first argument to the invocation on the right.
This invocation may be a function call or a struct or enum initalization.
The operator may also be chained, making it a useful tool to avoid deeply nested call expressions:
<pre><div class="embedded-playground" style="height: 15rem">
fun main() {
    "3.1415"
        |> Int::parse()
        |> Option::expect("Failed to parse input as integer")
        |> println()
}
</div></pre>

The operator also has another function when the invoked thing is named, but not a local variable and not directly available as a symbol - it will search *all modules aliased using `use`* for a function with that name and choose the one that has a fitting first argument type, and call that function. It will cause an error if none or more than one has a fitting first argument type.

This is useful because if we have a custom type that has functions associated with it (e.g. `example::Cat`), and those functions are declared in a module that has the same name as the type (e.g. `example::Cat::feed`), we only need to `use example::Cat` to be able to call all associated functions of `Cat` freely using `|>`:
<pre><div class="embedded-playground" style="height: 29rem">
mod example

pub struct Cat(name: String, hunger: Float)

pub fun Cat::feed(self: mut Cat, amount: Float) {
    self.hunger = (self.hunger - amount) |> max(0.0) // calls 'std::Int::max'
}


mod playground

use example::Cat

fun main() {
    val c = Cat("Cookie", 0.7)
    c |> feed(0.5) // calls 'example::Cat::feed'
    println(c.hunger)
}
</div></pre>
*Note that there is no need to `use module::SomeType` if `SomeType` is declared in the current module or `std`, because of the default `use std::*` and `use current_module::*`.*