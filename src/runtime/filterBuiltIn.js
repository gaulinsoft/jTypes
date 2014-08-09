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
var $_runtimeFilterBuiltIn = function($handle, $default, $suppress, $type, $cast)
{
    // Return the constraint filter
    return function($value, $name)
    {
        // If the value is either null or is of the built-in type, return it
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