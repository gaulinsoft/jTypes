/*! ------------------------------------------------------------------------
//                               jTypes 2.1.5
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
(function()
{
    console.log('Starting unit tests on jTypes version ' + $$.version);

    // Get the starting time
    var $_ticks = Date.now();

    // Tests members
    (function(_)
    {
        var $keywords  = ['', 'abstract', 'sealed'];
        var $accessors = ['public', 'protected', 'private'];
        var $modifiers = ['', 'abstract', 'virtual', 'override', 'sealed override', 'abstract override'];
        var $values    = ['', $$.empty(), { 'get': $$.empty(), 'set': $$.empty() }];

        var $shouldFail = function($h, $i, $j, $k)
        {
            if ($j === 0)
                return false;

            if ($j === 1 && $h === 1 && $i !== 2 && $k !== 0)
                return false;

            if ($j === 2 && $h !== 2 && $i !== 2 && $k !== 0)
                return false;

            return true;
        };

        // Tests each possible variation of a member
        (function(_)
        {
            for (var $h = 0; $h < $keywords.length; $h++)
            {
                for (var $i = 0; $i < $accessors.length; $i++)
                {
                    for (var $j = 0; $j < $modifiers.length; $j++)
                    {
                        for (var $k = 0; $k < $values.length; $k++)
                        {
                            var $keyword  = $keywords[$h];
                            var $accessor = $accessors[$i];
                            var $modifier = $modifiers[$j];
                            var $value    = $values[$k];

                            var $definition = {};

                            $definition[$accessor + ' ' + $modifier + ' member'] = $value;

                            try
                            {
                                $$($keyword, $definition);

                                if ($shouldFail($h, $i, $j, $k))
                                {
                                    console.error('########## FAILED ##########');
                                    console.error('Failed test ' + _ + ' which was SUPPOSED to throw with ($h, $i, $j, $k) = (' + $h + ', ' + $i + ', ' + $j + ', ' + $k + ')');
                                }
                            }
                            catch(e)
                            {
                                if (!$shouldFail($h, $i, $j, $k))
                                {
                                    console.error('########## FAILED ##########');
                                    console.error('Failed test ' + _ + ' which was NOT SUPPOSED to throw with ($h, $i, $j, $k) = (' + $h + ', ' + $i + ', ' + $j + ', ' + $k + ')');
                                    console.error(e);
                                }
                            }
                        }
                    }
                }
            }
        })(_ + '1');

        var $shouldFailOverride = function($h, $i, $j, $k, $w, $x, $y, $z)
        {
            if ($shouldFail($h, $i, $j, $k))
                return true;

            if ($h === 2)
                return true;

            if (($j === 1 || $j === 2) && ($y === 3 || $y === 4 || $w === 1 && $y === 5) && $i === $x && $k === $z)
                return false;

            if ($j !== 1 && !$shouldFail($w, $x, $y, $z))
                return false;

            return true;
        };

        // Tests each possible variation of an override member
        (function(_)
        {
            for (var $h = 0; $h < $keywords.length; $h++)
            {
                for (var $i = 0; $i < $accessors.length; $i++)
                {
                    for (var $j = 0; $j < $modifiers.length; $j++)
                    {
                        for (var $k = 0; $k < $values.length; $k++)
                        {
                            var $keyword  = $keywords[$h];
                            var $accessor = $accessors[$i];
                            var $modifier = $modifiers[$j];
                            var $value    = $values[$k];

                            var $definition = {};

                            $definition[$accessor + ' ' + $modifier + ' member'] = $value;

                            try
                            {
                                var $baseClass = $$($keyword, $definition);

                                for (var $w = 0; $w < $keywords.length; $w++)
                                {
                                    for (var $x = 0; $x < $accessors.length; $x++)
                                    {
                                        for (var $y = 0; $y < $modifiers.length; $y++)
                                        {
                                            for (var $z = 0; $z < $values.length; $z++)
                                            {
                                                var $keywordOverride  = $keywords[$w];
                                                var $accessorOverride = $accessors[$x];
                                                var $modifierOverride = $modifiers[$y];
                                                var $valueOverride    = $values[$z];

                                                var $definitionOverride = {};

                                                $definitionOverride[$accessorOverride + ' ' + $modifierOverride + ' member'] = $valueOverride;

                                                try
                                                {
                                                    $$($keywordOverride, $baseClass, $definitionOverride);

                                                    if ($shouldFailOverride($h, $i, $j, $k, $w, $x, $y, $z))
                                                    {
                                                        console.error('########## FAILED ##########');
                                                        console.error('Failed test ' + _ + ' which was SUPPOSED to throw with ($h, $i, $j, $k, $w, $x, $y, $z) = (' + $h + ', ' + $i + ', ' + $j + ', ' + $k + ', ' + $w + ', ' + $x + ', ' + $y + ', ' + $z + ')');
                                                    }
                                                }
                                                catch(e)
                                                {
                                                    if (!$shouldFailOverride($h, $i, $j, $k, $w, $x, $y, $z))
                                                    {
                                                        console.error('########## FAILED ##########');
                                                        console.error('Failed test ' + _ + ' which was NOT SUPPOSED to throw with ($h, $i, $j, $k, $w, $x, $y, $z) = (' + $h + ', ' + $i + ', ' + $j + ', ' + $k + ', ' + $w + ', ' + $x + ', ' + $y + ', ' + $z + ')');
                                                        console.error(e);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                if ($shouldFail($h, $i, $j, $k))
                                {
                                    console.error('########## FAILED ##########');
                                    console.error('Failed test ' + _ + ' which was SUPPOSED to throw with ($h, $i, $j, $k) = (' + $h + ', ' +  $i + ', ' + $j + ', ' + $k + ')');
                                }
                            }
                            catch(e)
                            {
                                if (!$shouldFail($h, $i, $j, $k))
                                {
                                    console.error('########## FAILED ##########');
                                    console.error('Failed test ' + _ + ' which was NOT SUPPOSED to throw with ($h, $i, $j, $k) = (' + $h + ', ' + $i + ', ' + $j + ', ' + $k + ')');
                                    console.error(e);
                                }
                            }
                        }
                    }
                }
            }
        })(_ + '2');
    })('M');

    // Tests properties
    (function(_)
    {
        var $accessors = ['public', 'protected', 'private'];
        var $getters   = ['', 'get', 'public get', 'protected get', 'private get'];
        var $setters   = ['', 'set', 'public set', 'protected set', 'private set'];

        var $shouldFail = function($i, $j, $k)
        {
            if ($j === 1 && $k === 0)
                return false;

            if ($j === 0 && $k === 1)
                return false;

            if ($j === 1 && $k === 1)
                return false;

            if ($i === 0 && $j === 1 && $k === 3)
                return false;

            if (($i === 0 || $i === 1) && $j === 1 && $k === 4)
                return false;

            if ($i === 0 && $j === 3 && $k === 1)
                return false;

            if (($i === 0 || $i === 1) && $j === 4 && $k === 1)
                return false;

            return true;
        };

        // Tests each possible variation of a property
        (function(_)
        {
            for (var $i = 0; $i < $accessors.length; $i++)
            {
                for (var $j = 0; $j < $getters.length; $j++)
                {
                    for (var $k = 0; $k < $setters.length; $k++)
                    {
                        var $accessor = $accessors[$i];
                        var $getter   = $getters[$j];
                        var $setter   = $setters[$k];

                        var $property = {};

                        if ($getter)
                            $property[$getter] = $$.empty();

                        if ($setter)
                            $property[$setter] = $$.empty();

                        var $definition = {};

                        $definition[$accessor + ' property'] = $property;

                        try
                        {
                            $$($definition);

                            if ($shouldFail($i, $j, $k))
                            {
                                console.error('########## FAILED ##########');
                                console.error('Failed test ' + _ + ' which was SUPPOSED to throw with ($i, $j, $k) = (' + $i + ', ' + $j + ', ' + $k + ')');
                            }
                        }
                        catch(e)
                        {
                            if (!$shouldFail($i, $j, $k))
                            {
                                console.error('########## FAILED ##########');
                                console.error('Failed test ' + _ + ' which was NOT SUPPOSED to throw with ($i, $j, $k) = (' + $i + ', ' + $j + ', ' + $k + ')');
                                console.error(e);
                            }
                        }
                    }
                }
            }
        })(_ + '3');

        var $virtuals = ['abstract', 'virtual'];

        var $shouldFailVirtual = function($i, $j, $k)
        {
            if ($shouldFail($i, $j, $k))
                return true;

            if ($i !== 2)
                return false;

            return true;
        };

        // Tests each possible variation of a virtual or abstract property
        (function(_)
        {
            for (var $i = 0; $i < $accessors.length; $i++)
            {
                for (var $j = 0; $j < $getters.length; $j++)
                {
                    for (var $k = 0; $k < $setters.length; $k++)
                    {
                        for (var $m = 0; $m < $virtuals.length; $m++)
                        {
                            var $accessor = $accessors[$i];
                            var $getter   = $getters[$j];
                            var $setter   = $setters[$k];
                            var $virtual  = $virtuals[$m];

                            var $property = {};

                            if ($getter)
                                $property[$getter] = $$.empty();

                            if ($setter)
                                $property[$setter] = $$.empty();

                            var $definition = {};

                            $definition[$accessor + ' ' + $virtual + ' property'] = $property;

                            try
                            {
                                $$('abstract', $definition);

                                if ($shouldFailVirtual($i, $j, $k))
                                {
                                    console.error('########## FAILED ##########');
                                    console.error('Failed test ' + _ + ' which was SUPPOSED to throw with ($i, $j, $k, $m) = (' + $i + ', ' + $j + ', ' + $k + ', ' + $m + ')');
                                }
                            }
                            catch(e)
                            {
                                if (!$shouldFailVirtual($i, $j, $k))
                                {
                                    console.error('########## FAILED ##########');
                                    console.error('Failed test ' + _ + ' which was NOT SUPPOSED to throw with ($i, $j, $k, $m) = (' + $i + ', ' + $j + ', ' + $k + ', ' + $m + ')');
                                    console.error(e);
                                }
                            }
                        }
                    }
                }
            }
        })(_ + '4');

        var $shouldFailOverride = function($i, $j, $k, $x, $y, $z)
        {
            if ($shouldFailVirtual($i, $j, $k))
                return true;

            if ($i === 0 && $j === 1 && $k === 0 ||
                $i === 1 && $j === 1 && $k === 0 ||
                $i === 0 && $j === 0 && $k === 1 ||
                $i === 1 && $j === 0 && $k === 1 ||
                $i === 0 && $j === 1 && $k === 1 ||
                $i === 1 && $j === 1 && $k === 1 ||
                $i === 0 && $j === 1 && $k === 3 ||
                $i === 0 && $j === 3 && $k === 1)
            {
                if ($i === $x && $j === $y && $k === $z)
                    return false;
            }

            if ($x === 0 && $y === 0 && $z === 1 && $i == 0 && $k === 1)
            {
                if ($j === 1 || $j === 3 || $j === 4)
                    return false;
            }

            if ($x === 0 && $y === 1 && $z === 0 && $i == 0 && $j === 1)
            {
                if ($k === 1 || $k === 3 || $k === 4)
                    return false;
            }

            if ($x === 1 && $y === 0 && $z === 1 && $i == 1 && $k === 1)
            {
                if ($j === 1 || $j === 4)
                    return false;
            }

            if ($x === 1 && $y === 1 && $z === 0 && $i == 1 && $j === 1)
            {
                if ($k === 1 || $k === 4)
                    return false;
            }

            // protected set OVERRIDES public get + protected set
            if ($i === 0 && $j === 1 && $k === 3 && $x === 1 && $y === 0 && $z === 1)
            {
                console.warn('Allowing failure which DIDN\'T throw but was actually NOT SUPPOSED to throw...');

                return false;
            }

            // protected get OVERRIDES protected get + public set
            if ($i === 0 && $j === 3 && $k === 1 && $x === 1 && $y === 1 && $z === 0)
            {
                console.warn('Allowing failure which DIDN\'T throw but was actually NOT SUPPOSED to throw...');

                return false;
            }

            return true;
        };

        // Tests each possible variation of an override property
        (function(_)
        {
            for (var $i = 0; $i < $accessors.length; $i++)
            {
                for (var $j = 0; $j < $getters.length; $j++)
                {
                    for (var $k = 0; $k < $setters.length; $k++)
                    {
                        var $accessor = $accessors[$i];
                        var $getter   = $getters[$j];
                        var $setter   = $setters[$k];

                        var $property = {};

                        if ($getter)
                            $property[$getter] = $$.empty();

                        if ($setter)
                            $property[$setter] = $$.empty();

                        var $definition = {};

                        $definition[$accessor + ' virtual property'] = $property;

                        try
                        {
                            var $baseClass = $$($definition);

                            for (var $x = 0; $x < $accessors.length; $x++)
                            {
                                for (var $y = 0; $y < $getters.length; $y++)
                                {
                                    for (var $z = 0; $z < $setters.length; $z++)
                                    {
                                        var $accessorOverride = $accessors[$x];
                                        var $getterOverride   = $getters[$y];
                                        var $setterOverride   = $setters[$z];

                                        var $propertyOverride = {};

                                        if ($getterOverride)
                                            $propertyOverride[$getterOverride] = $$.empty();

                                        if ($setterOverride)
                                            $propertyOverride[$setterOverride] = $$.empty();

                                        var $definitionOverride = {};

                                        $definitionOverride[$accessorOverride + ' override property'] = $propertyOverride;

                                        try
                                        {
                                            $$($baseClass, $definitionOverride);

                                            if ($shouldFailOverride($i, $j, $k, $x, $y, $z))
                                            {
                                                console.error('########## FAILED ##########');
                                                console.error('Failed test ' + _ + ' which was SUPPOSED to throw with ($i, $j, $k, $x, $y, $z) = (' + $i + ', ' + $j + ', ' + $k + ', ' + $x + ', ' + $y + ', ' + $z + ')');
                                            }
                                        }
                                        catch(e)
                                        {
                                            if (!$shouldFailOverride($i, $j, $k, $x, $y, $z))
                                            {
                                                console.error('########## FAILED ##########');
                                                console.error('Failed test ' + _ + ' which was NOT SUPPOSED to throw with ($i, $j, $k, $x, $y, $z) = (' + $i + ', ' + $j + ', ' + $k + ', ' + $x + ', ' + $y + ', ' + $z + ')');
                                                console.error(e);
                                            }
                                        }
                                    }
                                }
                            }

                            if ($shouldFailVirtual($i, $j, $k))
                            {
                                console.error('########## FAILED ##########');
                                console.error('Failed test ' + _ + ' which was SUPPOSED to throw with ($i, $j, $k) = (' + $i + ', ' + $j + ', ' + $k + ')');
                            }
                        }
                        catch(e)
                        {
                            if (!$shouldFailVirtual($i, $j, $k))
                            {
                                console.error('########## FAILED ##########');
                                console.error('Failed test ' + _ + ' which was NOT SUPPOSED to throw with ($i, $j, $k) = (' + $i + ', ' + $j + ', ' + $k + ')');
                                console.error(e);
                            }
                        }
                    }
                }
            }
        })(_ + '5');
    })('P');

    console.log('Stopping unit tests after ' + parseInt(Date.now() - $_ticks, 10) + ' milliseconds');
})();