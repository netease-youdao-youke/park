let token = '';

export const setToken = (latestToken: string) => {
  token = latestToken;
}

export const PROXY_HOST = "http://localhost:3001";


export const getToken = () => token;

const SECRET_KEY = 'UiNskvdWaalxGYn4NwGpgtoHmV9dHh80';
const CLIENT_KEY = 'MwsTx2XCcGKhQM1xu4XjxBLI';

const qs = (params: Record<string, any>, prefix = true) => {
  let str = prefix ? '?' : '';
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    str += `${keys[i]}=${params[keys[i]].toString()}`
    if (i !== keys.length - 1) {
      str += '&';
    }
  }
  return str;
}

export const get = async (url: string, params: Record<string, any>, init?: RequestInit) => {
  const rawRes = await fetch(url + qs(params), {
    ...init,
    method: 'GET',
    mode: 'cors',
  });
  const jsonRes = await rawRes.json();
  return jsonRes;
}

export const post = async (url: string, params: Record<string, any>, init?: RequestInit) => {
  const rawRes = await fetch(url, {
    ...init,
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs(params, false),
  });
  const jsonRes = await rawRes.json();
  return jsonRes;
}

export const initToken = async () => {
  const params = {
    grant_type: "client_credentials",
    client_id: CLIENT_KEY,
    client_secret: SECRET_KEY
  }
  const url = `${PROXY_HOST}/api/oauth/2.0/token`;
  const result = await get(url, params, {
    mode: 'cors'
  });
  const jsonRes = await result.json();
  return jsonRes;
}

export const analyzeImage = async (param: {
  url?: string;
  image?: string;
}) => {
  const url = `${PROXY_HOST}/api/rest/2.0/image-classify/v1/vehicle_detect?access_token=${token}`
  const rawRes = await post(url, param);
  const jsonRes = await rawRes.json();
  return jsonRes;
}
