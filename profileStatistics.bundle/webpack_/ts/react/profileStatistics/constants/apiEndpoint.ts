import { EnvironmentUrls } from 'Roblox';
import { UrlConfig } from 'core-utilities';

const { gamesApi, usersApi } = EnvironmentUrls;

export const getUserGames = (userId: number): UrlConfig => ({
  url: `${gamesApi}/v2/users/${userId}/games`,
  withCredentials: true
});

export const accessFilter = {
  public: 'Public'
};

export const limitOfNumOfGames = 50;

export const getUserById = (userId: number): UrlConfig => ({
  url: `${usersApi}/v1/users/${userId}`,
  withCredentials: true
});
