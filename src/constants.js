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