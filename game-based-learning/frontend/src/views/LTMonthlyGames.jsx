import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
// import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from "styled-components";
import { getGames, getMonthlyGames } from "../api/games";

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

const MonthlyGames = () => {
  const [gamesData, setGamesData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [gameList, setGameList] = useState([]);

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

  const handleAddGame = async (name, gameId, cover) => {
    try {
      const body = { name, gameId, cover };

      const response = await axios.post("http://localhost:5000/api/add-game", {
        ...body,
      });
      if (response.status === 201) {
        setPopupMessage("Game Added Successfully!");
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 1000);
        console.log(`Game created! id is ${gameId}`);
      }
    } catch (error) {
      console.error("Failed to add game", error);
    }
  };

  const getMonthly = async () => {
    try {
      const response = await getMonthlyGames();
      setGameList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      getMonthly();
      const body = { gameId };
      const deleteId = gameList.filter((item) => item.gameId == gameId);
      const response = await axios.delete(
        `http://localhost:5000/api/game/${deleteId[0]._id}`
      );
      setPopupMessage("Game Deleted Successfully!");
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to delete game", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);
  //gamesData, gameList

  return (
    <PageContainer>
      {popupVisible && <Popup>{popupMessage}</Popup>}
      <h2>Add Monthly Games</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Games</th>
            <th>Add to monthly games</th>
          </tr>
        </thead>
        <tbody>
          {gamesData.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.name}</td>
              <td>
                <ButtonContainer>
                  <Button
                    variant="success"
                    onClick={() =>
                      handleAddGame(game.name, game.id, game.cover.url)
                    }
                  >
                    Add Game
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteGame(game.id)}
                  >
                    Remove Game
                  </Button>
                </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default MonthlyGames;
