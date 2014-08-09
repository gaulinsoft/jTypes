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
var $_runtimeSymbolsMatrix = function($metaclass, $metalength, $handle, $name, $defaults, $abstract, $internal, $model, $optimized)
{
    // Create the metadata array and get the root data symbol (but the root metainstance has yet to be built)
    var $class        = null,
        $metainstance = new $__array($metalength),
        $metaroot     = null,
        $symbolsroot  = $metaclass[0][$_cache_symbols_root];

    // Create the runtime build helper
    var $build = function()
    {
        // If the class has been built, return false
        if (!$build)
            return false;

        // Reset the build reference
        $build = null;

        // Get the class modifiers, create the data sources array (if the class is primitive), and compile the metadata
        var $modifiers = $class[$_symbol_modifiers],
            $primitive = !!($modifiers & $_modifiers_class_primitive),
            $sources   = $primitive ?
                         [] :
                         null,
            $merge     = $_compilerDirectives($metaclass, $metalength, $metainstance, $defaults, $sources, $primitive, false);

        // Compile the symbols metadata
        $metaroot = $_compilerSymbolsDirectives($metaclass, $metalength, $metainstance, $defaults, $class.prototype, $sources, $internal, $merge, $optimized, $primitive, false, !!($modifiers & $_modifiers_class_unlocked));

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

    // Create the runtime class constructor
    $class = function($clone)
    {
        // If the class has not been built, build the class
        if ($build)
            $build();

        // Check if the new operator was used and create the hidden instance data
        var $new         = this instanceof $class && this[$_symbol_instance] !== this,
            $this        = $__create($defaults),
            $base        = null,
            $construct   = null,
            $private     = null,
          //$protected   = null,
            $public      = null,
            $constructor = null,
            $return      = undefined;

        // If the class is not optimized
        if (!$optimized)
        {
            // Create the root instance object (and set it in the hidden instance data)
            var $root = $this[$symbolsroot] = $__create($metaroot);

            // If ECMAScript 6 symbols are not supported
            if (!$__symbol)
            {
                // Set the instance data on the root instance object (and lock the instance type on it)
                $_data($root, $_symbol_data,     $this);
                $_data($root, $_symbol_instance, $root);
            }
            else
            {
                // Set the hidden instance data on the root instance object (and lock the instance type on it)
                $root[$_symbol_data]     = $this;
                $root[$_symbol_instance] = $root;
            }

            // If the global prototype lock flag is set, freeze the root instance object
            if ($_protoLock)
                $__freeze($root);
        }

        // Loop through the metadata from base to derived
        for (var $i = $metalength - 1; $i >= 0; $i--)
        {
            // Get the cache from the metaclass and the symbols directive from the metainstance
            var $cache     = $metaclass[$i],
                $directive = $metainstance[$i];

            // If the class is not optimized
            if (!$optimized)
            {
                // Create the private, protected, and public instance objects (and set them in the hidden instance data)
                $private   = $this[$cache[$_cache_symbols_private]]   = $__create($directive[$_instance_private]);
              //$protected = $this[$cache[$_cache_symbols_protected]] = $__create($directive[$_instance_protected]);
                $public    = $this[$cache[$_cache_symbols_public]]    = $__create($directive[$_instance_public]);

                // If ECMAScript 6 symbols are not supported
                if (!$__symbol)
                {
                    // Set the instance data on the private, protected, and public instance objects (and lock the instance type on them)
                    $_data($private,   $_symbol_data,     $this);
                    $_data($private,   $_symbol_instance, $private);
                  //$_data($protected, $_symbol_data,     $this);
                  //$_data($protected, $_symbol_instance, $protected);
                    $_data($public,    $_symbol_data,     $this);
                    $_data($public,    $_symbol_instance, $public);
                }
                else
                {
                    // Set the hidden instance data on the private, protected, and public instance objects (and lock the instance type on them)
                    $private  [$_symbol_data]     = $this;
                    $private  [$_symbol_instance] = $private;
                  //$protected[$_symbol_data]     = $this;
                  //$protected[$_symbol_instance] = $protected;
                    $public   [$_symbol_data]     = $this;
                    $public   [$_symbol_instance] = $public;
                }

                // If the global prototype lock flag is set
                if ($_protoLock)
                {
                    // Freeze the private, protected, and public instance objects
                    $__freeze($private);
                  //$__freeze($protected);
                    $__freeze($public);
                }

                // If the cache is inherited
                if ($i > 0)
                {
                    // Create the base instance object (and set it in the hidden instance data)
                    $base = $this[$cache[$_cache_symbols_base]] = $__create($directive[$_instance_base]);

                    // If ECMAScript 6 symbols are not supported
                    if (!$__symbol)
                    {
                        // Set the instance data on the base instance object (and lock the instance type on it)
                        $_data($base, $_symbol_data,     $this);
                        $_data($base, $_symbol_instance, $base);
                    }
                    else
                    {
                        // Set the hidden instance data on the base instance object (and lock the instance type on it)
                        $base[$_symbol_data]     = $this;
                        $base[$_symbol_instance] = $base;
                    }

                    // If the global prototype lock flag is set, freeze the base instance object
                    if ($_protoLock)
                        $__freeze($base);
                }
                // Reset the base instance object
                else
                    $base = null;
            }
            // If the cache is not inherited, create the public instance object
            else if ($i == 0)
                $public = $this[$cache[$_cache_symbols_public]];

            // If the new keyword was not used and the class is a model, continue
            if (!$new && $model)
                continue;

            // Get the construct metainstance from the symbols directive
            var $metaconstruct = $directive[$_instance_construct];

            // If a construct metainstance was not found, continue
            if (!$metaconstruct)
                continue;

            // Create the construct instance object (and set it in the hidden instance data)
            $construct = $this[$cache[$_cache_symbols_construct]] = $__create($metaconstruct);

            // If ECMAScript 6 symbols are not supported
            if (!$__symbol)
            {
                // Set the instance data on the construct instance object (and lock the instance type on it)
                $_data($construct, $_symbol_data,     $this);
                $_data($construct, $_symbol_instance, $construct);
            }
            else
            {
                // Set the hidden instance data on the construct instance object (and lock the instance type on it)
                $construct[$_symbol_data]     = $this;
                $construct[$_symbol_instance] = $construct;
            }

            // If the global prototype lock flag is set, freeze the construct instance object
            if ($_protoLock)
                $__freeze($construct);

            // Get the constructor from the cache
            $constructor = $cache[$_cache_constructor];
        }

        // Set the type handle and name in the hidden instance data
        $this[$_symbol_data_handle]   = $handle;
        $this[$_symbol_data_name]     = $name;
        $this[$_symbol_data_readonly] = false;

        // If the class has a constructor and the new operator was used or the class is not a model (and the class is not being cloned), apply the constructor in the context of a construct instance and store its return value
        if ($constructor && ($new || !$model) && $clone !== $_clone)
            $return = $constructor.apply($construct, arguments);

        // Set the readonly flag in the hidden instance data
        $this[$_symbol_data_readonly] = true;

        // If the constructor returned neither undefined nor the construct instance object, return its return value
        if ($return !== undefined && $return !== $construct)
            return $return;

        // Return the public instance object
        return $public;
    };

    // Set the class metadata
    $_data($class, $_symbol_build, $build);

    // Return the runtime class constructor
    return $class;
};