/*! ------------------------------------------------------------------------
//                               jTypes 2.2.X
//  ------------------------------------------------------------------------
//
//                   Copyright 2013 Gaulinsoft Corporation
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
(function(window, $, $$, undefined)
{
    // ########## STRICT ##########

    // Enable strict mode
    'use strict';

    // ########## LANGUAGE ##########

    // Create the language prefix and arguments exception
    var $_lang_exception_arguments = '"{0}({1})" has some invalid arguments.';
    var $_lang_exception_prefix    = 'jTypes Error: ';

    // Create the language constants
    var $_lang_ajax_error = '.';

    // ########## NATIVE CODE ##########
    
    // ---------- OBJECT ----------
    var $__object__                   = Object;
    var $__objectProto__              = $__object__.prototype;
    var $__create__                   = $__object__.create;
    var $__defineProperties__         = $__object__.defineProperties;
    var $__defineProperty__           = $__object__.defineProperty;
    var $__freeze__                   = $__object__.freeze;
    var $__getOwnPropertyDescriptor__ = $__object__.getOwnPropertyDescriptor;
    var $__getOwnPropertyNames__      = $__object__.getOwnPropertyNames;
    var $__getPrototypeOf__           = $__object__.getPrototypeOf;
    var $__isExtensible__             = $__object__.isExtensible;
    var $__isFrozen__                 = $__object__.isFrozen;
    var $__isSealed__                 = $__object__.isSealed;
    var $__keys__                     = $__object__.keys;
    var $__preventExtensions__        = $__object__.preventExtensions;
    var $__propertyIsEnumerable__     = $__object__.propertyIsEnumerable;
    var $__seal__                     = $__object__.seal;
    var $__hasOwnProperty__           = $__objectProto__.hasOwnProperty;
    var $__isPrototypeOf__            = $__objectProto__.isPrototypeOf;
    var $__toString__                 = $__objectProto__.toString;
    var $__valueOf__                  = $__objectProto__.valueOf;

    // ---------- ARRAY ----------
    var $__array__       = Array;
    var $__arrayProto__  = $__array__.prototype;
    var $__isArray__     = $__array__.isArray;
    var $__every__       = $__arrayProto__.every;
    var $__filter__      = $__arrayProto__.filter;
    var $__forEach__     = $__arrayProto__.forEach;
    var $__indexOf__     = $__arrayProto__.indexOf;
    var $__lastIndexOf__ = $__arrayProto__.lastIndexOf;
    var $__map__         = $__arrayProto__.map;
    var $__reduce__      = $__arrayProto__.reduce;
    var $__reduceRight__ = $__arrayProto__.reduceRight;
    var $__some__        = $__arrayProto__.some;

    // ---------- STRING ----------
    var $__string__      = String;
    var $__stringProto__ = $__string__.prototype;
    var $__match__       = $__stringProto__.match;
    var $__replace__     = $__stringProto__.replace;
    var $__trim__        = $__stringProto__.trim;

    // ---------- WINDOW ----------
    var $__clearInterval__ = window.clearInterval;
    var $__clearTimeout__  = window.clearTimeout;
    var $__document__      = window.document;
    var $__setInterval__   = window.setInterval;
    var $__setTimeout__    = window.setTimeout;
    
    // ########## EXCEPTIONS ##########
    
    // Create the exceptions helpers
    var $_exceptionArguments = function($name, $arguments)
    {
        // If a name was provided, prepend "$$." for reference
        if ($name)
            $name = '$$.' + $name;
        // The jTypes function is throwing the exception instead
        else
            $name = '$$';
        
        // Create the types array
        var $types = [];

        // Push the argument types into the types array
        for (var $i = 0, $j = $arguments.length; $i < $j; $i++)
            $types.push($$.type($arguments[$i]));

        // Return the exception string
        return $_lang_exception_prefix + $$.format($_lang_exception_arguments, $name, $types.join(', '));
    };
    var $_exceptionFormat    = function($message)
    {
        // Return the exception string
        return $_lang_exception_prefix + $$.format.apply($$, arguments);
    };

    // ########## DEFINES ##########

    // Create the defines helpers
    var $_defineField    = function($name, $field)
    {
        // Define an enumerable field on the jTypes object
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   true,
            'value':        $field,
            'writable':     false
        });
    };
    var $_defineMethod   = function($name, $method)
    {
        // Define a non-enumerable method on the jTypes object
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   false,
            'value':        $method,
            'writable':     false
        });
    };
    var $_defineProperty = function($name, $getMethod, $setMethod)
    {
        // Define an enumerable property on the jTypes object
        return $__defineProperty__.call($__object__, $$, $name,
        {
            'configurable': false,
            'enumerable':   true,
            'get':          $getMethod || undefined,
            'set':          $setMethod || undefined
        });
    };

    // ###############################
    // ########## UTILITIES ##########
    // ###############################

    // ########## SETTINGS ##########

    // Create the defaults object
    var $_defaults = (
    {
        'AJAX_TIMEOUT_DURATION': 5000,
        'DOCUMENT_KEYPRESS_INTERVAL': 100,
        'JQUERY_DATA_PREFIX': '__jTypes__',
        'LOCALE_MONTHS': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'LOCALE_WEEKDAYS': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'MAX_INT': 9007199254740992,
        'MIN_INT': -9007199254740992,
        'SCROLLTO_MARGIN': 6,
        'TICKER_SCROLL_DURATION': 150,
        'TIMESTAMP_OFFSET': 0
    });

    // Freeze the defaults object
    $__freeze__.call($__object__, $_defaults);

    // Create the settings object
    var $_settings = $__create__.call($__object__, $_defaults);

    // Define the settings namespace on the jTypes global variable
    $_defineField('settings', $_settings);

    // ########## COMPATIBILITY ##########

    // Create the compatibility object
    var $_compatibility = (
    {
        'placeholder': $__document__ && $__document__.createElement && !!('placeholder' in $__document__.createElement('input')),
        'touch': $__document__ && !!('ontouchend' in $__document__)
    });

    try
    {
        // Try to delete a property from the compatibility object
        delete $_compatibility.xyz;

        // Set the compatibility flag to true
        $_compatibility.deleteOperator = true;
    }
    catch (e)
    {
        // Set the compatibility flag to false
        $_compatibility.deleteOperator = false;
    }

    // Define the compatibility namespace on the jTypes global variable
    $_defineField('compatibility', $_compatibility);

    // ########## DATE/TIME ##########

    // ---------- COMPARE ----------
    $_defineMethod('compareDates', function($formerDate, $latterDate)
    {
        // If either the former or latter dates are not date objects
        if (!$$.isDate($formerDate) || !$$.isDate($latterDate))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('compareDates', arguments);

            // Return NaN
            return NaN;
        }

        // Calculate the former and latter timestamps without a time component
        var $formerDateTime = $$.asInt(Date.UTC($formerDate.getUTCFullYear(), $formerDate.getUTCMonth(), $formerDate.getUTCDate(), 0, 0, 0, 0));
        var $latterDateTime = $$.asInt(Date.UTC($latterDate.getUTCFullYear(), $latterDate.getUTCMonth(), $latterDate.getUTCDate(), 0, 0, 0, 0));

        // If either the former or latter dates are invalid dates, return NaN
        if (!isFinite($formerDateTime) || !isFinite($latterDateTime))
            return NaN;

        // Return the difference in days
        return Math.round(($formerDateTime - $latterDateTime) / 86400000);
    });

    // ---------- CREATE ----------
    $_defineMethod('createDate', function($year, $month, $day, $isLocal)
    {
        // FORMAT $day
        // FORMAT $month
        // FORMAT $year
        $day   = $$.asInt($day);
        $month = $$.asInt($month);
        $year  = $$.asInt($year);

        // FORMAT $isLocal
        $isLocal = $$.asBool($isLocal || $isLocal === undefined);

        // If either the day, month, or year are invalid, return
        if (!isFinite($day) || !isFinite($month) || !isFinite($year) || $year < 1 || $year > 9999)
            return new Date(NaN);
        
        // If the year is less than one-hundred
        if ($year < 100)
        {
            // Create an empty date
            var $date = new Date(0);

            // If the local flag has not been set
            if (!$isLocal)
            {
                // Set the full year, month, and day of the UTC date
                $date.setUTCFullYear($year);
                $date.setUTCMonth($month);
                $date.setUTCDate($day);
            }
            else
            {
                // Set the full year, month, and day of the date
                $date.setFullYear($year);
                $date.setMonth($month);
                $date.setDate($day);
            }

            // Return the date
            return $date;
        }

        // If the local flag has not been set, return the UTC date
        if (!$isLocal)
            return new Date(Date.UTC($year, $month, $day));

        // Return the date
        return new Date($year, $month, $day);
    });

    // ---------- NOW ----------
    $_defineMethod('now', function()
    {
        // Get the server offset and current timestamp
        var $offset = $$.asInt($_settings['TIMESTAMP_OFFSET']);
        var $now    = $$.asInt(Date.now());

        // If no server offset exists, return the current timestamp
        if (!isFinite($offset))
            return $now;

        // Return the server timestamp
        return $now - $offset;
    });

    // ---------- PARSE ----------
    $_defineMethod('parseDate', function($string)
    {
        // FORMAT $string
        $string = $$.asString($string);

        // If the date string does not start with a date constructor, return null
        if ($string.length < 9 || $string.substr(0, 6) !== '/Date(')
            return null;
        
        // If the provided string is not a JSON date object string, return null
        if (!(/^\/Date\(-?[0-9]+\)\/$/).test($string))
            return null;

        // Return the date object from the JSON date object string ticks
        return new Date($$.asInt((/-?[0-9]+/).exec($string)[0]));
    });

    // ---------- STRINGIFY ----------
    $_defineMethod('stringifyDate', function($date)
    {
        // If the date is not a date, return
        if (!$$.isDate($date))
            return '';

        // Get the timestamp
        var $time = $$.asInt($date.getTime());

        // If the timestamp is invalid, return
        if (!isFinite($time))
            return '';

        // Return the JSON date object string from the timestamp
        return '/Date(' + $time + ')/';
    });

    // ########## HELPERS ##########

    // ---------- APPLY ----------
    $_defineMethod('apply', function($this, $function)
    {
        // Create the starting index
        var $index = 2;

        // If the function is not a function
        if (!$$.isFunction($function))
        {
            // If the context is not a function
            if (!$$.isFunction($this))
            {
                // If the debug flag is set, throw an exception
                if ($$.debug)
                    throw $_exceptionArguments('apply', arguments);

                // Return an empty function
                return $$.empty();
            }

            // Set the context as the function
            $function = $this;

            // Decrement the starting index
            $index--;
        }
        // If the context is not a reference type, set the context as the global window object
        else if (!$$.isReferenceType($this))
            $this = window;

        // Call the function in the context for each array of arguments
        for (var $i = $index, $j = arguments.length; $i < $j; $i++)
            $function.apply($this, $$.asArray(arguments[$i]));

        // Return the function
        return $function;
    });

    // ---------- INHERIT ----------
    $_defineMethod('inherit', function($object)
    {
        // CHECK $object
        if (!$$.isReferenceType($object))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('inherit', arguments);

            // Return an empty object
            return {};
        }
        
        // Return the new object
        return $__create__.call($__object__, $object) || {};
    });

    // ---------- KEYS ----------
    $_defineMethod('keys', function($object)
    {
        // CHECK $object
        if ($object === undefined || $object === null)
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('keys', arguments);

            // Return an empty array
            return [];
        }
        
        // Return the keys array of the object
        return $__keys__.call($__object__, $object) || [];
    });

    // ---------- MATCH ----------
    $_defineMethod('match', function($string, $expression)
    {
        // CHECK $string
        if (!$$.isString($string))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('match', arguments);

            // FORMAT $string
            $string = $$.asString($string);
        }
        
        // CHECK $expression
        if (!$$.isRegExp($expression) && !$$.isString($expression))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('match', arguments);

            // FORMAT $expression
            $expression = $$.asString($expression);
        }

        // Return true if the string matched the expression
        return $__match__.call($string, $expression) || null;
    });

    // ---------- PROPERTY ----------
    $_defineMethod('property', function($object, $name, $settings)
    {
        // CHECK $object
        if (!$$.isReferenceType($object))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('property', arguments);

            // Return the object
            return $object;
        }

        // If the name is not a simple object
        if (!$$.isSimpleObject($name))
        {
            // CHECK $name
            // CHECK $settings
            if (!$$.isString($name) || !$$.isSimpleObject($settings))
            {
                // If the debug flag is set, throw an exception
                if ($$.debug)
                    throw $_exceptionArguments('property', arguments);

                // Return the object
                return $object;
            }

            // Create the property settings
            var $propertySettings = (
            {
                'configurable': $$.asBool($settings.c),
                'enumerable':   $$.asBool($settings.e)
            });

            // Check if there are get or set accessor functions
            var $getter = $$.isFunction($settings.g);
            var $setter = $$.isFunction($settings.s);

            // If a get or set function was provided
            if ($getter || $setter)
            {
                // Set the getter and setter
                $propertySettings['get'] = $getter ? $settings.g : undefined;
                $propertySettings['set'] = $setter ? $settings.s : undefined;
            }
            else
            {
                // Set the value and writable attribute
                $propertySettings['value']    = $settings.v;
                $propertySettings['writable'] = $$.asBool($settings.w);
            }

            // Define a property on the object
            $__defineProperty__.call($__object__, $object, $name, $propertySettings);
        }
        else
        {
            // Fix the arguments
            $settings = $name;
            $name     = undefined;

            // Create the property for each property settings object
            for (var $key in $settings)
                $$.property($object, $$.asString($key), $settings[$key]);
        }

        // Return the object
        return $object;
    });

    // ---------- REGULAR-EXPRESSIONS ----------
    $_defineMethod('regexp', function($pattern, $flags)
    {
        // CHECK $pattern
        if (!$$.isString($pattern))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('regexp', arguments);

            // FORMAT $pattern
            $pattern = $$.asString($pattern);
        }

        // CHECK $flags
        if (!$$.isString($flags) && $flags !== undefined && $flags !== null)
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('regexp', arguments);

            // Clear the flags
            $flags = null;
        }

        // Return the regular expression object
        return new RegExp($pattern, $flags);
    });

    // ---------- REGULAR-EXPRESSIONS ESCAPE ----------
    $_defineMethod('regexpEscape', function($string)
    {
        // CHECK $string
        if (!$$.isString($string))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('regexpEscape', arguments);

            // FORMAT $string
            $string = $$.asString($string);
        }

        // Return the escaped string
        return $__replace__.call($string, /[-\/\\^$*+?.()|[\]{}]/g, '\\$&') || '';
    });

    // ---------- REPLACE ----------
    $_defineMethod('replace', function($string, $expression, $replace, $replaceIsCode)
    {
        // CHECK $string
        if (!$$.isString($string))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('replace', arguments);

            // FORMAT $string
            $string = $$.asString($string);
        }
        
        // CHECK $expression
        if (!$$.isRegExp($expression) && !$$.isString($expression))
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('replace', arguments);

            // FORMAT $expression
            $expression = $$.asString($expression);
        }

        // See if the replacement is a string
        var $replaceIsString = $$.isString($replace);

        // CHECK $replace
        if (!$$.isFunction($replace) && !$replaceIsString)
        {
            // If the debug flag is set, throw an exception
            if ($$.debug)
                throw $_exceptionArguments('replace', arguments);

            // FORMAT $replace
            $replace = $$.asString($replace);
        }

        // FORMAT $replaceIsCode
        $replaceIsCode = $$.asBool($replaceIsCode);

        // If the replacement is a string and not code, escape the dollar signs in the replacement string
        if (!$replaceIsCode && $replaceIsString)
            $replace = $__replace__.call($replace, /\$/g, '\$$&');
        
        // Return the replaced string
        return $__replace__.call($string, $expression, $replace) || '';
    });

    // ########## INTERVALS ##########

    // ---------- START ----------
    $_defineMethod('startInterval', function($interval, $this, $callback, $arguments)
    {
        // FORMAT $interval
        $interval = $$.asInt($interval);

        // CHECK $interval
        if (!isFinite($interval) || $interval < 0)
            $interval = 0;

        // If the callback is not a function
        if (!$$.isFunction($callback))
        {
            // If the context is not a function
            if (!$$.isFunction($this))
            {
                // If the debug flag is set, throw an exception
                if ($$.debug)
                    throw $_exceptionArguments('startInterval', arguments);

                // Return an empty handle
                return 0;
            }

            // Set the context as the callback
            $callback  = $this;
            $arguments = $callback;
        }
        // If the context is not a reference type, set the context as the global window object
        else if (!$$.isReferenceType($this))
            $this = window;

        // If the arguments array is not an array
        if (!$$.isArray($arguments))
        {
            // Set the interval and get the interval handle
            var $handle = $$.asInt($__setInterval__.call(window, function()
            {
                // Call the callback in the context using the handle as the only argument
                $callback.call($this, $handle);
            }, $interval));

            // Return the handle
            return $handle;
        }

        // Set the interval and return the interval handle
        return $$.asInt($__setInterval__.call(window, function()
        {
            // Call the callback in the context using the arguments array as the arguments
            $callback.apply($this, $arguments);
        }, $interval));
    });

    // ---------- STOP ----------
    $_defineMethod('stopInterval', function($handle)
    {
        // FORMAT $handle
        $handle = $$.asInt($handle);

        // CHECK $handle
        if (!isFinite($handle))
            return 0;

        // Clear the interval
        $__clearInterval__.call(window, $handle);

        // Return the handle
        return $handle;
    });

    // ########## TIMEOUTS ##########

    // ---------- START ----------
    $_defineMethod('startTimeout', function($delay, $this, $callback, $arguments)
    {
        // FORMAT $delay
        $delay = $$.asInt($delay);

        // CHECK $delay
        if (!isFinite($delay) || $delay < 0)
            $delay = 0;

        // If the callback is not a function
        if (!$$.isFunction($callback))
        {
            // If the context is not a function
            if (!$$.isFunction($this))
            {
                // If the debug flag is set, throw an exception
                if ($$.debug)
                    throw $_exceptionArguments('startTimeout', arguments);

                // Return an empty handle
                return 0;
            }

            // Set the context as the callback
            $callback  = $this;
            $arguments = $callback;
        }
        // If the context is not a reference type, set the context as the global window object
        else if (!$$.isReferenceType($this))
            $this = window;

        // If the arguments array is not an array
        if (!$$.isArray($arguments))
        {
            // Set the timeout and get the timeout handle
            var $handle = $$.asInt($__setTimeout__.call(window, function()
            {
                // Call the callback in the context using the handle as the only argument
                $callback.call($this, $handle);
            }, $delay));

            // Return the handle
            return $handle;
        }

        // Set the timeout and return the timeout handle
        return $$.asInt($__setTimeout__.call(window, function()
        {
            // Call the callback in the context using the arguments array as the arguments
            $callback.apply($this, $arguments);
        }, $delay));
    });

    // ---------- STOP ----------
    $_defineMethod('stopTimeout', function($handle)
    {
        // FORMAT $handle
        $handle = $$.asInt($handle);

        // CHECK $handle
        if (!isFinite($handle))
            return 0;

        // Clear the timeout
        $__clearTimeout__.call(window, $handle);

        // Return the handle
        return $handle;
    });

    // ########## JQUERY ##########

    // If jQuery is defined
    if ($)
    {
        $_defineMethod('jquery', function($class, $singular, $plural, $tags, $attributes)
        {
            //

            // Return the class
            return $class;
        });

        $_defineMethod('scrollTo', function()
        {
            //
        });
    }
})(window, window['jQuery'], jTypes);