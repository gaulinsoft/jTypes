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
var $$_box = function($object)
{
    // If the object is a null reference or undefined, return an empty object
    if ($object == null)
        return {};

    // Get the internal type of the object
    var $typeof = typeof $object;

    // If the object is a boolean primitive, return the boolean object
    if ($typeof == 'boolean')
        return new $__boolean($object);

    // If the object is a number primitive, return the number object
    if ($typeof == 'number')
        return new $__number($object);

    // If the object is a string primitive, return the string object
    if ($typeof == 'string')
        return new $__string($object);

    //if ($typeof == 'symbol' && $__symbol)
    //    return new $__symbol($object);

    // Return the object
    return $object;
};

$_defineMethod('box', $$_box);