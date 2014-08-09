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
var $$_asNumber = function($object, $finite, $hex)
{
    // FORMAT $finite
    $finite = $finite !== undefined ?
              $$_asBoolean($finite) :
              false;

    // Get the internal type of the object
    var $typeof = typeof $object;

    // If the object is not a number primitive
    if ($typeof != 'number')
    {
        // Get the object type
        var $type = $object == null ?
                    $object + '' :
                    $typeof == 'boolean' || $typeof == 'function' || $typeof == 'string' || $typeof == 'symbol' ?
                    $typeof :
                    $_types[$__toString__.call($object)] || 'object';

        // If the object is a string
        if ($type == 'string')
        {
            // If the string is not a primitive, get the primitive value of the string
            if ($typeof != 'string')
                $object = $__string_valueOf__.call($object);

            // Trim the string
            $object = $object.trim();

            // If the string does not match a floating-point numeric string
            if (!$_const_regexp_number.test($object))
            {
                // FORMAT $hex
                $hex = $hex !== undefined ?
                       $$_asBoolean($hex) :
                       false;

                // If the string does not match a hexadecimal numeric string, return NaN (unless forced to be finite)
                if (!$hex || !$_const_regexp_number_hex.test($object))
                    return $finite ? 0 : $__NaN__;

                // Convert the string to a floating-point number
                $object = $__parseInt($object, 16);
            }
            // Convert the string to a floating-point number
            else
                $object = $__parseFloat($object);
        }
        // If the object is a boolean
        else if ($type == 'boolean')
        {
            // If the boolean is not a primitive, get the primitive value of the boolean
            if ($typeof != 'boolean')
                $object = $__boolean_valueOf__.call($object);

            // Convert the boolean to a number
            $object = $object ? 1 : 0;
        }
        // If the object is a number, get the primitive value of the number
        else if ($type == 'number')
            $object = $__number_valueOf__.call($object);
        // Return NaN (unless forced to be finite)
        else
            return $finite ? 0 : $__NaN__;
    }

    // If the finite flag is not set, return the object
    if (!$finite)
        return $object;

    // If the object is not a number, return zero
    if ($__isNaN($object))
        return 0;

    // If the object is greater than the maximum value, return the maximum value
    if ($object > $_const_float_max)
        return $_const_float_max;

    // If the object is less than the minimum value, return the minimum value
    if ($object < $_const_float_min)
        return $_const_float_min;

    // Return the object
    return $object;
};

$_defineMethod('asNumber', $$_asNumber);
$_defineMethod('asFloat',  $$_asNumber);