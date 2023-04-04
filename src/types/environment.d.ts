export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        MONGO_URL: string;
        TOKEN_KEY: string;
        // ENV: 'test' | 'dev' | 'prod';
    }
  }
}
