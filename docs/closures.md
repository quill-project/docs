
# Anonymous Functions

Anonymous functions (also called closures or lambdas) in Quill are functions that are invoked not by writing the
name, but by invoking the result of an expression
(which is why they are "anonymous").

This is powerful because it allows us to pass around functions as arguments to
other functions, being able to define how parts of a called function behave!

As seen in [the document about types](types.md), the type of an anonymous
function is `Fun(A, B, C, ...) -> R` where `A`, `B`, `C` (and so on) are 
the argument types and `R` is the return type. Omitting `-> R` and just writing 
`Fun(A, B, C, ...)` makes the return type `Unit`.

Anonymous functions don't support variadic arguments.

## Referencing Named Functions

You can turn a normal, named function into an anonymous function by writing its 
name - as if you wanted to call it, but without actually passing any arguments:

<pre><div class="embedded-playground" style="height: 16rem">
fun add(a: Int, b: Int) -> Int = a + b
fun subtract(a: Int, b: Int) -> Int = a - b

fun main() {
    val operation: Fun(Int, Int) -> Int = add // try changing 'add' to 'subtract'!
    println(operation(5, 3))
}
</div></pre>

## Anonymous Function Literals

You can create an anonymous function without needing to create a named function 
first using an anonymous function literal. 

You simply write the names of your desired arguments between `|` and write
either the result value or a list of statements in braces after it.
A literal that takes no arguments starts with `||`.

<pre><div class="embedded-playground" style="height: 12.5rem">
fun main() {
    val f: Fun(Int, Int) -> Int = |a, b| a + b
    println(f(5, 3))
}
</div></pre>

Note that anonymous function literals always require the compiler to know the
type of the expression beforehand - you cannot assign an anonymous function
literal to a variable without a specified type. (try removing the type of the variable in the above example)
```
val f = |a, b| a + b
```
This would error because the compiler cannot know what the types of `a` and `b`
are. However, it *does* work with function literals that don't take any arguments:
<pre><div class="embedded-playground" style="height: 12.5rem">
fun main() {
    val f = || 25
    println(f())
}
</div></pre>

## Capturing Variables

Another thing of note is that the bodies of anonymous function literals can
access of variables defined in the function(s) around them, "capturing" them - even if those
functions have already returned:
<pre><div class="embedded-playground" style="height: 18.5rem">
fun add(a: Int) -> Fun(Int) -> Int {
    // this function makes use of 'a' even after 'add' returns
    return |b| a + b
}

fun main() {
    val f: Fun(Int) -> Int = add(10)
    println(f(20))
}
</div></pre>

Also note that both the surrounding function and the literal may modify a
captured variable, and that the change will apply to both sides (also referred to as "capturing by reference"):
<pre><div class="embedded-playground" style="height: 19.5rem">
fun main() {
    mut n: Int = 25
    val add_n: Fun(Int) -> Int = |x| x + n
    val decr_n: Fun() = || { n = n - 1 }
    println(add_n(20))
    n = 40
    println(add_n(20))
    decr_n()
    println(add_n(20))
}
</div></pre>