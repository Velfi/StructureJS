import BaseEvent from './BaseEvent';
/**
 * The LocalStorageEvent ....
 * Note: the event only dispatches in other browser windows and does not show up in the window where you made a change to the local storage.
 *
 * @class LocalStorageEvent
 * @extends BaseEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
 * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param nativeEvent {StorageEvent} The native browser event for localStorage.
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires BaseEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
declare class LocalStorageEvent extends BaseEvent {
    /**
     * The storage event is fired on a Document's Window object when a storage area changes.
     *
     * @event STORAGE
     * @type {string}
     * @static
     */
    static STORAGE: string;
    /**
     * TODO: YUIDoc_comment
     *
     * @property originalEvent
     * @type {any}
     * @public
     */
    originalEvent: any;
    /**
     * The named key that was added, removed, or modified
     *
     * @event key
     * @type {string}
     */
    key: string;
    /**
     * The previous value (now overwritten), or null if a new item was added
     *
     * @event oldValue
     * @type {string}
     */
    oldValue: string;
    /**
     * The new value, or null if an item was removed
     *
     * @event newValue
     * @type {string}
     */
    newValue: string;
    /**
     * The page which called a method that triggered this change
     *
     * @event key
     * @type {string}
     */
    url: string;
    constructor(type: string, bubbles: boolean, cancelable: boolean, nativeEvent: StorageEvent);
}
export default LocalStorageEvent;
