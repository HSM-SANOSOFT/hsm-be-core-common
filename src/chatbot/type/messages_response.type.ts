export type MessagesResponse = {
  meta: {
    labels: string[];
    additional_attributes: Record<string, unknown>;
    contact: {
      payload: Array<{
        additional_attributes: Record<string, unknown>;
        availability_status: string;
        email: string;
        id: number;
        name: string;
        phone_number: string;
        blocked: boolean;
        identifier: string;
        thumbnail: string;
        custom_attributes: Record<string, string>;
        last_activity_at: number;
        created_at: number;
        contact_inboxes: Array<{
          source_id: string;
          inbox: {
            id: number;
            avatar_url: string;
            channel_id: number;
            name: string;
            channel_type: string;
            provider: string;
          };
        }>;
      }>;
    };
    assignee: {
      id: number;
      account_id: number;
      availability_status: string;
      auto_offline: boolean;
      confirmed: boolean;
      email: string;
      available_name: string;
      name: string;
      role: string;
      thumbnail: string;
      custom_role_id: number;
    };
    agent_last_seen_at: string;
    assignee_last_seen_at: string;
  };
  payload: Array<{
    id: number;
    content: string;
    account_id: number;
    inbox_id: number;
    conversation_id: number;
    message_type: number;
    created_at: number;
    updated_at: number;
    private: boolean;
    status: string;
    source_id: string;
    content_type: string;
    content_attributes: Record<string, unknown>;
    sender_type: string;
    sender_id: number;
    external_source_ids: Record<string, unknown>;
    additional_attributes: Record<string, unknown>;
    processed_message_content: string;
    sentiment: Record<string, unknown>;
    conversation: Record<string, unknown>;
    attachment: Record<string, unknown>;
    sender: Record<string, unknown>;
  }>;
};
