export const fetcher = (url: string): Promise<any> =>
  fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then((res) => res.json());
