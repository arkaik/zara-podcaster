import React from 'react';
import { Link } from 'react-router-dom';
import './PodcastDetail.css';

function PodcastDetail({ podcast }) {
  const {
    id,
    name,
    author,
    image,
    summary,
  } = podcast;

  return (
    <div className="podcastDetail">
      <div className="imageBox">
        <Link to={`/podcast/${id}`}>
          <img src={image} alt=""/>
        </Link>
      </div>
      <div className="infoBox">
        <div className="name">
          <Link to={`/podcast/${id}`}>
            <div>{name}</div>
          </Link>
        </div>
        <div className="author">by {author}</div>
      </div>
      <div className="summaryBox">
        <div className="summaryTitle">Description:</div>
        <div className="summary" dangerouslySetInnerHTML={{ __html: summary }}/>
      </div>
    </div>
  );
}

export default PodcastDetail;
