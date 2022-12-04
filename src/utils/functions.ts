const constructLink = (str: string) =>
  str
    .split("")
    .map((char) =>
      ["?", "#"].includes(char) ? encodeURIComponent(char) : char
    )
    .join("")
    .replaceAll(" ", "+");

export { constructLink };
