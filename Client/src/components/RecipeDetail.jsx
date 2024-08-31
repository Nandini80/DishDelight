import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recipe details.");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;
  if (!recipe) return <Alert variant="warning" className="text-center mt-5">No recipe found.</Alert>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3 fs-3">{recipe.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Category: {recipe.category}</Card.Subtitle>
              <Card.Text>
                <strong>Ingredients:</strong>
              </Card.Text>
              <ListGroup variant="flush">
                {recipe.ingredients.split(',').map((ingredient, index) => (
                  <ListGroup.Item key={index}>{ingredient.trim()}</ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Text className="mt-4">
                <strong>Instructions: <br /> </strong> {recipe.instructions}
              </Card.Text> 
              <div className="d-flex justify-content-between mt-4">
                <Button variant="primary" as={Link} to="/">Back to Recipes</Button>
                <Button variant="secondary" as={Link} to={`/recipes/${recipe._id}/edit`}>Edit Recipe</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetail;
