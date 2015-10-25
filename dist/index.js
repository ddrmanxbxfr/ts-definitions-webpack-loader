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
var TypescriptService_1 = require('./TypescriptService');
var FileUtils_1 = require('./FileUtils');
var compileResults = new Array();
var concatPath = "";
function typescriptDefinitionsLoader(source) {
    var filePath = this.resourcePath;
    concatPath = this.query.split("=")[1];
    var result = TypescriptService_1.CompilationUnit.fetchDefinition(filePath);
    if (result.compileStatus) {
        compileResults.push(result);
    }
    this._compiler.plugin("after-compile", afterCompileHandler);
    return source;
}
function afterCompileHandler(compilation, callback) {
    var files = new Array();
    var results = compileResults.length;
    if (results > 0) {
        for (var i = 0; i < results; ++i) {
            files.push(compileResults[i].filePath);
        }
        FileUtils_1.default.concat(files, concatPath);
        FileUtils_1.default.deleteMultiple(files);
        compileResults = [];
    }
    callback();
}
module.exports = typescriptDefinitionsLoader;
