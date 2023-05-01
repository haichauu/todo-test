const IGNORE_FIELDS = [
  'password',
  'passcode',
  'secret',
  'key',
  'otp',
  'access_token',
  'accessToken',
  'refresh_token',
  'refreshToken',
];

export const formatJsonData = (jsonData: Record<string, any>) => {
  const res = {};
  Object.keys(jsonData).forEach((key) => {
    if (!jsonData[key]) {
      res[key] = jsonData[key];
    } else if (IGNORE_FIELDS.includes(key)) {
      const secretValue = jsonData[key].replace(/[^*]/g, '*');
      jsonData[key] = secretValue;
    } else if (typeof jsonData[key] === 'string') {
      res[key] =
        jsonData[key].length > 1000
          ? `[${jsonData[key].substring(0, 20)}...]`
          : jsonData[key];
    } else if (jsonData[key] instanceof Array) {
      res[key] = formatArray(jsonData[key]);
    } else if (typeof jsonData[key] === 'object') {
      res[key] = formatJsonData(jsonData[key]);
    } else {
      res[key] = jsonData[key];
    }
  });
  return res;
};

export const formatArray = (arr) => {
  return arr.map((item) => {
    if (!item) return item;
    else if (typeof item === 'string')
      return item.length > 1000 ? `[${item.substring(0, 20)}...]` : item;
    else if (item instanceof Array) return formatArray(item);
    else if (typeof item === 'object') return formatJsonData(item);
    else if (item instanceof Array) return formatArray(item);
    else return item;
  });
};
export const formatJsonDataToString = (jsonData: Record<string, any>) => {
  const res = formatJsonData(jsonData);
  return JSON.stringify(res);
};

export const maskLog = (data) => {
  try {
    if (process.env.NODE_ENV !== 'production') return data;
    const maskData = formatJsonDataToString(data.response_content);
    return { ...data, response_content: maskData };
  } catch (e) {
    console.log('Co loi xay ra');
    return {};
  }
};
