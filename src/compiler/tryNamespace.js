﻿/*! ------------------------------------------------------------------------
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
var $_compilerTryNamespace = function($modifiers, $dependencies, $constructor)
{
    // If the debug flag is not set, return the redirected function call (without catching any errors)
    if (!$_debug)
        return $_compilerNamespace($modifiers, $dependencies, $constructor);

    try
    {
        // Get the namespace from the redirected function call (and catch any errors)
        var $namespace = $_compilerNamespace($modifiers, $dependencies, $constructor);

        // Reset the namespace
        $_aliases   = null;
        $_includes  = null;
        $_namespace = null;

        // If there are errors, throw the errors array
        if ($_errors.length)
            $_compilerThrowErrors($_errors);

        // Return the namespace
        return $namespace;
    }
    catch (e)
    {
        // Reset the namespace
        $_aliases   = null;
        $_includes  = null;
        $_namespace = null;

        // If there are errors, throw the errors array
        if ($_errors.length)
            $_compilerThrowErrors($_errors);

        // If there are no errors in the errors array, throw the error
        $_compilerThrowErrors([e.message], true);
    }
};