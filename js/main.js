// USE ANGULAR

$(document).ready(function() {
	(function($) {
		var idx = 0;

		$('.quote').each(function() {
			var text = $(this).text().trim().split('');

			var spans = [];
			text.forEach(function(s) {
				var span = $('<span>').html(s);
				spans.push(span);
			});

			$(this).html(spans);
		});

		var initialize = function() {
			$('#intro').addClass('hide');
			setTimeout(function() {
				goto(idx);
			}, 500);
		}

		var goto = function() {

		}

		$(window).on('quotes-ready', initialize);
		// $(window).on('keyup', controlKey);
	})(jQuery);
});