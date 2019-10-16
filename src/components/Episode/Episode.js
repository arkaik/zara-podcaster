import React from 'react';
import { useParams } from 'react-router-dom';

function Episode (props) {
  const { episodeId } = useParams();
  return (
    <section>
    {episodeId}
    </section>
  );
}

export default Episode;
