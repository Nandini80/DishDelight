// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeDetail from "./components/RecipeDetail";
import './styles.css';  // Import the CSS file

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/recipes/new">Add Recipe</Link>
        </nav>
        <div className="container">
          <h1>Recipe Sharing Platform</h1>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipes/new" element={<RecipeForm />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
