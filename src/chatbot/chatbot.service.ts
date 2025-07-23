import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import axios, { AxiosInstance } from 'axios';
import { envs } from 'src/config';

import { ConversationFilterPost, ConversationFilterResponse } from './type';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${envs.CHATWOOT_BASE_URL}/api/v1/accounts/${envs.CHATWOOT_ACCOUNT_ID}`,
      headers: {
        'Content-Type': 'application/json',
        'api-access-api_access_token': envs.CHATWOOT_API_KEY,
      },
    });
  }

  async getStatistics(
    payload: ConversationFilterPost['payload'],
  ): Promise<{ n_conv: number; n_msn: number }> {
    /**
     * Obtiene estadísticas del chatbot.
     * @param payload - Filtros para la consulta de conversaciones.
     * @returns Un objeto con el número total de conversaciones (n_conv) y el número total de mensajes (n_msn).
     */
    try {
      const path = '/conversations/filter';
      let page = 1;
      let totalMessages = 0;
      let fetchedConversations = 0;
      let allConversations = 0;

      do {
        const { data } = await this.client.post<ConversationFilterResponse>(
          path,
          { payload },
          { params: { page } },
        );

        // Extraemos meta y lista de conversaciones
        const {
          meta: { all_count },
          payload: convs,
        } = data;

        allConversations = all_count;
        fetchedConversations += convs.length;
        totalMessages += convs.reduce(
          (sum, conv) => sum + conv.messages.length,
          0,
        );
        page++;
      } while (fetchedConversations < allConversations);

      return {
        n_conv: allConversations,
        n_msn: totalMessages,
      };
    } catch (error) {
      this.logger.error('Error fetching chatbot statistics', error);
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error fetching chatbot statistics',
      });
    }
  }
}
