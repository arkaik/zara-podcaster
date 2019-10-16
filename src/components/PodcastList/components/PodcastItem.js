import React from 'react';
import { Link } from 'react-router-dom';

function PodcastItem({ podcast }) {
  const {
    'id': { 'attributes': { 'im:id': id } },
    'im:image': dataImages,
    'im:name': { label: dataName },
    'im:artist': { label: dataAuthor }
  } = podcast;

  const image = dataImages[1].label;
  const name = dataName.toUpperCase();

  return (
    <li>
      <Link to={`/podcast/${id}`}>
        <img src={image} alt='Podcast item'/>
        <div>{name}</div>
        <div>Author: {dataAuthor}</div>
      </Link>
    </li>
  );
}

export default PodcastItem;
