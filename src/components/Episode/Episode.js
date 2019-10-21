import React, { useEffect } from 'react';
import actions from '../../redux/episode/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PodcastDetail from '../Podcast/components/PodcastDetail.js';
import EpisodeDetail from './components/EpisodeDetail.js';
import './Episode.css';

const { getEpisode, cleanEpisode } = actions;

function Episode ({ match }) {
  const { podcastId, episodeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEpisode(podcastId, episodeId));
    return () => {
      dispatch(cleanEpisode());
    };
  }, [dispatch, podcastId, episodeId]);

  const podcast = useSelector(({ Podcast }) => Podcast);
  const episode = useSelector(({ Episode }) => Episode);

  return (
    <main className="episode">
      <PodcastDetail podcast={podcast} />
      <EpisodeDetail episode={episode} />
    </main>
  );
}

export default Episode;
