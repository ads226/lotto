function Filter() {
	this._container = createFilterContainer.call(this);
	document.querySelector(".filter_wrap").appendChild(this._container.root);
	
	this._init = function() {
		var i = 0,
			len = lotteryData.length;
		
		for (; i < len; ++ i) {
			var res = this._calc(lotteryData[i].lotto);
			
			this._aData[res] ++;
			if (i < 100) this._hData[res] ++;
			if (i < 50) this._fData[res] ++;
			if (i < 10) this._tData[res] ++;
		}
	}
	
	this._refresh = function() {
		var chk = this._container.check,
			res = [],
			i = 0,
			len = lottoData.length;
		
		for (; i < len; ++ i) {
			if (chk[this._calc(lottoData[i])]) res.push(lottoData[i]);
		}
		
		lottoData = res;
		delete res;
	}
	
	Object.defineProperties(this, {
		index:{
			set:function(value) { this._container.index = value; }
		}
	});
}

Filter.prototype.init = function() {
	this.initData();
	this._init();
	
	this._container.all = this._aData;
	this._container.hundred = this._hData;
	this._container.fifty = this._fData;
	this._container.ten = this._tData;
}

Filter.prototype.refresh = function() {
	this._refresh();
	this.onChangeCheck();
	this._container.result = lottoData.length;
}

Filter.prototype.initData = function() {
	var len = this._conds.length;
	
	this._aData = new Array(len);
	this._aData.fill(0);
	
	this._hData = new Array(len);
	this._hData.fill(0);
	
	this._fData = new Array(len);
	this._fData.fill(0);
	
	this._tData = new Array(len);
	this._tData.fill(0);
}

Filter.prototype.onChangeCheck = function(e) {
	
	if (this._container.check === undefined) return;
	
	var check = this._container.check,
		i = 0,
		len = check.length,
		obj = {aCnt:0,aPer:0,hCnt:0,hPer:0,fCnt:0,fPer:0,tCnt:0,tPer:0};
	
	for (; i < len; ++ i) {
		if (check[i]) {
			obj.aCnt += this._aData[i];
			obj.hCnt += this._hData[i];
			obj.fCnt += this._fData[i];
			obj.tCnt += this._tData[i];
		}
	}
	
	obj.aPer = obj.aCnt / this._aData.sum() * 100;
	obj.hPer = obj.hCnt / this._hData.sum() * 100;
	obj.fPer = obj.fCnt / this._fData.sum() * 100;
	obj.tPer = obj.tCnt / this._tData.sum() * 100;
	
	this._container.total = obj;
	
	if (e) refreshFilter();
}


function createFilterContainer(idx) {
	var container = createElement(ELEMENT_TYPE.DIV, "filter"),
		title = container.appendChild(createElement(ELEMENT_TYPE.DIV, "filter_title")),
		table = container.appendChild(createElement(ELEMENT_TYPE.DIV, "filter_table")),
		result = container.appendChild(createElement(ELEMENT_TYPE.DIV, "filter_result"));
	
	title = createFilterTitle(title, this._title);
	table = createFilterTable.call(this, table);
	
	return {
		get root() { return container; },
		get check() { return table.check; },
		
		set index(num) { title.index = num; },
		set all(arr) { table.all = arr; },
		set hundred(arr) { table.hundred = arr; },
		set fifty(arr) { table.fifty = arr; },
		set ten(arr) { table.ten = arr; },
		set total(obj) { table.total = obj; },
		set result(num) { result.innerHTML = (num).insertComma() + "개"; }
	}
}

function createFilterTitle(container, title) {
	var titleNum = container.appendChild(createElement(ELEMENT_TYPE.P, "filter_title_idx")),
		titleTxt = container.appendChild(createElement(ELEMENT_TYPE.P, "filter_title_txt", title));
		
	return {
		set index(num) {
			var idx = num + 1;
			titleNum.innerHTML = (idx < 10) ? "0" + idx : idx;
		}
	}
}

function createFilterTable(container) {
	if (this._conds.length === 0) return false;
	
	var table = container.appendChild(createElement(ELEMENT_TYPE.TABLE)),
		tHead = table.appendChild(createElement(ELEMENT_TYPE.THEAD)),
		tBody = table.appendChild(createElement(ELEMENT_TYPE.TBODY)),
		tFoot = table.appendChild(createElement(ELEMENT_TYPE.TFOOT)),
		i = 0,
		len = this._conds.length,
		children = new Array(len),
		title = tHead.appendChild(createElement(ELEMENT_TYPE.TR)),
		total = tFoot.appendChild(createElement(ELEMENT_TYPE.TR));
	
	title.appendChild(createElement(ELEMENT_TYPE.TD, null, "조건"));
	title.appendChild(createElement(ELEMENT_TYPE.TD, null, "전체")).colSpan = 2;
	title.appendChild(createElement(ELEMENT_TYPE.TD, null, "이전 100회")).colSpan = 2;
	title.appendChild(createElement(ELEMENT_TYPE.TD, null, "이전 50회")).colSpan = 2;
	title.appendChild(createElement(ELEMENT_TYPE.TD, null, "이전 10회")).colSpan = 2;
	title.appendChild(createElement(ELEMENT_TYPE.TD, null, "설정"));
	
	for (; i < len; ++ i) {
		var chk = createElement(ELEMENT_TYPE.INPUT);
		chk.setAttribute("type", "checkbox");
		chk.onchange = this.onChangeCheck.bind(this);
		
		children[i] = createFilterTableLine(tBody, [this._conds[i],,,,,,,,,chk]);
	}
	
	total = createFilterTableLine(tFoot, ["합계"]);
	
	return {
		get check() {
			var res = new Array(len);
			for (i = 0; i < len; ++ i) res[i] = children[i].check;
			return res;
		},
		set all(arr) {
			var sum = arr.sum(),
				standard = 1 / len * 100;
			
			for (i = 0; i < len; ++ i) {
				var per = arr[i] / sum * 100 || 0;
				
				children[i].aCnt = arr[i] + "개";
				children[i].aPer = (per).toFixed(2) + "%";
				
				if (per > standard) children[i].check = true;
			}
		},
		set hundred(arr) {
			var sum = arr.sum();
			
			for (i = 0; i < len; ++ i) {
				var per = arr[i] / sum * 100 || 0;
				
				children[i].hCnt = arr[i] + "개";
				children[i].hPer = (per).toFixed(2) + "%";
			}
		},
		set fifty(arr) {
			var sum = arr.sum();
			
			for (i = 0; i < len; ++ i) {
				var per = arr[i] / sum * 100 || 0;
				
				children[i].fCnt = arr[i] + "개";
				children[i].fPer = (per).toFixed(2) + "%";
			}
		},
		set ten(arr) {
			var sum = arr.sum();
			
			for (i = 0; i < len; ++ i) {
				var per = arr[i] / sum * 100 || 0;
				
				children[i].tCnt = arr[i] + "개";
				children[i].tPer = (per).toFixed(2) + "%";
			}
		},
		set total(obj) {
			total.aCnt = obj.aCnt + "개";
			total.aPer = obj.aPer.toFixed(2) + "%";
			total.hCnt = obj.hCnt + "개";
			total.hPer = obj.hPer.toFixed(2) + "%";
			total.fCnt = obj.fCnt + "개";
			total.fPer = obj.fPer.toFixed(2) + "%";
			total.tCnt = obj.tCnt + "개";
			total.tPer = obj.tPer.toFixed(2) + "%";
		}
	}
}

const FILTER_TABLE_TD_CLASS = [
	"filter_table_con",
	"filter_table_cnt",
	"filter_table_per",
	"filter_table_cnt",
	"filter_table_per",
	"filter_table_cnt",
	"filter_table_per",
	"filter_table_cnt",
	"filter_table_per",
	"filter_table_set"
];

function createFilterTableLine(container, value) {
	
	var tr = container.appendChild(createElement(ELEMENT_TYPE.TR)),
		i = 0,
		len = FILTER_TABLE_TD_CLASS.length,
		children = new Array(len);
	
	for (; i < len; ++ i) {
		children[i] = tr.appendChild(createElement(ELEMENT_TYPE.TD, FILTER_TABLE_TD_CLASS[i], value[i]));
	}
	
	var chk = children[len - 1].querySelector("INPUT");
	
	return {
		set aCnt(value) { children[1].innerHTML = value; },
		set aPer(value) { children[2].innerHTML = value; },
		set hCnt(value) { children[3].innerHTML = value; },
		set hPer(value) { children[4].innerHTML = value; },
		set fCnt(value) { children[5].innerHTML = value; },
		set fPer(value) { children[6].innerHTML = value; },
		set tCnt(value) { children[7].innerHTML = value; },
		set tPer(value) { children[8].innerHTML = value; },
		
		set check(value) { if (chk) chk.checked = value; },
		get check() { return (chk) ? chk.checked : false; }
	}
	
}




function FilterAll() {
	this._title = "모든 경우의 수";
	this._conds = [];
	
	Filter.apply(this);
	
	this._calc = function() {}
	this._init = function() {}
	this._refresh = function() {}
}
FilterAll.prototype = Filter.prototype;
FilterAll.prototype.constructor = Filter;



function FilterOdd() {
	this._title = "출현 번호의 홀:짝 비율";
	this._conds = ["0 : 6","1 : 5","2 : 4","3 : 3","4 : 2","5 : 1","6 : 0"];
	
	Filter.apply(this);
	
	this._calc = function(lotto) {
		var res = 0,
			i = 0,
			len = lotto.length;
		
		for (; i < len; ++ i) if (lotto[i] % 2) res ++;
		
		return res;
	}
}
FilterOdd.prototype = Filter.prototype;
FilterOdd.prototype.constructor = Filter;



function FilterRepeat(num) {
	this._title = "이전 " + num + "회차의 번호 재출현 수";
	this._conds = ["0개", "1개", "2개", "3개", "4개", "5개", "6개"];
	
	Filter.apply(this);
	
		
	this._temp = [];

	
	this._calc = function(lotto, array) {
		array = array || this._temp;
		
		var res = 0,
			lottoLen = lotto.length,
			arrayLen = array.length;
		
		for (var i = 0; i < lottoLen; ++ i) {
			for (var j = 0; j < arrayLen; ++ j) {
				if (lotto[i] === array[j]) {
					res ++;
					break;
				}
			}
		}
		
		return res;
	}
	
	this._init = function() {
		var i = 0,
			len = lotteryData.length - num;
		
		for (; i < len; ++ i) {
			
			var arr = lotteryData[i + num].lotto.slice(0);
			for (var j = 1; j < num; ++ j) arr = arr.concat(lotteryData[i + j].lotto);
			
			var res = this._calc(lotteryData[i].lotto, arr);
			
			this._aData[res] ++;
			if (i < 100) this._hData[res] ++;
			if (i < 50) this._fData[res] ++;
			if (i < 10) this._tData[res] ++;
		}
		
		this._temp = lotteryData[0].lotto;
		for (var i = 1; i < num; ++ i) this._temp = this._temp.concat(lotteryData[i].lotto);
	}
}
FilterRepeat.prototype = Filter.prototype;
FilterRepeat.prototype.constructor = Filter;




