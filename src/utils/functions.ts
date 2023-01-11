const encode = (str: string) =>
  str
    .split("")
    .map((char) =>
      ["?", "#", "/", "\\", "+", "%"].includes(char)
        ? encodeURIComponent(char)
        : char
    )
    .join("")
    .replaceAll(" ", "+");

const decode = (str: string) => {
  str = str.replaceAll("+", " ");

  for (const charToDecode of ["%3F", "%23", "%2F", "%5C", "%2B", "%25"]) {
    str = str.replaceAll(charToDecode, decodeURIComponent(charToDecode));
  }

  return str;
};

const encodeForDb = (str: string) => {
  for (const charToDecode of ["%", "_"]) {
    str = str.replaceAll(charToDecode, "\\" + charToDecode);
  }

  return str;
};

const joinParam = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param.join("") : param;

export { encode, decode, encodeForDb, joinParam };
