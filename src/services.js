import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const URL_AUTH = `${BASE_URL}/auth`;

const URL_LOGIN = `${URL_AUTH}/login`;

// for APIs that don't need a token in the header
const headers = { "Content-Type": "application/json" };

class User {
  constructor() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
    this.createdAt = "";
  }

  // for forgot password
  setUserEmail(email) {
    this.email = email.toLowerCase();
  }

  setUserData(userData) {
    const { _id, name, email, role, createdAt } = userData;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  logoutUser() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
    this.createdAt = "";
  }
}

export class AuthService extends User {
  constructor() {
    super();
    this.bearerHeader = {};
  }

  setBearerHeader(token) {
    this.bearerHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getBearerHeader() {
    return this.bearerHeader;
  }

  async loginUser(email, password) {
    const body = {
      email: email.toLowerCase(),
      password,
    };

    try {
      const response = await axios.post(URL_LOGIN, body, {
        headers,
      });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
    } catch (error) {
      throw error;
    }
  }
}
