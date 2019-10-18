import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SuspenseFallback } from './utils/LoadingIndicator.js'

const PodcastList = lazy(() => import('./components/PodcastList/PodcastList.js'));
const Podcast = lazy(() => import('./components/Podcast/Podcast.js'));

export default function AppRouter() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Switch>
        <Route exact path="/" component={PodcastList} />
        <Route path="/podcast/:podcastId" component={Podcast}/>
      </Switch>
    </Suspense>
  );
}
