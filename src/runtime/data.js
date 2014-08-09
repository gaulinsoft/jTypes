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
var $_runtimeData = function($name, $value, $filter, $descriptor, $auto, $readonly)
{
    // If a constraint filter was provided and it has the default modifier or is a struct without the null modifier, set the default get accessor in the descriptor
    if ($filter && ($filter[$_filter_default] || $filter[$_filter_struct] && !$filter[$_filter_null]))
        $descriptor['get'] = function()
        {
            // If the value is null, create the default value within the applied constraint filter
            if ($value === null)
                $value = $filter();

            // Return the value
            return $value;
        };
    // Set the get accessor in the descriptor
    else
        $descriptor['get'] = function()
        {
            // Return the value
            return $value;
        };

    // If a constraint filter was provided
    if ($filter)
    {
        // If a readonly accessor was provided, set the readonly set accessor in the descriptor
        if ($readonly)
            $descriptor['set'] = function($v)
            {
                // If the readonly accessor is set, throw an exception
                if ($readonly())
                    $_exceptionFormat($_lang_readonly_data,
                                      $name,
                                      $auto ?
                                      $_const_keyword_property :
                                      $_const_keyword_field);

                // Set the value with the applied constraint filter
                $value = $filter($v, $name);
            };
        // Set the set accessor in the descriptor
        else
            $descriptor['set'] = function($v)
            {
                // Set the value with the applied constraint filter
                $value = $filter($v, $name);
            };
    }
    // If a readonly accessor was provided, set the readonly set accessor in the descriptor
    else if ($readonly)
        $descriptor['set'] = function($v)
        {
            // If the readonly accessor is set, throw an exception
            if ($readonly())
                $_exceptionFormat($_lang_readonly_data,
                                  $name,
                                  $auto ?
                                  $_const_keyword_property :
                                  $_const_keyword_field);

            // Set the value
            $value = $v;
        };
    // Set the set accessor in the descriptor
    else
        $descriptor['set'] = function($v)
        {
            // Set the value
            $value = $v;
        };

    // Return the descriptor
    return $descriptor;
};