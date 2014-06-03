/*
  自用的对 firefox 的一些修正
 */

// DOM 为 pentadactyl 内置的仿 jQuery 库
var $doc = DOM(document);

// 如果用了 nosquint 扩展则隐藏 pentadactyl 自带的缩放文字，防止重复
if($("nosquint-status")) {
	$doc.find("#dactyl-statusline-field-zoomlevel").attr("hidden", true);
}

// 删除 DOM Inspector 的快捷键，跟自带的查看器冲突
$doc.find("#key_inspectPage").remove();


// for firefox 29+，移动原 status-bar 图标到 dactyl-status-bar
setTimeout(function(){
	var dactylStatusBar = $('dactyl-status-bar');
	if (!dactylStatusBar) {
		// setTimeout(argument.callee, 200);
		alert('dactyl-status-bar not exists.')
		return;
	}

	var children = $('status-bar').children;
	for (var i = 0, l = children.length; i < l; i++) {
		dactylStatusBar.appendChild(children[i]);
	}
}, 500);

function $(id) document.getElementById(id)