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
var $_compilerThrowErrors = function($errors, $persist)
{
    // If the errors array is empty, throw an error
    if (!$errors.length)
        throw new $__error();

    // If the persist flag is not set, reset the errors array
    if (!$persist)
        $_errors = [];

    // If more than one error is in the errors array, throw the formatted errors
    if ($errors.length > 1)
        throw new $__error($_lang_exception_generic + ' ' + $errors.length + '\n' + $errors.join('\n'));

    // Throw the first error
    throw new $__error($errors[0]);
};