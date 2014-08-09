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
var $$_asString = function($object, $lookup)
{
    // Get the internal type of the object
    var $typeof = typeof $object;

    // If the object is a string primitive, return the object
    if ($typeof == 'string')
        return $object;

    // Get the object type
    var $type = $object == null ?
                $object + '' :
                $typeof == 'boolean' || $typeof == 'function' || $typeof == 'number' || $typeof == 'symbol' ?
                $typeof :
                $_types[$__toString__.call($object)] || 'object';

    // If the object is a string, return the primitive value of the string
    if ($type == 'string')
        return $__string_valueOf__.call($object);

    // If the object is a boolean, return it as a string primitive
    if ($type == 'boolean')
        return $__boolean_toString__.call($object);

    // If the object is a number, return it as a string primitive
    if ($type == 'number')
        return $__number_toString__.call($object);

  //if ($type == 'symbol' && $__symbol)
  //    return $__symbol_toString__.call($object);

    // FORMAT $lookup
    $lookup = $lookup !== undefined ?
              $$_asBoolean($lookup) :
              false;

    // If the lookup flag is set and the object is neither a null reference nor undefined
    if ($lookup && $object != null)
    {
        // If the object is a symbol or does not have a "toString()" function, return an empty string primitive
        if ($type == 'symbol' || typeof $object.toString != 'function')
            return '';

        // Call the "toString()" function
        var $return = $object.toString();

        // If the function returned a string primitive, return the return value of the function
        if (typeof $return == 'string')
            return $return;

        // If the function returned a string, return the primitive value of the string
        if ($return != null && $_types[$__toString__.call($return)] == 'string')
            return $__string_valueOf__.call($return);
    }

    // Return an empty string primitive
    return '';
};

$_defineMethod('asString', $$_asString);