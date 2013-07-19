pentadactyl
===========

## plugins

一些自用或自写的 pentadactyl 脚本。

- [userchrome.js](plugins/userchrome.js)：对uc脚本的管理
    - 命令：`uce[dit]`，Edit an userChrome script
    - 命令：`ucr[ehash]`，Reload an userChrome script
- [scriptish.js](plugins/scriptish.js)
    - 对 Scriptish 的管理，可用扩展（修改版）自带的命令替代。
    - 命令：`sce[dit]`，打开 Scriptish 脚本
- [stylish.js](plugins/stylish.js)：对 Stylish 的管理，可用扩展（修改版）自带的命令替代。
- [pentadactyl.penta](plugins/pentadactyl.penta)
    - 命令：`reinstall`，自动下载 pentadactyl.xpi 最新版并自动替换修改后的 addons.jsm
- [editor.penta](plugins/editor.penta)
    - 修改版，`Ctrl+I` 打开 vim 编辑并设置文件类型

## pentadactyl.xpi

修改扩展代码，增加一些功能，[详细说明](pentadactyl.xpi)。