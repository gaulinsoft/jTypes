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
var $$_asInteger = function($object, $finite, $hex)
{
    // FORMAT $finite
    // FORMAT $hex
    // FORMAT $object
    $finite = $finite !== undefined ?
              $$_asBoolean($finite) :
              true;
    $hex    = $hex !== undefined ?
              $$_asBoolean($hex) :
              true;
    $object = $$_asNumber($object, false, $hex);

    // If the object is not a number, return NaN (unless forced to be finite)
    if ($__isNaN($object))
        return $finite ? 0 : $__NaN__;

    // If the object is greater than the maximum integer, return positive infinity (unless forced to be finite)
    if ($object > $_const_int_max)
        return $finite ? $_const_int_max : $__number_positiveInfinity__;

    // If the object is less than the minimum integer, return negative infinity (unless forced to be finite)
    if ($object < $_const_int_min)
        return $finite ? $_const_int_min : $__number_negativeInfinity__;

    // If the object is less than zero, return the object as an integer (rounded towards zero)
    if ($object < 0)
        return $__ceil($object);

    // Return the object as an integer (rounded towards zero)
    return $__floor($object);
};

$_defineMethod('asInteger', $$_asInteger);
$_defineMethod('asInt',     $$_asInteger);