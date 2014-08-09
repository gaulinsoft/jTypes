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

// ########## EXPORTS ##########

// Define the development and version constants
$_defineField('dev',     !$_minify, false);
$_defineField('version', $_version, false);

// Define the global class and prototype constants
$_defineField('__class', $_class,     false);
$_defineField('__proto', $_prototype, false);

// Define the date constants
$_defineField('dateMax', $_const_date_max, false);
$_defineField('dateMin', $_const_date_min, false);

// Define the numeric constants
$_defineField('epsilon', $_const_float_epsilon, false);
$_defineField('intMax',  $_const_int_max,       false);
$_defineField('intMin',  $_const_int_min,       false);
$_defineField('max',     $_const_float_max,     false);
$_defineField('min',     $_const_float_min,     false);

// ---------- STORAGE ----------

// If the storage flag is set
if ($_storage)
{
    // Set the storage references
    $_data($_storage, 'local',   $__storageLocal__,   false, true);
    $_data($_storage, 'session', $__storageSession__, false, true);

    // Define the storage object
    $_defineField('storage', $_storage, false);
}

// ---------- SUPPORT ----------

// Create the support object
var $_support = {};

// Set the support object flags
$_data($_support, 'proxy',  !!$__proxy,  false, true);
$_data($_support, 'symbol', !!$__symbol, false, true);

// Define the support object
$_defineField('support', $_support, false);