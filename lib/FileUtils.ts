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
var fs = require('fs');
var colors = require('colors/safe');
export default class FileUtils {
  public static concat(src: Array<string>, dest: string): void {
    var fileList = src;
    var distPath = dest;
    var out = fileList.map(function(filePath){
    return fs.readFileSync(filePath, 'utf-8');
    });

    fs.writeFileSync(distPath, out.join('\n'), 'utf-8');
    console.log(colors.green('TS Definitions : '+ distPath +' definitions built.'));
  }

  public static deleteMultiple(items: Array<string>): void {
    for (var i = 0; i < items.length; ++i) {
      fs.unlinkSync(items[i]);
    }
  }
}
