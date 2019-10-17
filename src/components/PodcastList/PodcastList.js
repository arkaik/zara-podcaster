import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/podcastList/actions.js';
import './PodcastList.css';

import PodcastItem from './components/PodcastItem.js';

const { getPodcastList } = actions;

function PodcastList(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPodcastList());
  }, [dispatch]);

  const list = useSelector(({ PodcastList }) => PodcastList.list);

  return (
    <main className="podcastList" >
      <div className="search"></div>
      <ul className="list">
      {list.map(podcast => (
        <PodcastItem podcast={podcast} />
      ))}
      </ul>
    </main>
  );
}

export default PodcastList;
