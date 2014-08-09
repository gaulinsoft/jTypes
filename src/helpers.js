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

// ########## HELPERS ##########

// Create the arguments reference, characters string, and hashes object
var $_arguments  = null,
    $_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    $_hashes     = $__create(null);

// Append the lowercase characters to the characters string
$_characters += $_characters.toLowerCase();

// Create the helper functions
var $_accessor  = function($object, $key, $get, $set, $enumerable, $configurable)
{
    // Define the "accessor" property
    $__defineProperty($object, $key,
    {
        'configurable': !!$configurable,
        'enumerable':   !!$enumerable,
        'get':          $get || undefined,
        'set':          $set || undefined
    });
};
var $_data      = function($object, $key, $value, $writable, $enumerable, $configurable)
{
    // Define the "data" property
    $__defineProperty($object, $key,
    {
        'configurable': !!$configurable,
        'enumerable':   !!$enumerable,
        'value':        $value,
        'writable':     !!$writable
    });
};
var $_date      = function()
{
    // Return an NaN date object
    return new $__date($__NaN__);
};
var $_format    = function($0, $1, $2, $3, $4)
{
    // Get the number of opening-braces, argument index, and alignment length
    var $braces    = $1.length,
        $index     = $__parseInt($2, 10),
        $alignment = $4 ?
                     $__parseInt($4, 10) :
                     0;

    // If an even number of opening-braces was provided, the argument index exceeded the number of arguments, or the alignment length is out of range, return the match (with the escaped opening-braces)
    if ($braces % 2 == 0 || $index >= $_arguments.length || $alignment > $_const_int_max || $alignment < $_const_int_min)
        return $1.substr($braces / 2) + $2 + ($3 || '') + '}';

    // Get the argument string for the argument index
    var $argument = $_arguments[$index];

    // If a positive alignment length was provided, left-pad the argument string to the alignment length
    if ($alignment > 0)
        while ($argument.length < $alignment)
            $argument = ' ' + $argument;
    // If a negative alignment length was provided, right-pad the argument string to the alignment length
    else if ($alignment < 0)
        while ($argument.length < -$alignment)
            $argument += ' ';

    // If more than one opening-brace was provided, return the argument string (with the escaped opening-braces)
    if ($braces > 1)
        return $1.substr($__floor($braces / 2) + 1) + $argument;

    // Return the argument string
    return $argument;
};
var $_generator = function($length)
{
    // If no length was provided, use the default length
    if (!$length)
        $length = $_const_hash_default;

    // Create the hash reference
    var $hash = null;

    do
    {
        // Reset the hash
        $hash = '';

        // Append random characters to the hash
        for (var $i = 0, $j = $_characters.length; $i < $length; $i++)
            $hash += $_characters[$__floor($j * $__random())];
    }
    // Continue if the hash was already found in the hashes object
    while ($_hashes[$hash]);

    // Set the hash in the hashes object
    $_hashes[$hash] = $hash;

    // Return the hash
    return $hash;
};
var $_get       = function($function, $filter)
{
    // If a filter was provided, return the filtered get accessor
    if ($filter)
        return function()
        {
            // Call the get accessor in the given context and return its return value within the applied constraint filter
            return $filter($function.call(this));
        };

    // Return the get accessor
    return function()
    {
        // Call the get accessor in the given context and return its return value
        return $function.call(this);
    };
};
var $_json      = function()
{
    // If the function context is a primitive value, return it
    if ($$_isPrimitive(this))
        return this;

    // Create the JSON object
    var $json = {};

    // Loop through the enumerable properties on the function context and copy each value to the JSON object
    for (var $key in this)
        $json[$key] = this[$key];

    // Return the JSON object
    return $json;
};
var $_lock      = function($object)
{
    // Return the function lock
    return function($lock)
    {
        // If this function was internally unlocked, return the object reference
        if ($lock === $_lock)
            return $object;
    };
};
var $_parse     = function($json)
{
    try
    {
        // Return the parsed JSON string
        return $__parse($json);
    }
    catch (e)
    {
        //
    }

    return null;
};
var $_reserved  = function($property)
{
    // Return true if the property is reserved
    return $property == '__defineGetter__' || $property == '__defineSetter__' || $property == '__lookupGetter__' || $property == '__lookupSetter__' || $property == '__proto__';
};
var $_set       = function($function, $filter)
{
    // If a filter was provided, return the filtered set accessor
    if ($filter)
        return function($v)
        {
            // Call the set accessor in the given context along with the provided argument within the applied constraint filter and return its return value
            return $function.call(this, $filter($v));
        };

    // Return the set accessor
    return function($v)
    {
        // Call the set accessor in the given context along with the provided argument and return its return value
        return $function.call(this, $v);
    };
};
var $_store     = function($key, $value)
{
    // If no key was provided, return
    if (!$key)
        return;

    // Add the storage prefix to the key
    $key = $_const_prefix_storage + $key;

    // If a second argument was not provided, return the item from the local storage
    if (arguments.length < 2)
        return $__storageLocal__.getItem($key);

    try
    {
        // Set the item in the local storage
        $__storageLocal__.setItem($key, $value);

        return true;
    }
    catch (e)
    {
        //
    }

    return false;
};

// ---------- DEFINES ----------

// Create the define helper functions
var $_defineField    = function($name, $field, $writable)
{
    // Define an enumerable field on the global namespace object
    $_data($$, $name, $field, $writable, true);
};
var $_defineMethod   = function($name, $method)
{
    // If the global function lock flag is set, prevent extensions on the method
    if ($_funcLock)
        $__preventExtensions($method);

    // If the name contains a space
    if ($name.indexOf(' ') >= 0)
    {
        // Create the method names array
        var $names = $name.split(' ');

        // Define each method in the method names array
        for (var $i = 0, $j = $names.length; $i < $j; $i++)
            $_data($$, $names[$i], $method);
    }
    // Define a non-enumerable method on the global namespace object
    else
        $_data($$, $name, $method); 
};
var $_defineProperty = function($name, $getMethod, $setMethod)
{
    // If the name contains a space
    if ($name.indexOf(' ') >= 0)
    {
        // Create the property names array
        var $names = $name.split(' ');

        // Define each property in the property names array
        for (var $i = 0, $j = $names.length; $i < $j; $i++)
            $_accessor($$, $names[$i], $getMethod, $setMethod, true);
    }
    // Define an enumerable property on the global namespace object
    else
        $_accessor($$, $name, $getMethod, $setMethod, true);
};

// ---------- EXCEPTIONS ----------

// Create the exception helper functions
var $_exception          = function($message)
{
    // Format the error message
    $message = typeof $message == 'string' ?
               $message[0].toUpperCase() + $message.substr(1) :
               '';

    // Get the handle
    var $handle = $_handle || $_namespace;

    // Create the arguments array
    $_arguments = $handle ?
                  [$handle] :
                  null;

    // Append the space and exception suffix to the error message
    $message += ' ';
    $message += $handle ?
                $_lang_exception_suffix_handle.replace($_const_format_search, $_format) :
                $_lang_exception_suffix;

    // Reset the arguments reference
    $_arguments = null;

    // If the debug flag is not set, reset the handle
    if (!$_debug)
        $_handle = '';

    // Throw the exception string
    throw new $__error($message);
};
var $_exceptionArguments = function($name, $arguments)
{
    // Format the throwing function name
    $name = $name ?
            'jTypes.' + $name :
            'jTypes';

    // Create the types array
    var $types = new $__array($arguments.length);

    // Set the argument type strings in the types array
    for (var $i = 0, $j = $types.length; $i < $j; $i++)
        $types[$i] = $$_type($arguments[$i]);

    // Create the arguments array
    $_arguments = [$name, $types.join(', ')];

    // Create the formatted exception string
    var $string = $_lang_exception_arguments.replace($_const_format_search, $_format);

    // Reset the arguments reference
    $_arguments = null;

    // Throw the arguments exception string
    throw new $__error($string + ' ' + $_lang_exception_suffix);
};
var $_exceptionFormat    = function($message)
{
    // Create the arguments array
    $_arguments = new $__array(arguments.length - 1);

    // Copy each argument as a string into the arguments array
    for (var $i = 0, $j = $_arguments.length; $i < $j; $i++)
        $_arguments[$i] = $$_asString(arguments[$i + 1]);

    // Format the exception string
    $message = $message.replace($_const_format_search, $_format);

    // Reset the arguments reference
    $_arguments = null;

    // Throw the exception string
    $_exception($message);
};