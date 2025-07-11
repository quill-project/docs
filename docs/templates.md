
# Templates

Templates allow your functions and types to work on *generic types*, which are
types that can be freely specified by the user of your type or function.

They can be defined for functions and type definitions, but not for constants.

Templates are added to symbols by writing the template arguments
(simply a comma-separated list of names) inside of square brackets
(such as `[A, B, C]` or `[T]`) directly after the symbol name.

The symbol body may then freely use that type argument as a normal type:
```
fun add[T](a: T, b: T) -> T = a + b

struct Pair[A, B](first: A, second: B)

enum Option[T](Some: T, None)
```

## Instantiation

In the same way a templated symbol is declared, the types for each of the
generic type arguments are passed in square brackets after the symbol name:
<pre><div class="embedded-playground" style="height: 13.5rem">
fun add[T](a: T, b: T) -> T = a + b

fun main() {
    println(add[Int](5, 10))
}
</div></pre>

This will effectively create a copy of the instantiated symbol, where `T` is
replaced by whatever type was specified during invocation.

Here are other examples for instantiating structures and enums:

<pre><div class="embedded-playground" style="height: 16rem">
struct Pair[A, B](first: A, second: B)

fun main() {
    val berlin: Pair[String, Int] = Pair[String, Int]("Berlin", 3432000)
    println(berlin.first)
    println(berlin.second)
}
</div></pre>

<pre><div class="embedded-playground" style="height: 23rem">
enum Option[T](Some: T, None)

fun greet(thing: Option[String]) {
    match thing {
        Some(t) { "Hello, _!" |> fmt(t) |> println() }
        None { println("Hello!") }
    }
}

fun main() {
    greet(Option::Some[String]("world"))
    greet(Option::None[String])
}
</div></pre>

## Generic Types in Module Paths

Templated symbols may not only use the generic type arguments as types inside
the body, but also as parts of module paths - this will cause it to be replaced
with [the full path](modules.md) of the template type.

This can be used to call functions associated with a generic type:

<pre><div class="embedded-playground" style="height: 18.5rem">
fun greet[T](value: T) {
    println(T::as_string(value)) // <- 'T::as_string' becomes...
}

fun main() {
    greet[Int](5)     // ...'std::Int::as_string'
    greet[Bool](true) // ...'std::Bool::as_string'
    greet[Unit](unit) // ...'std::Unit::as_string'
}
</div></pre>


## Generic Type Inference

With all of this in mind, let's take a look at `println` - in the past few
examples we have been passing all kinds of types of values to it. You might be
able to guess that it is also a templated function:
```
pub fun println[T](value: T) = value 
    |> T::as_string()
    |> raw_println()
```
However, we never needed to specify the generic type when using `println`.

Fact is, most of the time the compiler can figure out what the generic types
are based on what arguments we are providing and based on what it expects the
result type to be.

However, when instantiating a symbol as a type you will still always need to
specify the type arguments.

<pre><div class="embedded-playground" style="height: 29rem">
enum Option[T](Some: T, None)

fun greet(thing: Option[String]) { // <- required here
    match thing {
        Some(t) { "Hello, _!" |> fmt(t) |> println() }
        None { println("Hello!") }
    }
}

fun main() {
    // here we don't need to specify:
    greet(Option::Some("world")) // <- given value is string
    greet(Option::None)          // <- 'greet' expects 'Option[String]'
    val x: Option[Int] = Option::None // <- 'x' is an 'Option[Int]'
    // here we need to specify, since the variable
    // doesn't have a known type:
    val y = Option::None[Float]   // try removing '[Float]'!
}
</div></pre>