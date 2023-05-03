const { Op } = require("sequelize");
const db = require("../models");
const awardPersonneDTO = require("../dto/awardPersonneDTO");



const awardPersonneService = {
    getAll : async () => {
        const { rows, count } = await db.Awards_Personnes.findAndCountAll({
            include: [ db.Personnes ],
            distinct: true
        })
        const award_Personne = rows.map( award => new awardPersonneDTO(award))
        return {
            award_Personne, count 
        }
    },
    getByParams: async (data) => {

        let Variable_Test = []

        if(data.type_award){
            data.type_award = data.type_award.replace("_"," ") 
        }

        Variable_Test = [data]
        
        
        console.log('Variable_Test ', Variable_Test);

        const { rows, count} = await db.Awards_Personnes.findAndCountAll({
            include: [ db.Personnes ],
            distinct: true,
            where: {
                [ Op.and ]: Variable_Test
            }
        })

        const values = rows.map(award => new awardPersonneDTO(award))
        return { 
            values, count
        } 
    },
    update : async () => {
        //TODO update
    },
    create : async (data) => {
        // TODO ajouter la feature pour ajouter la personne associe
        const isCreate = await db.Awards_Personnes.create(data)
        if(isCreate)
            return true
        else
            return false
    },
    delete : async (id) => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false
        const isDeleted = await db.Awards_Personnes.destroy({
            where:{
                ID_Award_Personne : id
            }
        })
    }  
}
module.exports = awardPersonneService 