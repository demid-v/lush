const charsToEncode = ["?", "#", "/", "\\", "+", "%"];
const escapeStrings = charsToEncode.map((char) => encodeURIComponent(char));

const encode = (str: string) =>
  str
    .split("")
    .map((char) =>
      charsToEncode.includes(char) ? encodeURIComponent(char) : char
    )
    .join("")
    .replaceAll(" ", "+");

const decode = (str: string) => {
  str = str.replaceAll("+", " ");

  for (const escapeString of escapeStrings) {
    str = str.replaceAll(escapeString, decodeURIComponent(escapeString));
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

const extractIdFromQuery = (id: string | string[] | undefined) =>
  Number(joinParam(id)?.split(/\+(.*)/)[0]);

export { encode, decode, encodeForDb, joinParam, extractIdFromQuery };
