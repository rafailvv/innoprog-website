import type { Metadata } from "next";
import LeadApplicationPage from "./LeadApplicationPage";

export const metadata: Metadata = {
  title: "Бесплатное занятие",
  description: "Заявка на бесплатное вводное занятие в ИННОПРОГ",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ApplicationPage() {
  return <LeadApplicationPage />;
}
