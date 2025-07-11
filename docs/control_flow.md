
# Control Flow

## Conditional Branching

`if` and `else` can be used as a statement with the following syntax, 
where the bodies of each of the branch bodies are lists of statements:
```
if ... { ... }
if ... { ... } else { ... }
if ... { ... } else if ... { ... } else { ... }
if ... { ... } else if ... { ... } else if { ... } else { ... }
// (and so on)
```
<pre><div class="embedded-playground" style="height: 18.5rem">
fun cat_is_hungry(hunger: Float) {
    if hunger >= 0.25 {
        println("Feed the cat!")
    } else {
        println("The cat isn't hungry")
    }
}

fun main() = cat_is_hungry(0.15)
</div></pre>

`if` and `else` can also be used in place of an expression, in which case the 
branch bodies are also singular expressions and in which case an `else` branch
is *always* required:
```
if ... { ... } else { ... }
if ... { ... } else if ... { ... } else { ... }
if ... { ... } else if ... { ... } else if { ... } else { ... }
(and so on)
```
<pre><div class="embedded-playground" style="height: 13.5rem">
fun cat_is_hungry(hunger: Float) -> String = 
    if hunger >= 0.25 { "Feed the cat!" } 
    else { "The cat isn't hungry" }

fun main() = cat_is_hungry(0.15)
</div></pre>

## Pattern Matching

The `match`-statement can be used to match a given value against a list of
patterns, and then execute the branch associated with that pattern.
The general syntax is:
```
match ... {
    ... { ... }
    ... | ... { ... }
    ... | ... | ... { ... }
    ... | ... | ... | ... { ... }
    (and so on)
}
```
In `... { ... }` the left `...` is the pattern, and the `...` on the right is
a list of statements that make up the body. Multiple patterns can be assigned
to the same body (meaning any of them can match for that body) by joining the
patterns using `|`. `|` can NOT be used inside of patterns.

Each pattern can either be an arbitrary expression or an enum or structure literal - references to unknown variables inside of such a literal allow ANY value at that position and create a new variable inside of the branch body that has the captured value.

A `match`-statement should provide a branch for any possible value.

<pre><div class="embedded-playground" style="height: 39.5rem">
struct Cat(name: String, age: Int)

fun display_cat(c: Cat) {
    match c {
        Cat("Snowball", _) { 
            println("Hello, Snowball!") 
        }
        Cat(name, 0) {
            println(String::fmt("_ is very young!", name)) 
        }
        Cat(name, 1) | Cat(name, 2) { 
            println(String::fmt("_ is young!", name)) 
        }
        Cat(name, _) { // handles any possible cat
            println(String::fmt("Hello, _!", name))
        }
    }
}

fun main() = display_cat(Cat("Bob", 3))
</div></pre>


TODO - documentation for:
- `while`
- `for`
- `continue`
- `break`
- `return`