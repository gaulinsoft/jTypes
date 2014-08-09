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
var $$_asDate = function($object, $unobstructed)
{
    // Get the object type
    var $type = $object == null ?
                $object + '' :
                $_types[$__toString__.call($object)] || 'object';

    // If the object is a boolean
    if ($type == 'boolean')
    {
        // If the boolean is not a primitive, get the primitive value of the boolean
        if (typeof $object != 'boolean')
            $object = $__boolean_valueOf__.call($object);

        // Return the date object
        return new $__date($object ? 1 : 0);
    }

    // FORMAT $unobstructed
    $unobstructed = $unobstructed !== undefined ?
                    $$_asBoolean($unobstructed) :
                    false;

    // If the unobstructed flag is set and the object is a date
    if ($unobstructed && $type == 'date')
    {
        // Create the obstructed flag
        var $obstructed = false;

        // If the date has the date prototype
        if ($__dateProto__ === $__getPrototypeOf($object))
        {
            for (var $i = 0, $j = $_prototypes_date.length; $i < $j && !$obstructed; $i++)
            {
                // Get the current property in the prototype
                var $property = $_prototypes_date[$i];

                // If the property is a reserved property, skip it
                if ($_reserved($property))
                    continue;

                // Get the function from the prototype
                var $function = $__dateProto__[$property];

                // If the function is not a function, skip it
                if (typeof $function != 'function')
                    continue;

                // Set the obstructed flag
                $obstructed = $function !== $object[$property];
            }
        }
        // Set the obstructed flag
        else
            $obstructed = true;

        // If the date object is obstructed
        if ($obstructed)
        {
            // Get the primitive value of the date
            $object = $__date_valueOf__.call($object);
            $type   = 'number';
        }
    }

    // If the object is a number
    if ($type == 'number')
    {
        // If the number is not a primitive, get the primitive value of the number
        if (typeof $object != 'number')
            $object = $__number_valueOf__.call($object);

        // If the number is not an integer, return an invalid date object
        if (!$$_isInteger($object))
            return new $__date($__NaN__);

        // If the number is greater than the maximum representable timestamp, return the maximum representable date object
        if ($object > $_const_date_max)
            return new $__date($_const_date_max);

        // If the number is less than the minimum representable timestamp, return the minimum representable date object
        if ($object < $_const_date_min)
            return new $__date($_const_date_min);

        // Return the date object
        return new $__date($object);
    }

    // If the object is a string
    if ($type == 'string')
    {
        // If the string is not a primitive, get the primitive value of the string
        if (typeof $object != 'string')
            $object = $__string_valueOf__.call($object);

        // Return the date object
        return new $__date($object);
    }

    // If the object is not a date, return an invalid date object
    if ($type != 'date')
        return new $__date($__NaN__);

    // Get the time of the date
    var $time = $__date_valueOf__.call($object);

    // If the time is greater than the maximum representable timestamp, return the maximum representable date object
    if ($time > $_const_date_max)
        return new $__date($_const_date_max);

    // If the time is less than the minimum representable timestamp, return the minimum representable date object
    if ($time < $_const_date_min)
        return new $__date($_const_date_min);

    // Return the object
    return $object;
};

$_defineMethod('asDate', $$_asDate);