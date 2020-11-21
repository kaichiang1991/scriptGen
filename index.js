const XLSX = require('xlsx')
const fs = require('fs')
const DataParse = require('./dataParse.js')
const NormalObject = require('./normalObj')
const CallScriptObject = require('./callScriptObj.js')
const CallScript = require('./callScript.js')
const dictionary = require('./dictionary')

let createScript = (name)=>{
    let workbook = XLSX.read(dictionary.inputDir + name, {type: 'file'})
    let jsonSheet = XLSX.utils.sheet_to_json(workbook.Sheets[dictionary.Setting], {header: 1, raw: true})
    let output = {
        Probability: DataParse.getProb(jsonSheet, dictionary.Probabilty),
        NextScript: DataParse.getNextScript(jsonSheet, dictionary.NextScript),
    }

    let teamSettings = [], teamSettingsToCall = [], objects = []
    workbook.SheetNames.forEach(name => {
        if(dictionary.TeamSetting.test(name)){  // 單隻的預設值
            teamSettings.push(new NormalObject(workbook, name))
        }else if(dictionary.TeamToCallSetting.test(name)){  // 呼叫腳本的預設
            teamSettingsToCall.push(new CallScriptObject(workbook, name))
        }else if(dictionary.OneFish.test(name)){      // 單隻
            objects.push(new NormalObject(workbook, name))
        }else if(dictionary.TeamFish.test(name)){       // 呼叫腳本
            objects.push(new CallScriptObject(workbook, name))
        }
    })

    output.TeamSetting = teamSettings
    output.TeamSettingToCall = teamSettingsToCall
    output.Objects = objects

    let outputName = DataParse.getOutputName(jsonSheet, dictionary.OutputFileName)
    fs.writeFileSync(dictionary.outputDir + outputName, JSON.stringify(output, null, 2))
}

let createCallScript = (name) =>{
    let workbook = XLSX.read(dictionary.inputAideDir + name, {type: 'file'})
    // 取得檔名設定
    let jsonSheet = XLSX.utils.sheet_to_json(workbook.Sheets[dictionary.Setting], {header: 1, raw: true})
    let script = new CallScript(workbook, dictionary.CallScript)

    let outputName = DataParse.getOutputName(jsonSheet, dictionary.OutputFileName)
    fs.writeFileSync(dictionary.outputAideDir + outputName, JSON.stringify(script, null, 2))
}

let isXLSX = (name) => /.xlsx/.test(name)

let fileStatus = fs.readdirSync(dictionary.inputDir, {withFileTypes: true})
fileStatus.forEach(status =>{
    if(status.isFile() && isXLSX(status.name)){   // 一般腳本
        console.log('---------------------')
        console.log('創造一般腳本', status.name)
        console.log('---------------------')
        createScript(status.name)
    }else if(status.isDirectory()){     // Aide 腳本
        let aideScripts = fs.readdirSync(dictionary.inputDir + status.name)
        aideScripts.forEach(file =>{
            if(!isXLSX(file))
                return
            console.log('---------------------')
            console.log('創造 Aide 腳本', file)
            console.log('---------------------')
            createCallScript(file)
        })
    }
})

