// this is a straw-man proposal for jTypes factories

// RegExp template engines could be used with factories to automatically set access modifiers (/^_/ => PROTECTED, /^[^_$]/ => PUBLIC)
// Factories could be jTypes classes themselves so metaclass functionality can be derived and customized (useful for different development modes, error logging, ect.)
// These psuedo-compiled definitions could also be serialized in node.js and sent to the client to be deserialized (which allows the client to skip many compiler steps, and could be used for resource injections and unique class builds)

var MyFactory = jTypes.metaclass(
{
    'abstract'  : false,
    'base'      : null,
    'internal'  : false,
    'model'     : false,
    'optimized' : false,
    'primitive' : false,
    'sealed'    : false,
    'struct'    : false,
    'unlocked'  : false
});

// factory settings (could be passed into constructor as previously shown, which is useful for chaining)

MyFactory.abstract  = false;
MyFactory.base      = null;
MyFactory.internal  = false;
MyFactory.model     = false;
MyFactory.optimized = false;
MyFactory.primitive = false;
MyFactory.sealed    = false;
MyFactory.struct    = false;
MyFactory.unlocked  = false;

// factory methods (each is some kind of a shorthand for .define() and offers argument variations)

MyFactory.private('field',        'array', null)
         .private('anotherfield', 'int?',  0)
         .private('yetanotherfield',
         {
             'constraint' : 'string',
             'name'       : 'yetanotherfield',
             'readonly'   : true,
             'value'      : 'default'
         });

MyFactory.public('method', function()
{
    // ...
});

MyFactory.protected('anothermethod',
{
    'name'    : 'anothermethod',
    'value'   : function()
    {
        // ...
    },
    'virtual' : true
});

MyFactory.method('yetanothermethod', function()
{
    // ...
});

MyFactory.public('property',
{
    'name'     : 'property',
    'get'      : function()
    {
        // ...
    },
    'protected': 'set',
    'set'      : function()
    {
        // ...
    }
});

MyFactory.property('anotherproperty', function()
{
    // ...
},
function()
{
    // ...
});

var MyClass = MyFactory.compile();// only base class handle is resolved
var MyClass = MyFactory.build();  // all handles are resolved (class/model/struct constraints)

var myinstance = new MyClass();// instantiate class

// Factories could use dependency trees to serialize all classes referenced in the metadata (which can then be deserialized by the client)

var MyPackage = jTypes.serialize(MyFactory);  // node.js serializes (or jTypes.serialize() could serialize the global namespace or specific subnamespaces instead of just a factory)
var MyClass   = jTypes.deserialize(MyPackage);// then the client deserializes
