import fetchFormAPI from "./api";
import { Form } from "@hzzhsoftware/types-form";

/** Get a form by ID */
export async function getForm(formId: string) {
  return fetchFormAPI<Form>(`/${formId}`);
}

/** Submit a form response */
export async function submitForm(formId: string, values: Record<string, any>) {
  return fetchFormAPI(`/${formId}/submit`, {
    method: "POST",
    body: JSON.stringify(values),
  });
}