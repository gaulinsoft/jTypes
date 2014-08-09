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
var $_runtimeFilter = function($constraint, $name, $namespace, $aliases, $includes)
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