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
var $_runtimeCast = function($handles, $instance)
{
    // Return the casting function
    return function($class)
    {
        // If the class is not a class, return null
        if (!$class || !$class[$_symbol_lock] || !$_unlockSymbolsClass($class))
            return null;

        // Get the index from the handles map for the handle of the provided class
        var $index = $handles[$class[$_symbol_handle]];

        // If an index was not found in the handles map, return null
        if ($index == null)
            return null;

        // Return the public instance object from the instance matrix
        return $instance[$index][$_instance_public];
    };
};