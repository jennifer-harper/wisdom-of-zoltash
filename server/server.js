const fs = require('node:fs/promises')
const express = require('express')
const hbs = require('express-handlebars')

const fortuneRoutes = require('./routes')

const server = express()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

server.use('/fortune', fortuneRoutes)

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  fs.readFile(__dirname + '/data/data.json', 'utf-8')
    .then((data) => {
    let thing = JSON.parse(data)
  
    let dataObj = {
      page_title: 'The Wisdom of Zoltash',
      //first part shows in {{}} in html
      //thing.xx is the array name
      show_genres: thing.genres
    }
      res.render('home', dataObj)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// server.get('/:id/results', (req, res) => {
//   fs.readFile(__dirname + '/data/data.json', 'utf-8')
//     .then((data) => {
//     let thing = JSON.parse(data)
  
//     let dataObj = {
//       page_title: 'Fortune Time',
//       show_genres: thing.genres
//     }
//       res.render('results', dataObj)
//     })
//     .catch((err) => {
//       res.status(500).send(err.message)
//     })
// })

module.exports = server
