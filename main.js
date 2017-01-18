webpackJsonp([0,1],[
/* 0 */
/***/ (function(module, exports) {

var global = window;
if (typeof global.console !== 'undefined' && typeof global.console.log !== 'undefined') {
    global.console.log('Crafted and created by Netural. Visit www.netural.com');
    global.console.log('Crafted and powered by Storyblok. Visit www.Storyblok.com');
}
else {
    global.console = {};
    global.console.log = global.console.error = function () { };
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var controllers = __webpack_require__(3);
/**
 * Import's all Controllers which are exported in the Controllers.ts
 * so we can initialize all Types of Controller easier.
 *
 * This function also allows us to execute the initialization of
 * Controllers only for a part type of the DOM - let's say a
 * newly generated and added DOM Component. So we won't have to
 * reinitialize all Components - only the Components which are
 * inside that newly created HTMLElement.
 *
 * @export
 * @param {HTMLElement} [element] DOM Element in which the Controller should be initialized - if not set we're using the document.body;
 */
function parse(element) {
    var controllerClasses = controllers;
    if (!element) {
        element = document.body;
    }
    for (var key in controllerClasses) {
        if (controllerClasses.hasOwnProperty(key)) {
            var controllerClass = controllerClasses[key];
            if (typeof controllerClass.parse === 'function') {
                controllerClass.parse('', element);
            }
        }
    }
}
exports.parse = parse;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Controller_1 = __webpack_require__(4);
var AppController = (function (_super) {
    __extends(AppController, _super);
    function AppController(element) {
        return _super.call(this, element) || this;
    }
    return AppController;
}(Controller_1.Controller));
AppController.selector = '.root';
exports.AppController = AppController;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AppController_1 = __webpack_require__(2);
exports.AppController = AppController_1.AppController;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Generic controller class to entcapsulate the parsing
 * and other generic stuff
 *
 * @export
 * @class Controller
 */
var Controller = (function () {
    /**
     * Creates an instance of a Controller.
     *
     * @param {Element} root The element where the controller has been applied
     */
    function Controller(element) {
        this._element = element;
    }
    Controller.prototype.$ = function (selector) {
        if (!(this._element instanceof Element)) {
            throw new Error('This controller has no element!');
        }
        return selector ? this._element.querySelectorAll(selector) : this._element;
    };
    /**
     * Looks for all Controllers which are instance of a certain class.
     *
     * @param {Function} klass should be instance of class
     * @returns {Array<Controller>} instances found
     */
    Controller.prototype.getControllersByClass = function (klass) {
        var instances = Controller._instances;
        var result = [];
        for (var i = 0, max = instances.length; i < max; i++) {
            var instance = instances[i];
            if (instance instanceof klass) {
                result.push(instance);
            }
        }
        return result;
    };
    Controller.prototype.getControllerById = function (id) {
        return Controller.getControllerById.apply(this, arguments);
    };
    /**
     * Returns binded instance of Controller from element 'element'
     * if they are instances of 'klass'
     *
     * @param {HTMLElement} element haystack
     * @param {Function} klass needle
     * @returns {Controller} instance of Controller
     */
    Controller.prototype.getControllerByElementAndClass = function (element, klass) {
        var instances = Controller._instances;
        for (var i = 0, max = instances.length; i < max; i++) {
            var instance = instances[i];
            if (instance instanceof klass && instance._element === element) {
                return instance;
            }
        }
        return null;
    };
    /**
     * Returns all Controllers which are binded to the element
     *
     * @param {HTMLElement} element haystack
     * @returns {Array<Controller>} instances of Controller
     */
    Controller.prototype.getControllersByElement = function (element) {
        return Controller.getControllersByElement.apply(this, arguments);
    };
    /**
     * Returns all Controllers which are nested in current Element.
     *
     * @returns {Array<Controller>} instances of Controller
     */
    Controller.prototype.getNestedControllers = function () {
        var controllers = [];
        var elementsWithControllers = this.$("[" + Controller.PARSE_ID_ATTRIBUTE + "]");
        for (var i = 0, max = elementsWithControllers.length; i < max; i++) {
            controllers = controllers.concat(this.getControllersByElement(elementsWithControllers[i]));
        }
        return controllers;
    };
    /**
     * Returns all Controllers which are binded to the element
     *
     * @param {HTMLElement} element haystack
     * @returns {Array<Controller>} instances of Controller
     */
    Controller.getControllersByElement = function (element) {
        var controllerIdsString = element.getAttribute(Controller.PARSE_ID_ATTRIBUTE);
        var instances = [];
        if (controllerIdsString && controllerIdsString.length) {
            var controllerIds = controllerIdsString.trim().split(' ');
            var instanceFound = false;
            for (var j = 0, max = controllerIds.length; j < max; j++) {
                var controller = Controller.getControllerById(controllerIds[j]);
                if (controller instanceof Controller) {
                    instances.push(controller);
                }
            }
        }
        return instances;
    };
    Controller.getControllerById = function (id) {
        var instances = Controller._instances;
        var _id = id + '';
        for (var i = 0, max = instances.length; i < max; i++) {
            var instance = instances[i];
            if (instance._id === parseInt(_id, 10)) {
                return instance;
            }
        }
        return null;
    };
    /**
     * Hook for running code before the controller is instantiated
     *
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller will be applied
     */
    Controller.beforeInstantiating = function (elements) { };
    /**
     * Hook for running code after the controller has been instantiated.
     *
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller has been applied
     * @param {Array<Controller>} instances List of controller instances created
     */
    Controller.afterInstantiating = function (elements, instances) { };
    /**
     * Look for elements with a specific selector and creates an instance for
     * every element.
     *
     * @static
     * @param {string} selector Dom selector
     * @param {Element} [root=document.body] Starting element for parsing
     */
    Controller.parse = function (selector, root) {
        if (root === void 0) { root = document.body; }
        if (typeof this.selector === 'string' && this.selector.length) {
            selector = this.selector;
        }
        else if (!selector) {
            throw new Error('No Selector for Controller found!');
        }
        var elements = root.querySelectorAll(selector);
        this.beforeInstantiating(elements);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var controllerIdsString = element.getAttribute(Controller.PARSE_ID_ATTRIBUTE);
            var id = Math.floor(Math.random() * 10 + 1) * Date.now();
            if (controllerIdsString && controllerIdsString.length) {
                var controllerIds = controllerIdsString.trim().split(' ');
                var instanceFound = false;
                for (var j = 0, max = controllerIds.length; j < max; j++) {
                    var controller = Controller.getControllerById(controllerIds[j]);
                    if (controller instanceof this) {
                        instanceFound = true;
                        break;
                    }
                }
                if (instanceFound) {
                    continue;
                }
            }
            else {
                controllerIdsString = '';
            }
            element.setAttribute(Controller.PARSE_ID_ATTRIBUTE, (controllerIdsString + ' ' + id).trim());
            var instance = new this(element);
            instance._id = id;
            Controller._instances.push(instance);
        }
        this.afterInstantiating(elements, Controller._instances);
    };
    return Controller;
}());
/**
 * Instances of the Controller
 *
 * @static
 * @type {Array<Controller>}
 */
Controller._instances = [];
/**
 * HTML attribute to mark elements which are already parsed
 *
 * @static
 */
Controller.PARSE_ID_ATTRIBUTE = 'data-parse-ids';
exports.Controller = Controller;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(0);
var Runtime_1 = __webpack_require__(1);
Runtime_1.parse();


/***/ })
],[5]);