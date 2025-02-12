import React from "react";
import styled from "styled-components";
import logo from "../assets/git-logo.png";

interface RepositoryCardProps {
  repo: {
    id: number;
    name: string;
    description?: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    owner: {
      login: string;
      avatar_url: string;
    };
  };
}

const CardContainer = styled.div`
  font-family: "Arial Narrow", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
  transition: all 0.2s ease-in-out;
  border: 0.1rem solid var(--bg-secondary);
  width: 100%;
  position: relative;
  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    transform: translateY(-0.2rem);
  }
`;
const RepoTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  right: 2rem;
`;

const TitleLabel = styled.span`
  font-size: 1rem;
  font-weight: normal;
  margin-right: 0.7rem;
`;

const Author = styled.p`
  margin: 0.5rem 0;
`;

const DescriptionText = styled.p`
  margin: 0.2rem 0;
  height: 3.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 0.5rem;
`;

const RepoInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--bg-custom);
`;

const RepoLink = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  line-height: 1.2rem;
  padding: 0.5rem;
  border: 0.1rem solid var(--text-primary);
  border-radius: 0.5rem;
`;

const HeaderLogo = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
  border-radius: 50%;
`;

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  const truncatedDescription = repo.description
    ? repo.description.length > 50
      ? `${repo.description.substring(0, 50)}...`
      : repo.description
    : "No description";

  return (
    <CardContainer>
      <Avatar
        src={repo.owner.avatar_url}
        alt={`${repo.owner.login}'s avatar`}
      />
      <RepoTitle>
        <TitleLabel>Title:</TitleLabel>
        {repo.name}
      </RepoTitle>

      <Author>
        <span>Author: </span>
        <strong>{repo.owner.login}</strong>
      </Author>
      <DescriptionText>
        <span>Description: </span>
        {truncatedDescription}
      </DescriptionText>
      <RepoInfoContainer>
        <InfoContainer>
          <p>Stars</p>
          <p>
            <strong>{repo.stargazers_count}</strong>
          </p>
        </InfoContainer>
        <InfoContainer>
          <p>Forks</p>
          <p>
            <strong>{repo.forks_count}</strong>
          </p>
        </InfoContainer>
      </RepoInfoContainer>
      <RepoLink href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <HeaderLogo src={logo} alt="header-logo" />
        Visit Repository
      </RepoLink>
    </CardContainer>
  );
};

export default RepositoryCard;
