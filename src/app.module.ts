import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { SlackModule } from 'nestjs-slack'
import { SlackService } from './slack/slack.service'
import { PizzaioloService } from './pizzaiolo/pizzaiolo.service'
import { PrismaService } from './shared/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SlackModule.forRoot({
      type: 'webhook',
      channels: [
        {
          name: process.env.CHANNEL,
          url: process.env.WEBHOOK_URL,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SlackService, PizzaioloService, PrismaService],
})
export class AppModule {}
