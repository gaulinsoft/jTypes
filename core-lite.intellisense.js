/*! ------------------------------------------------------------------------
//                             jTypes Lite 1.0.0
//  ------------------------------------------------------------------------
//
//                   Copyright 2013 Gaulinsoft Corporation
//
//       Licensed under the Apache License, Version 2.0 (the "License");
//      you may not use this file except in compliance with the License.
//                   You may obtain a copy of the License at
//
//                 http://www.apache.org/licenses/LICENSE-2.0
//
//     Unless required by applicable law or agreed to in writing, software
//      distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
//                       limitations under the License.
*/
window.Class    = function()
{
    return function()
    {
        return new Instance;
    };
};
window.Instance = function()
{
};
window.jTypes   = function()
{
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="constructor" type="Function">A constructor for the class.</param>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
    ///   <param name="constructor" type="Function">A constructor for the class.</param>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
    ///   <param name="constructor" type="Function">A constructor for the class.</param>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
    ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Compiles a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
    ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
    ///   <param name="constructor" type="Function">A constructor for the class.</param>
    ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
    ///   <returns type="Class">A compiled jTypes class.</returns>
    /// </signature>
};

Instance.prototype = (
{
    /// <field type="Instance">Provides a jTypes private instance access to the protected instance of its base class.</field>
    '__base': null,
    /// <field type="Instance">Provides a jTypes private instance access to the public instance.</field>
    '__this': null,
    /// <field type="Class">Provides a jTypes private instance access to the instance type.</field>
    '__type': null,

    'type': function()
    {
        /// <signature>
        ///   <summary>Gets the class type of a jTypes instance.</summary>
        ///   <returns type="Class">A jTypes class that is the runtime type of the instance.</returns>
        /// </signature>
    }
});

jTypes['asArray']          = function()
{
    /// <signature>
    ///   <summary>Converts an object or array-like object to an array.</summary>
    ///   <param name="object" type="Object">An object to convert to an array.</param>
    ///   <returns type="Array">An array copy of object if it is an array-like object; otherwise object converted to an array.</returns>
    /// </signature>
};
jTypes['asBool']           = function()
{
    /// <signature>
    ///   <summary>Converts an object to a boolean.</summary>
    ///   <param name="object" type="Object">An object to convert to a boolean.</param>
    ///   <returns type="Boolean">object if it is a boolean; otherwise its boolean equivalent.</returns>
    /// </signature>
};
jTypes['asFloat']          = function()
{
    /// <signature>
    ///   <summary>Converts an object to a floating-point number.</summary>
    ///   <param name="object" type="Object">An object to convert to a floating-point number.</param>
    ///   <returns type="Number">object if it is a number; otherwise its number equivalent.</returns>
    /// </signature>
};
jTypes['asInt']            = function()
{
    /// <signature>
    ///   <summary>Converts an object to an integer.</summary>
    ///   <param name="object" type="Object">An object to convert to an integer.</param>
    ///   <param name="finite" type="Boolean">A flag indicating whether or not to convert to a finite integer.</param>
    ///   <returns type="Number">object if it is an integer; otherwise its number equivalent rounded towards zero.</returns>
    /// </signature>
};
jTypes['asObject']         = function()
{
    /// <signature>
    ///   <summary>Converts a reference to an object.</summary>
    ///   <param name="reference" type="Object">A reference to convert to an object.</param>
    ///   <returns type="Object">object if it is neither null nor undefined; otherwise a simple object.</returns>
    /// </signature>
};
jTypes['asString']         = function()
{
    /// <signature>
    ///   <summary>Converts an object to a string.</summary>
    ///   <param name="object" type="Object">An object to convert to a string.</param>
    ///   <returns type="String">object if it is a string; otherwise its string equivalent.</returns>
    /// </signature>
};
jTypes['base']             = function()
{
    /// <signature>
    ///   <summary>Gets the base class of a jTypes class.</summary>
    ///   <param name="class" type="Class">A class to get the base class of.</param>
    ///   <returns type="Class">A jTypes class if class has a base class; otherwise null.</returns>
    /// </signature>
};
jTypes['empty']            = function()
{
    /// <signature>
    ///   <summary>Creates an empty function object.</summary>
    ///   <returns type="Function">A function object with an empty body and no arguments.</returns>
    /// </signature>
};
jTypes['format']           = function()
{
    /// <signature>
    ///   <summary>Creates a copy of a format string where format items are replaced by their respective string arguments.</summary>
    ///   <param name="format" type="String">A format string to be parsed.</param>
    ///   <param name="arg0" type="String" optional="true">A string argument to replace the format item at index zero.</param>
    ///   <param name="argN" type="String" parameterArray="true" optional="true">A string argument to replace the format item at index N.</param>
    ///   <returns type="String">A copy of format where each format item is replaced by a string argument at its corresponding index.</returns>
    /// </signature>
};
jTypes['isArray']          = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is an array using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is an array.</param>
    ///   <returns type="Boolean">true if object is an array; otherwise, false.</returns>
    /// </signature>
};
jTypes['isBoolean']        = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a boolean using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is a boolean.</param>
    ///   <returns type="Boolean">true if object is a boolean; otherwise, false.</returns>
    /// </signature>
};
jTypes['isClass']          = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a jTypes class.</summary>
    ///   <param name="object" type="Object">An object to test if it is a jTypes class.</param>
    ///   <returns type="Boolean">true if object is a jTypes class; otherwise, false.</returns>
    /// </signature>
};
jTypes['isDate']           = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a date using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is a date.</param>
    ///   <returns type="Boolean">true if object is a date; otherwise, false.</returns>
    /// </signature>
};
jTypes['isError']          = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is an error using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is an error.</param>
    ///   <returns type="Boolean">true if object is an error; otherwise, false.</returns>
    /// </signature>
};
jTypes['isFunction']       = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a function using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is a function.</param>
    ///   <returns type="Boolean">true if object is a function; otherwise, false.</returns>
    /// </signature>
};
jTypes['isInstance']       = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a jTypes instance.</summary>
    ///   <param name="object" type="Object">An object to test if it is a jTypes instance.</param>
    ///   <returns type="Boolean">true if object is a jTypes instance; otherwise, false.</returns>
    /// </signature>
};
jTypes['isNull']           = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not a reference is a null reference.</summary>
    ///   <param name="reference">A reference to test if it is a null reference.</param>
    ///   <returns type="Boolean">true if reference is a null reference; otherwise, false.</returns>
    /// </signature>
};
jTypes['isNumber']         = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a number using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is a number.</param>
    ///   <returns type="Boolean">true if object is a number; otherwise, false.</returns>
    /// </signature>
};
jTypes['isObject']         = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is an object.</summary>
    ///   <param name="object" type="Object">An object to test if it is an object.</param>
    ///   <returns type="Boolean">true if object is neither null nor undefined; otherwise, false.</returns>
    /// </signature>
};
jTypes['isObjectInstance'] = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is an object instance.</summary>
    ///   <param name="object" type="Object">An object to test if it is an object instance.</param>
    ///   <returns type="Boolean">true if object is an instance of Object; otherwise, false.</returns>
    /// </signature>
};
jTypes['isPrimitive']      = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a JavaScript primitive.</summary>
    ///   <param name="object" type="Object">An object to test if it is a JavaScript primitive.</param>
    ///   <returns type="Boolean">true if object is either null or has a typeof in the following collection: boolean, number, string, undefined; otherwise, false.</returns>
    /// </signature>
};
jTypes['isRegExp']         = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a regular expression using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is a regular expression.</param>
    ///   <returns type="Boolean">true if object is a regular expression; otherwise, false.</returns>
    /// </signature>
};
jTypes['isString']         = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a string using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to test if it is a string.</param>
    ///   <returns type="Boolean">true if object is a string; otherwise, false.</returns>
    /// </signature>
};
jTypes['isUndefined']      = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not a reference is an undefined reference.</summary>
    ///   <param name="reference">A reference to test if it is an undefined reference.</param>
    ///   <returns type="Boolean">true if reference is an undefined reference; otherwise, false.</returns>
    /// </signature>
};
jTypes['isWindow']         = function()
{
    /// <signature>
    ///   <summary>Indicates whether or not an object is a global window object.</summary>
    ///   <param name="object" type="Object">An object to test if it is a global window object.</param>
    ///   <returns type="Boolean">true if object is a global window object; otherwise, false.</returns>
    /// </signature>
};
jTypes['private']          = function()
{
    /// <signature>
    ///   <summary>Creates a private member definition for a jTypes class.</summary>
    ///   <param name="value" type="Object">A value for the private member.</param>
    ///   <returns type="Object">A private member definition package for a jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Creates a private member definition for a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the private member.</param>
    ///   <param name="value" type="Object">A value for the private member.</param>
    ///   <returns type="Object">A private member definition package for a jTypes class.</returns>
    /// </signature>
};
jTypes['protected']        = function()
{
    /// <signature>
    ///   <summary>Creates a protected member definition for a jTypes class.</summary>
    ///   <param name="value" type="Object">A value for the protected member.</param>
    ///   <returns type="Object">A protected member definition package for a jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Creates a protected member definition for a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the protected member.</param>
    ///   <param name="value" type="Object">A value for the protected member.</param>
    ///   <returns type="Object">A protected member definition package for a jTypes class.</returns>
    /// </signature>
};
jTypes['public']           = function()
{
    /// <signature>
    ///   <summary>Creates a public member definition for a jTypes class./summary>
    ///   <param name="value" type="Object">A value for the public member.</param>
    ///   <returns type="Object">A public member definition package for a jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Creates a public member definition for a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the public member.</param>
    ///   <param name="value" type="Object">A value for the public member.</param>
    ///   <returns type="Object">A public member definition package for a jTypes class.</returns>
    /// </signature>
};
jTypes['static']           = function()
{
    /// <signature>
    ///   <summary>Creates a static member definition for a jTypes class.</summary>
    ///   <param name="value" type="Object">A value for the static member.</param>
    ///   <returns type="Object">A static member definition package for a jTypes class.</returns>
    /// </signature>
    /// <signature>
    ///   <summary>Creates a static member definition for a jTypes class.</summary>
    ///   <param name="modifiers" type="String">A space-separated string of modifiers for the static member.</param>
    ///   <param name="value" type="Object">A value for the static member.</param>
    ///   <returns type="Object">A static member definition package for a jTypes class.</returns>
    /// </signature>
};
jTypes['type']             = function()
{
    /// <signature>
    ///   <summary>Determines the type of an object using the internal [[Class]] property of the object.</summary>
    ///   <param name="object" type="Object">An object to determine the type of.</param>
    ///   <returns type="String">A type string from the following collection of types: array, boolean, class, date, error, function, instance, null, number, object, regexp, string, undefined, window.</returns>
    /// </signature>
};

/// <field type="Function">Provides access to the base class of all jTypes classes.</field>
jTypes['__class'] = function(){};

/// <field type="Object">Provides access to the base prototype of all jTypes instances.</field>
jTypes['__proto'] = {};

/// <field type="Boolean">Indicates whether or not debugging is enabled.</field>
jTypes['debug'] = true;

/// <field type="Boolean">A number containing the maximum integer.</field>
jTypes['intMax'] = 9007199254740992;

/// <field type="Boolean">A number containing the minimum integer.</field>
jTypes['intMin'] = -9007199254740992;

/// <field type="Boolean">Indicates whether or not lazy-loading is enabled.</field>
jTypes['lazy'] = true;

/// <field type="String">A string containing the jTypes version number.</field>
jTypes['version'] = '';