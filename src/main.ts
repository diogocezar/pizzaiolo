import { NestFactory } from '@nestjs/core'
import Logger from 'src/shared/logger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(3000, () => {
    Logger.info('🍕 Pizzailo is active! \n Listening on port 3000')
  })
}

bootstrap()
