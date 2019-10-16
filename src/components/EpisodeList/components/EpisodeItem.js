import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function EpisodeItem({ episode }) {
  const {
    id,
    title,
    duration,
    date,
  } = episode;

  const { url } = useRouteMatch();

  return (
    <li>
      <span>
        <Link to={`${url}/episode/${id}`}>{title}</Link>
      </span>
      <span>{duration}</span>
      <span>{date}</span>
    </li>
  )
}

export default EpisodeItem;
