export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const replaceUrl = (url, data) => {
  var regex = new RegExp(":(" + Object.keys(data).join("|") + ")", "g");
  return url?.replace(regex, (m, $1) => data[$1] || m);
};

export const RequestStatus = {
  Idle: "idle",
  Pending: "pending",
  Fulfilled: "fulfilled",
  Rejected: "rejected",
};
