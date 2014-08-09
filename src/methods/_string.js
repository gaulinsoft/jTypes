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
$_defineMethod('escape', function($string)
{
    // CHECK $string
    if (typeof $string != 'string')
    {
        // Unbox the object
        $string = $$_unbox($string);

        // If the object is not a string, return an empty string primitive
        if (typeof $string != 'string')
            return '';
    }

    // Return the escaped string
    return $string.replace($_const_escape_search, $_const_escape_replace);
});
$_defineMethod('format', function($string)
{
    // CHECK $string
    if (typeof $string != 'string')
    {
        // Unbox the object
        $string = $$_unbox($string);

        // If the object is not a string, return an empty string primitive
        if (typeof $string != 'string')
            return '';
    }

    // If no arguments were provided, return the string
    if (arguments.length < 2)
        return $string;

    // Create the arguments array
    $_arguments = new $__array(arguments.length - 1);

    // Copy each argument as a string into the arguments array
    for (var $i = 0, $j = $_arguments.length; $i < $j; $i++)
        $_arguments[$i] = $$_asString(arguments[$i + 1]);

    // Create the formatted string
    $string = $string.replace($_const_format_search, $_format);

    // Reset the arguments reference
    $_arguments = null;

    // Return the formatted string
    return $string;
});