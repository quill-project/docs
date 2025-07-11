
# External Functions

External functions are special because they are implemented not in Quill, but in whatever language the Quill code is being *compiled to*. If you are compiling to C, the code in external functions is expected to be written in C - if you are compiling to Javascript, in Javascript.

A function may be declared as external by writing `ext` before the `fun`-keyword
of the function (but after the `pub`-keyword if it is used). The body of the
function must then also be a string literal containing the code written
in the host language:

<pre><div class="embedded-playground" style="height: 13.5rem">
ext fun greet(thing: String) = "
    console.log(\"Hello, \" + #var(thing) + \"!\");
"

fun main() = greet("world")
</div></pre>

Note that the rest of this document is a bit more technical and assumes
knowledge of the host languages. It is not required for writing Quill code 
that does not declare external functions.

## Pragmas

"Pragmas" are special patterns that you can use in the bodies of external
functions that normally aren't part of the host language - the Quill compiler
replace them during compilation:
|Pragma|Replacement|Example|C|JS|
|-|-|-|-|-|
|`#var(...)`|The name of the Quill variable in the output|`#var(x)`|✓|✓|
|`#fun(...)`|The name of the Quill function in the output (requires generic types to always be specified)|`#fun(println[String])`|✓|✓|
|`#type(...)`|The name of the Quill type in the output (e.g. as the type of a variable, useful for generic types)|`#type(Int)`|✓|✕|
|`#rc_add(...)`|The name of the function used to *increase* the reference count of the given Quill type (useful for generic types)|`#rc_add(Box[Int])`|✓|✕|
|`#rc_dec(...)`|The name of the function used to *decrease* the reference count of the given Quill type (useful for generic types)|`#rc_dec(Box[Int])`|✓|✕|
|`#include(...)`|Makes the given header included at the top of the output file|`#include(<string.h>)`|✓|✕|

When compiling Quill to C, reference counting is used for automatic memory
management - external code must *increase* (`#rc_add`) the reference count of
an object if a reference to it is duplicated and *decrease* (`#rc_dec`) it
when a reference is destroyed.

## Quill Types in Host Language

Here is how types map to the different host languages:

|Quill|Javascript|C|
|-|-|-|
|`Unit`|`undefined`|`quill_unit_t`|
|`Int`|`BigInt`|`quill_int_t`|
|`Float`|`number`|`quill_float_t`|
|`String`|`string`|`quill_string_t`|
|`Fun(...) -> ...`|`function`¹|`quill_closure_t`⁴|
|any `struct`-type|`object`²|`quill_struct_t`⁵|
|any `enum`-type|`object`³|`quill_enum_t`⁶|

Javascript Footnotes (1-3):

1. Callable like any Javascript function
2. Object containing all members of the Quill structure, except that the names
are prefixed with `m_`
3. Object containing a `.tag` number (index of variant in order of declaration)
and a `.value` member holding the value

C Footnotes (4-6):

4. Callable using the `QUILL_CALL_CLOSURE` and `QUILL_CALL_CLOSURE_NA` (no arguments) macros
5. Reference - object allocation data contains a struct with the same order of
members and types as in the Quill declaration
6. Reference - object allocation data contains a struct with:
    1. A `uint32_t` tag (index of variant in order of declaration)
    2. A `union` of all possible value types (the value)

*Note that the C types are defined in `<quill.h>` provided by [`quill-project/runtime-c`](https://github.com/quill-project/runtime-c).*