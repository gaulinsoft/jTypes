/*! ------------------------------------------------------------------------
//                                jTypes 2.2.3
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
(function(global, undefined)
{
    // ########## DIRECTIVES ##########

    // Enable strict mode
    'use strict';

    // ########## BUILD ##########

    // Create the build minify flag and version number
    var $_minify  = false,
        $_version = '2.2.3';

    // ########## LANGUAGE ##########

    // Create the language constants
    var $_lang_abstract_accessor           = '"{0}" cannot be accessed because it is an abstract property.',
        $_lang_abstract_auto               = '"{0}" cannot have the abstract modifier because it is an automatically implemented property.',
        $_lang_abstract_call               = '"{0}" cannot be called because it is an abstract method.',
        $_lang_abstract_class              = '"{0}" cannot have the abstract modifier in a non-abstract class.',
        $_lang_access_duplicate            = '"{0}" cannot have more than one access modifier.',
        $_lang_access_invalid              = '"{0}" cannot have the private, protected, or public modifiers because it is a {1} definition.',
        $_lang_auto_invalid                = '"{0}" must have both accessors because it is an automatically implemented property.',
        $_lang_auto_invalid_default        = '"{0}" cannot have more than one default value for the automatically implemented property.',
        $_lang_auto_invalid_type           = '"{0}" must have primitive strings for accessors.',
        $_lang_class_abstract_instance     = 'abstract classes cannot be instantiated.',
        $_lang_class_abstract_override     = '{0} must implement the inherited abstract {2} "{1}" with the override modifier.',
        $_lang_class_base_conflict         = 'class cannot have an ambiguous base class "{0}".',
        $_lang_class_base_invalid          = '"{0}" is not a valid base class reference.',
        $_lang_class_base_resolve          = 'class cannot have an uncompiled base class "{0}".',
        $_lang_class_conflict              = '{0} cannot have the {1} modifier.',
        $_lang_class_conflict_abstract     = 'abstract {0} cannot have the {1} modifier.',
        $_lang_class_conflict_and          = '{0} cannot have the {1} and {2} modifiers.',
        $_lang_class_conflict_expando      = '{0} cannot have expando instances.',
        $_lang_class_failed_instance       = 'uncompiled classes cannot be instantiated.',
        $_lang_class_global_invalid        = '{0} cannot hide the existing {1} "{2}".',
        $_lang_class_inherit_conflict      = '{0} cannot inherit from {1}.',
        $_lang_class_inherit_expando       = '{0} must have the expando modifier to inherit from an expando {0}.',
        $_lang_class_inherit_internal      = '{0} must have the internal modifier to inherit from an internal {0}.',
        $_lang_class_inherit_invalid       = '{0} cannot have inheritance.',
        $_lang_class_inherit_locked        = '{0} must inherit from an unlocked {0} to have the unlocked modifier.',
        $_lang_class_inherit_nonexpando    = '{0} must inherit from an expando {0} to have the expando modifier.',
        $_lang_class_inherit_nonprimitive  = '{0} must inherit from a primitive {0} to have the primitive modifier.',
        $_lang_class_inherit_sealed        = '{0} cannot inherit from a sealed {1}.',
        $_lang_class_inherit_unlocked      = '{0} must have the unlocked modifier to inherit from an unlocked {0}.',
        $_lang_class_inherit_unoptimized   = '{0} must inherit from an optimized {0} to have the optimized modifier.',
        $_lang_class_keyword_duplicate     = 'class cannot have a duplicate {0} modifier.',
        $_lang_class_keyword_invalid       = '"{0}" is not a valid class modifier.',
        $_lang_class_name_invalid          = '"{0}" is not a valid class name.',
        $_lang_class_new                   = 'classes cannot be compiled using the new operator.',
        $_lang_conflict_and                = '"{0}" cannot have the {1} and {2} modifiers.',
        $_lang_conflict_constraint         = '"{0}" must be a field or automatically implemented property to have the "{1}" type constraint.',
        $_lang_conflict_generic            = '"{0}" is not generic and must be accessed on an instance.',
        $_lang_conflict_modifier           = '"{0}" cannot have the {1} modifier in a {2}.',
        $_lang_constraint_class            = '"{0}" cannot have a type constraint because it is a class definition.',
        $_lang_constraint_const            = '"{0}" cannot have a type constraint with the const modifier.',
        $_lang_constraint_primitive        = '"{0}" must have a primitive type constraint in a primitive {1}.',
        $_lang_exception_arguments         = '"{0}({1})" has some invalid arguments.',
        $_lang_exception_compatibility     = 'JavaScript engine does not support ECMAScript 5.',
        $_lang_exception_generic           = 'Compiler Errors:',
        $_lang_exception_suffix            = '[jTypes]',
        $_lang_exception_suffix_handle     = '[jTypes.{0}]',
        $_lang_filter_invalid              = '"{0}" has an invalid type constraint "{1}".',
        $_lang_filter_invalid_generic      = '"{1}" is not a valid type constraint.',
        $_lang_filter_primitive            = '"{0}" cannot have a non-primitive type constraint "{1}" in a primitive {2}.',
        $_lang_filter_value                = '"{0}" must have a value of the type {1}.',
        $_lang_handle_alias_conflict       = 'namespace "{0}" contains a definition conflicting with alias "{1}".',
        $_lang_handle_alias_invalid        = 'namespace "{0}" contains an invalid class alias "{1}".',
        $_lang_handle_dependency_invalid   = 'namespace "{0}" contains an invalid class dependency "{1}".',
        $_lang_handle_include_duplicate    = '"{0}" is an ambiguous reference between "{1}.{0}" and "{2}.{0}".',
        $_lang_handle_qualifier_invalid    = 'namespace "{0}" does not have the "{1}" alias.',
        $_lang_keyword_duplicate           = '"{0}" cannot have a duplicate {1} modifier.',
        $_lang_keyword_invalid             = '"{0}" has an invalid modifier "{1}".',
        $_lang_name_duplicate              = '"{0}" cannot have more than one {1}definition.',
        $_lang_name_invalid                = '"{0}" is not a valid name.',
        $_lang_name_reserved               = '"{0}" is a reserved name.',
        $_lang_namespace_alias_duplicate   = 'namespace already has an alias "{0}".',
        $_lang_namespace_alias_invalid     = 'namespace has an invalid alias "{0}".',
        $_lang_namespace_dependency_type   = 'namespace must have primitive string directives.',
        $_lang_namespace_include_invalid   = 'namespace has an invalid include "{0}".',
        $_lang_namespace_invalid           = '"{0}" is not a valid namespace.',
        $_lang_namespace_subnamespace      = 'namespace "{0}" cannot be compiled within another namespace.',
        $_lang_new_invalid                 = '"{0}" must hide an inherited {1}definition to have the new modifier.',
        $_lang_new_required                = '"{0}" cannot hide an inherited {1}definition without the new modifier.',
        $_lang_override_constraint         = '"{0}" must have the "{1}" type constraint to override.',
        $_lang_override_invalid            = '"{0}" has no suitable {1} to override.',
        $_lang_override_required           = '"{0}" must implement the inherited abstract {1} with the override modifier.',
        $_lang_property_access_accessor    = '"{0}" must have both accessors to have an access modifier on the {1} accessor.',
        $_lang_property_access_conflict    = '"{0}" cannot have the {2} modifier on the {1} accessor in a {3}.',
        $_lang_property_access_duplicate   = '"{0}" cannot have access modifiers on both accessors.',
        $_lang_property_access_invalid     = '"{0}" has an invalid access modifier "{2}" on the {1} accessor.',
        $_lang_property_access_restrictive = '"{0}" must have a more restrictive access modifier on the {1} accessor.',
        $_lang_property_name_duplicate     = '"{0}" cannot have more than one definition for the {1} accessor.',
        $_lang_property_name_empty         = '"{0}" must have at least one property accessor.',
        $_lang_property_name_invalid       = '"{0}" cannot have a "{1}" property accessor.',
        $_lang_property_override_accessor  = '"{0}" must override both accessors of the inherited abstract property.',
        $_lang_property_override_invalid   = '"{0}" has no suitable {1} accessor to override.',
        $_lang_property_private_abstract   = '"{0}" cannot have a private {1} accessor because it is abstract.',
        $_lang_property_private_override   = '"{0}" cannot override a private {1} accessor.',
        $_lang_property_readonly_invalid   = '"{0}" must have both accessors to have the readonly modifier.',
        $_lang_property_value_abstract     = '"{0}" must have a either a null or undefined reference or a function for the {1} accessor.',
        $_lang_property_value_function     = '"{0}" must have a function for the {1} accessor.',
        $_lang_readonly_data               = '"{0}" cannot be set because it is a read-only {1}.',
        $_lang_readonly_invalid            = '"{0}" cannot have the readonly modifier because it is a {1} definition.',
        $_lang_readonly_invalid_type       = '"{0}" must be a field or property to have the readonly modifier.',
        $_lang_requires                    = '"{0}" cannot have the {1} modifier without the {2} modifier.',
        $_lang_requires_or                 = '"{0}" cannot have the {1} modifier without the {2} or {3} modifiers.',
        $_lang_virtual_invalid             = '"{0}" cannot have the abstract, virtual, or override modifiers because it is a {1} definition.',
        $_lang_virtual_invalid_type        = '"{0}" must be a method or property to have the abstract, virtual, or override modifiers.',
        $_lang_virtual_sealed              = '"{0}" cannot have the virtual modifier in a sealed {1}.';

    // ########## FLAGS ##########

    // If no global object was provided, create a temporary global object
    if (!global)
        global = {};

    // Create the internal flags
    var $_arrays    = global['jT_TypedArrays'] === true,
        $_cache     = '',
        $_debug     = !$_minify,
        $_element   = global['HTMLElement'] || null,
        $_funcLock  = global['jT_FunctionLock'] === true,
        $_harmony   = global['jT_Harmony'] !== false,
        $_jquery    = typeof global['jQuery'] == 'function' ? global['jQuery'] : null,
        $_legacy    = global['jT_Legacy'] === true,
        $_protoLock = global['jT_PrototypeLock'] === true,
        $_storage   = global['jT_Storage'] === true ? {} : null,
        $_strict    = false;

    // ########## NATIVE CODE ##########

    // Store references to native code functions and constants
    var $__object                   = Object,
        $__objectProto__            = $__object.prototype,
        $__create                   = $__object.create,
        $__defineProperties         = $__object.defineProperties,
        $__defineProperty           = $__object.defineProperty,
        $__freeze                   = $__object.freeze,
        $__getOwnPropertyDescriptor = $__object.getOwnPropertyDescriptor,
        $__getOwnPropertyNames      = $__object.getOwnPropertyNames,
        $__getPrototypeOf           = $__object.getPrototypeOf,
        $__isExtensible             = $__object.isExtensible,
        $__isFrozen                 = $__object.isFrozen,
        $__isSealed                 = $__object.isSealed,
        $__keys                     = $__object.keys,
        $__preventExtensions        = $__object.preventExtensions,
        $__propertyIsEnumerable     = $__object.propertyIsEnumerable,
        $__seal                     = $__object.seal,
        $__hasOwnProperty__         = $__objectProto__.hasOwnProperty,
        $__isPrototypeOf__          = $__objectProto__.isPrototypeOf,
        $__toString__               = $__objectProto__.toString,
        $__valueOf__                = $__objectProto__.valueOf,

        // ---------- ARRAY ----------
        $__array            = Array,
        $__arrayProto__     = $__array.prototype,
        $__array_isArray    = $__array.isArray,
        $__array_toString__ = $__arrayProto__.toString,

        // ---------- BOOLEAN ----------
        $__boolean            = Boolean,
        $__booleanProto__     = $__boolean.prototype,
        $__boolean_toString__ = $__booleanProto__.toString,
        $__boolean_valueOf__  = $__booleanProto__.valueOf,

        // ---------- DATE ----------
        $__date            = Date,
        $__dateProto__     = $__date.prototype,
        $__date_now        = $__date.now,
        $__date_parse      = $__date.parse,
        $__date_utc        = $__date.UTC,
        $__date_toString__ = $__dateProto__.toString,
        $__date_valueOf__  = $__dateProto__.valueOf,

        // ---------- ERROR ----------
        $__error            = Error,
        $__errorProto__     = $__error.prototype,
        $__error_toString__ = $__errorProto__.toString,

        // ---------- FUNCTION ----------
        $__function            = Function,
        $__functionProto__     = $__function.prototype,
        $__function_apply__    = $__functionProto__.apply,
        $__function_call__     = $__functionProto__.call,
        $__function_toString__ = $__functionProto__.toString,

        // ---------- NUMBER ----------
        $__number            = Number,
        $__numberProto__     = $__number.prototype,
        $__number_toString__ = $__numberProto__.toString,
        $__number_valueOf__  = $__numberProto__.valueOf,

        // Store the number constants
        $__number_maxValue__         = $__number.MAX_VALUE,
        $__number_minValue__         = $__number.MIN_VALUE,
        $__number_negativeInfinity__ = $__number.NEGATIVE_INFINITY,
        $__number_positiveInfinity__ = $__number.POSITIVE_INFINITY,

        // Store the global NaN constant
        $__NaN__ = NaN,

        // Store the number-related global functions
        $__ceil       = Math.ceil,
        $__floor      = Math.floor,
        $__isFinite   = isFinite,
        $__isNaN      = isNaN,
        $__parseFloat = parseFloat,
        $__parseInt   = parseInt,
        $__random     = Math.random,

        // ---------- REGEXP ----------
        $__regexp            = RegExp,
        $__regexpProto__     = $__regexp.prototype,
        $__regexp_toString__ = $__regexpProto__.toString,

        // ---------- STRING ----------
        $__string            = String,
        $__stringProto__     = $__string.prototype,
        $__string_toString__ = $__stringProto__.toString,
        $__string_valueOf__  = $__stringProto__.valueOf,

        // ---------- WINDOW ----------
        $__window            = null,
        $__windowProto__     = null,
        $__window_toString__ = null,

        // ---------- JSON ----------
        $__parse     = null,
        $__stringify = null,

        // ---------- STORAGE ----------
        $__storageLocal__   = null,
        $__storageSession__ = null,

        // ---------- HARMONY ----------
        $__proxy  = null,
        $__symbol = null;

    // If any of the ECMAScript 5 native code methods are not found, throw an exception
    if (!$__create || !$__defineProperty || !$__freeze || !$__getPrototypeOf || !$__preventExtensions || !$__seal || !$__array_isArray || !$__arrayProto__.forEach || !$__arrayProto__.indexOf || !$__stringProto__.trim)
        throw new $__error($_lang_exception_compatibility + ' ' + $_lang_exception_suffix);

    // If a window type is defined
    if (typeof Window != 'undefined' && Window != null && Window.prototype != null)
    {
        // Set the native window references
        $__window            = Window;
        $__windowProto__     = $__window.prototype;
        $__window_toString__ = $__windowProto__.toString;
    }

    // If the global JSON object is defined
    if (typeof JSON != 'undefined' && JSON != null)
    {
        // If the JSON parse function is defined, store it
        if (typeof JSON.parse == 'function')
            $__parse = JSON.parse;

        // If the JSON stringify function is defined, store it
        if (typeof JSON.stringify == 'function')
            $__stringify = JSON.stringify;
    }

    // If the storage flag is set, test if local and session storage are supported
    if ($_storage)
        (function($key)
        {
            try
            {
                // Get the storage
                var $storage = localStorage;

                // Cache the version in the storage
                $storage.setItem($key, $_version);

                // If the version was cached in the storage, set the native storage reference
                if ($storage.getItem($key) === $_version)
                    $__storageLocal__ = $storage;

                // Remove the cached version from the storage
                $storage.removeItem($key);
            }
            catch (e)
            {
                //
            }

            try
            {
                // Get the storage
                var $storage = sessionStorage;

                // Cache the version in the storage
                $storage.setItem($key, $_version);

                // If the version was cached in the storage, set the native storage reference
                if ($storage.getItem($key) === $_version)
                    $__storageSession__ = $storage;

                // Remove the cached version from the storage
                $storage.removeItem($key);
            }
            catch (e)
            {
                //
            }
        })('~jT_storage');

    // If the harmony flag is set
    if ($_harmony)
    {
        // If a proxy type is defined, test if proxies are supported
        if (typeof Proxy == 'function')
            (function()
            {
                try
                {
                    // Create the proxy test
                    var $_target   = { '': null },
                        $_val      = {},
                        $_proxy    = new Proxy($_target, { 'get': function($target, $name, $receiver)
                        {
                            // If the test matches the proxy specifications, return the value
                            if ($target === $_target && $name === '' && $receiver === $_receiver)
                                return $_val;
                        } }),
                        $_receiver = $__create($_proxy);

                    // If the value was returned, set the native proxy reference
                    if ($_receiver[''] === $_val)
                        $__proxy = Proxy;
                }
                catch (e)
                {
                    //
                }
            })();

        // If a symbol type is defined, test if symbols are supported
        if (typeof Symbol == 'function')
            (function()
            {
                try
                {
                    // Create the symbol test
                    var $object = $__create(null),
                        $symbol = Symbol();

                    // Set the symbol in the object
                    $object[$symbol] = $symbol;

                    // If the symbol was set in the object and the object has no properties, set the native symbol reference
                    if (typeof $object[$symbol] == 'symbol' && $__getOwnPropertyNames($object).length == 0)
                        $__symbol = Symbol;
                }
                catch (e)
                {
                    //
                }
            })();
    }

    // If the global function lock flag was set, prevent extensions on the native prototype functions
    if ($_funcLock)
    {
        // ----- OBJECT -----
        $__preventExtensions($__hasOwnProperty__);
        $__preventExtensions($__isPrototypeOf__);
        $__preventExtensions($__toString__);
        $__preventExtensions($__valueOf__);

        // ----- ARRAY -----
        $__preventExtensions($__array_toString__);

        // ----- BOOLEAN -----
        $__preventExtensions($__boolean_toString__);
        $__preventExtensions($__boolean_valueOf__);

        // ----- DATE -----
        $__preventExtensions($__date_toString__);
        $__preventExtensions($__date_valueOf__);

        // ----- ERROR -----
        $__preventExtensions($__error_toString__);

        // ----- FUNCTION -----
        $__preventExtensions($__function_apply__);
        $__preventExtensions($__function_call__);
        $__preventExtensions($__function_toString__);

        // ----- NUMBER -----
        $__preventExtensions($__number_toString__);
        $__preventExtensions($__number_valueOf__);

        // ----- REGEXP -----
        $__preventExtensions($__regexp_toString__);

        // ----- STRING -----
        $__preventExtensions($__string_toString__);
        $__preventExtensions($__string_valueOf__);

        // ----- WINDOW -----
        if ($__window_toString__)
            $__preventExtensions($__window_toString__);
    }

    // If the global prototype lock flag was set
    if ($_protoLock)
    {
        // Freeze the native prototypes
        $__freeze($__arrayProto__);
        $__freeze($__booleanProto__);
        $__freeze($__dateProto__);
        $__freeze($__errorProto__);
        $__freeze($__functionProto__);
        $__freeze($__numberProto__);
        $__freeze($__objectProto__);
        $__freeze($__regexpProto__);
        $__freeze($__stringProto__);
    }

    // ########## WINDOW ##########

    // Create the window reference
    var $_window = typeof window != 'undefined' && window != null && window.window === window ?
                   window :
                   $__freeze({});

    // ########## CONSTANTS ##########

    // Create the internal constants
    var $_const_date_max                 = 8640000000000000,
        $_const_date_min                 = -$_const_date_max,
        $_const_escape_replace           = '\\$&',
        $_const_escape_search            = /[-\/\\^$*+?.()|[\]{}]/g,
        $_const_float_epsilon            = 2.220460492503130808472633361816E-16,
        $_const_float_max                = $__number_maxValue__,
        $_const_float_min                = -$_const_float_max,
        $_const_format_search            = /(\{+)([0-9]+)(,([-+]?[0-9]+))?\}/g,
        $_const_hash_class               = 6,
        $_const_hash_default             = 3,
        $_const_hash_symbol              = 12,
        $_const_int_max                  = 9007199254740992,
        $_const_int_min                  = -$_const_int_max,
        $_const_int32_max                = 2147483647,
        $_const_int32_min                = -$_const_int32_max - 1,
        $_const_keyword_abstract         = 'abstract',
        $_const_keyword_class            = 'class',
        $_const_keyword_classes          = 'classes',
        $_const_keyword_const            = 'const',
        $_const_keyword_field            = 'field',
      //$_const_keyword_external         = 'external',
        $_const_keyword_expando          = 'expando',
        $_const_keyword_get              = 'get',
        $_const_keyword_global           = 'global',
        $_const_keyword_hidden           = 'hidden',
        $_const_keyword_internal         = 'internal',
        $_const_keyword_method           = 'method',
        $_const_keyword_model            = 'model',
        $_const_keyword_models           = 'models',
        $_const_keyword_namespace        = 'namespace',
        $_const_keyword_new              = 'new',
        $_const_keyword_optimized        = 'optimized',
        $_const_keyword_override         = 'override',
        $_const_keyword_primitive        = 'primitive',
        $_const_keyword_private          = 'private',
        $_const_keyword_property         = 'property',
        $_const_keyword_protected        = 'protected',
        $_const_keyword_prototype        = 'prototype',
        $_const_keyword_public           = 'public',
        $_const_keyword_readonly         = 'readonly',
        $_const_keyword_sealed           = 'sealed',
        $_const_keyword_set              = 'set',
        $_const_keyword_static           = 'static',
        $_const_keyword_struct           = 'struct',
        $_const_keyword_structs          = 'structs',
        $_const_keyword_unlocked         = 'unlocked',
        $_const_keyword_using            = 'using',
        $_const_keyword_virtual          = 'virtual',
        $_const_keyword_visible          = 'visible',
        $_const_prefix_storage           = '~jT_',
        $_const_prefix_symbol            = '$jT_',
        $_const_regexp_cache             = /^[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i,
        $_const_regexp_class             = /^[A-Z][_a-zA-Z0-9]*$/,
        $_const_regexp_constraint        = /^(~|@)?([a-z]+(?:-[a-z]+)?(?:[0-9]*\[\])?)(\?|!)?$/,
        $_const_regexp_constraint_handle = /^(@)?((?:[_a-zA-Z][_a-zA-Z0-9]*::)?(?:[_a-zA-Z0-9.]+\.)?[A-Z][_a-zA-Z0-9]*)(\?|!)?$/,
        $_const_regexp_instance          = /^[_$a-z][_$a-z0-9]*$/i,
        $_const_regexp_namespace         = /^[_a-z][_a-z0-9]*$/i,
        $_const_regexp_number            = /^[-+]?(?:[0-9]*\.)?[0-9]+(?:e[-+]?[0-9]+)?$/i,
        $_const_regexp_number_hex        = /^[-+]?0x[0-9a-f]+$/i,
        $_const_regexp_regexp            = /^\/([^\r\n]+)\/([gimy]{0,4})$/,
        $_const_typed_arrays             = 'float32 float64 uint32 int32 uint16 int16 uint8 int8'.split(' '),
        $_const_types                    = 'Array Boolean Date Error Function Number RegExp String'.split(' '),
        $_const_types_window             = 'global Window DOMWindow'.split(' ');

    // If the harmony flag is set, push the symbol type into the internal JavaScript types array
    if ($_harmony)
        $_const_types.push('Symbol');

    // ---------- CACHES ----------

    // Create the cache indices
    var $_cache_aliases     = 7,
        $_cache_class       = 0,
        $_cache_constructor = 1,
        $_cache_includes    = 8,
        $_cache_private     = 2,
        $_cache_protected   = 3,
        $_cache_prototype   = 5,
        $_cache_public      = 4,
        $_cache_static      = 6,

        // Create the length
        $_cache__length = 9,

        // Create the cache symbols indices
        $_cache_symbols_base      = 12,
        $_cache_symbols_construct = 13,
        $_cache_symbols_defaults  = 15,
        $_cache_symbols_private   = 9,
      //$_cache_symbols_protected = 10,
        $_cache_symbols_public    = 11,
        $_cache_symbols_root      = 14,

        // Create the symbols length
        $_cache_symbols__length = 16;

    // ---------- CONSTRAINTS ----------

    // Create the constraints lookup and constraint bits
    var $_constraints          = $__create(null),
        $_constraints_cast     = 1 << 0,
        $_constraints_default  = 1 << 1,
        $_constraints_null     = 1 << 2,
        $_constraints_suppress = 1 << 3;

    // Set the constraints lookup flags for each native constraint
    $_constraints['array']     = $_constraints_cast | $_constraints_default | $_constraints_suppress;
    $_constraints['bool']      = $_constraints_cast | $_constraints_null    | $_constraints_suppress;
    $_constraints['boolean']   = $_constraints_cast | $_constraints_null    | $_constraints_suppress;
    $_constraints['date']      = $_constraints_cast | $_constraints_default | $_constraints_suppress;
    $_constraints['error']     =                  0 | $_constraints_default | $_constraints_suppress;
    $_constraints['float']     = $_constraints_cast | $_constraints_null    | $_constraints_suppress;
    $_constraints['function']  =                  0 | $_constraints_default | $_constraints_suppress;
    $_constraints['int']       = $_constraints_cast | $_constraints_null    | $_constraints_suppress;
    $_constraints['integer']   = $_constraints_cast | $_constraints_null    | $_constraints_suppress;
    $_constraints['number']    = $_constraints_cast | $_constraints_null    | $_constraints_suppress;
    $_constraints['object']    =                  0 | $_constraints_default | $_constraints_suppress;
    $_constraints['primitive'] =                  0 |                     0 | $_constraints_suppress;
    $_constraints['regexp']    = $_constraints_cast | $_constraints_default | $_constraints_suppress;
    $_constraints['string']    = $_constraints_cast | $_constraints_null    | $_constraints_suppress;
    $_constraints['type']      =                  0 |                     0 | $_constraints_suppress;
    $_constraints['window']    =                  0 |                     0 | $_constraints_suppress;

    // If the element flag is set, set the native element constraint flag
    if ($_element)
        $_constraints['element'] = $_constraints_suppress;

    // If the jQuery flag is set, set the native jQuery constraint flags
    if ($_jquery)
        $_constraints['jquery'] = $_constraints_default | $_constraints_suppress;

    // If the harmony flag is set, set the native symbol constraint flags
    if ($_harmony)
        $_constraints['symbol'] = $_constraints_null | $_constraints_suppress;

    // If the typed arrays flag is set, set the native typed arrays constraint flags
    if ($_arrays)
        for (var $i = 0, $j = $_const_typed_arrays.length; $i < $j; $i++)
            $_constraints[$_const_typed_arrays[$i] + '[]'] = $_constraints_suppress;

    // ---------- DEFINITIONS ----------

    // Create the definition indices
    var $_definition_constraint = 3,// @
        $_definition_filter     = 5,
        $_definition_modifiers  = 2,// @
        $_definition_name       = 0,// @
        $_definition_type       = 4,// @
        $_definition_value      = 1,// @

        // Create the length
        $_definition__length = 6;

    // ---------- DIRECTIVES ----------

    // Create the directive indices
    var $_directive_filter       = 3,
        $_directive_inherits     = 4,
        $_directive_instructions = 2,
        $_directive_name         = 0,
        $_directive_value        = 1,

        // Create the length
        $_directive__length = 5;

    // ---------- INSTANCES ----------

    // Create the instance indices
    var $_instance_base      = 3,
        $_instance_construct = 4,
        $_instance_private   = 0,
        $_instance_protected = 1,
        $_instance_public    = 2;

    // ---------- INSTRUCTIONS ----------

    // Create the instruction bits
    var $_instructions_base          = 1 << 0,
        $_instructions_configurable  = 1 << 1,
        $_instructions_data          = 1 << 2,
        $_instructions_data_readonly = 1 << 3,
        $_instructions_enumerable    = 1 << 4,
        $_instructions_get           = 1 << 5,
        $_instructions_private       = 1 << 6,
        $_instructions_private_get   = 1 << 7,
        $_instructions_private_set   = 1 << 8,
        $_instructions_protected     = 1 << 9,
        $_instructions_protected_get = 1 << 10,
        $_instructions_protected_set = 1 << 11,
        $_instructions_public        = 1 << 12,
        $_instructions_set           = 1 << 13,
        $_instructions_this          = 1 << 14,
        $_instructions_value         = 1 << 15,
        $_instructions_writable      = 1 << 16,

        // Create the override instruction bits
        $_instructions_overridden          = 1 << 17,
        $_instructions_overridden_get      = 1 << 18,
        $_instructions_overridden_private  = 1 << 19,
        $_instructions_overridden_set      = 1 << 20,
        $_instructions_override            = 1 << 21,
        $_instructions_override_descriptor = 1 << 22,
        $_instructions_override_get        = 1 << 23,
        $_instructions_override_set        = 1 << 24;

    // ---------- MODIFIERS ----------

    // Create the modifiers map and modifier bits
    var $_modifiers           = $__create(null),
        $_modifiers_abstract  = 1 << 0, // @
        $_modifiers_const     = 1 << 1, // @
      //$_modifiers_external  = 1 << 2, // @
        $_modifiers_field     = 1 << 3, // @
        $_modifiers_hidden    = 1 << 4, // @
      //$_modifiers_internal  = 1 << 5, // @
        $_modifiers_method    = 1 << 6, // @
        $_modifiers_nested    = 1 << 7, // @
        $_modifiers_new       = 1 << 8, // @
        $_modifiers_override  = 1 << 9, // @
        $_modifiers_private   = 1 << 10,// @
        $_modifiers_protected = 1 << 11,// @
        $_modifiers_prototype = 1 << 12,// @
        $_modifiers_public    = 1 << 13,// @
        $_modifiers_readonly  = 1 << 14,// @
        $_modifiers_sealed    = 1 << 15,// @
        $_modifiers_static    = 1 << 16,// @
        $_modifiers_virtual   = 1 << 17,// @
        $_modifiers_visible   = 1 << 18,// @

        // Create the property modifier bits
        $_modifiers_property_auto          = 1 << 19,// @
        $_modifiers_property_get           = 1 << 20,// @
        $_modifiers_property_get_private   = 1 << 21,// @
        $_modifiers_property_get_protected = 1 << 22,// @
        $_modifiers_property_set           = 1 << 23,// @
        $_modifiers_property_set_private   = 1 << 24,// @
        $_modifiers_property_set_protected = 1 << 25;// @

    // Set the modifiers in the modifiers map
    $_modifiers['abstract']  = $_modifiers_abstract;
    $_modifiers['const']     = $_modifiers_const;
  //$_modifiers['external']  = $_modifiers_external;
    $_modifiers['hidden']    = $_modifiers_hidden;
  //$_modifiers['internal']  = $_modifiers_internal;
    $_modifiers['new']       = $_modifiers_new;
    $_modifiers['override']  = $_modifiers_override;
    $_modifiers['private']   = $_modifiers_private;
    $_modifiers['protected'] = $_modifiers_protected;
    $_modifiers['prototype'] = $_modifiers_prototype;
    $_modifiers['public']    = $_modifiers_public;
    $_modifiers['readonly']  = $_modifiers_readonly;
    $_modifiers['sealed']    = $_modifiers_sealed;
    $_modifiers['static']    = $_modifiers_static;
    $_modifiers['virtual']   = $_modifiers_virtual;
    $_modifiers['visible']   = $_modifiers_visible;

    // ---------- CLASS MODIFIERS ----------

    // Create the class modifiers map and class modifier bits
    var $_modifiers_class           = $__create(null),
        $_modifiers_class_abstract  = 1 << 0, // @
        $_modifiers_class_expando   = 1 << 1, // @
        $_modifiers_class_global    = 1 << 2, // @
        $_modifiers_class_import    = 1 << 3, // @
        $_modifiers_class_internal  = 1 << 4, // @
        $_modifiers_class_model     = 1 << 5, // @
        $_modifiers_class_optimized = 1 << 6, // @
        $_modifiers_class_primitive = 1 << 7, // @
        $_modifiers_class_sealed    = 1 << 8, // @
        $_modifiers_class_struct    = 1 << 9, // @
        $_modifiers_class_unlocked  = 1 << 10;// @

    // Set the class modifiers in the class modifiers map
    $_modifiers_class['abstract']  = $_modifiers_class_abstract;
    $_modifiers_class['internal']  = $_modifiers_class_internal;
    $_modifiers_class['model']     = $_modifiers_class_model;
    $_modifiers_class['primitive'] = $_modifiers_class_primitive;
    $_modifiers_class['sealed']    = $_modifiers_class_sealed;
    $_modifiers_class['struct']    = $_modifiers_class_struct;
    $_modifiers_class['unlocked']  = $_modifiers_class_unlocked;

    // If the global legacy flag is not set, set the optimized class modifier in the class modifiers map
    if (!$_legacy)
        $_modifiers_class['optimized'] = $_modifiers_class_optimized;
    // Set the expando class modifier in the class modifiers map
    else
        $_modifiers_class['expando'] = $_modifiers_class_expando;

    // ########## VARIABLES ##########

    // Create the internal variables
    var $_aliases    = null,
        $_classes    = $__create(null),
        $_clone      = {},
        $_errors     = [],
        $_filters    = $__create(null),
        $_handle     = '',
        $_includes   = null,
        $_namespace  = null,
        $_namespaces = $__create(null);

    // ---------- LOCKS ----------

    // Create the internal lock references
    var $_lock_class     = null,
        $_lock_instances = null;

    // ########## HELPERS ##########

    // Create the arguments reference, characters string, and hashes object
    var $_arguments  = null,
        $_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        $_hashes     = $__create(null);

    // Append the lowercase characters to the characters string
    $_characters += $_characters.toLowerCase();

    // Create the helper functions
    var $_accessor  = function($object, $key, $get, $set, $enumerable, $configurable)
    {
        // Define the "accessor" property
        $__defineProperty($object, $key,
        {
            'configurable': !!$configurable,
            'enumerable':   !!$enumerable,
            'get':          $get || undefined,
            'set':          $set || undefined
        });
    };
    var $_data      = function($object, $key, $value, $writable, $enumerable, $configurable)
    {
        // Define the "data" property
        $__defineProperty($object, $key,
        {
            'configurable': !!$configurable,
            'enumerable':   !!$enumerable,
            'value':        $value,
            'writable':     !!$writable
        });
    };
    var $_date      = function()
    {
        // Return an NaN date object
        return new $__date($__NaN__);
    };
    var $_format    = function($0, $1, $2, $3, $4)
    {
        // Get the number of opening-braces, argument index, and alignment length
        var $braces    = $1.length,
            $index     = $__parseInt($2, 10),
            $alignment = $4 ?
                         $__parseInt($4, 10) :
                         0;

        // If an even number of opening-braces was provided, the argument index exceeded the number of arguments, or the alignment length is out of range, return the match (with the escaped opening-braces)
        if ($braces % 2 == 0 || $index >= $_arguments.length || $alignment > $_const_int_max || $alignment < $_const_int_min)
            return $1.substr($braces / 2) + $2 + ($3 || '') + '}';

        // Get the argument string for the argument index
        var $argument = $_arguments[$index];

        // If a positive alignment length was provided, left-pad the argument string to the alignment length
        if ($alignment > 0)
            while ($argument.length < $alignment)
                $argument = ' ' + $argument;
        // If a negative alignment length was provided, right-pad the argument string to the alignment length
        else if ($alignment < 0)
            while ($argument.length < -$alignment)
                $argument += ' ';

        // If more than one opening-brace was provided, return the argument string (with the escaped opening-braces)
        if ($braces > 1)
            return $1.substr($__floor($braces / 2) + 1) + $argument;

        // Return the argument string
        return $argument;
    };
    var $_generator = function($length)
    {
        // If no length was provided, use the default length
        if (!$length)
            $length = $_const_hash_default;

        // Create the hash reference
        var $hash = null;

        do
        {
            // Reset the hash
            $hash = '';

            // Append random characters to the hash
            for (var $i = 0, $j = $_characters.length; $i < $length; $i++)
                $hash += $_characters[$__floor($j * $__random())];
        }
        // Continue if the hash was already found in the hashes object
        while ($_hashes[$hash]);

        // Set the hash in the hashes object
        $_hashes[$hash] = $hash;

        // Return the hash
        return $hash;
    };
    var $_get       = function($function, $filter)
    {
        // If a filter was provided, return the filtered get accessor
        if ($filter)
            return function()
            {
                // Call the get accessor in the given context and return its return value within the applied constraint filter
                return $filter($function.call(this));
            };

        // Return the get accessor
        return function()
        {
            // Call the get accessor in the given context and return its return value
            return $function.call(this);
        };
    };
    var $_json      = function()
    {
        // If the function context is a primitive value, return it
        if ($$_isPrimitive(this))
            return this;

        // Create the JSON object
        var $json = {};

        // Loop through the enumerable properties on the function context and copy each value to the JSON object
        for (var $key in this)
            $json[$key] = this[$key];

        // Return the JSON object
        return $json;
    };
    var $_lock      = function($object)
    {
        // Return the function lock
        return function($lock)
        {
            // If this function was internally unlocked, return the object reference
            if ($lock === $_lock)
                return $object;
        };
    };
    var $_parse     = function($json)
    {
        try
        {
            // Return the parsed JSON string
            return $__parse($json);
        }
        catch (e)
        {
            //
        }

        return null;
    };
    var $_reserved  = function($property)
    {
        // Return true if the property is reserved
        return $property == '__defineGetter__' || $property == '__defineSetter__' || $property == '__lookupGetter__' || $property == '__lookupSetter__' || $property == '__proto__';
    };
    var $_set       = function($function, $filter)
    {
        // If a filter was provided, return the filtered set accessor
        if ($filter)
            return function($v)
            {
                // Call the set accessor in the given context along with the provided argument within the applied constraint filter and return its return value
                return $function.call(this, $filter($v));
            };

        // Return the set accessor
        return function($v)
        {
            // Call the set accessor in the given context along with the provided argument and return its return value
            return $function.call(this, $v);
        };
    };
    var $_store     = function($key, $value)
    {
        // If no key was provided, return
        if (!$key)
            return;

        // Add the storage prefix to the key
        $key = $_const_prefix_storage + $key;

        // If a second argument was not provided, return the item from the local storage
        if (arguments.length < 2)
            return $__storageLocal__.getItem($key);

        try
        {
            // Set the item in the local storage
            $__storageLocal__.setItem($key, $value);

            return true;
        }
        catch (e)
        {
            //
        }

        return false;
    };

    // ---------- DEFINES ----------

    // Create the define helper functions
    var $_defineField    = function($name, $field, $writable)
    {
        // Define an enumerable field on the global namespace object
        $_data($$, $name, $field, $writable, true);
    };
    var $_defineMethod   = function($name, $method)
    {
        // If the global function lock flag is set, prevent extensions on the method
        if ($_funcLock)
            $__preventExtensions($method);

        // If the name contains a space
        if ($name.indexOf(' ') >= 0)
        {
            // Create the method names array
            var $names = $name.split(' ');

            // Define each method in the method names array
            for (var $i = 0, $j = $names.length; $i < $j; $i++)
                $_data($$, $names[$i], $method);
        }
        // Define a non-enumerable method on the global namespace object
        else
            $_data($$, $name, $method); 
    };
    var $_defineProperty = function($name, $getMethod, $setMethod)
    {
        // If the name contains a space
        if ($name.indexOf(' ') >= 0)
        {
            // Create the property names array
            var $names = $name.split(' ');

            // Define each property in the property names array
            for (var $i = 0, $j = $names.length; $i < $j; $i++)
                $_accessor($$, $names[$i], $getMethod, $setMethod, true);
        }
        // Define an enumerable property on the global namespace object
        else
            $_accessor($$, $name, $getMethod, $setMethod, true);
    };

    // ---------- EXCEPTIONS ----------

    // Create the exception helper functions
    var $_exception          = function($message)
    {
        // Format the error message
        $message = typeof $message == 'string' ?
                   $message[0].toUpperCase() + $message.substr(1) :
                   '';

        // Get the handle
        var $handle = $_handle || $_namespace;

        // Create the arguments array
        $_arguments = $handle ?
                      [$handle] :
                      null;

        // Append the space and exception suffix to the error message
        $message += ' ';
        $message += $handle ?
                    $_lang_exception_suffix_handle.replace($_const_format_search, $_format) :
                    $_lang_exception_suffix;

        // Reset the arguments reference
        $_arguments = null;

        // If the debug flag is not set, reset the handle
        if (!$_debug)
            $_handle = '';

        // Throw the exception string
        throw new $__error($message);
    };
    var $_exceptionArguments = function($name, $arguments)
    {
        // Format the throwing function name
        $name = $name ?
                'jTypes.' + $name :
                'jTypes';

        // Create the types array
        var $types = new $__array($arguments.length);

        // Set the argument type strings in the types array
        for (var $i = 0, $j = $types.length; $i < $j; $i++)
            $types[$i] = $$_type($arguments[$i]);

        // Create the arguments array
        $_arguments = [$name, $types.join(', ')];

        // Create the formatted exception string
        var $string = $_lang_exception_arguments.replace($_const_format_search, $_format);

        // Reset the arguments reference
        $_arguments = null;

        // Throw the arguments exception string
        throw new $__error($string + ' ' + $_lang_exception_suffix);
    };
    var $_exceptionFormat    = function($message)
    {
        // Create the arguments array
        $_arguments = new $__array(arguments.length - 1);

        // Copy each argument as a string into the arguments array
        for (var $i = 0, $j = $_arguments.length; $i < $j; $i++)
            $_arguments[$i] = $$_asString(arguments[$i + 1]);

        // Format the exception string
        $message = $message.replace($_const_format_search, $_format);

        // Reset the arguments reference
        $_arguments = null;

        // Throw the exception string
        $_exception($message);
    };

    // ########## SYMBOLS ##########

    // Create the symbol helper functions
    var $_symbolCreate    = $_legacy ?
                            null :
                            $__symbol ?
                            $__symbol :
                            function()
                            {
                                // Return the generated symbol hash with the prepended symbol-prefix
                                return $_const_prefix_symbol + $_generator($_const_hash_symbol);
                            };
    var $_symbolGenerator = function($name)
    {
        // If ECMAScript 6 symbols are supported, return a symbol
        if ($__symbol)
            return $__symbol();

        // If the minify flag is not set and a name was provided, return the symbol-prefixed name
        if (!$_minify && $name)
            return $_const_prefix_symbol + $name;

        // Return the generated symbol hash with the prepended symbol-prefix
        return $_const_prefix_symbol + $_generator(!$_legacy ? $_const_hash_symbol : null);
    };

    // Create the obfuscated symbols
    var $_symbol_build     = $_symbolGenerator('build'),
        $_symbol_failed    = $_symbolGenerator('failed'),
        $_symbol_handle    = $_symbolGenerator('handle'),
        $_symbol_internal  = $_symbolGenerator('internal'),
        $_symbol_lock      = $_symbolGenerator('lock'),
        $_symbol_metaclass = $_symbolGenerator('metaclass'),
        $_symbol_modifiers = $_symbolGenerator('modifiers'),
        $_symbol_name      = $_symbolGenerator('name'),
        $_symbol_namespace = $_symbolGenerator('namespace'),

        // Create the optimized symbols
        $_symbol_class         = $_symbolGenerator(),
        $_symbol_data          = $_symbolGenerator(),
        $_symbol_data_handle   = $_symbolGenerator(),
        $_symbol_data_name     = $_symbolGenerator(),
        $_symbol_data_readonly = $_symbolGenerator(),
        $_symbol_instance      = $_symbolGenerator();

    // ---------- FILTERS ----------

    // Create the filter symbols
    var $_filter_cast     = $_symbolGenerator('cast'),
        $_filter_default  = $_symbolGenerator('default'),
        $_filter_handle   = $_symbolGenerator('handle'),
        $_filter_native   = $_symbolGenerator('native'),
        $_filter_null     = $_symbolGenerator('null'),
        $_filter_suppress = $_symbolGenerator('suppress'),

        // Create the class filter symbols
        $_filter_class     = $_symbolGenerator('class'),
        $_filter_model     = $_symbolGenerator('model'),
        $_filter_primitive = $_symbolGenerator('primitive'),
        $_filter_struct    = $_symbolGenerator('struct');

    // ########## BUILT-INS ##########

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

    // Define the "constructor" reference on the base prototype of all class prototypes
    $_data($_prototype, 'constructor', $_class);

    // Define the "toJSON()" method on the base prototype of all class prototypes
    $_data($_prototype, 'toJSON', $_json);

    // Define the "toString()" methods on the base class of all classes and the base prototype of all class prototypes
    $_data($_class,     'toString', $_class_toString);
    $_data($_prototype, 'toString', $_prototype_toString);

    // Set the base class of all classes prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
    $_class.prototype = $_prototype;

    // Set the base class of all classes prototype
    $_data($_class, 'prototype', $_prototype);

    // Prevent extensions on the base class of all classes
    $__preventExtensions($_class);

    // If the global prototype lock flag was set, freeze the base prototype of all class prototypes
    if ($_protoLock)
        $__freeze($_prototype);

    // ---------- SYMBOLS ----------

    // Create the symbols helper functions
    var $_lockSymbolsClass    = function($class)
    {
        // Define the lock function on the class
        $__defineProperty($class, $_symbol_lock, { 'value': function()
        {
            // Set the internal lock reference to the class
            $_lock_class = $class;
        } });
    };
    var $_lockSymbolsInstance = function($instances, $private, $protected, $public, $base, $construct)
    {
        // Create the descriptor
        var $descriptor = { 'value': function()
        {
            // Set the internal lock reference to the instances array
            $_lock_instances = $instances;
        } };

        // Define the lock function on the private and public instances
        $__defineProperty($private, $_symbol_lock, $descriptor);
        $__defineProperty($public,  $_symbol_lock, $descriptor);

        // If a protected instance was provided, define the lock function on it
        if ($protected)
            $__defineProperty($protected, $_symbol_lock, $descriptor);

        // If a base instance was provided and it is unique, define the lock function on it
        if ($base && $base !== $protected)
            $__defineProperty($base, $_symbol_lock, $descriptor);

        // If a construct instance was provided, define the lock function on it
        if ($construct)
            $__defineProperty($construct, $_symbol_lock, $descriptor);
    };

    // Create the unlock symbols helper functions
    var $_unlockSymbolsClass    = function($class)
    {
        // Get the class lock
        var $lock = $class[$_symbol_lock];

        // If the lock is not a function, return false
        if (typeof $lock != 'function')
            return false;

        // Reset the class lock reference
        $_lock_class = null;

        // Call the lock function
        $lock();

        // If the class lock reference was not set, return false
        if (!$_lock_class)
            return false;

        // Return true if the class matches the class lock reference
        return $class === $_lock_class;
    };
    var $_unlockSymbolsInstance = function($instance)
    {
        // Get the instance lock
        var $lock = $instance[$_symbol_lock];

        // If the lock is not a function, return false
        if (typeof $lock != 'function')
            return false;

        // Reset the instances lock reference
        $_lock_instances = null;

        // Call the lock function
        $lock();

        // If the instances lock reference was not set, return false
        if (!$_lock_instances)
            return false;

        // Return true if the instance matches either the private, protected, public, base, or construct instances
        return $instance === $_lock_instances[$_instance_private] || $instance === $_lock_instances[$_instance_protected] || $instance === $_lock_instances[$_instance_public] || $instance === $_lock_instances[$_instance_base] || $instance === $_lock_instances[$_instance_construct];
    };

    // If symbols are supported
    if ($_symbolCreate)
    {
        // Create unlock symbols helper functions that utilize symbols
        $_unlockSymbolsClass    = function($class)
        {
            // Return true if the class symbol is set on the class
            return $class[$_symbol_class] === $class;
        };
        $_unlockSymbolsInstance = function($instance)
        {
            // Return true if the instance symbol is set on the instance
            return $instance[$_symbol_instance] === $instance;
        };
    }

    // ########## NAMESPACE ##########

    // Create the global namespace
    var $$ = function()
    {
        // If the new operator was used, throw an exception
        if (this instanceof $$)
            $_exception($_lang_class_new);

        // Create the initial arguments
        var $argument     = 0,
            $base         = null,
            $constructor  = arguments[$argument++],
            $dependencies = null,
            $modifiers    = '',
            $prototype    = null;

        // If the constructor is not a simple object
        if ($constructor == null || typeof $constructor != 'object' || $__getPrototypeOf($constructor) !== $__objectProto__)
        {
            // Get the prototype
            $prototype = arguments[$argument++];

            // If the constructor is not a function
            if (typeof $constructor != 'function')
            {
                // If the constructor is not a string
                if (typeof $constructor != 'string')
                {
                    // If the constructor is not an array, throw an exception
                    if (!$__array_isArray($constructor))
                        $_exceptionArguments(null, arguments);

                    // Use the first argument as the dependencies array
                    $dependencies = $constructor;
                }
                // Use the first argument as the modifiers string
                else
                    $modifiers = $constructor;

                // If the prototype is an array
                if ($__array_isArray($prototype))
                {
                    // If a dependencies array was already provided, throw an exception
                    if ($dependencies)
                        $_exceptionArguments(null, arguments);

                    // Use the second argument as the dependencies array
                    $dependencies = $prototype;
                    $constructor  = arguments[$argument++];
                }
                // If the prototype is a class
                else if (typeof $prototype == 'function' && $_unlockSymbolsClass($prototype))
                {
                    // Use the second argument as the base class
                    $base        = $prototype;
                    $constructor = arguments[$argument++];
                }
                // Use the second argument as the constructor
                else
                    $constructor = $prototype;

                // If the constructor is a function and not a class
                if (typeof $constructor == 'function' && !$_unlockSymbolsClass($constructor))
                {
                    // If a base class was not provided and there are no more arguments, return the compiled namespace object
                    if (!$base && $argument == arguments.length)
                        return $_compilerTryNamespace($modifiers, $dependencies, $constructor);

                    // Use the fourth argument as the prototype
                    $prototype = arguments[$argument++];
                }
                else
                {
                    // Use the third argument as the prototype
                    $prototype   = $constructor;
                    $constructor = null;
                }

                // If a dependencies array was provided, throw an exception
                if ($dependencies)
                    $_exceptionArguments(null, arguments);
            }
            // If the constructor is a class
            else if ($_unlockSymbolsClass($constructor))
            {
                // Use the first argument as the base class
                $base = $constructor;

                // If the prototype is a function and not a class
                if (typeof $prototype == 'function' && !$_unlockSymbolsClass($prototype))
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
                return $_compilerTryNamespace($modifiers, $dependencies, $constructor);

            // If the prototype is not a simple object, throw an exception
            if ($prototype == null || typeof $prototype != 'object' || $__getPrototypeOf($prototype) !== $__objectProto__)
                $_exceptionArguments(null, arguments);
        }
        else
        {
            // Use the first argument as the prototype
            $prototype   = $constructor;
            $constructor = null;
        }

        // If the debug flag is set and a failed base class was provided, return a failed class
        if ($_debug && $base && $base[$_symbol_failed] === $base)
            return $_compilerClassFailed();

        // If the argument count does not match the number of arguments
        if (arguments.length != $argument)
        {
            // Set the private prototype and get the protected and public prototypes
            var $prototypePrivate   = $prototype,
                $prototypeProtected = arguments[$argument++],
                $prototypePublic    = arguments[$argument++];

            // If neither the protected nor public prototypes are simple objects, throw an exception
            if ($prototypeProtected == null || typeof $prototypeProtected != 'object' || $__getPrototypeOf($prototypeProtected) !== $__objectProto__ || $prototypePublic == null || typeof $prototypePublic != 'object' || $__getPrototypeOf($prototypePublic) !== $__objectProto__)
                $_exceptionArguments(null, arguments);

            // Get the prototype
            $prototype = arguments[$argument];

            // If the prototype is not a simple object, reset the prototype
            if ($prototype == null || typeof $prototype != 'object' || $__getPrototypeOf($prototype) !== $__objectProto__)
                $prototype = null;
            // Increment the argument count
            else
                $argument++;

            // If the argument count does not match the number of arguments, throw an exception
            if (arguments.length != $argument)
                $_exceptionArguments(null, arguments);

            // Return the compiled class (using separated prototypes)
            return $_compilerTryClass($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic);
        }

        // Return the compiled class
        return $_compilerTryClass($modifiers, $base, $constructor, $prototype);
    };

    // Define the "toString()" method
    $_defineMethod('toString', function()
    {
        // Return the global namespace type string
        return '[object jTypes]';
    });

    // If the AMD module pattern is being used, define the module
    if (typeof define == 'function' && define.amd)
        define(function()
        {
            // Return the global namespace
            return $$;
        });
    // If the CommonJS module pattern is being used, set the module exports as the global namespace
    else if (typeof module != 'undefined' && module != null && module.exports)
        module.exports = $$;
    // Define the global namespace
    else
        (function($global)
        {
            // Get the global shorthand string and writable flag
            var $shorthand = global['jT_Shorthand'],
                $writable  = global['jT_Writable'];

            // If the global shorthand flag is not a string, set a default shorthand string if the flag is not false
            if (typeof $shorthand != 'string')
                $shorthand = typeof $shorthand != 'boolean' || $shorthand ? '$$' : '';

            // If the global writable flag is not a boolean, set a default value of true if intellisense is enabled
            if (typeof $writable != 'boolean')
                $writable = typeof global['intellisense'] != 'undefined';

            // If a global reference was not found or the global namespace has already been defined (and the global writable flag is not set), return
            if (!$global || $__hasOwnProperty__.call($global, 'jTypes') && !$writable)
                return;

            // If the global shorthand string is set, define the shorthand reference
            if ($shorthand)
                $_data($global, $shorthand, $$, $writable);

            // Define the global namespace
            $_data($global, 'jTypes', $$, $writable);
        })
        // If the window reference is not frozen, use the window reference as the global reference
        (!$__isFrozen($_window) ? $_window : global);

    // ########## EXPORTS ##########

    // Define the development and version constants
    $_defineField('dev',     !$_minify, false);
    $_defineField('version', $_version, false);

    // Define the global class and prototype constants
    $_defineField('__class', $_class,     false);
    $_defineField('__proto', $_prototype, false);

    // Define the date constants
    $_defineField('dateMax', $_const_date_max, false);
    $_defineField('dateMin', $_const_date_min, false);

    // Define the numeric constants
    $_defineField('epsilon', $_const_float_epsilon, false);
    $_defineField('intMax',  $_const_int_max,       false);
    $_defineField('intMin',  $_const_int_min,       false);
    $_defineField('max',     $_const_float_max,     false);
    $_defineField('min',     $_const_float_min,     false);

    // ---------- STORAGE ----------

    // If the storage flag is set
    if ($_storage)
    {
        // Set the storage references
        $_data($_storage, 'local',   $__storageLocal__,   false, true);
        $_data($_storage, 'session', $__storageSession__, false, true);

        // Define the storage object
        $_defineField('storage', $_storage, false);
    }

    // ---------- SUPPORT ----------

    // Create the support object
    var $_support = {};

    // Set the support object flags
    $_data($_support, 'proxy',  !!$__proxy,  false, true);
    $_data($_support, 'symbol', !!$__symbol, false, true);

    // Define the support object
    $_defineField('support', $_support, false);

    // ########## TYPES ##########

    // Create the internal types lookup
    var $_types = $__create(null);

    // Create the checking methods
    var $$_isClass     = function($object)
    {
        // Return true if the object is a function and is a class
        return typeof $object == 'function' && !!$_unlockSymbolsClass($object);
    };
    var $$_isFinite    = function($number)
    {
        // If the object is a null reference or undefined, return false
        if ($number == null)
            return false;

        // If the object is not a number primitive
        if (typeof $number != 'number')
        {
            // If the object is not a number, return false
            if ($_types[$__toString__.call($number)] != 'number')
                return false;

            // Get the primitive value of the number
            $number = $__number_valueOf__.call($number);
        }

        // Return true if the number is finite
        return $__isFinite($number);
    };
    var $$_isInstance  = function($object)
    {
        // Return true if the object is neither null nor undefined and is a class instance
        return $object != null && !!$_unlockSymbolsInstance($object);
    };
    var $$_isInteger   = function($number)
    {
        // If the object is a null reference or undefined, return false
        if ($number == null)
            return false;

        // If the object is not a number primitive
        if (typeof $number != 'number')
        {
            // If the object is not a number, return false
            if ($_types[$__toString__.call($number)] != 'number')
                return false;

            // Get the primitive value of the number
            $number = $__number_valueOf__.call($number);
        }

        // Return true if the number is finite, truncated, and within the maximum and minimum representable integers
        return !!$__isFinite($number) && $number <= $_const_int_max && $number >= $_const_int_min && $number == $__floor($number);
    };
    var $$_isPrimitive = function($object)
    {
        // If the object is a null reference or undefined, return true
        if ($object == null)
            return true;

        // Get the internal type of the object
        var $typeof = typeof $object;

        // Return true if the object is a boolean, number, string, or symbol primitive
        return $typeof == 'boolean' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol' && !!$__symbol;
    };

    // If symbols are supported
    if ($_symbolCreate)
    {
        // Create checking methods that include symbol checks
        $$_isClass    = function($object)
        {
            // Return true if the object is a class
            return !!$object && $object[$_symbol_class] === $object;
        };
        $$_isInstance = function($object)
        {
            // Return true if the object is an instance
            return !!$object && $object[$_symbol_instance] === $object;
        };
    }

    // Define the checking methods
    $_defineMethod('isClass',     $$_isClass);
    $_defineMethod('isFinite',    $$_isFinite);
    $_defineMethod('isInstance',  $$_isInstance);
    $_defineMethod('isInteger',   $$_isInteger);
    $_defineMethod('isPrimitive', $$_isPrimitive);

    // Create the type methods
    var $$_box   = function($object)
    {
        // If the object is a null reference or undefined, return an empty object
        if ($object == null)
            return {};

        // Get the internal type of the object
        var $typeof = typeof $object;

        // If the object is a boolean primitive, return the boolean object
        if ($typeof == 'boolean')
            return new $__boolean($object);

        // If the object is a number primitive, return the number object
        if ($typeof == 'number')
            return new $__number($object);

        // If the object is a string primitive, return the string object
        if ($typeof == 'string')
            return new $__string($object);

      //if ($typeof == 'symbol' && $__symbol)
      //    return new $__symbol($object);

        // Return the object
        return $object;
    };
    var $$_type  = function($object)
    {
        // If the object is a null reference or undefined, return either the "null" or "undefined" type string
        if ($object == null)
            return $object === null ? 'null' : 'undefined';

        // Get the internal type of the object
        var $typeof = typeof $object;

        // If the object is a either a boolean, number, or string primitive, return the internal type string
        if ($typeof == 'boolean' || $typeof == 'number' || $typeof == 'string')
            return $typeof;

        // If the object is a function, return either the "class" or "function" type string
        if ($typeof == 'function')
            return $object[$_symbol_lock] && $_unlockSymbolsClass($object) ? 'class' : $typeof;

        // If the object is an instance, return the "instance" type string
        if ($object[$_symbol_lock] && $_unlockSymbolsInstance($object))
            return 'instance';

        // If the object is a window object, return the "window" type string
        if ($object === $_window || $object.window === $object && !$__hasOwnProperty__.call($object, 'window') && $__getPrototypeOf($object) === null)
            return 'window';

        // Return the type string from the internal types lookup
        return $_types[$__toString__.call($object)] || 'object';
    };
    var $$_unbox = function($object)
    {
        // If the object is a primitive, return the object
        if ($$_isPrimitive($object))
            return $object;

        // Get the object type
        var $type = $_types[$__toString__.call($object)] || 'object';

        // If the object is a boolean, return the primitive value of the boolean
        if ($type == 'boolean')
            return $__boolean_valueOf__.call($object);

        // If the object is a number, return the primitive value of the number
        if ($type == 'number')
            return $__number_valueOf__.call($object);

        // If the object is a string, return the primitive value of the string
        if ($type == 'string')
            return $__string_valueOf__.call($object);

      //if ($type == 'symbol' && $__symbol)
      //    return $__symbol_valueOf__.call($object);

        // Return the object
        return $object;
    };

    // If symbols are supported, create a type checking method that includes symbol checks
    if ($_symbolCreate)
        $$_type  = function($object)
        {
            // If the object is a null reference or undefined, return either the "null" or "undefined" type string
            if ($object == null)
                return $object === null ? 'null' : 'undefined';

            // Get the internal type of the object
            var $typeof = typeof $object;

            // If the object is a either a boolean, number, string, or symbol primitive, return the internal type string
            if ($typeof == 'boolean' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol' && $__symbol)
                return $typeof;

            // If the object is a function, return either the "class" or "function" type string
            if ($typeof == 'function')
                return $object[$_symbol_class] === $object ? 'class' : $typeof;

            // If the object is an instance, return the "instance" type string
            if ($object[$_symbol_instance] === $object)
                return 'instance';

            // If the object is a window object, return the "window" type string
            if ($object === $_window || $object.window === $object && !$__hasOwnProperty__.call($object, 'window') && $__getPrototypeOf($object) === null)
                return 'window';

            // Return the type string from the internal types lookup
            return $_types[$__toString__.call($object)] || 'object';
        };

    // Define the type methods
    $_defineMethod('box',   $$_box);
    $_defineMethod('type',  $$_type);
    $_defineMethod('unbox', $$_unbox);

    // Iterate the internal JavaScript types
    $_const_types.forEach(function($type)
    {
        // Create the type keyword
        var $keyword = $type.toLowerCase();

        // Set the keyword in the internal types lookup
        $_types['[object ' + $type + ']'] = $keyword;

        // Define the checking method for the internal JavaScript type
        $_defineMethod('is' + $type, function($object)
        {
            // Return true if the object type string matches the keyword
            return $$_type($object) == $keyword;
        });
    });

    // Iterate the known aliases of the internal JavaScript window type
    $_const_types_window.forEach(function($alias)
    {
        // Set the window alias in the internal types lookup
        $_types['[object ' + $alias + ']'] = 'window';
    });

    // Define the checking aliases
    $_defineMethod('isBool',  $$.isBoolean);
    $_defineMethod('isFloat', $$.isNumber);
    $_defineMethod('isInt',   $$_isInteger);

    // ########## CASTS ##########

    // Create the prototype arrays
    var $_prototypes_object = $__getOwnPropertyNames($__objectProto__),
        $_prototypes_array  = $__getOwnPropertyNames($__arrayProto__).concat($_prototypes_object),
        $_prototypes_date   = $__getOwnPropertyNames($__dateProto__).concat($_prototypes_object),
        $_prototypes_regexp = $__getOwnPropertyNames($__regexpProto__).concat($_prototypes_object);

    // Create the casting methods
    var $$_asArray   = function($object, $unobstructed)
    {
        // If the object is an array
        if ($__array_isArray($object))
        {
            // FORMAT $unobstructed
            $unobstructed = $unobstructed !== undefined ?
                            $$_asBoolean($unobstructed) :
                            false;

            // If the unobstructed flag is not set, return the object
            if (!$unobstructed)
                return $object;

            // If the array has the array prototype
            if ($__arrayProto__ === $__getPrototypeOf($object))
            {
                // Create the obstructed flag
                var $obstructed = false;

                for (var $i = 0, $j = $_prototypes_array.length; $i < $j && !$obstructed; $i++)
                {
                    // Get the current property in the prototype
                    var $property = $_prototypes_array[$i];

                    // If the property is the length property or a reserved property, skip it
                    if ($property == 'length' || $_reserved($property))
                        continue;

                    // Get the function from the prototype
                    var $function = $__arrayProto__[$property];

                    // If the function is not a function, skip it
                    if (typeof $function != 'function')
                        continue;

                    // Set the obstructed flag
                    $obstructed = $function !== $object[$property];
                }

                // If the array is not obstructed, return the object
                if (!$obstructed)
                    return $object;
            }
        }
        // If the object is a primitive value, return an empty array
        else if ($$_isPrimitive($object))
            return [];

        // Get the object collection length
        var $length = $object.length;

        // If the length is not an integer or is less than or equal to zero, return an empty array
        if (!$$_isInteger($length) || $length <= 0)
            return [];

        // Create the array
        var $array = new $__array($length);

        // Copy the value of each indexed property in the object into the array
        for (var $i = 0; $i < $length; $i++)
            $array[$i] = $object[$i];

        // Return the array
        return $array;
    };
    var $$_asBoolean = function($object)
    {
        // Get the internal type of the object
        var $typeof = typeof $object;

        // If the object is a boolean primitive, return the object
        if ($typeof == 'boolean')
            return $object;

        // Get the object type
        var $type = $object == null ?
                    $object + '' :
                    $typeof == 'function' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol' ?
                    $typeof :
                    $_types[$__toString__.call($object)] || 'object';

        // If the object is a boolean, return the primitive value of the boolean
        if ($type == 'boolean')
            return $__boolean_valueOf__.call($object);

        // If the object is a number
        if ($type == 'number')
        {
            // If the number is not a primitive, get the primitive value of the number
            if ($typeof != 'number')
                $object = $__number_valueOf__.call($object);
        }
        // If the object is a string
        else if ($type == 'string')
        {
            // If the string is not a primitive, get the primitive value of the string
            if ($typeof != 'string')
                $object = $__string_valueOf__.call($object);
        }
      //else if ($type == 'symbol' && $__symbol)
      //{
      //    if ($typeof != 'symbol')
      //        $object = $__symbol_valueOf__.call($object);
      //}

        // Return the object as a boolean primitive
        return !!$object;
    };
    var $$_asDate    = function($object, $unobstructed)
    {
        // Get the object type
        var $type = $object == null ?
                    $object + '' :
                    $_types[$__toString__.call($object)] || 'object';

        // If the object is a boolean
        if ($type == 'boolean')
        {
            // If the boolean is not a primitive, get the primitive value of the boolean
            if (typeof $object != 'boolean')
                $object = $__boolean_valueOf__.call($object);

            // Return the date object
            return new $__date($object ? 1 : 0);
        }

        // FORMAT $unobstructed
        $unobstructed = $unobstructed !== undefined ?
                        $$_asBoolean($unobstructed) :
                        false;

        // If the unobstructed flag is set and the object is a date
        if ($unobstructed && $type == 'date')
        {
            // Create the obstructed flag
            var $obstructed = false;

            // If the date has the date prototype
            if ($__dateProto__ === $__getPrototypeOf($object))
            {
                for (var $i = 0, $j = $_prototypes_date.length; $i < $j && !$obstructed; $i++)
                {
                    // Get the current property in the prototype
                    var $property = $_prototypes_date[$i];

                    // If the property is a reserved property, skip it
                    if ($_reserved($property))
                        continue;

                    // Get the function from the prototype
                    var $function = $__dateProto__[$property];

                    // If the function is not a function, skip it
                    if (typeof $function != 'function')
                        continue;

                    // Set the obstructed flag
                    $obstructed = $function !== $object[$property];
                }
            }
            // Set the obstructed flag
            else
                $obstructed = true;

            // If the date object is obstructed
            if ($obstructed)
            {
                // Get the primitive value of the date
                $object = $__date_valueOf__.call($object);
                $type   = 'number';
            }
        }

        // If the object is a number
        if ($type == 'number')
        {
            // If the number is not a primitive, get the primitive value of the number
            if (typeof $object != 'number')
                $object = $__number_valueOf__.call($object);

            // If the number is not an integer, return an invalid date object
            if (!$$_isInteger($object))
                return new $__date($__NaN__);

            // If the number is greater than the maximum representable timestamp, return the maximum representable date object
            if ($object > $_const_date_max)
                return new $__date($_const_date_max);

            // If the number is less than the minimum representable timestamp, return the minimum representable date object
            if ($object < $_const_date_min)
                return new $__date($_const_date_min);

            // Return the date object
            return new $__date($object);
        }

        // If the object is a string
        if ($type == 'string')
        {
            // If the string is not a primitive, get the primitive value of the string
            if (typeof $object != 'string')
                $object = $__string_valueOf__.call($object);

            // Return the date object
            return new $__date($object);
        }

        // If the object is not a date, return an invalid date object
        if ($type != 'date')
            return new $__date($__NaN__);

        // Get the time of the date
        var $time = $__date_valueOf__.call($object);

        // If the time is greater than the maximum representable timestamp, return the maximum representable date object
        if ($time > $_const_date_max)
            return new $__date($_const_date_max);

        // If the time is less than the minimum representable timestamp, return the minimum representable date object
        if ($time < $_const_date_min)
            return new $__date($_const_date_min);

        // Return the object
        return $object;
    };
    var $$_asInteger = function($object, $finite, $hex)
    {
        // FORMAT $finite
        // FORMAT $hex
        // FORMAT $object
        $finite = $finite !== undefined ?
                  $$_asBoolean($finite) :
                  true;
        $hex    = $hex !== undefined ?
                  $$_asBoolean($hex) :
                  true;
        $object = $$_asNumber($object, false, $hex);

        // If the object is not a number, return NaN (unless forced to be finite)
        if ($__isNaN($object))
            return $finite ? 0 : $__NaN__;

        // If the object is greater than the maximum integer, return positive infinity (unless forced to be finite)
        if ($object > $_const_int_max)
            return $finite ? $_const_int_max : $__number_positiveInfinity__;

        // If the object is less than the minimum integer, return negative infinity (unless forced to be finite)
        if ($object < $_const_int_min)
            return $finite ? $_const_int_min : $__number_negativeInfinity__;

        // If the object is less than zero, return the object as an integer (rounded towards zero)
        if ($object < 0)
            return $__ceil($object);

        // Return the object as an integer (rounded towards zero)
        return $__floor($object);
    };
    var $$_asNumber  = function($object, $finite, $hex)
    {
        // FORMAT $finite
        $finite = $finite !== undefined ?
                  $$_asBoolean($finite) :
                  false;

        // Get the internal type of the object
        var $typeof = typeof $object;

        // If the object is not a number primitive
        if ($typeof != 'number')
        {
            // Get the object type
            var $type = $object == null ?
                        $object + '' :
                        $typeof == 'boolean' || $typeof == 'function' || $typeof == 'string' || $typeof == 'symbol' ?
                        $typeof :
                        $_types[$__toString__.call($object)] || 'object';

            // If the object is a string
            if ($type == 'string')
            {
                // If the string is not a primitive, get the primitive value of the string
                if ($typeof != 'string')
                    $object = $__string_valueOf__.call($object);

                // Trim the string
                $object = $object.trim();

                // If the string does not match a floating-point numeric string
                if (!$_const_regexp_number.test($object))
                {
                    // FORMAT $hex
                    $hex = $hex !== undefined ?
                           $$_asBoolean($hex) :
                           false;

                    // If the string does not match a hexadecimal numeric string, return NaN (unless forced to be finite)
                    if (!$hex || !$_const_regexp_number_hex.test($object))
                        return $finite ? 0 : $__NaN__;

                    // Convert the string to a floating-point number
                    $object = $__parseInt($object, 16);
                }
                // Convert the string to a floating-point number
                else
                    $object = $__parseFloat($object);
            }
            // If the object is a boolean
            else if ($type == 'boolean')
            {
                // If the boolean is not a primitive, get the primitive value of the boolean
                if ($typeof != 'boolean')
                    $object = $__boolean_valueOf__.call($object);

                // Convert the boolean to a number
                $object = $object ? 1 : 0;
            }
            // If the object is a number, get the primitive value of the number
            else if ($type == 'number')
                $object = $__number_valueOf__.call($object);
            // Return NaN (unless forced to be finite)
            else
                return $finite ? 0 : $__NaN__;
        }

        // If the finite flag is not set, return the object
        if (!$finite)
            return $object;

        // If the object is not a number, return zero
        if ($__isNaN($object))
            return 0;

        // If the object is greater than the maximum value, return the maximum value
        if ($object > $_const_float_max)
            return $_const_float_max;

        // If the object is less than the minimum value, return the minimum value
        if ($object < $_const_float_min)
            return $_const_float_min;

        // Return the object
        return $object;
    };
    var $$_asObject  = function($object)
    {
        // If the object is a null reference or undefined, return an empty object
        if ($object == null)
            return {};

        // Return the object
        return $object;
    };
    var $$_asRegExp  = function($object, $unobstructed)
    {
        // Get the object type
        var $type = $object == null ?
                    $object + '' :
                    $_types[$__toString__.call($object)] || 'object';

        // If the object is a boolean, return the regexp object
        if ($type == 'boolean')
            return new $__regexp($__boolean_toString__.call($object));

        // If the object is a number, return the regexp object
        if ($type == 'number')
            return new $__regexp($__number_toString__.call($object).replace($_const_escape_search, $_const_escape_replace));

        // If the object is a string
        if ($type == 'string')
        {
            // If the string is not a primitive, get the primitive value of the string
            if (typeof $object != 'string')
                $object = $__string_valueOf__.call($object);

            // Check if the string matches a regular expression
            var $match = $_const_regexp_regexp.exec($object);

            // If the string did not match a regular expression, return the default regexp object
            if (!$match)
                return new $__regexp();

            try
            {
                // Try to return the string converted to a new regexp object
                return new $__regexp($match[1], $match[2]);
            }
            catch (e)
            {
                // If the conversion failed, return the default regexp object
                return new $__regexp();
            }
        }

        // If the object is not a regular expression, return the default regexp object
        if ($type != 'regexp')
            return new $__regexp();

        // FORMAT $unobstructed
        $unobstructed = $unobstructed !== undefined ?
                        $$_asBoolean($unobstructed) :
                        false;

        // If the unobstructed flag is set
        if ($unobstructed)
        {
            // Create the obstructed flag
            var $obstructed = false;

            // If the regexp has the regexp prototype
            if ($__regexpProto__ === $__getPrototypeOf($object))
            {
                for (var $i = 0, $j = $_prototypes_regexp.length; $i < $j && !$obstructed; $i++)
                {
                    // Get the current property in the prototype
                    var $property = $_prototypes_regexp[$i];

                    // If the property is a regexp property or a reserved property, skip it
                    if ($property == 'global' || $property == 'ignoreCase' || $property == 'lastIndex' || $property == 'multiline' || $property == 'source' || $_reserved($property))
                        continue;

                    // Get the function from the prototype
                    var $function = $__regexpProto__[$property];

                    // If the function is not a function, skip it
                    if (typeof $function != 'function')
                        continue;

                    // Set the obstructed flag
                    $obstructed = $function !== $object[$property];
                }
            }
            // Set the obstructed flag
            else
                $obstructed = true;

            // If the regexp object is obstructed, return a new regexp object
            if ($obstructed)
                return new $__regexp($object.source,
                                     ($object.global     ? 'g' : '') +
                                     ($object.ignoreCase ? 'i' : '') +
                                     ($object.multiline  ? 'm' : ''));
        }

        // Return the object
        return $object;
    };
    var $$_asString  = function($object, $lookup)
    {
        // Get the internal type of the object
        var $typeof = typeof $object;

        // If the object is a string primitive, return the object
        if ($typeof == 'string')
            return $object;

        // Get the object type
        var $type = $object == null ?
                    $object + '' :
                    $typeof == 'boolean' || $typeof == 'function' || $typeof == 'number' || $typeof == 'symbol' ?
                    $typeof :
                    $_types[$__toString__.call($object)] || 'object';

        // If the object is a string, return the primitive value of the string
        if ($type == 'string')
            return $__string_valueOf__.call($object);

        // If the object is a boolean, return it as a string primitive
        if ($type == 'boolean')
            return $__boolean_toString__.call($object);

        // If the object is a number, return it as a string primitive
        if ($type == 'number')
            return $__number_toString__.call($object);

      //if ($type == 'symbol' && $__symbol)
      //    return $__symbol_toString__.call($object);

        // FORMAT $lookup
        $lookup = $lookup !== undefined ?
                  $$_asBoolean($lookup) :
                  false;

        // If the lookup flag is set and the object is neither a null reference nor undefined
        if ($lookup && $object != null)
        {
            // If the object is a symbol or does not have a "toString()" function, return an empty string primitive
            if ($type == 'symbol' || typeof $object.toString != 'function')
                return '';

            // Call the "toString()" function
            var $return = $object.toString();

            // If the function returned a string primitive, return the return value of the function
            if (typeof $return == 'string')
                return $return;

            // If the function returned a string, return the primitive value of the string
            if ($return != null && $_types[$__toString__.call($return)] == 'string')
                return $__string_valueOf__.call($return);
        }

        // Return an empty string primitive
        return '';
    };

    // Define the casting methods
    $_defineMethod('asArray',   $$_asArray);
    $_defineMethod('asBoolean', $$_asBoolean);
    $_defineMethod('asDate',    $$_asDate);
    $_defineMethod('asInteger', $$_asInteger);
    $_defineMethod('asNumber',  $$_asNumber);
    $_defineMethod('asObject',  $$_asObject);
    $_defineMethod('asRegExp',  $$_asRegExp);
    $_defineMethod('asString',  $$_asString);

    // Define the casting aliases
    $_defineMethod('asBool',  $$_asBoolean);
    $_defineMethod('asFloat', $$_asNumber);
    $_defineMethod('asInt',   $$_asInteger);

    // ########## FUNCTIONS ##########

    // ---------- COMPILER ----------

    // Create the compiler helpers
    var $_compilerAbstract       = function($name, $accessor)
    {
        // Return the abstract accessor exception handler
        if ($accessor)
            return function()
            {
                // Throw an exception
                $_exceptionFormat($_lang_abstract_accessor, $name);
            };

        // Return the abstract exception handler
        return function()
        {
            // Throw an exception
            $_exceptionFormat($_lang_abstract_call, $name);
        };
    };
    var $_compilerAccessor       = function($array, $definitions, $modifiers, $struct, $name, $key, $value)
    {
        // Get the accessor and the index of the last space in the accessor
        var $accessor = $key.trim(),
            $index    = $accessor.lastIndexOf(' '),
            $modifier = '';

        // If no accessor was provided, throw an exception
        if (!$accessor)
            $_exceptionFormat($_lang_property_name_empty, $name);

        // If a space was found in the accessor
        if ($index >= 0)
        {
            // Break the accessor into the modifier string and accessor
            $modifier = $accessor.substr(0, $index).trim();
            $accessor = $accessor.substr($index + 1);
        }

        // Create the method modifiers along with the private and protected bits
        var $method    = 0,
            $private   = 0,
            $protected = 0;

        // If the accessor is an accessor method
        if ($accessor == $_const_keyword_get)
        {
            // Store the accessor method index, modifiers, and bits
            $index     = 0;
            $method    = $_modifiers_property_get;
            $private   = $_modifiers_property_get_private;
            $protected = $_modifiers_property_get_protected;
        }
        // If the accessor is a mutator method
        else if ($accessor == $_const_keyword_set)
        {
            // Store the mutator method index, modifiers, and bits
            $index     = 1;
            $method    = $_modifiers_property_set;
            $private   = $_modifiers_property_set_private;
            $protected = $_modifiers_property_set_protected;
        }
        // Throw an exception
        else
            $_exceptionFormat($_lang_property_name_invalid, $name, $accessor);

        // If a value array was provided (and is therefore not an auto property)
        if ($array)
        {
            // If the property is abstract
            if ($modifiers & $_modifiers_abstract)
            {
                // If the value is neither a null reference, undefined reference, nor a function, throw an exception
                if ($value != null && typeof $value != 'function')
                    $_exceptionFormat($_lang_property_value_abstract, $name, $accessor);

                // Create the abstract exception handler
                $value = $_compilerAbstract($name, $accessor);
            }
            // If the value is not a function
            else if (typeof $value != 'function')
            {
                // If definitions were provided (and is therefore not an imported definition), throw an exception
                if ($definitions)
                    $_exceptionFormat($_lang_property_value_function, $name, $accessor);

                // Set the value to null
                $value = null;
            }
            // If the global function lock flag is set, prevent extensions on the function
            else if ($_funcLock)
                $__preventExtensions($value);

            // Set the value in the value array
            $array[$index] = $value;
        }

        // If no definitions were provided (and is therefore an imported definition), return
        if (!$definitions)
            return 0;

        // If the method was already defined, throw an exception
        if ($modifiers & $method)
            $_exceptionFormat($_lang_property_name_duplicate, $name, $accessor);

        // If the modifier string is a valid access modifier
        if ($modifier == $_const_keyword_private || $modifier == $_const_keyword_protected || $modifier == $_const_keyword_public)
        {
            // If an access modifier is already defined, throw an exception
            if ($modifiers & ($_modifiers_property_get_private | $_modifiers_property_get_protected | $_modifiers_property_set_private | $_modifiers_property_set_protected))
                $_exceptionFormat($_lang_property_access_duplicate, $name);

            // If the "private" modifier string was provided
            if ($modifier == $_const_keyword_private)
            {
                // If the property is private, throw an exception
                if ($modifiers & $_modifiers_private)
                    $_exceptionFormat($_lang_property_access_restrictive, $name, $accessor);

                // If the property is abstract, throw an exception
                if ($modifiers & $_modifiers_abstract)
                    $_exceptionFormat($_lang_property_private_abstract, $name, $accessor);

                // If the property has the override modifier, throw an exception
                if ($modifiers & $_modifiers_override)
                    $_exceptionFormat($_lang_property_private_override, $name, $accessor);

                // Set the private modifier in the method modifiers
                $method |= $private;
            }
            // If the "protected" modifier string was provided
            else if ($modifier == $_const_keyword_protected)
            {
                // If the property is not public, throw an exception
                if (!($modifiers & $_modifiers_public))
                    $_exceptionFormat($_lang_property_access_restrictive, $name, $accessor);

                // If the class is a struct, throw an exception
                if ($struct)
                    $_exceptionFormat($_lang_property_access_conflict, $name, $accessor, $_const_keyword_protected, $_const_keyword_struct);

                // Set the protected modifier in the method modifiers
                $method |= $protected;
            }
            // Throw an exception
            else
                $_exceptionFormat($_lang_property_access_restrictive, $name, $accessor);
        }
        // If a modifier string was provided, throw an exception
        else if ($modifier)
            $_exceptionFormat($_lang_property_access_invalid, $name, $accessor, $modifier);

        // If the property has the override modifier
        if ($modifiers & $_modifiers_override)
        {
            // Get the base property modifiers and method modifiers
            var $baseModifiers = $definitions[$name][$_definition_modifiers],
                $baseMethod    = $baseModifiers & ($method | $private | $protected);

            // If the method modifiers do not match the base method modifiers, throw an exception
            if ($method != $baseMethod)
                $_exceptionFormat($_lang_property_override_invalid, $name, $accessor);
        }

        // Return the method modifiers
        return $method;
    };
    var $_compilerCache          = function($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $value, $prepend)
    {
        // If the value is undefined, return
        if ($value === undefined)
            return;

        // Get the name and the index of the last space in the name
        var $name      = $key.trim(),
            $index     = $name.lastIndexOf(' '),
            $modifiers = '';

        // If a space was found in the name
        if ($index >= 0)
        {
            // Break the name into the modifiers string and name
            $modifiers = $name.substr(0, $index).trim();
            $name      = $name.substr($index + 1);

            // If a prepend string was provided, prepend it to the modifiers string
            if ($prepend)
                $modifiers = $prepend + ' ' + $modifiers;
        }
        // If a prepend string was provided, set it as the modifiers string
        else if ($prepend)
            $modifiers = $prepend;

        // Check if the value is an auto property and create the type string
        var $auto       = $__array_isArray($value) && $value.length > 1,
            $constraint = '',
            $definition = null,
            $type       = $auto || $value != null && typeof $value == 'object' && $__getPrototypeOf($value) === $__objectProto__ && $__getOwnPropertyNames($value).length > 0 ?
                          $_const_keyword_property :
                          typeof $value != 'function' ?
                          $_const_keyword_field :
                          $_unlockSymbolsClass($value) ?
                          $_const_keyword_class :
                          $_const_keyword_method;

        // If the global function lock flag is set and the value is a function, prevent extensions on the function
        if ($_funcLock && $type == $_const_keyword_method)
            $__preventExtensions($value);

        // If the class is being imported and neither the prototype nor static modifiers were provided
        if ($import && $modifiers.indexOf($_const_keyword_prototype) < 0 && $modifiers.indexOf($_const_keyword_static) < 0)
        {
            // Get the imported definition from local storage
            $definition = $_store($_version + '_' + $_cache + '::' + $_handle + '::' + $name);

            // If an imported definition was found in local storage, parse it
            if ($definition)
                $definition = $_parse($definition);

            // If the imported definition is invalid, reset it
            if (!$__array_isArray($definition) || $definition.length != $_definition__length)
                $definition = null;
        }

        // If the definition is not being imported from local storage
        if (!$definition)
        {
            // Break the modifiers string into a keywords array
            var $keywords = $modifiers.trim().split(' ');

            // If the name is not valid, throw an exception
            if (!$_const_regexp_instance.test($name))
                $_exceptionFormat($_lang_name_invalid, $name);

            // If the name starts with the symbol prefix, throw an exception
            if ($name.substr(0, $_const_prefix_symbol.length) == $_const_prefix_symbol)
                $_exceptionFormat($_lang_name_reserved, $name);

            // Reset the modifiers
            $modifiers = 0;

            for (var $i = 0, $j = $keywords.length; $i < $j; $i++)
            {
                // Get the current keyword
                var $keyword = $keywords[$i];

                // If no keyword was provided, skip it
                if (!$keyword)
                    continue;

                // Get the corresponding modifier for the keyword
                var $modifier = $_modifiers[$keyword];

                // If a modifier was found
                if ($modifier)
                {
                    // If the modifier was already defined in the modifiers, throw an exception
                    if ($modifiers & $modifier)
                        $_exceptionFormat($_lang_keyword_duplicate, $name, $keyword);

                    // Set the modifier in the modifiers
                    $modifiers |= $modifier;
                }
                else
                {
                    // If the keyword is not the last keyword or it is not a valid constraint, throw an exception
                    if ($i != $j - 1 || !$_compilerConstraint($keyword))
                        $_exceptionFormat($_lang_keyword_invalid, $name, $keyword);

                    // Set the keyword as the constraint
                    $constraint = $keyword;
                }
            }

            // Get the access and enum modifiers
            var $access = $modifiers & ($_modifiers_private | $_modifiers_protected | $_modifiers_public),
                $enum   = $modifiers & ($_modifiers_visible | $_modifiers_hidden);

            // Create the definition
            $definition = new $__array($_definition__length);

            // If either the prototype or static modifiers were provided
            if ($modifiers & ($_modifiers_prototype | $_modifiers_static))
            {
                // If no enum modifiers were provided, set the default enum modifier
                if (!$enum)
                    $modifiers |= $enum = $type == $_const_keyword_class || $type == $_const_keyword_method ?
                                          $_modifiers_hidden :
                                          $_modifiers_visible;

                // If the definition is a class, set the nested modifier
                if ($type == $_const_keyword_class)
                    $modifiers |= $_modifiers_nested;
                // If the definition is a method, set the method modifier
                else if ($type == $_const_keyword_method)
                    $modifiers |= $_modifiers_method;

                // If the static modifier was provided
                if ($modifiers & $_modifiers_static)
                {
                    // If the prototype modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_prototype)
                        $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_prototype, $_const_keyword_static);

                    // If the new modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_new)
                        $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_new, $_const_keyword_static);

                    // If the value is a class
                    if ($type == $_const_keyword_class)
                    {
                        // If a constraint was provided, throw an exception
                        if ($constraint)
                            $_exceptionFormat($_lang_constraint_class, $name);

                        // If the name is not a valid class name, throw an exception
                        if (!$_const_regexp_class.test($name))
                            $_exceptionFormat($_lang_class_name_invalid, $name);
                    }
                    // Set the "static" type string
                    else
                        $type = $_const_keyword_static;

                    // Throw if the definition is already defined in the static definitions
                    $_compilerThrowDuplicate($cache[$_cache_static], $name, $type);
                }
                else
                {
                    // Set the "prototype" type string
                    $type = $_const_keyword_prototype;

                    // Throw if the definition is already defined in the prototype definitions or the new modifier is improperly used
                    $_compilerThrowDuplicate($cache[$_cache_prototype], $name, $type);
                    $_compilerThrowInherit  ($cache[$_cache_prototype], $modifiers, $name, $type);
                }

                // If any access modifiers were provided, throw an exception
                if ($access)
                    $_exceptionFormat($_lang_access_invalid, $name, $type);

                // If more than one enum modifier was provided, throw an exception
                if ($enum != $_modifiers_hidden && $enum != $_modifiers_visible)
                    $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_hidden, $_const_keyword_visible);

                // Throw if any virtual modifiers were provided
                $_compilerThrowVirtual($modifiers, $name, $type);

                // If the readonly modifier was provided, throw an exception
                if ($modifiers & $_modifiers_readonly)
                    $_exceptionFormat($_lang_readonly_invalid, $name, $type);

                // If a constraint was provided along with the const modifier, throw an exception
                if ($constraint && $modifiers & $_modifiers_const)
                    $_exceptionFormat($_lang_constraint_const, $name);

                // Set the definition in either the prototype or static definitions
                $_data($cache[$type == $_const_keyword_prototype ? $_cache_prototype : $_cache_static], $name, $definition, false, true);
            }
            else
            {
                // If the name is reserved, throw an exception
                if ($name == 'as' || ($model || $struct) && ($name == 'clone' || $name == 'equals') || $name == 'is' || $name == 'type' || $name == '__base' || $name == '__data' || $name == '__self' || $name == '__this' || $name == '__type')
                    $_exceptionFormat($_lang_name_reserved, $name);

                // Throw if the definition is already defined in the private or protected definitions
                $_compilerThrowDuplicate($cache[$_cache_private],   $name);
                $_compilerThrowDuplicate($cache[$_cache_protected], $name);

                // If no access modifiers were provided, set the private modifier in the modifiers
                if (!$access)
                    $modifiers |= $access = $_modifiers_private;
                // If more than one access modifier was provided, throw an exception
                else if ($access != $_modifiers_private && $access != $_modifiers_protected && $access != $_modifiers_public)
                    $_exceptionFormat($_lang_access_duplicate, $name);

                // If the class is a struct and the protected modifier was provided, throw an exception
                if ($struct && $access == $_modifiers_protected)
                    $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_protected, $_const_keyword_struct);

                // If the const modifier was provided, throw an exception
                if ($modifiers & $_modifiers_const)
                    $_exceptionFormat($_lang_requires_or, $name, $_const_keyword_const, $_const_keyword_prototype, $_const_keyword_static);

                // If the value is a class
                if ($type == $_const_keyword_class)
                {
                    // Reset the type string and value
                    $type  = $_const_keyword_field;
                    $value = null;
                }
                // If the abstract modifier was provided
                else if ($modifiers & $_modifiers_abstract)
                {
                    // If the value is an array
                    if ($__array_isArray($value))
                    {
                        // If the array has a default value, throw an exception
                        if ($value.length > 2)
                            $_exceptionFormat($_lang_abstract_auto, $name);

                        // If the array does not have accessor or mutator strings, throw an exception
                        if (typeof $value[0] != 'string' || $value.length > 1 && typeof $value[1] != 'string')
                            $_exceptionFormat($_lang_auto_invalid_type, $name);

                        // Create the value object
                        var $object = {};

                        // Set the first method in the value object
                        $object[$value[0]] = null;

                        // If a second method was provided, set it in the value object
                        if ($value.length > 1)
                            $object[$value[1]] = null;

                        // Reset the auto flag and set the "property" type string along with the value as the value object
                        $auto  = false;
                        $type  = $_const_keyword_property;
                        $value = $object;
                    }
                    // If the value is null, set the "method" type string
                    else if ($value === null)
                        $type = $_const_keyword_method;
                }

                // If the definition is a field, set the field modifier
                if ($type == $_const_keyword_field)
                    $modifiers |= $_modifiers_field;
                // If the definition is a method, set the method modifier
                else if ($type == $_const_keyword_method)
                    $modifiers |= $_modifiers_method;

                // If no enum modifiers were provided, set the default enum modifier
                if (!$enum)
                    $modifiers |= $enum = $type == $_const_keyword_method ?
                                          $_modifiers_hidden :
                                          $_modifiers_visible;
                // If more than one enum modifier was provided, throw an exception
                else if ($enum != $_modifiers_hidden && $enum != $_modifiers_visible)
                    $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_hidden, $_const_keyword_visible);

                // If the value is either a field or auto property
                if ($auto || $type == $_const_keyword_field)
                {
                    // If the class has the primitive modifier
                    if ($primitive)
                    {
                        // If a constraint was not provided, set the "primitive" constraint
                        if (!$constraint)
                            $constraint = $_const_keyword_primitive;
                        // If the constraint is not a primitive constraint, throw an exception
                        else if (!$_compilerConstraint($constraint, false, true))
                            $_exceptionFormat($_lang_constraint_primitive,
                                              $name,
                                              $model ?
                                              $_const_keyword_model :
                                              $struct ?
                                              $_const_keyword_struct :
                                              $_const_keyword_class);
                    }
                }
                // If a constraint was provided and it has both the cast and default modifiers, throw an exception
                else if ($constraint && $constraint[0] == '~' && $constraint[$constraint.length - 1] == '!')
                    $_exceptionFormat($_lang_conflict_constraint, $name, $constraint);

                // If the value is a method or property
                if ($type == $_const_keyword_method || $type == $_const_keyword_property)
                {
                    // If the private modifier was provided along with either the abstract, override, or virtual modifiers, throw an exception
                    if ($modifiers & $_modifiers_private && $modifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual))
                        $_exceptionFormat($_lang_virtual_invalid, $name, $_const_keyword_private);

                    // If the abstract modifier was provided
                    if ($modifiers & $_modifiers_abstract)
                    {
                        // If the class is a struct, throw an exception
                        if ($struct)
                            $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_abstract, $_const_keyword_struct);

                        // If the sealed modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_sealed)
                            $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_abstract, $_const_keyword_sealed);

                        // If the virtual modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_virtual)
                            $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_abstract, $_const_keyword_virtual);

                        // If the class is not abstract, throw an exception
                        if (!$abstract)
                            $_exceptionFormat($_lang_abstract_class, $name);

                        // If the value is a method, create the abstract exception handler
                        if ($type == $_const_keyword_method)
                            $value = $_compilerAbstract($name);
                    }

                    // If the value is a property
                    if ($type == $_const_keyword_property)
                    {
                        // If the value is an auto property
                        if ($auto)
                        {
                            // If the array does not have both the accessor and mutator strings, throw an exception
                            if ($value.length < 2)
                                $_exceptionFormat($_lang_auto_invalid, $name);

                            // If the array does not have accessor and mutator strings, throw an exception
                            if (typeof $value[0] != 'string' || typeof $value[1] != 'string')
                                $_exceptionFormat($_lang_auto_invalid_type, $name);

                            // If the array has more than a single default property value, throw an exception
                            if ($value.length > 3)
                                $_exceptionFormat($_lang_auto_invalid_default, $name);

                            // Set the auto property modifiers (and compile the accessor and mutator methods)
                            $modifiers |= $_modifiers_property_auto;
                            $modifiers |= $_compilerAccessor(null, $cache[$_cache_protected], $modifiers, $struct, $name, $value[0]);
                            $modifiers |= $_compilerAccessor(null, $cache[$_cache_protected], $modifiers, $struct, $name, $value[1]);

                            // Set the default value
                            $value = $_compilerPrimitive($value[2]);
                        }
                        else
                        {
                            // Create the value array
                            var $array = [null, null];

                            // Populate the value array and set the property modifiers
                            $modifiers |= $_compilerProperty($array, $cache[$_cache_protected], $modifiers, $struct, $name, $value);

                            // Set the value as the value array
                            $value = $array;
                        }
                    }
                    // If the readonly modifier was provided, throw an exception
                    else if ($modifiers & $_modifiers_readonly)
                        $_exceptionFormat($_lang_readonly_invalid_type, $name);

                    // If the override modifier was provided
                    if ($modifiers & $_modifiers_override)
                    {
                        // If the class is a struct, throw an exception
                        if ($struct)
                            $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_override, $_const_keyword_struct);

                        // If the new modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_new)
                            $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_new, $_const_keyword_override);

                        // If the virtual modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_virtual)
                            $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_override, $_const_keyword_virtual);

                        // Get the base definition
                        var $baseDefinition = $cache[$_cache_protected][$name];

                        // If no base definition was found, throw an exception
                        if (!$baseDefinition)
                            $_exceptionFormat($_lang_override_invalid, $name, $type);

                        // Get the base modifiers
                        var $baseModifiers   = $baseDefinition[$_definition_modifiers],
                            $baseAccess      = $baseModifiers & ($_modifiers_public | $_modifiers_protected),
                            $baseEnum        = $baseModifiers & ($_modifiers_hidden | $_modifiers_visible),
                            $baseOverridable = $baseModifiers & $_modifiers_sealed ?
                                               0 :
                                               $baseModifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual);

                        // If the base definition is not overridable or does not match the type or access, enum, or readonly modifiers, throw an exception
                        if (!$baseOverridable || $type != $baseDefinition[$_definition_type] || $access != $baseAccess || $enum != $baseEnum || $modifiers & $_modifiers_readonly ^ $baseModifiers & $_modifiers_readonly)
                            $_exceptionFormat($_lang_override_invalid, $name, $type);

                        // If the base constraint does not match, throw an exception
                        if ($constraint != $baseDefinition[$_definition_constraint])
                            $_exceptionFormat($_lang_override_constraint, $name, $baseDefinition[$_definition_constraint]);

                        // If the value is a property
                        if ($type == $_const_keyword_property)
                        {
                            // Get the inherited property modifiers
                            var $baseProperty = $baseModifiers & ($_modifiers_property_get | $_modifiers_property_get_protected | $_modifiers_property_set | $_modifiers_property_set_protected);

                            // If the base definition is abstract
                            if ($baseModifiers & $_modifiers_abstract)
                            {
                                // Get the property modifiers
                                var $property = $modifiers & ($_modifiers_property_get | $_modifiers_property_get_protected | $_modifiers_property_set | $_modifiers_property_set_protected);

                                // If base definition does not match the property modifiers, throw an exception
                                if ($property != $baseProperty)
                                    $_exceptionFormat($_lang_property_override_accessor, $name);
                            }
                            // Merge the inherited property modifiers into the modifiers
                            else
                                $modifiers |= $baseProperty;
                        }
                    }
                    else
                    {
                        // If the sealed modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_sealed)
                            $_exceptionFormat($_lang_requires, $name, $_const_keyword_sealed, $_const_keyword_override);

                        // Throw if the new modifier was improperly used (or the override modifier was required)
                        $_compilerThrowInherit($cache[$_cache_protected], $modifiers, $name);
                    }

                    // If the virtual modifier was provided
                    if ($modifiers & $_modifiers_virtual)
                    {
                        // If the class is a struct, throw an exception
                        if ($struct)
                            $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_virtual, $_const_keyword_struct);

                        // If the class is sealed, throw an exception
                        if ($sealed)
                            $_exceptionFormat($_lang_virtual_sealed,
                                              $name,
                                              $model ?
                                              $_const_keyword_model :
                                              $_const_keyword_class);
                    }
                }
                else
                {
                    // Throw if any virtual modifiers were provided or the new modifier was improperly used (or the override modifier was required)
                    $_compilerThrowVirtual($modifiers, $name);
                    $_compilerThrowInherit($cache[$_cache_protected], $modifiers, $name);

                    // Set the value as a primitive
                    $value = $_compilerPrimitive($value);
                }

                // If the access modifier is public, set the definition in the public definitions
                if ($access == $_modifiers_public)
                    $_data($cache[$_cache_public], $name, $definition, false, true);

                // Set the definition in either the private or protected definitions
                $_data($cache[$access == $_modifiers_private ? $_cache_private : $_cache_protected], $name, $definition, false, true);
            }

            // Set the definition data
            $definition[$_definition_constraint] = $constraint;
            $definition[$_definition_modifiers]  = $modifiers;
            $definition[$_definition_type]       = $type;

            // If the cache string and handle are set and the definition is neither a prototype nor static definition, cache the definition in local storage
            if ($_cache && $_handle && $type != $_const_keyword_prototype && $type != $_const_keyword_static)
                $_store($_version + '_' + $_cache + '::' + $_handle + '::' + $name, $__stringify($definition));

            // Set the definition name and value
            $definition[$_definition_name]  = $name;
            $definition[$_definition_value] = $value;
        }
        else
        {
            // Get the imported definition data
            $modifiers = $definition[$_definition_modifiers];
            $type      = $definition[$_definition_type];
            $value     = $type == $_const_keyword_field ?
                         $_compilerPrimitive($value) :
                         $type == $_const_keyword_method && $modifiers & $_modifiers_abstract ?
                         $_compilerAbstract($name) :
                         $type != $_const_keyword_property ?
                         $value :
                         $modifiers & $_modifiers_property_auto ?
                         $_compilerPrimitive($value[2]) :
                         $_compilerProperty([null, null], null, $modifiers & $_modifiers_abstract, $struct, $name, $value);

            // If the imported modifiers have the public access modifier, set the imported definition in the public definitions
            if ($modifiers & $_modifiers_public)
                $_data($cache[$_cache_public], $name, $definition, false, true);

            // Set the imported definition in either the private or protected definitions
            $_data($cache[$modifiers & $_modifiers_private ? $_cache_private : $_cache_protected], $name, $definition, false, true);

            // Set the imported definition name and value
            $definition[$_definition_name]  = $name;
            $definition[$_definition_value] = $value;

            // If the constraint is a class, set the imported definition constraint
          //if (typeof $constraint == 'function')
          //    $definition[$_definition_constraint] = $constraint;
        }
    };
    var $_compilerClass          = function($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic)
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
    var $_compilerClassFailed    = function()
    {
        // Create the failed class
        var $class = function()
        {
            // Throw an exception
            $_exception($_lang_class_failed_instance);
        };

        // Set the failed metadata on the class
        $_data($class, $_symbol_failed, $class);

        // Set the symbols on the class
        $_compilerClassSymbols($class);

        // Return the class
        return $class;
    };
    var $_compilerClassSymbols   = function($class)
    {
        // If symbols are supported
        if ($_symbolCreate)
        {
            // If ECMAScript 6 symbols are supported, set the class symbol on the class
            if ($__symbol)
                $class[$_symbol_class] = $class;
            // Set the class type on the class
            else
                $_data($class, $_symbol_class, $class);
        }
        // Lock the class type on the class
        else
            $_lockSymbolsClass($class);

        // Prevent extensions on the class
        $__preventExtensions($class);

        // Return the class
        return $class;
    };
    var $_compilerConstraint     = function($keyword, $native, $primitive)
    {
        // If the native flag is not set and the keyword is a valid constraint handle, return true
        if (!$native && $_const_regexp_constraint_handle.test($keyword))
            return true;

        // Parse the keyword
        var $exec = $_const_regexp_constraint.exec($keyword);

        // If the keyword could not be parsed, return false
        if (!$exec || $exec[1] == '~' && $exec[3] == '?')
            return false;

        // Get the constraint bits and create the flags
        var $constraint = $_constraints[$exec[2]],
            $flags      = 0;

        // If no constraint bits were found, return false
        if ($constraint == null)
            return false;

        // If the primitive flag is set, the constraint does not support the null flag, and it is not the "primitive" constraint string, return false
        if ($primitive && !($constraint & $_constraints_null) && $exec[2] != $_const_keyword_primitive)
            return false;

        // If the cast modifier was provided, set the cast flag in the flags
        if ($exec[1] == '~')
            $flags |= $_constraints_cast;
        // If the suppress modifier was provided, set the suppress flag in the flags
        else if ($exec[1] == '@')
            $flags |= $_constraints_suppress;

        // If the null modifier was provided, set the null flag in the flags
        if ($exec[3] == '?')
            $flags |= $_constraints_null;
        // If the default modifier was provided, set the default flag in the flags
        else if ($exec[3] == '!')
            $flags |= $_constraints_default;

        // Return true if no flags were set that are not found in the constraint bits
        return !($flags & ~$constraint);
    };
    var $_compilerDirective      = function($directives, $overrides, $defaults, $filters, $sources, $primitive, $struct, $i, $j, $definition, $namespace, $aliases, $includes)
    {
        // Get the definition constraint, modifiers, name, and value
        var $constraint = $definition[$_definition_constraint],
            $modifiers  = $definition[$_definition_modifiers],
            $name       = $definition[$_definition_name],
            $value      = $definition[$_definition_value];

        // Create the directive, instructions, and data source
        var $data         = $modifiers & ($_modifiers_field | $_modifiers_property_auto),
            $directive    = new $__array($_directive__length),
            $filter       = $constraint ?
                            $definition[$_definition_filter] :
                            null,
            $inherits     = null,
            $instructions = 0,
            $overridden   = null,
            $source       = $data && $_symbolCreate ?
                            $_symbolCreate() :
                            null;

        // If a constraint was provided and a constraint filter was not cached, create the constraint filter
        if ($constraint && !$filter)
            $filter = $definition[$_definition_filter] = $filters[$constraint] || $_runtimeFilter($constraint, $name, $namespace, $aliases, $includes);

        // If a data source was created and a data sources array was provided, push the data symbol into the data sources array
        if ($source && $sources)
            $sources.push($source);

        // If a constraint was provided and the definition is a field or auto property
        if ($constraint && $data)
        {
            // Check if the constraint is a native primitive constraint
            var $native = $_compilerConstraint($constraint, true, true);

            // Set the value within the applied constraint filter
            $value = $native ?
                     $filter($value) :
                     null;

            // If a data source was created, set the default value in the defaults object
            if ($source)
                $defaults[$source] = $value;

            // If the primitive flag is set and the filter is neither a native primitive nor a primitive struct type, throw an exception
            if ($primitive && !$native && !($filter[$_filter_primitive] && $filter[$_filter_struct]))
                $_exceptionFormat($_lang_filter_primitive,
                                  $name,
                                  $constraint,
                                  $filter[$_filter_model] ?
                                  $_const_keyword_model :
                                  $filter[$_filter_struct] ?
                                  $_const_keyword_struct :
                                  $_const_keyword_class);

            // If a data source was created and the filter has either the default flag or is a struct type without the nullable modifier, set the default value descriptor on the defaults object
            if ($source && ($filter[$_filter_default] || $filter[$_filter_struct] && !$filter[$_filter_null]))
                $_compilerSymbolsDefault($defaults, $source, $filter);
        }
        // If a data source was created, set the default value in the defaults object
        else if ($source)
            $defaults[$source] = $value;

        // If the definition is a property
        if ($modifiers & ($_modifiers_property_get | $_modifiers_property_set))
        {
            // If the hidden modifier was not provided, set the enumerable instruction
            if (!($modifiers & $_modifiers_hidden))
                $instructions |= $_instructions_enumerable;

            // If the definition is an auto property
            if ($modifiers & $_modifiers_property_auto)
            {
                // Set the data instruction along with the get and set accessor instructions
                $instructions |= $_instructions_data | $_instructions_get | $_instructions_set;

                // If the readonly modifier was provided, set the readonly instruction
                if ($modifiers & $_modifiers_readonly)
                    $instructions |= $_instructions_data_readonly;
            }
            else
            {
                // If the property has an accessor method, set the get accessor instruction
                if ($value[0] != null)
                    $instructions |= $_instructions_get;

                // If the property has a mutator method, set the set accessor instruction
                if ($value[1] != null)
                    $instructions |= $_instructions_set;

                // If the property is not abstract, set the context instruction
                if (!($modifiers & $_modifiers_abstract))
                    $instructions |= $_instructions_this;
            }

            // If the definition has the override modifier
            if ($modifiers & $_modifiers_override)
            {
                // Set the override instruction
                $instructions |= $_instructions_override;

                // Check if the definition has accessor or mutator methods and get the override array from the overrides object
                var $get      = !!($modifiers & $_modifiers_property_auto || $value[0] != null),
                    $set      = !!($modifiers & $_modifiers_property_auto || $value[1] != null),
                    $override = $overrides[$name];

                // If an override array was found
                if ($override)
                {
                    // If the definition has an accessor method and it is not found in the override array
                    if ($get && $override[0] == null)
                    {
                        // Set the override index in the override array
                        $override[0] = $i;

                        // Set the override get accessor instruction
                        $instructions |= $_instructions_override_get;
                    }
                    // If the definition has a mutator method and it is not found in the override array
                    else if ($set && $override[1] == null)
                    {
                        // Set the override index in the override array
                        $override[1] = $i;

                        // Set the override set accessor instruction
                        $instructions |= $_instructions_override_set;
                    }
                }
                else
                {
                    // Set the descriptor override instruction
                    $instructions |= $_instructions_override_descriptor;

                    // Create the override array in the overrides object
                    $override = $overrides[$name] = (
                    [
                        $get ? $i : null,
                        $set ? $i : null
                    ]);
                }

                // If the definition is inherited
                if ($i > 0)
                {
                    // If the definition inherits an accessor or mutator method or the override array has inherited indices, push the index into the override array
                    if (!$get && $modifiers & $_modifiers_property_get || !$set && $modifiers & $_modifiers_property_set || $override.length > 2)
                        $override.push($i);
                    // Set the base instruction
                    else
                        $instructions |= $_instructions_base;
                }
            }
            // Get the definition access modifier
            else switch ($modifiers & ($_modifiers_private | $_modifiers_protected | $_modifiers_public))
            {
                // If the definition is public
                case $_modifiers_public:

                    // Set the public instruction
                    $instructions |= $_instructions_public;

                    // If the definition has a protected mutator method, set the protected set accessor instruction
                    if ($modifiers & $_modifiers_property_set_protected)
                        $instructions |= $_instructions_protected_set;
                    // If the definition has a protected accessor method, set the protected get accessor instruction
                    else if ($modifiers & $_modifiers_property_get_protected)
                        $instructions |= $_instructions_protected_get;

                // If the definition is protected
                case $_modifiers_protected:

                    // Set the protected instruction (or the private instruction if the class has the struct modifier)
                    $instructions |= $struct ?
                                     $_instructions_private :
                                     $_instructions_protected;

                    // If the definition is abstract or virtual
                    if ($modifiers & ($_modifiers_abstract | $_modifiers_virtual))
                    {
                        // Check if the definition is overridden
                        $overridden = $overrides[$name];

                        // If the definition is overridden, reset the override array in the overrides object
                        if ($overridden != null)
                            $overrides[$name] = null;
                    }

                    // If the definition has either a private accessor method or private mutator method
                    if ($modifiers & ($_modifiers_property_get_private | $_modifiers_property_set_private))
                    {
                        // If the definition is overridden
                        if ($overridden != null)
                        {
                            // Set the private overridden instruction
                            $instructions |= $_instructions_overridden_private;

                            // If the definition has a private mutator method, set the overridden get accessor instruction
                            if ($modifiers & $_modifiers_property_set_private)
                                $instructions |= $_instructions_overridden_get;
                            // If the definition has a private accessor method, set the overridden set accessor instruction
                            else if ($modifiers & $_modifiers_property_get_private)
                                $instructions |= $_instructions_overridden_set;
                        }

                        // If the definition has a private mutator method, set the private and private set accessor instructions
                        if ($modifiers & $_modifiers_property_set_private)
                            $instructions |= $_instructions_private | $_instructions_private_set;
                        // If the definition has a private accessor method, set the private and private get accessor instructions
                        else if ($modifiers & $_modifiers_property_get_private)
                            $instructions |= $_instructions_private | $_instructions_private_get;
                    }
                    // If the definition is overridden
                    else if ($overridden != null)
                    {
                        // Set the overridden instruction
                        $instructions |= $_instructions_overridden;

                        // If the definition has an accessor method and it is not overridden, set the overridden set accessor instruction
                        if ($modifiers & $_modifiers_property_get && $overridden[0] == null)
                            $instructions |= $_instructions_overridden_set;

                        // If the definition has a mutator method and it is not overridden, set the overridden get accessor instruction
                        if ($modifiers & $_modifiers_property_set && $overridden[1] == null)
                            $instructions |= $_instructions_overridden_get;
                    }

                    // If the definition is overridden and the override array has inherited indices, extract the inherits array from the override array
                    if ($overridden != null && $overridden.length > 2)
                        $inherits = $overridden.slice(2);

                    // If the definition is inherited, set the base instruction
                    if ($i > 0)
                        $instructions |= $_instructions_base;

                    break;

                // If the definition is private
                case $_modifiers_private:

                    // Set the private instruction
                    $instructions |= $_instructions_private;

                    break;
            }
        }
        else
        {
            // If the definition is a field
            if ($modifiers & $_modifiers_field)
            {
                // If the hidden modifier was not provided, set the enumerable instruction
                if (!($modifiers & $_modifiers_hidden))
                    $instructions |= $_instructions_enumerable;

                // Set the data instruction
                $instructions |= $_instructions_data;

                // If the readonly modifier was provided, set the readonly instruction
                if ($modifiers & $_modifiers_readonly)
                    $instructions |= $_instructions_data_readonly;
            }
            // If the definition is a method or nested class
            else if ($modifiers & ($_modifiers_method | $_modifiers_nested))
            {
                // If the visible modifier was provided, set the enumerable instruction
                if ($modifiers & $_modifiers_visible)
                    $instructions |= $_instructions_enumerable;

                // Set the value instruction
                $instructions |= $_instructions_value;

                // If the definition is a method and it is not abstract, set the context instruction
                if ($modifiers & $_modifiers_method && !($modifiers & $_modifiers_abstract))
                    $instructions |= $_instructions_this;
            }

            // If the definition has the override modifier
            if ($modifiers & $_modifiers_override)
            {
                // If the definition is inherited, set the base instruction
                if ($i > 0)
                    $instructions |= $_instructions_base;

                // Set the override instruction
                $instructions |= $_instructions_override;

                // If an override index is not found in the overrides object
                if ($overrides[$name] == null)
                {
                    // Set the descriptor override instruction
                    $instructions |= $_instructions_override_descriptor;

                    // Set the override index in the overrides object
                    $overrides[$name] = $i;
                }
            }
            // Get the definition access modifier
            else switch ($modifiers & ($_modifiers_private | $_modifiers_protected | $_modifiers_public))
            {
                // If the definition is public
                case $_modifiers_public:

                    // Set the public instruction
                    $instructions |= $_instructions_public;

                // If the definition is protected
                case $_modifiers_protected:

                    // Set the protected instruction (or the private instruction if the class has the struct modifier)
                    $instructions |= $struct ?
                                     $_instructions_private :
                                     $_instructions_protected;

                    // If the definition is abstract or virtual
                    if ($modifiers & ($_modifiers_abstract | $_modifiers_virtual))
                    {
                        // Check if the definition is overridden
                        $overridden = $overrides[$name];

                        // If the definition is overridden
                        if ($overridden != null)
                        {
                            // Set the overridden instruction
                            $instructions |= $_instructions_overridden;

                            // Reset the override index in the overrides object
                            $overrides[$name] = null;
                        }
                    }

                    // If the definition is inherited, set the base instruction
                    if ($i > 0)
                        $instructions |= $_instructions_base;

                    break;

                // If the definition is private
                case $_modifiers_private:

                    // Set the private instruction
                    $instructions |= $_instructions_private;

                    break;
            }
        }

        // Set the directive filter, inherits array, instructions, name, and value
        $directive[$_directive_filter]       = $filter;
        $directive[$_directive_inherits]     = $inherits;
        $directive[$_directive_instructions] = $instructions;
        $directive[$_directive_name]         = $name;
        $directive[$_directive_value]        = $source || $value;

        // If a directives array was not provided, return the directive
        if (!$directives)
            return $directive;

        // Set the directive in the directives array
        $directives[$j] = $directive;

        // Return true if the definition is overridden
        return $overridden != null;
    };
    var $_compilerDirectives     = function($metaclass, $metalength, $metainstance, $defaults, $sources, $primitive, $struct)
    {
        // Create the filters cache, merge index, and overrides object
        var $filters   = $__create(null),
            $merge     = 0,
            $overrides = {};

        // Loop through the metadata from derived to base
        for (var $i = 0; $i < $metalength; $i++)
        {
            // Get the private and protected definitions objects from the cache and create the directives array
            var $cache         = $metaclass[$i],
                $class         = $cache[$_cache_class],
                $private       = $cache[$_cache_private],
                $privateKeys   = $__keys($private),
                $protected     = $cache[$_cache_protected],
                $protectedKeys = $__keys($protected),
                $directives    = new $__array($privateKeys.length + $protectedKeys.length),
                $namespace     = $class[$_symbol_namespace],
                $aliases       = $cache[$_cache_aliases],
                $includes      = $cache[$_cache_includes];

            // Reset the exception handle
            $_handle = $class[$_symbol_handle];

            // Compile the private definitions into the directives array (and increment the merge index if the definition was overridden in the overrides object)
            for (var $j = 0, $k = $privateKeys.length; $j < $k; $j++)
                if ($_compilerDirective($directives, $overrides, $defaults, $filters, $sources, $primitive, $struct, $i, $j, $private[$privateKeys[$j]], $namespace, $aliases, $includes) && $merge <= $i)
                    $merge = $i + 1;

            // Compile the protected definitions into the directives array (and increment the merge index if the definition was overridden in the overrides object)
            for (var $j = 0, $k = $protectedKeys.length, $l = $privateKeys.length; $j < $k; $j++)
                if ($_compilerDirective($directives, $overrides, $defaults, $filters, $sources, $primitive, $struct, $i, $j + $l, $protected[$protectedKeys[$j]], $namespace, $aliases, $includes) && $merge <= $i)
                    $merge = $i + 1;

            // Set the directives array in the metadata
            $metainstance[$i] = $directives;

            // Reset the exception handle
            $_handle = '';
        }

        // Return the merge index
        return $merge;
    };
    var $_compilerHandle         = function($handle, $generic)
    {
        // If the handle starts with the namespace alias qualifier
        if ($handle.indexOf('::') >= 0)
        {
            // Create the handles array from the handle
            $handle = $handle.split('::');

            // If the handles array has more than one alias qualifier or the qualifier is invalid, return false
            if ($handle.length != 2 || !$_const_regexp_namespace.test($handle[0]))
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
            if (!$_const_regexp_class.test($name))
                return false;
        }

        // If any of the namespaces are not valid, return false
        for (var $i = 0, $j = $namespaces.length; $i < $j; $i++)
            if (!$_const_regexp_namespace.test($namespaces[$i]))
                return false;

        // Return true
        return true;
    };
    var $_compilerNamespace      = function($modifiers, $dependencies, $constructor)
    {
        // Create the namespace object
        var $namespace = $$;

        // If any modifiers were provided
        if ($modifiers)
        {
            // Trim the modifiers
            $modifiers = $modifiers.trim();

            // If the modifiers start with the namespace keyword, remove it from the modifiers
            if ($modifiers.substr(0, $_const_keyword_namespace.length + 1) == $_const_keyword_namespace + ' ')
                $modifiers = $modifiers.substr($_const_keyword_namespace.length + 1).trim();

            // If the modifiers are not a generic handle, throw an exception
            if (!$_compilerHandle($modifiers, true))
                $_exceptionFormat($_lang_namespace_invalid, $modifiers);

            // If a namespace is already being compiled, throw an exception
            if ($_namespace)
                $_exceptionFormat($_lang_namespace_subnamespace, $modifiers);

            // Create the namespaces array
            var $namespaces = $modifiers.split('.');

            for (var $i = 0, $j = $namespaces.length; $i < $j; $i++)
            {
                // Get the current name
                var $name = $namespaces[$i];

                // If the name is not defined in the namespace
                if (!$__hasOwnProperty__.call($namespace, $name))
                {
                    // Create the namespace object
                    var $object = $__create(null);

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
            $_aliases  = $__create(null);
            $_includes = [];

            for (var $i = 0, $j = $dependencies.length; $i < $j; $i++)
            {
                // Get the current dependency
                var $dependency = $dependencies[$i];

                // If the dependency is not a primitive string, throw an exception
                if (typeof $dependency != 'string')
                    $_exceptionFormat($_lang_namespace_dependency_type);

                // If the dependency starts with the using keyword, remove it from the dependency
                if ($dependency.substr(0, $_const_keyword_using.length + 1) == $_const_keyword_using + ' ')
                    $dependency = $dependency.substr($_const_keyword_using.length + 1).trim();

                // Get the index of the alias operator
                var $index = $dependency.indexOf('=');

                // If the dependency is an alias
                if ($index >= 0)
                {
                    // Get the alias from the dependency string
                    var $alias = $dependency.substr(0, $index).trim();

                    // If the alias is not a valid namespace, throw an exception
                    if (!$_const_regexp_namespace.test($alias) || $_modifiers[$alias] != null || $_modifiers_class[$alias] != null || $_constraints[$alias] != null || $alias == $_const_keyword_global)
                        $_exceptionFormat($_lang_namespace_alias_invalid, $alias);

                    // Remove the alias from the dependency string
                    $dependency = $dependency.substr($index + 1).trim();

                    // If the dependency is not a generic handle, throw an exception
                    if (!$_compilerHandle($dependency, true))
                        $_exceptionFormat($_lang_namespace_include_invalid, $dependency);

                    // If the alias is already defined in the aliases map, throw an exception
                    if ($_aliases[$alias])
                        $_exceptionFormat($_lang_namespace_alias_duplicate, $alias);

                    // Set the alias in the aliases map
                    $_aliases[$alias] = $dependency;
                }
                else
                {
                    // If the dependency is not a generic handle, throw an exception
                    if (!$_compilerHandle($dependency, true))
                        $_exceptionFormat($_lang_namespace_include_invalid, $dependency);

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

        // Call the namespace constructor
        $constructor.call($namespace, $$);

        // Reset the namespace
        $_aliases   = null;
        $_includes  = null;
        $_namespace = null;

        // Return namespace object
        return $namespace;
    };
    var $_compilerPrimitive      = function($value)
    {
        // If the value is a primitive, return the value
        if ($$_isPrimitive($value))
            return $value;

        // Get the value type
        var $type = $_types[$__toString__.call($value)] || 'object';

        // If the value is a boolean, return the primitive value of the boolean
        if ($type == 'boolean')
            return $__boolean_valueOf__.call($value);

        // If the value is a number, return the primitive value of the number
        if ($type == 'number')
            return $__number_valueOf__.call($value);

        // If the value is a string, return the primitive value of the string
        if ($type == 'string')
            return $__string_valueOf__.call($value);

      //if ($type == 'symbol' && $__symbol)
      //    return $__symbol_valueOf__.call($value);

        return null;
    };
    var $_compilerProperty       = function($array, $definitions, $modifiers, $struct, $name, $object)
    {
        // Create the property modifiers
        var $property = 0;

        // Populate the value array from the property object and set the property modifiers
        for (var $key in $object)
            $property |= $_compilerAccessor($array, $definitions, $modifiers | $property, $struct, $name, $key, $object[$key]);

        // If no definitions were provided, return the value array
        if (!$definitions)
            return $array;

        // If no mutator method was provided
        if (!($property & $_modifiers_property_set))
        {
            // If no accessor method was provided, throw an exception
            if (!($property & $_modifiers_property_get))
                $_exceptionFormat($_lang_property_name_empty, $name);

            // If the accessor method has an access modifier (and it is not a protected override), throw an exception
            if ($property & $_modifiers_property_get_private || $property & $_modifiers_property_get_protected && !($modifiers & $_modifiers_override))
                $_exceptionFormat($_lang_property_access_accessor, $name, $_const_keyword_get);
        }
        // If no accessor method was provided and the mutator method has an access modifier (and it is not a protected override), throw an exception
        else if (!($property & $_modifiers_property_get) && ($property & $_modifiers_property_set_private || $property & $_modifiers_property_set_protected && !($modifiers & $_modifiers_override)))
            $_exceptionFormat($_lang_property_access_accessor, $name, $_const_keyword_set);

        // If the readonly modifier was provided without both the accessor and mutator methods, throw an exception
        if ($modifiers & $_modifiers_readonly && ~$property & ($_modifiers_property_get | $_modifiers_property_set))
            $_exceptionFormat($_lang_property_readonly_invalid, $name);

        // Return the property modifiers
        return $property;
    };
    var $_compilerStatic         = function($object, $definition)
    {
        // Get the definition constraint, modifiers, name, and value (and create the descriptor)
        var $constraint = $definition[$_definition_constraint],
            $modifiers  = $definition[$_definition_modifiers],
            $name       = $definition[$_definition_name],
            $value      = $definition[$_definition_value],
            $descriptor = { 'enumerable': $modifiers & ($_modifiers_method | $_modifiers_nested) ?
                                          !!($modifiers & $_modifiers_visible) :
                                          !($modifiers & $_modifiers_hidden) };

        // If the const modifier was provided or the value is a nested class
        if ($modifiers & ($_modifiers_const | $_modifiers_nested))
        {
            // Set the value in the descriptor
            $descriptor['value']    = $value;
            $descriptor['writable'] = false;
        }
        // Create the static data descriptor
        else
            $_runtimeData($name,
                          $value,
                          $constraint ?
                          $_runtimeFilter($constraint) :
                          null,
                          $descriptor,
                          false,
                          null);

        // Set the descriptor on the object
        $__defineProperty($object, $name, $descriptor);
    };
    var $_compilerThrowDuplicate = function($definitions, $name, $type)
    {
        // If the definition is already defined in the definitions, throw an exception
        if ($__hasOwnProperty__.call($definitions, $name))
            $_exceptionFormat($_lang_name_duplicate, $name, $type ? $type + ' ' : '');
    };
    var $_compilerThrowErrors    = function($errors, $persist)
    {
        // If the errors array is empty, throw an error
        if (!$errors.length)
            throw new $__error();

        // If the persist flag is not set, reset the errors array
        if (!$persist)
            $_errors = [];

        // If more than one error is in the errors array, throw the formatted errors
        if ($errors.length > 1)
            throw new $__error($_lang_exception_generic + ' ' + $errors.length + '\n' + $errors.join('\n'));

        // Throw the first error
        throw new $__error($errors[0]);
    };
    var $_compilerThrowInherit   = function($definitions, $modifiers, $name, $type)
    {
        // Get the base definition
        var $baseDefinition = $definitions[$name];

        // If a base definition is defined in the definitions
        if ($baseDefinition)
        {
            // If the base definition is abstract, throw an exception
            if ($baseDefinition[$_definition_modifiers] & $_modifiers_abstract)
                $_exceptionFormat($_lang_override_required, $name, $baseDefinition[$_definition_type]);

            // If the new modifier was not provided, throw an exception
            if (!($modifiers & $_modifiers_new))
                $_exceptionFormat($_lang_new_required, $name, $type ? $type + ' ' : '');
        }
        // If the new modifier was provided, throw an exception
        else if ($modifiers & $_modifiers_new)
            $_exceptionFormat($_lang_new_invalid, $name, $type ? $type + ' ' : '');
    };
    var $_compilerThrowVirtual   = function($modifiers, $name, $type)
    {
        // If the abstract, override, or virtual modifiers were provided
        if ($modifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual))
        {
            // If a type was provided, throw a type-specific exception
            if ($type)
                $_exceptionFormat($_lang_virtual_invalid, $name, $type);

            // Throw an exception
            $_exceptionFormat($_lang_virtual_invalid_type, $name);
        }

        // If the sealed modifier was provided, throw an exception
        if ($modifiers & $_modifiers_sealed)
            $_exceptionFormat($_lang_requires, $name, $_const_keyword_sealed, $_const_keyword_override);
    };
    var $_compilerToString       = function($name)
    {
        // Return the named object "toString()" function
        return function()
        {
            // Return the named object expression string
            return '[object ' + $name + ']';
        };
    };
    var $_compilerTryCache       = function($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $value, $prepend)
    {
        // If the debug flag is not set, redirect the function call (without catching any errors)
        if (!$_debug)
            $_compilerCache($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $value, $prepend);

        try
        {
            // Redirect the function call (and catch any errors)
            $_compilerCache($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $value, $prepend);
        }
        catch (e)
        {
            // Push the error into the errors array
            $_errors.push(e.message);
        }
    };
    var $_compilerTryClass       = function($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic)
    {
        // If the debug flag is not set or the class is not being defined in a namespace, return the redirected function call (without catching any errors)
        if (!$_debug || $_namespace == null)
            return $_compilerClass($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic);

        try
        {
            // Return the redirected function call (and catch any errors)
            return $_compilerClass($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic);
        }
        catch (e)
        {
            // Push the error into the errors array
            $_errors.push(e.message);

            // Reset the exception handle
            $_handle = '';
        }

        // Return a failed class
        return $_compilerClassFailed();
    };
    var $_compilerTryNamespace   = function($modifiers, $dependencies, $constructor)
    {
        // If the debug flag is not set, return the redirected function call (without catching any errors)
        if (!$_debug)
            return $_compilerNamespace($modifiers, $dependencies, $constructor);

        try
        {
            // Get the namespace from the redirected function call (and catch any errors)
            var $namespace = $_compilerNamespace($modifiers, $dependencies, $constructor);

            // Reset the namespace
            $_aliases   = null;
            $_includes  = null;
            $_namespace = null;

            // If there are errors, throw the errors array
            if ($_errors.length)
                $_compilerThrowErrors($_errors);

            // Return the namespace
            return $namespace;
        }
        catch (e)
        {
            // Reset the namespace
            $_aliases   = null;
            $_includes  = null;
            $_namespace = null;

            // If there are errors, throw the errors array
            if ($_errors.length)
                $_compilerThrowErrors($_errors);

            // If there are no errors in the errors array, throw the error
            $_compilerThrowErrors([e.message], true);
        }
    };

    // Create the symbols compiler helpers
    var $_compilerSymbolsClone      = function($symbol, $sources, $primitive)
    {
        // Return the clone function
        return function()
        {
            // Get the hidden instance data from the function context
            var $data = this ? this[$_symbol_data] : null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_conflict_generic, 'clone()');

            // Create the cloned instance and get the cloned hidden instance data
            var $cloneInstance = $_classes[$data[$_symbol_data_handle]]($_clone),
                $cloneData     = $cloneInstance[$_symbol_data];

            for (var $i = 0, $j = $sources.length; $i < $j; $i++)
            {
                // Get the source symbol from the data sources array and value from the hidden instance data
                var $source = $sources[$i],
                    $value  = $data[$source];

                // Set the value in the cloned hidden instance data (and clone any instances if the class is primitive)
                $cloneData[$source] = $primitive && $value && $value[$_symbol_instance] === $value ?
                                      $value.clone() :
                                      $value;
            }

            // Return the cloned instance
            return $cloneData[$symbol];
        };
    };
    var $_compilerSymbolsData       = function($name, $symbol, $filter, $descriptor, $auto, $readonly, $constant)
    {
        // Set the get accessor in the descriptor
        $descriptor['get'] = function()
        {
            // Get the hidden instance data from the function context
            var $data = this ? this[$_symbol_data] : null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_conflict_generic, $name);

            // Return the value from the hidden instance data
            return $data[$symbol];
        };

        // If the constant flag is set, return the descriptor
        if ($constant)
            return $descriptor;

        // If a constraint filter was provided
        if ($filter)
        {
            // If the readonly flag is set, set the readonly set accessor in the descriptor
            if ($readonly)
                $descriptor['set'] = function($v)
                {
                    // Get the hidden instance data from the function context
                    var $data = this ? this[$_symbol_data] : null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_conflict_generic, $name);

                    // If the readonly flag is set in the hidden instance data, throw an exception
                    if ($data[$_symbol_data_readonly])
                        $_exceptionFormat($_lang_readonly_data, $name, $auto ? $_const_keyword_property : $_const_keyword_field);

                    // Set the value to the accessor value with the applied constraint filter
                    $data[$symbol] = $filter($v, $name);
                };
            // Set the set accessor in the descriptor
            else
                $descriptor['set'] = function($v)
                {
                    // Get the hidden instance data from the function context
                    var $data = this ? this[$_symbol_data] : null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_conflict_generic, $name);

                    // Set the value to the accessor value with the applied constraint filter
                    $data[$symbol] = $filter($v, $name);
                };
        }
        // If the readonly flag is set, set the readonly set accessor in the descriptor
        else if ($readonly)
            $descriptor['set'] = function($v)
            {
                // Get the hidden instance data from the function context
                var $data = this ? this[$_symbol_data] : null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_conflict_generic, $name);

                // If the readonly flag is set in the hidden instance data, throw an exception
                if ($data[$_symbol_data_readonly])
                    $_exceptionFormat($_lang_readonly_data, $name, $auto ? $_const_keyword_property : $_const_keyword_field);

                // Set the value to the accessor value
                $data[$symbol] = $v;
            };
        // Set the set accessor in the descriptor
        else
            $descriptor['set'] = function($v)
            {
                // Get the hidden instance data from the function context
                var $data = this ? this[$_symbol_data] : null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_conflict_generic, $name);

                // Set the value to the accessor value
                $data[$symbol] = $v;
            };

        // Return the descriptor
        return $descriptor;
    };
    var $_compilerSymbolsDefault    = function($defaults, $symbol, $filter)
    {
        // Define the default descriptor on the defaults object
        $__defineProperty($defaults, $symbol,
        {
            'configurable': true,
            'enumerable':   true,
            'get':          function()
            {
                // Create the default value within the applied constraint filter
                var $value = $filter();

                // Define the writable value on the hidden instance data
                $__defineProperty(this, $symbol,
                {
                    'configurable': true,
                    'enumerable':   true,
                    'value':        $value,
                    'writable':     true
                });

                // Return the default value
                return $value;
            },
            'set':          function($v)
            {
                // Define the writable value on the hidden instance data
                $__defineProperty(this, $symbol,
                {
                    'configurable': true,
                    'enumerable':   true,
                    'value':        $v,
                    'writable':     true
                });
            }
        });

        // Remove the defaults reference
        $defaults = null;
    };
    var $_compilerSymbolsDirectives = function($metaclass, $metalength, $metainstance, $defaults, $prototype, $sources, $internal, $merge, $optimized, $primitive, $struct, $unlocked)
    {
        // Create the instance matrix, root instance object, handles map, and overrides object
        var $instance  = new $__array($metalength),
            $this      = $__create($prototype),
            $private   = null,
            $protected = !$struct ? $this : null,
            $public    = $this,
            $base      = !$struct ? $this : null,
            $construct = null,
            $ctor      = null,
            $data3     = null,
            $data5     = null,
            $handles   = $__create(null),
            $overrides = !$struct && $merge > 1 ?
                         $__create(null) :
                         null,
            $type      = $_class;

        // Loop through the metadata from base to derived
        for (var $i = $metalength - 1; $i >= 0; $i--)
        {
            // Get the cache, constructor, class, and data symbols
            var $cache       = $metaclass[$i],
                $constructor = $cache[$_cache_constructor],
                $class       = $cache[$_cache_class],
                $data0       = $cache[$_cache_symbols_private],
              //$data1       = $cache[$_cache_symbols_protected],
                $data2       = $cache[$_cache_symbols_public];

            // If the previous index was the internal index, set the type as the class
            if ($i == $internal + 1)
                $type = $class;

            // If a root data symbol has not been retrieved, get the root data symbol
            if (!$data5)
                $data5 = $cache[$_cache_symbols_root];

            // Set the class handle and index in the handles map
            $handles[$class[$_symbol_handle]] = $i;

            // Create the instance objects
            $public    = $__create($public);
            $protected = !$struct ?
                         $__create($protected) :
                         null;
            $private   = $__create($struct ?
                                   $public :
                                   $protected);
            $base      = $i == 0 ?
                         null :
                         $i < $merge ?
                         $__create($base) :
                         $protected;
            $construct = !$struct && $constructor ?
                         $__create($private) :
                         null;

            // Create the internal descriptors
            var $descriptorBase = $data3 ?
                                  $_compilerSymbolsData('__base', $data3, null, {}, false, false, true) :
                                  null,
                $descriptorSelf = $_compilerSymbolsData('__self', $data5, null, {}, false, false, true),
                $descriptorThis = $_compilerSymbolsData('__this', $data2, null, {}, false, false, true),
                $descriptorType = { 'value': $class };

            // If the class is not unlocked or the base instance object is unique
            if (!$unlocked || $base !== $protected)
            {
                // If these are not the root instance objects, set the base descriptor on the private instance object
                if ($data3)
                    $__defineProperty($private, '__base', $descriptorBase);

                // Set the self, public, and type descriptors on the private instance object
                $__defineProperty($private, '__self', $descriptorSelf);
                $__defineProperty($private, '__this', $descriptorThis);
                $__defineProperty($private, '__type', $descriptorType);
            }

            // If these are the root instance objects, set the self descriptor on the public instance object
            if (!$data3)
                $__defineProperty($public, '__self', $descriptorSelf);

            // Set the type descriptor on the public instance object
            $__defineProperty($public,
                              '__type',
                              $i <= $internal ?
                              { 'value': null } :
                              $descriptorType);

            // If the class is unlocked and a base instance object was provided
            if ($unlocked && $base)
            {
                // If these are not the root instance objects, set the base descriptor on the base instance object
                if ($data3)
                    $__defineProperty($base, '__base', $descriptorBase);

                // Set the self, public, and type descriptors on the base instance object
                $__defineProperty($base, '__self', $descriptorSelf);
                $__defineProperty($base, '__this', $descriptorThis);
                $__defineProperty($base, '__type', $descriptorType);
            }

            // If a construct instance object was created
            if ($construct)
            {
                // Set the data descriptor on the construct instance object
                $__defineProperty($construct, '__data', $_compilerSymbolsData('__data', $data0, null, {}, false, false, true));

                // If the base cache has a constructor, set the base constructor on the construct instance object
                if ($ctor)
                    $__defineProperty($construct, '__base', { 'value': $ctor });
            }

            // If the cache is inherited
            if ($i > 0)
            {
                // Get the base data symbol
                $data3 = $cache[$_cache_symbols_base];

                // If the cache has a constructor, create the base constructor
                if ($constructor)
                    $ctor = $_compilerSymbolsThis('~constructor', $cache[$_cache_symbols_construct], null, $constructor);
            }

            // If the class has either the primitive or the struct modifiers
            if ($primitive || $struct)
            {
                // Create the clone method descriptor
                var $clone = { 'value': $_compilerSymbolsClone($data2, $sources, $primitive) };

                // Set the clone method descriptor on the public instance object
                $__defineProperty($public, 'clone', $clone);

                // If the class is not a struct
                if (!$struct)
                {
                    // Set the clone method descriptor on the protected instance object
                    $__defineProperty($protected, 'clone', $clone);

                    // If the base instance object is unique, set the clone method descriptor on the base instance object
                    if ($base && $base !== $protected)
                        $__defineProperty($base, 'clone', $clone);
                }
            }

            // If the class is optimized
            if ($optimized)
            {
                // Define the default instance descriptors on the defaults object
                $_compilerSymbolsOptimized($defaults, $data0, $private);
              //$_compilerSymbolsOptimized($defaults, $data1, $protected);
                $_compilerSymbolsOptimized($defaults, $data2, $public);
                $_compilerSymbolsOptimized($defaults, $data3, $base);
            }

            // Create the instances in the instance matrix
            var $instances = $instance[$i] = $struct ?
                                             [$private, $protected, $public] :
                                             [$private, $protected, $public, $base, $construct];

            // If there are no overrides in the instance matrix
            if (!$overrides)
            {
                // Get the directives from the directives matrix
                var $directives = $metainstance[$i];

                // Execute the directives on the instance objects
                for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                    $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, null, $data0);

                // Freeze the instance objects
                $__freeze($private);
                $__freeze($public);

                // If a protected instance object was created, freeze it
                if ($protected)
                    $__freeze($protected);

                // If a base instance object was created and it is unique, freeze it
                if ($base && $base !== $protected)
                    $__freeze($base);

                // If a construct instance object was created, freeze it
                if ($construct)
                    $__freeze($construct);

                // Set the instances in the metainstance matrix
                $metainstance[$i] = $instances;
            }
        }

        // If there are overrides in the instance matrix
        if ($overrides)
        {
            // Loop through the metadata from derived to base
            for (var $i = 0; $i < $metalength; $i++)
            {
                // Get the private data symbol, directives, and instances array
                var $data0      = $metaclass[$i][$_cache_symbols_private],
                    $directives = $metainstance[$i],
                    $instances  = $instance[$i];

                // Get the instance objects from the instances array
                $private   = $instances[$_instance_private];
                $protected = $instances[$_instance_protected];
                $public    = $instances[$_instance_public];
                $base      = $instances[$_instance_base];
                $construct = $instances[$_instance_construct];

                // Execute the directives on the instance objects
                for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                    $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, null, $data0);
            }

            // Loop through the metadata from base to derived
            for (var $i = $metalength - 1; $i >= 0; $i--)
            {
                // Get the instances array
                var $instances = $instance[$i];

                // Get the instance objects from the instances array
                $private   = $instances[$_instance_private];
                $protected = $instances[$_instance_protected];
                $public    = $instances[$_instance_public];
                $base      = $instances[$_instance_base];
                $construct = $instances[$_instance_construct];

                // Freeze the instance objects
                $__freeze($private);
                $__freeze($public);

                // If a protected instance object was created, freeze it
                if ($protected)
                    $__freeze($protected);

                // If a base instance object was provided and it is unique, freeze it
                if ($base && $base !== $protected)
                    $__freeze($base);

                // If a construct instance object was created, freeze it
                if ($construct)
                    $__freeze($construct);

                // Set the instances in the metainstance matrix
                $metainstance[$i] = $instances;
            }
        }

        // Define the root instance methods on the root instance object
        $_compilerSymbolsRoot($metaclass, $handles, $sources, $this, $primitive, $struct, $type);

        // If the class is optimized, define the default root instance descriptor on the defaults object
        if ($optimized)
            $_compilerSymbolsOptimized($defaults, $data5, $this);

        // Freeze the root instance object
        $__freeze($this);

        // Return the root instance object
        return $this;
    };
    var $_compilerSymbolsOptimized  = function($defaults, $symbol, $metaobject)
    {
        // If no metaobject was provided, return
        if (!$metaobject)
            return;

        // Define the default instance descriptor on the defaults object
        $__defineProperty($defaults, $symbol,
        {
            'configurable': true,
            'enumerable':   true,
            'get':          function()
            {
                // Create the instance object
                var $instance = $__create($metaobject);

                // If ECMAScript 6 symbols are not supported
                if (!$__symbol)
                {
                    // Set the instance data on the instance object (and lock the instance type on it)
                    $_data($instance, $_symbol_data,     this);
                    $_data($instance, $_symbol_instance, $instance);
                }
                else
                {
                    // Set the hidden instance data on the instance object (and lock the instance type on it)
                    $instance[$_symbol_data]     = this;
                    $instance[$_symbol_instance] = $instance;
                }

                // If the global prototype lock flag is set, freeze the instance object
                if ($_protoLock)
                    $__freeze($instance);

                // Define the writable instance object on the hidden instance data
                $__defineProperty(this, $symbol,
                {
                    'configurable': true,
                    'enumerable':   true,
                    'value':        $instance,
                    'writable':     true
                });

                // Return the instance object
                return $instance;
            }
        });

        // Remove the defaults reference
        $defaults = null;
    };
    var $_compilerSymbolsRoot       = function($metaclass, $handles, $sources, $root, $primitive, $struct, $type)
    {
        // Set the as, is, and type method descriptors on the root instance object
        $__defineProperty($root, 'as',   { 'value': function($class)
        {
            // Get the hidden instance data from the function context
            var $data = this ? this[$_symbol_data] : null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_conflict_generic, 'as()');

            // If the class is not a class, return null
            if (!$class || $class[$_symbol_class] !== $class)
                return null;

            // Get the index from the handles map for the handle of the provided class
            var $index = $handles[$class[$_symbol_handle]];

            // If an index was not found in the handles map, return null
            if ($index == null)
                return null;

            // Return the public instance object from the hidden instance data
            return $data[$metaclass[$index][$_cache_symbols_public]];
        } });
        $__defineProperty($root, 'is',   { 'value': function($class)
        {
            // Get the hidden instance data from the function context
            var $data = this ? this[$_symbol_data] : null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_conflict_generic, 'is()');

            // If the class is not a class, return false
            if (!$class || $class[$_symbol_class] !== $class)
                return false;

            // Return true if an index was found in the handles map for the handle of the provided class
            return $handles[$class[$_symbol_handle]] != null;
        } });
        $__defineProperty($root, 'type', { 'value': function()
        {
            // If no hidden instance data was found, throw an exception
            if (!this || !this[$_symbol_data])
                $_exceptionFormat($_lang_conflict_generic, 'type()');

            // Return the instance type
            return $type;
        } });

        // If the class has either the primitive or the struct modifiers
        if ($primitive || $struct)
        {
            // Set the clone and equals method descriptors on the root instance object
            $__defineProperty($root, 'clone',  { 'value': $_compilerSymbolsClone($metaclass[0][$_cache_symbols_root], $sources, $primitive) });
            $__defineProperty($root, 'equals', { 'value': function($instance)
            {
                // Get the hidden instance data from the function context
                var $data = this ? this[$_symbol_data] : null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_conflict_generic, 'equals()');

                // If the argument is not an instance, return false
                if (!$instance || $instance[$_symbol_instance] !== $instance)
                    return false;

                // Get the argument hidden instance data
                var $instanceData = $instance[$_symbol_data];

                // If the class handles of the instances are not equal, return false
                if ($data[$_symbol_data_handle] != $instanceData[$_symbol_data_handle])
                    return false;

                for (var $i = 0, $j = $sources.length; $i < $j; $i++)
                {
                    // Get the source symbol and values
                    var $source        = $sources[$i],
                        $value         = $data[$source],
                        $instanceValue = $instanceData[$source];

                    // If the primitive flag is set and both values are instances (which means they are primitive structs)
                    if ($primitive && $value && $value[$_symbol_instance] === $value && $instanceValue && $instanceValue[$_symbol_instance] === $instanceValue)
                    {
                        // If the primitive structs are not equal, return false
                        if (!$value.equals($instanceValue))
                            return false;
                    }
                    // If the values are not equal, return false
                    else if ($value !== $instanceValue)
                        return false;
                }

                // Return true
                return true;
            } });
        }

        // Remove the root reference
        $root = null;
    };
    var $_compilerSymbolsThis       = function($name, $symbol, $filter, $function, $arguments)
    {
        // If a constraint filter was provided
        if ($filter)
        {
            // If the function is an accessor method, return the constrained context wrapper get accessor
            if ($arguments == 0)
                return function()
                {
                    // Get the hidden instance data from the function context
                    var $data = this ? this[$_symbol_data] : null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_conflict_generic, $name + '()');

                    // Call the function in the context of an instance and return the return value (within the applied constraint filter)
                    return $filter($function.call($data[$symbol]), $name);
                };

            // If the function is a mutator method, return the constrained context wrapper set accessor
            if ($arguments == 1)
                return function($v)
                {
                    // Get the hidden instance data from the function context
                    var $data = this ? this[$_symbol_data] : null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_conflict_generic, $name + '()');

                    // Call the function in the context of an instance with the accessor value (within the applied constraint filter) and return the return value
                    return $function.call($data[$symbol], $filter($v, $name));
                };

            // Return the constrained context wrapper function
            return function()
            {
                // Get the hidden instance data from the function context
                var $data = this ? this[$_symbol_data] : null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_conflict_generic, $name + '()');

                // Apply the function in the context of an instance with the provided arguments and return the return value (within the applied constraint filter)
                return $filter($function.apply($data[$symbol], arguments), $name);
            };
        }

        // If the function is an accessor method, return the context wrapper get accessor
        if ($arguments == 0)
            return function()
            {
                // Get the hidden instance data from the function context
                var $data = this ? this[$_symbol_data] : null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_conflict_generic, $name + '()');

                // Call the function in the context of an instance and return the return value
                return $function.call($data[$symbol]);
            };

        // If the function is a mutator method, return the context wrapper set accessor
        if ($arguments == 1)
            return function($v)
            {
                // Get the hidden instance data from the function context
                var $data = this ? this[$_symbol_data] : null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_conflict_generic, $name + '()');

                // Call the function in the context of an instance with the accessor value and return the return value
                return $function.call($data[$symbol], $v);
            };

        // Return the context wrapper function
        return function()
        {
            // Get the hidden instance data from the function context
            var $data = this ? this[$_symbol_data] : null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_conflict_generic, $name + '()');

            // Apply the function in the context of an instance with the provided arguments and return the return value
            return $function.apply($data[$symbol], arguments);
        };
    };

    // ---------- RUNTIME ----------

    // Create the runtime helpers
    var $_runtimeCast             = function($handles, $instance)
    {
        // Return the casting function
        return function($class)
        {
            // If the class is not a class, return null
            if (!$class || !$class[$_symbol_lock] || !$_unlockSymbolsClass($class))
                return null;

            // Get the index from the handles map for the handle of the provided class
            var $index = $handles[$class[$_symbol_handle]];

            // If an index was not found in the handles map, return null
            if ($index == null)
                return null;

            // Return the public instance object from the instance matrix
            return $instance[$index][$_instance_public];
        };
    };
    var $_runtimeData             = function($name, $value, $filter, $descriptor, $auto, $readonly)
    {
        // If a constraint filter was provided and it has the default modifier or is a struct without the null modifier, set the default get accessor in the descriptor
        if ($filter && ($filter[$_filter_default] || $filter[$_filter_struct] && !$filter[$_filter_null]))
            $descriptor['get'] = function()
            {
                // If the value is null, create the default value within the applied constraint filter
                if ($value === null)
                    $value = $filter();

                // Return the value
                return $value;
            };
        // Set the get accessor in the descriptor
        else
            $descriptor['get'] = function()
            {
                // Return the value
                return $value;
            };

        // If a constraint filter was provided
        if ($filter)
        {
            // If a readonly accessor was provided, set the readonly set accessor in the descriptor
            if ($readonly)
                $descriptor['set'] = function($v)
                {
                    // If the readonly accessor is set, throw an exception
                    if ($readonly())
                        $_exceptionFormat($_lang_readonly_data,
                                          $name,
                                          $auto ?
                                          $_const_keyword_property :
                                          $_const_keyword_field);

                    // Set the value with the applied constraint filter
                    $value = $filter($v, $name);
                };
            // Set the set accessor in the descriptor
            else
                $descriptor['set'] = function($v)
                {
                    // Set the value with the applied constraint filter
                    $value = $filter($v, $name);
                };
        }
        // If a readonly accessor was provided, set the readonly set accessor in the descriptor
        else if ($readonly)
            $descriptor['set'] = function($v)
            {
                // If the readonly accessor is set, throw an exception
                if ($readonly())
                    $_exceptionFormat($_lang_readonly_data,
                                      $name,
                                      $auto ?
                                      $_const_keyword_property :
                                      $_const_keyword_field);

                // Set the value
                $value = $v;
            };
        // Set the set accessor in the descriptor
        else
            $descriptor['set'] = function($v)
            {
                // Set the value
                $value = $v;
            };

        // Return the descriptor
        return $descriptor;
    };
    var $_runtimeDirective        = function($private, $protected, $public, $base, $directive, $instance, $overrides, $readonly, $data0)
    {
        // Get the directive constraint filter, instructions, name, and value
        var $filter       = $directive[$_directive_filter],
            $instructions = $directive[$_directive_instructions],
            $name         = $directive[$_directive_name],
            $value        = $directive[$_directive_value];

        // Create the descriptor
        var $descriptor = (
        {
            'configurable': !!($instructions & $_instructions_configurable),
            'enumerable':   !!($instructions & $_instructions_enumerable)
        });

        // If there are get or set accessor instructions
        if ($instructions & ($_instructions_get | $_instructions_set))
        {
            // If there is a data instruction
            if ($instructions & $_instructions_data)
            {
                // If there is not a readonly instruction, clear the readonly accessor
                if (!($instructions & $_instructions_data_readonly))
                    $readonly = $data0 ? false : null;
                // If a private data symbol was provided, set the readonly flag
                else if ($data0)
                    $readonly = true;

                // Set the data get and set accessors in the descriptor
                $descriptor = $data0 ?
                              $_compilerSymbolsData($name, $value, $filter, $descriptor, true, $readonly, false) :
                              $_runtimeData        ($name, $value, $filter, $descriptor, true, $readonly);
            }
            else
            {
                // If there is a get accessor instruction, set the get accessor in the descriptor
                if ($instructions & $_instructions_get)
                    $descriptor['get'] = !($instructions & $_instructions_this) ?
                                         $value[0] :
                                         $data0 ?
                                         $_compilerSymbolsThis($name, $data0,   $filter, $value[0], 0) :
                                         $_runtimeThis        ($name, $private, $filter, $value[0], 0);

                // If there is a set accessor instruction, set the set accessor in the descriptor
                if ($instructions & $_instructions_set)
                    $descriptor['set'] = !($instructions & $_instructions_this) ?
                                         $value[1] :
                                         $data0 ?
                                         $_compilerSymbolsThis($name, $data0,   $filter, $value[1], 1) :
                                         $_runtimeThis        ($name, $private, $filter, $value[1], 1);
            }

            // If there is an override instruction
            if ($instructions & $_instructions_override)
            {
                // If there is a base instruction, set the descriptor on the base instance object
                if ($instructions & $_instructions_base)
                    $__defineProperty($base, $name, $descriptor);
                // If there is a base instance object, set the descriptor cache in it
                else if ($base)
                    $base[$name] = $descriptor;

                // If there is a descriptor override instruction, set the descriptor in the overrides object
                if ($instructions & $_instructions_override_descriptor)
                    $overrides[$name] = $descriptor;
                // If there is a get accessor override instruction, set the get accessor from the descriptor in the overrides object
                else if ($instructions & $_instructions_override_get)
                    $overrides[$name]['get'] = $descriptor['get'];
                // If there is a set accessor override instruction, set the set accessor from the descriptor in the overrides object
                else if ($instructions & $_instructions_override_set)
                    $overrides[$name]['set'] = $descriptor['set'];
            }
            else
            {
                // If there is a private overridden instruction
                if ($instructions & $_instructions_overridden_private)
                {
                    // Create the base descriptor and accessor
                    var $descriptorBase = $__create($descriptor),
                        $accessor       = $instructions & $_instructions_overridden_get ?
                                          'get' :
                                          $instructions & $_instructions_overridden_set ?
                                          'set' :
                                          '';

                    // If there is a private set accessor instruction, undefine the set accessor in the base descriptor
                    if ($instructions & $_instructions_private_set)
                        $descriptorBase['set'] = undefined;
                    // If there is a private get accessor instruction, undefine the get accessor in the base descriptor
                    else if ($instructions & $_instructions_private_get)
                        $descriptorBase['get'] = undefined;

                    // Set the base descriptor on the base instance object
                    $__defineProperty($base, $name, $descriptorBase);

                    // If an accessor was created
                    if ($accessor)
                    {
                        // Get the accessor for the descriptor from the overrides object
                        $descriptor[$accessor] = $overrides[$name][$accessor];

                        // Set the descriptor on the private instance object
                        $__defineProperty($private, $name, $descriptor);

                        // Undefine the accessor in the descriptor
                        $descriptor[$accessor] = undefined;
                    }
                }
                else
                {
                    // If there is a private instruction
                    if ($instructions & $_instructions_private)
                    {
                        // Set the descriptor on the private instance object
                        $__defineProperty($private, $name, $descriptor);

                        // If there is a private set accessor instruction, undefine the set accessor in the descriptor
                        if ($instructions & $_instructions_private_set)
                            $descriptor['set'] = undefined;
                        // If there is a private get accessor instruction, undefine the get accessor in the descriptor
                        else if ($instructions & $_instructions_private_get)
                            $descriptor['get'] = undefined;
                    }

                    // If there is a base instruction (and the base instance object is unique), set the descriptor on the base instance object
                    if ($instructions & $_instructions_base && $base !== $protected)
                        $__defineProperty($base, $name, $descriptor);

                    // If there is an overridden instruction
                    if ($instructions & $_instructions_overridden)
                    {
                        // Get the directive inherits array
                        var $inherits = $directive[$_directive_inherits];

                        // If a directive inherits array was found
                        if ($inherits)
                        {
                            // Create the inherited descriptor reference
                            var $descriptorInherits = $descriptor;

                            // Loop through each cached base descriptor from base to derived
                            for (var $j = $inherits.length - 1; $j >= 0; $j--)
                            {
                                // Get the derived base instance object and the cached base descriptor
                                var $baseDerived     = $instance[$inherits[$j]][$_instance_base],
                                    $descriptorCache = $baseDerived[$name];

                                // If the cached base descriptor does not have a set accessor, set the set accessor from the inherited descriptor in the cached base descriptor
                                if (!$descriptorCache['set'])
                                    $descriptorCache['set'] = $descriptorInherits['set'];
                                // If the cached base descriptor does not have a get accessor, set the get accessor from the inherited descriptor in the cached base descriptor
                                else if (!$descriptorCache['get'])
                                    $descriptorCache['get'] = $descriptorInherits['get'];

                                // Set the cached base descriptor on the derived base instance object
                                $__defineProperty($baseDerived, $name, $descriptorCache);

                                // Set the inherited descriptor as the cached base descriptor
                                $descriptorInherits = $descriptorCache;
                            }
                        }

                        // If there is an overridden get accessor instruction, get the get accessor for the descriptor from the overrides object
                        if ($instructions & $_instructions_overridden_get)
                            $descriptor['get'] = $overrides[$name]['get'];
                        // If there is an overridden set accessor instruction, get the set accessor for the descriptor from the overrides object
                        else if ($instructions & $_instructions_overridden_set)
                            $descriptor['set'] = $overrides[$name]['set'];
                        // Get the descriptor from the overrides object
                        else
                            $descriptor = $overrides[$name];
                    }
                }

                // If there is a protected instruction
                if ($instructions & $_instructions_protected)
                {
                    // Set the descriptor on the protected instance object
                    $__defineProperty($protected, $name, $descriptor);

                    // If there is a protected set accessor instruction, undefine the set accessor in the descriptor
                    if ($instructions & $_instructions_protected_set)
                        $descriptor['set'] = undefined;
                    // If there is a protected get accessor instruction, undefine the get accessor in the descriptor
                    else if ($instructions & $_instructions_protected_get)
                        $descriptor['get'] = undefined;
                }

                // If there is a public instruction, set the descriptor on the public instance object
                if ($instructions & $_instructions_public)
                    $__defineProperty($public, $name, $descriptor);
            }
        }
        else
        {
            // If there is a value instruction
            if ($instructions & $_instructions_value)
            {
                // Set the writable flag and value in the descriptor
                $descriptor['writable'] = !!($instructions & $_instructions_writable);
                $descriptor['value']    = !($instructions & $_instructions_this) ?
                                          $value :
                                          $data0 ?
                                          $_compilerSymbolsThis($name, $data0,   $filter, $value) :
                                          $_runtimeThis        ($name, $private, $filter, $value);
            }
            // If there is a data instruction
            else if ($instructions & $_instructions_data)
            {
                // If there is not a readonly instruction, clear the readonly accessor
                if (!($instructions & $_instructions_data_readonly))
                    $readonly = $data0 ? false : null;
                // If a private data symbol was provided, set the readonly flag
                else if ($data0)
                    $readonly = true;

                // Set the data get and set accessors in the descriptor
                $descriptor = $data0 ?
                              $_compilerSymbolsData($name, $value, $filter, $descriptor, false, $readonly, false) :
                              $_runtimeData        ($name, $value, $filter, $descriptor, false, $readonly);
            }

            // If there is a base instruction (and the base instance object is unique), set the descriptor on the base instance object
            if ($instructions & $_instructions_base && $base !== $protected)
                $__defineProperty($base, $name, $descriptor);

            // If there is an override instruction
            if ($instructions & $_instructions_override)
            {
                // If there is a descriptor override instruction, set the descriptor in the overrides object
                if ($instructions & $_instructions_override_descriptor)
                    $overrides[$name] = $descriptor;
            }
            else
            {
                // If there is a private instruction, set the descriptor on the private instance object
                if ($instructions & $_instructions_private)
                    $__defineProperty($private, $name, $descriptor);

                // If there is an overridden instruction, get the descriptor from the overrides object
                if ($instructions & $_instructions_overridden)
                    $descriptor = $overrides[$name];

                // If there is a protected instruction, set the descriptor on the protected instance object
                if ($instructions & $_instructions_protected)
                    $__defineProperty($protected, $name, $descriptor);

                // If there is a public instruction, set the descriptor on the public instance object
                if ($instructions & $_instructions_public)
                    $__defineProperty($public, $name, $descriptor);
            }
        }
    };
    var $_runtimeFilter           = function($constraint, $name, $namespace, $aliases, $includes)
    {
        // Create the cast, default, native, nullable, and suppress flags
        var $cast     = $constraint[0] == '~',
            $default  = $constraint[$constraint.length - 1] == '!',
            $filter   = null,
            $handle   = $constraint,
            $native   = true,
            $null     = $constraint[$constraint.length - 1] == '?',
            $suppress = $constraint[0] == '@';

        // If the cast or suppress flags are set, trim the first character from the handle
        if ($cast || $suppress)
            $handle = $handle.substr(1);

        // If the default or nullable flags are set, trim the last character from the handle
        if ($default || $null)
            $handle = $handle.substr(0, $handle.length - 1);

        // If the handle is a class handle
        if ($_compilerHandle($handle))
        {
            // Unset the native flag
            $native = false;

            // Resolve the class
            var $class = $_runtimeHandle($handle, false, $namespace, $aliases, $includes);

            // If the class was not resolved, throw an exception
            if (!$class)
                $_exceptionFormat($name ?
                                  $_lang_filter_invalid :
                                  $_lang_filter_invalid_generic,
                                  $name,
                                  $constraint);

            // Get the class modifiers, check if the class is a model or a struct, and create the construct flag
            var $modifiers = $class[$_symbol_modifiers],
                $model     = !!($modifiers & $_modifiers_class_model),
                $struct    = !!($modifiers & $_modifiers_class_struct),
                $data2     = $_symbolCreate ?
                             $class[$_symbol_metaclass][0][$_cache_symbols_public] :
                             null;

            // If the default flag is set and the class is not a model or the null flag is set and the class is not a struct, throw an exception
            if ($default && !$model || $null && !$struct)
                $_exceptionFormat($name ?
                                  $_lang_filter_invalid :
                                  $_lang_filter_invalid_generic,
                                  $name,
                                  $constraint);

            // Get the global class handle
            $constraint = $handle = $class[$_symbol_handle];

            // If the suppress flag is set, prepend the suppress modifier to the constraint string
            if ($suppress)
                $constraint = '@' + $constraint;

            // If the default flag is set, append the not-nullable modifier to the constraint string
            if ($default)
                $constraint += '!';
            // If the null flag is set, append the nullable modifier to the constraint string
            else if ($null)
                $constraint += '?';

            // Get the cached filter
            $filter = $_filters[$constraint];

            // If a cached filter was found, return it
            if ($filter)
                return $filter;

            // Create the class constraint filter
            $filter = $_runtimeFilterClass($handle,
                                           $default || $struct && !$null ?
                                           $class :
                                           null,
                                           $suppress,
                                           $_symbolCreate ?
                                           $data2 :
                                           $class);

            // Set the class constraint filter data
            $filter[$_filter_class]     = $class;
            $filter[$_filter_model]     = $model;
            $filter[$_filter_primitive] = !!($modifiers & $_modifiers_class_primitive);
            $filter[$_filter_struct]    = $struct;
        }
        else
        {
            // Get the cached filter
            $filter = $_filters[$constraint];

            // If a cached filter was found, return it
            if ($filter)
                return $filter;
        }

        // If no constraint filter was created
        if (!$filter)
        {
            // ---------- PRIMITIVES ----------
            if ($handle == 'boolean' || $handle == 'bool')
                $filter = $_runtimeFilterPrimitive($handle, false,    $suppress, 'boolean', $cast ? $$_asBoolean : null, $null, $__boolean_valueOf__);
            else if ($handle == 'number' || $handle == 'float')
                $filter = $_runtimeFilterPrimitive($handle, $__NaN__, $suppress, 'number',  $cast ? $$_asNumber  : null, $null, $__number_valueOf__);
            else if ($handle == 'string')
                $filter = $_runtimeFilterPrimitive($handle, '',       $suppress, 'string',  $cast ? $$_asString  : null, $null, $__string_valueOf__);
            else if ($handle == 'symbol')
                $filter = $__symbol ?
                          $_runtimeFilterPrimitive($handle, null, $suppress, 'symbol', null, $null) :
                          new $__function();
            // ---------- BUILT-INS ----------
            else if ($handle == 'array')
                $filter = $_runtimeFilterBuiltIn($handle, $default ? $__array    : null, $suppress, 'array',  $cast ? $$_asArray : null);
            else if ($handle == 'date')
                $filter = $_runtimeFilterBuiltIn($handle, $default ? $_date      : null, $suppress, 'date',   $cast ? $$_asDate : null);
            else if ($handle == 'error')
                $filter = $_runtimeFilterBuiltIn($handle, $default ? $__error    : null, $suppress, 'error');
            else if ($handle == 'function')
                $filter = $_runtimeFilterBuiltIn($handle, $default ? $__function : null, $suppress, 'function');
            else if ($handle == 'object')
                $filter = $_runtimeFilterBuiltIn($handle, $default ? $__object   : null, $suppress, 'object');
            else if ($handle == 'regexp')
                $filter = $_runtimeFilterBuiltIn($handle, $default ? $__regexp   : null, $suppress, 'regexp', $cast ? $$_asRegExp : null);
            else if ($handle == 'type')
                $filter = $_runtimeFilterBuiltIn($handle, null, $suppress, 'class');
            else if ($handle == 'window')
                $filter = $_runtimeFilterBuiltIn($handle, null, $suppress, 'window');
            // ---------- INSTANCE OF ----------
            else if ($handle == 'element' && $_element)
                $filter = $_runtimeFilterInstanceOf($handle, null, $suppress, $_element);
            else if ($handle == 'jquery' && $_jquery)
                $filter = $_runtimeFilterInstanceOf($handle, $_jquery, $suppress, $_jquery);
            // ---------- CUSTOM ----------
            else
                $filter = $_runtimeFilterCustom($handle, $default, $suppress, $cast, $null);

            // If no constraint filter was created, throw an exception
            if (!$filter)
                $_exceptionFormat($name ?
                                  $_lang_filter_invalid :
                                  $_lang_filter_invalid_generic,
                                  $name,
                                  $constraint);
        }

        // Set the constraint filter data
        $filter[$_filter_cast]     = $cast;
        $filter[$_filter_default]  = $default;
        $filter[$_filter_handle]   = $handle;
        $filter[$_filter_native]   = $native;
        $filter[$_filter_null]     = $null;
        $filter[$_filter_suppress] = $suppress;

        // Store the filter in the cached filters
        $_filters[$constraint] = $filter;

        // Return the constraint filter
        return $filter;
    };
    var $_runtimeFilterBuiltIn    = function($handle, $default, $suppress, $type, $cast)
    {
        // Return the constraint filter
        return function($value, $name)
        {
            // If the value is either null or the filter type, return it
            if (!$default && !$cast && $value === null || $$_type($value) == $type)
                return $value;

            // If the cast flag is set, return the casted value
            if ($cast)
                return $cast($value);

            // If a name was provided, strict mode is enabled, and the suppress flag is not set when there is an invalid value, throw an exception
            if ($name && $_strict && !$suppress && $value !== null)
                $_exceptionFormat($_lang_filter_value, $name, $handle);

            // If the default flag is set, return a default instance
            if ($default)
                return $default();

            return null;
        };
    };
    var $_runtimeFilterClass      = function($handle, $default, $suppress, $class)
    {
        // Return the class constraint filter
        return function($value, $name)
        {
            // If the value is an instance of the class
            if ($$_type($value) == 'instance' && $value instanceof $class)
            {
                // Cast the value as an instance of the class
                $value = $value.as($class) || undefined;

                // If the cast was successful, return the value
                if ($value)
                    return $value;
            }

            // If the value is not null, a name was provided, strict mode is enabled, and the suppress flag is not set, throw an exception
            if ($value !== null && $name && $_strict && !$suppress)
                $_exceptionFormat($_lang_filter_value, $name, $handle);

            // If the default flag is set, return a default instance of the class
            if ($default)
                return $default();

            return null;
        };
    };
    var $_runtimeFilterCustom     = function($handle, $default, $suppress, $cast, $null)
    {
        // ---------- INTEGER ----------
        if ($handle == 'integer' || $handle == 'int')
            return function($value, $name)
            {
                // If the value is not a primitive number
                if (typeof $value != 'number')
                {
                    // If the value is not a number object
                    if ($$_type($value) != 'number')
                    {
                        // If the cast flag is set, return the value cast as an integer
                        if ($cast)
                            return $$_asInteger($value);

                        // If a name was provided, strict mode is enabled, and the suppress flag is not set when there is an invalid value, throw an exception
                        if ($name && $_strict && !$suppress && (!$null || $value !== null))
                            $_exceptionFormat($_lang_filter_value, $name, $handle);

                        // If the nullable flag is set, return null
                        if ($null)
                            return null;

                        // Return zero
                        return 0;
                    }
                    // Get the primitive value of the object
                    else
                        $value = $__number_valueOf__.call($value);
                }

                // If the value is not-a-number, return zero
                if ($__isNaN($value))
                    return 0;

                // If the value is greater than the maximum integer, return the maximum representable integer
                if ($value > $_const_int_max)
                    return $_const_int_max;

                // If the value is less than the minimum integer, return the maximum representable integer
                if ($value < $_const_int_min)
                    return $_const_int_min;

                // If the value is less than zero, return the value as an integer (rounded towards zero)
                if ($value < 0)
                    return $__ceil($value);

                // Return the value as an integer (rounded towards zero)
                return $__floor($value);
            };
        // ---------- PRIMITIVE ----------
        else if ($handle == 'primitive')
            return function($value, $name)
            {
                // If the value is a primitive, return it
                if ($$_isPrimitive($value))
                    return $value;

                // Get the value type
                var $type = $_types[$__toString__.call($value)] || 'object';

                // If the value is a boolean, return the primitive value of the boolean
                if ($type == 'boolean')
                    return $__boolean_valueOf__.call($value);

                // If the value is a number, return the primitive value of the number
                if ($type == 'number')
                    return $__number_valueOf__.call($value);

                // If the value is a string, return the primitive value of the string
                if ($type == 'string')
                    return $__string_valueOf__.call($value);

                // If a name was provided, strict mode is enabled, and the suppress flag is not set, throw an exception
                if ($name && $_strict && !$suppress)
                    $_exceptionFormat($_lang_filter_value, $name, $handle);

                return null;
            };
        // ---------- TYPED ARRAY ----------
        else if ($handle.length > 2 && $handle[$handle.length - 2] == '[' && $handle[$handle.length - 1] == ']' && $_constraints[$handle])
            return $_runtimeFilterInternal($handle, null, $suppress, '[object ' + $handle[0].toUpperCase() + $handle.substr(1, $handle.length - 3) + 'Array]');

        return null;
    };
    var $_runtimeFilterInstanceOf = function($handle, $default, $suppress, $type)
    {
        // Return the instanceof constraint filter
        return function($value, $name)
        {
            // If the value is either null or an instance of jQuery, return it
            if (!$default && $value === null || $value instanceof $type)
                return $value;

            // If a name was provided, strict mode is enabled, and the suppress flag is not set when there is an invalid value, throw an exception
            if ($name && $_strict && !$suppress && $value !== null)
                $_exceptionFormat($_lang_filter_value, $name, $handle);

            // If the default flag is set, return a default instance
            if ($default)
                return $default();

            return null;
        };
    };
    var $_runtimeFilterInternal   = function($handle, $default, $suppress, $type)
    {
        // Return the internal constraint filter
        return function($value, $name)
        {
            // If the value is either null or the internal type, return it
            if (!$default && $value === null || $__toString__.call($value) == $type)
                return $value;

            // If a name was provided, strict mode is enabled, and the suppress flag is not set when there is an invalid value, throw an exception
            if ($name && $_strict && !$suppress && $value !== null)
                $_exceptionFormat($_lang_filter_value, $name, $handle);

            // If the default flag is set, return a default instance
            if ($default)
                return $default();

            return null;
        };
    };
    var $_runtimeFilterPrimitive  = function($handle, $default, $suppress, $type, $cast, $null, $valueOf)
    {
        // Return the primitive constraint filter
        return function($value, $name)
        {
            // If the value is the primitive filter type, return it
            if (typeof $value == $type)
                return $value;

            // If the cast function is set, return the casted value
            if ($cast)
                return $cast($value);

            // If the value is a primitive object, return the primitive value of the object
            if ($$_type($value) == $type)
                return $valueOf.call($value);

            // If a name was provided, strict mode is enabled, and the suppress flag is not set when there is an invalid value, throw an exception
            if ($name && $_strict && !$suppress && (!$null || $value !== null))
                $_exceptionFormat($_lang_filter_value, $name, $handle);

            // If the nullable flag is set, return null
            if ($null)
                return null;

            // If the default primitive value is null and the filter is a symbol type, return a new symbol
            if ($default === null && $type == 'symbol')
                return $__symbol();

            // Return the default primitive value
            return $default;
        };
    };
    var $_runtimeFlag             = function()
    {
        // Create the flag
        var $flag = false;

        // Return the flag accessor function
        return function($argument)
        {
            // If the argument is undefined, return the flag
            if ($argument === undefined)
                return $flag;

            // Set the flag
            $flag = !!$argument;
        };
    };
    var $_runtimeHandle           = function($handle, $generic, $namespace, $aliases, $includes)
    {
        // If a handle was not provided, return null
        if (!$handle)
            return null;

        // Get the references collection
        var $references = $generic ?
                          $_namespaces :
                          $_classes;

        // If the handle starts with the namespace alias qualifier
        if ($handle.indexOf('::') >= 0)
        {
            // Create the handles array from the handle
            $handle = $handle.split('::');

            // If the alias qualifier is the global alias, return the resolved global reference
            if ($handle[0] == $_const_keyword_global)
                return $references[$handle[1]] || null;

            // Get the dependency from the aliases map
            var $dependency = $aliases ?
                              $aliases[$handle[0]] :
                              null;

            // If the dependency was not found, throw an exception
            if (!$dependency)
                $_exceptionFormat($_lang_handle_qualifier_invalid, $namespace, $handle[0]);

            // Return the resolved reference relative to the dependency
            return $_runtimeHandle($dependency + '.' + $handle[1], $generic, $namespace);
        }

        // Resolve the reference relative to the namespace
        var $reference = $namespace ?
                         $references[$namespace + '.' + $handle] :
                         null;

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
                // If the handle is not generic and the handle directly references the alias
                if (!$generic && $handle == $alias)
                {
                    // If the alias is not a valid class name, throw an exception
                    if (!$_const_regexp_class.test($alias))
                        $_exceptionFormat($_lang_handle_alias_invalid, $namespace, $alias);

                    // If the dependency is not a valid handle, throw an exception
                    if (!$_compilerHandle($dependency))
                        $_exceptionFormat($_lang_handle_dependency_invalid, $namespace, $dependency);
                }

                // If a reference was already found relative to the namespace, throw an exception
                if ($reference)
                    $_exceptionFormat($_lang_handle_alias_conflict, $namespace, $alias);

                // Resolve the reference relative to the dependency
                $reference = $_runtimeHandle($index >= 0 ?
                                             $dependency + '.' + $handle.substr($index + 1) :
                                             $dependency,
                                             $generic,
                                             $namespace);
            }
        }

        // If a reference was resolved, return the reference
        if ($reference)
            return $reference;

        // If the handle is not generic and an includes array was provided
        if (!$generic && $includes)
        {
            // Create the reference index
            var $index = -1;

            for (var $i = 0, $j = $includes.length; $i < $j; $i++)
            {
                // Resolve the include reference relative to the include
                var $include = $_runtimeHandle($includes[$i] + '.' + $handle, $generic, $namespace);

                // If an include reference was not resolved, continue
                if (!$include)
                    continue;

                // If an include reference was previously resolved, throw an exception
                if ($reference)
                    $_exceptionFormat($_lang_handle_include_duplicate, $handle, $includes[$i], $includes[$index]);

                // Set the reference as the include reference
                $index     = $i;
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
                    $reference = $references[$parent + '.' + $handle];

                // If a reference was resolved, return the reference
                if ($reference)
                    return $reference;

                // Get the index of the previous dot operator in the namespace
                $index = $namespace.lastIndexOf('.', $index - 1);
            }
        }

        // Return the resolved global reference
        return $references[$handle] || null;
    };
    var $_runtimeMatrix           = function($metaclass, $metalength, $abstract, $expando, $internal, $model, $primitive, $struct, $unlocked)
    {
        // Create the merge index, metadata, and handles map
        var $class        = null,
            $merge        = 0,
            $metainstance = new $__array($metalength),
            $handles      = $__create(null),
            $readonlys    = false,
            $type         = $_class;

        // Create the runtime build helper
        var $build = function()
        {
            // If the class has been built, return false
            if (!$build)
                return false;

            // Reset the build reference and compile the metadata
            $build = null;
            $merge = $_compilerDirectives($metaclass, $metalength, $metainstance, null, null, $primitive, $struct);

            // Loop through the metadata from base to derived
            for (var $i = $metalength - 1; $i >= 0; $i--)
            {
                // Get the cache and directives array
                var $cache      = $metaclass[$i],
                    $directives = $metainstance[$i];

                // If the previous index was the internal index, set the type as the class
                if ($i == $internal + 1)
                    $type = $cache[$_cache_class];

                // Set the class handle and index in the handles map
                $handles[$cache[$_cache_class][$_symbol_handle]] = $i;

                // If no readonlys are found, check if any readonly instructions are found in the directives array
                if (!$readonlys)
                    for (var $j = 0, $k = $directives.length; $j < $k && !$readonlys; $j++)
                        $readonlys = !!($directives[$j][$_directive_instructions] & $_instructions_data_readonly);
            }

            // Return true
            return true;                
        };

        // If the class is abstract
        if ($abstract)
        {
            // Create the runtime class constructor
            $class = function()
            {
                // If the class has not been built, build the class
                if ($build)
                    $build();

                // Throw an exception
                $_exception($_lang_class_abstract_instance);
            };

            // Set the class metadata
            $_data($class, $_symbol_build, $build);

            // Return the runtime class constructor
            return $class;
        }

        // Create the root object descriptors
        var $descriptorThisIs   = { 'value': function($class)
        {
            // If the class is not a class, return false
            if (!$class || !$class[$_symbol_lock] || !$_unlockSymbolsClass($class))
                return false;

            // Return true if an index was found in the handles map for the handle of the provided class
            return $handles[$class[$_symbol_handle]] != null;
        } };
        var $descriptorThisType = { 'value': function()
        {
            // Return the instance type
            return $type;
        } };

        // Create the runtime class constructor
        $class = function()
        {
            // If the class has not been built, build the class
            if ($build)
                $build();

            // Check if the new operator was used and create the instance matrix, overrides object, and readonly flag
            var $new         = this instanceof $class && (!this[$_symbol_lock] || !$_unlockSymbolsInstance(this)),
                $instance    = new $__array($metalength),
                $this        = this,
                $private     = null,
                $protected   = !$struct ? $this : null,
                $public      = $this,
                $base        = !$struct ? $this : null,
                $construct   = null,
                $base1       = null,
                $constructor = null,
                $overrides   = !$struct && $merge > 1 ?
                               $__create(null) :
                               null,
                $readonly    = $readonlys ?
                               $_runtimeFlag() :
                               null,
                $return      = undefined;

            // If the new operator was not used
            if (!$new)
            {
                // Create the root object
                $this = $public = $__create($class.prototype);

                // If the class is not a struct, set the base and protect instance objects as the newly created root object
                if (!$struct)
                    $base = $protected = $this;
            }

            // Create the root instance object
            var $root = $__create($this);

            // If the class is expando, set the base, protected, and public instance objects as the root instance object
            if ($expando)
                $base = $protected = $public = $root;

            // Loop through the metadata from base to derived
            for (var $i = $metalength - 1; $i >= 0; $i--)
            {
                // Get the cache and store the base constructor
                var $cache = $metaclass[$i],
                    $ctor  = $constructor;

                // Create the instance objects
                $public    = $__create($public);
                $protected = !$struct ?
                             $__create($protected) :
                             null;
                $private   = $__create($struct ?
                                       $public :
                                       $protected);
                $base      = $i == 0 ?
                             null :
                             $i < $merge ?
                             $__create($base) :
                             $protected;

                // Create the internal descriptors
                var $descriptorBase = $base1 ?
                                      { 'value': $base1 } :
                                      null,
                    $descriptorSelf = { 'value': $root },
                    $descriptorThis = { 'value': $public },
                    $descriptorType = { 'value': $cache[$_cache_class] };

                // If the class is not unlocked or the base instance object is unique
                if (!$unlocked || $base !== $protected)
                {
                    // If these are not the root instance objects, set the base descriptor on the private instance object
                    if ($base1)
                        $__defineProperty($private, '__base', $descriptorBase);

                    // Set the self, public, and type descriptors on the private instance object
                    $__defineProperty($private, '__self', $descriptorSelf);
                    $__defineProperty($private, '__this', $descriptorThis);
                    $__defineProperty($private, '__type', $descriptorType);
                }

                // If these are the root instance objects, set the self descriptor on the public instance object
                if (!$base1)
                    $__defineProperty($public, '__self', $descriptorSelf);

                // Set the type descriptor on the public instance object
                $__defineProperty($public,
                                  '__type',
                                  $i <= $internal ?
                                  { 'value': null } :
                                  $descriptorType);

                // If the class is unlocked and a base instance object was provided
                if ($unlocked && $base)
                {
                    // If these are not the root instance objects, set the base descriptor on the base instance object
                    if ($base1)
                        $__defineProperty($base, '__base', $descriptorBase);

                    // Set the self, public, and type references on the base instance object
                    $__defineProperty($base, '__self', $descriptorSelf);
                    $__defineProperty($base, '__this', $descriptorThis);
                    $__defineProperty($base, '__type', $descriptorType);
                }

                // Get the constructor from the cache
                $constructor = $cache[$_cache_constructor];

                // If the cache has a constructor
                if ($constructor)
                {
                    // Create the construct instance object
                    $construct = $__create($private);

                    // Set the data descriptor on the construct instance object
                    $__defineProperty($construct, '__data', { 'value': $private });

                    // If the base cache has a constructor, set the base constructor on the construct instance object
                    if ($ctor)
                        $__defineProperty($construct, '__base', { 'value': $ctor });

                    // Create the constructor context wrapper function
                    $constructor = $_runtimeThis(null, $construct, null, $constructor);
                }
                // Set the base constructor as the constructor
                else
                    $constructor = $ctor;

                // Create the instances in the instance matrix
                var $instances = $instance[$i] = $constructor === $ctor ?
                                                 [$private, $protected, $public, $base] :
                                                 [$private, $protected, $public, $base, $construct];

                // Lock the instance type on the instance objects
                $_lockSymbolsInstance($instances, $private, $protected, $public, $base, $constructor !== $ctor ? $construct : null);

                // If there are no overrides in the instance matrix
                if (!$overrides)
                {
                    // Get the directives from the directives matrix
                    var $directives = $metainstance[$i];

                    // Execute the directives on the instance objects
                    for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                        $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, $readonly);

                    // Freeze the instance objects
                    $__freeze($private);
                    $__freeze($public);

                    // If a protected instance object was created, freeze it
                    if ($protected)
                        $__freeze($protected);

                    // If a base instance object was created and it is unique, freeze it
                    if ($base && $base !== $protected)
                        $__freeze($base);
                }

                // If the cache had a constructor, freeze the construct instance object
                if ($constructor !== $ctor)
                    $__freeze($construct);

                // Set the previous base instance as the base instance
                $base1 = $base;
            }

            // If there are overrides in the instance matrix
            if ($overrides)
            {
                // Loop through the metadata from derived to base
                for (var $i = 0; $i < $metalength; $i++)
                {
                    // Get the directives and instances array
                    var $directives = $metainstance[$i],
                        $instances  = $instance[$i];

                    // Get the instance objects from the instances array
                    $private   = $instances[$_instance_private];
                    $protected = $instances[$_instance_protected];
                    $public    = $instances[$_instance_public];
                    $base      = $instances[$_instance_base];

                    // Execute the directives on the instance objects
                    for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                        $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, $readonly);
                }

                // Loop through the metadata from base to derived
                for (var $i = $metalength - 1; $i >= 0; $i--)
                {
                    // Get the instances array
                    var $instances = $instance[$i];

                    // Get the instance objects from the instances array
                    $private   = $instances[$_instance_private];
                    $protected = $instances[$_instance_protected];
                    $public    = $instances[$_instance_public];
                    $base      = $instances[$_instance_base];

                    // Freeze the instance objects
                    $__freeze($private);
                    $__freeze($public);

                    // If a protected instance object was created, freeze it
                    if ($protected)
                        $__freeze($protected);

                    // If a base instance object was provided and it is unique, freeze it
                    if ($base && $base !== $protected)
                        $__freeze($base);
                }
            }

            // Define the as, is, and type method descriptors on the root object
            $__defineProperty($this, 'as',   { 'value': $_runtimeCast($handles, $instance) });
            $__defineProperty($this, 'is',   $descriptorThisIs);
            $__defineProperty($this, 'type', $descriptorThisType);

            // Freeze the root object
            $__freeze($this);

            // If the class is a model, freeze the root instance object
            if ($model)
                $__freeze($root);

            // If a constructor was provided and the new operator was used or the class is neither a model nor a struct, apply the constructor and store its return value
            if ($constructor && ($new || !$model && !$struct))
                $return = $constructor.apply($construct, arguments);

            // If a readonly accessor was created, set the readonly flag
            if ($readonly)
                $readonly(true);

            // If the new operator was not used and the constructor did not return undefined or the construct (or private if struct) instance object, return the constructor return value
            if (!$new && $return !== undefined && $return !== (!$struct ? $construct : $private))
                return $return;

            // Return the public instance object
            return $public;
        };

        // Set the class metadata
        $_data($class, $_symbol_build, $build);

        // Return the runtime class constructor
        return $class;
    };
    var $_runtimeThis             = function($name, $private, $filter, $function, $arguments)
    {
        // If a constraint filter was provided
        if ($filter)
        {
            // If the function is an accessor method, return the constrained context wrapper get accessor
            if ($arguments == 0)
                return function()
                {
                    // Call the function in the context of a private instance and return the return value (within the applied constraint filter)
                    return $filter($function.call($private), $name);
                };

            // If the function is a mutator method, return the constrained context wrapper set accessor
            if ($arguments == 1)
                return function($v)
                {
                    // Call the function in the context of a private instance with the accessor value (within the applied constraint filter) and return the return value
                    return $function.call($private, $filter($v, $name));
                };

            // Return the constrained context wrapper function
            return function()
            {
                // Apply the function in the context of a private instance with the provided arguments and return the return value (within the applied constraint filter)
                return $filter($function.apply($private, arguments), $name);
            };
        }

        // If the function is an accessor method, return the context wrapper get accessor
        if ($arguments == 0)
            return function()
            {
                // Call the function in the context of a private instance and return the return value
                return $function.call($private);
            };

        // If the function is a mutator method, return the context wrapper set accessor
        if ($arguments == 1)
            return function($v)
            {
                // Call the function in the context of a private instance with the accessor value and return the return value
                return $function.call($private, $v);
            };

        // Return the context wrapper function
        return function()
        {
            // Apply the function in the context of a private instance with the provided arguments and return the return value
            return $function.apply($private, arguments);
        };
    };

    // If symbols are supported, create the runtime class filter helper
    if ($_symbolCreate)
        $_runtimeFilterClass = function($handle, $default, $suppress, $data2)
        {
            // Return the class constraint filter
            return function($value, $name)
            {
                // Get the hidden instance data from the value
                var $data = $value ? $value[$_symbol_data] : null;

                // If hidden instance data was found
                if ($data)
                {
                    // Cast the value as an instance of the class
                    $value = $data[$data2] || undefined;

                    // If the cast was successful, return the value
                    if ($value)
                        return $value;
                }

                // If the value is not null, a name was provided, strict mode is enabled, and the suppress flag is not set, throw an exception
                if ($value !== null && $name && $_strict && !$suppress)
                    $_exceptionFormat($_lang_filter_value, $name, $handle);

                // If the default flag is set, return a default instance of the class
                if ($default)
                    return $default();

                return null;
            };
        };

    // Create the symbols runtime helpers
    var $_runtimeSymbolsMatrix = function($metaclass, $metalength, $handle, $name, $defaults, $abstract, $internal, $model, $optimized)
    {
        // Create the metadata array and get the root data symbol (but the root metainstance has yet to be built)
        var $class        = null,
            $metainstance = new $__array($metalength),
            $metaroot     = null,
            $symbolsroot  = $metaclass[0][$_cache_symbols_root];

        // Create the runtime build helper
        var $build = function()
        {
            // If the class has been built, return false
            if (!$build)
                return false;

            // Reset the build reference
            $build = null;

            // Get the class modifiers, create the data sources array (if the class is primitive), and compile the metadata
            var $modifiers = $class[$_symbol_modifiers],
                $primitive = !!($modifiers & $_modifiers_class_primitive),
                $sources   = $primitive ?
                             [] :
                             null,
                $merge     = $_compilerDirectives($metaclass, $metalength, $metainstance, $defaults, $sources, $primitive, false);

            // Compile the symbols metadata
            $metaroot = $_compilerSymbolsDirectives($metaclass, $metalength, $metainstance, $defaults, $class.prototype, $sources, $internal, $merge, $optimized, $primitive, false, !!($modifiers & $_modifiers_class_unlocked));

            // Return true
            return true; 
        };

        // If the class is abstract
        if ($abstract)
        {
            // Create the runtime class constructor
            $class = function()
            {
                // If the class has not been built, build the class
                if ($build)
                    $build();

                // Throw an exception
                $_exception($_lang_class_abstract_instance);
            };

            // Set the class metadata
            $_data($class, $_symbol_build, $build);

            // Return the runtime class constructor
            return $class;
        }

        // Create the runtime class constructor
        $class = function($clone)
        {
            // If the class has not been built, build the class
            if ($build)
                $build();

            // Check if the new operator was used and create the hidden instance data
            var $new         = this instanceof $class && this[$_symbol_instance] !== this,
                $this        = $__create($defaults),
                $base        = null,
                $construct   = null,
                $private     = null,
              //$protected   = null,
                $public      = null,
                $constructor = null,
                $return      = undefined;

            // If the class is not optimized
            if (!$optimized)
            {
                // Create the root instance object (and set it in the hidden instance data)
                var $root = $this[$symbolsroot] = $__create($metaroot);

                // If ECMAScript 6 symbols are not supported
                if (!$__symbol)
                {
                    // Set the instance data on the root instance object (and lock the instance type on it)
                    $_data($root, $_symbol_data,     $this);
                    $_data($root, $_symbol_instance, $root);
                }
                else
                {
                    // Set the hidden instance data on the root instance object (and lock the instance type on it)
                    $root[$_symbol_data]     = $this;
                    $root[$_symbol_instance] = $root;
                }

                // If the global prototype lock flag is set, freeze the root instance object
                if ($_protoLock)
                    $__freeze($root);
            }

            // Loop through the metadata from base to derived
            for (var $i = $metalength - 1; $i >= 0; $i--)
            {
                // Get the cache from the metaclass and the symbols directive from the metainstance
                var $cache     = $metaclass[$i],
                    $directive = $metainstance[$i];

                // If the class is not optimized
                if (!$optimized)
                {
                    // Create the private, protected, and public instance objects (and set them in the hidden instance data)
                    $private   = $this[$cache[$_cache_symbols_private]]   = $__create($directive[$_instance_private]);
                  //$protected = $this[$cache[$_cache_symbols_protected]] = $__create($directive[$_instance_protected]);
                    $public    = $this[$cache[$_cache_symbols_public]]    = $__create($directive[$_instance_public]);

                    // If ECMAScript 6 symbols are not supported
                    if (!$__symbol)
                    {
                        // Set the instance data on the private, protected, and public instance objects (and lock the instance type on them)
                        $_data($private,   $_symbol_data,     $this);
                        $_data($private,   $_symbol_instance, $private);
                      //$_data($protected, $_symbol_data,     $this);
                      //$_data($protected, $_symbol_instance, $protected);
                        $_data($public,    $_symbol_data,     $this);
                        $_data($public,    $_symbol_instance, $public);
                    }
                    else
                    {
                        // Set the hidden instance data on the private, protected, and public instance objects (and lock the instance type on them)
                        $private  [$_symbol_data]     = $this;
                        $private  [$_symbol_instance] = $private;
                      //$protected[$_symbol_data]     = $this;
                      //$protected[$_symbol_instance] = $protected;
                        $public   [$_symbol_data]     = $this;
                        $public   [$_symbol_instance] = $public;
                    }

                    // If the global prototype lock flag is set
                    if ($_protoLock)
                    {
                        // Freeze the private, protected, and public instance objects
                        $__freeze($private);
                      //$__freeze($protected);
                        $__freeze($public);
                    }

                    // If the cache is inherited
                    if ($i > 0)
                    {
                        // Create the base instance object (and set it in the hidden instance data)
                        $base = $this[$cache[$_cache_symbols_base]] = $__create($directive[$_instance_base]);

                        // If ECMAScript 6 symbols are not supported
                        if (!$__symbol)
                        {
                            // Set the instance data on the base instance object (and lock the instance type on it)
                            $_data($base, $_symbol_data,     $this);
                            $_data($base, $_symbol_instance, $base);
                        }
                        else
                        {
                            // Set the hidden instance data on the base instance object (and lock the instance type on it)
                            $base[$_symbol_data]     = $this;
                            $base[$_symbol_instance] = $base;
                        }

                        // If the global prototype lock flag is set, freeze the base instance object
                        if ($_protoLock)
                            $__freeze($base);
                    }
                    // Reset the base instance object
                    else
                        $base = null;
                }
                // If the cache is not inherited, create the public instance object
                else if ($i == 0)
                    $public = $this[$cache[$_cache_symbols_public]];

                // If the new keyword was not used and the class is a model, continue
                if (!$new && $model)
                    continue;

                // Get the construct metainstance from the symbols directive
                var $metaconstruct = $directive[$_instance_construct];

                // If a construct metainstance was not found, continue
                if (!$metaconstruct)
                    continue;

                // Create the construct instance object (and set it in the hidden instance data)
                $construct = $this[$cache[$_cache_symbols_construct]] = $__create($metaconstruct);

                // If ECMAScript 6 symbols are not supported
                if (!$__symbol)
                {
                    // Set the instance data on the construct instance object (and lock the instance type on it)
                    $_data($construct, $_symbol_data,     $this);
                    $_data($construct, $_symbol_instance, $construct);
                }
                else
                {
                    // Set the hidden instance data on the construct instance object (and lock the instance type on it)
                    $construct[$_symbol_data]     = $this;
                    $construct[$_symbol_instance] = $construct;
                }

                // If the global prototype lock flag is set, freeze the construct instance object
                if ($_protoLock)
                    $__freeze($construct);

                // Get the constructor from the cache
                $constructor = $cache[$_cache_constructor];
            }

            // Set the type handle and name in the hidden instance data
            $this[$_symbol_data_handle]   = $handle;
            $this[$_symbol_data_name]     = $name;
            $this[$_symbol_data_readonly] = false;

            // If the class has a constructor and the new operator was used or the class is not a model (and the class is not being cloned), apply the constructor in the context of a construct instance and store its return value
            if ($constructor && ($new || !$model) && $clone !== $_clone)
                $return = $constructor.apply($construct, arguments);

            // Set the readonly flag in the hidden instance data
            $this[$_symbol_data_readonly] = true;

            // If the constructor returned neither undefined nor the construct instance object, return its return value
            if ($return !== undefined && $return !== $construct)
                return $return;

            // Return the public instance object
            return $public;
        };

        // Set the class metadata
        $_data($class, $_symbol_build, $build);

        // Return the runtime class constructor
        return $class;
    };
    var $_runtimeSymbolsStruct = function($metaclass, $handle, $name, $constructor, $defaults, $internal, $optimized)
    {
        // Get the private, public, and root data symbols (but the private and public metainstances have yet to be built)
        var $cache          = $metaclass[0],
            $metaprivate    = null,
            $metapublic     = null,
            $symbolsprivate = $cache[$_cache_symbols_private],
            $symbolspublic  = $cache[$_cache_symbols_public],
            $symbolsroot    = $cache[$_cache_symbols_root];

        // Create the runtime build helper and struct constructor
        var $build  = function()
        {
            // If the struct has been built, return false
            if (!$build)
                return false;

            // Reset the build reference
            $build = null;

            // Get the struct modifiers, create the data sources array, and compile the metadata
            var $metainstance = new $__array(1),
                $modifiers    = $struct[$_symbol_modifiers],
                $primitive    = !!($modifiers & $_modifiers_class_primitive),
                $sources      = [],
                $merge        = $_compilerDirectives($metaclass, 1, $metainstance, $defaults, $sources, $primitive, true);

            // Compile the symbols metadata
            $_compilerSymbolsDirectives($metaclass, 1, $metainstance, $defaults, $struct.prototype, $sources, $internal, $merge, $optimized, $primitive, true, !!($modifiers & $_modifiers_class_unlocked));

            // Cache the private and public metainstances
            $metaprivate = $metainstance[0][$_instance_private];
            $metapublic  = $metainstance[0][$_instance_public];

            // Return true
            return true; 
        };
        var $struct = function($clone)
        {
            // If the struct has not been built, build the struct
            if ($build)
                $build();

            // Check if the new operator was used and create the hidden instance data
            var $new  = this instanceof $struct && this[$_symbol_instance] !== this,
                $this = $__create($defaults);

            // Create the private and public instance objects (and set them in the hidden instance data)
            var $private = $this[$symbolsprivate] = !$optimized || $constructor && $new ?
                                                    $__create($metaprivate) :
                                                    null,
                $public  = $this[$symbolspublic]  = $this[$symbolsroot] = $__create($metapublic);

            // If ECMAScript 6 symbols are not supported
            if (!$__symbol)
            {
                // Set the instance data on the public instance object (and lock the instance type on it)
                $_data($public, $_symbol_data,     $this);
                $_data($public, $_symbol_instance, $public);

                // If a private instance object was created
                if ($private)
                {
                    // Set the instance data on the private instance object (and lock the instance type on it)
                    $_data($private, $_symbol_data,     $this);
                    $_data($private, $_symbol_instance, $private);
                }
            }
            else
            {
                // Set the hidden instance data on the public instance object (and lock the instance type on it)
                $public[$_symbol_data]     = $this;
                $public[$_symbol_instance] = $public;

                // If a private instance object was created
                if ($private)
                {
                    // Set the hidden instance data on the private instance object (and lock the instance type on it)
                    $private[$_symbol_data]     = $this;
                    $private[$_symbol_instance] = $private;
                }
            }

            // If the global prototype lock flag is set
            if ($_protoLock)
            {
                // Freeze the public instance object
                $__freeze($public);

                // If a private instance object was created, freeze the private instance object
                if ($private)
                    $__freeze($private);
            }

            // Set the type handle and name in the hidden instance data
            $this[$_symbol_data_handle]   = $handle;
            $this[$_symbol_data_name]     = $name;
            $this[$_symbol_data_readonly] = false;

            // If the struct has a constructor and the new operator was used (and the struct is not being cloned), apply the constructor in the context of a private instance
            if ($constructor && $new && $clone !== $_clone)
                $constructor.apply($private, arguments);

            // Set the readonly flag in the hidden instance data
            $this[$_symbol_data_readonly] = true;

            // Return the public instance object
            return $public;
        };

        // Set the struct metadata
        $_data($struct, $_symbol_build, $build);

        // Return the runtime struct constructor
        return $struct;
    };

    // ########## CHECKS ##########

    // ---------- CLASS ----------
    $_defineMethod('isAbstractClass',  function($class)
    {
        // Return true if the object is a class and it is abstract
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_abstract);
    });
    $_defineMethod('isExpandoClass',   function($class)
    {
        // Return true if the object is a class and it has the expando modifier
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_expando);
    });
    $_defineMethod('isImportedClass',  function($class)
    {
        // Return true if the object is a class and it has the import modifier
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_import);
    });
    $_defineMethod('isInternalClass',  function($class)
    {
        // Return true if the object is a class and it has the internal modifier
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_internal);
    });
    $_defineMethod('isModel',          function($class)
    {
        // Return true if the object is a class and it has the model modifier
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_model);
    });
    $_defineMethod('isOptimizedClass', function($class)
    {
        // Return true if the object is a class and it is optimized
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_optimized);
    });
    $_defineMethod('isPrimitiveClass', function($class)
    {
        // Return true if the object is a class and it is has the primitive modifier
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_primitive);
    });
    $_defineMethod('isSealedClass',    function($class)
    {
        // Return true if the object is a class and it is sealed
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_sealed);
    });
    $_defineMethod('isStruct',         function($class)
    {
        // Return true if the object is a class and it has the struct modifier
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_struct);
    });
    $_defineMethod('isUnlockedClass',  function($class)
    {
        // Return true if the object is a class and it is unlocked
        return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_unlocked);
    });

    // ---------- NUMBER ----------
    $_defineMethod('isInfinity',         function($number)
    {
        // Unbox the object
        $number = $$_unbox($number);

        // Return true if the object is a number, is not NaN, and is not finite
        return typeof $number == 'number' && !$__isNaN($number) && !$__isFinite($number);
    });
    $_defineMethod('isNaN',              function($number)
    {
        // Unbox the object
        $number = $$_unbox($number);

        // Return true if the object is a number and is NaN
        return typeof $number == 'number' && !!$__isNaN($number);
    });
    $_defineMethod('isNegativeInfinity', function($number)
    {
        // Unbox the object
        $number = $$_unbox($number);

        // Return true if the object is a number, is not NaN, is not finite, and is less than zero
        return typeof $number == 'number' && !$__isNaN($number) && !$__isFinite($number) && $number < 0;
    });
    $_defineMethod('isPositiveInfinity', function($number)
    {
        // Unbox the object
        $number = $$_unbox($number);

        // Return true if the object is a number, is not NaN, is not finite, and is greater than zero
        return typeof $number == 'number' && !$__isNaN($number) && !$__isFinite($number) && $number > 0;
    });

    // ---------- OBJECT ----------
    $_defineMethod('isArgumentsObject', function($object)
    {
        // Return true if the object is an arguments object
        return $__toString__.call($object) == '[object Arguments]';
    });
    $_defineMethod('isComplexObject',   function($object)
    {
        // If the object is not an object, return false
        if (!$object || $$_type($object) != 'object')
            return false;

        // Return true if the prototype of the object is not the object prototype
        return $__getPrototypeOf($object) !== $__objectProto__;
    });
    $_defineMethod('isFlatObject',      function($object)
    {
        // If the object is not an object, return false
        if (!$object || $$_type($object) != 'object')
            return false;

        // Return true if the prototype of the object is null
        return $__getPrototypeOf($object) === null;
    });
    $_defineMethod('isSimpleObject',    function($object)
    {
        // If the object is not an object, return false
        if (!$object || $$_type($object) != 'object')
            return false;

        // Return true if the prototype of the object is the object prototype
        return $__getPrototypeOf($object) === $__objectProto__;
    });

    // ---------- *-LIKE OBJECT ----------
    $_defineMethod('isArrayLikeObject',  function($object)
    {
        // If the object is null or undefined, return false
        if ($object == null)
            return false;

        // Get the object length
        var $length = $object.length;

        // Return true if the length is an integer and is greater than or equal to zero
        return $$_isInteger($length) && $length >= 0;
    });
    $_defineMethod('isWindowLikeObject', function($object)
    {
        // Return true if the object has a window property that is a self reference
        return !!$object && $object.window === $object;
    });

    // ---------- PROTOTYPE ----------
    $_defineMethod('isObjectInstance', function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object == null)
            return false;

        // Return true if the object inherits from the object prototype
        return $__isPrototypeOf__.call($__objectProto__, $object);
    });

    // ---------- TYPE ----------
    $_defineMethod('isNull',      function($argument)
    {
        // Return true if the argument is null
        return $argument === null;
    });
    $_defineMethod('isObject',    function($object)
    {
        // Return true if the object is neither undefined nor null
        return $object != null;
    });
    $_defineMethod('isUndefined', function($argument)
    {
        // Return true if the argument is undefined
        return $argument === undefined;
    });
    $_defineMethod('isWindow',    function($object)
    {
        // If the object is the window reference, return true
        if ($object === $_window)
            return true;

        // Return true if the object is a window reference
        return $$_type($object) == 'window';
    });

    // ---------- PSEUDO-TYPE ----------
    $_defineMethod('isCallableType',  function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object == null)
            return false;

        // If the object is a function, return true
        if (typeof $object == 'function')
            return true;

        // Get the type of the object
        var $type = $$_type($object);

        // Return true if the object is a class or function
        return $type == 'class' || $type == 'function';
    });
    $_defineMethod('isPrimitiveType', function($object)
    {
        // If the object is a null reference or undefined, return true
        if ($object == null)
            return true;

        // Get the type of the object
        var $type = $$_type($object);

        // Return true if the object is a value type
        return $type == 'boolean' || $type == 'number' || $type == 'string' || $type == 'symbol' && !!$__symbol;
    });
    $_defineMethod('isReferenceType', function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object == null)
            return false;

        // Get the type of the object
        var $type = $$_type($object);

        // Return true if the object is not a value type
        return $type != 'boolean' && $type != 'number' && $type != 'string' && ($type != 'symbol' || !$__symbol);
    });
    $_defineMethod('isValueType',     function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object == null)
            return false;

        // Get the type of the object
        var $type = $$_type($object);

        // Return true if the object is a boolean, number, string, or symbol
        return $type == 'boolean' || $type == 'number' || $type == 'string' || $type == 'symbol' && !!$__symbol;
    });

    // ########## METHODS ##########

    // ---------- CLASS ----------
    $_defineMethod('base',  function($class)
    {
        // CHECK $class
        if (!$$_isClass($class))
            return null;

        // Get the metaclass
        var $metaclass = $class[$_symbol_metaclass];

        // If symbols are not supported, unlock the metaclass
        if (!$_symbolCreate)
            $metaclass = $metaclass($_lock);

        // If the metaclass has no base cache, return null
        if ($metaclass.length < 2)
            return null;

        // Return the base class from the base cache
        return $metaclass[1][$_cache_class];
    });
    $_defineMethod('build', function($class)
    {
        // CHECK $class
        if (!$$_isClass($class))
            return null;

        // Call the build helper function
        return !!$class[$_symbol_build]();
    });

    // ---------- FUNCTION ----------
    $_defineMethod('empty', function()
    {
        // Return an empty function
        return function()
        {
            //
        };
    });

    // ---------- OBJECT ----------
    $_defineMethod('accessor', function($object, $key, $get, $set, $enumerable, $configurable, $constraint)
    {
        // If the object is a primitive value, the key is not a primitive string, or either the get or set accessor is neither null, undefined, nor a function, return the object
        if ($$_isPrimitive($object) || typeof $key != 'string' || $get != null && typeof $get != 'function' || $set != null && typeof $set != 'function')
            return $object;

        // Create the accessor property descriptor
        var $descriptor = { 'configurable': !!$configurable, 'enumerable': !!$enumerable };

        // If a type constraint was provided
        if ($constraint)
        {
            // If the constraint is not valid, throw an exception
            if (!$_compilerConstraint($constraint))
                $_exceptionFormat($_lang_filter_invalid_generic, null, $constraint);

            // Create the constraint filter
            var $filter = $_runtimeFilter($constraint);

            // If either a get or set accessor was provided
            if ($get || $set)
            {
                // If a get accessor was provided, create the get accessor
                if ($get)
                    $descriptor['get'] = $_get($get, $filter);

                // If a set accessor was provided, create the set accessor
                if ($set)
                    $descriptor['set'] = $_set($set, $filter);
            }
            // Create the default data descriptor
            else
                $_runtimeData(null, $filter(), $filter, $descriptor);
        }
        else
        {
            // Set the get and set accessors in the descriptor
            $descriptor['get'] = $get;
            $descriptor['set'] = $set;
        }

        // Define the accessor property on the object
        $__defineProperty($object, $key, $descriptor);

        // Return the object
        return $object;
    });
    $_defineMethod('data',     function($object, $key, $value, $writable, $enumerable, $configurable)
    {
        // If the object is a primitive value or the key is not a primitive string, return the object
        if ($$_isPrimitive($object) || typeof $key != 'string')
            return $object;

        // Define the data property on the object
        $__defineProperty($object, $key,
        {
            'configurable': !!$configurable,
            'enumerable':   !!$enumerable,
            'value':        $value,
            'writable':     !!$writable
        });

        // Return the object
        return $object;
    });
    $_defineMethod('flat',     function()
    {
        // Create a flat object
        var $flat = $__create(null);

        for (var $i = 0, $j = arguments.length; $i < $j; $i++)
        {
            // Get the current argument
            var $argument = arguments[$i];

            // If the current argument is a primitive value, skip the current argument
            if ($$_isPrimitive($argument))
                continue;

            // Copy each enumerable key-value pair in the current argument object into the flat object
            for (var $key in $argument)
                $flat[$key] = $argument[$key];
        }

        // Return the flat object
        return $flat;
    });

    // ---------- STRING ----------
    $_defineMethod('escape', function($string)
    {
        // CHECK $string
        if (typeof $string != 'string')
        {
            // Unbox the object
            $string = $$_unbox($string);

            // If the object is not a string, return an empty string primitive
            if (typeof $string != 'string')
                return '';
        }

        // Return the escaped string
        return $string.replace($_const_escape_search, $_const_escape_replace);
    });
    $_defineMethod('format', function($string)
    {
        // CHECK $string
        if (typeof $string != 'string')
        {
            // Unbox the object
            $string = $$_unbox($string);

            // If the object is not a string, return an empty string primitive
            if (typeof $string != 'string')
                return '';
        }

        // If no arguments were provided, return the string
        if (arguments.length < 2)
            return $string;

        // Create the arguments array
        $_arguments = new $__array(arguments.length - 1);

        // Copy each argument as a string into the arguments array
        for (var $i = 0, $j = $_arguments.length; $i < $j; $i++)
            $_arguments[$i] = $$_asString(arguments[$i + 1]);

        // Create the formatted string
        $string = $string.replace($_const_format_search, $_format);

        // Reset the arguments reference
        $_arguments = null;

        // Return the formatted string
        return $string;
    });

    // ########## SETTINGS ##########

    // Define the settings properties
    $_defineProperty('debug',  function()
    {
        // Return the debug flag
        return $_debug;
    }, function($v)
    {
        // Set the debug flag
        $_debug = $$_asBoolean($v);
    });
    $_defineProperty('strict', function()
    {
        // Return the strict flag
        return $_strict;
    }, function($v)
    {
        // Set the strict flag
        $_strict = $$_asBoolean($v);
    });

    // If the storage flag is set, define the cache setting
    if ($_storage)
        $_defineProperty('cache',  function()
        {
            // Return the cache string
            return $_cache;
        }, function($v)
        {
            // If local storage is not supported, return
            if (!$__storageLocal__)
                return;

            // Get the value as a string
            $v = $$_asString($v);

            // Set the cache string if the value is a valid cache key
            $_cache = $_const_regexp_cache.test($v) ? $v : '';

            // If a cache string was not set, return
            if (!$_cache)
                return;

            // Get the previous cache string from the local storage
            var $cache = $_store('cache');

            // If a previous cache string was found and it does not match the value
            if ($cache && $cache != $v)
            {
                // Create the keys array
                var $keys = [];

                // Loop through each storage index in the local storage
                for (var $i = 0, $j = $__storageLocal__.length; $i < $j; $i++)
                {
                    // Get the key
                    var $key = $__storageLocal__.key($i);

                    // If the key belongs to the previous cache, push it into the keys array
                    if ($key.substr(0, $_const_prefix_storage.length) == $_const_prefix_storage)
                        $keys.push($key);
                }

                // Remove each key in the keys array from the local storage
                for (var $i = 0, $j = $keys.length; $i < $j; $i++)
                    $__storageLocal__.removeItem($keys[$i]);
            }

            // Set the cache string and version in the local storage
            $_store('cache',   $_cache);
            $_store('version', $_version);
        });

    // Return the global namespace
    return $$;
})(this);