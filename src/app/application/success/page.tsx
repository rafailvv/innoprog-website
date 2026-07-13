import type { Metadata } from "next";
import LeadApplicationPage from "../LeadApplicationPage";

export const metadata: Metadata = {
  title: "Заявка отправлена",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ApplicationSuccessPage() {
  return <LeadApplicationPage success />;
}
