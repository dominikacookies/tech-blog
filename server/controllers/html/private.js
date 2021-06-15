const renderDashboard = () => {
  console.log("Dashboard")
}

const renderEditPostPage = (req, res) => {
  console.log("Edit post")
}

const renderPostPage = (req, res) => {
  console.log("Post")
}

const updatePost = async (req, res) => {
  console.log("update")
}

const deletePost = async (req, res) => {
  console.log("delete")
}

module.exports = {
  renderDashboard,
  renderEditPostPage,
  renderPostPage,
  updatePost,
  deletePost
}