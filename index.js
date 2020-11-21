const XLSX = require('xlsx')
const fs = require('fs')
const DataParse = require('./dataParse.js')
const NormalObject = require('./normalObj')
const CallScriptObject = require('./callScriptObj.js')
const CallScript = require('./callScript.js')

let createScript = (name)=>{
    let workbook = XLSX.read('./input/' + name, {type: 'file'})
    let sheet = workbook.Sheets['腳本設定']
    let jsonSheet = XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})
    
    let obj1 = new NormalObject(workbook, 'Script3')
    let obj2 = new CallScriptObject(workbook, 'Script2')

    let output = {
        Probability: DataParse.getProb(jsonSheet, '權重'),
        NextScript: DataParse.getNextScript(jsonSheet, 'Next'),
        Objects: [obj1, obj2]
    }
    
    let outputName = DataParse.getOutputName(jsonSheet, '輸出檔名')
    fs.writeFileSync('./output/' + outputName, JSON.stringify(output, null, 2))
}

let createCallScript = (name) =>{
    let workbook = XLSX.read('./input/Aide/' + name, {type: 'file'})
    // 取得檔名設定
    let sheet = workbook.Sheets['腳本設定']
    let jsonSheet = XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})
    let script = new CallScript(workbook, 'Script')

    let outputName = DataParse.getOutputName(jsonSheet, '輸出檔名')
    fs.writeFileSync('./output/Aide/' + outputName, JSON.stringify(script, null, 2))
}

let isXLSX = (name) => /.xlsx/.test(name)

let fileStatus = fs.readdirSync('./input', {withFileTypes: true})
fileStatus.forEach(status =>{
    if(status.isFile() && isXLSX(status.name)){   // 一般腳本
        createScript(status.name)
    }else if(status.isDirectory()){     // Aide 腳本
        let aideScripts = fs.readdirSync('./input/' + status.name)
        aideScripts.forEach(file =>{
            if(!isXLSX(file))
                return
            createCallScript(file)
        })
    }
})

