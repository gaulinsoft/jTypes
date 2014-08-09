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
var $_compilerSymbolsThis = function($name, $symbol, $filter, $function, $arguments)
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