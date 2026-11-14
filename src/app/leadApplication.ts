import { trackApplicationSuccess } from "./analytics";
import { isCompleteLeadPhone, leadPhoneNumber } from "./leadPhone";
import type { ComplimentaryCourseLeadSource } from "./complimentaryCourseLead";

const APPLICATION_REQUEST_URL = "/application/request";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  question?: string;
  callback_window?: string;
  callback_timezone?: string;
  personal_data_consent?: boolean;
  advertising_consent?: boolean;
};

function findLeadFieldValue(scope: ParentNode, names: string[]) {
  for (const name of names) {
    const field = scope.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      `input[name="${name}"], textarea[name="${name}"]`,
    );
    const value = field?.value.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

export function getLeadPayload(scope?: ParentNode | null): LeadPayload {
  const root = scope || document;
  const name = findLeadFieldValue(root, ["name", "modal-name"]);
  const phone = leadPhoneNumber(findLeadFieldValue(root, ["phone", "modal-phone"]));
  const email = findLeadFieldValue(root, ["email", "modal-email"]);
  const question = findLeadFieldValue(root, ["question", "modal-question"]);

  const callback_window = root.querySelector<HTMLInputElement>('input[name="callback_window"]:checked')?.value;
  const callback_timezone = findLeadFieldValue(root, ["callback_timezone"]);
  return { name, phone, email, question, callback_window, callback_timezone };
}

export function isLeadPayloadValid(payload: LeadPayload) {
  const isEmailValid = !payload.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

  return payload.name.length >= 2 && isCompleteLeadPhone(payload.phone) && isEmailValid;
}

export async function sendLeadApplication(
  payload: LeadPayload,
  captchaToken: string,
  formId: string,
  complimentaryCourse?: ComplimentaryCourseLeadSource,
  applicationContext?: string,
): Promise<void> {
  const response = await fetch(APPLICATION_REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      captcha_token: captchaToken,
      source_page: window.location.href,
      form_id: formId,
      complimentary_course: complimentaryCourse,
      application_context: applicationContext,
    }),
  });

  const result = await response.json().catch(() => ({ error: null }));

  if (response.ok && result.ok) {
    trackApplicationSuccess(formId);
    return;
  }

  throw new Error(result.error || `lead-request-failed:${response.status}`);
}
