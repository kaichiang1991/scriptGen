const XLSX = require('xlsx')
const fs = require('fs')
const DataParse = require('./dataParse.js')
const NormalObject = require('./normalObj')
const CallScriptObject = require('./callScriptObj.js')

let workbook = XLSX.read('test2.xlsx', {type: 'file'})
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
console.log(outputName)
fs.writeFileSync(outputName, JSON.stringify(output))
