
# Literals

## Unit Type Literal

The `Unit` type is special because it always has the value `unit`. It therefore cannot store any information, since it always has that same value. This is why it is used to represent the absence of any data, and why it is used as the default function return type.

In any scenario where you need an expression that results in type `Unit`, you can pass the literal `unit` (note the lowercase `u`).

## Boolean Literals

The `Bool` type has two possible values: `true` and `false`.

## Integer Literals

`Int`-literals are simply a chain of decimal digits, like `5`, `42` or `325`. Note that: 
- `-31` is [the `-`-operator](operators.md) applied to the integer literal `31`
- `3.5` is a `Float`-literal and needs explicit conversion to be used as an `Int`
- `test23` is not an integer literal but an identifier
- `23test` *technically is* an integer literal `23` and an identifier `test`, but is extremely confusing and should not be used

## Float Literals

`Float`-literals are simply a chain of decimal digits, `.`, and another chain of decimal digits.
Note that:
- The `.` is required - `31` is an `Int`-literal, `31.0` is a `Float`-literal
- `-31` is [the `-`-operator](operators.md) applied to the integer literal `31`
- `Float`-literals no not currently support exponents

Additionally, there are the constants `Float::NAN` (not a number), 
`Float::INF` (positive infinity) and `Float::NEG_INF` (negative infinity).

## String Literals

`String`-literals are defined by surrounding your desired content of the string
with `"`. The contents may span across multiple lines and support the following special sequences:
|Sequence|Replaced By|Notes|
|-|-|-|
|`\"`|`"`|Used to include `"` in the text instead of ending the string|
|`\\`|`\`|Used to include `\` in the text instead of starting a sequence|
|`\` + Line Feed|Nothing|Used to exclude new line from resulting string|
|`\b`|Backspace|ASCII code 8 (decimal)|
|`\t`|Horizontal Tab|ASCII code 9 (decimal)|
|`\n`|Line Feed|ASCII code 10 (decimal)|
|`\f`|Form Feed|ASCII code 12 (decimal)|
|`\r`|Carriage Return|ASCII code 13 (decimal)|
|`\xNN`|Includes the given ASCII hex code as a character|`N` is a hexadecimal digit|
|`\uNNNN`|Includes the given Unicode hex code as a character|`N` is a hexadecimal digit|
|`\X`|Includes the given character in the text|`X` is any character|