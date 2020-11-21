const XLSX = require('xlsx')
const DataParse = require('./dataParse.js')
const dictionary = require('./dictionary.js')

class CallScriptObject{

    constructor(workbook, sheetName){
        console.log('產生呼叫腳本的魚', sheetName)
        let sheet = workbook.Sheets[sheetName]
        let jsonSheet = XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})

        this.CallScript = {
            Scripts: DataParse.getScripts(jsonSheet, dictionary.CallScriptName),
            NPCSettings: DataParse.getNpcSettings(jsonSheet, dictionary.NPCNumber, dictionary.NPCMotion, dictionary.ActiveStep),
            NPCActiveStepsDefault: DataParse.getDefaultSteps(jsonSheet, dictionary.DefaultActiveStep)
        }
        
        let activeInterval = DataParse.getInterval(jsonSheet, dictionary.ActiveTime)
        let xInterval = DataParse.getInterval(jsonSheet, dictionary.OffsetX)
        let yInterval = DataParse.getInterval(jsonSheet, dictionary.OffsetY)
        let angleInterval = DataParse.getInterval(jsonSheet, dictionary.Angle)
        this.ActiveTimeBegin = activeInterval[0]
        this.ActiveTimeEnd = activeInterval[1]
        this.XBegin = xInterval[0]
        this.XEnd = xInterval[1]
        this.YBegin = yInterval[0]
        this.YEnd = yInterval[1]
        this.AngleBegin = angleInterval[0]
        this.AngleEnd = angleInterval[1]
    }
}

module.exports = CallScriptObject