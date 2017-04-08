# enb-css-hash

[ENB](https://en.bem.info/toolbox/enb/) tech to build a hash with entities as a key and array of CSS strings collected from all the levels as a value.

[![NPM version](https://img.shields.io/npm/v/enb-css-hash.svg?style=flat)](https://www.npmjs.org/package/enb-css-hash)
[![Build Status](https://img.shields.io/travis/tadatuta/enb-css-hash/master.svg?style=flat&label=tests)](https://travis-ci.org/tadatuta/enb-css-hash)
[![Coverage Status](https://img.shields.io/coveralls/tadatuta/enb-css-hash.svg?style=flat)](https://coveralls.io/r/tadatuta/enb-css-hash?branch=master)
[![Dependency Status](https://img.shields.io/david/tadatuta/enb-css-hash.svg?style=flat)](https://david-dm.org/tadatuta/enb-css-hash)

Default result is `css.json` file with something like this:
```js
{
    "b1": [".b1 { color: red; }", ".b1 { font-size: 42px; }"],
    "b2": [".b2 { color: green; }"]
}
```

## Installation

Install `enb-css-hash` package:

```sh
$ npm install --save-dev enb-css-hash
```

**Requirements:** `enb 0.16.0+`.

## Quick start

```js
module.exports = function(config) {
    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [require('enb-css-hash'), {
                sourceSuffixes: ['css'],
                target: 'css.json',
                processor: function(filename) {
                    console.log(this._processorOptions); // { life: 42 }
                    return fs.readFileSync(filename, 'utf8');
                },
                processorOptions: {
                    life: 42
                }
            }]
        ]);
    });
};
```

License
-------

© 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
