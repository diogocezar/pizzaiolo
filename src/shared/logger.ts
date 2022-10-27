import * as winston from 'winston'

const Logger = () => {
  const logger = winston
    .createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    })
    .add(
      new winston.transports.Console({
        format: winston.format.json(),
      })
    )

  return {
    info: (message: string) => logger.info(message),
    error: (message: string) => logger.error(message),
    warn: (message: string) => logger.warn(message),
  }
}

export default Logger()
