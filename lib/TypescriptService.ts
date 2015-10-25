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

import * as typescript from 'typescript';
import * as fs from 'fs';
var colors = require('colors/safe');

module TypescriptService {
  export class CompilationResult {
    mFilePath: string = null;
    mCompileStatus: boolean = false;
    constructor(filePath: string, compileStatus: boolean) {
      this.mFilePath = filePath;
      this.mCompileStatus = compileStatus;
    }

    public get compileStatus(): boolean { return this.mCompileStatus; }
    public get filePath(): string { return this.mFilePath; }
  }

  export class CompilationUnit {
    public static fetchDefinition(filePath: string): CompilationResult {
      var output = CompilationUnit.getService(filePath).getEmitOutput(filePath);

      if (!output.emitSkipped) {
        console.log(colors.green(`TS Definitions : Emitting ${filePath}`));

        var definition = output.outputFiles.filter(file => !!file.name.match(/\.d\.ts(x?)$/)).pop();
        if (definition) { 
          fs.writeFileSync(definition.name, definition.text, "utf8");
          return new CompilationResult(definition.name, true);
        }
      }
      else {
        console.log(colors.red(`TS Definition : Emitting ${filePath} failed`));
      }

      return new CompilationResult(filePath, false);
    };

    private static options: typescript.CompilerOptions = {
      noEmitOnError: true,
      noImplicitAny: true,
      target: typescript.ScriptTarget.ES5,
      module: typescript.ModuleKind.CommonJS,
      declaration: true,
      removeComments: true
    };

    // Create the language service host to allow the LS to communicate with the host
    private static files: typescript.Map<{ version: number }> = {};

    private static getService(fileName: string): typescript.LanguageService {
      const servicesHost: typescript.LanguageServiceHost = {
      getScriptFileNames: () => [fileName],
      getScriptVersion: (fileName) => CompilationUnit.files[fileName] &&
        CompilationUnit.files[fileName].version.toString(),
        getScriptSnapshot: (fileName) => {
          if (!fs.existsSync(fileName)) {
            return undefined;
          }

          return typescript.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
        },
        getCurrentDirectory: () => process.cwd(),
        getCompilationSettings: () => CompilationUnit.options,
        getDefaultLibFileName: (options) => typescript.getDefaultLibFilePath(options),
      };

      // Create the language service files
      return typescript.createLanguageService(servicesHost,
      typescript.createDocumentRegistry());
    };
  }
}

export = TypescriptService;
