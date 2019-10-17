const isYoungerThanADay = (date) => {
  const lastSyncDate = date;
  const currentDate = (new Date()).getTime();
  const delta = currentDate - lastSyncDate;
  return delta <= 86400000;
}

const getFromStorage = (key) => {
  try {
    const localDataString = localStorage.getItem(key);
    if (localDataString) {
      return JSON.parse(localDataString);
    }
    return null;
  } catch (error) {
    console.error("Error: Reading from localStorage");
    return null;
  }
}

const saveToStorage = (key, data) => {
  try {
    const localDataString = JSON.stringify(data);
    localStorage.setItem(key, localDataString);
  } catch (error) {
    console.error("Error: Saving to localStorage");
  }
}

export const getContent = (key) => {
  const data = getFromStorage(key);
  if ( data && data.date && isYoungerThanADay(data.date)) {
    return data.content;
  }
  return null;
}

export const setContent = (key, content) => {
  saveToStorage(key, {
    date: (new Date()).getTime(),
    content
  });
}
