const XLSX = require('xlsx')
const DataParse = require('./dataParse.js')
const dictionary = require('./dictionary.js')

class CallScript{

    constructor(workbook, sheetName){
        console.log('產生被呼叫腳本', sheetName)
        let sheet = workbook.Sheets[sheetName]
        let jsonSheet = XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})

        let count = DataParse.getCallScriptCount(jsonSheet, dictionary.CallScriptCount)
        let motions = DataParse.getDefaultMotion(jsonSheet, dictionary.DefaultMotion)

        this.Objects = []
        for(let i = 0; i < count; i++){
            let obj = { 
                NPCMotionsDefault: motions
            }
            this.Objects.push(obj)
        }
    }
}

module.exports = CallScript