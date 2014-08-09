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
$_defineMethod('isNull',      function($argument)
{
    // Return true if the argument is null
    return $argument === null;
});
$_defineMethod('isObject',    function($object)
{
    // Return true if the object is neither undefined nor null
    return $object != null;
});
$_defineMethod('isUndefined', function($argument)
{
    // Return true if the argument is undefined
    return $argument === undefined;
});
$_defineMethod('isWindow',    function($object)
{
    // If the object is the window reference, return true
    if ($object === $_window)
        return true;

    // Return true if the object is a window reference
    return $$_type($object) == 'window';
});

$_defineMethod('isCallableType',  function($object)
{
    // If the object is a null reference or undefined, return false
    if ($object == null)
        return false;

    // If the object is a function, return true
    if (typeof $object == 'function')
        return true;

    // Get the type of the object
    var $type = $$_type($object);

    // Return true if the object is a class or function
    return $type == 'class' || $type == 'function';
});
$_defineMethod('isPrimitiveType', function($object)
{
    // If the object is a null reference or undefined, return true
    if ($object == null)
        return true;

    // Get the type of the object
    var $type = $$_type($object);

    // Return true if the object is a value type
    return $type == 'boolean' || $type == 'number' || $type == 'string' || $type == 'symbol' && !!$__symbol;
});
$_defineMethod('isReferenceType', function($object)
{
    // If the object is a null reference or undefined, return false
    if ($object == null)
        return false;

    // Get the type of the object
    var $type = $$_type($object);

    // Return true if the object is not a value type
    return $type != 'boolean' && $type != 'number' && $type != 'string' && ($type != 'symbol' || !$__symbol);
});
$_defineMethod('isValueType',     function($object)
{
    // If the object is a null reference or undefined, return false
    if ($object == null)
        return false;

    // Get the type of the object
    var $type = $$_type($object);

    // Return true if the object is a boolean, number, string, or symbol
    return $type == 'boolean' || $type == 'number' || $type == 'string' || $type == 'symbol' && !!$__symbol;
});