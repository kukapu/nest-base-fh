import axios, { AxiosInstance } from "axios";
import { HttpsAdapter } from "../interfaces/https-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpsAdapter {

  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error - check logs')
    }
  }
}