const constructLink = (str: string) =>
  encodeURIComponent(str).replaceAll("%20", "+");

export { constructLink };
