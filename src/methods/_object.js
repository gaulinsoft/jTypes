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