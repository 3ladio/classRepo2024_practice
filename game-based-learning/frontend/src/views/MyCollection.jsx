import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Footer, Navigation } from "../components";

const Container = styled.div`
  background-color: #ffffff;
  padding: 2vw;
`;

const Heading = styled.h1`
  color: #333;
  font-size: 2vw;
  font-weight: 700;
  margin-bottom: 2vw;
`;

const GameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
`;

const GameCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 1vw;
  padding: 1vw;
  width: 20vw;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative; /* Allows absolute positioning of the cancel button */
`;

const GameImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1vw;
`;

const GameDetails = styled.div`
  margin-top: 1vw;
`;

const GameName = styled.h2`
  font-size: 1.5vw;
  margin-bottom: 0.5vw;
`;

const GameInfo = styled.p`
  font-size: 1vw;
  color: #666;
  margin-bottom: 0.5vw;
`;

const CancelButton = styled.button`
  position: absolute;
  top: 0.5vw;
  right: 0.5vw;
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 0.5vw;
  border-radius: 0.5vw;
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const MyCollection = () => {
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    const games = JSON.parse(localStorage.getItem("savedGames")) || [];
    setSavedGames(games);
  }, []);

  const removeFromCollection = (event, gameId) => {
    event.preventDefault();
    const updatedGames = savedGames.filter((game) => game.id !== gameId);
    localStorage.setItem("savedGames", JSON.stringify(updatedGames));
    setSavedGames(updatedGames);
  };

  return (
    <div>
      <Container>
        <Heading>Your Game Collection</Heading>
        <GameList>
          {savedGames.map((game, index) => (
            <GameCard key={index}>
              <Link
                to={`/gameDetails/${game.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <GameImage src={game.cover} alt={game.name} />
                <GameDetails>
                  <GameName>{game.name}</GameName>
                </GameDetails>
              </Link>
              <CancelButton onClick={(e) => removeFromCollection(e, game.id)}>
                Remove
              </CancelButton>
            </GameCard>
          ))}
        </GameList>
      </Container>
      <Footer />
    </div>
  );
};

export default MyCollection;
