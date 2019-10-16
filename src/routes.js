import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

const PodcastList = lazy(() => import('./components/PodcastList/PodcastList.js'));
const Podcast = lazy(() => import('./components/Podcast/Podcast.js'));

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={PodcastList} />
        <Route path="/podcast/:podcastId" component={Podcast}/>
      </Switch>
    </Suspense>
  );
}
