# Typescript definitions Webpack loader

A webpack plugin to generate and pack together typescript definitions.

Mostly used when writing a typescript library and want a clean single definition output.

# Usage

You will need to include the following in your webpack config as a loader.

The output query parameter must be set to get the packer running correctly.

We concat all the definitions files in there...

```
module.exports = {
  module: {
    {
      test: /\/.ts$/,
      exclude: /node_modules/,
      loader: 'ts-definitions-webpack-loader?output=dist/a_definition_file.d.ts'
    }
  }
}


````

# License

Copyright (C) 2015 Mathieu Rhéaume <mathieu@codingrhemes.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
