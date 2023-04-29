const fs = require('node:fs/promises')
const express = require('express')
const router = express.Router()



router.get('/:id', (req, res) => {
  // const id = Number(req.params.id)
  const id = req.params.id

  fs.readFile(__dirname + '/data/data.json', 'utf-8')
    .then((data) => {
      const parsedAnswer = JSON.parse(data)
      const theOne = parsedAnswer.genres.find((element) => element.id === id)

      let dataObj ={
        page_title:"You have chosen ",
        selected_genre: theOne,
        
      }
      // console.log(theOne)

      res.render('edit', dataObj)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})


//get the form and the user input and use fs.writeFile to update json
router.post('/:id/edit', (req, res) => {
  const formAnswer = req.body
  //return the id as a number, not a string
  // const id = Number(req.params.id)
  const id = req.params.id

  fs.readFile(__dirname + '/data/data.json', 'utf-8')
    .then((data) => {

      //get all the genres
      const parsedAnswer = JSON.parse(data)

      //get all the pups and find the one that matches my edit page id
      const oldAnswer = parsedAnswer.genres.find((element) => element.id === id)

      //get the breed from oldAnswer and change it to what my form said
      oldAnswer.answer = formAnswer.answer

      //change the json data so its readable, and align back to object
      const stringAnswer = JSON.stringify(parsedAnswer, null, 2)
      // console.log(stringAnswer)
      return fs.writeFile(__dirname + '/data/data.json', stringAnswer)
    })

    .then(() => res.redirect(`/fortune/${id}/results`))

    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.get('/:id/results', (req, res) => {
  
  // const id = Number(req.params.id)
  const id = req.params.id

  fs.readFile(__dirname + '/data/data.json', 'utf-8')
    .then((data) => {

      const parsedAnswer = JSON.parse(data)
      const theGenre = parsedAnswer.genres.find((element) => element.id === id)
      const theFortune = parsedAnswer[theGenre.id]

      const randomIndex = Math.floor(Math.random() * theFortune.length);
      const randomFortune = theFortune[randomIndex];


      let dataObj ={
        page_title:"Your fortune",
        selected_genre: theGenre,  
        selected_fortune: randomFortune     
      }

      res.render('results', dataObj)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})



module.exports = router
