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
var $_compilerClassFailed = function()
{
    // Create the failed class
    var $class = function()
    {
        // Throw an exception
        $_exception($_lang_class_failed_instance);
    };

    // Set the failed metadata on the class
    $_data($class, $_symbol_failed, $class);

    // Set the symbols on the class
    $_compilerClassSymbols($class);

    // Return the class
    return $class;
};