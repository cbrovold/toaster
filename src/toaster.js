//= require jquery

var Toaster = function (query) {

	var el = $(query),
		classes = ['error','success'],
		show = function (msg, callback) {
			cb = callback || function () { };
			el.removeClass(classes[0] + ' ' + classes[1]);
			el[0].innerHTML = '<p>' + msg + '</p>';
			el.slideDown('slow',function () {
				el.slideUp('slow', function () {
					cb();
				});
			}).delay(3000);
		},
		error = function (msg, callback) {
			show(msg, callback);
			el.addClass(classes[0]);
		},
		success = function (msg, callback) {
			show(msg, callback);
			el.addClass(classes[1]);
		},
		me = this;

	me.exists = (el.length>0);
	if(el.length>0) {
		me.success = success;
		me.error = error;
	}
	return (el.length>0) ? me : null;
};