import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import actions from '../../redux/podcast/actions.js';
import PodcastDetail from './components/PodcastDetail.js';
import EpisodeTable from './components/EpisodeTable.js';
import './Podcast.css';

const { getPodcast, cleanPodcast } = actions;

function Podcast () {
  const { podcastId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPodcast(podcastId));
    return () => {
      dispatch(cleanPodcast());
    }
  }, [dispatch, podcastId]);

  const podcast = useSelector(({ Podcast }) => Podcast);
  const { episodeList } = podcast;

  return (
    <main className="podcast">
      <PodcastDetail podcast={podcast} />
      <EpisodeTable list={episodeList} podcastId={podcastId}/>
    </main>
  )
}

export default Podcast;
