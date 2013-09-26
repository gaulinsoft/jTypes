// compile the person class
var Person = $$(function($fName, $lName, $age)
{
    // set the readonly fields (cast the string arguments)
    this.firstName = $$.asString($fName);
    this.lastName  = $$.asString($lName);

    // set the protected field (cast the number)
    this._age = $$.asInt($age, true);
},
{
    // key-syntax definitions

    'public readonly firstName': '',
    'public readonly lastName': '',

    'protected _age': 0,

    'public getFullName': function()
    {
        // return the concatenated full name
        return this.firstName + ' ' + this.lastName;
    },

    'public triggerOneYearOlder': function()
    {
        // increment the protected field
        this._age++;
    },

    'public age':
    {
        'get': function()
        {
            // return the protected field
            return this._age;
        },
        'set': function($v)
        {
            // if the incoming property value is valid, set the protected field
            if ($v > 0)
                this._age = $v;
        }
    }
});

// compile the employee class
var Employee = $$(Person, function($fName, $lName, $age, $salary)
{
    // call the base constructor
    this.__base.constructor($fName, $lName, $age);

    // set the protected salary field (cast the number)
    this._salary = $$.asInt($salary, true);
},
{
    // value-syntax definitions

    _salary: $$.protected(0),

    triggerOneYearOlder: $$.public(function()
    {
        // increment the protected age field (by calling the base method)
        this.__base.triggerOneYearOlder();

        // increase the salary by three percent
        this._salary *= 1.03;
    }),

    salary: $$.public(
    {
        'get': function()
        {
            // return the salary
            return this._salary;
        }
    })
});

// instantiate a person object
var p = new Person('John', 'Doe', 30);

// check that the values were set
console.log(p.firstName);// John
console.log(p.lastName);// Doe
console.log(p.age);// 30

// get a protected field
console.log(p._age);// undefined

// set a readonly field (throws an exception)
//p.firstName = 'Jane'; (uncomment to try it out)

// set an invalid property value
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

// invoke another method
p.triggerOneYearOlder();

// check that the age was incremented (by the method)
console.log(p.age);// 41

// instantiate an employee object
var e = new Employee(p.firstName, p.lastName, p.age, 75000);

// check that the inherited values were set
console.log(e.firstName);// John
console.log(e.lastName);// Doe
console.log(e.age);// 41

// get an inherited protected field
console.log(e._age);// undefined

// set an inherited readonly field (throws an exception)
//e.firstName = 'Jane'; (uncomment to try it out)

// check that the field didn't change
console.log(e.firstName);// John

// get a declared field (not inherited)
console.log(e.salary);// 75000

// check the types of both person objects
console.log(p instanceof Person);// true
console.log(p instanceof Employee);// false
console.log(e instanceof Person);// true
console.log(e instanceof Employee);// true

// invoke an overridden method
e.triggerOneYearOlder();

// check that the age was incremented (by the base method)
console.log(e.age);// 42

// check that the salary increased 3% (by the overridden method)
console.log(e.salary);// 77250