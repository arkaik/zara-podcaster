import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SuspenseFallback } from '../../utils/LoadingIndicator.js'
import actions from '../../redux/podcast/actions.js';
import './Podcast.css';

const EpisodeTable = lazy(() => import('../EpisodeTable/EpisodeTable.js'));
const Episode = lazy(() => import('../Episode/Episode.js'));

const { getPodcast, cleanPodcast } = actions;

function Podcast () {
  const { path, url, params: { podcastId } } = useRouteMatch();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPodcast(podcastId));
    return () => {
      dispatch(cleanPodcast());
    }
  }, [dispatch, podcastId]);

  const podcast = useSelector(({ Podcast }) => Podcast);
  const {
    name,
    author,
    image,
    summary,
    episodeList,
  } = podcast;

  return (
    <main className="podcast">
      <div className="detail">
        <div className="imageBox">
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

      <Suspense fallback={<SuspenseFallback/>}>
        <Switch>
          <Route path={path} exact render={props => <EpisodeTable {...props} list={episodeList}/>} />
          <Route path={`${path}/episode/:episodeId`} render={props => <Episode {...props} />} />
        </Switch>
      </Suspense>
    </main>
  )
}

export default Podcast;
