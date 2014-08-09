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
$_defineMethod('base',  function($class)
{
    // CHECK $class
    if (!$$_isClass($class))
        return null;

    // Get the metaclass
    var $metaclass = $class[$_symbol_metaclass];

    // If symbols are not supported, unlock the metaclass
    if (!$_symbolCreate)
        $metaclass = $metaclass($_lock);

    // If the metaclass has no base cache, return null
    if ($metaclass.length < 2)
        return null;

    // Return the base class from the base cache
    return $metaclass[1][$_cache_class];
});
$_defineMethod('build', function($class)
{
    // CHECK $class
    if (!$$_isClass($class))
        return null;

    // Call the build helper function
    return !!$class[$_symbol_build]();
});