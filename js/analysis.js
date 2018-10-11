window.onload = function() {
	console.time("[Time to] ++++++++++ Page load completed");
	
	var zoom = document.querySelector(".zoom"),
		svg = document.querySelector("svg");
	
	zoom.onclick = function(){
		console.log(svg.clientWidth);
		svg.style.width = (svg.clientWidth * 1.5) + "px";
	}.bind(this);
	
	drawVerticalGrid(30);
	drawLine(1, 30);
	
	
	console.timeEnd("[Time to] ++++++++++ Page load completed");
}


function drawVerticalGrid(period) {
	var i = 0,
		len = Math.ceil(lotteryDataAll.length / period),
		last = lotteryDataAll.length % period / period;
	
	
	for (;)
}




function drawLine(num, period) {
	var allAvg = lotteryDataAll.length * 6 / 45,
		allCnt = appearCount(num);
	
	
	console.log("allAvg", allAvg);
	console.log("allCnt", allCnt);
}

function appearCount(num, idx, len) {
	idx = idx || 0;
	len = len || lotteryDataAll.length;
	
	var res = 0;
	
	
	for (; idx < len; ++ idx) {
		if (!lotteryDataAll[idx]) break;
		if (!!~lotteryDataAll[idx].lotto.indexOf(num)) res ++;
	}
	
	return res;
}