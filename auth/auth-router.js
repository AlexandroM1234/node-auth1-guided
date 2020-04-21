const router = require("express").Router();
const Users = require("../users/users-model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../api/secrets");

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
        // produce a token
        const token = createToken(found);
        // send token to the client
        res.status(200).json({ message: "Welcome!", token });
      } else {
        res.status(401).json({ message: "YOU CAN NOT PASS" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

function createToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
