
var $doc = DOM(document);

// 隐藏 zoomlevel 文字
if($doc.find("#nosquint-status").length)
    $doc.find("#dactyl-statusline-field-zoomlevel").attr("hidden", true);

$doc.find("#key_inspectPage").remove();  // 删除 DOM Inspector 的快捷键，跟自带的查看器冲突
