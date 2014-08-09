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
var $_runtimeFilterPrimitive = function($handle, $default, $suppress, $type, $cast, $null, $valueOf)
{
    // Return the primitive constraint filter
    return function($value, $name)
    {
        // If the internal type of the value is the primitive type, return it
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