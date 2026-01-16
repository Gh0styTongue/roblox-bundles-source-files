import { httpService } from 'core-utilities';
import { getUserById } from '../constants/apiEndpoint';

export type TGetUserResponse = { created?: string };

// eslint-disable-next-line import/prefer-default-export
export const getUserData = (userId: number): Promise<null | TGetUserResponse> =>
  httpService.get<null | TGetUserResponse>(getUserById(userId), {}).then(({ data }) => data);
