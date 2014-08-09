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
var $_compilerSymbolsDefault = function($defaults, $symbol, $filter)
{
    // Define the default descriptor on the defaults object
    $__defineProperty($defaults, $symbol,
    {
        'configurable': true,
        'enumerable':   true,
        'get':          function()
        {
            // Create the default value within the applied constraint filter
            var $value = $filter();

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
        },
        'set':          function($v)
        {
            // Define the writable value on the hidden instance data
            $__defineProperty(this, $symbol,
            {
                'configurable': true,
                'enumerable':   true,
                'value':        $v,
                'writable':     true
            });
        }
    });

    // Remove the defaults reference
    $defaults = null;
};