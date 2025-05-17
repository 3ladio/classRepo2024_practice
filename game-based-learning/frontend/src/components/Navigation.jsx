// src/components/Navigation.jsx
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import PageLogo from "../assets/GBLLogo.png";
// import { useAuth } from '../context/AuthContext';

const Nav = styled.nav`
  background-color: #282c34;
  padding: 1rem;
  margin-bottom: 0px;
  box-shadow: 5px 5px 8px grey;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoDiv = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  &:hover {
    transform: scale(1.05);
  }
`;

const SearchBar = styled.input`
  width: 200px;
  height: 30px;
  font-size: 1rem;
  padding: 0.25rem;
  margin-right: 1rem;
`;

const Logo = styled.h1`
  font-family: "Papyrus";
  font-size: 1.5rem;
  color: white;
  margin-left: 10%;
`;

const LogoImg = styled.img`
  width: 50%;
  height: 70%;
`;

const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 3rem;
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  padding: 8px 16px;
  border-radius: 20px;
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const AdditionalLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
`;

const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
  }
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
`;

const Navigation = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Nav>
      <TopRow>
        <Link to="/" style={{ textDecoration: "none" }}>
          <LogoDiv>
            <LogoImg src={PageLogo} alt="GBL Logo" />
            <Logo>GBL</Logo>
          </LogoDiv>
        </Link>
        <Links>
          {/* <SearchBar type="text" placeholder="Search..." /> */}
          <li>
            <CustomNavLink to="/monthly">
              Monthly Games
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/collection">
              Collection
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/about">
              About
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/contact">
              Contact Us
            </CustomNavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <CustomNavLink to="/ltTrainer">
                Dashboard
              </CustomNavLink>
            ) : (
              <CustomNavLink to="/login">
                Login
              </CustomNavLink>
            )}
          </li>
        </Links>
        <MobileMenuIcon onClick={handleMenuClick}>&#9776;</MobileMenuIcon>
      </TopRow>
      <BottomRow>
        <MobileMenu open={menuOpen}>
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/about">About</MobileNavLink>
          <MobileNavLink to="/contact">Contact Us</MobileNavLink>
          <MobileNavLink to="/latest">Latest Games</MobileNavLink>
          <MobileNavLink to="/monthly">Monthly Games</MobileNavLink>
          <MobileNavLink to="/collection">Collection</MobileNavLink>
          {isLoggedIn ? (
            <MobileNavLink to="/ltTrainer">
              Dashboard
            </MobileNavLink>
          ) : (
            <MobileNavLink to="/login">
              Login
            </MobileNavLink>
          )}
        </MobileMenu>
      </BottomRow>
    </Nav>
  );
};

export default Navigation;
