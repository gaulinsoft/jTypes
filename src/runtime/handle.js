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
var $_runtimeHandle = function($handle, $generic, $namespace, $aliases, $includes)
{
    // If a handle was not provided, return null
    if (!$handle)
        return null;

    // Get the references collection
    var $references = $generic ?
                      $_namespaces :
                      $_classes;

    // If the handle starts with the namespace alias qualifier
    if ($handle.indexOf('::') >= 0)
    {
        // Create the handles array from the handle
        $handle = $handle.split('::');

        // If the alias qualifier is the global alias, return the resolved global reference
        if ($handle[0] == $_const_keyword_global)
            return $references[$handle[1]] || null;

        // Get the dependency from the aliases map
        var $dependency = $aliases ?
                          $aliases[$handle[0]] :
                          null;

        // If the dependency was not found, throw an exception
        if (!$dependency)
            $_exceptionFormat($_lang_handle_qualifier_invalid, $namespace, $handle[0]);

        // Return the resolved reference relative to the dependency
        return $_runtimeHandle($dependency + '.' + $handle[1], $generic, $namespace);
    }

    // Resolve the reference relative to the namespace
    var $reference = $namespace ?
                     $references[$namespace + '.' + $handle] :
                     null;

    // If an aliases map was provided
    if ($aliases)
    {
        // Get the alias from the handle and the dependency from the aliases map
        var $index      = $handle.indexOf('.'),
            $alias      = $index >= 0 ?
                          $handle.substr(0, $index) :
                          $handle,
            $dependency = $aliases[$alias];

        // If a dependency was found in the aliases map
        if ($dependency)
        {
            // If the handle is not generic and the handle directly references the alias
            if (!$generic && $handle == $alias)
            {
                // If the alias is not a valid class name, throw an exception
                if (!$_const_regexp_class.test($alias))
                    $_exceptionFormat($_lang_handle_alias_invalid, $namespace, $alias);

                // If the dependency is not a valid handle, throw an exception
                if (!$_compilerHandle($dependency))
                    $_exceptionFormat($_lang_handle_dependency_invalid, $namespace, $dependency);
            }

            // If a reference was already found relative to the namespace, throw an exception
            if ($reference)
                $_exceptionFormat($_lang_handle_alias_conflict, $namespace, $alias);

            // Resolve the reference relative to the dependency
            $reference = $_runtimeHandle($index >= 0 ?
                                         $dependency + '.' + $handle.substr($index + 1) :
                                         $dependency,
                                         $generic,
                                         $namespace);
        }
    }

    // If a reference was resolved, return the reference
    if ($reference)
        return $reference;

    // If the handle is not generic and an includes array was provided
    if (!$generic && $includes)
    {
        // Create the reference index
        var $index = -1;

        for (var $i = 0, $j = $includes.length; $i < $j; $i++)
        {
            // Resolve the include reference relative to the include
            var $include = $_runtimeHandle($includes[$i] + '.' + $handle, $generic, $namespace);

            // If an include reference was not resolved, continue
            if (!$include)
                continue;

            // If an include reference was previously resolved, throw an exception
            if ($reference)
                $_exceptionFormat($_lang_handle_include_duplicate, $handle, $includes[$i], $includes[$index]);

            // Set the reference as the include reference
            $index     = $i;
            $reference = $include;
        }

        // If a reference was resolved, return the reference
        if ($reference)
            return $reference;
    }

    // If a namespace was provided
    if ($namespace)
    {
        // Get the index of the last dot operator in the namespace
        var $index = $namespace.lastIndexOf('.');

        // If a dot operator was found in the namespace
        while ($index >= 0)
        {
            // Get the parent namespace preceding the dot operator
            var $parent = $namespace.substr(0, $index);

            // If a parent namespace was resolved, resolve the reference relative to the parent namespace
            if ($parent)
                $reference = $references[$parent + '.' + $handle];

            // If a reference was resolved, return the reference
            if ($reference)
                return $reference;

            // Get the index of the previous dot operator in the namespace
            $index = $namespace.lastIndexOf('.', $index - 1);
        }
    }

    // Return the resolved global reference
    return $references[$handle] || null;
};