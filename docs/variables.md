
# Variables

In the previous section we have seen function arguments, which act as variables that are filled with a value when the function is invoked.

Similar to this we can also define other variables inside the function body. These variables instead require us to provide a value. A basic variable can be created using the `val`-keyword, the name of the variable, the type of the variable and the value:

<pre><div class="embedded-playground" style="height: 15rem">
fun main() {
    val a: Int = 5
    val b: Int = 10
    val c: Int = a + b
    println(c)
}
</div></pre>

## Mutable variables

Variables declared using the `val`-keyword have one key limitation - once they have been created, no new value may be assigned to them. For that reason the following program will lead to an error:

<pre><div class="embedded-playground" style="height: 13.5rem">
fun main() {
    val a: Int = 5
    a = 10
    println(a)
}
</div></pre>

This can be fixed by replacing the `val`-keyword with the `mut`-keyword - this will turn it into a mutable variable, for which such a reassignment is allowed:

<pre><div class="embedded-playground" style="height: 13.5rem">
fun main() {
    mut a: Int = 5
    a = 10
    println(a)
}
</div></pre>

## Type Inference

For both `val` and `mut` specifying the type of the variable is optional; omitting the type causes the compiler to infer it. It is recommend that this is only used in cases where the is obvious just from looking at the value, such as
```
val a = 5               // = Int
val b = "Hello"         // = String
val c = Cat("Bob", 5)   // = mut Cat
```
In contrast it is NOT recommended for situations where the type isn't immediately obvious (which in practice means any value that isn't a literal). In these cases **specifying the type can have a few advantages**:
- Readers of your code immediately know what type the variable has just by looking at the name
- Later modification of the value cannot accidentally quietly change the type of the variable
- May be required in specific cases to aid the compiler with [template type inference](templates.md)
```
val t: Float = get_temperature() // no need to look at what 'get_temperature' returns, we know it's a float
```