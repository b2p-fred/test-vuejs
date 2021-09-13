import httpClient from "./httpClient";

/**
 * This builds a service object having all the CRUD methods:
 * - find to get an itm
 * - findAll to get a collection of items
 * - create to create a new item
 * - del to delete an item
 * - update to update an item
 * ----
 * @param endpoint
 * @returns Object
 */
export default function makeService(endpoint) {
  return {
    find(id) {
      console.log("find", endpoint, id);
      return httpClient.get(`${id}`);
    },
    findAll(params) {
      console.log("findAll", endpoint, params);
      return httpClient.get(endpoint, params);
    },
    create(payload) {
      return httpClient.post(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    del(item) {
      return httpClient.delete(item["@id"], { method: "DELETE" });
    },
    update(payload) {
      return httpClient.put(payload["@id"], {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
  };
}
