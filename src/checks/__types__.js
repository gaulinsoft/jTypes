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

// Create the internal types lookup
var $_types = $__create(null);

// Iterate the internal JavaScript types
$_const_types.forEach(function($type)
{
    // Create the type keyword
    var $keyword = $type.toLowerCase();

    // Set the keyword in the internal types lookup
    $_types['[object ' + $type + ']'] = $keyword;

    // Define the checking method for the internal JavaScript type
    $_defineMethod('is' + $type, function($object)
    {
        // Return true if the object type string matches the keyword
        return $$_type($object) == $keyword;
    });
});

// Iterate the known aliases of the internal JavaScript window type
$_const_types_window.forEach(function($alias)
{
    // Set the window alias in the internal types lookup
    $_types['[object ' + $alias + ']'] = 'window';
});

// Define the checking aliases
$_defineMethod('isBool',  $$.isBoolean);
$_defineMethod('isFloat', $$.isNumber);