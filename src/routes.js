import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SuspenseFallback } from './utils/LoadingIndicator.js'

const PodcastList = lazy(() => import('./components/PodcastList/PodcastList.js'));
const Podcast = lazy(() => import('./components/Podcast/Podcast.js'));
const Episode = lazy(() => import('./components/Episode/Episode.js'));

export default function AppRouter() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Switch>
        <Route exact path="/" component={PodcastList} />
        <Route exact path="/podcast/:podcastId" component={Podcast}/>
        <Route path="/podcast/:podcastId/episode/:episodeId" component={Episode}/>
      </Switch>
    </Suspense>
  );
}
