import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import axios, { AxiosInstance } from 'axios';
import pLimit from 'p-limit';
import { envs } from 'src/config';

import {
  ConversationFilterPost,
  ConversationFilterResponse,
  MessagesResponse,
} from './type';

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

      const ConversationResponse =
        await this.client.post<ConversationFilterResponse>(path, payload, {
          params: { page: 1 },
        });

      const totalConversations = ConversationResponse.data.meta.all_count;
      const convPerPage = ConversationResponse.data.payload.length;
      const totalPages = Math.ceil(totalConversations / convPerPage);

      const pageLimit = pLimit(5);
      const pagePromises = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 2,
      ).map(page =>
        pageLimit(async () => {
          this.logger.debug(`Fetching page ${page}`);
          const resp = await this.client.post<ConversationFilterResponse>(
            path,
            payload,
            { params: { page } },
          );
          return resp;
        }),
      );

      const otherPages = await Promise.all(pagePromises);

      const allConversations = [
        ...ConversationResponse.data.payload,
        ...otherPages.flatMap(page => page.data.payload),
      ];

      const conversationIds = allConversations.map(conv => conv.id);

      const messageLimit = pLimit(10);

      const messagePromises = conversationIds.map(id =>
        messageLimit(async () => {
          this.logger.debug(`Fetching messages for conversation ${id}`);
          const resp = await this.client.get<MessagesResponse>(
            `/conversations/${id}/messages`,
          );
          return resp;
        }),
      );

      const messageCounts = await Promise.all(messagePromises);

      const totalMessages = messageCounts.reduce(
        (sum, response) => sum + response.data.payload.length,
        0,
      );

      return {
        n_conv: totalConversations,
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
