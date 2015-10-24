/*
 * This file is part of ts-definitions-webpack-loader.
 * ts-definitions-webpack-loader is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * ts-definitions-webpack-loader is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with ts-definitions-webpack-loader.  If not, see <http://www.gnu.org/licenses/>.
 * */
'use strict';

function tsDefinitionsLoader(source) {
  console.log("Loader was called for " + source);
  return source;
}

module.exports = typescriptDefinitionsLoader;
