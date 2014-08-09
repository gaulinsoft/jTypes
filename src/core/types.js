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

// ########## TYPES ##########

// Create the base class of all classes and the base prototype of all class prototypes
var $_class     = function()
{
    //
};
var $_prototype = {};

// Define the class and prototype "toString()" methods
var $_class_toString     = function()
{
    // Return a class type string
    return '[object Class]';
};
var $_prototype_toString = function()
{
    // Return an instance type string
    return '[object Instance]';
};

// Define the "constructor" reference on the base prototype of all class prototypes
$_data($_prototype, 'constructor', $_class);

// Define the "toJSON()" method on the base prototype of all class prototypes
$_data($_prototype, 'toJSON', $_json);

// Define the "toString()" methods on the base class of all classes and the base prototype of all class prototypes
$_data($_class,     'toString', $_class_toString);
$_data($_prototype, 'toString', $_prototype_toString);

// Set the base class of all classes prototype initially with the "writable" flag (due to some weird WebKit bug involving the internal [[Class]] attribute)
$_class.prototype = $_prototype;

// Set the base class of all classes prototype
$_data($_class, 'prototype', $_prototype);

// Prevent extensions on the base class of all classes
$__preventExtensions($_class);

// If the global prototype lock flag was set, freeze the base prototype of all class prototypes
if ($_protoLock)
    $__freeze($_prototype);

// ---------- SYMBOLS ----------

// Create the symbols helper functions
var $_lockSymbolsClass    = function($class)
{
    // Define the lock function on the class
    $__defineProperty($class, $_symbol_lock, { 'value': function()
    {
        // Set the internal lock reference to the class
        $_lock_class = $class;
    } });
};
var $_lockSymbolsInstance = function($instances, $private, $protected, $public, $base, $construct)
{
    // Create the descriptor
    var $descriptor = { 'value': function()
    {
        // Set the internal lock reference to the instances array
        $_lock_instances = $instances;
    } };

    // Define the lock function on the private and public instances
    $__defineProperty($private, $_symbol_lock, $descriptor);
    $__defineProperty($public,  $_symbol_lock, $descriptor);

    // If a protected instance was provided, define the lock function on it
    if ($protected)
        $__defineProperty($protected, $_symbol_lock, $descriptor);

    // If a base instance was provided and it is unique, define the lock function on it
    if ($base && $base !== $protected)
        $__defineProperty($base, $_symbol_lock, $descriptor);

    // If a construct instance was provided, define the lock function on it
    if ($construct)
        $__defineProperty($construct, $_symbol_lock, $descriptor);
};

// Create the unlock symbols helper functions
var $_unlockSymbolsClass    = function($class)
{
    // Get the class lock
    var $lock = $class[$_symbol_lock];

    // If the lock is not a function, return false
    if (typeof $lock != 'function')
        return false;

    // Reset the class lock reference
    $_lock_class = null;

    // Call the lock function
    $lock();

    // If the class lock reference was not set, return false
    if (!$_lock_class)
        return false;

    // Return true if the class matches the class lock reference
    return $class === $_lock_class;
};
var $_unlockSymbolsInstance = function($instance)
{
    // Get the instance lock
    var $lock = $instance[$_symbol_lock];

    // If the lock is not a function, return false
    if (typeof $lock != 'function')
        return false;

    // Reset the instances lock reference
    $_lock_instances = null;

    // Call the lock function
    $lock();

    // If the instances lock reference was not set, return false
    if (!$_lock_instances)
        return false;

    // Return true if the instance matches either the private, protected, public, base, or construct instances
    return $instance === $_lock_instances[$_instance_private] || $instance === $_lock_instances[$_instance_protected] || $instance === $_lock_instances[$_instance_public] || $instance === $_lock_instances[$_instance_base] || $instance === $_lock_instances[$_instance_construct];
};

// If symbols are supported
if ($_symbolCreate)
{
    // Create unlock symbols helper functions that utilize symbols
    $_unlockSymbolsClass    = function($class)
    {
        // Return true if the class symbol is set on the class
        return $class[$_symbol_class] === $class;
    };
    $_unlockSymbolsInstance = function($instance)
    {
        // Return true if the instance symbol is set on the instance
        return $instance[$_symbol_instance] === $instance;
    };
}