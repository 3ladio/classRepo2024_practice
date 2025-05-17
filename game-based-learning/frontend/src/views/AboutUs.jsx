import React from "react";
import styled from "styled-components";
import aboutImage from "../assets/about.png";
import { Footer, Navigation } from "../components";

const AboutUsContainer = styled.div`
  display: block;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Content = styled.div`
  text-align: justify;
`;

const Image = styled.img`
  float: right;
  width: 50%;
  max-width: 400px;
  height: auto;
  margin: 0 0 20px 20px;

  @media (max-width: 768px) {
    display: none; /* Hide the image on screens smaller than 768px (typical tablet and mobile sizes) */
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-top: 20px;
  color: #555;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1.25em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

const Paragraph = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
  color: #666;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const AboutUs = () => {
  return (
    <>
      <AboutUsContainer>
        <Content>
          <Title>About Us</Title>
          <Image src={aboutImage} alt="Description of image" />
          <Paragraph>
            Game-based learning involves the use of games and simulations to
            teach new concepts and skills. These skills can be general ones such
            as communication, problem-solving, or teamwork. They can also be
            used to teach program-specific skills. Games can be highly engaging
            and immersive, providing students with a more hands-on and
            interactive learning experience. Instructors at Sask Polytech can
            use game-based learning to gamify their instruction, providing
            students with a more fun and engaging way to learn. These games can
            range from simple to complex to address a wide range of learning
            outcomes and player comfort. An example of a simple game could be
            the use of charades or Pictionary to develop vocabulary. An example
            of a complex game could be the use of a VR system to immerse
            students in simulated situations that would otherwise be impossible.
            Who wouldn't benefit from learning how to change a tire while being
            chased by a T. Rex? I don't know if that exists, but if it doesn't,
            it should.
          </Paragraph>

          <SectionTitle>Enhanced Engagement and Motivation</SectionTitle>
          <Paragraph>
            Play is fun. It can be as simple as that. When the learning happens
            through a game, the learners tend to have more fun. This leads to
            them being naturally more engaged and more motivated to participate.
          </Paragraph>

          <SectionTitle>Real-Time Feedback and Assessment</SectionTitle>
          <Paragraph>
            All games have some sort of feedback system. It can be points,
            levels, health, cards, numbers, badges, etc. There is always some
            way you can evaluate how you're doing as a player. When that level
            of feedback is combined with a learning activity, players are able
            to keep track of their progress and gauge their learning on their
            own. In the case of assessment, educators or facilitators can use
            this information as a sort of assessment as well.
          </Paragraph>

          <SectionTitle>Improved Retention and Understanding</SectionTitle>
          <Paragraph>
            Giving learners the chance to apply understanding in scenarios or
            simulations improves the understanding of those concepts. If that
            scenario or simulation is something that the learners are able to
            engage with often (and if they want to), the retention of those
            concepts will be better.
          </Paragraph>

          <SectionTitle>Development of Critical Skills</SectionTitle>
          <Paragraph>
            This is especially the case when the games that are played have a
            competitive aspect. Whether the competition is against other
            players, the environment, the “computer”, or another inanimate
            contender, when there are stakes involved, players are more likely
            to think critically about their decisions.
          </Paragraph>

          <SectionTitle>Personalized Learning Experiences</SectionTitle>
          <Paragraph>
            Everyone engages with content in their own way. This is especially
            true when play is involved. With GBL, even if the instructions and
            rules are the same, players bring their own history, strengths, and
            strategies to games that will tailor each experience to the learner
            to some degree.
          </Paragraph>

          <SectionTitle>Storytelling</SectionTitle>
          <Paragraph>
            Games have an innate ability to tell stories which can capture the
            attention and imagination of learners while also helping to create
            lasting memories. How many of you still remember sitting down to
            play the original Mario Brothers/Duck Hunt game? Or carefully
            progressing through the coming-of-age story in Legend of Zelda:
            Ocarina of Time on the Nintendo 64? In fact, story-telling in
            digital games have gotten so good that we are seeing a new genre of
            videogame adaptations hitting the big screen to rave reviews (The
            Super Mario Bros. Movie, The Last of Us). As games are increasingly
            designed as story-driven experiences, game-based learning can borrow
            from these engaging principles to create a connection for learners
            to the content while simultaneously establishing lasting memories in
            their learning journey.
          </Paragraph>
        </Content>
      </AboutUsContainer>
      <Footer />
    </>
  );
};

export default AboutUs;
