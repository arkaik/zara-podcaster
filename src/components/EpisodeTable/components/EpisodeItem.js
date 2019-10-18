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
    <tr className="episodeItem">
      <td>
        <span className="link">
          <Link to={`${url}/episode/${id}`}>{title}</Link>
        </span>
      </td>
      <td>
        <span>{duration}</span>
      </td>
      <td>
        <span>{date}</span>
      </td>
    </tr>
  )
}

export default EpisodeItem;
