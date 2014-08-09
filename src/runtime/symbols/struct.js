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
var $_runtimeSymbolsStruct = function($metaclass, $handle, $name, $constructor, $defaults, $internal, $optimized)
{
    // Get the private, public, and root data symbols (but the private and public metainstances have yet to be built)
    var $cache          = $metaclass[0],
        $metaprivate    = null,
        $metapublic     = null,
        $symbolsprivate = $cache[$_cache_symbols_private],
        $symbolspublic  = $cache[$_cache_symbols_public],
        $symbolsroot    = $cache[$_cache_symbols_root];

    // Create the runtime build helper and struct constructor
    var $build  = function()
    {
        // If the struct has been built, return false
        if (!$build)
            return false;

        // Reset the build reference
        $build = null;

        // Get the struct modifiers, create the data sources array, and compile the metadata
        var $metainstance = new $__array(1),
            $modifiers    = $struct[$_symbol_modifiers],
            $primitive    = !!($modifiers & $_modifiers_class_primitive),
            $sources      = [],
            $merge        = $_compilerDirectives($metaclass, 1, $metainstance, $defaults, $sources, $primitive, true);

        // Compile the symbols metadata
        $_compilerSymbolsDirectives($metaclass, 1, $metainstance, $defaults, $struct.prototype, $sources, $internal, $merge, $optimized, $primitive, true, !!($modifiers & $_modifiers_class_unlocked));

        // Cache the private and public metainstances
        $metaprivate = $metainstance[0][$_instance_private];
        $metapublic  = $metainstance[0][$_instance_public];

        // Return true
        return true; 
    };
    var $struct = function($clone)
    {
        // If the struct has not been built, build the struct
        if ($build)
            $build();

        // Check if the new operator was used and create the hidden instance data
        var $new  = this instanceof $struct && this[$_symbol_instance] !== this,
            $this = $__create($defaults);

        // Create the private and public instance objects (and set them in the hidden instance data)
        var $private = $this[$symbolsprivate] = !$optimized || $constructor && $new ?
                                                $__create($metaprivate) :
                                                null,
            $public  = $this[$symbolspublic]  = $this[$symbolsroot] = $__create($metapublic);

        // If ECMAScript 6 symbols are not supported
        if (!$__symbol)
        {
            // Set the instance data on the public instance object (and lock the instance type on it)
            $_data($public, $_symbol_data,     $this);
            $_data($public, $_symbol_instance, $public);

            // If a private instance object was created
            if ($private)
            {
                // Set the instance data on the private instance object (and lock the instance type on it)
                $_data($private, $_symbol_data,     $this);
                $_data($private, $_symbol_instance, $private);
            }
        }
        else
        {
            // Set the hidden instance data on the public instance object (and lock the instance type on it)
            $public[$_symbol_data]     = $this;
            $public[$_symbol_instance] = $public;

            // If a private instance object was created
            if ($private)
            {
                // Set the hidden instance data on the private instance object (and lock the instance type on it)
                $private[$_symbol_data]     = $this;
                $private[$_symbol_instance] = $private;
            }
        }

        // If the global prototype lock flag is set
        if ($_protoLock)
        {
            // Freeze the public instance object
            $__freeze($public);

            // If a private instance object was created, freeze the private instance object
            if ($private)
                $__freeze($private);
        }

        // Set the type handle and name in the hidden instance data
        $this[$_symbol_data_handle]   = $handle;
        $this[$_symbol_data_name]     = $name;
        $this[$_symbol_data_readonly] = false;

        // If the struct has a constructor and the new operator was used (and the struct is not being cloned), apply the constructor in the context of a private instance
        if ($constructor && $new && $clone !== $_clone)
            $constructor.apply($private, arguments);

        // Set the readonly flag in the hidden instance data
        $this[$_symbol_data_readonly] = true;

        // Return the public instance object
        return $public;
    };

    // Set the struct metadata
    $_data($struct, $_symbol_build, $build);

    // Return the runtime struct constructor
    return $struct;
};