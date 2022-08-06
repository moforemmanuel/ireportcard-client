export interface EntityResponse {
  id: number;
  message: string;
  log: boolean;
}

export const isEntityResponse = (obj: any): obj is EntityResponse => {
  return 'id' in obj && 'message' in obj && 'log' in obj;
}
