import axios from 'axios';

import { BuyerRequest } from '../app/types';

class BuyerService {
  private get api(): string {
    const propertiesUrl = process.env.NEXT_PUBLIC_PROPERTIES_POST_API;

    if (!propertiesUrl) {
      throw new Error('API env var is not defined');
    }
    return propertiesUrl;
  }

  private get headers() {
    return {
      'content-type': 'application/json'
    };
  }

  async getProperties(params?: BuyerRequest) {
    return axios.get(this.api, {
      headers: this.headers,
      params: {
        ...params
      }
    });
  }
}

const BuyerServiceInstance = new BuyerService();
export default BuyerServiceInstance;
