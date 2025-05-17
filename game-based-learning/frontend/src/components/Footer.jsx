import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const FooterContainer = styled.footer`
  margin-top: 50px;
  background-color: #282c34;
  color: white;
  padding: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 2rem;
    align-items: center;
`;

const LinkItem = styled.li`
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    width: 100%;
    margin-right: 2rem;
  }
`;

const Dropdown = styled.select`
  background-color: #444;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-top: 2rem;
    padding: 0.7rem;
    margin-top: 1.5rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    margin-top: 2rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo>GBL</Logo>
      <SocialIcons>
        <SocialIcon href="#">
          <FontAwesomeIcon icon={faFacebookF} />
        </SocialIcon>
        <SocialIcon href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </SocialIcon>
        <SocialIcon href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </SocialIcon>
        <SocialIcon href="#">
          <FontAwesomeIcon icon={faYoutube} />
        </SocialIcon>
      </SocialIcons>
      <Links>
        <LinkItem>Support</LinkItem>
        <LinkItem>Privacy Policy</LinkItem>
        <LinkItem>PlayStation Studios</LinkItem>
        <LinkItem>About Ratings</LinkItem>
      </Links>
      <Dropdown>
        <option value="Canada">Country/Region: Canada</option>
        {/* Add other country options */}
      </Dropdown>
      <Copyright>© 2024 GBL SaskPolyTech Entertainment LLC</Copyright>
    </FooterContainer>
  );
};

export default Footer;
