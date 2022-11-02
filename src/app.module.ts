import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { SlackService } from 'src/slack/slack.service'
import { PizzaioloService } from 'src/pizzaiolo/pizzaiolo.service'
import { PrismaService } from 'src/common/database/prisma/prisma.service'

import { SlackApi } from './config/api/slack.api'

import { PizzaioloRepository } from './pizzaiolo/pizzaiolo.repository'
import { InteractivityService } from 'src/pizzaiolo/interactivity.service'
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        SLACK_TOKEN: Joi.string().required(),
        SLACK_CHANNEL: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3000),
        // GITHUB_WEBHOOK_SECRET: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SlackService,
    PizzaioloService,
    PrismaService,
    SlackApi,
    PizzaioloRepository,
    InteractivityService,
  ],
})
export class AppModule {}
