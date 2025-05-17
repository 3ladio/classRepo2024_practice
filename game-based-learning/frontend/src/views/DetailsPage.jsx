import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, Navigation } from "../components";
import genre from "../assets/tag1.jpg";
import themes from "../assets/themes1.jpg";
import releaseDate from "../assets/releasedate1.png";
import developer from "../assets/developer1.jpg";
import platform from "../assets/desktop1.jpg";
import modes from "../assets/modes1.png";
import playersIcon from "../assets/modes1.png";
import psPlusIcon from "../assets/ps51.png";
import remotePlayIcon from "../assets/remoteplay1.png";
import onlinePlayIcon from "../assets/online1.png";
import { getGameTagz } from "../api/games";

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
`;

const Details = styled.div`
  width: 97vw;
  height: 41vw;
  background-color: #fff;
  border-radius: 1vw;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  position: relative;
  margin: 1vw;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Info = styled.div`
  padding: 2vw;

  @media (max-width: 768px) {
    padding: 1vw;
  }
`;

const Heading = styled.h1`
  margin: 1vw;
  margin-bottom: 1vw;
  color: black;
  font-weight: 1000;
  font-size: 2vw;
  font-style: bold;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const Highlight = styled.span`
  color: #ffae00;
`;

const ListContainer = styled.div`
  font-weight: 600;
  font-family: Arial, sans-serif;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 1vw;
  padding: 0.5vw;
  width: 30vw;

  @media (max-width: 768px) {
    width: 100%;
    padding: 2vw;
  }
`;

const List = styled.ul`
  list-style-type: none;
`;

const ListItem = styled.li`
  margin-bottom: 0.5vw;
  color: #5c5c5c;
  font-size: 1vw;
  display: flex;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const StyledImage = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  margin-right: 1vw;

  @media (max-width: 768px) {
    width: 4vw;
    height: 4vw;
  }
`;

const Cover = styled.div`
  font-family: Arial, sans-serif;
  position: relative;
  text-align: center;
  margin-top: 1vw;
  margin-right: 2vw;
`;

const Rating = styled.div`
  position: relative;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.5vw;
  border-radius: 1vw;
  margin-top: 1vw;
  margin-left: 1.1vw;
  width: 27vw;
  left: 14.3vw;

  @media (max-width: 768px) {
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Stars = styled.span`
  color: gold;
`;

const BookButton = styled.button`
  display: inline-block;
  padding: 0.6vw 1.2vw;
  margin-top: 1vw;
  margin-bottom: 0.5vw;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;

  &:hover {
    background-color: #5d1616;
  }

  @media (max-width: 768px) {
    margin-top: 2vw;
    padding: 1vw 2vw;
  }
`;

const InfoButton = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  position: absolute;
  top: 85%;
  left: 90%;
  transform: translate(-50%, -50%);
  margin-top: 1vw;
  padding: 1vw 2vw;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;

  &:hover {
    background-color: #5d1616;
  }

  @media (max-width: 1024px) {
    left: 85%;
    padding: 1.5vw 3vw;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin-top: 2vw;
    margin-bottom: 2vw;
    padding: 2vw 4vw;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;
const Button = styled.button`
  display: inline-block;
  margin-top: 1vw;
  padding: 0.6vw 1.2vw;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;

  &:hover {
    background-color: #5d1616;
  }

  @media (max-width: 768px) {
    margin-top: 2vw;
    padding: 1vw 2vw;
  }
`;

const RatingInfo = styled.div`
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: #fff;
  padding-top: 0.3vw;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  font-size: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    font-size: 3vw;
    margin-left: 3vw;
    margin-right: 3vw;
  }
`;

const RatingText = styled.span`
  margin-right: 1vw;
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  cursor: pointer;
  font-size: 1.5vw;
  color: ${(props) => (props.filled ? "gold" : "gray")};
  margin-right: 0.3vw;

  &:hover {
    color: gold; /* Change color on hover */
  }

  @media (max-width: 768px) {
    font-size: 3vw;
    margin-right: 0.8vw;
  }
`;

const HalfStar = styled.span`
  cursor: pointer;
  font-size: 1.5vw;
  color: ${(props) => (props.filled ? "gold" : "gray")};
  margin-right: 0.25vw;
  width: 1vw;
  overflow: hidden;
  position: relative;

  &::before {
    content: "★";
    position: absolute;
    left: 0;
    width: 50%;
    overflow: hidden;
  }

  &:hover {
    color: gold; /* Change color on hover */
  }

  @media (max-width: 768px) {
    font-size: 3vw;
    margin-right: 0.4vw;
  }
`;

const FeatureBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2vw 1vw;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 4vw 1vw;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 1.3vw;
  color: #333;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 4vw;
    margin-bottom: 2vw;
  }
`;

const FeatureIcon = styled.img`
  width: 4vw;
  height: 3.3vw;
  margin-bottom: 0.5vw;

  @media (max-width: 768px) {
    width: 10vw;
    height: 8.3vw;
  }
`;
const SaveButton = styled(BookButton)`
  margin-left: 1vw;
`;
const SummaryContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fff;
  border-radius: 1vw;
  padding: 1.5vw;
  margin: 1vw;
  width: 97vw;
  background-color: #d7d7d7;

  @media (max-width: 768px) {
    padding: 3vw;
    margin: 2vw;
  }
`;

const SummaryHeading = styled.h2`
  font-size: 2vw;
  color: #000000;
  margin-bottom: 1vw;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const SummaryText = styled.p`
  font-size: 1.1vw;
  color: #000000;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const FormContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  position: absolute;
  top: 40%;
  left: 53%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2vw;
  border-radius: 1vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 30vw;

  @media (max-width: 768px) {
    width: 80%;
    padding: 5vw;
    top: 50%;
  }
`;

const FormTitle = styled.h3`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5vw;
  color: #000;
  margin-bottom: 1vw;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const Form = styled.form`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0.5vw;
  color: #333;
  font-weight: bold;
  font-size: 1vw;

  @media (max-width: 768px) {
    font-size: 3vw;
    margin-bottom: 1.5vw;
  }
`;

const Input = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  padding: 0.5vw;
  margin-bottom: 1vw;
  border: 1px solid #ccc;
  border-radius: 0.5vw;
  font-size: 1vw;

  @media (max-width: 768px) {
    padding: 2vw;
    margin-bottom: 3vw;
    font-size: 3vw;
  }
`;

const SubmitButton = styled(Button)`
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  font-size: 1vw;
  padding: 0.5vw 0;
  background-color: #e63946;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 2vw 0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1vw;
  margin-top: -0.5vw;

  @media (max-width: 768px) {
    font-size: 3vw;
    margin-top: -1.5vw;
  }
`;

const PopupText = styled.p`
  font-size: 18px;
`;
const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
`;

const Alert = styled.div`
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

const TagContainer = styled.div`
  margin-top: 2vw;
  margin-left: 3vh;
`;
const TagSection = styled.div`
  margin-bottom: 2vw;
`;
const TagTitle = styled.h3`
  font-size: 1.5vw;
  color: #333;
  margin-bottom: 1vw;
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;
const TagList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5vw; /* Adjusted negative margin for flex items */
  margin-right: -0.5vw; /* Adjusted negative margin for flex items */
`;
const TagItem = styled.li`
  display: inline-block;
  background-color: #f2f2f2;
  color: #333;
  padding: 0.5vw 1vw;
  border-radius: 0.5vw;
  margin-right: 0.5vw;
  margin-bottom: 0.5vw;
  font-size: 1vw;
  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 1vw 2vw;
    margin-right: 1vw;
    margin-bottom: 1vw;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EmailSentPopup = ({ onClose }) => (
  <Popup>
    <PopupText>Email sent successfully!</PopupText>
    <button onClick={onClose}>Close</button>
  </Popup>
);

const GameDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [gameData, setGameData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showEmailSentPopup, setShowEmailSentPopup] = useState(false);
  const [ps5Rating, setPs5Rating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [gameTags, setGameTags] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleFetchTags = async () => {
    try {
      const response = await getGameTagz(id);
      setGameTags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetch = async () => {
    axios
      .get(`http://localhost:5000/api/game/${id}`)
      .then((res) => {
        const tempData = res.data.filter((item) => item?.id == id);
        const tempImageData = tempData.map((item) => {
          const bigImg = item?.cover?.url.replace("t_thumb", "t_1080p");
          return { item, bigImg };
        });
        if (tempData?.length) {
          setGameData(...tempImageData);
          console.log(gameData?.item.rating);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleFetch();
    handleFetchTags();
    setPs5Rating(gameData?.item?.rating);
  }, [gameData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const date = dateTime.split("T")[0];
      const time = dateTime.split("T")[1];

      const formData = {
        name: name,
        email: email,
        date: date,
        time: time,
        game: gameData.item.name,
      };

      const emailData = [
        {
          recipient: "legendswork90@gmail.com",
          text: `Hi LT Trainer,\n\nPlease be aware that ${name} is coming to use the game.\nDetails:\n     Name: ${name}\n     Email: ${email}\n     Date: ${date}\n     Time: ${time}\n     Game: ${gameData.item.name}\n\nPlease make sure to have the game downloaded and ready for use.\n\nBest regards,\nSupport Team`,
        },
        {
          recipient: email,
          text: `Hi ${name},\n\nThis is a confirmation mail for the demo booking.\nDetails:\n     Name: ${name}\n     Email: ${email}\n     Date: ${date}\n     Time: ${time}\n     Game: ${gameData.item.name}\n\nThe game will be downloaded and ready for use.\n\nBest regards,\nSupport Team`,
        },
      ];

      try {
        const response = await axios.post(
          "http://localhost:5000/api/sendEmail",
          { emails: emailData }
        );
        console.log("Emails sent successfully:", response.data);
        setShowEmailSentPopup(true); // Show the email sent popup
        setIsFormVisible(false); // Hide the form
      } catch (error) {
        console.error("Error sending emails:", error);
      }
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid";
      isValid = false;
    }

    if (!dateTime) {
      formErrors.dateTime = "Date and Time are required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSaveClick = () => {
    const gameToSave = {
      id: gameData.item.id,
      name: gameData.item.name,
      cover: gameData.bigImg,
      genres: gameData.item.genres
        .map((genre) => genre?.name || "N/A")
        .join(", "),
      themes: gameData.item.themes
        .map((theme) => theme?.name || "N/A")
        .join(", "),
      releaseDate:
        new Date(
          gameData.item.first_release_date * 1000
        ).toLocaleDateString() || "N/A",
      publisher: "PlayStation, Sony",
      platforms: gameData.item.platforms
        .map((platform) => platform.name)
        .join(", "),
      modes: gameData.item.game_modes
        .map((mode) => mode?.name || "N/A")
        .join(", "),
    };

    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];
    const existingGame = savedGames.find((game) => game.id === gameToSave.id);

    if (existingGame) {
      setShowPopup(true);
    } else {
      savedGames.push(gameToSave);
      localStorage.setItem("savedGames", JSON.stringify(savedGames));
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);
      console.log("Game saved to collection");
    }
  };

  const handleBookClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleMoreInfoClick = () => {
    navigate("/moreInfo");
  };

  const handleUserRating = (rating) => {
    setUserRating(rating);
  };

  const renderViewRating = (rating) => {
    const fullStars =
      (rating ?? 0) > 5
        ? Math.floor((rating ?? 0) / 20)
        : Math.floor(rating ?? 0);

    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} style={styles.fullStar} />);
    }
    if (halfStars === 1) {
      stars.push(<FaStarHalfAlt key="half" style={styles.fullStar} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} style={styles.emptyStar} />);
    }

    return <RatingContainer>{stars}</RatingContainer>;
  };

  const styles = {
    fullStar: {
      fontSize: "20px",
      color: "#FFD700",
      margin: "0 2px",
    },
    emptyStar: {
      fontSize: "20px",
      color: "#d3d3d3",
      margin: "0 2px",
    },
  };

  const renderStars = (rating, onClick) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <StarsContainer>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} filled onClick={() => onClick(index + 1)}>
            ★
          </Star>
        ))}
        {hasHalfStar && (
          <HalfStar filled onClick={() => onClick(fullStars + 0.5)}>
            ★
          </HalfStar>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <Star
            key={index + fullStars + (hasHalfStar ? 1 : 0)}
            onClick={() =>
              onClick(fullStars + (hasHalfStar ? 1 : 0) + index + 1)
            }
          >
            ★
          </Star>
        ))}
      </StarsContainer>
    );
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseEmailSentPopup = () => {
    setShowEmailSentPopup(false);
  };

  const renderRating = (rating, handleClick) => (
    <div>{renderStars(rating, handleClick)}</div>
  );

  return (
    <div>
      {popupVisible && <Alert>Added to Collection!</Alert>}
      <Container>
        <Details
          style={{
            backgroundImage: `url(${gameData?.bigImg})`,
            backgroundAttachment: "fixed",
          }}
        >
          <Info>
            <ListContainer>
              <List>
                <Heading>
                  GAME <Highlight>DETAILS</Highlight>
                </Heading>
                <ListItem>
                  <StyledImage src={genre} alt="genre" />
                  <strong>Genre:</strong>
                  <span style={{ marginLeft: "6vw" }}>
                    {gameData?.item?.genres
                      ?.map((genre) => genre.name)
                      .join(", ")}
                  </span>
                </ListItem>
                <ListItem>
                  <StyledImage src={themes} alt="themes" />
                  <strong>Themes:</strong>
                  <span style={{ marginLeft: "4.85vw" }}>
                    {gameData?.item?.themes
                      ?.map((theme) => theme.name)
                      .join(", ")}
                  </span>
                </ListItem>
                <ListItem>
                  <StyledImage src={releaseDate} alt="releaseDate" />
                  <strong>Release Date:</strong>
                  <span style={{ marginLeft: "1.95vw" }}>
                    {new Date(
                      gameData?.item?.first_release_date * 1000
                    ).toLocaleDateString()}
                  </span>
                </ListItem>
                <ListItem>
                  <StyledImage src={developer} alt="developer" />
                  <strong>Publisher:</strong>
                  <span style={{ marginLeft: "3.98vw" }}>
                    PlayStation, Sony
                  </span>
                </ListItem>
                <ListItem>
                  <StyledImage src={platform} alt="platform" />
                  <strong>Platforms:</strong>
                  <span style={{ marginLeft: "3.80vw" }}>
                    {gameData?.item?.platforms
                      ?.map((platform) => platform.name)
                      .join(", ")}
                  </span>
                </ListItem>
                <ListItem>
                  <StyledImage src={modes} alt="modes" />
                  <strong>Modes:</strong>
                  <span style={{ marginLeft: "5.5vw" }}>
                    {gameData?.item?.game_modes
                      ?.map((mode) => mode.name)
                      .join(", ")}
                  </span>
                </ListItem>
              </List>
            </ListContainer>
          </Info>
          <Cover>
            <Rating>
              <h3>{gameData?.item?.name}</h3>
              <RatingInfo>
                <RatingText>Instructor Rating:</RatingText>
                {renderViewRating(4.5)}
              </RatingInfo>
              <RatingInfo>
                <RatingText>PS5 Rating:</RatingText>
                {renderViewRating(ps5Rating)}
              </RatingInfo>
              <RatingInfo>
                <RatingText>Rate it: 😊</RatingText>
                {renderRating(userRating, handleUserRating)}
              </RatingInfo>
              <BookButton onClick={handleBookClick}>BOOK A SESSION</BookButton>
              <SaveButton onClick={handleSaveClick}>
                SAVE TO COLLECTION
              </SaveButton>
            </Rating>
          </Cover>
          <InfoButton onClick={handleMoreInfoClick}>MORE INFO</InfoButton>
        </Details>

        <TagContainer>
          <TagSection>
            <TagTitle>Tags by PlayStation</TagTitle>
            <TagList>
              {gameData?.item?.genres?.map((genre) => (
                <TagItem key={genre}>{genre.name}</TagItem>
              ))}
              {gameData?.item?.themes?.map((theme) => (
                <TagItem key={theme}>{theme.name}</TagItem>
              ))}
            </TagList>
          </TagSection>
          <TagSection>
            <TagTitle>Tags by LT Trainer</TagTitle>
            <TagList>
              {gameTags &&
                gameTags.map((item) => <TagItem key={item}>{item}</TagItem>)}
            </TagList>
          </TagSection>
        </TagContainer>
        <FeatureBar>
          <FeatureItem>
            <FeatureIcon src={playersIcon} alt="1 - 2 Players" />
            <div>1 - 2 Players</div>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon
              src={psPlusIcon}
              alt="PS Plus required for online play"
            />
            <div>PS Plus required for online play</div>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon src={remotePlayIcon} alt="Remote Play supported" />
            <div>Remote Play supported</div>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon src={onlinePlayIcon} alt="Online play optional" />
            <div>Online play optional</div>
          </FeatureItem>
        </FeatureBar>

        <SummaryContainer>
          <SummaryHeading>Game Summary</SummaryHeading>
          <SummaryText>{gameData?.item?.summary}</SummaryText>
        </SummaryContainer>

        {isFormVisible && (
          <FormContainer>
            <FormTitle>Book a Session</FormTitle>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Janes Fake"
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@janesfakedomain.net"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

              <Label htmlFor="dateTime">Date and Time</Label>
              <Input
                type="datetime-local"
                id="dateTime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              {errors.dateTime && (
                <ErrorMessage>{errors.dateTime}</ErrorMessage>
              )}

              <SubmitButton type="submit">SUBMIT</SubmitButton>
            </Form>
          </FormContainer>
        )}
        {showPopup && (
          <Popup>
            <PopupText>
              This game is already saved in your collection!
            </PopupText>
            <Button onClick={handleClosePopup}>Close</Button>
          </Popup>
        )}
        {/* Popup for "Email sent successfully" */}
        {showEmailSentPopup && (
          <EmailSentPopup onClose={handleCloseEmailSentPopup} />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default GameDetails;
