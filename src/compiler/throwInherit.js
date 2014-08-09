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
var $_compilerThrowInherit = function($definitions, $modifiers, $name, $type)
{
    // Get the base definition
    var $baseDefinition = $definitions[$name];

    // If a base definition is defined in the definitions
    if ($baseDefinition)
    {
        // If the base definition is abstract, throw an exception
        if ($baseDefinition[$_definition_modifiers] & $_modifiers_abstract)
            $_exceptionFormat($_lang_override_required, $name, $baseDefinition[$_definition_type]);

        // If the new modifier was not provided, throw an exception
        if (!($modifiers & $_modifiers_new))
            $_exceptionFormat($_lang_new_required, $name, $type ? $type + ' ' : '');
    }
    // If the new modifier was provided, throw an exception
    else if ($modifiers & $_modifiers_new)
        $_exceptionFormat($_lang_new_invalid, $name, $type ? $type + ' ' : '');
};