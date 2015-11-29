/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

'use strict';

var fs = require('fs');
var constants = require('./dependencies/Constants');
var adobeair = require('./dependencies/AdobeAIR');
var flashplayerglobal = require('./dependencies/FlashPlayerGlobal');
var apacheFlexJS = require('./dependencies/ApacheFlexJS');
var apacheFalcon = require('./dependencies/ApacheFalcon');
var swfObject = require('./dependencies/SWFObject');

var installSteps = [
    createDownloadsDirectory,
    installFlashPlayerGlobal,
    installAdobeAIR,
    installApacheFlexJS,
    installApacheFalcon,
    installSWFObject];
var currentStep = 0;

function start()
{
    installSteps[0].call();
}

function createDownloadsDirectory()
{
    //Create downloads directory if it does not exist already
    try
    {
        fs.mkdirSync(constants.DOWNLOADS_FOLDER);
    }
    catch(e)
    {
        if ( e.code != 'EEXIST' ) throw e;
    }
    handleInstallStepComplete();
}


function handleInstallStepComplete(event)
{
    currentStep += 1;
    if(currentStep >= installSteps.length)
    {
        allDownloadsComplete();
    }
    else
    {
        if(installSteps[currentStep] != undefined)
        {
            installSteps[currentStep].call();
        }
    }
}

function installFlashPlayerGlobal()
{
    flashplayerglobal.on('complete', handleInstallStepComplete);
    flashplayerglobal.install();
}

function installAdobeAIR(event)
{
    adobeair.on('complete', handleInstallStepComplete);
    adobeair.install();
}

function installApacheFlexJS(event)
{
    apacheFlexJS.on('complete', handleInstallStepComplete);
    apacheFlexJS.install();
}

function installApacheFalcon(event)
{
    apacheFalcon.on('complete', handleInstallStepComplete);
    apacheFalcon.install();
}

function installSWFObject(event)
{
    swfObject.on('complete', handleInstallStepComplete);
    swfObject.install();
}

function allDownloadsComplete()
{
    console.log('Completed all downloads');
}

start();
