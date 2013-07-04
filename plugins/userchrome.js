(function(){

dactyl.assert(typeof(userChrome_js) != 'undefined', "userChromeJS must exist");

var userChromeJS = {
    list: function(){
        return userChrome_js.scripts;
    },
    get: function(name){
        if(!name) return;
        return [s for each(s in userChromeJS.list()) if(s.filename == name)];
    },
    completer: function(context, args){
        context.title = ["script", "description"];
        context.completions = [[s.filename, s.description] for each(s in userChromeJS.list())];
    }
};

group.commands.add(['uce[dit]'], 'Edit an userChrome script',
    function(args){
        let scripts = userChromeJS.get(args[0]);
        if(!scripts) return;

        scripts[0].file.launch();
    },
    {
        literal: 1,
        completer: userChromeJS.completer
    },
    true
);

group.commands.add(['ucr[ehash]'], 'Reload an userChrome script',
    function(args){
        let scripts = userChromeJS.get(args[0]);
        if(!scripts) return;

        util.flushCache();
        Services.scriptloader.loadSubScript(scripts[0].url, {}, scripts[0].charset || "utf-8");
    },
    {
        literal: 1,
        completer: userChromeJS.completer
    },
    true
);

})();
