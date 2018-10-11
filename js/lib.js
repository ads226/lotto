Array.prototype.random = function() {
	return this[Math.floor(this.length * Math.random())];
}

Array.prototype.max = function() {
	return this.reduce(function(prev, cur) {
		return Math.max(prev, cur);
	});
}

Array.prototype.min = function() {
	return this.reduce(function(prev, cur) {
		return Math.min(prev, cur);
	});
}


function UI_Extention(element, wrap) {
	var isOpened = (element.innerHTML === "+") ? 0 : 1,
		wrap = wrap || element.parentElement.parentElement;
	
	element.onclick = function(e) {
		isOpened = (isOpened + 1) % 2;
		element.innerHTML = (isOpened) ? "-" : "+";
		
		this.open(isOpened, wrap);
		
	}.bind(this);
	
	this.open(isOpened, wrap);
	
	wrap.style.overflow = "hidden";
	wrap.style.transitionDuration = "0.2s";
}

UI_Extention.prototype.open = function(value, target) {
	target.style.height = (value) ? target.scrollHeight + "px" : "50px";
}



function createLottoDataAll() {
	var i = 0,
		res = new Array(8145060);
	
	for (var a = 1; a <= 40; ++ a) {

		for (var b = a + 1; b <= 41; ++ b) {

			for (var c = b + 1; c <= 42; ++ c) {

				for (var d = c + 1; d <= 43; ++ d) {

					for (var e = d + 1; e <= 44; ++ e) {

						for (var f = e + 1; f <= 45; ++ f) {
							res[i] = [a, b, c, d, e, f];
							i++;
						}
					}
				}
			}
		}
	}
	
	return res;
}