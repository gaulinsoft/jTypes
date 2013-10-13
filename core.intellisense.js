/*! ------------------------------------------------------------------------
//                                jTypes 2.1.7
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

        if (!jTypes.isSimpleObject($constructor))
        {
            $prototype = arguments[$argument++];

            if (typeof $constructor !== 'function')
            {
                if (typeof $constructor !== 'string')
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

            if (!jTypes.isSimpleObject($prototype))
                return;
        }
        else
        {
            $prototype   = $constructor;
            $constructor = null;
        }

        if (!$constructor)
            $constructor = function(){};

        // Create the constructor, private, protected, and public contexts
        var $thisConstructor = Object.create($class.prototype);
        var $thisPrivate     = Object.create($class.prototype);
        var $thisProtected   = Object.create($class.prototype);
        var $thisPublic      = Object.create($class.prototype);
        
        // Create the items arrays
        var $itemsConstructor = [];
        var $itemsPrivate     = [];
        var $itemsProtected   = [];
        var $itemsPublic      = [];
        var $itemsStatic      = [];

        // Create the define helpers
        var $definePrivate   = function($name, $kind, $value)
        {
            // Create the item
            var $item = $_item($name, $kind, $value);

            // Push the item into the constructor and private items arrays
            $itemsConstructor.push($item);
            $itemsPrivate.push($item);

            // Create the descriptor
            var $descriptor = { 'value': $value };

            // Set the intellisense value in the constructor and private contexts
            Object.defineProperty($thisConstructor, $name, $descriptor);
            Object.defineProperty($thisPrivate, $name, $descriptor);
        };
        var $defineProtected = function($name, $kind, $value)
        {
            // Create the item
            var $item = $_item($name, $kind, $value);

            // Push the item into the constructor, private, and protected items arrays
            $itemsConstructor.push($item);
            $itemsPrivate.push($item);
            $itemsProtected.push($item);

            // Create the descriptor
            var $descriptor = { 'value': $value };

            // Set the intellisense value in the constructor, private, and protected contexts
            Object.defineProperty($thisConstructor, $name, $descriptor);
            Object.defineProperty($thisPrivate, $name, $descriptor);
            Object.defineProperty($thisProtected, $name, $descriptor);
        };
        var $definePublic    = function($name, $kind, $value)
        {
            // Create the item
            var $item = $_item($name, $kind, $value);

            // Push the item into the constructor, private, protected, and public items arrays
            $itemsConstructor.push($item);
            $itemsPrivate.push($item);
            $itemsProtected.push($item);
            $itemsPublic.push($item);

            // Create the descriptor
            var $descriptor = { 'value': $value };

            // Set the intellisense value in the constructor, private, protected, and public contexts
            Object.defineProperty($thisConstructor, $name, $descriptor);
            Object.defineProperty($thisPrivate, $name, $descriptor);
            Object.defineProperty($thisProtected, $name, $descriptor);
            Object.defineProperty($thisPublic, $name, $descriptor);
        };

        // Create the hidden item references for the contexts
        Object.defineProperty($thisConstructor, '~jT', { 'value': $itemsConstructor });
        Object.defineProperty($thisPrivate, '~jT', { 'value': $itemsPrivate });
        Object.defineProperty($thisProtected, '~jT', { 'value': $itemsProtected });
        Object.defineProperty($thisPublic, '~jT', { 'value': $itemsPublic });

        // Create the "as()" and "is()" method items
        var $as = intellisense.nullWithCompletionsOf(function()
        {
            /// <signature>
            ///   <summary>Casts a jTypes instance as an instance of a given class.</summary>
            ///   <param name="class" type="Class">A class to cast the instance to.</param>
            ///   <returns type="Instance">instance casted as class if it is an instance of class; otherwise null.</returns>
            /// </signature>
        });
        var $is = intellisense.nullWithCompletionsOf(function()
        {
            /// <signature>
            ///   <summary>Checks if a jTypes instance is an instance of a given class.</summary>
            ///   <param name="class" type="Class">A class to check the instance against.</param>
            ///   <returns type="Boolean">true if instance is an instance of class; otherwise false.</returns>
            /// </signature>
        });

        // Create the self reference context
        var $self = Object.create($class.prototype);

        // Set the "as()" and "is()" method items on the self reference context
        Object.defineProperty($self, 'as', { 'value': $as });
        Object.defineProperty($self, 'is', { 'value': $is });

        // Define the "__this" accessor on the private context
        $definePrivate('__this', 'reserved', $thisPublic);

        // Create the external, internal, and self reference items
        var $itemExternal = $_item('__type', 'reserved', !jTypes.isInternalClass($class) ? $class : null);
        var $itemInternal = $_item('__type', 'reserved', $class);
        var $itemSelf     = $_item('__self', 'reserved', $self);

        // Push the external and internal items into the constructor, private, and public items arrays
        $itemsConstructor.push($itemInternal);
        $itemsPrivate.push($itemInternal);
        $itemsPublic.push($itemExternal);

        // Push the self reference item into the constructor, private, and public items arrays
        $itemsConstructor.push($itemSelf);
        $itemsPrivate.push($itemSelf);
        $itemsPublic.push($itemSelf);

        // Create the external, internal, and self reference descriptors
        var $descriptorExternal = { 'value': $itemExternal.value };
        var $descriptorInternal = { 'value': $itemInternal.value };
        var $descriptorSelf     = { 'value': $itemSelf.value };

        // Set the external and internal intellisense references in the constructor, private, and public contexts
        Object.defineProperty($thisConstructor, '__type', $descriptorInternal);
        Object.defineProperty($thisPrivate, '__type', $descriptorInternal);
        Object.defineProperty($thisPublic, '__type', $descriptorExternal);

        // Set the self reference intellisense reference in the constructor, private, and public contexts
        Object.defineProperty($thisConstructor, '__self', $descriptorSelf);
        Object.defineProperty($thisPrivate, '__self', $descriptorSelf);
        Object.defineProperty($thisPublic, '__self', $descriptorSelf);

        intellisense.annotate($thisConstructor,
        {
            /// <field type="Instance">Provides a jTypes instance access to its self reference object.</field>
            __self: null,
            /// <field type="Instance">Provides a jTypes private instance access to the public instance.</field>
            __this: null,
            /// <field type="Class">Provides a jTypes instance access to the instance type.</field>
            __type: null
        });

        intellisense.annotate($thisPrivate,
        {
            /// <field type="Instance">Provides a jTypes instance access to its self reference object.</field>
            __self: null,
            /// <field type="Instance">Provides a jTypes private instance access to the public instance.</field>
            __this: null,
            /// <field type="Class">Provides a jTypes instance access to the instance type.</field>
            __type: null
        });

        intellisense.annotate($thisPublic,
        {
            /// <field type="Instance">Provides a jTypes instance access to its self reference object.</field>
            __self: null,
            /// <field type="Class">Provides a jTypes instance access to the instance type.</field>
            __type: null
        });

        // If a base class was not provided
        if (!$baseClass)
        {
            // Define the special methods
            $definePublic('as', 'method', $as);
            $definePublic('is', 'method', $is);
            $definePublic('type', 'method', intellisense.nullWithCompletionsOf(function()
            {
                /// <signature>
                ///   <summary>Gets the class type of a jTypes instance.</summary>
                ///   <returns type="Class">A jTypes class that is the runtime type of the instance.</returns>
                /// </signature>
            }));

            // If the class is a struct, define the special clone method
            if (jTypes.isStruct($class))
                $definePublic('clone', 'method', intellisense.nullWithCompletionsOf(function()
                {
                    /// <signature>
                    ///   <summary>Creates a shallow copy of a jTypes instance.</summary>
                    ///   <returns type="Instance">A shallow copy of instance if it is an instance of a jTypes class compiled with the struct modifier; otherwise null.</returns>
                    /// </signature>
                }));
        }

        // Push the item into the constructor items array
        $itemsConstructor.push($_item('__data', 'reserved', $thisPrivate));
        
        // Set the intellisense value in the constructor context
        Object.defineProperty($thisConstructor, '__data', { 'value': $thisPrivate });

        intellisense.annotate($thisConstructor,
        {
            /// <field type="Instance">Provides a jTypes constructor access to the private instance.</field>
            __data: null
        });
        
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

        // Set the constructor call context as the constructor context
        intellisense.setCallContext($constructor, { 'thisArg': $thisConstructor });

        // If a base class was provided
        if ($baseClass)
        {
            // Get the inherited protected and public indices
            var $indexProtected = $_cacheProtected.indexOf($baseClass);
            var $indexPublic    = $_cachePublic.indexOf($baseClass);

            // Get the inherited protected and public items arrays along with the inherited protected context
            var $inheritProtected     = $_itemsProtected[$indexProtected];
            var $inheritProtectedThis = $_thisProtected[$indexProtected];
            var $inheritPublic        = $_itemsPublic[$indexPublic];

            // Push the item into the private items array
            $itemsPrivate.push($_item('__base', 'reserved', $inheritProtectedThis));
        
            // Set the intellisense value in the private context for the "__base" accessor
            Object.defineProperty($thisPrivate, '__base', { 'value': $inheritProtectedThis });

            intellisense.annotate($thisPrivate,
            {
                /// <field type="Instance">Provides a jTypes private instance access to the protected instance of its base class.</field>
                __base: null
            });

            // Push the item into the constructor items array
            $itemsConstructor.push($_item('__base', 'reserved', intellisense.nullWithCompletionsOf($constructor)));
        
            // Set the intellisense value in the constructor context for the "__base" accessor
            Object.defineProperty($thisConstructor, '__base', { 'value': intellisense.nullWithCompletionsOf($constructor) });

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

    $$.isAbstractClass    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes abstract class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes abstract class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the abstract modifier; otherwise, false.</returns>
        /// </signature>

        return jTypes.isAbstractClass.apply(jTypes, arguments);
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
    $$.isCallableType     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "callable-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "callable-type" object.</param>
        ///   <returns type="Boolean">true if object is a type of either class or function; otherwise, false.</returns>
        /// </signature>

        return jTypes.isCallableType.apply(jTypes, arguments);
    };
    $$.isClass            = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class; otherwise, false.</returns>
        /// </signature>

        return jTypes.isClass.apply(jTypes, arguments);
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
    $$.isFinite           = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a finite value.</summary>
        ///   <param name="value" type="Number">A value to test if it is finite.</param>
        ///   <returns type="Boolean">true if value is a finite number; otherwise, false.</returns>
        /// </signature>

        return jTypes.isFinite.apply(jTypes, arguments);
    };
    $$.isFiniteInt        = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a finite integer value.</summary>
        ///   <param name="value" type="Number">A value to test if it is finite and an integer.</param>
        ///   <returns type="Boolean">true if value is a finite number that is a representable integer in JavaScript; otherwise, false.</returns>
        /// </signature>

        return jTypes.isFiniteInt.apply(jTypes, arguments);
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
    $$.isImportedClass    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes imported class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes imported class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class that was compiled using a precompiled modifiers string; otherwise, false.</returns>
        /// </signature>

        return jTypes.isImportedClass.apply(jTypes, arguments);
    };
    $$.isInternalClass    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes internal class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes internal class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the internal modifier; otherwise, false./returns>
        /// </signature>

        return jTypes.isInternalClass.apply(jTypes, arguments);
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
    $$.isInstance         = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes instance.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes instance.</param>
        ///   <returns type="Boolean">true if object is a jTypes instance; otherwise, false.</returns>
        /// </signature>

        return jTypes.isInstance.apply(jTypes, arguments);
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
        ///   <summary>Indicates whether or not an object is an object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an object.</param>
        ///   <returns type="Boolean">true if object is neither null nor undefined; otherwise, false.</returns>
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
    $$.isOptimizedClass   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes optimized class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes optimized class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the optimized modifier; otherwise, false.</returns>
        /// </signature>

        return jTypes.isOptimizedClass.apply(jTypes, arguments);
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
    $$.isPrimitive        = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a JavaScript primitive.</summary>
        ///   <param name="object" type="Object">An object to test if it is a JavaScript primitive.</param>
        ///   <returns type="Boolean">true if object is either null or has a typeof in the following collection: boolean, number, string, undefined; otherwise, false.</returns>
        /// </signature>

        return jTypes.isPrimitive.apply(jTypes, arguments);
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
    $$.isSealedClass      = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes sealed class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes sealed class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the sealed modifier; otherwise, false.</returns>
        /// </signature>

        return jTypes.isSealedClass.apply(jTypes, arguments);
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
    $$.isStruct           = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes struct.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes struct.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the struct modifier; otherwise, false.</returns>
        /// </signature>

        return jTypes.isStruct.apply(jTypes, arguments);
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
    $$.export = function()
    {
        /// <signature>
        ///   <summary>Exports a jTypes class to a precompiled modifiers string.</summary>
        ///   <param name="class" type="Class">A class to export to a precompiled modifiers string.</param>
        ///   <returns type="String">A precompiled modifiers string for optimized compiling.</returns>
        /// </signature>

        return jTypes.export.apply(jTypes, arguments);
    };
    $$.flat   = function()
    {
        /// <signature>
        ///   <summary>Creates a flat object.</summary>
        ///   <returns type="Object">An object with a null prototype.</returns>
        /// </signature>

        return jTypes.flat.apply(jTypes, arguments);
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
            var $class = $target.__type || $target.type();

            // If the target is a function context
            if (e.targetName === 'this')
            {
                // If the class is not internal, set the completion items as the private context
                if ($target.__type !== null)
                    e.items = $_itemsPrivate[$_cachePrivate.indexOf($class)];
                // Set the completion items as the protected context
                else
                    e.items = $_itemsProtected[$_cacheProtected.indexOf($class)];
            }
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