# [jTypes](http://www.jTypes.com/) - Build application libraries in JavaScript using encapsulation, inheritance, and polymorphism
==================================================

## What is jTypes?

jTypes is the most comprehensive and robust JavaScript library for overcoming differential inheritance with prototype-based objects. Its lightweight yet powerful design provides web programmers on any platform or browser the ability to emulate classical inheritance where objects are defined by classes.

If you're looking for a more down-to-earth explanation rather than the generic description or tagline, then here's the deal: <em>jTypes will provide you with the ability to develop robust, modular, and scalable application libraries in JavaScript using encapsulation, inheritance, and polymorphism</em>.

What exactly does that mean? You know all those keywords from languages such as C++ or C# that you started missing quite badly after you transitioned to JavaScript? You know what we're talking about. All those beautiful modifiers of classical inheritance such as `virtual`, `abstract`, and `override` or `private`, `protected`, and `public` that gave you so much more control and freedom with your libraries. Well jTypes lets you take those keywords back, so you can develop extremely powerful and robust web applications using the principals of classical inheritance.


## What are the requirements?

jTypes requires JavaScript 1.8.5, which is supported by any modern browser (MSIE 9+).

## Contribute

We strongly encourage anyone who is interested in contributing to contact us through any of the various social mediums on our website ([www.jTypes.com](www.jTypes.com)).

jTypes is a free open-source library developed by Gaulinsoft, a small software consulting company in Chicago, IL. We only have a few employees and spend a majority of our time working with clients on various consulting projects. This library was created internally in our free-time to simplify the development of some of our other in-house libraries which we also hope to release in the near future. Therefore, any contributions (in the form of code optimization, design ideas, unit testing, bug tracking, ect.) are greatly appreciated and really go a long way to help us out.

We hope you find jTypes to be a very useful tool in the development of your application libraries and we have many more great things to come, so be sure to check-in every once in a while to see what's new!


## How to define a class

In the following example, a class is compiled and the type reference is stored in the `Person` variable. A constructor is provided to take in three arguments and set the corresponding fields. Two `public` `readonly` fields are defined, and a `protected` field is defined as well. A `public` method along with a `public` `virtual` method are defined. Finally, a property with both `get` and `set` accessors is provided:

```javascript
var Person = $$(function($fName, $lName, $age)
{
    this.firstName = $fName;
    this.lastName  = $lName;

    this._age = $age;
},
{
    'public readonly firstName': '',
    'public readonly lastName': '',

    'protected _age': 0,
 
    'public getFullName': function()
    {
        return this.firstName + ' ' + this.lastName;
    },
 
    'public virtual triggerOneYearOlder': function()
    {
        this._age++;
    },

    'public age':
    {
        'get': function()
        {
            return this._age;
        },
        'set': function($v)
        {
            if ($v > 0)
                this._age = $v;
        }
    }
});
```

## How to define a derived class

In the following example, a class is derived from the `Person` class and the type reference is stored in the `Employee` variable. Four arguments are provided to the constructor, with which the first three arguments are passed into the base constructor, while the final argument is used to set a `protected` field defined in the class. A `public` method is defined as an `override` for the base `virtual` method. This method also calls the base `virtual` method. Finally, a property with only a `get` accessor is provided, which will act as if it is a read-only field:

```javascript
var Employee = $$(Person, function($fName, $lName, $age, $salary)
{
    this.__base($fName, $lName, $age);
    
    this._salary = $salary;
},
{
    'protected _salary': 0,
 
    'public override triggerOneYearOlder': function()
    {
        this.__base.triggerOneYearOlder();
 
        this._salary *= 1.03;
    },
 
    'public salary':
    {
        'get': function()
        {
            return this._salary;
        }
    }
});
```

## How to instantiate, type-check, and cast classes

In the following example, both classes that were previously defined will be instantiated and tested to ensure their functionality is correct based on their jTypes definitions:

```javascript
// instantiate a person object
var p = new Person('John', 'Doe', 30);
 
// check that the values were set
console.log(p.firstName);// John
console.log(p.lastName);// Doe
console.log(p.age);// 30
 
// get a protected field
console.log(p._age);// undefined
 
// set a readonly field (throws in strict mode)
p.firstName = 'Jane';
 
// set an invalid property value (throws if you code it)
p.age = -40;
 
// check that the field and property didn't change
console.log(p.firstName);// John
console.log(p.age);// 30
 
// set a valid property value
p.age = 40;
 
// check that the property did change
console.log(p.age);// 40
 
// invoke a method
console.log(p.getFullName());// John Doe
 
// invoke a virtual method
p.triggerOneYearOlder();
 
// check that the age was incremented (by the virtual method)
console.log(p.age);// 41

// instantiate an employee object
var e = new Employee(p.firstName, p.lastName, p.age, 75000);
 
// check that the inherited values were set
console.log(e.firstName);// John
console.log(e.lastName);// Doe
console.log(e.age);// 41
 
// get an inherited protected field
console.log(e._age);// undefined
 
// set an inherited readonly field
e.firstName = 'Jane';
 
// check that the field didn't change
console.log(e.firstName);// John
 
// get a declared field (not inherited)
console.log(e.salary);// 75000
 
// cast the employee object as a person object
e = e.as(Person);
 
// check the types of both person objects
console.log(p instanceof Person);// true
console.log(p instanceof Employee);// false
console.log(e instanceof Person);// true
console.log(e instanceof Employee);// true
 
// check that both person objects don't have the derived property
console.log(p.salary);// undefined
console.log(e.salary);// undefined
 
// invoke an overridden method
e.triggerOneYearOlder();
 
// cast the person object as an employee object
e = e.as(Employee);
 
// check that the age was incremented (by the base method)
console.log(e.age);// 42
 
// check that the salary increased 3% (by the overridden method)
console.log(e.salary);// 77250
```

## Recent performance tests

![jTypes 2.1.2b Performance](https://lh6.googleusercontent.com/-TELz2eL1O_c/Ue6jAkm3CnI/AAAAAAAAAIY/n26xaNn-NRQ/w907-h470-no/2.1.2.bmp "jTypes 2.1.2b Performance")
