var exceptNum = 1;

window.onload = function() {
	console.time("[Time to] ++++++++++ Page load completed");
	
	initFilterExtension();
	initExceptNum();
	
	console.timeEnd("[Time to] ++++++++++ Page load completed");
}

function initFilterExtension() {
	var uis = document.querySelectorAll(".filter_extension"),
		wraps = document.querySelectorAll(".filter")
		i = 0,
		len = uis.length;
	
	for (; i < len; ++ i) {
		new UI_Extention(uis[i], wraps[i]);
	}
}

function initExceptNum() {
	var tds = document.querySelectorAll("#except_condition_num td"),
		i = 0,
		len = tds.length;
	
	for (; i < len; ++ i) {
		var td = tds[i];
		td.idx = i + 1;
		
		if (td.idx === exceptNum) td.classList.add("selected");
		else td.classList.remove("selected");
		
		td.onclick = function(e) {
			if (e.target.idx === exceptNum) return;
			
			tds[exceptNum - 1].classList.remove("selected");
			tds[e.target.idx - 1].classList.add("selected");
			
			exceptNum = e.target.idx;
		}
	}
}