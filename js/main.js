var splitQuotes = function() {
	var count = 0;
	var maxCount = $('.quote').length;

	$('.quote').each(function() {
		var text = $(this).text().trim().split('');

		var spans = [];
		text.forEach(function(s) {
			var span = $('<span>').html(s);
			spans.push(span);
		});

		$(this).html(spans);
		count++

		console.log(count)
		console.log(maxCount)
		if ( count === maxCount ) {
			$(window).trigger('quotes-ready');
		}
	});

};

$(document).ready(function() {
	(function($) {
		var idx = 0;
		var $quotes = $('.quote');

		splitQuotes();

		var activate = function() {
			$('#intro').addClass('active');
		};

		var controlKeyup = function(e) {
			$('#intro').removeClass('active').addClass('hide');

			if ( isFinished() ) {
				complete();
				return false;
			}

			goto(idx);

			var char = getChar(e);

			activateChar(char);
		};

		var goto = function(i) {
			$quotes.removeClass('active');
			$($quotes[i]).addClass('active');
		};

		var getChar = function(e) {
			return String.fromCharCode(e.keyCode).toLowerCase();
		};

		var activateChar = function(char) {
			var $activeQuote = $quotes.filter('.active');

			$activeQuote.find('span').filter(function() {
				return $(this).text().trim().toLowerCase() === char;
			}).addClass('active');
		};

		var isFinished = function() {
			var $activeQuote = $quotes.filter('.active');
			var activated = $activeQuote.find('span').filter('.active').length;
			var length = $activeQuote.find('span').length;

			var p = activated/length;

			console.log(p)

			if ( p > .3 ) {
				return true;
			} else {
				return false;
			}
		};

		var complete = function() {
			var $activeQuote = $quotes.filter('.active');


			setTimeout(function() {
				$activeQuote.find('span').addClass('active');
				setTimeout(function() {
					$activeQuote.parent().find('.cite').addClass('active');
				}, 1000);
			}, 1000);
		}

		$(window).on('quotes-ready', activate());
		$(window).on('keyup.window', function(e) {
			controlKeyup(e);
		});
	})(jQuery);
});