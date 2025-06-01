const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 5001

app.use(express.json())

app.use(cors())

//Routes
const SupporterRoutes = require('./routes/supporterRoutes')
const VoluntaryRoutes = require('./routes/voluntaryRoutes')

app.use('/supporter', SupporterRoutes)
app.use('/voluntary', VoluntaryRoutes)

mongoose
    .connect('mongodb+srv://thomashurtado:UKPXm45Mzje24yqh@cluster0.klx0htu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Conectamos ao banco")
        app.listen(5000)
    })
    .catch((err) => console.log(err))