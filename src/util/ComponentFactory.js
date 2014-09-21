define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    /**
     * A helper class to create multiple instances of the same Component Class.
     *
     * @class ComponentFactory
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ComponentFactory = (function () {

        function ComponentFactory() {
        }

        /**
         * Takes in one or more jQuery objects and creates a component for each one.
         *
         * @method create
         * @param $element {jQuery} One or more jQuery referenced DOM elements.
         * @param ComponentClass {DOMElement} The class that you want instantiated.
         * @param scope {Object} The base DOMElement needs a scope (parent object) to instantiate the component/view.
         * @return {Array.<DOMElement>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
         * @public
         * @static
         */
        ComponentFactory.create = function ($elements, ComponentClass, scope) {
            var list = [];
            var length = $elements.length;

            for (var i = 0; i < length; i++) {
                var component = new ComponentClass($elements.eq(i));
                scope.addChild(component);
                list.push(component);
            }

            return list;
        };
        return ComponentFactory;
    })();

    module.exports = ComponentFactory;

});