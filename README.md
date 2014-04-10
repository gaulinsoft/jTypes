# [jTypes](http://www.jTypes.com/): Scalable class-based JavaScript for web apps and libraries

jTypes provides developers with robust type management in JavaScript to improve the maintainability and scalability of web-based applications. By utilizing familiar and proven design patterns from popular languages such as C++, C#, and Java, jTypes can simplify the development of web apps, libraries, and tools. Since it is not a new language, jTypes doesn't require any transcompilation to messy and unmaintainable JavaScript like other web programming languages. This makes it extremely simple and straightforward, especially for developers that are experienced with classical inheritance. Using existing and upcoming language components that are implemented across all browsers and platforms, jTypes offers an efficient and effective framework for class-based object-oriented development that can quickly and easily adapt to the "quirks" of a constantly evolving web.

<em>jTypes allows developers to build robust, modular, and scalable applications or libraries in JavaScript using encapsulation, inheritance, and polymorphism.</em> What exactly does that mean? You know all those keywords from languages such as C++ or C# that you started missing quite badly after you transitioned to JavaScript? You know what we're talking about; all those modifiers of classical inheritance such as `virtual`, `abstract`, and `override` or `private`, `protected`, and `public` that gave you so much more control and freedom with your libraries. Well jTypes lets you use those keywords in JavaScript, so you can develop extremely powerful and robust web applications using the principals of classical inheritance.


## Requirements

jTypes requires ECMAScript 5, which is supported by any modern web browser (and MSIE 9+) or platform.

## Contents
- [Classes](#classes)
    - [Fields](#fields)
    - [Methods](#methods)
    - [Properties](#properties)
        - [Automatically Implemented Properties](#automatically-implemented-properties)
    - [Constraints](#constraints)
    - [Constraint Modifiers](#constraint-modifiers)
        - [Nullable](#nullable-modifier)
        - [Not-Nullable](#not-nullable-modifier)
        - [Cast](#cast-modifier)
        - [Suppress](#suppress-modifier)
- [Namespaces](#namespaces)
    - [Dependencies](#dependencies)
        - [Includes](#includes)
        - [Aliases](#aliases)
- [Class Modifiers](#class-modifiers)
    - [abstract](#abstract)
    - [internal](#internal)
    - [model](#model)
    - [primitive](#primitive)
    - [sealed](#sealed)
    - [struct](#struct)
    - [unlocked](#unlocked)
- [Class Member Modifiers](#class-member-modifiers)
    - [abstract](#abstract-1)
    - [const](#const)
    - [hidden](#hidden)
    - [new](#new)
    - [override](#override)
    - [private](#private)
    - [protected](#protected)
    - [prototype](#prototype)
    - [public](#public)
    - [readonly](#readonly)
    - [sealed](#sealed-1)
    - [static](#static)
    - [virtual](#virtual)
    - [visible](#visible)

## Classes

Some text and `code` about classes...

```javascript
var Color = jTypes(function(red, green, blue)
{
    this.red   = red;
    this.green = green;
    this.blue  = blue;
},
{
    'public red':   0,
    'public green': 0,
    'public blue':  0
});

var white = new Color(255, 255, 255);
var gray  = new Color(128, 128, 128);
```

### Fields

### Methods

### Properties

#### Automatically Implemented Properties

### Constraints

Some text and `code` about type constraints...

```javascript
var Color = jTypes(function(red, green, blue)
{
    this.red   = red;
    this.green = green;
    this.blue  = blue;
},
{
    'public int red':   0,
    'public int green': 0,
    'public int blue':  0
});

var white = new Color(255, 255, 255);
var gray  = new Color(128, 128, 128);
```

* array
* boolean (or bool)
* date
* error
* function
* integer (or int)
* number (or float)
* object
* primitive
* regexp
* string
* symbol
* type
* window
* Class/Model/Struct (starts with capital letter because it's a class name)

### Constraint Modifiers

#### Nullable Modifier

question mark => `string?`

...for primitive type constraints (boolean, integer, number, string, and Struct)

#### Not-Nullable Modifier

exclamation point => `array!`

...for type constraints with default instances (array, date, error, function, object, regexp, and Model)

#### Cast Modifier

tidle => `~number`

...for type constraints with conversion methods (array, boolean, date, integer, number, regexp, string)

#### Suppress Modifier

at-symbol => `@date`

...suppresses errors when strict method is enabled (`jTypes.strict = true`)

## Namespaces

Namespaces help organize applications and libraries by controlling the scope of classes. They are created by providing the jTypes compiler with a callback function in the following format:

```
Object jTypes([String modifiers,] [Array dependencies,] Function callback(jTypes))
```

This callback is invoked in the context of a namespace object. Using the provided argument, calls to the compiler will also be within the scope of the namespace.

_If a modifiers string is not provided, the callback is invoked in the context of the global namespace._

In the following example, a struct `Color` is compiled in the scope of the `System.Drawing` namespace:
```javascript
jTypes('namespace System.Drawing', function($$)
{
    $$('struct Color', function(r, g, b, a)
    {
        // ...
    },
    {
        // ...
    });
    
    var gray = new this.Color(128, 128, 128);
});
```

_The namespace modifier in the modifiers string is optional and can be provided for readability._

Since this callback is invoked in the context of the namespace, the struct can be instantiated using `this.Color` in the scope of the callback function. Other scopes can instantiate this struct using the fully qualified reference from the global namespace:

```javascript
var gray = new jTypes.System.Drawing.Color(128, 128, 128);
```

These scopes also allow base classes and type constraints to be resolved from either the current or parent namespaces without requiring a fully qualified name. In the next example, an abstract class `Shape` is compiled in the scope of the `System.Drawing.Drawing2D` namespace:

```javascript
jTypes('namespace System.Drawing.Drawing2D', function($$)
{
    $$('abstract Shape',
    {
        'public Color fill':   null,
        'public Color stroke': null,
        
        // ...
    });
});
```

When building the `Shape` class, the type constraint `Color` on the fields can be resolved without using the fully qualified name because the struct is defined in a parent namespace.

### Dependencies

If a base class or type constraint cannot be resolved from either the current or parent namespaces, a dependencies array can prevent the need to specify a namespace or fully qualified name. This array of dependency strings can contain two types of declarations; a namespace include or alias definition.

_The using modifier in the following dependency strings are optional and can be provided for readability._

#### Includes

Namespace includes allow identifiers in a namespace to be resolved without having to specify the namespace. The following example includes the `System.Drawing` namespace in the scope of the callback function:

```javascript
jTypes('namespace System.Forms',
[
    'using System.Drawing',
    
    // ...
],
function($$)
{
    $$('Textbox : Control', function()
    {
        // ...
    },
    {
        'public virtual Color background': ['get', 'set'],
        'public virtual Color border':     ['get', 'set'],
        
        // ...
    });
});
```

Since the `System.Drawing` namespace is included in the scope, the type constraint `Color` on the automatically implemented properties can be resolved without using `Drawing.Color` or `System.Drawing.Color`.

_If a base class or type constraint is ambiguous between namespace includes, then the name must be uniquely qualified._

#### Aliases

Alias definitions make it easier to qualify an identifier for a class or namespace. The next example creates the alias `Color` for the fully qualified name `System.Drawing.Color`:

```javascript
jTypes('namespace System.Forms',
[
    'using Color = System.Drawing.Color',
    
    // ...
],
function($$)
{
    $$('Textbox : Control', function()
    {
        // ...
    },
    {
        'public virtual Color background': ['get', 'set'],
        'public virtual Color border':     ['get', 'set'],
        
        // ...
    });
});
```

Because this alias is defined in the scope of the callback function, the type constraint `Color` on the automatically implemented properties can be resolved. The fully qualified name on the right side of the alias definition can also be `Drawing.Color` since `System.Forms` is a child namespace of `System`.

_Aliases cannot hide a name already defined in the current namespace._

## Class Modifiers

### abstract

...abstract classes => cannot be instantiated and can have abstract methods and properties...

### internal

...internal classes => hide their type from the type() method on all instances and the __type accessor on the public instance (and non-internal classes cannot inherit from internal classes)...

### model

...models have => optional constructors (new operator invokes constructor), default instances (without new operator)...

### primitive

...primitive classes have => primitive type constraints (for fields and automatically implemented properties), clone() and equals(obj) methods...

### sealed

...sealed classes => cannot be inherited...

### struct

...structs have => optional constructors (new operator invokes constructor), default instances (without new operator), no inheritance, clone() and equals(obj) methods...

### unlocked

...unlocked classes have => chainable __base instances...

## Class Member Modifiers

### abstract

...abstract members => must be overridden in a derived class (and can only be used on methods or properties)...

### const

...const members => are not `[Writable]` and can only be used with the `prototype` or `static` modifiers...

### hidden

...hidden members => are not `[Enumerable]` (fields and properties are enumerable by default, methods are not)

### new

...new members => hide an inherited member (when not overriding)...

### override

...override members => override an inherited abstract or virtual member...

### private

...private members => are only accessible in the methods and properties of the class they are defined in...

### protected

...protected members => are only accessible in the methods and properties of the class they are defined in and the methods and properties of any derived classes...

### prototype

...prototype members => are defined on the prototype of the class constructor (`Class.prototype`)...

### public

...public members => are accessible everywhere for the class they are defined in and any derived classes as well...

### readonly

...readonly members => are only writable inside the constructor (and can only be used with fields and automatically implemented properties)...

### sealed

...sealed members => cannot be overridden and must be used with the `override` modifier...

### static

...static members => are defined on the class constructor (`Class`)...

### virtual

...virtual members => can be overridden in a derived class (and can only be used on methods or properties)...

### visible

...visible members => are `[Enumerable]` (methods are not enumerable by default, fields and properties are)

## Global Settings

### jT_FunctionLock

default: `false`

### jT_Harmony

default: `true`

### jT_Legacy

default: `false`

### jT_PrototypeLock

default: `false`

### jT_Shorthand

default: `true`

### jT_Storage

default: `false`

### jT_Writable

default: `false`

## Contribute

We strongly encourage anyone who is interested in contributing to contact us through any of the various social mediums on our website ([www.jTypes.com](www.jTypes.com)).

jTypes is an open-source library developed by Gaulinsoft, a small software consulting company in Chicago, IL. It was created internally in our free-time to simplify the development of some of our other frameworks and libraries which we also hope to release in the near future. Therefore, any contributions are greatly appreciated and really go a long way to help us out.

We hope you find jTypes to be a very useful tool in the development of your applications or libraries and we have many more great things to come, so be sure to check-in every once in a while to see what's new!


## Performance
  
![jTypes 2.2 Performance](http://content.jtypes.com/2.2.0b658.png "jTypes 2.2 Performance")
