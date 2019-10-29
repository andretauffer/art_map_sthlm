console.log("req body", req.body);
let user = await client.query("SELECT * FROM Users WHERE username = $1", [
  req.body.username
]);
if (user.rows[0].password === req.body.password) {
  const token = jwt.sign(
    {
      data: user.rows[0].id
    },
    "secret",
    { expiresIn: 60 * 60 }
  );
  const retVal = { login: 1, id: token, name: user.rows[0].name };
  res.send(JSON.stringify(retVal));
} else {
  const retVal = { login: 0, status: "Invalid Password" };
  res.send(JSON.stringify(retVal));
}
