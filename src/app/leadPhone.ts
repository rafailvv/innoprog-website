// ITU Operational Bulletin 1341 lists the +7 ranges assigned exclusively to Russia.
const RUSSIAN_AREA_CODES_IN_EIGHT = [
  [810, 818], [820, 821], [831, 831], [833, 836], [840, 848], [850, 851],
  [855, 857], [860, 863], [865, 867], [869, 869], [871, 873], [877, 880],
];

export function nationalLeadPhoneDigits(value: string, acceptDomesticPrefix = true) {
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");

  if (phone.startsWith("+")) return phone.startsWith("+7") ? digits.slice(1) : "";
  if (digits.startsWith("00") || (digits.startsWith("810") && digits.length > 11)) return "";
  if (acceptDomesticPrefix && digits.length === 11 && /^[78]/.test(digits)) return digits.slice(1);
  return digits;
}

export function leadPhoneNumber(national: string) {
  const digits = national.replace(/\D/g, "");
  return digits ? `+7${digits}` : "";
}

export function isCompleteLeadPhone(phone: string) {
  if (!/^\+7\d{10}$/.test(phone)) return false;
  if (/^\+7[23459]/.test(phone)) return true;
  const areaCode = Number(phone.slice(2, 5));
  return RUSSIAN_AREA_CODES_IN_EIGHT.some(([first, last]) => areaCode >= first && areaCode <= last);
}
