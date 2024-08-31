import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RecipeEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        const { title, ingredients, instructions, category } = response.data;
        setTitle(title);
        setIngredients(ingredients);
        setInstructions(instructions);
        setCategory(category);
      })
      .catch((error) => console.error("Error fetching the recipe data:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = { title, ingredients, instructions, category };

    try {
      await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe);
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating the recipe:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Recipe</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default RecipeEdit;
