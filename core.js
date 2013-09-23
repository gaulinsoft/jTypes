﻿/*! ------------------------------------------------------------------------
//                                jTypes 2.1.6
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
    var $_version = '2.1.6b273';

    // ########## LANGUAGE ##########

    // Create the compatibility exception message, arguments exception format string, and the exception prefix constants
    var $_lang_compatibility       = 'A browser that supports JavaScript 1.8.5 (MSIE 9+) is required.';
    var $_lang_exception_arguments = '"{0}({1})" has some invalid arguments.';
    var $_lang_exception_prefix    = 'jTypes Error: ';

    // Create the language constants
    var $_lang_$$_abstract_conflict_1              = 'Abstract classes cannot have the {0} modifier.';
    var $_lang_$$_abstract_instance                = 'Abstract classes cannot be instantiated.';
    var $_lang_$$_abstract_override                = 'Class must implement the inherited abstract {1} "{0}" with the override modifier.';
    var $_lang_$$_derive_class                     = 'Structs cannot inherit from a class that does not have the struct modifier.';
    var $_lang_$$_derive_export                    = 'Class must inherit from an imported class to have a precompiled string.';
    var $_lang_$$_derive_import                    = 'Class must have a precompiled string to inherit from an imported class.';
    var $_lang_$$_derive_internal                  = 'Class must have the internal modifier to inherit from an internal class.';
    var $_lang_$$_derive_sealed                    = 'Classes cannot inherit from a sealed class.';
    var $_lang_$$_derive_unoptimized               = 'Class must inherit from an optimized class to have the optimized modifier.';
    var $_lang_$$_derive_unsafe                    = 'Classes cannot inherit from a .NET class.';
    var $_lang_$$_field_readonly                   = '"{0}" cannot be set because it is a read-only field.';
    var $_lang_$$_field_type                       = '"{0}" must have a value of the type {1}, null, or undefined.';
    var $_lang_$$_import                           = 'Class cannot be imported because the definitions have been altered.';
    var $_lang_$$_keyword                          = '"{0}" is not a valid class modifier.';
    var $_lang_$$_member_abstract                  = '"{0}" cannot have the abstract modifier in a non-abstract class.';
    var $_lang_$$_member_abstract_override         = '"{0}" must implement the inherited abstract {1} with the override modifier.';
    var $_lang_$$_member_keyword                   = '"{1}" has an invalid {0} modifier "{2}".';
    var $_lang_$$_member_keyword_access_2          = '"{0}" cannot have more than one access modifier.';
    var $_lang_$$_member_keyword_conflict_2        = '"{0}" cannot have the {1} and {2} modifiers.';
    var $_lang_$$_member_keyword_escapsulation     = '"{0}" cannot have the public, protected, or private modifiers because it is {1}.';
    var $_lang_$$_member_keyword_polymorphism      = '"{0}" cannot have the abstract, virtual, or override modifiers because it is {1}.';
    var $_lang_$$_member_keyword_readonly          = '"{0}" cannot have the readonly modifier because it is {1}.';
    var $_lang_$$_member_keyword_requires_1        = '"{0}" cannot have the {1} modifier without the {2} modifier.';
    var $_lang_$$_member_name_2                    = '"{0}" cannot have more than one definition.';
    var $_lang_$$_member_name_invalid              = '"{1}" is not a valid {0} name.';
    var $_lang_$$_member_name_null                 = '"" is not a valid {0} name.';
    var $_lang_$$_member_name_package              = '"{0}" cannot have modifiers because it is a packaged member definition.';
    var $_lang_$$_member_name_prototype_2          = '"{0}" cannot have more than one definition or hide an inherited non-prototype member.';
    var $_lang_$$_member_name_static_2             = '"{0}" cannot have more than one static definition.';
    var $_lang_$$_member_override_null             = '"{0}" has no suitable {1} to override.';
    var $_lang_$$_member_property_accessors        = '"{0}" must have both accessors to have an access modifier on the {1} accessor.';
    var $_lang_$$_member_property_accessors_access = '"{0}" must have a more restrictive access modifier on the {1} accessor.';
    var $_lang_$$_member_property_function         = '"{0}" must have a function for the {1} accessor.';
    var $_lang_$$_member_property_keyword          = '"{0}" has an invalid modifier "{2}" on the {1} accessor.';
    var $_lang_$$_member_property_keyword_access_2 = '"{0}" cannot have access modifiers on both property accessors.';
    var $_lang_$$_member_property_name_2           = '"{0}" cannot have more than one definition for the {1} accessor.';
    var $_lang_$$_member_property_name_invalid     = '"{0}" cannot have a "{1}" property accessor.';
    var $_lang_$$_member_property_name_null        = '"{0}" must have at least one property accessor.';
    var $_lang_$$_member_virtual                   = '"{0}" cannot have the virtual modifier in a sealed class.';
    var $_lang_$$_struct_expando                   = 'Structs cannot have expando instances.';
    var $_lang_$$_struct_export                    = 'Structs cannot be exported.';
    var $_lang_export_import                       = 'An imported class cannot be exported.';
    var $_lang_export_struct                       = 'A struct cannot be exported.';

    // ########## NATIVE CODE ##########

    // ---------- OBJECT ----------
    var $__object__                   = Object;
    var $__objectProto__              = $__object__.prototype;
    var $__create__                   = $__object__.create;
    var $__defineProperties__         = $__object__.defineProperties;
    var $__defineProperty__           = $__object__.defineProperty;
    var $__freeze__                   = $__object__.freeze;
    var $__getOwnPropertyDescriptor__ = $__object__.getOwnPropertyDescriptor;
    var $__getOwnPropertyNames__      = $__object__.getOwnPropertyNames;
    var $__getPrototypeOf__           = $__object__.getPrototypeOf;
    var $__isExtensible__             = $__object__.isExtensible;
    var $__isFrozen__                 = $__object__.isFrozen;
    var $__isSealed__                 = $__object__.isSealed;
    var $__keys__                     = $__object__.keys;
    var $__preventExtensions__        = $__object__.preventExtensions;
    var $__propertyIsEnumerable__     = $__object__.propertyIsEnumerable;
    var $__seal__                     = $__object__.seal;
    var $__hasOwnProperty__           = $__objectProto__.hasOwnProperty;
    var $__isPrototypeOf__            = $__objectProto__.isPrototypeOf;
    var $__toString__                 = $__objectProto__.toString;
    var $__valueOf__                  = $__objectProto__.valueOf;

    // ---------- ARRAY ----------
    var $__array__       = Array;
    var $__arrayProto__  = $__array__.prototype;
    var $__isArray__     = $__array__.isArray;
    var $__every__       = $__arrayProto__.every;
    var $__filter__      = $__arrayProto__.filter;
    var $__forEach__     = $__arrayProto__.forEach;
    var $__indexOf__     = $__arrayProto__.indexOf;
    var $__lastIndexOf__ = $__arrayProto__.lastIndexOf;
    var $__map__         = $__arrayProto__.map;
    var $__reduce__      = $__arrayProto__.reduce;
    var $__reduceRight__ = $__arrayProto__.reduceRight;
    var $__some__        = $__arrayProto__.some;

    // ---------- STRING ----------
    var $__string__      = String;
    var $__stringProto__ = $__string__.prototype;
    var $__match__       = $__stringProto__.match;
    var $__replace__     = $__stringProto__.replace;
    var $__trim__        = $__stringProto__.trim;

    // If any of the major native code methods from recent JavaScript versions are not found, throw an exception
    if (!$__create__ || !$__defineProperty__ || !$__freeze__ || !$__getPrototypeOf__ || !$__preventExtensions__ || !$__seal__ || !$__isArray__ || !$__forEach__ || !$__indexOf__ || !$__trim__)
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
        var $types = new $__array__($arguments.length);

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
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   true,
            'value':        $field,
            'writable':     !!$writable
        });
    };
    var $_defineMethod   = function($name, $method)
    {
        // Define a non-enumerable method on the global namespace object
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   false,
            'value':        $method,
            'writable':     false
        });
    };
    var $_defineProperty = function($name, $getMethod, $setMethod)
    {
        // Define an enumerable property on the global namespace object
        return $__defineProperty__.call($__object__, $$, $name,
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
    var $_const_construct_arguments = 'c,k,f,m,a,d,d2,p,l';
    var $_const_int_max             = 9007199254740992;
    var $_const_int_min             = -$_const_int_max;
    var $_const_precompile_prefix   = '~jT_';

    // ########## KEYS ##########

    // Create the characters string and keys array
    var $_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var $_keys       = $_const_construct_arguments.split(',');

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
        while ($__indexOf__.call($_keys, $key) >= 0);

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
    var $_definition_abstract          = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~abstract';
    var $_definition_baseClass         = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~baseClass';
    var $_definition_cache             = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~cache';
    var $_definition_construct         = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~construct';
    var $_definition_expando_class     = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoClass';
    var $_definition_expando_private   = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoPrivate';
    var $_definition_expando_prototype = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoPrototype';
    var $_definition_expando_public    = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~expandoPublic';
    var $_definition_final             = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~final';
    var $_definition_import            = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~import';
    var $_definition_internal          = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~internal';
    var $_definition_optimized         = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~optimized';
    var $_definition_private           = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~private';
    var $_definition_precompile        = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~precompile';
    var $_definition_protected         = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~protected';
    var $_definition_public            = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~public';
    var $_definition_struct            = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~struct';
    var $_definition_unsafe            = $_definition_keyHash ? $_keyGenerator($_definition_keyLength) : '~unsafe';

    // #################################################
    // ########## BEGIN jTypes.NET INJECTIONS ##########
    // #################################################

    // ---------- DEFINITION (MEMBER) ----------

    // Create the definition member flags
    var $_definition_member_name               = 0;
    var $_definition_member_value              = 1;
    var $_definition_member_type               = 2;
    var $_definition_member_field_readonly     = 3;
    var $_definition_member_field_type         = 4;
    var $_definition_member_field_injection    = 5;
    var $_definition_member_method_abstract    = 6;
    var $_definition_member_method_final       = 7;
    var $_definition_member_method_virtual     = 8;
    var $_definition_member_method_type        = 9;
    var $_definition_member_property_accessors = 10;

    // Create the definition member flags length
    var $_definition_member_flagCount = 11;

    // ---------- INJECTIONS ----------

    // Create the injection flags
    var $_inject_private   = 0;
    var $_inject_protected = 1;
    var $_inject_prototype = 2;
    var $_inject_public    = 3;
    var $_inject_static    = 4;

    // Create the injection flags length
    var $_inject_flagCount = 5;

    // ---------- PACKAGES ----------

    // Create the member package key hint
    var $_package_keyHint = $_keyGenerator(3);

    // Create the member package flags
    var $_package_value     = 0;
    var $_package_modifiers = 1;
    var $_package_type      = 2;

    // Create the member package flags length
    var $_package_flagCount = 3;

    // ---------- .NET ----------

    // Create the unsafe token
    var $_unsafe = '';

    // ###############################################
    // ########## END jTypes.NET INJECTIONS ##########
    // ###############################################

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

    // ---------- PRECOMPILE ----------

    // Create the precompile obfuscated keys
    var $_precompile_cache      = $_keyGenerator(1, true);
    var $_precompile_injections = $_keyGenerator(1, true);
    var $_precompile_matrix     = $_keyGenerator(1, true);
    var $_precompile_null       = $_keyGenerator(1, true);
    var $_precompile_readonly   = $_keyGenerator(1, true);
    var $_precompile_reference  = $_keyGenerator(1, true);

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
    $__defineProperty__.call($__object__, $_class, 'toString', { 'value': $_class_toString });
    $__defineProperty__.call($__object__, $_prototype, 'toString', { 'value': $_prototype_toString });

    // Set the base class of all classes prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
    $_class.prototype = $_prototype;

    // Set the base class of all classes prototype without the "writable" flag
    $__defineProperty__.call($__object__, $_class, 'prototype', { 'value': $_prototype, 'writable': false });

    // ########## FLAGS ##########

    // Create the internal flags
    var $_clone    = false;// DON'T CHANGE
    var $_debug    = true;// DEFAULT
    var $_lazy     = true;// DEFAULT
    var $_subclass = false;// DON'T CHANGE

    // ########## COMPILER ##########

    // Create the definitions compiler helper functions
    var $_definitionsCompilerAccessorMethod = function($definitions, $privateDefinitions, $protectedDefinitions, $publicDefinitions, $accessor, $type, $abstract, $override, $sealed, $virtual, $hasTwoAccessors)
    {
        // Create the property method definition array
        var $method = new $__array__($_definition_member_flagCount);

        // Get the accessor name and private access modifier flag
        var $accessorName    = $accessor[$_accessor_name];
        var $accessorPrivate = $accessor[$_accessor_private];

        // Set the method definition data
        $method[$_definition_member_method_abstract]    = !$accessorPrivate && $abstract;
        $method[$_definition_member_method_final]       = !$accessorPrivate && $sealed;
        $method[$_definition_member_method_virtual]     = !$accessorPrivate && ($virtual || $abstract || $override);
        $method[$_definition_member_name]               = $accessorName.substr(5);
        $method[$_definition_member_property_accessors] = $hasTwoAccessors;
        $method[$_definition_member_type]               = $type;
        $method[$_definition_member_value]              = $accessor[$_accessor_value];

        // Create the definition descriptor
        var $descriptor = { 'enumerable': true, 'value': $method };

        // If the accessor has an access modifier
        if ($accessor[$_accessor_modifiers])
        {
            // If the accessor is private, set the method definition in the private definitions object
            if ($accessorPrivate)
                $__defineProperty__.call($__object__, $privateDefinitions, $accessorName, $descriptor);
            // If the accessor is protected, set the method definition in the protected definitions object
            else if ($accessor[$_accessor_protected])
                $__defineProperty__.call($__object__, $protectedDefinitions, $accessorName, $descriptor);
            // If the accessor is public, set the method definition in the public definitions object
            else if ($accessor[$_accessor_public])
                $__defineProperty__.call($__object__, $publicDefinitions, $accessorName, $descriptor);
        }
        // Set the method definition in the definitions object
        else
            $__defineProperty__.call($__object__, $definitions, $accessorName, $descriptor);
    };
    var $_definitionsCompilerBaseAbstract   = function($definitions, $baseDefinitions, $baseKey)
    {
        // Get the base definition from the base definitions object
        var $baseDefinition = $baseDefinitions[$baseKey];

        // If the base definition is not abstract, return
        if (!$baseDefinition[$_definition_member_method_abstract])
            return;

        // Get the definition from the definitions object
        var $definition = $__hasOwnProperty__.call($definitions, $baseKey) && $definitions[$baseKey] || null;

        // If no definition was found or it does not match the type of the base definition, throw an exception
        if (!$definition || $definition[$_definition_member_type] !== $baseDefinition[$_definition_member_type])
            throw $_exceptionFormat($_lang_$$_abstract_override, $baseDefinition[$_definition_member_name], $baseDefinition[$_definition_member_type]);
    };
    var $_definitionsCompilerBaseMethod     = function($key, $type, $typeName, $baseProtected, $basePublic, $override, $protected, $public)
    {
        // If no type name was provided, use the type as the type name
        if (!$typeName)
            $typeName = $type;

        var $baseDefinition = null;

        // If the method has the protected access modifier, get the protected base definition
        if ($protected)
            $baseDefinition = $baseProtected[$key] || null;
        // If the method has the public access modifier, get the public base definition
        else if ($public)
            $baseDefinition = $basePublic[$key] || null;

        // If the method has the override modifier
        if ($override)
        {
            // If no base definition was found, it is not a virtual base method, or it is a final base method, throw an exception
            if (!$baseDefinition || $baseDefinition[$_definition_member_type] !== $type || !$baseDefinition[$_definition_member_method_virtual] || $baseDefinition[$_definition_member_method_final])
                throw $_exceptionFormat($_lang_$$_member_override_null, $key.charAt(0) === '~' ? $key.substr($key.indexOf('_') + 1) : $key, $typeName);
        }
        // If the base definition is abstract, throw an exception
        else if ($baseDefinition && $baseDefinition[$_definition_member_method_abstract])
            throw $_exceptionFormat($_lang_$$_member_abstract_override, $key.charAt(0) === '~' ? $key.substr($key.indexOf('_') + 1) : $key, $type);
    };
    var $_definitionsCompiler               = function($cacheDefinitions, $privateDefinitions, $protectedDefinitions, $publicDefinitions, $prototypeDefinitions, $staticDefinitions, $key, $value, $baseProtected, $basePublic, $isAbstract, $isFinal, $isImport, $isOptimized, $isStruct)
    {
        // Break the key string into a keywords array and get the member name
        var $keywords = $__trim__.call($key || '').split(' ');
        var $name     = $keywords.pop() || '';

        // If the member is a package
        if (typeof $value === 'function' && $value[$_package_keyHint] === $value)
        {
            // If any keywords were provided other than the static keyword, throw an exception
            if ($keywords.length && $keywords[0] !== 'static')
                throw $_exceptionFormat($_lang_$$_member_name_package, $name);

            // Unlock the package
            $value = $value.call($_lock);

            // Extract the package data
            $keywords = ($value[$_package_modifiers] || '').split(' ');
            $value    = $value[$_package_value];
        }

        // Create the type
        var $type = 'field';

        // If the value is a function, set the type as a method
        if (typeof $value === 'function')
            $type = 'method';
        // If the value is a simple object, set the type as a property
        else if ($value !== null && typeof $value === 'object' && $__getPrototypeOf__.call($__object__, $value) === $__objectProto__)
            $type = 'property';

        // If the class has the import flag
        if ($isImport)
        {
            // If the member is a property
            if ($type === 'property')
            {
                // Create the has get and set accessors flags
                var $hasGet = false;
                var $hasSet = false;

                // Create the has override flag
                var $hasOverride = $__indexOf__.call($keywords, 'override') >= 0;

                for (var $propertyKey in $value)
                {
                    // Get the member name and value
                    var $memberName  = $__trim__.call($propertyKey || '').split(' ').pop() || '';
                    var $memberValue = $value[$propertyKey];

                    // Create the member definition descriptor
                    var $memberDescriptor = { 'enumerable': true, 'value': $memberValue };

                    // If the member name is not "get"
                    if ($memberName !== 'get')
                    {
                        // If the member name is not "set", continue
                        if ($memberName !== 'set')
                            continue;

                        // Set the has set flag
                        $hasSet = true;

                        // Set the definition in the cache definitions object
                        $__defineProperty__.call($__object__, $cacheDefinitions, '~set_' + $name, $memberDescriptor);

                        // If the set accessor has the override flag, no get accessor has been provided yet, and an inherited get accessor was found, create the default get accessor
                        if ($hasOverride && !$hasGet && $cacheDefinitions['~get_' + $name])
                            $__defineProperty__.call($__object__, $cacheDefinitions, '~get_' + $name, { 'configurable': true, 'enumerable': true, 'value': function()
                            {
                                // Return the base property
                                return this.__base[$name];
                            } });
                    }
                    else
                    {
                        // Set the has get flag
                        $hasGet = true;

                        // Set the definition in the cache definitions object
                        $__defineProperty__.call($__object__, $cacheDefinitions, '~get_' + $name, $memberDescriptor);

                        // If the get accessor has the override flag, no set accessor has been provided yet, and an inherited set accessor was found, create the default set accessor
                        if ($hasOverride && !$hasSet && $cacheDefinitions['~set_' + $name])
                            $__defineProperty__.call($__object__, $cacheDefinitions, '~set_' + $name, { 'configurable': true, 'enumerable': true, 'value': function($v)
                            {
                                // Set the base property
                                this.__base[$name] = $v;
                            } });
                    }
                }
            }
            // Set the definition in the cache definitions object
            else
                $__defineProperty__.call($__object__, $cacheDefinitions, $name, { 'enumerable': true, 'value': $value });

            return;
        }

        // If the name is empty or whitespace, throw an exception
        if (!$__trim__.call($name))
            throw $_exceptionFormat($_lang_$$_member_name_null, $type);

        // If the name is not a valid member name, throw an exception
        if (!$__match__.call($name, /^(_|\$|[a-z])[_\$a-z0-9]*$/i))
            throw $_exceptionFormat($_lang_$$_member_name_invalid, $type, $name);

        var $abstract = false;
        var $override = false;
        var $readonly = false;
        var $sealed   = false;
        var $virtual  = false;

        var $private   = false;
        var $protected = false;
        var $public    = false;

        var $typePrototype = false;
        var $typeStatic    = false;

        for (var $i = 0, $j = $keywords.length; $i < $j; $i++)
        {
            // Get the current keyword
            var $keyword = $keywords[$i];

            // If the keyword is abstract, set the abstract flag
            if ($type !== 'field' && $keyword === 'abstract')
                $abstract = true;
            // If the keyword is override, set the override flag
            else if ($type !== 'field' && $keyword === 'override')
                $override = true;
            // If the keyword is private, set the private flag
            else if ($keyword === 'private')
                $private = true;
            // If the keyword is protected, set the protected flag
            else if ($keyword === 'protected')
                $protected = true;
            // If the keyword is prototype, set the prototype flag
            else if ($keyword === 'prototype')
                $typePrototype = true;
            // If the keyword is public, set the public flag
            else if ($keyword === 'public')
                $public = true;
            // If the keyword is readonly, set the readonly flag
            else if ($type === 'field' && $keyword === 'readonly')
                $readonly = true;
            // If the keyword is sealed, set the sealed flag
            else if ($type !== 'field' && $keyword === 'sealed')
                $sealed = true;
            // If the keyword is static, set the static flag
            else if ($keyword === 'static')
                $typeStatic = true;
            // If the keyword is virtual, set the virtual flag
            else if ($type !== 'field' && $keyword === 'virtual')
                $virtual = true;
            // If a keyword was defined, throw an exception
            else if ($keyword)
                throw $_exceptionFormat($_lang_$$_member_keyword, $type, $name, $keyword);
        }

        // If the member name is invalid, throw an exception
        if ($name === 'as' || $isStruct && $name === 'clone' || $name === 'constructor' || $name === 'is' || $name === 'type' || $name === '__base' || $name === '__self' || $name === '__this' || $name === '__type')
            throw $_exceptionFormat($_lang_$$_member_name_invalid, 'member', $name);

        // If the member has more than one access modifier, throw an exception
        if ($private && $protected || $private && $public || $protected && $public)
            throw $_exceptionFormat($_lang_$$_member_keyword_access_2, $name);

        // If the member has the prototype or static flags
        if ($typePrototype || $typeStatic)
        {
            // If the member has the prototype flag
            if ($typePrototype)
            {
                // If the member has the static flag, throw an exception
                if ($typeStatic)
                    throw $_exceptionFormat($_lang_$$_member_keyword_conflict_2, $name, 'prototype', 'static');

                // Set the "prototype" type
                $type = 'prototype';

                // If the member was already defined in the non-static definitions objects, throw an exception
                if ($privateDefinitions[$name] || $protectedDefinitions[$name] || $__hasOwnProperty__.call($prototypeDefinitions, $name) || $publicDefinitions[$name])
                    throw $_exceptionFormat($_lang_$$_member_name_prototype_2, $name);
            }
            // If the member has the static flag
            else if ($typeStatic)
            {
                // Set the "static" type
                $type = 'static';

                // If the member was already defined in the static definitions object, throw an exception
                if ($__hasOwnProperty__.call($staticDefinitions, $name))
                    throw $_exceptionFormat($_lang_$$_member_name_static_2, $name);
            }

            // If the member has polymorphism, throw an exception
            if ($abstract || $override || $virtual)
                throw $_exceptionFormat($_lang_$$_member_keyword_polymorphism, $name, $type);

            // If the member has encapsulation, throw an exception
            if ($private || $protected || $public)
                throw $_exceptionFormat($_lang_$$_member_keyword_escapsulation, $name, $type);

            // If the member has the read-only flag, throw an exception
            if ($readonly)
                throw $_exceptionFormat($_lang_$$_member_keyword_readonly, $name, $type);
        }
        else
        {
            // If the member was already defined in the non-static definitions objects, throw an exception
            if ($__hasOwnProperty__.call($privateDefinitions, $name) || $__hasOwnProperty__.call($protectedDefinitions, $name) || $__hasOwnProperty__.call($prototypeDefinitions, $name) || $__hasOwnProperty__.call($publicDefinitions, $name))
                throw $_exceptionFormat($_lang_$$_member_name_2, $name);

            // If the member is neither protected nor public, set the private flag
            if (!$protected && !$public)
                $private = true;
        }

        // If the member is a method or property
        if ($type === 'method' || $type === 'property')
        {
            // If the member is private
            if ($private)
            {
                // If the member has polymorphism, throw an exception
                if ($abstract || $override || $virtual)
                    throw $_exceptionFormat($_lang_$$_member_keyword_polymorphism, $name, 'private');
            }

            // If the member is abstract
            if ($abstract)
            {
                // If the member is sealed, throw an exception
                if ($sealed)
                    throw $_exceptionFormat($_lang_$$_member_keyword_conflict_2, $name, 'abstract', 'sealed');

                // If the member is virtual, throw an exception
                if ($virtual)
                    throw $_exceptionFormat($_lang_$$_member_keyword_conflict_2, $name, 'abstract', 'virtual');

                // If the class is not abstract, throw an exception
                if (!$isAbstract)
                    throw $_exceptionFormat($_lang_$$_member_abstract, $name);
            }

            // If the member is an override
            if ($override)
            {
                // If the member is virtual, throw an exception
                if ($virtual)
                    throw $_exceptionFormat($_lang_$$_member_keyword_conflict_2, $name, 'override', 'virtual');

                // If there is no base class, throw an exception
                if (!$baseProtected && !$basePublic)
                    throw $_exceptionFormat($_lang_$$_member_override_null, $name, $type);
            }
            // If the member is sealed, throw an exception
            else if ($sealed)
                throw $_exceptionFormat($_lang_$$_member_keyword_requires_1, $name, 'sealed', 'override');

            // If the class is final and the member is virtual, throw an exception
            if ($isFinal && $virtual)
                throw $_exceptionFormat($_lang_$$_member_virtual, $name);
        }

        // Create the definitions object reference
        var $definitions = null;

        // If the member is private, set the private definitions object as the reference
        if ($private)
            $definitions = $privateDefinitions;
        // If the member is protected, set the protected definitions object as the reference
        else if ($protected)
            $definitions = $protectedDefinitions;
        // If the member is public, set the public definitions object as the reference
        else if ($public)
            $definitions = $publicDefinitions;

        switch ($type)
        {
            case 'field':

                // If the value is neither undefined nor null
                if ($value !== undefined && $value !== null)
                {
                    // Get the type of the value
                    var $valueType = typeof $value;

                    // If the field does not have a primitive value, set it to null
                    if ($valueType !== 'boolean' && $valueType !== 'number' && $valueType !== 'string')
                        $value = null;
                }

                // Create the field definition array
                var $field = new $__array__($_definition_member_flagCount);

                // Set the field definition data
                $field[$_definition_member_field_readonly] = $readonly;
                $field[$_definition_member_name]           = $name;
                $field[$_definition_member_type]           = $type;
                $field[$_definition_member_value]          = $value;

                // Set the field in the definitions object
                $__defineProperty__.call($__object__, $definitions, $name, { 'enumerable': true, 'value': $field });

                // If the class is optimized, set the definition in the cache definitions object
                if ($isOptimized)
                    $__defineProperty__.call($__object__, $cacheDefinitions, $name, { 'enumerable': true, 'value': $value });

                break;

            case 'method':

                // If there is a base class, perform further compiling on the method
                if ($baseProtected || $basePublic)
                    $_definitionsCompilerBaseMethod($name, $type, null, $baseProtected, $basePublic, $override, $protected, $public);

                // Create the method definition array
                var $method = new $__array__($_definition_member_flagCount);

                // Set the field definition data
                $method[$_definition_member_method_abstract] = $abstract;
                $method[$_definition_member_method_final]    = $sealed;
                $method[$_definition_member_method_virtual]  = $virtual || $abstract || $override;
                $method[$_definition_member_name]            = $name;
                $method[$_definition_member_type]            = $type;
                $method[$_definition_member_value]           = $value;

                // Set the method in the definitions object
                $__defineProperty__.call($__object__, $definitions, $name, { 'enumerable': true, 'value': $method });

                // If the class is optimized, set the definition in the cache definitions object
                if ($isOptimized)
                    $__defineProperty__.call($__object__, $cacheDefinitions, $name, { 'enumerable': true, 'value': $value });

                break;

            case 'property':

                // Create the get and set method data arrays
                var $get = new $__array__($_accessor_flagCount);
                var $set = new $__array__($_accessor_flagCount);

                // Create the has get and set accessors flags
                var $hasGet = false;
                var $hasSet = false;

                for (var $propertyKey in $value)
                {
                    // Break the property key string into a keywords array and get the member name and value
                    var $propertyKeywords = $__trim__.call($propertyKey || '').split(' ');
                    var $memberName       = $propertyKeywords.pop() || '';
                    var $memberValue      = $value[$propertyKey];

                    // If the member name is empty or whitespace, throw an exception
                    if (!$__trim__.call($memberName))
                        throw $_exceptionFormat($_lang_$$_member_property_name_null, $name);

                    var $member = null;

                    // If the member name is not "get"
                    if ($memberName !== 'get')
                    {
                        // If the member name is not "set", throw an exception
                        if ($memberName !== 'set')
                            throw $_exceptionFormat($_lang_$$_member_property_name_invalid, $name, $memberName);

                        // If a set accessor was already provided, throw an exception
                        if ($hasSet)
                            throw $_exceptionFormat($_lang_$$_member_property_name_2, $name, 'set');

                        // Set the flag for the property having a set accessor
                        $hasSet = true;

                        // Set the set method name
                        $set[$_accessor_name] = '~set_' + $name;

                        // Set the set method data object as the member
                        $member = $set;

                        // If the set accessor is overriding, no get accessor has been provided yet, and an inherited get accessor was found
                        if ($override && !$hasGet && $definitions['~get_' + $name])
                        {
                            // Inherit the get accessor
                            $get[$_accessor_modifiers] = false;
                            $get[$_accessor_name]      = '~get_' + $name;
                            $get[$_accessor_private]   = $private;
                            $get[$_accessor_protected] = $protected;
                            $get[$_accessor_public]    = $public;
                            $get[$_accessor_value]     = function()
                            {
                                // Return the base property
                                return this.__base[$name];
                            };
                        }
                    }
                    else
                    {
                        // If a get accessor was already provided, throw an exception
                        if ($hasGet)
                            throw $_exceptionFormat($_lang_$$_member_property_name_2, $name, 'get');

                        // Set the flag for the property having a get accessor
                        $hasGet = true;

                        // Set the get method name
                        $get[$_accessor_name] = '~get_' + $name;

                        // Set the get method data object as the member
                        $member = $get;

                        // If the get accessor is overriding, no set accessor has been provided yet, and an inherited set accessor was found
                        if ($override && !$hasSet && $definitions['~set_' + $name])
                        {
                            // Inherit the set accessor
                            $set[$_accessor_modifiers]  = false;
                            $set[$_accessor_name]      = '~set_' + $name;
                            $set[$_accessor_private]   = $private;
                            $set[$_accessor_protected] = $protected;
                            $set[$_accessor_public]    = $public;
                            $set[$_accessor_value]     = function($v)
                            {
                                // Set the base property
                                this.__base[$name] = $v;
                            };
                        }
                    }

                    // If the member is not a function, throw an exception
                    if (typeof $memberValue !== 'function')
                        throw $_exceptionFormat($_lang_$$_member_property_function, $name, $memberName);

                    // Set the member access modifier flags and value
                    $member[$_accessor_private]   = false;
                    $member[$_accessor_protected] = false;
                    $member[$_accessor_public]    = false;
                    $member[$_accessor_value]     = $memberValue;

                    for (var $i = 0, $j = $propertyKeywords.length; $i < $j; $i++)
                    {
                        // Get the property keyword
                        var $propertyKeyword = $propertyKeywords[$i];

                        // If the property keyword is private, set the private flag
                        if ($propertyKeyword === 'private')
                            $member[$_accessor_private] = true;
                        // If the property keyword is protected, set the protected flag
                        else if ($propertyKeyword === 'protected')
                            $member[$_accessor_protected] = true;
                        // If the property keyword is public, set the public flag
                        else if ($propertyKeyword === 'public')
                            $member[$_accessor_public] = true;
                        // If the property keyword was defined, throw an exception
                        else if ($propertyKeyword)
                            throw $_exceptionFormat($_lang_$$_member_property_keyword, $name, $memberName, $propertyKeyword);
                    }

                    // Check if the member has any access modifiers
                    $member[$_accessor_modifiers] = $member[$_accessor_private] || $member[$_accessor_protected] || $member[$_accessor_public];

                    // If the member has any access modifiers
                    if ($member[$_accessor_modifiers])
                    {
                        // If the member has more than one access modifier, throw an exception
                        if ($member[$_accessor_private] && $member[$_accessor_protected] || $member[$_accessor_private] && $member[$_accessor_public] || $member[$_accessor_protected] && $member[$_accessor_public])
                            throw $_exceptionFormat($_lang_$$_member_keyword_access_2, $memberName);

                        // If the member access modifier is not more restrictive than the property access modifier, throw an exception
                        if ($member[$_accessor_public] || $member[$_accessor_protected] && !$public || $member[$_accessor_private] && $private)
                            throw $_exceptionFormat($_lang_$$_member_property_accessors_access, $name, $memberName);
                    }
                }

                // If there is neither a get nor a set method, throw an exception
                if (!$hasGet && !$hasSet)
                    throw $_exceptionFormat($_lang_$$_member_property_name_null, $name);

                // Check if the property has get and set accessor access modifiers
                var $hasGetModifier = $get[$_accessor_modifiers];
                var $hasSetModifier = $set[$_accessor_modifiers];

                // If the get and set methods both have access modifiers, throw an exception
                if ($hasGetModifier && $hasSetModifier)
                    throw $_exceptionFormat($_lang_$$_member_property_keyword_access_2, $name);

                // If there is no set accessor and the get method has an access modifier, throw an exception
                if (!$hasSet && $hasGetModifier)
                    throw $_exceptionFormat($_lang_$$_member_property_accessors, $name, 'get');

                // If there is no get accessor and the set method has an access modifier, throw an exception
                if (!$hasGet && $hasSetModifier)
                    throw $_exceptionFormat($_lang_$$_member_property_accessors, $name, 'set');

                // Check if the property has any inherited get or set accessors
                $hasGet = $hasGet || !!$get[$_accessor_name];
                $hasSet = $hasSet || !!$set[$_accessor_name];

                // If a get method was provided
                if ($hasGet)
                {
                    // If there is a base class, perform further compiling on the get method
                    if ($baseProtected || $basePublic)
                        $_definitionsCompilerBaseMethod($get[$_accessor_name], $type, 'get accessor', $baseProtected, $basePublic, $override, $hasGetModifier ? $get[$_accessor_protected] : $protected, $hasGetModifier ? $get[$_accessor_public] : $public);

                    // Compile the get accessor method
                    $_definitionsCompilerAccessorMethod($definitions, $privateDefinitions, $protectedDefinitions, $publicDefinitions, $get, $type, $abstract, $override, $sealed, $virtual, $hasGet && $hasSet);

                    // If the class is optimized, set the definition in the cache definitions object
                    if ($isOptimized)
                        $__defineProperty__.call($__object__, $cacheDefinitions, $get[$_accessor_name], { 'enumerable': true, 'value': $get[$_accessor_value] });
                }

                // If a set method was provided
                if ($hasSet)
                {
                    // If there is a base class, perform further compiling on the set method
                    if ($baseProtected || $basePublic)
                        $_definitionsCompilerBaseMethod($set[$_accessor_name], $type, 'set accessor', $baseProtected, $basePublic, $override, $hasSetModifier ? $set[$_accessor_protected] : $protected, $hasSetModifier ? $set[$_accessor_public] : $public);

                    // Compile the set accessor method
                    $_definitionsCompilerAccessorMethod($definitions, $privateDefinitions, $protectedDefinitions, $publicDefinitions, $set, $type, $abstract, $override, $sealed, $virtual, $hasGet && $hasSet);

                    // If the class is optimized, set the definition in the cache definitions object
                    if ($isOptimized)
                        $__defineProperty__.call($__object__, $cacheDefinitions, $set[$_accessor_name], { 'enumerable': true, 'value': $set[$_accessor_value] });
                }

                break;

            case 'prototype':
            case 'static':

                // Create the member definition array
                var $member = new $__array__($_definition_member_flagCount);

                // Set the member definition data
                $member[$_definition_member_name]  = $name;
                $member[$_definition_member_type]  = $type;
                $member[$_definition_member_value] = $value;

                // If the member has the prototype flag, set the member in the prototype definitions object
                if ($typePrototype)
                    $prototypeDefinitions[$name] = $member;
                // If the member has the static flag, set the member in the static definitions object
                else if ($typeStatic)
                    $staticDefinitions[$name] = $member;

                break;
        }
    };
    var $_definitionsCompilerInjections     = function($definitions, $cacheDefinitions, $injections)
    {
        // If no injections array was provided, return
        if (!$__isArray__.call($__array__, $injections) || !$definitions && !$cacheDefinitions)
            return;

        for (var $i = 0, $j = $injections.length; $i < $j; $i++)
        {
            // Get the current injection
            var $injection = $injections[$i];

            // If no injection array was found, continue
            if (!$__isArray__.call($__array__, $injection))
                continue;

            // Get the injection name
            var $injectionName = $injection[$_definition_member_name];

            // If the injection does not have a name, continue
            if (!$injectionName)
                continue;

            // If the class has a definitions object, set the injected definition array into the definitions object
            if ($definitions)
                $__defineProperty__.call($__object__, $definitions, $injectionName, { 'enumerable': true, 'value': $injection });

            // If the class has a definitions cache, set the definition into the cache definitions object
            if ($cacheDefinitions)
                $__defineProperty__.call($__object__, $cacheDefinitions, $injectionName, { 'enumerable': true, 'value': $injection[$_definition_member_value] });
        }
    };
    var $_definitionsCompilerLock           = function($reference)
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

    // Create the construct runtime helper functions
    var $_constructRuntimeClone       = function($type, $class, $cache, $injections)
    {
        // Return the clone method
        return function()
        {
            // Set the subclass flag
            $_subclass = true;

            // Create the cloned instance prototype
            var $instanceNew = new $type();

            // Reset the subclass flag and set the clone flag
            $_subclass = false;
            $_clone    = true;

            // Create the cloned instance
            var $instanceClone = $type.call($instanceNew, $cache, $injections);

            // Reset the clone flag
            $_clone = false;

            // Return the cloned instance casted as the class
            return $instanceClone.as($class);
        };
    };
    var $_constructRuntimeConstructor = function($private)
    {
        // Create the constructor reference and instance
        var $constructor = undefined;
        var $this        = $__create__.call($__object__, $private);

        // Mask the base instance reference with the base constructor get accessor
        $__defineProperty__.call($__object__, $this, '__base',
        {
            'get': function()
            {
                // If the base constructor is not cached
                if ($constructor === undefined)
                {
                    // Get the base constructor
                    $constructor = $private.__base;
                    $constructor = $constructor && $constructor.constructor || null;
                }

                // Return the base constructor
                return $constructor;
            }
        });

        // Freeze the constructor instance object
        $__freeze__.call($__object__, $this);

        // Return the constructor instance
        return $this;
    };
    var $_constructRuntimeDefinition  = function($key, $definitions, $overrides, $inherits, $inheritsBase, $readonly, $context, $isProtected, $isPublic, $base, $private, $protected, $public, $injections, $cache)
    {
        // Get the member definition from the definitions object
        var $definition = $definitions[$key];

        // Create the descriptor reference and get the name
        var $descriptor = null;
        var $name       = $definition[$_definition_member_name];

        switch ($definition[$_definition_member_type])
        {
            case 'field':

                // If an injections array was provided and the field is an injected field, construct the injected field descriptor
                if ($injections && $definition[$_definition_member_field_injection])
                    $descriptor = $_constructRuntimeInjection({}, $name, $definition[$_definition_member_value], $injections, $definition[$_definition_member_field_type], $definition[$_definition_member_field_readonly] ? $readonly : null);
                // Construct the field descriptor
                else
                    $descriptor = $_constructRuntimeField({}, false, $name, $cache ? $cache[$name] : $definition[$_definition_member_value], $private, $public, $definition[$_definition_member_field_readonly] ? $readonly : null);

                // If the field is protected or public
                if ($isProtected || $isPublic)
                {
                    // Set the base field descriptor
                    $__defineProperty__.call($__object__, $base, $name, $descriptor);

                    // If lazy loading is not enabled
                    if (!$_lazy)
                    {
                        // Set the private field descriptor
                        $__defineProperty__.call($__object__, $private, $name, $descriptor);

                        // Set the field descriptor in the inherits object
                        $inherits[$name] = $descriptor;

                        // Set the field descriptor in the base inherits object
                        $inheritsBase[$name] = $descriptor;
                    }
                    // Set the protected field descriptor
                    else
                        $__defineProperty__.call($__object__, $protected, $name, $descriptor);

                    // If the field is public, set the public field descriptor
                    if ($isPublic)
                        $__defineProperty__.call($__object__, $public, $name, $descriptor);
                }
                // Set the private field descriptor
                else
                    $__defineProperty__.call($__object__, $private, $name, $descriptor);

                break;

            case 'method':

                // Create the constructor flag and method context
                var $constructor = $isProtected && $name === 'constructor';
                var $this        = $private;

                // If the method is the constructor, set the instance as the constructor instance
                if ($constructor)
                    $this = $_lazy ? $_constructRuntimeConstructor($private) : $context;

                // Construct the method and method descriptor
                $descriptor = { 'enumerable': !$constructor, 'value': $_constructRuntimeMethod($definition[$_definition_member_value], $this, $private, $public) };

                // If the method is protected or public
                if ($isProtected || $isPublic)
                {
                    // Set the base method descriptor
                    $__defineProperty__.call($__object__, $base, $name, $descriptor);

                    // Get the override and inherited descriptors
                    var $override = $_constructRuntimeOverride($descriptor, $key, $definition, $overrides);
                    var $inherit  = $override ? $override : $descriptor;

                    // If lazy loading is not enabled
                    if (!$_lazy)
                    {
                        // Set the private method descriptor
                        $__defineProperty__.call($__object__, $private, $name, $inherit);

                        // Set the method descriptor in the inherits object
                        $inherits[$name] = $inherit;

                        // Set the method descriptor in the base inherits object
                        $inheritsBase[$name] = $descriptor;
                    }
                    // Set the protected method descriptor
                    else
                        $__defineProperty__.call($__object__, $protected, $name, $inherit);

                    // If the method is public, set the public method descriptor
                    if ($isPublic)
                        $__defineProperty__.call($__object__, $public, $name, $inherit);
                }
                // Set the private method descriptor
                else
                    $__defineProperty__.call($__object__, $private, $name, $descriptor);

                break;

            case 'property':

                // Get the property accessor
                var $accessor = $key.substr(1, 3);

                // Check if the property is complex and if a merge operation is being performed
                var $complex      = $definition[$_definition_member_property_accessors];
                var $mergeBase    = $complex && $__hasOwnProperty__.call($base, $name);
                var $mergePrivate = $complex && $__hasOwnProperty__.call($private, $name);
                var $merge        = $mergeBase || $mergePrivate;

                // Construct the accessor method
                var $method = $_constructRuntimeMethod($definition[$_definition_member_value], $private, $private, $public);

                // If the property is not complex or is being merged
                if (!$complex || $merge)
                {
                    // Construct the property descriptor
                    $descriptor = { 'enumerable': true };

                    // Set the accessor method in the property descriptor
                    $descriptor[$accessor] = $method;

                    // Check if a public merge operation is being performed
                    var $mergePublic = $complex && $__hasOwnProperty__.call($public, $name);

                    // If the property is protected or public
                    if ($isProtected || $isPublic)
                    {
                        // Set the base property descriptor (merge if a base descriptor was found)
                        $__defineProperty__.call($__object__, $base, $name, $mergeBase ? $_constructRuntimeMerge($descriptor, $base[$name], $accessor) : $descriptor);

                        // Get the override method and inherited descriptor
                        var $override = $_constructRuntimeOverride($method, $key, $definition, $overrides);
                        var $inherit  = $override ? { 'enumerable': true, 'value': $override } : $descriptor;

                        // If lazy loading is not enabled
                        if (!$_lazy)
                        {
                            // Set the private property descriptor (merge if a private descriptor was found)
                            $__defineProperty__.call($__object__, $private, $name, $mergePrivate ? $_constructRuntimeMerge($inherit, $private[$name], $accessor) : $inherit);

                            // Set the property descriptor in the inherits object (merge if an inherits descriptor was found)
                            $inherits[$name] = $merge && $__hasOwnProperty__.call($inherits, $name) ? $_constructRuntimeMerge($inherit, $inherits[$name], $accessor) : $inherit;

                            // Set the property descriptor in the base inherits object (merge if an inherits base descriptor was found)
                            $inheritsBase[$name] = $merge && $__hasOwnProperty__.call($inheritsBase, $name) ? $_constructRuntimeMerge($descriptor, $inheritsBase[$name], $accessor) : $descriptor;
                        }
                        else
                        {
                            // Set the protected property descriptor (merge if a base descriptor was found)
                            $__defineProperty__.call($__object__, $protected, $name, $mergeBase ? $_constructRuntimeMerge($inherit, $protected[$name], $accessor) : $inherit);

                            // If a private merge was found, set the private property descriptor
                            if ($mergePrivate)
                                $__defineProperty__.call($__object__, $private, $name, $_constructRuntimeMerge(null, $private[$name], $accessor));
                        }

                        // If the property is public, set the public property descriptor (merge if a public descriptor was found)
                        if ($isPublic)
                            $__defineProperty__.call($__object__, $public, $name, $mergePublic ? $_constructRuntimeMerge($inherit, $public[$name], $accessor) : $inherit);
                        // If a public merge was found, set the public property descriptor
                        else if ($mergePublic)
                            $__defineProperty__.call($__object__, $public, $name, $_constructRuntimeMerge(null, $public[$name], $accessor));
                    }
                    // If the property is being merged
                    else if ($merge)
                    {
                        // Set the private property descriptor (merge if a private descriptor was found)
                        $__defineProperty__.call($__object__, $private, $name, $mergePrivate ? $_constructRuntimeMerge($descriptor, $private[$name], $accessor) : $descriptor);

                        // If a base merge was found
                        if ($mergeBase)
                        {
                            // Set the base property descriptor
                            $__defineProperty__.call($__object__, $base, $name, $_constructRuntimeMerge(null, $base[$name], $accessor));

                            // If lazy loading is enabled, set the protected property descriptor
                            if ($_lazy)
                                $__defineProperty__.call($__object__, $protected, $name, $_constructRuntimeMerge(null, $protected[$name], $accessor));
                        }

                        // If a public merge was found, set the public property descriptor
                        if ($mergePublic)
                            $__defineProperty__.call($__object__, $public, $name, $_constructRuntimeMerge(null, $public[$name], $accessor));
                    }
                    // Set the private property descriptor
                    else
                        $__defineProperty__.call($__object__, $private, $name, $descriptor);
                }
                else
                {
                    // Create the wrapper descriptor
                    var $descriptorWrapper = { 'configurable': true, 'value': $method };

                    // If the property is protected or public
                    if ($isProtected || $isPublic)
                    {
                        // Set the base property descriptor
                        $__defineProperty__.call($__object__, $base, $name, $descriptorWrapper);

                        // Get the override and inherited methods
                        var $override = $_constructRuntimeOverride($method, $key, $definition, $overrides);
                        var $inherit  = $override ? $override : $method;

                        // Create the inherit descriptor
                        var $descriptorInherit = { 'configurable': true, 'value': $inherit };

                        // If lazy loading is not enabled
                        if (!$_lazy)
                        {
                            // Set the private property descriptor
                            $__defineProperty__.call($__object__, $private, $name, $descriptorInherit);

                            // Set the inherited accessor method in the inherits object
                            $inherits[$name] = $inherit;

                            // Set the accessor method in the base inherits object
                            $inheritsBase[$name] = $method;
                        }
                        // Set the protected property descriptor
                        else
                            $__defineProperty__.call($__object__, $protected, $name, $descriptorInherit);

                        // If the property is public, set the public property descriptor
                        if ($isPublic)
                            $__defineProperty__.call($__object__, $public, $name, $descriptorInherit);
                    }
                    // Set the private property descriptor
                    else
                        $__defineProperty__.call($__object__, $private, $name, $descriptorWrapper);
                }

                break;
        }
    };
    var $_constructRuntimeDump        = function($vars, $statements, $definitions, $merges, $key, $index, $level, $protectedOverrides, $publicOverrides)
    {
        // Get the member definition from the definitions object along with the name and type
        var $definition = $definitions[$key];
        var $name       = $definition[$_definition_member_name];
        var $type       = $definition[$_definition_member_type];

        // Create the helper arguments array and handle along with the member reference
        var $arguments = [];
        var $handle    = '';
        var $reference = $_precompile_reference + $level + '$' + $index;

        switch ($type)
        {
            case 'field':

                // Get the field definition data
                var $fieldType = $definition[$_definition_member_field_type];
                var $injection = $definition[$_definition_member_field_injection];
                var $readonly  = $definition[$_definition_member_field_readonly];

                // Set the helper handle
                $handle = 'f';

                // Create the helper arguments
                $arguments = (
                [
                    $_precompile_cache + $level,                                           // CACHE[NAME] => VALUE
                    '"' + $name + '"',                                                     // NAME
                    $injection ? $_precompile_injections : $_precompile_null,              // INJECTIONS
                    !$injection ? $_precompile_matrix + $level + '$0' : $_precompile_null, // PRIVATE
                    !$injection ? $_precompile_matrix + $level + '$2' : $_precompile_null, // PUBLIC
                    $fieldType ? '"' + $fieldType + '"' : $_precompile_null,               // TYPE
                    $readonly ? $_precompile_readonly : $_precompile_null                  // READONLY
                ]);

                break;

            case 'method':

                // Get the method definition data
                var $returnType = $definition[$_definition_member_method_type];

                // Set the helper handle
                $handle = 'm';

                // Create the helper arguments
                $arguments = (
                [
                    $_precompile_cache + $level,                              // CACHE[NAME] => FUNCTION
                    '"' + $name + '"',                                        // NAME
                    $_precompile_matrix + $level + '$0',                      // PRIVATE
                    $_precompile_matrix + $level + '$2',                      // PUBLIC
                    $returnType ? '"' + $returnType + '"' : $_precompile_null // TYPE
                ]);

                break;

            case 'property':

                // Get the property definition data
                var $accessor   = $key.substr(1, 1);
                var $returnType = $definition[$_definition_member_method_type];

                // Set the helper handle
                $handle = 'a';

                // Create the helper arguments
                $arguments = (
                [
                    $_precompile_cache + $level,                               // CACHE[NAME] => FUNCTION
                    '"' + $name + '"',                                         // NAME
                    $_precompile_matrix + $level + '$0',                       // PRIVATE
                    $_precompile_matrix + $level + '$2',                       // PUBLIC
                    $returnType ? '"' + $returnType + '"' : $_precompile_null, // TYPE
                    '"' + $accessor + '"'                                      // ACCESSOR
                ]);

                break;
        }

        // Push the member definition into the vars array
        $vars.push($reference + '=' + $handle + '(' + $arguments.join(',') + ')');

        // If the member is a property
        if ($type === 'property')
        {
            // Get the complex flag and merge stack
            var $complex = $definition[$_definition_member_property_accessors];
            var $merge   = $merges[$name];

            // If the property is not complex or is being merged
            if (!$complex || $merge)
            {
                // Get the accessor flags
                var $get = $accessor === 'g';
                var $set = $accessor === 's';

                // Get the merge instances
                var $mergeBase      = $merge && $merge[3] || null;
                var $mergePrivate   = $merge && $merge[0] || null;
                var $mergeProtected = $merge && $merge[1] || null;
                var $mergePublic    = $merge && $merge[2] || null;

                // If the property is protected or public
                if ($protectedOverrides || $publicOverrides)
                {
                    // Push the base property reference into the statements array (merge if a base reference was found)
                    $statements.push('p(' + $_precompile_matrix + $level + '$3,' + ($get ? $reference : $mergeBase || $_precompile_null) + ',' + ($set ? $reference : $mergeBase || $_precompile_null) + ')');

                    // Create the override reference
                    var $override = null;

                    // If the property is protected or public, get the override reference
                    if ($protectedOverrides || $publicOverrides)
                        $override = $_constructRuntimeOverride($reference, $key, $definition, $protectedOverrides ? $protectedOverrides : $publicOverrides);

                    // Push the protected property reference into the statements array (merge if a base reference was found)
                    $statements.push('p(' + $_precompile_matrix + $level + '$1,' + ($get ? ($override !== null ? $override : $reference) : $mergeProtected || $_precompile_null) + ',' + ($set ? ($override !== null ? $override : $reference) : $mergeProtected || $_precompile_null) + ')');

                    // If a private merge was found, push the private property reference into the statements array
                    if ($mergePrivate)
                        $statements.push('p(' + $_precompile_matrix + $level + '$0,' + ($get ? $_precompile_null : $mergePrivate) + ',' + ($set ? $_precompile_null : $mergePrivate) + ')');

                    // If the property is public, push the public property reference into the statements array (merge if a public reference was found)
                    if ($publicOverrides)
                        $statements.push('p(' + $_precompile_matrix + $level + '$2,' + ($get ? ($override !== null ? $override : $reference) : $mergePublic || $_precompile_null) + ',' + ($set ? ($override !== null ? $override : $reference) : $mergePublic || $_precompile_null) + ')');
                    // If a public merge was found, push the public property reference into the statements array
                    else if ($mergePublic)
                        $statements.push('p(' + $_precompile_matrix + $level + '$2,' + ($get ? $_precompile_null : $mergePublic) + ',' + ($set ? $_precompile_null : $mergePublic) + ')');
                }
                // If the property is being merged
                else if ($merge)
                {
                    // Push the private property reference into the statements array (merge if a private reference was found)
                    $statements.push('p(' + $_precompile_matrix + $level + '$0,' + ($get ? $reference : $mergePrivate || $_precompile_null) + ',' + ($set ? $reference : $mergePrivate || $_precompile_null) + ')');

                    // If a protected merge was found
                    if ($mergeProtected)
                    {
                        // Push the base and protected property references into the statements array
                        $statements.push('p(' + $_precompile_matrix + $level + '$3,' + ($get ? $_precompile_null : $mergeBase) + ',' + ($set ? $_precompile_null : $mergeBase) + ')');
                        $statements.push('p(' + $_precompile_matrix + $level + '$1,' + ($get ? $_precompile_null : $mergeProtected) + ',' + ($set ? $_precompile_null : $mergeProtected) + ')');
                    }

                    // If a public merge was found, push the public property reference into the statements array
                    if ($mergePublic)
                        $statements.push('p(' + $_precompile_matrix + $level + '$2,' + ($get ? $_precompile_null : $mergePublic) + ',' + ($set ? $_precompile_null : $mergePublic) + ')');
                }
                // Push the private property reference into the statements array
                else
                    $statements.push('p(' + $_precompile_matrix + $level + '$0,' + ($get ? $reference : $_precompile_null) + ',' + ($set ? $reference : $_precompile_null) + ')');
            }
            else
            {
                // Create the merge stack
                $merge = [null, null, null, null];

                // If the property is protected or public
                if ($protectedOverrides || $publicOverrides)
                {
                    // Create the override reference
                    var $override = null;

                    // If the property is protected or public, get the override reference
                    if ($protectedOverrides || $publicOverrides)
                        $override = $_constructRuntimeOverride($reference, $key, $definition, $protectedOverrides ? $protectedOverrides : $publicOverrides);

                    // Set the base and protected property references in the merge stack
                    $merge[1] = $override !== null ? $override : $reference;
                    $merge[3] = $reference;

                    // If the property is public, set the public property reference in the merge stack
                    if ($publicOverrides)
                        $merge[2] = $override !== null ? $override : $reference;
                }
                // Set the private property reference in the merge stack
                else
                    $merge[0] = $reference;

                // Set the merge stack in the merges lookup
                $merges[$name] = $merge;
            }
        }
        // If the member is protected or public
        else if ($protectedOverrides || $publicOverrides)
        {
            // Create the override reference
            var $override = null;

            // If the member is a method, get the override reference
            if ($type === 'method')
                $override = $_constructRuntimeOverride($reference, $key, $definition, $protectedOverrides ? $protectedOverrides : $publicOverrides);

            // Push the base member reference into the statements array
            $statements.push('d(' + $_precompile_matrix + $level + '$3,' + $reference + ')');

            // If the member is public, push the protected and public member references into the statements array
            if ($publicOverrides)
                $statements.push('d2(' + $_precompile_matrix + $level + '$1,' + $_precompile_matrix + $level + '$2,' + ($override !== null ? $override : $reference) + ')');
            // Push the protected member reference into the statements array
            else
                $statements.push('d(' + $_precompile_matrix + $level + '$1,' + ($override !== null ? $override : $reference) + ')');
        }
        // Push the private member reference into the statements array
        else
            $statements.push('d(' + $_precompile_matrix + $level + '$0,' + $reference + ')');
    };
    var $_constructRuntimeField       = function($descriptor, $configurable, $name, $value, $private, $public, $readonly)
    {
        // Set the descriptor data
        $descriptor['configurable'] = $configurable;
        $descriptor['enumerable']   = true;
        $descriptor['get']          = function()
        {
            // Return the value
            return $value;
        };

        // If read-only checking is enabled
        if ($readonly)
        {
            // Set the descriptor set accessor with read-only checking
            $descriptor['set'] = function($v)
            {
                // If the field is read-only, throw an exception
                if ($readonly())
                    throw $_exceptionFormat($_lang_$$_field_readonly, $name);

                // If the provided value is set to a private instance, set the value to the public instance
                if ($v === $private)
                    $value = $public;
                // Set the value to the provided value
                else
                    $value = $v;
            };
        }
        else
        {
            // Set the descriptor set accessor without read-only checking
            $descriptor['set'] = function($v)
            {
                // If the provided value is set to a private instance, set the value to the public instance
                if ($v === $private)
                    $value = $public;
                // Set the value to the provided value
                else
                    $value = $v;
            };
        }

        // Return the field descriptor
        return $descriptor;
    };
    var $_constructRuntimeInherits    = function($instance, $inherits, $derivedInherits)
    {
        for (var $inheritKey in $inherits)
        {
            // If the instance redefined this member, continue
            if ($__hasOwnProperty__.call($instance, $inheritKey))
                continue;

            // Get the inherited member
            var $inherit = $inherits[$inheritKey];

            // Set the instance member descriptor
            $__defineProperty__.call($__object__, $instance, $inheritKey, $inherit);

            // If a derived inherits object was provided, set the member descriptor in it
            if ($derivedInherits)
                $derivedInherits[$inheritKey] = $inherit;
        }
    };
    var $_constructRuntimeInjection   = function($descriptor, $name, $key, $injections, $type, $readonly)
    {
        // Set the descriptor data
        $descriptor['configurable'] = false;
        $descriptor['enumerable']   = true;
        $descriptor['get']          = function()
        {
            // Return the injected value
            return $injections[$key];
        };

        // If type checking is enabled
        if ($type)
        {
            // If read-only checking is enabled
            if ($readonly)
            {
                // Set the descriptor set accessor with read-only and type checking
                $descriptor['set'] = function($v)
                {
                    // If the field is read-only, throw an exception
                    if ($readonly())
                        throw $_exceptionFormat($_lang_$$_field_readonly, $name);

                    // If the value does not match the type, throw an exception
                    if ($v !== undefined && $v !== null && $$.type($v) !== $type)
                        throw $_exceptionFormat($_lang_$$_field_type, $name, $type);

                    // Set the injected value
                    $injections[$key] = $v;
                };
            }
            else
            {
                // Set the descriptor set accessor with type checking but without read-only checking
                $descriptor['set'] = function($v)
                {
                    // If the value does not match the type, throw an exception
                    if ($v !== undefined && $v !== null && $$.type($v) !== $type)
                        throw $_exceptionFormat($_lang_$$_field_type, $name, $type);

                    // Set the injected value
                    $injections[$key] = $v;
                };
            }
        }
        else
        {
            // If read-only checking is enabled
            if ($readonly)
            {
                // Set the descriptor set accessor with read-only checking but without type checking
                $descriptor['set'] = function($v)
                {
                    // If the field is read-only, throw an exception
                    if ($readonly())
                        throw $_exceptionFormat($_lang_$$_field_readonly, $name);

                    // Set the injected value
                    $injections[$key] = $v;
                };
            }
            else
            {
                // Set the descriptor set accessor without read-only and type checking
                $descriptor['set'] = function($v)
                {
                    // Set the injected value
                    $injections[$key] = $v;
                };
            }
        }

        // Return the field descriptor
        return $descriptor;
    };
    var $_constructRuntimeMerge       = function($descriptor, $merge, $accessor)
    {
        // If the method is a get accessor
        if ($accessor === 'get')
        {
            // If no descriptor was provided, return a set wrapper descriptor
            if (!$descriptor)
                return { 'enumerable': true, 'set': $merge };

            // Return the merged descriptor (merge the set accessor)
            return (
            {
                'configurable': $descriptor['configurable'],
                'enumerable':   $descriptor['enumerable'],
                'get':          $descriptor['get'],
                'set':          $merge
            });
        }
        // If the method is a set accessor
        else if ($accessor === 'set')
        {
            // If no descriptor was provided, return a get wrapper descriptor
            if (!$descriptor)
                return { 'enumerable': true, 'get': $merge };

            // Return the merged descriptor (merge the get accessor)
            return (
            {
                'configurable': $descriptor['configurable'],
                'enumerable':   $descriptor['enumerable'],
                'get':          $merge,
                'set':          $descriptor['set']
            });
        }

        // Return the descriptor
        return $descriptor;
    };
    var $_constructRuntimeMethod      = function($function, $this, $private, $public)
    {
        // Return the method wrapper
        return function()
        {
            // Apply the function in the provided context with the current arguments
            var $return = $function.apply($this, arguments);

            // If the return value is a private instance, return the public instance
            if ($return === $private)
                return $public;

            // Return the return value
            return $return;
        };
    };
    var $_constructRuntimeOverride    = function($data, $key, $definition, $overrides)
    {
        // If the method is virtual
        if ($definition[$_definition_member_method_virtual])
        {
            // If the method is not final
            if (!$definition[$_definition_member_method_final])
            {
                // Get the override data from the overrides object
                var $override = $overrides[$key] || null;

                // If no override data was found in the overrides object, set the method data in it
                if (!$override)
                    $overrides[$key] = $data;

                // Return the override data
                return $override;
            }
            // Set the method data in the overrides object
            else
                $overrides[$key] = $data;
        }
        // Clear any override data that may have existed
        else
            $overrides[$key] = null;

        return null;
    };
    var $_constructRuntimePrecompile  = function($chain)
    {
        // Create the closures string and the statements and variables arrays
        var $closures   = $_precompile_null + '=null';
        var $statements = [];
        var $vars       = [];

        // Create the protected and public overrides containers
        var $protectedOverrides = $__create__.call($__object__, null);
        var $publicOverrides    = $__create__.call($__object__, null);

        for (var $i = 0, $j = $chain.length; $i < $j; $i++)
        {
            // Get the current class
            var $class = $chain[$i];

            // Append the cache closure variable to the closures string
            $closures += ',' + $_precompile_cache + $i + '=c[' + $i + '][k]';

            // Push the stack variable into the variables array
            $vars.push($_precompile_matrix + $i + '=' + $_precompile_matrix + '[' + $i + ']');

            // Push the stack instance variables into the variables array
            $vars.push($_precompile_matrix + $i + '$0=' + $_precompile_matrix + $i + '[0]');
            $vars.push($_precompile_matrix + $i + '$1=' + $_precompile_matrix + $i + '[1]');
            $vars.push($_precompile_matrix + $i + '$2=' + $_precompile_matrix + $i + '[2]');
            $vars.push($_precompile_matrix + $i + '$3=' + $_precompile_matrix + $i + '[3]');

            // Get the private, protected, and public definitions objects 
            var $private   = $class[$_definition_private].call($_lock);
            var $protected = $class[$_definition_protected].call($_lock);
            var $public    = $class[$_definition_public].call($_lock);

            // Get the private, protected, and public keys
            var $privateKeys   = $__keys__.call($__object__, $private);
            var $protectedKeys = $__keys__.call($__object__, $protected);
            var $publicKeys    = $__keys__.call($__object__, $public);

            // Create the merges lookup
            var $merges = $__create__.call($__object__, null);

            // Dump the private definitions into the variables and statements arrays
            for (var $k = 0, $l = $privateKeys.length; $k < $l; $k++)
                $_constructRuntimeDump($vars, $statements, $private, $merges, $privateKeys[$k], $k, $i, null, null);

            // Create the index offset
            var $index = $privateKeys.length;

            // Dump the protected definitions into the variables and statements arrays
            for (var $k = 0, $l = $protectedKeys.length; $k < $l; $k++)
                $_constructRuntimeDump($vars, $statements, $protected, $merges, $protectedKeys[$k], $k + $index, $i, $protectedOverrides, null);

            // Increment the index offset
            $index += $protectedKeys.length;

            // Dump the public definitions into the variables and statements arrays
            for (var $k = 0, $l = $publicKeys.length; $k < $l; $k++)
                $_constructRuntimeDump($vars, $statements, $public, $merges, $publicKeys[$k], $k + $index, $i, null, $publicOverrides);

            // Push the lock statement into the statements array (without locking expandos)
            $statements.push('l(' + $_precompile_matrix + $i + '$3,' + ($class[$_definition_expando_private] ? $_precompile_null : $_precompile_matrix + $i + '$0') + ',' + $_precompile_matrix + $i + '$1,' + ($class[$_definition_expando_public] ? $_precompile_null : $_precompile_matrix + $i + '$2') + ')');
        }

        // Create the precompile string
        var $precompile = '';

        // Construct the precompile string from the closures string, variables array, and statements array
        $precompile += 'var ' + $closures + ';';
        $precompile += 'return function(' + $_precompile_matrix + ',' + $_precompile_readonly + ',' + $_precompile_injections + '){';
        $precompile += 'var ' + $vars.join(',') + ';';
        $precompile += $statements.join(';') + ';';
        $precompile += '};';

        // Return the precompile string
        return $precompile;
    };
    var $_constructRuntimeStack       = function($class, $last, $switch, $instance, $base, $private, $protected, $public, $typeExternal, $typeInternal, $isExpandoPrivate, $isExpandoPublic, $isInternal)
    {
        // Get the define flags
        var $defineBase    = !$protected || $last;
        var $definePrivate = !$protected || $isExpandoPrivate;
        var $definePublic  = $defineBase || $isExpandoPublic;

        // If a private self reference is required, define the self reference on the private instance
        if ($definePrivate)
            $__defineProperty__.call($__object__, $private, '__self', { 'value': $instance });

        // If a base self reference is required, define the self reference on the base instance
        //if ($defineBase)
        //    $__defineProperty__.call($__object__, $base, '__self', { 'value': $instance });

        // If a public self reference is required, define the self reference on the public instance
        if ($definePublic)
            $__defineProperty__.call($__object__, $public, '__self', { 'value': $instance });

        // Define the public instance accessor on the private and base instances
        $__defineProperty__.call($__object__, $private, '__this', { 'value': $public });
        //$__defineProperty__.call($__object__, $base, '__this', { 'value': $public });

        // Define the chain type accessor on the private and base instances
        $__defineProperty__.call($__object__, $private, '__type', { 'value': $class });
        //$__defineProperty__.call($__object__, $base, '__type', { 'value': $class });

        // If the class is not internal, a public chain type accessor is required, or the chain is switching to internal, define the chain type accessor on the public instance
        if (!$isInternal || $definePublic || $switch)
            $__defineProperty__.call($__object__, $public, '__type', { 'value': $isInternal ? null : $class });

        // If a private type method is required, define the type method on the private instance
        if ($definePrivate)
            $__defineProperty__.call($__object__, $private, 'type', { 'value': $isInternal ? $typeInternal : $typeExternal });

        // If a base type method is required or the chain is switching to internal, define the type method on the base instance
        if ($defineBase || $switch)
            $__defineProperty__.call($__object__, $base, 'type', { 'value': $isInternal ? $typeInternal : $typeExternal });

        // If a public type method is required, define the type method on the public instance
        if ($definePublic)
            $__defineProperty__.call($__object__, $public, 'type', { 'value': $typeExternal });

        // If a protected instance was provided
        if ($protected)
        {
            // If this is the last stack, define the self reference on the protected instance
            if ($last)
                $__defineProperty__.call($__object__, $protected, '__self', { 'value': $instance });

            // If this is the last stack or the chain is switching to internal, define the type method on the protected instance
            if ($last || $switch)
                $__defineProperty__.call($__object__, $protected, 'type', { 'value': $isInternal ? $typeInternal : $typeExternal });
        }
    };
    var $_constructRuntimeStruct      = function($class, $type, $externalType, $cache, $injections, $base, $private, $protected, $public, $isExpandoPublic, $isInternal)
    {
        // Create the clone method
        var $clone = $_constructRuntimeClone($type, $class, $cache, $injections);

        // Define the clone method on the private and base instances
        $__defineProperty__.call($__object__, $private, 'clone', { 'value': $clone });
        $__defineProperty__.call($__object__, $base, 'clone', { 'value': $clone });

        // If the chain is not internal or has an expando public instance, define the clone method on the public instance
        if (!$isInternal || !$protected || $isExpandoPublic)
            $__defineProperty__.call($__object__, $public, 'clone', { 'value': $isInternal ? $_constructRuntimeClone($type, $externalType, $cache, $injections) : $clone });
    };

    // Create the import runtime helper functions
    var $_importRuntimeAccessor    = function($cache, $name, $private, $public, $type, $accessor)
    {
        // Create the accessor descriptor with the embedded property name
        var $descriptor = { 'enumerable': true, 'name': $name };

        // Construct the accessor method
        $descriptor[$accessor + 'et'] = $_constructRuntimeMethod($cache['~' + $accessor + 'et_' + $name], $private, $private, $public);

        // Return the descriptor
        return $descriptor;
    };
    var $_importRuntimeDescriptor  = function($instance, $descriptor)
    {
        // Set the descriptor on the instance using the embedded member name
        $__defineProperty__.call($__object__, $instance, $descriptor['name'], $descriptor);
    };
    var $_importRuntimeDescriptor2 = function($formerInstance, $latterInstance, $descriptor)
    {
        // Get the embedded member name
        var $name = $descriptor['name'];

        // Set the descriptor on the former and latter instances
        $__defineProperty__.call($__object__, $formerInstance, $name, $descriptor);
        $__defineProperty__.call($__object__, $latterInstance, $name, $descriptor);
    };
    var $_importRuntimeField       = function($cache, $name, $injections, $private, $public, $type, $readonly)
    {
        // Create the field descriptor with the embedded property name
        var $descriptor = { 'name': $name };

        // If an injections array was provided, return the constructed injection descriptor
        if ($injections)
            return $_constructRuntimeInjection($descriptor, $name, $cache[$name], $injections, $type, $readonly);

        // Return the constructed field descriptor
        return $_constructRuntimeField($descriptor, false, $name, $cache[$name], $private, $public, $readonly);
    };
    var $_importRuntimeLock        = function($base, $private, $protected, $public)
    {
        // Freeze the base instance
        $__freeze__.call($__object__, $base);

        // If a private instance was provided, freeze the private instance
        if ($private)
            $__freeze__.call($__object__, $private);

        // Freeze the protected instance
        $__freeze__.call($__object__, $protected);

        // If a public instance was provided, freeze the public instance
        if ($public)
            $__freeze__.call($__object__, $public);
    };
    var $_importRuntimeMethod      = function($cache, $name, $private, $public, $type)
    {
        // Create the method descriptor with the embedded property name and the method context
        var $descriptor = { 'enumerable': true, 'name': $name };
        var $this       = $private;

        // If the method is the constructor, create the constructor context
        if ($name === 'constructor')
            $this = $_constructRuntimeConstructor($private);

        // Construct the method
        $descriptor['value'] = $_constructRuntimeMethod($cache[$name], $this, $private, $public);

        // Return the descriptor
        return $descriptor;
    };
    var $_importRuntimeProperty    = function($instance, $get, $set)
    {
        // Extract the property name
        var $name = $get && $get['name'] || $set && $set['name'] || '';

        // Extract the get and set accessors
        $get = $get && $get['get'] || undefined;
        $set = $set && $set['set'] || undefined;

        // Set the property get/set accessors descriptor on the instance
        $__defineProperty__.call($__object__, $instance, $name, { 'enumerable': true, 'get': $get, 'set': $set });
    };

    // ########## NAMESPACE ##########

    // Create the compiler
    $$ = function()
    {
        // Get the initial arguments
        var $argument    = 0;
        var $baseClass   = null;
        var $constructor = arguments[$argument++];
        var $modifiers   = '';
        var $prototype   = null;
        var $typeof      = typeof $constructor;

        // If the constructor is not a simple object
        if ($constructor === null || $typeof !== 'object' || $__getPrototypeOf__.call($__object__, $constructor) !== $__objectProto__)
        {
            // Get the prototype
            $prototype = arguments[$argument++];

            // If the constructor is not a function (and therefore not a class)
            if ($typeof !== 'function')
            {
                // If the constructor is not a string, throw an exception
                if ($typeof !== 'string')
                    throw $_exceptionArguments(null, arguments);

                // Use the first argument as the modifiers string
                $modifiers = $constructor;

                // If the prototype is a class
                if (typeof $prototype === 'function' && $prototype[$_definition_keyHint] === $prototype)
                {
                    // Use the second argument as the base class
                    $baseClass   = $prototype;
                    $constructor = arguments[$argument++];
                }
                // Use the second argument as the constructor
                else
                    $constructor = $prototype;

                // If the constructor is not a function or is a class
                if (typeof $constructor !== 'function' || $constructor[$_definition_keyHint] === $constructor)
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
            else if ($constructor[$_definition_keyHint] === $constructor)
            {
                // Use the first argument as the base class
                $baseClass = $constructor;

                // If the prototype is a function and not a class
                if (typeof $prototype === 'function' && $prototype[$_definition_keyHint] !== $prototype)
                {
                    // Use the second argument as the constructor
                    $constructor = $prototype;
                    $prototype   = arguments[$argument++];
                }
                else
                    $constructor = null;
            }

            // If the prototype is not a simple object, throw an exception
            if ($prototype === null || typeof $prototype !== 'object' || $__getPrototypeOf__.call($__object__, $prototype) !== $__objectProto__)
                throw $_exceptionArguments(null, arguments);
        }
        else
        {
            // Use the first argument as the prototype
            $prototype   = $constructor;
            $constructor = null;
        }

        // If the argument count does not match the number of arguments, throw an exception
        if (!$_unsafe && arguments.length !== $argument)
            throw $_exceptionArguments(null, arguments);

        // If no constructor was provided
        if (!$constructor)
        {
            // If a base class was provided
            if ($baseClass)
            {
                // Use a default constructor
                $constructor = function()
                {
                    // If a base constructor exists, apply it with the arguments
                    if (this.__base)
                        return this.__base.apply(this, arguments);
                };
            }
            // Use an empty function as the default constructor
            else
                $constructor = function()
                {
                    //
                };
        }

        // Create the flags
        var $abstract  = false;
        var $export    = false;
        var $final     = false;
        var $import    = false;
        var $internal  = false;
        var $optimized = false;
        var $struct    = false;
        var $unsafe    = false;

        // Create the expando flags
        var $expandoClass     = false;
        var $expandoPrivate   = false;
        var $expandoPrototype = false;
        var $expandoPublic    = false;

        // If a modifiers string was provided
        if ($modifiers)
        {
            // If the modifiers string is not an import string
            if ($modifiers.length <= $_const_precompile_prefix.length || $modifiers.substr(0, $_const_precompile_prefix.length) !== $_const_precompile_prefix)
            {
                // Create the keywords array
                var $keywords = $__trim__.call($modifiers).split(' ');

                for (var $i = 0, $j = $keywords.length; $i < $j; $i++)
                {
                    // Get the current keyword
                    var $keyword = $keywords[$i];

                    // If the keyword is abstract, set the abstract flag
                    if ($keyword === 'abstract')
                        $abstract = true;
                    // If the keyword is expando
                    else if ($keyword === 'expando')
                    {
                        // Set all the expando flags
                        $expandoClass     = true;
                        $expandoPrivate   = true;
                        $expandoPrototype = true;
                        $expandoPublic    = true;
                    }
                    // If the keyword is expando-private, set the expando private flag
                    else if ($keyword === 'expando-private' || $keyword === 'private-expando')
                        $expandoPrivate = true;
                    // If the keyword is expando-public, set the expando public flag
                    else if ($keyword === 'expando-public' || $keyword === 'public-expando')
                        $expandoPublic = true;
                    // If the keyword is expando-prototype, set the expando prototype flag
                    else if ($keyword === 'expando-prototype' || $keyword === 'prototype-expando')
                        $expandoPrototype = true;
                    // If the keyword is expando-static, set the expando class flag
                    else if ($keyword === 'expando-static' || $keyword === 'static-expando')
                        $expandoClass = true;
                    // If the keyword is export, set the export flag
                    else if ($keyword === 'export')
                        $export = true;
                    // If the keyword is internal, set the internal flag
                    else if ($keyword === 'internal')
                        $internal = true;
                    // If the keyword is optimized, set the optimized flag
                    else if ($keyword === 'optimized')
                        $optimized = true;
                    // If the keyword is sealed, set the final flag
                    else if ($keyword === 'sealed')
                        $final = true;
                    // If the keyword is struct, set the struct flag
                    else if ($keyword === 'struct')
                        $struct = true;
                    // If the keyword is the unsafe token, set the unsafe flag
                    else if ($_unsafe && $keyword === $_unsafe)
                        $unsafe = true;
                    // If a different keyword was provided, throw an exception
                    else if ($keyword)
                        throw $_exceptionFormat($_lang_$$_keyword, $keyword);
                }

                // If the class is abstract
                if ($abstract)
                {
                    // If the class is final, throw an exception
                    if ($final)
                        throw $_exceptionFormat($_lang_$$_abstract_conflict_1, 'sealed');

                    // If the struct modifier was provided, throw an exception
                    if ($struct)
                        throw $_exceptionFormat($_lang_$$_abstract_conflict_1, 'struct');
                }
                // If the struct modifier was provided
                else if ($struct)
                {
                    // If the export modifier was provided, throw an exception
                    if ($export)
                        throw $_exceptionFormat($_lang_$$_struct_export);

                    // If either expando private or expando public modifier was provided, throw an exception
                    if ($expandoPrivate || $expandoPublic)
                        throw $_exceptionFormat($_lang_$$_struct_expando);
                }
            }
            // Set the import flag
            else
                $import = true;
        }

        // Create the chain array, construct reference, external index, chain level count, and the external type reference
        var $chain     = [];
        var $construct = null;
        var $external  = $internal ? 1 : 0;
        var $levels    = 1;
        var $type      = null;

        // If the class has the import flag
        if ($import)
        {
            // Generate the imported construct function factory
            $construct = (new Function('"use strict";var $=function(' + $_const_construct_arguments + ')' + $modifiers.substr($_const_precompile_prefix.length) + 'return $;')).call($$);

            // Copy the imported construct data into the class
            $abstract = !!$construct['a'];
            $final    = !!$construct['f'];
            $internal = !!$construct['i'];
            $struct   = !!$construct['s'];
            $unsafe   = $_unsafe && $construct['u'] === $_unsafe;
        }

        // If the argument count does not match the number of arguments, throw an exception
        if (!$unsafe && arguments.length !== $argument)
            throw $_exceptionArguments(null, arguments);

        // Create the cache, private, protected, and public references along with the inherited prototype reference
        var $classCache     = null;
        var $classPrivate   = $__create__.call($__object__, null);
        var $classProtected = null;
        var $classPrototype = null;
        var $classPublic    = null;

        // Create the prototype and static definitions objects
        var $definitionsPrototype = $__create__.call($__object__, null);
        var $definitionsStatic    = $__create__.call($__object__, null);

        // Create the base protected and public references
        var $baseProtected = null;
        var $basePublic    = null;

        // If a base class was provided
        if ($baseClass)
        {
            // Get the base protected and public definitions objects
            $baseProtected = $baseClass[$_definition_protected].call($_lock);
            $basePublic    = $baseClass[$_definition_public].call($_lock);

            // If the base class is final, throw an exception
            if ($baseClass[$_definition_final])
                throw $_exceptionFormat($_lang_$$_derive_sealed);

            // If the class is not unsafe and the base class is unsafe, throw an exception
            if (!$unsafe && $baseClass[$_definition_unsafe])
                throw $_exceptionFormat($_lang_$$_derive_unsafe);

            // If the class has the import flag
            if ($import)
            {
                // If the base class doesn't have the import flag, throw an exception
                if (!$baseClass[$_definition_import])
                    throw $_exceptionFormat($_lang_$$_derive_export);

                // Create the chained cache, protected, and public definitions objects
                $classCache     = $__create__.call($__object__, $baseClass[$_definition_cache]);
                $classProtected = $__create__.call($__object__, null);
                $classPublic    = $__create__.call($__object__, null);
            }
            else
            {
                // If the base class has the import flag, throw an exception
                if ($baseClass[$_definition_import])
                    throw $_exceptionFormat($_lang_$$_derive_import);

                // Create the chained cache, chained protected, and chained public definitions objects
                $classCache     = $__create__.call($__object__, $optimized ? $baseClass[$_definition_cache] : null);
                $classProtected = $__create__.call($__object__, $baseProtected);
                $classPublic    = $__create__.call($__object__, $basePublic);
            }

            // If the class is not internal and the base class is internal, throw an exception
            if (!$internal && $baseClass[$_definition_internal])
                throw $_exceptionFormat($_lang_$$_derive_internal);

            // If the class is optimized and the base class is not optimized, throw an exception
            if ($optimized && !$baseClass[$_definition_optimized])
                throw $_exceptionFormat($_lang_$$_derive_unoptimized);

            // If the class has the struct modifier and the base class does not, throw an exception
            if ($struct && !$baseClass[$_definition_struct])
                throw $_exceptionFormat($_lang_$$_derive_class);

            // Set the subclass flag
            $_subclass = true;

            // Construct the inherited prototype
            $classPrototype = new $baseClass();

            // Reset the subclass flag
            $_subclass = false;

            // Create the current class tracker
            var $current = $baseClass;

            // If a current class was found
            while (typeof $current === 'function' && $current[$_definition_keyHint] === $current)
            {
                // Add the current class to the chain array
                $chain.push($current);

                // If the class is internal and the current class is internal, increment the external index
                if ($internal && $current[$_definition_internal])
                    $external++;

                // Get the next class in the chain
                $current = $current[$_definition_baseClass];
            }
        }
        else
        {
            // Create the cache, protected, and public definitions objects along with the inherited prototype
            $classCache     = $__create__.call($__object__, null);
            $classProtected = $__create__.call($__object__, null);
            $classPrototype = new $_class();
            $classPublic    = $__create__.call($__object__, null);
        }

        // Compile the class definitions into the definitions objects
        for (var $key in $prototype)
            $_definitionsCompiler($classCache, $classPrivate, $classProtected, $classPublic, $definitionsPrototype, $definitionsStatic, $key, $prototype[$key], $baseProtected, $basePublic, $abstract, $final, $import, $optimized, $struct);

        // If any injections arguments were provided
        if ($unsafe && arguments[$argument])
        {
            // If the class does not have the import flag
            if (!$import)
            {
                // Inject the private, protected, and public definitions objects
                $_definitionsCompilerInjections($classPrivate, $optimized ? $classCache : null, arguments[$argument + $_inject_private]);
                $_definitionsCompilerInjections($classProtected, $optimized ? $classCache : null, arguments[$argument + $_inject_protected]);
                $_definitionsCompilerInjections($classPublic, $optimized ? $classCache : null, arguments[$argument + $_inject_public]);

                // Inject the prototype and static definitions objects
                $_definitionsCompilerInjections($definitionsPrototype, null, arguments[$argument + $_inject_prototype]);
                $_definitionsCompilerInjections($definitionsStatic, null, arguments[$argument + $_inject_static]);
            }
            else
            {
                // Inject the cached definitions objects
                $_definitionsCompilerInjections(null, $classCache, arguments[$argument + $_inject_private]);
                $_definitionsCompilerInjections(null, $classCache, arguments[$argument + $_inject_protected]);
                $_definitionsCompilerInjections(null, $classCache, arguments[$argument + $_inject_public]);
            }
        }

        // Create the external type method and internal type method reference
        var $typeExternal = function()
        {
            // Return the external type
            return $type;
        };
        var $typeInternal = null;

        // If the class is internal, create the internal type method
        if ($internal)
            $typeInternal = function()
            {
                // Return the internal type
                return $class;
            };

        // Create the class
        var $class = function()
        {
            // If the subclass flag is set, return
            if ($_subclass)
                return;

            // If the class is abstract, throw an exception
            if ($abstract)
                throw $_exceptionFormat($_lang_$$_abstract_instance);

            // Create the instance reference and matrix
            var $instance = this;
            var $matrix   = new $__array__($levels);

            // Check if the new operator was used
            var $isInit = false;
            var $isNew  = $_clone || this instanceof $class && this.as === undefined && this.is === undefined;

            // If the new operator was not used
            if (!$isNew)
            {
                // Set the subclass flag
                $_subclass = true;

                // Create the class instance
                $instance = new $class();

                // Reset the subclass flag
                $_subclass = false;
            }

            // Create the casting and checking functions
            var $as = function($as)
            {
                // If the type is the class, return the public instance
                if ($as === $class)
                    return $public;

                // If the type is the external class, return the external public instance
                if ($as === $type)
                    return $matrix[$external][2];

                // If the type is not a class or the instance is not an instance of type, return
                if (typeof $as !== 'function' || $as[$_definition_keyHint] !== $as || !($instance instanceof $as))
                    return null;

                // Create the level tracker
                var $level = 1;

                do
                {
                    // If the type was found in the chain array, break
                    if ($chain[$level] === $as)
                        break;
                }
                // Continue if the level is still valid
                while (++$level < $levels);

                // Return the public instance
                return $matrix[$level][2];
            };
            var $is = function($is)
            {
                // If the type is the class or the external class, return true
                if ($is === $class || $is === $type)
                    return true;

                // If no type was provided, return false
                if (typeof $is !== 'function')
                    return false;

                // Return true if the instance is an instance of the type
                return !!($instance instanceof $is);
            };

            // Set the "as()" and "is()" methods on the instance
            $__defineProperty__.call($__object__, $instance, 'as', { 'value': $as });
            $__defineProperty__.call($__object__, $instance, 'is', { 'value': $is });

            // Create the class instances
            var $base      = $instance;
            var $private   = null;
            var $protected = null;
            var $public    = $instance;

            // Create the internal get accessors
            var $getterReadonly = function()
            {
                // Return true if the class is initialized
                return $isInit;
            };

            // Create the public and protected override caches
            var $protectedOverrides = !$import && !$optimized ? $__create__.call($__object__, null) : null;
            var $publicOverrides    = !$import && !$optimized ? $__create__.call($__object__, null) : null;

            // Get the injection objects array
            var $injections  = $unsafe ? arguments[$_clone ? 1 : 0] : null;

            // Get the cache matrix if the instance is a clone and set the matrix last stack flag
            var $matrixCache = $_clone ? arguments[0] : null;
            var $matrixLast  = true;

            // If lazy loading is not enabled and the class does not have the import flag and is not optimized
            if (!$_lazy && !$import && !$optimized)
            {
                // Create the contexts and inherits arrays
                var $contexts = new $__array__($levels);
                var $inherits = new $__array__($levels);

                for (var $i = 0; $i < $levels; $i++)
                {
                    // Create the base, private, and public instances
                    $base      = $__create__.call($__object__, $instance);
                    $private   = $__create__.call($__object__, $instance);
                    $public    = $__create__.call($__object__, $instance);

                    // Create the constructor context and matrix instance stack
                    var $context = $__create__.call($__object__, $private);
                    var $stack   = [$private, $base, $public];

                    // Create the inherits objects
                    var $baseInherits      = $__create__.call($__object__, null);
                    var $protectedInherits = $__create__.call($__object__, null);
                    var $publicInherits    = $__create__.call($__object__, null);

                    // Build the matrix instance stack
                    ($i === 0 ? $construct : $chain[$i][$_definition_construct]).call($_lock, $stack, $baseInherits, $protectedInherits, $publicInherits, $protectedOverrides, $publicOverrides, $getterReadonly, $context, $unsafe ? $injections[$i] : null, $matrixCache ? $matrixCache[$i] : null);

                    // Set the instance stack in the instance matrix and constructor context in the contexts array
                    $matrix[$i]   = $stack;
                    $contexts[$i] = $context;
                    $inherits[$i] = [$baseInherits, $protectedInherits, $publicInherits];
                }

                // Define the derived inherits references
                var $derivedBaseInherits      = null;
                var $derivedProtectedInherits = null;
                var $derivedPublicInherits    = null;

                for (var $i = $levels - 1; $i >= 0; $i--)
                {
                    // Get the matrix instance stack
                    var $stack = $matrix[$i];

                    // Get the base, private, and public instances from the instance stack
                    $base    = $stack[1];
                    $private = $stack[0];
                    $public  = $stack[2];

                    // Get the chain data
                    var $chainInternal = $i < $external;
                    var $chainSwitch   = $external > 0 && $i === $external - 1;
                    var $chainType     = $chain[$i];

                    // Get the chain expando flags
                    var $chainExpandoPrivate = $chainType[$_definition_expando_private];
                    var $chainExpandoPublic  = $chainType[$_definition_expando_public];

                    // Build the stack
                    $_constructRuntimeStack($chainType, $matrixLast, $chainSwitch, $instance, $base, $private, null, $public, $typeExternal, $typeInternal, $chainExpandoPrivate, $chainExpandoPublic, $chainInternal);

                    // If the instance is a struct, build the struct stack
                    if ($struct)
                        $_constructRuntimeStruct($chainType, $class, $type, $matrix, $injections, $base, $private, null, $public, $chainExpandoPublic, $chainInternal);

                    // If this is not the last matrix stack
                    if (!$matrixLast)
                    {
                        // Get the base instance reference
                        var $privateBase = $matrix[$i + 1][1];

                        // Define the base instance reference on the private instance
                        $__defineProperty__.call($__object__, $private, '__base', { 'value': $privateBase });

                        // Get the constructor context
                        var $context = $contexts[$i];

                        // Mask the base instance reference with the base constructor
                        $__defineProperty__.call($__object__, $context, '__base', { 'value': $privateBase.constructor });

                        // Freeze the constructor context
                        $__freeze__.call($__object__, $context);

                        // Get the inherits objects
                        var $baseInherits      = $derivedBaseInherits;
                        var $protectedInherits = $derivedProtectedInherits;
                        var $publicInherits    = $derivedPublicInherits;

                        // Get the derived inherits array
                        var $derivedInherits = $inherits[$i];

                        // Get the derived inherits objects
                        $derivedBaseInherits      = $derivedInherits[0];
                        $derivedProtectedInherits = $derivedInherits[1];
                        $derivedPublicInherits    = $derivedInherits[2];

                        // Build the inherits descriptors for the base, private, and public instances
                        $_constructRuntimeInherits($base, $baseInherits, $derivedBaseInherits);
                        $_constructRuntimeInherits($private, $protectedInherits, $derivedProtectedInherits);
                        $_constructRuntimeInherits($private, $publicInherits);
                        $_constructRuntimeInherits($public, $publicInherits, $derivedPublicInherits);
                    }
                    else
                    {
                        // Get the derived inherits array
                        var $derivedInherits = $inherits[$i];

                        // Get the derived inherits objects
                        $derivedBaseInherits      = $derivedInherits[0];
                        $derivedProtectedInherits = $derivedInherits[1];
                        $derivedPublicInherits    = $derivedInherits[2];
                    }

                    // Freeze the base instance object
                    $__freeze__.call($__object__, $base);

                    // If the class is not expando-private, freeze the private instance object
                    if (!$chainExpandoPrivate)
                        $__freeze__.call($__object__, $private);

                    // If the class is not expando-public, freeze the public instance object
                    if (!$chainExpandoPublic)
                        $__freeze__.call($__object__, $public);

                    // Remove the last matrix stack flag
                    $matrixLast = false;
                }
            }
            else
            {
                // Set the protected instance
                $protected = $instance;

                for (var $i = $levels - 1; $i >= 0; $i--)
                {
                    // Create the base, protected, and public instances
                    $base      = $__create__.call($__object__, $base);
                    $protected = $__create__.call($__object__, $protected);
                    $public    = $__create__.call($__object__, $public);

                    // Create the private instance
                    $private = $__create__.call($__object__, $protected);

                    // If this is not the last matrix stack, define the base instance reference on the private instance
                    if (!$matrixLast)
                        $__defineProperty__.call($__object__, $private, '__base', { 'value': $matrix[$i + 1][3] });

                    // Get the chain data
                    var $chainInternal = $i < $external;
                    var $chainSwitch   = $external > 0 && $i === $external - 1;
                    var $chainType     = $chain[$i];

                    // Get the chain expando flags
                    var $chainExpandoPrivate = $chainType[$_definition_expando_private];
                    var $chainExpandoPublic  = $chainType[$_definition_expando_public];

                    // Build the stack
                    $_constructRuntimeStack($chainType, $matrixLast, $chainSwitch, $instance, $base, $private, $protected, $public, $typeExternal, $typeInternal, $chainExpandoPrivate, $chainExpandoPublic, $chainInternal);

                    // If the instance is a struct, build the struct stack
                    if ($struct)
                        $_constructRuntimeStruct($chainType, $class, $type, $matrix, $injections, $base, $private, $protected, $public, $chainExpandoPublic, $chainInternal);

                    // Create the matrix instance stack
                    $matrix[$i] = [$private, $protected, $public, $base];

                    // Remove the last matrix stack flag
                    $matrixLast = false;
                }

                // If the instance is a clone or the class does not have the import flag and is not optimized
                if ($_clone || !$import && !$optimized)
                {
                    // Build the matrix
                    for (var $i = 0; $i < $levels; $i++)
                        ($i === 0 ? $construct : $chain[$i][$_definition_construct]).call($_lock, $matrix[$i], null, null, null, $protectedOverrides, $publicOverrides, $getterReadonly, null, $unsafe ? $injections[$i] : null, $matrixCache ? $matrixCache[$i] : null);
                }
                // Build the precompiled matrix
                else
                    $construct.call($_lock, $matrix, $getterReadonly, $unsafe ? $injections : null);
            }

            // Create a reference for the return value of the constructor and get the constructor wrapper
            var $return  = undefined;
            var $wrapper = $private.constructor;

            // If the class is not a struct
            if (!$struct)
            {
                // If the class is unsafe
                if ($unsafe)
                {
                    // If any additional arguments were provided, execute the constructor wrapper with the extra arguments
                    if (arguments.length > 1)
                        $return = $wrapper.apply($private, $__arrayProto__.slice.call(arguments, 1));
                    // Execute the constructor wrapper
                    else
                        $return = $wrapper.call($private);
                }
                // If arguments were provided, execute the constructor wrapper with the arguments
                else if (arguments.length)
                    $return = $wrapper.apply($private, arguments);
                // Execute the constructor wrapper
                else
                    $return = $wrapper.call($private);
            }
            // Execute the parameterless constructor wrapper
            else
                $wrapper.call($private);

            // Set the initialized flag
            $isInit = true;

            // If the "new" keyword was not used and the return value of the constructor was not undefined, return it
            if (!$isNew && $return !== undefined)
                return $return;

            // Return the public instance
            return $public;
        };

        // Prepend the class to the chain array, set the levels count, and set the external type
        $levels = $chain.unshift($class);
        $type   = !$internal || $external < $levels ? $chain[$external] : $_class;

        // If the class has the import flag or is optimized, set the constructor in the cache definitions object
        if ($import || $optimized)
            $__defineProperty__.call($__object__, $classCache, 'constructor', { 'enumerable': true, 'value': $constructor });

        // Create the precompile string and helper function references
        var $eval       = null;
        var $precompile = null;

        // If the class does not have the import flag
        if (!$import)
        {
            // If a base class was provided and it is abstract
            if ($baseClass && $baseClass[$_definition_abstract])
            {
                // Get the array of keys for the base protected and public definitions objects
                var $baseProtectedKeys = $__keys__.call($__object__, $baseProtected);
                var $basePublicKeys    = $__keys__.call($__object__, $basePublic);

                // Compile the protected definitions for each property defined in the base protected definitions
                for (var $i = 0, $j = $baseProtectedKeys.length; $i < $j; $i++)
                    $_definitionsCompilerBaseAbstract($classProtected, $baseProtected, $baseProtectedKeys[$i]);

                // Compile the public definitions for each property defined in the base public definitions
                for (var $i = 0, $j = $basePublicKeys.length; $i < $j; $i++)
                    $_definitionsCompilerBaseAbstract($classPublic, $basePublic, $basePublicKeys[$i]);
            }

            for (var $definitionsPrototypeMember in $definitionsPrototype)
            {
                // Get the definition from the prototype definitions object
                var $definition = $definitionsPrototype[$definitionsPrototypeMember];

                // If the definition is not a prototype definition, continue
                if ($definition[$_definition_member_type] !== 'prototype')
                    continue;

                // Set the prototype member descriptor
                $__defineProperty__.call($__object__, $classPrototype, $definition[$_definition_member_name], { 'enumerable': true, 'value': $definition[$_definition_member_value] });
            }

            for (var $definitionsStaticMember in $definitionsStatic)
            {
                // Get the definition from the static definitions object
                var $definition = $definitionsStatic[$definitionsStaticMember];

                // If the definition is not a static definition, continue
                if ($definition[$_definition_member_type] !== 'static')
                    continue;

                // Set the static member descriptor
                $__defineProperty__.call($__object__, $class, $definition[$_definition_member_name], { 'enumerable': true, 'value': $definition[$_definition_member_value] });
            }

            // Create the constructor definition array
            var $constructorDefinition = new $__array__($_definition_member_flagCount);

            // Set the constructor definition data
            $constructorDefinition[$_definition_member_method_abstract] = false;
            $constructorDefinition[$_definition_member_method_final]    = false;
            $constructorDefinition[$_definition_member_method_virtual]  = false;
            $constructorDefinition[$_definition_member_name]            = 'constructor';
            $constructorDefinition[$_definition_member_type]            = 'method';
            $constructorDefinition[$_definition_member_value]           = $constructor;

            // Set the constructor in the protected definitions object
            $__defineProperty__.call($__object__, $classProtected, 'constructor', { 'enumerable': true, 'value': $constructorDefinition });

            // Get the arrays of private, protected, and public member keys
            var $classPrivateKeys   = $__keys__.call($__object__, $classPrivate);
            var $classProtectedKeys = $__keys__.call($__object__, $classProtected);
            var $classPublicKeys    = $__keys__.call($__object__, $classPublic);

            // Create the construct and precompile helper functions
            $construct  = function($stack, $baseInherits, $protectedInherits, $publicInherits, $protectedOverrides, $publicOverrides, $readonly, $context, $injections, $cache)
            {
                // If this function was not internally unlocked, return
                if (this !== $_lock)
                    return;

                // Create the stack instance references
                var $base      = null;
                var $private   = $stack[0];
                var $protected = null;
                var $public    = $stack[2];

                // If lazy loading is enabled
                if ($_lazy)
                {
                    // Set the stack instance references
                    $base      = $stack[3];
                    $protected = $stack[1];
                }
                // Set the stack instance references (no protected)
                else
                    $base = $stack[1];

                // Get the instance caches
                var $cachePrivate   = $cache ? $cache[0] : null;
                var $cacheProtected = $cache ? $cache[1] : null;
                var $cachePublic    = $cache ? $cache[2] : null;

                // Construct each private member definition in the instance matrix
                for (var $i = 0, $j = $classPrivateKeys.length; $i < $j; $i++)
                    $_constructRuntimeDefinition($classPrivateKeys[$i], $classPrivate, null, null, null, $readonly, null, false, false, $base, $private, $protected, $public, $injections, $cachePrivate);

                // Construct each protected member definition in the instance matrix
                for (var $i = 0, $j = $classProtectedKeys.length; $i < $j; $i++)
                    $_constructRuntimeDefinition($classProtectedKeys[$i], $classProtected, $protectedOverrides, $protectedInherits, $baseInherits, $readonly, $context, true, false, $base, $private, $protected, $public, $injections, $cacheProtected);

                // Construct each public member definition in the instance matrix
                for (var $i = 0, $j = $classPublicKeys.length; $i < $j; $i++)
                    $_constructRuntimeDefinition($classPublicKeys[$i], $classPublic, $publicOverrides, $publicInherits, $baseInherits, $readonly, null, false, true, $base, $private, $protected, $public, $injections, $cachePublic);

                // If lazy loading is enabled
                if ($_lazy)
                {
                    // Freeze the base and protected instance objects
                    $__freeze__.call($__object__, $base);
                    $__freeze__.call($__object__, $protected);

                    // If the class is not expando-private, freeze the private instance object
                    if (!$expandoPrivate)
                        $__freeze__.call($__object__, $private);

                    // If the class is not expando-public, freeze the public instance object
                    if (!$expandoPublic)
                        $__freeze__.call($__object__, $public);
                }
            };
            $precompile = function()
            {
                // If this function was not internally unlocked, return
                if (this !== $_lock)
                    return;

                // If the precompiled string is not found, generate it
                if (!$eval)
                    $eval = $_constructRuntimePrecompile($chain);

                // Create the precompiled export string
                var $evalExport = '{' + $eval + '};';

                // Append the class data to the precompiled export string
                $evalExport += '$.a=' + ($abstract ? '!0' : '!1') + ';';
                $evalExport += '$.f=' + ($final ? '!0' : '!1') + ';';
                $evalExport += '$.i=' + ($internal ? '!0' : '!1') + ';';
                $evalExport += '$.k0=' + $classPrivateKeys.length + ';';
                $evalExport += '$.k1=' + $classProtectedKeys.length + ';';
                $evalExport += '$.k2=' + $classPublicKeys.length + ';';
                $evalExport += '$.l=' + $levels + ';';
                $evalExport += '$.s=' + ($struct ? '!0' : '!1') + ';';

                // If the class is unsafe, append the unsafe (razor) class data to the precompiled export string
                if ($unsafe)
                    $evalExport += '$.u="@unsafe";';

                // Return the precompiled export string with the prepended precompile prefix (say that three times fast)
                return $_const_precompile_prefix + $evalExport;
            };
        }
        else
        {
            // Get the array of cached member keys
            var $classCacheKeys = $__keys__.call($__object__, $classCache);

            // If the imported class data doesn't validate, throw an exception
            if ($levels !== $construct['l'] || $classCacheKeys.length !== $construct['k0'] + $construct['k1'] + $construct['k2'])
                throw $_exceptionFormat($_lang_$$_import);
        }

        // Freeze the class definitions objects
        $__freeze__.call($__object__, $classCache);
        $__freeze__.call($__object__, $classPrivate);
        $__freeze__.call($__object__, $classProtected);
        $__freeze__.call($__object__, $classPublic);

        // If the prototype is not expando, freeze the prototype
        if (!$import && !$expandoPrototype)
            $__freeze__.call($__object__, $classPrototype);

        // Create the class data
        var $data = {};

        // Set the class cache data
        $data[$_definition_abstract]          = { 'value': $abstract };
        $data[$_definition_baseClass]         = { 'value': $baseClass };
        $data[$_definition_cache]             = { 'value': $classCache };
        $data[$_definition_construct]         = { 'value': !$import && !$final ? $construct : null};
        $data[$_definition_expando_class]     = { 'value': $expandoClass };
        $data[$_definition_expando_private]   = { 'value': $expandoPrivate };
        $data[$_definition_expando_prototype] = { 'value': $expandoPrototype };
        $data[$_definition_expando_public]    = { 'value': $expandoPublic };
        $data[$_definition_final]             = { 'value': $final };
        $data[$_definition_import]            = { 'value': $import };
        $data[$_definition_internal]          = { 'value': $internal };
        $data[$_definition_keyHint]           = { 'value': $class };
        $data[$_definition_optimized]         = { 'value': $optimized };
        $data[$_definition_private]           = { 'value': $_definitionsCompilerLock($classPrivate) };
        $data[$_definition_precompile]        = { 'value': $precompile };
        $data[$_definition_protected]         = { 'value': $_definitionsCompilerLock($classProtected) };
        $data[$_definition_public]            = { 'value': $_definitionsCompilerLock($classPublic) };
        $data[$_definition_struct]            = { 'value': $struct };
        $data[$_definition_unsafe]            = { 'value': $unsafe };

        // Set the class data
        $__defineProperties__.call($__object__, $class, $data);

        // Set the class prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
        $class.prototype = $classPrototype;

        // Set the class prototype without the "writable" flag
        $__defineProperty__.call($__object__, $class, 'prototype', { 'value': $classPrototype, 'writable': false });

        // If a static "toString()" definition was not provided, set the class toString() method
        if (!$__hasOwnProperty__.call($definitionsStatic, 'toString'))
            $class.toString = $_class_toString;

        // If the class does not have the import flag and is not expando, freeze the class
        if (!$import && !$expandoClass)
            $__freeze__.call($__object__, $class);

        // If the class has the import flag or is optimized
        if ($import || $optimized)
        {
            // If the class is optimized
            if ($optimized)
            {
                // Generate the precompiled string and the optimized construct function factory
                $eval      = $_constructRuntimePrecompile($chain);
                $construct = new Function($_const_construct_arguments, '"use strict";' + $eval);
            }

            // Generate the optimized construct function
            $construct = $construct.call
            (
                $$,                         // this
                $chain,                     // c
                $_definition_cache,         // k
                $_importRuntimeField,       // f
                $_importRuntimeMethod,      // m
                $_importRuntimeAccessor,    // a
                $_importRuntimeDescriptor,  // d
                $_importRuntimeDescriptor2, // d2
                $_importRuntimeProperty,    // p
                $_importRuntimeLock         // l
            );
        }

        // If the export flag is set, return the precompiled export string
        if ($export)
            return $precompile.call($_lock) || '';

        // Return the class
        return $class;
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
    $__forEach__.call('private protected public prototype static'.split(' '), function($modifier)
    {
        // Create the package method
        var $method = function($modifiers, $value)
        {
            // Create the member package
            var $package = new $__array__($_package_flagCount);

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
        };

        // If the modifier is the prototype modifier
        if ($modifier === 'prototype')
        {
            // Set the prototype method initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
            $$.prototype = $method;

            // Set the prototype method without the "writable" flag
            $__defineProperty__.call($__object__, $$, 'prototype', { 'value': $method, 'writable': false });
        }
        // Define the package method for the access modifier
        else
            $_defineMethod($modifier, $method);
    });

    // ########## TYPES ##########

    // Define the "type()" method and the "is()" methods for internal JavaScript types
    (function()
    {
        // Create the types lookup
        var $types = $__create__.call($__object__, null);

        // Iterate the internal JavaScript types
        $__forEach__.call('Array Boolean Date Error Function Number RegExp String'.split(' '), function($type)
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

        // Iterate the known aliases of the internal JavaScript window type
        $__forEach__.call('global Window DOMWindow'.split(' '), function($alias)
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
            if ($object === window || $object.window === $object && !$__hasOwnProperty__.call($object, 'window') && $__getPrototypeOf__.call($__object__, $object) === null)
                return 'window';

            // If the object is a class instance, return the "instance" type string
            if ($object instanceof $_class)
                return 'instance';

            // Return the type string from the types lookup using the native "toString()" function
            return $types[$__toString__.call($object)] || 'object';
        });
    })();

    // ########## CHECKS ##########

    // ---------- ABSTRACT CLASS ----------
    $_defineMethod('isAbstractClass', function($object)
    {
        // Return true if the object is a class and it is abstract
        return $$.isClass($object) && !!$object[$_definition_abstract];
    });

    // ---------- ARGUMENTS OBJECT ----------
    $_defineMethod('isArgumentsObject', function($object)
    {
        // Return true if the object is an arguments object
        return $__toString__.call($object) === '[object Arguments]';
    });

    // ---------- ARRAY-LIKE OBJECT ----------
    $_defineMethod('isArrayLikeObject', function($object)
    {
        // If the object is undefined or null, return false
        if ($object === undefined || $object === null)
            return false;

        // Get the object length
        var $length = $object.length;

        // Return true if the length is a finite integer greater than or equal to zero
        return $$.isFiniteInt($length) && $length >= 0;
    });

    // ---------- CLASS ----------
    $_defineMethod('isClass', function($object)
    {
        // Return true if the object is a function and has a class key hint
        return typeof $object === 'function' && $object[$_definition_keyHint] === $object;
    });

    // ---------- COMPLEX OBJECT ----------
    $_defineMethod('isComplexObject', function($object)
    {
        // If the object is not an object, return false
        if (!$object || $$.type($object) !== 'object')
            return false;

        // Return true if the prototype of the object is not the object prototype
        return $__getPrototypeOf__.call($__object__, $object) !== $__objectProto__;
    });

    // ---------- FINITE ----------
    $_defineMethod('isFinite', function($number)
    {
        // Return true if the object is a number and is finite
        return $$.isNumber($number) && !!isFinite($number);
    });

    // ---------- FINITE INTEGER ----------
    $_defineMethod('isFiniteInt', function($number)
    {
        // Return true if the object is a number, finite, and within the maximum and minimum representable integers
        return $$.isFinite($number) && $number <= $_const_int_max && $number >= $_const_int_min && $number === Math.floor($number);
    });

    // ---------- FLAT OBJECT ----------
    $_defineMethod('isFlatObject', function($object)
    {
        // If the object is not an object, return false
        if (!$object || $$.type($object) !== 'object')
            return false;

        // Return true if the prototype of the object is null
        return $__getPrototypeOf__.call($__object__, $object) === null;
    });

    // ---------- IMPORTED CLASS ----------
    $_defineMethod('isImportedClass', function($object)
    {
        // Return true if the object is a class and it has the import flag
        return $$.isClass($object) && !!$object[$_definition_import];
    });

    // ---------- INTERNAL CLASS ----------
    $_defineMethod('isInternalClass', function($object)
    {
        // Return true if the object is a class and it has the internal flag
        return $$.isClass($object) && !!$object[$_definition_internal];
    });

    // ---------- INFINITY ----------
    $_defineMethod('isInfinity', function($number)
    {
        // Return true if the object is a number, is not NaN, and is not finite
        return $$.isNumber($number) && !isNaN($number) && !isFinite($number);
    });

    // ---------- INSTANCE ----------
    $_defineMethod('isInstance', function($object)
    {
        // If the object is undefined or null, return false
        if ($object === undefined || $object === null)
            return false;

        // Return true if the object is an instance of a class
        return !!($object instanceof $_class);
    });

    // ---------- NOT-A-NUMBER ----------
    $_defineMethod('isNaN', function($number)
    {
        // Return true if the object is a number and is NaN
        return $$.isNumber($number) && !!isNaN($number);
    });

    // ---------- NEGATIVE INFINITY ----------
    $_defineMethod('isNegativeInfinity', function($number)
    {
        // Return true if the object is a number, is not NaN, is not finite, and is less than zero
        return $$.isNumber($number) && !isNaN($number) && !isFinite($number) && $number < 0;
    });

    // ---------- NULL ----------
    $_defineMethod('isNull', function($argument)
    {
        // Return true if the argument is null
        return $argument === null;
    });

    // ---------- OBJECT ----------
    $_defineMethod('isObject', function($object)
    {
        // Return true if the object is neither undefined nor null
        return $object !== undefined && $object !== null;
    });

    // ---------- OBJECT INSTANCE ----------
    $_defineMethod('isObjectInstance', function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object === null || $object === undefined)
            return false;

        // Return true if the object inherits from the object prototype
        return !!($object instanceof $__object__);
    });

    // ---------- OPTIMIZED CLASS ----------
    $_defineMethod('isOptimizedClass', function($object)
    {
        // Return true if the object is a class and it is optimized
        return $$.isClass($object) && !!$object[$_definition_optimized];
    });

    // ---------- POSITIVE INFINITY ----------
    $_defineMethod('isPositiveInfinity', function($number)
    {
        // Return true if the object is a number, is not NaN, is not finite, and is greater than zero
        return $$.isNumber($number) && !isNaN($number) && !isFinite($number) && $number > 0;
    });

    // ---------- PRIMITIVE ----------
    $_defineMethod('isPrimitive', function($object)
    {
        // If the object is a null reference or undefined, return true
        if ($object === null || $object === undefined)
            return true;

        // Get the primitive type of the object
        var $typeof = typeof $object;

        // Return true if the object is a boolean, number, or string primitive
        return $typeof === 'boolean' || $typeof === 'number' || $typeof === 'string';
    });

    // ---------- PRIMITIVE-TYPE ----------
    $_defineMethod('isPrimitiveType', function($object)
    {
        // If the object is a null reference or undefined, return true
        if ($object === null || $object === undefined)
            return true;

        // Get the type of the object
        var $type = $$.type($object);

        // Return true if the object is a value type
        return $type === 'string' || $type === 'number' || $type === 'boolean';
    });

    // ---------- REFERENCE-TYPE ----------
    $_defineMethod('isReferenceType', function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object === null || $object === undefined)
            return false;

        // Get the type of the object
        var $type = $$.type($object);

        // Return true if the object is not a value type
        return $type !== 'boolean' && $type !== 'number' && $type !== 'string';
    });

    // ---------- SEALED CLASS ----------
    $_defineMethod('isSealedClass', function($object)
    {
        // Return true if the object is a class and it is final
        return $$.isClass($object) && !!$object[$_definition_final];
    });

    // ---------- SIMPLE OBJECT ----------
    $_defineMethod('isSimpleObject', function($object)
    {
        // If the object is not an object, return false
        if (!$object || $$.type($object) !== 'object')
            return false;

        // Return true if the prototype of the object is the object prototype
        return $__getPrototypeOf__.call($__object__, $object) === $__objectProto__;
    });

    // ---------- STRUCT ----------
    $_defineMethod('isStruct', function($object)
    {
        // Return true if the object is a class and it has the struct modifier
        return $$.isClass($object) && !!$object[$_definition_struct];
    });

    // ---------- UNDEFINED ----------
    $_defineMethod('isUndefined', function($argument)
    {
        // Return true if the argument is undefined
        return $argument === undefined;
    });

    // ---------- VALUE-TYPE ----------
    $_defineMethod('isValueType', function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object === null || $object === undefined)
            return false;

        // Get the type of the object
        var $type = $$.type($object);

        // Return true if the object is a boolean, number, or string
        return $type === 'boolean' || $type === 'number' || $type === 'string';
    });

    // ---------- WINDOW ----------
    $_defineMethod('isWindow', function($object)
    {
        // If the object is the window object, return true
        if ($object === window)
            return true;

        // If the object is a null reference or undefined, return false
        if ($object === null || $object === undefined)
            return false;

        // Return true if the object is a window reference
        return $$.type($object) === 'window';
    });

    // ---------- WINDOW-LIKE OBJECT ----------
    $_defineMethod('isWindowLikeObject', function($object)
    {
        // Return true if the object is neither undefined nor null and has a window property that is a self reference
        return $object !== undefined && $object !== null && $object.window === $object;
    });

    // ########## CASTS ##########

    // ---------- ARRAY ----------
    $_defineMethod('asArray', function($object)
    {
        // If the object is a null reference or undefined, return an empty array
        if ($object === null || $object === undefined)
            return [];

        // If the object is already an array, return the array
        if ($__isArray__.call($__array__, $object))
            return $object;

        // Get the type of the object
        var $type = typeof $object;

        // If the object is a primitive type, return an empty array
        if ($type === 'boolean' || $type === 'number' || $type === 'string')
            return [];

        // Get the object collection length and create the array
        var $length = Math.max(0, $$.asInt($object.length, true));
        var $array  = new $__array__($length);

        // Set the object values in the array
        for (var $i = 0; $i < $length; $i++)
            $array[$i] = $object[$i];

        // Return the array
        return $array;
    });

    // ---------- BOOL ----------
    $_defineMethod('asBool', function($object)
    {
        // Return the object cast as a boolean
        return !!$object;
    });

    // ---------- FLOAT ----------
    $_defineMethod('asFloat', function($object)
    {
        // Get the object type
        var $type = $$.type($object);

        // If the object is a string and matches a float, return the object cast as a float
        if ($type === 'string' && $__match__.call($__trim__.call($object), /^[-+]?[0-9]*\.?[0-9]+(e[-+]?[0-9]+)?$/i))
            return parseFloat($object);

        // If the object is not a number, return NaN
        if ($type !== 'number')
            return NaN;

        // Return the number
        return $object;
    });

    // ---------- INTEGER ----------
    $_defineMethod('asInt', function($object, $finite)
    {
        // Cast the object as a float
        $object = $$.asFloat($object);

        // If the object is not a number, return NaN
        if (isNaN($object))
            return $finite ? 0 : NaN;

        // If the number is greater than the maximum integer, return infinity
        if ($object > $_const_int_max)
            return $finite ? $_const_int_max : Infinity;

        // If the number is less than the minimum integer, return negative infinity
        if ($object < $_const_int_min)
            return $finite ? $_const_int_min : -Infinity;

        // If the number is less than zero, return the number as an integer (rounded towards zero)
        if ($object < 0)
            return Math.ceil($object);

        // Return the number as an integer (rounded towards zero)
        return Math.floor($object);
    });

    // ---------- OBJECT ----------
    $_defineMethod('asObject', function($object)
    {
        // If the object is a null reference or undefined, return an empty object
        if ($object === null || $object === undefined)
            return {};

        // Return the object
        return $object;
    });

    // ---------- STRING ----------
    $_defineMethod('asString', function($object)
    {
        // Get the object type
        var $type = $$.type($object);

        // If the object is a string, return the object
        if ($type === 'string')
            return $object;

        // If the object is a boolean or a number, return the object cast as a string
        if ($type === 'boolean' || $type === 'number')
            return $object + '';

        // Return an empty string
        return '';
    });

    // ########## HELPERS ##########

    // ---------- BASE ----------
    $_defineMethod('base', function($class)
    {
        // CHECK $class
        if (!$$.isClass($class))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('base', arguments);

            return null;
        }

        // Return the base class
        return $class[$_definition_baseClass] || null;
    });

    // ---------- EMPTY ----------
    $_defineMethod('empty', function()
    {
        // Return an empty function
        return function()
        {
            //
        };
    });

    // ---------- EXPORT ----------
    $_defineMethod('export', function($class)
    {
        // CHECK $class
        if (!$$.isClass($class))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('export', arguments);

            // Return an empty string
            return '';
        }

        // If the class has the import flag
        if ($class[$_definition_import])
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionFormat($_lang_export_import);

            // Return an empty string
            return '';
        }

        // If the class has the struct flag
        if ($class[$_definition_struct])
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionFormat($_lang_export_struct);

            // Return an empty string
            return '';
        }

        // Return the precompiled string
        return $class[$_definition_precompile].call($_lock) || '';
    });

    // ---------- FLAT ----------
    $_defineMethod('flat', function()
    {
        // Return a new flat object
        return $__create__.call($__object__, null);
    });

    // ---------- FORMAT ----------
    $_defineMethod('format', function($string)
    {
        // CHECK $string
        if (!$$.isString($string))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('format', arguments);

            // Return an empty string
            return '';
        }

        // Get the arguments
        var $arguments = arguments;

        // Return the formatted string
        return $__replace__.call($string, /\{([0-9]{1,2})\}/g, function($0, $1)
        {
            // Get the argument index
            var $argumentIndex = $$.asInt($1) + 1;

            // If the argument index exceeded the number of arguments, use the match as the replacement
            if ($argumentIndex >= $arguments.length)
                return $0;

            // Use the argument as the replacement
            return $$.asString($arguments[$argumentIndex]);
        });
    });

    // ########## SETTINGS ##########

    // ---------- DEBUG ----------
    $_defineProperty('debug', function()
    {
        // Return the debug flag
        return $_debug;
    }, function($v)
    {
        // Set the debug flag
        $_debug = $$.asBool($v);
    });

    // ---------- LAZY ----------
    $_defineProperty('lazy', function()
    {
        // Return the lazy flag
        return $_lazy;
    }, function($v)
    {
        // Set the lazy flag
        $_lazy = $$.asBool($v);
    });

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