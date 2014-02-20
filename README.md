# [jTypes](http://www.jTypes.com/): Scalable class-based JavaScript for web apps and libraries

## What is jTypes?

jTypes provides developers with robust type management in JavaScript to improve the maintainability and scalability of web-based application engineering. By utilizing familiar and proven design patterns from popular languages such as C++, C#, and Java, jTypes can simplify the development of web apps, libraries, and tools. Since it is not a new language, jTypes doesn't require any transcompilation to messy and unmaintainable JavaScript like other web programming languages. This makes it extremely simple and straightforward, especially for developers that are experienced with classical inheritance. Using existing and upcoming language components that are implemented across all browsers and platforms, jTypes offers an efficient and effective framework for class-based object-oriented development that can quickly and easily adapt to the "quirks" of a constantly evolving web.

<em>jTypes allows developers to build robust, modular, and scalable applications or libraries in JavaScript using encapsulation, inheritance, and polymorphism.</em> What exactly does that mean? You know all those keywords from languages such as C++ or C# that you started missing quite badly after you transitioned to JavaScript? You know what we're talking about; all those modifiers of classical inheritance such as `virtual`, `abstract`, and `override` or `private`, `protected`, and `public` that gave you so much more control and freedom with your libraries. Well jTypes lets you use those keywords in JavaScript, so you can develop extremely powerful and robust web applications using the principals of classical inheritance.


## What are the requirements?

jTypes requires ECMAScript 5, which is supported by any modern browser (MSIE 9+) or platform.

## jTypes 2.2 Beta Performance
  
![jTypes 2.2 Beta Performance](http://content.jtypes.com/2.2.0b577.png "jTypes 2.2 Beta Performance")
 
_These are some preliminary testing results that compare various modes of the jTypes 2.2 beta along with previous versions of the library._

## Contribute

We strongly encourage anyone who is interested in contributing to contact us through any of the various social mediums on our website ([www.jTypes.com](www.jTypes.com)).

jTypes is a free open-source library developed by Gaulinsoft, a small software consulting company in Chicago, IL. We only have a few employees and spend a majority of our time working with clients on various consulting projects. This library was created internally in our free-time to simplify the development of some of our other in-house libraries which we also hope to release in the near future. Therefore, any contributions (in the form of code optimization, design ideas, unit testing, bug tracking, ect.) are greatly appreciated and really go a long way to help us out.

We hope you find jTypes to be a very useful tool in the development of your applications or libraries and we have many more great things to come, so be sure to check-in every once in a while to see what's new!


## How to define a class

In the following example, a class is compiled and the type reference is stored in the `Person` variable. A constructor is provided to take in three arguments and set the corresponding fields. Two `public` `readonly` fields are defined, and a `protected` field is defined as well. A `public` method along with a `public` `virtual` method are defined. Finally, a property with both `get` and `set` accessors is provided:

```javascript
var Person = jTypes(function(fName, lName, age)
{
    this.firstName = fName;
    this.lastName  = lName;

    this._age = age;
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
        'set': function(v)
        {
            if (v > 0)
                this._age = v;
        }
    }
});
```

## How to define a derived class

In the following example, a class is derived from the `Person` class and the type reference is stored in the `Employee` variable. Four arguments are provided to the constructor, with which the first three arguments are passed into the base constructor, while the final argument is used to set a `protected` field defined in the class. A `public` method is defined as an `override` for the base `virtual` method. This method also calls the base `virtual` method. Finally, a property with only a `get` accessor is provided, which will act as if it is a read-only field:

```javascript
var Employee = jTypes(Person, function(fName, lName, age, salary)
{
    this.__base(fName, lName, age);
    
    this._salary = salary;
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

## How to instantiate, type-check, and cast instances

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
