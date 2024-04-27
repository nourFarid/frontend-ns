export const setAuthUser = (data,sessionData) => {
  localStorage.setItem("user", JSON.stringify(data));
  // localStorage.setItem("session", JSON.stringify(sessionData));
};


// export const getAuthUser = () => {
//   if (localStorage.getItem("user")) {
//     return {
//       user: JSON.parse(localStorage.getItem("user")),
//       session: JSON.parse(localStorage.getItem("session"))
//     };
//   }
//   return null;
// };


export const getAuthUser = (data) => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
};
export const removeAuthUser = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
    // localStorage.removeItem("session");
  }
};
