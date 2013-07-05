
dactyl.assert(Cc["@scriptish.erikvold.com/scriptish-service;1"],
    'Scriptish is not installed');


var scriptish = {
    list: function()
        [s for each (s in Scriptish_config.scripts)],
    get: function(name) {
        let scripts = [s for each (s in scriptish.list()) if (s.name == name)];
        if (scripts.length == 0){
            return false;
        }else{
            return scripts[0];
        }
    },
    edit: function(name) {
        if (!name) return;
        let script = this.get(name);
        if (!script) return;

        script._file.launch();
    },
    completer: function(context, args) {
        context.title = ["script", "description"];
        context.completions = [[s.name, s.description] for each (s in scriptish.list())];
    }
};

group.commands.add(['sce[dit]'],
    'Edit an Scriptish script',
    function(args) {
        scriptish.edit(args[0]);
    },
    {
        literal: 1,
        completer: scriptish.completer
    },
    true
);