import React, { useEffect } from 'react';
import actions from '../../redux/episode/actions.js';
import { useDispatch, useSelector } from 'react-redux';

const { getEpisode, cleanEpisode } = actions;

function Episode ({ match }) {
  const id = match.params.episodeId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEpisode(id));
    return () => {
      dispatch(cleanEpisode());
    };
  }, [dispatch, id]);

  const episode = useSelector(({ Episode }) => Episode);
  const {
    title,
    description,
    audioSrc
  } = episode;
  return (
    <section className="episode">
      <h3>{title}</h3>
      <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
      <audio src={audioSrc} controls>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </section>
  );
}

export default Episode;
