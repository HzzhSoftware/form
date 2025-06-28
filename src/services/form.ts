import fetchFormAPI from "./api";

/** Get a form by ID */
export async function getForm(formId: string) {
  return fetchFormAPI(`/forms/${formId}`);
}

/** Submit a form response */
export async function submitForm(formId: string, values: Record<string, any>) {
  return fetchFormAPI(`/forms/${formId}/submit`, {
    method: "POST",
    body: JSON.stringify(values),
  });
}