var tabIdx = 0;

window.onload = function() {
	console.time("[Time to] ++++++++++ Page load completed");
	
	initTab();
	
	
	
	console.timeEnd("[Time to] ++++++++++ Page load completed");
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
}