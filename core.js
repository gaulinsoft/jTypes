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

// ########## GLOBALS ##########

// Ensure the global function lock flag is a boolean
if (typeof jT_FunctionLock != 'boolean')
    jT_FunctionLock = false;

// Ensure the global harmony flag is a boolean
if (typeof jT_Harmony != 'boolean')
    jT_Harmony = true;

// Ensure the global unsafe harmony flag is a boolean
if (typeof jT_HarmonyUnsafe != 'boolean')
    jT_HarmonyUnsafe = true;//false;

// Ensure the global prototype lock flag is a boolean
if (typeof jT_PrototypeLock != 'boolean')
    jT_PrototypeLock = false;

// Ensure the global shorthand is a string
if (typeof jT_Shorthand != 'string')
    jT_Shorthand = typeof jT_Shorthand != 'boolean' || jT_Shorthand ?
                   '$$' :
                   '';

(function(window, undefined)
{
    // ########## STRICT ##########

    // Enable strict mode
    'use strict';

    // ########## BUILD ##########

    // Create the build minify flag and version number
    var $_minify  = false,
        $_version = '2.2.0b580';

    // ########## FLAGS ##########

    // Create the internal flags
    var $_debug         = !$_minify,
        $_funcLock      = jT_FunctionLock,
        $_harmony       = jT_Harmony,
        $_harmonyUnsafe = jT_HarmonyUnsafe,
        $_protoLock     = jT_PrototypeLock,
        $_strict        = false;

    // ########## LANGUAGE ##########

    // Create the compatibility exception message, arguments exception format string, and the exception prefix constants
    var $_lang_compatibility          = 'JavaScript engine does not support ECMAScript 5.',
        $_lang_exception_arguments    = '"{0}({1})" has some invalid arguments.',
        $_lang_exception_suffix       = ' [jTypes]',
        $_lang_exception_suffix_class = ' [jTypes::{0}]';
    
    // Create the language constants
    var $_lang_$$_abstract_accessor           = '"{0}" cannot be accessed because it is an abstract property.',
        $_lang_$$_abstract_auto               = '"{0}" cannot have the abstract modifier because it is an automatically implemented property.',
        $_lang_$$_abstract_call               = '"{0}" cannot be called because it is an abstract method.',
        $_lang_$$_abstract_class              = '"{0}" cannot have the abstract modifier in a non-abstract class.',
        $_lang_$$_access_conflict             = '"{0}" cannot have the {1} modifier in a {2}.',
        $_lang_$$_access_duplicate            = '"{0}" cannot have more than one access modifier.',
        $_lang_$$_access_invalid              = '"{0}" cannot have the private, protected, or public modifiers because it is a {1} definition.',
        $_lang_$$_auto_invalid                = '"{0}" must implement both accessors because it is an automatically implemented property.',
        $_lang_$$_auto_invalid_default        = '"{0}" cannot have more than one default value for the automatically implemented property.',
        $_lang_$$_class_abstract_instance     = 'abstract classes cannot be instantiated.',
        $_lang_$$_class_abstract_override     = '{0} must implement the inherited abstract {2} "{1}" with the override modifier.',
        $_lang_$$_class_base_invalid          = 'class cannot have an uncompiled base class "{0}".',
        $_lang_$$_class_conflict              = '{0} cannot have the {1} modifier.',
        $_lang_$$_class_conflict_abstract     = 'abstract {0} cannot have the {1} modifier.',
        $_lang_$$_class_conflict_and          = '{0} cannot have the {1} and {2} modifiers.',
        $_lang_$$_class_expando               = '{0} cannot have expando instances.',
        $_lang_$$_class_export                = '{0} cannot be exported.',
        $_lang_$$_class_global_conflict       = '{0} cannot hide the existing global "{1}".',
        $_lang_$$_class_inherit_conflict      = '{0} cannot inherit from {1}.',
        $_lang_$$_class_inherit_expando       = '{0} must have the expando modifier to inherit from an expando {0}.',
        $_lang_$$_class_inherit_import        = '{0} must have a precompiled string to inherit from an imported {0}.',
        $_lang_$$_class_inherit_internal      = '{0} must have the internal modifier to inherit from an internal {0}.',
        $_lang_$$_class_inherit_invalid       = '{0} cannot have inheritance.',
        $_lang_$$_class_inherit_locked        = '{0} must inherit from an unlocked {0} to have the unlocked modifier.',
        $_lang_$$_class_inherit_nonexpando    = '{0} must inherit from an expando {0} to have the expando modifier.',
        $_lang_$$_class_inherit_nonimport     = '{0} must inherit from an imported {0} to have a precompiled string.',
        $_lang_$$_class_inherit_sealed        = '{0} cannot inherit from a sealed {1}.',
        $_lang_$$_class_inherit_unlocked      = '{0} must have the unlocked modifier to inherit from an unlocked {0}.',
        $_lang_$$_class_inherit_unoptimized   = '{0} must inherit from an optimized {0} to have the optimized modifier.',
        $_lang_$$_class_inherit_unsafe        = '{0} cannot inherit from a .NET class.',
        $_lang_$$_class_keyword_duplicate     = 'class cannot have a duplicate {0} modifier.',
        $_lang_$$_class_keyword_invalid       = '"{0}" is not a valid class modifier.',
        $_lang_$$_class_name_invalid          = '"{0}" is not a valid class name.',
        $_lang_$$_class_this_new              = 'classes cannot be compiled using the new operator.',
        $_lang_$$_conflict_and                = '"{0}" cannot have the {1} and {2} modifiers.',
        $_lang_$$_conflict_constraint         = '"{0}" must be a field or automatically implemented property to have the "{1}" type constraint.',
        $_lang_$$_const_constraint            = '"{0}" cannot have a type constraint with the const modifier.',
        $_lang_$$_constraint_invalid          = '"{0}" has an invalid type constraint "{1}".',
        $_lang_$$_constraint_invalid_generic  = '"{1}" is not a valid type constraint.',
        $_lang_$$_constraint_invalid_value    = '"{0}" must have a value of the type {1}.',
        $_lang_$$_constraint_primitive        = '"{0}" cannot have a non-primitive type constraint "{1}" because it is a {2}.',
        $_lang_$$_context_generic             = '"{0}" is not generic and must be accessed on an instance.',
        $_lang_$$_keyword_duplicate           = '"{0}" cannot have a duplicate {1} modifier.',
        $_lang_$$_keyword_invalid             = '"{0}" has an invalid modifier "{1}".',
        $_lang_$$_name_duplicate              = '"{0}" cannot have more than one {1}definition.',
        $_lang_$$_name_invalid                = '"{0}" is not a valid name.',
        $_lang_$$_name_reserved               = '"{0}" is a reserved name.',
        $_lang_$$_new_invalid                 = '"{0}" must hide an inherited {1}definition to have the new modifier.',
        $_lang_$$_new_required                = '"{0}" cannot hide an inherited {1}definition without the new modifier.',
        $_lang_$$_override_constraint         = '"{0}" must have the "{1}" type constraint to override.',
        $_lang_$$_override_invalid            = '"{0}" has no suitable {1} to override.',
        $_lang_$$_override_required           = '"{0}" must implement the inherited abstract {1} with the override modifier.',
        $_lang_$$_package_constraint          = '"{0}" has an invalid type constraint "{1}".',
        $_lang_$$_package_modifiers           = '"{0}" cannot have modifiers because it is a packaged definition.',
        $_lang_$$_package_separated           = '"{0}" cannot be a packaged definition because it is defined in a {1} definitions object.',
        $_lang_$$_primitive_constraint        = '"{0}" must have a primitive type constraint in a primitive {1}.',
        $_lang_$$_property_access_accessor    = '"{0}" must have both accessors to have an access modifier on the {1} accessor.',
        $_lang_$$_property_access_conflict    = '"{0}" cannot have the {2} modifier on the {1} accessor in a {3}.',
        $_lang_$$_property_access_duplicate   = '"{0}" cannot have access modifiers on both property accessors.',
        $_lang_$$_property_access_invalid     = '"{0}" has an invalid access modifier "{2}" on the {1} accessor.',
        $_lang_$$_property_access_restrictive = '"{0}" must have a more restrictive access modifier on the {1} accessor.',
        $_lang_$$_property_name_duplicate     = '"{0}" cannot have more than one definition for the {1} accessor.',
        $_lang_$$_property_name_empty         = '"{0}" must have at least one property accessor.',
        $_lang_$$_property_name_invalid       = '"{0}" cannot have a "{1}" property accessor.',
        $_lang_$$_property_override_invalid   = '"{0}" has no suitable {1} accessor to override.',
        $_lang_$$_property_private_abstract   = '"{0}" cannot have a private {1} accessor because it is abstract.',
        $_lang_$$_property_private_override   = '"{0}" cannot override a private {1} accessor.',
        $_lang_$$_property_readonly_invalid   = '"{0}" must have both accessors to have the readonly modifier.',
        $_lang_$$_property_value_abstract     = '"{0}" must have a either a null or undefined reference or a function for the {1} accessor.',
        $_lang_$$_property_value_function     = '"{0}" must have a function for the {1} accessor.',
        $_lang_$$_readonly_data               = '"{0}" cannot be set because it is a read-only {1}.',
        $_lang_$$_readonly_invalid            = '"{0}" cannot have the readonly modifier because it is a {1} definition.',
        $_lang_$$_readonly_invalid_type       = '"{0}" must be a field or property to have the readonly modifier.',
        $_lang_$$_readonly_set                = '"{0}" must implement a set accessor to have the readonly modifier.',
        $_lang_$$_requires                    = '"{0}" cannot have the {1} modifier without the {2} modifier.',
        $_lang_$$_requires_or                 = '"{0}" cannot have the {1} modifier without the {2} or {3} modifiers.',
        $_lang_$$_virtual_invalid             = '"{0}" cannot have the abstract, virtual, or override modifiers because it is a {1} definition.',
        $_lang_$$_virtual_invalid_type        = '"{0}" must be a method or property to have the abstract, virtual, or override modifiers.',
        $_lang_$$_virtual_sealed              = '"{0}" cannot have the virtual modifier in a sealed {1}.';

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
        $__date_now__      = $__date.now,
        $__date_parse__    = $__date.parse,
        $__date_utc__      = $__date.UTC,
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
        $__regexp            =  RegExp,
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
        
        // ---------- HARMONY ----------
        $__proxy  = null,
        $__symbol = null;

    // If any of the ECMAScript 5 native code methods are not found, throw an exception
    if (!$__create || !$__defineProperty || !$__freeze || !$__getPrototypeOf || !$__preventExtensions || !$__seal || !$__array_isArray || !$__arrayProto__.forEach || !$__arrayProto__.indexOf || !$__stringProto__.trim)
        throw new $__error($_lang_compatibility + $_lang_exception_suffix);

    // If a window type is defined
    if (typeof Window != 'undefined' && Window != null && Window.prototype != null)
    {
        // Set the native window references
        $__window            = Window;
        $__windowProto__     = $__window.prototype;
        $__window_toString__ = $__windowProto__.toString;
    }

    // If the harmony flag is set
    if ($_harmony)
    {
        // If a proxy type is defined
        if (typeof Proxy == 'function')
        {
            // Test if proxies are supported
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
                }
            })();
        }

        // If a symbol type is defined
        if (typeof Symbol == 'function')
        {
            // Test if symbols are supported
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
                }
            })();
        }
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

    // ########## NAMESPACE ##########

    // Create the window reference
    var $_window = window ?
                   window :
                   this;

    // If the window reference is either null or undefined, create a unique reference
    if ($_window == null)
        $_window = {};

    // Create the global namespace reference
    var $$ = null;

    // ##########################
    // ########## CORE ##########
    // ##########################

    // ########## CONSTANTS ##########

    // Create the internal constants
    var $_const_date_max                = 8640000000000000,
        $_const_date_min                = -$_const_date_max,
        $_const_escape_replace          = '\\$&',
        $_const_escape_search           = /[-\/\\^$*+?.()|[\]{}]/g,
//      $_const_factory_arguments       = 'c,k,f,m,a,d,d2,p,l',
        $_const_float_epsilon           = 2.220460492503130808472633361816E-16,
        $_const_float_max               = $__number_maxValue__,
        $_const_float_min               = -$_const_float_max,
        $_const_format_search           = /([\{]+)([0-9]+)\}/g,
        $_const_hash_class              = 6,
        $_const_hash_symbol             = 12,
        $_const_int_max                 = 9007199254740992,
        $_const_int_min                 = -$_const_int_max,
        $_const_int32_max               = 2147483647,
        $_const_int32_min               = -$_const_int32_max - 1,
        $_const_keyword_abstract        = 'abstract',
        $_const_keyword_class           = 'class',
        $_const_keyword_classes         = $_const_keyword_class + 'es',
        $_const_keyword_const           = 'const',
        $_const_keyword_field           = 'field',
        $_const_keyword_get             = 'get',
        $_const_keyword_hidden          = 'hidden',
        $_const_keyword_method          = 'method',
        $_const_keyword_model           = 'model',
        $_const_keyword_models          = $_const_keyword_model + 's',
        $_const_keyword_new             = 'new',
        $_const_keyword_optimized       = 'optimized',
        $_const_keyword_override        = 'override',
        $_const_keyword_private         = 'private',
        $_const_keyword_property        = 'property',
        $_const_keyword_protected       = 'protected',
        $_const_keyword_prototype       = 'prototype',
        $_const_keyword_public          = 'public',
        $_const_keyword_sealed          = 'sealed',
        $_const_keyword_set             = 'set',
        $_const_keyword_static          = 'static',
        $_const_keyword_struct          = 'struct',
        $_const_keyword_structs         = $_const_keyword_struct + 's',
        $_const_keyword_unlocked        = 'unlocked',
        $_const_keyword_virtual         = 'virtual',
        $_const_keyword_visible         = 'visible',
//      $_const_prefix_factory          = '~jT_',
        $_const_prefix_symbol           = '$jT_',
        $_const_regexp_class            = /^[A-Z][_a-zA-Z0-9]*$/,
        $_const_regexp_constraint       = /^(~|@)?([a-z]+(?:\-[a-z]+)?)(\?|\!)?$/,
        $_const_regexp_constraint_class = /^(@)?([A-Z][_a-zA-Z0-9]*)(\?|\!)?$/,
        $_const_regexp_hex              = /^[-+]?0x[0-9a-f]+$/i,
        $_const_regexp_instance         = /^[_\$a-z][_\$a-z0-9]*$/i,
        $_const_regexp_number           = /^[-+]?[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?$/i,
        $_const_regexp_regexp           = /^\/([^\r\n]+)\/([gim]{0,3})$/,
        $_const_types                   = 'Array Boolean Date Error Function Number RegExp String'.split(' '),
        $_const_types_window            = 'global Window DOMWindow'.split(' ');

    // If the harmony flag is set, push the symbol type into the internal JavaScript types array
    if ($_harmony)
        $_const_types.push('Symbol');
    
    // ---------- CACHES ----------

    // Create the cache indices
    var $_cache_class       = 0,
        $_cache_constructor = 1,
//      $_cache_dump        = 7,
        $_cache_private     = 2,
        $_cache_protected   = 3,
        $_cache_public      = 4,
        $_cache_prototype   = 5,
        $_cache_static      = 6,
        
        // Create the length
        $_cache__length = 8,
        
        // Create the cache symbols indices
        $_cache_symbols_base      = 11,
        $_cache_symbols_construct = 12,
        $_cache_symbols_defaults  = 14,
        $_cache_symbols_private   = 8,
      //$_cache_symbols_protected = 9,
        $_cache_symbols_public    = 10,
        $_cache_symbols_root      = 13,
        
        // Create the symbols length
        $_cache_symbols__length = 15;

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

    // If the harmony flag is set, set the native symbol constraint flags in the constraints lookup
    if ($_harmony)
        $_constraints['symbol'] = $_constraints_null | $_constraints_suppress;

    // ---------- DEFINITIONS ----------

    // Create the definition indices
    var $_definition_constraint = 3,// @
        $_definition_modifiers  = 2,// @
        $_definition_name       = 0,// @
        $_definition_type       = 4,// @
        $_definition_value      = 1,// @
        
        // Create the length
        $_definition__length = 5;

    // ---------- DIRECTIVES ----------

    // Create the directive indices
    var $_directive_filter       = 3,
        $_directive_inherits     = 4,
        $_directive_instructions = 2,
        $_directive_name         = 0,
        $_directive_value        = 1,
        
        // Create the length
        $_directive__length = 5;

    // ---------- INJECTIONS ----------

    // Create the injection offsets
    var $_inject_private   = 0,// @
        $_inject_protected = 1,// @
        $_inject_prototype = 2,// @
        $_inject_public    = 3,// @
        $_inject_static    = 4;// @

    // ---------- INSTANCES ----------

    // Create the instance indices
    var $_instance_base      = 3,
        $_instance_construct = 4,
        $_instance_private   = 0,
        $_instance_protected = 1,
        $_instance_public    = 2;

    // ---------- INSTRUCTIONS ----------

    // Create the instruction bits
    var $_instructions_base                = 1 << 0,
        $_instructions_configurable        = 1 << 1,
        $_instructions_data                = 1 << 2,
        $_instructions_data_readonly       = 1 << 3,
        $_instructions_enumerable          = 1 << 4,
        $_instructions_get                 = 1 << 5,
        $_instructions_private             = 1 << 6,
        $_instructions_private_get         = 1 << 7,
        $_instructions_private_set         = 1 << 8,
        $_instructions_protected           = 1 << 9,
        $_instructions_protected_get       = 1 << 10,
        $_instructions_protected_set       = 1 << 11,
        $_instructions_public              = 1 << 12,
        $_instructions_set                 = 1 << 13,
        $_instructions_this                = 1 << 14,
        $_instructions_value               = 1 << 15,
        $_instructions_writable            = 1 << 16,

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
        $_modifiers_injection = 1 << 5, // @
      //$_modifiers_internal  = 1 << 6, // @
        $_modifiers_method    = 1 << 7, // @
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
        $_modifiers_class_export    = 1 << 2, // @
        $_modifiers_class_global    = 1 << 3, // @
        $_modifiers_class_import    = 1 << 4, // @
        $_modifiers_class_internal  = 1 << 5, // @
        $_modifiers_class_model     = 1 << 6, // @
        $_modifiers_class_optimized = 1 << 7, // @
        $_modifiers_class_primitive = 1 << 8, // @
        $_modifiers_class_sealed    = 1 << 9, // @
        $_modifiers_class_struct    = 1 << 10,// @
        $_modifiers_class_unlocked  = 1 << 11,// @
        $_modifiers_class_unsafe    = 1 << 12;// @
    
    // Set the class modifiers in the class modifiers map
    $_modifiers_class['abstract']  = $_modifiers_class_abstract;
    $_modifiers_class['expando']   = $_modifiers_class_expando;
//  $_modifiers_class['export']    = $_modifiers_class_export;
    $_modifiers_class['internal']  = $_modifiers_class_internal;
    $_modifiers_class['model']     = $_modifiers_class_model;
    $_modifiers_class['optimized'] = $_modifiers_class_optimized;
    $_modifiers_class['primitive'] = $_modifiers_class_primitive;
    $_modifiers_class['sealed']    = $_modifiers_class_sealed;
    $_modifiers_class['struct']    = $_modifiers_class_struct;
    $_modifiers_class['unlocked']  = $_modifiers_class_unlocked;

    // ---------- .NET ----------

    // Create the unsafe token (for jTypes.NET client classes)
    var $_unsafe = '';// @

    // ########## VARIABLES ##########

    // Create the internal variables
    var $_clone   = false,
        $_filters = $__create(null),
        $_globals = $__create(null),
        $_name    = '';

    // ---------- LOCKS ----------

    // Create the internal lock references
    var $_lock_class     = null,
        $_lock_instances = null,
        $_lock_package   = null;

    // ########## DEFINES ##########

    // Create the helper functions
    var $_accessor = function($object, $key, $get, $set, $enumerable, $configurable)
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
    var $_data     = function($object, $key, $value, $writable, $enumerable, $configurable)
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
    var $_lock     = function($object)
    {
        // Return the function lock
        return function($lock)
        {
            // If this function was internally unlocked, return the object reference
            if ($lock === $_lock)
                return $object;
        };
    };

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

    // Create the exception helper functions
    var $_exception          = function($message)
    {
        // Get the class name
        var $name = $_name;

        // Format the error message
        $message = typeof $message == 'string' ?
                   $message[0].toUpperCase() + $message.substr(1) :
                   '';

        // If a class name is not set, throw the formatted exception string
        if (!$name)
            throw new $__error($message + $_lang_exception_suffix);

        // Reset the class name
        $_name = '';
        
        // Throw the class-formatted exception string
        throw new $__error($message + $$.format($_lang_exception_suffix_class, $name));
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

        // Throw the formatted arguments exception string
        throw new $__error($$.format($_lang_exception_arguments, $name, $types.join(', ')) + $_lang_exception_suffix);
    };
    var $_exceptionFormat    = function()
    {
        // Throw the formatted exception string
        $_exception($$.format.apply($$, arguments));
    };

    // ########## HASHES ##########

    // Create the characters string and hashes object
    var $_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        $_hashes     = $__create(null);// $_const_factory_arguments

    // Append the lowercase characters to the characters string
    $_characters += $_characters.toLowerCase();

    // Create the generator helper function
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
                $hash += $_characters[$__floor($j * $__random())];
        }
        // Continue if the hash was already found in the hashes object
        while ($_hashes[$hash]);

        // Set the hash in the hashes object
        $_hashes[$hash] = $hash;

        // Return the hash
        return $hash;
    };

    // ---------- PRECOMPILES ----------

    // Create the precompile obfuscated variable names
//  var $_precompile_dump       = $_generator(1),
//      $_precompile_injections = $_generator(1),
//      $_precompile_matrix     = $_generator(1),
//      $_precompile_null       = $_generator(1),
//      $_precompile_readonly   = $_generator(1),
//      $_precompile_reference  = $_generator(1);

    // ---------- SYMBOLS ----------

    // Create the symbol helper function
    var $_symbolBuilder   = function()
    {
        // If symbols are supported, return a symbol
        if ($__symbol)
            return $__symbol();
    };
    var $_symbolGenerator = function($name)
    {
        // If symbols are not being emulated
        if ($__symbol !== $_symbolGenerator)
        {
            // If symbols are supported, return a symbol
            if ($__symbol)
                return $__symbol();
        }
        // Return the generated symbol hash with the prepended symbol-prefix
        else
            return $_const_prefix_symbol + $_generator($_const_hash_symbol);

        // If the minify flag is not set and a name was provided, return the symbol-prefixed name
        if (!$_minify && $name)
            return $_const_prefix_symbol + $name;

        // Return the generated hash with the prepended symbol-prefix
        return $_const_prefix_symbol + $_generator();
    };

    // If symbols are not supported, the harmony flag is set, and the global harmony unsafe flag is set, expose symbols as strings
    if (!$__symbol && $_harmony && $_harmonyUnsafe)
        $__symbol = $_symbolGenerator;

    // Create the obfuscated symbol hashes
//  var $_symbol_factory   = $_symbolGenerator('factory');
    var $_symbol_internal  = $_symbolGenerator('internal'),
        $_symbol_lock      = $_symbolGenerator('lock'),
        $_symbol_metaclass = $_symbolGenerator('metaclass'),
        $_symbol_modifiers = $_symbolGenerator('modifiers'),
        $_symbol_name      = $_symbolGenerator('name'),

        // Create the optimized symbols
        $_symbol_class         = $_symbolBuilder(),
        $_symbol_data          = $_symbolBuilder(),
        $_symbol_data_readonly = $_symbolBuilder(),
        $_symbol_instance      = $_symbolBuilder(),
        $_symbol_package       = $_symbolBuilder();

    // ---------- FILTERS ----------

    // Create the filter symbol hashes
    var $_filter_async_global = $_symbolGenerator('global'),
        $_filter_async_model  = $_symbolGenerator('model'),
        $_filter_async_struct = $_symbolGenerator('struct'),
        $_filter_cast         = $_symbolGenerator('cast'),
        $_filter_constraint   = $_symbolGenerator('constraint'),
        $_filter_default      = $_symbolGenerator('default'),
        $_filter_native       = $_symbolGenerator('native'),
        $_filter_null         = $_symbolGenerator('null'),
        $_filter_suppress     = $_symbolGenerator('suppress'),
        $_filter_type         = $_symbolGenerator('type');

    // ---------- PACKAGES ----------

    // Create the package indices
    var $_package_constraint = 2,
        $_package_modifiers  = 1,
        $_package_value      = 0,
        
        // Create the length
        $_package__length = 3;

    // If symbols are supported
    if ($__symbol)
    {
        // Create the package symbols
        $_package_constraint = $__symbol();
        $_package_modifiers  = $__symbol();
        $_package_value      = $__symbol();
    }
    
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

    // Define the "toString()" methods on the base class of all classes and the base prototype of all class prototypes
    $_data($_class,     'toString', $_class_toString);
    $_data($_prototype, 'toString', $_prototype_toString);

    // Set the base class of all classes prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
    $_class.prototype = $_prototype;

    // Freeze the base class of all classes
    $__freeze($_class);

    // If the global prototype lock flag was set, freeze the base prototype of all class prototypes
    if ($_protoLock)
        $__freeze($_prototype)

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
    var $_lockSymbolsInstance = function($instances, $private, $protected, $public, $base, $constructor)
    {
        // Create the descriptor
        var $descriptor = { 'value': function()
        {
            // Set the internal lock reference to the instances array
            $_lock_instances = $instances;
        } };

        // Define the lock function on the private, protected, and public instances
        $__defineProperty($private,   $_symbol_lock, $descriptor);
        $__defineProperty($protected, $_symbol_lock, $descriptor);
        $__defineProperty($public,    $_symbol_lock, $descriptor);

        // If a base instance was provided, define the lock function on it
        if ($base)
            $__defineProperty($base, $_symbol_lock, $descriptor);

        // If a constructor instance was provided, define the lock function on it
        if ($constructor)
            $__defineProperty($constructor, $_symbol_lock, $descriptor);
    };
    var $_lockSymbolsPackage  = function($package)
    {
        // Define the lock function on the package
        $__defineProperty($package, $_symbol_lock, { 'value': function()
        {
            // Set the internal lock reference to the package
            $_lock_package = $package;
        } });
    };

    // If symbols are supported
    if ($__symbol)
    {
        // Create symbols helper functions that utilize symbols
        $_lockSymbolsClass    = function($class)
        {
            // Set the class symbol on the class
            $class[$_symbol_class] = $class;
        };
        $_lockSymbolsInstance = function($instances, $private, $protected, $public, $base, $constructor)
        {
            // Set the instance symbol on the private, protected, and public instances
            $private  [$_symbol_instance] = $private;
            $protected[$_symbol_instance] = $protected;
            $public   [$_symbol_instance] = $public;

            // If a base instance was provided, set the instance symbol on it
            if ($base)
                $base[$_symbol_instance] = $base;

            // If a constructor instance was provided, set the instance symbol on it
            if ($constructor)
                $constructor[$_symbol_instance] = $constructor;
        };
        $_lockSymbolsPackage  = function($package)
        {
            // Set the package symbol on the package
            $package[$_symbol_package] = $package;
        };
    }

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

        // Return true if the instance matches either the private, protected, public, or base instances
        return $instance === $_lock_instances[$_instance_private] || $instance === $_lock_instances[$_instance_protected] || $instance === $_lock_instances[$_instance_public] || $instance === $_lock_instances[$_instance_base] || $instance === $_lock_instances[$_instance_construct];
    };
    var $_unlockSymbolsPackage  = function($package)
    {
        // Get the package lock
        var $lock = $package[$_symbol_lock];

        // If the lock is not a function, return false
        if (typeof $lock != 'function')
            return false;

        // Reset the package lock reference
        $_lock_package = null;

        // Call the lock function
        $lock();

        // If the package lock reference was not set, return false
        if (!$_lock_package)
            return false;

        // Return true if the package matches the package lock reference
        return $package === $_lock_package;
    };

    // If symbols are supported
    if ($__symbol)
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
        $_unlockSymbolsPackage  = function($package)
        {
            // Return true if the package symbol is set on the package
            return $package[$_symbol_package] === $package;
        };
    }

    // ########## NAMESPACE ##########

    // Create the compiler
    $$ = function()
    {
        // If the new operator was used, throw an exception
        if (this instanceof $$)
            $_exception($_lang_$$_class_this_new);

        // Create the initial arguments
        var $argument    = 0,
            $base        = null,
            $constructor = arguments[$argument++],
            $modifiers   = '',
            $prototype   = null;

        // If the constructor is not a simple object
        if ($constructor == null || typeof $constructor != 'object' || $__getPrototypeOf($constructor) !== $__objectProto__)
        {
            // Get the prototype
            $prototype = arguments[$argument++];

            // If the constructor is not a function
            if (typeof $constructor != 'function')
            {
                // If the constructor is not a string, throw an exception
                if (typeof $constructor != 'string')
                    $_exceptionArguments(null, arguments);

                // Use the first argument as the modifiers string
                $modifiers = $constructor;

                // If the prototype is a class
                if (typeof $prototype == 'function' && $_unlockSymbolsClass($prototype))
                {
                    // Use the second argument as the base class
                    $base        = $prototype;
                    $constructor = arguments[$argument++];
                }
                // Use the second argument as the constructor
                else
                    $constructor = $prototype;

                // If the constructor is not a function or is a class
                if (typeof $constructor != 'function' || $_unlockSymbolsClass($constructor))
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

        // Create the class name
        var $name = '';

        // If a modifiers string was provided
        if ($modifiers)
        {
            // Create the base class name
            var $baseName = null;

            // If a base class was not provided and the modifiers string contains the extends character
            if (!$base && $modifiers.indexOf(':') >= 0)
            {
                // Break the modifiers string at the extends character
                $modifiers = $modifiers.split(':');

                // If the extends character was provided more than once, throw an exception
                if ($modifiers.length != 2)
                    $_exceptionFormat($_lang_$$_class_keyword_duplicate, '":"');
                
                // Get the base class name and modifiers string
                $baseName  = $modifiers[1].trim();
                $modifiers = $modifiers[0].trim();

                // If a base class name was not provided, throw an exception
                if (!$baseName)
                    $_exceptionFormat($_lang_$$_class_keyword_invalid, ':');

                // If the base class name is not a valid class name, throw an exception
                if (!$_const_regexp_class.test($baseName))
                    $_exceptionFormat($_lang_$$_class_name_invalid, $baseName);
                
                // Get the base class from the globals object
                $base = $_globals[$baseName];

                // If a base class was not found in the globals object, throw an exception
                if (!$base)
                    $_exceptionFormat($_lang_$$_class_base_invalid, $baseName);
            }

            // Create the keywords array
            var $keywords = $modifiers.trim().split(' ');

            // Reset the modifiers
            $modifiers = 0;

            for (var $i = 0, $j = $keywords.length; $i < $j; $i++)
            {
                // Get the current keyword and the corresponding class modifier for the keyword
                var $keyword  = $keywords[$i],
                    $modifier = $_modifiers_class[$keyword];

                // If no keyword was provided, skip it
                if (!$keyword)
                    continue;

                // If no class modifier was found
                if (!$modifier)
                {
                    // If the keyword is not the unsafe token
                    if (!$_unsafe || $keyword != $_unsafe)
                    {
                        // If the keyword is not the last keyword in the keywords array, throw an exception
                        if ($i != $j - 1)
                            $_exceptionFormat($_lang_$$_class_keyword_invalid, $keyword);

                        // If the keyword is not a valid class name, throw an exception
                        if (!$_const_regexp_class.test($keyword))
                            $_exceptionFormat($baseName ?
                                              $_lang_$$_class_name_invalid :
                                              $_lang_$$_class_keyword_invalid,
                                              $keyword);

                        // Set the class name
                        $name = $keyword;
                    }
                    // Set the unsafe modifier in the modifiers
                    else
                        $modifiers |= $_modifiers_class_unsafe;
                }
                else
                {
                    // If the class modifier was already defined in the modifiers, throw an exception
                    if ($modifiers & $modifier)
                        $_exceptionFormat($_lang_$$_class_keyword_duplicate, $keyword);

                    // Set the class modifier in the modifiers
                    $modifiers |= $modifier;
                }
            }

            // If a class name was provided
            if ($name)
            {
                // Set the global modifier
                $modifiers |= $_modifiers_class_global;

                // Set the exception class name
                $_name = $name;
            }
            // If a base class was provided in the modifiers string, throw an exception
            else if ($baseName)
                $_exceptionFormat($_lang_$$_class_keyword_invalid, ':');
        }
        // Reset the modifiers
        else
            $modifiers = 0;

        // If no class name was provided, create a randomly generated class name
        if (!$name)
            $name = $_const_prefix_symbol + $_generator($_const_hash_class);

        // Create the iterated modifier flags
        var $abstract  = !!($modifiers & $_modifiers_class_abstract),
            $expando   = !!($modifiers & $_modifiers_class_expando),
            $import    = !!($modifiers & $_modifiers_class_import),
            $model     = !!($modifiers & $_modifiers_class_model),
            $optimized = !!($modifiers & $_modifiers_class_optimized),
            $primitive = !!($modifiers & $_modifiers_class_primitive),
            $sealed    = !!($modifiers & $_modifiers_class_sealed),
            $struct    = !!($modifiers & $_modifiers_class_struct);

        // If the class is either a model or a struct
        if ($model || $struct)
        {
            // If the model and struct modifiers were provided, throw an exception
            if ($model && $struct)
                $_exceptionFormat($_lang_$$_class_conflict_and, $_const_keyword_classes, $_const_keyword_model, $_const_keyword_struct);

            // If the class is abstract, throw an exception
            if ($abstract)
                $_exceptionFormat($_lang_$$_class_conflict_abstract,
                                  $_const_keyword_classes,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_struct);

            // If the struct modifier was provided
            if ($struct)
            {
                // If the struct has the sealed modifier, throw an exception
                if ($sealed)
                    $_exceptionFormat($_lang_$$_class_conflict, $_const_keyword_structs, $_const_keyword_sealed);

                // If the struct has the unlocked modifier, throw an exception
                if ($modifiers & $_modifiers_class_unlocked)
                    $_exceptionFormat($_lang_$$_class_conflict, $_const_keyword_structs, $_const_keyword_unlocked);

                // If the struct has the optimized modifier, throw an exception
                if ($optimized)
                    $_exceptionFormat($_lang_$$_class_conflict, $_const_keyword_structs, $_const_keyword_optimized);
            }

            // If the expando modifier was provided, throw an exception
            if ($modifiers & $_modifiers_class_expando)
                $_exceptionFormat($_lang_$$_class_expando,
                                  $model ?
                                  $_const_keyword_models :
                                  $_const_keyword_structs);

            // If the export modifier was provided, throw an exception
            if ($modifiers & $_modifiers_class_export)
                $_exceptionFormat($_lang_$$_class_export,
                                  $model ?
                                  $_const_keyword_models :
                                  $_const_keyword_structs);
        }
        // If the class is abstract and sealed, throw an exception
        else if ($abstract && $sealed)
            $_exceptionFormat($_lang_$$_class_conflict_abstract, $_const_keyword_classes, $_const_keyword_sealed);

        // If a class name was provided and it is already defined in the global namespace, throw an exception
        if ($modifiers & $_modifiers_class_global && $__hasOwnProperty__.call($$, $name))
            $_exceptionFormat($_lang_$$_class_global_conflict,
                              $model ?
                              $_const_keyword_model :
                              $struct ?
                              $_const_keyword_struct :
                              $_const_keyword_class,
                              $name);

        // Create the cache, internal index, and metadata
        var $cache      = new $__array($__symbol ? $_cache_symbols__length : $_cache__length),
            $internal   = -1,
            $metaclass  = null,
            $metalength = 1;
        
        // Set the cache constructor
        $cache[$_cache_constructor] = $constructor;

        // If the class has the import modifier or is optimized, create the dump object in the cache
//      if ($import || $optimized)
//          $cache[$_cache_dump] = $__create(null);

        // If symbols are supported
        if ($__symbol)
        {
            // Create the base, construct, private, protected, and public data symbols
            $cache[$_cache_symbols_base]      = $__symbol();
            $cache[$_cache_symbols_construct] = $__symbol();
            $cache[$_cache_symbols_private]   = $__symbol();
          //$cache[$_cache_symbols_protected] = $__symbol();
            $cache[$_cache_symbols_public]    = $__symbol();
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
                $_exceptionFormat($_lang_$$_class_inherit_invalid, $_const_keyword_structs);

            // Get the base metaclass and modifiers
            $baseMetaclass = $base[$_symbol_metaclass];
            $baseModifiers = $base[$_symbol_modifiers];

            // If symbols are not supported, unlock the base metaclass
            if (!$__symbol)
                $baseMetaclass = $baseMetaclass($_lock);

            // If the base class is a model
            if ($baseModifiers & $_modifiers_class_model)
            {
                // If the class is not a model, throw an exception
                if (!$model)
                    $_exceptionFormat($_lang_$$_class_inherit_conflict, $_const_keyword_classes, $_const_keyword_models);
            }
            // If the base class is a struct, throw an exception
            else if ($baseModifiers & $_modifiers_class_struct)
                $_exceptionFormat($_lang_$$_class_inherit_conflict,
                                  $model ?
                                  $_const_keyword_models :
                                  $_const_keyword_classes,
                                  $_const_keyword_structs);
            // If the class is a model, throw an exception
            else if ($model)
                $_exceptionFormat($_lang_$$_class_inherit_conflict, $_const_keyword_models, $_const_keyword_classes);

            // If the base class is sealed, throw an exception
            if ($baseModifiers & $_modifiers_class_sealed)
                $_exceptionFormat($_lang_$$_class_inherit_sealed,
                                  $model ?
                                  $_const_keyword_models :
                                  $_const_keyword_classes,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);

            // If the base class is unsafe and the class is not unsafe, throw an exception
            if ($baseModifiers & $_modifiers_class_unsafe && !($modifiers & $_modifiers_class_unsafe))
                $_exceptionFormat($_lang_$$_class_inherit_unsafe,
                                  $model ?
                                  $_const_keyword_models :
                                  $_const_keyword_classes);

            // If the base class is internal
            if ($baseModifiers & $_modifiers_class_internal)
            {
                // If the class is not internal, throw an exception
                if (!($modifiers & $_modifiers_class_internal))
                    $_exceptionFormat($_lang_$$_class_inherit_internal,
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
                    $_exceptionFormat($_lang_$$_class_inherit_unlocked,
                                      $model ?
                                      $_const_keyword_model :
                                      $_const_keyword_class);
            }
            // If the class is unlocked, throw an exception
            else if ($modifiers & $_modifiers_class_unlocked)
                $_exceptionFormat($_lang_$$_class_inherit_locked,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);

            // If the class is optimized and the base class is not optimized, throw an exception
            if ($optimized && !($baseModifiers & $_modifiers_class_optimized))
                $_exceptionFormat($_lang_$$_class_inherit_unoptimized,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);

            // If the base class is expando
            if ($baseModifiers & $_modifiers_class_expando)
            {
                // If the class is not expando, throw an exception
                if (!($modifiers & $_modifiers_class_expando))
                    $_exceptionFormat($_lang_$$_class_inherit_expando,
                                      $model ?
                                      $_const_keyword_model :
                                      $_const_keyword_class);
            }
            // If the class is expando, throw an exception
            else if ($modifiers & $_modifiers_class_expando)
                $_exceptionFormat($_lang_$$_class_inherit_nonexpando,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);

            // If the base class has the import modifier
            if ($baseModifiers & $_modifiers_class_import)
            {
                // If the class does not have the import modifier, throw an exception
                if (!$import)
                    $_exceptionFormat($_lang_$$_class_inherit_import,
                                      $model ?
                                      $_const_keyword_model :
                                      $_const_keyword_class);
            }
            // If the class does not have the import modifier
            else if (!$import)
            {
                // Create the cache definitions objects
                $cache[$_cache_public]    = $__create($baseMetaclass[0][$_cache_public]);
                $cache[$_cache_protected] = $__create($baseMetaclass[0][$_cache_protected]);
                $cache[$_cache_private]   = $__create($cache[$_cache_protected]);
            }
            // Throw an exception
            else
                $_exceptionFormat($_lang_$$_class_inherit_nonimport,
                                  $model ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);

            // Create the cache uncompiles
            $cache[$_cache_prototype] = $cachePrototype = $__create($baseMetaclass[0][$_cache_prototype]);
            $cache[$_cache_static]    = $cacheStatic    = $__create(null);

            // If symbols are supported
            if ($__symbol)
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

            // If the class does not have the import modifier
            if (!$import)
            {
                // Create the cache definitions objects
                $cache[$_cache_public]    = $__create(null);
                $cache[$_cache_protected] = $__create(null);
                $cache[$_cache_private]   = $__create($cache[$_cache_protected]);
            }

            // Create the cache uncompiles
            $cache[$_cache_prototype] = $cachePrototype = $__create(null);
            $cache[$_cache_static]    = $cacheStatic    = $__create(null);

            // If symbols are supported
            if ($__symbol)
            {
                // Create the defaults object and root data symbol
                $cache[$_cache_symbols_defaults] = $defaults = $__create(null);
                $cache[$_cache_symbols_root]     = $__symbol();
            }

            // Create the metaclass
            $metaclass = [$cache];
        }

        // If the argument count does not match the number of arguments
        if (arguments.length != $argument)
        {
            // If the next argument is not an array (or the unsafe modifier was not set)
            if (!($modifiers & $_modifiers_class_unsafe && $__array_isArray(arguments[$argument])))
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

                // If the prototype is a simple object, increment the argument count
                if ($prototype != null && typeof $prototype == 'object' && $__getPrototypeOf($prototype) === $__objectProto__)
                    $argument++;
                // Reset the prototype
                else
                    $prototype = null;

                // If the argument count does not match the number of arguments (and the unsafe modifier was not set), throw an exception
                if (arguments.length != $argument && !($modifiers & $_modifiers_class_unsafe))
                    $_exceptionArguments(null, arguments);

                // Compile the private definitions into the cache
                for (var $key in $prototypePrivate)
                    $_definitionsCompilerCache($cache, $abstract, $expando, $import, $model, $optimized, $primitive, $sealed, $struct, $key, $prototypePrivate[$key], $_const_keyword_private);

                // Compile the protected definitions into the cache
                for (var $key in $prototypeProtected)
                    $_definitionsCompilerCache($cache, $abstract, $expando, $import, $model, $optimized, $primitive, $sealed, $struct, $key, $prototypeProtected[$key], $_const_keyword_protected);

                // Compile the public definitions into the cache
                for (var $key in $prototypePublic)
                    $_definitionsCompilerCache($cache, $abstract, $expando, $import, $model, $optimized, $primitive, $sealed, $struct, $key, $prototypePublic[$key], $_const_keyword_public);
            }
        }

        // If a prototype was provided, compile the definitions into the cache
        if ($prototype)
            for (var $key in $prototype)
                $_definitionsCompilerCache($cache, $abstract, $expando, $import, $model, $optimized, $primitive, $sealed, $struct, $key, $prototype[$key]);

        // If any injections arguments were provided (and the unsafe modifier was set)
        if ($modifiers & $_modifiers_class_unsafe && arguments[$argument])
        {
            // Inject the definitions
            $_definitionsCompilerInjections($cache[$_cache_private],   null, arguments[$argument + $_inject_private]);
            $_definitionsCompilerInjections($cache[$_cache_protected], null, arguments[$argument + $_inject_protected]);
            $_definitionsCompilerInjections($cache[$_cache_public],    null, arguments[$argument + $_inject_public]);
            $_definitionsCompilerInjections($cache[$_cache_prototype], null, arguments[$argument + $_inject_prototype]);
            $_definitionsCompilerInjections($cache[$_cache_static],    null, arguments[$argument + $_inject_static]);
        }

        // If a base class was provided
        if ($base)
        {
            // If the class is not abstract and the base class is abstract (and the import modifier is not set)
            if (!$import && !$abstract && $baseModifiers & $_modifiers_class_abstract)
            {
                // Get the base and derived definitions
                var $definitionsBase    = $baseMetaclass[0][$_cache_protected],
                    $definitionsDerived = $cache[$_cache_protected];

                for (var $key in $definitionsBase)
                {
                    // Get the base definition and modifiers
                    var $baseDefinition = $definitionsBase[$key],
                        $baseModifiers  = $baseDefinition[$_definition_modifiers];

                    // If the base definition does not have the abstract modifier, skip it
                    if (!($baseModifiers & $_modifiers_abstract))
                        continue;

                    // If the base definition is the derived definition, throw an exception
                    if ($baseDefinition === $definitionsDerived[$key])
                        $_exceptionFormat($_lang_$$_class_abstract_override, $_const_keyword_class, $baseDefinition[$_definition_name], $baseDefinition[$_definition_type]);
                }
            }

            // Create the class prototype
            $prototype = $__create($base.prototype);
        }
        // Create the class prototype
        else
            $prototype = new $_class();

        var $merge        = 0,
            $metainstance = new $__array($__symbol ?
                                         $metalength :
                                         $metalength + 1),
            $overrides    = {};

        for (var $i = 0; $i < $metalength; $i++)
        {
            var $private       = $metaclass[$i][$_cache_private],
                $privateKeys   = $__keys($private),
                $protected     = $metaclass[$i][$_cache_protected],
                $protectedKeys = $__keys($protected),
                $directives    = new $__array($privateKeys.length + $protectedKeys.length);
            
            for (var $j = 0, $k = $privateKeys.length; $j < $k; $j++)
                if ($_definitionsCompilerDirective($directives, $overrides, $defaults, $primitive, $struct, $i, $j, $private[$privateKeys[$j]]))
                    $merge = $i + 1;

            for (var $j = 0, $k = $protectedKeys.length, $l = $privateKeys.length; $j < $k; $j++)
                if ($_definitionsCompilerDirective($directives, $overrides, $defaults, $primitive, $struct, $i, $j + $l, $protected[$protectedKeys[$j]]))
                    $merge = $i + 1;

            $metainstance[$i] = $directives;
        }

        // Create the class
        var $build = $__symbol ?
                        [] :
                        null,
            $class = $cache[$_cache_class] = !$__symbol ?
                                             $_buildRuntimeMatrix($metaclass, $metainstance, $metalength, $abstract, $import, $internal, $merge, $model, $optimized, false, $struct, !!($modifiers & $_modifiers_class_unlocked)) :
                                             $struct ?
                                             $_symbolsRuntimeStruct($metaclass, $metainstance, $build, $defaults, $constructor, $primitive) :
                                             $_symbolsRuntimeMatrix($metaclass, $metainstance, $metalength, $build, $defaults, $abstract, $model, $primitive);

        // Get the cache prototype and static keys
        var $cachePrototypeKeys = $__keys($cachePrototype),
            $cacheStaticKeys    = $__keys($cacheStatic);

        for (var $i = 0, $j = $cachePrototypeKeys.length; $i < $j; $i++)
            $_definitionsCompilerStatic($prototype, $cachePrototype[$cachePrototypeKeys[$i]]);

        // If a class name was provided, set the "toString()" method on the prototype
        if ($modifiers & $_modifiers_class_global)
            $_data($prototype, 'toString', $_definitionsCompilerToString($name));

        // Freeze the prototype
        $__freeze($prototype);

        for (var $i = 0, $j = $cacheStaticKeys.length; $i < $j; $i++)
            $_definitionsCompilerStatic($class, $cacheStatic[$cacheStaticKeys[$i]]);

        // Set the class metadata
        $_data($class, $_symbol_metaclass, $__symbol ? $metaclass : $_lock($metaclass));
        $_data($class, $_symbol_modifiers, $modifiers);
        $_data($class, $_symbol_name,      $name);

        if ($modifiers & $_modifiers_class_internal)
            $_data($class, $_symbol_internal, $internal);
        
        // Set the class prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
        $class.prototype = $prototype;

        // If a static "constructor()" definition was not provided, set the class constructor() reference
        if (!$__hasOwnProperty__.call($cache[$_cache_static], 'constructor'))
            $_data($class, 'constructor', $$);

        // If a static "toString()" definition was not provided, set the class toString() method
        if (!$__hasOwnProperty__.call($cache[$_cache_static], 'toString'))
            $_data($class, 'toString', $_class_toString);

        // Lock the class type
        $_lockSymbolsClass($class);

        // Prevent extensions on the class
        $__preventExtensions($class);

        if (!$abstract && $__symbol)
            $_symbolsCompilerGeneric($metaclass,
                                     $metainstance,
                                     $metalength,
                                     $build,
                                     $internal,
                                     $merge,
                                     $prototype,
                                     $struct,
                                     !!($modifiers & $_modifiers_class_unlocked),
                                     !($modifiers & $_modifiers_class_internal) ?
                                     $class :
                                     $internal < $metalength ?
                                     $metaclass[$internal][$_cache_class] :
                                     $_class);

        // If the class is global
        if ($modifiers & $_modifiers_class_global)
        {
            // Set the class in the globals object
            $_globals[$name] = $class;

            // Define the global class constant
            $_defineField($name, $class, false);

            // Reset the exception class name
            $_name = '';
        }

        // Return the class
        return $class;
    };

    // ########## PACKAGES ##########

    // Iterate the package types
    'private protected public prototype static'.split(' ').forEach(function($type)
    {
        // Create the package method
        var $method = function()
        {
            // Create the package
            var $package = $__symbol ?
                           {} :
                           new $__array($_package__length);

            switch (arguments.length)
            {
                case 1:

                    // Set the package data
                    $package[$_package_modifiers]  = $type;
                    $package[$_package_constraint] = '';
                    $package[$_package_value]      = arguments[0];

                    break;

                case 2:

                    // Get the modifiers string
                    var $modifiers = arguments[0];

                    // If the modifiers string is not a string primitive, throw an exception
                    if (typeof $modifiers != 'string')
                        $_exceptionArguments($type, arguments);

                    // Trim the modifiers
                    $modifiers = $modifiers.trim();

                    // Set the package data
                    $package[$_package_modifiers]  = $modifiers ? $type + ' ' + $modifiers : $type;
                    $package[$_package_constraint] = '';
                    $package[$_package_value]      = arguments[1];

                    break;

                case 3:

                    // Get the modifiers string and type constraint
                    var $modifiers  = arguments[0];
                    var $constraint = arguments[1];

                    // If the modifiers string is not a string primitive, throw an exception
                    if (typeof $modifiers != 'string')
                        $_exceptionArguments($type, arguments);

                    // Trim the modifiers
                    $modifiers = $modifiers.trim();

                    // If the constraint is a class
                    if (typeof $constraint == 'function' && $_unlockSymbolsClass($constraint))
                    {
                        // Get the class name
                        var $name = $constraint[$_symbol_name];

                        // If the class is not found in the globals object, set it in the globals object
                        if (!$_globals[$name])
                            $_globals[$name] = $constraint;
                    }
                    // If the constraint is a string primitive, trim it
                    else if (typeof $constraint == 'string')
                        $constraint = $constraint.trim();
                    // Throw an exception
                    else
                        $_exceptionArguments($type, arguments);

                    // Set the package data
                    $package[$_package_modifiers]  = $modifiers ? $type + ' ' + $modifiers : $type;
                    $package[$_package_constraint] = $constraint;
                    $package[$_package_value]      = arguments[2];

                    break;

                default:

                    // Throw an exception
                    $_exceptionArguments($type, arguments);
            }

            // If symbols are not supported, create the package lock
            if (!$__symbol)
                $package = $_lock($package);

            // Lock the package type
            $_lockSymbolsPackage($package);

            // Return package
            return $package;
        };

        // If the package type is "prototype", set the package method initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
        if ($type == 'prototype')
            $$.prototype = $method;

        // Define the package method
        $_defineMethod($type, $method);
    });

    // ########## EXPORTS ##########

    // Define the "toString()" method
    $_defineMethod('toString', function()
    {
        // Return the global namespace type string
        return '[object jTypes]';
    });

    // Define the version constant
    $_defineField('version', $_version, false);

    // Define the global class and prototype constants
    $_defineField('__class', $_class,     false);
    $_defineField('__proto', $_prototype, false);

    // Define the date constants
    $_defineField('dateMax', $__preventExtensions(new $__date($_const_date_max)), false);
    $_defineField('dateMin', $__preventExtensions(new $__date($_const_date_min)), false);

    // Define the numeric constants
    $_defineField('epsilon',  $_const_float_epsilon, false);
    $_defineField('intMax',   $_const_int_max,       false);
    $_defineField('intMin',   $_const_int_min,       false);
    $_defineField('max',      $_const_float_max,     false);
    $_defineField('min',      $_const_float_min,     false);

    // ########## TYPES ##########

    // Create the internal types lookup
    var $_types = $__create(null);

    // Create the checking methods
    var $$_isClass     = function($object)
    {
        // Return true if the object is a function and is a class
        return typeof $object == 'function' && $_unlockSymbolsClass($object);
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
        return $object != null && $_unlockSymbolsInstance($object);
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
        return $__isFinite($number) && $number <= $_const_int_max && $number >= $_const_int_min && $number == $__floor($number);
    };
    var $$_isPrimitive = function($object)
    {
        // If the object is a null reference or undefined, return true
        if ($object == null)
            return true;

        // Get the internal type of the object
        var $typeof = typeof $object;

        // Return true if the object is a boolean, number, or string primitive
        return $typeof == 'boolean' || $typeof == 'number' || $typeof == 'string';
    };

    // If symbols are supported
    if ($__symbol)
    {
        // Create checking methods that include symbol checks
        $$_isClass     = function($object)
        {
            // Return true if the object is a class
            return $object && $object[$_symbol_class] === $object;
        };
        $$_isInstance  = function($object)
        {
            // Return true if the object is an instance
            return $object && $object[$_symbol_instance] === $object;
        };
        $$_isPrimitive = function($object)
        {
            // If the object is a null reference or undefined, return true
            if ($object == null)
                return true;

            // Get the internal type of the object
            var $typeof = typeof $object;

            // Return true if the object is a boolean, number, string, or symbol primitive
            return $typeof == 'boolean' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol';
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

      //if ($typeof == 'symbol')
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

      //if ($type == 'symbol')
      //    return $__symbol_valueOf__.call($object);

        // Return the object
        return $object;
    };

    // If symbols are supported, create a type checking method that includes symbol checks
    if ($__symbol)
        $$_type  = function($object)
        {
            // If the object is a null reference or undefined, return either the "null" or "undefined" type string
            if ($object == null)
                return $object === null ? 'null' : 'undefined';

            // Get the internal type of the object
            var $typeof = typeof $object;

            // If the object is a either a boolean, number, string, or symbol primitive, return the internal type string
            if ($typeof == 'boolean' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol')
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

    // Create the casting methods
    var $$_asArray   = function($object, $unobstructed)
    {
        // If the object is an array
        if ($__array_isArray($object))
        {
            // FORMAT $unobstructed
            $unobstructed = $unobstructed !== undefined ? $$_asBoolean($unobstructed) : false;

            // If the unobstructed flag is not set, return the object
            if (!$unobstructed)
                return $object;

            // If the array has the array prototype
            if ($__getPrototypeOf($object) === $__arrayProto__)
            {
                // Create the obstructed flag and get the properties defined on the array
                var $obstructed = false;
                var $properties = $__getOwnPropertyNames($object);

                for (var $i = 0, $j = $properties.length; $i < $j; $i++)
                {
                    // Get the current property
                    var $property = $properties[$i];

                    // If the property is the length property, skip it
                    if ($property == 'length')
                        continue;

                    // Get the unicode value of the first character of the property
                    var $unicode = $property.charCodeAt(0);

                    // If the property starts with a numeric character, skip it
                    if ($unicode >= 48 && $unicode <= 57)
                        continue;

                    // Get the inherited value
                    var $value = $__arrayProto__[$property];

                    // If a value is inherited and the current property obstructs the array prototype property
                    if ($value !== undefined && $object[$property] !== $value)
                    {
                        // Set the obstructed flag
                        $obstructed = true;

                        break;
                    }
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
      //else if ($type == 'symbol')
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
        $unobstructed = $unobstructed !== undefined ? $$_asBoolean($unobstructed) : false;

        // If the unobstructed flag is set and the object is a date
        if ($unobstructed && $type == 'date')
        {
            // Create the obstructed flag
            var $obstructed = false;

            // If the date has the date prototype
            if ($__getPrototypeOf($object) === $__dateProto__)
            {
                // Get the properties defined on the date
                var $properties = $__getOwnPropertyNames($object);

                for (var $i = 0, $j = $properties.length; $i < $j; $i++)
                {
                    // Get the current property and the inherited value
                    var $property = $properties[$i];
                    var $value    = $__dateProto__[$property];

                    // If a value is inherited and the current property obstructs the date prototype property
                    if ($value !== undefined && $object[$property] !== $value)
                    {
                        // Set the obstructed flag
                        $obstructed = true;

                        break;
                    }
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
        $finite = $finite !== undefined ? $$_asBoolean($finite) : true;
        $hex    = $hex    !== undefined ? $$_asBoolean($hex)    : true;
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
        $finite = $finite !== undefined ? $$_asBoolean($finite) : false;

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
                    $hex = $hex !== undefined ? $$_asBoolean($hex) : false;

                    // If the string does not match a hexadecimal numeric string, return NaN (unless forced to be finite)
                    if (!$hex || !$_const_regexp_hex.test($object))
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
        $unobstructed = $unobstructed !== undefined ? $$_asBoolean($unobstructed) : false;

        // If the unobstructed flag is set
        if ($unobstructed)
        {
            // Create the obstructed flag
            var $obstructed = false;

            // If the regexp has the regexp prototype
            if ($__getPrototypeOf($object) === $__regexpProto__)
            {
                // Get the properties defined on the regexp
                var $properties = $__getOwnPropertyNames($object);

                for (var $i = 0, $j = $properties.length; $i < $j; $i++)
                {
                    // Get the current property
                    var $property = $properties[$i];

                    // If the property is a special property, skip it
                    if ($property == 'global' || $property == 'ignoreCase' || $property == 'lastIndex' || $property == 'multiline' || $property == 'source')
                        continue;

                    // Get the inherited value
                    var $value = $__regexpProto__[$property];

                    // If a value is inherited and the current property obstructs the regexp prototype property
                    if ($value !== undefined && $object[$property] !== $value)
                    {
                        // Set the obstructed flag
                        $obstructed = true;

                        break;
                    }
                }
            }
            // Set the obstructed flag
            else
                $obstructed = true;

            // If the regexp object is obstructed, return a new regexp object
            if ($obstructed)
                return new $__regexp($object.source, ($object.global ? 'g' : '') + ($object.ignoreCase ? 'i' : '') + ($object.multiline ? 'm' : ''));
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

      //if ($type == 'symbol')
      //    return $__symbol_toString__.call($object);

        // FORMAT $lookup
        $lookup = $lookup !== undefined ? $$_asBoolean($lookup) : false;

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

    // Create the definitions compiler helpers
    var $_definitionsCompilerAbstract       = function($name, $accessor)
    {
        // Return the abstract accessor exception handler
        if ($accessor)
            return function()
            {
                // Throw an exception
                $_exceptionFormat($_lang_$$_abstract_accessor, $name);
            };

        // Return the abstract exception handler
        return function()
        {
            // Throw an exception
            $_exceptionFormat($_lang_$$_abstract_call, $name);
        };
    };
    var $_definitionsCompilerAccessor       = function($array, $definitions, $modifiers, $struct, $name, $key, $value)
    {
        // Get the accessor and the index of the last space in the accessor
        var $accessor = $key.trim(),
            $index    = $accessor.lastIndexOf(' '),
            $modifier = '';

        // If no accessor was provided, throw an exception
        if (!$accessor)
            $_exceptionFormat($_lang_$$_property_name_empty, $name);

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
            $_exceptionFormat($_lang_$$_property_name_invalid, $name, $accessor);

        // If a value array was provided (and is therefore not an auto property)
        if ($array)
        {
            // If the property is abstract
            if ($modifiers & $_modifiers_abstract)
            {
                // If the value is neither a null reference, undefined reference, nor a function, throw an exception
                if ($value != null && typeof $value != 'function')
                    $_exceptionFormat($_lang_$$_property_value_abstract, $name, $accessor);

                // Create the abstract exception handler
                $value = $_definitionsCompilerAbstract($name, $accessor);
            }
            // If the value is not a function
            else if (typeof $value != 'function')
            {
                // If definitions were provided (and is therefore not a class with the import modifier), throw an exception
                if ($definitions)
                    $_exceptionFormat($_lang_$$_property_value_function, $name, $accessor);

                // Set the value to null
                $value = null;
            }
            // If the global function lock flag is set, prevent extensions on the function
            else if ($_funcLock)
                $__preventExtensions($value);

            // Set the value in the value array
            $array[$index] = $value;
        }

        // If no definitions were provided (and is therefore a class with the import modifier), return
        if (!$definitions)
            return 0;
        
        // If the method was already defined, throw an exception
        if ($modifiers & $method)
            $_exceptionFormat($_lang_$$_property_name_duplicate, $name, $accessor);

        // If the modifier string is a valid access modifier
        if ($modifier == $_const_keyword_private || $modifier == $_const_keyword_protected || $modifier == $_const_keyword_public)
        {
            // If an access modifier is already defined, throw an exception
            if ($modifiers & ($_modifiers_property_get_private | $_modifiers_property_get_protected | $_modifiers_property_set_private | $_modifiers_property_set_protected))
                $_exceptionFormat($_lang_$$_property_access_duplicate, $name);

            // If the "private" modifier string was provided
            if ($modifier == $_const_keyword_private)
            {
                // If the property is private, throw an exception
                if ($modifiers & $_modifiers_private)
                    $_exceptionFormat($_lang_$$_property_access_restrictive, $name, $accessor);

                // If the property is abstract, throw an exception
                if ($modifiers & $_modifiers_abstract)
                    $_exceptionFormat($_lang_$$_property_private_abstract, $name, $accessor);

                // If the property has the override modifier, throw an exception
                if ($modifiers & $_modifiers_override)
                    $_exceptionFormat($_lang_$$_property_private_override, $name, $accessor);
                
                // Set the private modifier in the method modifiers
                $method |= $private;
            }
            // If the "protected" modifier string was provided
            else if ($modifier == $_const_keyword_protected)
            {
                // If the property is not public, throw an exception
                if (!($modifiers & $_modifiers_public))
                    $_exceptionFormat($_lang_$$_property_access_restrictive, $name, $accessor);

                // If the class is a struct, throw an exception
                if ($struct)
                    $_exceptionFormat($_lang_$$_property_access_conflict, $name, $accessor, $_const_keyword_protected, $_const_keyword_struct);
                
                // Set the protected modifier in the method modifiers
                $method |= $protected;
            }
            // Throw an exception
            else
                $_exceptionFormat($_lang_$$_property_access_restrictive, $name, $accessor);
        }
        // If a modifier string was provided, throw an exception
        else if ($modifier)
            $_exceptionFormat($_lang_$$_property_access_invalid, $name, $accessor, $modifier);

        // If the property has the override modifier
        if ($modifiers & $_modifiers_override)
        {
            // Get the base property modifiers and method modifiers
            var $baseModifiers = $definitions[$name][$_definition_modifiers],
                $baseMethod    = $baseModifiers & ($method | $private | $protected);

            // If the method modifiers do not match the base method modifiers, throw an exception
            if ($method != $baseMethod)
                $_exceptionFormat($_lang_$$_property_override_invalid, $name, $accessor);
        }

        // Return the method modifiers
        return $method;
    };
    var $_definitionsCompilerCache          = function($cache, $abstract, $expando, $import, $model, $optimized, $primitive, $sealed, $struct, $key, $value, $prepend)
    {
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

        // Create the constraint and check if the value is a package
        var $constraint = '',
            $package    = $value != null && typeof $value == 'object' && $_unlockSymbolsPackage($value);

        // If the value is a package
        if ($package)
        {
            // If the definition is from a separated prototype, throw an exception
            if ($prepend)
                $_exceptionFormat($_lang_$$_package_separated, $name, $prepend);

            // If any modifiers were provided, throw an exception
            if ($modifiers)
                $_exceptionFormat($_lang_$$_package_modifiers, $name);

            // If symbols are not supported, unlock the package
            if (!$__symbol)
                $value = $value($_lock);

            // Extract the package data
            $constraint = $value[$_package_constraint];
            $modifiers  = $value[$_package_modifiers];
            $value      = $value[$_package_value];

            // If a constraint was provided and it is not valid, throw an exception
            if ($constraint && !$_definitionsCompilerConstraint($constraint))
                $_exceptionFormat($_lang_$$_package_constraint, $name, $constraint);
        }

        // Check if the value is an auto property and create the type string
        var $auto = $__array_isArray($value) && $value.length > 1,
            $type = $auto || $value != null && typeof $value == 'object' && $__getPrototypeOf($value) === $__objectProto__ && $__getOwnPropertyNames($value).length > 0 ?
                    'property' :
                    typeof $value != 'function' ?
                    'field' :
                    $_unlockSymbolsClass($value) ?
                    'class' :
                    'method';

        // If the value is a class
        if ($type == 'class')
        {
            // Treat the class as a field (until nested classes are supported)
            $type  = 'field';
            $value = null;
        }

        // If the global function lock flag is set and the value is a function, prevent extensions on the function
        if ($_funcLock && $type == 'method')
            $__preventExtensions($value);
        
        // If the class does not have the import modifier (or the prototype or static modifiers were provided)
        if (!$import || $modifiers.indexOf($_const_keyword_prototype) >= 0 || $modifiers.indexOf($_const_keyword_static) >= 0)
        {
            // Create the definition and break the modifiers string into a keywords array
            var $definition = new $__array($_definition__length),
                $keywords   = $modifiers.trim().split(' ');

            // If the name is not valid, throw an exception
            if (!$_const_regexp_instance.test($name))
                $_exceptionFormat($_lang_$$_name_invalid, $name);

            // If the name starts with the symbol prefix, throw an exception
            if ($name.substr(0, $_const_prefix_symbol.length) == $_const_prefix_symbol)
                $_exceptionFormat($_lang_$$_name_reserved, $name);

            // Reset the modifiers
            $modifiers = 0;

            for (var $i = 0, $j = $keywords.length; $i < $j; $i++)
            {
                // Get the current keyword and the corresponding modifier for the keyword
                var $keyword  = $keywords[$i],
                    $modifier = $_modifiers[$keyword];

                // If no keyword was provided, skip it
                if (!$keyword)
                    continue;

                // If a modifier was found
                if ($modifier)
                {
                    // If the modifier was already defined in the modifiers, throw an exception
                    if ($modifiers & $modifier)
                        $_exceptionFormat($_lang_$$_keyword_duplicate, $name, $keyword);

                    // Set the modifier in the modifiers
                    $modifiers |= $modifier;
                }
                else
                {
                    // If the value is a package, the keyword is not the last keyword, or the keyword is not a valid constraint, throw an exception
                    if ($package || $i != $j - 1 || !$_definitionsCompilerConstraint($keyword))
                        $_exceptionFormat($_lang_$$_keyword_invalid, $name, $keyword);

                    // Set the keyword as the constraint
                    $constraint = $keyword;
                }
            }

            // Get the access and enum modifiers
            var $access = $modifiers & ($_modifiers_private | $_modifiers_protected | $_modifiers_public),
                $enum   = $modifiers & ($_modifiers_visible | $_modifiers_hidden);
            
            // If either the prototype or static modifiers were provided
            if ($modifiers & ($_modifiers_prototype | $_modifiers_static))
            {
                // If no enum modifiers were provided, set the default enum modifier
                if (!$enum)
                    $modifiers |= $enum = $type == 'method' ?
                                          $_modifiers_hidden :
                                          $_modifiers_visible;

                // If the prototype modifier was provided
                if ($modifiers & $_modifiers_prototype)
                {
                    // Set the "prototype" type string
                    $type = 'prototype';

                    // If the static modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_static)
                        $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_prototype, $_const_keyword_static);

                    // Throw if the definition is already defined in the prototype definitions or the new modifier is improperly used
                    $_definitionsCompilerThrowDuplicate($cache[$_cache_prototype], $name, $type);
                    $_definitionsCompilerThrowInherit($cache[$_cache_prototype], $modifiers, $name, $type);
                }
                else
                {
                    // Set the "static" type string
                    $type = 'static';

                    // Throw if the definition is already defined in the static definitions
                    $_definitionsCompilerThrowDuplicate($cache[$_cache_static], $name, $type);

                    // If the new modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_new)
                        $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_new, $_const_keyword_static);
                }

                // If any access modifiers were provided, throw an exception
                if ($access)
                    $_exceptionFormat($_lang_$$_access_invalid, $name, $type);

                // If more than one enum modifier was provided, throw an exception
                if ($enum != $_modifiers_hidden && $enum != $_modifiers_visible)
                    $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_hidden, $_const_keyword_visible);

                // Throw if any virtual modifiers were provided
                $_definitionsCompilerThrowVirtual($modifiers, $name, $type);

                // If the readonly modifier was provided, throw an exception
                if ($modifiers & $_modifiers_readonly)
                    $_exceptionFormat($_lang_$$_readonly_invalid, $name, $type);

                // If a constraint was provided along with the const modifier, throw an exception
                if ($constraint && $modifiers & $_modifiers_const)
                    $_exceptionFormat($_lang_$$_const_constraint, $name);

                // Set the definition in either the prototype or static definitions
                $_data($cache[$type == 'prototype' ? $_cache_prototype : $_cache_static], $name, $definition, false, true);
            }
            else
            {
                // If the name is reserved, throw an exception
                if ($name == 'as' || ($model || $struct) && ($name == 'clone' || $name == 'equals') || $name == 'is' || $name == 'type' || $name == '__base' || $name == '__data' || $name == '__self' || $name == '__this' || $name == '__type')
                    $_exceptionFormat($_lang_$$_name_reserved, $name);
                
                // Throw if the definition is already defined in the private or protected definitions
                $_definitionsCompilerThrowDuplicate($cache[$_cache_private],   $name);
                $_definitionsCompilerThrowDuplicate($cache[$_cache_protected], $name);
                
                // If no access modifiers were provided, set the private modifier in the modifiers
                if (!$access)
                    $modifiers |= $access = $_modifiers_private;
                // If more than one access modifier was provided, throw an exception
                else if ($access != $_modifiers_private && $access != $_modifiers_protected && $access != $_modifiers_public)
                    $_exceptionFormat($_lang_$$_access_duplicate, $name);

                // If the class is a struct and the protected modifier was provided, throw an exception
                if ($struct && $access == $_modifiers_protected)
                    $_exceptionFormat($_lang_$$_access_conflict, $name, $_const_keyword_protected, $_const_keyword_struct);

                // If the const modifier was provided, throw an exception
                if ($modifiers & $_modifiers_const)
                    $_exceptionFormat($_lang_$$_requires_or, $name, $_const_keyword_const, $_const_keyword_prototype, $_const_keyword_static);
                
                // If the value is null and the abstract modifier was provided, set the "method" type string
                if ($value === null && $modifiers & $_modifiers_abstract)
                    $type = 'method';
                
                // If no enum modifiers were provided, set the default enum modifier
                if (!$enum)
                    $modifiers |= $enum = $type == 'method' ?
                                          $_modifiers_hidden :
                                          $_modifiers_visible;
                // If more than one enum modifier was provided, throw an exception
                else if ($enum != $_modifiers_hidden && $enum != $_modifiers_visible)
                    $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_hidden, $_const_keyword_visible);

                // If the value is not a field
                if ($type != 'field')
                {
                    // If the private modifier was provided along with either the abstract, override, or virtual modifiers, throw an exception
                    if ($modifiers & $_modifiers_private && $modifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual))
                        $_exceptionFormat($_lang_$$_virtual_invalid, $name, $_const_keyword_private);

                    // If the abstract modifier was provided
                    if ($modifiers & $_modifiers_abstract)
                    {
                        // If the sealed modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_sealed)
                            $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_abstract, $_const_keyword_sealed);

                        // If the virtual modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_virtual)
                            $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_abstract, $_const_keyword_virtual);

                        // If the class is not abstract, throw an exception
                        if (!$abstract)
                            $_exceptionFormat($_lang_$$_abstract_class, $name);

                        // If the value is an auto property, throw an exception
                        if ($auto)
                            $_exceptionFormat($_lang_$$_abstract_auto, $name);
                    }

                    // Create the base definition and modifiers references
                    var $baseDefinition = null,
                        $baseModifiers  = null;

                    // If the override modifier was provided
                    if ($modifiers & $_modifiers_override)
                    {
                        // If the new modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_new)
                            $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_new, $_const_keyword_override);

                        // If the virtual modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_virtual)
                            $_exceptionFormat($_lang_$$_conflict_and, $name, $_const_keyword_override, $_const_keyword_virtual);

                        // Get the base definition
                        $baseDefinition = $cache[$_cache_protected][$name];

                        // If no base definition was found, throw an exception
                        if (!$baseDefinition)
                            $_exceptionFormat($_lang_$$_override_invalid, $name, $type);

                        // Get the base modifiers
                        $baseModifiers = $baseDefinition[$_definition_modifiers];

                        // Get the base type-specific modifiers
                        var $baseAccess      = $baseModifiers & ($_modifiers_public | $_modifiers_protected),
                            $baseEnum        = $baseModifiers & ($_modifiers_hidden | $_modifiers_visible),
                            $baseOverridable = $baseModifiers & $_modifiers_sealed ?
                                               0 :
                                               $baseModifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual);
                        
                        // If the base definition is not overridable or does not match the type or access, enum, or readonly modifiers, throw an exception
                        if (!$baseOverridable || $type != $baseDefinition[$_definition_type] || $access != $baseAccess || $enum != $baseEnum || $modifiers & $_modifiers_readonly ^ $baseModifiers & $_modifiers_readonly)
                            $_exceptionFormat($_lang_$$_override_invalid, $name, $type);

                        // If the base constraint does not match, throw an exception
                        if ($constraint != $baseDefinition[$_definition_constraint])
                            $_exceptionFormat($_lang_$$_override_constraint, $name, $baseDefinition[$_definition_constraint]);
                    }
                    else
                    {
                        // If the sealed modifier was provided, throw an exception
                        if ($modifiers & $_modifiers_sealed)
                            $_exceptionFormat($_lang_$$_requires, $name, $_const_keyword_sealed, $_const_keyword_override);
                        
                        // Throw if the new modifier was improperly used (or the override modifier was required)
                        $_definitionsCompilerThrowInherit($cache[$_cache_protected], $modifiers, $name);
                    }

                    // If the class is sealed and the virtual modifier was provided, throw an exception
                    if ($sealed && $modifiers & $_modifiers_virtual)
                        $_exceptionFormat($_lang_$$_virtual_sealed,
                                          $name,
                                          $model ?
                                          $_const_keyword_model :
                                          $struct ?
                                          $_const_keyword_struct :
                                          $_const_keyword_class);
                    
                    // If the value is a property
                    if ($type == 'property')
                    {
                        // If the value is an auto property
                        if ($auto)
                        {
                            // If the array does not have accessor and mutator strings, throw an exception
                            if ($value.length < 2 || typeof $value[0] != 'string' || typeof $value[1] != 'string')
                                $_exceptionFormat($_lang_$$_auto_invalid, $name);

                            // If the array has more than a single default property value, throw an exception
                            if ($value.length > 3)
                                $_exceptionFormat($_lang_$$_auto_invalid_default, $name);

                            // Set the auto property modifiers (and compile the accessor and mutator methods)
                            $modifiers |= $_modifiers_property_auto;
                            $modifiers |= $_definitionsCompilerAccessor(null, $cache[$_cache_protected], $modifiers, $struct, $name, $value[0]);
                            $modifiers |= $_definitionsCompilerAccessor(null, $cache[$_cache_protected], $modifiers, $struct, $name, $value[1]);

                            // Set the default value
                            $value = $_definitionsCompilerPrimitive($value[2]);
                        }
                        else
                        {
                            // Create the value array
                            var $array = [null, null];

                            // Populate the value array and set the property modifiers
                            $modifiers |= $_definitionsCompilerProperty($array, $cache[$_cache_protected], $modifiers, $struct, $name, $value);

                            // Set the value array
                            $value = $array;
                        }
                        
                        // If the override modifier was provided, merge the inherited property modifiers into the modifiers
                        if ($baseDefinition)
                            $modifiers |= $baseModifiers & ($_modifiers_property_get | $_modifiers_property_get_protected | $_modifiers_property_set | $_modifiers_property_set_protected);
                    }
                    // If the readonly modifier was provided, throw an exception
                    else if ($modifiers & $_modifiers_readonly)
                        $_exceptionFormat($_lang_$$_readonly_invalid_type, $name);

                    // If the abstract modifier was provided and the value is a method, create the abstract exception handler
                    if ($modifiers & $_modifiers_abstract && $type == 'method')
                        $value = $_definitionsCompilerAbstract($name);
                }
                else
                {
                    // Throw if any virtual modifiers were provided or the new modifier was improperly used (or the override modifier was required)
                    $_definitionsCompilerThrowVirtual($modifiers, $name);
                    $_definitionsCompilerThrowInherit($cache[$_cache_protected], $modifiers, $name);

                    // Set the value as a primitive
                    $value = $_definitionsCompilerPrimitive($value);
                }

                // If the value is either a field or auto property
                if ($auto || $type == 'field')
                {
                    // If the class has the primitive modifier
                    if ($primitive)
                    {
                        // If a constraint was not provided, set the "primitive" constraint
                        if (!$constraint)
                            $constraint = 'primitive';
                        // If the constraint is not a primitive constraint, throw an exception
                        else if (!$_definitionsCompilerConstraint($constraint, false, true))
                            $_exceptionFormat($_lang_$$_primitive_constraint,
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
                        $_exceptionFormat($_lang_$$_conflict_constraint, $name, $constraint);

                // If the access modifier is public, set the definition in the public definitions
                if ($access == $_modifiers_public)
                    $_data($cache[$_cache_public], $name, $definition, false, true);

                // Set the definition in either the private or protected definitions
                $_data($cache[$access == $_modifiers_private ? $_cache_private : $_cache_protected], $name, $definition, false, true);
            }

            if ($type == 'field')
                $modifiers |= $_modifiers_field;
            else if ($type == 'method')
                $modifiers |= $_modifiers_method;
            
            // Set the definition data
            $definition[$_definition_constraint] = $constraint;
            $definition[$_definition_modifiers]  = $modifiers;
            $definition[$_definition_name]       = $name;
            $definition[$_definition_type]       = $type;
            $definition[$_definition_value]      = $value;
            
            // If the class is optimized, set the definition value in the dump object
//          if ($optimized)
//              $cache[$_cache_dump][$name] = $value;
        }
        else
        {
          //$modifiers = 0;
            
            // Set the definition value in the dump object
//          $cache[$_cache_dump][$name] = $type == 'field' ?
//                                        $_definitionsCompilerPrimitive($value) :
//                                        $type != 'property ' ?
//                                        $value :
//                                        $auto ?
//                                        $_definitionsCompilerPrimitive($value[2]) :
//                                        $_definitionsCompilerProperty([null, null], null, 0, $struct, $name, $value);

          //if ($package && typeof $constraint == 'function')
          //    $imports[$name] = $constraint;
        }
    };
    var $_definitionsCompilerConstraint     = function($keyword, $native, $primitive)
    {
        // If the keyword is a valid class constraint, return true
        if (!$native && $_const_regexp_constraint_class.test($keyword))
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

        // If the primitive flag is set and either the constraint does not support the null flag or it is not the "primitive" string, return false
        if ($primitive && !($constraint & $_constraints_null || $exec[2] == 'primitive'))
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
    var $_definitionsCompilerDirective      = function($directives, $overrides, $defaults, $primitive, $struct, $i, $j, $definition)
    {
        // Get the definition constraint, modifiers, name, type, and value
        var $constraint = $definition[$_definition_constraint],
            $modifiers  = $definition[$_definition_modifiers],
            $name       = $definition[$_definition_name],
            $value      = $definition[$_definition_value];

        // Create the directive, constraint filter, inherits array, instructions, and overridden index
        var $directive    = new $__array($_directive__length),
            $filter       = $constraint ?
                            $_buildRuntimeFilter($constraint, $name) :
                            null,
            $inherits     = null,
            $instructions = 0,
            $overridden   = null,
            $data         = $modifiers & ($_modifiers_field | $_modifiers_property_auto),
            $symbol       = $data && $__symbol ?
                            $__symbol() :
                            null;

        // If a constraint was provided and the definition is a field or auto property
        if ($constraint && $data)
        {
            // Check if the constraint is a native primitive constraint
            var $native = $_definitionsCompilerConstraint($constraint, true, true);

            // Set the value within the applied constraint filter if it is a native primitive constraint, otherwise treat the value as null
            $value = $native ?
                     $filter($value) :
                     null;

            // If a data symbol was created
            if ($symbol)
            {
                // Set the default value descriptor for the hidden instance data in the defaults object
                $defaults[$symbol] = $value;

                // If the filter has already been compiled
                if ($filter[$_filter_native] || $filter[$_filter_async_global])
                {
                    // If the primitive flag is set and the filter is not a struct type, throw an exception
                    if ($primitive && !$native && !$filter[$_filter_async_struct])
                        $_exceptionFormat($_lang_$$_constraint_primitive,
                                          $name,
                                          $constraint,
                                          $filter[$_filter_async_model] ?
                                          $_const_keyword_model :
                                          $_const_keyword_class);

                    // If the filter has either the default flag or is a struct type without the nullable modifier, set the default value descriptor for the hidden instance data on the defaults object
                    if ($filter[$_filter_default] || $filter[$_filter_async_struct] && !$filter[$_filter_null])
                        $__defineProperty($defaults, $symbol, $_symbolsCompilerDefault($name, $symbol, $filter, {}));
                }
            }
        }
        // If a data symbol was created, set the default value descriptor for the hidden instance data in the defaults object
        else if ($symbol)
            $defaults[$symbol] = $value;

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
                    $override = $overrides[$name],
                    $set      = !!($modifiers & $_modifiers_property_auto || $value[1] != null);

                // If an override array was found
                if ($override)
                {
                    // If the definition has an accessor method and one is not found in the override array
                    if ($get && $override[0] == null)
                    {
                        // Set the override index in the override array
                        $override[0] = $i;

                        // Set the override get accessor instruction
                        $instructions |= $_instructions_override_get;
                    }
                    // If the definition has a mutator method and one is not found in the override array
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

                    // Set the protected instruction (or private the instruction if the class has the struct modifier)
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
                    
                    // If the definition is overridden and an inherited descriptor, extract the inherits array from the override array
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
            // If the definition is a method
            else if ($modifiers & $_modifiers_method)
            {
                // If the visible modifier was provided, set the enumerable instruction
                if ($modifiers & $_modifiers_visible)
                    $instructions |= $_instructions_enumerable;

                // Set the value instruction
                $instructions |= $_instructions_value;

                // If the method is not abstract, set the context instruction
                if (!($modifiers & $_modifiers_abstract))
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

                    // Set the protected instruction (or private the instruction if the class has the struct modifier)
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
        $directive[$_directive_value]        = $symbol || $value;

        // If a directives array was not provided, return the directive
        if (!$directives)
            return $directive;

        // Set the directive in the directives array
        $directives[$j] = $directive;

        // Return true if the definition is overridden
        return $overridden != null;
    };
    var $_definitionsCompilerInjections     = function($definitions, $dump, $injections)
    {
        // If no injections array was provided (or there is neither a definitions or dump object), return
        if (!$__array_isArray($injections) || !$definitions && !$dump)
            return;

        for (var $i = 0, $j = $injections.length; $i < $j; $i++)
        {
            // Get the current injection and the definition name
            var $injection = $injections[$i],
                $name      = $injection[$_definition_name];

            // If a definitions object was provided, set the injection in the definitions
            if ($definitions)
                $_data($definitions, $name, $injection, false, true);

            // If a dump object was provided, set the injection value in the dump object
            if ($dump)
                $dump[$name] = $injection[$_definition_value];
        }
    };
    var $_definitionsCompilerPrimitive      = function($value)
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

      //if ($type == 'symbol')
      //    return $__symbol_valueOf__.call($value);
        
        return null;
    };
    var $_definitionsCompilerProperty       = function($array, $definitions, $modifiers, $struct, $name, $object)
    {
        // Create the property modifiers
        var $property = 0;

        // Populate the value array from the property object and set the property modifiers
        for (var $key in $object)
            $property |= $_definitionsCompilerAccessor($array, $definitions, $modifiers | $property, $struct, $name, $key, $object[$key]);

        // If no definitions were provided, return the value array
        if (!$definitions)
            return $array;

        // If no mutator method was provided
        if (!($property & $_modifiers_property_set))
        {
            // If no accessor method was provided, throw an exception
            if (!($property & $_modifiers_property_get))
                $_exceptionFormat($_lang_$$_property_name_empty, $name);

            // If the accessor method has an access modifier (and it is not a protected override), throw an exception
            if ($property & $_modifiers_property_get_private || $property & $_modifiers_property_get_protected && !($modifiers & $_modifiers_override))
                $_exceptionFormat($_lang_$$_property_access_accessor, $name, $_const_keyword_get);
        }
        // If no accessor method was provided and the mutator method has an access modifier (and it is not a protected override), throw an exception
        else if (!($property & $_modifiers_property_get) && ($property & $_modifiers_property_set_private || $property & $_modifiers_property_set_protected && !($modifiers & $_modifiers_override)))
            $_exceptionFormat($_lang_$$_property_access_accessor, $name, $_const_keyword_set);

        // If the readonly modifier was provided without both the accessor and mutator methods, throw an exception
        if ($modifiers & $_modifiers_readonly && ~$property & ($_modifiers_property_get | $_modifiers_property_set))
            $_exceptionFormat($_lang_$$_property_readonly_invalid, $name);

        // Return the property modifiers
        return $property;
    };
    var $_definitionsCompilerStatic         = function($object, $definition)
    {
        var $constraint = $definition[$_definition_constraint],
            $modifiers  = $definition[$_definition_modifiers],
            $name       = $definition[$_definition_name],
            $value      = $definition[$_definition_value],
            $descriptor = { 'enumerable': $modifiers & $_modifiers_field ?
                                          !($modifiers & $_modifiers_hidden) :
                                          $modifiers & $_modifiers_method ?
                                          !!($modifiers & $_modifiers_visible) :
                                          true };

        if ($modifiers & $_modifiers_const)
        {
            $descriptor['value']    = $value;
            $descriptor['writable'] = false;
        }
        else
            $_buildRuntimeData($name,
                               $value,
                               $constraint ?
                               $_buildRuntimeFilter($constraint, $name) :
                               null,
                               $descriptor,
                               false,
                               null);

        $__defineProperty($object, $name, $descriptor);
    };
    var $_definitionsCompilerThrowDuplicate = function($definitions, $name, $type)
    {
        // If the definition is already defined in the definitions, throw an exception
        if ($__hasOwnProperty__.call($definitions, $name))
            $_exceptionFormat($_lang_$$_name_duplicate,
                              $name,
                              $type ?
                              $type + ' ' :
                              '');
    };
    var $_definitionsCompilerThrowInherit   = function($definitions, $modifiers, $name, $type)
    {
        // Get the base definition
        var $baseDefinition = $definitions[$name];

        // If a base definition is defined in the definitions
        if ($baseDefinition)
        {
            // If the base definition is abstract, throw an exception
            if ($baseDefinition[$_definition_modifiers] & $_modifiers_abstract)
                $_exceptionFormat($_lang_$$_override_required, $name, $baseDefinition[$_definition_type]);

            // If the new modifier was not provided, throw an exception
            if (!($modifiers & $_modifiers_new))
                $_exceptionFormat($_lang_$$_new_required,
                                  $name,
                                  $type ?
                                  $type + ' ' :
                                  '');
        }
        // If the new modifier was provided, throw an exception
        else if ($modifiers & $_modifiers_new)
            $_exceptionFormat($_lang_$$_new_invalid,
                              $name,
                              $type ?
                              $type + ' ' :
                              '');
    };
    var $_definitionsCompilerThrowVirtual   = function($modifiers, $name, $type)
    {
        // If the abstract, override, or virtual modifiers were provided
        if ($modifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual))
        {
            // If a type was provided, throw a type-specific exception
            if ($type)
                $_exceptionFormat($_lang_$$_virtual_invalid, $name, $type);

            // Throw an exception
            $_exceptionFormat($_lang_$$_virtual_invalid_type, $name);
        }

        // If the sealed modifier was provided, throw an exception
        if ($modifiers & $_modifiers_sealed)
            $_exceptionFormat($_lang_$$_requires, $name, $_const_keyword_sealed, $_const_keyword_override);
    };
    var $_definitionsCompilerToString       = function($name)
    {
        // Return the named object "toString()" function
        return function()
        {
            // Return the named object expression string
            return '[object ' + $name + ']';
        };
    };
    
    // Create the symbols compiler helpers
    var $_symbolsCompilerConstructor = function($construct, $data0, $base)
    {
        // Set the data descriptor on the construct instance object
        $__defineProperty($construct, '__data', $_symbolsCompilerData('__data', $data0, null, {}, false, true, false));

        // If a base constructor was provided, set the base descriptor on the construct instance object
        if ($base)
            $__defineProperty($construct, '__base', { 'value': $base });
    };
    var $_symbolsCompilerData        = function($name, $symbol, $filter, $descriptor, $auto, $constant, $readonly)
    {
        // Set the get accessor in the descriptor
        $descriptor['get'] = function()
        {
            // Get the hidden instance data from the function context
            var $data = this ?
                        this[$_symbol_data] :
                        null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_$$_context_generic, $name);

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
                    var $data = this ?
                                this[$_symbol_data] :
                                null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_$$_context_generic, $name);

                    // If the readonly flag is set in the hidden instance data, throw an exception
                    if ($data[$_symbol_data_readonly])
                        $_exceptionFormat($_lang_$$_readonly_data, $name, $auto ? $_const_keyword_property : $_const_keyword_field);

                    // Set the value to the accessor value with the applied constraint filter
                    $data[$symbol] = $filter($v, $name);
                };
            // Set the set accessor in the descriptor
            else
                $descriptor['set'] = function($v)
                {
                    // Get the hidden instance data from the function context
                    var $data = this ?
                                this[$_symbol_data] :
                                null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_$$_context_generic, $name);

                    // Set the value to the accessor value with the applied constraint filter
                    $data[$symbol] = $filter($v, $name);
                };
        }
        // If the readonly flag is set, set the readonly set accessor in the descriptor
        else if ($readonly)
            $descriptor['set'] = function($v)
            {
                // Get the hidden instance data from the function context
                var $data = this ?
                            this[$_symbol_data] :
                            null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_$$_context_generic, $name);

                // If the readonly flag is set in the hidden instance data, throw an exception
                if ($data[$_symbol_data_readonly])
                    $_exceptionFormat($_lang_$$_readonly_data, $name, $auto ? $_const_keyword_property : $_const_keyword_field);

                // Set the value to the accessor value
                $data[$symbol] = $v;
            };
        // Set the set accessor in the descriptor
        else
            $descriptor['set'] = function($v)
            {
                // Get the hidden instance data from the function context
                var $data = this ?
                            this[$_symbol_data] :
                            null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_$$_context_generic, $name);

                // Set the value to the accessor value
                $data[$symbol] = $v;
            };

        // Return the descriptor
        return $descriptor;
    };
    var $_symbolsCompilerDefault     = function($name, $symbol, $filter, $descriptor)
    {
        // Set the get and set accessors in the descriptor
        $descriptor['configurable'] = true;
        $descriptor['enumerable']   = true;
        $descriptor['get']          = function()
        {
            // Create the default value within the applied constraint filter
            var $value = $filter(null);

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
        };
        $descriptor['set']          = function($v)
        {
            // Define the writable value on the hidden instance data
            $__defineProperty(this, $symbol,
            {
                'configurable': true,
                'enumerable':   true,
                'value':        $v,
                'writable':     true
            });
        };

        // Return the descriptor
        return $descriptor;
    };
    var $_symbolsCompilerGeneric     = function($metaclass, $metainstance, $metalength, $build, $internal, $merge, $prototype, $struct, $unlocked, $type)
    {
        // Create the instance matrix, root instance object, names map, and overrides object
        var $instance    = new $__array($metalength + 1),
            $this        = $__create($prototype),
            $private     = null,
            $protected   = !$struct ?
                           $this :
                           null,
            $public      = $this,
            $base        = !$struct ?
                           $this :
                           null,
            $super       = null,
            $construct   = null,
            $names       = $__create(null),
            $overrides   = !$struct && $merge > 1 ?
                           $__create(null) :
                           null,
            $data3       = null;
        
        for (var $i = $metalength - 1; $i >= 0; $i--)
        {
            // Get the cache, constructor, class, and private data symbol
            var $cache       = $metaclass[$i],
                $constructor = $cache[$_cache_constructor],
                $class       = $cache[$_cache_class],
                $data0       = $cache[$_cache_symbols_private];

            // Set the class name and index in the names map
            $names[$class[$_symbol_name]] = $i;

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

            // Define the internal properties on the instance objects
            $_symbolsCompilerInternals($i, $private, $protected, $public, $base, $cache[$_cache_symbols_public], $data3, $cache[$_cache_symbols_root], $class, $internal, $unlocked);

            // If a construct instance object was created, define the internal properties on the construct instance object
            if ($construct)
                $_symbolsCompilerConstructor($construct, $data0, $super);
               
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
                    $_buildRuntimeDirective($instance, $i, $private, $protected, $public, $base, $directives[$j], $overrides, null, $data0, $build);
                
                // Freeze the instance objects
                $__freeze($private);
                $__freeze($public);

                // If a protected instance object was created, freeze it
                if ($protected)
                    $__freeze($protected);

                // If base instance object is unique, freeze it
                if ($base && $base !== $protected)
                    $__freeze($base);

                // If a construct instance object was created, freeze it
                if ($construct)
                    $__freeze($construct);

                // Set the symbols directive in the metainstance matrix
                $metainstance[$i] = $instances;
            }

            // If the cache is inherited
            if ($i > 0)
            {
                // Get the base data symbol
                $data3 = $cache[$_cache_symbols_base];

                // If the cache has a constructor, create the super constructor
                if ($constructor)
                    $super = $_symbolsCompilerThis('~constructor', $cache[$_cache_symbols_construct], null, $constructor);
            }
        }

        // If there are overrides in the instance matrix
        if ($overrides)
        {
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
                    $_buildRuntimeDirective($instance, $i, $private, $protected, $public, $base, $directives[$j], $overrides, null, $data0, $build);
            }

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

                // If base instance object is unique, freeze it
                if ($base && $base !== $protected)
                    $__freeze($base);

                // If a construct instance object was created, freeze it
                if ($construct)
                    $__freeze($construct);

                // Set the symbols directive in the metainstance matrix
                $metainstance[$i] = $instances;
            }
        }

        // Define the root instance methods on the root instance object
        $_symbolsCompilerRoot($this, $metaclass, $names, $type);

        // Freeze the root instance object
        $__freeze($this);

        // Set the root instance object in the instance matrix
        $metainstance[$metalength] = $this;
    };
    var $_symbolsCompilerInternals   = function($i, $private, $protected, $public, $base, $data2, $data3, $data5, $type, $internal, $unlocked)
    {
        // Create the internal descriptors
        var $descriptorSelf = $_symbolsCompilerData('__self', $data5, null, {}, false, true, false),
            $descriptorThis = $_symbolsCompilerData('__this', $data2, null, {}, false, true, false),
            $descriptorType = { 'value': $type },
            $descriptorBase = $data3 ?
                              $_symbolsCompilerData('__base', $data3, null, {}, false, true, false) :
                              null;
        
        // If the class is not unlocked or the base instance object is unique
        if (!$unlocked || $base !== $protected)
        {
            // If these are not the first instance objects in the prototype chain, set the base descriptor on the private instance object
            if ($data3)
                $__defineProperty($private, '__base', $descriptorBase);

            // Set the self, public, and type descriptors on the private instance object
            $__defineProperty($private, '__self', $descriptorSelf);
            $__defineProperty($private, '__this', $descriptorThis);
            $__defineProperty($private, '__type', $descriptorType);
        }

        // If these are the first instance objects in the prototype chain, set the self descriptor on the public instance object
        if (!$data3)
            $__defineProperty($public, '__self', $descriptorSelf);

        // If these are not internal instance objects, set the type descriptor on the public instance object
        if ($i >= $internal)
            $__defineProperty($public, '__type', $descriptorType);
        // If these are the first instance objects in the prototype chain or are switching to internal instance objects, set the type descriptor on the public instance object
        else if (!$data3 || $i == $internal - 1)
            $__defineProperty($public, '__type', { 'value': null });

        // If the class is unlocked and a base instance object was provided
        if ($unlocked && $base)
        {
            // If these are not the first instance objects in the prototype chain, set the base descriptor on the base instance object
            if ($data3)
                $__defineProperty($base, '__base', $descriptorBase);

            // Set the self, public, and type descriptors on the base instance object
            $__defineProperty($base, '__self', $descriptorSelf);
            $__defineProperty($base, '__this', $descriptorThis);
            $__defineProperty($base, '__type', $descriptorType);
        }
    };
    var $_symbolsCompilerRoot        = function($root, $metaclass, $names, $type)
    {
        // Set the data descriptor on the construct instance object
        $__defineProperty($root, 'as', { 'value': function($class)
        {
            // Get the hidden instance data from the function context
            var $data = this ?
                        this[$_symbol_data] :
                        null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_$$_context_generic, 'as()');

            // If the class is not a class, return null
            if (!$class || $class[$_symbol_class] !== $class)
                return null;

            // Get the index from the names map for the name of the provided class
            var $index = $names[$class[$_symbol_name]];

            // If an index was not found in the names map, return null
            if ($index == null)
                return null;

            // Return the public instance object from the hidden instance data
            return $data[$metaclass[$index][$_cache_symbols_public]];
        } });

        // Set the data descriptor on the construct instance object
        $__defineProperty($root, 'is', { 'value': function($class)
        {
            // Get the hidden instance data from the function context
            var $data = this ?
                        this[$_symbol_data] :
                        null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_$$_context_generic, 'is()');

            // If the class is not a class, return false
            if (!$class || $class[$_symbol_class] !== $class)
                return false;

            // Return true if an index was found in the names map for the name of the provided class
            return $names[$class[$_symbol_name]] != null;
        } });

        // Set the type method descriptor on the root instance object
        $__defineProperty($root, 'type', { 'value': function()
        {
            // Get the hidden instance data from the function context
            var $data = this ?
                        this[$_symbol_data] :
                        null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_$$_context_generic, 'type()');

            // Return the instance type
            return $type;
        } });
    };
    var $_symbolsCompilerThis        = function($name, $symbol, $filter, $function, $arguments)
    {
        // If a constraint filter was provided
        if ($filter)
        {
            // If the function is an accessor method, return the constrained context wrapper get accessor
            if ($arguments == 0)
                return function()
                {
                    // Get the hidden instance data from the function context
                    var $data = this ?
                                this[$_symbol_data] :
                                null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_$$_context_generic, $name + '()');

                    // Call the function in the context of an instance and return the return value with the applied constraint filter
                    return $filter($function.call($data[$symbol]), $name);
                };
            // If the function is a mutator method, return the constrained context wrapper set accessor
            else if ($arguments == 1)
                return function($v)
                {
                    // Get the hidden instance data from the function context
                    var $data = this ?
                                this[$_symbol_data] :
                                null;

                    // If no hidden instance data was found, throw an exception
                    if (!$data)
                        $_exceptionFormat($_lang_$$_context_generic, $name + '()');
                    
                    // Call the function in the context of an instance with the accessor value and return the return value with the applied constraint filter
                    return $function.call($data[$symbol], $filter($v, $name));
                };

            // Return the constrained context wrapper function
            return function()
            {
                // Get the hidden instance data from the function context
                var $data = this ?
                            this[$_symbol_data] :
                            null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_$$_context_generic, $name + '()');
                
                // Apply the function in the context of an instance with the provided arguments and return the return value with the applied constraint filter
                return $filter($function.apply($data[$symbol], arguments), $name);
            };
        }
        
        // If the function is an accessor method, return the context wrapper get accessor
        if ($arguments == 0)
            return function()
            {
                // Get the hidden instance data from the function context
                var $data = this ?
                            this[$_symbol_data] :
                            null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_$$_context_generic, $name + '()');

                // Call the function in the context of an instance and return the return value
                return $function.call($data[$symbol]);
            };
        // If the function is a mutator method, return the context wrapper set accessor
        else if ($arguments == 1)
            return function($v)
            {
                // Get the hidden instance data from the function context
                var $data = this ?
                            this[$_symbol_data] :
                            null;

                // If no hidden instance data was found, throw an exception
                if (!$data)
                    $_exceptionFormat($_lang_$$_context_generic, $name + '()');

                // Call the function in the context of an instance with the accessor value and return the return value
                return $function.call($data[$symbol], $v);
            };

        // Return the context wrapper function
        return function()
        {
            // Get the hidden instance data from the function context
            var $data = this ?
                        this[$_symbol_data] :
                        null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_$$_context_generic, $name + '()');
            
            // Apply the function in the context of an instance with the provided arguments and return the return value
            return $function.apply($data[$symbol], arguments);
        };
    };

    // ---------- RUNTIME ----------
    
    // Create the build runtime helpers
    var $_buildRuntimeConstructor = function($constructor, $base, $private)
    {
        // If no constructor was provided, return the base constructor
        if (!$constructor)
            return $base;

        // Create the constructor instance object
        var $this = $__create($private);

        // Set the data descriptor on the constructor instance object
        $__defineProperty($this, '__data', { 'value': $private });

        // If a base constructor was provided, set the base descriptor on the constructor instance object
        if ($base)
            $__defineProperty($this, '__base', { 'value': $base });

        // Freeze the constructor instance object
        $__freeze($this);

        // Return the constructor context wrapper function
        return function()
        {
            // Apply the constructor in the constructor context with the provided arguments and return its return value
            return $constructor.apply($this, arguments);
        };
    };
    var $_buildRuntimeData        = function($name, $value, $filter, $descriptor, $auto, $readonly)
    {
        // Set the get accessor in the descriptor
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
                        $_exceptionFormat($_lang_$$_readonly_data,
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
                    $_exceptionFormat($_lang_$$_readonly_data,
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
    var $_buildRuntimeDirective   = function($instance, $i, $private, $protected, $public, $base, $directive, $overrides, $readonly, $data0, $build)
    {
        // Get the directive constraint filter, instructions, name, and value
        var $filter       = $directive[$_directive_filter],
            $instructions = $directive[$_directive_instructions],
            $name         = $directive[$_directive_name],
            $value        = $directive[$_directive_value];

        // If a build array was provided and the directive has a constraint filter that has yet to be compiled, push the directive into the build array
        if ($build && $filter && !$filter[$_filter_native] && !$filter[$_filter_async_global])
            $build.push($directive);

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
                    $readonly = null;
                // If a private data symbol was provided, set the readonly flag
                else if ($data0)
                    $readonly = true;

                // If a private data symbol was provided, set the hidden instance data get and set accessors in the descriptor
                if ($data0)
                    $_symbolsCompilerData($name, $value, $filter, $descriptor, true, false, $readonly);
                // Set the data get and set accessors in the descriptor
                else
                    $_buildRuntimeData($name, $value, $filter, $descriptor, true, $readonly);
            }
            else
            {
                // If there is a get accessor instruction, set the get accessor in the descriptor
                if ($instructions & $_instructions_get)
                    $descriptor['get'] = !($instructions & $_instructions_this) ?
                                         $value[0] :
                                         $data0 ?
                                         $_symbolsCompilerThis($name, $data0,   $filter, $value[0], 0) :
                                         $_buildRuntimeThis   ($name, $private, $filter, $value[0], 0);

                // If there is a set accessor instruction, set the set accessor in the descriptor
                if ($instructions & $_instructions_set)
                    $descriptor['set'] = !($instructions & $_instructions_this) ?
                                         $value[1] :
                                         $data0 ?
                                         $_symbolsCompilerThis($name, $data0,   $filter, $value[1], 1) :
                                         $_buildRuntimeThis   ($name, $private, $filter, $value[1], 1);
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
                    // Create the base descriptor
                    var $descriptorBase = $__create($descriptor);

                    // If there is a private set accessor instruction, undefine the set accessor in the base descriptor
                    if ($instructions & $_instructions_private_set)
                        $descriptorBase['set'] = undefined;
                    // If there is a private get accessor instruction, undefine the get accessor in the base descriptor
                    else if ($instructions & $_instructions_private_get)
                        $descriptorBase['get'] = undefined;

                    // Set the base descriptor on the base instance object
                    $__defineProperty($base, $name, $descriptorBase);

                    // If there is an overridden get accessor instruction
                    if ($instructions & $_instructions_overridden_get)
                    {
                        // Get the get accessor for the descriptor from the overrides object
                        $descriptor['get'] = $overrides[$name]['get'];

                        // Set the descriptor on the private instance object
                        $__defineProperty($private, $name, $descriptor);

                        // Undefine the set accessor in the descriptor
                        $descriptor['set'] = undefined;
                    }
                    // If there is an overridden set accessor instruction
                    else if ($instructions & $_instructions_overridden_set)
                    {
                        // Get the set accessor for the descriptor from the overrides object
                        $descriptor['set'] = $overrides[$name]['set'];

                        // Set the descriptor on the private instance object
                        $__defineProperty($private, $name, $descriptor);

                        // Undefine the get accessor in the descriptor
                        $descriptor['get'] = undefined;
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
                                          $_symbolsCompilerThis($name, $data0,   $filter, $value) :
                                          $_buildRuntimeThis   ($name, $private, $filter, $value);
            }
            // If there is a data instruction
            else if ($instructions & $_instructions_data)
            {
                // If there is not a readonly instruction, clear the readonly accessor
                if (!($instructions & $_instructions_data_readonly))
                    $readonly = null;
                // If a private data symbol was provided, set the readonly flag
                else if ($data0)
                    $readonly = true;

                // If a private data symbol was provided, set the hidden instance data get and set accessors in the descriptor
                if ($data0)
                    $_symbolsCompilerData($name, $value, $filter, $descriptor, false, false, $readonly);
                // Set the data get and set accessors in the descriptor
                else
                    $_buildRuntimeData($name, $value, $filter, $descriptor, false, $readonly);
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
    var $_buildRuntimeFilter      = function($constraint, $name)
    {
        // Check if the constraint filter was cached
        var $filter = $_filters[$constraint];

        // If the constraint filter was cached, return it
        if ($filter)
            return $filter;

        // Create the cast, default, native, nullable, and suppress flags
        var $cast     = $constraint[0] == '~',
            $default  = $constraint[$constraint.length - 1] == '!',
            $global   = null,
            $native   = true,
            $null     = $constraint[$constraint.length - 1] == '?',
            $suppress = $constraint[0] == '@',
            $type     = $constraint;

        // If the cast or suppress flags are set, trim the first character from the type string
        if ($cast || $suppress)
            $type = $type.substr(1);

        // If the default or nullable flags are set, trim the last character from the type string
        if ($default || $null)
            $type = $type.substr(0, $type.length - 1);
        
        // If the type string starts with a capital letter or the first letter of the symbol prefix
        if ($type[0] >= 'A' && $type[0] <= 'Z' || $type[0] == $_const_prefix_symbol[0])
        {
            // Unset the native flag
            $native = false;

            // Create the construct flag
            var $construct = null;

            // If symbols are supported, create the class constraint filter
            if ($__symbol)
                $filter = function($value, $name)
                {
                    // If the construct flag has not been cached
                    if ($construct == null)
                    {
                        // If the global class was asynchronously compiled, get the global class from the filter
                        if (!$global)
                            $global = $filter[$_filter_async_global];
                        
                        // Set the construct flag if the default flag is set and the class is a model or the nullable flag is not set and the class is a struct
                        $construct = $default && $filter[$_filter_async_model] || !$null && $filter[$_filter_async_struct];
                    }

                    //  ########## OPTIMIZE FOR SYMBOLS ##########

                    // If the value is an instance of the global class
                    if ($value instanceof $global)
                    {
                        // Cast the value as an instance of the global class
                        $value = $value.as($global);

                        // If the cast was successful, return the value
                        if ($value)
                            return $value;
                    }
                    // If the value is not null, a name was provided, and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    else if ($value !== null && $name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    // If the construct flag is set, return a default instance of the class
                    if ($construct)
                        return $global();
                    
                    return null;
                };
            // Create the class constraint filter
            else
                $filter = function($value, $name)
                {
                    // If the construct flag has not been cached
                    if ($construct == null)
                    if ($construct == null)
                    {
                        // If the global class was asynchronously compiled, get the global class from the filter
                        if (!$global)
                            $global = $filter[$_filter_async_global];
                        
                        // Set the construct flag if the default flag is set and the class is a model or the nullable flag is not set and the class is a struct
                        $construct = $default && $filter[$_filter_async_model] || !$null && $filter[$_filter_async_struct];
                    }

                    // If the value is an instance of the global class
                    if ($value instanceof $global)
                    {
                        // Cast the value as an instance of the global class
                        $value = $value.as($global);

                        // If the cast was successful, return the value
                        if ($value)
                            return $value;
                    }
                    // If the value is not null, a name was provided, and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    else if ($value !== null && $name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    // If the construct flag is set, return a default instance of the class
                    if ($construct)
                        return $global();
                    
                    return null;
                };

            // If a name was not provided or the global class was found in the globals object, get the global class from the globals object
            if (!$name || $_globals[$type])
                $global = $_buildRuntimeGlobal($filter, $constraint, $type, $default, $null, $name);
        }
        else switch ($type)
        {
            case 'array':

                // Create the array constraint filter
                $filter = function($value, $name)
                {
                    // If the value is either null or an array, return it
                    if ($value === null && !$cast || $__array_isArray($value))
                        return $value;

                    // If the cast flag is set, return the value cast as an array
                    if ($cast)
                        return $$_asArray($value);

                    // If the default flag is set, return an empty array
                    if ($default)
                        return [];

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    return null;
                };

                break;

            case 'boolean':
            case 'bool':

                // Create the boolean constraint filter
                $filter = function($value, $name)
                {
                    // If the value is a boolean primitive, return it
                    if (typeof $value == 'boolean')
                        return $value;

                    // If the cast flag is set, return the value cast as a boolean
                    if ($cast)
                        return $$_asBoolean($value);

                    // If the value is a boolean object, return the primitive value of the object
                    if ($$_type($value) == 'boolean')
                        return $__boolean_valueOf__.call($value);

                    // If the nullable flag is set, return null
                    if ($null)
                        return null;

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    // Return an empty boolean primitive
                    return false;
                };

                break;

            case 'date':

                // Create the date constraint filter
                $filter = function($value, $name)
                {
                    // If the value is either null or a date object, return it
                    if ($value === null && !$cast || $$_type($value) == 'date')
                        return $value;

                    // If the cast flag is set, return the value cast as a date
                    if ($cast)
                        return $$_asDate($value);

                    // If the default flag is set, return an empty date object
                    if ($default)
                        return new $__date($__NaN__);

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    return null;
                };

                break;

            case 'error':

                // Create the error constraint filter
                $filter = function($value, $name)
                {
                    // If the value is either null or an error object, return it
                    if ($value === null || $$_type($value) == 'error')
                        return $value;

                    // If the default flag is set, return an empty error object
                    if ($default)
                        return new $__error();

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    return null;
                };

                break;

            case 'function':

                // If symbols are supported, create the function constraint filter
                if ($__symbol)
                    $filter = function($value, $name)
                    {
                        // If the value is either null or a function (and not a class), return it
                        if ($value === null || typeof $value == 'function' && $value[$_symbol_class] !== $value)
                            return $value;

                        // If the default flag is set, return an empty function
                        if ($default)
                            return function()
                            {
                                //
                            };

                        // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                        if ($name && !$suppress && $_strict)
                            $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                        return null;
                    };
                // Create the function constraint filter
                else
                    $filter = function($value, $name)
                    {
                        // If the value is either null or a function (and not a class), return it
                        if ($value === null || typeof $value == 'function' && (!$value[$_symbol_lock] || !$_unlockSymbolsClass($value)))
                            return $value;

                        // If the default flag is set, return an empty function
                        if ($default)
                            return function()
                            {
                                //
                            };

                        // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                        if ($name && !$suppress && $_strict)
                            $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                        return null;
                    };

                break;

            case 'integer':
            case 'int':

                // Create the integer constraint filter
                $filter = function($value, $name)
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

                            // If the nullable flag is set, return null
                            if ($null)
                                return null;

                            // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                            if ($name && !$suppress && $_strict)
                                $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

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

                break;

            case 'number':
            case 'float':

                // Create the number constraint filter
                $filter = function($value, $name)
                {
                    // If the value is a number primitive, return it
                    if (typeof $value == 'number')
                        return $value;

                    // If the cast flag is set, return the value cast as a number
                    if ($cast)
                        return $$_asNumber($value);

                    // If the value is a number object, return the primitive value of the object
                    if ($$_type($value) == 'number')
                        return $__number_valueOf__.call($value);

                    // If the nullable flag is set, return null
                    if ($null)
                        return null;

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    // Return an empty number primitive
                    return $__NaN__;
                };

                break;

            case 'object':

                // Create the object constraint filter
                $filter = function($value, $name)
                {
                    // If the value is either null or an object, return it
                    if ($value === null || $$_type($value) == 'object')
                        return $value;

                    // If the default flag is set, return an empty object
                    if ($default)
                        return {};

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    return null;
                };

                break;

            case 'primitive':

                // Create the primitive constraint filter
                $filter = function($value, $name)
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

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    return null;
                };

                break;

            case 'regexp':

                // Create the regexp constraint filter
                $filter = function($value, $name)
                {
                    // If the value is either null or a regexp object, return it
                    if ($value === null && !$cast || $$_type($value) == 'regexp')
                        return $value;

                    // If the cast flag is set, return the value cast as a regular expression
                    if ($cast)
                        return $$_asRegExp($value);

                    // If the default flag is set, return an empty regexp object
                    if ($default)
                        return new $__regexp();

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    return null;
                };

                break;

            case 'string':

                // Create the string constraint filter
                $filter = function($value, $name)
                {
                    // If the value is a string primitive, return it
                    if (typeof $value == 'string')
                        return $value;

                    // If the cast flag is set, return the value cast as a string
                    if ($cast)
                        return $$_asString($value);

                    // If the value is a string object, return the primitive value of the object
                    if ($$_type($value) == 'string')
                        return $__string_valueOf__.call($value);

                    // If the nullable flag is set, return null
                    if ($null)
                        return null;

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                    // Return an empty string primitive
                    return '';
                };

                break;

            case 'symbol':
                
                // If symbols are supported, create the symbol constraint filter
                if ($__symbol)
                    $filter = function($value, $name)
                    {
                        // If the value is a symbol primitive, return it
                        if (typeof $value == 'symbol')
                            return $value;

                      //if ($$_type($value) == 'symbol')
                      //    return $__symbol_valueOf__.call($value);

                        // If the nullable flag is set, return null
                        if ($null)
                            return null;

                        // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                        if ($name && !$suppress && $_strict)
                            $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                        // Return a symbol
                        return $__symbol();
                    };
                // Create the empty symbol constraint filter
                else
                    $filter = function($value, $name)
                    {
                        //
                    };

                break;

            case 'type':

                // If symbols are supported, create the type constraint filter
                if ($__symbol)
                    $filter = function($value, $name)
                    {
                        // If the value is either null or a class, return it
                        if ($value === null || $value && $value[$_symbol_class] === $value)
                            return $value;

                        // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                        if ($name && !$suppress && $_strict)
                            $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                        return null;
                    };
                // Create the type constraint filter
                else
                    $filter = function($value, $name)
                    {
                        // If the value is either null or a class, return it
                        if ($value === null || typeof $value == 'function' && $_unlockSymbolsClass($value))
                            return $value;

                        // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                        if ($name && !$suppress && $_strict)
                            $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);

                        return null;
                    };

                break;

            case 'window':

                // Create the window constraint filter
                $filter = function($value, $name)
                {
                    // If the value is either null or a window object, return it
                    if ($value === null || $$_type($value) == 'window')
                        return $value;

                    // If a name was provided and the suppress flag is not set (along with strict mode being enabled), throw an exception
                    if ($name && !$suppress && $_strict)
                        $_exceptionFormat($_lang_$$_constraint_invalid_value, $name, $type);
                    
                    return null;
                };

                break;
        }

        // If no constraint filter was created, throw an exception
        if (!$filter)
            $_exceptionFormat($name ?
                              $_lang_$$_constraint_invalid :
                              $_lang_$$_constraint_invalid_generic,
                              $name,
                              $constraint);

        // Set the synchronous constraint filter data
        $filter[$_filter_cast]       = $cast;
        $filter[$_filter_constraint] = $constraint;
        $filter[$_filter_default]    = $default;
        $filter[$_filter_native]     = $native;
        $filter[$_filter_null]       = $null;
        $filter[$_filter_suppress]   = $suppress;
        $filter[$_filter_type]       = $type;

        // Set the constraint filter in the constraint filters cache
        $_filters[$constraint] = $filter;

        // Return the constraint filter
        return $filter;
    };
    var $_buildRuntimeGlobal      = function($filter, $constraint, $type, $default, $null, $name)
    {
        // Get the global class from the globals object
        var $global = $_globals[$type];

        // If the global class was not found in the globals object, throw an exception
        if (!$global)
            $_exceptionFormat($name ?
                              $_lang_$$_constraint_invalid :
                              $_lang_$$_constraint_invalid_generic,
                              $name,
                              $constraint);

        // Get the class modifiers and check if the class is a model or a struct
        var $modifiers = $global[$_symbol_modifiers],
            $model     = !!($modifiers & $_modifiers_class_model),
            $struct    = !!($modifiers & $_modifiers_class_struct);

        // If the default flag is set and the class is not a model or the null flag is set and the class is not a struct, throw an exception
        if ($default && !$model || $null && !$struct)
            $_exceptionFormat($name ?
                              $_lang_$$_constraint_invalid :
                              $_lang_$$_constraint_invalid_generic,
                              $name,
                              $constraint);

        // Set the asynchronous constraint filter data
        $filter[$_filter_async_global] = $global;
        $filter[$_filter_async_model]  = $model;
        $filter[$_filter_async_struct] = $struct;

        // Return the global class
        return $global;
    };
    var $_buildRuntimeInternals   = function($instance, $i, $base, $private, $protected, $public, $this, $type, $internal, $unlocked)
    {
        // Check if these are the root instance objects
        var $root = $i == $instance.length - 1;
        
        // Create the internal descriptors
        var $descriptorSelf = { 'value': $this },
            $descriptorThis = { 'value': $public },
            $descriptorType = { 'value': $type },
            $descriptorBase = !$root ?
                              { 'value': $instance[$i + 1][$_instance_base] } :
                              null;
        
        // If the class is not unlocked or the base instance object is unique
        if (!$unlocked || $base !== $protected)
        {
            // If these are not the root instance objects, set the internal base reference on the private instance object
            if (!$root)
                $__defineProperty($private, '__base', $descriptorBase);

            // Set the internal self, public, and type references on the private instance object
            $__defineProperty($private, '__self', $descriptorSelf);
            $__defineProperty($private, '__this', $descriptorThis);
            $__defineProperty($private, '__type', $descriptorType);
        }

        // If these are the root instance objects, set the internal self reference on the public instance object
        if ($root)
            $__defineProperty($public, '__self', $descriptorSelf);

        // If these are not internal instance objects, set the internal type reference on the public instance object
        if ($i >= $internal)
            $__defineProperty($public, '__type', $descriptorType);
        // If these are the root instance objects or are switching to internal instance objects, set the internal type reference on the public instance object
        else if ($root || $i == $internal - 1)
            $__defineProperty($public, '__type', { 'value': null });

        // If the class is unlocked and a base instance object was provided
        if ($unlocked && $base)
        {
            // If these are not the root instance objects, set the internal base reference on the base instance object
            if (!$root)
                $__defineProperty($base, '__base', $descriptorBase);

            // Set the internal self, public, and type references on the base instance object
            $__defineProperty($base, '__self', $descriptorSelf);
            $__defineProperty($base, '__this', $descriptorThis);
            $__defineProperty($base, '__type', $descriptorType);
        }
    };
    var $_buildRuntimeMatrix      = function($metaclass, $metainstance, $metalength, $abstract, $import, $internal, $merge, $model, $optimized, $readonlys, $struct, $unlocked, $symbols)
    {
        //if ($root)
        //{
        //    $descriptorType['value'] = $typeInternal;

        //    $__defineProperty($protected, 'type', $descriptorType);

        //    if ($base && $base !== $protected)
        //        $__defineProperty($base, 'type', $descriptorType);

        //    $__defineProperty($public, 'type', { 'value': $typeExternal });
        //}

        // If the class is abstract, return the runtime class constructor
        if (!$symbols && $abstract)
            return function()
            {
                // Throw an exception
                $_exception($_lang_$$_class_abstract_instance);
            };

        // Create the runtime class constructor
        var $class = function()
        {
            // Create the constructor and return references, init flag, instance matrix, overrides object, and readonly accessor and check if the new operator was used
            var $constructor = null,
                $init        = false,
                $this        = this,
                $base        = $this,
                $context     = null,
                $instance    = new $__array($metalength),
                $new         = $this instanceof $class && $this[$_symbol_lock] !== $this,
                $private     = null,
                $protected   = $this,
                $public      = $this,
                $return      = undefined,
                $overrides   = $merge > 1 ?
                               $__create(null) :
                               null,
                $readonly    = !$symbols && $readonlys ?
                               (function()
                               {
                                   // Return the init flag
                                   return $init;
                               }) :
                               null;

            // If the new operator was not used, create the self instance
            if (!$new)
                $this = $base = $protected = $public = $__create($class.prototype);
            
            // ### SELF ###
            $this.as   = function(){};
            $this.is   = function(){};
            $this.type = function(){};

            // If the class is a model, freeze the self instance
            if ($model)
                $__freeze($this);

            for (var $i = $metalength - 1; $i >= 0; $i--)
            {
                // Create the instance objects
                $protected = $__create($protected);
                $private   = $__create($protected);
                $public    = $__create($public);
                $base      = $i == 0 ?
                             null :
                             $i < $merge ?
                             $__create($base) :
                             $protected;
               
                // Get the cache and create the instances in the instance matrix
                var $cache     = $metaclass[$i],
                    $instances = $instance[$i] = [$private, $protected, $public, $base, $context];

                // Create the constructor
                $constructor = $symbols ? 
                               $_symbolsCompilerConstructor($cache[$_cache_constructor], $constructor, $private) :
                               // ^ need constructor, private context symbol, base constructor, base constructor context symbol ($cache[$_cache_symbols_construct])
                               $_buildRuntimeConstructor($cache[$_cache_constructor], $constructor, $private);

                // Lock the instance type on the instances
                $_lockSymbolsInstance($instances, $private, $protected, $public, $base, $context);

                if ($symbols)
                {
                    //
                }
                // Create the internal references on the instance objects
                else
                    $_buildRuntimeInternals($instance, $i, $base, $private, $protected, $public, $this, $cache[$_cache_class], $internal, $unlocked);

                // If there are no overrides in the instance matrix
                if (!$overrides)
                {
                    // Get the directives from the directives matrix
                    var $directives = $metainstance[$i];
                    
                    // Execute the directives on the instance objects
                    for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                        $_buildRuntimeDirective($instance, $i, $private, $protected, $public, $base, $directives[$j], $overrides, $readonly);
                }
            }

            // If there are overrides in the instance matrix
            if ($overrides)
            {
                for (var $i = 0; $i < $metalength; $i++)
                {
                    // Get the directives from the directives matrix and the instances from the instance matrix
                    var $directives = $metainstance[$i];
                    var $instances  = $instance[$i];
                    
                    // Get the instance objects from the instances
                    $private   = $instances[$_instance_private];
                    $protected = $instances[$_instance_protected];
                    $public    = $instances[$_instance_public];
                    $base      = $instances[$_instance_base];
                    
                    // Execute the directives on the instance objects
                    for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                        $_buildRuntimeDirective($instance, $i, $private, $protected, $public, $base, $directives[$j], $overrides, $readonly);
                }

                // Reset the private and public instance object references
                $private = $instance[0][$_instance_private];
                $public  = $instance[0][$_instance_public];
            }

            if ($symbols)
                return $instance;

            // If a constructor was provided and the new operator was used or the class is neither a model nor a struct, apply the constructor and store its return value
            if ($constructor && ($new || !$model && !$struct))
                $return = $constructor.apply($context, arguments);

            // Set the init flag
            $init = true;

            // If the new operator was not used and the constructor did not return undefined or the private instance object, return the constructor return value
            if (!$new && $return !== undefined && $return !== $private)
                return $return;

            // Return the public instance object
            return $public;
        };

        // Return the runtime class constructor
        return $class;
    };
    var $_buildRuntimeThis        = function($name, $private, $filter, $function, $arguments)
    {
        // If a constraint filter was provided
        if ($filter)
        {
            // If the function is an accessor method, return the constrained context wrapper get accessor
            if ($arguments == 0)
                return function()
                {
                    // Call the function in the context of a private instance and return the return value with the applied constraint filter
                    return $filter($function.call($private), $name);
                };
            // If the function is a mutator method, return the constrained context wrapper set accessor
            else if ($arguments == 1)
                return function($v)
                {
                    // Call the function in the context of a private instance with the accessor value and return the return value with the applied constraint filter
                    return $function.call($private, $filter($v, $name));
                };

            // Return the constrained context wrapper function
            return function()
            {
                // Apply the function in the context of a private instance with the provided arguments and return the return value with the applied constraint filter
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
        else if ($arguments == 1)
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

    // Create the symbols runtime helpers
    var $_symbolsRuntimeBuild  = function($directives, $defaults, $primitive)
    {
        // Loop through the build directives
        for (var $i = 0, $j = $directives.length; $i < $j; $i++)
        {
            // Get the directive, constraint filter, name, and value (along with the global class from the globals object)
            var $directive = $directives[$i],
                $filter    = $directive[$_directive_filter],
                $name      = $directive[$_directive_name],
                $value     = $directive[$_directive_value],
                $default   = $filter[$_filter_default],
                $null      = $filter[$_filter_null],
                $global    = $_buildRuntimeGlobal($filter, $filter[$_filter_constraint], $filter[$_filter_type], $default, $null, $name),
                $struct    = $filter[$_filter_async_struct];

            // If the value is not a data symbol, continue
            if (typeof $value != 'symbol')
                continue;

            // If the primitive flag is set and the filter is not a struct type, throw an exception
            if ($primitive && !$struct)
                $_exceptionFormat($_lang_$$_constraint_primitive,
                                  $name,
                                  $filter[$_filter_constraint],
                                  $filter[$_filter_async_model] ?
                                  $_const_keyword_model :
                                  $_const_keyword_class);

            // If the filter has either the default flag or is a struct type without the nullable modifier, set the default value descriptor for the hidden instance data on the defaults object
            if ($default || $struct && !$null)
                $__defineProperty($defaults, $value, $_symbolsCompilerDefault($name, $value, $filter, {}));
        }

        return null;
    };
    var $_symbolsRuntimeMatrix = function($metaclass, $metainstance, $metalength, $build, $defaults, $abstract, $model, $primitive)
    {
        // If the class is abstract, return the runtime class constructor
        if ($abstract)
            return function()
            {
                // Throw an exception
                $_exception($_lang_$$_class_abstract_instance);
            };

        // Get the root data symbol (but the root metainstance has yet to be compiled)
        var $metaroot   = null,
            $symbolRoot = $metaclass[0][$_cache_symbols_root];

        // Create the runtime class constructor
        var $class = function()
        {
            // If a build array is pending, execute the build array on the prototype
            if ($build)
                $build = $_symbolsRuntimeBuild($build, $defaults, $primitive);

            // Check if the new operator was used and if not, create the hidden instance data
            var $new         = this instanceof $class,
                $this        = $__create($defaults),
                $base        = null,
                $construct   = null,
                $private     = null,
                $protected   = null,
                $public      = null,
                $constructor = null,
                $return      = undefined;

            // If the root metainstance has not been cached, store it
            if (!$metaroot)
                $metaroot = $metainstance[$metalength];

            // Create the root instance object (and set it in the hidden instance data)
            var $root = $this[$symbolRoot] = $__create($metaroot);

            // Set the hidden instance data on the root instance object (and lock the instance type on it as well)
            $root[$_symbol_data]     = $this;
            $root[$_symbol_instance] = $root;

            // If the global prototype lock flag is set, freeze the root instance object
            if ($_protoLock)
                $__freeze($root);

            // Loop through the metadata from base to derived
            for (var $i = $metalength - 1; $i >= 0; $i--)
            {
                // Get the cache from the metaclass and the symbols directive from the metainstance
                var $cache     = $metaclass[$i],
                    $directive = $metainstance[$i];

                // Create the private, protected, and public instance objects (and set them in the hidden instance data)
                $private   = $this[$cache[$_cache_symbols_private]]   = $__create($directive[$_instance_private]);
              //$protected = $this[$cache[$_cache_symbols_protected]] = $__create($directive[$_instance_protected]);
                $public    = $this[$cache[$_cache_symbols_public]]    = $__create($directive[$_instance_public]);
                
                // Set the hidden instance data on the private, protected, and public instance objects (and lock the instance type on them as well)
                $private  [$_symbol_data]     = $this;
                $private  [$_symbol_instance] = $private;
              //$protected[$_symbol_data]     = $this;
              //$protected[$_symbol_instance] = $protected;
                $public   [$_symbol_data]     = $this;
                $public   [$_symbol_instance] = $public;

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

                    // Set the hidden instance data on the base instance object (and lock the instance type on it as well)
                    $base[$_symbol_data]     = $this;
                    $base[$_symbol_instance] = $base;

                    // If the global prototype lock flag is set, freeze the base instance object
                    if ($_protoLock)
                        $__freeze($base);
                }
                // Reset the base instance object
                else
                    $base = null;

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

                // Set the hidden instance data on the construct instance object (and lock the instance type on it as well)
                $construct[$_symbol_data]     = $this;
                $construct[$_symbol_instance] = $construct;

                // If the global prototype lock flag is set, freeze the construct instance object
                if ($_protoLock)
                    $__freeze($construct);

                // Get the constructor from the cache
                $constructor = $cache[$_cache_constructor];
            }

            // If the class has a constructor and the new operator was used or the class is not a model, apply the constructor in the context of a construct instance and store its return value
            if ($constructor && ($new || !$model))
                $return = $constructor.apply($construct, arguments);

            // Set the readonly flag in the hidden instance data
            $this[$_symbol_data_readonly] = true;

            // If the constructor returned neither undefined nor the construct instance object, return its return value
            if ($return !== undefined && $return !== $construct)
                return $return;

            // Return the public instance object
            return $public;
        };

        // Return the runtime class constructor
        return $class;
    };
    var $_symbolsRuntimeStruct = function($metaclass, $metainstance, $build, $defaults, $constructor, $primitive)
    {
        // Get the private, public, and root data symbols (but the private, public, and root metainstances have yet to be compiled)
        var $cache         = $metaclass[0],
            $metaprivate   = null,
            $metapublic    = null,
            $metaroot      = null,
            $symbolPrivate = $cache[$_cache_symbols_private],
            $symbolPublic  = $cache[$_cache_symbols_public],
            $symbolRoot    = $cache[$_cache_symbols_root];

        // Create the runtime struct constructor
        var $struct = function()
        {
            // If a build array is pending, execute the build array on the prototype
            if ($build)
                $build = $_symbolsRuntimeBuild($build, $defaults, $primitive);

            // Check if the new operator was used and if not, create the hidden instance data
            var $new  = this instanceof $struct,
                $this = $__create($defaults);

            // If the root metainstance has not been cached, store it
            if (!$metaroot)
                $metaroot = $metainstance[1];

            // Create the root instance object (and set it in the hidden instance data)
            var $root = $this[$symbolRoot] = $__create($metaroot);

            // Set the hidden instance data on the root instance object (and lock the instance type on it as well)
            $root[$_symbol_data]     = $this;
            $root[$_symbol_instance] = $root;

            // If the global prototype lock flag is set, freeze the root instance object
            if ($_protoLock)
                $__freeze($root);

            // If the private and public metainstances have not been cached
            if (!$metaprivate && !$metapublic)
            {
                // Store the private and public metainstances
                $metaprivate = $metainstance[0][$_instance_private];
                $metapublic  = $metainstance[0][$_instance_public];
            }

            // Create the private and public instance objects (and set them in the hidden instance data)
            var $private = $this[$symbolPrivate] = $__create($metaprivate);
            var $public  = $this[$symbolPublic]  = $__create($metapublic);

            // Set the hidden instance data on the private and public instance objects (and lock the instance type on them as well)
            $private[$_symbol_data]     = $this;
            $private[$_symbol_instance] = $private;
            $public [$_symbol_data]     = $this;
            $public [$_symbol_instance] = $public;

            // If the global prototype lock flag is set
            if ($_protoLock)
            {
                // Freeze the private and public instance objects
                $__freeze($private);
                $__freeze($public);
            }

            // If the struct has a constructor and the new operator was used, apply the constructor in the context of a private instance
            if ($constructor && $new)
                $constructor.apply($private, arguments);

            // Set the readonly flag in the hidden instance data
            $this[$_symbol_data_readonly] = true;

            // Return the public instance object
            return $public;
        };

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
        return typeof $number == 'number' && $__isNaN($number);
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
        // Return true if the object is neither undefined nor null and has a window property that is a self reference
        return $object != null && $object.window === $object;
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
    $_defineMethod('isObject',    function($object)
    {
        // Return true if the object is neither undefined nor null
        return $object != null;
    });
    $_defineMethod('isNull',      function($argument)
    {
        // Return true if the argument is null
        return $argument === null;
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
        return $type == 'boolean' || $type == 'number' || $type == 'string';
    });
    $_defineMethod('isReferenceType', function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object == null)
            return false;

        // Get the type of the object
        var $type = $$_type($object);

        // Return true if the object is not a value type
        return $type != 'boolean' && $type != 'number' && $type != 'string';
    });
    $_defineMethod('isValueType',     function($object)
    {
        // If the object is a null reference or undefined, return false
        if ($object == null)
            return false;

        // Get the type of the object
        var $type = $$_type($object);

        // Return true if the object is a boolean, number, or string
        return $type == 'boolean' || $type == 'number' || $type == 'string';
    });

    // ########## HELPERS ##########

    // ---------- CLASS ----------
    $_defineMethod('base',   function($class)
    {
        // CHECK $class
        if (!$$_isClass($class))
        {
            // If the debug flag is set, throw an exception
            if ($_debug)
                $_exceptionArguments('base', arguments);

            return null;
        }

        // Get the metaclass
        var $metaclass = $class[$_symbol_metaclass];

        // If symbols are not supported, unlock the metaclass
        if (!$__symbol)
            $metaclass = $metaclass($_lock);

        // If the metaclass has no base cache, return null
        if ($metaclass.length < 2)
            return null;

        // Return the base class from the base cache
        return $metaclass[1][$_cache_class];
    });
    $_defineMethod('export', function($class)
    {
        //// CHECK $class
        //if (!$$_isClass($class))
        //{
        //    // If the debug flag is set, throw an exception
        //    if ($_debug)
        //        $_exceptionArguments('export', arguments);

        //    // Return an empty string primitive
        //    return '';
        //}

        //// If the class has the import flag
        //if ($class[$_symbol_import])
        //{
        //    // If the debug flag is set, throw an exception
        //    if ($_debug)
        //        $_exceptionFormat($_lang_export_import);

        //    // Return an empty string primitive
        //    return '';
        //}

        //// If the class has the struct flag
        //if ($class[$_symbol_struct])
        //{
        //    // If the debug flag is set, throw an exception
        //    if ($_debug)
        //        $_exceptionFormat($_lang_export_struct);

        //    // Return an empty string primitive
        //    return '';
        //}

        //// Return the precompiled string
        //return $class[$_symbol_precompile]($_lock) || '';
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
        // If the object is a primitive value, the key is not a primitive string, or either the get or set accessor is neither null, undefined, nor a function
        if ($$_isPrimitive($object) || typeof $key != 'string' || $get != null && typeof $get != 'function' || $set != null && typeof $set != 'function')
        {
            // If the debug flag is set, throw an exception
            if ($_debug)
                $_exceptionArguments('accessor', arguments);

            // Return the object
            return $object;
        }

        // If a type constraint was provided
        if ($constraint)
        {
            // Create the constraint filter
            var $filter = $_buildRuntimeFilter($constraint);

            // If either a get or set accessor was provided
            if ($get || $set)
            {
                // If a get accessor was provided
                if ($get)
                {
                    // Create the function reference for the get accessor
                    var $functionGet = $get;

                    // Create the get accessor type constraint wrapper
                    $get = function()
                    {
                        // Call the get accessor in the given context and return its return value within the applied constraint filter
                        return $filter($functionGet.call(this));
                    };
                }

                // If a set accessor was provided
                if ($set)
                {
                    // Create the function reference for the set accessor
                    var $functionSet = $set;

                    // Create the set accessor type constraint wrapper
                    $set = function($v)
                    {
                        // Call the set accessor in the given context along with the provided argument within the applied constraint filter and return its return value
                        return $functionSet.call(this, $filter($v));
                    };
                }
            }
            else
            {
                // Create the default value within the applied constraint filter
                var $value = $filter();

                // Create the auto get and set accessors
                $get = function()
                {
                    // Return the value
                    return $value;
                };
                $set = function($v)
                {
                    // Set the value within the applied constraint filter
                    $value = $filter($v);
                };
            }
        }

        // Define the accessor property on the object
        $__defineProperty($object, $key,
        {
            'configurable': !!$configurable,
            'enumerable':   !!$enumerable,
            'get':          $get,
            'set':          $set
        });

        // Return the object
        return $object;
    });
    $_defineMethod('data',     function($object, $key, $value, $writable, $enumerable, $configurable)
    {
        // If the object is a primitive value or the key is not a primitive string
        if ($$_isPrimitive($object) || typeof $key != 'string')
        {
            // If the debug flag is set, throw an exception
            if ($_debug)
                $_exceptionArguments('data', arguments);

            // Return the object
            return $object;
        }
        
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

            // If the current argument is a primitive value
            if ($$_isPrimitive($argument))
            {
                // If the debug flag is set, throw an exception
                if ($_debug)
                    $_exceptionArguments('flat', arguments);

                // Skip the current argument
                continue;
            }

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

            // If the object is not a string
            if (typeof $string != 'string')
            {
                // If the debug flag is set, throw an exception
                if ($_debug)
                    $_exceptionArguments('escape', arguments);

                // Return an empty string primitive
                return '';
            }
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

            // If the object is not a string
            if (typeof $string != 'string')
            {
                // If the debug flag is set, throw an exception
                if ($_debug)
                    $_exceptionArguments('format', arguments);

                // Return an empty string primitive
                return '';
            }
        }

        // Create the arguments length and array
        var $length    = arguments.length - 1;
        var $arguments = new $__array($length);

        // Copy each function argument converted as a string into the arguments array
        for (var $i = 0; $i < $length; $i++)
            $arguments[$i] = $$_asString(arguments[$i + 1]);

        // Return the formatted string
        return $string.replace($_const_format_search, function($0, $1, $2)
        {
            // Get the number of opening-braces and the argument index
            var $braces = $1.length;
            var $index  = $__parseInt($2, 10);

            // If more than one opening-brace was provided
            if ($braces > 1)
            {
                // If an even number of opening-braces was provided or the argument index exceeded the number of arguments, return the match (with the escaped opening-braces)
                if ($braces % 2 == 0 || $index >= $length)
                    return $1.substr($braces / 2) + $2 + '}';

                // Return the argument string (with the escaped opening-braces)
                return $1.substr($__floor($braces / 2) + 1) + $arguments[$index];
            }

            // Return the argument string
            return $arguments[$index];
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
        $_debug = $$_asBoolean($v);
    });

    // ---------- STRICT ----------
    $_defineProperty('strict', function()
    {
        // Return the strict flag
        return $_strict;
    }, function($v)
    {
        // Set the strict flag
        $_strict = $$_asBoolean($v);
    });

    // ########## NAMESPACE ##########

    // If the AMD module pattern is being used
    if (typeof define == 'function' && define.amd)
    {
        // Define the module
        define(function()
        {
            // Return the global namespace
            return $$;
        });
    }
    // If the CommonJS module pattern is being used
    else if (typeof module != 'undefined' && module && module.exports)
    {
        // Set the module exports as the global namespace
        module.exports = $$;
    }
    // If a global reference was found
    else if (window)
    {
        // If the global shorthand is set, define the shorthand
        if (jT_Shorthand)
            $_data(window, jT_Shorthand, $$, false, true);

        // Define the global namespace
        $_data(window, 'jTypes', $$, false, true);
    }
    // Return the global namespace
    else
        return $$;
})(typeof window != 'undefined' ? window : null);