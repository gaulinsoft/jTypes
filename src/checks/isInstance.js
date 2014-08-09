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
var $$_isInstance = $_symbolCreate ?
function($object)
{
    // Return true if the object is an instance
    return !!$object && $object[$_symbol_instance] === $object;
} :
function($object)
{
    // Return true if the object is neither null nor undefined and is a class instance
    return $object != null && !!$_unlockSymbolsInstance($object);
};

$_defineMethod('isInstance', $$_isInstance);