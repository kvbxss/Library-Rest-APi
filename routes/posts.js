const express = require('express');
const  mongoose  = require('mongoose');
const  findById  = require('../models/Post');
const router = express.Router();
const Post = require('../models/Post');
const checkAuth = require('../middleware/check-auth');

//GET  ALL POSTS
router.get('/', async (req,res, next) => {
 try{
     const posts = await Post.find();
     res.json(posts);
 }catch(err) {
     res.json({message: err});
 }
    
});
//SUMBIT POST
router.post('/',checkAuth, async (req,res, next) => {
    const post = new Post ({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
        
    });
    try{
    const savedPost = await post.save()
    .then((doc) => {
        res.status(200).json({
            message: "Książka dodana pomyślnie",
            info: doc,
        });
    })
    res.json(savedPost);

}
catch(err){
    res.json({message: err });
}

});
//SPECIFIC POST by Id

router.get('/:postId', async (req, res, next) => {
    const _id = req.params.postId
    const post = await Post.findById(req.params.postId)
    .then((doc) => {
        res.status(200).json({
            message: "Książka z id " + _id,
            info: doc,
        });
    });
})

//Delete post by Id

router.delete('/:postId',checkAuth ,async (req,res, next) => {
    const _id = req.params.postId
    try { 
    const removed = await Post.remove({_id: req.params.postId})
    .then((doc) => {
        res.status(200).json({
            message: "Książka usunięta z biblioteki " + _id,
            info: doc,
        });
    })
}
catch (err) {
    res.json({message:err});
}
});

//Patch post by Id

router.patch('/:postId', checkAuth, (req, res, next) => {
    const _id = req.params.postId;
    Post.findByIdAndUpdate(
      _id,
      {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
      },
      { new: true }
    )
      .then((doc) => {
        res.status(200).json({
          message: 'Książka zaktualizowana' + _id,
          info: doc,
        });
      })
      .catch((err) => res.status(500).json({ wiadomość: err }));
  });


module.exports = router;