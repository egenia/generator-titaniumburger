'use strict';
var util = require('util');
var path = require('path');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var exec = require('child_process').exec;

var store = memFs.create();
var fs = editor.create(store);
var generators = require('yeoman-generator');

var bundleIdFromName = "";
var asks = {};
var ti = [];

function generateGUID() {
    /* jshint bitwise:false */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function extractBundleId(_, props) {
    return "com." + _.slugify(props.author) + "." + _.slugify(props.appname);
}

function notBlank(val) {
    return val && val !== "";
}

function notSpecifiedFilter(val) {
    return val === "" ? "not specified" : val;
}

module.exports = generators.Base.extend({

    method: function () {
        this.sdks = [];
        var self = this;
        var tmp = {
            name:'',
            value:''
        };
        exec('titanium sdk list -o json', function(error, stdout, stderr) {
            var sdkList = JSON.parse(stdout);
            for (var sdk in sdkList.installed) {
                //console.log(sdk);
                tmp.name = sdk;
                tmp.value = sdk;
                //console.log(tmp);
                //self.sdks.push(sdk);
                //ti.push(tmp);
                ti.push({name:sdk, value:sdk});
            };
            //console.log(ti);
        });
        
        var prompts = [{
            type:     'input',
            name:     'publisher',
            message:  'Publisher name:',
            validate: notBlank
                                      }, {
                                      type:     'input',
                                      name:     'appname',
                                      message:  'What will you call your app?',
                                      default:  this.appname,
                                      validate: notBlank
                                      }, {
                                      type:     'input',
                                      name:     'bundle_id',
                                      message:  'What is the bundle ID?',
                                      default:  bundleIdFromName,
                                      validate: notBlank
                                      }, {
                                      type:     'input',
                                      name:     'version',
                                      message:  'What version would you like to start with?',
                                      default:  '0.0.0',
                                      validate: notBlank
                                      }, {
                                      type:    'input',
                                      name:    'description',
                                      message: 'Provide a short description for your app:',
                                      filter:  notSpecifiedFilter
                                      }, {
                                      type:    'input',
                                      name:    'url',
                                      message: 'What is the URL for the project wenpage (if any)'
                                      }, {
                                      type:    'input',
                                      name:    'copyright',
                                      message: 'Copyright name:'
                                      }, {
                                      type:    'checkbox',
                                      name:    'sdk',
                                      message: 'Titanium SDK:',
                                      choices: ti
                                      }, {
                                      type:    'checkbox',
                                      name:    'options',
                                      message: 'Extras:',
                                      choices: [{
                                                name:    'Include Alloy',
                                                value:   'use_alloy',
                                                checked: true
                                                }, {
                                                name:    'Include a testing framework (mocha, chai, sinon, mockti)',
                                                value:   'use_tests',
                                                checked: true
                                                }, {
                                                name:    'Use an express server for local (offline) development',
                                                value:   'use_server',
                                                checked: false
                                                }]
                                      }];
                       
                       return this.prompt(prompts, function (props) {
                                   this.author      = props.author;
                                   this.appname     = props.appname;
                                   this.bundle_id   = props.bundle_id;
                                   this.description = props.description;
                                   this.url         = props.url;
                                   this.version     = props.version;
                                   this.use_alloy   = props.options.indexOf('use_alloy') !== -1;
                                   this.use_tests   = props.options.indexOf('use_tests') !== -1;
                                   this.use_server  = props.options.indexOf('use_server') !== -1;
                                   this.guid        = generateGUID();
                                   this.copyright   = new Date().getFullYear() + (this.author ? " " + this.author : "");})
                                        .then(function(answers) {
                                              console.log(answers);
                                              asks = answers;
                                              });
    },
                                        
                                        method2: function() {
                                        console.log('Copying templates');
                                        //console.log('bundle_id'+bundle_id);
                                        this.fs.copy(
                                                     this.templatePath(),
                                                     this.destinationPath()
                                                     );
                                        this.fs.copyTpl(
                                                        this.templatePath('tiapp.xml'),
                                                        this.destinationPath('tiapp.xml'),
                                                        { GUID: generateGUID(),
                                                        ID: asks.bundle_id,
                                                        APPNAME:asks.appname,
                                                        VERSION:asks.version,
                                                        PUBLISHER:asks.publisher,
                                                        URL: asks.url,
                                                        DESCRIPTION:asks.description,
                                                        COPYRIGHT:asks.copyright,
                                                        SDK:asks.sdk[0]
                                                        }
                                                        );
                                        console.log('Youneed to register the application: appc new --import');
                                        console.log('');
                                        console.log('For running the application: appc run');                
                                        }
});
