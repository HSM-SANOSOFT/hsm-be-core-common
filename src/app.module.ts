import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { DatabaseModule } from './database/database.module';
import { ExtraModule } from './extra/extra.module';

@Module({
  imports: [DatabaseModule, ExtraModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
