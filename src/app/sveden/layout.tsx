import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сведения об образовательной организации",
  description: "Официальные сведения об образовательной организации ООО «ИННОПРОГ»: документы, программы, руководство, педагогический состав и условия обучения.",
};

export default function SvedenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
