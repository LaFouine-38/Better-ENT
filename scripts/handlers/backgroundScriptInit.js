try {
    importScripts("./../background_scripts/updatePageEventHandler.js", "./../background_scripts/connexionUrlHandler.js", "./../background_scripts/fileLoader.js");
    importScripts("./../config/config.js")
} catch (e) {
    console.log(e);
}