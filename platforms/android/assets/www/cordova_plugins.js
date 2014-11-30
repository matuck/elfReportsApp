cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/com.google.cordova.admob/www/AdMob.js",
        "id": "com.google.cordova.admob.AdMob",
        "clobbers": [
            "window.AdMob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.inappbrowser": "0.5.3",
    "com.google.cordova.admob": "2.3.6",
    "com.rjfun.cordova.ext": "1.1.0",
    "com.rjfun.cordova.ad": "1.0.5",
    "com.google.playservices": "19.0.0",
    "com.google.admobsdk": "6.12.2"
}
// BOTTOM OF METADATA
});