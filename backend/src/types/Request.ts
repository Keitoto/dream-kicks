declare module 'Express' {
  export interface Request {
    user: {
      name: string;
      _id: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
  }
}
