// server.js

const express = require("express");
const withAuth = require("./authDecorator");

const app = express();

app.use(express.json());


// Original API handler
async function getProfile(req, res) {
  return res.json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
}


// Decorated handler with authentication
app.get("/profile", withAuth(getProfile));


// Another protected route
app.get(
  "/dashboard",
  withAuth(async (req, res) => {
    res.json({
      success: true,
      message: `Welcome ${req.user.name}`,
    });
  })
);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});