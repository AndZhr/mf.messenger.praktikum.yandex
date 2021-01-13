type Options = {
    method: string;
    headers?: {[key: string]: string};
    data?: any;
};

type PlainObject<T = unknown> = {
    [k in string]: T;
};

export default function request(url: string, options: Options = {method: 'GET'}): Promise<XMLHttpRequest> {
  const {method, headers, data} = options;

  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      if (headers) {
        for (let [name, value] of Object.entries(headers)) {
          xhr.setRequestHeader(name, value);
        }
      }

      if (method === 'GET' && data) {
        let query = queryStringify(data);

        url = `${url}?${query}`;
      }

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
          xhr.send();
      } else {
          xhr.send(data);
      }
  });
}

function queryStringify(data: PlainObject<any>, parentKey?: string, result?: URLSearchParams): string | never {
  if (!data || typeof data !== 'object') {
    throw new Error('input must be an object');
  }

  if (!result) {
    result = new URLSearchParams();
  }

  for (let [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object') {
      queryStringify(value, getKey(key, parentKey), result);

    } else {
      result.append(getKey(key, parentKey), String(value));
    }
  }

  return result.toString();
}

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}
