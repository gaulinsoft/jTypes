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
var $_compilerConstraint = function($keyword, $native, $primitive)
{
    // If the native flag is not set and the keyword is a valid constraint handle, return true
    if (!$native && $_const_regexp_constraint_handle.test($keyword))
        return true;

    // Parse the keyword
    var $exec = $_const_regexp_constraint.exec($keyword);

    // If the keyword could not be parsed, return false
    if (!$exec || $exec[1] == '~' && $exec[3] == '?')
        return false;

    // Get the constraint bits and create the flags
    var $constraint = $_constraints[$exec[2]],
        $flags      = 0;

    // If no constraint bits were found, return false
    if ($constraint == null)
        return false;

    // If the primitive flag is set, the constraint does not support the null flag, and it is not the "primitive" constraint string, return false
    if ($primitive && !($constraint & $_constraints_null) && $exec[2] != $_const_keyword_primitive)
        return false;

    // If the cast modifier was provided, set the cast flag in the flags
    if ($exec[1] == '~')
        $flags |= $_constraints_cast;
    // If the suppress modifier was provided, set the suppress flag in the flags
    else if ($exec[1] == '@')
        $flags |= $_constraints_suppress;

    // If the null modifier was provided, set the null flag in the flags
    if ($exec[3] == '?')
        $flags |= $_constraints_null;
    // If the default modifier was provided, set the default flag in the flags
    else if ($exec[3] == '!')
        $flags |= $_constraints_default;

    // Return true if no flags were set that are not found in the constraint bits
    return !($flags & ~$constraint);
};