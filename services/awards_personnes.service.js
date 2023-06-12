const { Op } = require("sequelize");
const db = require("../models");
const awardPersonneDTO = require("../dto/awardPersonneDTO");



const awardPersonneService = {

    getAll: async () => {
        const { rows, count } = await db.Awards_Personnes.findAndCountAll({
            include: [
                { model: db.Personnes, as: 'Personne' },
            ],
            distinct: true
        })
        const award_Personne = rows.map(award => new awardPersonneDTO(award))
        return {
            award_Personne, count
        }
    },

    getByParams: async (data) => {
        if (data.year_award)
            data.year_award = data.year_award.split(',')
        if (data.type_award) {
            data.type_award = data.type_award.split(',')
            if (Array.isArray(data.type_award)) {
                data.type_award.map((item) => {
                    item.replace("_", " ")
                })
            }
            else
                data.type_award = data.type_award.replace("_", " ")
        }
        if (data.name_award) {
            data.type_award = data.type_award.split(',')
            if (Array.isArray(data.name_award)) {
                data.name_award.map((item) => {
                    item.replace("_", " ")
                })
            }
            else
                data.name_award = data.name_award.replace("_", " ")
        }

        const Variable_Test = [data]


        console.log('Variable_Test ', Variable_Test);

        const { rows, count } = await db.Awards_Personnes.findAndCountAll({
            include: [
                { model: db.Personnes, as: 'Personne' },
            ],
            distinct: true,
            where: {
                [Op.and]: Variable_Test
            }
        })

        const values = rows.map(award => new awardPersonneDTO(award))
        return {
            values, count
        }
    },

    update: async ( id, data ) => {
        const updateAwardPersone = await db.Awards_Personnes.update(data, {
            where: {
                ID_Award_Personne: id
            }
        })

        if (updateAwardPersone[0] === 1)
            return true
        else
            return false

    },

    create: async (data) => {
        console.log(data);
        const transaction = await db.sequelize.transaction()
        let isCreate
        
        try {

            isCreate = await db.Awards_Personnes.create(data)
            const personne = await db.Personnes.findByPk(data.ID_Personne, { transaction })
            if (personne)
                await personne.addAwards_Personnes(data.award_personne, { transaction })

            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if (isCreate)
            return true
    },

    delete: async (id) => {

        const isDeleted = await db.Awards_Personnes.findByPk(id)

        await db.Awards_Personnes.destroy({
            where: {
                ID_Award_Personne: id
            }
        })
        if (isDeleted)
            return true
        else
            return false
    }
}
module.exports = awardPersonneService 