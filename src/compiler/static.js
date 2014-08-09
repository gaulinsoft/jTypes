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
var $_compilerStatic = function($object, $definition)
{
    // Get the definition constraint, modifiers, name, and value (and create the descriptor)
    var $constraint = $definition[$_definition_constraint],
        $modifiers  = $definition[$_definition_modifiers],
        $name       = $definition[$_definition_name],
        $value      = $definition[$_definition_value],
        $descriptor = { 'enumerable': $modifiers & ($_modifiers_method | $_modifiers_nested) ?
                                      !!($modifiers & $_modifiers_visible) :
                                      !($modifiers & $_modifiers_hidden) };

    // If the const modifier was provided or the value is a nested class
    if ($modifiers & ($_modifiers_const | $_modifiers_nested))
    {
        // Set the value in the descriptor
        $descriptor['value']    = $value;
        $descriptor['writable'] = false;
    }
    // Create the static data descriptor
    else
        $_runtimeData($name,
                      $value,
                      $constraint ?
                      $_runtimeFilter($constraint) :
                      null,
                      $descriptor,
                      false,
                      null);

    // Set the descriptor on the object
    $__defineProperty($object, $name, $descriptor);
};