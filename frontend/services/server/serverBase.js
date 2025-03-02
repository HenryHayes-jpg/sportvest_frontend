import axios from "axios";
import config from "~/config";

class ServerBase {
  static async getServerPath() {
    return config.apiUrl;
  }

  static async getRequest(endpoint, params = null) {
    try {
      let url = (await this.getServerPath()) + endpoint;

      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      const response = await axios.get(url);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error.message);
    }

    return null;
  }

  static async postRequest(endpoint, data) {
    try {
      const url = (await this.getServerPath()) + endpoint;

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error.message);
    }

    return null;
  }

  static async deleteRequest(endpoint, params = null) {
    try {
      let url = (await this.getServerPath()) + endpoint;

      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      const response = await axios.delete(url);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error.message);
    }

    return null;
  }
}

export default ServerBase;
