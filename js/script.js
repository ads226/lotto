window.onload = function() {
	console.time("[Time to] ++++++++++ Page load completed");
	
	var lottoData = createLottoDataAll();
	
	var i = 0,
		len = lottoData.length,
		res = new Array(20).fill(0);
	
	for (; i < len; ++ i) {
		/*
		var m = lottoData[i][3] - lottoData[i][2];
		
		res[Math.floor((m - 1) / 4)] ++;
		*/
		
		var value = lottoData[i].reduce((acc, cur) => {
			return acc + (cur % 10);
		}, 0);
		
		res[Math.floor((value - 2) / 4)] ++;
		
	}
	
	console.log(res);
	
	
	/*
	// 홀짝 비율 (홀수의 개수) : 2 ~ 4
	lottoData = filterOddCount(lottoData, 2, 4);
	console.log(lottoData.length); // 6623540
	
	// 3의 배수 : 1 ~ 3
	lottoData = filterMultiple(lottoData, 1, 3, 3);
	console.log(lottoData.length); // 5560660
	
	// 5의 배수 : 0 ~ 3
	lottoData = filterMultiple(lottoData, 0, 3, 5);
	console.log(lottoData.length); // 5078920
	
	// 7의 배수 : 0 ~ 2
	lottoData = filterMultiple(lottoData, 0, 2, 7);
	console.log(lottoData.length); // 4942670
	
	// 번호의 합 : 101 ~ 200
	lottoData = filterSum(lottoData, 101, 200);
	console.log(lottoData.length); // 4279223
	
	// 앞수의 합 : 7 ~ 17
	lottoData = filterFirstSum(lottoData, 7, 17);
	console.log(lottoData.length); // 4255601
	
	// 끝수의 합 : 15 ~ 34
	lottoData = filterLastSum(lottoData, 15, 34);
	console.log(lottoData.length); // 3677083
	
	// 앞뒤번호간의 최대 간격 : 7 ~ 22
	lottoData = filterMarginMax(lottoData, 7, 22);
	console.log(lottoData.length); // 7426485
	
	// 6번 - 1번의 간격 : 21 ~ 44
	lottoData = filterMargin(lottoData, 21, 44, 5, 0);
	console.log(lottoData.length); // 7175500
	
	// 5번 - 2번의 간격 : 7 ~ 30
	lottoData = filterMargin(lottoData, 7, 30, 4, 1);
	console.log(lottoData.length); // 6585363
	
	// 4번 - 3번의 간격 : 1 ~ 16
	lottoData = filterMargin(lottoData, 1, 16, 3, 2);
	console.log(lottoData.length); // 6315317
	*/
	
	/*
//	lottoData = filterRepeat(lottoData, 0, 1, [13,16,24,25,33,36]);
	lottoData = filterRepeat(lottoData, 0, 1, [8,15,21,31,33,38]);
	console.log(lottoData.length);
	
	lottoData = filterContinue(lottoData, 0, 1);
	console.log(lottoData.length);
	
	lottoData = filterException(lottoData, [1, 2, 5, 6 ,8, 10, 11, 20, 30, 40, 41, 42, 45]);
	console.log(lottoData.length);
	
	
	for (var i = 0; i < 20; ++ i) {
		console.log(lottoData[Math.floor(lottoData.length * Math.random())]);
	}
	*/
	console.timeEnd("[Time to] ++++++++++ Page load completed");
}

2100
24960
107620
291680
600820
1020320
1476580
1816640
1787700
1016640


function filterSum(data, min, max) {
	var res = [];
	
	for (var i = 0, len = data.length; i < len; ++ i) {
		var sum = data[i].reduce((acc, cur) => { return acc + cur; });
		if (sum >= min && sum <= max) res.push(data[i]);
	}
	
	return res;
}

function filterOddCount(data, min, max) {
	var res = [];
	
	for (var i = 0, len = data.length; i < len; ++ i) {
		var cnt = data[i].reduce((acc, cur) => { return acc + (cur % 2); }, 0);
		if (cnt >= min && cnt <= max) res.push(data[i]);
	}
	
	return res;
}

function filterFirstSum(data, min, max) {
	var res = [];
	
	for (var i = 0, len = data.length; i < len; ++ i) {
		var cnt = data[i].reduce((acc, cur) => {
			return acc + Math.floor(cur / 10);
		}, 0);
		if (cnt >= min && cnt <= max) res.push(data[i]);
	}
	
	return res;
}

function filterLastSum(data, min, max) {
	var res = [];
	
	for (var i = 0, len = data.length; i < len; ++ i) {
		var cnt = data[i].reduce((acc, cur) => {
			return acc + (cur % 10);
		}, 0);
		if (cnt >= min && cnt <= max) res.push(data[i]);
	}
	
	return res;
}

function filterMultiple(data, min, max, m) {
	var res = [];
	
	for (var i = 0, len = data.length; i < len; ++ i) {
		var cnt = data[i].reduce((acc, cur) => {
			return acc + ((cur % m === 0) ? 1 : 0);
		}, 0);
		if (cnt >= min && cnt <= max) res.push(data[i]);
	}
	
	return res;
}

function filterMarginMax(data, min, max) {
	var res = [];
	
	for (var i = 0, len = data.length; i < len; ++ i) {
		var m = Math.max(
			data[i][1] - data[i][0],
			data[i][2] - data[i][1],
			data[i][3] - data[i][2],
			data[i][4] - data[i][3],
			data[i][5] - data[i][4]
		);
		
		if (m >= min && m <= max) res.push(data[i]);
	}
	
	return res;
}

function filterMargin(data, min, max, idxH, idxL) {
	var res = [];
	
	for (var i = 0, len = data.length; i < len; ++ i) {
		var m = data[i][idxH] - data[i][idxL];
		if (m >= min && m <= max) res.push(data[i]);
	}
	
	return res;
}






function filterRepeat(data, min, max, prev) {
	var i = 0,
		len = data.length,
		res = [];
	
	for (; i < len; ++ i) {
		var cnt = 0;
		
		for (var j = 0; j < 6; ++ j) {
			if (!!~prev.indexOf(data[i][j])) cnt ++;
		}
		
		if (cnt >= min && cnt <= max) res.push(data[i]);
	}
	
	return res;
}

function filterContinue(data, min, max) {
	var i = 0,
		len = data.length,
		res = [];
	
	for (; i < len; ++ i) {
		var cnt = 0;
		
		for (var j = 0; j < 5; ++ j) {
			if (data[i][j + 1] - data[i][j] === 1) cnt ++;
		}
		
		if (cnt >= min && cnt <= max) res.push(data[i]);
	}
	
	return res;
}

function filterException(data, nums) {
	var i = 0,
		len = data.length,
		res = [];
	
	for (; i < len; ++ i) {
		var cnt = 0;
		
		for (var j = 0; j < 6; ++ j) {
			if (!!~nums.indexOf(data[i][j])) cnt ++
		}
		
		if (cnt === 0) res.push(data[i]);
	}
	
	return res;
}








