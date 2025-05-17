import React, { useEffect, useState } from "react";
import { getGames } from "../api/games";
import { GameCard, Footer, Navigation } from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import GameBanner from "../components/GameBanner";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 50px;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    justify-content: center;
  }
`;

const GameFilterDiv = styled.div`
  width: 300px;
  position: absolute;
  top: 100px;
  right: 10px;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    right: 0;
    margin-top: 20px;
  }
`;

const CollectionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  //   const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGameModes, setSelectedGameModes] = useState([]);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const gameUtil = await getGames();
      if (gameUtil.length) {
        setGames(gameUtil);
        setIsLoading(false);
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

  const handleGenreChange = (event) => {
    const genreId = parseInt(event.target.value, 10);
    setSelectedGenres((prevState) =>
      prevState.includes(genreId)
        ? prevState.filter((id) => id !== genreId)
        : [...prevState, genreId]
    );
  };

  const handleGameModeChange = (event) => {
    const modeId = parseInt(event.target.value, 10);
    setSelectedGameModes((prevState) =>
      prevState.includes(modeId)
        ? prevState.filter((id) => id !== modeId)
        : [...prevState, modeId]
    );
  };

  const filteredGames = games.filter((game) => {
    const matchesGenres =
      selectedGenres.length === 0 ||
      (game.genres &&
        game.genres.some((genre) => selectedGenres.includes(genre.id)));
    const matchesGameModes =
      selectedGameModes.length === 0 ||
      (game.game_modes &&
        game.game_modes.some((mode) => selectedGameModes.includes(mode.id)));
    return matchesGenres && matchesGameModes;
  });

  const allGenres = [...new Set(games.flatMap((game) => game.genres || []))];
  const allGameModes = [
    ...new Set(games.flatMap((game) => game.game_modes || [])),
  ];

  const bannerGames = games.slice(0, 5);

  return (
    <>
      <GameBanner games={bannerGames} />
      <Container>
        <List>
          {!isLoading
            ? filteredGames.map((game, index) => (
                <Link
                  to={`/gameDetails/${game.id}`}
                  key={`${game.id}-${index}`}
                  style={{ textDecoration: "none" }}
                >
                  <GameCard game={game} />
                </Link>
              ))
            : "No Games Found!"}
        </List>
        <GameFilterDiv>
          <Filters
            genres={allGenres}
            gameModes={allGameModes}
            selectedGenres={selectedGenres}
            selectedGameModes={selectedGameModes}
            onGenreChange={handleGenreChange}
            onGameModeChange={handleGameModeChange}
          />
        </GameFilterDiv>
      </Container>
      <Footer />
    </>
  );
};

export default CollectionPage;
