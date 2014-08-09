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
var $_compilerDirectives = function($metaclass, $metalength, $metainstance, $defaults, $sources, $primitive, $struct)
{
    // Create the filters cache, merge index, and overrides object
    var $filters   = $__create(null),
        $merge     = 0,
        $overrides = {};

    // Loop through the metadata from derived to base
    for (var $i = 0; $i < $metalength; $i++)
    {
        // Get the private and protected definitions objects from the cache and create the directives array
        var $cache         = $metaclass[$i],
            $class         = $cache[$_cache_class],
            $private       = $cache[$_cache_private],
            $privateKeys   = $__keys($private),
            $protected     = $cache[$_cache_protected],
            $protectedKeys = $__keys($protected),
            $directives    = new $__array($privateKeys.length + $protectedKeys.length),
            $namespace     = $class[$_symbol_namespace],
            $aliases       = $cache[$_cache_aliases],
            $includes      = $cache[$_cache_includes];

        // Reset the exception handle
        $_handle = $class[$_symbol_handle];

        // Compile the private definitions into the directives array (and increment the merge index if the definition was overridden in the overrides object)
        for (var $j = 0, $k = $privateKeys.length; $j < $k; $j++)
            if ($_compilerDirective($directives, $overrides, $defaults, $filters, $sources, $primitive, $struct, $i, $j, $private[$privateKeys[$j]], $namespace, $aliases, $includes) && $merge <= $i)
                $merge = $i + 1;

        // Compile the protected definitions into the directives array (and increment the merge index if the definition was overridden in the overrides object)
        for (var $j = 0, $k = $protectedKeys.length, $l = $privateKeys.length; $j < $k; $j++)
            if ($_compilerDirective($directives, $overrides, $defaults, $filters, $sources, $primitive, $struct, $i, $j + $l, $protected[$protectedKeys[$j]], $namespace, $aliases, $includes) && $merge <= $i)
                $merge = $i + 1;

        // Set the directives array in the metadata
        $metainstance[$i] = $directives;

        // Reset the exception handle
        $_handle = '';
    }

    // Return the merge index
    return $merge;
};