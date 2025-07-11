
# Enumerations

Structures are types that bundle multiple values into a single instance to build
more complicated types. Enumerations are different - they allow you to represent
a type that always only has **one** of a few multiple possible values. Each of
them has an associated name used to identify it.

## Declaration

```
enum <NAME>(<MEMBER>: <TYPE>, <MEMBER>, <MEMBER>: <TYPE>, ...)
```
In contrast to structure definitions **specifying the type is optional**.

This however doesn't mean that the member doesn't have a type - the type simply defaults to `Unit` (which represents the absence of any data).

For example, here is how we could model a color or user:
<pre><div class="embedded-playground" style="height: 24rem">
enum Color(
    Red,
    Green,
    Blue,
    Yellow
)

enum User(
    Guest,
    Member: String,
    Admin: Int
)

fun main() {}
</div></pre>
Remember that if we see a `Color`, it means that it can either be `Red`, `Green`, `Blue` or `Yellow`, the same way a `Bool` can only be `true` or `false`.

The type specified together with the member name means that if we have an
instance of that member, a value of that type is attached to it. 
As an example, according to our definition above a `Member` inside of a variable
of type `User` has a `String` value attached to it.

## Instantiation

Creating an instance of an enumeration can be done by writing the enum type, `::` , and the name of the variant, together with the associated value in parentheses:
```
User::Guest(unit)
User::Member("Maria")
User::Admin(42)
```
If the type of the member is `Unit` (also meaning if none was specified) then
one may fully omit the value:
```
User::Guest
Color::Red
Color::Blue
```

## Accessing

If we have a variable `u` of type `User`, we can't simply write `u.Member` to get
the name, since `u` might not be a `Member`! It could equally likely be a `Guest`
or `Admin`. The way to instead access the associated value is using
[a `match` statement](control_flow.md), where we can instead handle each of the possible values:
<pre><div class="embedded-playground" style="height: 25.5rem">
enum User(
    Guest,
    Member: String,
    Admin: Int
)

fun greet_user(u: User) {
    match u {
        Guest { println("Hello, guest!") }
        Member(name) { "Hello, _!" |> fmt(name) |> println() }
        Admin(id) { "Hello, admin #_!" |> fmt(id |> as_string()) |> println() }
    }
}

fun main() = greet_user(User::Member("Bob"))
</div></pre>

Also note that in a `match`-pattern it is enough to write the name of the enum member, since the compiler can figure out what the type of the pattern is.