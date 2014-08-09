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
$_defineMethod('isArgumentsObject', function($object)
{
    // Return true if the object is an arguments object
    return $__toString__.call($object) == '[object Arguments]';
});
$_defineMethod('isComplexObject',   function($object)
{
    // If the object is not an object, return false
    if (!$object || $$_type($object) != 'object')
        return false;

    // Return true if the prototype of the object is not the object prototype
    return $__getPrototypeOf($object) !== $__objectProto__;
});
$_defineMethod('isFlatObject',      function($object)
{
    // If the object is not an object, return false
    if (!$object || $$_type($object) != 'object')
        return false;

    // Return true if the prototype of the object is null
    return $__getPrototypeOf($object) === null;
});
$_defineMethod('isSimpleObject',    function($object)
{
    // If the object is not an object, return false
    if (!$object || $$_type($object) != 'object')
        return false;

    // Return true if the prototype of the object is the object prototype
    return $__getPrototypeOf($object) === $__objectProto__;
});

$_defineMethod('isArrayLikeObject',  function($object)
{
    // If the object is null or undefined, return false
    if ($object == null)
        return false;

    // Get the object length
    var $length = $object.length;

    // Return true if the length is an integer and is greater than or equal to zero
    return $$_isInteger($length) && $length >= 0;
});
$_defineMethod('isWindowLikeObject', function($object)
{
    // Return true if the object has a window property that is a self reference
    return !!$object && $object.window === $object;
});

$_defineMethod('isObjectInstance', function($object)
{
    // If the object is a null reference or undefined, return false
    if ($object == null)
        return false;

    // Return true if the object inherits from the object prototype
    return $__isPrototypeOf__.call($__objectProto__, $object);
});