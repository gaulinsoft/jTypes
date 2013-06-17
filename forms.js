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
    // ########## STRICT ##########

    // Enable strict mode
    'use strict';

    // ########## LANGUAGE ##########

    // Create the language prefix and arguments exception
    var $_lang_exception_arguments = '"{0}({1})" has some invalid arguments.';
    var $_lang_exception_prefix    = 'jTypes Error: ';

    // Create the language constants
    var $_lang_forms_element_jquery = 'A jQuery wrapper on 1 DOM element is required.';

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

    // ###########################
    // ########## FORMS ##########
    // ###########################

    // ########## GLOBALS ##########
    
    var $_document = $(window.document);
    var $_focused  = null;
    var $_forms    = {};
    var $_keypress = $$.now();
    var $_maximum  = 9007199254740992;
    var $_minimum  = -9007199254740992;
    var $_window   = $(window);

    // REMEMBER TO FIX THESE LEFTOVERS, BRO
    var $DOCUMENT_KEYPRESS_INTERVAL = 100;
    var $JQUERY_DATA_PREFIX         = '__jTypes__';
    var $TICKER_SCROLL_DURATION     = 150;

    // ########## HANDLERS ##########

    // Create the document event handlers
    var $_document_click   = function(e)
    {
        //
    };
    var $_document_keydown = function(e)
    {
        //
    };

    $_document
        // Bind the document click and keydown event handlers
        .click($_document_click)
        .keydown($_document_keydown);

    // ########## ELEMENT ##########
    $$.property($_forms, 'Element', { e: true, v: $$('abstract', function($element)
    {
        // If a single jQuery element was not provided, throw an exception
        if (!$element || !$element.jquery || $element.length !== 1)
            throw $_exceptionFormat($_lang_forms_element_jquery);

        $element
            // Set the jTypes instance in the element data
            .data($JQUERY_DATA_PREFIX, this.__self);
    },
    {
        'public abstract blur': function()
        {
            // If this element is the currently focused element
            if ($_focused === this.__self)
            {
                // Clear the currently focused element
                $_focused = null;

                return true;
            }

            return false;
        },
        'public abstract dispose': function($element)
        {
            $element
                // Remove the jTypes instance from the element data
                .removeData($JQUERY_DATA_PREFIX);
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

            return this;
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
    }) });

    // ########## INPUT ELEMENT ##########
    $$.property($_forms, 'InputElement', { e: true, v: $$('abstract', $_forms.Element,
    {
        'protected $_input': null,

        'public override blur': function()
        {
            // If the trigger function is being called, call the abstract base blur method
            if (!arguments.length)
                return this.__base.blur();
            
            this.$_input
                // Bind the blur event handler to the input element
                .blur.apply(this.$_input, arguments);

            return this;
        },
        'public change': function()
        {
            // If the trigger function is being called
            if (!arguments.length)
                this.$_input
                    // Trigger the change event handler on the input element
                    .triggerHandler('change');
            else
                this.$_input
                    // Bind the change event handler to the input element
                    .change.apply(this.$_input, arguments);

            return this;
        },
        'public override dispose': function()
        {
            // Call the abstract base dispose method on the input element
            this.__base.dispose(this.$_input);
        },
        'public override focus': function()
        {
            // If the trigger function is being called, focus the element
            if (!arguments.length)
                return this.__base.focus();
            
            this.$_input
                // Bind the focus event handler to the input element
                .focus.apply(this.$_input, arguments);

            return this;
        },

        'public override disabled':
        {
            'get': function()
            {
                // Return the disabled property of the input element
                return $$.asBool(this.$_input.prop('disabled'));
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asBool($v);

                // If the input element is being disabled and this is the currently focused element
                if ($v && $_focused === this.__self)
                    this
                        // Trigger the blur event
                        .blur();

                this.$_input
                    // Set the disabled property on the input element
                    .prop('disabled', $v);
            }
        },
        'public abstract override visible':
        {
            'get': $$.empty()
        }
    }) });

    // ---------- HANDLERS ----------
    var $_button_click      = function(e)
    {
        // Get the self reference
        var $this = e.data;

        // If an element is currently focused
        if ($_focused)
            $_focused
                // Trigger the blur event on the currently focused element
                .blur();

        // If the button is disabled, return
        if ($this.disabled)
            return;

        $this.$_input
            // Trigger the click event handler on the input element
            .triggerHandler('click');
    };
    var $_button_keydown    = function(e)
    {
        // Get the current timestamp
        var $now = $.utilities.now();

        // If the previous keypress was less than keypress interval, return false
        if ($now - $_keypress < $DOCUMENT_KEYPRESS_INTERVAL)
            return false;

        // Get the self reference
        var $this = e.data;

        switch (e.which)
        {
            // ENTER
            case 13:
            // SPACE
            case 32:
                // Set the previous keypress to the current timestamp
                $_keypress = $now;

                // Prevent the default behavior of the key
                e.preventDefault();

                $this
                    // Trigger the click event on the button
                    .click();

                return false;
        }
    };
    var $_button_mouseenter = function(e)
    {
        // Get the self reference
        var $this = e.data;

        // If the input element is disabled, return
        if ($this.disabled())
            return;

        $this._input
            // Trigger the mouseenter event handler on the input element
            .triggerHandler('mouseenter');
    };
    var $_button_mouseleave = function(e)
    {
        // Get the self reference
        var $this = e.data;

        // If the input element is disabled, return
        if ($this.disabled())
            return;

        $this._input
            // Trigger the mouseleave event handler on the input element
            .triggerHandler('mouseleave');
    };

    // ########## BUTTON ##########
    $$.property($_forms, 'Button', { e: true, v: $$($_forms.InputElement, function($element)
    {
        // Call the base constructor
        this.__base($element);

        // Create the button and icon
        this.$_button = $('<span class="button" />');
        this.$_icon   = $('<img />');

        // Get the class and style attributes of the input element
        var $class = $$.asString(this.$_input.attr('class'));
        var $style = $$.asString(this.$_input.attr('style'));

        // If the input element has a class attribute
        if ($class)
            this.$_button
                // Add the classes to the button
                .addClass($class);

        // If the input element has a style attribute
        if ($style)
            this.$_button
                // Add the styles to the button
                .attr('style', $style);

        // Get the disabled flag
        var $disabled = this.disabled;

        // If the button is disabled
        if ($disabled)
            this.$_button
                // Add the "disabled" class to the button
                .addClass('disabled');

        this.$_input
            // Hide the input element
            .hide()
            // Insert the button after it in the DOM
            .after
            (
                this.$_button
                    // Bind click, vmouseover, and vmouseout event handlers to the button
                    .click(this, $_button_click)
                    .bind('vmouseover', this, $_button_mouseenter)
                    .bind('vmouseout', this, $_button_mouseleave)
            );

        // Set the text of the button to the input element value
        this.text = this.$_input.val() || '';
    },
    {
        'protected $_button': null,
        'protected $_icon': null,

        'public override blur': function()
        {
            // If the trigger function is being called, otherwise bind the blur event handler to the input element
            if (!arguments.length)
            {
                // If the base blur method does not blur the button, return false
                if (!this.__base.blur())
                    return false;
                
                this._button
                    // Remove the "focused" class from the button
                    .removeClass('focused');

                $_document
                    // Unbind the document keydown event handler for focused buttons
                    .unbind('keydown', $_button_keydown);

                this._input
                    // Trigger the blur event handler on the input element
                    .triggerHandler('blur');

                return true;
            }
            else
                this.__base.blur.apply(this, arguments);

            return this;
        },
        'public click': function()
        {
            // If the trigger function is being called
            if (!arguments.length)
            {
                // If an element is currently focused and it is not this button
                if ($_focused && $_focused !== this.__self)
                    $_focused
                        // Trigger the blur event on the currently focused element
                        .blur();

                this.$_input
                    // Trigger the click event handler on the input element
                    .triggerHandler('click');
            }
            else
                this.$_input
                    // Bind the click event handler to the input element
                    .click.apply(this.$_input, arguments);

            return this;
        },
        'public override dispose': function()
        {
            // Call the base dispose method
            this.__base.dispose();

            this.$_button
                // Remove the button from the DOM
                .remove();

            this.$_input
                // Unbind the event handlers from the input element
                .unbind('click', $_button_click)
                .unbind('vmouseover', $_button_mouseenter)
                .unbind('vmouseout', $_button_mouseleave)
                // Show the input element
                .show();
        },
        'public override focus': function()
        {
            // If the trigger function is being called, otherwise bind the focus event handler to the input element
            if (!arguments.length)
            {
                // If the base focus method does not focus the button, return false
                if (!this.__base.focus())
                    return false;

                // Scroll the button into the window
                $$.utilities.scrollTo(this.$_button);

                this.$_button
                    // Add the "focused" class to the button
                    .addClass('focused');

                $_document
                    // Bind the document keydown event handler for focused buttons
                    .keydown(this, $_button_keydown);

                this.$_input
                    // Trigger the focus event handler on the input element
                    .triggerHandler('focus');

                return true;
            }
            else
                this.__base.focus.apply(this, arguments);

            return this;
        },
        'public mouseenter': function()
        {
            // If the trigger function is being called
            if (!arguments.length)
                this.$_input
                    // Trigger the mouseenter event handler on the input element
                    .triggerHandler('mouseenter');
            else
                this.$_input
                    // Bind the mouseenter event handler to the input element
                    .mouseenter.apply(this.$_input, arguments);

            return this;
        },
        'public mouseleave': function()
        {
            // If the trigger function is being called
            if (!arguments.length)
                this.$_input
                    // Trigger the mouseleave event handler on the input element
                    .triggerHandler('mouseleave');
            else
                this.$_input
                    // Bind the mouseleave event handler to the input element
                    .mouseleave.apply(this.$_input, arguments);

            return this;
        },
        'public override reset': function()
        {
            // Blur this button if it is currently focused
            this.__base.reset();
                
            this.$_button
                // Remove the "error" class from the button
                .removeClass('error');

            // Reset the button text
            this.text = this.$_input.prop('defaultValue') || '';
        },

        'public override disabled':
        {
            'set': function($v)
            {
                // Get the disabled flag
                var $disabled = this.__base.disabled;

                // If the button is being disabled
                if ($disabled)
                    this.$_button
                        // Add the "disabled" class to the button
                        .addClass('disabled');
                else
                    this.$_button
                        // Remove the "disabled" class from the button
                        .removeClass('disabled');

                // Return the disabled flag
                return $disabled;
            }
        },
        'public virtual icon':
        {
            'get': function()
            {
                // Return the input element source attribute
                return $$.asString(this.$_input.attr('src'));
            },
            'set': function($v)
            {
                // Get the icon argument
                var $icon = $$.asString($v);

                // If an icon argument was provided
                if ($icon)
                {
                    this.$_input
                        // Set the input element source attribute
                        .attr('src', $icon);
                    
                    this.$_button
                        // Insert the icon into the button
                        .prepend
                        (
                            this.$_icon
                                // Set the icon source attribute
                                .attr('src', $icon)
                        );
                }
                else
                {
                    this.$_input
                        // Remove the input element source attribute
                        .removeAttr('src');

                    this.$_icon
                        // Detach the icon from the DOM
                        .detach()
                        // Remove its source attribute
                        .removeAttr('src');
                }

                // Return the icon property
                return $icon;
            }
        },
        'public virtual text':
        {
            'get': function()
            {
                // Return the input element value
                return $$.asString(this.$_input.val());
            },
            'set': function($v)
            {
                // Get the button icon and text argument
                var $icon = this.icon;
                var $text = $$.asString($v);

                this.$_input
                    // Set the input element value
                    .val($text);

                this.$_button
                    // Set the button text
                    .text($text);
                
                // If the button has an icon
                if ($icon)
                {
                    this.$_icon
                        // Set the icon source attribute
                        .attr('src', $icon);

                    this.$_button
                        // Insert the icon into the button
                        .prepend(this.$_icon);
                }

                // Return the text property
                return $text;
            }
        },
        'public override visible':
        {
            'get': function()
            {
                // Return true if the button is not hidden
                return !this.$_button.is(':hidden');
            }
        }
    }) });

    // ---------- HANDLERS ----------
    var $_forms_textbox_blur      = function(e)
    {
        // Get the private instance reference
        var $this = e.data;

        // If the textbox is the currently focused element, clear the currently focused element
        if ($_focused === $this.__self)
            $_focused = null;

        $this.$_textbox
            // Remove the "focused" and "multiline" classes from the textbox
            .removeClass('focused multiline');

        // If the input element has the "floating" class
        if ($this.$_input.hasClass('floating'))
            $this.$_input
                // Remove the "focused" class from the input element
                .removeClass('focused');

        // ########## VALIDATE ##########
                
        // If the browser does not support placeholder text
        if (!$$.compatibility.placeholder)
        {
            // If the input element has no value
            if (!$this.$_input.val())
            {
                // Get the placeholder text
                var $placeholder = $$.asString($this.$_input.attr('placeholder'));

                // If a placeholder text attribute exists
                if ($placeholder)
                    $this.$_input
                        // Add the "placeholder" class to the input element
                        .addClass('placeholder')
                        // Set its value to the placeholder text
                        .val($placeholder);
            }
        }
    };
    var $_forms_textbox_click     = function(e)
    {
        // Get the private instance reference
        var $this = e.data;

        // If an element is currently focused and it is not the textbox
        if ($_focused && $_focused !== $this.__self)
            $_focused
                // Trigger the blur event on the currently focused element
                .blur();

        // If the textbox is disabled, return
        if ($this.disabled)
            return;

        // If the textbox is not the currently focused element
        if ($_focused !== $this.__self)
            $this.$_input
                // Trigger the focus event on the input element
                .focus();

        return false;
    };
    var $_forms_textbox_focus     = function(e)
    {
        // Get the private instance reference
        var $this = e.data;

        // If an element is currently focused and it is not the textbox
        if ($_focused && $_focused !== $this.__self)
            $_focused
                // Trigger the blur event on the currently focused element
                .blur();

        // Set the textbox as the currently focused element
        $_focused = $this.__self;

        $this.$_textbox
            // Add the "focused" class to the textbox
            .addClass('focused');

        // If the input element has the "floating" class
        if ($this.$_input.hasClass('floating'))
            $this.$_input
                // Add the "focused" class to the input element
                .addClass('focused');

        // If the browser does not support placeholder text
        if (!$$.compatibility.placeholder)
        {
            // If the input element has the "placeholder" class
            if ($this.$_input.hasClass('placeholder'))
                $this.$_input
                    // Remove the "placeholder" class from the input element
                    .removeClass('placeholder')
                    // Reset its value
                    .val('');
        }
    };
    var $_forms_textbox_keydown   = function(e)
    {
        // If the enter key was pressed
        if (e.which == 13)
        {
            // Prevent the default behavior of the key
            e.preventDefault();

            // Get the private instance reference
            var $this = e.data;

            $this.$_textbox
                // Find the closest "form" parent element in the DOM
                .closest('form')
                    // Find the input elements of type submit and the input elements with the "data-submit" attribute
                    .find('input[type="submit"], input[data-submit]')
                        // Convert the input elements to a buttons collection
                        .jT_filterButtons()
                        // Take the first submit button
                        .first()
                            // Trigger the click event on the submit button
                            .click();

            return false;
        }
    };
    var $_forms_textbox_mousedown = function(e)
    {
        // Get the private instance reference
        var $this = e.data;

        // If the textbox is the currently focused element, return false
        if ($_focused === $this.__self)
            return false;
    };

    // ########## TEXTBOX ##########
    $$.property($_forms, 'Textbox', { e: true, v: $$($_forms.InputElement, function($element)
    {
        // Call the base constructor
        this.__base($element);

        // Create the textbox and wrapper
        this.$_textbox = $('<span class="input" />');
        this.$_wrapper = $('<span class="fwrapper textbox" />');
            
        // Get the class and style attributes of the input element
        var $class = $$.asString(this.$_input.attr('class'));
        var $style = $$.asString(this.$_input.attr('style'));

        // If the input element has a class attribute
        if ($class)
            this.$_wrapper
                // Store the class data
                .data($JQUERY_DATA_PREFIX + 'class', $class)
                // Add the classes to the wrapper
                .addClass($class);

        // If the input element has a style attribute
        if ($style)
            this.$_wrapper
                // Store the style data
                .data($JQUERY_DATA_PREFIX + 'style', $style)
                // Add the styles to the wrapper
                .attr('style', $style);
        
        this.$_wrapper
            // Insert the textbox into the wrapper
            .append
            (
                this.$_textbox
                    // Bind click and vmousedown event handlers to the textbox
                    .bind('click', this, $_textbox_click)
                    .bind('vmousedown', this, $_textbox_mousedown)
                    // Wrap the input element with the textbox in the DOM
                    .append
                    (
                        this.$_input
                            // Insert the wrapper after the input element in the DOM
                            .after(this.$_wrapper)
                            // Detach it from the DOM
                            .detach()
                            // Remove the class and style attributes from it
                            .removeAttr('class')
                            .removeAttr('style')
                            // Bind blur, focus, and keydown event handlers to it
                            .bind('blur', this, $_textbox_blur)
                            .bind('focus', this, $_textbox_focus)
                            .bind('keydown', this, $_textbox_keydown)
                    )
            );

        // If the browser does not support placeholder text
        if (!$$.compatibility.placeholder)
        {
            // If the input element has no value
            if (!this.$_input.val())
            {
                // Get the placeholder text
                var $placeholder = $$.asString(this.$_input.attr('placeholder'));

                // If a placeholder text attribute exists
                if ($placeholder)
                    this.$_input
                        // Add the "placeholder" class to the input element
                        .addClass('placeholder')
                        // Set its value to the placeholder text
                        .val($placeholder);
            }
        }
    },
    {
        // ---------- FIELDS ----------
        'protected $_textbox': null,
        'protected $_wrapper': null,

        // ---------- METHODS ----------
        'public override blur': function()
        {
            // If the trigger function is being called
            if (!arguments.length)
            {
                // If the base blur method does not blur the textbox, return false
                if (!this.__base.blur())
                    return false;
                
                this.$_input
                    // Trigger the blur event on the input element
                    .blur();

                return true;
            }
            // Bind the blur event handler to the input element
            else
                this.__base.blur.apply(this, arguments);

            return this;
        },
        'public override dispose': function()
        {
            // Call the base dispose method
            this.__base.dispose();

            // Get the class and style data
            var $class = this.$_wrapper.data($JQUERY_DATA_PREFIX + 'class');
            var $style = this.$_wrapper.data($JQUERY_DATA_PREFIX + 'style');

            // If the textbox has historical class data
            if ($class)
                this.$_input
                    // Set the class attribute on the input element
                    .attr('class', $class);
            else
                this.$_input
                    // Remove the class attribute from the input element
                    .removeAttr('class');

            // If the textbox has historical style data
            if ($style)
                this.$_input
                    // Set the style attribute on the input element
                    .attr('style', $style);
            else
                this.$_input
                    // Remove the style attribute from the input element
                    .removeAttr('style');

            this.$_wrapper
                // Insert the input element before the wrapper in the DOM
                .before
                (
                    this.$_input
                        // Detach the input element from the DOM
                        .detach()
                        // Unbind the event handlers from the input element
                        .unbind('blur', $_forms_textbox_blur)
                        .unbind('focus', $_forms_textbox_focus)
                        .unbind('keydown', $_forms_textbox_keydown)
                )
                // Remove the wrapper from the DOM
                .remove();
        },
        'public override focus': function()
        {
            // If the trigger function is being called
            if (!arguments.length)
            {
                // If the base focus method does not focus the textbox, return false
                if (!this.__base.focus())
                    return this;

                // Scroll the textbox into the window
                $$.utilities.scrollTo(this.$_wrapper);

                this.$_input
                    // Trigger the focus event on the input element
                    .focus();
            }
            else
                // Bind the focus event handler to the input element
                this.__base.focus.apply(this, arguments);

            return this;
        },
        'public override reset': function()
        {
            // Call the base reset method
            this.__base.reset();

            this.$_textbox
                // Remove the "error" class from the textbox
                .removeClass('error');

            // Reset the value to the default value of the input element
            this.value = this.$_input.prop('defaultValue');

            return this;
        },
        
        // ---------- PROPERTIES ----------
        'public override disabled':
        {
            'set': function($v)
            {
                // Set the base disabled property
                this.__base.disabled = $v;

                // If the textbox is being disabled
                if ($v)
                    this.$_textbox
                        // Add the "disabled" class to the textbox
                        .addClass('disabled');
                else
                    this.$_textbox
                        // Remove the "disabled" class from the textbox
                        .removeClass('disabled');
            }
        },
        'public placeholder':
        {
            'get': function()
            {
                // Return the input element placeholder attribute
                return $$.asString(this.$_input.attr('placeholder'));
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asString($v);

                // If a placeholder value was provided
                if ($v)
                    this.$_input
                        // Set the placeholder attribute of the input element
                        .attr('placeholder', $v);
                else
                    this.$_input
                        // Remove the placeholder attribute from the input element
                        .removeAttr('placeholder');

                // If the browser does not support placeholder text and the textbox has the "placeholder" class
                if (!$$.compatibility.placeholder && this.$_textbox.hasClass('placeholder'))
                    this.$_input
                        // Set the input element value to the placeholder text
                        .val($v);
            }
        },
        'public virtual value':
        {
            'get': function()
            {
                // If the browser does not support placeholder text and the textbox has the "placeholder" class, return an empty string
                if (!$$.compatibility.placeholder && this.$_textbox.hasClass('placeholder'))
                    return '';

                // Return the input element value
                return $$.asString(this.$_input.val());
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asString($v);

                this.$_input
                    // Set the input element value
                    .val($v);

                // If the browser does not support placeholder text
                if (!$$.compatibility.placeholder)
                {
                    // If an empty string was set as the input element value
                    if (!$v)
                    {
                        this.$_input
                            // Set the input element value to the placeholder text
                            .val($$.asString(this.$_input.attr('placeholder')));

                        this.$_textbox
                            // Add the "placeholder" class to the textbox
                            .addClass('placeholder')
                    }
                    else
                        this.$_textbox
                            // Remove the "placeholder" class from the textbox
                            .removeClass('placeholder');
                }
            }
        },
        'public override visible':
        {
            'get': function()
            {
                // Return true if the textbox is not hidden
                return !this.$_textbox.is(':hidden');
            }
        }
    }) });

    // Define the forms namespace on the jTypes global variable
    $_defineField('forms', $_forms);
})(window, window.jQuery, window.jTypes);