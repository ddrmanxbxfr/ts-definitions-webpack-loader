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

import { CompilationResult, CompilationUnit } from './TypescriptService';
import FileUtils from './FileUtils';
var compileResults: Array<CompilationResult> = new Array();
var concatPath: string = "";

function typescriptDefinitionsLoader(source) {
  var filePath: string = this.resourcePath;
  concatPath = this.query.split("=")[1];
  compileResults.push(CompilationUnit.fetchDefinition(filePath));

  this._compiler.plugin("after-compile",
                        afterCompileHandler);

  return source;
}

function afterCompileHandler(compilation: any, callback: any) {
  var files: Array<string> = new Array();
  var results: number = compileResults.length
  if (results > 0) {
    for (var i = 0; i < results; ++i) {
      files.push(compileResults[i].filePath);
    }

    FileUtils.concat(files, concatPath);
    FileUtils.deleteMultiple(files);
    compileResults = []; // Reset it to 0 as it's finished :)
  }

  callback();
}

export = typescriptDefinitionsLoader;
