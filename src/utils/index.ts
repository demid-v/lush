import { notFound } from "next/navigation";

export const extractIdFromQuery = (slug: string) => {
  const id = parseInt(slug.split("+")[0] ?? "", 10);

  if (Number.isNaN(id)) return notFound();

  return id;
};
