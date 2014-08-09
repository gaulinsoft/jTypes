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

// ########## SYMBOLS ##########

// Create the symbol helper functions
var $_symbolCreate    = $_legacy ?
                        null :
                        $__symbol ?
                        $__symbol :
                        function()
                        {
                            // Return the generated symbol hash with the prepended symbol-prefix
                            return $_const_prefix_symbol + $_generator($_const_hash_symbol);
                        };
var $_symbolGenerator = function($name)
{
    // If ECMAScript 6 symbols are supported, return a symbol
    if ($__symbol)
        return $__symbol();

    // If the minify flag is not set and a name was provided, return the symbol-prefixed name
    if (!$_minify && $name)
        return $_const_prefix_symbol + $name;

    // Return the generated symbol hash with the prepended symbol-prefix
    return $_const_prefix_symbol + $_generator(!$_legacy ? $_const_hash_symbol : null);
};

// Create the obfuscated symbols
var $_symbol_build     = $_symbolGenerator('build'),
    $_symbol_failed    = $_symbolGenerator('failed'),
    $_symbol_handle    = $_symbolGenerator('handle'),
    $_symbol_internal  = $_symbolGenerator('internal'),
    $_symbol_lock      = $_symbolGenerator('lock'),
    $_symbol_metaclass = $_symbolGenerator('metaclass'),
    $_symbol_modifiers = $_symbolGenerator('modifiers'),
    $_symbol_name      = $_symbolGenerator('name'),
    $_symbol_namespace = $_symbolGenerator('namespace'),

    // Create the optimized symbols
    $_symbol_class         = $_symbolGenerator(),
    $_symbol_data          = $_symbolGenerator(),
    $_symbol_data_handle   = $_symbolGenerator(),
    $_symbol_data_name     = $_symbolGenerator(),
    $_symbol_data_readonly = $_symbolGenerator(),
    $_symbol_instance      = $_symbolGenerator();

// ---------- FILTERS ----------

// Create the filter symbols
var $_filter_cast     = $_symbolGenerator('cast'),
    $_filter_default  = $_symbolGenerator('default'),
    $_filter_handle   = $_symbolGenerator('handle'),
    $_filter_native   = $_symbolGenerator('native'),
    $_filter_null     = $_symbolGenerator('null'),
    $_filter_suppress = $_symbolGenerator('suppress'),

    // Create the class filter symbols
    $_filter_class     = $_symbolGenerator('class'),
    $_filter_model     = $_symbolGenerator('model'),
    $_filter_primitive = $_symbolGenerator('primitive'),
    $_filter_struct    = $_symbolGenerator('struct');