import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MonthlyGames from "./LTMonthlyGames";
import TagsViewLT from "./LTTagsView";

const SidebarContainer = styled.aside`
  width: 250px;
  height: 100vh;
  background-color: #282c34;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const CompanyName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const UserName = styled.h2`
  font-size: 18px;
  margin-bottom: 30px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const NavItem = styled.li`
  width: 100%;
  margin: 10px 0;
`;

const NavLink = styled.button`
  text-decoration: none;
  color: #fff;
  background: none;
  border: none;
  display: block;
  padding: 10px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #495057;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
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

const LogoutButton = styled.button`
  margin-top: auto;
  margin-bottom: 20px;
  background-color: #dc3545;
  border-radius: 4px;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const LTTrainer = ({ companyName, userName, setIsLoggedIn }) => {
  const [activeComponent, setActiveComponent] = useState("MonthlyGames");
  const [popupVisible, setPopupVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      setIsLoggedIn(false);
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    if (activeComponent === "Enquiries") {
      navigate("/contact");
    }
  }, [activeComponent, navigate]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "MonthlyGames":
        return <MonthlyGames />;
      case "UpdateTags":
        return <TagsViewLT />;
      default:
        return <MonthlyGames />;
    }
  };

  return (
    <MainContainer>
      {popupVisible && <Popup>Successful Logged Out</Popup>}
      <SidebarContainer>
        <UserName>{userName}</UserName>
        <NavList>
          <NavItem>
            <NavLink onClick={() => setActiveComponent("MonthlyGames")}>
              Monthly Games
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => setActiveComponent("UpdateTags")}>
              Update Tags
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => setActiveComponent("Enquiries")}>
              Enquiries
            </NavLink>
          </NavItem>
        </NavList>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </SidebarContainer>
      <ContentContainer>{renderComponent()}</ContentContainer>
    </MainContainer>
  );
};

export default LTTrainer;
