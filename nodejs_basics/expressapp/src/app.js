const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    // res.status(404).send("hello")
    res.status(404).json({ message: "hey!!!!!!" })
})

app.post('/users', (req, res) => {
    const { age, name } = req.body
    console.log(age, name)
    res.json({ age, name })
})

app.listen(3000, () => {
    console.log("Server is running on 3000 port")
}) 