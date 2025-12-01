export const getConfig = (configName: string) => {
  const configValue = import.meta.env[configName]
  if (!configValue) {
    throw new Error(`Configuration value for ${configName} is not defined.`)
  }
  return configValue
}
