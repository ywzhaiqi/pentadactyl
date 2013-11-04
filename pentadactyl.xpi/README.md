pentadactyl.xpi
===============

### addons.jsm 文件的修改

文件位置：`chrome/common/modules/addons.jsm`

`:addon` 界面增加 Edit 按钮，新增 `:extedit` 命令。

 - extension 查看扩展安装路径
 - userscript（Scriptish） 或 greasemonkey-user-script 直接用编辑器打开文件（用内置的 editor 打开）
 - userstyle 打开 Stylish 编辑界面
 - userChromeJS

更改 `:addon XXX` 为搜索全部，不再只搜索 extension。类似 `about:addons` 页面的搜索，搜索词如果有空格，前面加 `\`