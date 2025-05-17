import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import { getGames } from "../api/games";

const PageContainer = styled.div`
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* You can adjust the gap value as needed */
`;

const Popup = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
    padding: 5px 10px;
  }
`;

const LTTagsView = () => {
  const [gamesData, setGamesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tempGameData, setTempGameData] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);

  const tags = {
    Genres: [
      "Strategy",
      "Turn-based strategy",
      "War",
      "Puzzle",
      "Action",
      "Adventure",
      "RPG",
      "Fantasy",
      "Open World",
      "Simulation",
      "Realistic",
      "RTS (real-time strategy)",
      "Building",
      "Choices matter",
      "Character Customization",
      "Story Rich",
      "Racing",
      "Driving",
      "City Builder",
      "Grand Strategy",
      "Flight",
      "Tactical",
      "Shooter",
      "Sci-fi",
      "Party-based",
      "Rogue-like",
      "Space",
      "Card game",
      "Board game",
      "Sports Sim",
      "MMO",
    ],
    "Age Rating": [
      "E (Everyone)",
      "E10+ (Everyone 10 and older)",
      "T (Teen)",
      "M (Mature)",
      "AO (Adults Only)",
    ],
    "Release Year": [], // Add release years as needed
    "Player Perspective": [
      "First-person",
      "Third person",
      "Top-down",
      "Side-scrolling",
    ],
    "Graphics Style": ["Realistic", "Cartoon", "Anime", "Retro"],
    "Language Availability": [], // Add languages as needed
    "Essential Skills": [
      "Communication",
      "Collaboration",
      "Metacognition",
      "Leadership",
      "Growth Mindset",
      "Mindfulness",
      "Creativity",
      "Critical Thinking",
      "Character",
      "Fortitude",
    ],
    "Gameplay Difficulty": ["Easy", "Medium", "Hard", "Extreme"],
    "Average Time of a Session": [
      "Short (Less than 30 minutes)",
      "Medium (30 minutes to 2 hours)",
      "Long (More than 2 hours)",
    ],
    "Play Style": ["Single player", "Multiplayer", "Online"],
    "Controller Complexity": ["Easy", "Medium", "Hard"],
  };

  const handleAddTags = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleApply = async () => {
    const body = {
      name: tempGameData.name,
      gameId: tempGameData.id,
      insRating: 1,
      tags: selectedTags,
    };

    try {
      console.log(body.tags);
      const response = await axios.post(
        "http://localhost:5000/api/update-tags",
        { ...body }
      );

      if (response.status === 201) {
        console.log(`Game created! id is ${body.gameId}`);
      }
      setSelectedTags([]);
      setShowModal(false);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to add Game Tags", error);
      setSelectedTags([]);
      setShowModal(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    }
  };

  const fetchGames = async () => {
    try {
      const gameUtil = await getGames();
      if (gameUtil.length) {
        setGamesData(gameUtil);
      } else {
        console.log("No Games Found!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <PageContainer>
      {popupVisible && <Popup>Tags Added Successfully!</Popup>}
      <h2>Add Game Tags</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Game List</th>
            <th>Current Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gamesData.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.name}</td>
              {/* <td>{game?.genre ? game.genre : []}</td> */}
              <td>{game?.genre ? game.genre : []}</td>
              <td>
                <ButtonContainer>
                  <Button
                    variant="success"
                    onClick={() => {
                      setTempGameData(game);
                      handleAddTags();
                    }}
                  >
                    Add Tags
                  </Button>
                  <Button variant="danger">Remove Tags</Button>
                </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.entries(tags).map(([category, tags]) => (
            <div key={category}>
              <h5>{category}</h5>
              <Form>
                {tags.map((tag, i) => (
                  <Form.Check
                    key={i}
                    type="checkbox"
                    label={tag}
                    value={tag}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Form>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </PageContainer>
  );
};

export default LTTagsView;
