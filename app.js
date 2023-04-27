require('dotenv').config();

const express = require('express')

const app = express()

app.use(express.json())


const db = require ('./models')

db.sequelize.authenticate()
    .then(() => { console.log('Connection db succesful')})
    .catch((err) => console.log('Connection db failed', err))
if (process.env.NODE_ENV === 'development'){
    db.sequelize.sync({force:true})
    //db.sequelize.sync({alter:{drop:false}})
}

app.listen(process.env.PORT, () => {
    console.log(`Server API started on port ${process.env.PORT}`)
}) 