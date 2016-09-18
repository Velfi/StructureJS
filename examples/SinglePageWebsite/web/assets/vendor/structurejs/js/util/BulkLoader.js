var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../event/EventDispatcher', '../event/LoaderEvent', '../event/BulkLoaderEvent', '../model/Collection'], factory);
    }
})(function (require, exports) {
    var EventDispatcher = require('../event/EventDispatcher');
    var LoaderEvent = require('../event/LoaderEvent');
    var BulkLoaderEvent = require('../event/BulkLoaderEvent');
    var Collection = require('../model/Collection');
    /**
     * TODO: YUIDoc_comment
     *
     * @class BulkLoader
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule util
     * @requires Extend
     * @requires LoaderEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var BulkLoader = (function (_super) {
        __extends(BulkLoader, _super);
        function BulkLoader() {
            _super.call(this);
            this._dataStores = null;
            this._totalComplete = 0;
            this._dataStores = new Collection();
        }
        /**
         * TODO: YUIDoc_comment
         *
         * @method addFile
         * @param dataStore {IDataStore}
         * @param key {string}
         * @public
         */
        BulkLoader.prototype.addFile = function (dataStore, key) {
            if (key === void 0) { key = null; }
            if (key === null) {
                key = String(dataStore.sjsId);
            }
            var model = {
                key: key,
                value: dataStore
            };
            this._dataStores.add(model);
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method getFile
         * @param key {string}
         * @public
         */
        BulkLoader.prototype.getFile = function (key) {
            var model = this._dataStores.findBy({ key: key })[0];
            return model.value;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method getImage
         * @param key {string}
         * @return {Image}
         * @public
         */
        BulkLoader.prototype.getImage = function (key) {
            var imageLoader = this.getFile(key);
            return (imageLoader !== null) ? imageLoader.data : null;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method start
         * @public
         */
        BulkLoader.prototype.start = function () {
            var dataStore;
            for (var i_1 = 0; i_1 < this._dataStores.length; i_1++) {
                dataStore = this._dataStores.get(i_1).value;
                dataStore.addEventListenerOnce(LoaderEvent.COMPLETE, this._onLoadComplete, this);
                dataStore.load();
            }
            return this;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method clear
         * @public
         */
        BulkLoader.prototype.clear = function () {
            var dataStore;
            for (var i_2 = 0; i_2 < this._dataStores.length; i_2++) {
                dataStore = this._dataStores.get(i_2).value;
                dataStore.removeEventListener(LoaderEvent.COMPLETE, this._onLoadComplete, this);
            }
            this._totalComplete = 0;
            this._dataStores = new Collection();
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _onLoadComplete
         * @param event {LoaderEvent}
         * @protected
         */
        BulkLoader.prototype._onLoadComplete = function (event) {
            var dataStore = event.target;
            this._totalComplete++;
            var bulkLoaderEvent = new BulkLoaderEvent(BulkLoaderEvent.COMPLETE);
            bulkLoaderEvent.total = this._dataStores.length;
            bulkLoaderEvent.totalComplete = this._totalComplete;
            bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
            bulkLoaderEvent.data = dataStore;
            // Dispatch the IDataStore that was just completed.
            this.dispatchEvent(bulkLoaderEvent);
            // Loop through and check if all IDataStore have been loaded.
            for (var i_3 = 0; i_3 < this._dataStores.length; i_3++) {
                dataStore = this._dataStores.get(i_3).value;
                if (dataStore.complete === false) {
                    return;
                }
            }
            var model;
            var dataStoreList = [];
            for (var i_4 = 0; i_4 < this._dataStores.length; i_4++) {
                model = this._dataStores.get(i_4);
                dataStoreList.push(model.value);
            }
            // Add the whole list because all are completed.
            bulkLoaderEvent = new BulkLoaderEvent(BulkLoaderEvent.LOAD_COMPLETE);
            bulkLoaderEvent.total = this._dataStores.length;
            bulkLoaderEvent.totalComplete = this._totalComplete;
            bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
            bulkLoaderEvent.data = dataStoreList;
            // Only dispatch when all the IDataStore are load complete.
            this.dispatchEvent(bulkLoaderEvent);
        };
        return BulkLoader;
    })(EventDispatcher);
    return BulkLoader;
});