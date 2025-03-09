import config from "~/config";
import ServerBase from "./serverBase";

class Customer extends ServerBase {
    static async submitProduct(formData) {
      const endpoint = config.sellSomethingExt;
      const params = formData;
      return await this.postRequest(endpoint, params);
    }

    static async submitContactMessage(formData) {
        const endpoint = config.contactUsExt;
        const params = formData;
        return await this.postRequest(endpoint, params);
      }

    static async submitPurchase(buyerInfo) {
        const endpoint = config.soldItemsExt;
        const params = buyerInfo;
        return await this.postRequest(endpoint, params);
    }
  }

  export default Customer;