import config from "~/config";
import ServerBase from "./serverBase";

class Product extends ServerBase {
    static async getProductsByCategory(category) {
      const endpoint = config.loadProductsExt;
      const params = { category: category };
      return await this.getRequest(endpoint, params);
    }
  }
  
export default Product;