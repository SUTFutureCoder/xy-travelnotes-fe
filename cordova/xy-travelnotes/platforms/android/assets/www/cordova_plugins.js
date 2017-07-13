cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-hot-code-push-plugin.chcp",
        "file": "plugins/cordova-hot-code-push-plugin/www/chcp.js",
        "pluginId": "cordova-hot-code-push-plugin",
        "clobbers": [
            "chcp"
        ]
    },
    {
        "id": "cordova-hot-code-push-local-dev-addon.chcpLocalDev",
        "file": "plugins/cordova-hot-code-push-local-dev-addon/www/chcpLocalDev.js",
        "pluginId": "cordova-hot-code-push-local-dev-addon",
        "clobbers": [
            "chcpLocalDev"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-advanced-geolocation.AdvancedGeolocation",
        "file": "plugins/cordova-plugin-advanced-geolocation/www/AdvancedGeolocation.js",
        "pluginId": "cordova-plugin-advanced-geolocation",
        "clobbers": [
            "AdvancedGeolocation"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "pluginId": "cordova-plugin-background-mode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-hot-code-push-plugin": "1.5.3",
    "cordova-hot-code-push-local-dev-addon": "0.4.2",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-geolocation": "2.4.3",
    "cordova-plugin-advanced-geolocation": "1.1.0",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-background-mode": "0.7.2"
};
// BOTTOM OF METADATA
});