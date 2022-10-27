import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { SlackService } from './slack/slack.service'
import { PizzaioloService } from './pizzaiolo/pizzaiolo.service'
import { PrismaService } from './shared/prisma.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SlackService, PizzaioloService, PrismaService],
})
export class AppModule {}
