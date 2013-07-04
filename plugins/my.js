

function reInstall_dactyl(){
    util.httpGet("https://code.google.com/p/dactyl/downloads/list", {
        responseType: "document",
        onload: function(xhr){
            var doc = xhr.response;
            var url = doc.querySelector(".vt.id.col_0 > a").href;
            var sDate = url.match(/\d{8}/)[0];
            var downloadURL = "http://dactyl.googlecode.com/files/pentadactyl-" + sDate + ".xpi";
            dactyl.execute(":extadd " + downloadURL);
        }
    });
}

group.commands.add(["reinstall"], "reinstall pentadactyl from web",
    reInstall_dactyl,
    null,
    true
);


