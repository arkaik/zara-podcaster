import React from 'react';
import { Link } from 'react-router-dom';

function PodcastItem({ podcast }) {
  const {
    id,
    image,
    name,
    author,
  } = podcast;

  return (
    <li className="podcastItem">
      <Link to={`/podcast/${id}`}>
        <div className="imageBox"><img src={image} alt='Podcast item'/></div>
        <div className="name">{name}</div>
        <div className="author">Author: {author}</div>
      </Link>
    </li>
  );
}

export default PodcastItem;
