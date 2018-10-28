'use strict';

/**
 * @class
 * @classdesc Minimalistic event emitter
 */
function EventEmitter() {}

/**
 * @param {String} event
 * @param {Function} fn Handler function
 */
EventEmitter.prototype.addEventListener = function(event, fn) {
  var eventMap = this.__events = this.__events || {};
  var handlerList = eventMap[event] = eventMap[event] || [];
  if (handlerList.indexOf(fn) < 0) {
    handlerList.push(fn);
  }
};

/**
 * @param {String} event
 * @param {Function} fn Handler function
 */
EventEmitter.prototype.removeEventListener = function(event, fn) {
  var eventMap = this.__events = this.__events || {};
  var handlerList = eventMap[event];
  if (handlerList) {
    var index = handlerList.indexOf(fn);
    if (index >= 0) {
      handlerList.splice(index, 1);
    }
  }
};

/**
 * Emit an event
 */
EventEmitter.prototype.emit = function(event, other_args) {
  var eventMap = this.__events = this.__events || {};
  var handlerList = eventMap[event];
  var args = Array.prototype.slice.call(arguments, 1);
  if (handlerList) {
    for (var i = 0; i < handlerList.length; i++) {
      var fn = handlerList[i];
      fn.apply(this, args);
    }
  }
};

/**
 * Mixes in {@link EventEmitter} into a constructor function
 */
function eventEmitter(ctor) {
  for (var prop in EventEmitter.prototype) {
    if (EventEmitter.prototype.hasOwnProperty(prop)) {
      ctor.prototype[prop] = EventEmitter.prototype[prop];
    }
  }
}

module.exports = eventEmitter;
