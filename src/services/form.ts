import fetchFormAPI from "./api";
import {
  GetFormParams,
  GetFormResponse,
  CreateFormBody,
  CreateFormResponse,
  UpdateFormParams,
  UpdateFormBody,
  UpdateFormResponse,
  DeleteFormParams,
  DeleteFormResponse,
  ListFormsQuery,
  ListFormsResponse,
  SubmitFormParams,
  SubmitFormBody,
  SubmitFormResponse,
  ListSubmissionsParams,
  ListSubmissionsResponse,
  GetSubmissionParams,
  GetSubmissionResponse,
} from "@hzzhsoftware/types-form";

/** Get a form by ID */
// if custom is true, this is specific URL for custom forms
// otherwise, it is the URL for the form
export async function getForm(params: GetFormParams): Promise<GetFormResponse> {
  const { formId, custom = false } = params;
  return fetchFormAPI<GetFormResponse>(`/${formId}?custom=${custom}`);
}

/** Submit a form response */
export async function submitForm(params: SubmitFormParams, body: SubmitFormBody): Promise<SubmitFormResponse> {
  const { formId } = params;
  return fetchFormAPI<SubmitFormResponse>(`/${formId}/submit`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Get a form submission by ID */
export async function getSubmission(params: GetSubmissionParams): Promise<GetSubmissionResponse> {
  const { formId, submissionId } = params;
  return fetchFormAPI<GetSubmissionResponse>(`/${formId}/submit/${submissionId}`, {
    method: "GET",
  });
}

/** List forms with pagination */
export async function listForms(query: ListFormsQuery = {}): Promise<ListFormsResponse> {
  const { page = 1, limit = 50 } = query;
  return fetchFormAPI<ListFormsResponse>(`?page=${page}&limit=${limit}`, {
    method: "GET",
  });
}

/** Create a new form */
export async function createForm(body: CreateFormBody): Promise<CreateFormResponse> {
  return fetchFormAPI<CreateFormResponse>(``, {
    method: "POST",
    body: JSON.stringify({
      ...body,
      orgId: "KYCOMBINATOR",
      userEmail: "dan@kycombinator.com"
    }),
  });
}

/** Update an existing form */
export async function updateForm(params: UpdateFormParams, body: UpdateFormBody): Promise<UpdateFormResponse> {
  const { formId } = params;
  return fetchFormAPI<UpdateFormResponse>(`/${formId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

/** Delete a form */
export async function deleteForm(params: DeleteFormParams): Promise<DeleteFormResponse> {
  const { formId } = params;
  return fetchFormAPI<DeleteFormResponse>(`/${formId}`, {
    method: "DELETE",
  });
}

/** List submissions for a form */
export async function listSubmissions(params: ListSubmissionsParams): Promise<ListSubmissionsResponse> {
  const { formId, page = 1, limit = 50 } = params;
  return fetchFormAPI<ListSubmissionsResponse>(`/${formId}/submit?page=${page}&limit=${limit}`);
}