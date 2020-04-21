const router = require("express").Router();
const Users = require("../users/users-model");
const bycrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  let user = req.body;
  // hash the creds.password
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bycrypt.hashSync(user.password, rounds);
  // update the creds to use the hash
  user.password = hash;
  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

// search for the user via the UserName
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then((found) => {
      // if user found also check that the passwords match
      if (found && bycrypt.compareSync(password, found[0].password)) {
        req.session.loggedIn = true;
        res.status(200).json({ message: "Welcome!" });
      } else {
        res.status(401).json({ message: "YOU CAN NOT PASS" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ errorMessage: "you cannot logout" });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(204).end();
  }
});

module.exports = router;
