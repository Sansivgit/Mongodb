// var express = require("express");
// var router = express.Router();
// const User = require("../model/userModel");
// const jwt = require('jsonwebtoken');

// router.post('/', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).send('Invalid email or password');
//     }
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.status(200).json({ token });

//     // You can customize the login response as needed
//     // res.status(200).send('Login successful');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Login failed');
//   }
// });


// router.get('/loginuser/details', (req, res) => {
//   // Verify the JWT token from the request and return user details
//   const token = req.headers.authorization.split(' ')[1];
//   jwt.verify(token, 'your-secret-key', async (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//     const user = await User.findById(decoded.userId);
//     res.status(200).json(user);
//   });
// });


// module.exports = router