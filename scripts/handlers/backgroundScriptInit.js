try {
    importScripts("./../background_scripts/updatePageEventHandler.js", "./../background_scripts/connexionUrlHandler.js", "./../background_scripts/fileLoader.js");
    importScripts("./../config/config.js", "./../background_scripts/updateScriptBg.js", "./../background_scripts/MajAuto/checkMaj.js");
} catch (e) {
    console.log(e);
}