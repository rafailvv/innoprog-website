import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseComplimentaryCourseLead } from "../../complimentaryCourseLead";
import FreeModuleApplication from "./FreeModuleApplication";

export const metadata: Metadata = {
  title: "Заявка на обучение",
  robots: { index: false, follow: false },
};

export default async function FreeModuleApplicationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const source = parseComplimentaryCourseLead(params);
  if (!source) notFound();
  const offerUntil = typeof params.offerUntil === "string" && /^\d{1,13}$/.test(params.offerUntil)
    ? Number(params.offerUntil)
    : null;
  return <FreeModuleApplication source={source} offerUntil={offerUntil} />;
}
