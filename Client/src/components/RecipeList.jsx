import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes")
      .then((response) => {
        setRecipes(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((recipe) => recipe.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      axios
        .get("http://localhost:5000/api/recipes")
        .then((response) => setRecipes(response.data))
        .catch((error) => console.error("Error fetching recipes:", error));
    } else {
      axios
        .get(`http://localhost:5000/api/recipes/category/${category}`)
        .then((response) => setRecipes(response.data))
        .catch((error) => console.error("Error fetching recipes by category:", error));
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Your Source for Tasty Food Narratives
      </h2>
      <div className="d-flex justify-content-center mb-4">
        <Form.Select 
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          aria-label="Browse by Category"
          style={{ maxWidth: "300px" }}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </div>
      {recipes.length === 0 ? (
        <p className="text-center">No recipes available. Try adding some!</p>
      ) : (
        <Row className="g-4">
          {recipes.map((recipe) => (
            <Col key={recipe._id} xs={12} md={6} lg={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="mb-2">{recipe.title}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    Category: {recipe.category}
                  </Card.Subtitle>
                  <Card.Text>{recipe.ingredients}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" as={Link} to={`/recipes/${recipe._id}`}>
                      View Details
                    </Button>
                    <Button variant="outline-secondary" as={Link} to={`/recipes/${recipe._id}/edit`}>
                      Edit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RecipeList;
