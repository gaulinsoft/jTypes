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
var $_compilerDirective = function($directives, $overrides, $defaults, $filters, $sources, $primitive, $struct, $i, $j, $definition, $namespace, $aliases, $includes)
{
    // Get the definition constraint, modifiers, name, and value
    var $constraint = $definition[$_definition_constraint],
        $modifiers  = $definition[$_definition_modifiers],
        $name       = $definition[$_definition_name],
        $value      = $definition[$_definition_value];

    // Create the directive, instructions, and data source
    var $data         = $modifiers & ($_modifiers_field | $_modifiers_property_auto),
        $directive    = new $__array($_directive__length),
        $filter       = $constraint ?
                        $definition[$_definition_filter] :
                        null,
        $inherits     = null,
        $instructions = 0,
        $overridden   = null,
        $source       = $data && $_symbolCreate ?
                        $_symbolCreate() :
                        null;

    // If a constraint was provided and a constraint filter was not cached, create the constraint filter
    if ($constraint && !$filter)
        $filter = $definition[$_definition_filter] = $filters[$constraint] || $_runtimeFilter($constraint, $name, $namespace, $aliases, $includes);

    // If a data source was created and a data sources array was provided, push the data symbol into the data sources array
    if ($source && $sources)
        $sources.push($source);

    // If a constraint was provided and the definition is a field or auto property
    if ($constraint && $data)
    {
        // Check if the constraint is a native primitive constraint
        var $native = $_compilerConstraint($constraint, true, true);

        // Set the value within the applied constraint filter
        $value = $native ?
                 $filter($value) :
                 null;

        // If a data source was created, set the default value in the defaults object
        if ($source)
            $defaults[$source] = $value;

        // If the primitive flag is set and the filter is neither a native primitive nor a primitive struct type, throw an exception
        if ($primitive && !$native && !($filter[$_filter_primitive] && $filter[$_filter_struct]))
            $_exceptionFormat($_lang_filter_primitive,
                              $name,
                              $constraint,
                              $filter[$_filter_model] ?
                              $_const_keyword_model :
                              $filter[$_filter_struct] ?
                              $_const_keyword_struct :
                              $_const_keyword_class);

        // If a data source was created and the filter has either the default flag or is a struct type without the nullable modifier, set the default value descriptor on the defaults object
        if ($source && ($filter[$_filter_default] || $filter[$_filter_struct] && !$filter[$_filter_null]))
            $_compilerSymbolsDefault($defaults, $source, $filter);
    }
    // If a data source was created, set the default value in the defaults object
    else if ($source)
        $defaults[$source] = $value;

    // If the definition is a property
    if ($modifiers & ($_modifiers_property_get | $_modifiers_property_set))
    {
        // If the hidden modifier was not provided, set the enumerable instruction
        if (!($modifiers & $_modifiers_hidden))
            $instructions |= $_instructions_enumerable;

        // If the definition is an auto property
        if ($modifiers & $_modifiers_property_auto)
        {
            // Set the data instruction along with the get and set accessor instructions
            $instructions |= $_instructions_data | $_instructions_get | $_instructions_set;

            // If the readonly modifier was provided, set the readonly instruction
            if ($modifiers & $_modifiers_readonly)
                $instructions |= $_instructions_data_readonly;
        }
        else
        {
            // If the property has an accessor method, set the get accessor instruction
            if ($value[0] != null)
                $instructions |= $_instructions_get;

            // If the property has a mutator method, set the set accessor instruction
            if ($value[1] != null)
                $instructions |= $_instructions_set;

            // If the property is not abstract, set the context instruction
            if (!($modifiers & $_modifiers_abstract))
                $instructions |= $_instructions_this;
        }

        // If the definition has the override modifier
        if ($modifiers & $_modifiers_override)
        {
            // Set the override instruction
            $instructions |= $_instructions_override;

            // Check if the definition has accessor or mutator methods and get the override array from the overrides object
            var $get      = !!($modifiers & $_modifiers_property_auto || $value[0] != null),
                $set      = !!($modifiers & $_modifiers_property_auto || $value[1] != null),
                $override = $overrides[$name];

            // If an override array was found
            if ($override)
            {
                // If the definition has an accessor method and it is not found in the override array
                if ($get && $override[0] == null)
                {
                    // Set the override index in the override array
                    $override[0] = $i;

                    // Set the override get accessor instruction
                    $instructions |= $_instructions_override_get;
                }
                // If the definition has a mutator method and it is not found in the override array
                else if ($set && $override[1] == null)
                {
                    // Set the override index in the override array
                    $override[1] = $i;

                    // Set the override set accessor instruction
                    $instructions |= $_instructions_override_set;
                }
            }
            else
            {
                // Set the descriptor override instruction
                $instructions |= $_instructions_override_descriptor;

                // Create the override array in the overrides object
                $override = $overrides[$name] = (
                [
                    $get ? $i : null,
                    $set ? $i : null
                ]);
            }

            // If the definition is inherited
            if ($i > 0)
            {
                // If the definition inherits an accessor or mutator method or the override array has inherited indices, push the index into the override array
                if (!$get && $modifiers & $_modifiers_property_get || !$set && $modifiers & $_modifiers_property_set || $override.length > 2)
                    $override.push($i);
                // Set the base instruction
                else
                    $instructions |= $_instructions_base;
            }
        }
        // Get the definition access modifier
        else switch ($modifiers & ($_modifiers_private | $_modifiers_protected | $_modifiers_public))
        {
            // If the definition is public
            case $_modifiers_public:

                // Set the public instruction
                $instructions |= $_instructions_public;

                // If the definition has a protected mutator method, set the protected set accessor instruction
                if ($modifiers & $_modifiers_property_set_protected)
                    $instructions |= $_instructions_protected_set;
                // If the definition has a protected accessor method, set the protected get accessor instruction
                else if ($modifiers & $_modifiers_property_get_protected)
                    $instructions |= $_instructions_protected_get;

            // If the definition is protected
            case $_modifiers_protected:

                // Set the protected instruction (or the private instruction if the class has the struct modifier)
                $instructions |= $struct ?
                                 $_instructions_private :
                                 $_instructions_protected;

                // If the definition is abstract or virtual
                if ($modifiers & ($_modifiers_abstract | $_modifiers_virtual))
                {
                    // Check if the definition is overridden
                    $overridden = $overrides[$name];

                    // If the definition is overridden, reset the override array in the overrides object
                    if ($overridden != null)
                        $overrides[$name] = null;
                }

                // If the definition has either a private accessor method or private mutator method
                if ($modifiers & ($_modifiers_property_get_private | $_modifiers_property_set_private))
                {
                    // If the definition is overridden
                    if ($overridden != null)
                    {
                        // Set the private overridden instruction
                        $instructions |= $_instructions_overridden_private;

                        // If the definition has a private mutator method, set the overridden get accessor instruction
                        if ($modifiers & $_modifiers_property_set_private)
                            $instructions |= $_instructions_overridden_get;
                        // If the definition has a private accessor method, set the overridden set accessor instruction
                        else if ($modifiers & $_modifiers_property_get_private)
                            $instructions |= $_instructions_overridden_set;
                    }

                    // If the definition has a private mutator method, set the private and private set accessor instructions
                    if ($modifiers & $_modifiers_property_set_private)
                        $instructions |= $_instructions_private | $_instructions_private_set;
                    // If the definition has a private accessor method, set the private and private get accessor instructions
                    else if ($modifiers & $_modifiers_property_get_private)
                        $instructions |= $_instructions_private | $_instructions_private_get;
                }
                // If the definition is overridden
                else if ($overridden != null)
                {
                    // Set the overridden instruction
                    $instructions |= $_instructions_overridden;

                    // If the definition has an accessor method and it is not overridden, set the overridden set accessor instruction
                    if ($modifiers & $_modifiers_property_get && $overridden[0] == null)
                        $instructions |= $_instructions_overridden_set;

                    // If the definition has a mutator method and it is not overridden, set the overridden get accessor instruction
                    if ($modifiers & $_modifiers_property_set && $overridden[1] == null)
                        $instructions |= $_instructions_overridden_get;
                }

                // If the definition is overridden and the override array has inherited indices, extract the inherits array from the override array
                if ($overridden != null && $overridden.length > 2)
                    $inherits = $overridden.slice(2);

                // If the definition is inherited, set the base instruction
                if ($i > 0)
                    $instructions |= $_instructions_base;

                break;

            // If the definition is private
            case $_modifiers_private:

                // Set the private instruction
                $instructions |= $_instructions_private;

                break;
        }
    }
    else
    {
        // If the definition is a field
        if ($modifiers & $_modifiers_field)
        {
            // If the hidden modifier was not provided, set the enumerable instruction
            if (!($modifiers & $_modifiers_hidden))
                $instructions |= $_instructions_enumerable;

            // Set the data instruction
            $instructions |= $_instructions_data;

            // If the readonly modifier was provided, set the readonly instruction
            if ($modifiers & $_modifiers_readonly)
                $instructions |= $_instructions_data_readonly;
        }
        // If the definition is a method or nested class
        else if ($modifiers & ($_modifiers_method | $_modifiers_nested))
        {
            // If the visible modifier was provided, set the enumerable instruction
            if ($modifiers & $_modifiers_visible)
                $instructions |= $_instructions_enumerable;

            // Set the value instruction
            $instructions |= $_instructions_value;

            // If the definition is a method and it is not abstract, set the context instruction
            if ($modifiers & $_modifiers_method && !($modifiers & $_modifiers_abstract))
                $instructions |= $_instructions_this;
        }

        // If the definition has the override modifier
        if ($modifiers & $_modifiers_override)
        {
            // If the definition is inherited, set the base instruction
            if ($i > 0)
                $instructions |= $_instructions_base;

            // Set the override instruction
            $instructions |= $_instructions_override;

            // If an override index is not found in the overrides object
            if ($overrides[$name] == null)
            {
                // Set the descriptor override instruction
                $instructions |= $_instructions_override_descriptor;

                // Set the override index in the overrides object
                $overrides[$name] = $i;
            }
        }
        // Get the definition access modifier
        else switch ($modifiers & ($_modifiers_private | $_modifiers_protected | $_modifiers_public))
        {
            // If the definition is public
            case $_modifiers_public:

                // Set the public instruction
                $instructions |= $_instructions_public;

            // If the definition is protected
            case $_modifiers_protected:

                // Set the protected instruction (or the private instruction if the class has the struct modifier)
                $instructions |= $struct ?
                                 $_instructions_private :
                                 $_instructions_protected;

                // If the definition is abstract or virtual
                if ($modifiers & ($_modifiers_abstract | $_modifiers_virtual))
                {
                    // Check if the definition is overridden
                    $overridden = $overrides[$name];

                    // If the definition is overridden
                    if ($overridden != null)
                    {
                        // Set the overridden instruction
                        $instructions |= $_instructions_overridden;

                        // Reset the override index in the overrides object
                        $overrides[$name] = null;
                    }
                }

                // If the definition is inherited, set the base instruction
                if ($i > 0)
                    $instructions |= $_instructions_base;

                break;

            // If the definition is private
            case $_modifiers_private:

                // Set the private instruction
                $instructions |= $_instructions_private;

                break;
        }
    }

    // Set the directive filter, inherits array, instructions, name, and value
    $directive[$_directive_filter]       = $filter;
    $directive[$_directive_inherits]     = $inherits;
    $directive[$_directive_instructions] = $instructions;
    $directive[$_directive_name]         = $name;
    $directive[$_directive_value]        = $source || $value;

    // If a directives array was not provided, return the directive
    if (!$directives)
        return $directive;

    // Set the directive in the directives array
    $directives[$j] = $directive;

    // Return true if the definition is overridden
    return $overridden != null;
};