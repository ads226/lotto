var tabIdx = 0,
	tables;


window.onload = function() {
	console.time("[Time to] ++++++++++ Page load completed");
	
	tables = document.querySelectorAll(".table_wrap");
	
	
	initTableWraps();
	initDefaultTable();
	initBallTable();
	initMarkTable();
	initTab();
	
	
	console.timeEnd("[Time to] ++++++++++ Page load completed");
}

function initTableWraps() {
	var i = 0,
		len = tables.length;
	
	for (; i < len; ++ i) {
		tables[i].style.display = (i === tabIdx) ? "block" : "none";
	}
}

function initOption() {
	option = {
		get value() { return document.querySelector(".option_check").checked; },
		set value(val) { document.querySelector(".option_check").checked = val; },
		set txt(str) { document.querySelector(".option_txt").innerHTML = str; },
		set init(str) {
			document.querySelector(".option_check").checked = false;
			document.querySelector(".option_txt").innerHTML = str;
		}
	}
}

function initTab() {
	var tabs = document.querySelectorAll(".head_tab"),
		i = 0,
		len = tabs.length;
	
	for (; i < len; ++ i) {
		var tab = tabs[i];
		tab.idx = i;
		tab.classList.add(i === tabIdx ? "head_tab_selected" : "head_tab_normal");
		tab.onclick = onClickTab;
	}
}

function onClickTab(e) {
	if (e.target.idx === tabIdx) return;
	
	var prevTab = document.querySelectorAll(".head_tab")[tabIdx];
	prevTab.classList.remove("head_tab_selected");
	prevTab.classList.add("head_tab_normal");
	
	e.target.classList.add("head_tab_selected");
	e.target.classList.remove("head_tab_normal");
	
	tabIdx = e.target.idx;
	
	var i = 0,
		len = tables.length;
	
	for (; i < len; ++ i) {
		tables[i].style.display = (i === tabIdx) ? "block" : "none";
	}
}


function initDefaultTable() {
	console.time("[Time to] ++++++++++ initDefaultTable");
	
	var tbody = createElement(ELEMENT_TYPE.TBODY),
		i = 0,
		len = lotteryDataAll.length;
	
	for (; i < len; ++ i) {
		var tr = tbody.appendChild(createElement(ELEMENT_TYPE.TR));
		
		tr.appendChild(createElement(ELEMENT_TYPE.TD, "td_lottery_turn", lotteryDataAll[i].turn));
		
		var date = lotteryDataAll[i].year + ".";
		date += (lotteryDataAll[i].month < 10) ? "0" : "";
		date += lotteryDataAll[i].month + ".";
		date += (lotteryDataAll[i].date < 10) ? "0" : "";
		date += lotteryDataAll[i].date;
		tr.appendChild(createElement(ELEMENT_TYPE.TD, "td_lottery_date", date));
		
		var wrap = createElement(ELEMENT_TYPE.DIV, "num_ball_wrap");
		for (var j = 0; j < 8; ++ j) {
			if (j === 6) {
				var cls = "num_div",
					num = "+";
			} else {
				var cls = ["num_ball", "num_lottery"],
					num = (j === 7) ? lotteryDataAll[i].bonus : lotteryDataAll[i].lotto[j];
				
				switch (Math.floor((num - 1) / 10)) {
					case 0 :
						cls.push("num_o");
						break;
					case 1 :
						cls.push("num_b");
						break;
					case 2 :
						cls.push("num_r");
						break;
					case 3 :
						cls.push("num_k");
						break;
					case 4 :
						cls.push("num_g");
						break;
				}
			}
			
			wrap.appendChild(createElement(ELEMENT_TYPE.DIV, cls, num));
		}
		tr.appendChild(createElement(ELEMENT_TYPE.TD, "td_lottery_num", wrap));
		
		for (var k = 0; k < 5; ++ k) {
			var cls = ["td_lottery_rank", "td_rank_" + (k + 1)],
				won = (lotteryDataAll[i].prize.length > 0) ? lotteryDataAll[i].prize[k].insertComma() + "원" : "-원";
			
			tr.appendChild(createElement(ELEMENT_TYPE.TD, cls, won));
		}
	}
	
	document.querySelector("#table_default table").appendChild(tbody);
	
	console.timeEnd("[Time to] ++++++++++ initDefaultTable");
}

function initBallTable() {
	console.time("[Time to] ++++++++++ initBallTable");
	
	var check = document.querySelector("#table_ball input"),
		tbody = createElement(ELEMENT_TYPE.TBODY),
		i = 0,
		len = lotteryDataAll.length;
	
	check.onchange = onChangeBallCheck;
	
	for (; i < len; ++ i) {
		var tr = tbody.appendChild(createElement(ELEMENT_TYPE.TR));
		
		tr.appendChild(createElement(ELEMENT_TYPE.TD, "td_lottery_turn", lotteryDataAll[i].turn));
		
		var wrap = createElement(ELEMENT_TYPE.DIV, "num_ball_wrap");
		for (var j = 0; j < 45; ++ j) {
			var cls = ["num_ball", "num_all"];
			
			if (!!~lotteryDataAll[i].lotto.indexOf(j + 1)) {
				switch (Math.floor(j / 10)) {
					case 0 : cls.push("num_o"); break;
					case 1 : cls.push("num_b"); break;
					case 2 : cls.push("num_r"); break;
					case 3 : cls.push("num_k"); break;
					case 4 : cls.push("num_g"); break;
				}
			}
			
			wrap.appendChild(createElement(ELEMENT_TYPE.DIV, cls, j + 1));
		}
		tr.appendChild(createElement(ELEMENT_TYPE.TD, "td_num_all", wrap));
	}
	
	document.querySelector("#table_ball table").appendChild(tbody);
	
	console.timeEnd("[Time to] ++++++++++ initBallTable");
}

function onChangeBallCheck(e) {
	console.time("[Time to] ++++++++++ onChangeBallCheck");
	
	var tbody = document.querySelector("#table_ball tbody"),
		trs = tbody.querySelectorAll("tr"),
		i = 0,
		len = trs.length;
	
	for (; i < len; ++ i) {
		var turn = trs[i].querySelector(".td_lottery_turn").innerHTML,
			bonus = getLotteryOfTurn(turn).bonus,
			nums = trs[i].querySelectorAll(".num_ball");
		
		if (bonus > 0) {
			switch (Math.floor((bonus - 1) / 10)) {
				case 0 : var cls = "num_o"; break;
				case 1 : var cls = "num_b"; break;
				case 2 : var cls = "num_r"; break;
				case 3 : var cls = "num_k"; break;
				case 4 : var cls = "num_g"; break;
				default : return;
			}
			
			if (e.target.checked) nums[bonus - 1].classList.add(cls);
			else nums[bonus - 1].classList.remove(cls);
		}
	}
	
	console.timeEnd("[Time to] ++++++++++ onChangeBallCheck");
}

function initMarkTable() {
	console.time("[Time to] ++++++++++ initMarkTable");
	
	var check = document.querySelector("#table_mark input"),
		table = createElement(ELEMENT_TYPE.TABLE),
		i = 0,
		cnt = lotteryDataAll.length,
		len = Math.ceil(cnt / 10) * 10;
	
	check.onchange = onChangeMarkCheck;
	
	for (; i < len; ++ i) {
		if (i % 10 === 0) {
			table.appendChild(createElement(ELEMENT_TYPE.THEAD, null, createElement(ELEMENT_TYPE.TR)));
			table.appendChild(createElement(ELEMENT_TYPE.TBODY, null, createElement(ELEMENT_TYPE.TR)));
		}
		
		var trHead = table.querySelectorAll("thead")[Math.floor(i / 10)].querySelector("tr"),
			trBody = table.querySelectorAll("tbody")[Math.floor(i / 10)].querySelector("tr"),
			trun = (i < cnt) ? lotteryDataAll[i].turn : "&nbsp;",
			wrap = createElement(ELEMENT_TYPE.DIV);
		
		if (i < cnt) {
			wrap.classList.add("num_mark_wrap");
			wrap.turn = lotteryDataAll[i].turn;
			
			for (var j = 0; j < 45; ++ j) {
				var cls = ["num_mark"];
				if (!!~lotteryDataAll[i].lotto.indexOf(j + 1)) cls.push("num_marked");
				
				wrap.appendChild(createElement(ELEMENT_TYPE.DIV, cls, j + 1));
			}
		}
		
		trHead.appendChild(createElement(ELEMENT_TYPE.TD, null, trun));
		trBody.appendChild(createElement(ELEMENT_TYPE.TD, "td_num_mark", wrap));
	}
	
	document.querySelector("#table_mark").appendChild(table);
	
	console.timeEnd("[Time to] ++++++++++ initMarkTable");
}

function onChangeMarkCheck(e) {
	console.time("[Time to] ++++++++++ onChangeMarkCheck");
	
	var wraps = document.querySelectorAll("#table_mark .num_mark_wrap"),
		i = 0,
		len = wraps.length;
	
	for (; i < len; ++ i) {
		var turn = wraps[i].turn,
			bonus = getLotteryOfTurn(turn).bonus,
			nums = wraps[i].querySelectorAll(".num_mark");
		if (bonus > 0) {
			if (e.target.checked) nums[bonus - 1].classList.add("num_marked");
			else nums[bonus - 1].classList.remove("num_marked");
		}
	}
	
	console.timeEnd("[Time to] ++++++++++ onChangeMarkCheck");
}
