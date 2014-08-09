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
var $$_isInteger = function($number)
{
    // If the object is a null reference or undefined, return false
    if ($number == null)
        return false;

    // If the object is not a number primitive
    if (typeof $number != 'number')
    {
        // If the object is not a number, return false
        if ($_types[$__toString__.call($number)] != 'number')
            return false;

        // Get the primitive value of the number
        $number = $__number_valueOf__.call($number);
    }

    // Return true if the number is finite, truncated, and within the maximum and minimum representable integers
    return !!$__isFinite($number) && $number <= $_const_int_max && $number >= $_const_int_min && $number == $__floor($number);
};

$_defineMethod('isInteger', $$_isInteger);
$_defineMethod('isInt',     $$_isInteger);