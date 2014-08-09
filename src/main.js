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

// ########## MAIN ##########

// Create the global namespace
var $$ = function()
{
    // If the new operator was used, throw an exception
    if (this instanceof $$)
        $_exception($_lang_class_new);

    // Create the initial arguments
    var $argument     = 0,
        $base         = null,
        $constructor  = arguments[$argument++],
        $dependencies = null,
        $modifiers    = '',
        $prototype    = null;

    // If the constructor is not a simple object
    if ($constructor == null || typeof $constructor != 'object' || $__getPrototypeOf($constructor) !== $__objectProto__)
    {
        // Get the prototype
        $prototype = arguments[$argument++];

        // If the constructor is not a function
        if (typeof $constructor != 'function')
        {
            // If the constructor is not a string
            if (typeof $constructor != 'string')
            {
                // If the constructor is not an array, throw an exception
                if (!$__array_isArray($constructor))
                    $_exceptionArguments(null, arguments);

                // Use the first argument as the dependencies array
                $dependencies = $constructor;
            }
            // Use the first argument as the modifiers string
            else
                $modifiers = $constructor;

            // If the prototype is an array
            if ($__array_isArray($prototype))
            {
                // If a dependencies array was already provided, throw an exception
                if ($dependencies)
                    $_exceptionArguments(null, arguments);

                // Use the second argument as the dependencies array
                $dependencies = $prototype;
                $constructor  = arguments[$argument++];
            }
            // If the prototype is a class
            else if (typeof $prototype == 'function' && $_unlockSymbolsClass($prototype))
            {
                // Use the second argument as the base class
                $base        = $prototype;
                $constructor = arguments[$argument++];
            }
            // Use the second argument as the constructor
            else
                $constructor = $prototype;

            // If the constructor is a function and not a class
            if (typeof $constructor == 'function' && !$_unlockSymbolsClass($constructor))
            {
                // If a base class was not provided and there are no more arguments, return the compiled namespace object
                if (!$base && $argument == arguments.length)
                    return $_compilerTryNamespace($modifiers, $dependencies, $constructor);

                // Use the fourth argument as the prototype
                $prototype = arguments[$argument++];
            }
            else
            {
                // Use the third argument as the prototype
                $prototype   = $constructor;
                $constructor = null;
            }

            // If a dependencies array was provided, throw an exception
            if ($dependencies)
                $_exceptionArguments(null, arguments);
        }
        // If the constructor is a class
        else if ($_unlockSymbolsClass($constructor))
        {
            // Use the first argument as the base class
            $base = $constructor;

            // If the prototype is a function and not a class
            if (typeof $prototype == 'function' && !$_unlockSymbolsClass($prototype))
            {
                // Use the second argument as the constructor
                $constructor = $prototype;
                $prototype   = arguments[$argument++];
            }
            else
                $constructor = null;
        }
        // If a prototype argument was not provided, return the compiled namespace object
        else if ($argument - 1 == arguments.length)
            return $_compilerTryNamespace($modifiers, $dependencies, $constructor);

        // If the prototype is not a simple object, throw an exception
        if ($prototype == null || typeof $prototype != 'object' || $__getPrototypeOf($prototype) !== $__objectProto__)
            $_exceptionArguments(null, arguments);
    }
    else
    {
        // Use the first argument as the prototype
        $prototype   = $constructor;
        $constructor = null;
    }

    // If the debug flag is set and a failed base class was provided, return a failed class
    if ($_debug && $base && $base[$_symbol_failed] === $base)
        return $_compilerClassFailed();

    // If the argument count does not match the number of arguments
    if (arguments.length != $argument)
    {
        // Set the private prototype and get the protected and public prototypes
        var $prototypePrivate   = $prototype,
            $prototypeProtected = arguments[$argument++],
            $prototypePublic    = arguments[$argument++];

        // If neither the protected nor public prototypes are simple objects, throw an exception
        if ($prototypeProtected == null || typeof $prototypeProtected != 'object' || $__getPrototypeOf($prototypeProtected) !== $__objectProto__ || $prototypePublic == null || typeof $prototypePublic != 'object' || $__getPrototypeOf($prototypePublic) !== $__objectProto__)
            $_exceptionArguments(null, arguments);

        // Get the prototype
        $prototype = arguments[$argument];

        // If the prototype is not a simple object, reset the prototype
        if ($prototype == null || typeof $prototype != 'object' || $__getPrototypeOf($prototype) !== $__objectProto__)
            $prototype = null;
        // Increment the argument count
        else
            $argument++;

        // If the argument count does not match the number of arguments, throw an exception
        if (arguments.length != $argument)
            $_exceptionArguments(null, arguments);

        // Return the compiled class (using separated prototypes)
        return $_compilerTryClass($modifiers, $base, $constructor, $prototype, $prototypePrivate, $prototypeProtected, $prototypePublic);
    }

    // Return the compiled class
    return $_compilerTryClass($modifiers, $base, $constructor, $prototype);
};

// Define the "toString()" method
$_defineMethod('toString', function()
{
    // Return the global namespace type string
    return '[object jTypes]';
});