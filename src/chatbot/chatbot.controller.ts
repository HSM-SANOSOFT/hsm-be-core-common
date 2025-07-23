import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ChatbotService } from './chatbot.service';
import { ConversationFilterPost } from './type';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @MessagePattern('estadisticaChatbot')
  getStatistics(data: ConversationFilterPost['payload']) {
    return this.chatbotService.getStatistics(data);
  }
}
