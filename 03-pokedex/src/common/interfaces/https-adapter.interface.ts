
export interface HttpsAdapter {
  get<T>(url: string): Promise<T>;
}