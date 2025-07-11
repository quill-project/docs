
# Modules 

First of all, consider "a symbol" any top-level declaration that creates some named thing (such as a function, constant or type declaration).

Next, note that all symbols have some "absolute" or "full" path. The absolute or full path is the absolute path of the module of the symbol combined with the name of the symbol.

The "absolute" or "full" path of a module is again the absolute path of the module it is contained in combined with the name of the module. 

Names inside of module paths are always joined using `::`. 

For example, `println` is a function in the module `std`, meaning its absolute or full path is `std::println`.

Modules in Quill are quite flexible - they are simply a way to categorize your code. You may have multiple files in the same module or one file contain symbols in different modules. You can also have a module that shares its path with another symbol.

The full path of a symbol can almost always be used to refer to that symbol.

## Defining the Current Module

You can use `mod some::path` to set the module that all following symbols should be located in. This must be done once at the top of every file, and any subsequent declarations overwrite the previous ones:

<pre><div class="embedded-playground" style="height: 17rem">
mod foo
fun add(a: Int, b: Int) -> Int = a + b   // full path is 'foo::add'

mod bar
fun negate(x: Float) -> Float = -x       // full path is 'bar::negate'

mod playground
fun main() {}                            // full path is 'playground::main'
</div></pre>

*Note that in the small embedded playgrounds on the website `mod playground` is added to the top of every file automatically to allow for shorter code examples; in a normal environment this is not the case!*

## Symbol Visibility

Using the `pub`-keyword before a symbol declaration has an effect on what other modules can do with the symbol:
- [Functions](functions.md) - `pub` allows other modules to call or [reference](closures.md) the function
- [Constants](constants.md) - `pub` allows other modules to access the value
- [Enumerations](enumerations.md) and [Structures](structures.md) - `pub` allows other modules to create, modify and access the contents of an instance of the type

<pre><div class="embedded-playground" style="height: 17rem">
mod arithmetic
// try removing the 'pub'-keyword!
pub fun add(a: Int, b: Int) -> Int = a + b   // full path is 'arithmetic::add'

mod playground
fun main() {
    println(arithmetic::add(5, 10))
}
</div></pre>

## Using Symbols from other Modules

There would be no point behind the module system if one always had to write the absolute path of every symbol they wanted to use. This is the purpose behind `use some::path`, which allows you to create aliases for module paths.

`use` will create an alias for the last name of the given path and map it to the full provided path.

For example, writing `use std::println` will make `println` a valid name in your module - it will simply be expanded to `std::println`.

Parentheses can be used to apply `use` to multiple paths that share a common containing module - writing `use std::(Int, Float)` has the same effect as writing `use std::Int` and `use std::Float`.

An asterisk can be used as a wildcard - this will duplicate the path for every symbol or module that can fill the gap represented by the asterisk. Writing `use std::*` is the same as writing `use std::(Int, Float, String, Bool, hash, ...)`.

<pre><div class="embedded-playground" style="height: 18.5rem">
mod arithmetic
pub fun add(a: Int, b: Int) -> Int = a + b
pub fun sub(a: Int, b: Int) -> Int = a - b

mod playground
use arithmetic::(add, sub)
fun main() {
    println(sub(add(10, 15), 10))
}
</div></pre>

*A `use` statement always takes effect from the last `mod`-declaration up to the next `mod`-declaration or the end of the file. Its position in the file has no effect, meaning a `use`-statement can influence symbols written above it (up to the last `mod`-statement).*

*After every `mod <MODULE>`-statement `use std::*` and `use <MODULE>::*` are implicitly applied.*

## Symbol Names

The names of symbols such as functions, constants or type definitions may contain a module name using `::` - the last part of the path will become the name of the symbol, and the symbol will be placed in the specified module inside of the current module.
```
mod example

fun fun_stuff::do_stuff() {}
```
In the above example `do_stuff` is a function in the module `example::fun_stuff`, giving it the full path `example::fun_stuff::do_stuff`. Code inside of the symbol still behaves as if it was defined in the *current module*, NOT the module that the symbol will actually be placed inside of.

By convention this is used when a function is associated with some type to place the function in a module that shares its name with the type the function is associated with:
```
mod example

pub struct Cat(name: String, age: Int)

pub fun Cat::plus(lhs: Cat, rhs: Cat) -> Cat {
    return Cat("unnnamed", 0)
}
```
This implements the `+`-operator for a custom type `Cat`. This convention is also useful for calling functions associated with [generic types](templates.md) and when using [the `|>`-operator](operators.md).

## Absolute Paths of Built-in Types

For normal types, their absolute or full paths are the module they are defined in + their names. However, the built-in types are never explicitly declared anywhere - they are defined by the language itself. They do however still need to have absolute paths for several purposes, so their absolute paths are defined to be the following:
|Type|Absolute Path|
|-|-|
|`Unit`|`std::Unit`|
|`Bool`|`std::Bool`|
|`Int`|`std::Int`|
|`Float`|`std::Float`|
|`String`|`std::String`|
|`Fun() -> R`|`std::Fun0`|
|`Fun(A) -> R`|`std::Fun1`|
|`Fun(A, B) -> R`|`std::Fun2`|
|`Fun(A, B, C) -> R`|`std::Fun3`|
|`Fun(A, B, C, ...) -> R`|`std::FunN`|

*As seen above the absolute path of a function type is `std::FunN`, where `N` is the number of arguments the function receives.*