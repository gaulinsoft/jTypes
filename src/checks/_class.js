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
$_defineMethod('isAbstractClass',  function($class)
{
    // Return true if the object is a class and it is abstract
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_abstract);
});
$_defineMethod('isExpandoClass',   function($class)
{
    // Return true if the object is a class and it has the expando modifier
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_expando);
});
$_defineMethod('isImportedClass',  function($class)
{
    // Return true if the object is a class and it has the import modifier
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_import);
});
$_defineMethod('isInternalClass',  function($class)
{
    // Return true if the object is a class and it has the internal modifier
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_internal);
});
$_defineMethod('isModel',          function($class)
{
    // Return true if the object is a class and it has the model modifier
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_model);
});
$_defineMethod('isOptimizedClass', function($class)
{
    // Return true if the object is a class and it is optimized
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_optimized);
});
$_defineMethod('isPrimitiveClass', function($class)
{
    // Return true if the object is a class and it is has the primitive modifier
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_primitive);
});
$_defineMethod('isSealedClass',    function($class)
{
    // Return true if the object is a class and it is sealed
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_sealed);
});
$_defineMethod('isStruct',         function($class)
{
    // Return true if the object is a class and it has the struct modifier
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_struct);
});
$_defineMethod('isUnlockedClass',  function($class)
{
    // Return true if the object is a class and it is unlocked
    return $$_isClass($class) && !!($class[$_symbol_modifiers] & $_modifiers_class_unlocked);
});