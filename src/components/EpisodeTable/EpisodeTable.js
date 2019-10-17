import React from 'react';
import EpisodeItem from './components/EpisodeItem';

function EpisodeTable(props) {
  const { list } = props;
  const total = list.length;

  return (
    <section className="episodeTable">
      <div className="total">Episodes: {total}</div>
      <table className="table">
        <thead>
          <tr><th>Title</th><th>Duration</th><th>Date</th></tr>
        </thead>
        <tbody>
        {list.map(episode => (
          <EpisodeItem episode={episode} key={episode.id} />
        ))}
        </tbody>
      </table>
    </section>
  );
}

export default EpisodeTable;
