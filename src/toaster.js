//= require jquery
(function ($) {

	/**
	 *	config:
	 *		wait: int //specifies the time to wait
	 *
	 */
	var Toaster = function (config) {
		"use strict";

		var el = this,
			classes = ['error','success','warn'],
			classStr,
			timer,
			config = config||{},
			show = function (msg, callback) {
				if (el.is(':visible')) {
					clearTimeout(timer);
					el.hide();
				}
				el.removeClass(classStr);
				el[0].innerHTML = '<p>' + msg + '</p>';
				el.slideDown('slow',function () {
					timer = setTimeout( function () {
						el.slideUp('slow', callback||function () {});
					}, config.wait||3000);
				});
			},
			error = function (msg, callback) {
				show(msg, callback);
				el.addClass(classes[0]);
			},
			success = function (msg, callback) {
				show(msg, callback);
				el.addClass(classes[1]);
			},
			warn = function (msg, callback) {
				show(msg, callback);
				el.addClass(classes[2]);
			},
			me = this,
			retval = null;

		me.exists = (el.length>0);
		if(el.length>0) {
			$.each(classes, function () {
				classStr += this + ' ';
			});
			me.success = success;
			me.error = error;
			me.warn = warn;
		}
		retval = (el.length>0) ? me : null;
		$.toaster = retval;
		return retval;
	};
	
	$.fn.toaster = Toaster;
})(jQuery);