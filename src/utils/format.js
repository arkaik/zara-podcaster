export const formatPodcastItem = (podcast) => {
  const id = podcast['id']['attributes']['im:id'];
  const name = podcast['im:name']['label'].toUpperCase();
  const author = podcast['im:artist']['label'];
  const image = podcast['im:image'][1]['label'];
  return {
    id,
    name,
    author,
    image,
  }
}

const formatEpisode = (episode, index, array) => {
  try {
    const id = array.length - index;
    const title = episode['itunes:title']? episode['itunes:title']['_text'] : episode.title['_text'];
    const description = episode['summary']? episode['summary']['_cdata'] : (episode['itunes:summary']? episode['itunes:summary']['_cdata']: 'No description available');
    const duration = episode['itunes:duration']? episode['itunes:duration']['_text'] : 'Unknown duration';
    const date = episode['pubDate']['_text'];
    const audioSrc = episode['enclosure']? episode['enclosure']['_attributes']['url'] : episode['media:content']['_attributes']['url'];
    return {
      id,
      title,
      description,
      duration,
      date,
      audioSrc
    };
  } catch (error) {
    console.group('FormatEpisode');
    console.log(error);
    console.log(episode);
    console.groupEnd();
  }
}

export const formatPodcast = (podcast) => {
  const name = podcast['title']['_text'].trim();
  const author = podcast['media:credit']? podcast['media:credit']['_text'] : podcast['itunes:author']['_text'];
  const image = podcast['image']? podcast['image']['url']['_text'] : podcast['media:thumbnail']['attributes']['url'];
  const imageAlt = podcast['image']? podcast['image']['title']['_text'] : name;
  const summary = podcast['description']?
    (podcast['description']['_cdata'] || podcast['description']['_text'])
    : (podcast['itunes:summary']? (podcast['itunes:summary']['_cdata'] || podcast['itunes:summary']['_text'])
      : 'No summary available');
  const episodeList = podcast['item'].map(formatEpisode);
  return ({
    name,
    author,
    image,
    imageAlt,
    summary,
    episodeList
  });
}
