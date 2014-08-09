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
var $_compilerTryClass = function($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic)
{
    // If the debug flag is not set or the class is not being defined in a namespace, return the redirected function call (without catching any errors)
    if (!$_debug || $_namespace == null)
        return $_compilerClass($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic);

    try
    {
        // Return the redirected function call (and catch any errors)
        return $_compilerClass($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic);
    }
    catch (e)
    {
        // Push the error into the errors array
        $_errors.push(e.message);

        // Reset the exception handle
        $_handle = '';
    }

    // Return a failed class
    return $_compilerClassFailed();
};