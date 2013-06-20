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
    var $_lang_forms_element_jquery = 'An `Element` requires one DOM element in a jQuery wrapper.';

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

    // ###########################
    // ########## FORMS ##########
    // ###########################

    // ########## GLOBALS ##########
    
    var $_document = $($__document__);
    var $_focused  = null;
    var $_forms    = {};
    var $_keypress = 0;
    var $_tabSort  = function($former, $latter)
    {
        // FORMAT $former
        // FORMAT $latter
        $former = $($former).first();
        $latter = $($latter).first();

        // Get the tab-indices of the elements
        var $formerIndex = $$.asInt($former.attr('tabindex'));
        var $latterIndex = $$.asInt($latter.attr('tabindex'));

        // If the former index is not finite, set the it as the maximum integer
        if (!isFinite($formerIndex))
            $formerIndex = $$.settings.MAX_INT;

        // If the latter index is not finite, set the it as the maximum integer
        if (!isFinite($latterIndex))
            $latterIndex = $$.settings.MAX_INT;

        // If the tab-indices are not equal, return the difference of the tab-indices
        if ($formerIndex !== $latterIndex)
            return $formerIndex - $latterIndex;

        // Check if the first element is before the second element
        var $isBefore = $former.add($latter).index($former) === 0;

        // If the first element is before the second element, return negative one
        if ($isBefore)
            return -1;

        // Return one
        return 1;
    };
    var $_window   = $(window);

    // ########## HANDLERS ##########

    // Create the document event handlers
    var $_document_click   = function(e)
    {
        // If an element is currently focused
        if ($_focused)
            $_focused
                // Cast the focused element as an element
                .as($_forms.Element)
                // Trigger the blur event on the currently focused element
                .blur();
    };
    var $_document_keydown = function(e)
    {
        // Get the current timestamp
        var $now = $$.now();

        // If the previous keypress was less than keypress interval, return false
        if ($now - $_keypress < $$.settings.DOCUMENT_KEYPRESS_INTERVAL)
            return;

        // Set the previous keypress to the current timestamp
        $_keypress = $now;

        switch (e.which)
        {
            // TAB
            case 9:
                // Get the array of elements
                var $data     = [];
                var $elements = $$.asArray($('input, select, textarea').toArray());

                // If there are no elements in the array, return
                if (!$elements.length)
                    return;

                // Sort the elements by tab-index
                $elements.sort($_tabSort);

                for (var i = 0, j = $elements.length; i < j; i++)
                {
                    // Get the current element and its self reference data
                    var $element = $($elements[i]);
                    var $this    = $element.data($$.settings.JQUERY_DATA_PREFIX);

                    // If no self reference data was found, the element is not visible, or it is disabled
                    if (!$this || !$this.visible || $this.disabled)
                    {
                        // Clear the current element in the elements array
                        $elements[i] = null;

                        continue;
                    }

                    // Get the tab-index of the current element
                    var $index = $$.asInt($element.attr('tabindex'));

                    // If the tab-index of the current element is not finite or is less than zero
                    if (!isFinite($index) || $index < 0)
                    {
                        // Clear the current element in the elements array
                        $elements[i] = null;

                        continue;
                    }

                    // Add the current reference data to the data array
                    $data.push($this);
                }

                // If the data array contains no references, break
                if (!$data.length)
                    break;

                // Prevent the default behavior of the key
                e.preventDefault();

                // Find the index of the currently focused element in the data array
                var $index = $.inArray($_focused, $data);

                // If the currently focused element was not found or the shift key was not depressed and after incrementing the index it is not outside the collection of elements, set the index to the first element
                if ($index === -1 || !e.shiftKey && ++$index === $data.length)
                    $index = 0;
                // If the shift key was depressed, decrement the index
                else if (e.shiftKey)
                    $index--;

                // Trigger the focus event on the element
                $data[$index].as($_forms.Element).focus();

                return;
            // ESCAPE
            case 27:
                // If an element is currently focused
                if ($_focused)
                {
                    // Prevent the default behavior of the key
                    e.preventDefault();

                    $_focused
                        // Cast the focused element as an element
                        .as($_forms.Element)
                        // Trigger the blur event on the currently focused element
                        .blur();

                    return false;
                }

                break;
        }
    };

    $_document
        // Bind the document click and keydown event handlers
        .bind('click', $_document_click)
        .bind('keydown', $_document_keydown);

    // ########## ELEMENT ##########
    $$.property($_forms, 'Element', { e: true, v: $$('abstract', function($element)
    {
        // If a single jQuery element was not provided, throw an exception
        if (!$element || !$element.jquery || $element.length == 0 || !($element instanceof $))
            throw $_exceptionFormat($_lang_forms_element_jquery);

        // Set the element
        this.$_element = $element
            // Get the first element
            .first()
            // Set the jTypes instance in the element data
            .data($$.settings.JQUERY_DATA_PREFIX, this.__self);
    },
    {
        // ---------- FIELDS ----------
        'protected $_element': null,

        // ---------- METHODS ----------
        'public virtual bind': function()
        {
            this.$_element
                // Bind the event handler to the element
                .bind.apply(this.$_element, arguments);

            return this;
        },
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
            this.$_element
                // Remove the jTypes instance from the element data
                .removeData($$.settings.JQUERY_DATA_PREFIX);
        },
        'public abstract focus': function()
        {
            // If an element is currently focused and it is not this element
            if ($_focused && $_focused !== this.__self)
                $_focused
                    // Cast the focused element as an element
                    .as($_forms.Element)
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
        'public virtual trigger': function()
        {
            this.$_element
                // Trigger the event handler on the element
                .triggerHandler.apply(this.$_element, arguments);

            return this;
        },
        'public virtual unbind': function()
        {
            this.$_element
                // Unbind the event handler from the element
                .unbind.apply(this.$_element, arguments);

            return this;
        },
        
        // ---------- PROPERTIES ----------
        'public virtual disabled':
        {
            'get': function()
            {
                // Return the disabled property of the element
                return $$.asBool(this.$_element.prop('disabled'));
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asBool($v);

                // If the element is being disabled and is the currently focused element
                if ($v && $_focused === this.__self)
                    this
                        // Trigger the blur event
                        .blur();

                this.$_element
                    // Set the disabled property on the element
                    .prop('disabled', $v);
            }
        },
        'public abstract visible':
        {
            'get': $$.empty()
        }
    }) });

    // ---------- HANDLERS ----------
    var $_forms_button_click      = function(e)
    {
        // Get the self reference
        var $this = e.data;

        // If an element is currently focused and it is not this button
        if ($_focused && $_focused !== this.__self)
            $_focused
                // Cast the focused element as an element
                .as($_forms.Element)
                // Trigger the blur event on the currently focused element
                .blur();

        // If the button is disabled, return
        if ($this.disabled)
            return;

        $this.$_element
            // Trigger the click event handler on the input element
            .triggerHandler('click');
    };
    var $_forms_button_keydown    = function(e)
    {
        // Get the current timestamp
        var $now = $$.now();

        // If the previous keypress was less than keypress interval, return false
        if ($now - $_keypress < $$.settings.DOCUMENT_KEYPRESS_INTERVAL)
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

                $this.$_element
                    // Trigger the click event handler on the input element
                    .triggerHandler('click');

                return false;
        }
    };
    var $_forms_button_mouseenter = function(e)
    {
        // Get the self reference
        var $this = e.data;

        // If the input element is disabled, return
        if ($this.disabled())
            return;

        $this.$_element
            // Trigger the mouseenter event handler on the input element
            .triggerHandler('mouseenter');
    };
    var $_forms_button_mouseleave = function(e)
    {
        // Get the self reference
        var $this = e.data;

        // If the input element is disabled, return
        if ($this.disabled())
            return;

        $this.$_element
            // Trigger the mouseleave event handler on the input element
            .triggerHandler('mouseleave');
    };

    // ########## BUTTON ##########
    $$.property($_forms, 'Button', { e: true, v: $$($_forms.Element, function($element, $isImage)
    {
        // Call the base constructor
        this.__base($element);

        // Store the image flag
        this._img = $$.asBool($isImage);

        // Create the button and icon
        this.$_button = $('<span class="button" />');
        this.$_icon   = $($isImage ? '<img />' : '<span />');

        // Get the class and style attributes of the input element
        var $class = $$.asString(this.$_element.attr('class'));
        var $style = $$.asString(this.$_element.attr('style'));

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

        this.$_element
            // Hide the input element
            .hide()
            // Insert the button after it in the DOM
            .after
            (
                this.$_button
                    // Bind click, vmouseover, and vmouseout event handlers to the button
                    .bind('click', this, $_forms_button_click)
                    .bind('vmouseover', this, $_forms_button_mouseenter)
                    .bind('vmouseout', this, $_forms_button_mouseleave)
            );

        // Set the text of the button to the input element value
        this.text = this.$_element.val() || '';
    },
    {
        'protected $_button': null,
        'protected $_icon': null,
        'private _img': false,

        'public override blur': function()
        {
            // If the base blur method does not blur the button, return
            if (!this.__base.blur())
                return this;
                
            this.$_button
                // Remove the "focused" class from the button
                .removeClass('focused');

            $_document
                // Unbind the document keydown event handler for focused buttons
                .unbind('keydown', $_forms_button_keydown);

            this.$_element
                // Trigger the blur event handler on the input element
                .triggerHandler('blur');

            return this;
        },
        'public override dispose': function()
        {
            // Call the base dispose method
            this.__base.dispose();

            this.$_button
                // Remove the button from the DOM
                .remove();

            this.$_element
                // Unbind the event handlers from the input element
                .unbind('click', $_forms_button_click)
                .unbind('vmouseover', $_forms_button_mouseenter)
                .unbind('vmouseout', $_forms_button_mouseleave)
                // Show the input element
                .show();
        },
        'public override focus': function()
        {
            // If the base focus method does not focus the button, return
            if (!this.__base.focus())
                return this;

            // Scroll the button into the window
            $$.scrollTo(this.$_button);

            this.$_button
                // Add the "focused" class to the button
                .addClass('focused');

            $_document
                // Bind the document keydown event handler for focused buttons
                .keydown(this, $_forms_button_keydown);

            this.$_element
                // Trigger the focus event handler on the input element
                .triggerHandler('focus');

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
            this.text = this.$_element.prop('defaultValue') || '';
        },

        'public override disabled':
        {
            'set': function($v)
            {
                // Set the base disabled property
                this.__base.disabled = $v;

                // If the button is being disabled
                if ($v)
                    this.$_button
                        // Add the "disabled" class to the button
                        .addClass('disabled');
                else
                    this.$_button
                        // Remove the "disabled" class from the button
                        .removeClass('disabled');
            }
        },
        'public virtual icon':
        {
            'get': function()
            {
                // If the icon is not an image, return the icon HTML
                if (!this._img)
                    return $$.asString(this.$_icon.html());

                // Return the input element source attribute
                return $$.asString(this.$_element.attr('src'));
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asString($v);

                // If an icon argument was provided
                if ($v)
                {
                    // If the icon is an image
                    if (this._img)
                    {
                        this.$_element
                            // Set the input element source attribute
                            .attr('src', $v);

                        this.$_icon
                            // Set the icon source attribute
                            .attr('src', $v);
                    }
                    else
                        this.$_icon
                            // Set the icon HTML
                            .html($v);
                    
                    this.$_button
                        // Insert the icon into the button
                        .prepend(this.$_icon);
                }
                else
                {
                    // If the icon is an image
                    if (this._img)
                        this.$_element
                            // Remove the input element source attribute
                            .removeAttr('src');

                    this.$_icon
                        // Detach the icon from the DOM
                        .detach();
                }
            }
        },
        'public virtual text':
        {
            'get': function()
            {
                // Return the input element value
                return $$.asString(this.$_element.val());
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asString($v);

                this.$_element
                    // Set the input element value
                    .val($v);

                this.$_button
                    // Set the button text
                    .text($v);
                
                // If the button has an icon
                if (this.icon)
                    this.$_button
                        // Insert the icon into the button
                        .prepend(this.$_icon);
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
        if ($this.$_element.hasClass('floating'))
            $this.$_element
                // Remove the "focused" class from the input element
                .removeClass('focused');

        // ########## VALIDATE ##########
                
        // If the browser does not support placeholder text
        if (!$$.compatibility.placeholder)
        {
            // If the input element has no value
            if (!$this.$_element.val())
            {
                // Get the placeholder text
                var $placeholder = $$.asString($this.$_element.attr('placeholder'));

                // If a placeholder text attribute exists
                if ($placeholder)
                    $this.$_element
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
                // Cast the focused element as an element
                .as($_forms.Element)
                // Trigger the blur event on the currently focused element
                .blur();

        // If the textbox is disabled, return
        if ($this.disabled)
            return;

        // If the textbox is not the currently focused element
        if ($_focused !== $this.__self)
            $this.$_element
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
                // Cast the focused element as an element
                .as($_forms.Element)
                // Trigger the blur event on the currently focused element
                .blur();

        // Set the textbox as the currently focused element
        $_focused = $this.__self;

        $this.$_textbox
            // Add the "focused" class to the textbox
            .addClass('focused');

        // If the input element has the "floating" class
        if ($this.$_element.hasClass('floating'))
            $this.$_element
                // Add the "focused" class to the input element
                .addClass('focused');

        // If the browser does not support placeholder text
        if (!$$.compatibility.placeholder)
        {
            // If the input element has the "placeholder" class
            if ($this.$_element.hasClass('placeholder'))
                $this.$_element
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
    $$.property($_forms, 'Textbox', { e: true, v: $$($_forms.Element, function($element)
    {
        // Call the base constructor
        this.__base($element);

        // Create the textbox and wrapper
        this.$_textbox = $('<span class="input" />');
        this.$_wrapper = $('<span class="fwrapper textbox" />');
            
        // Get the class and style attributes of the input element
        var $class = $$.asString(this.$_element.attr('class'));
        var $style = $$.asString(this.$_element.attr('style'));

        // If the input element has a class attribute
        if ($class)
            this.$_wrapper
                // Store the class data
                .data($$.settings.JQUERY_DATA_PREFIX + 'class', $class)
                // Add the classes to the wrapper
                .addClass($class);

        // If the input element has a style attribute
        if ($style)
            this.$_wrapper
                // Store the style data
                .data($$.settings.JQUERY_DATA_PREFIX + 'style', $style)
                // Add the styles to the wrapper
                .attr('style', $style);
        
        this.$_wrapper
            // Insert the textbox into the wrapper
            .append
            (
                this.$_textbox
                    // Bind click and vmousedown event handlers to the textbox
                    .bind('click', this, $_forms_textbox_click)
                    .bind('vmousedown', this, $_forms_textbox_mousedown)
                    // Wrap the input element with the textbox in the DOM
                    .append
                    (
                        this.$_element
                            // Insert the wrapper after the input element in the DOM
                            .after(this.$_wrapper)
                            // Detach it from the DOM
                            .detach()
                            // Remove the class and style attributes from it
                            .removeAttr('class')
                            .removeAttr('style')
                            // Bind blur, focus, and keydown event handlers to it
                            .bind('blur', this, $_forms_textbox_blur)
                            .bind('focus', this, $_forms_textbox_focus)
                            .bind('keydown', this, $_forms_textbox_keydown)
                    )
            );

        // If the browser does not support placeholder text
        if (!$$.compatibility.placeholder)
        {
            // If the input element has no value
            if (!this.$_element.val())
            {
                // Get the placeholder text
                var $placeholder = $$.asString(this.$_element.attr('placeholder'));

                // If a placeholder text attribute exists
                if ($placeholder)
                    this.$_element
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
            // If the base blur method does not blur the textbox, return
            if (!this.__base.blur())
                return this;
                
            this.$_element
                // Trigger the blur event on the input element
                .blur();

            return this;
        },
        'public override dispose': function()
        {
            // Call the base dispose method
            this.__base.dispose();

            // Get the class and style data
            var $class = this.$_wrapper.data($$.settings.JQUERY_DATA_PREFIX + 'class');
            var $style = this.$_wrapper.data($$.settings.JQUERY_DATA_PREFIX + 'style');

            // If the textbox has historical class data
            if ($class)
                this.$_element
                    // Set the class attribute on the input element
                    .attr('class', $class);
            else
                this.$_element
                    // Remove the class attribute from the input element
                    .removeAttr('class');

            // If the textbox has historical style data
            if ($style)
                this.$_element
                    // Set the style attribute on the input element
                    .attr('style', $style);
            else
                this.$_element
                    // Remove the style attribute from the input element
                    .removeAttr('style');

            this.$_wrapper
                // Insert the input element before the wrapper in the DOM
                .before
                (
                    this.$_element
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
            // If the base focus method does not focus the textbox, return
            if (!this.__base.focus())
                return this;

            // Scroll the textbox into the window
            $$.scrollTo(this.$_wrapper);

            this.$_element
                // Trigger the focus event on the input element
                .focus();

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
            this.value = this.$_element.prop('defaultValue');

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
                return $$.asString(this.$_element.attr('placeholder'));
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asString($v);

                // If a placeholder value was provided
                if ($v)
                    this.$_element
                        // Set the placeholder attribute of the input element
                        .attr('placeholder', $v);
                else
                    this.$_element
                        // Remove the placeholder attribute from the input element
                        .removeAttr('placeholder');

                // If the browser does not support placeholder text and the textbox has the "placeholder" class
                if (!$$.compatibility.placeholder && this.$_textbox.hasClass('placeholder'))
                    this.$_element
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
                return $$.asString(this.$_element.val());
            },
            'set': function($v)
            {
                // FORMAT $v
                $v = $$.asString($v);

                this.$_element
                    // Set the input element value
                    .val($v);

                // If the browser does not support placeholder text
                if (!$$.compatibility.placeholder)
                {
                    // If an empty string was set as the input element value
                    if (!$v)
                    {
                        this.$_element
                            // Set the input element value to the placeholder text
                            .val($$.asString(this.$_element.attr('placeholder')));

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
})(window, window['jQuery'], jTypes);