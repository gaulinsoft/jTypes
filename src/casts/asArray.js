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
var $$_asArray = function($object, $unobstructed)
{
    // If the object is an array
    if ($__array_isArray($object))
    {
        // FORMAT $unobstructed
        $unobstructed = $unobstructed !== undefined ?
                        $$_asBoolean($unobstructed) :
                        false;

        // If the unobstructed flag is not set, return the object
        if (!$unobstructed)
            return $object;

        // If the array has the array prototype
        if ($__arrayProto__ === $__getPrototypeOf($object))
        {
            // Create the obstructed flag
            var $obstructed = false;

            for (var $i = 0, $j = $_prototypes_array.length; $i < $j && !$obstructed; $i++)
            {
                // Get the current property in the prototype
                var $property = $_prototypes_array[$i];

                // If the property is the length property or a reserved property, skip it
                if ($property == 'length' || $_reserved($property))
                    continue;

                // Get the function from the prototype
                var $function = $__arrayProto__[$property];

                // If the function is not a function, skip it
                if (typeof $function != 'function')
                    continue;

                // Set the obstructed flag
                $obstructed = $function !== $object[$property];
            }

            // If the array is not obstructed, return the object
            if (!$obstructed)
                return $object;
        }
    }
    // If the object is a primitive value, return an empty array
    else if ($$_isPrimitive($object))
        return [];

    // Get the object collection length
    var $length = $object.length;

    // If the length is not an integer or is less than or equal to zero, return an empty array
    if (!$$_isInteger($length) || $length <= 0)
        return [];

    // Create the array
    var $array = new $__array($length);

    // Copy the value of each indexed property in the object into the array
    for (var $i = 0; $i < $length; $i++)
        $array[$i] = $object[$i];

    // Return the array
    return $array;
};

$_defineMethod('asArray', $$_asArray);