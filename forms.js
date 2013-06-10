/*! ------------------------------------------------------------------------
//                               jTypes 2.1.0b
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

    // ########## GLOBALS ##########
    var $_bool     = $$.asBool;
    //var $_date     = $$.utilities.parseDate;
    var $_document = $(window.document);
    var $_float    = $$.asFloat;
    var $_focused  = null;
    var $_forms    = {};
    //var $_keypress = $$.utilities.now();
    var $_integer  = $$.asInt;
    var $_maximum  = 9007199254740992;
    var $_minimum  = -9007199254740992;
    var $_string   = $$.asString;
    var $_window   = $(window);

    // ########## ELEMENT ##########
    $_forms.Element = $$('abstract', function($element)
    {
        if (!$element || !$element.jquery)
            throw $$.format('...');

        if ($element.length !== 1)
            throw $$.format('...');

        this._$ = $element
            .data('__jTypes__', $__getPrototypeOf__.call($__object__, this.__self));
    },
    {
        'protected _$': null,

        'public abstract blur': function()
        {
            // If this element is the currently focused element
            if ($_focused === this)
            {
                // Clear the currently focused element
                $_focused = null;

                return true;
            }

            return false;
        },
        'public virtual dispose': function()
        {
            this._$
                // Remove the reference from the element
                .removeData('__jTypes__');
        },
        'public abstract focus': function()
        {
            // If an element is currently focused and it is not this element
            if ($_focused && $_focused !== this.__self)
                $_focused
                    // Trigger the blur event on the currently focused element
                    .blur();

            // If the element is disabled, return false
            if (this.disabled)
                return false;

            // Set this element as the currently focused element
            $_focused = this.__self;

            return true;
        },
        'public virtual reset': function()
        {
            // If this element is the currently focused element, trigger the blur event on it
            if ($_focused === this.__self)
                this.blur();
        },
        
        'public abstract disabled':
        {
            'get': $$.empty(),
            'set': $$.empty()
        },
        'public abstract visible':
        {
            'get': $$.empty()
        }
    });

    // ########## INPUT ELEMENT ##########
    $_forms.InputElement = $$('abstract', $_forms.Element,
    {
        'public override blur': function()
        {
            // If the trigger function is not being called
            if (arguments.length)
                this._$
                    // Bind the blur event handler to the input element
                    .blur.apply(this._$, arguments);
            // Blur the input element
            else
                return this.__base();
        },
        'public change': function()
        {
            // If the trigger function is being called
            if (!arguments.length)
                this._$
                    // Trigger the change event handler on the input element
                    .triggerHandler('change');
            else
                this._$
                    // Trigger the change event handler on the input element
                    .change.apply(this._$, arguments);
        },
        'public override focus': function()
        {
            // If the trigger function is not being called, otherwise focus the element
            if (arguments.length)
                this._$
                    // Trigger the focus event handler on the input element
                    .focus.apply(this._$, arguments);
            else
                return this.__base();
        },

        'public override disabled':
        {
            'get': function()
            {
                // Return the disabled property of the input element
                return $_bool(this._$.prop('disabled'));
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $_bool($v);

                // If the input element is being disabled and this is the currently focused element
                if ($v && $_focused === this.__self)
                    this
                        // Trigger the blur event
                        .blur();

                this._$
                    // Set the disabled property on the input element
                    .prop('disabled', $v);
            }
        },
        'public override visible':
        {
            'get': $$.empty()
        }
    });

    // Define the forms namespace on the jTypes global variable
    $$.property($$, 'forms', { e: true, v: $_forms });
})(window, jQuery, jTypes);