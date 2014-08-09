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
var $$_asBoolean = function($object)
{
    // Get the internal type of the object
    var $typeof = typeof $object;

    // If the object is a boolean primitive, return the object
    if ($typeof == 'boolean')
        return $object;

    // Get the object type
    var $type = $object == null ?
                $object + '' :
                $typeof == 'function' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol' ?
                $typeof :
                $_types[$__toString__.call($object)] || 'object';

    // If the object is a boolean, return the primitive value of the boolean
    if ($type == 'boolean')
        return $__boolean_valueOf__.call($object);

    // If the object is a number
    if ($type == 'number')
    {
        // If the number is not a primitive, get the primitive value of the number
        if ($typeof != 'number')
            $object = $__number_valueOf__.call($object);
    }
    // If the object is a string
    else if ($type == 'string')
    {
        // If the string is not a primitive, get the primitive value of the string
        if ($typeof != 'string')
            $object = $__string_valueOf__.call($object);
    }
  //else if ($type == 'symbol' && $__symbol)
  //{
  //    if ($typeof != 'symbol')
  //        $object = $__symbol_valueOf__.call($object);
  //}

    // Return the object as a boolean primitive
    return !!$object;
};

$_defineMethod('asBoolean', $$_asBoolean);
$_defineMethod('asBool',    $$_asBoolean);