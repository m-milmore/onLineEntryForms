import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const URL_AUTH = `${BASE_URL}/auth`;
const URL_ENTRIES = `${BASE_URL}/entries`;

const URL_LOGIN = `${URL_AUTH}/login`;
const URL_FORGOT_PASSWORD = `${URL_AUTH}/forgotpassword`;
const URL_RESET_PASSWORD = `${URL_AUTH}/resetpassword/`;

const URL_GET_FORM_CONSTANTS = `${URL_ENTRIES}/formconstants`;
const URL_CREATE_CHECKOUT_SESSION = `${URL_ENTRIES}/create-checkout-session`;

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

  // for forgot password, not used(??)
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

  // doesn't work for
  // const entriesService = new EntriesService(authService.getBearerHeader);
  // getBearerHeader() {
  //   return this.bearerHeader;
  // }

  // works for
  // const entriesService = new EntriesService(authService.getBearerHeader);
  getBearerHeader = () => this.bearerHeader;

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

  async forgotPassword(email, urlLink) {
    const body = {
      email,
      urlLink,
    };

    try {
      await axios.post(URL_FORGOT_PASSWORD, body, { headers });
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(password, token) {
    const body = {
      password,
    };

    try {
      const response = await axios.put(URL_RESET_PASSWORD + token, body, {
        headers,
      });
      this.setBearerHeader(response.data.token);
      this.setUserData(response.data.data);
    } catch (error) {
      throw error;
    }
  }
}

export class EntriesService {
  constructor(authHeader) {
    this.getAuthHeader = authHeader;
    this.formConstants = {};
  }

  setFormConstants(formConstants) {
    this.formConstants = formConstants;
  }

  getFormConstants() {
    return this.formConstants;
  }

  async createEntries(entries) {
    const body = { entries };
    const headers = this.getAuthHeader();

    try {
      await axios.post(URL_ENTRIES, body, { headers });
    } catch (error) {
      throw error;
    }
  }

  async fetchFormConstants() {
    try {
      const response = await axios.get(URL_GET_FORM_CONSTANTS);
      this.setFormConstants(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  async getStripeURL(items) {
    const body = { items };

    try {
      const response = await axios.post(URL_CREATE_CHECKOUT_SESSION, body);
      return response.data.url;
    } catch (error) {
      throw error;
    }
  }
}
