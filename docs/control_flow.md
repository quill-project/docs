
# Control Flow

## Conditional Branching

`if` and `else` can be used as a statement with the following syntax, 
where the bodies of each of the branch bodies are lists of statements:
```
if <COND> { ... }
if <COND> { ... } else { ... }
if <COND> { ... } else if <COND> { ... }
if <COND> { ... } else if <COND> { ... } else { ... }
if <COND> { ... } else if <COND> { ... } else if <COND> { ... }
if <COND> { ... } else if <COND> { ... } else if <COND> { ... } else { ... }
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
if <COND> { ... } else { ... }
if <COND> { ... } else if <COND> { ... } else { ... }
if <COND> { ... } else if <COND> { ... } else if <COND> { ... } else { ... }
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
match <MATCHED> {
    <PATTERN> { ... }
    <PATTERN> | <PATTERN> { ... }
    <PATTERN> | <PATTERN> | <PATTERN> { ... }
    (and so on)
}
```
In `<PATTERN> { ... }` the `...` is
a list of statements that make up the body. Multiple patterns can be assigned
to the same body (meaning any of them can match for that body) by joining the
patterns using `|`. `|` can NOT be used inside of patterns.

Each pattern can either be an arbitrary expression or an enum or structure literal - references to unknown variables inside of such a literal allow ANY value at that position and create a new variable inside of the branch body that has the captured value.

A `match`-statement should provide a branch for any possible value.

<pre><div class="embedded-playground" style="height: 31.5rem">
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

## Loops

The `while`-statement allows you to repeat a list of statements while a given condition is `true`. The condition is checked before the body is executed, and the loop stops as soon as the condition is `false` once:
```
while <COND> { ... }
```

<pre><div class="embedded-playground" style="height: 15rem">
fun main() {
    mut i = 0
    while i < 20 {
        println(i)
    }
}
</div></pre>

The `for`-statement allows you to repeat a list of statements for every item in a given [`Sequence[T]`](templates.md). The current value from the sequence is assigned to a new immutable variable with the given name:
```
for <NAME>: <SEQUENCE> { ... }
```
<pre><div class="embedded-playground" style="height: 13.5rem">
fun main() {
    for i: range(0, 20) { // 'std::range' returns a 'Sequence[Int]'
        println(i)
    }
}
</div></pre>

The `continue`-statement jumps to the end of the loop body, skipping over all other statements in the body. It is only allowed to be used inside of a loop statement like `while` and `for`.
```
continue
```
<pre><div class="embedded-playground" style="height: 15rem">
fun main() {
    for i: range(0, 20) { // 'std::range' returns a 'Sequence[Int]'
        if i % 2 != 0 { continue } // skip all uneven numbers
        println(i)
    }
}
</div></pre>

The `break`-statement jumps to the end of the loop body and causes no further iteration to take place - the program continues executing the statements *after the surrounding loop statement*. It is only allowed to be used inside of a loop statement like `while` and `for`.
```
break
```
<pre><div class="embedded-playground" style="height: 15rem">
fun main() {
    for i: range(0, 20) { // 'std::range' returns a 'Sequence[Int]'
        if i >= 10 { break } // stop at 10
        println(i)
    }
}
</div></pre>