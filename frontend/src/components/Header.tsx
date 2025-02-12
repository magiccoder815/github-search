import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import logo from "../assets/git-logo.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.9rem;
`;

const LogoTextContainer = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const HeaderLogo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const HeaderText = styled.div`
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  justify-content: center;
`;

const Title = styled.p`
  font-family: "Arial Narrow", Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  color: black;
`;

const Subtitle = styled.p`
  font-family: "Arial Narrow", Arial, sans-serif;
  color: var(--text-secondary);
`;

const ClearCacheButton = styled.button`
  padding: 0.5rem 1rem;
  background: none;
  border-radius: 0.5rem;
  border-color: var(--bg-main);
  font-size: 1rem;
  cursor: pointer;
`;

const Header: React.FC = () => {
  const clearCache = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/clear-cache/`
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to clear cache:", error);
      toast.error("Failed to clear cache. Please try again.");
    }
  };

  return (
    <HeaderContainer>
      <LogoTextContainer>
        <HeaderLogo src={logo} alt="header-logo" />
        <HeaderText>
          <Title>Github Searcher</Title>
          <Subtitle>Search users or repositories below</Subtitle>
        </HeaderText>
      </LogoTextContainer>
      <ClearCacheButton onClick={clearCache}>Clear Cache</ClearCacheButton>
    </HeaderContainer>
  );
};

export default Header;
