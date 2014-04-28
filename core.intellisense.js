/*! ------------------------------------------------------------------------
//                                jTypes 2.2.2
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
    // ########## GLOBALS ##########

    // Annotate the global variables
    intellisense.annotate(window,
    {
        /// <field type="Boolean">Indicates whether or not extensions are prevented on critical functions.</field>
        'jT_FunctionLock': false,
        /// <field type="Boolean">Indicates whether or not ECMAScript 6 support is enabled.</field>
        'jT_Harmony': true,
        /// <field type="Boolean">Indicates whether or not legacy mode is enabled.</field>
        'jT_Legacy': false,
        /// <field type="Boolean">Indicates whether or not extensions are prevented on critical prototypes and objects.</field>
        'jT_PrototypeLock': false,
        /// <field type="String">A shorthand variable name for the global jTypes reference.</field>
        'jT_Shorthand': '$$',
        /// <field type="Boolean">Indicates whether or not Web Storage support is enabled.</field>
        'jT_Storage': false,
        /// <field type="Boolean">Indicates whether or not ECMAScript 5.1 Typed Arrays support is enabled.</field>
        'jT_TypedArrays': false,
        /// <field type="Boolean">Indicates whether or not the global jTypes reference is writable.</field>
        'jT_Writable': false
    });

    // ########## CACHE ##########

    // Create the constructors object
    var $_classes      = Object.create(null),
        $_constructors = Object.create(null),
        $_namespaces   = Object.create(null);

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
        $_thisPublic    = Object.create(null);

    // ########## HELPERS ##########

    // Create the characters string, base class of all classes, constraints object, hashes object, and base prototype of all prototypes
    var $_aliases     = null,
        $_characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        $_class       = function(){},
        $_constraints = Object.create(null),
        $_hashes      = Object.create(null),
        $_includes    = null,
        $_namespace   = null,
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
    var $_compile   = function($modifiers, $dependencies, $constructor)
    {
        // Create the namespace object
        var $namespace = $$;

        // If any modifiers were provided
        if ($modifiers)
        {
            // Trim the modifiers
            $modifiers = $modifiers.trim();

            // If the modifiers start with the namespace keyword, remove it from the modifiers
            if ($modifiers.substr(0, 'namespace'.length + 1) == 'namespace ')
                $modifiers = $modifiers.substr('namespace'.length + 1).trim();

            // If the modifiers are not a generic handle or already being compiled, return
            if (!$_handle($modifiers, true) || $_namespace)
                return;

            // Create the namespaces array
            var $namespaces = $modifiers.split('.');

            for (var $i = 0, $j = $namespaces.length; $i < $j; $i++)
            {
                // Get the current name
                var $name = $namespaces[$i];

                // If the name is not defined in the namespace
                if (!Object.prototype.hasOwnProperty.call($namespace, $name))
                {
                    // Create the namespace object
                    var $object = Object.create(null);

                    // Set the namespace object on the namespace
                    $_data($namespace, $name, $object, false, true);

                    // Set the current namespace to the namespace object
                    $namespace = $object;

                    // Set the namespace metadata
                    $_data($namespace, $_symbol_handle,    $namespaces.slice(0, $i + 1).join('.'));
                    $_data($namespace, $_symbol_name,      $name);
                    $_data($namespace, $_symbol_namespace, $i > 0 ? $namespaces.slice(0, $i).join('.') : '');
                }
                // Set the current namespace to the namespace object
                else
                    $namespace = $namespace[$name];
            }

            // Add the namespace to the namespaces collection
            $_namespaces[$modifiers] = $namespace;

            // Set the namespace
            $_namespace = $modifiers;
        }
        // Set the global namespace
        else
            $_namespace = '';

        // If any dependencies were provided
        if ($dependencies && $dependencies.length)
        {
            // Create the aliases map and includes array
            $_aliases  = Object.create(null);
            $_includes = [];

            for (var $i = 0, $j = $dependencies.length; $i < $j; $i++)
            {
                // Get the current dependency
                var $dependency = $dependencies[$i];

                // If the dependency is not a primitive string, return
                if (typeof $dependency != 'string')
                    return;

                // If the dependency starts with the using keyword, remove it from the dependency
                if ($dependency.substr(0, 'using'.length + 1) == 'using ')
                    $dependency = $dependency.substr('using'.length + 1).trim();

                // Get the index of the alias operator
                var $index = $dependency.indexOf('=');

                // If the dependency is an alias
                if ($index >= 0)
                {
                    // Get the alias from the dependency string
                    var $alias = $dependency.substr(0, $index).trim();

                    // If the alias is not a valid namespace, return
                    if (!/^[_a-z][_a-z0-9]*$/i.test($alias) || $_constraints[$alias] !== undefined || $alias == 'global')
                        return;

                    // Remove the alias from the dependency string
                    $dependency = $dependency.substr($index + 1).trim();

                    // If the dependency is not a generic handle or the alias is already defined in the aliases map, return
                    if (!$_handle($dependency, true) || $_aliases[$alias])
                        return;

                    // Set the alias in the aliases map
                    $_aliases[$alias] = $dependency;
                }
                else
                {
                    // If the dependency is not a generic handle, return
                    if (!$_handle($dependency, true))
                        return;

                    // Push the dependency into the includes array
                    $_includes.push($dependency);
                }
            }
        }
        else
        {
            // Reset the aliases map and includes array
            $_aliases  = null;
            $_includes = null;
        }

        // Set the namespace constructor function call context
        intellisense.setCallContext($constructor,
        {
            'thisArg': $namespace,
            'args':    [$$]
        });

        // Call the namespace constructor
        $constructor.call($namespace, $$);

        // Reset the namespace
        $_aliases   = null;
        $_includes  = null;
        $_namespace = null;

        // Return namespace object
        return $namespace;
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
    var $_handle    = function($handle, $generic)
    {
        // If the handle starts with the namespace alias qualifier
        if ($handle.indexOf('::') >= 0)
        {
            // Create the handles array from the handle
            $handle = $handle.split('::');

            // If the handles array has more than one alias qualifier or the qualifier is invalid, return false
            if ($handle.length != 2 || !/^[_a-z][_a-z0-9]*$/i.test($handle[0]))
                return false;

            // Set the handle succeeding the alias qualifier as the handle
            $handle = $handle[1];
        }

        // Create the namespaces array from the handle
        var $namespaces = $handle.split('.');

        // If the handle is not generic
        if (!$generic)
        {
            // Get the class name from the namespaces array
            var $name = $namespaces.pop();

            // If the class name is not valid, return false
            if (!/^[A-Z][_a-zA-Z0-9]*$/.test($name))
                return false;
        }

        // If any of the namespaces are not valid, return false
        for (var $i = 0, $j = $namespaces.length; $i < $j; $i++)
            if (!/^[_a-z][_a-z0-9]*$/i.test($namespaces[$i]))
                return false;

        // Return true
        return true;
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
    var $_resolve   = function($handle, $this, $namespace, $aliases, $includes)
    {
        // Resolve the reference relative to the namespace
        var $reference = $namespace ?
                         $this[$namespace + '.' + $handle] :
                         null;

        // If the handle starts with the namespace alias qualifier
        if ($handle.indexOf('::') >= 0)
        {
            // Create the handles array from the handle
            $handle = $handle.split('::');

            // If the alias qualifier is the global alias, return the resolved global reference
            if ($handle[0] == 'global')
                return $this[$handle[1]] || null;

            // Get the dependency from the aliases map
            var $dependency = $aliases ?
                              $aliases[$handle[0]] :
                              null;

            // If the dependency was not found, return
            if (!$dependency)
                return;

            // Return the resolved reference relative to the dependency
            return $_resolve($dependency + '.' + $handle[1], $this, $namespace);
        }

        // If an aliases map was provided
        if ($aliases)
        {
            // Get the alias from the handle and the dependency from the aliases map
            var $index      = $handle.indexOf('.'),
                $alias      = $index >= 0 ?
                              $handle.substr(0, $index) :
                              $handle,
                $dependency = $aliases[$alias];

            // If a dependency was found in the aliases map
            if ($dependency)
            {
                // If the handle directly references the alias
                if ($handle == $alias)
                {
                    // If the alias is not a valid class name or the dependency is not a valid handle, return
                    if (!/^[A-Z][_a-zA-Z0-9]*$/.test($alias) || !$_handle($dependency))
                        return;
                }

                // If a reference was already found relative to the namespace, return
                if ($reference)
                    return;

                // Resolve the reference relative to the dependency
                $reference = $_resolve($index >= 0 ?
                                       $dependency + '.' + $handle.substr($index + 1) :
                                       $dependency,
                                       $this,
                                       $namespace);
            }
        }

        // If a reference was resolved, return the reference
        if ($reference)
            return $reference;

        // If an includes array was provided
        if ($includes)
        {
            for (var $i = 0, $j = $includes.length; $i < $j; $i++)
            {
                // Resolve the include reference relative to the include
                var $include = $_resolve($includes[$i] + '.' + $handle, $this, $namespace);

                // If an include reference was not resolved, continue
                if (!$include)
                    continue;

                // If an include reference was previously resolved, return
                if ($reference)
                    return;

                // Set the reference as the include reference
                $reference = $include;
            }

            // If a reference was resolved, return the reference
            if ($reference)
                return $reference;
        }

        // If a namespace was provided
        if ($namespace)
        {
            // Get the index of the last dot operator in the namespace
            var $index = $namespace.lastIndexOf('.');

            // If a dot operator was found in the namespace
            while ($index >= 0)
            {
                // Get the parent namespace preceding the dot operator
                var $parent = $namespace.substr(0, $index);

                // If a parent namespace was resolved, resolve the reference relative to the parent namespace
                if ($parent)
                    $reference = $this[$parent + '.' + $handle];

                // If a reference was resolved, return the reference
                if ($reference)
                    return $reference;

                // Get the index of the previous dot operator in the namespace
                $index = $namespace.lastIndexOf('.', $index - 1);
            }
        }

        // Return the resolved global reference
        return $this[$handle] || null;
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
    var $_symbol_base      = $_symbol(),
        $_symbol_class     = $_symbol(),
        $_symbol_handle    = $_symbol(),
        $_symbol_instance  = $_symbol(),
        $_symbol_items     = $_symbol(),
        $_symbol_keywords  = $_symbol(),
        $_symbol_name      = $_symbol(),
        $_symbol_namespace = $_symbol(),
        $_symbol_type      = $_symbol();

    // ########## WRAPPERS ##########

    // ---------- NAMESPACE ----------

    // Create the namespace wrapper function
    var $$ = function()
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
        /// <signature>
        ///   <summary>Compiles a jTypes namespace.</summary>
        ///   <param name="constructor" type="Function">A constructor for the namespace.</param>
        ///   <returns type="Object">A compiled jTypes namespace.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes namespace.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the namespace.</param>
        ///   <param name="constructor" type="Function">A constructor for the namespace.</param>
        ///   <returns type="Object">A compiled jTypes namespace.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes namespace.</summary>
        ///   <param name="dependencies" type="Array">An array of dependency directives for the namespace.</param>
        ///   <param name="constructor" type="Function">A constructor for the namespace.</param>
        ///   <returns type="Object">A compiled jTypes namespace.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Compiles a jTypes namespace.</summary>
        ///   <param name="modifiers" type="String">A space-separated string of modifiers for the namespace.</param>
        ///   <param name="dependencies" type="Array">An array of dependency directives for the namespace.</param>
        ///   <param name="constructor" type="Function">A constructor for the namespace.</param>
        ///   <returns type="Object">A compiled jTypes namespace.</returns>
        /// </signature>

        // Create the initial arguments
        var $argument     = 0,
            $base         = null,
            $constructor  = arguments[$argument++],
            $dependencies = null,
            $modifiers    = '',
            $prototype    = null;

        // If the constructor is not a simple object
        if ($constructor == null || typeof $constructor != 'object' || Object.getPrototypeOf($constructor) !== Object.prototype)
        {
            // Get the prototype
            $prototype = arguments[$argument++];

            // If the constructor is not a function
            if (typeof $constructor != 'function')
            {
                // If the constructor is not a string
                if (typeof $constructor != 'string')
                {
                    // If the constructor is not an array, return
                    if (!Array.isArray($constructor))
                        return;

                    // Use the first argument as the dependencies array
                    $dependencies = $constructor;
                }
                // Use the first argument as the modifiers string
                else
                    $modifiers = $constructor;

                // If the prototype is an array
                if (Array.isArray($prototype))
                {
                    // If a dependencies array was already provided, return
                    if ($dependencies)
                        return;

                    // Use the second argument as the dependencies array
                    $dependencies = $prototype;
                    $constructor  = arguments[$argument++];
                }
                // If the prototype is a class
                else if (typeof $prototype == 'function' && $prototype[$_symbol_class] === $prototype)
                {
                    // Use the second argument as the base class
                    $base        = $prototype;
                    $constructor = arguments[$argument++];
                }
                // Use the second argument as the constructor
                else
                    $constructor = $prototype;

                // If the constructor is a function and not a class
                if (typeof $constructor == 'function' && $constructor[$_symbol_class] !== $constructor)
                {
                    // If a base class was not provided and there are no more arguments, return the compiled namespace object
                    if (!$base && $argument == arguments.length)
                        return $_compile($modifiers, $dependencies, $constructor);

                    // Use the fourth argument as the prototype
                    $prototype = arguments[$argument++];
                }
                else
                {
                    // Use the third argument as the prototype
                    $prototype   = $constructor;
                    $constructor = null;
                }
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
            // If a prototype argument was not provided, return the compiled namespace object
            else if ($argument - 1 == arguments.length)
                return $_compile($modifiers, $dependencies, $constructor);

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
        var $baseHandle = '',
            $className  = '',
            $keywords   = [];

        // If a modifiers string was provided
        if ($modifiers)
        {
            // Get the index of the extends character
            var $extends = $modifiers.indexOf(':');

            // If a base class was not provided and the modifiers string has the extends character
            if (!$base && $extends >= 0)
            {
                // Get the base class handle and modifiers string
                $baseHandle = $modifiers.substr($extends + 1).trim();
                $modifiers  = $modifiers.substr(0, $extends).trim();

                // If the base class handle is a valid class handle, resolve the base class
                if ($_handle($baseHandle))
                    $base = $_resolve($baseHandle, $_classes, $_namespace, $_aliases, $_includes);

                // Set the base class handle
                $baseHandle = $base ?
                              $base[$_symbol_handle] :
                              '';
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
            // If a base class handle was not found, get the base class handle
            if (!$baseHandle)
                $baseHandle = $base[$_symbol_handle];

            // If the class has the struct modifier or the base class has the sealed modifier
            if ($struct || $base[$_symbol_keywords].indexOf('sealed') >= 0)
            {
                // Reset the base class
                $base       = null;
                $baseHandle = '';
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

        // If a class name was provided
        if ($className)
        {
            // Set the class in the namespace
            $_data($_namespace ?
                   $_namespaces[$_namespace] :
                   $$,
                   $className,
                   $class);

            // Create a custom toString() function for the prototype
            $class.prototype.toString = function()
            {
                // Return the instance object string
                return '[object ' + $className + ']';
            };
        }
        // Generate a random internal class name
        else
            $className = $_symbol();

        // Create the class handle
        var $classHandle = $_namespace ?
                           $_namespace + '.' + $className :
                           $className;

        // Cache the class
        $_classes[$classHandle] = $class;

        // If a constructor was provided, set it in the constructors object
        if ($constructor)
            $_constructors[$classHandle] = $constructor;

        // Create the items arrays
        var $itemsConstruct = [],
            $itemsPrivate   = [],
            $itemsProtected = [],
            $itemsPublic    = [],
            $itemsStatic    = [];

        // Cache the items arrays
        $_itemsConstruct[$classHandle] = $itemsConstruct;
        $_itemsPrivate  [$classHandle] = $itemsPrivate;
        $_itemsProtected[$classHandle] = $itemsProtected;
        $_itemsPublic   [$classHandle] = $itemsPublic;
        $_itemsStatic   [$classHandle] = $itemsStatic;

        // If a constructor was provided, redirect the class definition to the constructor
        if ($constructor)
            intellisense.redirectDefinition($class, $constructor);

        // Create the class prototype
        $class.prototype = Object.create($base ?
                                         $base.prototype :
                                         $_prototype);

        // Create the class type reference
        var $classType = !$internal ?
                         $class :
                         $base ?
                         $base[$_symbol_type] :
                         null;

        // Set the class type and hidden data on the class
        $_data($class, $_symbol_base,      $base);
        $_data($class, $_symbol_class,     $class);
        $_data($class, $_symbol_handle,    $classHandle);
        $_data($class, $_symbol_items,     $itemsStatic);
        $_data($class, $_symbol_keywords,  $keywords);
        $_data($class, $_symbol_name,      $className);
        $_data($class, $_symbol_namespace, $_namespace || '');
        $_data($class, $_symbol_type,      $classType);

        // Create the construct, private, protected, and public contexts
        var $thisConstruct = Object.create($class.prototype),
            $thisPrivate   = Object.create($class.prototype),
            $thisProtected = Object.create($class.prototype),
            $thisPublic    = Object.create($class.prototype);

        // If a constructor was provided, redirect the constructor context to the construct context
        if ($constructor)
            intellisense.setCallContext($constructor, { 'thisArg': $thisConstruct });

        // Cache the context objects
        $_thisConstruct[$classHandle] = $thisConstruct;
        $_thisPrivate  [$classHandle] = $thisPrivate;
        $_thisProtected[$classHandle] = $thisProtected;
        $_thisPublic   [$classHandle] = $thisPublic;

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
            // If the value is undefined, return
            if ($value === undefined)
                return;

            // Trim the key
            $key = $key.trim();

            // Check if the definition is an auto property, create the keywords array, and get member name
            var $auto       = Array.isArray($value) && $value.length > 1,
                $constraint = undefined,
                $index      = $key.lastIndexOf(' '),
                $keywords   = $index >= 0 ?
                              $key.substr(0, $index).trim().split(' ') :
                              [],
                $name       = $index >= 0 ?
                              $key.substr($index + 1) :
                              $key,
                $type       = 'field';

            // If the value is a function, set the type as a method
            if (typeof $value == 'function')
                $type = 'method';
            // If the definition an auto property or the value is a simple object, set the type as a property
            else if ($auto || $value != null && typeof $value == 'object' && Object.getPrototypeOf($value) === Object.prototype)
                $type = 'property';

            // If the definition is abstract
            if ($keywords.indexOf('abstract') >= 0)
            {
                // If the value is an array
                if (Array.isArray($value))
                {
                    // Create the value object
                    var $object = {};

                    // Set the first method in the value object
                    $object[$value[0]] = null;

                    // If a second method was provided, set it in the value object
                    if ($value.length > 1)
                        $object[$value[1]] = null;

                    // Reset the auto flag and set the "property" type string along with the value as the value object
                    $auto  = false;
                    $type  = 'property';
                    $value = $object;
                }
                // If the value is null, set the type as a method
                else if ($value === null)
                    $type = 'method';
            }

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
                var $exec = /^(~|@)?([a-z]+(?:\-[a-z]+)?(?:[0-9]*\[\]))(\?|\!)?$/.exec($keywords[$keywords.length - 1]);

                // If the last keyword did not match a constraint string
                if (!$exec)
                {
                    // Parse the last keyword as a class constraint
                    $exec = /^(@)?((?:[_a-zA-Z][_a-zA-Z0-9]*::)?(?:[_a-zA-Z0-9.]+\.)?[A-Z][_a-zA-Z0-9]*)(\?|!)?$/.exec($keywords[$keywords.length - 1]);

                    // If the last keyword matched a class constraint string and is a valid handle, resolve the constraint from the public contexts object
                    if ($exec && $_handle($exec[2]))
                        $constraint = $_resolve($exec[2], $_thisPublic, $_namespace, $_aliases, $_includes);

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

            // If the class is not a class or the instance is not an instance, return null
            if (!$class || $class[$_symbol_class] !== $class || !this || this[$_symbol_instance] !== this)
                return null;

            // Get the class handle
            var $handle = $class[$_symbol_handle];

            // If the instance is an instance of the class, return the public instance of the class
            if (this[$_symbol_type] === $_classes[$handle])
                return $_thisPublic[$handle];

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
            return $class && $class[$_symbol_class] === $class && this && this[$_symbol_instance] === this && this[$_symbol_type] === $_classes[$class[$_symbol_handle]];
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
            $itemSelf     = $_item('__self', 'reserved', $struct ? $thisPublic : $self),
            $itemThis     = $_item('__this', 'reserved', $thisPublic),
            $itemExternal = $_item('__type', 'reserved', !$internal ? $class : null, $typeGlyph),
            $itemInternal = $_item('__type', 'reserved', $class, $typeGlyph);

        // Push the external, internal, public, and self reference items into the items arrays
        $itemsConstruct.push($itemSelf);
        $itemsConstruct.push($itemThis);
        $itemsConstruct.push($itemInternal);
        $itemsPrivate  .push($itemSelf);
        $itemsPrivate  .push($itemThis);
        $itemsPrivate  .push($itemInternal);
        $itemsPublic   .push($itemSelf);
        $itemsPublic   .push($itemExternal);

        // If the class is not a struct, push the data item into the construct items array
        if (!$struct)
            $itemsConstruct.push($itemData);

        // Create the data, external, internal, self reference, and public descriptors
        var $descriptorData     = { 'value': $itemData    .value },
            $descriptorExternal = { 'value': $itemExternal.value },
            $descriptorInternal = { 'value': $itemInternal.value },
            $descriptorSelf     = { 'value': $itemSelf    .value },
            $descriptorThis     = { 'value': $itemThis    .value };

        // Set the self reference, public, internal, and external descriptors on the contexts
        Object.defineProperty($thisConstruct, '__self', $descriptorSelf);
        Object.defineProperty($thisPrivate,   '__self', $descriptorSelf);
        Object.defineProperty($thisPublic,    '__self', $descriptorSelf);
        Object.defineProperty($thisConstruct, '__this', $descriptorThis);
        Object.defineProperty($thisPrivate,   '__this', $descriptorThis);
        Object.defineProperty($thisPublic,    '__this', $descriptorThis);
        Object.defineProperty($thisConstruct, '__type', $descriptorInternal);
        Object.defineProperty($thisPrivate,   '__type', $descriptorInternal);
        Object.defineProperty($thisPublic,    '__type', $descriptorExternal);

        // If the class is not a struct, set the data descriptor on the construct context
        if (!$struct)
            Object.defineProperty($thisConstruct, '__data', $descriptorData);

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
            var $baseConstructor   = $_constructors [$baseHandle],
                $baseThisProtected = $_thisProtected[$baseHandle];

            // If a constructor was not provided, set the base constructor in the constructors object
            if (!$constructor)
                $_constructors[$classHandle] = $baseConstructor || null;

            // Create the base constructor wrapper reference
            var $baseConstructorWrapper = null;

            // If a base constructor was provided
            if ($baseConstructor)
            {
                // Create the base constructor wrapper
                $baseConstructorWrapper = function()
                {
                    // Return the return value of applying the base constructor in the base construct context with the provided arguments
                    return $baseConstructor.apply($_thisConstruct[$baseHandle], arguments);
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
            $_constructors[$classHandle] = null;

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
            var $inheritProtected = $_itemsProtected[$baseHandle],
                $inheritPublic    = $_itemsPublic   [$baseHandle];

            // Loop through the protected inherited items
            for (var $i = 0, $j = $inheritProtected.length; $i < $j; $i++)
            {
                // Get the inherited protected item and its name
                var $item     = $inheritProtected[$i],
                    $itemName = $item.name;

                // If the name is reserved, continue
                if ($itemName == 'as' || ($model || $struct) && ($itemName == 'clone' || $itemName == 'equals') || $itemName == 'is' || $itemName == 'type' || $itemName == '__base' || $itemName == '__data' || $itemName == '__self' || $itemName == '__this' || $itemName == '__type')
                    continue;

                // If the inherited protected item is already defined, continue
                if (Object.prototype.hasOwnProperty.call($thisProtected, $itemName))
                    continue;

                // Define the inherited protected definition
                $defineProtected($itemName, $item.kind, $item.value, $item.descriptor, $item.glyph);
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
                $definePublic($itemName, $item.kind, $item.value, $item.descriptor, $item.glyph);
            }
        }

        // Return the class
        return $class;
    };

    // ---------- EXPORTS ----------

    // Define the exported constants
    $$.__class  = $_class;
    $$.__proto  = $_prototype;
    $$.dateMax  = jTypes.dateMax;
    $$.dateMin  = jTypes.dateMin;
    $$.dev      = jTypes.dev;
    $$.epsilon  = jTypes.epsilon;
    $$.intMax   = jTypes.intMax;
    $$.intMin   = jTypes.intMin;
    $$.max      = jTypes.max;
    $$.min      = jTypes.min;
    $$.storage  = jTypes.storage;
    $$.support  = jTypes.support;
    $$.toString = jTypes.toString;
    $$.version  = jTypes.version;

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
        /// <field type="Boolean">Indicates whether or not jTypes is in development mode.</field>
        'dev': jTypes.dev,
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
        /// <field type="Object">An object containing flags indicating which JavaScript storage features are supported.</field>
        'storage': jTypes.storage,
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
        ///   <returns type="Boolean">true if object is an array; otherwise false.</returns>
        /// </signature>

        return jTypes.isArray.apply(jTypes, arguments);
    };
    $$.isBool      = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a boolean using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a boolean.</param>
        ///   <returns type="Boolean">true if object is a boolean; otherwise false.</returns>
        /// </signature>

        return jTypes.isBool.apply(jTypes, arguments);
    };
    $$.isBoolean   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a boolean using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a boolean.</param>
        ///   <returns type="Boolean">true if object is a boolean; otherwise false.</returns>
        /// </signature>

        return jTypes.isBoolean.apply(jTypes, arguments);
    };
    $$.isClass     = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class
        return $object && $object[$_symbol_class] === $object;
    };
    $$.isDate      = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a date using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a date.</param>
        ///   <returns type="Boolean">true if object is a date; otherwise false.</returns>
        /// </signature>

        return jTypes.isDate.apply(jTypes, arguments);
    };
    $$.isError     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an error using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an error.</param>
        ///   <returns type="Boolean">true if object is an error; otherwise false.</returns>
        /// </signature>

        return jTypes.isError.apply(jTypes, arguments);
    };
    $$.isFinite    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a finite value.</summary>
        ///   <param name="value" type="Number">A value to test if it is finite.</param>
        ///   <returns type="Boolean">true if value is a finite number; otherwise false.</returns>
        /// </signature>

        return jTypes.isFinite.apply(jTypes, arguments);
    };
    $$.isFloat     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a number using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a number.</param>
        ///   <returns type="Boolean">true if object is a number; otherwise false.</returns>
        /// </signature>

        return jTypes.isFloat.apply(jTypes, arguments);
    };
    $$.isFunction  = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a function using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a function.</param>
        ///   <returns type="Boolean">true if object is a function; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a function and not a class
        return typeof $object == 'function' && $object[$_symbol_class] !== $object;
    };
    $$.isInstance  = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes instance.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes instance.</param>
        ///   <returns type="Boolean">true if object is a jTypes instance; otherwise false.</returns>
        /// </signature>

        // Return true if the object is an instance
        return $object && $object[$_symbol_instance] === $object;
    };
    $$.isInt       = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an integer value.</summary>
        ///   <param name="value" type="Number">A value to test if it is an integer.</param>
        ///   <returns type="Boolean">true if value is a finite number that is a representable integer in JavaScript; otherwise false.</returns>
        /// </signature>

        return jTypes.isInt.apply(jTypes, arguments);
    };
    $$.isInteger   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an integer value.</summary>
        ///   <param name="value" type="Number">A value to test if it is an integer.</param>
        ///   <returns type="Boolean">true if value is a finite number that is a representable integer in JavaScript; otherwise false.</returns>
        /// </signature>

        return jTypes.isInteger.apply(jTypes, arguments);
    };
    $$.isNumber    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a number using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a number.</param>
        ///   <returns type="Boolean">true if object is a number; otherwise false.</returns>
        /// </signature>

        return jTypes.isNumber.apply(jTypes, arguments);
    };
    $$.isPrimitive = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a JavaScript primitive.</summary>
        ///   <param name="object" type="Object">An object to test if it is a JavaScript primitive.</param>
        ///   <returns type="Boolean">true if object is either null or has a typeof in the following collection: boolean, number, string, undefined; otherwise false.</returns>
        /// </signature>

        return jTypes.isPrimitive.apply(jTypes, arguments);
    };
    $$.isRegExp    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a regular expression using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a regular expression.</param>
        ///   <returns type="Boolean">true if object is a regular expression; otherwise false.</returns>
        /// </signature>

        return jTypes.isRegExp.apply(jTypes, arguments);
    };
    $$.isString    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a string using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a string.</param>
        ///   <returns type="Boolean">true if object is a string; otherwise false.</returns>
        /// </signature>

        return jTypes.isString.apply(jTypes, arguments);
    };
    $$.isSymbol    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a symbol using the internal [[Class]] property of the object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a symbol.</param>
        ///   <returns type="Boolean">true if object is a symbol; otherwise false.</returns>
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
        ///   <returns type="Boolean">true if object is a jTypes class with the abstract modifier; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class and the abstract keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('abstract') >= 0;
    };
    $$.isArgumentsObject  = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an arguments object passed to a function.</summary>
        ///   <param name="object" type="Object">An object to test if it is an arguments object passed to a function.</param>
        ///   <returns type="Boolean">true if object is an arguments object passed to a function; otherwise false.</returns>
        /// </signature>

        return jTypes.isArgumentsObject.apply(jTypes, arguments);
    };
    $$.isArrayLikeObject  = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an array-like object.</summary>
        ///   <param name="object" type="Object">An object to test if it is an array-like object.</param>
        ///   <returns type="Boolean">true if object has a length property that is a finite integer greater than or equal to zero; otherwise false.</returns>
        /// </signature>

        return jTypes.isArrayLikeObject.apply(jTypes, arguments);
    };
    $$.isCallableType     = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "callable-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "callable-type" object.</param>
        ///   <returns type="Boolean">true if object is a type of either class or function; otherwise false.</returns>
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
        ///   <returns type="Boolean">true if object is an object and does not have Object.prototype as its prototype; otherwise false.</returns>
        /// </signature>

        return jTypes.isComplexObject.apply(jTypes, arguments);
    };
    $$.isExpandoClass     = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes expando class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes expando class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the expando modifier; otherwise false.</returns>
        /// </signature>

        return false;
    };
    $$.isFlatObject       = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a flat object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a flat object.</param>
        ///   <returns type="Boolean">true if object is an object and has a null prototype; otherwise false.</returns>
        /// </signature>

        return jTypes.isFlatObject.apply(jTypes, arguments);
    };
    $$.isImportedClass    = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes imported class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes imported class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class that was compiled using a precompiled modifiers string; otherwise false.</returns>
        /// </signature>

        return false;
    };
    $$.isInfinity         = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an infinite value.</summary>
        ///   <param name="value" type="Number">A value to test if it is infinite.</param>
        ///   <returns type="Boolean">true if value is an infinite number; otherwise false.</returns>
        /// </signature>

        return jTypes.isInfinity.apply(jTypes, arguments);
    };
    $$.isInternalClass    = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes internal class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes internal class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the internal modifier; otherwise false./returns>
        /// </signature>

        // Return true if the object is a class and the internal keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('internal') >= 0;
    };
    $$.isModel            = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes model.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes model.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the model modifier; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class and the model keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('model') >= 0;
    };
    $$.isNaN              = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has an undefined value.</summary>
        ///   <param name="value" type="Number">A value to test if it is an undefined value.</param>
        ///   <returns type="Boolean">true if value is not-a-number; otherwise false.</returns>
        /// </signature>

        return jTypes.isNaN.apply(jTypes, arguments);
    };
    $$.isNegativeInfinity = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a value of negative infinity.</summary>
        ///   <param name="value" type="Number">A value to test if it is negative infinity.</param>
        ///   <returns type="Boolean">true if value is negative infinity; otherwise false.</returns>
        /// </signature>

        return jTypes.isNegativeInfinity.apply(jTypes, arguments);
    };
    $$.isNull             = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is a null reference.</summary>
        ///   <param name="reference">A reference to test if it is a null reference.</param>
        ///   <returns type="Boolean">true if reference is a null reference; otherwise false.</returns>
        /// </signature>

        return jTypes.isNull.apply(jTypes, arguments);
    };
    $$.isObject           = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is an object.</summary>
        ///   <param name="reference" type="Object">A reference to test if it is an object.</param>
        ///   <returns type="Boolean">true if reference is neither null nor undefined; otherwise false.</returns>
        /// </signature>

        return jTypes.isObject.apply(jTypes, arguments);
    };
    $$.isObjectInstance   = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is an object instance.</summary>
        ///   <param name="object" type="Object">An object to test if it is an object instance.</param>
        ///   <returns type="Boolean">true if object is an instance of Object; otherwise false.</returns>
        /// </signature>

        return jTypes.isObjectInstance.apply(jTypes, arguments);
    };
    $$.isOptimizedClass   = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes optimized class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes optimized class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the optimized modifier; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class and the optimized keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('optimized') >= 0;
    };
    $$.isPositiveInfinity = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a number has a value of positive infinity.</summary>
        ///   <param name="value" type="Number">A value to test if it is positive infinity.</param>
        ///   <returns type="Boolean">true if value is positive infinity; otherwise false.</returns>
        /// </signature>

        return jTypes.isPositiveInfinity.apply(jTypes, arguments);
    };
    $$.isPrimitiveClass   = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes primitive class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes primitive class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the primitive modifier; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class and the primitive keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('primitive') >= 0;
    };
    $$.isPrimitiveType    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "primitive-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "primitive-type" object.</param>
        ///   <returns type="Boolean">true if object is a type from the following collection: boolean, null, number, string, undefined; otherwise false.</returns>
        /// </signature>

        return jTypes.isPrimitiveType.apply(jTypes, arguments);
    };
    $$.isReferenceType    = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "reference-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "reference-type" object.</param>
        ///   <returns type="Boolean">true if object is not a type from the following collection: boolean, null, number, string, undefined; otherwise false.</returns>
        /// </signature>

        return jTypes.isReferenceType.apply(jTypes, arguments);
    };
    $$.isSealedClass      = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes sealed class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes sealed class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the sealed modifier; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class and the sealed keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('sealed') >= 0;
    };
    $$.isSimpleObject     = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a simple object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a simple object.</param>
        ///   <returns type="Boolean">true if object is an object and has Object.prototype as its prototype; otherwise false.</returns>
        /// </signature>

        return jTypes.isSimpleObject.apply(jTypes, arguments);
    };
    $$.isStruct           = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes struct.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes struct.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the struct modifier; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class and the struct keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('struct') >= 0;
    };
    $$.isUndefined        = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not a reference is an undefined reference.</summary>
        ///   <param name="reference">A reference to test if it is an undefined reference.</param>
        ///   <returns type="Boolean">true if reference is an undefined reference; otherwise false.</returns>
        /// </signature>

        return jTypes.isUndefined.apply(jTypes, arguments);
    };
    $$.isUnlockedClass    = function($object)
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a jTypes unlocked class.</summary>
        ///   <param name="object" type="Object">An object to test if it is a jTypes unlocked class.</param>
        ///   <returns type="Boolean">true if object is a jTypes class with the unlocked modifier; otherwise false.</returns>
        /// </signature>

        // Return true if the object is a class and the unlocked keyword is found in the class keywords
        return $$.isClass($object) && $object[$_symbol_keywords].indexOf('unlocked') >= 0;
    };
    $$.isValueType        = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a "value-type" object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a "value-type" object.</param>
        ///   <returns type="Boolean">true if object is a type from the following collection: boolean, number, string; otherwise false.</returns>
        /// </signature>

        return jTypes.isValueType.apply(jTypes, arguments);
    };
    $$.isWindow           = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a global window object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a global window object.</param>
        ///   <returns type="Boolean">true if object is a global window object; otherwise false.</returns>
        /// </signature>

        return jTypes.isWindow.apply(jTypes, arguments);
    };
    $$.isWindowLikeObject = function()
    {
        /// <signature>
        ///   <summary>Indicates whether or not an object is a window-like object.</summary>
        ///   <param name="object" type="Object">An object to test if it is a window-like object.</param>
        ///   <returns type="Boolean">true if object has a window property that is a self reference; otherwise false.</returns>
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
    $$.build    = function($class)
    {
        /// <signature>
        ///   <summary>Builds a jTypes class.</summary>
        ///   <param name="class" type="Class">A class to build.</param>
        ///   <returns type="Boolean">true if the class was built; otherwise false.</returns>
        /// </signature>
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
    $_accessor($$, 'cache',  function()
    {
        // Return the cache flag
        return jTypes.cache;
    }, function($v)
    {
        // Set the cache flag
        jTypes.cache = $v;
    }, true);
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
        /// <field type="String">Indicates whether or not caching is enabled.</field>
        'cache': jTypes.cache,
        /// <field type="Boolean">Indicates whether or not debugging is enabled.</field>
        'debug': jTypes.debug,
        /// <field type="Boolean">Indicates whether or not strict mode is enabled.</field>
        'strict': jTypes.strict
    });

    // ########## CONSTRAINTS ##########

    // Set the constraint values for each constraint type in the constraints object
    $_constraints['array']     = Object.freeze(new Array());
    $_constraints['bool']      = false;
    $_constraints['boolean']   = false;
    $_constraints['date']      = Object.freeze(new Date(NaN));
    $_constraints['element']   = Object.freeze(Object.create(HTMLElement.prototype));
    $_constraints['error']     = Object.freeze(new Error());
    $_constraints['float']     = NaN;
    $_constraints['function']  = Object.freeze(new Function());
    $_constraints['int']       = 0;
    $_constraints['integer']   = 0;
    $_constraints['number']    = NaN;
    $_constraints['object']    = Object.freeze(new Object());
    $_constraints['primitive'] = null;
    $_constraints['regexp']    = Object.freeze(new RegExp());
    $_constraints['string']    = '';
    $_constraints['type']      = Object.freeze($$({}));
    $_constraints['window']    = window;

    // If symbols are supported, set the symbol constraint value in the constraints object
    if (typeof Symbol == 'function')
        $_constraints['symbol'] = Symbol();

    // If jQuery is supported, set the jquery constraint value in the constraints object
    if (typeof jQuery == 'function')
        $_constraints['jquery'] = Object.freeze(jQuery());

    // If typed arrays are supported
    if (typeof ArrayBuffer == 'function')
    {
        // Set the typed arrays constraint values in the constraints object
        $_constraints['float32[]'] = Object.freeze(new Float32Array(0));
        $_constraints['float64[]'] = Object.freeze(new Float64Array(0));
        $_constraints['uint32[]']  = Object.freeze(new Uint32Array(0));
        $_constraints['int32[]']   = Object.freeze(new Int32Array(0));
        $_constraints['uint16[]']  = Object.freeze(new Uint16Array(0));
        $_constraints['int16[]']   = Object.freeze(new Int16Array(0));
        $_constraints['uint8[]']   = Object.freeze(new Uint8Array(0));
        $_constraints['int8[]']    = Object.freeze(new Int8Array(0));
    }

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

    // If the global shorthand flag is set, define the shorthand
    if (typeof jT_Shorthand != 'boolean' || jT_Shorthand)
        $_data(window, typeof jT_Shorthand == 'string' ? jT_Shorthand : '$$', $$, true);

    // Define the global namespace
    $_data(window, 'jTypes', $$, true);

    // Return the global namespace
    return $$;
})(window, window.jTypes);