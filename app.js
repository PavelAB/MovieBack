require('dotenv').config();

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.static('public'))
app.use(express.json())


const db = require ('./models')
const route = require ('./routes')

db.sequelize.authenticate()
    .then(() => { console.log('Connection db succesful')})
    .catch((err) => console.log('Connection db failed', err))
if (process.env.NODE_ENV === 'development'){
    //db.sequelize.sync({ force: true })
    //db.sequelize.sync({alter:{drop:false}})
}

app.use('/api',route)

app.listen(process.env.PORT, () => {
    console.log(`Server API started on port ${process.env.PORT}`)
}) 