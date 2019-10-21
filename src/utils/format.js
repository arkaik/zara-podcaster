export const formatPodcastItem = (podcast) => {
  const id = podcast['id']['attributes']['im:id'];
  const name = podcast['im:name']['label'].toUpperCase();
  const author = podcast['im:artist']['label'];
  const image = podcast['im:image'][2]['label'];
  return {
    id,
    name,
    author,
    image,
  }
}

const monthNameArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (date) => {
  let resultDate = undefined;
  let match = undefined;

  const DaynumMonthnameYear = /(\d{1,2}) ([A-Z][a-z]{2}) (\d+)/;
  if ((match = DaynumMonthnameYear.exec(date)) !== null) {
    const [, daynum, monthname, year] = match;
    const monthnum = monthNameArray.findIndex(name => name === monthname) + 1;
    resultDate = `${daynum}/${monthnum}/${year}`;
  } else {
    resultDate = date;
  }
  return resultDate;
}

const formatDuration = (duration) => {
  let resultDuration = undefined;
  if (duration && duration.match(/^\d+$/)) {
    const durationArray = [];
    const durationInt = parseInt(duration, 10);
    let seconds = durationInt % 60;
    durationArray.unshift(seconds.toString().padStart(2, '0'));
    let rawMinutes = Math.floor(durationInt / 60);
    let minutes = rawMinutes % 60;
    durationArray.unshift(minutes.toString().padStart(2, '0'));
    let hours = Math.floor(rawMinutes / 60);
    if (hours > 0) durationArray.unshift(hours.toString().padStart(2, '0'));
    resultDuration = durationArray.join(':');
  }
  else {
    resultDuration = duration;
  }
  return resultDuration;
}

const formatEpisode = (episode, index, array) => {
  try {
    const id = array.length - index;
    const title = episode['itunes:title']?
      (episode['itunes:title']['_text'] || episode['itunes:title']['_cdata']) :
      (episode['title']['_text'] || episode['title']['_cdata']);
    const description = episode['summary']?
      episode['summary']['_cdata'] :
      (episode['description']?
        (episode['description']['_cdata'] || episode['description']['_text']) :
        (episode['itunes:summary']?
          episode['itunes:summary']['_cdata'] :
          'No description available'
        )
      );
    const duration = (episode['itunes:duration']?
      formatDuration(episode['itunes:duration']['_text'] || episode['itunes:duration']['_cdata']) :
      undefined
    ) || 'Unknown duration';
    const date = formatDate(episode['pubDate']['_text'] || episode['pubDate']['_cdata']);
    const audioSrc = episode['enclosure']?
      episode['enclosure']['_attributes']['url'] :
      (episode['media:content']?
        episode['media:content']['_attributes']['url'] :
        undefined
      );
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

export const formatPodcast = (podcast, context) => {
  try {
    const id = context['collectionId'];
    const name = (context['collectionName'] || podcast['title']['_text']).trim();
    const author = context['artistName'] || (podcast['media:credit']? podcast['media:credit']['_text'] : podcast['itunes:author']['_text']);
    const image = context['artworkUrl100'] || (podcast['media:thumbnail']?
      podcast['media:thumbnail']['_attributes']['url'] :
      (podcast['itunes:image'] ?
        podcast['itunes:image']['_attributes']['href'] :
        podcast['image']['url']['_text']
      )
    );
    const imageAlt = podcast['image']? podcast['image']['title']['_text'] : name;
    const summary = (podcast['description']?
      (podcast['description']['_cdata'] || podcast['description']['_text']) :
      (podcast['itunes:summary']?
        (podcast['itunes:summary']['_cdata'] || podcast['itunes:summary']['_text']) :
        undefined
      )
    ) || 'No summary available';
    const episodeList = podcast['item'].map(formatEpisode);
    return ({
      id,
      name,
      author,
      image,
      imageAlt,
      summary,
      episodeList
    });
  } catch (error) {
    console.group('FormatPodcast');
    console.log(error);
    console.log(podcast);
    console.groupEnd();
  }
}
