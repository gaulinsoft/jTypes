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
var $_compilerAbstract = function($name, $accessor)
{
    // Return the abstract accessor exception handler
    if ($accessor)
        return function()
        {
            // Throw an exception
            $_exceptionFormat($_lang_abstract_accessor, $name);
        };

    // Return the abstract exception handler
    return function()
    {
        // Throw an exception
        $_exceptionFormat($_lang_abstract_call, $name);
    };
};