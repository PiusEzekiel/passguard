// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const passwordUtil = require("./password_util");

// Create an Express app
const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Endpoint for password evaluation
app.post("/password-evaluation-api", (req, res) => {
  const { password, policy } = req.body;
  const evaluationResult = passwordUtil.evaluatePassword(password, policy);
  res.json(evaluationResult);
});

// Endpoint for password suggestion
app.post("/password-suggestion-api", (req, res) => {
  const { policy } = req.body;
  const suggestedPassword = passwordUtil.suggestPassword(policy);
  res.json({ suggestedPassword });
});

// Endpoint for password policy validation
app.post("/password-policy-api", (req, res) => {
  const { password, policy } = req.body;
  const valid = passwordUtil.validatePasswordPolicy(password, policy);
  res.json({ valid });
});

// Start the server
app.listen(5500, () => {
  console.log("Server is running on port 5500");
});