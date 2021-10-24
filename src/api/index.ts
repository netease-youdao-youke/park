import md5 from 'md5';
let token = '';
let baiduOpenToken = '';

export const setToken = (latestToken: string) => {
  token = latestToken;
}
export const setBaiduOpenToken = (latestToken: string) => {
  baiduOpenToken = latestToken;
}
export const BCE_PROXY_HOST = "http://localhost:3001/bce";

export const TSN_PROXY_HOST = "http://localhost:3001/tsn";

export const OPEN_PROXY_HOST = "http://localhost:3001/openapi";

export const SERVER_HOST = "http://10.242.201.184:8888";


export const getToken = () => token;
export const getBaiduOpenToken = () => token;

const AI_SECRET_KEY = 'UiNskvdWaalxGYn4NwGpgtoHmV9dHh80';
const AI_CLIENT_KEY = 'MwsTx2XCcGKhQM1xu4XjxBLI';

const OPEN_SECRET_KEY = 'kiL8LCikIMzVCcXaLnUPntTIjtAIfWom';
const OPEN_CLIENT_KEY = 'Dqf2NrPenWvei7lt28uKcyW6'

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
  return await fetch(url + qs(params), {
    ...init,
    method: 'GET',
    mode: 'cors',
  });
}

export const post = async (url: string, params: Record<string, any>, init?: RequestInit) => {
  const requestInit: RequestInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...init,
  };
  const contentType = requestInit.headers['Content-Type'];
  if (contentType === 'application/x-www-form-urlencoded') {
    requestInit.body = qs(params, false);
  } else if (contentType === 'application/json') {
    requestInit.body = JSON.stringify(params);
  }
  return await fetch(url, requestInit);
}

export const initToken = async () => {
  const params = {
    grant_type: "client_credentials",
    client_id: AI_CLIENT_KEY,
    client_secret: AI_SECRET_KEY
  }
  const url = `${OPEN_PROXY_HOST}/oauth/2.0/token`;
  const rawRes = await get(url, params, {
    mode: 'cors'
  });
  return rawRes.json();
}

export const initBaiduOpenToken = async () => {
  const params = {
    grant_type: "client_credentials",
    client_id: AI_CLIENT_KEY,
    client_secret: AI_SECRET_KEY
  }
  const url = `${OPEN_PROXY_HOST}/oauth/2.0/token`;
  const rawRes = await get(url, params, {
    mode: 'cors'
  });
  return rawRes.json();
}

export const analyzeImage = async (param: {
  url?: string;
  image?: string;
}) => {
  const url = `${OPEN_PROXY_HOST}/rest/2.0/image-classify/v1/vehicle_detect?access_token=${token}`
  const rawRes = await post(url, param);
  return rawRes.json();
}


export const reportVehicle = async (params: any) => {
  const url = `${SERVER_HOST}/monitor/vehicle`;
  const rawRes = await post(url, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return rawRes.json();
}


export const textToAudio = async (text: string) => {
  const url = `${TSN_PROXY_HOST}/ttsapi/`
  const appKey = '72c4c147b1461fc1';
  const secretKey = '318KQ1HX4Evts847qt7q5bvPG38nr9CL';
  const uuid = 'd93d7566-349f-11ec-b400-0a80ff2603de';
  const rawRes =  await post(url, {
    q: text,
    langType: "zh-CHS",
    appKey: appKey,
    salt: uuid,
    sign: md5(`${appKey}${text}${uuid}${secretKey}`)
  })
  const data = await rawRes.blob();
  return URL.createObjectURL(data);
}