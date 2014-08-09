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
var $_compilerSymbolsClone = function($symbol, $sources, $primitive)
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