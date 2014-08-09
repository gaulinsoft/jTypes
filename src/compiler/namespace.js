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
var $_compilerNamespace = function($modifiers, $dependencies, $constructor)
{
    // Create the namespace object
    var $namespace = $$;

    // If any modifiers were provided
    if ($modifiers)
    {
        // Trim the modifiers
        $modifiers = $modifiers.trim();

        // If the modifiers start with the namespace keyword, remove it from the modifiers
        if ($modifiers.substr(0, $_const_keyword_namespace.length + 1) == $_const_keyword_namespace + ' ')
            $modifiers = $modifiers.substr($_const_keyword_namespace.length + 1).trim();

        // If the modifiers are not a generic handle, throw an exception
        if (!$_compilerHandle($modifiers, true))
            $_exceptionFormat($_lang_namespace_invalid, $modifiers);

        // If a namespace is already being compiled, throw an exception
        if ($_namespace)
            $_exceptionFormat($_lang_namespace_subnamespace, $modifiers);

        // Create the namespaces array
        var $namespaces = $modifiers.split('.');

        for (var $i = 0, $j = $namespaces.length; $i < $j; $i++)
        {
            // Get the current name
            var $name = $namespaces[$i];

            // If the name is not defined in the namespace
            if (!$__hasOwnProperty__.call($namespace, $name))
            {
                // Create the namespace object
                var $object = $__create(null);

                // Set the namespace object on the namespace
                $_data($namespace, $name, $object, false, true);

                // Set the current namespace to the namespace object
                $namespace = $object;

                // Set the namespace metadata
                $_data($namespace, $_symbol_handle,    $namespaces.slice(0, $i + 1).join('.'));
                $_data($namespace, $_symbol_name,      $name);
                $_data($namespace, $_symbol_namespace, $i > 0 ? $namespaces.slice(0, $i).join('.') : '');
            }
            // Set the current namespace to the namespace object
            else
                $namespace = $namespace[$name];
        }

        // Add the namespace to the namespaces collection
        $_namespaces[$modifiers] = $namespace;

        // Set the namespace
        $_namespace = $modifiers;
    }
    // Set the global namespace
    else
        $_namespace = '';

    // If any dependencies were provided
    if ($dependencies && $dependencies.length)
    {
        // Create the aliases map and includes array
        $_aliases  = $__create(null);
        $_includes = [];

        for (var $i = 0, $j = $dependencies.length; $i < $j; $i++)
        {
            // Get the current dependency
            var $dependency = $dependencies[$i];

            // If the dependency is not a primitive string, throw an exception
            if (typeof $dependency != 'string')
                $_exceptionFormat($_lang_namespace_dependency_type);

            // If the dependency starts with the using keyword, remove it from the dependency
            if ($dependency.substr(0, $_const_keyword_using.length + 1) == $_const_keyword_using + ' ')
                $dependency = $dependency.substr($_const_keyword_using.length + 1).trim();

            // Get the index of the alias operator
            var $index = $dependency.indexOf('=');

            // If the dependency is an alias
            if ($index >= 0)
            {
                // Get the alias from the dependency string
                var $alias = $dependency.substr(0, $index).trim();

                // If the alias is not a valid namespace, throw an exception
                if (!$_const_regexp_namespace.test($alias) || $_modifiers[$alias] != null || $_modifiers_class[$alias] != null || $_constraints[$alias] != null || $alias == $_const_keyword_global)
                    $_exceptionFormat($_lang_namespace_alias_invalid, $alias);

                // Remove the alias from the dependency string
                $dependency = $dependency.substr($index + 1).trim();

                // If the dependency is not a generic handle, throw an exception
                if (!$_compilerHandle($dependency, true))
                    $_exceptionFormat($_lang_namespace_include_invalid, $dependency);

                // If the alias is already defined in the aliases map, throw an exception
                if ($_aliases[$alias])
                    $_exceptionFormat($_lang_namespace_alias_duplicate, $alias);

                // Set the alias in the aliases map
                $_aliases[$alias] = $dependency;
            }
            else
            {
                // If the dependency is not a generic handle, throw an exception
                if (!$_compilerHandle($dependency, true))
                    $_exceptionFormat($_lang_namespace_include_invalid, $dependency);

                // Push the dependency into the includes array
                $_includes.push($dependency);
            }
        }
    }
    else
    {
        // Reset the aliases map and includes array
        $_aliases  = null;
        $_includes = null;
    }

    // Call the namespace constructor
    $constructor.call($namespace, $$);

    // Reset the namespace
    $_aliases   = null;
    $_includes  = null;
    $_namespace = null;

    // Return namespace object
    return $namespace;
};