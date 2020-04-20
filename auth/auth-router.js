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

module.exports = router;
