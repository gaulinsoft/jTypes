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
var $_compilerCache = function($cache, $abstract, $import, $model, $primitive, $sealed, $struct, $key, $value, $prepend)
{
    // If the value is undefined, return
    if ($value === undefined)
        return;

    // Get the name and the index of the last space in the name
    var $name      = $key.trim(),
        $index     = $name.lastIndexOf(' '),
        $modifiers = '';

    // If a space was found in the name
    if ($index >= 0)
    {
        // Break the name into the modifiers string and name
        $modifiers = $name.substr(0, $index).trim();
        $name      = $name.substr($index + 1);

        // If a prepend string was provided, prepend it to the modifiers string
        if ($prepend)
            $modifiers = $prepend + ' ' + $modifiers;
    }
    // If a prepend string was provided, set it as the modifiers string
    else if ($prepend)
        $modifiers = $prepend;

    // Check if the value is an auto property and create the type string
    var $auto       = $__array_isArray($value) && $value.length > 1,
        $constraint = '',
        $definition = null,
        $type       = $auto || $value != null && typeof $value == 'object' && $__getPrototypeOf($value) === $__objectProto__ && $__getOwnPropertyNames($value).length > 0 ?
                      $_const_keyword_property :
                      typeof $value != 'function' ?
                      $_const_keyword_field :
                      $_unlockSymbolsClass($value) ?
                      $_const_keyword_class :
                      $_const_keyword_method;

    // If the global function lock flag is set and the value is a function, prevent extensions on the function
    if ($_funcLock && $type == $_const_keyword_method)
        $__preventExtensions($value);

    // If the class is being imported and neither the prototype nor static modifiers were provided
    if ($import && $modifiers.indexOf($_const_keyword_prototype) < 0 && $modifiers.indexOf($_const_keyword_static) < 0)
    {
        // Get the imported definition from local storage
        $definition = $_store($_version + '_' + $_cache + '::' + $_handle + '::' + $name);

        // If an imported definition was found in local storage, parse it
        if ($definition)
            $definition = $_parse($definition);

        // If the imported definition is invalid, reset it
        if (!$__array_isArray($definition) || $definition.length != $_definition__length)
            $definition = null;
    }

    // If the definition is not being imported from local storage
    if (!$definition)
    {
        // Break the modifiers string into a keywords array
        var $keywords = $modifiers.trim().split(' ');

        // If the name is not valid, throw an exception
        if (!$_const_regexp_instance.test($name))
            $_exceptionFormat($_lang_name_invalid, $name);

        // If the name starts with the symbol prefix, throw an exception
        if ($name.substr(0, $_const_prefix_symbol.length) == $_const_prefix_symbol)
            $_exceptionFormat($_lang_name_reserved, $name);

        // Reset the modifiers
        $modifiers = 0;

        for (var $i = 0, $j = $keywords.length; $i < $j; $i++)
        {
            // Get the current keyword
            var $keyword = $keywords[$i];

            // If no keyword was provided, skip it
            if (!$keyword)
                continue;

            // Get the corresponding modifier for the keyword
            var $modifier = $_modifiers[$keyword];

            // If a modifier was found
            if ($modifier)
            {
                // If the modifier was already defined in the modifiers, throw an exception
                if ($modifiers & $modifier)
                    $_exceptionFormat($_lang_keyword_duplicate, $name, $keyword);

                // Set the modifier in the modifiers
                $modifiers |= $modifier;
            }
            else
            {
                // If the keyword is not the last keyword or it is not a valid constraint, throw an exception
                if ($i != $j - 1 || !$_compilerConstraint($keyword))
                    $_exceptionFormat($_lang_keyword_invalid, $name, $keyword);

                // Set the keyword as the constraint
                $constraint = $keyword;
            }
        }

        // Get the access and enum modifiers
        var $access = $modifiers & ($_modifiers_private | $_modifiers_protected | $_modifiers_public),
            $enum   = $modifiers & ($_modifiers_visible | $_modifiers_hidden);

        // Create the definition
        $definition = new $__array($_definition__length);

        // If either the prototype or static modifiers were provided
        if ($modifiers & ($_modifiers_prototype | $_modifiers_static))
        {
            // If no enum modifiers were provided, set the default enum modifier
            if (!$enum)
                $modifiers |= $enum = $type == $_const_keyword_class || $type == $_const_keyword_method ?
                                      $_modifiers_hidden :
                                      $_modifiers_visible;

            // If the definition is a class, set the nested modifier
            if ($type == $_const_keyword_class)
                $modifiers |= $_modifiers_nested;
            // If the definition is a method, set the method modifier
            else if ($type == $_const_keyword_method)
                $modifiers |= $_modifiers_method;

            // If the static modifier was provided
            if ($modifiers & $_modifiers_static)
            {
                // If the prototype modifier was provided, throw an exception
                if ($modifiers & $_modifiers_prototype)
                    $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_prototype, $_const_keyword_static);

                // If the new modifier was provided, throw an exception
                if ($modifiers & $_modifiers_new)
                    $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_new, $_const_keyword_static);

                // If the value is a class
                if ($type == $_const_keyword_class)
                {
                    // If a constraint was provided, throw an exception
                    if ($constraint)
                        $_exceptionFormat($_lang_constraint_class, $name);

                    // If the name is not a valid class name, throw an exception
                    if (!$_const_regexp_class.test($name))
                        $_exceptionFormat($_lang_class_name_invalid, $name);
                }
                // Set the "static" type string
                else
                    $type = $_const_keyword_static;

                // Throw if the definition is already defined in the static definitions
                $_compilerThrowDuplicate($cache[$_cache_static], $name, $type);
            }
            else
            {
                // Set the "prototype" type string
                $type = $_const_keyword_prototype;

                // Throw if the definition is already defined in the prototype definitions or the new modifier is improperly used
                $_compilerThrowDuplicate($cache[$_cache_prototype], $name, $type);
                $_compilerThrowInherit  ($cache[$_cache_prototype], $modifiers, $name, $type);
            }

            // If any access modifiers were provided, throw an exception
            if ($access)
                $_exceptionFormat($_lang_access_invalid, $name, $type);

            // If more than one enum modifier was provided, throw an exception
            if ($enum != $_modifiers_hidden && $enum != $_modifiers_visible)
                $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_hidden, $_const_keyword_visible);

            // Throw if any virtual modifiers were provided
            $_compilerThrowVirtual($modifiers, $name, $type);

            // If the readonly modifier was provided, throw an exception
            if ($modifiers & $_modifiers_readonly)
                $_exceptionFormat($_lang_readonly_invalid, $name, $type);

            // If a constraint was provided along with the const modifier, throw an exception
            if ($constraint && $modifiers & $_modifiers_const)
                $_exceptionFormat($_lang_constraint_const, $name);

            // Set the definition in either the prototype or static definitions
            $_data($cache[$type == $_const_keyword_prototype ? $_cache_prototype : $_cache_static], $name, $definition, false, true);
        }
        else
        {
            // If the name is reserved, throw an exception
            if ($name == 'as' || ($model || $struct) && ($name == 'clone' || $name == 'equals') || $name == 'is' || $name == 'type' || $name == '__base' || $name == '__data' || $name == '__self' || $name == '__this' || $name == '__type')
                $_exceptionFormat($_lang_name_reserved, $name);

            // Throw if the definition is already defined in the private or protected definitions
            $_compilerThrowDuplicate($cache[$_cache_private],   $name);
            $_compilerThrowDuplicate($cache[$_cache_protected], $name);

            // If no access modifiers were provided, set the private modifier in the modifiers
            if (!$access)
                $modifiers |= $access = $_modifiers_private;
            // If more than one access modifier was provided, throw an exception
            else if ($access != $_modifiers_private && $access != $_modifiers_protected && $access != $_modifiers_public)
                $_exceptionFormat($_lang_access_duplicate, $name);

            // If the class is a struct and the protected modifier was provided, throw an exception
            if ($struct && $access == $_modifiers_protected)
                $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_protected, $_const_keyword_struct);

            // If the const modifier was provided, throw an exception
            if ($modifiers & $_modifiers_const)
                $_exceptionFormat($_lang_requires_or, $name, $_const_keyword_const, $_const_keyword_prototype, $_const_keyword_static);

            // If the value is a class
            if ($type == $_const_keyword_class)
            {
                // Reset the type string and value
                $type  = $_const_keyword_field;
                $value = null;
            }
            // If the abstract modifier was provided
            else if ($modifiers & $_modifiers_abstract)
            {
                // If the value is an array
                if ($__array_isArray($value))
                {
                    // If the array has a default value, throw an exception
                    if ($value.length > 2)
                        $_exceptionFormat($_lang_abstract_auto, $name);

                    // If the array does not have accessor or mutator strings, throw an exception
                    if (typeof $value[0] != 'string' || $value.length > 1 && typeof $value[1] != 'string')
                        $_exceptionFormat($_lang_auto_invalid_type, $name);

                    // Create the value object
                    var $object = {};

                    // Set the first method in the value object
                    $object[$value[0]] = null;

                    // If a second method was provided, set it in the value object
                    if ($value.length > 1)
                        $object[$value[1]] = null;

                    // Reset the auto flag and set the "property" type string along with the value as the value object
                    $auto  = false;
                    $type  = $_const_keyword_property;
                    $value = $object;
                }
                // If the value is null, set the "method" type string
                else if ($value === null)
                    $type = $_const_keyword_method;
            }

            // If the definition is a field, set the field modifier
            if ($type == $_const_keyword_field)
                $modifiers |= $_modifiers_field;
            // If the definition is a method, set the method modifier
            else if ($type == $_const_keyword_method)
                $modifiers |= $_modifiers_method;

            // If no enum modifiers were provided, set the default enum modifier
            if (!$enum)
                $modifiers |= $enum = $type == $_const_keyword_method ?
                                      $_modifiers_hidden :
                                      $_modifiers_visible;
            // If more than one enum modifier was provided, throw an exception
            else if ($enum != $_modifiers_hidden && $enum != $_modifiers_visible)
                $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_hidden, $_const_keyword_visible);

            // If the value is either a field or auto property
            if ($auto || $type == $_const_keyword_field)
            {
                // If the class has the primitive modifier
                if ($primitive)
                {
                    // If a constraint was not provided, set the "primitive" constraint
                    if (!$constraint)
                        $constraint = $_const_keyword_primitive;
                    // If the constraint is not a primitive constraint, throw an exception
                    else if (!$_compilerConstraint($constraint, false, true))
                        $_exceptionFormat($_lang_constraint_primitive,
                                          $name,
                                          $model ?
                                          $_const_keyword_model :
                                          $struct ?
                                          $_const_keyword_struct :
                                          $_const_keyword_class);
                }
            }
            // If a constraint was provided and it has both the cast and default modifiers, throw an exception
            else if ($constraint && $constraint[0] == '~' && $constraint[$constraint.length - 1] == '!')
                $_exceptionFormat($_lang_conflict_constraint, $name, $constraint);

            // If the value is a method or property
            if ($type == $_const_keyword_method || $type == $_const_keyword_property)
            {
                // If the private modifier was provided along with either the abstract, override, or virtual modifiers, throw an exception
                if ($modifiers & $_modifiers_private && $modifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual))
                    $_exceptionFormat($_lang_virtual_invalid, $name, $_const_keyword_private);

                // If the abstract modifier was provided
                if ($modifiers & $_modifiers_abstract)
                {
                    // If the class is a struct, throw an exception
                    if ($struct)
                        $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_abstract, $_const_keyword_struct);

                    // If the sealed modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_sealed)
                        $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_abstract, $_const_keyword_sealed);

                    // If the virtual modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_virtual)
                        $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_abstract, $_const_keyword_virtual);

                    // If the class is not abstract, throw an exception
                    if (!$abstract)
                        $_exceptionFormat($_lang_abstract_class, $name);

                    // If the value is a method, create the abstract exception handler
                    if ($type == $_const_keyword_method)
                        $value = $_compilerAbstract($name);
                }

                // If the value is a property
                if ($type == $_const_keyword_property)
                {
                    // If the value is an auto property
                    if ($auto)
                    {
                        // If the array does not have both the accessor and mutator strings, throw an exception
                        if ($value.length < 2)
                            $_exceptionFormat($_lang_auto_invalid, $name);

                        // If the array does not have accessor and mutator strings, throw an exception
                        if (typeof $value[0] != 'string' || typeof $value[1] != 'string')
                            $_exceptionFormat($_lang_auto_invalid_type, $name);

                        // If the array has more than a single default property value, throw an exception
                        if ($value.length > 3)
                            $_exceptionFormat($_lang_auto_invalid_default, $name);

                        // Set the auto property modifiers (and compile the accessor and mutator methods)
                        $modifiers |= $_modifiers_property_auto;
                        $modifiers |= $_compilerAccessor(null, $cache[$_cache_protected], $modifiers, $struct, $name, $value[0]);
                        $modifiers |= $_compilerAccessor(null, $cache[$_cache_protected], $modifiers, $struct, $name, $value[1]);

                        // Set the default value
                        $value = $_compilerPrimitive($value[2]);
                    }
                    else
                    {
                        // Create the value array
                        var $array = [null, null];

                        // Populate the value array and set the property modifiers
                        $modifiers |= $_compilerProperty($array, $cache[$_cache_protected], $modifiers, $struct, $name, $value);

                        // Set the value as the value array
                        $value = $array;
                    }
                }
                // If the readonly modifier was provided, throw an exception
                else if ($modifiers & $_modifiers_readonly)
                    $_exceptionFormat($_lang_readonly_invalid_type, $name);

                // If the override modifier was provided
                if ($modifiers & $_modifiers_override)
                {
                    // If the class is a struct, throw an exception
                    if ($struct)
                        $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_override, $_const_keyword_struct);

                    // If the new modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_new)
                        $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_new, $_const_keyword_override);

                    // If the virtual modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_virtual)
                        $_exceptionFormat($_lang_conflict_and, $name, $_const_keyword_override, $_const_keyword_virtual);

                    // Get the base definition
                    var $baseDefinition = $cache[$_cache_protected][$name];

                    // If no base definition was found, throw an exception
                    if (!$baseDefinition)
                        $_exceptionFormat($_lang_override_invalid, $name, $type);

                    // Get the base modifiers
                    var $baseModifiers   = $baseDefinition[$_definition_modifiers],
                        $baseAccess      = $baseModifiers & ($_modifiers_public | $_modifiers_protected),
                        $baseEnum        = $baseModifiers & ($_modifiers_hidden | $_modifiers_visible),
                        $baseOverridable = $baseModifiers & $_modifiers_sealed ?
                                           0 :
                                           $baseModifiers & ($_modifiers_abstract | $_modifiers_override | $_modifiers_virtual);

                    // If the base definition is not overridable or does not match the type or access, enum, or readonly modifiers, throw an exception
                    if (!$baseOverridable || $type != $baseDefinition[$_definition_type] || $access != $baseAccess || $enum != $baseEnum || $modifiers & $_modifiers_readonly ^ $baseModifiers & $_modifiers_readonly)
                        $_exceptionFormat($_lang_override_invalid, $name, $type);

                    // If the base constraint does not match, throw an exception
                    if ($constraint != $baseDefinition[$_definition_constraint])
                        $_exceptionFormat($_lang_override_constraint, $name, $baseDefinition[$_definition_constraint]);

                    // If the value is a property
                    if ($type == $_const_keyword_property)
                    {
                        // Get the inherited property modifiers
                        var $baseProperty = $baseModifiers & ($_modifiers_property_get | $_modifiers_property_get_protected | $_modifiers_property_set | $_modifiers_property_set_protected);

                        // If the base definition is abstract
                        if ($baseModifiers & $_modifiers_abstract)
                        {
                            // Get the property modifiers
                            var $property = $modifiers & ($_modifiers_property_get | $_modifiers_property_get_protected | $_modifiers_property_set | $_modifiers_property_set_protected);

                            // If base definition does not match the property modifiers, throw an exception
                            if ($property != $baseProperty)
                                $_exceptionFormat($_lang_property_override_accessor, $name);
                        }
                        // Merge the inherited property modifiers into the modifiers
                        else
                            $modifiers |= $baseProperty;
                    }
                }
                else
                {
                    // If the sealed modifier was provided, throw an exception
                    if ($modifiers & $_modifiers_sealed)
                        $_exceptionFormat($_lang_requires, $name, $_const_keyword_sealed, $_const_keyword_override);

                    // Throw if the new modifier was improperly used (or the override modifier was required)
                    $_compilerThrowInherit($cache[$_cache_protected], $modifiers, $name);
                }

                // If the virtual modifier was provided
                if ($modifiers & $_modifiers_virtual)
                {
                    // If the class is a struct, throw an exception
                    if ($struct)
                        $_exceptionFormat($_lang_conflict_modifier, $name, $_const_keyword_virtual, $_const_keyword_struct);

                    // If the class is sealed, throw an exception
                    if ($sealed)
                        $_exceptionFormat($_lang_virtual_sealed,
                                          $name,
                                          $model ?
                                          $_const_keyword_model :
                                          $_const_keyword_class);
                }
            }
            else
            {
                // Throw if any virtual modifiers were provided or the new modifier was improperly used (or the override modifier was required)
                $_compilerThrowVirtual($modifiers, $name);
                $_compilerThrowInherit($cache[$_cache_protected], $modifiers, $name);

                // Set the value as a primitive
                $value = $_compilerPrimitive($value);
            }

            // If the access modifier is public, set the definition in the public definitions
            if ($access == $_modifiers_public)
                $_data($cache[$_cache_public], $name, $definition, false, true);

            // Set the definition in either the private or protected definitions
            $_data($cache[$access == $_modifiers_private ? $_cache_private : $_cache_protected], $name, $definition, false, true);
        }

        // Set the definition data
        $definition[$_definition_constraint] = $constraint;
        $definition[$_definition_modifiers]  = $modifiers;
        $definition[$_definition_type]       = $type;

        // If the cache string and handle are set and the definition is neither a prototype nor static definition, cache the definition in local storage
        if ($_cache && $_handle && $type != $_const_keyword_prototype && $type != $_const_keyword_static)
            $_store($_version + '_' + $_cache + '::' + $_handle + '::' + $name, $__stringify($definition));

        // Set the definition name and value
        $definition[$_definition_name]  = $name;
        $definition[$_definition_value] = $value;
    }
    else
    {
        // Get the imported definition data
        $modifiers = $definition[$_definition_modifiers];
        $type      = $definition[$_definition_type];
        $value     = $type == $_const_keyword_field ?
                     $_compilerPrimitive($value) :
                     $type == $_const_keyword_method && $modifiers & $_modifiers_abstract ?
                     $_compilerAbstract($name) :
                     $type != $_const_keyword_property ?
                     $value :
                     $modifiers & $_modifiers_property_auto ?
                     $_compilerPrimitive($value[2]) :
                     $_compilerProperty([null, null], null, $modifiers & $_modifiers_abstract, $struct, $name, $value);

        // If the imported modifiers have the public access modifier, set the imported definition in the public definitions
        if ($modifiers & $_modifiers_public)
            $_data($cache[$_cache_public], $name, $definition, false, true);

        // Set the imported definition in either the private or protected definitions
        $_data($cache[$modifiers & $_modifiers_private ? $_cache_private : $_cache_protected], $name, $definition, false, true);

        // Set the imported definition name and value
        $definition[$_definition_name]  = $name;
        $definition[$_definition_value] = $value;

        // If the constraint is a class, set the imported definition constraint
      //if (typeof $constraint == 'function')
      //    $definition[$_definition_constraint] = $constraint;
    }
};