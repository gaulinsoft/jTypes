jTypes('Color', function(red, green, blue)
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

jTypes('abstract Shape', function(x, y, fill, stroke)
{
    this.x = x;
    this.y = y;

    this.fill   = fill;
    this.stroke = stroke;
},
{
    'public int x': 0,
    'public int y': 0,
    
    'public Color fill':   null,
    'public Color stroke': null,
    
    'public abstract number area':      null,
    'public abstract number perimeter': null
});

jTypes('Circle', jTypes.Shape, function(x, y, radius, fill, stroke)
{
    this.__base(x, y, fill, stroke);

    this.radius = radius;
},
{
    'public int radius': 0,

    'public override number area': function()
    {
        return Math.PI * this.radius * this.radius;
    },
    'public override number perimeter': function()
    {
        return 2 * Math.PI * this.radius;
    }
});

jTypes('Rectangle', jTypes.Shape, function(x, y, width, height, fill, stroke)
{
    this.__base(x, y, fill, stroke);

    this.width  = width;
    this.height = height;
},
{
    'public int width':  0,
    'public int height': 0,

    'public override number area': function()
    {
        return this.width * this.height;
    },
    'public override number perimeter': function()
    {
        return 2 * (this.width + this.height);
    }
});