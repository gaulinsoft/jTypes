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
var $_compilerProperty = function($array, $definitions, $modifiers, $struct, $name, $object)
{
    // Create the property modifiers
    var $property = 0;

    // Populate the value array from the property object and set the property modifiers
    for (var $key in $object)
        $property |= $_compilerAccessor($array, $definitions, $modifiers | $property, $struct, $name, $key, $object[$key]);

    // If no definitions were provided, return the value array
    if (!$definitions)
        return $array;

    // If no mutator method was provided
    if (!($property & $_modifiers_property_set))
    {
        // If no accessor method was provided, throw an exception
        if (!($property & $_modifiers_property_get))
            $_exceptionFormat($_lang_property_name_empty, $name);

        // If the accessor method has an access modifier (and it is not a protected override), throw an exception
        if ($property & $_modifiers_property_get_private || $property & $_modifiers_property_get_protected && !($modifiers & $_modifiers_override))
            $_exceptionFormat($_lang_property_access_accessor, $name, $_const_keyword_get);
    }
    // If no accessor method was provided and the mutator method has an access modifier (and it is not a protected override), throw an exception
    else if (!($property & $_modifiers_property_get) && ($property & $_modifiers_property_set_private || $property & $_modifiers_property_set_protected && !($modifiers & $_modifiers_override)))
        $_exceptionFormat($_lang_property_access_accessor, $name, $_const_keyword_set);

    // If the readonly modifier was provided without both the accessor and mutator methods, throw an exception
    if ($modifiers & $_modifiers_readonly && ~$property & ($_modifiers_property_get | $_modifiers_property_set))
        $_exceptionFormat($_lang_property_readonly_invalid, $name);

    // Return the property modifiers
    return $property;
};