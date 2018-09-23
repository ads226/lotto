const ELEMENT_TYPE = {
	DIV:"DIV",
	P:"P",
	TABLE:"TABLE",
	THEAD:"THEAD",
	TBODY:"TBODY",
	TFOOT:"TFOOT",
	TR:"TR",
	TD:"TD",
	INPUT:"INPUT"
}

function createElement(el_type, el_class, el_value) {
	var element = document.createElement(el_type);
	
	if (el_class === undefined) return element;
	
	if (Array.isArray(el_class)) {
		var i = 0,
			len = el_class.length;
		
		for (; i < len; ++ i) {
			element.classList.add(el_class[i]);
		}
	} else if (typeof(el_class) === "string") {
		element.classList.add(el_class);
	}
	
	if (el_value === undefined) return element;
	
	if (typeof(el_value) === "object") {
		element.appendChild(el_value);
	} else {
		element.innerHTML = el_value;
	}
	
	return element;
}

Array.prototype.sum = function() {
	var res = 0,
		i = 0,
		len = this.length;
	
	for (; i < len; ++ i) res += this[i];
	
	return res;
}

Array.prototype.union = function(arr) {
	var res = this.slice(0),
		i = 0,
		len = arr.length;
	
	for (; i < len; ++ i) {
		if (!~res.indexOf(arr[i])) res.push(arr[i]);
	}
	
	return res.sort((a, b) => { return a - b; });
}


Number.prototype.insertCommaReg = /(^[+-]?\d+)(\d{3})/;
Number.prototype.insertComma = function() {
	var res = this.toString();
	
	while (this.insertCommaReg.test(res)) {
		res = res.replace(this.insertCommaReg, "$1,$2");
	}
	
	return res;
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



