import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  height: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 350px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 300px;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 70%;
  display: block;

  @media (max-width: 768px) {
    height: 60%;
  }

  @media (max-width: 480px) {
    height: 50%;
  }
`;

const CardDetails = styled.div`
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const CardTitle = styled.h2`
  font-size: 1em;
  margin: 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const CardSummary = styled.p`
  font-size: 0.8em;
  color: #666;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 0.7em;
  }

  @media (max-width: 480px) {
    font-size: 0.6em;
  }
`;

const GameCard = ({ game }) => {
  return (
    <CardContainer>
      <CardImg
        src={game?.cover?.url.replace("t_thumb", "t_1080p")}
        alt={game?.name}
      />
      <CardDetails>
        <CardTitle>{game?.name}</CardTitle>
        <CardSummary>
          <strong>Genres:</strong>{" "}
          {game?.genres?.map((genre) => genre?.name).join(", ")}
        </CardSummary>
        <CardSummary>
          <strong>Game Modes:</strong>{" "}
          {game?.game_modes?.map((mode) => mode?.name).join(", ")}
        </CardSummary>
      </CardDetails>
    </CardContainer>
  );
};

export default GameCard;
