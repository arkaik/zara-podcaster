import XmlJs from 'xml-js';

export const getJson = (url) => {
  return fetch(url)
  .then(response => response.json());
}

export const getXml = (url) => {
  return fetch(url)
  .then(response => response.text())
  .then(text => {
    return XmlJs.xml2js(text, { compact: true });
  })
}
