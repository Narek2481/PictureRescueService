import jwt from "jsonwebtoken"
const secretKey = 'mysecretkey';

// Generate a verification token for a user
function generateVerificationToken(userId) {
  const payload = { sub: userId };
  const options = { expiresIn: '24h' };
  return jwt.sign(payload, secretKey, options);
}

// Verify a verification token and return the associated user ID
function verifyVerificationToken(token) {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload.sub;
  } catch (err) {
    return null;
  }
}



const login_submit = app => {
    app.post("/login_submit", (req, res) => {
        // const token = req.query.token;
        // const userId = verifyVerificationToken(token);
        // const token_x = generateVerificationToken(req.body.email);
        // const verifyLink = `http://localhost:4000/verify-email?token=${token}`;

        // if (!userId) {
        //     res.status(400).send('Invalid or expired verification token');
        //     return;
        // }
        console.log(req.body);
        res.send("ok");
    });
}
export default login_submit;