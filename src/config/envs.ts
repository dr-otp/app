import joi from 'joi'

interface EnvVars {
  VITE_API_URL: string
  VITE_APP_NAME?: string
  VITE_APP_STATE: AppStatus
}

const envSchema = joi
  .object({
    VITE_API_URL: joi.string().required(),
    VITE_APP_NAME: joi.string(),
    VITE_APP_STATE: joi.string().valid('dev', 'prod', 'test', 'staging').required()
  })
  .unknown(true)

const { error, value } = envSchema.validate(import.meta.env)

if (error) throw new Error(`Config validation error: ${error.message}`)

const envVars: EnvVars = value

export const envs = {
  apiUrl: envVars.VITE_API_URL,
  mode: import.meta.env.MODE,
  appName: envVars.VITE_APP_NAME || '',
  state: envVars.VITE_APP_STATE
}

export enum AppStatus {
  dev = 'dev',
  prod = 'prod',
  test = 'test',
  staging = 'staging'
}
