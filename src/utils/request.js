import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  error.title = 'Network Error';
  throw error;
}

function parseApiUtil({ data, status, msg }) {
  if (status !== 'success') {
    const error = new Error(msg);
    error.title = 'API Error';
    throw error;
  }
  return { data };
}

function transUrl(url) {
  if (global && global.isServer) {
    return `http://localhost:8080${url}`
  } else {
    return url
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(transUrl(url), options)
    .then(checkStatus)
    .then(parseJSON)
    .then(parseApiUtil)
    //.then(data => ({ data }))
    .catch(err => ({ err }));
}
