import React from 'react';
import EpisodeItem from './components/EpisodeItem';

function EpisodeTable({ list }) {
  const total = list.length;

  return (
    <section className="episodeTable">
      <div className="total">Episodes: {total}</div>
      <div className="tableBox">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="duration">Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {list.map(episode => (
            <EpisodeItem episode={episode} key={episode.id} />
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default EpisodeTable;
