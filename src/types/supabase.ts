export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      channel: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_auth_required: boolean;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_auth_required?: boolean;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_auth_required?: boolean;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      comment: {
        Row: {
          author: string;
          comment: string;
          created_at: string;
          id: number;
          is_yn: boolean;
          post: number;
          updated_at: string | null;
        };
        Insert: {
          author: string;
          comment: string;
          created_at?: string;
          id?: number;
          is_yn?: boolean;
          post: number;
          updated_at?: string | null;
        };
        Update: {
          author?: string;
          comment?: string;
          created_at?: string;
          id?: number;
          is_yn?: boolean;
          post?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_post_fkey';
            columns: ['post'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
        ];
      };
      conversation: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          is_seen: boolean;
          message: number;
          owner: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          is_seen?: boolean;
          message: number;
          owner: string;
          type: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          is_seen?: boolean;
          message?: number;
          owner?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'conversation_message_fkey';
            columns: ['message'];
            isOneToOne: false;
            referencedRelation: 'message';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversation_owner_fkey';
            columns: ['owner'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      follow: {
        Row: {
          created_at: string;
          follower: string;
          id: number;
          updated_at: string | null;
          user: string;
        };
        Insert: {
          created_at?: string;
          follower: string;
          id?: number;
          updated_at?: string | null;
          user: string;
        };
        Update: {
          created_at?: string;
          follower?: string;
          id?: number;
          updated_at?: string | null;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'follow_follower_fkey';
            columns: ['follower'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follow_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      like: {
        Row: {
          created_at: string;
          id: number;
          post: number;
          updated_at: string | null;
          user: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post: number;
          updated_at?: string | null;
          user: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          post?: number;
          updated_at?: string | null;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'like_post_fkey';
            columns: ['post'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'like_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      message: {
        Row: {
          created_at: string;
          id: number;
          message: string;
          sender: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          message: string;
          sender: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          message?: string;
          sender?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'message_sender_fkey';
            columns: ['sender'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      notification: {
        Row: {
          actor: string;
          comment: number | null;
          created_at: string;
          follow: number | null;
          id: number;
          is_seen: boolean;
          message: number | null;
          post: number | null;
          recipient: string;
          type: string;
          updated_at: string | null;
        };
        Insert: {
          actor: string;
          comment?: number | null;
          created_at?: string;
          follow?: number | null;
          id?: number;
          is_seen?: boolean;
          message?: number | null;
          post?: number | null;
          recipient: string;
          type: string;
          updated_at?: string | null;
        };
        Update: {
          actor?: string;
          comment?: number | null;
          created_at?: string;
          follow?: number | null;
          id?: number;
          is_seen?: boolean;
          message?: number | null;
          post?: number | null;
          recipient?: string;
          type?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_actor_fkey';
            columns: ['actor'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_comment_fkey';
            columns: ['comment'];
            isOneToOne: false;
            referencedRelation: 'comment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_follow_fkey';
            columns: ['follow'];
            isOneToOne: false;
            referencedRelation: 'follow';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_message_fkey';
            columns: ['message'];
            isOneToOne: false;
            referencedRelation: 'message';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_post_fkey';
            columns: ['post'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_recipient_fkey';
            columns: ['recipient'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      post: {
        Row: {
          author: string;
          channel: number;
          content: string | null;
          created_at: string;
          id: number;
          image: string | null;
          image_public_id: string | null;
          is_yn: boolean;
          quiz_data: Json[] | null;
          solved_problem_id: number | null;
          tags: string[] | null;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          author: string;
          channel: number;
          content?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          image_public_id?: string | null;
          is_yn?: boolean;
          quiz_data?: Json[] | null;
          solved_problem_id?: number | null;
          tags?: string[] | null;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          author?: string;
          channel?: number;
          content?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          image_public_id?: string | null;
          is_yn?: boolean;
          quiz_data?: Json[] | null;
          solved_problem_id?: number | null;
          tags?: string[] | null;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_channel_fkey';
            columns: ['channel'];
            isOneToOne: false;
            referencedRelation: 'channel';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          auth_type: string | null;
          cover_image: string | null;
          created_at: string;
          email: string;
          fullname: string | null;
          id: string;
          image: string | null;
          is_banned: boolean;
          is_email_verified: boolean;
          is_online: boolean;
          role: string | null;
          updated_at: string | null;
        };
        Insert: {
          auth_type?: string | null;
          cover_image?: string | null;
          created_at?: string;
          email: string;
          fullname?: string | null;
          id: string;
          image?: string | null;
          is_banned?: boolean;
          is_email_verified?: boolean;
          is_online?: boolean;
          role?: string | null;
          updated_at?: string | null;
        };
        Update: {
          auth_type?: string | null;
          cover_image?: string | null;
          created_at?: string;
          email?: string;
          fullname?: string | null;
          id?: string;
          image?: string | null;
          is_banned?: boolean;
          is_email_verified?: boolean;
          is_online?: boolean;
          role?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
