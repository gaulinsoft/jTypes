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
var $$_isPrimitive = function($object)
{
    // If the object is a null reference or undefined, return true
    if ($object == null)
        return true;

    // Get the internal type of the object
    var $typeof = typeof $object;

    // Return true if the object is a boolean, number, string, or symbol primitive
    return $typeof == 'boolean' || $typeof == 'number' || $typeof == 'string' || $typeof == 'symbol' && !!$__symbol;
};

$_defineMethod('isPrimitive', $$_isPrimitive);