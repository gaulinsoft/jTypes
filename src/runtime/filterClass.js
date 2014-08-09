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
var $_runtimeFilterClass = $_symbolCreate ?
function($handle, $default, $suppress, $data2)
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
} :
function($handle, $default, $suppress, $class)
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