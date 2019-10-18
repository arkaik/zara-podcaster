import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/podcastList/actions.js';
import './PodcastList.css';

import PodcastItem from './components/PodcastItem.js';

const { getPodcastList } = actions;

function PodcastList(props) {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(getPodcastList());
  }, [dispatch]);

  const list = useSelector(({ PodcastList }) => PodcastList.list.filter(podcast => {
    const inTitle = podcast.name.toLowerCase().includes(filter);
    const inAuthor = podcast.author.toLowerCase().includes(filter);
    return inTitle || inAuthor;
  }));

  return (
    <main className="podcastList" >
      <div className="searchRow">
        <div className="searchBox">
          <span className="resultNumber">{list.length}</span>
          <input
            className="searchInput"
            placeholder="Filter podcasts..."
            onInput={(ev) => {
              const value = ev.target.value.toLowerCase();
              setFilter(value);
            }}
          />
        </div>
      </div>
      <ul className="list">
      {list.map(podcast => (
        <PodcastItem podcast={podcast} key={podcast.id}/>
      ))}
      </ul>
    </main>
  );
}

export default PodcastList;
