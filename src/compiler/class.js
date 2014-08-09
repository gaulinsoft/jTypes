/*! ------------------------------------------------------------------------
//                                   jTypes
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
var $_compilerClass = function($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic)
{
    // Create the class handle and name
    var $handle = '',
        $import = null,
        $name   = '';

    // Reset the exception handle
    $_handle = '';

    // If a modifiers string was provided
    if ($modifiers)
    {
        // Get the index of the extends character in the modifiers string
        var $baseIndex = $modifiers.indexOf(':');

        // If the modifiers string contains the extends character
        if ($baseIndex >= 0)
        {
            // Get the base handle
            var $baseHandle = $modifiers.substr($baseIndex + 1).trim();

            // If a base handle was not provided, throw an exception
            if (!$baseHandle)
                $_exceptionFormat($_lang_class_keyword_invalid, ':');

            // If the base handle is not a valid class handle, throw an exception
            if (!$_compilerHandle($baseHandle))
                $_exceptionFormat($_lang_class_base_invalid, $baseHandle);

            // If a base class was already provided, throw an exception
            if ($base)
                $_exceptionFormat($_lang_class_base_conflict, $baseHandle);

            // Resolve the base class from the base handle
            $base = $_runtimeHandle($baseHandle, false, $_namespace, $_aliases, $_includes);

            // If a base class was not resolved, throw an exception
            if (!$base)
                $_exceptionFormat($_lang_class_base_resolve, $baseHandle);

            // Get the modifiers string
            $modifiers = $modifiers.substr(0, $baseIndex).trim();
        }

        // Create the keywords array
        var $keywords = $modifiers.trim().split(' ');

        // Reset the modifiers
        $modifiers = 0;

        for (var $i = 0, $j = $keywords.length; $i < $j; $i++)
        {
            // Get the current keyword
            var $keyword = $keywords[$i];

            // If no keyword was provided, skip it
            if (!$keyword)
                continue;

            // Get the corresponding class modifier for the keyword
            var $modifier = $_modifiers_class[$keyword];

            // If no class modifier was found
            if (!$modifier)
            {
                // If the keyword is not the last keyword in the keywords array, throw an exception
                if ($i != $j - 1)
                    $_exceptionFormat($_lang_class_keyword_invalid, $keyword);

                // If the keyword is not a valid class name, throw an exception
                if (!$_const_regexp_class.test($keyword))
                    $_exceptionFormat($baseIndex >= 0 ?
                                      $_lang_class_name_invalid :
                                      $_lang_class_keyword_invalid,
                                      $keyword);

                // Set the class name
                $name = $keyword;
            }
            else
            {
                // If the class modifier was already defined in the modifiers, throw an exception
                if ($modifiers & $modifier)
                    $_exceptionFormat($_lang_class_keyword_duplicate, $keyword);

                // Set the class modifier in the modifiers
                $modifiers |= $modifier;
            }
        }

        // If a class name was provided
        if ($name)
        {
            // Set the global modifier
            $modifiers |= $_modifiers_class_global;

            // Set the class and exception handles
            $handle = $_handle = $_namespace ?
                                 $_namespace + '.' + $name :
                                 $name;

            // If the cache string is set
            if ($_cache)
            {
                // Get the import timestamp from local storage
                $import = $_store($_version + '_' + $_cache + '::' + $handle);

                // If an import timestamp was found in local storage, parse it
                if ($import)
                    $import = $_parse($import);

                // If the import timestamp is valid, set the import modifier
                if (typeof $import == 'number' && $import)
                    $modifiers |= $_modifiers_class_import;
                // Reset the import timestamp
                else
                    $import = null;
            }
        }
        // If a base handle was provided in the modifiers string, throw an exception
        else if ($baseIndex >= 0)
            $_exceptionFormat($_lang_class_keyword_invalid, ':');
    }
    // Reset the modifiers
    else
        $modifiers = 0;

    // If a class name was not provided, create a randomly generated class handle and name
    if (!$handle || !$name)
        $handle = $name = $_const_prefix_symbol + $_generator($_const_hash_class);

    // Create the iterated modifier flags
    var $abstract  = !!($modifiers & $_modifiers_class_abstract),
        $model     = !!($modifiers & $_modifiers_class_model),
        $primitive = !!($modifiers & $_modifiers_class_primitive),
        $sealed    = !!($modifiers & $_modifiers_class_sealed),
        $struct    = !!($modifiers & $_modifiers_class_struct);

    // If the class is either a model or a struct
    if ($model || $struct)
    {
        // If the model and struct modifiers were provided, throw an exception
        if ($model && $struct)
            $_exceptionFormat($_lang_class_conflict_and, $_const_keyword_classes, $_const_keyword_model, $_const_keyword_struct);

        // If the class is abstract, throw an exception
        if ($abstract)
            $_exceptionFormat($_lang_class_conflict_abstract,
                              $_const_keyword_classes,
                              $model ?
                              $_const_keyword_model :
                              $_const_keyword_struct);

        // If the struct modifier was provided
        if ($struct)
        {
            // If the struct has the sealed modifier, throw an exception
            if ($sealed)
                $_exceptionFormat($_lang_class_conflict, $_const_keyword_structs, $_const_keyword_sealed);

            // If the struct has the unlocked modifier, throw an exception
            if ($modifiers & $_modifiers_class_unlocked)
                $_exceptionFormat($_lang_class_conflict, $_const_keyword_structs, $_const_keyword_unlocked);
        }

        // If the expando modifier was provided, throw an exception
        if ($modifiers & $_modifiers_class_expando)
            $_exceptionFormat($_lang_class_conflict_expando,
                              $model ?
                              $_const_keyword_models :
                              $_const_keyword_structs);
    }
    else
    {
        // If the class is abstract and sealed, throw an exception
        if ($abstract && $sealed)
            $_exceptionFormat($_lang_class_conflict_abstract, $_const_keyword_classes, $_const_keyword_sealed);

        // If the class is primitive and has the expando modifier, throw an exception
        if ($primitive && $modifiers & $_modifiers_class_expando)
            $_exceptionFormat($_lang_class_conflict, $_const_keyword_expando, $_const_keyword_primitive);
    }

    // If the class is global and already found in the global classes, throw an exception
    if ($modifiers & $_modifiers_class_global && $_classes[$handle])
        $_exceptionFormat($_lang_class_global_invalid,
                          $model ?
                          $_const_keyword_model :
                          $struct ?
                          $_const_keyword_struct :
                          $_const_keyword_class,
                          $_classes[$handle][$_symbol_modifiers] & $_modifiers_class_model ?
                          $_const_keyword_model :
                          $_classes[$handle][$_symbol_modifiers] & $_modifiers_class_struct ?
                          $_const_keyword_struct :
                          $_const_keyword_class,
                          $handle);

    // Create the cache, internal index, and metadata
    var $cache      = new $__array($_symbolCreate ? $_cache_symbols__length : $_cache__length),
        $internal   = -1,
        $metaclass  = null,
        $metalength = 1;

    // Set the cache data
    $cache[$_cache_aliases]     = $_aliases;
    $cache[$_cache_constructor] = $constructor;
    $cache[$_cache_includes]    = $_includes;

    // If symbols are supported
    if ($_symbolCreate)
    {
        // Create the base, construct, private, protected, and public data symbols
        $cache[$_cache_symbols_base]      = $_symbolCreate();
        $cache[$_cache_symbols_construct] = $_symbolCreate();
        $cache[$_cache_symbols_private]   = $_symbolCreate();
      //$cache[$_cache_symbols_protected] = $_symbolCreate();
        $cache[$_cache_symbols_public]    = $_symbolCreate();
    }

    // Create the base metaclass and modifiers references (along with the cache references)
    var $baseMetaclass  = null,
        $baseModifiers  = null,
        $cachePrototype = null,
        $cacheStatic    = null,
        $defaults       = null;

    // If a base class was provided
    if ($base)
    {
        // If the class is a struct, throw an exception
        if ($struct)
            $_exceptionFormat($_lang_class_inherit_invalid, $_const_keyword_structs);

        // Get the base metaclass and modifiers
        $baseMetaclass = $base[$_symbol_metaclass];
        $baseModifiers = $base[$_symbol_modifiers];

        // If symbols are not supported, unlock the base metaclass
        if (!$_symbolCreate)
            $baseMetaclass = $baseMetaclass($_lock);

        // If the base class is a model
        if ($baseModifiers & $_modifiers_class_model)
        {
            // If the class is not a model, throw an exception
            if (!$model)
                $_exceptionFormat($_lang_class_inherit_conflict, $_const_keyword_classes, $_const_keyword_models);
        }
        // If the base class is a struct, throw an exception
        else if ($baseModifiers & $_modifiers_class_struct)
            $_exceptionFormat($_lang_class_inherit_conflict,
                              $model ?
                              $_const_keyword_models :
                              $_const_keyword_classes,
                              $_const_keyword_structs);
        // If the class is a model, throw an exception
        else if ($model)
            $_exceptionFormat($_lang_class_inherit_conflict, $_const_keyword_models, $_const_keyword_classes);

        // If the base class is sealed, throw an exception
        if ($baseModifiers & $_modifiers_class_sealed)
            $_exceptionFormat($_lang_class_inherit_sealed,
                              $model ?
                              $_const_keyword_models :
                              $_const_keyword_classes,
                              $model ?
                              $_const_keyword_model :
                              $_const_keyword_class);

        // If the base class is internal
        if ($baseModifiers & $_modifiers_class_internal)
        {
            // If the class is not internal, throw an exception
            if (!($modifiers & $_modifiers_class_internal))
                $_exceptionFormat($_lang_class_inherit_internal,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);

            // Set the internal index
            $internal = $base[$_symbol_internal] + 1;
        }
        // If the class is internal, set the internal index
        else if ($modifiers & $_modifiers_class_internal)
            $internal = 0;

        // If the base class is unlocked
        if ($baseModifiers & $_modifiers_class_unlocked)
        {
            // If the class is not unlocked, throw an exception
            if (!($modifiers & $_modifiers_class_unlocked))
                $_exceptionFormat($_lang_class_inherit_unlocked,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);
        }
        // If the class is unlocked, throw an exception
        else if ($modifiers & $_modifiers_class_unlocked)
            $_exceptionFormat($_lang_class_inherit_locked,
                              $model ?
                              $_const_keyword_model :
                              $_const_keyword_class);

        // If the class is primitive and the base class is not primitive, throw an exception
        if ($primitive && !($baseModifiers & $_modifiers_class_primitive))
            $_exceptionFormat($_lang_class_inherit_nonprimitive,
                              $model ?
                              $_const_keyword_model :
                              $_const_keyword_class);

        // If the class is optimized and the base class is not optimized, throw an exception
        if ($modifiers & $_modifiers_class_optimized && !($baseModifiers & $_modifiers_class_optimized))
            $_exceptionFormat($_lang_class_inherit_unoptimized,
                              $model ?
                              $_const_keyword_model :
                              $_const_keyword_class);

        // If the base class is expando
        if ($baseModifiers & $_modifiers_class_expando)
        {
            // If the class is not expando, throw an exception
            if (!($modifiers & $_modifiers_class_expando))
                $_exceptionFormat($_lang_class_inherit_expando,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);
        }
        // If the class is expando, throw an exception
        else if ($modifiers & $_modifiers_class_expando)
            $_exceptionFormat($_lang_class_inherit_nonexpando,
                              $model ?
                              $_const_keyword_model :
                              $_const_keyword_class);

        // Create the cache definitions objects
        $cache[$_cache_public]    = $__create($baseMetaclass[0][$_cache_public]);
        $cache[$_cache_protected] = $__create($baseMetaclass[0][$_cache_protected]);
        $cache[$_cache_private]   = $__create($cache[$_cache_protected]);
        $cache[$_cache_prototype] = $cachePrototype = $__create($baseMetaclass[0][$_cache_prototype]);
        $cache[$_cache_static]    = $cacheStatic    = $__create(null);

        // If symbols are supported
        if ($_symbolCreate)
        {
            // Create the defaults object and get the root data symbol from the base cache
            $cache[$_cache_symbols_defaults] = $defaults = $__create($baseMetaclass[0][$_cache_symbols_defaults]);
            $cache[$_cache_symbols_root]     = $baseMetaclass[0][$_cache_symbols_root];
        }

        // Create the metadata
        $metalength = $baseMetaclass.length + 1;
        $metaclass  = new $__array($metalength);

        // Set the cache in the metaclass
        $metaclass[0] = $cache;

        // Append the base metaclass to the metaclass
        for (var $i = 1; $i < $metalength; $i++)
            $metaclass[$i] = $baseMetaclass[$i - 1];
    }
    else
    {
        // If the class is internal, set the internal index
        if ($modifiers & $_modifiers_class_internal)
            $internal = 0;

        // Create the cache definitions objects
        $cache[$_cache_public]    = $__create(null);
        $cache[$_cache_protected] = $__create(null);
        $cache[$_cache_private]   = $__create($cache[$_cache_protected]);
        $cache[$_cache_prototype] = $cachePrototype = $__create(null);
        $cache[$_cache_static]    = $cacheStatic    = $__create(null);

        // If symbols are supported
        if ($_symbolCreate)
        {
            // Create the defaults object and root data symbol
            $cache[$_cache_symbols_defaults] = $defaults = $__create(null);
            $cache[$_cache_symbols_root]     = $_symbolCreate();
        }

        // Create the metaclass
        $metaclass = [$cache];
    }

    // Get the error count
    var $errors = $_debug ?
                  $_errors.length :
                  null;

    // If a private prototype was provided, compile the private definitions into the cache
    if ($prototypePrivate)
        for (var $key in $prototypePrivate)
            $_compilerTryCache($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $prototypePrivate[$key], $_const_keyword_private);

    // If a protected prototype was provided, compile the protected definitions into the cache
    if ($prototypeProtected)
        for (var $key in $prototypeProtected)
            $_compilerTryCache($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $prototypeProtected[$key], $_const_keyword_protected);

    // If a public prototype was provided, compile the public definitions into the cache
    if ($prototypePublic)
        for (var $key in $prototypePublic)
            $_compilerTryCache($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $prototypePublic[$key], $_const_keyword_public);

    // If a prototype was provided, compile the definitions into the cache
    if ($prototype)
        for (var $key in $prototype)
            $_compilerTryCache($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $prototype[$key]);

    // If the debug flag is set and there were new errors
    if ($_debug && $_errors.length > $errors)
    {
        // Reset the exception handle
        $_handle = '';

        // If the class is being defined in a namespace, return a failed class
        if ($_namespace != null)
            return $_compilerClassFailed();

        // Throw the errors array
        $_compilerThrowErrors($_errors);
    }

    // If a base class was provided
    if ($base)
    {
        // If the class is neither abstract nor being imported and the base class is abstract
        if (!$import && !$abstract && $baseModifiers & $_modifiers_class_abstract)
        {
            // Get the base and derived definitions
            var $definitionsBase    = $baseMetaclass[0][$_cache_protected],
                $definitionsDerived = $cache[$_cache_protected];

            for (var $key in $definitionsBase)
            {
                // Get the base definition and modifiers
                var $definitionBase = $definitionsBase[$key];

                // If the base definition does not have the abstract modifier, skip it
                if (!($definitionBase[$_definition_modifiers] & $_modifiers_abstract))
                    continue;

                // If the base definition is the derived definition, throw an exception
                if ($definitionBase === $definitionsDerived[$key])
                    $_exceptionFormat($_lang_class_abstract_override, $_const_keyword_class, $definitionBase[$_definition_name], $definitionBase[$_definition_type]);
            }
        }

        // Create the class prototype
        $prototype = $__create($base.prototype);
    }
    // Create the class prototype
    else
        $prototype = new $_class();

    // Get the cache prototype and static keys
    var $cachePrototypeKeys = $__keys($cachePrototype),
        $cacheStaticKeys    = $__keys($cacheStatic);

    // Execute the prototype definitions on the prototype
    for (var $i = 0, $j = $cachePrototypeKeys.length; $i < $j; $i++)
        $_compilerStatic($prototype, $cachePrototype[$cachePrototypeKeys[$i]]);

    // If a class name was provided, set the named "toString()" method on the prototype
    if ($modifiers & $_modifiers_class_global)
        $_data($prototype, 'toString', $_compilerToString($name));

    // Freeze the prototype
    $__freeze($prototype);

    // Create the class
    var $class = $cache[$_cache_class] = !$_symbolCreate ?
                                         $_runtimeMatrix($metaclass, $metalength, $abstract, !!($modifiers & $_modifiers_class_expando), $internal, $model, $primitive, $struct, !!($modifiers & $_modifiers_class_unlocked)) :
                                         $struct ?
                                         $_runtimeSymbolsStruct($metaclass, $handle, $name, $constructor, $defaults, $internal, !!($modifiers & $_modifiers_class_optimized)) :
                                         $_runtimeSymbolsMatrix($metaclass, $metalength, $handle, $name, $defaults, $abstract, $internal, $model, !!($modifiers & $_modifiers_class_optimized));

    // Execute the static definitions on the class
    for (var $i = 0, $j = $cacheStaticKeys.length; $i < $j; $i++)
        $_compilerStatic($class, $cacheStatic[$cacheStaticKeys[$i]]);

    // Set the class metadata
    $_data($class, $_symbol_handle,    $handle);
    $_data($class, $_symbol_internal,  $internal);
    $_data($class, $_symbol_metaclass, $_symbolCreate ? $metaclass : $_lock($metaclass));
    $_data($class, $_symbol_modifiers, $modifiers);
    $_data($class, $_symbol_name,      $name);
    $_data($class, $_symbol_namespace, $_namespace || '');

    // Set the class prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
    $class.prototype = $prototype;

    // Set the class prototype
    $_data($class, 'prototype', $prototype);

    // If a static "constructor()" definition was not provided, set the class constructor() reference
    if (!$__hasOwnProperty__.call($cache[$_cache_static], 'constructor'))
        $_data($class, 'constructor', $$);

    // If a static "toJSON()" definition was not provided, set the class toJSON() method
    if (!$__hasOwnProperty__.call($cache[$_cache_static], 'toJSON'))
        $_data($class, 'toJSON', $_json);

    // If a static "toString()" definition was not provided, set the class toString() method
    if (!$__hasOwnProperty__.call($cache[$_cache_static], 'toString'))
        $_data($class, 'toString', $_class_toString);

    // Set the symbols on the class
    $_compilerClassSymbols($class);

    // If a class name was provided
    if ($modifiers & $_modifiers_class_global)
    {
        // Set the class in the global classes
        $_classes[$handle] = $class;

        // Get the namespace
        var $namespace = $_namespace ?
                         $_namespaces[$_namespace] :
                         $$;

        // If the property is already defined on the namespace, throw an exception
        if ($__hasOwnProperty__.call($namespace, $name))
            $_exceptionFormat($_lang_class_global_invalid,
                              $model ?
                              $_const_keyword_model :
                              $struct ?
                              $_const_keyword_struct :
                              $_const_keyword_class,
                              $_const_keyword_global,
                              $handle);

        // Define the global class on the namesapce
        $_data($namespace, $name, $class, false, true);

        // If the cache string is set, cache the current timestamp in local storage
        if ($_cache)
            $_store($_version + '_' + $_cache + '::' + $handle, $__stringify($__date_now()));
    }

    // Reset the exception handle
    $_handle = '';

    // Return the class
    return $class;
};