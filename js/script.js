var filterContainer,
	lottoData,
	lotteryData,
	currentLottery = lotteryDataAll[0];

window.onload = function() {
	console.time("[Time to] ++++++++++ Page load completed");
	
	
	filterContainer = [
		new FilterAll()
		, new FilterOdd()
		, new FilterContinue(1)
		, new FilterContinue(2)
		, new FilterContinue(3)
		, new FilterSum()
		
		, new FilterRepeat(1)
//		, new FilterRepeat(2)
//		, new FilterRepeat(10)
	];
	
	for (var i = 0, len = filterContainer.length; i < len; ++ i) {
		filterContainer[i].index = i;
	}
	
	initTurnSelector();
	onChangeTurnSelector();
	
	
	document.querySelector(".pradict_btn_create").onclick = onClickCreate.bind(this);
	document.querySelector(".pradict_btn_clear").onclick = clearPradictTable;
	
	
	console.timeEnd("[Time to] ++++++++++ Page load completed");
	
	onClickCreate();
}


function initFilter() {
	var i = 0,
		len = filterContainer.length;
	
	for (; i < len; ++ i) {
		console.time("[Time to] ++++++++++ [" + i + "] Filter init");
		filterContainer[i].init();
		console.timeEnd("[Time to] ++++++++++ [" + i + "] Filter init");
	}
}

function refreshFilter() {
	var i = 0,
		len = filterContainer.length;
	
	console.time("[Time to] ++++++++++ createLottoDataAll");
	lottoData = createLottoDataAll();
	console.timeEnd("[Time to] ++++++++++ createLottoDataAll");
	
	for (; i < len; ++ i) {
		console.time("[Time to] ++++++++++ [" + i + "] Filter refresh");
		filterContainer[i].refresh();
		console.timeEnd("[Time to] ++++++++++ [" + i + "] Filter refresh");
	}
}


function initTurnSelector() {
	var selector = document.querySelector(".lottery_turn_select"),
		i = 0,
		len = 10;
	
	for (; i < len; ++ i) {
		var option = selector.appendChild(document.createElement("OPTION"));
		option.value = option.innerHTML = lotteryDataAll[i].turn;
	}
	
	selector.onchange = onChangeTurnSelector;
}

function onChangeTurnSelector() {
	var selector = document.querySelector(".lottery_turn_select");
	
	currentLottery = getLotteryOfTurn(selector.value);
	lotteryData = getLotteryOfRange(currentLottery.turn - 1);
	
	initResultLotteryNum();
	clearPradictTable();
	initFilter();
	refreshFilter();
}

function initResultLotteryNum() {
	var data = currentLottery,
		tDate = document.querySelector(".lottery_turn_date"),
		tNums = document.querySelectorAll(".lottery_num_wrap .lottery_num"),
		tPris = document.querySelectorAll(".lottery_prize_value");
	
	tDate.innerHTML = "(" + data.year + "년 " + data.month + "월 " + data.date + "일 추첨";
	tDate.innerHTML += (data.lotto.length > 0) ? ")" : " 예정)";
	
	if (data.lotto.length > 0) {
		for (var i = 0, lenNums = tNums.length; i < lenNums; ++ i) {
			tNums[i].innerHTML = (i < 6) ? data.lotto[i] : data.bonus;
			setLotteryNumStyle(tNums[i])
		}
		
		for (var j = 0, lenPris = tPris.length; j < lenPris; ++ j) {
			tPris[j].innerHTML = (data.prize[j]).insertComma() + "원";
		}
	} else {
		for (var i = 0, len = tNums.length; i < len; ++ i) {
			tNums[i].innerHTML = "-";
			setLotteryNumStyle(tNums[i])
		}
		
		for (var j = 0, lenPris = tPris.length; j < lenPris; ++ j) {
			tPris[j].innerHTML = "-원";
		}
	}
}


const LOTTO_NUM_STYLE = [
	"lottery_num_o",
	"lottery_num_b",
	"lottery_num_r",
	"lottery_num_k",
	"lottery_num_g"
];

function setLotteryNumStyle(tNum) {
	var num = Math.floor((tNum.innerHTML - 1) / 10),
		i = 0,
		len = LOTTO_NUM_STYLE.length;
	
	for (; i < len; ++ i) {
		if (i == num) tNum.classList.add(LOTTO_NUM_STYLE[i]);
		else tNum.classList.remove(LOTTO_NUM_STYLE[i]);
	}
}

function clearPradictTable() {
	var table = document.querySelector(".pradict_table");
	
	while (table.hasChildNodes()) {
		table.removeChild(table.childNodes[0]);
	}
	
}


function onClickCreate() {
//	var pradict = lottoData[Math.round(lottoData.length * Math.random())];
	
	var clone = lottoData.slice(0),
		temp = [];
	
	for (var i = 0, len1 = filterContainer.length; i < len1; ++ i) {
		if (filterContainer[i]._conds.length > 0) {
			
			var sum = filterContainer[i]._aData.sum();
			
			for (var j = 0, len2 = filterContainer[i]._conds.length; j < len2; ++ j) {
				
				if (filterContainer[i]._container.check[j]) {
					
//					var per = filterContainer[i]._aData[j] / sum;
					var per = 0.8;
					
					for (var k = 0, len3 = clone.length; k < len3; ++ k) {
						if (Math.random() <= per) {
							temp.push(clone[k]);
						}
					}
					
					clone = temp.slice(0);
					temp = [];
				}
			}
		}
	}
	
	console.log(clone.length)
	var pradict = clone[Math.round(clone.length * Math.random())];
	
	addPradictLine(pradict);
}

function addPradictLine(lotto) {
	var table = table = document.querySelector(".pradict_table"),
		idx = table.children.length + 1,
		tr = createElement(ELEMENT_TYPE.TR),
		i = 0,
		len = 6,
		tdIdx, tdNum, divNum, tdPrize,
		prize = "-";
		
	
	tdIdx = tr.appendChild(createElement(ELEMENT_TYPE.TD, "pradict_table_idx", idx));
	
	divNum = createElement(ELEMENT_TYPE.DIV, "pradict_num_wrap");
	for (; i < len; ++ i) {
		var num = divNum.appendChild(createElement(ELEMENT_TYPE.DIV, ["lottery_num", "pradict_num"], lotto[i]));
		num.classList.add(LOTTO_NUM_STYLE[Math.floor((lotto[i] - 1) / 10)]);
	}
	tdNum = tr.appendChild(createElement(ELEMENT_TYPE.TD, "pradict_table_num", divNum));
	
	if (currentLottery.prize.length > 0) prize = getPrize(lotto);
	
	tdPrize = tr.appendChild(createElement(ELEMENT_TYPE.TD, "pradict_table_prize", prize));
	
	table.appendChild(tr);
}

function getPrize (lotto) {
	var lotteryLotto = currentLottery.lotto,
		cnt = filterContainer[0]._calc(lotto, lotteryLotto),
		res = 0;
	
	switch (cnt) {
		case 6 :
			res = currentLottery.prize[0];
			break;
		case 5 :
			if (!!~lotto.indexOf(currentLottery.bonus)) res = currentLottery.prize[1];
			else res = currentLottery.prize[2];
			break;
		case 4 :
			res = currentLottery.prize[3];
			break;
		case 3 :
			res = currentLottery.prize[4];
			break;
	}
	
	return res.insertComma() + "원";
}
