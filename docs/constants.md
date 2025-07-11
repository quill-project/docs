
# Constants

Constants work similar to [variables](variables.md), except that they are defined outside of any particular function - in addition they *must* use `val` (meaning reassignments are never allowed) and must always specify a type.

<pre><div class="embedded-playground" style="height: 13.5rem">
val PI: Float = 3.1415

fun main() {
    println(PI)
}
</div></pre>

**Constant names by convention shall be written in screaming case, e.g. `KEYWORDS`, `BINARY_OPERATOR_PREC`, ...**

## Initialization

Before the main function of your program is executed, the values of all constants in the program are computed *once*. Programs should avoid depending on the order that constants are inialized in.

<pre><div class="embedded-playground" style="height: 13.5rem">
val TEST: Unit = println("Hello, constant!")

fun main() {
    println("Hello, world!")
}
</div></pre>