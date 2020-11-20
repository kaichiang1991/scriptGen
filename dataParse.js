class DataParse{
    
    static findRow(data, condition){
        let raw = data.find(row => row[0] == condition)
        return raw? raw.splice(1): []
    }

    static getProb(data, prob){
        return Number(this.findRow(data, prob)[0])
    }

    static getNextScript(data, next){
        return Number(this.findRow(data, next)[0])
    }

    static getOutputName(data, output){
        return this.findRow(data, output) + '.json'
    }

    /**
     * 取得NPC Settings
     * @param {*} types 種類
     * @param {*} motions 動作類型
     */
    static getNpcSettings(data, type, motion, step){

        let settings = [], motions = this.findRow(data, motion), steps = this.findRow(data, step)
        this.findRow(data, type).forEach((type, i) =>{
            let obj = { NPCNumber: Number(type)}
            if(motions[i])  obj.NPCMotion = Number(motions[i])
            if(steps[i])     obj.NPCActiveSteps = Number(steps[i])
            settings.push(obj)
        })

        return settings
    }

    static getScripts(data, script){
        return this.findRow(data, script)
    }

    /**
     * 取得 Default Motion
     * @param {*} motions 
     */
    static getDefaultMotion(data, motion){
        return this.findRow(data, motion)[0].split(',').map(motion => Number(motion))
    }

    static getDefaultSteps(data, step){
        return this.findRow(data, step)[0].split(',').map(step => Number(step))
    }

    static getInterval(data, type){
        return this.findRow(data, type)
    }

}

module.exports = DataParse