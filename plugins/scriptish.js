
(function(){

const ScriptishId = "@scriptish.erikvold.com/scriptish-service;1";

if (!Cc[ScriptishId]){
    dactyl.log('Scriptish is not installed', 0);
    return;
}

var scriptish = {
    list: function()
        [s for each (s in Scriptish_config.scripts)],
    get: function(name){
        let scripts = [s for each(s in scriptish.list()) if(s.name==name)];
        if(scripts.length == 0) return false
        return scripts[0];
    },
    edit: function(name){
        if(!name) return;
        let script = this.get(name);
        if(!script) return;
        return File(script.fileURL).launch();
    }
};

var stylish = {
    list: function()
        [s for each(s in stylishOverlay.service.list(0, {}))],
};

group.commands.add(['userscript','usc'], 'list Scriptish scripts',
    function(args){
        scriptish.edit(args[0]);
    },
    {
        literal: 1,
        completer: function(context, args){
            context.title = ["script", "description"];
            context.completions = [[s.name, s.description] for each(s in scriptish.list())];
        }
    },
    true
);

})();
