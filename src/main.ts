import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import Logger from 'src/common/utils/logger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  })
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')

  await app.listen(port, () => {
    Logger.info(`🍕 Pizzailo is active! \n Listening on port ${port}`)
  })
}

bootstrap()
