import React from 'react';
import EpisodeItem from './components/EpisodeItem';

function EpisodeList(props) {
  const { list } = props;
  const total = list.length;

  return (
    <section>
      <div>Episodes: {list.length}</div>
      <ul>
      {list.map(episode => (
        <EpisodeItem episode={episode} key={episode.id} />
      ))}
      </ul>
    </section>
  );
}

export default EpisodeList;
