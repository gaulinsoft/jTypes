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
$_defineMethod('isInfinity',         function($number)
{
    // Unbox the object
    $number = $$_unbox($number);

    // Return true if the object is a number, is not NaN, and is not finite
    return typeof $number == 'number' && !$__isNaN($number) && !$__isFinite($number);
});
$_defineMethod('isNaN',              function($number)
{
    // Unbox the object
    $number = $$_unbox($number);

    // Return true if the object is a number and is NaN
    return typeof $number == 'number' && !!$__isNaN($number);
});
$_defineMethod('isNegativeInfinity', function($number)
{
    // Unbox the object
    $number = $$_unbox($number);

    // Return true if the object is a number, is not NaN, is not finite, and is less than zero
    return typeof $number == 'number' && !$__isNaN($number) && !$__isFinite($number) && $number < 0;
});
$_defineMethod('isPositiveInfinity', function($number)
{
    // Unbox the object
    $number = $$_unbox($number);

    // Return true if the object is a number, is not NaN, is not finite, and is greater than zero
    return typeof $number == 'number' && !$__isNaN($number) && !$__isFinite($number) && $number > 0;
});