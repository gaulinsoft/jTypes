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
var $_runtimeDirective = function($private, $protected, $public, $base, $directive, $instance, $overrides, $readonly, $data0)
{
    // Get the directive constraint filter, instructions, name, and value
    var $filter       = $directive[$_directive_filter],
        $instructions = $directive[$_directive_instructions],
        $name         = $directive[$_directive_name],
        $value        = $directive[$_directive_value];

    // Create the descriptor
    var $descriptor = (
    {
        'configurable': !!($instructions & $_instructions_configurable),
        'enumerable':   !!($instructions & $_instructions_enumerable)
    });

    // If there are get or set accessor instructions
    if ($instructions & ($_instructions_get | $_instructions_set))
    {
        // If there is a data instruction
        if ($instructions & $_instructions_data)
        {
            // If there is not a readonly instruction, clear the readonly accessor
            if (!($instructions & $_instructions_data_readonly))
                $readonly = $data0 ? false : null;
            // If a private data symbol was provided, set the readonly flag
            else if ($data0)
                $readonly = true;

            // Set the data get and set accessors in the descriptor
            $descriptor = $data0 ?
                          $_compilerSymbolsData($name, $value, $filter, $descriptor, true, $readonly, false) :
                          $_runtimeData        ($name, $value, $filter, $descriptor, true, $readonly);
        }
        else
        {
            // If there is a get accessor instruction, set the get accessor in the descriptor
            if ($instructions & $_instructions_get)
                $descriptor['get'] = !($instructions & $_instructions_this) ?
                                     $value[0] :
                                     $data0 ?
                                     $_compilerSymbolsThis($name, $data0,   $filter, $value[0], 0) :
                                     $_runtimeThis        ($name, $private, $filter, $value[0], 0);

            // If there is a set accessor instruction, set the set accessor in the descriptor
            if ($instructions & $_instructions_set)
                $descriptor['set'] = !($instructions & $_instructions_this) ?
                                     $value[1] :
                                     $data0 ?
                                     $_compilerSymbolsThis($name, $data0,   $filter, $value[1], 1) :
                                     $_runtimeThis        ($name, $private, $filter, $value[1], 1);
        }

        // If there is an override instruction
        if ($instructions & $_instructions_override)
        {
            // If there is a base instruction, set the descriptor on the base instance object
            if ($instructions & $_instructions_base)
                $__defineProperty($base, $name, $descriptor);
            // If there is a base instance object, set the descriptor cache in it
            else if ($base)
                $base[$name] = $descriptor;

            // If there is a descriptor override instruction, set the descriptor in the overrides object
            if ($instructions & $_instructions_override_descriptor)
                $overrides[$name] = $descriptor;
            // If there is a get accessor override instruction, set the get accessor from the descriptor in the overrides object
            else if ($instructions & $_instructions_override_get)
                $overrides[$name]['get'] = $descriptor['get'];
            // If there is a set accessor override instruction, set the set accessor from the descriptor in the overrides object
            else if ($instructions & $_instructions_override_set)
                $overrides[$name]['set'] = $descriptor['set'];
        }
        else
        {
            // If there is a private overridden instruction
            if ($instructions & $_instructions_overridden_private)
            {
                // Create the base descriptor and accessor
                var $descriptorBase = $__create($descriptor),
                    $accessor       = $instructions & $_instructions_overridden_get ?
                                      'get' :
                                      $instructions & $_instructions_overridden_set ?
                                      'set' :
                                      '';

                // If there is a private set accessor instruction, undefine the set accessor in the base descriptor
                if ($instructions & $_instructions_private_set)
                    $descriptorBase['set'] = undefined;
                // If there is a private get accessor instruction, undefine the get accessor in the base descriptor
                else if ($instructions & $_instructions_private_get)
                    $descriptorBase['get'] = undefined;

                // Set the base descriptor on the base instance object
                $__defineProperty($base, $name, $descriptorBase);

                // If an accessor was created
                if ($accessor)
                {
                    // Get the accessor for the descriptor from the overrides object
                    $descriptor[$accessor] = $overrides[$name][$accessor];

                    // Set the descriptor on the private instance object
                    $__defineProperty($private, $name, $descriptor);

                    // Undefine the accessor in the descriptor
                    $descriptor[$accessor] = undefined;
                }
            }
            else
            {
                // If there is a private instruction
                if ($instructions & $_instructions_private)
                {
                    // Set the descriptor on the private instance object
                    $__defineProperty($private, $name, $descriptor);

                    // If there is a private set accessor instruction, undefine the set accessor in the descriptor
                    if ($instructions & $_instructions_private_set)
                        $descriptor['set'] = undefined;
                    // If there is a private get accessor instruction, undefine the get accessor in the descriptor
                    else if ($instructions & $_instructions_private_get)
                        $descriptor['get'] = undefined;
                }

                // If there is a base instruction (and the base instance object is unique), set the descriptor on the base instance object
                if ($instructions & $_instructions_base && $base !== $protected)
                    $__defineProperty($base, $name, $descriptor);

                // If there is an overridden instruction
                if ($instructions & $_instructions_overridden)
                {
                    // Get the directive inherits array
                    var $inherits = $directive[$_directive_inherits];

                    // If a directive inherits array was found
                    if ($inherits)
                    {
                        // Create the inherited descriptor reference
                        var $descriptorInherits = $descriptor;

                        // Loop through each cached base descriptor from base to derived
                        for (var $j = $inherits.length - 1; $j >= 0; $j--)
                        {
                            // Get the derived base instance object and the cached base descriptor
                            var $baseDerived     = $instance[$inherits[$j]][$_instance_base],
                                $descriptorCache = $baseDerived[$name];

                            // If the cached base descriptor does not have a set accessor, set the set accessor from the inherited descriptor in the cached base descriptor
                            if (!$descriptorCache['set'])
                                $descriptorCache['set'] = $descriptorInherits['set'];
                            // If the cached base descriptor does not have a get accessor, set the get accessor from the inherited descriptor in the cached base descriptor
                            else if (!$descriptorCache['get'])
                                $descriptorCache['get'] = $descriptorInherits['get'];

                            // Set the cached base descriptor on the derived base instance object
                            $__defineProperty($baseDerived, $name, $descriptorCache);

                            // Set the inherited descriptor as the cached base descriptor
                            $descriptorInherits = $descriptorCache;
                        }
                    }

                    // If there is an overridden get accessor instruction, get the get accessor for the descriptor from the overrides object
                    if ($instructions & $_instructions_overridden_get)
                        $descriptor['get'] = $overrides[$name]['get'];
                    // If there is an overridden set accessor instruction, get the set accessor for the descriptor from the overrides object
                    else if ($instructions & $_instructions_overridden_set)
                        $descriptor['set'] = $overrides[$name]['set'];
                    // Get the descriptor from the overrides object
                    else
                        $descriptor = $overrides[$name];
                }
            }

            // If there is a protected instruction
            if ($instructions & $_instructions_protected)
            {
                // Set the descriptor on the protected instance object
                $__defineProperty($protected, $name, $descriptor);

                // If there is a protected set accessor instruction, undefine the set accessor in the descriptor
                if ($instructions & $_instructions_protected_set)
                    $descriptor['set'] = undefined;
                // If there is a protected get accessor instruction, undefine the get accessor in the descriptor
                else if ($instructions & $_instructions_protected_get)
                    $descriptor['get'] = undefined;
            }

            // If there is a public instruction, set the descriptor on the public instance object
            if ($instructions & $_instructions_public)
                $__defineProperty($public, $name, $descriptor);
        }
    }
    else
    {
        // If there is a value instruction
        if ($instructions & $_instructions_value)
        {
            // Set the writable flag and value in the descriptor
            $descriptor['writable'] = !!($instructions & $_instructions_writable);
            $descriptor['value']    = !($instructions & $_instructions_this) ?
                                      $value :
                                      $data0 ?
                                      $_compilerSymbolsThis($name, $data0,   $filter, $value) :
                                      $_runtimeThis        ($name, $private, $filter, $value);
        }
        // If there is a data instruction
        else if ($instructions & $_instructions_data)
        {
            // If there is not a readonly instruction, clear the readonly accessor
            if (!($instructions & $_instructions_data_readonly))
                $readonly = $data0 ? false : null;
            // If a private data symbol was provided, set the readonly flag
            else if ($data0)
                $readonly = true;

            // Set the data get and set accessors in the descriptor
            $descriptor = $data0 ?
                          $_compilerSymbolsData($name, $value, $filter, $descriptor, false, $readonly, false) :
                          $_runtimeData        ($name, $value, $filter, $descriptor, false, $readonly);
        }

        // If there is a base instruction (and the base instance object is unique), set the descriptor on the base instance object
        if ($instructions & $_instructions_base && $base !== $protected)
            $__defineProperty($base, $name, $descriptor);

        // If there is an override instruction
        if ($instructions & $_instructions_override)
        {
            // If there is a descriptor override instruction, set the descriptor in the overrides object
            if ($instructions & $_instructions_override_descriptor)
                $overrides[$name] = $descriptor;
        }
        else
        {
            // If there is a private instruction, set the descriptor on the private instance object
            if ($instructions & $_instructions_private)
                $__defineProperty($private, $name, $descriptor);

            // If there is an overridden instruction, get the descriptor from the overrides object
            if ($instructions & $_instructions_overridden)
                $descriptor = $overrides[$name];

            // If there is a protected instruction, set the descriptor on the protected instance object
            if ($instructions & $_instructions_protected)
                $__defineProperty($protected, $name, $descriptor);

            // If there is a public instruction, set the descriptor on the public instance object
            if ($instructions & $_instructions_public)
                $__defineProperty($public, $name, $descriptor);
        }
    }
};