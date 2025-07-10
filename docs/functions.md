
# Functions

If type declarations describe how your data is structured, then functions describe how your program should behave. Each function defines a list of instructions that should be executed when the function is called or invoked.

## Main Function

The most important of these functions is the main function - it is a function without any arguments and without a return type that gets called when your program starts. In other words: all your program logic happens from inside of this function.

<pre><div class="embedded-playground" style="height: 12.5rem">
fun main() {
    // Anything in here gets executed on program start
    println("Hello, world!")
}
</div></pre>

## Function Invocations

Any function can be invoked (or called) by writing its name, followed by the provided arguments in parentheses. For example, in the above code `println("Hello, world!")` invokes the function `println` and gives the text `"Hello, world!"` as the only argument.

## General Function Declarations

Apart from being the entry point the main function isn't special in any other way - all other functions are defined in a similar manner. The general forms for function declarations are:
```
fun <NAME>(<ARGS>) { ... }
fun <NAME>(<ARGS>) = ...
fun <NAME>(<ARGS>) -> <RETURN_TYPE> { ... }
fun <NAME>(<ARGS>) -> <RETURN_TYPE> = ...
```
A function that does not specify a return type using `-> <RETURN_TYPE>` always implicitly returns `Unit` (which represents the absence of any data). 

Functions that are declared using `{ ... }` have a body that consists of a list of statements to execute, while functions that are declared using `= ...` simply directly specify the resulting value:

<pre><div class="embedded-playground" style="height: 18.5rem">
fun display(n: Int) {
    println(n)
}

fun add(a: Int, b: Int) -> Int = a + b

fun main() {
    display(add(5, 10))
}
</div></pre>

## Returning

Functions that specify a return type and are implemented using `{ ... }` need a mechanism to declare a result value - this is where `return` comes in.

`return <VALUE>` makes `<VALUE>` the result value and immediately exits from the function (and *returns* to where the function was invoked from). A function that does not specify a return type can use `return unit` (since `Unit` is the return type is none is specified).

<pre><div class="embedded-playground" style="height: 24.5rem">
fun greet(thing: String) -> String {
    return String::concat("Hello, ", thing)
}

fun display(n: Int) {
    println(n)
    return unit              // always exits from the function here
    println("Hello, world!") // => this is never executed
}

fun main() {
    println(greet("world"))
    display(5)
}
</div></pre>