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
var $$_type = $_symbolCreate ?
function($object)
{
    // If the object is a null reference or undefined, return either the "null" or "undefined" type string
    if ($object == null)
        return $object === null ? 'null' : 'undefined';

    // Get the internal type of the object
    var $typeof = typeof $object;

    // If the object is a either a boolean, number, string, or symbol primitive, return the internal type string
    if ($typeof == 'boolean' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol' && $__symbol)
        return $typeof;

    // If the object is a function, return either the "class" or "function" type string
    if ($typeof == 'function')
        return $object[$_symbol_class] === $object ? 'class' : $typeof;

    // If the object is an instance, return the "instance" type string
    if ($object[$_symbol_instance] === $object)
        return 'instance';

    // If the object is a window object, return the "window" type string
    if ($object === $_window || $object.window === $object && !$__hasOwnProperty__.call($object, 'window') && $__getPrototypeOf($object) === null)
        return 'window';

    // Return the type string from the internal types lookup
    return $_types[$__toString__.call($object)] || 'object';
} :
function($object)
{
    // If the object is a null reference or undefined, return either the "null" or "undefined" type string
    if ($object == null)
        return $object === null ? 'null' : 'undefined';

    // Get the internal type of the object
    var $typeof = typeof $object;

    // If the object is a either a boolean, number, or string primitive, return the internal type string
    if ($typeof == 'boolean' || $typeof == 'number' || $typeof == 'string')
        return $typeof;

    // If the object is a function, return either the "class" or "function" type string
    if ($typeof == 'function')
        return $object[$_symbol_lock] && $_unlockSymbolsClass($object) ? 'class' : $typeof;

    // If the object is an instance, return the "instance" type string
    if ($object[$_symbol_lock] && $_unlockSymbolsInstance($object))
        return 'instance';

    // If the object is a window object, return the "window" type string
    if ($object === $_window || $object.window === $object && !$__hasOwnProperty__.call($object, 'window') && $__getPrototypeOf($object) === null)
        return 'window';

    // Return the type string from the internal types lookup
    return $_types[$__toString__.call($object)] || 'object';
};

$_defineMethod('type', $$_type);