import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SlackModule } from 'nestjs-slack';

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
  providers: [AppService],
})
export class AppModule {}
