'use strict';

var vow = require('vow'),
    vowFs = require('enb').asyncFs;

module.exports = require('enb').buildFlow.create()
    .name('css-hash')
    .useFileList(['styl', 'css'])
    .target('target', 'css.json')
    .defineOption('processor')
    .defineOption('processorOptions')
    .builder(function(sourceFiles) {
        return vow.all(sourceFiles.map(function(file) { return this.process(file.fullname); }, this))
            .then(function(cssArray) {
                var cssHash = sourceFiles.reduce(function(acc, file, idx) {
                    var key = file.name.replace('.' + file.suffix, ''),
                        content = cssArray[idx];

                    acc[key] ?
                        acc[key].push(content) :
                        acc[key] = [content];

                    return acc;
                }, {});

                return JSON.stringify(cssHash, null, 2);
            });
    })
    .methods({
        process: function(filename) {
            return this._processor ? this._processor(filename) : vowFs.read(filename, 'utf8');
        }
    })
    .createTech();
