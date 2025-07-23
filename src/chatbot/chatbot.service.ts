import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { envs } from 'src/config';

import { ConversationFilterPost, ConversationFilterResponse } from './type';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private readonly client: AxiosInstance;

  constructor() {
    this.logger.log(
      'Initializing ChatbotService with base URL: ' +
        envs.CHATWOOT_BASE_URL +
        ' and account ID: ' +
        envs.CHATWOOT_ACCOUNT_ID +
        ' and API key: ' +
        `${envs.CHATWOOT_API_KEY.slice(0, 2)}****${envs.CHATWOOT_API_KEY.slice(-2)}`,
    );
    this.client = axios.create({
      baseURL: `${envs.CHATWOOT_BASE_URL}/api/v1/accounts/${envs.CHATWOOT_ACCOUNT_ID}`,
      headers: {
        'Content-Type': 'application/json',
        api_access_token: envs.CHATWOOT_API_KEY,
      },
    });
    this.logger.log(
      'ChatbotService initialized successfully with base URL: ' +
        this.client.defaults.baseURL,
    );
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
        this.logger.debug(`Fetching page ${page}`);
        const response = await this.client.post<ConversationFilterResponse>(
          path,
          payload,
          { params: { page } },
        );

        const { data } = response;

        this.logger.debug(`Received response for page ${page}`);
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
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        this.logger.error(
          `Chatwoot responded ${status}: ${JSON.stringify(data)}`,
        );
        throw new RpcException({
          statusCode: status,
          message: `Chatwoot responded with error: ${JSON.stringify(data)}`,
        });
      } else {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: String(error),
        });
      }
    }
  }
}
