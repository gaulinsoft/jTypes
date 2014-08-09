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
var $_compilerHandle = function($handle, $generic)
{
    // If the handle starts with the namespace alias qualifier
    if ($handle.indexOf('::') >= 0)
    {
        // Create the handles array from the handle
        $handle = $handle.split('::');

        // If the handles array has more than one alias qualifier or the qualifier is invalid, return false
        if ($handle.length != 2 || !$_const_regexp_namespace.test($handle[0]))
            return false;

        // Set the handle succeeding the alias qualifier as the handle
        $handle = $handle[1];
    }

    // Create the namespaces array from the handle
    var $namespaces = $handle.split('.');

    // If the handle is not generic
    if (!$generic)
    {
        // Get the class name from the namespaces array
        var $name = $namespaces.pop();

        // If the class name is not valid, return false
        if (!$_const_regexp_class.test($name))
            return false;
    }

    // If any of the namespaces are not valid, return false
    for (var $i = 0, $j = $namespaces.length; $i < $j; $i++)
        if (!$_const_regexp_namespace.test($namespaces[$i]))
            return false;

    // Return true
    return true;
};