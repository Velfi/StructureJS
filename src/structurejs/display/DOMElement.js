define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var jQuery = require('structurejs/plugin/jquery.eventListener');
    var Extend = require('structurejs/util/Extend');
    var DisplayObjectContainer = require('structurejs/display/DisplayObjectContainer');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var TemplateFactory = require('structurejs/util/TemplateFactory');
    var ComponentFactory = require('structurejs/util/ComponentFactory');

    /**
     * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
     *
     * @class DOMElement
     * @param type [any=null] Either a jQuery object or template you want to use the as the view. Check out the examples below.
     * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
     * @extends DisplayObjectContainer
     * @module StructureJS
     * @submodule view
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @example
     // Example of using DOMElement with out extending it.
     var aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
     this.addChild(aLink);

     * @example
     // Example of a view passing in a jQuery object.
     var view = new CustomView($('.selector');
     this.addChild(view);

     // Example of a view extending DOMElement when passing in a jQuery object.
     var Extend = require('structurejs/util/Extend');
     var DOMElement = require('structurejs/display/DOMElement');

     var ClassName = (function () {

    var _super = Extend(ClassName, DOMElement);

    function ClassName($element) {
    _super.call(this, $element);
    }

    ClassName.prototype.createChildren = function () {
    _super.prototype.createChildren.call(this);

    // Create and add your child objects to this parent class.
    }

    ClassName.prototype.layoutChildren = function () {
    // Layout or update the child objects in this parent class.

    return this;
    }

    ClassName.prototype.enable = function () {
    if (this.isEnabled === true) return this;

    // Enable the child objects and add any event listeners.

    return _super.prototype.enable.call(this);
    }

    ClassName.prototype.disable = function () {
    if (this.isEnabled === false) return this;

    // Disable the child objects and remove any event listeners.

    return _super.prototype.disable.call(this);
    }

    ClassName.prototype.destroy = function () {
    _super.prototype.destroy.call(this);

    // Destroy the child objects and references in this parent class to prevent memory leaks.
    }

    return ClassName;
    })();
     * @example
     // Example of a view extending DOMElement with template passed into createChildren.
     var view:CustomView = new CustomView();
     this.addChild(view);

     // Example of a view extending DOMElement when passing in a jQuery object.
     var Extend = require('structurejs/util/Extend');
     var DOMElement = require('structurejs/display/DOMElement');
     var HomeTemplate = require('hbs!templates/home/homeTemplate');

     var ClassName = (function () {

    var _super = Extend(ClassName, DOMElement);

    function ClassName() {
    _super.call(this);
    }

    ClassName.prototype.createChildren = function () {
    _super.prototype.createChildren.call(this, HomeTemplate, {data: 'some data'});

    // Create and add your child objects to this parent class.
    }

    ClassName.prototype.layoutChildren = function () {
    // Layout or update the child objects in this parent class.

    return this;
    }

    ClassName.prototype.enable = function () {
    if (this.isEnabled === true) return this;

    // Enable the child objects and add any event listeners.

    return _super.prototype.enable.call(this);
    }

    ClassName.prototype.disable = function () {
    if (this.isEnabled === false) return this;

    // Disable the child objects and remove any event listeners.

    return _super.prototype.disable.call(this);
    }

    ClassName.prototype.destroy = function () {
    _super.prototype.destroy.call(this);

    // Destroy the child objects and references in this parent class to prevent memory leaks.
    }

    return ClassName;
    })();
     **/
    var DOMElement = (function () {

        var _super = Extend(DOMElement, DisplayObjectContainer);

        function DOMElement(type, params) {
            if (typeof type === "undefined") { type = null; }
            if (typeof params === "undefined") { params = null; }
            _super.call(this);
            /**
             * Whether or not the display object is visible. Display objects that are not visible are disabled.
             * For example, if visible=false for an InteractiveObject instance, it cannot be clicked.
             *
             * @property _isVisible
             * @type {boolean}
             * @default true
             * @private
             */
            this._isVisible = true;
            /**
             * YUIDoc_comment
             *
             * @property checkCount
             * @type {number}
             * @public
             */
            this.checkCount = 0;
            /**
             * A cached of the DOM Element.
             *
             * @property element
             * @type {HTMLElement}
             * @default null
             */
            this.element = null;
            /**
             * A cached jQuery object for the view's element.
             *
             * @property $element
             * @type {JQuery}
             * @default null
             */
            this.$element = null;
            /**
             * If a jQuery object was passed into the constructor this will be set as true and
             * this class will not try add the view to the DOM because it should already exists.
             *
             * @property _isReference
             * @type {boolean}
             * @private
             */
            this._isReference = false;
            /**
             * Holds onto the value passed into the constructor.
             *
             * @property _type
             * @type {string}
             * @default null
             */
            this._type = null;
            /**
             * Holds onto the value passed into the constructor.
             *
             * @property _params
             * @type {any}
             * @default null
             */
            this._params = null;

            if (type instanceof jQuery) {
                this.$element = type;
                this._isReference = true;
            } else if (type) {
                this._type = type;
                this._params = params;
            }
        }
        /**
         * The createChildren function is intended to provide a consistent place for the creation and adding
         * of children to the view. It will automatically be called the first time that the view is added
         * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
         * their overridden methods.
         *
         * This method gets called only once when the child view is added to another view. If the child view is removed and added to another view the createChildren method will not be called again.
         * @example
         // EXAMPLE 1: By default your view class will be a div element:
         ClassName.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._childInstance = new DOMElement();
        this.addChild(this._childInstance);
        }

         // EXAMPLE 2: But lets say you wanted the view to be a ul element your would do:
         ClassName.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, 'ul');
        }

         // Then you could nest other elements inside this base view/element.
         ClassName.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, 'ul', {id: 'myId', 'class': 'myClass anotherClass'});

        var li = new DOMElement('li', {text: 'Robert is cool'});
        this.addChild(li);
        }

         // EXAMPLE 3: So that's cool but what if you wanted a block of html to be your view. Let's say you had the below inline Handlebar template in your html file.
         <script id="todoTemplate" type="text/template">
         <div id="htmlTemplatel" class="js-todo">
         <div id="input-wrapper">
         <input type="text" class="list-input" placeholder="{{ data.text }}">
         <input type="button" class="list-item-submit" value="Add">
         </div>
         </div>
         </script>

         // You would just pass in the id or class selector of the template which in this case is "#todoTemplate". There is a second optional argument where you can pass data for the Handlebar template to use.
         ClassName.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, '#todoTemplate', { data: this.viewData });

        }

         // EXAMPLE 4: One more way. Let's say you wanted to use th Handlebar pluign within RequireJS. You can pass the template into createChildren.
         var HomeTemplate = require('hbs!templates/HomeTemplate');

         ClassName.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, HomeTemplate, {data: "some data"});

        }
         * @method createChildren
         * @param type [string=div] The HTML tag you want to create or the id/class selector of the template or the pre-compiled path to a template.
         * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
         * @returns {DOMElement} Returns an instance of itself.
         * @public
         * @chainable
         */
        DOMElement.prototype.createChildren = function (type, params) {
            if (typeof type === "undefined") { type = 'div'; }
            if (typeof params === "undefined") { params = null; }
            // Use the data passed into the constructor first else use the arguments from createChildren.
            type = this._type || type;
            params = this._params || params;

            if (this.$element == null) {
                var html = TemplateFactory.createTemplate(type, params);
                if (html) {
                    this.$element = jQuery(html);
                } else {
                    this.$element = jQuery("<" + type + "/>", params);
                }
            }

            this.element = this.$element[0];

            return this;
        };

        /**
         * @overridden DisplayObjectContainer.addChild
         * @example
         container.addChild(domElementInstance);
         * @method addChild
         * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
         * @returns {DOMElement} Returns an instance of itself.
         * @chainable
         */
        DOMElement.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);

            if (this.$element == null) {
                throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
            }

            if (child.isCreated === false) {
                child.createChildren(); // Render the item before adding to the DOM
                child.isCreated = true;
            }

            this.addClientSideId(child);

            // If the child object is not a reference of a jQuery object in the DOM then append it.
            if (child._isReference === false) {
                this.$element.append(child.$element);
            }

            child.enable();
            this.onAddedToDom(child);

            return this;
        };

        /**
         * Adds the cid to the DOM element so we can know what what Class object the element belongs too.
         *
         * @method addClientSideId
         * @param child {DOMElement} The DOMElement instance to add the cid too.
         * @private
         */
        DOMElement.prototype.addClientSideId = function (child) {
            // TODO: Calling the getChild method there is a chance that multiple DOMElement have reference to the same DOM HTML element causing the cid to be over written with a new cid. Probably should handle that.
            child.$element.attr('data-cid', child.cid);
        };

        /**
         * Gets called when the child object is added to the DOM.
         * The method will call {{#crossLink "DOMElement/layoutChildren:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED event.
         *
         * @method onDomAdded
         * @private
         */
        DOMElement.prototype.onAddedToDom = function (child) {
            var _this = this;
            child.checkCount++;
            if (child.$element.width() == 0 && child.checkCount < 5) {
                setTimeout(function () {
                    _this.onAddedToDom(child);
                }, 100);
            } else {
                child.layoutChildren();
                child.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
            }
        };

        /**
         * @overridden DisplayObjectContainer.addChildAt
         */
        DOMElement.prototype.addChildAt = function (child, index) {
            var children = this.$element.children();
            var length = children.length;

            // If the index passed in is less than 0 and greater than
            // the total number of children then place the item at the end.
            if (index < 0 || index >= length) {
                this.addChild(child);
            } else {
                if (child.isCreated === false) {
                    child.createChildren(); // Render the item before adding to the DOM
                    child.isCreated = true;
                }

                this.addClientSideId(child);

                // Adds the child at a specific index but also will remove the child from another parent object if one exists.
                _super.prototype.addChildAt.call(this, child, index);

                // Adds the child before the a child already in the DOM.
                jQuery(children.get(index)).before(child.$element);

                child.enable();
                this.onAddedToDom(child);
            }

            return this;
        };

        /**
         * @overridden DisplayObjectContainer.swapChildren
         */
        DOMElement.prototype.swapChildren = function (child1, child2) {
            var child1Index = child1.$element.index();
            var child2Index = child2.$element.index();

            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);

            return this;
        };

        /**
         * @overridden DisplayObjectContainer.getChildAt
         */
        DOMElement.prototype.getChildAt = function (index) {
            return _super.prototype.getChildAt.call(this, index);
        };

        /**
         * Returns a DOMElement object with the first found DOM element by the passed in selector.
         *
         * @method getChild
         * @param selector {string} DOM id name, DOM class name or a DOM tag name.
         * @returns {DOMElement}
         * @public
         */
        DOMElement.prototype.getChild = function (selector) {
            // Get the first match from the selector passed in.
            var jQueryElement = this.$element.find(selector).first();
            if (jQueryElement.length == 0) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
            }

            // Check to see if there the element already has a cid value and is a child of this parent object.
            var cid = jQueryElement.data('cid');
            var domElement = this.getChildByCid(cid);

            // Creates a DOMElement from the jQueryElement.
            if (domElement == null) {
                // Create a new DOMElement and assign the jQuery element to it.
                domElement = new DOMElement();
                domElement.$element = jQueryElement;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = jQueryElement[0];
                domElement.isCreated = true;

                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                _super.prototype.addChild.call(this, domElement);
            }

            return domElement;
        };

        /**
         * Gets all the HTML elements children of this object.
         *
         * @method getChildren
         * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children this parent element.
         * @returns {Array} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
         * If the 'data-cid' property exists is on an HTML element a DOMElement will not be create for that element because it will be assumed it already exists as a DOMElement.
         * @public
         */
        DOMElement.prototype.getChildren = function (selector) {
            if (typeof selector === "undefined") { selector = ''; }
            //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
            var $child;
            var domElement;
            var $list = this.$element.children(selector);

            var listLength = $list.length;
            for (var i = 0; i < listLength; i++) {
                $child = jQuery($list[i]);

                // If the jQuery element already has cid data property then must be an existing DisplayObjectContainer (DOMElement) in the children array.
                if (!$child.data('cid')) {
                    domElement = new DOMElement();
                    domElement.$element = $child;
                    domElement.$element.attr('data-cid', domElement.cid);
                    domElement.element = $child.get(0);
                    domElement.isCreated = true;

                    // Added to the super addChild method because we don't need to append the element to the DOM.
                    // At this point it already exists and we are just getting a reference to the DOM element.
                    _super.prototype.addChild.call(this, domElement);
                }
            }

            return this.children;
        };

        /**
         * Removes the specified child object instance from the child list of the parent object instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DOMElement} The DisplayObjectContainer instance to remove.
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChild = function (child) {
            child.$element.unbind();
            child.$element.remove();

            _super.prototype.removeChild.call(this, child);

            return this;
        };

        /**
         * Removes all child object instances from the child list of the parent object instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if no other
         * references to the children exist.
         *
         * @method removeChildren
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChildren = function () {
            _super.prototype.removeChildren.call(this);

            this.$element.empty();

            return this;
        };

        /**
         * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent)
         * to 1 (fully opaque). The default value is 1. Display objects with alpha set to 0 are active, even though
         * they are invisible.
         *
         * @method alpha
         * @param number
         * @returns {DOMElement} Returns an instance of itself.
         * @chainable
         */
        DOMElement.prototype.alpha = function (number) {
            this.$element.css('opacity', number);
            return this;
        };

        /**
         *
         * @method visible
         * @param value
         * @returns {any}
         */
        DOMElement.prototype.visible = function (value) {
            if (value == false) {
                this._isVisible = false;
                this.$element.hide();
            } else if (value == true) {
                this._isVisible = true;
                this.$element.show();
            } else if (value == undefined) {
                return this._isVisible;
            }
            return this;
        };

        /**
         * @overridden DisplayObjectContainer.destroy
         */
        DOMElement.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            // If the addChild method is never called before the destroyed the $element will be null and cause an TypeError.
            if (this.$element != null) {
                this.$element.unbind();
                this.$element.remove();
            }

            this.$element = null;
            this.element = null;
        };

        /**
         * YUIDoc_comment
         *
         * @method createComponents
         * @public
         */
        DOMElement.prototype.createComponents = function (componentList) {
            var length = componentList.length;
            var obj;
            for (var i = 0; i < length; i++) {
                obj = componentList[i];
                ComponentFactory.create(this.$element.find(obj.selector), obj.componentClass, this);
            }
        };
        return DOMElement;
    })();

    module.exports = DOMElement;

});
