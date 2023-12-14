import { cleanEnv, str, testOnly } from 'envalid';
import logger from '../utils/logger-winston';

const env = cleanEnv(
    process.env,
    {
        MONDAY_API_KEY: str(),
        NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
        message: str(),
        stack: str(),
    },
    {
        reporter: ({ errors, env }) => {
            logger.info(`There are errors in the environment variables:`, { errors, env });
        },
    },
);

export default env;
