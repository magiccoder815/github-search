import React from "react";
import moment from "moment";
import styled from "styled-components";

import locationIcon from "../assets/location-logo.min.svg";
import websiteIcon from "../assets/website-logo.min.svg";
import companyIcon from "../assets/company-logo.min.svg";

interface UserCardProps {
  user: {
    id: number;
    avatar_url: string;
    name?: string;
    login: string;
    html_url: string;
    created_at: Date;
    public_repos: number;
    followers: number;
    following: number;
    blog?: string;
    location?: string;
    company?: string;
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
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    transform: translateY(-0.2rem);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  line-height: 1rem;
`;

const UserAvatar = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
`;

const JoinedDate = styled.p`
  font-size: 1rem;
  text-align: right;
`;

const UserName = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.2rem;
`;

const UserId = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: bold;
  line-height: 1.2rem;
`;

const UserWorkInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--bg-custom);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 0.5rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
`;

const UserWebsiteLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
`;

const UserCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
`;

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const handleCardClick = () => {
    window.open(user.html_url, "_blank", "noopener,noreferrer");
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <ProfileHeader>
        <UserAvatar src={user.avatar_url} alt={`${user.login}'s avatar`} />
        <UserName>{user.name || "No Name"}</UserName>
        <UserId>{user.login}</UserId>
      </ProfileHeader>
      <UserWorkInfo>
        <InfoContainer>
          <p>Repositories</p>
          <p>
            <strong>{user.public_repos}</strong>
          </p>
        </InfoContainer>
        <InfoContainer>
          <p>Followers</p>
          <p>
            <strong>{user.followers}</strong>
          </p>
        </InfoContainer>
        <InfoContainer>
          <p>Following</p>
          <p>
            <strong>{user.following}</strong>
          </p>
        </InfoContainer>
      </UserWorkInfo>
      <UserDetails>
        <UserCompany>
          <img src={companyIcon} alt="Company Logo" />
          <p>{user.company || "No Company"}</p>
        </UserCompany>
        <UserWebsiteLink>
          <img src={websiteIcon} alt="Website Logo" />
          <p>
            {user.blog ? (
              <a href={user.blog} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            ) : (
              "No Website"
            )}
          </p>
        </UserWebsiteLink>
        <UserLocation>
          <img src={locationIcon} alt="Location Logo" />
          <p>{user.location || "No location"}</p>
        </UserLocation>
      </UserDetails>
      <JoinedDate>
        Joined: {moment(user.created_at).format("MM/DD/YYYY")}
      </JoinedDate>
    </CardContainer>
  );
};

export default UserCard;
