/*
 * jQuery Filter Plugin 1.0
 * www.sam-benne.co.uk
 * Copyright 2012, Sam Bennett
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

;(function($){
	var settings = null;
	var methods = {
		init: function(options) {
			settings = $.extend( {
				animationspeed: 250,
				id: 'filter',
				onCreate: null,
				onDestroy: null,
				onStop: null
			}, options);
			return this.each(function(e){
				methods.create();
			});
		},
		destroy: function() {
			if(typeof settings.onDestroy === "function") settings.onDestroy.call();
		},
		create: function() {
			$(document).on('click', '#' + settings.id + ' [data-tag]', function(e) {
				e.preventDefault();
				var tag = $(this).data('tag');
				var regex = new RegExp(tag, "i")
				$('[data-tags]').each(function(k, v) {
					if($(v).data('tags').match(regex) === null) $(v).fadeOut(settings.animationspeed);
					else $(v).fadeIn(settings.animationspeed);
				});
			});
			if(typeof settings.onCreate === "function") settings.onCreate.call();
		},
		stop: function() {
			if(typeof settings.onStop === "function") settings.onStop.call();
		},
		update: function(content) {
		}
	};

	$.fn.filter = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +	method + ' does not exist on jQuery.filter');
		}
	};
})(jQuery);