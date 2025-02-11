import axios from 'axios';

import { SellerRequest, PropertiesResponse } from '../app/types';

class SellerService {
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

  async createProperties(payload: SellerRequest): Promise<PropertiesResponse> {
    return axios.post(this.api, payload, {
      headers: this.headers
    });
  }
}

const SellerServiceInstance = new SellerService();
export default SellerServiceInstance;
