const XLSX = require('xlsx')
const fs = require('fs')
const DataParse = require('./dataParse.js')
const NormalObject = require('./normalObj')
const CallScriptObject = require('./callScriptObj.js')

let files = fs.readdirSync('./input')
files.forEach(file =>{
    let workbook = XLSX.read('./input/' + file, {type: 'file'})
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
})

