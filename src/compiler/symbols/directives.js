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
var $_compilerSymbolsDirectives = function($metaclass, $metalength, $metainstance, $defaults, $prototype, $sources, $internal, $merge, $optimized, $primitive, $struct, $unlocked)
{
    // Create the instance matrix, root instance object, handles map, and overrides object
    var $instance  = new $__array($metalength),
        $this      = $__create($prototype),
        $private   = null,
        $protected = !$struct ? $this : null,
        $public    = $this,
        $base      = !$struct ? $this : null,
        $construct = null,
        $ctor      = null,
        $data3     = null,
        $data5     = null,
        $handles   = $__create(null),
        $overrides = !$struct && $merge > 1 ?
                     $__create(null) :
                     null,
        $type      = $_class;

    // Loop through the metadata from base to derived
    for (var $i = $metalength - 1; $i >= 0; $i--)
    {
        // Get the cache, constructor, class, and data symbols
        var $cache       = $metaclass[$i],
            $constructor = $cache[$_cache_constructor],
            $class       = $cache[$_cache_class],
            $data0       = $cache[$_cache_symbols_private],
          //$data1       = $cache[$_cache_symbols_protected],
            $data2       = $cache[$_cache_symbols_public];

        // If the previous index was the internal index, set the type as the class
        if ($i == $internal + 1)
            $type = $class;

        // If a root data symbol has not been retrieved, get the root data symbol
        if (!$data5)
            $data5 = $cache[$_cache_symbols_root];

        // Set the class handle and index in the handles map
        $handles[$class[$_symbol_handle]] = $i;

        // Create the instance objects
        $public    = $__create($public);
        $protected = !$struct ?
                     $__create($protected) :
                     null;
        $private   = $__create($struct ?
                               $public :
                               $protected);
        $base      = $i == 0 ?
                     null :
                     $i < $merge ?
                     $__create($base) :
                     $protected;
        $construct = !$struct && $constructor ?
                     $__create($private) :
                     null;

        // Create the internal descriptors
        var $descriptorBase = $data3 ?
                              $_compilerSymbolsData('__base', $data3, null, {}, false, false, true) :
                              null,
            $descriptorSelf = $_compilerSymbolsData('__self', $data5, null, {}, false, false, true),
            $descriptorThis = $_compilerSymbolsData('__this', $data2, null, {}, false, false, true),
            $descriptorType = { 'value': $class };

        // If the class is not unlocked or the base instance object is unique
        if (!$unlocked || $base !== $protected)
        {
            // If these are not the root instance objects, set the base descriptor on the private instance object
            if ($data3)
                $__defineProperty($private, '__base', $descriptorBase);

            // Set the self, public, and type descriptors on the private instance object
            $__defineProperty($private, '__self', $descriptorSelf);
            $__defineProperty($private, '__this', $descriptorThis);
            $__defineProperty($private, '__type', $descriptorType);
        }

        // If these are the root instance objects, set the self descriptor on the public instance object
        if (!$data3)
            $__defineProperty($public, '__self', $descriptorSelf);

        // Set the type descriptor on the public instance object
        $__defineProperty($public,
                          '__type',
                          $i <= $internal ?
                          { 'value': null } :
                          $descriptorType);

        // If the class is unlocked and a base instance object was provided
        if ($unlocked && $base)
        {
            // If these are not the root instance objects, set the base descriptor on the base instance object
            if ($data3)
                $__defineProperty($base, '__base', $descriptorBase);

            // Set the self, public, and type descriptors on the base instance object
            $__defineProperty($base, '__self', $descriptorSelf);
            $__defineProperty($base, '__this', $descriptorThis);
            $__defineProperty($base, '__type', $descriptorType);
        }

        // If a construct instance object was created
        if ($construct)
        {
            // Set the data descriptor on the construct instance object
            $__defineProperty($construct, '__data', $_compilerSymbolsData('__data', $data0, null, {}, false, false, true));

            // If the base cache has a constructor, set the base constructor on the construct instance object
            if ($ctor)
                $__defineProperty($construct, '__base', { 'value': $ctor });
        }

        // If the cache is inherited
        if ($i > 0)
        {
            // Get the base data symbol
            $data3 = $cache[$_cache_symbols_base];

            // If the cache has a constructor, create the base constructor
            if ($constructor)
                $ctor = $_compilerSymbolsThis('~constructor', $cache[$_cache_symbols_construct], null, $constructor);
        }

        // If the class has either the primitive or the struct modifiers
        if ($primitive || $struct)
        {
            // Create the clone method descriptor
            var $clone = { 'value': $_compilerSymbolsClone($data2, $sources, $primitive) };

            // Set the clone method descriptor on the public instance object
            $__defineProperty($public, 'clone', $clone);

            // If the class is not a struct
            if (!$struct)
            {
                // Set the clone method descriptor on the protected instance object
                $__defineProperty($protected, 'clone', $clone);

                // If the base instance object is unique, set the clone method descriptor on the base instance object
                if ($base && $base !== $protected)
                    $__defineProperty($base, 'clone', $clone);
            }
        }

        // If the class is optimized
        if ($optimized)
        {
            // Define the default instance descriptors on the defaults object
            $_compilerSymbolsOptimized($defaults, $data0, $private);
          //$_compilerSymbolsOptimized($defaults, $data1, $protected);
            $_compilerSymbolsOptimized($defaults, $data2, $public);
            $_compilerSymbolsOptimized($defaults, $data3, $base);
        }

        // Create the instances in the instance matrix
        var $instances = $instance[$i] = $struct ?
                                         [$private, $protected, $public] :
                                         [$private, $protected, $public, $base, $construct];

        // If there are no overrides in the instance matrix
        if (!$overrides)
        {
            // Get the directives from the directives matrix
            var $directives = $metainstance[$i];

            // Execute the directives on the instance objects
            for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, null, $data0);

            // Freeze the instance objects
            $__freeze($private);
            $__freeze($public);

            // If a protected instance object was created, freeze it
            if ($protected)
                $__freeze($protected);

            // If a base instance object was created and it is unique, freeze it
            if ($base && $base !== $protected)
                $__freeze($base);

            // If a construct instance object was created, freeze it
            if ($construct)
                $__freeze($construct);

            // Set the instances in the metainstance matrix
            $metainstance[$i] = $instances;
        }
    }

    // If there are overrides in the instance matrix
    if ($overrides)
    {
        // Loop through the metadata from derived to base
        for (var $i = 0; $i < $metalength; $i++)
        {
            // Get the private data symbol, directives, and instances array
            var $data0      = $metaclass[$i][$_cache_symbols_private],
                $directives = $metainstance[$i],
                $instances  = $instance[$i];

            // Get the instance objects from the instances array
            $private   = $instances[$_instance_private];
            $protected = $instances[$_instance_protected];
            $public    = $instances[$_instance_public];
            $base      = $instances[$_instance_base];
            $construct = $instances[$_instance_construct];

            // Execute the directives on the instance objects
            for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, null, $data0);
        }

        // Loop through the metadata from base to derived
        for (var $i = $metalength - 1; $i >= 0; $i--)
        {
            // Get the instances array
            var $instances = $instance[$i];

            // Get the instance objects from the instances array
            $private   = $instances[$_instance_private];
            $protected = $instances[$_instance_protected];
            $public    = $instances[$_instance_public];
            $base      = $instances[$_instance_base];
            $construct = $instances[$_instance_construct];

            // Freeze the instance objects
            $__freeze($private);
            $__freeze($public);

            // If a protected instance object was created, freeze it
            if ($protected)
                $__freeze($protected);

            // If a base instance object was provided and it is unique, freeze it
            if ($base && $base !== $protected)
                $__freeze($base);

            // If a construct instance object was created, freeze it
            if ($construct)
                $__freeze($construct);

            // Set the instances in the metainstance matrix
            $metainstance[$i] = $instances;
        }
    }

    // Define the root instance methods on the root instance object
    $_compilerSymbolsRoot($metaclass, $handles, $sources, $this, $primitive, $struct, $type);

    // If the class is optimized, define the default root instance descriptor on the defaults object
    if ($optimized)
        $_compilerSymbolsOptimized($defaults, $data5, $this);

    // Freeze the root instance object
    $__freeze($this);

    // Return the root instance object
    return $this;
};