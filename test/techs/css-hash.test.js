'use strict';

var mock = require('mock-fs'),
    FileList = require('enb/lib/file-list'),
    MockNode = require('mock-enb/lib/mock-node'),
    loadDirSync = require('mock-enb/utils/dir-utils').loadDirSync,
    cssHashTech = require('../..');

describe('css-hash', function () {
    afterEach(function () {
        mock.restore();
    });

    it('should work', function () {
        var bundle = {},
            blocks = {
                'b1.css': '.b1 { color: red; }',
                'b2.css': '.b2 { color: green; }',
            },
            reference = JSON.stringify({
                "b1": [".b1 { color: red; }"],
                "b2": [".b2 { color: green; }"]
            }, null, 2);

        return build(bundle, blocks, {}).spread(function (content) {
            require('assert').equal(content, reference)
        });
    });

    it('should support custom processor', function () {
        var bundle = {},
            blocks = {
                'b1.css': '.b1 { color: red; }',
                'b2.css': '.b2 { color: green; }',
            },
            reference = JSON.stringify({
                "b1": ["blocks/b1.css"],
                "b2": ["blocks/b2.css"]
            }, null, 2);

        return build(bundle, blocks, {
            processor: function(filename) {
                return filename;
            }
        }).spread(function (content) {
            require('assert').equal(content, reference)
        });
    });

    it('should respect processorOptions', function () {
        var bundle = {},
            blocks = {
                'b1.css': '.b1 { color: red; }',
                'b2.css': '.b2 { color: green; }',
            },
            reference = JSON.stringify({
                "b1": ["42"],
                "b2": ["42"]
            }, null, 2);

        return build(bundle, blocks, {
            processor: function() {
                return this._processorOptions.life;
            },
            processorOptions: {
                life: '42'
            }
        }).spread(function (content) {
            require('assert').equal(content, reference)
        });
    });
});

function build(bundleDir, blocksDir, options, isNeedRequire) {
    mock({
        blocks: blocksDir,
        bundle: bundleDir
    });

    var bundle = new MockNode('bundle'),
        fileList = new FileList(),
        testFunc;

    fileList.addFiles(loadDirSync('blocks'));

    bundle.provideTechData('?.files', fileList);

    testFunc = isNeedRequire ? bundle.runTechAndRequire : bundle.runTechAndGetContent;

    return testFunc.call(bundle, cssHashTech, options);
}
