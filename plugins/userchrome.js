(function(){

dactyl.assert(typeof(userChrome_js) != 'undefined', "userChrome.js must exist");

var userChromeJS = {
    list: function(all){
        if(all){
            return userChrome_js.scripts.concat(userChrome_js.overlays);
        }else{
            return userChrome_js.scripts;
        }
    },
    get: function(name){
        if(!name) return;
        let scripts = [s for each(s in userChromeJS.list(true)) if(s.filename == name)];
        if(scripts.length > 0)
            return scripts[0];
        else
            return null;
    },
    completer: function(context, args, all){
        context.title = ["script", "description"];
        context.completions = [[s.filename, s.description] for each(s in userChromeJS.list(all))];
    }
};

group.commands.add(['uce[dit]'], 'Edit an userChrome script',
    function(args){
        let s = userChromeJS.get(args[0]);
        if(!s) return;

        s.file.launch();
    },
    {
        literal: 1,
        completer: function(context, args){
            userChromeJS.completer(context, args, true);
        }
    },
    true
);

group.commands.add(['ucr[ehash]'], 'Reload an userChrome script',
    function(args){
        let s = userChromeJS.get(args[0]);
        if(!s) return;

        // services.observer.notifyObservers(s.file, "flush-cache-entry", "");
        util.flushCache();

        Services.scriptloader.loadSubScript(s.url, {}, s.charset || "utf-8");
    },
    {
        literal: 1,
        completer: userChromeJS.completer
    },
    true
);

})();
