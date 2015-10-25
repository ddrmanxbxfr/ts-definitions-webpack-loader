var fs = require('fs');
var colors = require('colors/safe');
var FileUtils = (function () {
    function FileUtils() {
    }
    FileUtils.concat = function (src, dest) {
        var fileList = src;
        var distPath = dest;
        var out = fileList.map(function (filePath) {
            return fs.readFileSync(filePath, 'utf-8');
        });
        fs.writeFileSync(distPath, out.join('\n'), 'utf-8');
        console.log(colors.green('TS Definitions : ' + distPath + ' definitions built.'));
    };
    FileUtils.endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    FileUtils.deleteMultiple = function (items) {
        for (var i = 0; i < items.length; ++i) {
            if (FileUtils.endsWith(items[i], ".d.ts")) {
                fs.unlinkSync(items[i]);
            }
        }
    };
    return FileUtils;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileUtils;
