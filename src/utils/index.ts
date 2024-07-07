const joinParam = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param.join("") : param;

const extractIdFromQuery = (id: string | string[] | undefined) =>
  Number(joinParam(id)?.split("+")[0]);

export { joinParam, extractIdFromQuery };
