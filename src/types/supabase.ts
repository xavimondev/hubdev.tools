export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.2 (db9da0b)'
  }
  public: {
    Tables: {
      categories: {
        Row: {
          bg_color: string | null
          created_at: string
          description: string | null
          emoji: string | null
          id: number
          isActive: boolean
          name: string
          slug: string | null
        }
        Insert: {
          bg_color?: string | null
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: number
          isActive?: boolean
          name: string
          slug?: string | null
        }
        Update: {
          bg_color?: string | null
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: number
          isActive?: boolean
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      pines: {
        Row: {
          created_at: string
          id: string
          isTop: boolean
          resource_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          isTop?: boolean
          resource_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          isTop?: boolean
          resource_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'pines_resource_id_fkey'
            columns: ['resource_id']
            isOneToOne: false
            referencedRelation: 'resources'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pines_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      preferences: {
        Row: {
          created_at: string
          id: number
          isPinsVisible: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          isPinsVisible?: boolean
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          isPinsVisible?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'preferences_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      requests: {
        Row: {
          created_at: string
          id: string
          isAdded: boolean
          website: string
        }
        Insert: {
          created_at?: string
          id?: string
          isAdded?: boolean
          website: string
        }
        Update: {
          created_at?: string
          id?: string
          isAdded?: boolean
          website?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          brief: string | null
          clicks: number
          created_at: string
          description: string
          embedding: string | null
          id: string
          idCategory: number | null
          image: string
          last_clicked: string
          placeholder: string | null
          slug: string
          summary: string
          title: string
          url: string
        }
        Insert: {
          brief?: string | null
          clicks?: number
          created_at?: string
          description: string
          embedding?: string | null
          id?: string
          idCategory?: number | null
          image: string
          last_clicked?: string
          placeholder?: string | null
          slug: string
          summary: string
          title: string
          url: string
        }
        Update: {
          brief?: string | null
          clicks?: number
          created_at?: string
          description?: string
          embedding?: string | null
          id?: string
          idCategory?: number | null
          image?: string
          last_clicked?: string
          placeholder?: string | null
          slug?: string
          summary?: string
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'resources_idCategory_fkey'
            columns: ['idCategory']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      resources_featured_logs: {
        Row: {
          category: string
          clicks: string
          created_at: string
          end_date: string
          id: number
          resource_id: string
          start_date: string
          title: string
          url: string
        }
        Insert: {
          category: string
          clicks: string
          created_at?: string
          end_date?: string
          id?: number
          resource_id: string
          start_date: string
          title: string
          url: string
        }
        Update: {
          category?: string
          clicks?: string
          created_at?: string
          end_date?: string
          id?: number
          resource_id?: string
          start_date?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string
          created_at: string
          id: string
          name: string
          user_name: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          id: string
          name: string
          user_name: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          id?: string
          name?: string
          user_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_resources: {
        Args: { page_number: number; rows_per_page: number; u_id: string }
        Returns: {
          category: string
          id: string
          image: string
          placeholder: string
          summary: string
          brief: string | null
          title: string
          url: string
        }[]
      }
      get_user_resources_by_slug: {
        Args: {
          cat_slug: string
          page_number: number
          rows_per_page: number
          u_id: string
        }
        Returns: {
          category: string
          id: string
          image: string
          placeholder: string
          summary: string
          brief: string | null
          title: string
          url: string
        }[]
      }
      increment_clicks: { Args: { resource_id: string }; Returns: undefined }
      query_embeddings: {
        Args: { embed: string; match_count: number; match_threshold: number }
        Returns: {
          category: string
          id: string
          image: string
          placeholder: string
          summary: string
          brief: string | null
          title: string
          url: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {}
  }
} as const
