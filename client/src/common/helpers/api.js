/**
 * Created by Henry Huang.
 */

export const post = (endpoint, data, opts) => {
  const options = {
    method: 'post',
    headers: {},
  };

  if (data instanceof FormData) {
    options.body = data;
  } else {
    Object.assign(options.headers, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    options.body = JSON.stringify(data);
  }

  if (opts && opts.headers) {
    Object.assign(options.headers, opts.headers);
  }

  return fetch(endpoint, options).then(response => (
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Promise.resolve(json);
    })
  ));
};


export const get = (endpoint, opts) => {
  const options = {
    method: 'get',
  };
  if (opts) {
    Object.assign(options, opts);
  }

  return fetch(endpoint, options).then(response => response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return Promise.resolve(json);
  }));
};
