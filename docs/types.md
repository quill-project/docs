
# Types

Data in Quill always has a type - this helps you and the compiler find errors in your programs without needing to execute them. 

## Built-in Types

The Quill language has a number of built-in types:

|Name|Values|Description|
|-|-|-|
|`Unit`|`unit`|Used to describe the absence of a value; since there is only one value of type `Unit`, it cannot be used to store any data
|`Bool`|`true` or `false`|Used to express logical conditions|
|`Int`|min. `-(2^63)` to max. `(2^63)-1`, e.g. `5`, `-10`|Used to represent any negative or positive integer (64-bit signed integer)|
|`Float`|min. `-∞` to max. `+∞`, e.g. `3.14`, `-42.0`|Used to represent any real number to a certain degree of precision (IEEE 754 double precision float)|
|`String`|Any Unicode text, e.g. `"Hello"`|A collection of unicode code points (characters) that can represent any piece of text (does not expose encoding)|
|`Fun(A, B, ...) -> R`|Any function, e.g. `\|x\| x * 2`|Represents a function that may be called with arguments of types `A`, `B`, ... (and so on) and which returns a value of type `R` (`R=Unit` if not specified)

## Custom Types

Additionally, Quill programs may define custom types for specific cases. These are:

### Structures

[Structures](`structures.md`) are custom types that consist of multiple values of other types. For example, consider this definition of a `Cat`:
```
struct Cat(name: String, age: Int)
```
This means that a `Cat` has a property `name` (which is any value of type `String`, meaning any text) and a property `age` (which is any value of type `Int`, meaning any integer).

To create a `Cat`, one needs to provide values for all properties of the `Cat`, and provide them in the same order as specified in the definition:
```
Cat("Bob", 5)
```

### Mutability

Structure types are special in several ways, the first of which is that the type represents a "reference" to an instance of the type. 

If you have a variable `a` of the struct type `Cat`, and you assign to it the contents of another variable `b` of the same type, this will NOT create a new instance of `Cat`. Both variables will instead *refer* to *the exact same* cat. 

These types are also special because instances of them can be mutated - once you have created an instance of a structure type you can modify the values of their properties. However, this is only possible if the type is explicitly marked as mutable using the `mut` keyword, such as in `mut Cat`. These are referred to as "mutable references".

Any value that is a `mut T` (where `T` is any structure type) may be used in place of a `T`, but a value of type `T` can NOT be used in place of a `mut T`.

### Enumerations

[Enumerations](enumerations.md) in Quill are custom types that are used not to represent a collection of values, but instead *only one* of a few possible values. For example, consider this definition of a `User`:
```
enum User(
    Guest,
    Member: String,
    Admin: Int
)
```
Here we define a `User` to be one of three possible values: 
- A `Guest`, which has no data associated with it
- A `Member`, which has a `String` value associated with it (possibly the username)
- An `Admin`, which has an `Int` value associated wit hit (possibly the admin number)

This means that if something is of type `User`, we can use any of the three defined values, provided we also give a value of the specified type (if there is any):
```
User::Guest
User::Member("xX_DragonSlayer2003_Xx")
User::Admin(42)
```

We can also use this to model a C-style enum, where none of the members have associated values:
```
enum Color(Red, Green, Blue)

Color::Red
Color::Green
Color::Blue
```

Equality checks can be used to check for a specific value and [pattern matching](match.md) to extract the associated value.