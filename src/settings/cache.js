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

// If the storage flag is set, define the cache setting
if ($_storage)
    $_defineProperty('cache', function()
    {
        // Return the cache string
        return $_cache;
    },
    function($v)
    {
        // If local storage is not supported, return
        if (!$__storageLocal__)
            return;

        // Get the value as a string
        $v = $$_asString($v);

        // Set the cache string if the value is a valid cache key
        $_cache = $_const_regexp_cache.test($v) ? $v : '';

        // If a cache string was not set, return
        if (!$_cache)
            return;

        // Get the previous cache string from the local storage
        var $cache = $_store('cache');

        // If a previous cache string was found and it does not match the value
        if ($cache && $cache != $v)
        {
            // Create the keys array
            var $keys = [];

            // Loop through each storage index in the local storage
            for (var $i = 0, $j = $__storageLocal__.length; $i < $j; $i++)
            {
                // Get the key
                var $key = $__storageLocal__.key($i);

                // If the key belongs to the previous cache, push it into the keys array
                if ($key.substr(0, $_const_prefix_storage.length) == $_const_prefix_storage)
                    $keys.push($key);
            }

            // Remove each key in the keys array from the local storage
            for (var $i = 0, $j = $keys.length; $i < $j; $i++)
                $__storageLocal__.removeItem($keys[$i]);
        }

        // Set the cache string and version in the local storage
        $_store('cache',   $_cache);
        $_store('version', $_version);
    });