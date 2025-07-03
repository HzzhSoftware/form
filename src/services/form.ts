import fetchFormAPI from "./api";
import { Form } from "@hzzhsoftware/types-form";

/** Get a form by ID */
export async function getForm(formId: string) {
  return fetchFormAPI<Form>(`/${formId}`);
}

/** Submit a form response */
export async function submitForm(formId: string, values: Record<string, any>, submissionId: string) {
  return fetchFormAPI(`/${formId}/submit`, {
    method: "POST",
    body: JSON.stringify({ ...values, submissionId }),
  });
}

/** Submit a form response */
export async function getSubmission(formId: string, submissionId: string) {
  return fetchFormAPI(`/${formId}/submit/${submissionId}`, {
    method: "GET",
  });
}

export async function listForms(page: number = 1, limit: number = 50) {
  return fetchFormAPI(`?page=${page}&limit=${limit}`, {
    method: "GET",
  });
}

export async function createForm(form: Form) {
  return fetchFormAPI(`/`, {
    method: "POST",
    body: JSON.stringify(form),
  });
}

export async function updateForm(formId: string, form: Form) {
  return fetchFormAPI(`/${formId}`, {
    method: "PUT",
    body: JSON.stringify(form),
  });
}

export async function deleteForm(formId: string) {
  return fetchFormAPI(`/${formId}`, {
    method: "DELETE",
  });
}

export async function listSubmissions(formId: string, page: number, limit: number) {
  return fetchFormAPI(`/${formId}/submit?page=${page}&limit=${limit}`);
}