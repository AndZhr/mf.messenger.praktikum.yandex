type Options = {
    method: string;
    headers?: {[key: string]: string};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
};

export default function request(url: string, options: Options = { method: 'GET' }): Promise<XMLHttpRequest> {
  const { method, headers, data } = options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.withCredentials = true;

    if ((!headers || !('Content-Type' in headers)) && data) {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    }

    if (headers) {
      Object.entries(headers).forEach(([name, value]) => {
        xhr.setRequestHeader(name, value);
      });
    }

    if (method === 'GET' && data) {
      const query = queryStringify(data);

      // eslint-disable-next-line no-param-reassign
      url = `${url}?${query}`;
    }

    xhr.onload = () => {
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

function queryStringify(
  data: SimpleObject,
  parentKey?: string,
  result?: URLSearchParams
): string | never {
  if (!data || typeof data !== 'object') {
    throw new Error('input must be an object');
  }

  if (!result) {
    // eslint-disable-next-line no-param-reassign
    result = new URLSearchParams();
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      queryStringify(value, getKey(key, parentKey), result);
    } else if (result) {
      result.append(getKey(key, parentKey), String(value));
    }
  });

  return result.toString();
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}
