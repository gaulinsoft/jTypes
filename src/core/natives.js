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

// ########## NATIVE CODE ##########

// Store references to native code functions and constants
var $__object                   = Object,
    $__objectProto__            = $__object.prototype,
    $__create                   = $__object.create,
    $__defineProperties         = $__object.defineProperties,
    $__defineProperty           = $__object.defineProperty,
    $__freeze                   = $__object.freeze,
    $__getOwnPropertyDescriptor = $__object.getOwnPropertyDescriptor,
    $__getOwnPropertyNames      = $__object.getOwnPropertyNames,
    $__getPrototypeOf           = $__object.getPrototypeOf,
    $__isExtensible             = $__object.isExtensible,
    $__isFrozen                 = $__object.isFrozen,
    $__isSealed                 = $__object.isSealed,
    $__keys                     = $__object.keys,
    $__preventExtensions        = $__object.preventExtensions,
    $__propertyIsEnumerable     = $__object.propertyIsEnumerable,
    $__seal                     = $__object.seal,
    $__hasOwnProperty__         = $__objectProto__.hasOwnProperty,
    $__isPrototypeOf__          = $__objectProto__.isPrototypeOf,
    $__toString__               = $__objectProto__.toString,
    $__valueOf__                = $__objectProto__.valueOf,

    // ---------- ARRAY ----------
    $__array            = Array,
    $__arrayProto__     = $__array.prototype,
    $__array_isArray    = $__array.isArray,
    $__array_toString__ = $__arrayProto__.toString,

    // ---------- BOOLEAN ----------
    $__boolean            = Boolean,
    $__booleanProto__     = $__boolean.prototype,
    $__boolean_toString__ = $__booleanProto__.toString,
    $__boolean_valueOf__  = $__booleanProto__.valueOf,

    // ---------- DATE ----------
    $__date            = Date,
    $__dateProto__     = $__date.prototype,
    $__date_now        = $__date.now,
    $__date_parse      = $__date.parse,
    $__date_utc        = $__date.UTC,
    $__date_toString__ = $__dateProto__.toString,
    $__date_valueOf__  = $__dateProto__.valueOf,

    // ---------- ERROR ----------
    $__error            = Error,
    $__errorProto__     = $__error.prototype,
    $__error_toString__ = $__errorProto__.toString,

    // ---------- FUNCTION ----------
    $__function            = Function,
    $__functionProto__     = $__function.prototype,
    $__function_apply__    = $__functionProto__.apply,
    $__function_call__     = $__functionProto__.call,
    $__function_toString__ = $__functionProto__.toString,

    // ---------- NUMBER ----------
    $__number            = Number,
    $__numberProto__     = $__number.prototype,
    $__number_toString__ = $__numberProto__.toString,
    $__number_valueOf__  = $__numberProto__.valueOf,

    // Store the number constants
    $__number_maxValue__         = $__number.MAX_VALUE,
    $__number_minValue__         = $__number.MIN_VALUE,
    $__number_negativeInfinity__ = $__number.NEGATIVE_INFINITY,
    $__number_positiveInfinity__ = $__number.POSITIVE_INFINITY,

    // Store the global NaN constant
    $__NaN__ = NaN,

    // Store the number-related global functions
    $__ceil       = Math.ceil,
    $__floor      = Math.floor,
    $__isFinite   = isFinite,
    $__isNaN      = isNaN,
    $__parseFloat = parseFloat,
    $__parseInt   = parseInt,
    $__random     = Math.random,

    // ---------- REGEXP ----------
    $__regexp            = RegExp,
    $__regexpProto__     = $__regexp.prototype,
    $__regexp_toString__ = $__regexpProto__.toString,

    // ---------- STRING ----------
    $__string            = String,
    $__stringProto__     = $__string.prototype,
    $__string_toString__ = $__stringProto__.toString,
    $__string_valueOf__  = $__stringProto__.valueOf,

    // ---------- WINDOW ----------
    $__window            = null,
    $__windowProto__     = null,
    $__window_toString__ = null,

    // ---------- JSON ----------
    $__parse     = null,
    $__stringify = null,

    // ---------- STORAGE ----------
    $__storageLocal__   = null,
    $__storageSession__ = null,

    // ---------- HARMONY ----------
    $__proxy  = null,
    $__symbol = null;

// If any of the ECMAScript 5 native code methods are not found, throw an exception
if (!$__create || !$__defineProperty || !$__freeze || !$__getPrototypeOf || !$__preventExtensions || !$__seal || !$__array_isArray || !$__arrayProto__.forEach || !$__arrayProto__.indexOf || !$__stringProto__.trim)
    throw new $__error($_lang_exception_compatibility + ' ' + $_lang_exception_suffix);

// If a window type is defined
if (typeof Window != 'undefined' && Window != null && Window.prototype != null)
{
    // Set the native window references
    $__window            = Window;
    $__windowProto__     = $__window.prototype;
    $__window_toString__ = $__windowProto__.toString;
}

// If the global JSON object is defined
if (typeof JSON != 'undefined' && JSON != null)
{
    // If the JSON parse function is defined, store it
    if (typeof JSON.parse == 'function')
        $__parse = JSON.parse;

    // If the JSON stringify function is defined, store it
    if (typeof JSON.stringify == 'function')
        $__stringify = JSON.stringify;
}

// If the storage flag is set, test if local and session storage are supported
if ($_storage)
    (function($key)
    {
        try
        {
            // Get the storage
            var $storage = localStorage;

            // Cache the version in the storage
            $storage.setItem($key, $_version);

            // If the version was cached in the storage, set the native storage reference
            if ($storage.getItem($key) === $_version)
                $__storageLocal__ = $storage;

            // Remove the cached version from the storage
            $storage.removeItem($key);
        }
        catch (e)
        {
            //
        }

        try
        {
            // Get the storage
            var $storage = sessionStorage;

            // Cache the version in the storage
            $storage.setItem($key, $_version);

            // If the version was cached in the storage, set the native storage reference
            if ($storage.getItem($key) === $_version)
                $__storageSession__ = $storage;

            // Remove the cached version from the storage
            $storage.removeItem($key);
        }
        catch (e)
        {
            //
        }
    })('~jT_storage');

// If the harmony flag is set
if ($_harmony)
{
    // If a proxy type is defined, test if proxies are supported
    if (typeof Proxy == 'function')
        (function()
        {
            try
            {
                // Create the proxy test
                var $_target   = { '': null },
                    $_val      = {},
                    $_proxy    = new Proxy($_target, { 'get': function($target, $name, $receiver)
                    {
                        // If the test matches the proxy specifications, return the value
                        if ($target === $_target && $name === '' && $receiver === $_receiver)
                            return $_val;
                    } }),
                    $_receiver = $__create($_proxy);

                // If the value was returned, set the native proxy reference
                if ($_receiver[''] === $_val)
                    $__proxy = Proxy;
            }
            catch (e)
            {
                //
            }
        })();

    // If a symbol type is defined, test if symbols are supported
    if (typeof Symbol == 'function')
        (function()
        {
            try
            {
                // Create the symbol test
                var $object = $__create(null),
                    $symbol = Symbol();

                // Set the symbol in the object
                $object[$symbol] = $symbol;

                // If the symbol was set in the object and the object has no properties, set the native symbol reference
                if (typeof $object[$symbol] == 'symbol' && $__getOwnPropertyNames($object).length == 0)
                    $__symbol = Symbol;
            }
            catch (e)
            {
                //
            }
        })();
}

// If the global function lock flag was set, prevent extensions on the native prototype functions
if ($_funcLock)
{
    // ----- OBJECT -----
    $__preventExtensions($__hasOwnProperty__);
    $__preventExtensions($__isPrototypeOf__);
    $__preventExtensions($__toString__);
    $__preventExtensions($__valueOf__);

    // ----- ARRAY -----
    $__preventExtensions($__array_toString__);

    // ----- BOOLEAN -----
    $__preventExtensions($__boolean_toString__);
    $__preventExtensions($__boolean_valueOf__);

    // ----- DATE -----
    $__preventExtensions($__date_toString__);
    $__preventExtensions($__date_valueOf__);

    // ----- ERROR -----
    $__preventExtensions($__error_toString__);

    // ----- FUNCTION -----
    $__preventExtensions($__function_apply__);
    $__preventExtensions($__function_call__);
    $__preventExtensions($__function_toString__);

    // ----- NUMBER -----
    $__preventExtensions($__number_toString__);
    $__preventExtensions($__number_valueOf__);

    // ----- REGEXP -----
    $__preventExtensions($__regexp_toString__);

    // ----- STRING -----
    $__preventExtensions($__string_toString__);
    $__preventExtensions($__string_valueOf__);

    // ----- WINDOW -----
    if ($__window_toString__)
        $__preventExtensions($__window_toString__);
}

// If the global prototype lock flag was set
if ($_protoLock)
{
    // Freeze the native prototypes
    $__freeze($__arrayProto__);
    $__freeze($__booleanProto__);
    $__freeze($__dateProto__);
    $__freeze($__errorProto__);
    $__freeze($__functionProto__);
    $__freeze($__numberProto__);
    $__freeze($__objectProto__);
    $__freeze($__regexpProto__);
    $__freeze($__stringProto__);
}

// ---------- WINDOW ----------

// Create the window reference
var $_window = typeof window != 'undefined' && window != null && window.window === window ?
               window :
               $__freeze({});