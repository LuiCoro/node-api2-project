// implement your posts router here
const express = require('express');

const router = express.Router()

const Posts = require('./posts-model')


// Need to get all 10 Posts back for this to work
// GET /api/posts
router.get('/', (req, res) => {
  Posts.find()
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(error => {
        res.status(500).json({message: 'The posts information could not be retrieved'})
      })
})


// GET /api/posts/:id
// if not found -> Code : 404 {message: 'The post with the specified ID does not exist'}
// ERROR retrieving from Data Base -> Code 500 {message: 'The post information could not be retrieved'}
router.get('/:id', (req, res) => {

  const {id} = req.params

  Posts.findById(id)
      .then(post => {

        if (post) {
          res.status(200).json(post)
        } else {
          res.status(404).json({message: 'The post with the specified ID does not exist'})
        }

      }).catch(error => {
    res.status(500).json({message: 'The post information could not be retrieved'})
  })
})

module.exports = router