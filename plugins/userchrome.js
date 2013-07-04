(function(){

function flushCache(file) {
    if (file)
         Services.obs.notifyObservers(file, "flush-cache-entry", "");
    else
         Services.obs.notifyObservers(null, "startupcache-invalidate", "");
}

group.commands.add(['reloaduc', 'reuc'], 'reload userChrome scripts',
    function(args){
        let name = args[0];
        let scripts = [s for each(s in userChrome_js.scripts) if(s.filename == name)];
        if(scripts.length == 0) return;

        flushCache();
        Services.scriptloader.loadSubScript(scripts[0].url, {}, scripts[0].charset || "utf-8");
        // dactyl.execute(":source " + scripts[0].url);
    },
    {
        literal: 1,
        completer: function(context, args){
            context.title = ["script", "description"];
            context.completions = [[s.filename, s.description] for each(s in userChrome_js.scripts)];
        }
    },
    true
);

})();
