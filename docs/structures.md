
# Structures

## Declaration

A structure type can be declared using the following syntax:
```
struct <NAME>(<MEMBER>: <TYPE>, <MEMBER>: <TYPE>, ...)
```

## Instantiation

A structure can be instantiated by simply invoking it with a value for each member in the same order as in the declaration:
```
<NAME>(<VALUE>, <VALUE>, ...)
```

For example, we can declare a `Cat` and instantiate it like this:

<pre><div class="embedded-playground" style="height: 13.5rem">
struct Cat(name: String, age: Int)

fun main() {
    val my_cat = Cat("Snowball", 3)
}
</div></pre>

## Mutable vs Immutable References

When you instantiate a struct, you are creating a new instance. The value that you get back however is not that struct. You instead get back a "reference". A variable of type `Cat` doesn't directly contain the values of the members of a `Cat`, it only contains a reference to an instance which does contain values for each of the members. When you copy a value of type `Cat` you aren't creating a new instance of `Cat`, you are simply copying the reference to the exact same `Cat`.

Every structure type can be marked as a "mutabe reference" using `mut`. A variable of type `mut Cat` holds a mutable reference to an instance of a `Cat`, which means we are allowed to *change* the values of its members through the reference.

You may assign a mutable reference to a variable that only requires a normal reference, but you may never assign a normal reference to a variable that expects a mutable one.

Instantiations of a struct always return a mutable reference to the instance.

Also note that all of these declarations for variables are distinct:
|Declaration|Reference in Variable|Modification of Instance|
|-|-|-|
|`val n: T`|Not Changeable|Not Allowed|
|`mut n: T`|Changeable|Not Allowed|
|`val n: mut T`|Not Changeable|Allowed|
|`mut n: mut T`|Changeable|Allowed|

## Member Access

A member of a struct may be accessed by using [the `.`-operator](operators.md) on a reference. It may also be assigned a new value if the reference is mutable.
```
<REFERENCE>.<NAME>
```
<pre><div class="embedded-playground" style="height: 17rem">
struct Cat(name: String, age: Int)

fun main() {
    val my_cat: mut Cat = Cat("Snowball", 3)
    println(my_cat.age)
    my_cat.age = 4
    println(my_cat.age)
}
</div></pre>