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

// ########## FLAGS ##########

// If no global object was provided, create a temporary global object
if (!global)
    global = {};

// Create the internal flags
var $_arrays    = global['jT_TypedArrays'] === true,
    $_cache     = '',
    $_debug     = !$_minify,
    $_element   = global['HTMLElement'] || null,
    $_funcLock  = global['jT_FunctionLock'] === true,
    $_harmony   = global['jT_Harmony'] !== false,
    $_jquery    = typeof global['jQuery'] == 'function' ? global['jQuery'] : null,
    $_legacy    = global['jT_Legacy'] === true,
    $_protoLock = global['jT_PrototypeLock'] === true,
    $_storage   = global['jT_Storage'] === true ? {} : null,
    $_strict    = false;