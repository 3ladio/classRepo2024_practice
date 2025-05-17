import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { handleMakeUnique } from "../utils";

const FilterContainer = styled.div`
  background-color: #282c34;
  color: white;
  border-radius: 8px;
  padding: 10px;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 4px;
  }
`;

const FilterDiv = styled.div`
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const FilterHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    background-color: #575757;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    background-color: #575757;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const FilterItem = styled.div`
  font-size: 0.8rem;
  color: white;
  padding: 2px 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #575757;
  }
`;

const Filters = ({
  genres,
  gameModes,
  selectedGenres,
  selectedGameModes,
  onGenreChange,
  onGameModeChange,
}) => {
  const categories = [
    {
      title: "Age Rating",
      tags: [
        "E (Everyone)",
        "E10+ (Everyone 10 and older)",
        "T (Teen)",
        "M (Mature)",
        "AO (Adults Only)",
      ],
    },
    {
      title: "Player Perspective",
      tags: ["First-person", "Third-person", "Top down", "Side Scrolling"],
    },
    {
      title: "Graphic Style",
      tags: ["Realistic", "Cartoon", "Anime", "Retro"],
    },
    {
      title: "Language Availability",
      tags: [
        "English",
        "French",
        "Italian",
        "German",
        "Spanish",
        "Russian",
        "Chinese",
        "Dutch",
        "Czech",
        "Polish",
        "Portuguese",
        "Korean",
        "Japanese",
      ],
    },
    {
      title: "Essential Skills",
      tags: [
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
    },
    {
      title: "Accessibility Options",
      tags: [
        "Color-blind Mode",
        "Text to Speech",
        "Subtitles",
        "Contrast Modes",
        "Large Fonts",
      ],
    },
    {
      title: "Gameplay Difficulty",
      tags: ["Easy", "Medium", "Hard", "Extreme"],
    },
    {
      title: "Average Time of Session",
      tags: [
        "Short (Less than 30 minutes)",
        "Medium (30 minutes to 2 hours)",
        "Long (More than 2 hours)",
      ],
    },
    {
      title: "Controller Compatibility",
      tags: ["Easy"],
    },
  ];

  const [uniqueGenre, setUniqueGenre] = useState([]);
  const [uniqueModes, setUniqueModes] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState({});
  const filterRef = useRef(null);

  const toggleCategoryVisibility = (title) => {
    setVisibleCategories({
      ...visibleCategories,
      [title]: !visibleCategories[title],
    });
  };

  useEffect(() => {
    handleMakeUnique(genres, setUniqueGenre);
    handleMakeUnique(gameModes, setUniqueModes);
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setVisibleCategories({});
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [genres, gameModes]);

  return (
    <FilterContainer ref={filterRef}>
      <FilterHeader onClick={() => toggleCategoryVisibility("Sort and Filter")}>
        Filters
      </FilterHeader>
      <FilterDiv>
        <FilterTitle onClick={() => toggleCategoryVisibility("Genres")}>
          Genres
        </FilterTitle>
        {visibleCategories["Genres"] && (
          <div>
            {uniqueGenre.map((genre, i) => (
              <FilterItem key={i}>
                <input
                  type="checkbox"
                  id={`genre-${genre.id}`}
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={(e) => onGenreChange(e)}
                />
                <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
              </FilterItem>
            ))}
          </div>
        )}
      </FilterDiv>
      <FilterDiv>
        <FilterTitle onClick={() => toggleCategoryVisibility("Game Modes")}>
          Play Style
        </FilterTitle>
        {visibleCategories["Game Modes"] && (
          <div>
            {uniqueModes.map((mode, i) => (
              <FilterItem key={i}>
                <input
                  type="checkbox"
                  id={`gameMode-${mode.id}`}
                  value={mode.id}
                  checked={selectedGameModes.includes(mode.id)}
                  onChange={onGameModeChange}
                />
                <label htmlFor={`gameMode-${mode.id}`}>{mode.name}</label>
              </FilterItem>
            ))}
          </div>
        )}
      </FilterDiv>
      {categories.map((category, index) => (
        <FilterDiv key={index}>
          <FilterTitle onClick={() => toggleCategoryVisibility(category.title)}>
            {category.title}
          </FilterTitle>
          {visibleCategories[category.title] && (
            <div>
              {category.tags.map((tag, i) => (
                <FilterItem key={i}>
                  <input
                    type="checkbox"
                    id={`${category.title}-${i}`}
                    value={tag}
                  />
                  <label htmlFor={`${category.title}-${i}`}>{tag}</label>
                </FilterItem>
              ))}
            </div>
          )}
        </FilterDiv>
      ))}
    </FilterContainer>
  );
};

export default Filters;
