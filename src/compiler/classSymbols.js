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
var $_compilerClassSymbols = function($class)
{
    // If symbols are supported
    if ($_symbolCreate)
    {
        // If ECMAScript 6 symbols are supported, set the class symbol on the class
        if ($__symbol)
            $class[$_symbol_class] = $class;
        // Set the class type on the class
        else
            $_data($class, $_symbol_class, $class);
    }
    // Lock the class type on the class
    else
        $_lockSymbolsClass($class);

    // Prevent extensions on the class
    $__preventExtensions($class);

    // Return the class
    return $class;
};