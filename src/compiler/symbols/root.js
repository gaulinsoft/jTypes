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
var $_compilerSymbolsRoot = function($metaclass, $handles, $sources, $root, $primitive, $struct, $type)
{
    // Set the as, is, and type method descriptors on the root instance object
    $__defineProperty($root, 'as',   { 'value': function($class)
    {
        // Get the hidden instance data from the function context
        var $data = this ? this[$_symbol_data] : null;

        // If no hidden instance data was found, throw an exception
        if (!$data)
            $_exceptionFormat($_lang_conflict_generic, 'as()');

        // If the class is not a class, return null
        if (!$class || $class[$_symbol_class] !== $class)
            return null;

        // Get the index from the handles map for the handle of the provided class
        var $index = $handles[$class[$_symbol_handle]];

        // If an index was not found in the handles map, return null
        if ($index == null)
            return null;

        // Return the public instance object from the hidden instance data
        return $data[$metaclass[$index][$_cache_symbols_public]];
    } });
    $__defineProperty($root, 'is',   { 'value': function($class)
    {
        // Get the hidden instance data from the function context
        var $data = this ? this[$_symbol_data] : null;

        // If no hidden instance data was found, throw an exception
        if (!$data)
            $_exceptionFormat($_lang_conflict_generic, 'is()');

        // If the class is not a class, return false
        if (!$class || $class[$_symbol_class] !== $class)
            return false;

        // Return true if an index was found in the handles map for the handle of the provided class
        return $handles[$class[$_symbol_handle]] != null;
    } });
    $__defineProperty($root, 'type', { 'value': function()
    {
        // If no hidden instance data was found, throw an exception
        if (!this || !this[$_symbol_data])
            $_exceptionFormat($_lang_conflict_generic, 'type()');

        // Return the instance type
        return $type;
    } });

    // If the class has either the primitive or the struct modifiers
    if ($primitive || $struct)
    {
        // Set the clone and equals method descriptors on the root instance object
        $__defineProperty($root, 'clone',  { 'value': $_compilerSymbolsClone($metaclass[0][$_cache_symbols_root], $sources, $primitive) });
        $__defineProperty($root, 'equals', { 'value': function($instance)
        {
            // Get the hidden instance data from the function context
            var $data = this ? this[$_symbol_data] : null;

            // If no hidden instance data was found, throw an exception
            if (!$data)
                $_exceptionFormat($_lang_conflict_generic, 'equals()');

            // If the argument is not an instance, return false
            if (!$instance || $instance[$_symbol_instance] !== $instance)
                return false;

            // Get the argument hidden instance data
            var $instanceData = $instance[$_symbol_data];

            // If the class handles of the instances are not equal, return false
            if ($data[$_symbol_data_handle] != $instanceData[$_symbol_data_handle])
                return false;

            for (var $i = 0, $j = $sources.length; $i < $j; $i++)
            {
                // Get the source symbol and values
                var $source        = $sources[$i],
                    $value         = $data[$source],
                    $instanceValue = $instanceData[$source];

                // If the primitive flag is set and both values are instances (which means they are primitive structs)
                if ($primitive && $value && $value[$_symbol_instance] === $value && $instanceValue && $instanceValue[$_symbol_instance] === $instanceValue)
                {
                    // If the primitive structs are not equal, return false
                    if (!$value.equals($instanceValue))
                        return false;
                }
                // If the values are not equal, return false
                else if ($value !== $instanceValue)
                    return false;
            }

            // Return true
            return true;
        } });
    }

    // Remove the root reference
    $root = null;
};