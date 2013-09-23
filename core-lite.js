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
(function(window, undefined)
{
    // ########## STRICT ##########

    // Enable strict mode
    'use strict';

    // ########## BUILD ##########

    // Create the build version
    var $_version = '1.0.0a274';

    // ########## LANGUAGE ##########

    // Create the compatibility exception message, arguments exception format string, and the exception prefix constants
    var $_lang_compatibility       = 'A browser that supports JavaScript 1.8.5 (MSIE 9+) is required.';
    var $_lang_exception_arguments = '"{0}({1})" has some invalid arguments.';
    var $_lang_exception_prefix    = 'jTypes Error: ';

    // ########## NATIVE CODE ##########

    // ---------- OBJECT ----------
    var $__object                   = Object;
    var $__objectProto__            = $__object.prototype;
    var $__create                   = $__object.create;
    var $__defineProperties         = $__object.defineProperties;
    var $__defineProperty           = $__object.defineProperty;
    var $__freeze                   = $__object.freeze;
    var $__getOwnPropertyDescriptor = $__object.getOwnPropertyDescriptor;
    var $__getOwnPropertyNames      = $__object.getOwnPropertyNames;
    var $__getPrototypeOf           = $__object.getPrototypeOf;
    var $__isExtensible             = $__object.isExtensible;
    var $__isFrozen                 = $__object.isFrozen;
    var $__isSealed                 = $__object.isSealed;
    var $__keys                     = $__object.keys;
    var $__preventExtensions        = $__object.preventExtensions;
    var $__propertyIsEnumerable     = $__object.propertyIsEnumerable;
    var $__seal                     = $__object.seal;
    var $__setPrototypeOf           = $__object.setPrototypeOf || null;
    var $__hasOwnProperty__         = $__objectProto__.hasOwnProperty;
    var $__isPrototypeOf__          = $__objectProto__.isPrototypeOf;
    var $__toString__               = $__objectProto__.toString;
    var $__valueOf__                = $__objectProto__.valueOf;

    // ---------- ARRAY ----------
    var $__array               = Array;
    var $__arrayProto__        = $__array.prototype;
    var $__array_isArray       = $__array.isArray;
    var $__array_every__       = $__arrayProto__.every;
    var $__array_filter__      = $__arrayProto__.filter;
    var $__array_forEach__     = $__arrayProto__.forEach;
    var $__array_indexOf__     = $__arrayProto__.indexOf;
    var $__array_lastIndexOf__ = $__arrayProto__.lastIndexOf;
    var $__array_map__         = $__arrayProto__.map;
    var $__array_reduce__      = $__arrayProto__.reduce;
    var $__array_reduceRight__ = $__arrayProto__.reduceRight;
    var $__array_some__        = $__arrayProto__.some;
    var $__array_toString__    = $__arrayProto__.toString;

    // ---------- BOOLEAN ----------
    var $__boolean            = Boolean;
    var $__booleanProto__     = $__boolean.prototype;
    var $__boolean_toString__ = $__booleanProto__.toString;
    var $__boolean_valueOf__  = $__booleanProto__.valueOf;

    // ---------- DATE ----------
    var $__date            = Date;
    var $__dateProto__     = $__date.prototype;
    var $__date_toString__ = $__dateProto__.toString;
    var $__date_valueOf__  = $__dateProto__.valueOf;

    // ---------- ERROR ----------
    var $__error            = Error;
    var $__errorProto__     = $__error.prototype;
    var $__error_toString__ = $__errorProto__.toString;
    var $__error_valueOf__  = $__errorProto__.valueOf;

    // ---------- FUNCTION ----------
    var $__function            = Function;
    var $__functionProto__     = $__function.prototype;
    var $__function_apply__    = $__functionProto__.apply;
    var $__function_call__     = $__functionProto__.call;
    var $__function_toString__ = $__functionProto__.toString;
    var $__function_valueOf__  = $__functionProto__.valueOf;

    // ---------- NUMBER ----------
    var $__number            = Number;
    var $__numberProto__     = $__number.prototype;
    var $__number_toString__ = $__numberProto__.toString;
    var $__number_valueOf__  = $__numberProto__.valueOf;
    
    // Get the number constants as number primitives
    var $__number_maxValue__         = $__number_valueOf__.call($__number.MAX_VALUE);
    var $__number_minValue__         = $__number_valueOf__.call($__number.MIN_VALUE);
    var $__number_negativeInfinity__ = $__number_valueOf__.call($__number.NEGATIVE_INFINITY);
    var $__number_positiveInfinity__ = $__number_valueOf__.call($__number.POSITIVE_INFINITY);

    // Get the global NaN constant as a number primitive
    var $__NaN__ = $__number_valueOf__.call(NaN);

    // ---------- REGEXP ----------
    var $__regexp            =  RegExp;
    var $__regexpProto__     = $__regexp.prototype;
    var $__regexp_toString__ = $__regexpProto__.toString;
    var $__regexp_valueOf__  = $__regexpProto__.valueOf;

    // ---------- STRING ----------
    var $__string            = String;
    var $__stringProto__     = $__string.prototype;
    var $__string_match__    = $__stringProto__.match;
    var $__string_replace__  = $__stringProto__.replace;
    var $__string_toString__ = $__stringProto__.toString;
    var $__string_trim__     = $__stringProto__.trim;
    var $__string_valueOf__  = $__stringProto__.valueOf;

    // ---------- WINDOW ----------
    var $__window            = null;
    var $__windowProto__     = null;
    var $__window_toString__ = null;
    var $__window_valueOf__  = null;

    // If a window constructor is defined
    if (typeof Window !== 'undefined' && typeof Window.prototype !== 'undefined')
    {
        // Create the window references
        $__window            = Window;
        $__windowProto__     = $__window.prototype;
        $__window_toString__ = $__windowProto__.toString;
        $__window_valueOf__  = $__windowProto__.valueOf;
    }
    
    // If any of the major native code methods from recent JavaScript versions are not found, throw an exception
    if (!$__create || !$__defineProperty || !$__freeze || !$__getPrototypeOf || !$__preventExtensions || !$__seal || !$__array_forEach__ || !$__array_indexOf__ || !$__string_trim__)
        throw $_lang_exception_prefix + $_lang_compatibility;

    // ########## NAMESPACE ##########

    // Create the global namespace
    var $$ = null;

    // ########## EXCEPTIONS ##########

    // Create the exception helpers
    var $_exceptionArguments = function($name, $arguments)
    {
        // If a name was provided, prepend "$$." to the name for reference
        if ($name)
            $name = '$$.' + $name;
        // Set the namespace function as throwing the exception instead
        else
            $name = '$$';

        // Create the types array
        var $types = new $__array($arguments.length);

        // Set the argument types in the types array
        for (var $i = 0, $j = $types.length; $i < $j; $i++)
            $types[$i] = $$.type($arguments[$i]);

        // Return the formatted arguments exception string
        return $_lang_exception_prefix + $$.format($_lang_exception_arguments, $name, $types.join(', '));
    };
    var $_exceptionFormat    = function($message)
    {
        // Return the prefixed formatted exception string with the given arguments
        return $_lang_exception_prefix + $$.format.apply($$, arguments);
    };

    // ########## DEFINES ##########

    // Create the define helpers
    var $_defineField    = function($name, $field, $writable)
    {
        // Define an enumerable field on the global namespace object
        return $__defineProperty($$, $name,
        {
            'configurable': false,
            'enumerable':   true,
            'value':        $field,
            'writable':     !!$writable
        });
    };
    var $_defineMethod   = function($name, $method)
    {
        // If the name contains a space
        if ($name.indexOf(' ') >= 0)
        {
            // Create the method names array
            var $names = $name.split(' ') || '';

            // Define each method in the method names array
            for (var $i = 0, $j = $names.length; $i < $j; $i++)
                $_defineMethod($names[$i], $method);
        }
        // Define a non-enumerable method on the global namespace object
        else
            $__defineProperty($$, $name,
            {
                'configurable': false,
                'enumerable':   true,
                'value':        $method,
                'writable':     false
            });
    };
    var $_defineProperty = function($name, $getMethod, $setMethod)
    {
        // If the name contains a space
        if ($name.indexOf(' ') >= 0)
        {
            // Create the property names array
            var $names = $name.split(' ') || '';

            // Define each property in the property names array
            for (var $i = 0, $j = $names.length; $i < $j; $i++)
                $_defineProperty($names[$i], $getMethod, $setMethod);
        }
        // Define a non-enumerable method on the global namespace object
        else
            $__defineProperty($$, $name,
            {
                'configurable': false,
                'enumerable':   true,
                'get':          $getMethod || undefined,
                'set':          $setMethod || undefined
            });
    };

    // ########## LOCKS ##########

    // Create the internal lock reference
    var $_lock = {};

    // ##########################
    // ########## CORE ##########
    // ##########################

    // ########## CONSTANTS ##########
    
    // Create the internal constants
    var $_const_int_max = 9007199254740992;
    var $_const_int_min = -$_const_int_max;
    var $_const_symbol  = '~jT';

    // ########## KEYS ##########

    // Create the characters string and keys array
    var $_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var $_keys       = [];

    // Append the lowercase characters to the characters string
    $_characters += $_characters.toLowerCase();

    // Create the key generator helper
    var $_keyGenerator = function($length, $noTilde)
    {
        // If no length was provided, use a default length of three
        if (!$length)
            $length = 3;

        // Create the key reference
        var $key = null;

        do
        {
            // Reset the key
            $key = '';

            // Append random characters to the key
            for (var $i = 0, $j = $_characters.length; $i < $length; $i++)
                $key += $_characters.charAt(Math.floor($j * Math.random()));
        }
        // Continue if the key was already found in the keys array
        while ($__array_indexOf__.call($_keys, $key) >= 0);

        // Push the key into the keys array
        $_keys.push($key);

        // If the no tilde flag is set, return the key
        if ($noTilde)
            return $key;

        // Return the key with a tilde
        return '~' + $key;
    };

    // ---------- DEFINITION ----------

    // Create the definition obfuscated key hash flag, key hint, and length setting
    var $_definition_keyHash   = true;
    var $_definition_keyHint   = $_keyGenerator(3);
    var $_definition_keyLength = 3;

    // Create the definition obfuscated keys
    var $_definition_baseClass         = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~baseClass';
    var $_definition_construct         = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~construct';
    var $_definition_expando_class     = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoClass';
    var $_definition_expando_private   = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoPrivate';
    var $_definition_expando_prototype = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoPrototype';
    var $_definition_expando_public    = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoPublic';
    var $_definition_final             = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~final';
    var $_definition_internal          = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~internal';
    var $_definition_private           = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~private';
    var $_definition_protected         = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~protected';
    var $_definition_public            = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~public';
    
    // ---------- DEFINITION (MEMBER) ----------

    // Create the definition member flags
    var $_definition_member_name               = 0;
    var $_definition_member_value              = 1;
    var $_definition_member_type               = 2;
    var $_definition_member_field_readonly     = 3;
    var $_definition_member_field_type         = 4;
    var $_definition_member_method_type        = 5;
    var $_definition_member_property_accessors = 6;

    // Create the definition member flags length
    var $_definition_member_flagCount = 7;

    // ---------- PACKAGES ----------

    // Create the member package key hint
    var $_package_keyHint = $_keyGenerator(3);

    // Create the member package flags
    var $_package_value     = 0;
    var $_package_modifiers = 1;
    var $_package_type      = 2;

    // Create the member package flags length
    var $_package_flagCount = 3;

    // ---------- ACCESSOR ----------

    // Create the accessor member flags
    var $_accessor_name      = 0;
    var $_accessor_value     = 1;
    var $_accessor_modifiers = 2;
    var $_accessor_private   = 3;
    var $_accessor_protected = 4;
    var $_accessor_public    = 5;

    // Create the accessor member flags length
    var $_accessor_flagCount = 6;

    // ########## CLASSES ##########

    // Create the base class of all classes and the base prototype of all class prototypes
    var $_class     = function()
    {
        //
    };
    var $_prototype = {};

    // Define the class and prototype "toString()" methods
    var $_class_toString     = function()
    {
        // Return a class type string
        return '[object Class]';
    };
    var $_prototype_toString = function()
    {
        // Return an instance type string
        return '[object Instance]';
    };

    // Define the "toString()" methods on the base class of all classes and the base prototype of all class prototypes
    $__defineProperty($_class, 'toString', { 'value': $_class_toString });
    $__defineProperty($_prototype, 'toString', { 'value': $_prototype_toString });

    // Set the base class of all classes prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
    $_class.prototype = $_prototype;

    // Set the base class of all classes prototype without the "writable" flag
    $__defineProperty($_class, 'prototype', { 'value': $_prototype, 'writable': false });

    // ########## FLAGS ##########

    // Create the internal flags
    var $_debug    = true;// DEFAULT
    var $_subclass = false;// DON'T CHANGE

    // ########## COMPILER ##########
    
    // Create the definitions compiler helper functions
    var $_definitionsCompilerLock = function($reference)
    {
        // Return the lock wrapper function
        return function()
        {
            // If this function was internally unlocked, return the reference
            if (this === $_lock)
                return $reference;
        };
    };

    // ########## RUNTIME ##########

    //

    // ########## NAMESPACE ##########

    // Create the compiler
    $$ = function()
    {
        //
    };

    // Define the compiler "toString()" method
    $_defineMethod('toString', function()
    {
        // Return the global namespace type string
        return '[object jTypes]';
    });

    // ########## DATA ##########

    // ---------- VERSION ----------
    $_defineField('version', $_version, false);

    // ---------- CLASS + PROTOTYPE ----------
    $_defineField('__class', $_class, false);
    $_defineField('__proto', $_prototype, false);

    // ---------- INTEGER MAX/MIN ----------
    $_defineField('intMax', $_const_int_max, false);
    $_defineField('intMin', $_const_int_min, false);

    // ########## PACKAGES ##########

    // Define the package methods for class members
    $__array_forEach__.call('private protected public static'.split(' '), function($modifier)
    {
        // Define the package method for the access modifier
        $_defineMethod($modifier, function($modifiers, $value)
        {
            // Create the member package
            var $package = new $__array($_package_flagCount);

            switch (arguments.length)
            {
                case 1:

                    // Set the member package data
                    $package[$_package_modifiers] = $modifier;
                    $package[$_package_value]     = $modifiers;

                    break;

                case 2:

                    // If the modifiers string is not a string, throw an exception
                    if (typeof $modifiers !== 'string')
                        throw $_exceptionArguments($modifier, arguments);

                    // Set the member package data
                    $package[$_package_modifiers] = $modifiers ? $modifier + ' ' + $modifiers : $modifier;
                    $package[$_package_value]     = $value;

                    break;

                default:

                    // Throw an exception
                    throw $_exceptionArguments($modifier, arguments);
            }

            // Lock the member package
            $package = $_definitionsCompilerLock($package);

            // Set the member package key hint
            $package[$_package_keyHint] = $package;

            // Return the member package
            return $package;
        });
    });

    // ########## TYPES ##########

    // Define the "type()" method and the "is()" methods for internal JavaScript types
    (function()
    {
        // Create the types lookup
        var $types = $__create(null);

        // Iterate the internal JavaScript types
        $__array_forEach__.call('Array Boolean Date Error Function Number RegExp String'.split(' '), function($type)
        {
            // Get the type keyword
            var $keyword = $type.toLowerCase();

            // Insert the keyword into the types lookup
            $types['[object ' + $type + ']'] = $keyword;

            // Define the "is()" method for the type
            $_defineMethod('is' + $type, function($object)
            {
                // Return true if the object matches the type
                return $$.type($object) === $keyword;
            });
        });

        // [object global]    => CHROME, OPERA
        // [object Window]    => FIREFOX, IE, SAFARI
        // [object DOMWindow] => (LEGACY)

        // Iterate the known aliases of the internal JavaScript window type
        $__array_forEach__.call('global Window DOMWindow'.split(' '), function($alias)
        {
            // Insert the window alias into the types lookup
            $types['[object ' + $alias + ']'] = 'window';
        });

        // Define the type method
        $_defineMethod('type', function($object)
        {
            // If the object is undefined, return the "undefined" type string
            if ($object === undefined)
                return 'undefined';

            // If the object is null, return the "null" type string
            if ($object === null)
                return 'null';

            // If the object is a function, return either the "class" or "function" type string
            if (typeof $object === 'function')
                return $object[$_definition_keyHint] === $object ? 'class': 'function';

            // If the object is the window object, return the "window" type string
            if ($object === window || $object.window === $object && !$__hasOwnProperty__.call($object, 'window') && $__getPrototypeOf($object) === null)
                return 'window';

            // If the object is a class instance, return the "instance" type string
            if ($object instanceof $_class)
                return 'instance';

            // Return the type string from the types lookup using the native "toString()" function
            return $types[$__toString__.call($object)] || 'object';
        });
    })();

    // ########## GLOBALS ##########

    // If the AMD module pattern is being used
    if (typeof define === 'function' && define.amd)
    {
        // Define the module
        define(function()
        {
            // Return the global namespace
            return $$;
        });
    }
    // If the CommonJS module pattern is being used
    else if (typeof module !== 'undefined' && module && module.exports)
    {
        // Set the module exports as the global namespace
        module.exports = $$;
    }
    else
    {
        // If the "$$" shorthand global namespace is not already defined or should be overwritten, define/overwrite it
        if (window.$$ === undefined || window.$$ === window.jTypes)
            window.$$ = $$;

        // Define/overwrite the global namespace
        window.jTypes = $$;
    }
})(typeof window !== 'undefined' ? window : {});