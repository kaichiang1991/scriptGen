const XLSX = require('xlsx')
const DataParse = require('./dataParse.js')

class CallScript{

    constructor(workbook, sheetName){
        let sheet = workbook.Sheets[sheetName]
        let jsonSheet = XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})

        let count = DataParse.getCallScriptCount(jsonSheet, '數量')
        let motions = DataParse.getDefaultMotion(jsonSheet, '預設動作')

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