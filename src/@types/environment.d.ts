/* eslint-disable @typescript-eslint/naming-convention */

export {};

declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface ProcessEnv {
            FORGOT_MAIL_URL: string;
            APP_API_URL: string;

            AWS_ACCESS_KEY_ID: string;
            AWS_SECRET_ACCESS_KEY: string;
            AWS_BUCKET: string;
            AWS_BUCKET_REGION: string;
            AWS_BUCKET_URL: string;
            AWS_REGION: string;

            MAIL_PROVIDER: string;
            SES_EMAIL: string;

            disk: string;

            REDIS_HOST: string;
            REDIS_PORT: number;

            SENTRY_DSN: string;

            SECRET_TOKEN: string;
            EXPIRES_IN_TOKEN: string;
            SECRET_REFRESH_TOKEN: string;
            EXPIRES_IN_REFRESH_TOKEN: string;
            EXPIRES_DAYS_REFRESH_TOKEN: number;
        }
    }
}
