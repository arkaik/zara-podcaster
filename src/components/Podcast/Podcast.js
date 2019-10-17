import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import actions from '../../redux/podcast/actions.js';
import './Podcast.css';

const EpisodeTable = lazy(() => import('../EpisodeTable/EpisodeTable.js'));
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
    name,
    author,
    image,
    summary,
    episodeList
  } = podcast;

  return (
    <main className="podcast">
      <div className="detail">
        <div className="center">
          <Link to={`${url}`}>
            <img src={image} alt=""/>
          </Link>
        </div>
        <div className="infoBox">
          <Link to={`${url}`}>
            <div>{name}</div>
          </Link>
          <div>by {author}</div>
        </div>
        <div className="summaryBox">
          <div>Description:</div>
          <div className="summary" dangerouslySetInnerHTML={{ __html: summary }}/>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={path} exact render={(props) => <EpisodeTable {...props} list={episodeList} />} />
          <Route path={`${path}/episode/:episodeId`} render={(props) => {
            const episode = episodeList[episodeList.length - props.match.params.episodeId] || {};
            return <Episode {...props} episode={episode}/>
          }} />
        </Switch>
      </Suspense>
    </main>
  )
}

export default Podcast;
