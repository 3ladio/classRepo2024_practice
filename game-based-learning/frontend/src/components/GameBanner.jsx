import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  position: relative;
  width: 75vw;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 30px;
  overflow: hidden;
  box-shadow: 5px 5px 8px grey;
  &:hover {
    transform: scale(1.02);
  }
`;

const Slide = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 2.5s ease-in-out;
  &.active {
    display: block;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const BannerContent = styled.div`
  position: absolute;
  top: 140px;
  left: 80px;
  color: white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
  cursor: pointer;
`;

const BannerTitle = styled.h1`
  font-size: 1.5rem;
  margin: 10px 0;
  font-family: "Papyrus";
  font-weight: bold;
`;

const BannerDescription = styled.p`
  font-size: 0.8rem;
  color: #fff;
  font-family: "Papyrus";
  font-weight: bold;
  margin: 0px 300px 0px 0px;
`;

const GameBanner = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [games.length]);

  return (
    <BannerContainer>
      {games.map((game, index) => (
        <Slide key={game.id} className={index === currentIndex ? "active" : ""}>
          <Link
            to={`/gameDetails/${game.id}`}
            style={{ textDecoration: "none" }}
          >
            <BannerImage
              src={game.cover.url.replace("t_thumb", "t_1080p")}
              alt={game.name}
            />
            <BannerContent>
              <BannerTitle>{game.name}</BannerTitle>
              <BannerDescription>{game.summary}</BannerDescription>
            </BannerContent>
          </Link>
        </Slide>
      ))}
    </BannerContainer>
  );
};

export default GameBanner;
