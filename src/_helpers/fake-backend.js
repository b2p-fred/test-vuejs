import store from "@/store";
import { readFromStorage } from "@/utils/local-storage";

// An array in the browser local storage for registered users
let usersList = readFromStorage("usersList") || [];
export const registeredUsers = usersList;

// An array in the browser local storage for documents
let documentsList = [
  {
    name: "Notice de réglage",
    description: "Une notice de réglage",
    category: "Notice",
    url: "https://demo.vizavy.fr/api/document/119086",
  },
  {
    name: "Novembre 2019",
    description: "Ma quittance de loyer",
    category: "Quittance",
    url: "https://demo.vizavy.fr/api/document/119097",
  },
];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate a user
        if (url.endsWith(store.state.remote.login) && opts.method === "POST") {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          // find if any user matches login credentials
          let filteredUsers = usersList.filter((user) => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let user = filteredUsers[0];
            let responseJson = {
              token: "fake-jwt-token-" + user.id,
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          } else {
            // else return error
            reject("users.ko_login");
          }

          return;
        }

        // raise an alert
        if (url.endsWith(store.state.remote.alert) && opts.method === "POST") {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          if (params.comments === "ko") {
            // Return a fake error
            reject("alert.ko_message");
          } else {
            // return a random log identifier
            let responseJson = {
              id: JSON.stringify(
                Math.floor(Math.random() * Math.floor(100000))
              ),
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          }

          return;
        }

        // get connected user profile data
        if (url.endsWith(store.state.remote.profile) && opts.method === "GET") {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization.startsWith("Token")) {
            // Get the logged-in user identifier (fake backend behaviour!)
            let userId = opts.headers.Authorization.replace(
              "Token fake-jwt-token-",
              ""
            );

            // find if any user matches login credentials
            let filteredUsers = usersList.filter((found) => {
              return found.id === parseInt(userId);
            });
            if (filteredUsers.length) {
              let found = filteredUsers[0];
              let role = "tenant";

              let layout;
              try {
                layout = require("../assets/layout-" +
                  found.lastName +
                  ".json");
              } catch (e) {
                try {
                  layout = require("../assets/layout-" + role + ".json");
                } catch (e) {
                  layout = null;
                }
              }

              let responseJson = {
                role: role,
                firstName: found.firstName,
                lastName: found.lastName,
                layout: layout,
              };

              resolve({
                ok: true,
                text: () => Promise.resolve(JSON.stringify(responseJson)),
              });
            } else {
              reject("NotFound");
            }
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // get documents
        if (
          url.endsWith(store.state.remote.documents) &&
          opts.method === "GET"
        ) {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization.startsWith("Token")) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(documentsList)),
            });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // get users
        if (url.endsWith(store.state.remote.users) && opts.method === "GET") {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization.startsWith("Token")) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(usersList)),
            });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // get user by id
        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization.startsWith("Token")) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = usersList.filter((user) => {
              return user.id === id;
            });
            let user = matchedUsers.length ? matchedUsers[0] : null;

            // respond 200 OK with user
            resolve({ ok: true, text: () => JSON.stringify(user) });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // delete user
        if (url.match(/\/users\/\d+$/) && opts.method === "DELETE") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization.startsWith("Token")) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < usersList.length; i++) {
              let user = usersList[i];
              if (user.id === id) {
                // delete user
                usersList.splice(i, 1);
                localStorage.setItem("usersList", JSON.stringify(usersList));
                break;
              }
            }

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));
      }, 1000);
    });
  };
}
