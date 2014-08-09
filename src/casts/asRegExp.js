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
var $$_asRegExp = function($object, $unobstructed)
{
    // Get the object type
    var $type = $object == null ?
                $object + '' :
                $_types[$__toString__.call($object)] || 'object';

    // If the object is a boolean, return the regexp object
    if ($type == 'boolean')
        return new $__regexp($__boolean_toString__.call($object));

    // If the object is a number, return the regexp object
    if ($type == 'number')
        return new $__regexp($__number_toString__.call($object).replace($_const_escape_search, $_const_escape_replace));

    // If the object is a string
    if ($type == 'string')
    {
        // If the string is not a primitive, get the primitive value of the string
        if (typeof $object != 'string')
            $object = $__string_valueOf__.call($object);

        // Check if the string matches a regular expression
        var $match = $_const_regexp_regexp.exec($object);

        // If the string did not match a regular expression, return the default regexp object
        if (!$match)
            return new $__regexp();

        try
        {
            // Try to return the string converted to a new regexp object
            return new $__regexp($match[1], $match[2]);
        }
        catch (e)
        {
            // If the conversion failed, return the default regexp object
            return new $__regexp();
        }
    }

    // If the object is not a regular expression, return the default regexp object
    if ($type != 'regexp')
        return new $__regexp();

    // FORMAT $unobstructed
    $unobstructed = $unobstructed !== undefined ?
                    $$_asBoolean($unobstructed) :
                    false;

    // If the unobstructed flag is set
    if ($unobstructed)
    {
        // Create the obstructed flag
        var $obstructed = false;

        // If the regexp has the regexp prototype
        if ($__regexpProto__ === $__getPrototypeOf($object))
        {
            for (var $i = 0, $j = $_prototypes_regexp.length; $i < $j && !$obstructed; $i++)
            {
                // Get the current property in the prototype
                var $property = $_prototypes_regexp[$i];

                // If the property is a regexp property or a reserved property, skip it
                if ($property == 'global' || $property == 'ignoreCase' || $property == 'lastIndex' || $property == 'multiline' || $property == 'source' || $_reserved($property))
                    continue;

                // Get the function from the prototype
                var $function = $__regexpProto__[$property];

                // If the function is not a function, skip it
                if (typeof $function != 'function')
                    continue;

                // Set the obstructed flag
                $obstructed = $function !== $object[$property];
            }
        }
        // Set the obstructed flag
        else
            $obstructed = true;

        // If the regexp object is obstructed, return a new regexp object
        if ($obstructed)
            return new $__regexp($object.source,
                                 ($object.global     ? 'g' : '') +
                                 ($object.ignoreCase ? 'i' : '') +
                                 ($object.multiline  ? 'm' : ''));
    }

    // Return the object
    return $object;
};

$_defineMethod('asRegExp', $$_asRegExp);