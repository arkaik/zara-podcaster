import React from 'react';

function Episode ({ episode }) {
  const {
    title,
    description,
    audioSrc
  }= episode;
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
