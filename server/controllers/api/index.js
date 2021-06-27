const { Post } = require("../../models")

const createPost = async (req, res) => {
  try {
    const {title, content, imageUrl} = req.body

    if (!title || !content || !imageUrl) {
      return res.status(404).json({
        error: "Required values missing.",
      });
    }

    const newPost = await Post.create({
      title,
      body: content,
      image_url: imageUrl
    });

    return res.status(200).json({
      message: "A new post has been successfully created",
      category: newPost,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Cannot create post at this time."
    })
  }
}

const updatePost = async (req, res) => {
  try {
    const {id} = req.params
    const {title, content} = req.body

    if (!title || !content) {
      return res.status(404).json({
        error: "Required values missing.",
      });
    }

    let updateStatus

    if (req.body.imageUrl) {
      updateStatus = await Post.update({
        title,
        body: content,
        image_url: req.body.imageUrl
        },{
        where: {
          id,
        }
      })
    } else {
      updateStatus = await Post.update({
        title,
        body: content,
        },{
        where: {
          id: id,
        }
      })
    }

    if (!updateStatus[0]) {
      return res.status(404).json({
        error: "Post doesn't exist",
      });
    }

    return res.status(200).json({
      message: "update successful"
    })

  } catch (error) {
    return res.status(500).json({
      error: "Cannot update at this time."
    })
  }
}

const deletePost = async (req, res) => {
  try {
    const {id} = req.params

    const deleteResult = await Post.destroy({
      where: { id }
    });
  
    if (!deleteResult) {
      return res.status(404).json({
        error: "Post doesn't exist"
      })
    };
  
    return res.status(200).json({
      message: "The post has been successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Cannot create post at this time."
    })
  }

}

const createComment = async (req, res) => {
  console.log("updating")
}

const updateComment = async (req, res) => {
  console.log("updating")
}

const deleteComment = async (req, res) => {
  console.log("updating")
}

module.exports = {
  updatePost, 
  deletePost, 
  createPost, 
  updateComment, 
  deleteComment, 
  createComment
}