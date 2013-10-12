/*! ------------------------------------------------------------------------
//                             jTypes Lite 1.0.3
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
(function(window, undefined)
{
    // ########## LIBRARY ##########

    // Store the original library reference
    var jTypes = window.jTypes;

    // ########## CACHE ##########
    
    // Create the private cache
    var $_cachePrivate = [];
    var $_itemsPrivate = [];
    
    // Create the protected cache
    var $_cacheProtected = [];
    var $_itemsProtected = [];
    var $_thisProtected  = [];

    // Create the public cache
    var $_cachePublic = [];
    var $_itemsPublic = [];

    // Create the static cache
    var $_cacheStatic = [];
    var $_itemsStatic = [];

    // Create the item helper function
    var $_item = function($name, $kind, $value, $comments, $glyph)
    {
        // Return the created item object
        return (
        {
            name: $name || '',
            kind: $kind || 'reserved',
            glyph: $glyph || '',
            parentObject: {},
            value: $value,
            comments: $comments || '',
            scope: 'member'
        });
    };

    // ########## NAMESPACE ##########
    
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
        ///   <returns type="Class">A compiled jTypes class.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="constructor" type="Function">A constructor for the class.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the class.</param>
        ///   <param name="baseClass" type="Class">A base class which the class will inherit from.</param>
        ///   <param name="privateDefinitions" type="Object">A collection of private member definitions for the class.</param>
        ///   <param name="protectedDefinitions" type="Object">A collection of protected member definitions for the class.</param>
        ///   <param name="publicDefinitions" type="Object">A collection of public member definitions for the class.</param>
        ///   <param name="definitions" type="Object" optional="true">A collection of member definitions for the class.</param>
        ///   <returns type="Class">A compiled jTypes class.</returns>
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
        ///   <returns type="Class">A compiled jTypes class.</returns>
        /// </signature>
        
        // Compile the class
        var $class       = jTypes.apply(jTypes, arguments);
        var $argument    = 0;
        var $baseClass   = null;
        var $constructor = arguments[$argument++];
        var $modifiers   = '';
        var $prototype   = null;
        var $typeof      = typeof $constructor;

        if ($constructor === null || $typeof !== 'object' || Object.getPrototypeOf($constructor) !== Object.prototype)
        {
            $prototype = arguments[$argument++];

            if ($typeof !== 'function')
            {
                if ($typeof !== 'string')
                    return;

                $modifiers = $constructor;

                if (jTypes.isClass($prototype))
                {
                    $baseClass   = $prototype;
                    $constructor = arguments[$argument++];
                }
                else
                    $constructor = $prototype;

                if (!jTypes.isFunction($constructor))
                {
                    $prototype   = $constructor;
                    $constructor = null;
                }
                else
                    $prototype = arguments[$argument++];
            }
            else if (jTypes.isClass($constructor))
            {
                $baseClass = $constructor;

                if (jTypes.isFunction($prototype))
                {
                    $constructor = $prototype;
                    $prototype   = arguments[$argument++];
                }
                else
                    $constructor = null;
            }
            
            if ($prototype === null || typeof $prototype !== 'object' || Object.getPrototypeOf($prototype) !== Object.prototype)
                return;
        }
        else
        {
            $prototype   = $constructor;
            $constructor = null;
        }

        if (!$constructor)
            $constructor = function(){};
        
        // Create the private, protected and public contexts
        var $thisPrivate   = Object.create($class.prototype);
        var $thisProtected = Object.create($class.prototype);
        var $thisPublic    = Object.create($class.prototype);
        
        // Create the items arrays
        var $itemsPrivate   = [];
        var $itemsProtected = [];
        var $itemsPublic    = [];
        var $itemsStatic    = [];

        // Create the define helpers
        var $definePrivate   = function($name, $kind, $value)
        {
            // Push the item into the private items array
            $itemsPrivate.push($_item($name, $kind, $value));

            // Set the intellisense value in the private context
            Object.defineProperty($thisPrivate, $name, { 'value': $value });
        };
        var $defineProtected = function($name, $kind, $value)
        {
            // Create the item
            var $item = $_item($name, $kind, $value);

            // Push the item into the private and protected items arrays
            $itemsPrivate.push($item);
            $itemsProtected.push($item);

            // Create the descriptor
            var $descriptor = { 'value': $value };

            // Set the intellisense value in the private and protected contexts
            Object.defineProperty($thisPrivate, $name, $descriptor);
            Object.defineProperty($thisProtected, $name, $descriptor);
        };
        var $definePublic    = function($name, $kind, $value)
        {
            // Create the item
            var $item = $_item($name, $kind, $value);

            // Push the item into the private, protected, and public items arrays
            $itemsPrivate.push($item);
            $itemsProtected.push($item);
            $itemsPublic.push($item);

            // Create the descriptor
            var $descriptor = { 'value': $value };

            // Set the intellisense value in the private, protected, and public contexts
            Object.defineProperty($thisPrivate, $name, $descriptor);
            Object.defineProperty($thisProtected, $name, $descriptor);
            Object.defineProperty($thisPublic, $name, $descriptor);
        };

        // Create the hidden item references for the contexts
        Object.defineProperty($thisPrivate, '~jT', { 'value': $itemsPrivate });
        Object.defineProperty($thisProtected, '~jT', { 'value': $itemsProtected });
        Object.defineProperty($thisPublic, '~jT', { 'value': $itemsPublic });
        
        // Define the "__this" and "__type" accessors on the private context
        $definePrivate('__this', 'reserved', $thisPublic);
        $definePrivate('__type', 'reserved', $class);

        intellisense.annotate($thisPrivate,
        {
            /// <field type="Instance">Provides a jTypes private instance access to the public instance.</field>
            __this: {},
            /// <field type="Class">Provides a jTypes instance access to the instance type.</field>
            __type: null
        });

        // If a base class was not provided
        if (!$baseClass)
        {
            // Define the special methods
            $definePublic('as', 'method', intellisense.nullWithCompletionsOf(function()
            {
                /// <signature>
                ///   <summary>Casts a jTypes instance as an instance of a given class.</summary>
                ///   <param name="class" type="Class">A class to cast the instance to.</param>
                ///   <returns type="Instance">instance casted as class if it is an instance of class; otherwise null.</returns>
                /// </signature>
            }));
            $definePublic('is', 'method', intellisense.nullWithCompletionsOf(function()
            {
                /// <signature>
                ///   <summary>Checks if a jTypes instance is an instance of a given class.</summary>
                ///   <param name="class" type="Class">A class to check the instance against.</param>
                ///   <returns type="Boolean">true if instance is an instance of class; otherwise false.</returns>
                /// </signature>
            }));
            $definePublic('type', 'method', intellisense.nullWithCompletionsOf(function()
            {
                /// <signature>
                ///   <summary>Gets the class type of a jTypes instance.</summary>
                ///   <returns type="Class">A jTypes class that is the runtime type of the instance.</returns>
                /// </signature>
            }));

            // If the class is a struct, define the special clone method
            //if (jTypes.isStruct($class))
            //    $definePublic('clone', 'method', intellisense.nullWithCompletionsOf(function()
            //    {
            //        /// <signature>
            //        ///   <summary>Creates a shallow copy of a jTypes instance.</summary>
            //        ///   <returns type="Instance">A shallow copy of instance if it is an instance of a jTypes class compiled with the struct modifier; otherwise null.</returns>
            //        /// </signature>
            //    }));
        }
        
        // Push the private items into the cache
        $_cachePrivate.push($class);
        $_itemsPrivate.push($itemsPrivate);
        
        // Push the protected items into the cache
        $_cacheProtected.push($class);
        $_itemsProtected.push($itemsProtected);
        $_thisProtected.push($thisProtected);

        // Push the public items into the cache
        $_cachePublic.push($class);
        $_itemsPublic.push($itemsPublic);

        // Push the static items into the cache
        $_cacheStatic.push($class);
        $_itemsStatic.push($itemsStatic);

        // Create the cache helper function
        var $cache = function($key, $value)
        {
            // Get the member name and keywords array
            var $keywords = $key.trim().split(' ');
            var $name     = $keywords.pop() || '';

            // Get the member type flags
            var $isPrivate   = $keywords.indexOf('private') >= 0;
            var $isProtected = $keywords.indexOf('protected') >= 0;
            var $isPrototype = $keywords.indexOf('prototype') >= 0;
            var $isPublic    = $keywords.indexOf('public') >= 0;
            var $isStatic    = $keywords.indexOf('static') >= 0;
            
            // Create the type and check if the member is an automatically implemented property
            var $auto = Array.isArray($value) && $value.length !== 0;
            var $type = 'field';
            
            // If the value is a function, set the type as a method
            if (typeof $value === 'function')
                $type = 'method';
            // If the member is neither a prototype member nor a static member and it is either an automatically implemented property or the value is a simple object, set the type as a property
            else if (!$isPrototype && !$isStatic && ($auto || $value !== null && typeof $value === 'object' && Object.getPrototypeOf($value) === Object.prototype))
                $type = 'property';

            // Get the intellisense value
            var $valueInstance = intellisense.nullWithCompletionsOf($type !== 'property' ? $value : $auto ? $value[2] : null);
            
            // If the member is not static
            if (!$isStatic)
            {
                // If the member is public (and neither private, protected, nor a prototype member) or a prototype member (and neither private, protected, nor public), define the public intellisense value
                if ($isPublic && !$isPrivate && !$isProtected && !$isPrototype || $isPrototype && !$isPrivate && !$isProtected && !$isPublic)
                    $definePublic($name, $type, $valueInstance);
                // If the member is protected (and neither private, public, or a prototype member)
                else if ($isProtected && !$isPrivate && !$isPublic && !$isPrototype)
                    $defineProtected($name, $type, $valueInstance);
                // If the member is neither protected, public, nor a prototype member
                else if (!$isProtected && !$isPublic && !$isPrototype)
                    $definePrivate($name, $type, $valueInstance);

                // If the value is a property
                if ($type === 'property')
                {
                    for (var $key in $value)
                    {
                        // Get the current accessor function in the object
                        var $function = $value[$key];

                        // If the accessor is not a function, continue
                        if (jTypes.type($function) !== 'function')
                            continue;
                        
                        // Set the accessor function call context
                        intellisense.setCallContext($function, { 'thisArg': $thisPrivate });
                    }
                }
            }
            // If the member is neither private, protected, public, or a prototype member, push the item into the static items array
            else if (!$isPrivate && !$isProtected && !$isPublic && !$isPrototype)
                $itemsStatic.push($_item($name, $type, $valueInstance));
            
            // If the value is a method, set the function call context (account for the special static and prototype cases)
            if ($type === 'method')
                intellisense.setCallContext($value, { 'thisArg': $isStatic ? $class : $isPrototype ? $thisPublic : $thisPrivate });
        };

        if (arguments.length !== $argument)
        {
            var $prototypePrivate   = $prototype;
            var $prototypeProtected = arguments[$argument++];
            var $prototypePublic    = arguments[$argument++];

            if (!Array.isArray($prototypeProtected))
            {
                if ($prototypeProtected === null || typeof $prototypeProtected !== 'object' || Object.getPrototypeOf($prototypeProtected) !== Object.prototype || $prototypePublic === null || typeof $prototypePublic !== 'object' || Object.getPrototypeOf($prototypePublic) !== Object.prototype)
                    return;

                $prototype = arguments[$argument];

               if ($prototype === null || typeof $prototype !== 'object' || Object.getPrototypeOf($prototype) !== Object.prototype)
                    $prototype = null;
                else
                    $argument++;

                if (arguments.length !== $argument)
                    return;

                // Cache the private definitions
                for (var $key in $prototypePrivate)
                    $cache('private ' + $key, $prototypePrivate[$key]);

                // Cache the protected definitions
                for (var $key in $prototypeProtected)
                    $cache('protected ' + $key, $prototypeProtected[$key]);

                // Cache the public definitions
                for (var $key in $prototypePublic)
                    $cache('public ' + $key, $prototypePublic[$key]);
            }
            else
                $argument -= 2;
        }

        // If a prototype was provided, cache the definitions
        if ($prototype)
            for (var $key in $prototype)
                $cache($key, $prototype[$key]);

         // Define the constructor on the protected context
        $defineProtected('constructor', 'method', intellisense.nullWithCompletionsOf($constructor));
        
        // Set the constructor call context as the private context
        intellisense.setCallContext($constructor, { 'thisArg': $thisPrivate });

        // If a base class was provided
        if ($baseClass)
        {
            // Get the inherited protected and public indices
            var $indexProtected = $_cacheProtected.indexOf($baseClass);
            var $indexPublic    = $_cachePublic.indexOf($baseClass);

            // Get the inherited protected and public items arrays
            var $inheritProtected = $_itemsProtected[$indexProtected];
            var $inheritPublic    = $_itemsPublic[$indexPublic];

            // Define the "__base" accessor on the private context
            $definePrivate('__base', 'reserved', $_thisProtected[$indexProtected]);

            intellisense.annotate($thisPrivate,
            {
                /// <field type="Instance">Provides a jTypes private instance access to the protected instance of its base class.</field>
                __base: null
            });

            for (var $i = 0, $j = $inheritProtected.length; $i < $j; $i++)
            {
                // Get the current inherited protected item and its name
                var $itemCurrent = $inheritProtected[$i];
                var $itemName    = $itemCurrent.name;

                // If the inherited protected item is the constructor, continue
                if ($itemName === 'constructor')
                    continue;

                // If the inherited protected item is already defined, continue
                if ($thisProtected.hasOwnProperty($itemName))
                    continue;

                // Define the inherited protected item
                $defineProtected($itemName, $itemCurrent.kind, $itemCurrent.value);
            }

            for (var $i = 0, $j = $inheritPublic.length; $i < $j; $i++)
            {
                // Get the current inherited public item and its name
                var $itemCurrent = $inheritPublic[$i];
                var $itemName    = $itemCurrent.name;

                // If the inherited public item is already defined, continue
                if ($thisPublic.hasOwnProperty($itemName))
                    continue;

                // Define the inherited public item
                $definePublic($itemName, $itemCurrent.kind, $itemCurrent.value);
            }
        }

        // Return the class
        return $class;
    };
    
    $$.toString = jTypes.toString;

    // ########## DATA ##########

    $$.version = jTypes.version;

    $$.__class = jTypes.__class;
    $$.__proto = jTypes.__proto;

    $$.intMax = jTypes.intMax;
    $$.intMin = jTypes.intMin;

    intellisense.annotate($$,
    {
        /// <field type="Function">Provides access to the base class of all jTypes classes.</field>
        '__class': function(){},
        /// <field type="Object">Provides access to the base prototype of all jTypes instances.</field>
        '__proto': {},
        /// <field type="Boolean">A number containing the maximum integer.</field>
        'intMax': 0,
        /// <field type="Boolean">A number containing the minimum integer.</field>
        'intMin': 0,
        /// <field type="String">A string containing the jTypes version number.</field>
        'version': ''
    });

    // ########## PACKAGES ##########

    $$.private   = function()
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

        return jTypes.private.apply(jTypes, arguments);
    };
    $$.protected = function()
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

        return jTypes.protected.apply(jTypes, arguments);
    };
    $$.prototype = function()
    {
        /// <signature>
        ///   <summary>Creates a prototype member definition for a jTypes class.</summary>
        ///   <param name="value" type="Object">A value for the prototype member.</param>
        ///   <returns type="Object">A prototype member definition package for a jTypes class.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Creates a prototype member definition for a jTypes class.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the prototype member.</param>
        ///   <param name="value" type="Object">A value for the prototype member.</param>
        ///   <returns type="Object">A prototype member definition package for a jTypes class.</returns>
        /// </signature>

        return jTypes.prototype.apply(jTypes, arguments);
    };
    $$.public    = function()
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

        return jTypes.public.apply(jTypes, arguments);
    };
    $$.static    = function()
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

        return jTypes.static.apply(jTypes, arguments);
    };

    // ########## TYPES ##########

    $$.type = function()
    {
        /// <signature>
        ///   <summary>Determines the type of an object using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to determine the type of.</param>
        ///   <returns type="String">A type string from the following collection of types: array, boolean, class, date, error, function, instance, null, number, object, regexp, string, undefined, window.</returns>
        /// </signature>

        return jTypes.type.apply(jTypes, arguments);
    };
    
    $$.isArray    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an array using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an array.</param>
        ///   <returns type="Boolean">true if object is an array; otherwise, false.</returns>
        /// </signature>

        return jTypes.isArray.apply(jTypes, arguments);
    };
    $$.isBoolean  = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a boolean using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a boolean.</param>
        ///   <returns type="Boolean">true if object is a boolean; otherwise, false.</returns>
        /// </signature>

        return jTypes.isBoolean.apply(jTypes, arguments);
    };
    $$.isDate     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a date using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a date.</param>
        ///   <returns type="Boolean">true if object is a date; otherwise, false.</returns>
        /// </signature>

        return jTypes.isDate.apply(jTypes, arguments);
    };
    $$.isError    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an error using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an error.</param>
        ///   <returns type="Boolean">true if object is an error; otherwise, false.</returns>
        /// </signature>

        return jTypes.isError.apply(jTypes, arguments);
    };
    $$.isFunction = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a function using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a function.</param>
        ///   <returns type="Boolean">true if object is a function; otherwise, false.</returns>
        /// </signature>

        return jTypes.isFunction.apply(jTypes, arguments);
    };
    $$.isNumber   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a number using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a number.</param>
        ///   <returns type="Boolean">true if object is a number; otherwise, false.</returns>
        /// </signature>

        return jTypes.isNumber.apply(jTypes, arguments);
    };
    $$.isRegExp   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a regular expression using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a regular expression.</param>
        ///   <returns type="Boolean">true if object is a regular expression; otherwise, false.</returns>
        /// </signature>

        return jTypes.isRegExp.apply(jTypes, arguments);
    };
    $$.isString   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a string using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a string.</param>
        ///   <returns type="Boolean">true if object is a string; otherwise, false.</returns>
        /// </signature>

        return jTypes.isString.apply(jTypes, arguments);
    };

    // ########## CHECKS ##########

    $$.isClass          = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class; otherwise, false.</returns>
        /// </signature>

        return jTypes.isClass.apply(jTypes, arguments);
    };
    $$.isInstance       = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes instance.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes instance.</param>
        ///   <returns type="Boolean">true if object is a jTypes instance; otherwise, false.</returns>
        /// </signature>

        return jTypes.isInstance.apply(jTypes, arguments);
    };
    $$.isNull           = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is a null reference.</summary>
        ///   <param name="reference">A reference to test if it is a null reference.</param>
        ///   <returns type="Boolean">true if reference is a null reference; otherwise, false.</returns>
        /// </signature>

        return jTypes.isNull.apply(jTypes, arguments);
    };
    $$.isObject         = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an object.</param>
        ///   <returns type="Boolean">true if object is neither null nor undefined; otherwise, false.</returns>
        /// </signature>

        return jTypes.isObject.apply(jTypes, arguments);
    };
    $$.isObjectInstance = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an object instance.</summary>
        ///   <param name="object" type="Object">An object to test if it is an object instance.</param>
        ///   <returns type="Boolean">true if object is an instance of Object; otherwise, false.</returns>
        /// </signature>

        return jTypes.isObjectInstance.apply(jTypes, arguments);
    };
    $$.isPrimitive      = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a JavaScript primitive.</summary>
        ///   <param name="object" type="Object">An object to test if it is a JavaScript primitive.</param>
        ///   <returns type="Boolean">true if object is either null or has a typeof in the following collection: boolean, number, string, undefined; otherwise, false.</returns>
        /// </signature>

        return jTypes.isPrimitive.apply(jTypes, arguments);
    };
    $$.isUndefined      = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is an undefined reference.</summary>
        ///   <param name="reference">A reference to test if it is an undefined reference.</param>
        ///   <returns type="Boolean">true if reference is an undefined reference; otherwise, false.</returns>
        /// </signature>

        return jTypes.isUndefined.apply(jTypes, arguments);
    };
    $$.isWindow         = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a global window object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a global window object.</param>
        ///   <returns type="Boolean">true if object is a global window object; otherwise, false.</returns>
        /// </signature>

        return jTypes.isWindow.apply(jTypes, arguments);
    };

    // ########## CASTS ##########
    
    $$.asArray  = function()
    {
        /// <signature>
        ///   <summary>Converts an object or array-like object to an array.</summary>
        ///   <param name="object" type="Object">An object to convert to an array.</param>
        ///   <returns type="Array">An array copy of object if it is an array-like object; otherwise object converted to an array.</returns>
        /// </signature>
        
        return jTypes.asArray.apply(jTypes, arguments);
    };
    $$.asBool   = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a boolean.</summary>
        ///   <param name="object" type="Object">An object to convert to a boolean.</param>
        ///   <returns type="Boolean">object if it is a boolean; otherwise its boolean equivalent.</returns>
        /// </signature>

        return jTypes.asBool.apply(jTypes, arguments);
    };
    $$.asFloat  = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a floating-point number.</summary>
        ///   <param name="object" type="Object">An object to convert to a floating-point number.</param>
        ///   <returns type="Number">object if it is a number; otherwise its number equivalent.</returns>
        /// </signature>

        return jTypes.asFloat.apply(jTypes, arguments);
    };
    $$.asInt    = function()
    {
        /// <signature>
        ///   <summary>Converts an object to an integer.</summary>
        ///   <param name="object" type="Object">An object to convert to an integer.</param>
        ///   <param name="finite" type="Boolean">A flag indicating whether or not to force a finite cast.</param>
        ///   <returns type="Number">object if it is an integer; otherwise its number equivalent rounded towards zero.</returns>
        /// </signature>

        return jTypes.asInt.apply(jTypes, arguments);
    };
    $$.asObject = function()
    {
        /// <signature>
        ///   <summary>Converts a reference to an object.</summary>
        ///   <param name="reference" type="Object">A reference to convert to an object.</param>
        ///   <returns type="Object">object if it is neither null nor undefined; otherwise a simple object.</returns>
        /// </signature>

        return jTypes.asObject.apply(jTypes, arguments);
    };
    $$.asString = function()
    {
        /// <signature>
        ///   <summary>Converts an object to a string.</summary>
        ///   <param name="object" type="Object">An object to convert to a string.</param>
        ///   <returns type="String">object if it is a string; otherwise its string equivalent.</returns>
        /// </signature>

        return jTypes.asString.apply(jTypes, arguments);
    };

    // ########## HELPERS ##########

    $$.base   = function()
    {
        /// <signature>
        ///   <summary>Gets the base class of a jTypes class.</summary>
        ///   <param name="class" type="Class">A class to get the base class of.</param>
        ///   <returns type="Class">A jTypes class if class has a base class; otherwise null.</returns>
        /// </signature>

        return jTypes.base.apply(jTypes, arguments);
    };
    $$.empty  = function()
    {
        /// <signature>
        ///   <summary>Creates an empty function object.</summary>
        ///   <returns type="Function">A function object with an empty body and no arguments.</returns>
        /// </signature>

        return jTypes.empty.apply(jTypes, arguments);
    };
    $$.format = function()
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

    // ########## SETTINGS ##########
    
    Object.defineProperty($$, 'debug',
    {
        'enumerable': true,
        'get': function()
        {
            return jTypes.debug;
        },
        'set': function($v)
        {
            jTypes.debug = $v;
        }
    });

    Object.defineProperty($$, 'lazy',
    {
        'enumerable': true,
        'get': function()
        {
            return jTypes.lazy;
        },
        'set': function($v)
        {
            jTypes.lazy = $v;
        }
    });

    intellisense.annotate($$,
    {
        /// <field type="Boolean">Indicates whether or not debugging is enabled.</field>
        'debug': false,
        /// <field type="Boolean">Indicates whether or not lazy-loading is enabled.</field>
        'lazy': false
    });

    // Bind the statement completion event handler
    intellisense.addEventListener('statementcompletion', function(e)
    {
        // Get the statement completion target and its type
        var $target = e.target;
        var $type   = jTypes.type($target);
        
        // ---------- DEBUG ----------
        //intellisense.logMessage('[' + jTypes.type($target) + ']');
        //intellisense.logMessage(e.targetName);

        //for (var $k in $target)
        //    intellisense.logMessage($k + ': [' + jTypes.type($target[$k]) + '] ' + $target[$k]);

        //intellisense.logMessage('__proto__: ' + Object.getPrototypeOf($target));
        // ---------- DEBUG ----------

        // If the target is a class, set the completion items as the static context
        if ($type === 'class')
            e.items = $_itemsStatic[$_cacheStatic.indexOf($target)];

        // If the target is not an instance, return
        if ($type !== 'instance')
            return;

        // If the target does not have hidden completion items
        if (!$target.hasOwnProperty('~jT'))
        {
            // Get the class from the instance
            var $class = $target.type();

            // If the target is a function context, set the completion items as the private context
            if (e.targetName === 'this')
                e.items = $_itemsPrivate[$_cachePrivate.indexOf($class)];
            // Set the completion items as the public context
            else
                e.items = $_itemsPublic[$_cachePublic.indexOf($class)];
        }
        // Set the completion items as the hidden items on the target
        else
            e.items = $target['~jT'];
    });

    // ########## GLOBALS ##########
    
    if (typeof define === 'function' && define.amd)
    {
        define(function()
        {
            return $$;
        });
    }
    else if (typeof module !== 'undefined' && module && module.exports)
    {
        module.exports = $$;
    }
    else if (window)
    {
        if (window.$$ === undefined || window.$$ === window.jTypes)
            window.$$ = $$;
        
        window.jTypes = $$;
    }
    else
        return $$;
})(typeof window !== 'undefined' ? window : null);