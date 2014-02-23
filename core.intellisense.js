/*! ------------------------------------------------------------------------
//                                jTypes 2.2.0
//  ------------------------------------------------------------------------
//
//                   Copyright 2014 Gaulinsoft Corporation
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
(function(window, jTypes, undefined)
{
    // ########## CACHE ##########

    // Create the constructors object
    var $_constructors = Object.create(null);

    // Create the items objects
    var $_itemsConstruct = Object.create(null),
        $_itemsPrivate   = Object.create(null),
        $_itemsProtected = Object.create(null),
        $_itemsPublic    = Object.create(null),
        $_itemsStatic    = Object.create(null);

    // Create the context objects
    var $_thisConstruct = Object.create(null),
        $_thisPrivate   = Object.create(null),
        $_thisProtected = Object.create(null),
        $_thisPublic    = Object.create(null),
        $_thisStatic    = Object.create(null);

    // ########## HELPERS ##########

    // Create the characters string, base class of all classes, constraints object, hashes object, and base prototype of all prototypes
    var $_characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        $_class       = function(){},
        $_constraints = Object.create(null),
        $_hashes      = Object.create(null),
        $_prototype   = {};

    // Append the lowercase characters to the characters string
    $_characters += $_characters.toLowerCase();

    // Set the base prototype of all prototypes on the base class of all classes
    $_class.prototype = $_prototype;

    // Create the toString() functions
    var $_class_toString     = function()
    {
        // Return the class object string
        return '[object Class]';
    };
    var $_prototype_toString = function()
    {
        // Return the instance object string
        return '[object Instance]';
    };

    // Set the prototype toString() function
    $_prototype.toString = $_prototype_toString;

    // Create the helper functions
    var $_accessor  = function($object, $key, $get, $set, $enumerable, $configurable)
    {
        // Create the "accessor" descriptor
        var $descriptor = (
        {
            'configurable': !!$configurable,
            'enumerable':   !!$enumerable,
            'get':          $get || undefined,
            'set':          $set || undefined
        });

        // If no object was provided, return the descriptor
        if (!$object)
            return $descriptor;

        // Return the object with the defined "accessor" property
        return Object.defineProperty($object, $key, $descriptor);
    };
    var $_data      = function($object, $key, $value, $writable, $enumerable, $configurable)
    {
        // Create the "data" descriptor
        var $descriptor = (
        {
            'configurable': !!$configurable,
            'enumerable':   !!$enumerable,
            'value':        $value,
            'writable':     !!$writable
        });

        // If no object was provided, return the descriptor
        if (!$object)
            return $descriptor;

        // Return the object with the defined "data" property
        return Object.defineProperty($object, $key, $descriptor);
    };
    var $_filter    = function($item)
    {
        // Get the item name
        var $name = $item.name || '';

        // Return true if the name does not start with a symbol string prefix
        return $name && $name.substr(0, '$jT_'.length) != '$jT_';
    };
    var $_generator = function($length)
    {
        // If no length was provided, use a default length of three
        if (!$length)
            $length = 3;

        // Create the hash reference
        var $hash = null;

        do
        {
            // Reset the hash
            $hash = '';

            // Append random characters to the hash
            for (var $i = 0, $j = $_characters.length; $i < $length; $i++)
                $hash += $_characters[Math.floor($j * Math.random())];
        }
        // Continue if the hash was already found in the hashes object
        while ($_hashes[$hash]);

        // Set the hash in the hashes object
        $_hashes[$hash] = $hash;

        // Return the hash
        return $hash;
    };
    var $_item      = function($name, $kind, $value, $glyph, $parent, $scope, $comments)
    {
        // Return an item object
        return (
        {
            comments:     $comments || '',
            glyph:        $glyph ?
                          'vs:' + $glyph :
                          !$kind ?
                          'vs:GlyphGroupUnknown' :
                          '',
            kind:         $kind || 'reserved',
            name:         $name,
            parentObject: $parent || {},
            scope:        $scope || 'member',
            value:        $value
        });
    };
    var $_symbol    = function()
    {
        // If symbols are supported, return a symbol
        if (typeof Symbol == 'function')
            return Symbol();

        // Return an intellisense string symbol
        return '$jT_intellisense_' + $_generator(12);
    };

    // ---------- SYMBOLS ----------
    var $_symbol_base     = $_symbol(),
        $_symbol_class    = $_symbol(),
        $_symbol_instance = $_symbol(),
        $_symbol_items    = $_symbol(),
        $_symbol_keywords = $_symbol(),
        $_symbol_name     = $_symbol(),
        $_symbol_type     = $_symbol();

    // ########## WRAPPERS ##########

    // ---------- NAMESPACE ----------

    // Create the namespace wrapper function
    var $$ = function()
    {
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="definitions" type="Object">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class if the export modifier was not provided; otherwise string.</returns>
        /// </signature>
        
        // Create the initial arguments
        var $argument    = 0,
            $base        = null,
            $constructor = arguments[$argument++],
            $modifiers   = '',
            $prototype   = null;

        // If the constructor is not a simple object
        if ($constructor == null || typeof $constructor != 'object' || Object.getPrototypeOf($constructor) !== Object.prototype)
        {
            // Get the prototype
            $prototype = arguments[$argument++];

            // If the constructor is not a function
            if (typeof $constructor != 'function')
            {
                // If the constructor is not a string, return
                if (typeof $constructor != 'string')
                    return;

                // Use the first argument as the modifiers string
                $modifiers = $constructor;

                // If the prototype is a class
                if (typeof $prototype == 'function' && $prototype[$_symbol_class] === $prototype)
                {
                    // Use the second argument as the base class
                    $base        = $prototype;
                    $constructor = arguments[$argument++];
                }
                // Use the second argument as the constructor
                else
                    $constructor = $prototype;

                // If the constructor is not a function or is a class
                if (typeof $constructor != 'function' || $constructor[$_symbol_class] === $constructor)
                {
                    // Use the third argument as the prototype
                    $prototype   = $constructor;
                    $constructor = null;
                }
                // Use the fourth argument as the prototype
                else
                    $prototype = arguments[$argument++];
            }
            // If the constructor is a class
            else if ($constructor[$_symbol_class] === $constructor)
            {
                // Use the first argument as the base class
                $base = $constructor;

                // If the prototype is a function and not a class
                if (typeof $prototype == 'function' && !$prototype[$_symbol_class] !== $prototype)
                {
                    // Use the second argument as the constructor
                    $constructor = $prototype;
                    $prototype   = arguments[$argument++];
                }
                else
                    $constructor = null;
            }

            // If the prototype is not a simple object, return
            if ($prototype == null || typeof $prototype != 'object' || Object.getPrototypeOf($prototype) !== Object.prototype)
                return;
        }
        else
        {
            // Use the first argument as the prototype
            $prototype   = $constructor;
            $constructor = null;
        }

        // Create the class names and keywords array
        var $baseName  = '',
            $className = '',
            $keywords  = [];

        // If a modifiers string was provided
        if ($modifiers)
        {
            // Get the index of the extends character
            var $extends = $modifiers.indexOf(':');

            // If a base class was not provided and the modifiers string has the extends character
            if (!$base && $extends >= 0)
            {
                // Get the base class name and the modifiers string
                $baseName  = $modifiers.substr($extends + 1).trim();
                $modifiers = $modifiers.substr(0, $extends).trim();

                // If the base class name is a valid class name, get the base class from the static context object
                if (/^[A-Z][_a-zA-Z0-9]*$/.test($baseName))
                    $base = $_thisStatic[$baseName] || null;

                // If a base class was not found in the static context object, reset the base class name
                if (!$base)
                    $baseName = '';
            }

            // Get the keywords array
            $keywords = $modifiers.trim().split(' ');

            // If any keywords were provided and the last keyword is a class name, pop it from the keywords array
            if ($keywords.length && /^[A-Z][_a-zA-Z0-9]*$/.test($keywords[$keywords.length - 1]))
                $className = $keywords.pop();
        }

        // Create the class modifiers flags
        var $abstract  = $keywords.indexOf('abstract')  >= 0,
            $internal  = $keywords.indexOf('internal')  >= 0,
            $model     = $keywords.indexOf('model')     >= 0,
            $primitive = $keywords.indexOf('primitive') >= 0,
            $struct    = $keywords.indexOf('struct')    >= 0,
            $unlocked  = $keywords.indexOf('unlocked')  >= 0;

        // If a base class was provided
        if ($base)
        {
            // If a base class name was not found, get the base class name
            if (!$baseName)
                $baseName = $base[$_symbol_name];

            // If the class has the struct modifier or the base class has the sealed modifier
            if ($struct || $base[$_symbol_keywords].indexOf('sealed') >= 0)
            {
                // Reset the base class
                $base     = null;
                $baseName = '';
            }
        }

        // Create the class
        var $class = function()
        {
            // If the class is not abstract, return the public context
            if (!$abstract)
                return $thisPublic;

            // Return an empty object with a null prototype
            return Object.create(null);
        };

        // If a class name was provided, set the class in the global namespace wrapper
        if ($className)
            $_data($$, $className, $class);
        // Generate a random internal class name
        else
            $className = $_symbol();

        // If a constructor was provided, set it in the constructors object
        if ($constructor)
            $_constructors[$className] = $constructor;

        // Create the items arrays
        var $itemsConstruct = [],
            $itemsPrivate   = [],
            $itemsProtected = [],
            $itemsPublic    = [],
            $itemsStatic    = [];

        // Cache the items arrays
        $_itemsConstruct[$className] = $itemsConstruct;
        $_itemsPrivate  [$className] = $itemsPrivate;
        $_itemsProtected[$className] = $itemsProtected;
        $_itemsPublic   [$className] = $itemsPublic;
        $_itemsStatic   [$className] = $itemsStatic;

        // If a constructor was provided, redirect the class definition to the constructor
        if ($constructor)
            intellisense.redirectDefinition($class, $constructor);

        // Create the class prototype
        $class.prototype = Object.create($base ?
                                         $base.prototype :
                                         $_prototype);

        // If a class name was provided, create a custom toString() function for the prototype
        if ($className)
            $class.prototype.toString = function()
            {
                // Return the instance object string
                return '[object ' + $className + ']';
            };

        // Create the class type reference
        var $classType = !$internal ?
                         $class :
                         $base ?
                         $base[$_symbol_type] :
                         null;

        // Set the class type and hidden data on the class
        $_data($class, $_symbol_base,     $base);
        $_data($class, $_symbol_class,    $class);
        $_data($class, $_symbol_items,    $itemsStatic);
        $_data($class, $_symbol_keywords, $keywords);
        $_data($class, $_symbol_name,     $className);
        $_data($class, $_symbol_type,     $classType);

        // Create the construct, private, protected, and public contexts
        var $thisConstruct = Object.create($class.prototype),
            $thisPrivate   = Object.create($class.prototype),
            $thisProtected = Object.create($class.prototype),
            $thisPublic    = Object.create($class.prototype);

        // If a constructor was provided, redirect the constructor context to the construct context
        if ($constructor)
            intellisense.setCallContext($constructor, { 'thisArg': $thisConstruct });
        
        // Cache the context objects
        $_thisConstruct[$className] = $thisConstruct;
        $_thisPrivate  [$className] = $thisPrivate;
        $_thisProtected[$className] = $thisProtected;
        $_thisPublic   [$className] = $thisPublic;
        $_thisStatic   [$className] = $class;

        // Set the instance type, hidden items arrays, and class type on the contexts
        $_data($thisConstruct, $_symbol_instance, $thisConstruct);
        $_data($thisConstruct, $_symbol_items,    $itemsConstruct);
        $_data($thisConstruct, $_symbol_type,     $class);
        $_data($thisPrivate,   $_symbol_instance, $thisPrivate);
        $_data($thisPrivate,   $_symbol_items,    $itemsPrivate);
        $_data($thisPrivate,   $_symbol_type,     $class);
        $_data($thisProtected, $_symbol_instance, $thisProtected);
        $_data($thisProtected, $_symbol_items,    $itemsProtected);
        $_data($thisProtected, $_symbol_type,     $class);
        $_data($thisPublic,    $_symbol_instance, $thisPublic);
        $_data($thisPublic,    $_symbol_items,    $itemsPublic);
        $_data($thisPublic,    $_symbol_type,     $class);

        // Create the define helper functions
        var $define          = function($key, $value)
        {
            // Check if the definition is an auto property, create the keywords array, and get member name
            var $auto       = Array.isArray($value) && $value.length > 1,
                $constraint = undefined,
                $keywords   = $key.trim().split(' '),
                $name       = $keywords.pop(),
                $type       = 'field';
            
            // If the value is a function or the definition is abstract and the value is null, set the type as a method
            if (typeof $value == 'function' || $abstract && $keywords.indexOf('abstract') >= 0 && $value === null)
                $type = 'method';
            // If the definition an auto property or the value is a simple object, set the type as a property
            else if ($auto || $value != null && typeof $value == 'object' && Object.getPrototypeOf($value) === Object.prototype)
                $type = 'property';

            // Create the modifier flags
            var $private   = $keywords.indexOf('private')   >= 0,
                $protected = $keywords.indexOf('protected') >= 0,
                $prototype = $keywords.indexOf('prototype') >= 0,
                $public    = $keywords.indexOf('public')    >= 0,
                $static    = $keywords.indexOf('static')    >= 0;

            // If the definition is not a method and has either the prototype or static modifiers, set the type as a field
            if ($type != 'method' && ($prototype || $static))
                $type = 'field';
            
            // If any keywords were provided
            if ($keywords.length)
            {
                // Parse the last keyword as a constraint
                var $exec = /^(~|@)?([a-z]+(?:\-[a-z]+)?)(\?|\!)?$/.exec($keywords[$keywords.length - 1]);

                // If the last keyword did not match a constraint string
                if (!$exec)
                {
                    // Parse the last keyword as a class constraint
                    $exec = /^(@)?([A-Z][_a-zA-Z0-9]*)(\?|\!)?$/.exec($keywords[$keywords.length - 1]);

                    // If the last keyword matched a class constraint string, get the constraint from the public contexts object
                    if ($exec)
                        $constraint = $_thisPublic[$exec[2]];

                    // If a public context was found in the public contexts object
                    if ($constraint)
                    {
                        // Get the constraint keywords
                        var $constraintKeywords = $constraint[$_symbol_type][$_symbol_keywords];

                        // If the constraint string has the not-nullable modifier on a class that is not a model or the nullable modifier on a class that is not a struct or is not a struct on a primitive class, reset the constraint
                        if ($exec[3] == '!' && $constraintKeywords.indexOf('model') < 0 || $exec[3] == '?' && $constraintKeywords.indexOf('struct') < 0 || $primitive && $constraintKeywords.indexOf('struct') < 0)
                            $constraint = undefined;
                    }
                }
                // If the class is not primitive or the definition is a method or the constraint is a primitive constraint, get the constraint from the constraints object
                else if (!$primitive || $type == 'method' || 'bool boolean float int integer number string symbol'.indexOf($exec[2]) >= 0)
                    $constraint = $_constraints[$exec[2]];
                // Set the primitive constraint
                else
                    $constraint = $_constraints['primitive'];
            }

            // Create the masked value and descriptor
            var $mask       = $value,
                $descriptor = null;
            
            // If the definition is a property but not an auto property
            if (!$auto && $type == 'property')
            {
                // Set the masked value
                $mask = $constraint !== undefined ?
                        $constraint :
                        undefined;

                // Create the get accessor function
                var $get = null;

                // Loop through the keys in the property object
                for (var $key in $value)
                {
                    // Get the accessor type and function
                    var $accessor = $key.trim().split(' ').pop(),
                        $function = $value[$key];

                    // If the accessor type is neither a get nor set accessor or the accessor function is not a function or is a class, continue
                    if ($accessor != 'get' && $accessor != 'set' || typeof $function != 'function' || $function[$_symbol_class] === $function)
                        continue;

                    // If the accessor type is a get accessor, set the get accessor function
                    if ($accessor == 'get')
                        $get = $function;

                    // Set the accessor function call context
                    intellisense.setCallContext($function,
                    {
                        'thisArg': $thisPrivate,
                        'args':    $accessor == 'set' ?
                                   [$mask] :
                                   []
                    });
                }

                // If a get accessor function was provided and a constraint was not provided, create the masked property descriptor
                if ($get && $constraint === undefined)
                    $descriptor = $_accessor(null, null, function()
                    {
                        // Return the return value of calling the get accessor in the private context
                        return $get.call($thisPrivate);
                    });
            }
            // If the definition is a method
            else if ($type == 'method')
            {
                // If a constraint was provided, create the masked constraint function
                if ($constraint !== undefined)
                    $mask = function()
                    {
                        // Return the constraint
                        return $constraint;
                    };
                // If a function was provided, create the masked function
                else if ($value)
                    $mask = function()
                    {
                        // Return the return value of the applying the function in the private context with the provided arguments
                        return $value.apply($thisPrivate, arguments);
                    };
                // Create the empty masked function
                else
                    $mask = function(){};

                // If a function was provided
                if ($value)
                {
                    // Redirect the definition of the masked function to the provided function
                    intellisense.redirectDefinition($mask, $value);

                    // Set the function call context
                    intellisense.setCallContext($value,
                    {
                        'thisArg': $static ?
                                   $class :
                                   $prototype ?
                                   $thisPublic :
                                   $thisPrivate
                    });
                }
            }
            // If a constraint was provided, set the masked value as the constraint
            else if ($constraint !== undefined)
                $mask = $constraint;
            // If the definition is an auto property, set the masked value as the default value of the auto property
            else if ($auto)
                $mask = $value[2];

            // If the definition is not static
            if (!$static)
            {
                // If the definition is not for the prototype
                if (!$prototype)
                {
                    // If the definition is public, define the public definition
                    if ($public && !$private && !$protected)
                        $definePublic($name, $type, $mask, $descriptor);
                    // If the definition is protected, define the protected definition
                    else if ($protected && !$private && !$public)
                        $defineProtected($name, $type, $mask, $descriptor);
                    // If the definition is private, define the private definition
                    else if (!$protected && !$public)
                        $definePrivate($name, $type, $mask, $descriptor);
                }
                // Set the mask descriptor on the class prototype
                else
                    $_data($class.prototype, $name, $mask);
            }
            // If the definition is static
            else if (!$private && !$protected && !$public && !$prototype)
            {
                // Push the static item into the static items array
                $itemsStatic.push($_item($name, $type, $mask));

                // Set the mask descriptor on the static context
                $_data($class, $name, $mask);
            }
        };
        var $definePrivate   = function($name, $kind, $value, $descriptor, $glyph)
        {
            // Create the item
            var $item = $_item($name, $kind, $value, $glyph);

            // Push the item into the construct and private items arrays
            $itemsConstruct.push($item);
            $itemsPrivate  .push($item);

            // If no descriptor was provided, create a value descriptor
            if (!$descriptor)
                $descriptor = { 'value': $value };
            // Set the item descriptor
            else
                $item.descriptor = $descriptor;

            // Set the descriptor on the construct and private contexts
            Object.defineProperty($thisConstruct, $name, $descriptor);
            Object.defineProperty($thisPrivate,   $name, $descriptor);
        };
        var $defineProtected = function($name, $kind, $value, $descriptor, $glyph)
        {
            // Create the item
            var $item = $_item($name, $kind, $value, $glyph);

            // Push the item into the construct, private, and protected items arrays
            $itemsConstruct.push($item);
            $itemsPrivate  .push($item);
            $itemsProtected.push($item);

            // If no descriptor was provided, create a value descriptor
            if (!$descriptor)
                $descriptor = { 'value': $value };
            // Set the item descriptor
            else
                $item.descriptor = $descriptor;

            // Set the descriptor on the construct, private, and protected contexts
            Object.defineProperty($thisConstruct, $name, $descriptor);
            Object.defineProperty($thisPrivate,   $name, $descriptor);
            Object.defineProperty($thisProtected, $name, $descriptor);
        };
        var $definePublic    = function($name, $kind, $value, $descriptor, $glyph)
        {
            // Create the item
            var $item = $_item($name, $kind, $value, $glyph);

            // Push the item into the construct, private, protected, and public items arrays
            $itemsConstruct.push($item);
            $itemsPrivate  .push($item);
            $itemsProtected.push($item);
            $itemsPublic   .push($item);

            // If no descriptor was provided, create a value descriptor
            if (!$descriptor)
                $descriptor = { 'value': $value };
            // Set the item descriptor
            else
                $item.descriptor = $descriptor;

            // Set the descriptor on the construct, private, protected, and public contexts
            Object.defineProperty($thisConstruct, $name, $descriptor);
            Object.defineProperty($thisPrivate,   $name, $descriptor);
            Object.defineProperty($thisProtected, $name, $descriptor);
            Object.defineProperty($thisPublic,    $name, $descriptor);
        };

        // Create the self reference context
        var $self = Object.create($class.prototype);

        // Create the self reference functions
        var $as   = function($class)
        {
            /// <signature>
            ///   <summary>Casts a jTypes instance as an instance of a given class.</summary>
            ///   <param name="class" type="Class">A class to cast the instance to.</param>
            ///   <returns type="Instance">instance casted as class if it is an instance of class; otherwise null.</returns>
            /// </signature>

            // If the class is a class and the instance is an instance of the class, return the public instance of the class
            if ($class && $class[$_symbol_class] === $class && this && this[$_symbol_instance] === this && this instanceof $class)
                return $_thisPublic[$class[$_symbol_name]];

            return null;
        };
        var $is   = function($class)
        {
            /// <signature>
            ///   <summary>Checks if a jTypes instance is an instance of a given class.</summary>
            ///   <param name="class" type="Class">A class to check the instance against.</param>
            ///   <returns type="Boolean">true if instance is an instance of class; otherwise false.</returns>
            /// </signature>

            // Return true if the class is a class and the instance is an instance of the class
            return $class && $class[$_symbol_class] === $class && this && this[$_symbol_instance] === this && this instanceof $class;
        };
        var $type = function()
        {
            /// <signature>
            ///   <summary>Gets the class type of a jTypes instance.</summary>
            ///   <returns type="Class">A jTypes class that is the runtime type of the instance.</returns>
            /// </signature>

            // Return the class type reference
            return $classType;
        };

        // Set the instance and class types on the self reference context
        $_data($self, $_symbol_instance, $self);
        $_data($self, $_symbol_type,     $class);

        // Set the functions on the self reference context
        $_data($self, 'as',   $as);
        $_data($self, 'is',   $is);
        $_data($self, 'type', $type);

        // Get the glyph for the class type
        var $typeGlyph = $model ?
                         'GlyphGroupModule' :
                         $struct ?
                         'GlyphGroupStruct' :
                         'GlyphGroupClass';
        
        // Create the data, self reference, public, external, and internal items
        var $itemData     = $_item('__data', 'reserved', $thisPrivate),
            $itemSelf     = $_item('__self', 'reserved', $self),
            $itemThis     = $_item('__this', 'reserved', $thisPublic),
            $itemExternal = $_item('__type', 'reserved', !$internal ? $class : null, $typeGlyph),
            $itemInternal = $_item('__type', 'reserved', $class, $typeGlyph);

        // Push the data, external, internal, public, and self reference items into the items arrays
        $itemsConstruct.push($itemData);
        $itemsConstruct.push($itemSelf);
        $itemsConstruct.push($itemThis);
        $itemsConstruct.push($itemInternal);
        $itemsPrivate  .push($itemSelf);
        $itemsPrivate  .push($itemThis);
        $itemsPrivate  .push($itemInternal);
        $itemsPublic   .push($itemSelf);
        $itemsPublic   .push($itemExternal);

        // Create the data, external, internal, self reference, and public descriptors
        var $descriptorData     = { 'value': $itemData    .value },
            $descriptorExternal = { 'value': $itemExternal.value },
            $descriptorInternal = { 'value': $itemInternal.value },
            $descriptorSelf     = { 'value': $itemSelf    .value },
            $descriptorThis     = { 'value': $itemThis    .value };

        // Set the self reference, public, internal, and external descriptors on the contexts
        Object.defineProperty($thisConstruct, '__data', $descriptorData);
        Object.defineProperty($thisConstruct, '__self', $descriptorSelf);
        Object.defineProperty($thisPrivate,   '__self', $descriptorSelf);
        Object.defineProperty($thisPublic,    '__self', $descriptorSelf);
        Object.defineProperty($thisConstruct, '__this', $descriptorThis);
        Object.defineProperty($thisPrivate,   '__this', $descriptorThis);
        Object.defineProperty($thisPublic,    '__this', $descriptorThis);
        Object.defineProperty($thisConstruct, '__type', $descriptorInternal);
        Object.defineProperty($thisPrivate,   '__type', $descriptorInternal);
        Object.defineProperty($thisPublic,    '__type', $descriptorExternal);

        // If the class is unlocked
        if ($unlocked)
        {
            // Push the internal, public, and self reference items into the protected items array
            $itemsProtected.push($itemSelf);
            $itemsProtected.push($itemThis);
            $itemsProtected.push($itemInternal);

            // Set the self reference, public, and internal descriptors on the protected context object
            Object.defineProperty($thisProtected, '__self', $descriptorSelf);
            Object.defineProperty($thisProtected, '__this', $descriptorThis);
            Object.defineProperty($thisProtected, '__type', $descriptorInternal);
        }
        
        // If a base class was provided
        if ($base)
        {
            // Get the base constructor and base protected context
            var $baseConstructor   = $_constructors [$baseName],
                $baseThisProtected = $_thisProtected[$baseName];

            // If a constructor was not provided, set the base constructor in the constructors object
            if (!$constructor)
                $_constructors[$className] = $baseConstructor || null;

            // Create the base constructor wrapper reference
            var $baseConstructorWrapper = null;

            // If a base constructor was provided
            if ($baseConstructor)
            {
                // Create the base constructor wrapper
                $baseConstructorWrapper = function()
                {
                    // Return the return value of applying the base constructor in the base construct context with the provided arguments
                    return $baseConstructor.apply($_thisConstruct[$baseName], arguments);
                };

                // Redirect the base constructor wrapper definition to the base constructor
                intellisense.redirectDefinition($baseConstructorWrapper, $baseConstructor);
            }

            // Create the constructor and protected items
            var $itemConstructor = $_item('__base', 'reserved', $baseConstructorWrapper, $typeGlyph),
                $itemProtected   = $_item('__base', 'reserved', $baseThisProtected);

            // Push the constructor and protected items into the items arrays
            $itemsConstruct.push($itemConstructor);
            $itemsPrivate  .push($itemProtected);

            // Create the constructor and protected descriptors
            var $descriptorConstructor = { 'value': $itemConstructor.value },
                $descriptorProtected   = { 'value': $itemProtected  .value };

            // Set the constructor and protected descriptors on the contexts
            Object.defineProperty($thisConstruct, '__base', $descriptorConstructor);
            Object.defineProperty($thisPrivate,   '__base', $descriptorProtected);

            // If the class is unlocked
            if ($unlocked)
            {
                // Push the protected items into the protected items array
                $itemsProtected.push($itemProtected);

                // Set the protected descriptor on the protected context object
                Object.defineProperty($thisProtected, '__base', $descriptorProtected);
            }
        }
        // If a constructor was not provided, set a null reference in the constructors object
        else if (!$constructor)
            $_constructors[$className] = null;
        
        // Define the self reference functions
        $definePublic('as',   'method', $as);
        $definePublic('is',   'method', $is);
        $definePublic('type', 'method', $type);

        // If the class has the primitive modifier
        if ($primitive)
        {
            // Create the primitive self reference functions
            var $clone  = function()
            {
                /// <signature>
                ///   <summary>Creates a copy of a jTypes instance.</summary>
                ///   <returns type="Instance">A copy of instance if it is an instance of a jTypes class compiled with the primitive modifier; otherwise null.</returns>
                /// </signature>

                // Return the public context
                return $thisPublic;
            };
            var $equals = function($instance)
            {
                /// <signature>
                ///   <summary>Checks if two primitive jTypes instances are equal.</summary>
                ///   <param name="instance" type="Instance">An instance to compare against.</param>
                ///   <returns type="Boolean">true if instance is equal to the provided instance; otherwise false.</returns>
                /// </signature>
                
                return false;
            };

            // Define the primitive self reference functions
            $definePublic('clone',  'method', $clone);
            $definePublic('equals', 'method', $equals);

            // Set the primitive functions on the self reference context
            $_data($self, 'clone',  function()
            {
                /// <signature>
                ///   <summary>Creates a copy of a jTypes instance.</summary>
                ///   <returns type="Instance">A copy of instance if it is an instance of a jTypes class compiled with the primitive modifier; otherwise null.</returns>
                /// </signature>

                // Return the self reference context
                return $self;
            });
            $_data($self, 'equals', $equals);
        }
        
        // If the argument count does not match the number of arguments
        if (arguments.length != $argument)
        {
            // If the next argument is not an array
            if (!Array.isArray(arguments[$argument]))
            {
                // Set the private prototype and get the protected and public prototypes
                var $prototypePrivate   = $prototype,
                    $prototypeProtected = arguments[$argument++],
                    $prototypePublic    = arguments[$argument++];

                // If neither the protected nor public prototypes are simple objects, return
                if ($prototypeProtected == null || typeof $prototypeProtected != 'object' || Object.getPrototypeOf($prototypeProtected) !== Object.prototype || $prototypePublic == null || typeof $prototypePublic != 'object' || Object.getPrototypeOf($prototypePublic) !== Object.prototype)
                    return;

                // Get the prototype
                $prototype = arguments[$argument];
                
                // If the prototype is a simple object, increment the argument count
                if ($prototype != null && typeof $prototype == 'object' && Object.getPrototypeOf($prototype) === Object.prototype)
                    $argument++;
                // Reset the prototype
                else
                    $prototype = null;

                // If the argument count does not match the number of arguments, return
                if (arguments.length != $argument)
                    return;

                // Define the private definitions
                for (var $key in $prototypePrivate)
                    $define('private ' + $key, $prototypePrivate[$key]);

                // Define the protected definitions
                for (var $key in $prototypeProtected)
                    $define('protected ' + $key, $prototypeProtected[$key]);

                // Define the public definitions
                for (var $key in $prototypePublic)
                    $define('public ' + $key, $prototypePublic[$key]);
            }
        }

        // If a prototype was provided, compile the definitions into the cache
        if ($prototype)
            for (var $key in $prototype)
                $define($key, $prototype[$key]);

        // If the a static toString() function was not provided, set the toString() function in the class
        if ($class.toString === Function.prototype.toString)
            $class.toString = $_class_toString;

        // If a base class was provided
        if ($base)
        {
            // Get the inherited items
            var $inheritProtected = $_itemsProtected[$baseName],
                $inheritPublic    = $_itemsPublic   [$baseName];
            
            // Loop through the protected inherited items
            for (var $i = 0, $j = $inheritProtected.length; $i < $j; $i++)
            {
                // Get the inherited protected item and its name
                var $item     = $inheritProtected[$i],
                    $itemName = $itemCurrent.name;

                // If the inherited protected item is already defined, continue
                if (Object.prototype.hasOwnProperty.call($thisProtected, $itemName))
                    continue;

                // Define the inherited protected definition
                $defineProtected($itemName, $item.kind, $item.value, $item.descriptor);
            }

            // Loop through the public inherited items
            for (var $i = 0, $j = $inheritPublic.length; $i < $j; $i++)
            {
                // Get the inherited public item and its name
                var $item     = $inheritPublic[$i],
                    $itemName = $item.name;

                // If the name is reserved, continue
                if ($itemName == 'as' || ($model || $struct) && ($itemName == 'clone' || $itemName == 'equals') || $itemName == 'is' || $itemName == 'type' || $itemName == '__base' || $itemName == '__data' || $itemName == '__self' || $itemName == '__this' || $itemName == '__type')
                    continue;

                // If the inherited public item is already defined, continue
                if (Object.prototype.hasOwnProperty.call($thisPublic, $itemName))
                    continue;

                // Define the inherited public definition
                $definePublic($itemName, $item.kind, $item.value, $item.descriptor);
            }
        }

        // Return the class
        return $class;
    };

    // ---------- EXPORTS ----------

    // Define the exported constants
    $$.version  = jTypes.version;
    $$.__class  = $_class;
    $$.__proto  = $_prototype;
    $$.dateMax  = jTypes.dateMax;
    $$.dateMin  = jTypes.dateMin;
    $$.epsilon  = jTypes.epsilon;
    $$.intMax   = jTypes.intMax;
    $$.intMin   = jTypes.intMin;
    $$.max      = jTypes.max;
    $$.min      = jTypes.min;
    $$.support  = jTypes.support;
    $$.toString = jTypes.toString;

    // Annotate the exported constants
    intellisense.annotate($$,
    {
        /// <field type="Function">Provides access to the base class of all jTypes classes.</field>
        '__class': $_class,
        /// <field type="Object">Provides access to the base prototype of all jTypes instances.</field>
        '__proto': $_prototype,
        /// <field type="Date">The maximum representable date in JavaScript.</field>
        'dateMax': jTypes.dateMax,
        /// <field type="Date">The minimum representable date in JavaScript.</field>
        'dateMin': jTypes.dateMin,
        /// <field type="Number">The smallest representable interval between two distinguishable numbers in JavaScript.</field>
        'epsilon': jTypes.epsilon,
        /// <field type="Number">The maximum representable integer in JavaScript.</field>
        'intMax': jTypes.intMax,
        /// <field type="Number">The minimum representable integer in JavaScript.</field>
        'intMin': jTypes.intMin,
        /// <field type="Number">The maximum representable floating-point number in JavaScript.</field>
        'max': jTypes.max,
        /// <field type="Number">The minimum representable floating-point number in JavaScript.</field>
        'min': jTypes.min,
        /// <field type="Object">An object containing flags indicating which JavaScript features are supported.</field>
        'support': jTypes.support,
        /// <field type="String">A string containing the jTypes version number.</field>
        'version': jTypes.version
    });

    // ---------- TYPES ----------

    $$.isArray     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an array using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an array.</param>
        ///   <returns type="Boolean">true if object is an array; otherwise, false.</returns>
        /// </signature>

        return jTypes.isArray.apply(jTypes, arguments);
    };
    $$.isBool      = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a boolean using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a boolean.</param>
        ///   <returns type="Boolean">true if object is a boolean; otherwise, false.</returns>
        /// </signature>

        return jTypes.isBool.apply(jTypes, arguments);
    };
    $$.isBoolean   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a boolean using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a boolean.</param>
        ///   <returns type="Boolean">true if object is a boolean; otherwise, false.</returns>
        /// </signature>

        return jTypes.isBoolean.apply(jTypes, arguments);
    };
    $$.isClass     = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class
        return $object && $object[$_symbol_class] === $object;
    };
    $$.isDate      = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a date using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a date.</param>
        ///   <returns type="Boolean">true if object is a date; otherwise, false.</returns>
        /// </signature>

        return jTypes.isDate.apply(jTypes, arguments);
    };
    $$.isError     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an error using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an error.</param>
        ///   <returns type="Boolean">true if object is an error; otherwise, false.</returns>
        /// </signature>

        return jTypes.isError.apply(jTypes, arguments);
    };
    $$.isFinite    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a finite value.</summary>
        ///   <param name="value" type="Number">A value to test if it is finite.</param>
        ///   <returns type="Boolean">true if value is a finite number; otherwise, false.</returns>
        /// </signature>

        return jTypes.isFinite.apply(jTypes, arguments);
    };
    $$.isFloat     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a number using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a number.</param>
        ///   <returns type="Boolean">true if object is a number; otherwise, false.</returns>
        /// </signature>

        return jTypes.isFloat.apply(jTypes, arguments);
    };
    $$.isFunction  = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a function using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a function.</param>
        ///   <returns type="Boolean">true if object is a function; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a function and not a class
        return typeof $object == 'function' && $object[$_symbol_class] !== $object;
    };
    $$.isInstance  = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes instance.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes instance.</param>
        ///   <returns type="Boolean">true if object is a jTypes instance; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is an instance
        return $object && $object[$_symbol_instance] === $object;
    };
    $$.isInt       = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an integer value.</summary>
        ///   <param name="value" type="Number">A value to test if it is an integer.</param>
        ///   <returns type="Boolean">true if value is a finite number that is a representable integer in JavaScript; otherwise, false.</returns>
        /// </signature>

        return jTypes.isInt.apply(jTypes, arguments);
    };
    $$.isInteger   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an integer value.</summary>
        ///   <param name="value" type="Number">A value to test if it is an integer.</param>
        ///   <returns type="Boolean">true if value is a finite number that is a representable integer in JavaScript; otherwise, false.</returns>
        /// </signature>

        return jTypes.isInteger.apply(jTypes, arguments);
    };
    $$.isNumber    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a number using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a number.</param>
        ///   <returns type="Boolean">true if object is a number; otherwise, false.</returns>
        /// </signature>

        return jTypes.isNumber.apply(jTypes, arguments);
    };
    $$.isPrimitive = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a JavaScript primitive.</summary>
        ///   <param name="object" type="Object">An object to test if it is a JavaScript primitive.</param>
        ///   <returns type="Boolean">true if object is either null or has a typeof in the following collection: boolean, number, string, undefined; otherwise, false.</returns>
        /// </signature>

        return jTypes.isPrimitive.apply(jTypes, arguments);
    };
    $$.isRegExp    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a regular expression using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a regular expression.</param>
        ///   <returns type="Boolean">true if object is a regular expression; otherwise, false.</returns>
        /// </signature>

        return jTypes.isRegExp.apply(jTypes, arguments);
    };
    $$.isString    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a string using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a string.</param>
        ///   <returns type="Boolean">true if object is a string; otherwise, false.</returns>
        /// </signature>

        return jTypes.isString.apply(jTypes, arguments);
    };
    $$.isSymbol    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a symbol using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a symbol.</param>
        ///   <returns type="Boolean">true if object is a symbol; otherwise, false.</returns>
        /// </signature>

        return jTypes.isSymbol.apply(jTypes, arguments);
    };

    $$.box   = function()
    {
        /// <signature>
        ///   <summary>Ensures primitive values are wrapped as objects.</summary>
        ///   <param name="object" type="Object">A primitive value to be wrapped as an object.</param>
        ///   <returns type="Object">object wrapped as an object if it is a primitive value; otherwise object</returns>
        /// </signature>

        return jTypes.box.apply(jTypes, arguments);
    };
    $$.type  = function($object)
    {
        /// <signature>
        ///   <summary>Determines the type of an object using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to determine the type of.</param>
        ///   <returns type="String">A type string from the following collection of types: array, boolean, class, date, error, function, instance, null, number, object, regexp, string, symbol, undefined, window.</returns>
        /// </signature>

        // If the object is a class, return the "class" string
        if ($object && $$.isClass($object))
            return 'class';

        // If the object is an instance, return the "instance" string
        if ($object && $$.isClass($object))
            return 'instance';

        // Return the type string of the object
        return jTypes.type($object);
    };
    $$.unbox = function()
    {
        /// <signature>
        ///   <summary>Ensures primitive values are not wrapped as objects.</summary>
        ///   <param name="object" type="Object">A object to get the primitive value of.</param>
        ///   <returns type="Object">The primitive value of object if it is a primitive value wrapped as an object, otherwise object</returns>
        /// </signature>

        return jTypes.unbox.apply(jTypes, arguments);
    };

    // ---------- CASTS ----------

    $$.asArray   = function()
    {
        /// <signature>
        ///   <summary>Converts an object or array-like object to an array.</summary>
        ///   <param name="object" type="Object">An object to convert to an array.</param>
        ///   <returns type="Array">An array copy of object if it is an array-like object; otherwise object converted to an array.</returns>
        /// </signature>

        return jTypes.asArray.apply(jTypes, arguments);
    };
    $$.asBool    = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a boolean.</summary>
        ///   <param name="object" type="Object">An object to convert to a boolean.</param>
        ///   <returns type="Boolean">object if it is a boolean; otherwise its boolean equivalent.</returns>
        /// </signature>

        return jTypes.asBool.apply(jTypes, arguments);
    };
    $$.asBoolean = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a boolean.</summary>
        ///   <param name="object" type="Object">An object to convert to a boolean.</param>
        ///   <returns type="Boolean">object if it is a boolean; otherwise its boolean equivalent.</returns>
        /// </signature>

        return jTypes.asBoolean.apply(jTypes, arguments);
    };
    $$.asDate    = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a date object.</summary>
        ///   <param name="object" type="Object">An object to convert to a date.</param>
        ///   <returns type="Number">object if it is a date; otherwise its date equivalent.</returns>
        /// </signature>

        return jTypes.asDate.apply(jTypes, arguments);
    };
    $$.asFloat   = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a floating-point number.</summary>
        ///   <param name="object" type="Object">An object to convert to a floating-point number.</param>
        ///   <param name="finite" type="Boolean">A flag indicating whether or not to force a finite cast.</param>
        ///   <returns type="Number">object if it is a number; otherwise its number equivalent.</returns>
        /// </signature>

        return jTypes.asFloat.apply(jTypes, arguments);
    };
    $$.asInt     = function()
    {
        /// <signature>
        ///   <summary>Converts an object to an integer.</summary>
        ///   <param name="object" type="Object">An object to convert to an integer.</param>
        ///   <param name="finite" type="Boolean">A flag indicating whether or not to force a finite cast.</param>
        ///   <returns type="Number">object if it is an integer; otherwise its number equivalent rounded towards zero.</returns>
        /// </signature>

        return jTypes.asInt.apply(jTypes, arguments);
    };
    $$.asInteger = function()
    {
        /// <signature>
        ///   <summary>Converts an object to an integer.</summary>
        ///   <param name="object" type="Object">An object to convert to an integer.</param>
        ///   <param name="finite" type="Boolean">A flag indicating whether or not to force a finite cast.</param>
        ///   <returns type="Number">object if it is an integer; otherwise its number equivalent rounded towards zero.</returns>
        /// </signature>

        return jTypes.asInteger.apply(jTypes, arguments);
    };
    $$.asNumber  = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a floating-point number.</summary>
        ///   <param name="object" type="Object">An object to convert to a floating-point number.</param>
        ///   <param name="finite" type="Boolean">A flag indicating whether or not to force a finite cast.</param>
        ///   <returns type="Number">object if it is a number; otherwise its number equivalent.</returns>
        /// </signature>

        return jTypes.asNumber.apply(jTypes, arguments);
    };
    $$.asObject  = function()
    {
        /// <signature>
        ///   <summary>Converts a reference to an object.</summary>
        ///   <param name="reference" type="Object">A reference to convert to an object.</param>
        ///   <returns type="Object">object if it is neither null nor undefined; otherwise a simple object.</returns>
        /// </signature>

        return jTypes.asObject.apply(jTypes, arguments);
    };
    $$.asRegExp  = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a regular expression object.</summary>
        ///   <param name="object" type="Object">An object to convert to a regular expression.</param>
        ///   <returns type="Number">object if it is a regular expression; otherwise its regular expression equivalent.</returns>
        /// </signature>

        return jTypes.asRegExp.apply(jTypes, arguments);
    };
    $$.asString  = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a string.</summary>
        ///   <param name="object" type="Object">An object to convert to a string.</param>
        ///   <returns type="String">object if it is a string; otherwise its string equivalent.</returns>
        /// </signature>

        return jTypes.asString.apply(jTypes, arguments);
    };

    // ---------- CHECKS ----------

    $$.isAbstractClass    = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes abstract class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes abstract class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the abstract modifier; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class and the abstract keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('abstract') >= 0;
    };
    $$.isArgumentsObject  = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an arguments object passed to a function.</summary>
        ///   <param name="object" type="Object">An object to test if it is an arguments object passed to a function.</param>
        ///   <returns type="Boolean">true if object is an arguments object passed to a function; otherwise, false.</returns>
        /// </signature>

        return jTypes.isArgumentsObject.apply(jTypes, arguments);
    };
    $$.isArrayLikeObject  = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an array-like object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an array-like object.</param>
        ///   <returns type="Boolean">true if object has a length property that is a finite integer greater than or equal to zero; otherwise, false.</returns>
        /// </signature>

        return jTypes.isArrayLikeObject.apply(jTypes, arguments);
    };
    $$.isCallableType     = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "callable-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "callable-type" object.</param>
        ///   <returns type="Boolean">true if object is a type of either class or function; otherwise, false.</returns>
        /// </signature>

        // If the object is a class, return true
        if ($$.isClass($object))
            return true;

        return jTypes.isCallableType.apply(jTypes, arguments);
    };
    $$.isComplexObject    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a complex object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a complex object.</param>
        ///   <returns type="Boolean">true if object is an object and does not have Object.prototype as its prototype; otherwise, false.</returns>
        /// </signature>

        return jTypes.isComplexObject.apply(jTypes, arguments);
    };
    $$.isFlatObject       = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a flat object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a flat object.</param>
        ///   <returns type="Boolean">true if object is an object and has a null prototype; otherwise, false.</returns>
        /// </signature>

        return jTypes.isFlatObject.apply(jTypes, arguments);
    };
    $$.isImportedClass    = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes imported class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes imported class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class that was compiled using a precompiled modifiers string; otherwise, false.</returns>
        /// </signature>

        return false;
    };
    $$.isInternalClass    = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes internal class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes internal class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the internal modifier; otherwise, false./returns>
        /// </signature>

        // Return true if the object is a class and the internal keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('internal') >= 0;
    };
    $$.isInfinity         = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an infinite value.</summary>
        ///   <param name="value" type="Number">A value to test if it is infinite.</param>
        ///   <returns type="Boolean">true if value is an infinite number; otherwise, false.</returns>
        /// </signature>

        return jTypes.isInfinity.apply(jTypes, arguments);
    };
    $$.isModel            = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes model.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes model.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the model modifier; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class and the model keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('model') >= 0;
    };
    $$.isNaN              = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an undefined value.</summary>
        ///   <param name="value" type="Number">A value to test if it is an undefined value.</param>
        ///   <returns type="Boolean">true if value is not-a-number; otherwise, false.</returns>
        /// </signature>

        return jTypes.isNaN.apply(jTypes, arguments);
    };
    $$.isNegativeInfinity = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a value of negative infinity.</summary>
        ///   <param name="value" type="Number">A value to test if it is negative infinity.</param>
        ///   <returns type="Boolean">true if value is negative infinity; otherwise, false.</returns>
        /// </signature>

        return jTypes.isNegativeInfinity.apply(jTypes, arguments);
    };
    $$.isNull             = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is a null reference.</summary>
        ///   <param name="reference">A reference to test if it is a null reference.</param>
        ///   <returns type="Boolean">true if reference is a null reference; otherwise, false.</returns>
        /// </signature>

        return jTypes.isNull.apply(jTypes, arguments);
    };
    $$.isObject           = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is an object.</summary>
        ///   <param name="reference" type="Object">A reference to test if it is an object.</param>
        ///   <returns type="Boolean">true if reference is neither null nor undefined; otherwise, false.</returns>
        /// </signature>

        return jTypes.isObject.apply(jTypes, arguments);
    };
    $$.isObjectInstance   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an object instance.</summary>
        ///   <param name="object" type="Object">An object to test if it is an object instance.</param>
        ///   <returns type="Boolean">true if object is an instance of Object; otherwise, false.</returns>
        /// </signature>

        return jTypes.isObjectInstance.apply(jTypes, arguments);
    };
    $$.isOptimizedClass   = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes optimized class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes optimized class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the optimized modifier; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class and the optimized keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('optimized') >= 0;
    };
    $$.isPrimitiveClass   = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes primitive class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes primitive class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the primitive modifier; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class and the primitive keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('primitive') >= 0;
    };
    $$.isPositiveInfinity = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a value of positive infinity.</summary>
        ///   <param name="value" type="Number">A value to test if it is positive infinity.</param>
        ///   <returns type="Boolean">true if value is positive infinity; otherwise, false.</returns>
        /// </signature>

        return jTypes.isPositiveInfinity.apply(jTypes, arguments);
    };
    $$.isPrimitiveType    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "primitive-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "primitive-type" object.</param>
        ///   <returns type="Boolean">true if object is a type from the following collection: boolean, null, number, string, undefined; otherwise, false.</returns>
        /// </signature>

        return jTypes.isPrimitiveType.apply(jTypes, arguments);
    };
    $$.isReferenceType    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "reference-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "reference-type" object.</param>
        ///   <returns type="Boolean">true if object is not a type from the following collection: boolean, null, number, string, undefined; otherwise, false.</returns>
        /// </signature>

        return jTypes.isReferenceType.apply(jTypes, arguments);
    };
    $$.isSealedClass      = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes sealed class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes sealed class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the sealed modifier; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class and the sealed keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('sealed') >= 0;
    };
    $$.isSimpleObject     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a simple object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a simple object.</param>
        ///   <returns type="Boolean">true if object is an object and has Object.prototype as its prototype; otherwise, false.</returns>
        /// </signature>

        return jTypes.isSimpleObject.apply(jTypes, arguments);
    };
    $$.isStruct           = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes struct.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes struct.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the struct modifier; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class and the struct keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('struct') >= 0;
    };
    $$.isUndefined        = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is an undefined reference.</summary>
        ///   <param name="reference">A reference to test if it is an undefined reference.</param>
        ///   <returns type="Boolean">true if reference is an undefined reference; otherwise, false.</returns>
        /// </signature>

        return jTypes.isUndefined.apply(jTypes, arguments);
    };
    $$.isUnlockedClass    = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes unlocked class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes unlocked class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the unlocked modifier; otherwise, false.</returns>
        /// </signature>

        // Return true if the object is a class and the unlocked keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('unlocked') >= 0;
    };
    $$.isValueType        = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "value-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "value-type" object.</param>
        ///   <returns type="Boolean">true if object is a type from the following collection: boolean, number, string; otherwise, false.</returns>
        /// </signature>

        return jTypes.isValueType.apply(jTypes, arguments);
    };
    $$.isWindow           = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a global window object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a global window object.</param>
        ///   <returns type="Boolean">true if object is a global window object; otherwise, false.</returns>
        /// </signature>

        return jTypes.isWindow.apply(jTypes, arguments);
    };
    $$.isWindowLikeObject = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a window-like object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a window-like object.</param>
        ///   <returns type="Boolean">true if object has a window property that is a self reference; otherwise, false.</returns>
        /// </signature>

        return jTypes.isWindowLikeObject.apply(jTypes, arguments);
    };

    // ---------- HELPERS ----------
    
    $$.accessor = function()
    {
        /// <signature>
        ///   <summary>Defines a non-configurable "accessor" property on an object.</summary>
        ///   <param name="object" type="Object">An object to define the property on.</param>
        ///   <param name="name" type="String">The name of the property.</param>
        ///   <param name="get" type="Function">The get accessor of the property.</param>
        ///   <param name="set" type="Function">The set accessor of the property.</param>
        ///   <param name="enumerable" type="Boolean" optional="true">A flag indicating whether or not the property is enumerable.</param>
        ///   <returns type="Object">The object with which the property was defined on.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Defines an "accessor" property on an object.</summary>
        ///   <param name="object" type="Object">An object to define the property on.</param>
        ///   <param name="name" type="String">The name of the property.</param>
        ///   <param name="get" type="Function">The get accessor of the property.</param>
        ///   <param name="set" type="Function">The set accessor of the property.</param>
        ///   <param name="enumerable" type="Boolean">A flag indicating whether or not the property is enumerable.</param>
        ///   <param name="configurable" type="Boolean" optional="true">A flag indicating whether or not the property is configurable.</param>
        ///   <returns type="Object">The object with which the property was defined on.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Defines an "accessor" property on an object.</summary>
        ///   <param name="object" type="Object">An object to define the property on.</param>
        ///   <param name="name" type="String">The name of the property.</param>
        ///   <param name="get" type="Function">The get accessor of the property.</param>
        ///   <param name="set" type="Function">The set accessor of the property.</param>
        ///   <param name="enumerable" type="Boolean">A flag indicating whether or not the property is enumerable.</param>
        ///   <param name="configurable" type="Boolean">A flag indicating whether or not the property is configurable.</param>
        ///   <param name="constraint" type="String" optional="true">A type constraint for the property.</param>
        ///   <returns type="Object">The object with which the property was defined on.</returns>
        /// </signature>

        return jTypes.accessor.apply(jTypes, arguments);
    };
    $$.base     = function($class)
    {
        /// <signature>
        ///   <summary>Gets the base class of a jTypes class.</summary>
        ///   <param name="class" type="Class">A class to get the base class of.</param>
        ///   <returns type="Class">A jTypes class if class has a base class; otherwise null.</returns>
        /// </signature>

        // If the class is not a class, return null
        if (!$$.isClass($class))
            return null;

        // Return the base class of the class
        return $class[$_symbol_base];
    };
    $$.data     = function()
    {
        /// <signature>
        ///   <summary>Defines a "data" property on an object.</summary>
        ///   <param name="object" type="Object">An object to define the property on.</param>
        ///   <param name="name" type="String">The name of the property.</param>
        ///   <param name="value">The value of the property.</param>
        ///   <param name="writable" type="Boolean" optional="true">A flag indicating whether or not the property is writable.</param>
        ///   <param name="enumerable" type="Boolean" optional="true">A flag indicating whether or not the property is enumerable.</param>
        ///   <param name="configurable" type="Boolean" optional="true">A flag indicating whether or not the property is configurable.</param>
        ///   <returns type="Object">The object with which the property was defined on.</returns>
        /// </signature>

        return jTypes.data.apply(jTypes, arguments);
    };
    $$.empty    = function()
    {
        /// <signature>
        ///   <summary>Creates an empty function object.</summary>
        ///   <returns type="Function">A function object with an empty body and no arguments.</returns>
        /// </signature>

        return jTypes.empty.apply(jTypes, arguments);
    };
    $$.escape   = function()
    {
        /// <signature>
        ///   <summary>Escapes a regular expression pattern string.</summary>
        ///   <param name="pattern" type="String">A regular expression pattern to be escaped.</param>
        ///   <returns type="String">An escaped string pattern for use in the pattern of RegExp object.</returns>
        /// </signature>

        return jTypes.escape.apply(jTypes, arguments);
    };
    $$.export   = function($class)
    {
        /// <signature>
        ///   <summary>Exports a jTypes class to a precompiled modifiers string.</summary>
        ///   <param name="class" type="Class">A class to export to a precompiled modifiers string.</param>
        ///   <returns type="String">A precompiled modifiers string for optimized compiling.</returns>
        /// </signature>

        return '';
    };
    $$.flat     = function()
    {
        /// <signature>
        ///   <summary>Creates a flat object.</summary>
        ///   <param name="arg0" type="Object" optional="true">An object to merge into the flat object.</param>
        ///   <param name="argN" type="Object" parameterArray="true" optional="true">An object to merge into the flat object.</param>
        ///   <returns type="Object">An object with a null prototype.</returns>
        /// </signature>

        return jTypes.flat.apply(jTypes, arguments);
    };
    $$.format   = function()
    {
        /// <signature>
        ///   <summary>Creates a copy of a format string where format items are replaced by their respective string arguments.</summary>
        ///   <param name="format" type="String">A format string to be parsed.</param>
        ///   <param name="arg0" type="String" optional="true">A string argument to replace the format item at index zero.</param>
        ///   <param name="argN" type="String" parameterArray="true" optional="true">A string argument to replace the format item at index N.</param>
        ///   <returns type="String">A copy of format where each format item is replaced by a string argument at its corresponding index.</returns>
        /// </signature>

        return jTypes.format.apply(jTypes, arguments);
    };

    // ---------- SETTINGS ----------

    // Set the settings accessors on the global namespace wrapper
    $_accessor($$, 'debug',  function()
    {
        // Return the debug flag
        return jTypes.debug;
    }, function($v)
    {
        // Set the debug flag
        jTypes.debug = $v;
    }, true);
    $_accessor($$, 'strict', function()
    {
        // Return the strict flag
        return jTypes.strict;
    }, function($v)
    {
        // Set the strict flag
        jTypes.strict = $v;
    }, true);

    // Annotate the settings accessors
    intellisense.annotate($$,
    {
        /// <field type="Boolean">Indicates whether or not debugging is enabled.</field>
        'debug': false,
        /// <field type="Boolean">Indicates whether or not strict mode is enabled.</field>
        'strict': false
    });

    // ########## CONSTRAINTS ##########
    
    // Set the constraint values for each constraint type in the constraints object
    $_constraints['array']     = Object.freeze([]);
    $_constraints['bool']      = false;
    $_constraints['boolean']   = false;
    $_constraints['date']      = Object.freeze(new Date(NaN));
    $_constraints['error']     = Object.freeze(new Error());
    $_constraints['float']     = NaN;
    $_constraints['function']  = Object.freeze(function(){});
    $_constraints['int']       = 0;
    $_constraints['integer']   = 0;
    $_constraints['number']    = NaN;
    $_constraints['object']    = Object.freeze({});
    $_constraints['primitive'] = null;
    $_constraints['regexp']    = Object.freeze(new RegExp());
    $_constraints['string']    = '';
    $_constraints['type']      = Object.freeze($$({}));
    $_constraints['window']    = window;

    // If symbols are supported, set the symbol constraint value in the constraints object
    if (typeof Symbol == 'function')
        $_constraints['symbol'] = Symbol();

    // ########## COMPLETIONS ##########

    // Add the statement completion event listener
    intellisense.addEventListener('statementcompletion', function(e)
    {
        // Get the completion items hidden on the function context
        var $items = e.target[$_symbol_items];

        // Set the completion items
        e.items = $items ?
                  $items :
                  e.items.filter($_filter);
    });

    // ########## GLOBALS ##########

    // If a global reference was found and the global writable flag is set
    if (window && jT_Writable)
    {
        // If the global shorthand is set, define the shorthand
        if (jT_Shorthand)
            $_data(window, jT_Shorthand, $$, true, true);

        // Define the global namespace
        $_data(window, 'jTypes', $$, true, true);
    }
    // Return the global namespace
    else
        return $$;
})(window, window.jTypes);