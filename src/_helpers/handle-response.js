/*
 * Standard handle of the API response
 */
import store from "@/store";

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      /*
       * Error if status is 401:
       * {
       *    "detail": "Invalid token type"
       * }
       *
       * Error if status else:
       * {
       *   "detail": [
       *     {
       *       "loc": [
       *         "string"
       *       ],
       *       "msg": "string",
       *       "type": "string"
       *     }
       *   ]
       * }
       *
       * Note that the error message is the detail field and it may be an object !
       */
      let error = (data && data.detail) || response.statusText;
      if (typeof error !== "string") {
        error = JSON.stringify(error);
      }

      if (response.status === 401) {
        // auto logout if 401 response returned from api
        store.dispatch("User/logout", error);
      }

      return Promise.reject(error);
    }

    return data;
  });
}
