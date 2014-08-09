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
var $$_unbox = function($object)
{
    // If the object is a primitive, return the object
    if ($$_isPrimitive($object))
        return $object;

    // Get the object type
    var $type = $_types[$__toString__.call($object)] || 'object';

    // If the object is a boolean, return the primitive value of the boolean
    if ($type == 'boolean')
        return $__boolean_valueOf__.call($object);

    // If the object is a number, return the primitive value of the number
    if ($type == 'number')
        return $__number_valueOf__.call($object);

    // If the object is a string, return the primitive value of the string
    if ($type == 'string')
        return $__string_valueOf__.call($object);

  //if ($type == 'symbol' && $__symbol)
  //    return $__symbol_valueOf__.call($object);

    // Return the object
    return $object;
};

$_defineMethod('unbox', $$_unbox);