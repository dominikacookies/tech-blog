const authenticator = (req, res, next) => {
  console.log(req.session.loggedIn)
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login")
  }
}

module.exports = authenticator