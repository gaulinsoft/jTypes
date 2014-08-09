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
var $_runtimeMatrix = function($metaclass, $metalength, $abstract, $expando, $internal, $model, $primitive, $struct, $unlocked)
{
    // Create the merge index, metadata, and handles map
    var $class        = null,
        $merge        = 0,
        $metainstance = new $__array($metalength),
        $handles      = $__create(null),
        $readonlys    = false,
        $type         = $_class;

    // Create the runtime build helper
    var $build = function()
    {
        // If the class has been built, return false
        if (!$build)
            return false;

        // Reset the build reference and compile the metadata
        $build = null;
        $merge = $_compilerDirectives($metaclass, $metalength, $metainstance, null, null, $primitive, $struct);

        // Loop through the metadata from base to derived
        for (var $i = $metalength - 1; $i >= 0; $i--)
        {
            // Get the cache and directives array
            var $cache      = $metaclass[$i],
                $directives = $metainstance[$i];

            // If the previous index was the internal index, set the type as the class
            if ($i == $internal + 1)
                $type = $cache[$_cache_class];

            // Set the class handle and index in the handles map
            $handles[$cache[$_cache_class][$_symbol_handle]] = $i;

            // If no readonlys are found, check if any readonly instructions are found in the directives array
            if (!$readonlys)
                for (var $j = 0, $k = $directives.length; $j < $k && !$readonlys; $j++)
                    $readonlys = !!($directives[$j][$_directive_instructions] & $_instructions_data_readonly);
        }

        // Return true
        return true;                
    };

    // If the class is abstract
    if ($abstract)
    {
        // Create the runtime class constructor
        $class = function()
        {
            // If the class has not been built, build the class
            if ($build)
                $build();

            // Throw an exception
            $_exception($_lang_class_abstract_instance);
        };

        // Set the class metadata
        $_data($class, $_symbol_build, $build);

        // Return the runtime class constructor
        return $class;
    }

    // Create the root object descriptors
    var $descriptorThisIs   = { 'value': function($class)
    {
        // If the class is not a class, return false
        if (!$class || !$class[$_symbol_lock] || !$_unlockSymbolsClass($class))
            return false;

        // Return true if an index was found in the handles map for the handle of the provided class
        return $handles[$class[$_symbol_handle]] != null;
    } };
    var $descriptorThisType = { 'value': function()
    {
        // Return the instance type
        return $type;
    } };

    // Create the runtime class constructor
    $class = function()
    {
        // If the class has not been built, build the class
        if ($build)
            $build();

        // Check if the new operator was used and create the instance matrix, overrides object, and readonly flag
        var $new         = this instanceof $class && (!this[$_symbol_lock] || !$_unlockSymbolsInstance(this)),
            $instance    = new $__array($metalength),
            $this        = this,
            $private     = null,
            $protected   = !$struct ? $this : null,
            $public      = $this,
            $base        = !$struct ? $this : null,
            $construct   = null,
            $base1       = null,
            $constructor = null,
            $overrides   = !$struct && $merge > 1 ?
                           $__create(null) :
                           null,
            $readonly    = $readonlys ?
                           $_runtimeFlag() :
                           null,
            $return      = undefined;

        // If the new operator was not used
        if (!$new)
        {
            // Create the root object
            $this = $public = $__create($class.prototype);

            // If the class is not a struct, set the base and protect instance objects as the newly created root object
            if (!$struct)
                $base = $protected = $this;
        }

        // Create the root instance object
        var $root = $__create($this);

        // If the class is expando, set the base, protected, and public instance objects as the root instance object
        if ($expando)
            $base = $protected = $public = $root;

        // Loop through the metadata from base to derived
        for (var $i = $metalength - 1; $i >= 0; $i--)
        {
            // Get the cache and store the base constructor
            var $cache = $metaclass[$i],
                $ctor  = $constructor;

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

            // Create the internal descriptors
            var $descriptorBase = $base1 ?
                                  { 'value': $base1 } :
                                  null,
                $descriptorSelf = { 'value': $root },
                $descriptorThis = { 'value': $public },
                $descriptorType = { 'value': $cache[$_cache_class] };

            // If the class is not unlocked or the base instance object is unique
            if (!$unlocked || $base !== $protected)
            {
                // If these are not the root instance objects, set the base descriptor on the private instance object
                if ($base1)
                    $__defineProperty($private, '__base', $descriptorBase);

                // Set the self, public, and type descriptors on the private instance object
                $__defineProperty($private, '__self', $descriptorSelf);
                $__defineProperty($private, '__this', $descriptorThis);
                $__defineProperty($private, '__type', $descriptorType);
            }

            // If these are the root instance objects, set the self descriptor on the public instance object
            if (!$base1)
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
                if ($base1)
                    $__defineProperty($base, '__base', $descriptorBase);

                // Set the self, public, and type references on the base instance object
                $__defineProperty($base, '__self', $descriptorSelf);
                $__defineProperty($base, '__this', $descriptorThis);
                $__defineProperty($base, '__type', $descriptorType);
            }

            // Get the constructor from the cache
            $constructor = $cache[$_cache_constructor];

            // If the cache has a constructor
            if ($constructor)
            {
                // Create the construct instance object
                $construct = $__create($private);

                // Set the data descriptor on the construct instance object
                $__defineProperty($construct, '__data', { 'value': $private });

                // If the base cache has a constructor, set the base constructor on the construct instance object
                if ($ctor)
                    $__defineProperty($construct, '__base', { 'value': $ctor });

                // Create the constructor context wrapper function
                $constructor = $_runtimeThis(null, $construct, null, $constructor);
            }
            // Set the base constructor as the constructor
            else
                $constructor = $ctor;

            // Create the instances in the instance matrix
            var $instances = $instance[$i] = $constructor === $ctor ?
                                             [$private, $protected, $public, $base] :
                                             [$private, $protected, $public, $base, $construct];

            // Lock the instance type on the instance objects
            $_lockSymbolsInstance($instances, $private, $protected, $public, $base, $constructor !== $ctor ? $construct : null);

            // If there are no overrides in the instance matrix
            if (!$overrides)
            {
                // Get the directives from the directives matrix
                var $directives = $metainstance[$i];

                // Execute the directives on the instance objects
                for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                    $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, $readonly);

                // Freeze the instance objects
                $__freeze($private);
                $__freeze($public);

                // If a protected instance object was created, freeze it
                if ($protected)
                    $__freeze($protected);

                // If a base instance object was created and it is unique, freeze it
                if ($base && $base !== $protected)
                    $__freeze($base);
            }

            // If the cache had a constructor, freeze the construct instance object
            if ($constructor !== $ctor)
                $__freeze($construct);

            // Set the previous base instance as the base instance
            $base1 = $base;
        }

        // If there are overrides in the instance matrix
        if ($overrides)
        {
            // Loop through the metadata from derived to base
            for (var $i = 0; $i < $metalength; $i++)
            {
                // Get the directives and instances array
                var $directives = $metainstance[$i],
                    $instances  = $instance[$i];

                // Get the instance objects from the instances array
                $private   = $instances[$_instance_private];
                $protected = $instances[$_instance_protected];
                $public    = $instances[$_instance_public];
                $base      = $instances[$_instance_base];

                // Execute the directives on the instance objects
                for (var $j = 0, $k = $directives.length; $j < $k; $j++)
                    $_runtimeDirective($private, $protected, $public, $base, $directives[$j], $instance, $overrides, $readonly);
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

                // Freeze the instance objects
                $__freeze($private);
                $__freeze($public);

                // If a protected instance object was created, freeze it
                if ($protected)
                    $__freeze($protected);

                // If a base instance object was provided and it is unique, freeze it
                if ($base && $base !== $protected)
                    $__freeze($base);
            }
        }

        // Define the as, is, and type method descriptors on the root object
        $__defineProperty($this, 'as',   { 'value': $_runtimeCast($handles, $instance) });
        $__defineProperty($this, 'is',   $descriptorThisIs);
        $__defineProperty($this, 'type', $descriptorThisType);

        // Freeze the root object
        $__freeze($this);

        // If the class is a model, freeze the root instance object
        if ($model)
            $__freeze($root);

        // If a constructor was provided and the new operator was used or the class is neither a model nor a struct, apply the constructor and store its return value
        if ($constructor && ($new || !$model && !$struct))
            $return = $constructor.apply($construct, arguments);

        // If a readonly accessor was created, set the readonly flag
        if ($readonly)
            $readonly(true);

        // If the new operator was not used and the constructor did not return undefined or the construct (or private if struct) instance object, return the constructor return value
        if (!$new && $return !== undefined && $return !== (!$struct ? $construct : $private))
            return $return;

        // Return the public instance object
        return $public;
    };

    // Set the class metadata
    $_data($class, $_symbol_build, $build);

    // Return the runtime class constructor
    return $class;
};