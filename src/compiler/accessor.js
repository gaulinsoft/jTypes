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
var $_compilerAccessor = function($array, $definitions, $modifiers, $struct, $name, $key, $value)
{
    // Get the accessor and the index of the last space in the accessor
    var $accessor = $key.trim(),
        $index    = $accessor.lastIndexOf(' '),
        $modifier = '';

    // If no accessor was provided, throw an exception
    if (!$accessor)
        $_exceptionFormat($_lang_property_name_empty, $name);

    // If a space was found in the accessor
    if ($index >= 0)
    {
        // Break the accessor into the modifier string and accessor
        $modifier = $accessor.substr(0, $index).trim();
        $accessor = $accessor.substr($index + 1);
    }

    // Create the method modifiers along with the private and protected bits
    var $method    = 0,
        $private   = 0,
        $protected = 0;

    // If the accessor is an accessor method
    if ($accessor == $_const_keyword_get)
    {
        // Store the accessor method index, modifiers, and bits
        $index     = 0;
        $method    = $_modifiers_property_get;
        $private   = $_modifiers_property_get_private;
        $protected = $_modifiers_property_get_protected;
    }
    // If the accessor is a mutator method
    else if ($accessor == $_const_keyword_set)
    {
        // Store the mutator method index, modifiers, and bits
        $index     = 1;
        $method    = $_modifiers_property_set;
        $private   = $_modifiers_property_set_private;
        $protected = $_modifiers_property_set_protected;
    }
    // Throw an exception
    else
        $_exceptionFormat($_lang_property_name_invalid, $name, $accessor);

    // If a value array was provided (and is therefore not an auto property)
    if ($array)
    {
        // If the property is abstract
        if ($modifiers & $_modifiers_abstract)
        {
            // If the value is neither a null reference, undefined reference, nor a function, throw an exception
            if ($value != null && typeof $value != 'function')
                $_exceptionFormat($_lang_property_value_abstract, $name, $accessor);

            // Create the abstract exception handler
            $value = $_compilerAbstract($name, $accessor);
        }
        // If the value is not a function
        else if (typeof $value != 'function')
        {
            // If definitions were provided (and is therefore not an imported definition), throw an exception
            if ($definitions)
                $_exceptionFormat($_lang_property_value_function, $name, $accessor);

            // Set the value to null
            $value = null;
        }
        // If the global function lock flag is set, prevent extensions on the function
        else if ($_funcLock)
            $__preventExtensions($value);

        // Set the value in the value array
        $array[$index] = $value;
    }

    // If no definitions were provided (and is therefore an imported definition), return
    if (!$definitions)
        return 0;

    // If the method was already defined, throw an exception
    if ($modifiers & $method)
        $_exceptionFormat($_lang_property_name_duplicate, $name, $accessor);

    // If the modifier string is a valid access modifier
    if ($modifier == $_const_keyword_private || $modifier == $_const_keyword_protected || $modifier == $_const_keyword_public)
    {
        // If an access modifier is already defined, throw an exception
        if ($modifiers & ($_modifiers_property_get_private | $_modifiers_property_get_protected | $_modifiers_property_set_private | $_modifiers_property_set_protected))
            $_exceptionFormat($_lang_property_access_duplicate, $name);

        // If the "private" modifier string was provided
        if ($modifier == $_const_keyword_private)
        {
            // If the property is private, throw an exception
            if ($modifiers & $_modifiers_private)
                $_exceptionFormat($_lang_property_access_restrictive, $name, $accessor);

            // If the property is abstract, throw an exception
            if ($modifiers & $_modifiers_abstract)
                $_exceptionFormat($_lang_property_private_abstract, $name, $accessor);

            // If the property has the override modifier, throw an exception
            if ($modifiers & $_modifiers_override)
                $_exceptionFormat($_lang_property_private_override, $name, $accessor);

            // Set the private modifier in the method modifiers
            $method |= $private;
        }
        // If the "protected" modifier string was provided
        else if ($modifier == $_const_keyword_protected)
        {
            // If the property is not public, throw an exception
            if (!($modifiers & $_modifiers_public))
                $_exceptionFormat($_lang_property_access_restrictive, $name, $accessor);

            // If the class is a struct, throw an exception
            if ($struct)
                $_exceptionFormat($_lang_property_access_conflict, $name, $accessor, $_const_keyword_protected, $_const_keyword_struct);

            // Set the protected modifier in the method modifiers
            $method |= $protected;
        }
        // Throw an exception
        else
            $_exceptionFormat($_lang_property_access_restrictive, $name, $accessor);
    }
    // If a modifier string was provided, throw an exception
    else if ($modifier)
        $_exceptionFormat($_lang_property_access_invalid, $name, $accessor, $modifier);

    // If the property has the override modifier
    if ($modifiers & $_modifiers_override)
    {
        // Get the base property modifiers and method modifiers
        var $baseModifiers = $definitions[$name][$_definition_modifiers],
            $baseMethod    = $baseModifiers & ($method | $private | $protected);

        // If the method modifiers do not match the base method modifiers, throw an exception
        if ($method != $baseMethod)
            $_exceptionFormat($_lang_property_override_invalid, $name, $accessor);
    }

    // Return the method modifiers
    return $method;
};