import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import actions from '../../redux/podcast/actions.js';
import './Podcast.css';

const EpisodeList = lazy(() => import('../EpisodeList/EpisodeList.js'));
const Episode = lazy(() => import('../Episode/Episode.js'));

const { getPodcast } = actions;

function Podcast () {
  const { path, url, params: { podcastId } } = useRouteMatch();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPodcast(podcastId));
  }, [dispatch, podcastId]);

  const podcast = useSelector(({ Podcast }) => Podcast);
  const {
    id,
    name,
    author,
    image,
    episodeList
  } = podcast;

  return (
    <main id="podcast">
      <div>
        <img src={image} alt=""/>
        <div>{name}</div>
        <div>by {author}</div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={path} exact render={(props) => <EpisodeList {...props} list={episodeList} />} />
          <Route path={`${path}/episode/:episodeId`} render={(props) => {
            return <Episode {...props} />
          }} />
        </Switch>
      </Suspense>
    </main>
  )
}

export default Podcast;
