/*! ------------------------------------------------------------------------
//                               jTypes 2.1.0b
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

    // ########## VERSION ##########

    // Set the jTypes version
    var $_version = '2.1.0b';

    // ########## LANGUAGE ##########

    // Create the language prefix and arguments exception
    var $_lang_compatibility       = 'A browser that supports JavaScript 1.8.5 (MSIE 9+) is required.';
    var $_lang_exception_arguments = '"{0}({1})" has some invalid arguments.';
    var $_lang_exception_prefix    = 'jTypes Error: ';

    // Create the language constants
    var $_lang_$$_abstract_instance                = 'Abstract classes cannot be instantiated.';
    var $_lang_$$_abstract_override                = 'Class must implement the inherited abstract {1} "{0}" with the override modifier.';
    var $_lang_$$_abstract_sealed                  = 'Classes cannot have the abstract and sealed modifiers.';
    var $_lang_$$_derive_sealed                    = 'Classes cannot inherit from a sealed class.';
    var $_lang_$$_field_readonly                   = '"{0}" cannot be set because it is a read-only field.';
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
    var $_lang_$$_member_name_prototype_2          = '"{0}" cannot have more than one definition or hide an inherited non-prototype member.';
    var $_lang_$$_member_name_static_2             = '"{0}" cannot have more than one static definition.';
    var $_lang_$$_member_name_invalid              = '"{1}" is not a valid {0} name.';
    var $_lang_$$_member_name_null                 = '"" is not a valid {0} name.';
    var $_lang_$$_member_override_null             = '"{0}" has no suitable {1} to override.';
    var $_lang_$$_member_property_accessors        = '"{0}" must have both accessors to have an access modifier on the {1} accessor.';
    var $_lang_$$_member_property_accessors_access = '"{0}" must have a more restrictive access modifier on the {1} accessor.';
    var $_lang_$$_member_property_function         = '"{0}" must have a function for the {1} accessor.';
    var $_lang_$$_member_property_keyword          = '"{0}" has an invalid modifier "{2}" on the {1} accessor.';
    var $_lang_$$_member_property_keyword_access_2 = '"{0}" cannot have access modifiers on both property accessors.';
    var $_lang_$$_member_property_name_invalid     = '"{0}" cannot have a "{1}" property accessor.';
    var $_lang_$$_member_property_name_null        = '"{0}" must have at least one property accessor.';
    var $_lang_$$_member_virtual                   = '"{0}" cannot have the virtual modifier in a sealed class.';

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
    
    // ########## EXCEPTIONS ##########
    
    // Create the exception arguments and format helpers
    var $_exceptionArguments = function($name, $arguments)
    {
        // If a name was provided, prepend "$$." for reference
        if ($name)
            $name = '$$.' + $name;
        // The jTypes function is throwing the exception instead
        else
            $name = '$$';
        
        // Create the types array
        var $types = [];

        // Put the argument types into the types array
        for (var $i = 0, $j = $arguments.length; $i < $j; $i++)
            $types[$i] = $$.type($arguments[$i]);

        // Return the exception string
        return $_lang_exception_prefix + $$.format($_lang_exception_arguments, $name, $types.join(', '));
    };
    var $_exceptionFormat    = function($message)
    {
        // Return the exception string
        return $_lang_exception_prefix + $$.format.apply($$, arguments);
    };

    // ########## CLASSES ##########
    
    // Create the characters string and keys array
    var $_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var $_keys       = [];

    // Append the lowercase characters to the characters string
    $_characters += $_characters.toLowerCase();

    // Create the key generator helper
    var $_keyGenerator = function($length)
    {
        // If no length was provided, use a default length of three
        if (!$length)
            $length = 3;

        // Create the key
        var $key = '';

        do
        {
            // Reset the key
            $key = '';

            // Append random characters to the key
            for (var $i = 0; $i < $length; $i++)
                $key += $_characters.charAt(Math.floor($_characters.length * Math.random()));
        }
        // Break if the key was already found in the keys array
        while ($__indexOf__.call($_keys, $key) >= 0);

        // Push the key into the keys array
        $_keys.push($key);

        // Return the key
        return '~' + $key;
    };

    // Create the definition obfuscated constant length
    var $_definition_keyLength = 3;

    // Create the definition obfuscated constants
    var $_definition_abstract          = $_keyGenerator($_definition_keyLength);
    var $_definition_baseClass         = $_keyGenerator($_definition_keyLength);
    var $_definition_construct         = $_keyGenerator($_definition_keyLength);
    var $_definition_expando_class     = $_keyGenerator($_definition_keyLength);
    var $_definition_expando_private   = $_keyGenerator($_definition_keyLength);
    var $_definition_expando_prototype = $_keyGenerator($_definition_keyLength);
    var $_definition_expando_public    = $_keyGenerator($_definition_keyLength);
    var $_definition_final             = $_keyGenerator($_definition_keyLength);
    var $_definition_protected         = $_keyGenerator($_definition_keyLength);
    var $_definition_public            = $_keyGenerator($_definition_keyLength);

    // Create the definition member obfuscated constants
    var $_definition_member_field_readOnly     = $_keyGenerator($_definition_keyLength);
    var $_definition_member_method_abstract    = $_keyGenerator($_definition_keyLength);
    var $_definition_member_method_final       = $_keyGenerator($_definition_keyLength);
    var $_definition_member_method_virtual     = $_keyGenerator($_definition_keyLength);
    var $_definition_member_name               = $_keyGenerator($_definition_keyLength);
    var $_definition_member_property_accessors = $_keyGenerator($_definition_keyLength);
    var $_definition_member_type               = $_keyGenerator($_definition_keyLength);
    var $_definition_member_value              = $_keyGenerator($_definition_keyLength);

    // Create the accessor member flags length
    var $_accessor_member_flagCount = 0;
    
    // Create the accessor member flags
    var $_accessor_member_hasModifier = $_accessor_member_flagCount++;
    var $_accessor_member_name        = $_accessor_member_flagCount++;
    var $_accessor_member_private     = $_accessor_member_flagCount++;
    var $_accessor_member_protected   = $_accessor_member_flagCount++;
    var $_accessor_member_public      = $_accessor_member_flagCount++;
    var $_accessor_member_value       = $_accessor_member_flagCount++;

    // Create the base class of all classes
    var $_class = function()
    {
        //
    };

    // Create the base prototype of all prototypes
    var $_prototype = (
    {
        // ----- FIELDS -----
        'constructor': $_class,

        // ----- METHODS -----
        'toString': function()
        {
            // Return an instance type string
            return '[object Instance]';
        }
    });

    // Freeze the base prototype of all prototypes
    $__freeze__.call($__object__, $_prototype);

    // Set the base class of all classes base prototype of all prototypes
    $_class.prototype = $_prototype;

    // Freeze the base class of all classes
    $__freeze__.call($__object__, $_class);

    // Define the class toString method
    var $_class_toString = function()
    {
        // Return a class type string
        return '[object Class]';
    };

    // Create the lazy, subclass, and unsafe flags
    var $_lazy     = true;// DEFAULT
    var $_subclass = false;// DON'T CHANGE
    var $_unsafe   = false;// DON'T CHANGE

    // Create the definition compiler helper functions
    var $_definitionsCompilerAccessorMethod = function($definitions, $privateDefinitions, $protectedDefinitions, $publicDefinitions, $accessor, $type, $abstract, $override, $sealed, $virtual, $hasTwoAccessors)
    {
        // Create the property method definition object
        var $method = {};

        // Set the method definition object data
        $method[$_definition_member_method_abstract]    = !$accessor[$_accessor_member_private] && $abstract;
        $method[$_definition_member_method_final]       = !$accessor[$_accessor_member_private] && $sealed;
        $method[$_definition_member_method_virtual]     = !$accessor[$_accessor_member_private] && ($virtual || $abstract || $override);
        $method[$_definition_member_name]               = $accessor[$_accessor_member_name].substr(5);
        $method[$_definition_member_property_accessors] = $hasTwoAccessors;
        $method[$_definition_member_type]               = $type;
        $method[$_definition_member_value]              = $accessor[$_accessor_member_value];
                        
        // Freeze the method definition object
        $__freeze__.call($__object__, $method);

        // If the accessor has an access modifier
        if ($accessor[$_accessor_member_hasModifier])
        {
            // If the accessor is private, set the method definition in the private definitions object
            if ($accessor[$_accessor_member_private])
                $__defineProperty__.call($__object__, $privateDefinitions, $accessor[$_accessor_member_name], { 'enumerable': true, 'value': $method });
            // If the accessor is protected, set the method definition in the protected definitions object
            else if ($accessor[$_accessor_member_protected])
                $__defineProperty__.call($__object__, $protectedDefinitions, $accessor[$_accessor_member_name], { 'enumerable': true, 'value': $method });
            // If the accessor is public, set the method definition in the public definitions object
            else if ($accessor[$_accessor_member_public])
                $__defineProperty__.call($__object__, $publicDefinitions, $accessor[$_accessor_member_name], { 'enumerable': true, 'value': $method });
        }
        // Set the method definition in the definitions object
        else
            $__defineProperty__.call($__object__, $definitions, $accessor[$_accessor_member_name], { 'enumerable': true, 'value': $method });
    };
    var $_definitionsCompilerBaseAbstracts  = function($definitions, $baseDefinitions, $baseKey)
    {
        // Get the base definition object from the base definitions object
        var $baseDefinition = $baseDefinitions[$baseKey];
                    
        // If the base definition is not abstract, break
        if (!$baseDefinition[$_definition_member_method_abstract])
            return;

        // Get the definition from the definitions object
        var $definition = $__hasOwnProperty__.call($definitions, $baseKey) && $definitions[$baseKey] || null;

        // If no definition was found or it does not match the type of the base definition, throw an exception
        if (!$definition || $definition[$_definition_member_type] !== $baseDefinition[$_definition_member_type])
            throw $_exceptionFormat($_lang_$$_abstract_override, $baseDefinition[$_definition_member_name], $baseDefinition[$_definition_member_type]);
    };
    var $_definitionsCompilerBaseMethod     = function($key, $type, $typeName, $baseClass, $override, $protected, $public)
    {
        // If no type name was provided, use the type as the type name
        if (!$typeName)
            $typeName = $type;

        var $baseDefinition = null;

        // If the method has the protected access modifier, get the protected base definition object
        if ($protected)
            $baseDefinition = $baseClass[$_definition_protected][$key] || null;
        // If the method has the public access modifier, get the public base definition object
        else if ($public)
            $baseDefinition = $baseClass[$_definition_public][$key] || null;

        // If the method has the override modifier
        if ($override)
        {
            // If no base definition was found, or it is not a virtual base method, or it is a final base method, throw an exception
            if (!$baseDefinition || $baseDefinition[$_definition_member_type] !== $type || !$baseDefinition[$_definition_member_method_virtual] || $baseDefinition[$_definition_member_method_final])
                throw $_exceptionFormat($_lang_$$_member_override_null, $key.charAt(0) === '~' ? $key.substr(5) : $key, $typeName);
        }
        // If the base definition is abstract, throw an exception
        else if ($baseDefinition && $baseDefinition[$_definition_member_method_abstract])
            throw $_exceptionFormat($_lang_$$_member_abstract_override, $key.charAt(0) === '~' ? $key.substr(5) : $key, $type);
    };
    var $_definitionsCompiler               = function($privateDefinitions, $protectedDefinitions, $publicDefinitions, $prototypeDefinitions, $staticDefinitions, $key, $value, $baseClass, $isAbstract, $isFinal)
    {
        // Create the type
        var $type = 'field';
        
        // If the value is a function, set the type as a method
        if ($$.isFunction($value))
            $type = 'method';
        // If the value is a simple object, set the type as a property
        else if ($$.isSimpleObject($value))
            $type = 'property';
        
        // Break the key string into a keywords array and get the member name
        var $keywords = $$.asString($key).trim().split(' ') || [];
        var $name     = $$.asString($keywords.pop());

        // If the name is empty or whitespace, throw an exception
        if (!$name.trim())
            throw $_exceptionFormat($_lang_$$_member_name_null, $type);
        
        // If the name is not a valid member name, throw an exception
        if (!$name.match(/^(_|$|[a-z])[a-z0-9]*$/i))
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
        if ($name === 'as' || $name === 'is' || $name === '~constructor' || $name === 'constructor' || $name === 'prototype' || $name === '__base' || $name === '__self' || $name === '__this')
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
                if (!$baseClass)
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

                // If the field has a reference-type value, set it to null
                if ($$.isReferenceType($value))
                    $value = null;

                // Create the field definition object
                var $field = {};

                // Set the field definition object data
                $field[$_definition_member_field_readOnly] = $readonly;
                $field[$_definition_member_name]           = $name;
                $field[$_definition_member_type]           = $type;
                $field[$_definition_member_value]          = $value;

                // Freeze the field definition object
                $__freeze__.call($__object__, $field);
                
                // Set the field in the definitions object
                $__defineProperty__.call($__object__, $definitions, $name, { 'enumerable': true, 'value': $field });

                break;

            case 'method':
                
                // If there is a base class, perform further compiling on the method
                if ($baseClass)
                    $_definitionsCompilerBaseMethod($name, $type, null, $baseClass, $override, $protected, $public);
                
                // Create the method definition object
                var $method = {};

                // Set the field definition object data
                $method[$_definition_member_method_abstract] = $abstract;
                $method[$_definition_member_method_final]    = $sealed;
                $method[$_definition_member_method_virtual]  = $virtual || $abstract || $override;
                $method[$_definition_member_name]            = $name;
                $method[$_definition_member_type]            = $type;
                $method[$_definition_member_value]           = $value;

                // Freeze the method definition object
                $__freeze__.call($__object__, $method);

                // Set the method in the definitions object
                $__defineProperty__.call($__object__, $definitions, $name, { 'enumerable': true, 'value': $method });

                break;

            case 'property':

                // Create the get and set method data arrays
                var $get = [];
                var $set = [];
                
                for (var $propertyKey in $value)
                {
                    // Break the property key string into a keywords array and get the member name
                    var $propertyKeywords = $$.asString($propertyKey).trim().split(' ') || [];
                    var $memberName       = $$.asString($propertyKeywords.pop());

                    // If the member name is empty or whitespace, throw an exception
                    if (!$memberName.trim())
                        throw $_exceptionFormat($_lang_$$_member_property_name_null, $name);

                    var $member = null;

                    // If the member name is not "get"
                    if ($memberName !== 'get')
                    {
                        // If the member name is not "set", throw an exception
                        if ($memberName !== 'set')
                            throw $_exceptionFormat($_lang_$$_member_property_name_invalid, $name, $memberName);

                        // Set the set method name
                        $set[$_accessor_member_name] = '~set_' + $name;

                        // Set the set method data object as the member
                        $member = $set;
                    }
                    else
                    {
                        // Set the get method name
                        $get[$_accessor_member_name] = '~get_' + $name;

                        // Set the get method data object as the member
                        $member = $get;
                    }

                    // Set the member value
                    $member[$_accessor_member_value] = $value[$propertyKey];

                    // If the member is not a function, throw an exception
                    if (!$$.isFunction($member[$_accessor_member_value]))
                        throw $_exceptionFormat($_lang_$$_member_property_function, $name, $memberName);

                    // Set the member access modifier flags
                    $member[$_accessor_member_private]   = false;
                    $member[$_accessor_member_protected] = false;
                    $member[$_accessor_member_public]    = false;
        
                    for (var $i = 0, $j = $propertyKeywords.length; $i < $j; $i++)
                    {
                        // Get the property keyword
                        var $propertyKeyword = $propertyKeywords[$i];

                        // If the property keyword is private, set the private flag
                        if ($propertyKeyword === 'private')
                            $member[$_accessor_member_private] = true;
                        // If the property keyword is protected, set the protected flag
                        else if ($propertyKeyword === 'protected')
                            $member[$_accessor_member_protected] = true;
                        // If the property keyword is public, set the public flag
                        else if ($propertyKeyword === 'public')
                            $member[$_accessor_member_public] = true;
                        // If a keyword was defined, throw an exception
                        else if ($keyword)
                            throw $_exceptionFormat($_lang_$$_member_property_keyword, $name, $memberName, $keyword);
                    }

                    // Check if the member has any access modifiers
                    $member[$_accessor_member_hasModifier] = $member[$_accessor_member_private] || $member[$_accessor_member_protected] || $member[$_accessor_member_public];

                    // If the member has any access modifiers
                    if ($member[$_accessor_member_hasModifier])
                    {
                        // If the member has more than one access modifier, throw an exception
                        if ($member[$_accessor_member_private] && $member[$_accessor_member_protected] || $member[$_accessor_member_private] && $member[$_accessor_member_public] || $member[$_accessor_member_protected] && $member[$_accessor_member_public])
                            throw $_exceptionFormat($_lang_$$_member_keyword_access_2, $memberName);

                        // If the member access modifier is not more restrictive than the property access modifier, throw an exception
                        if ($member[$_accessor_member_public] || $member[$_accessor_member_protected] && !$public || $member[$_accessor_member_private] && $private)
                            throw $_exceptionFormat($_lang_$$_member_property_accessors_access, $name, $memberName);
                    }
                }
                
                // Check if the property has get and set accessors
                var $hasGet = !!$get[$_accessor_member_name];
                var $hasSet = !!$set[$_accessor_member_name];

                // Check if the property has get and set accessor access modifiers
                var $hasGetModifier = $get[$_accessor_member_hasModifier];
                var $hasSetModifier = $set[$_accessor_member_hasModifier];

                // If there is neither a get nor a set method, throw an exception
                if (!$hasGet && !$hasSet)
                    throw $_exceptionFormat($_lang_$$_member_property_name_null, $name);

                // If the get and set methods both had access modifiers, throw an exception
                if ($hasGetModifier && $hasSetModifier)
                    throw $_exceptionFormat($_lang_$$_member_property_keyword_access_2, $name);
                
                // If a get method was provided
                if ($hasGet)
                {
                    // If there is no set accessor and the get method has an access modifier, throw an exception
                    if (!$hasSet && $hasGetModifier)
                        throw $_exceptionFormat($_lang_$$_member_property_accessors, $name, 'get');

                    // If there is a base class, perform further compiling on the get method
                    if ($baseClass)
                        $_definitionsCompilerBaseMethod($get[$_accessor_member_name], $type, 'get accessor', $baseClass, $override, $hasGetModifier ? $get[$_accessor_member_protected] : $protected, $hasGetModifier ? $get[$_accessor_member_public] : $public);

                    // Compile the get accessor method
                    $_definitionsCompilerAccessorMethod($definitions, $privateDefinitions, $protectedDefinitions, $publicDefinitions, $get, $type, $abstract, $override, $sealed, $virtual, $hasGet && $hasSet);
                }

                // If a set method was provided
                if ($hasSet)
                {
                    // If there is no get accessor and the set method has an access modifier, throw an exception
                    if (!$hasGet && $hasSetModifier)
                        throw $_exceptionFormat($_lang_$$_member_property_accessors, $name, 'set');

                    // If there is a base class, perform further compiling on the set method
                    if ($baseClass)
                        $_definitionsCompilerBaseMethod($set[$_accessor_member_name], $type, 'set accessor', $baseClass, $override, $hasSetModifier ? $set[$_accessor_member_protected] : $protected, $hasSetModifier ? $set[$_accessor_member_public] : $public);

                    // Compile the set accessor method
                    $_definitionsCompilerAccessorMethod($definitions, $privateDefinitions, $protectedDefinitions, $publicDefinitions, $set, $type, $abstract, $override, $sealed, $virtual, $hasGet && $hasSet);
                }

                break;

            case 'prototype':
            case 'static':

                // Create the member definition object
                var $member = {};

                // Set the member definition object data
                $member[$_definition_member_name]  = $name;
                $member[$_definition_member_type]  = $type;
                $member[$_definition_member_value] = $value;

                // Freeze the member definition object
                $__freeze__.call($__object__, $member);

                // If the member has the prototype flag, set the member in the prototype definitions object
                if ($typePrototype)
                    $prototypeDefinitions[$name] = $member;
                // If the member has the static flag, set the member in the static definitions object
                else if ($typeStatic)
                    $staticDefinitions[$name] = $member;

                break;
        }
    };
    var $_definitionsCompilerInjections     = function($definitions, $injections)
    {
        // If no injections array was provided, return
        if (!$injections)
            return;

        for (var $i = 0, $j = $injections.length; $i < $j; $i++)
        {
            // Get the current injection
            var $injection = $injections[$i];

            // If no injection was found, continue
            if (!$injection)
                continue;

            // Get the injection name
            var $injectionName = $injection[$_definition_member_name];

            // If the injection does not have a name, continue
            if (!$injectionName)
                continue;

            // Set the injected definition object into the definitions object
            $__defineProperty__.call($__object__, $definitions, $injectionName, { 'value': $injection });
        }
    };

    // Create the construct runtime helper functions
    var $_constructRuntimeField    = function($descriptor, $configurable, $name, $value, $base, $private, $protected, $public, $readonly)
    {
        // Set the descriptor data
        $descriptor['configurable'] = $configurable;
        $descriptor['enumerable']   = true;
        $descriptor['get']          = function()
        {
            // Return the field value
            return $value;
        };

        // If read-only checking is enabled
        if ($readonly)
        {
            // Set the descriptor setting with read-only checking
            $descriptor['set'] = function($v)
            {
                // If the field is read-only, throw an exception
                if ($readonly())
                    throw $_exceptionFormat($_lang_$$_field_readonly, $name);

                // If the provided value is set to a private, protected, or base instance, set the value to the public instance
                if (!$_unsafe && ($v === $private || $protected && $v === $protected || $v === $base))
                    $value = $public;
                // Set the value to the provided value
                else
                    $value = $v;
            };
        }
        else
        {
            // Set the descriptor setting without read-only checking
            $descriptor['set'] = function($v)
            {
                // If the provided value is set to a private, protected, or base instance, set the value to the public instance
                if (!$_unsafe && ($v === $private || $protected && $v === $protected || $v === $base))
                    $value = $public;
                // Set the value to the provided value
                else
                    $value = $v;
            };
        }
    };
    var $_constructRuntimeMerge    = function($descriptor, $merge, $accessor)
    {
        // If the method is a get accessor
        if ($accessor === 'get')
        {
            // Return the merged descriptor (merge set accessor)
            return (
            {
                'configurable': $descriptor['configurable'],
                'enumerable':   $descriptor['enumerable'],
                'get':          $descriptor['get'],
                'set':          $merge['set']
            });
        }
        // If the method is a set accessor, return the merged descriptor
        else if ($accessor === 'set')
        {
            // Return the merged descriptor (merge get accessor)
            return (
            {
                'configurable': $descriptor['configurable'],
                'enumerable':   $descriptor['enumerable'],
                'get':          $merge['get'],
                'set':          $descriptor['set']
            });
        }

        // Return the descriptor
        return $descriptor;
    };
    var $_constructRuntimeMethod   = function($descriptor, $configurable, $this, $function, $base, $private, $protected, $public, $accessor)
    {
        // Set the descriptor data
        $descriptor['configurable'] = $configurable;
        $descriptor['enumerable']   = true;
        
        // Create the method wrapper
        var $method = function()
        {
            // Apply the function in the provided context with the current arguments
            var $return = $function.apply($this, arguments);
            
            // If the return value is a private, protected, or base instance, return the public instance
            if (!$_unsafe && ($return === $private || $protected && $return === $protected || $return === $base))
                return $public;

            // Return the return value
            return $return;
        };

        // If the method is a get accessor, set the get descriptor to the method wrapper
        if ($accessor === 'get')
            $descriptor['get'] = $method;
        // If the method is a set accessor, set the set descriptor to the method wrapper
        else if ($accessor === 'set')
            $descriptor['set'] = $method;
        // Set the value descriptor to the method wrapper
        else
            $descriptor['value'] = $method;
    };
    var $_constructRuntimeOverride = function($descriptor, $key, $definition, $overrides)
    {
        // If the method is virtual
        if ($definition[$_definition_member_method_virtual])
        {
            // If the method is not final
            if (!$definition[$_definition_member_method_final])
            {
                // Get the override descriptor from the overrides object
                var $override = $overrides[$key] || null;
                        
                // If no descriptor was found in the overrides object, set the method descriptor in it
                if (!$override)
                    $overrides[$key] = $descriptor;

                // Return the override descriptor
                return $override;
            }
            // Set the method descriptor in the overrides object
            else
                $overrides[$key] = $descriptor;
        }
        // Clear any method override that may have existed
        else
            $overrides[$key] = null;

        return null;
    };
    var $_constructRuntime         = function($key, $definitions, $overrides, $inherits, $inheritsBase, $readonly, $context, $isProtected, $isPublic, $base, $private, $protected, $public)
    {
        // Get the member definition from the definitions object
        var $definition = $definitions[$key];

        switch ($definition[$_definition_member_type])
        {
            case 'field':

                // Create the field descriptor and get the field name
                var $descriptor = {};
                var $name       = $definition[$_definition_member_name];

                // Construct the field descriptor
                $_constructRuntimeField($descriptor, false, $name, $definition[$_definition_member_value], $base, $private, $protected, $public, $definition[$_definition_member_field_readOnly] ? $readonly : null);

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

                // Create the method descriptor and get the method name
                var $descriptor = {};
                var $name       = $definition[$_definition_member_name];
                var $this       = $private;

                // If the method is the constructor
                if ($isProtected && $name === '~constructor')
                {
                    // If lazy loading is enabled
                    if ($_lazy)
                    {
                        // Create the constructor instance
                        $this = $__create__.call($__object__, $private);

                        // Mask the base instance reference with the base constructor get accessor
                        $__defineProperty__.call($__object__, $this, '__base',
                        {
                            'get': function()
                            {
                                // Get the private base instance
                                var $privateBase = $private['__base'];
                                
                                // If a private base was found, return the base constructor
                                return $privateBase && $privateBase['~constructor'] || null;
                            }
                        });

                        // Freeze the constructor instance object
                        $__freeze__.call($__object__, $this);
                    }
                    // Set the constructor instance
                    else
                        $this = $context;
                }

                // Construct the method descriptor
                $_constructRuntimeMethod($descriptor, false, $this, $definition[$_definition_member_value], $base, $private, $protected, $public);
                
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

                // Get the property accessor and name
                var $accessor = $key.substr(1, 3);
                var $name     = $definition[$_definition_member_name];

                // Check if the property is complex and if a merge operation is being performed
                var $complex      = $definition[$_definition_member_property_accessors];
                var $mergeBase    = $complex && $__hasOwnProperty__.call($base, $name);
                var $mergePrivate = $complex && $__hasOwnProperty__.call($private, $name);
                var $merge        = $mergeBase || $mergePrivate;

                // Create the property descriptor
                var $descriptor = {};
                
                // Construct the property descriptor
                $_constructRuntimeMethod($descriptor, $complex && !$merge, $private, $definition[$_definition_member_value], $base, $private, $protected, $public, $accessor);

                // If the property is not complex or is being merged
                if (!$complex || $merge)
                {
                    // Check if a public merge operation is being performed
                    var $mergePublic = $complex && $__hasOwnProperty__.call($public, $name);

                    // If the property is protected or public
                    if ($isProtected || $isPublic)
                    {
                        // Set the base property descriptor (merge if a base descriptor was found)
                        $__defineProperty__.call($__object__, $base, $name, $mergeBase ? $_constructRuntimeMerge($descriptor, $base[$name], $accessor) : $descriptor);

                        // Get the override and inherited descriptors
                        var $override = $_constructRuntimeOverride($descriptor, $key, $definition, $overrides);
                        var $inherit  = $override ? $override : $descriptor;
                    
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
                                $__defineProperty__.call($__object__, $private, $name, $private[$name]);
                        }

                        // If the property is public, set the public property descriptor (merge if a public descriptor was found)
                        if ($isPublic)
                            $__defineProperty__.call($__object__, $public, $name, $mergePublic ? $_constructRuntimeMerge($inherit, $public[$name], $accessor) : $inherit);
                        // If a public merge was found, set the public property descriptor
                        else if ($mergePublic)
                            $__defineProperty__.call($__object__, $public, $name, $public[$name]);
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
                            $__defineProperty__.call($__object__, $base, $name, $base[$name]);

                            // If lazy loading is enabled, set the protected property descriptor
                            if ($_lazy)
                                $__defineProperty__.call($__object__, $protected, $name, $protected[$name]);
                        }

                        // If a public merge was found, set the public property descriptor
                        if ($mergePublic)
                            $__defineProperty__.call($__object__, $public, $name, $public[$name]);
                    }
                    // Set the private property descriptor
                    else
                        $__defineProperty__.call($__object__, $private, $name, $descriptor);
                }
                else
                {
                    // If the property is protected or public
                    if ($isProtected || $isPublic)
                    {
                        // Set the base property descriptor
                        $__defineProperty__.call($__object__, $base, $name, { 'configurable': true, 'value': $descriptor });

                        // Get the override and inherited descriptors
                        var $override = $_constructRuntimeOverride($descriptor, $key, $definition, $overrides);
                        var $inherit  = $override ? $override : $descriptor;
                    
                        // If lazy loading is not enabled
                        if (!$_lazy)
                        {
                            // Set the private property descriptor
                            $__defineProperty__.call($__object__, $private, $name, { 'configurable': true, 'value': $inherit });

                            // Set the property descriptor in the inherits object
                            $inherits[$name] = $inherit;

                            // Set the property descriptor in the base inherits object
                            $inheritsBase[$name] = $descriptor;
                        }
                        // Set the protected property descriptor
                        else
                            $__defineProperty__.call($__object__, $protected, $name, { 'configurable': true, 'value': $inherit });

                        // If the property is public, set the public property descriptor
                        if ($isPublic)
                            $__defineProperty__.call($__object__, $public, $name, { 'configurable': true, 'value': $inherit });
                    }
                    // Set the private property descriptor
                    else
                        $__defineProperty__.call($__object__, $private, $name, { 'configurable': true, 'value': $descriptor });
                }

                break;
        }
    };
    var $_constructRuntimeInherits = function($inherits, $derivedInherits, $instance)
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

            // Set the member descriptor in the derived inherits object
            $derivedInherits[$inheritKey] = $inherit;
        }
    };

    // #################################################
    // ########## BEGIN jTypes.NET INJECTIONS ##########
    // #################################################

    // Create the injection flags length
    var $_inject_flagCount = 0;
    
    // Create the injection flags
    var $_inject_private   = $_inject_flagCount++;
    var $_inject_protected = $_inject_flagCount++;
    var $_inject_prototype = $_inject_flagCount++;
    var $_inject_public    = $_inject_flagCount++;
    var $_inject_static    = $_inject_flagCount++;

    // ###############################################
    // ########## END jTypes.NET INJECTIONS ##########
    // ###############################################
    
    // ---------- JTYPES ----------
    var $$ = function()
    {
        // Get the initial arguments
        var $argument    = 0;
        var $baseClass   = null;
        var $constructor = arguments[$argument++];
        var $modifiers   = '';
        var $prototype   = null;

        // If the constructor is not a simple object
        if (!$$.isSimpleObject($constructor))
        {
            // Get the prototype
            $prototype = arguments[$argument++];

            // If the constructor is not a function
            if (!$$.isFunction($constructor))
            {
                // If the constructor is not a class
                if (!$$.isClass($constructor))
                {
                    // Use the first argument as the modifiers string
                    $modifiers = $$.asString($constructor);

                    // If the prototype is a class
                    if ($$.isClass($prototype))
                    {
                        // Use the second argument as the base class
                        $baseClass   = $prototype;
                        $constructor = arguments[$argument++];
                    }
                    // Use the second argument as the constructor
                    else
                        $constructor = $prototype;

                    // If the constructor is not a function
                    if (!$$.isFunction($constructor))
                    {
                        // Use the third argument as the prototype
                        $prototype   = $constructor;
                        $constructor = null;
                    }
                    // Use the fourth argument as the prototype
                    else
                        $prototype = arguments[$argument++];
                }
                else
                {
                    // Use the first argument as the base class
                    $baseClass = $constructor;

                    // If the prototype is a function
                    if ($$.isFunction($prototype))
                    {
                        // Use the second argument as the constructor
                        $constructor = $prototype;
                        $prototype   = arguments[$argument++];
                    }
                    else
                        $constructor = null;
                }
            }
        
            // If the prototype is not a simple object, throw an exception
            if (!$$.isSimpleObject($prototype))
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

        // Create the abstract and final flags
        var $abstract = false;
        var $final    = false;

        // Create the expando flags
        var $expandoClass     = false;
        var $expandoPrivate   = false;
        var $expandoPrototype = false;
        var $expandoPublic    = false;

        // If a modifiers string was provided
        if ($modifiers)
        {
            // Create the keywords array
            var $keywords = $modifiers.trim().split(' ') || [];

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
                // If the keyword is sealed, set the final flag
                else if ($keyword === 'sealed')
                    $final = true;
                // If a different keyword was provided, throw an exception
                else if ($keyword)
                    throw $_exceptionFormat($_lang_$$_keyword, $keyword);
            }
        }

        // If the class is abstract and final, throw an exception
        if ($abstract && $final)
            throw $_exceptionFormat($_lang_$$_abstract_sealed);

        // Create the private, protected, and public definitions objects along with the inherited prototype
        var $classPrivate   = {};
        var $classProtected = $baseClass ? $__create__.call($__object__, $baseClass[$_definition_protected]) : {};
        var $classPrototype = new $_class();
        var $classPublic    = $baseClass ? $__create__.call($__object__, $baseClass[$_definition_public]) : {};
        
        // Create the prototype and static definitions objects
        var $definitionsPrototype = {};
        var $definitionsStatic    = {};

        for (var $key in $prototype)
        {
            // If the property is a special member, continue
            if ($key === 'constructor' || $key === 'prototype')
                continue;

            // Compile the the class definition into the definitions objects
            $_definitionsCompiler($classPrivate, $classProtected, $classPublic, $definitionsPrototype, $definitionsStatic, $key, $prototype[$key], $baseClass, $abstract, $final);
        }

        // If a base class was provided
        if ($baseClass)
        {
            // If the base class is final, throw an exception
            if ($baseClass[$_definition_final])
                throw $_exceptionFormat($_lang_$$_derive_sealed);

            // If the base class is abstract
            if ($baseClass[$_definition_abstract])
            {
                // Get the base protected and public definitions objects
                var $baseProtected = $baseClass[$_definition_protected];
                var $basePublic    = $baseClass[$_definition_public];

                // Get the array of keys for the base protected and public definitions objects
                var $baseProtectedKeys = $$.keys($baseProtected);
                var $basePublicKeys    = $$.keys($basePublic);

                // Compile the protected definition object for each property defined in the base protected definition object
                for (var $i = 0, $j = $baseProtectedKeys.length; $i < $j; $i++)
                    $_definitionsCompilerBaseAbstracts($classProtected, $baseProtected, $baseProtectedKeys[$i]);

                // Compile the public definition object for each property defined in the base public definition object
                for (var $i = 0, $j = $basePublicKeys.length; $i < $j; $i++)
                    $_definitionsCompilerBaseAbstracts($classPublic, $basePublic, $basePublicKeys[$i]);
            }

            // Set the subclass flag
            $_subclass = true;

            // Construct the inherited prototype
            $classPrototype = new $baseClass();

            // Reset the subclass flag
            $_subclass = false;
        }

        // If no constructor was provided
        if (!$constructor)
        {
            // Use a default constructor
            $constructor = function()
            {
                // If a base constructor exists, apply it with the arguments
                if (this.__base)
                    return this.__base.apply(this, arguments);
            };
        }

        // Create the constructor definition object
        var $constructorDefinition = {};
                    
        // Set the constructor definition object data
        $constructorDefinition[$_definition_member_method_abstract] = false;
        $constructorDefinition[$_definition_member_method_final]    = false;
        $constructorDefinition[$_definition_member_method_virtual]  = false;
        $constructorDefinition[$_definition_member_name]            = '~constructor';
        $constructorDefinition[$_definition_member_type]            = 'method';
        $constructorDefinition[$_definition_member_value]           = $constructor;

        // Freeze the constructor definition object
        $__freeze__.call($__object__, $constructorDefinition);

        // Set the constructor in the protected definition object
        $__defineProperty__.call($__object__, $classProtected, '~constructor', { 'enumerable': true, 'value': $constructorDefinition });
        
        // If any injections arguments were provided
        if ($_unsafe && arguments[$argument])
        {
            // Inject the private, protected, and public definitions objects
            $_definitionsCompilerInjections($classPrivate, arguments[$argument + $_inject_private]);
            $_definitionsCompilerInjections($classProtected, arguments[$argument + $_inject_protected]);
            $_definitionsCompilerInjections($classPublic, arguments[$argument + $_inject_public]);

            // Inject the prototype and static definitions objects
            $_definitionsCompilerInjections($definitionsPrototype, arguments[$argument + $_inject_prototype]);
            $_definitionsCompilerInjections($definitionsStatic, arguments[$argument + $_inject_static]);
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

        // Freeze the class definitions objects
        //$__freeze__.call($__object__, $classPrivate);
        //$__freeze__.call($__object__, $classProtected);
        //$__freeze__.call($__object__, $classPublic);

        // Get the arrays of private, protected, and public member keys
        var $classPrivateKeys   = $$.keys($classPrivate);
        var $classProtectedKeys = $$.keys($classProtected);
        var $classPublicKeys    = $$.keys($classPublic);

        // Create the construct helper function
        var $construct = function($stack, $baseInherits, $protectedInherits, $publicInherits, $protectedOverrides, $publicOverrides, $readonly, $context)
        {
            // If this function was not internally called, return
            if (this !== $_class)
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

            // Construct each private member in the instance matrix
            for (var $i = 0, $j = $classPrivateKeys.length; $i < $j; $i++)
                $_constructRuntime($classPrivateKeys[$i], $classPrivate, null, null, null, $readonly, null, false, false, $base, $private, $protected, $public);

            // Construct each protected member in the instance matrix
            for (var $i = 0, $j = $classProtectedKeys.length; $i < $j; $i++)
                $_constructRuntime($classProtectedKeys[$i], $classProtected, $protectedOverrides, $protectedInherits, $baseInherits, $readonly, $context, true, false, $base, $private, $protected, $public);

            // Construct each public member in the instance matrix
            for (var $i = 0, $j = $classPublicKeys.length; $i < $j; $i++)
                $_constructRuntime($classPublicKeys[$i], $classPublic, $publicOverrides, $publicInherits, $baseInherits, $readonly, null, false, true, $base, $private, $protected, $public);

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
        
        // Create the chain array and current class tracker
        var $chain   = [];
        var $current = $baseClass;
        var $levels  = 1;

        // If a current class was found
        while ($$.isClass($current))
        {
            // Add the current class to the chain array
            $chain.push($current);

            // Find the next class in the chain
            $current = $current[$_definition_baseClass];
        }

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
            var $matrix   = [];

            // Check if the new operator was used
            var $isInit = false;
            var $isNew  = this instanceof $class;

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
            var $as = function($type)
            {
                // If the type is not a class or the instance is not an instance of type, return null
                if (!$$.isClass($type) || !($instance instanceof $type))
                    return null;

                // Create the level tracker
                var $level = 0;

                do
                {
                    // If the type was found in the chain array, break
                    if ($chain[$level] === $type)
                        break;
                }
                // If the level is still valid
                while (++$level < $levels);
                
                // Set the new public instance
                $instance = $matrix[$level][2];

                // Return the instance
                return $instance;
            };
            var $is = function($type)
            {
                // If no type was provided, return false
                if (!$type)
                    return false;

                // Return true if the instance is an instance of the type
                return !!($instance instanceof $type);
            };

            // Set the "as" and "is" methods in the construct base
            $__defineProperty__.call($__object__, $instance, 'as', { 'value': $as });
            $__defineProperty__.call($__object__, $instance, 'is', { 'value': $is });

            // Create the class instances
            var $base      = $instance;
            var $private   = null;
            var $protected = null;
            var $public    = $instance;

            // Create the internal get accessors
            var $getterInstance = function()
            {
                // Return the current instance reference
                return $instance;
            };
            var $getterReadonly = function()
            {
                // Return true if the class is initialized
                return $isInit;
            };

            // Create the public and protected override caches
            var $protectedOverrides = {};
            var $publicOverrides    = {};

            // If lazy loading is not enabled
            if (!$_lazy)
            {
                // Create the contexts and inherits arrays
                var $contexts = [];
                var $inherits = [];
                
                for (var $i = 0; $i < $levels; $i++)
                {
                    // Create the base, private, and public instances
                    $base      = $__create__.call($__object__, $instance);
                    $private   = {};
                    $public    = $__create__.call($__object__, $instance);

                    // Create the constructor context and matrix instance stack
                    var $context = $__create__.call($__object__, $private);
                    var $stack   = [$private, $base, $public];

                    // Create the inherits objects
                    var $baseInherits      = {};
                    var $protectedInherits = {};
                    var $publicInherits    = {};
                    
                    // Build the matrix instance stack
                    ($i === 0 ? $construct : $chain[$i][$_definition_construct]).call($_class, $stack, $baseInherits, $protectedInherits, $publicInherits, $protectedOverrides, $publicOverrides, $getterReadonly, $context);
                    
                    // Append the instance stack into the instance matrix and constructor context into the contexts array
                    $matrix.push($stack);
                    $contexts.push($context);
                    $inherits.push([$baseInherits, $protectedInherits, $publicInherits]);
                }
                
                // Define the derived inherits objects
                var $derivedBaseInherits      = null;
                var $derivedProtectedInherits = null
                var $derivedPublicInherits    = null

                for (var $i = $levels - 1; $i >= 0; $i--)
                {
                    // Get the matrix instance stack
                    var $stack = $matrix[$i];

                    // Get the base, private, and public instances from the instance stack
                    $base    = $stack[1];
                    $private = $stack[0];
                    $public  = $stack[2];

                    // Define the public instance accessors on the private instance
                    $__defineProperty__.call($__object__, $private, '__self', { 'value': $public });
                    $__defineProperty__.call($__object__, $private, '__this', { 'get': $getterInstance });

                    // If the stack has a base class
                    if ($i !== $levels - 1)
                    {
                        // Get the base instance reference
                        var $privateBase = $matrix[$i + 1][1];

                        // Define the base instance reference on the private instance
                        $__defineProperty__.call($__object__, $private, '__base', { 'value': $privateBase });

                        // Get the constructor context
                        var $context = $contexts[$i];

                        // Mask the base instance reference with the base constructor
                        $__defineProperty__.call($__object__, $context, '__base', { 'value': $privateBase['~constructor'] });

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
                        $_constructRuntimeInherits($baseInherits, $derivedBaseInherits, $base);
                        $_constructRuntimeInherits($protectedInherits, $derivedProtectedInherits, $private);
                        $_constructRuntimeInherits($publicInherits, $derivedPublicInherits, $public);
                    }
                    else
                    {
                        // Get the derived inherits array
                        var $derivedInherit = $inherits[$i];

                        // Get the derived inherits objects
                        $derivedBaseInherits      = $derivedInherit[0];
                        $derivedProtectedInherits = $derivedInherit[1];
                        $derivedPublicInherits    = $derivedInherit[2];
                    }

                    // Freeze the base instance object
                    $__freeze__.call($__object__, $base);

                    // If the class is not expando-private, freeze the private instance object
                    if (!$chain[$i][$_definition_expando_private])
                        $__freeze__.call($__object__, $private);

                    // If the class is not expando-public, freeze the public instance object
                    if (!$chain[$i][$_definition_expando_public])
                        $__freeze__.call($__object__, $public);
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
                    
                    // Define the public instance accessors on the private instance
                    $__defineProperty__.call($__object__, $private, '__self', { 'value': $public });
                    $__defineProperty__.call($__object__, $private, '__this', { 'get': $getterInstance });

                    // If the stack has a base class, define the base instance reference on the private instance
                    if ($i !== $levels - 1)
                        $__defineProperty__.call($__object__, $private, '__base', { 'value': $matrix[$i + 1][3] });

                    // Create the matrix instance stack
                    $matrix[$i] = [$private, $protected, $public, $base];
                }

                // Build the matrix instance stack
                for (var $i = 0; $i < $levels; $i++)
                    ($i === 0 ? $construct : $chain[$i][$_definition_construct]).call($_class, $matrix[$i], null, null, null, $protectedOverrides, $publicOverrides, $getterReadonly);
            }
            
            // Set the public instance
            $instance = $public;

            // If the "new" keyword was used, execute the constructor
            if ($isNew)
                $private['~constructor'].apply($private, arguments);

            // Set the initialized flag
            $isInit = true;

            // ----- DEBUG -----
            console.log('$$: ----- INSTANTIATOR -----');
            console.log('$$: Instance Matrix');
            console.log($matrix);
            console.log('$$: Differential inheritance ' + ($_lazy ? 'IS' : 'IS NOT') + ' enabled...');
            // ----- DEBUG -----

            // Return the public instance
            return $public;
        };

        // Prepend the class to the chain array and set the levels count
        $levels = $chain.unshift($class);

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

        // Create the class cache
        var $cache = {};
        
        // Set the class cache data
        $cache[$_definition_abstract]          = { 'value': $abstract };
        $cache[$_definition_baseClass]         = { 'value': $baseClass };
        $cache[$_definition_expando_class]     = { 'value': $expandoClass };
        $cache[$_definition_expando_private]   = { 'value': $expandoPrivate };
        $cache[$_definition_expando_prototype] = { 'value': $expandoPrototype };
        $cache[$_definition_expando_public]    = { 'value': $expandoPublic };
        $cache[$_definition_final]             = { 'value': $final };
        $cache[$_definition_public]            = { 'value': $classPublic };

        // If the class is not final
        if (!$final)
        {
            // Set the protected class cache data
            $cache[$_definition_construct] = { 'value': $construct };
            $cache[$_definition_protected] = { 'value': $classProtected };
        }

        // Set the class cache
        $__defineProperties__.call($__object__, $class, $cache);
        
        // Set the prototype constructor
        $__defineProperty__.call($__object__, $classPrototype, 'constructor', { 'value': $class });//, 'writable': true });
        
        // If the prototype is not expando, freeze the prototype
        if (!$expandoPrototype)
            $__freeze__.call($__object__, $classPrototype);
        
        // Set the class prototype
        $__defineProperty__.call($__object__, $class, 'prototype', { 'value': $classPrototype });//, 'writable': true });
        
        // Set the class toString method
        $class.toString = $_class_toString;
        
        // If the class is not expando, freeze the class
        if (!$expandoClass)
            $__freeze__.call($__object__, $class);
        
        // ----- DEBUG -----
        console.log('$$: ----- COMPILER -----');
        console.log('$$: Private Definitions');
        console.log($classPrivate);
        console.log('$$: Protected Definitions');
        console.log($classProtected);
        console.log('$$: Public Definitions');
        console.log($classPublic);
        // ----- DEBUG -----
        
        // Return the class
        return $class;
    };
    
    // ########## DEFINES ##########

    // ---------- FIELD ----------
    var $_defineField = function($name, $field)
    {
        // Define an enumerable field on the jTypes object
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   true,
            'value':        $field,
            'writable':     false
        });
    };

    // ---------- METHOD ----------
    var $_defineMethod = function($name, $method)
    {
        // Define a non-enumerable method on the jTypes object
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   false,
            'value':        $method,
            'writable':     false
        });
    };

    // ---------- PROPERTY ----------
    var $_defineProperty = function($name, $getMethod, $setMethod)
    {
        // Define an enumerable property on the jTypes object
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   true,
            'get':          $getMethod || undefined,
            'set':          $setMethod || undefined
        });
    };

    // ########## INFORMATION ##########

    // ---------- TO-STRING ----------
    $_defineMethod('toString', function()
    {
        // Return the type string
        return '[object jTypes]';
    });

    // ---------- VERSION ----------
    $_defineProperty('version', function()
    {
        // Return the version string
        return $_version;
    });

    // ########## TYPES ##########
    
    // Define the types method and the "is" methods for internal JavaScript types
    (function()
    {
        // Create the types lookup
        var $types = {};
        
        // Iterate the internal JavaScript types
        'Array Boolean Date Function Number RegExp String'.split(' ').forEach(function($type)
        {
            // Get the type keyword
            var $keyword = $type.toLowerCase();

            // Insert the keyword into the types lookup
            $types['[object ' + $type + ']'] = $keyword;

            // Define the "is" method for the type
            $_defineMethod('is' + $type, function($object)
            {
                // Return true if the object matches the type
                return $$.type($object) === $keyword;
            });
        });

        // Iterate the known aliases of the internal JavaScript window type
        'Window window Global global'.split(' ').forEach(function($window)
        {
            // Insert the window into the types lookup
            $types['[object ' + $window + ']'] = 'window';
        });

        // ---------- TYPE ----------
        $_defineMethod('type', function($object)
        {
            // If the object is null or undefined, return the object cast as a string
            if ($object === null || $object === undefined)
                return $object + '';

            // If the object is the window object, return the "window" type string
            if ($object === window)
                return 'window';
        
            // If the object is a class, return the "class" type string
            if ($__toString__.call($object[$_definition_construct]) === '[object Function]')
                return 'class';

            // If the object is a class instance, return the "instance" type string
            if ($object instanceof $_class)
                return 'instance';

            // Return the type string from the types lookup using the native "toString" function
            return $types[$__toString__.call($object)] || 'object';
        });
    })();
    
    // ########## CHECKS ##########

    // ---------- CLASS ----------
    $_defineMethod('isClass', function($object)
    {
        // Return true if the object has a class construct function
        return $object && $__toString__.call($object[$_definition_construct]) === '[object Function]';
    });

    // ---------- FINITE ----------
    $_defineMethod('isFinite', function($number)
    {
        // Return true if the object is a number and is finite
        return !!($$.isNumber($number) && isFinite($number));
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
        return !!($$.isNumber($number) && isNaN($number));
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

    // ---------- POSITIVE INFINITY ----------
    $_defineMethod('isPositiveInfinity', function($number)
    {
        // Return true if the object is a number, is not NaN, is not finite, and is greater than zero
        return $$.isNumber($number) && !isNaN($number) && !isFinite($number) && $number > 0;
    });

    // ---------- REFERENCE-TYPE ----------
    $_defineMethod('isReferenceType', function($object)
    {
        // Get the type of the object
        var $type = $$.type($object);

        // Return true if the object is not null, undefined, or a value-type
        return $type !== 'undefined' && $type !== 'null' && $type !== 'boolean' && $type !== 'number' && $type !== 'string';
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

    // ---------- UNDEFINED ----------
    $_defineMethod('isUndefined', function($argument)
    {
        // Return true if the argument is undefined
        return $argument === undefined;
    });

    // ---------- VALUE-TYPE ----------
    $_defineMethod('isValueType', function($object)
    {
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
        
        // Return true if the object is a window object
        return $$.type($object) === 'window';
    });

    // ########## CASTS ##########
    
    // ---------- ARRAY ----------
    $_defineMethod('asArray', function($object)
    {
        // If the object is a null reference or undefined, return
        if ($object === null || $object === undefined)
            return [];

        // Get the type of the object
        var $type = $$.type($object);

        // If the object is already an array, return it
        if ($type === 'array')
            return $object;

        // If the object is not a reference type, return
        if ($type === 'boolean' || $type === 'number' || $type === 'string')
            return [];
        
        // Return the object cast as an array
        return $__arrayProto__.slice.call($object, 0) || [];
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
        // Return the object cast as a float
        return parseFloat($object);
    });

    // ---------- INTEGER ----------
    $_defineMethod('asInt', function($object)
    {
        // Cast the object as an integer
        var $number = parseInt($object, 10);

        // If the number is not NaN, return the number
        if (!isNaN($number))
            return $number;

        // Cast the object as a float
        $number = parseFloat($object);

        // If the number is greater than the maximum integer, return infinity
        if ($number > 9007199254740992)
            return Infinity;

        // If the number is less than the minimum integer, return negative infinity
        if ($number < -9007199254740992)
            return -Infinity;
        
        // Return NaN
        return NaN;
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

        return '';
    });

    // ########## HELPERS ##########

    // ---------- EMPTY ----------
    $_defineMethod('empty', function()
    {
        // Return an empty function
        return function()
        {
            //
        };
    });
    
    // ---------- FORMAT ----------
    $_defineMethod('format', function($string)
    {
        // CHECK $string
        if (!$$.isString($string))
            throw $_exceptionArguments('format', arguments);

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

    // ---------- INHERIT ----------
    $_defineMethod('inherit', function($object)
    {
        // CHECK $object
        if ($object === undefined || $object === null || $$.isValueType($object))
            throw $_exceptionArguments('inherit', arguments);
        
        // Store a reference to the constructor variable and create the inherit constructor
        var $constructor = $object.constructor;
        var $inherit     = $$.empty();

        // Set the inherit object prototype to the object
        $inherit.prototype = $object;

        // If the object is not an instance
        if (!$$.isInstance($object))
        {
            // Check if the object has a constructor variable
            var $hasConstructor = $__hasOwnProperty__.call($object, 'constructor');

            // Reference the empty constructor while the object is used as a prototype
            $object.constructor = $inherit;

            // Create the inherited object
            $inherit = new $inherit();

            // If the object had a constructor, put the constructor reference back
            if ($hasConstructor)
                $object.constructor = $constructor;
            // Delete the constructor property
            else
                delete $object.constructor;
        }
        else
        {
            // Set the subclass flag
            $_subclass = true;

            // Create the inherited object
            $inherit = new $inherit();

            // Reset the subclass flag
            $_subclass = false;
        }

        // Return the inherited object
        return $inherit;
    });

    // ---------- KEYS ----------
    $_defineMethod('keys', function($object)
    {
        // CHECK $object
        if ($object === undefined || $object === null)
            throw $_exceptionArguments('keys', arguments);
        
        // Return the keys array of the object
        return $__keys__.call($__object__, $object) || [];
    });

    // ---------- MATCH ----------
    $_defineMethod('match', function($string, $expression)
    {
        // CHECK $string
        if (!$$.isString($string))
            throw $_exceptionArguments('match', arguments);
        
        // CHECK $expression
        if (!$$.isRegExp($expression) && !$$.isString($expression))
            throw $_exceptionArguments('match', arguments);

        // Return true if the string matched the expression
        return $__match__.call($string, $expression);
    });

    // ---------- PROPERTY ----------
    $_defineMethod('property', function($object, $name, $settings)
    {
        // CHECK $object
        if (!$$.isReferenceType($object))
            throw $_exceptionArguments('property', arguments);

        // If the name is not a simple object
        if (!$$.isSimpleObject($name))
        {
            // CHECK $name
            if (!$$.isString($name))
                throw $_exceptionArguments('property', arguments);

            // CHECK $settings
            if (!$$.isSimpleObject($settings))
                throw $_exceptionArguments('property', arguments);

            // Create the property settings
            var $propertySettings = (
            {
                'configurable': $$.asBool($settings.c),
                'enumerable':   $$.asBool($settings.e)
            });

            // Check if there are get or set accessor functions
            var $getter = $$.isFunction($settings.g);
            var $setter = $$.isFunction($settings.s);

            // If a get or set function was provided
            if ($getter || $setter)
            {
                // Set the getter and setter
                $propertySettings['get'] = $getter ? $settings.g : undefined;
                $propertySettings['set'] = $setter ? $settings.s : undefined;
            }
            else
            {
                // Set the value and writable attribute
                $propertySettings['value']    = $settings.v;
                $propertySettings['writable'] = $$.asBool($settings.w);
            }

            // Define a property on the object
            $__defineProperty__.call($__object__, $object, $name, $propertySettings);
        }
        else
        {
            // Fix the arguments
            $settings = $name;
            $name     = undefined;

            // Create the property for each property settings object
            for (var $key in $settings)
                $$.property($object, $$.asString($key), $settings[$key]);
        }

        // Return the object
        return $object;
    });

    // ---------- REGULAR-EXPRESSIONS ----------
    $_defineMethod('regexp', function($pattern, $flags)
    {
        // CHECK $pattern
        if (!$$.isString($pattern))
            throw $_exceptionArguments('regexp', arguments);

        // CHECK $flags
        if (!$$.isString($flags) && $flags !== undefined && $flags !== null)
            throw $_exceptionArguments('regexp', arguments);

        // Return the regular expression object
        return new RegExp($pattern, $flags);
    });

    // ---------- REGULAR-EXPRESSIONS ESCAPE ----------
    $_defineMethod('regexpEscape', function($string)
    {
        // CHECK $string
        if (!$$.isString($string))
            throw $_exceptionArguments('regexpEscape', arguments);

        // Return the escaped string
        return $__replace__.call($string, /[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    });

    // ---------- REPLACE ----------
    $_defineMethod('replace', function($string, $expression, $replace, $replaceIsCode)
    {
        // CHECK $string
        if (!$$.isString($string))
            throw $_exceptionArguments('replace', arguments);
        
        // CHECK $expression
        if (!$$.isRegExp($expression) && !$$.isString($expression))
            throw $_exceptionArguments('replace', arguments);

        // See if the replacement is a string
        var $replaceIsString = $$.isString($replace);

        // CHECK $replace
        if (!$$.isFunction($replace) && !$replaceIsString)
            throw $_exceptionArguments('replace', arguments);

        // FORMAT $replaceIsCode
        $replaceIsCode = $$.asBool($replaceIsCode);

        // If the replacement is a string and not code, escape the dollar signs in the replacement string
        if (!$replaceIsCode && $replaceIsString)
            $replace = $__replace__.call($replace, /\$/g, '\$$&');
        
        // Return the replaced string
        return $__replace__.call($string, $expression, $replace);
    });

    // ########## SETTINGS ##########

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
    
    // Define the global variable
    window.jTypes = $$;

    // Define the "$$" shorthand global variable
    window.$$ = $$;
})(window);