import React from "react";
import styled from "styled-components";

const MainContainer = styled.div``;

const SectionBreaker = styled.div`
  background-color: black;
  color: white;
  font-family: Arial, sans-serif;
  padding: 5vw;
  border-radius: 1vw;
  padding: 2vw;
  margin: 0 6vw;

  @media (max-width: 768px) {
    margin: 0 3vw;
    padding: 4vw;
  }

  @media (max-width: 480px) {
    margin: 0 1vw;
    padding: 6vw;
  }
`;

const Section = styled.div`
  margin-bottom: 5vw;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;

  @media (max-width: 768px) {
    margin-bottom: 8vw;
  }

  @media (max-width: 480px) {
    margin-bottom: 10vw;
  }
`;

const Topic = styled.div`
  margin: 2vw;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.5vw;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 4vw;
    margin: 4vw 0;
  }

  @media (max-width: 480px) {
    font-size: 6vw;
    margin: 6vw 0;
  }
`;

const Title = styled.h2`
  font-size: 1.6vw;
  margin-bottom: 2vw;

  @media (max-width: 768px) {
    font-size: 3vw;
    margin-bottom: 4vw;
  }

  @media (max-width: 480px) {
    font-size: 4.5vw;
    margin-bottom: 6vw;
  }
`;

const Content = styled.p`
  font-size: 1.2vw;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }

  @media (max-width: 480px) {
    font-size: 3.5vw;
  }
`;

const CallToAction = styled.div`
  background-color: #636363;
  color: white;
  font-family: Arial, sans-serif;
  padding: 5vw;
  border-radius: 1vw;
  padding: 2vw;
  margin: 2vw 6vw;
  text-align: center;

  @media (max-width: 768px) {
    margin: 4vw 3vw;
    padding: 4vw;
  }

  @media (max-width: 480px) {
    margin: 6vw 1vw;
    padding: 6vw;
  }
`;

const Button = styled.a`
  display: inline-block;
  background-color: #c02525;
  color: white;
  padding: 2vw 4vw;
  text-decoration: none;
  border-radius: 1vw;
  font-size: 2vw;
  transition: background-color 0.3s;

  &:hover {
    background-color: #511313;
  }

  @media (max-width: 768px) {
    font-size: 3.5vw;
    padding: 3vw 6vw;
  }

  @media (max-width: 480px) {
    font-size: 5vw;
    padding: 4vw 8vw;
  }
`;

const PS5Promotion = () => {
  return (
    <div>
      <MainContainer>
        <Topic> More Information </Topic>
        <SectionBreaker>
          <Section>
            <Title>Game Summary</Title>
            <Content>
              Experience the ultimate gaming adventure with the PS5. Discover
              new worlds and face thrilling challenges in this powerful gaming
              console.
            </Content>
          </Section>

          <Section>
            <Title>Discover the Galaxy of Opportunity</Title>
            <Content>
              The PS5 opens up a universe of possibilities with cutting-edge
              technology, unparalleled speed, and a library of incredible games.
              Explore diverse genres, join vibrant communities, and immerse
              yourself in a galaxy of endless opportunities.
            </Content>
          </Section>

          <Section>
            <Title>Experience an Extravagant Story</Title>
            <Content>
              Dive into the rich narratives and stunning visuals that PS5 games
              offer. Each game is crafted to provide a compelling story,
              breathtaking graphics, and gameplay that captures your imagination
              from start to finish.
            </Content>
          </Section>

          <Section>
            <Title>Experience the Thrill</Title>
            <Content>
              Feel the adrenaline rush with the PS5's thrilling game library.
              Whether you're racing at high speeds, battling fierce enemies, or
              exploring vast landscapes, every game promises an unforgettable
              experience full of excitement and adventure.
            </Content>
          </Section>
        </SectionBreaker>
        <CallToAction>
          <Content>
            Discover how the PS5 can revolutionize your gaming experience. Visit
            the official PS5 website to learn more about its features, upcoming
            games, and exclusive content. Elevate your gaming to the next level
            with PS5.
          </Content>
          <Button
            href="https://store.playstation.com/en-ca/category/d71e8e6d-0940-4e03-bd02-404fc7d31a31/1?gad_source=1&gclid=Cj0KCQjw0MexBhD3ARIsAEI3WHIPL0C7Tqn8cytE8sa4PMwgkd2FnefEz1e4DPA_CX8THCf6Hd0pGhAaAhDKEALw_wcB&gclsrc=aw.ds"
            target="_blank"
          >
            Explore PS5 Now
          </Button>
        </CallToAction>
      </MainContainer>
    </div>
  );
};

export default PS5Promotion;
