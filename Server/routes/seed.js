// backend/routes/seed.js
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

router.post("/seed", async (req, res) => {
  const sampleRecipes = [
    {
      title: "Spaghetti Carbonara",
      ingredients: "Spaghetti, eggs, pancetta, parmesan cheese, pepper",
      instructions: "Cook spaghetti. Mix eggs and cheese. Fry pancetta. Combine all.",
      category: "Italian",
    },
    {
      title: "Chicken Curry",
      ingredients: "Chicken, curry powder, coconut milk, onions, garlic, ginger",
      instructions: "Cook onions, garlic, and ginger. Add chicken. Stir in curry powder and coconut milk.",
      category: "Indian",
    },
  ];

  try {
    await Recipe.insertMany(sampleRecipes);
    res.status(201).json({ message: "Seed data added!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
