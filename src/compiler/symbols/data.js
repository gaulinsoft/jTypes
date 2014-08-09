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
var $_compilerSymbolsData = function($name, $symbol, $filter, $descriptor, $auto, $readonly, $constant)
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