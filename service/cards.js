import request from "../util/request"

export function queryList() {
  return request("/api/cards")
}

export function deleteOne(id) {
  return request("/api/cards/${id")
}

export function addOne(data) {
  console.log("进入 service addOne ")
  return request("/api/cards/add", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

// export function getStatistic(id) {
//   return request("api/cards${id}/statistic")
// }