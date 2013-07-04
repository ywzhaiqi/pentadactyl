'use strict';

// Initialise highlight groups
highlight.loadCSS(literal(/*
     LinkWord {
         padding:0.4em 0.2em !important;
         font-size:18px;
     }
     LinkWord:hover {
         background-color:blue;
         border-radius:1ex;
     }
*/), true);
// load needed highlight groups
['URL', 'Link', 'LinkInfo', 'LinkWord'].forEach(function(hl) {
    highlight.loaded[hl] = true;
});

var DICT_LANGUAGE = window.navigator.language;

var tr = {
    'en-US': {
        1: 'Description',
        2: 'From ',
        3: ' to ',
        4: 'Lookup: ',
        5: 'Details',
        6: 'In Progressing...',
        7: 'Google Translate: ',
        8: 'Define',
        9: 'Related phrases',
        10: 'Synonyms: ',
        11: 'Antonyms: ',
        12: 'Thesaurus',
        13: 'Inflected',
        14: 'Original Text',
        15: 'Translation',
        16: 'Langpair',
        17: 'Source language and destination language',
        18: 'Examples',
        19: 'Not found: ',
        21: 'Audio support',
        22: 'Simple output',
        23: 'Dictionary engine',
        24: 'Dict.cn',
        25: 'QQ Dictionary',
        26: 'Show result',
        27: 'Statusline',
        28: 'Alert',
        29: 'Desktop notification',
        30: 'Enable double click',
        31: 'Dict lookup',
        32: 'View translation for mouse selection or clipboard (*nix only)',
        33: 'View details for mouse selection or clipboard (*nix only)',
        34: 'Google Translate',
        35: 'Youdao Dictionary',
        36: 'Chinese ↔ English',
        37: 'Chinese ↔ French',
        38: 'Chinese ↔ Korean',
        39: 'Chinese ↔ Japanese',
        40: 'Open result in current tab!',
        41: 'Han Dian',
        42: 'Wikipedia',
        43: 'Net Sentences',
        44: 'Situational Dialogues',
        45: 'The 21st Century Unabridged English-Chinese Dictionary',
        46: 'Collins',
        47: 'Word Usage',
        48: 'Dictionary'
    },
    'zh-CN': {
        1: '描述',
        2: '从 ',
        3: ' 到 ',
        4: '查找：',
        5: '详情',
        6: '查询进行中...',
        7: '谷歌翻译：',
        8: '解释',
        9: '相关词组',
        10: '同近义词：',
        11: '反义词：',
        12: '同反义词',
        13: '词形变化',
        14: '原文',
        15: '翻译',
        16: '语言对',
        17: '来源语言和目标语言',
        18: '例句',
        19: '未找到：',
        21: '支持声音',
        22: '简洁输出',
        23: '词典引擎',
        24: '海词',
        25: 'QQ 词典',
        26: '显示结果方式',
        27: '状态栏',
        28: '提醒',
        29: '桌面通知',
        30: '双击取词',
        31: '词典查找',
        32: '查看选区或者剪贴板（非视窗平台）的翻译',
        33: '查看选区或者剪贴板（非视窗平台）的翻译详情',
        34: '谷歌翻译',
        35: '有道词典',
        36: '汉英互译',
        37: '汉法互译',
        38: '汉韩互译',
        39: '汉日互译',
        40: '在当前标签页中打开结果！',
        41: '汉典',
        42: '维基百科',
        43: '网络例句',
        44: '情景对话',
        45: '21世纪大英汉词典',
        46: '柯林斯高级英汉双解词典',
        47: '词语用法',
        48: '英英解释'
    }
};

function T(i) {
    if (DICT_LANGUAGE == 'zh-CN')
        return tr['zh-CN'][i];
    return tr['en-US'][i];
}

var STYLE = literal(/*
<style type="text/css" xmlns="http://www.w3.org/1999/xhtml">
body { white-space:normal;}
* {line-height:24px;}
th, dt { font-weight:bolder; }
dt { list-style-type: disc; }
dd { margin:0.1em 0 0.2em; }
.title { text-indent: 14px; }
.title > span { margin-left: 0.8em; }
p > span, li > a { margin-right: 1em; }
span > b { margin-right: 0.4em; }
.basic dt + span { margin-right: 0.4em; }
p,dd,dt,h1,h2,h3,h4,h5,h6,h7,li,td,th {white-space:normal; word-wrap: break-word;}
.dict_block>table {width:800px;}
#dict_js_y p > span, #dict_js_y li > a {margin-right: 0;}
#dict_js_y .example-via a:nth-child(2) {display:none;}
#dict_js_y .video {
    position:relative;
}
#dict_js_y .video .play {
    display:inline-block;
    position:relative;
}
#dict_js_y .video .playicon {
    cursor: pointer;
    height: 30px;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
    position: absolute;
    top: 50%;
    width: 30px;
}

.ciyf-cn01 strong, .block-1 strong {
    float:left;
}
#dict_js_d em.hot {
    font-weight:bolder;
    font-style:normal;
}

.dict_block {
    width:600px;
    margin-left:1em;
    font-size:110%;
}

#dict_js_d .fold, #dict_js_d .unfold, #dict_js_d .folds, #dict_js_d .cont-one .choose {
    display:none;
}

#dict_js_z * {background-image:none;}
#dict_js_z .notice {clear:both;overflow:hidden;}
#dict_js_z .dicpy {font-weight: bolder;}
#dict_js_z .info{color:#999;font-size:14px;margin-right:5px;padding-left:10px;}
#dict_js_z .mut_jies{padding:10px 20px 20px 20px;font-size:14px;}
#dict_js_z .yf_all{padding:3px 4px 4px 4px;}
#dict_js_z .if_all{font-weight:bolder;padding:3px 4px 4px 6px;}
#dict_js_z .mut_lvs{font-weight:bolder;font-weight:bolder;}
#dict_js_z .mut_ol{margin:10px 6px 10px 35px;}
#dict_js_z .mut_ol li{list-style-position:outside;list-style-type:decimal;}
#dict_js_z .mut_ol .ty{font-weight:bolder;}
#dict_js_z .mut_ol .ty a{font-weight:bolder;}
#dict_js_z .mut_h3s{font-weight:bolder;font-weight:bolder;padding:10px 20px 0 15px;}
#dict_js_z .jiaru_s{margin:10px 0;text-align:center;}
#dict_js_z .more{margin:10px 10px 10px 15px;font-size:13px;}
#dict_js_z .mutti_pp{padding:10px;}
#dict_js_z .diczx1, #dict_js_z .diczx2,#dict_js_z .diczx3,#dict_js_z .diczx4 {background-color:#9999FF;color:#000;}
#dict_js_z #z_i_1,#z_i_2{font-size:16px;line-height:20px;}
#dict_js_z #z_i_1 a{color:#900;text-decoration:underline;}
#dict_js_z #zil2,#zir2{height:100px;}
#dict_js_z #ziip{height:30px;line-height:30px;}
#dict_js_z #zil2{margin:0;padding:0;background:url("http://www.zdic.net/images/z_100.gif") no-repeat center;height:100px;width:100px;}
#dict_js_z #pytab{text-align:right;}
#dict_js_z #ztdg{width:38px;text-align:left;}
#dict_js_z #jbs{text-indent:40px;background:url("http://www.zdic.net/images/z_i_jb.gif") no-repeat;margin:2px 0 5px 0;}
#dict_js_z #bs{text-indent:40px;background:url("http://www.zdic.net/images/z_i_bs.gif") no-repeat;margin:2px 0 5px 0;}
#dict_js_z #fbs{text-indent:40px;background:url("http://www.zdic.net/images/z_i_fb.gif") no-repeat;margin:5px 0 5px 0;}
#dict_js_z #bis{text-indent:40px;background:url("http://www.zdic.net/images/z_i_bis.gif") no-repeat;margin:5px 0 5px 0;}
#dict_js_z #jt{text-indent:40px;background:url("http://www.zdic.net/images/z_i_jt.gif") no-repeat;margin:5px 15px 2px 0;float:left;}
#dict_js_z #ft{text-indent:40px;background:url("http://www.zdic.net/images/z_i_ft.gif") no-repeat;margin:5px 0 2px 0;float:left;}
#dict_js_z #uinfo{text-indent:40px;background:url("http://www.zdic.net/images/z_i_bm.gif") no-repeat;margin:0 15px 0 0;float: left;}
#dict_js_z #wb{text-indent:40px;background:url("http://www.zdic.net/images/z_i_wb.gif") no-repeat;margin:0 15px 0 0;float: left;}
#dict_js_z #cj{text-indent:40px;background:url("http://www.zdic.net/images/z_i_cj.gif") no-repeat;margin:0 15px 0 0;float: left;}
#dict_js_z #zm{text-indent:40px;background:url("http://www.zdic.net/images/z_i_zm.gif") no-repeat;margin:0 15px 0 0;float: left;}
#dict_js_z #fc{text-indent:40px;background:url("http://www.zdic.net/images/z_i_fc.gif") no-repeat;margin:0 15px 0 0;float: left;}
</style>
*/);

let wikipedia = {
    name: T(42),
    keyword: '',
    args: {lang: ''},
    logo: '', // TODO: dynamic
    favicon: '', // TODO: dynamic
    init: function(keyword, args) {
        var req = new window.XMLHttpRequest();
        dict.req = req;
        req.open('GET', options['dictw-api'] +
            '?action=parse&format=json&page=' + encodeURIComponent(args[0]));
        req.onreadystatechange = function(ev) {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    wikipedia.process(req.responseText);
                } else
                    dict.error(req.status); // @TODO:
            }
        };
        req.send(null);
        return req;
    },

    href: function(params) {
        let keyword = encodeURIComponent(params['keyword']);
        let site = 'zh';
        // let site = params['sites'] || options['dict-Langpair']['w'] ||
        //  options.get('dict-langpair').defaultValue['w'] || 'zh';
        return 'http://' + site + '.wikipedia.org/wiki/' + keyword;
    },

    process: function(text) {
        var result = JSON.parse(text).parse;
        let ret = {
            notfound: false,
            pron: false,
            def: result.displaytitle || decodeURIComponent(dict.keyword),
            simple: result.displaytitle || decodeURIComponent(dict.keyword),
            full: result.text || '',
            audio: false
        };
        if (options['dict-hasaudio']) {
            ex.speak((result.displaytitle ||
                    decodeURIComponent(dict.keyword)).replace(' ', '\\ '));
        }
        let article = DOM.fromJSON(['div', {}, ''], document);
        article.innerHTML = dict.tidy(dict.htmlToDom(ret.full['*'], 'http://zh.wikipedia.org'));
        let output = ['div', {id: 'wikipedia-output'},
            [
                ['p', {class: 'title'}, ['a', {'href': wikipedia.href({keyword: ret.def}), target: '_blank', 'dactyl:highlight': 'URL', 'xmlns:dactyl': NS}, ret.def]],
                article
            ]
        ];
        dactyl.echo(output);
    },

    generate: function(context, args) {
        var req = new window.XMLHttpRequest();
        if (dict.suggestReq)
            dict.suggestReq.abort();
        dict.suggestReq = req;
        req.open('GET', options['dictw-api'] +
            '?action=opensearch&format=json&limit=100&search=' +
            encodeURIComponent(args[0]));
        var suggestions = [];
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var result_arr = JSON.parse(req.responseText)[1];
                    result_arr.forEach(function(word) {
                            let r = {};
                            r['g'] = word;
                            r['e'] = word;
                            r['url'] = wikipedia.href({keyword: word});
                            suggestions.push(r);
                    });
                    context.incomplete = false;
                    if (suggestions.length == 0 && args[0].trim().length > 0)
                        context.completions = [{url:wikipedia.href({keyword:args[0]}), g:args[0], e:'自动补全查询结束, 无返回结果'}];
                    else
                        context.completions = suggestions;
                }
            }

        };
        req.send(null);
    }
};

let zdic = {
    name: T(41),
    keyword: '',
    logo: 'http://www.zdic.net/images/logo.gif',
    favicon: 'http://www.zdic.net/favicon.ico',
    init: function(keyword, args) {
        zdic.keyword = keyword;
        let type = args['-l'] || options['dict-langpair']['z'] ||
                   options.get('dict-langpair').defaultValue['z'];
        let pairs = [
            ['lb_a', 'hp'],
            ['lb_b', 'mh'],
            ['lb_c', 'mh'],
            ['tp', 'tp1'],
            ['q', keyword]
        ];
        let tp = type.slice(0, 1);
        let lb = type.slice(1);
        if (tp >= 2)
            pairs[tp - 2] = [pairs[tp - 2][0], lb];
        pairs[3] = ['tp', 'tp' + tp];
        let pieces = [];
        pairs.forEach(function(pair) {
            pieces.push(pair.join('='));
        });

        var req = new window.XMLHttpRequest();
        dict.req = req;
        req.open('POST', 'http://www.zdic.net/sousuo/');
        req.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded');
        req.onreadystatechange = function(ev) {
            dict.ready(zdic, req);
        };
        req.send(pieces.join('&'));
        return req;
    },

    href: function(params) {
        let keyword = encodeURIComponent(params['keyword']);
        let type = params['type'] || options['dict-langpair']['z'] ||
                   options.get('dict-langpair').defaultValue['z'];
        let pairs = [
            ['lb_a', 'hp'],
            ['lb_b', 'mh'],
            ['lb_c', 'mh'],
            ['tp', 'tp1'],
            ['q', keyword]
        ];
        let tp = type.slice(0, 1);
        let lb = type.slice(1);
        if (tp >=2)
            pairs[tp - 2] = [pairs[tp - 2][0], lb];
        pairs[3] = ['tp', 'tp' + tp];
        let pieces = [];
        pairs.forEach(function (pair) {
            pieces.push(pair.join('='));
        });
        return 'http://www.zdic.net/sousuo/?'+pieces.join('&');
    },

    process: function(text) {
        let ret = {
            notfound: false,
            pron: false,
            def: false,
            simple: false,
            full: false,
            audio: false
        };

        // 移除隐藏的网站宣传
        let style_pattern = /<style type="text\/css">[\s\S]*(zdct[0-9]+)[\s\S]*<\/style>/i;
        let classname = (style_pattern.test(text) && text.match(style_pattern)[1]) || false;
        if (classname) {
            let clearpattern = RegExp('<p class="'+classname+'">.*?<\\\/p>', 'ig');
            text = text.replace(clearpattern, '');
        }

        let doc = dict.htmlToDom(text, 'http://www.zdic.net/', true);

        // 移除添加到备忘录, 网友讨论
        var rems = doc.querySelectorAll('.badd,.bwladd,#wy,.secpan,.gdym,.annu_div,.ga,ga+div');
        if (rems.length) {
            Array.forEach(rems, function (i) {
                i.parentNode.removeChild(i);
            });
        }
        // TODO: 移除 comments, stylesheets, objects, javascripts
        var nodes = doc.getElementsByTagName('*');
        Array.forEach(nodes, function(node) {
            if (node && node.nodeType == Node.COMMENT_NODE || node.nodeName == 'SCRIPT' || node.nodeName == 'STYLE' || node.nodeName == 'LINK' || node.nodeName == 'IFRAME') {
                node.parentNode.removeChild(node);
            }
        });

        var _ret = zdic._simple(doc);
        ret['audio'] = _ret['audio'] ? _ret['audio'] : ret['audio'];
        ret['pron'] = _ret['pron'] ? _ret['pron'] : ret['pron'];
        ret['def'] = _ret['def'] ? _ret['def'] : ret['def'];
        ret['notfound'] = !ret['def'];
        ret['simple'] = ret['def'].replace(/\n|\r/g, ' ').replace(/\s\s+/g, ' ').slice(0, 200);
        ret['keyword'] = zdic.keyword;
        ret['full'] = zdic._full(doc);
        return ret;
    },

    _full: function(doc) {
        var full = {title: '', sub: {}};
        var simp = zdic._simple(doc);
        var keyword_url = zdic.href({keyword: simp['word']});
        if (simp['pron']) {
            full['title'] = '<p class="title">' +
            '<a href="'+keyword_url+'" target="_new" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+simp['word']+'</a>' +
                '<span>[' + simp['pron'] + ']</span>' +
                '</p>';
        } else {
            full['title'] = '<p class="title">' +
                '<a href="'+keyword_url+'" target="_blank" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+simp['word']+'</a>' +
            '</p>';
        }

        var explain = doc.querySelector('div#wrapper div#container div#content');
        if (explain)
            full['sub'][T(8)] = dict.tidy(explain);
        return full;
    },

    _simple: function(doc) {
        var simp = {};
        simp['word'] = decodeURIComponent(zdic.keyword);
        simp['pron'] = false; // TODO
        simp['audio'] = false; // TODO
        var def = doc.querySelector('#content');
        simp['def'] = def ? def.textContent.trim() : '';
        return simp;
    },

    generate: function(context, args) { // TODO 检查'日'字, <li><a href='/zd/zi3/ZdicF0ZdicA8Zdic96ZdicB9.htm' class='usual'>　<img src='http://www.zdic.net/zd/3s/285B9.gif' width='20'  height='20'> <span class='ef'>rì</span></a></li>
        let type = args['-l'] || options['dict-langpair']['z'] || options.get('dict-langpair').defaultValue['z'];
        let pairs = [
            ['lb', 'hp'],
            ['tp', 'tp1'],
            ['q', encodeURIComponent(args[0])]
        ];
        let tp = type.slice(0, 1);
        let lb = type.slice(1);
        if (tp >=2)
            pairs[0] = [pairs[0][0], lb];
        pairs[1] = ['tp', 'tp' + tp];
        let pieces = [];
        pairs.forEach(function (pair) {
                pieces.push(pair.join('='));
        });

        var req = new window.XMLHttpRequest();
        if (dict.suggestReq)
            dict.suggestReq.abort();
        dict.suggestReq = req;
        req.open('GET',
            'http://www.zdic.net/sousuo/ac/?'+pieces.join('&')
        );
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setRequestHeader('Referer', 'http://www.zdic.net/cy/ch/ZdicE9Zdic94ZdicA610728.htm');
        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.setRequestHeader('X-Prototype-Version', '1.5.0');
        var suggestions = [];
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var body = dict.htmlToDom(req.responseText);
                    var lis = body.querySelectorAll('.accy li');
                    if (lis.length) {
                        Array.forEach(lis, function (li) {
                                var r = {};
                                var href = li.getElementsByTagName('a')[0];
                                var span = href.getElementsByTagName('span')[0];
                                if (span) {
                                    r['e'] = span.textContent.trim();
                                    href.removeChild(span);
                                }
                                r['url'] = href.getAttribute('href');
                                r['g'] = href.textContent.trim();
                                r['e'] = r['e'] || r['g'];
                                suggestions.push(r); // trim blank chars
                        });
                    }
                    context.incomplete = false;
                    if (suggestions.length == 0 && args[0].trim().length > 0) // TODO
                        context.completions = [{url:zdic.href({keyword:args[0], type:args['-l']}), g:args[0], e:'自动补全查询结束, 无返回结果'}];
                    else
                        context.completions = suggestions;
                }
            }
        };
        req.send(null);

    }

};

let youdao = {
    name: T(35),
    keyword: '',
    logo: 'http://shared.ydstatic.com/r/1.0/p/dict-logo-s.png',
    favicon: 'http://shared.ydstatic.com/images/favicon.ico',
    init: function(keyword, args) {
        youdao.keyword = keyword;
        var req = new window.XMLHttpRequest();
        dict.req = req;
        req.open('GET', youdao.href({keyword: decodeURIComponent(keyword), le: args['-l']}));
        req.onreadystatechange = function(ev) {
            dict.ready(youdao, req);
        };
        req.send(null);
        return req;
    },
    href: function(params) {
        let keyword = encodeURIComponent(params['keyword']);
        let le = params['le'] || options['dict-langpair']['y'] || options.get('dict-langpair').defaultValue['y'];
        return 'http://dict.youdao.com/search?q=' +
                keyword + '&le=' + le + '&tab=chn';
    },
    html: '',
    process: function(text) {
        let ret = {
            notfound: false,
            pron: false,
            def: false,
            simple: false,
            full: false,
            audio: false
        };
        let doc = dict.htmlToDom(text, 'http://dict.youdao.com', true);
        let _ret = youdao._simple(doc);
        ret['audio'] = _ret['audio'] ? _ret['audio'] : ret['audio'];
        ret['pron'] = _ret['pron'] ? _ret['pron'] : ret['pron'];
        ret['def'] = _ret['def'] ? _ret['def'] : ret['def'];
        ret['notfound'] = !ret['def'];
        if (ret['pron'])
            ret['simple'] = _ret['word'] + ' [' + ret['pron'] + '] ' + ret['def'];
        else
            ret['simple'] = _ret['word'] + ' ' + ret['def'];
        ret['full'] = youdao._full(doc);
        ret['keyword'] = _ret['word'];
        return ret;
    },

    _simple: function(document) {
        var pron = document.querySelectorAll('#results .phonetic');
        var simple = {};
        simple['word'] = decodeURIComponent(youdao.keyword);
        simple['pron'] = pron.length ? pron[0].textContent.trim().replace(/^\[,?|\]$/g, '').replace(/, ,/g, ', ') : false; // @TODO: pron[0]
        var audio = document.querySelectorAll('#results .phonetic+a');
        simple['audio'] = false;
        if (audio.length) {
            let datarel = audio[0].getAttribute('data-rel'); // @TODO: audio[0]
            simple['audio'] = 'http://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(datarel) + '&le=' + (dict.args['-l'] || options['dict-langpair']['y'] || options.get('dict-langpair').defaultValue['y']);
        }
        var def = Array.map(Array.slice(document.querySelectorAll('#phrsListTab .trans-container>ul, #results-contents #jcTrans+.trans-container, #results-contents #wordGroup>ul')), function(node) node.textContent.trim().replace(/\s*\n+\s*/g, ' ')).join(' | ');
        simple['def'] = def.length ? def : false;
        return simple;
    },

    _full: function(document) {
        var full = {title: '', sub: {}};
        var simple = youdao._simple(document);
        var keyword_url = youdao.href({keyword: simple['word'], le: dict.args['-l']});
        if (simple['pron']) {
            full['title'] = '<p class="title">' +
            '<a href="'+keyword_url+'" target="_new" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+simple['word']+'</a>'+
                '<span>[' + simple['pron'] + ']</span>' +
            '</p>';
        } else {
            full['title'] = '<p class="title">' +
                '<a href="'+keyword_url+'" target="_blank" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+simple['word']+'</a>' +
            '</p>';
        }

        var def = document.querySelectorAll('#phrsListTab .trans-container>ul, #results-contents #jcTrans+.trans-container, #results-contents #wordGroup>ul');
        if (def.length)
            full['sub'][T(8)] = dict.tidyNodes(def, 'div');

        var collins = document.querySelector('#collins');
        if (collins)
            full['sub'][T(46)] = dict.tidy(collins);

        var twenty1st = document.querySelector('#tfdict');
        if (twenty1st)
            full['sub'][T(45)] = dict.tidy(twenty1st);

        var ph = document.querySelector('#wordGroup');
        if (ph)
            full['sub'][T(9)] = dict.tidy(ph);

        var syn = document.querySelector('#Synonyms');
        if (syn)
            full['sub'][T(10)] = dict.tidy(syn);

        var ex = document.querySelector('#examples');
        if (ex)
            full['sub'][T(18)] = dict.tidy(ex);

        var mor = document.querySelectorAll('#phrsListTab p');
        if (mor.length)
            full['sub'][T(13)] = dict.tidyNodes(mor, 'div');

        return full;
    },

    generate: function(context, args) {
        var req = new window.XMLHttpRequest();
        if (dict.suggestReq)
            dict.suggestReq.abort();
        dict.suggestReq = req;
        req.open('GET',
            'http://dsuggest.ydstatic.com/suggest/suggest.s?query=' + encodeURIComponent(args[0])
        );
        var suggestions = [];
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var text = unescape(req.responseText);
                    var result_arr = text.match(/this.txtBox.value=.+?">/g) || [];
                    result_arr = result_arr.map(function(str) {
                            return str.replace(/^this.txtBox.value=/, '').replace(/">$/, '');
                    });
                    result_arr.forEach(function(word) {
                            let r = {};
                            r['g'] = word;
                            r['e'] = word;
                            r['url'] = youdao.href({keyword: word, le: args['-l']});
                            suggestions.push(r);
                    });
                    context.incomplete = false;
                    if (suggestions.length == 0 && args[0].trim().length > 0) // TODO
                        context.completions = [{url:youdao.href({keyword:args[0], le:args['-l']}), g:args[0], e:'自动补全查询结束, 无返回结果'}];
                    else
                        context.completions = suggestions;
                }
            }
        };
        req.send(null);
    }
};

let qq = {
    name: T(25),
    keyword: '',
    logo: 'http://im-img.qq.com/inc/images/new_header2/logo.gif',
    favicon: 'http://dict.qq.com/favicon.ico',
    init: function(keyword, args) {
        var req = new window.XMLHttpRequest();
        dict.req = req;
        req.open('GET', 'http://dict.qq.com/dict?f=web&q='+keyword);
        req.setRequestHeader('Referer', 'http://dict.qq.com/');
        req.send(null);
        req.onreadystatechange = function(ev) {
            dict.ready(qq, req);
        };
        return req;
    },

    href: function (params) {
        const QQ_PREFIX = 'http://dict.qq.com/dict?f=cloudmore&q=';
        let keyword = encodeURIComponent(params['keyword']);
        return QQ_PREFIX + keyword;
    },

    process: function(text) {
        let j = JSON.parse(text);
        let ret = {
            notfound: false,
            pron: false,
            def: false,
            simple: false,
            full: false,
            audio: false
        };
        if (j['local']) {
            let _ret = qq._simple(j);
            ret['audio'] = _ret['audio'] ? _ret['audio'] : ret['audio'];
            ret['pron'] = _ret['pron'] ? _ret['pron'] : ret['pron'];
            ret['def'] = _ret['def'] ? _ret['def'] : ret['def'];
            if (ret['pron'])
                ret['simple'] = _ret['word'] + ' [' + ret['pron'] + '] ' + ret['def'];
            else
                ret['simple'] = _ret['word'] + ' ' + ret['def'];
            ret['keyword'] = _ret['word'];
            ret['full'] = qq._full(j);
        } else
            ret['notfound'] = true;
        return ret;
    },

    _full: function(e) {
        let local = e['local'];
        let t = local[0];
        let full = {title: '', sub: {}};
        let _simple = qq._simple(e);
        let keyword_url = qq.href({'keyword':_simple['word']});
        if (_simple['pron']) {
            full['title'] = '<p class="title">' +
            '<a href="'+keyword_url+'" target="_new" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+_simple['word']+'</a>'+
                '<span>['+_simple['pron']+']</span>'
            '</p>';
        } else {
            full['title'] = '<p class="title">' +
                '<a href="'+keyword_url+'" target="_blank" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+_simple['word']+'</a>'+
            '</p>';
        }
        if (t.des) { // Define
            let des = '';
            let gsen = [];
            if (t.sen)
                gsen = t.sen;
            t.des.forEach(function(item) {
                if (typeof item === 'string') {
                    let dt = '<dt><span>'+item+'</span></dt>';
                    des += '<dl>'+dt+'</dl>';
                } else {
                    if (item['p']) {
                        let pos = item['p'];
                        let sen = qq._digIntoSen(pos, gsen);
                        let dt = '<dt><span>'+item['p']+'</span><span>'+item['d']+'</span></dt>';
                        let dds = '';
                        if (sen) {
                            sen.s.forEach(function(single) {
                                    let es = single['es'];
                                    let cs = single['cs'];
                                    dds += '<dd>'+es+'</dd>';
                                    dds += '<dd>'+cs+'</dd>';
                            });
                        }
                        des += '<dl>'+dt+dds+'</dl>';
                    } else {
                        let dt = '<dt><span>'+item['d']+'</span></dt>';
                        des += '<dl>'+dt+'</dl>';
                    }
                }
            });
            full['sub'][T(8)] = '<div class="basic">' + dict.tidyStr(des) + '</div>';
        }

        if (e.netsen) {
            let o = '';
            Array.forEach(e.netsen, function(s) {
                o += '<dl><dt>' + s.es + '</dt>' +
                 '<dd><a href="' + s.url + '" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">' + s.cs + '</a></dd></dl>';
            });
            full['sub'][T(43)] = dict.tidyStr(o, 'div');
        }

        if (e.dlg) {
            let o = '';
            e.dlg.forEach(function (play, idx) {
                o += '<dl><b>' + (idx + 1) + '.' + play.t + play.s + '</b><dt>';
                o += '<dd style="padding-left:2em;">';
                play.c.forEach(function (sen) {
                    o += '<p>' + sen.n + ': ' + sen.es + '</p>';
                    o += '<p>&nbsp;&nbsp;&nbsp;' + sen.cs + '</p>';
                });
                o += '</dd></dl>';
            });
            full['sub'][T(44)] = dict.tidyStr(o, 'div');
        }

        if (t.ph) { // Related phrases
            let ph = '';
            t.ph.forEach(function(item) {
                let href = qq.href({'keyword': item['phs']});
                let phs = item['phs'];
                ph += '<li><a href="' + href + '" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">' + phs + '</a> ' + item['phd'] + '</li>';
            });
            full['sub'][T(9)] = dict.tidyStr(ph, 'ol');
        }

        if (t.syn) { // Synonyms
            let syn = '';
            t.syn.forEach(function(item) {
                item.c.forEach(function(single) {
                    let href = qq.href({'keyword': single});
                    syn += '<a href="' + href + '" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">' +
                           single + '</a>';
                });
            });
            full['sub'][T(12)] = '<p>' + T(10) + syn + '</p>';
        }
        if (t.ant) { // Antonyms
            let ant = '';
            t.ant.forEach(function(item) {
                item.c.forEach(function(single) {
                    let href = qq.href({'keyword': single});
                    ant += '<a href="' + href + '" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">' +
                           single + '</a>';
                });
            });
            if (full['sub'][T(12)])
                full['sub'][T(12)] += '<p>' + T(11) + ant + '</p>';
            else
                full['sub'][T(12)] = '<p>' + T(11) + ant + '</p>';
        }
        if (t.mor) { // Inflected
            let mor = '';
            t.mor.forEach(function(item) {
                item['m'] = dict.htmlToDom(item['m']).textContent.trim();
                let href = qq.href({'keyword': item['m']});
                mor += '<span><b>'+item['c']+'</b><a href="'+href+'" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+item['m']+'</a></span>';
            });
            full['sub'][T(13)] = '<p>' + mor + '</p>';
        }
        return full;
    },

    _simple: function(e) {
        let local = e['local'];
        let t = local[0];
        let _ret = {};
        _ret['word'] = dict.htmlToDom(t.word).textContent.trim();
        _ret['audio'] = 'http://dict.youdao.com/dictvoice?audio=' +
                encodeURIComponent(_ret['word']);
        if (t.pho)
            _ret['pron'] = dict.htmlToDom(t.pho.join(', ')).textContent.trim();
        if (t.des) {
            _ret['def'] = [];
            t.des.forEach(function(item) {
                    if (typeof(item) !== 'string') {
                        if (item['p'])
                            _ret['def'].push(item['p'] + ' ' + item['d']);
                        else
                            _ret['def'].push(item['d']);
                    } else {
                        _ret['def'].push(item);
                    }
            });
            _ret['def'] = dict.htmlToDom(_ret['def'].join(' | ')).
                textContent.trim();
        }
        return _ret;
    },

    _audioUri: function(str) {
        let prefix = 'http://speech.dict.qq.com/audio/';
        let uri = prefix + str[0] + '/' + str[1] +
                  '/' + str[2] + '/' + str + '.mp3';
        return uri;
    },

    _digIntoSen: function(pos, sen) {
        for (var i = 0; i < sen.length; i++) {
            if (sen[i]['p'] == pos)
                return sen[i];
        }
        return false;
    },

    generate: function(context, args) {
        var req = new window.XMLHttpRequest();
        if (dict.suggestReq)
            dict.suggestReq.abort();
        dict.suggestReq = req;
        req.open('GET',
            'http://dict.qq.com/sug?' + encodeURIComponent(args[0])
        );
        req.setRequestHeader('Referer', 'http://dict.qq.com/');
        var suggestions = [];
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var text = req.responseText.trim();
                    var result_arr = text.split('\n');
                    result_arr.forEach(function(line) {
                            if (line.trim().length == 0)
                                return false;
                            let pair = line.split('\t');
                            let r = {};
                            r['g'] = pair[0].trim();
                            r['e'] = pair[1].trim();
                            r['url'] = qq.href({'keyword': pair[0].trim()});
                            suggestions.push(r);
                    });
                    context.incomplete = false;
                    if (suggestions.length == 0 && args[0].trim().length > 0)
                        context.completions = [{url:qq.href({keyword:args[0]}), g:args[0], e:'自动补全查询结束, 无返回结果'}];
                    else
                        context.completions = suggestions;
                }
            }
        };
        req.send(null);
    }
};

let google = {
    name: T(34),
    favicon: 'http://translate.google.com/favicon.ico',
    logo: 'http://www.gstatic.com/translate/intl/en/logo.png',
    keyword: '',
    langpairs: '',
    _langpairs: function(langpair) {
        let langpairs = langpair.split('|');
        if (langpairs.length == 1) {
            langpairs[1] = langpairs[0] || 'auto';
            langpairs[0] = 'auto';
        } else {
            langpairs[0] = langpairs[0] || 'auto';
            langpairs[1] = langpairs[1] || 'auto';
        }
        return langpairs;
    },
    init: function(keyword, args) {
        let langpair = args['-l'] || options['dict-langpair']['g'] || options.get('dict-langpair').defaultValue['g'];
        let langpairs = google._langpairs(langpair);
        google.langpairs = langpairs;
        var req = new window.XMLHttpRequest();
        dict.req = req;
        req.open('GET',
            'http://translate.google.com/translate_a/t?client=t&hl=auto&sl='+langpairs[0]+'&tl='+langpairs[1]+'&text=' + keyword
        );
        req.onreadystatechange = function(ev) {
            dict.google(req);
        };
        req.send(null);
        return req;
    },
    href: function(params) {
        let langpair = params['le'] || options['dict-langpair']['g'] ||
            options.get('dict-langpair').defaultValue['g'];
        let langpairs = google._langpairs(langpair);
        let pairs = langpairs.concat([encodeURIComponent(params['keyword'])]);
        return 'http://translate.google.cn/#' + pairs.join('|');
    },
    genSimpleOutput: function(result) {
        let desc = result[0];
        let output = '';
        var values = [];
        if (desc) {
            desc.forEach(function(parag, i) {
                values[i] = parag[0];
            });
        }
        output = values.join('\n');
        let explain = result[1];
        if (explain) {
            explain.forEach(function(kind) {
                output += '\n';
                output += kind[0] + '. ';
                let es = kind[1].filter(function(i) i.trim().length);
                output += es.join('; ');
            });
        }
        return output;
    },
    genOutput: function(result) {
        let output = '';
        let desc = result[0];
        let pairs = google.langpairs.concat([dict.keyword]);
        pairs = pairs.join('|');
        var values = [];
        if (desc) {
            desc.forEach(function(parag, i) {
                parag.forEach(function(value, j) {
                        value = value.trim();
                        if (!value.length)
                            return false;
                        if (values[j])
                            values[j].push(value);
                        else
                            values[j] = [value];
                });
            });
            values.forEach(function(row) {
                output += '<p>' + row.join(' ') + '</p>';
            });
            output += '<a href="http://translate.google.com/#' + pairs + '" dactyl:highlight="URL" target="_blank" xmlns:dactyl="http://vimperator.org/namespaces/liberator">...</a>';
            output = '<div style="line-height:36px;font-size:18px;">' + output + '</div>';
        }
        let explain = result[1];
        if (explain) {
            explain.forEach(function(kind) {
                output += '<p>' + kind[0] + '. ';
                let es = kind[1].filter(function(i) i.trim().length);
                output += es.join('; ');
                output += '</p>';
            });
        }

        let words = result[5];

        if (words) {
            let assoc = '';
            words.forEach(function(word) {
                if (word[2]) {
                    assoc += '<span dactyl:highlight="Link LinkWord" xmlns:dactyl="http://vimperator.org/namespaces/liberator">'+word[2][0][0]+'<span style="white-space:nowrap;top:-1.6em;" dactyl:highlight="LinkInfo" xmlns:dactyl="http://vimperator.org/namespaces/liberator">';
                    assoc += '<b>' + word[0] + '</b> ';
                    assoc += word[2].map(function(i) i[0]).join('; ');
                    assoc += '</span></span>';
                }
            });

            output += '<p>' + assoc + '</p>';
        }
        output = '<div style="padding:40px;line-height:24px;width:600px;white-space:normal;">' + output + '</div>';
        return output;
    }
};

let dict_cn = {
    // http://dict.cn/tools.html
    name: T(24),
    keyword: '',
    url: '',
    template: '',
    favicon: 'http://dict.cn/favicon.ico',
    logo: 'http://dict.cn/imgs/logo_b.png',
    init: function(keyword, args) {
        var req = new window.XMLHttpRequest();
        dict.req = req;
        dict_cn.keyword = keyword;
        dict_cn.url = dict_cn.href({keyword: decodeURIComponent(keyword)});
        req.open('GET',
            'http://dict.cn/' + keyword
        );
        req.onreadystatechange = function(ev) {
            dict.ready(dict_cn, req);
        };
        req.send(null);
        return req;
    },

    href: function(params) {
        const DICT_CN_PREFIX = 'http://dict.cn/';
        let keyword = encodeURIComponent(params['keyword'].replace('.', '_2E'));
        return DICT_CN_PREFIX + keyword;
    },

    process: function(text) { // FIXME: kiss
        let ret = {
            notfound: true,
            pron: false,
            def: '',
            simple: false,
            full: false,
            audio: false // http://audio.dict.cn/mp3.php?q=YWVyP
        };
        let doc = dict.htmlToDom(text, 'http://dict.cn', true);
        let noword = doc.querySelectorAll('.no-word');

        if (true) {
            let _ret = dict_cn._simple(doc);
            if (_ret['pron'])
                _ret['simple'] = _ret['keyword'] + ' ' +
                        _ret['pron'] + ' ' + _ret['def'];
            else
                _ret['simple'] = _ret['keyword'] + ' ' + _ret['def'];
            _ret['full'] = dict_cn._full(doc);
            _ret['notfound'] = false;
            ret = update(ret, _ret);
        }
        return ret;
    },

    _simple: function(document) {
        let simple = {pron: '', keyword: decodeURIComponent(dict_cn.keyword),
            audio: false, def: ''}; // @TODO: audio
        let prons = document.querySelectorAll('.yinbiao');
        if (prons.length) {
            var pron_raws = [];
            Array.forEach(prons, function(pron) {
                pron_raws.push(pron.textContent.trim());
            });
            simple['pron'] = pron_raws.join(' ');
        }

        let def = document.querySelector('.cont-one:first-of-type');
        if (def) {
            simple['def'] = def.textContent.trim();
        }
        return simple;
    },

    // 解析单词词形变化
    _word_transform: function(document) {
        let transforms = document.querySelectorAll('#word-transform .w-change a');
        if (transforms.length) {
            let output = '<p class="title">';
            output += T(13) + ' :';
            Array.forEach(transforms, function(t) {
                    output += '<span><span>' + t.getAttribute('desc') + '</span> <span><a href="' + dict_cn.href({keyword: t.textContent}) + '">' + t.textContent + '</a></span></span>';
            });
            output += '</p>';
            return output;
        } else {
            let word_change = document.querySelector('#word-transform .w-change');
            if (word_change) {
                let wc = word_change.textContent.trim();
                if (wc)
                    return '<p class="title">' + wc + '</p>';
            }
            return '';
        }
    },

    _full: function(document) {
        var full = {title: '', sub: {}};
        var simple = dict_cn._simple(document);
        var keyword_url = dict_cn.href({keyword: simple['keyword']});
        if (simple['pron']) {
            full['title'] = '<p class="title">' +
            '<a href="' + keyword_url + '" target="_new" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">' + simple['keyword'] + '</a>' +
                '<span>' + simple['pron'] + '</span><span>' + simple['def'] + '</span>' +
            '</p>';
        } else {
            full['title'] = '<p class="title">' +
                '<a href="' + keyword_url + '" target="_blank" dactyl:highlight="URL" xmlns:dactyl="http://vimperator.org/namespaces/liberator">' + simple['keyword'] + '</a>' +
                '<span>' + simple['def'] + '</span>' +
                '</p>';
        }

        let transforms = dict_cn._word_transform(document);
        if (transforms) {
            full['title'] += transforms;
            full['title'] = '<div>' + dict.tidyStr(full['title']) + '</div>';
        }

        let titles = document.querySelectorAll('.tab h6 span');
        let contents = document.querySelectorAll('.tab .tabcontent');

        Array.forEach(titles, function(title, idx) {
            if (contents[idx]) {
                let pieces = contents[idx].querySelectorAll('.cont-one');
                if (pieces.length) {
                    let t = title.textContent.trim();
                    full['sub'][t] = dict.tidyNodes(pieces, 'div');
                }
            }
        });
        return full;
    },

    generate: function(context, args) {
        let req = new window.XMLHttpRequest();
        if (dict.suggestReq)
            dict.suggestReq.abort();
        dict.suggestReq = req;
        req.open('GET',
            'http://dict.cn/apis/suggestion.php?callback=hook&dict=dict&q=' +
            encodeURIComponent(args[0])
        );
        let suggestions = [];
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    try {
                        let sb = new Components.utils.Sandbox('http://www.example.com/');
                        sb.hook = function() arguments[0];
                        let result_arr = Components.utils.evalInSandbox(req.responseText, sb);
                        result_arr['s'].forEach(function(r) {
                            r['e'] = dict.htmlToDom(r['e'].trim()).textContent;
                            r['g'] = r['g'].trim();
                            r['url'] = dict_cn.href({keyword: r['g']});
                            suggestions.push(r);
                        });
                    } finally {
                        context.incomplete = false;
                        if (suggestions.length == 0 && args[0].trim().length > 0) // TODO
                            context.completions = [{url:dict_cn.href({keyword:args[0]}), g:args[0], e:'自动补全查询结束, 无返回结果'}];
                        else
                            context.completions = suggestions;
                    }
                } else {
                    if (req.status == 404) {
                        // 辞海的自动补全需要 cookie
                        // 因此我们对dict.cn请求一次
                        var xhr = new window.XMLHttpRequest();
                        xhr.open('GET', 'http://en.dict.cn/api/article/hotwords');
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4) {
                                if (xhr.status !== 200)
                                    dict_cn._fix();
                                dict_cn.generate(context, args);
                            }
                        };
                        xhr.send(null);
                    }
                }
            }
        };
        req.send(null);
    },

    _fix: function() {
        var cookieUri = services.io.newURI('http://dict.cn', null, null);

        // check 'dictsid' cookie whether exists
        var cookie = services.cookies.getCookieString(cookieUri, null) || '';

        var hasDictsid = cookie.split('; ').some(function(item) {
            var parts = item.split('=');

            if (parts.length == 2 && parts[0] == 'dictsid')
                return true;

            return false;
        });

        // if not exists, then create it
        if (!hasDictsid) {
            var expireDate = new Date();
            expireDate.setMonth(expireDate.getMonth() + 1);
            var cookieString = 'dictsid=0;domain=.dict.cn;expires=' +
                               expireDate.toUTCString();
            services.cookies.setCookieString(cookieUri, null, cookieString, null);
        }
    }
}

let dict = {
    engines: {'d' : dict_cn, 'g' : google, 'q': qq, 'y': youdao, 'z': zdic, 'w': wikipedia},
    get DBConn() {
        if (dict._DBConn)
            return dict._DBConn;
        // https://developer.mozilla.org/En/Storage
        Components.utils.import('resource://gre/modules/Services.jsm');
        Components.utils.import('resource://gre/modules/FileUtils.jsm');

        let file = FileUtils.getFile('ProfD', ['dict.js.sqlite']);
        let DBConn = Services.storage.openDatabase(file); // Will also create the file
        //
        // id, key, engine, word, lp, simple, all, create_time, frequency
        let dict_js = 'id            INTEGER PRIMARY KEY, ' +
                      'key           TEXT NOT NULL DEFAULT "{}", ' +
                      'engine        TEXT NOT NULL DEFAULT "d", ' +
                      'word          TEXT NOT NULL DEFAULT "", ' +
                      'lp            TEXT DEFAULT "", ' +
                      'simple        TEXT DEFAULT "", ' +
                      'ret           TEXT DEFAULT "", ' +
                      'create_time   INTEGER DEFAULT 0, ' +
                      'frequency     INTEGER DEFAULT 1';
        try {
            DBConn.createTable('dict_js', dict_js);
            DBConn.executeSimpleSQL('CREATE  INDEX "main"."search" ON "dict_js" ("key" ASC, "engine" ASC, "word" ASC, "lp" ASC)');
            dict._DBConn = DBConn;
            return dict._DBConn;
        } catch (e) { // Table already exists or the requested table couldn't be created.
            // dactyl.echoerr(e.message); // do nth
        }
        dict._DBConn = DBConn;
        return dict._DBConn;
    },
    fl: [ // From:
        ['auto', 'Auto Detect language'],
        ['en', 'English'],
        ['zh', 'Chinese'],
        ['zh-CN', 'Chinese (Simplified)'],
        ['zh-TW', 'Chinese (Traditional)'],
        ['ja', 'Japanese'],
        ['ko', 'Korean'],
        ['af', 'Afrikaans'],
        ['sq', 'Albanian'],
        ['ar', 'Arabic'],
        ['hy', 'Armenian'],
        ['az', 'Azerbaijani'],
        ['eu', 'Basque'],
        ['be', 'Belarusian'],
        ['bn', 'Bengali'],
        ['bg', 'Bulgarian'],
        ['ca', 'Catalan'],
        ['hr', 'Croatian'],
        ['cs', 'Czech'],
        ['da', 'Danish'],
        ['nl', 'Dutch'],
        ['eo', 'Esperanto'],
        ['et', 'Estonian'],
        ['tl', 'Filipino'],
        ['fi', 'Finnish'],
        ['fr', 'French'],
        ['gl', 'Galician'],
        ['ka', 'Georgian'],
        ['de', 'German'],
        ['el', 'Greek'],
        ['gu', 'Gujarati'],
        ['ht', 'Haitian Creole'],
        ['iw', 'Hebrew'],
        ['hi', 'Hindi'],
        ['hu', 'Hungarian'],
        ['is', 'Icelandic'],
        ['id', 'Indonesian'],
        ['ga', 'Irish'],
        ['it', 'Italian'],
        ['kn', 'Kannada'],
        ['la', 'Latin'],
        ['lv', 'Latvian'],
        ['lt', 'Lithuanian'],
        ['mk', 'Macedonian'],
        ['ms', 'Malay'],
        ['mt', 'Maltese'],
        ['no', 'Norwegian'],
        ['fa', 'Persian'],
        ['pl', 'Polish'],
        ['pt', 'Portuguese'],
        ['ro', 'Romanian'],
        ['ru', 'Russian'],
        ['sr', 'Serbian'],
        ['sk', 'Slovak'],
        ['sl', 'Slovenian'],
        ['es', 'Spanish'],
        ['sw', 'Swahili'],
        ['sv', 'Swedish'],
        ['ta', 'Tamil'],
        ['te', 'Telugu'],
        ['th', 'Thai'],
        ['tr', 'Turkish'],
        ['uk', 'Ukrainian'],
        ['ur', 'Urdu'],
        ['vi', 'Vietnamese'],
        ['cy', 'Welsh'],
        ['yi', 'Yiddish']
    ],
    tl: [ // To:
        ['en', 'English'],
        ['zh', 'Chinese'],
        ['zh-CN', 'Chinese (Simplified)'],
        ['zh-TW', 'Chinese (Traditional)'],
        ['ja', 'Japanese'],
        ['ko', 'Korean'],
        ['af', 'Afrikaans'],
        ['sq', 'Albanian'],
        ['ar', 'Arabic'],
        ['hy', 'Armenian'],
        ['az', 'Azerbaijani'],
        ['eu', 'Basque'],
        ['be', 'Belarusian'],
        ['bn', 'Bengali'],
        ['bg', 'Bulgarian'],
        ['ca', 'Catalan'],
        ['hr', 'Croatian'],
        ['cs', 'Czech'],
        ['da', 'Danish'],
        ['nl', 'Dutch'],
        ['eo', 'Esperanto'],
        ['et', 'Estonian'],
        ['tl', 'Filipino'],
        ['fi', 'Finnish'],
        ['fr', 'French'],
        ['gl', 'Galician'],
        ['ka', 'Georgian'],
        ['de', 'German'],
        ['el', 'Greek'],
        ['gu', 'Gujarati'],
        ['ht', 'Haitian Creole'],
        ['iw', 'Hebrew'],
        ['hi', 'Hindi'],
        ['hu', 'Hungarian'],
        ['is', 'Icelandic'],
        ['id', 'Indonesian'],
        ['ga', 'Irish'],
        ['it', 'Italian'],
        ['kn', 'Kannada'],
        ['la', 'Latin'],
        ['lv', 'Latvian'],
        ['lt', 'Lithuanian'],
        ['mk', 'Macedonian'],
        ['ms', 'Malay'],
        ['mt', 'Maltese'],
        ['no', 'Norwegian'],
        ['fa', 'Persian'],
        ['pl', 'Polish'],
        ['pt', 'Portuguese'],
        ['ro', 'Romanian'],
        ['ru', 'Russian'],
        ['sr', 'Serbian'],
        ['sk', 'Slovak'],
        ['sl', 'Slovenian'],
        ['es', 'Spanish'],
        ['sw', 'Swahili'],
        ['sv', 'Swedish'],
        ['ta', 'Tamil'],
        ['te', 'Telugu'],
        ['th', 'Thai'],
        ['tr', 'Turkish'],
        ['uk', 'Ukrainian'],
        ['ur', 'Urdu'],
        ['vi', 'Vietnamese'],
        ['cy', 'Welsh'],
        ['yi', 'Yiddish']
    ],
    languages: [
        ['zh', 'Chinese'],
        ['zh-CN', 'Chinese Simplified'],
        ['zh-TW', 'Chinese Traditional'],
        ['ja', 'Japanese'],
        ['ko', 'Korean'],
        ['en', 'English'],
        ['af', 'Afrikaans'],
        ['sq', 'Albanian'],
        ['am', 'Amharic'],
        ['ar', 'Arabic'],
        ['hy', 'Armenian'],
        ['az', 'Azerbaijani'],
        ['eu', 'Basque'],
        ['be', 'Belarusian'],
        ['bn', 'Bengali'],
        ['bh', 'Bihari'],
        ['br', 'Breton'],
        ['bg', 'Bulgarian'],
        ['my', 'Burmese'],
        ['ca', 'Catalan'],
        ['chr', 'Cherokee'],
        ['co', 'Corsican'],
        ['hr', 'Croatian'],
        ['cs', 'Czech'],
        ['da', 'Danish'],
        ['dv', 'Dhivehi'],
        ['nl', 'Dutch'],
        ['eo', 'Esperanto'],
        ['et', 'Estonian'],
        ['fo', 'Faroese'],
        ['tl', 'Filipino'],
        ['fi', 'Finnish'],
        ['fr', 'French'],
        ['fy', 'Frisian'],
        ['gl', 'Galician'],
        ['ka', 'Georgian'],
        ['de', 'German'],
        ['el', 'Greek'],
        ['gu', 'Gujarati'],
        ['ht', 'Haitian Creole'],
        ['iw', 'Hebrew'],
        ['hi', 'Hindi'],
        ['hu', 'Hungarian'],
        ['is', 'Icelandic'],
        ['id', 'Indonesian'],
        ['iu', 'Inuktitut'],
        ['ga', 'Irish'],
        ['it', 'Italian'],
        ['jw', 'Javanese'],
        ['kn', 'Kannada'],
        ['kk', 'Kazakh'],
        ['km', 'Khmer'],
        ['ku', 'Kurdish'],
        ['ky', 'Kyrgyz'],
        ['lo', 'Lao'],
        ['la', 'Latin'],
        ['lv', 'Latvian'],
        ['lt', 'Lithuanian'],
        ['lb', 'Luxembourgish'],
        ['mk', 'Macedonian'],
        ['ms', 'Malay'],
        ['ml', 'Malayalam'],
        ['mt', 'Maltese'],
        ['mi', 'Maori'],
        ['mr', 'Marathi'],
        ['mn', 'Mongolian'],
        ['ne', 'Nepali'],
        ['no', 'Norwegian'],
        ['oc', 'Occitan'],
        ['or', 'Oriya'],
        ['ps', 'Pashto'],
        ['fa', 'Persian'],
        ['pl', 'Polish'],
        ['pt', 'Portuguese'],
        ['pt-PT', 'Portuguese Portugal'],
        ['pa', 'Ppnjabi'],
        ['qu', 'Qpechua'],
        ['ro', 'Rpmanian'],
        ['ru', 'Rpssian'],
        ['sa', 'Sanskrit'],
        ['gd', 'Scots Gaelic'],
        ['sr', 'Serbian'],
        ['sd', 'Sindhi'],
        ['si', 'Sinhalese'],
        ['sk', 'Slovak'],
        ['sl', 'Slovenian'],
        ['es', 'Spanish'],
        ['su', 'Sundanese'],
        ['sw', 'Swahili'],
        ['sv', 'Swedish'],
        ['syr', 'Syriac'],
        ['tg', 'Tajik'],
        ['ta', 'Tamil'],
        ['tt', 'Tatar'],
        ['te', 'Telugu'],
        ['th', 'Thai'],
        ['bo', 'Tibetan'],
        ['to', 'Tonga'],
        ['tr', 'Turkish'],
        ['uk', 'Ukrainian'],
        ['ur', 'Urdu'],
        ['uz', 'Uzbek'],
        ['ug', 'Uighur'],
        ['vi', 'Vietnamese'],
        ['cy', 'Welsh'],
        ['yi', 'Yiddish'],
        ['yo', 'Yoruba'],
        ['', 'Unknown']
    ],
    get req() dict._req || null,
    set req(req) {
        if (dict.req)
            dict.req.abort();
        dict._req = req;

        // show progressing
        var self = this;
        var p = document.getElementById('statusbar-display');
        req.addEventListener('loadstart', function(evt) {
            if (self.timeoutid) {
                window.clearTimeout(self.timeoutid);
                delete self.timeoutid;
            }
            self.timeoutid = window.setTimeout(function() {
                    p.label = T(6);
                    self.intervalid = window.setInterval(function() {p.label = T(6);}, 400);
                    delete self.timeoutid;
                },
                400);
        },
        false);
        ['load', 'error', 'abort'].forEach(function(st) { // loadend
            req.addEventListener(st, function(evt) {
                if (self.timeoutid) {
                    window.clearTimeout(self.timeoutid);
                    delete self.timeoutid;
                } else {
                    p.label = '';
                    window.clearInterval(self.intervalid);
                    delete self.intervalid;
                }
            },
            false);
        });
    },
    get langpairs()  {
        if (!dict._langpairs) {
            let cpt = [];
            for (let [, [inabbr, inlang]] in Iterator(dict.tl))
                cpt.push([inabbr, T(2) + dict.fl[0][1] + T(3) + inlang]);
            for (let [, [abbr, lang]] in Iterator(dict.fl)) {
                for (let [, [inabbr, inlang]] in Iterator(dict.tl)) {
                    if (abbr == inabbr)
                        continue;
                    cpt.push([abbr+'|'+inabbr, T(2) + lang + T(3) + inlang]);
                }
            }
            for (let [, [inabbr, inlang]] in Iterator(dict.tl))
                cpt.push(['|' + inabbr, T(2) + dict.fl[0][1] + T(3) + inlang]);
            dict._langpairs = cpt;
        }
        return dict._langpairs;
    },
    set langpairs(langpairs) {
        dict._langpairs = langpairs;
    },
    get keyword() dict._keyword,
    set keyword(keyword) {
        dict._keyword = encodeURIComponent(keyword.trim());
    },

    get timeout() dict._timeout || null,
    set timeout(timeout) {
        if (dict.timeout)
            dict.timeout.cancel();
        dict._timeout = timeout;
    },

    get engine() dict.engines[dict._route(dict.args)],
    args: {},
    init: function(args) {
        if (args['-h'] && args['-h']=='clear') {
            let clearWord = args[0] || '';
            if (clearWord.trim().length == 0) {
                commandline.input('你确定要删除所有记录吗 (y/n) ? : ', function (word) {
                    if (word == 'y' || word == 'Y')
                        dict.clearCache(args);
                })
            } else
                dict.clearCache(args);
            return true;
        }
        dict.args = args;
        let keyword = args[0] || '';
        keyword = keyword.trim();
        if (keyword.length == 0)
            keyword = dict._selection() || '';
        keyword = keyword.trim();
        let engine = dict._route();
        let lp = args['-l'] || options['dict-langpair'][engine] || options.get('dict-langpair').defaultValue[engine] || '';

        let opener = false;
        if (args['-t'])
            opener = {where:dactyl.CURRENT_TAB};
        if (dactyl.forceTarget)
            opener = {where:dactyl.forceTarget};
        if (dactyl.forceBackground)
            opener = {background:true, where:dactyl.NEW_TAB};
        if (keyword.length == 0) {
            CommandPromptMode(T(4), update({onSubmit: function(keyword) {
                    var keyword = keyword.trim();
                    if (!keyword)
                        return false;
                    dict.keyword = keyword;
                    if (opener)
                        return dactyl.open(dict.engine.href({keyword:decodeURIComponent(dict.keyword), le: args['-l'], type: args['-l']}), opener);

                    let key = dict.generateKey(keyword, engine, lp || '');
                    let ret = dict.getCache(key);
                    if (ret)
                        dict.process(ret);
                    else {
                        dict.cacheKey = key;
                        dict.engine.init(dict.keyword, args);
                    }
                }},
                {
                    completer: function (context/*, args*/) { // todo
                        args[0] = commandline.command;
                        if (args[0] && args[0] !== '-')
                            dict.suggest(context, args);
                        context.fork('words_history', 0, this, function (context) dict.cacheSuggest(context, args));
                    },
                    historyKey: 'dict.js'
                }
            )).open(options['dict-clipboard'] ? dactyl.clipboardRead() : '');
        } else {
            dict.keyword = keyword;
            if (opener)
                return dactyl.open(dict.engine.href({keyword:decodeURIComponent(dict.keyword), le: args['-l'], type: args['-l']}), opener);
            let key = dict.generateKey(keyword, engine, lp||'');
            let ret = dict.getCache(key);
            if (ret)
                dict.process(ret);
            else {
                dict.cacheKey = key;
                dict.engine.init(dict.keyword, args);
            }
        }
    },

    getCache: function (key) { // 保存声音?
        var updateStatement = dict.DBConn.createStatement('UPDATE dict_js SET frequency=frequency+1 WHERE KEY = :key');
        updateStatement.params.key = key;
        updateStatement.execute();
        let statement = dict.DBConn.createStatement('SELECT ret FROM dict_js WHERE key = :key ORDER BY frequency DESC, create_time DESC');
        statement.params.key = key;
        var ret = false
        while (statement.executeStep())
            ret = JSON.parse(statement.row.ret);
        return ret;
    },

    storeCache: function(ret) {
        let _arguments = JSON.parse(dict.cacheKey);
        let create_time = (new Date()).getTime();
        let _ret = JSON.stringify(ret);
        var statement = dict.DBConn.createStatement(
            'INSERT INTO dict_JS ' +
            '(key, word, engine, lp, simple, ret, create_time) ' +
            'VALUES (:key, :word, :engine, :lp, :simple, :ret, :create_time)'
        );
        statement.params.key = dict.cacheKey;
        statement.params.word = _arguments[0];
        statement.params.engine = _arguments[1];
        statement.params.lp = _arguments[2];
        statement.params.simple = ret['simple'];
        statement.params.ret = _ret;
        statement.params.create_time = create_time;

        statement.execute();
    },

    clearCache: function(/*args*/) {
        let args = arguments[0];
        let word = args[0] || '';
        if (word.length == 0) {
            dict.DBConn.executeSimpleSQL('DELETE FROM dict_js');
            dactyl.echo('All words has been clear out!');
        } else {
            let engine = args['-e'] || options['dict-engine'] || options.get('dict-engine').defaultValue;
            let lp = args['-l'] || options['dict-langpair'][engine] || options.get('dict-langpair').defaultValue[engine] || '';
            var statement = dict.DBConn.createStatement(
                'DELETE FROM dict_JS ' +
                'WHERE word = :word AND engine = :engine AND lp = :lp'
            );
            statement.params.word = word;
            statement.params.engine = engine;
            statement.params.lp = lp;
            statement.executeAsync({
                    handleResult: function(aResultSet) {
                        ; // do nth
                    },

                    handleError: function(aError) {
                        print('Error: ' + aError.message);
                    },

                    handleCompletion: function(aReason) {
                        if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
                            print('Query canceled or aborted!');
                        else
                            dactyl.echo('"' + word + '" has been removed!');
                    }
            });

        }
    },

    cacheSuggest: function(context, args) {
        // TODO item.command/item.id ??? invalid???
        var url = function(item, text)
        ['a', {'identifier': (item.id || ''), 'dactyl:command': (item.command || ''), 'href': item.item.url, 'dactyl:highlight': 'URL', 'xmlns:dactyl': NS, 'title': text || ''}, text || ''];
        context.title = ['Words from history!'];
        context.keys = {'text':'word', 'description':'desc'};
        context.process[1] = url;
        context.filterFunc = null;
        context.filter = (args[0] || '').trim();
        context.compare = null;
        context.key = encodeURIComponent((args[0]||'_NULL').trim());
        if (!context.itemCache[context.key]) {
            context.updateAsync = true;
            context.incomplete = true;
            context.regenerate = true;
        }
        context.generate = function () {
            let e = dict._route(args);
            let lp = args['-l'] || options['dict-langpair'][e] || options.get('dict-langpair').defaultValue[e] || '';
            dict.cacheGenerate((args[0] || '').trim(), e, lp, context);
        };
    },

    cacheGenerate: function(word, engine, lp, context) {
        var engineObj = dict.engines[engine];
        var statement = dict.DBConn.createStatement('SELECT word,simple FROM dict_js WHERE engine = :engine AND lp = :lp AND word LIKE :word ORDER BY frequency DESC, create_time DESC LIMIT 15');
        statement.params.engine=engine;
        statement.params.lp=lp;
        statement.params.word = word+'%';
        var completions = [];
        statement.executeAsync({
                handleResult: function(aResultSet) {
                    for (let row = aResultSet.getNextRow();
                        row;
                        row = aResultSet.getNextRow()) {
                        let word = row.getResultByName('word');
                        let url = engineObj.href({keyword:word, le: lp, type: lp})
                        let desc = row.getResultByName('simple');
                        if (desc.trim().length==0)
                            continue;
                        completions.push({word:word, desc:desc, url:url});
                    }
                },

                handleError: function(aError) {
                    print('Error: ' + aError.message);
                },

                handleCompletion: function(aReason) {
                    if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
                        print('Query canceled or aborted!');
                    context.incomplete = false;
                    context.completions = completions;
                    context.regenerate = false;
                }
        });
    },

    process: function(ret) {
        // audio
        if (ret['audio'])
            dict._play(ret['audio']);
        else {
            if (/^[\u0001-\u00ff']+$/.test(decodeURIComponent(dict.keyword))) { // 0-255, 全半角标点?
                // var uri = 'http://translate.google.com/translate_tts?q=' + dict.keyword; // FIXME: 当keyword过长时，应该分词
                // http://dict.youdao.com/dictvoice?audio=you_are_welcome&le=en
                var uri = 'http://dict.youdao.com/dictvoice?audio=' + dict.keyword; // TODO: support langpair
                dict._play(uri);
            } else {
                var req = new window.XMLHttpRequest();
                req.open('GET',
                    'http://translate.google.com/translate_a/t?client=t&hl=auto&sl=auto&tl=en&text=' + dict.keyword
                );
                req.onreadystatechange = function (ev) {
                    if (req.readyState == 4) {
                        if (req.status == 200) {
                            let sb = new Components.utils.Sandbox('http://www.example.com/');
                            let g = Components.utils.evalInSandbox(req.responseText, sb);
                            let le = g[8][0][0];
                            dict.speak(dict.getSoundUriByLocaleKeyword(le, decodeURIComponent(dict.keyword)));
                        }
                    }
                };
                req.send(null);
            }
        }

        if (ret['notfound']) {
            dactyl.echo(T(19) + decodeURIComponent(dict.keyword), commandline.FORCE_SINGLELINE);
            dict.timeout = dactyl.timeout(ex.redraw, 3000);
        } else {
            var show = options.get('dict-show').value;
            if (dict.args['-o'])
                show = dict.args['-o'];
            switch ( show ) {
                case 's' :
                var invert = options.get('dict-simple').value;
                if (dict.args.bang)
                    invert = !invert;
                if (invert) {
                    dactyl.echomsg(ret['simple'], 0, commandline.FORCE_SINGLELINE);
                    dict.timeout = dactyl.timeout(ex.redraw, 15000); // TODO: clickable, styling
                } else {
                    let list = dict.details(ret);
                    let id = 'dict_js_'+(dict.args['-e'] || options['dict-engine'] || options.get('dict-engine').defaultValue)
                    let article = DOM.fromJSON(['div', {'xmlns': XHTML}, ''], document);
                    article.innerHTML = STYLE + dict.tidyStr(list);
                    dactyl.echo(['div', {'id': id, 'class': 'dict_block', 'xmlns': XHTML}, article], commandline.FORCE_MULTILINE);
                }
                break;

                case 'a':
                dict._alert(ret);
                break;

                case 'n':
                dict._notification(ret);
                break;

                default:
                break;
            }
        }
    },

    details: function(ret) {
        let sub = ret['full']['sub'];
        let title = ret['full']['title'];
        let items = '<div class="title">' + title + '</div>';
        for ( var prop in sub ) {
            items += '<div><h4 style="margin-left:1em;">' +
                     prop + '</h4><div style="margin-left:3em;">' +
                     sub[prop] + '</div></div>';
        }
        return items;
    },

    ready: function(worker, req) {
        if (req.readyState == 4) {
            let ret = {};
            if (req.status == 200) {
                ret = worker.process(req.responseText);
                if (!ret.notfound)
                    dict.storeCache(ret);
                dict.process(ret);
            } else
                dict.error(req.status);
            req.onreadystatechange = function() {};
        }
    },

    google: function(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let sb = new Components.utils.Sandbox('http://www.example.com/');
                let g = Components.utils.evalInSandbox(req.responseText, sb);
                let show = options.get('dict-show').value || options.get('dict-show').defaultValue;
                if (dict.args['-o'])
                    show = dict.args['-o'];

                let pairs = google.langpairs.concat([dict.keyword]);
                pairs = pairs.join('|');

                switch (show) {
                    case 's':
                    let article = DOM.fromJSON(['div', {}, ''], document);
                    article.innerHTML = dict.tidyStr(google.genOutput(g));
                    dactyl.echo(['div', {}, article]);
                    if (!mow.visible)
                        dict.timeout = dactyl.timeout(ex.redraw, 10000);
                    break;

                    case 'a':
                    PopupNotifications.show(window.gBrowser.selectedBrowser, 'dict-popup',
                        google.genSimpleOutput(g),
                        'dict-popup-anchor', /* anchor ID */
                        {
                            label: T(5),
                            accessKey: 'S',
                            callback: function() {
                                dactyl.open('http://translate.google.com/#' + pairs , {background:false, where:dactyl.NEW_TAB});
                            }
                        },
                        null,  /* secondary action */
                        {
                            timeout: Date.now() + 15000
                        }
                    );
                    ex.style('chrome://* .popup-notification-icon[popupid="dict-popup"] { background:transparent url("'+dict.engine.logo+'") no-repeat left top;background-size:contain contain;}');
                    break;

                    case 'n':
                    let notify = Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService);
                    let listener = {
                        observe: function(subject, topic, data) {
                            if (topic == 'alertclickcallback')
                                dactyl.open(data, {background:true, where:dactyl.NEW_TAB});
                        }
                    };
                    let title = T(34);
                    notify.showAlertNotification(null, title, google.genSimpleOutput(g), true, 'http://translate.google.com/#' + pairs, listener, 'dict-js-popup');
                    break;

                    default:
                    break;
                }
                // tts
                if (/^[\u0001-\u00ff']+$/.test(decodeURIComponent(dict.keyword))) { // 0-255
                    var uri = 'http://dict.youdao.com/dictvoice?audio=' + dict.keyword; // TODO: support langpair
                    dict._play(uri);
                } else {
                    let le = g[8][0][0];
                    var uri = '';
                    if (['en', 'fr', 'ko', 'ja'].indexOf(le) + 1) {
                        le = ['eng','fr', 'ko', 'jap'][['en', 'fr', 'ko', 'ja'].indexOf(le)];
                        uri = 'http://dict.youdao.com/dictvoice?audio='+dict.keyword+'&le='+le;
                    } else
                        uri = 'http://translate.google.com/translate_tts?ie=UTF-8&q='+dict.keyword+'&tl='+le+'&prev=input';
                    dict._play(uri);
                }
            } else
                dict.error(req.status);
            req.onreadystatechange = function() {};
        }
    },

    suggest: function(context, args) {
        let engine = dict.engines[dict._route(args)];

        var url = function(item, text)
        ['a', {'identifier': (item.id || ''), 'dactyl:command': (item.command || ''), 'href': item.item.url, 'dactyl:highlight': 'URL', 'xmlns:dactyl': NS, 'title': text || ''}, text || ''];
        context.title = [T(14) + ' - ' + engine.name,T(15)];
        context.keys = {'text':'g', 'description':'e'};
        context.compare = null;
        context.filterFunc = null;
        context.process[1] = url;
        let dash_e = args['-e'] || options.get('dict-engine').value || options.get('dict-engine').defaultValue;
        let dash_l = '1024'; // 没实际用处,降低 context.key 意外相等的可能性
        if ('yz'.indexOf(dash_e) + 1)
            dash_l += args['-l'] || options['dict-langpair'][dash_e] || options.get('dict-langpair').defaultValue[dash_e];
        context.key = encodeURIComponent(dash_e+dash_l+args[0].trim()); // TODO
        if (!context.itemCache[context.key] || context.itemCache[context.key].length == 0) {
            context.updateAsync = true;
            context.incomplete = true;
            context.regenerate = true;
        }

        if (!engine.generate)
            engine = dict_cn;
        context.generate = function () engine.generate(context, args);

        /*context.fork('words_buffer', 0, this, function (context) {
                 var keyword = args.join(' ').trim();
                 if (keyword.length < 3)
                     return;
                 var words = content.document.body.textContent.split(/\:|\'|\[|\]|\.|,|\s|\t|\n/).filter(function(i) {
                         return i.length >= 3 && /^[\-\.a-zA-Z]+$/.test(i);
                 }).map(function(i) {
                         return i.toLowerCase().replace(/^\.|\.$/g, '');
                 }).filter(function(i, index, allwords) {
                         return (allwords.indexOf(i) == index) && (i.indexOf(keyword.toLowerCase()) > -1);
                 });
                 var completions = [];
                 words.forEach(function(r) {
                         completions.push([r]);
                 });
                 context.title = ['Words from current buffer!'];
                 context.completions = completions;
        });*/
    },

    generateKey: function () JSON.stringify(Array.slice(arguments)), // keyword, engine, langpair

    optsCompleter: function(context, extra) {
        context.quote = ['', util.identity, ''];
        context.compare = null;
        let youdao_completions = [
            ['eng', T(36)],
            ['jap', T(39)],
            ['ko', T(38)],
            ['fr', T(37)]
        ];
        let zdic_completions = [
            ['1hp', '条目 - 请直接输入汉字或词语进行查询，支持拼音查询，例：“han”;“han4”;“han yu”;“han4 yu3”'],
            ['2hp', '字典 - 汉字或拼音 - 康 => 康 | xing => 星,形,醒幸'],
            ['2bis', '字典 - 笔顺    - 12345 =>李,札,权,杨'],
            ['2wb86', '字典 - 五笔86编码 - iwz => 举,兴'],
            ['2cj', '字典 - 仓颉编码 - aa => 昌,晶'],
            ['2fc', '字典 - 四角号码 - 1010 => 三,丕,二,互'],
            ['2uno', '字典 - unicode - 4e0 => 一,丁,七'],
            ['3mh', '词典 - 模糊搜索 中? => 中文,中秋节,中华人民共和国'],
            ['3jq', '词典 - 精确搜索 中? => 中庸,中学,中央'],
            ['4mh', '成语 - 模糊搜索 ?月 => 月朗星稀 月下老人'],
            ['4jq', '成语 - 精确搜索 ?一?二 => 一石二鸟 独一无二']
        ];
        switch (extra.key) {
            case 'y':
            context.fork('youdao_le', 0, this, function(context) {
                    context.title = [T(16) + ' - ' + T(35), T(1)];
                    context.completions = youdao_completions;
            });
            break;

            case 'd':
            case 'q':
            case 'w':
            context.completions = [];
            break;

            case 'g':
            context.fork('dict_langpairs', 0, this, function (context) {
                    context.title = [T(16) + ' - ' + T(34), T(1)];
                    context.completions = dict.langpairs;
            });
            break;

            case 'z':
            context.fork('zdic_type', 0, this, function (context) {
                    context.title = [T(16) + ' - ' + T(41), T(1)];
                    context.completions = zdic_completions;
            });
            break;

            default :
            context.fork('youdao_le', 0, this, function(context) {
                    context.title = [T(16) + ' - ' + T(35), T(1)];
                    context.completions = youdao_completions;
            });
            context.fork('zdic_type', 0, this, function (context) {
                    context.title = [T(16) + ' - ' + T(41), T(1)];
                    context.completions = zdic_completions;
            });
            context.fork('dict_langpairs', 0, this, function (context) {
                    context.title = [T(16) + ' - ' + T(34), T(1)];
                    context.completions = dict.langpairs;
            });
            context.completions = [];
            break;
        }
    },

    error: function (code) {

    },

    _route: function (/*args*/) {
        let args = arguments[0] || dict.args;
        let lang = args['-l'] || '';
        let engine = args['-e'] || options['dict-engine'] || options.get('dict-engine').defaultValue;
        switch (lang) {
            case 'jap':
            case 'eng':
            case 'fr':
            case 'ko':
            engine = 'y'; // youdao
            break;

            case '1hp':
            case '2hp':
            case '2bis':
            case '2wb86':
            case '2cj':
            case '2fc':
            case '2uno':
            case '3mh':
            case '3jq':
            case '4mh':
            case '4jq':
            engine = 'z';
            break;

            case '':
            break;

            default:
            engine = 'g';
            break;
        }
        return engine;
    },

    speak: function(uri) {
        var dict_sound = document.getElementById('dict-sound');
        if (config.OS.isWindows) {
            if (!dict_sound) {
                dict_sound = DOM.fromJSON(['embed', {'id': 'dict-sound', 'src': '', 'autostart': 'false',  'type': 'application/x-mplyaer2', 'hidden': 'true', 'height': 0, 'width': 0, 'enablejavascript': 'true', 'xmlns': XHTML}], document);
                var addonbar = document.getElementById('addon-bar');
                addonbar.appendChild(dict_sound);
            }
            dict_sound.setAttribute('src', uri);
            dict_sound.setAttribute('src', uri);
            if (dict_sound.Play)
                dict_sound.Play();
            else {
                window.setTimeout(function () dict_sound.controls.play(), 1000);
                dict_sound.controls.play();
            }
            
        } else {
            var value= 'http://www.strangecube.com/audioplay/online/audioplay.swf?file='+encodeURIComponent(uri)+'&auto=yes&sendstop=yes&repeat=1&buttondir=http://www.strangecube.com/audioplay/online/alpha_buttons/negative&bgcolor=0xffffff&mode=playstop';

            if (!dict_sound) {
                dict_sound = DOM.fromJSON(['embed', {'id': 'dict-sound', 'src': value, 'quality': 'high', 'wmode': 'transparent', 'wdith': 0, 'height': 0, 'align': '', 'hidden': 'true', 'type': 'application/x-shockwave-flash', 'pluginspage': 'http://www.macromedia.com/go/getflashplayer', 'allowScriptAccess': 'always', 'xmlns': XHTML}], document);
                var addonbar = document.getElementById('addon-bar');
                addonbar.appendChild(dict_sound);
            }
            dict_sound.setAttribute('src', value);
            window.setTimeout(function () dict_sound.playMusic(), 1000);
        }
    },

    _play: function(uri) {
        if (!options['dict-hasaudio'])
            return false;
        dict.speak(uri);
    },

    _eolToSpace: function(str) {
        return str.replace(/\n/g, ' | ').replace(/\s+/g, ' ');
    },

    _pipelineToBr: function(str) {
        return str.replace(/\s\|\s/g, '\n');
    },

    _notification: function(ret/*, url*/) {
        // https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIAlertsService
        let notify = Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService)
        let listener = {
            observe: function(subject, topic, data) {
                if (topic == 'alertclickcallback')
                    dactyl.open(data, {background:true, where:dactyl.NEW_TAB});
            }
        }
        let title = ret['keyword'];
        if (ret['pron'])
            title += ': [' + ret['pron'] + ']';
        let def = dict._pipelineToBr(ret['def']);
        // @FIXME: 当图标为远程资源时，不工作
        notify.showAlertNotification(null, title, def, true, dict.engine.href({'keyword':ret['keyword']}), listener, 'dict-js-popup');
    },

    _alert: function(ret) {
        // https://developer.mozilla.org/en/Using_popup_notifications
        // check firefox version, enable on firefox 4.0 or above.
        PopupNotifications.show(window.gBrowser.selectedBrowser, 'dict-popup',
            dict._pipelineToBr(ret['simple']),
            'dict-popup-anchor', /* anchor ID */
            {
                label: T(5),
                accessKey: 'S',
                callback: function() {
                    dactyl.open(dict.engine.href({'keyword':ret['keyword']}), {background:false, where:dactyl.NEW_TAB});
                }
            },
            null,  /* secondary action */
            {
                timeout: Date.now() + 15000
            }
        );
        ex.style('chrome://* .popup-notification-icon[popupid="dict-popup"] { background:transparent url("'+dict.engine.logo+'") no-repeat left -8px;}');

    },

    _selection: function() {
        // check focused frame first
        let focusedSel = buffer.focusedFrame.getSelection().toString().trim() || '';
        if (focusedSel != '')
            return focusedSel;
        // now the main window
        let sel = content.window.getSelection().toString().trim() || '';
        if (sel != '')
            return sel;
        let frames = content.parent.frames;
        let i = 0;
        // loop frames
        while ( i < frames.length) {
            var selection = frames[i].getSelection();
            if (selection)
                sel = selection.toString().trim();
            if (sel != '')
                return sel;
            i += 1;
        }

        // now finally, check what mode we are in.
        if (modes.mainMode.name == modes.CARET.name)
            return buffer.currentWord;
        else
            return wordUnderCursor;
    },

    _nl2br: function(str) {
        return str.replace(/\n/g, '<br/>');
    },

    _getFlSl: function() { // get google translate langpairs
        let req = new window.XMLHttpRequest();
        req.open('GET', 'http://translate.google.cn/?hl=en');

        req.onreadystatechange = function(ev) {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    let html = req.responseText;
                    let doc = document.implementation.createHTMLDocument('');
                    let ret = null;
                    ret = doc.documentElement;
                    doc.documentElement.setAttribute('xmlns',
                        doc.documentElement.namespaceURI);
                    ret.innerHTML = html;
                    // gt-sl
                    let gt_sl = doc.getElementById('gt-sl');
                    let options = gt_sl.getElementsByTagName('option');
                    let lang = '[';
                    Array.forEach(options, function(node, idx) {
                            if (idx == options.length - 1)
                                lang += '["' + node.value + '", "' + node.innerHTML + '"]]';
                            else
                                lang += '["' + node.value + '", "' + node.innerHTML + '"],';
                            lang += '\n';
                    });
                    let gt_tl = doc.getElementById('gt-tl');
                    options = gt_tl.getElementsByTagName('option');
                    lang += '\n[';
                    Array.forEach(options, function(node, idx) {
                            if (idx == options.length - 1)
                                lang += '["' + node.value + '", "' + node.innerHTML + '"]]';
                            else
                                lang += '["' + node.value + '", "' + node.innerHTML + '"],';
                            lang += '\n';
                    });
                    dactyl.clipboardWrite(lang);
                }
            }
        };
        req.send(null);
    },

    // @TODO: 给超链接加上 highlight 配色属性，值为 'URL'
    // remove comments, scripts, inline styles, stylesheets, unused properties
    tidy: function(node) {
        return (new window.XMLSerializer).serializeToString(node);
    },

    tidyStr: function(str/*, tagname*/) {
        let body = dict.htmlToDom(str);
        if (arguments[1])
            return dict.tidyNodes(body.childNodes, arguments[1]);
        return dict.tidyNodes(body.childNodes);
    },

    tidyNodes: function (nodes/*, tagname*/) {
        let tagname = arguments[1] || '';
        let nodesPretty = '';
        Array.forEach(nodes, function (node) {
            nodesPretty += dict.tidy(node);
        });
        if (tagname) {
            let parentNode = document.createElementNS(XHTML, tagname);
            parentNode.innerHTML = nodesPretty;
            return dict.tidy(parentNode);
        }
        return nodesPretty;

    },

    /*
     * @TODO: function document
     */
    htmlToDom: function(str/*, prefix, isfull*/) {
        let prefix = arguments[1] || false;
        let isfull = arguments[2] || false;
        let doc = document.implementation.createHTMLDocument('');
        doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);
        let ret = null;
        if (isfull) {
            ret = doc.documentElement;
        } else {
            let id = 'htmlToDom';
            doc.body.innerHTML = '<div id="' + id + '"></div>';
            ret = doc.getElementById(id);
        }
        ret.innerHTML = str;

        if (prefix)
            dict.resolveRelative(doc, prefix);

        Array.forEach(doc.links, function (link) {
            link.setAttribute('dactyl:highlight', 'URL');
            link.setAttribute('xmlns:dactyl', NS);
            // @HACK workaround for youdao
            link.removeAttribute(',');
            link.removeAttribute(')');
        });
        return ret;
    },

    resolveRelative: function(node, prefix) {
        // @TODO: #, name anchor
        var protocol = prefix.split(':')[0] || 'http';
        var pattern = /^((https?|ftps?|file|mailto|javascript):)?\/\//;
        var anchor_pattern = /^#/;
        var links = node.getElementsByTagName('a');
        for (var i = links.length - 1; i >= 0; i--) {
            var link = links[i];
            var href = link.getAttribute('href');
            if (!pattern.test(href) && !anchor_pattern.test(href))
                link.setAttribute('href', prefix+href);
            if (/^\/\//.test(href))
                link.setAttribute('href', protocol + ':' + href);
        }
        var imgs = node.getElementsByTagName('img');
        for (var i = imgs.length - 1; i >= 0; i--) {
            var img = imgs[i];
            var src = img.getAttribute('src');
            if (!pattern.test(src))
                img.setAttribute('src', prefix+src);
            if (/^\/\//.test(src))
                img.setAttribute('src', protocol + ':' + src);
        }
    },

    getSoundUriByLocaleKeyword: function (le, keyword) {
        let isYoudao = ['yeng', 'yfr', 'yko', 'yjap'].some(function(ylang) ylang==le);
        let uri = '';
        if (isYoudao)
            uri = 'http://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(keyword) + '&le=' + le.substr(1);
        else if (['en', 'fr', 'ko', 'ja'].indexOf(le) + 1) {
            le = ['eng','fr', 'ko', 'jap'][['en', 'fr', 'ko', 'ja'].indexOf(le)];
            uri = 'http://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(keyword) + '&le=' + le;
        } else
            uri = 'http://translate.google.com/translate_tts?ie=UTF-8&q='+encodeURIComponent(keyword)+'&tl='+le; // Limit:
        return uri;
    }
};

// check whether windows media player plugin exists.
group.options.add(['dict-hasaudio', 'dich'],
    T(21),
    'boolean',
    false
);

group.options.add(['dict-clipboard', 'dicb'],
    'clipboard support', // global or selection or both? TODO
    'boolean',
    false
);

group.options.add(['dict-simple', 'dics'],
    T(22),
    'boolean',
    true
);

group.options.add(['dict-engine', 'dice'],
    T(23),
    'string',
    'q',
    {
        completer: function(context) [
            ['d', T(24)],
            ['q', T(25)],
            ['g', T(34)],
            ['y', T(35)],
            ['z', T(41)],
            ['w', T(42)]
        ]
    }
);

group.options.add(['dictw-api', 'dicwa'],
    '自定义的 mediawiki 系统域名',
    'string',
    'http://zh.wikipedia.org/w/api.php'
);

group.options.add(['dict-show', 'dico'],
    T(26),
    'string',
    's',
    {
        completer: function(context) [
            ['s', T(27)],
            ['a', T(28)],
            ['n', T(29)]
        ]
    }
);

function dblclick(event) {
    if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) { // FIXME: contenteditable=true
        return false;
    }
    // let keyword = content.window.getSelection().toString().trim();
    let keyword = dict._selection();
    let re = /^[^_\s]+$/; // ao

    if (event.detail == 2 && keyword.length && re.test(keyword))
        ex.dict();
    else
        ex.redraw();
}

group.options.add(['dict-dblclick', 'dicd'],
    T(30),
    'boolean',
    false,
    {
        setter: function(value) {
            if (value) {
                window.gBrowser.addEventListener('click', dblclick, false);
            } else {
                window.gBrowser.removeEventListener('click', dblclick, false);
            }
            return value;
        }
    }
);

group.options.add(['dict-langpair', 'dicl'], // stringmap google:en|zh-CN,youdao:jap
    T(17),
    'stringmap',
    'g:zh-CN,y:eng,z:1hp',
    {
        completer: function(context, extra) {

            if (extra.value == null)
                return [
                    ['y', T(35)],
                    ['g', T(34)],
                    ['z', T(41)]
                ].filter(function (e) !Set.has(extra.values, e[0]));
            else
                dict.optsCompleter(context, extra);
        },
        validator: function(value) {
            return true;
        }
    }
);

group.commands.add(['di[ct]'],
    T(31),
    dict.init,
    {
        argCount: '?', // TODO ?
        // http://stackoverflow.com/questions/1203074/firefox-extension-multiple-xmlhttprequest-calls-per-page/1203155#1203155
        // http://code.google.com/p/dactyl/issues/detail?id=514#c2
        bang: true,
        completer: function (context, args) {
            if (args.length >= 1 && args[0] !== '-' && args[0].length > 0 && !args['-h'])
                dict.suggest(context, args);

            context.fork('words_history', 0, this, function (context) dict.cacheSuggest(context, args));
        },
        literal: 0,
        options: [
            {
                names: ['-e'],
                description: T(23),
                type: CommandOption.STRING,
                completer: [
                    ['d', T(24)],
                    ['q', T(25)],
                    ['g', T(34)],
                    ['y', T(35)],
                    ['z', T(41)],
                    ['w', T(42)]
                ]
            },
            {
                names: ['-l'],
                description: T(17),
                type: CommandOption.STRING,
                completer: function(context, args) dict.optsCompleter(context,{key:args['-e'] || ''})
            },
            {
                names: ['-h'],
                description: 'History management',
                type: CommandOption.STRING,
                completer: function (context, args) [
                    ['clear', 'Remove all history']
                ]
            },
            {
                names: ['-o'],
                description: T(26),
                type: CommandOption.STRING,
                completer: [
                    ['s', T(27)],
                    ['a', T(28)],
                    ['n', T(29)]
                ]
            },
            {
                names: ['-t'],
                description: T(40),
                type: CommandOption.NOARG
            }
        ]
    },
    true
);

Array.forEach('dgqyzw', function(char) {
        let extra_options = [];
        if ('gyz'.indexOf(char) + 1) {
            extra_options = [
                {
                    names: ['-l'],
                    description: T(17),
                    type: CommandOption.STRING,
                    completer: function(context, args) {
                        args['-e'] = char;
                        dict.optsCompleter(context,{key:char});
                    }
                }
            ];
        }
        group.commands.add(['dict'+char, 'di'+char],
            T(31) + ' - ' + dict.engines[char].name,
            function (args) {
                args['-e'] = char;
                dict.init(args);
            },
            {
                argCount: '?', // TODO ?
                // http://stackoverflow.com/questions/1203074/firefox-extension-multiple-xmlhttprequest-calls-per-page/1203155#1203155
                // http://code.google.com/p/dactyl/issues/detail?id=514#c2
                bang: true,
                completer: function (context, args) {
                    args['-e'] = char;
                    if (args.length >= 1 && args[0] !== '-' && args[0].length > 0 && !args['-h'])
                        dict.suggest(context, args);

                    context.fork('words_history', 0, this, function (context) dict.cacheSuggest(context, args));
                },
                literal: 0,
                options: extra_options.concat([
                    {
                        names: ['-o'],
                        description: T(26),
                        type: CommandOption.STRING,
                        completer: [
                            ['s', T(27)],
                            ['a', T(28)],
                            ['n', T(29)]
                        ]
                    },
                    {
                        names: ['-h'],
                        description: 'History management',
                        type: CommandOption.STRING,
                        completer: function (context, args) [
                            ['clear', 'Remove all history']
                        ]
                    },
                    {
                        names: ['-t'],
                        description: T(40),
                        type: CommandOption.NOARG
                    }
                ])
            },
            true
        );
});

group.commands.add(['spe[ak]'],
    'Speak',
    function(args) {
        let words = args[0] || dict._selection();
        if (args.bang || !words) {
            let player = DOM('#dict-sound', document)[0] || false;
            if (player && player.getAttribute('src'))
                try {
                    player.controls.play();
                } catch (e if e instanceof TypeError) {
                    try {
                        player.playMusic();
                    } catch (e if e instanceof TypeError) {
                        try {
                            player.Play();
                        } catch (e if e instanceof TypeError) {
                            ; // do nth
                        } catch (e) {
                            player.setAttribute('src', player.getAttribute('src'));
                        }
                    }
                }
            else
                dactyl.echo('重新播放失败，无播放器或者播放链接为空！', commandline.FORCE_SINGLELINE);
            return true;
        }
        let le = args['-l'] || '';
        if (le) {
            dict.speak(dict.getSoundUriByLocaleKeyword(le, words));
        } else {
            // 自动检测语言
            var req = new window.XMLHttpRequest();
            req.open('GET',
                'http://translate.google.com/translate_a/t?client=t&hl=auto&sl=auto&tl=en&text=' + encodeURIComponent(words)
            );
            req.onreadystatechange = function (ev) {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        let sb = new Components.utils.Sandbox('http://www.example.com/');
                        let g = Components.utils.evalInSandbox(req.responseText, sb);
                        let le = g[8][0][0];
                        dict.speak(dict.getSoundUriByLocaleKeyword(le, words));
                    }
                }
            };
            req.send(null);
        }
    },
    {
        argCount: '?',
        bang:true,
        literal: 0,
        options: [
            {
                names: ['-l'],
                description: 'Language',
                type: CommandOption.STRING,
                completer: function (context) {
                    context.completions = [
                        ['yeng', 'Youdao - English'],
                        ['yfr',  'Youdao - French'],
                        ['yko',  'Youdao - Korean'],
                        ['yjap', 'Youdao - Japanese'],
                    ].concat(dict.languages);
                    context.filters = [CompletionContext.Filter.textDescription];
                    context.compare = null;
                }
            }
        ]
    },
    true
);

group.mappings.add(
    [modes.NORMAL, modes.VISUAL],
    ['<A-d>'],
    T(32),
    dict.init
);
group.mappings.add(
    [modes.NORMAL, modes.VISUAL],
    ['<A-S-d>'],
    T(33),
    function () dict.init({bang:true})
);

var wordUnderCursor = '';
var mousemove = function (e) {
    if(e && e.rangeParent && e.rangeParent.nodeType == e.rangeParent.TEXT_NODE
        && e.rangeParent.parentNode == e.target)
        ; // do nth
    else
        return wordUnderCursor = '';

    var offset = e.rangeOffset;
    var range = e.target.ownerDocument.createRange();
    range.selectNode(e.rangeParent);
    var str = range.toString();
    range.detach();
    var re = new RegExp(options['iskeyword']+'+', 'g');
    if (str.trim() && re.test(str.charAt(offset))) {
        var pieces1 = [];
        var leftPart = str.slice(0, offset);
        var re = new RegExp(options['iskeyword']+'+', 'g'); // dirty hack, bug?
        var hasLeftPart = re.test(str.charAt(offset - 1));
        if (hasLeftPart)
            pieces1 = leftPart.match(re);
        var pieces2 = str.slice(offset).match(re);
        wordUnderCursor = (pieces1.pop() || '') + (pieces2.shift() || '');
    } else {
        wordUnderCursor = '';
    }
};
if (config.OS.isWindows) {
    var removePlayer = function () {
        var dict_sound = document.getElementById('dict-sound');
        if (dict_sound) {
            var addonbar = document.getElementById('addon-bar');
            addonbar.removeChild(dict_sound);
        }
    };
    var fullscreen = function (e) {
        removePlayer();
    };
    window.addEventListener('fullscreen', fullscreen, false);
}
window.gBrowser.addEventListener('mousemove', mousemove, false);

function onUnload() {
    if (config.OS.isWindows) {
        window.removeEventListener('fullscreen', fullscreen, false);
        removePlayer();
    }
    window.gBrowser.removeEventListener('mousemove', mousemove, false);
    if (options['dict-dblclick'])
        window.gBrowser.removeEventListener('click', dblclick, false);
}
