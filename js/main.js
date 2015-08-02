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

		if ( count === maxCount ) {
			$(window).trigger('quotes-ready');
		}
	});

};

$(document).ready(function() {
	(function($) {
		this.idx = 0;
		var self = this;
		var $quotes = $('#content > li');

		splitQuotes();

		var activate = function() {
			$('body').css('opacity', '1');
			$('#intro').addClass('active');
		};

		var controlKeyup = function(e) {
			$('#intro').removeClass('active').addClass('hide');

			if ( isFinished() ) {
				complete();
				self.complete = true;
				return false;
			}

			goto(self.idx);

			var char = getChar(e);

			activateChar(char);
		};

		var goto = function(i) {
			$quotes.removeClass('active');
			$('.next').removeClass('active');
			$quotes.filter('.complete').addClass('hide');

			if ( $($quotes.filter('.complete')[0]).hasClass('last') ) {

				$('.next').removeClass('active');
				setTimeout(function() {
					self.over = true;
					$('#intro').html('The End.').removeClass('hide').addClass('active');
					$('.next').removeClass('active');
					return;
				}, 1000);

			} else if ( $quotes.filter('.complete')[0] ) {

				$quotes.removeClass('complete');
				self.complete = false;
				setTimeout(function() {
					$('.next').removeClass('active');
					$('#intro').removeClass('hide').addClass('active');
				}, 1000);

			}

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

			if ( p > .3 ) {
				return true;
			} else {
				return false;
			}
		};

		var complete = function() {
			var $activeQuote = $quotes.filter('.active').addClass('complete');

			setTimeout(function() {
				// activate all the letters
				$activeQuote.find('span').addClass('active');

				setTimeout(function() {
					// activate the citation
					$activeQuote.find('.cite').addClass('active');

					// activate the next triangle
					setTimeout(function() {
						$('.next').addClass('active');
					}, 1000);

				}, 1800);

			}, 1000);
		}

		$(window).on('quotes-ready', activate());
		$(window).on('keyup.window', function(e) {
			if ( self.over || self.complete ) { return; }
			controlKeyup(e);
		});
		$('.next').on('click', function(e) {
			if ( !$(this).hasClass('active') ) { return; }
			goto(self.idx + 1);
			self.idx += 1;
		});
	})(jQuery);
});