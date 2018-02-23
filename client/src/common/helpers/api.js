/**
 * Created by Henry Huang.
 */

export const post = (endpoint, data, opts) => {

  const options = {
    method: 'post',
    headers: {}
  };

  // if (!opts || !opts.autoHeaders) {
  //   options.headers = {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // }

  if (data instanceof FormData) {
    options.body = data;
  } else {
    Object.assign(options.headers, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    options.body = JSON.stringify(data);
  }

  if (opts && opts.headers) {
    Object.assign(options.headers, opts.headers);
  }

  return fetch(endpoint, options).then(response => {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Promise.resolve(json);
    })
  });
};


export const get = (endpoint, opts) => {
  console.log(endpoint);

  const options = {
    method: 'get',
  };
  if (opts) {
    Object.assign(options, opts);
  }

  console.log(options);
  return fetch(endpoint, options).then(response => {
    console.log(response);
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Promise.resolve(json);
    })
  })
};
