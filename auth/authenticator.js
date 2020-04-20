module.exports = (req, res, nex) => {
  if (req.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: "YOU CANNOT PASS!" });
  }
};
