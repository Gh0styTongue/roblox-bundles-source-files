import React, { useState, useEffect, useRef, useCallback } from 'react';
import { numberFormat } from 'core-utilities';
import { authenticatedUser } from 'header-scripts';
import { TranslateFunction } from 'react-utilities';
import { Paper } from '@rbx/ui';
import StatisticsItem from '../components/StatisticsItem';
import statisticsLayout from '../constants/statisticsLayout';
import { GameData, getUserPublicGames } from '../services/gamesService';
import { getUserData } from '../services/usersService';
import { getUrlUserId } from '../../../utils/appUtil';

const StatisticsContainer = ({ translate }: { translate: TranslateFunction }): JSX.Element => {
  const { labelOfJoinData, labelOfPlaceVisits } = statisticsLayout;
  const [joinDate, setJoinDate] = useState<Date | undefined>(undefined);
  const [gameData, setGameData] = useState<GameData[] | undefined>(undefined);

  const userIdString = getUrlUserId();
  const userId = userIdString ? parseInt(userIdString, 10) : authenticatedUser.id;

  const fetchJoinedDate = useCallback(() => {
    if (userId === authenticatedUser.id) {
      // TODO: `created` field is not present on `AuthenticatedUser` type
      setJoinDate(new Date(((authenticatedUser as unknown) as Record<string, string>).created));
    } else {
      getUserData(userId)
        .then(result => {
          if (result?.created) {
            setJoinDate(new Date(result.created));
          }
        })
        .catch(() => setJoinDate(undefined));
    }
  }, [userId]);

  const fetchNumberOfVisits = useCallback(
    (retrievedGameData?: GameData[], currentPageCursor?: string) => {
      getUserPublicGames(userId, currentPageCursor)
        .then(result => {
          if (result) {
            const { nextPageCursor, data } = result;
            const newGameData = (retrievedGameData ?? []).concat(data);
            if (nextPageCursor && currentPageCursor !== nextPageCursor) {
              fetchNumberOfVisits(newGameData, nextPageCursor);
            } else {
              setGameData(newGameData);
            }
          } else {
            setGameData(retrievedGameData);
          }
        })
        .catch(() => {
          // if api failure, still need to sum up current data
          setGameData(retrievedGameData);
        });
    },
    [userId]
  );

  const statisticsContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (statisticsContainerRef.current) {
      const observer = new IntersectionObserver((entries, obs) => {
        if (entries.some(entry => entry.isIntersecting)) {
          fetchNumberOfVisits();
          fetchJoinedDate();
          obs.disconnect();
        }
      });
      observer.observe(statisticsContainerRef.current);
      return () => observer.disconnect();
    }
    return undefined;
  }, [statisticsContainerRef, fetchNumberOfVisits, fetchJoinedDate]);

  const placeVisitsSum = gameData?.reduce(
    (sum, game) => sum + (Number.isNaN(game.placeVisits) ? 0 : game.placeVisits),
    0
  );

  return (
    <React.Fragment>
      <h2 className='profile-stats-header'>{translate(statisticsLayout.sectionTitle)}</h2>
      <Paper ref={statisticsContainerRef}>
        <ul className='profile-stats'>
          {joinDate != null && (
            <StatisticsItem translate={translate} label={labelOfJoinData}>
              <time dateTime={joinDate.toISOString()}>{joinDate.toLocaleDateString()}</time>
            </StatisticsItem>
          )}
          {placeVisitsSum != null && (
            <StatisticsItem translate={translate} label={labelOfPlaceVisits}>
              {numberFormat.getNumberFormat(placeVisitsSum)}
            </StatisticsItem>
          )}
        </ul>
      </Paper>
    </React.Fragment>
  );
};

export default StatisticsContainer;
