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
var $_compilerSymbolsOptimized = function($defaults, $symbol, $metaobject)
{
    // If no metaobject was provided, return
    if (!$metaobject)
        return;

    // Define the default instance descriptor on the defaults object
    $__defineProperty($defaults, $symbol,
    {
        'configurable': true,
        'enumerable':   true,
        'get':          function()
        {
            // Create the instance object
            var $instance = $__create($metaobject);

            // If ECMAScript 6 symbols are not supported
            if (!$__symbol)
            {
                // Set the instance data on the instance object (and lock the instance type on it)
                $_data($instance, $_symbol_data,     this);
                $_data($instance, $_symbol_instance, $instance);
            }
            else
            {
                // Set the hidden instance data on the instance object (and lock the instance type on it)
                $instance[$_symbol_data]     = this;
                $instance[$_symbol_instance] = $instance;
            }

            // If the global prototype lock flag is set, freeze the instance object
            if ($_protoLock)
                $__freeze($instance);

            // Define the writable instance object on the hidden instance data
            $__defineProperty(this, $symbol,
            {
                'configurable': true,
                'enumerable':   true,
                'value':        $instance,
                'writable':     true
            });

            // Return the instance object
            return $instance;
        }
    });

    // Remove the defaults reference
    $defaults = null;
};