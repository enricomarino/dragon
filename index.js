/* !
 * dragon
 * HTML5 Drag and Drop component
 *
 * @author Enrico Marino and Federico Spini
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
 */

/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Expose `Dragon`.
 */

module.exports = Dragon;

/**
 * Initialize a draggable element
 * on the given `el`.
 *
 * Emits:
 *
 *   - `dragstart` on drag start
 *   - `dragenter` on drag enter
 *   - `dragover` on drag over
 *   - `dragleave` on drag leave
 *   - `drop` on drop
 *
 * @param {Element} el
 * @api public
 */

function Dragon(el) {
  if (!(this instanceof Draggable)) return new Draggable(el);
  Emitter.call(this);
  this.el = el;
  el.draggable = true;
  el.addEventListener('dragstart', this.ondragstart.bind(this), false);
  el.addEventListener('dragenter', this.ondragenter.bind(this), false);
  el.addEventListener('dragover', this.ondragover.bind(this), false);
  el.addEventListener('dragleave', this.ondragleave.bind(this), false);
  el.addEventListener('drop', this.ondrop.bind(this), false);
}

/**
 * Mixin emitter.
 */

Emitter(Dragon.prototype);

/**
 * Dragenter handler.
 */

Dragon.prototype.ondragstart = function(event){
  event.dataTransfer.setData('Text', this.el.id);
  event.dataTransfer.effectAllowed = 'move';
  this.emit('dragstart', event);
};

/**
 * Dragenter handler.
 */

Dragon.prototype.ondragenter = function(event){
  event.preventDefault();
  this.emit('dragenter', event);
};

/**
 * Dragover handler.
 */

Dragon.prototype.ondragover = function(event){
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  this.emit('dragover', event);
};

/**
 * Dragleave handler.
 */

Dragon.prototype.ondragleave = function(event){
  event.preventDefault();
  this.emit('dragleave', event);
};

/**
 * Drop handler.
 */

Dragon.prototype.ondrop = function(event){
  event.preventDefault();
  this.emit('drop', event);
};
