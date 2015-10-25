/// <reference path="../typings/tsd.d.ts" />
//////////////////////////////////////////////////////////////////////////////
// This file is part of typescript-definitions-webpack-loader.
// typescript-definitions-webpack-loader is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// typescript-definitions-webpack-loader is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with typescript-definitions-webpack-loader.
// If not, see <http://www.gnu.org/licenses/>.
//////////////////////////////////////////////////////////////////////////////
var typescript = require('typescript');
var fs = require('fs');
var colors = require('colors/safe');
var TypescriptService;
(function (TypescriptService) {
    var CompilationResult = (function () {
        function CompilationResult(filePath, compileStatus) {
            this.mFilePath = null;
            this.mCompileStatus = false;
            this.mFilePath = filePath;
            this.mCompileStatus = compileStatus;
        }
        Object.defineProperty(CompilationResult.prototype, "compileStatus", {
            get: function () { return this.mCompileStatus; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilationResult.prototype, "filePath", {
            get: function () { return this.mFilePath; },
            enumerable: true,
            configurable: true
        });
        return CompilationResult;
    })();
    TypescriptService.CompilationResult = CompilationResult;
    var CompilationUnit = (function () {
        function CompilationUnit() {
        }
        CompilationUnit.fetchDefinition = function (filePath) {
            var output = CompilationUnit.getService(filePath).getEmitOutput(filePath);
            if (!output.emitSkipped) {
                console.log(colors.green("TS Definitions : Emitting " + filePath));
            }
            else {
                console.log(colors.red("TS Definition : Emitting " + filePath + " failed"));
            }
            var definition = output.outputFiles.filter(function (file) { return !!file.name.match(/\.d\.ts(x?)$/); }).pop();
            if (definition) {
                fs.writeFileSync(definition.name, definition.text, "utf8");
                return new CompilationResult(definition.name, true);
            }
            return new CompilationResult(filePath, false);
        };
        ;
        CompilationUnit.getService = function (fileName) {
            var servicesHost = {
                getScriptFileNames: function () { return [fileName]; },
                getScriptVersion: function (fileName) { return CompilationUnit.files[fileName] &&
                    CompilationUnit.files[fileName].version.toString(); },
                getScriptSnapshot: function (fileName) {
                    if (!fs.existsSync(fileName)) {
                        return undefined;
                    }
                    return typescript.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
                },
                getCurrentDirectory: function () { return process.cwd(); },
                getCompilationSettings: function () { return CompilationUnit.options; },
                getDefaultLibFileName: function (options) { return typescript.getDefaultLibFilePath(options); },
            };
            return typescript.createLanguageService(servicesHost, typescript.createDocumentRegistry());
        };
        ;
        CompilationUnit.options = {
            noEmitOnError: true,
            noImplicitAny: true,
            target: 1,
            module: 1,
            declaration: true,
            removeComments: true
        };
        CompilationUnit.files = {};
        return CompilationUnit;
    })();
    TypescriptService.CompilationUnit = CompilationUnit;
})(TypescriptService || (TypescriptService = {}));
module.exports = TypescriptService;
