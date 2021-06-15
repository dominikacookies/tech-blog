const authenticator = (req, res, next) => {
  if (req.session.LoggedIn) {
    next();
  } else {
    res.redirect("/login")
  }
}

module.exports = authenticator