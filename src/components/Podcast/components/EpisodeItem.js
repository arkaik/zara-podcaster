import React from 'react';
import { Link, useParams } from 'react-router-dom';

function EpisodeItem({ episode }) {
  const {
    id,
    title,
    duration,
    date,
  } = episode;

  const { podcastId } = useParams();

  return (
    <tr className="episodeItem">
      <td>
        <span className="link">
          <Link to={`/podcast/${podcastId}/episode/${id}`}>{title}</Link>
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
