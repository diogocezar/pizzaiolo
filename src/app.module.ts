import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { SlackService } from 'src/slack/slack.service'
import { PizzaioloService } from 'src/pizzaiolo/pizzaiolo.service'
import { PrismaService } from 'src/common/database/prisma/prisma.service'

import { SlackApi } from './config/api/slack.api'

import { PizzaioloRepository } from './pizzaiolo/pizzaiolo.repository'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    SlackService,
    PizzaioloService,
    PrismaService,
    SlackApi,
    PizzaioloRepository,
  ],
})
export class AppModule {}
