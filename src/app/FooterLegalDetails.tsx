import React from "react";

export const SOFTWARE_REGISTRY_NOTICE =
  'ПО "INNOPROG" зарегистрировано в реестре российского ПО (реестровая запись №34485 от 15.07.2026).';

export function FooterLegalDetails({
  compactActivityCodes = false,
}: {
  compactActivityCodes?: boolean;
}) {
  return (
    <>
      ООО «ИННОПРОГ» · ИНН 1683011286 · ОГРН 1221600105440
      <br aria-hidden="true" />
      {SOFTWARE_REGISTRY_NOTICE}
      <br aria-hidden="true" />
      {compactActivityCodes
        ? "ОКВЭД: 62.09 (осн.), 62.02 · Коды видов деятельности в области информационных технологий: 16.01 (осн.), 1.01, 1.12"
        : "ОКВЭД: 62.09 (основной), 62.02 · Коды видов деятельности в области информационных технологий: 16.01 (основной), 1.01, 1.12"}
    </>
  );
}
