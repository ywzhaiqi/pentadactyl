pentadactyl
===========

[说明](Notes)

plugins
-------

一些自写或修正的 pentadactyl 脚本。

- [userchrome.js](plugins/userchrome.js)：对uc脚本的管理
    - 命令：`uce[dit]`，Edit an userChrome script
    - 命令：`ucr[ehash]`，Reload an userChrome script
- [scriptish.js](plugins/scriptish.js)
    - 对 Scriptish 的管理，可用扩展（修改版）自带的命令替代。
    - 命令：`sce[dit]`，打开 Scriptish 脚本
- [stylish.js](plugins/stylish.js)：对 Stylish 的管理，可用扩展（修改版）自带的命令替代。
- [pentadactyl.penta](plugins/pentadactyl.penta)
    - 命令：`reinstall`，自动下载 pentadactyl.xpi 最新版并自动替换修改后的 addons.jsm
- [buftabs.js](plugins/buftabs.js)
    - [grassofhust/buftabs](https://github.com/grassofhust/buftabs) 修正版，修正了原版样式在 ff24 失效的问题。
- [editor.penta](plugins/editor.penta)
    - 修改版，`Ctrl+I` 打开 vim 编辑并设置文件类型

其它的一些链接

- [dict.js - grassofhust](https://github.com/grassofhust/dict.js)，通过 `:dict` 查询单词。
- [buftabs - grassofhust](https://github.com/grassofhust/buftabs)，把标签栏移至下面的状态栏。
- [Keefox.js - wideweide/pentadactyl](https://github.com/wideweide/pentadactyl/blob/master/Keefox.js)
- [AlertBox.js - wideweide/pentadactyl](https://github.com/wideweide/pentadactyl/blob/master/AlertBox.js)

pentadactyl.xpi
---------------

修改扩展代码，增加一些功能，[详细说明](pentadactyl.xpi)。


技巧
----

 - 在 github 可用 `50G` 到第50行，可通过 `:set linenumbers` 设置。


一些链接
-------

- [Pentadactyl[vimperator分枝]使用心得,期待交流 - Mozilla 社区](https://g.mozest.com/thread-38908-1-1)