const constructLink = (str: string) =>
  encodeURIComponent(str).replaceAll("%20", "+");

const spreadParam = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param.join("") : param;

export { constructLink, spreadParam };
