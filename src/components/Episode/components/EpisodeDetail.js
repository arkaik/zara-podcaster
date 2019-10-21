import React from 'react';

function EpisodeDetail({ episode }) {
  const {
    title,
    description,
    audioSrc
  } = episode;

  return (
    <section className="episodeDetail">
      <h3 className="title">{title}</h3>
      <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
      <audio className="audio" src={audioSrc} controls>
      Your browser does not support the <code>audio</code> element.
      </audio>
    </section>
  )
}

export default EpisodeDetail;
