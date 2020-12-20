import axios from "axios";
const GLOBAL_URL = "http://localhost:4000/api/";

export const send_get = async (url, token, id) => {
  if (!id && !token) {
    let res = await axios.get(GLOBAL_URL + url);
    if (!res) {
      res = { data: { success: 0, message: "canno't connect to the server" } };
    }
    return res.data;
  } else {
    if (!token) {
      console.log(token);
      let res = await axios.get(GLOBAL_URL + url + id);
      if (!res) {
        res = {
          data: { success: 0, message: "canno't connect to the server" },
        };
        return res.data;
      }
    }
    if (token && !id) {
      token = token.replace(/^"(.*)"$/, "$1");
      let res = await axios.get(GLOBAL_URL + url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res) {
        res = {
          data: { success: 0, message: "canno't connect to the server" },
        };
      }
      return res.data;
    }
    token = token.replace(/^"(.*)"$/, "$1");
    let res = await axios.get(GLOBAL_URL + url + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res) {
      res = {
        data: { success: 0, message: "canno't connect to the server" },
      };
      console.log(res);
      return res.data;
    }
  }
};

export const send_post = async (url, obj, token, option) => {
  if (!token) {
    let res = await axios.post(GLOBAL_URL + url, obj);
    if (!res) {
      res = { data: { success: 0, message: "canno't connect to the server" } };
    }
    return res.data;
  }
  if (option) {
    token = token.replace(/^"(.*)"$/, "$1");
    let res = await axios.post(GLOBAL_URL + url, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (!res) {
      res = { data: { success: 0, message: "canno't connect to the server" } };
    }
    return res.data;
  }
  token = token.replace(/^"(.*)"$/, "$1");

  let res = await axios.post(GLOBAL_URL + url, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res) {
    res = { data: { success: 0, message: "canno't connect to the server" } };
  }
  return res.data;
};

export const send_put = async (url, obj, token, option) => {
  if (!token) {
    let res = await axios.put(GLOBAL_URL + url, obj);
    if (!res) {
      res = { data: { success: 0, message: "canno't connect to the server" } };
    }
    return res.data;
  }
  if (option) {
    token = token.replace(/^"(.*)"$/, "$1");
    let res = await axios.put(GLOBAL_URL + url, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (!res) {
      res = { data: { success: 0, message: "canno't connect to the server" } };
    }
    return res.data;
  }
  token = token.replace(/^"(.*)"$/, "$1");

  let res = await axios.put(GLOBAL_URL + url, obj, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res) {
    res = { data: { success: 0, message: "canno't connect to the server" } };
  }
  return res.data;
};

export const send_delete = async (url, obj, token) => {
  token = token.replace(/^"(.*)"$/, "$1");
  let res = await axios.delete(GLOBAL_URL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: obj,
  });
  if (!res) {
    res = { data: { success: 0, message: "canno't connect to the server" } };
  }
  return res.data;
};
