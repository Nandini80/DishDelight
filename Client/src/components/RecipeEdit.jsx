import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const RecipeEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
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
      navigate(`/recipes/${id}`); // Navigate to the recipe detail page after updating
    } catch (error) {
      console.error("Error updating the recipe:", error);
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Col md={8} lg={6}>
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <Card.Title className="mb-4">Edit Recipe</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter recipe title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Recipe
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default RecipeEdit;
