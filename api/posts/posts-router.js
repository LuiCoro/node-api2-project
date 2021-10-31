// implement your posts router here
const express = require('express');

const router = express.Router()

const Posts = require('./posts-model')

// GET /api/posts
router.get('/', async (req, res) => {
  const posts = await Posts.find()
  if(!posts) {
    res.status(500).json({ message: "The posts information could not be retrieved" })
  } else {
    res.status(200).json(posts)
  }
})

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try{
    const {id} = req.params
    const post = await Posts.findById(id)
    if(!post) {
      res.status(404).json({message: 'The post with the specified ID does not exist'})
    } else {
      res.status(200).json(post)
    }
  } catch (error) {
    res.status(500).json({message: 'The post information could not be retrieved'})
  }
})

// POST /api/posts
router.post('/', async(req, res) => {
  try{
    const {title, contents} = req.body
    if(!title || ! contents) {
      res.status(400).json({message: 'Please provide title and contents for the post'})
    } else {
      const newPost = await Posts.insert({title, contents})

      res.status(200).json(newPost)
    }
  } catch (error) {
    res.status(500).json({message: 'There was an error while saving the post to the database'})
  }
})

// PUT /api/posts/:id

router.put('/:id', async (req, res) => {
  try{
    const {id} = req.params
    const {title, contents} = req.body

    if(!title || !contents) {
      res.status(400).json({message: 'Please provide title and contents for the post'})
    } else {
      const updatePost = await Posts.update(id, {title, contents})

      if(!updatePost) {
        res.status(404).json({message: 'The post with the specified ID does not exist'})
      } else {
        res.status(200).json(updatePost)
      }
    }

  } catch (error) {
    res.status(500).json({message: 'The post information could not be modified'})
  }
})



module.exports = router