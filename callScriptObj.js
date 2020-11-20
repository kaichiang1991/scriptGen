const XLSX = require('xlsx')
const DataParse = require('./dataParse.js')

class CallScriptObject{

    constructor(workbook, sheetName){
        let sheet = workbook.Sheets[sheetName]
        let jsonSheet = XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})

        this.CallScript = {
            Scripts: DataParse.getScripts(jsonSheet, '腳本名稱'),
            NPCSettings: DataParse.getNpcSettings(jsonSheet, '種類', '動作類型', '間隔時間'),
            NPCActiveStepsDefault: DataParse.getDefaultSteps(jsonSheet, '預設間隔')
        }
        
        let activeInterval = DataParse.getInterval(jsonSheet, '啟動時間')
        let xInterval = DataParse.getInterval(jsonSheet, 'X')
        let yInterval = DataParse.getInterval(jsonSheet, 'Y')
        let angleInterval = DataParse.getInterval(jsonSheet, 'Angle')
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