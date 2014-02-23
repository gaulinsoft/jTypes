jTypes('struct Color', function(red, green, blue)
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

jTypes('abstract Shape', function(x, y)
{
    this.x = x;
    this.y = y;
},
{
    'public int x': 0,
    'public int y': 0,
    
    'public Color fill':   null,
    'public Color stroke': null,
    
    'public abstract int area':      null,
    'public abstract int perimeter': null
});

jTypes('Circle : Shape', function(x, y, radius)
{
    this.__base(x, y);

    this.radius = radius;
},
{
    'public int radius': 0,

    'public override int area': function()
    {
        return Math.PI * this.radius * this.radius;
    },
    'public override int perimeter': function()
    {
        return 2 * Math.PI * this.radius;
    }
});

jTypes('Rectangle : Shape', function(x, y, width, height)
{
    this.__base(x, y);

    this.width  = width;
    this.height = height;
},
{
    'public ~int width':  0,
    'public ~int height': 0,

    'public override int area': function()
    {
        return this.width * this.height;
    },
    'public override int perimeter': function()
    {
        return 2 * (this.width + this.height);
    }
});

var c = new jTypes.Circle(1, 3, 5);

console.assert(c.x === 1,                      "Circle::x");
console.assert(c.y === 3,                      "Circle::y");
console.assert(c.radius === 5,                 "Circle::radius");
console.assert(c.area() === 78,                "Circle::area()");
console.assert(c.perimeter() === 31,           "Circle::perimeter()");
console.assert(c.fill instanceof jTypes.Color, "Circle::fill");

// public Color stroke
// public int radius
c.stroke = [];
c.radius = '4';

console.assert(c.stroke instanceof jTypes.Color, "Circle::stroke");
console.assert(c.radius === 0,                   "Circle::radius");

var r = new jTypes.Rectangle(1, 3, 12, 10);

console.assert(r.x === 1,            "Rectangle::x");
console.assert(r.y === 3,            "Rectangle::y");
console.assert(r.width === 12,       "Rectangle::width");
console.assert(r.height === 10,      "Rectangle::height");
console.assert(r.area() === 120,     "Rectangle::area()");
console.assert(r.perimeter() === 44, "Rectangle::perimeter()");

// public ~int width
// public ~int height
r.width  = '13';
r.height = '11';

console.assert(r.width === 13,       "Rectangle::width");
console.assert(r.height === 11,      "Rectangle::height");
console.assert(r.area() === 143,     "Rectangle::area()");
console.assert(r.perimeter() === 48, "Rectangle::perimeter()");

// public Color stroke
//    public int green
//    public int red
r.stroke.green = 5.7;
r.stroke.red   = '3';

console.assert(r.stroke.green === 5, "Rectangle::stroke->green");
console.assert(r.stroke.red === 0,   "Rectangle::stroke->red");

// public Color fill
r.fill = {};

console.assert(r.fill.green === 0, "Rectangle::fill->green");
console.assert(r.fill.red === 0,   "Rectangle::fill->red");

var obj = {};

// jTypes.accessor(Object obj, string key, Function get, Function set [, boolean enumerable [, boolean configurable [, string constraint]]])

// Shape
jTypes.accessor(obj, 's', null, null, true, true, 'Shape');

obj.s = r;

console.assert(obj.s instanceof jTypes.Shape,     "Shape=>Shape");
console.assert(obj.s instanceof jTypes.Rectangle, "Rectangle=>Shape");

console.assert(obj.s.x === 1,              "Shape::x");
console.assert(obj.s.y === 3,              "Shape::y");
console.assert(obj.s.width === undefined,  "Shape::width");
console.assert(obj.s.height === undefined, "Shape::height");
console.assert(obj.s.area() === 143,       "Shape::area()");
console.assert(obj.s.perimeter() === 48,   "Shape::perimeter()");

obj.s = {};

console.assert(obj.s === null, "object=>Shape");

obj.s = c;

console.assert(obj.s instanceof jTypes.Shape,  "Shape=>Shape");
console.assert(obj.s instanceof jTypes.Circle, "Circle=>Shape");

console.assert(obj.s.x === 1,              "Shape::x");
console.assert(obj.s.y === 3,              "Shape::y");
console.assert(obj.s.radius === undefined, "Shape::radius");
console.assert(obj.s.area() === 0,         "Shape::area()");
console.assert(obj.s.perimeter() === 0,    "Shape::perimeter()");

obj.s = '';

console.assert(obj.s === null, "string=>Shape");

// primitive
jTypes.accessor(obj, 'p', null, null, true, true, 'primitive');

obj.p = 5;

console.assert(obj.p === 5, 'number=>primitive');

obj.p = new Number(7);

console.assert(obj.p === 7, 'object=>primitive');

obj.p = [];

console.assert(obj.p === null, 'array=>primitive');

obj.p = '';

console.assert(obj.p === '', 'string=>primitive');

// ~array
jTypes.accessor(obj, 'a', null, null, true, true, '~array');

obj.a = ['a', 'b', 'c'];

console.assert(Array.isArray(obj.a) && obj.a[1] === 'b', 'array=>~array');

obj.a = false;

console.assert(Array.isArray(obj.a) && obj.a.length === 0, 'boolean=>~array');

obj.a = { '0': 'a', '1': 'b', '2': 'c', length: 3 };

console.assert(Array.isArray(obj.a) && obj.a[1] === 'b', 'object=>~array');