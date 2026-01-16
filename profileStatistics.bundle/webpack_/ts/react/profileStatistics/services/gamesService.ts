import { httpService } from 'core-utilities';
import { getUserGames, accessFilter, limitOfNumOfGames } from '../constants/apiEndpoint';

export type GameData = { placeVisits: number };

export type TGetPublicGamesResponse = { nextPageCursor?: string; data: GameData[] };

export const getUserPublicGames = async (
  userId: number,
  nextPageCursor?: string
): Promise<null | TGetPublicGamesResponse> => {
  const params = {
    accessFilter: accessFilter.public,
    cursor: nextPageCursor,
    limit: limitOfNumOfGames
  };
  const { data } = await httpService.get<null | TGetPublicGamesResponse>(
    getUserGames(userId),
    params
  );
  return data;
};
