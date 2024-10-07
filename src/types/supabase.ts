export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          resource_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resource_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resource_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pines_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pines_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          created_at: string
          email: string | null
          id: string
          isAdded: boolean
          website: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          isAdded?: boolean
          website: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          isAdded?: boolean
          website?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
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
            foreignKeyName: "resources_idCategory_fkey"
            columns: ["idCategory"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
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
      get_user_pines: {
        Args: Record<PropertyKey, never>
        Returns: {
          resource_id: string
          resource: string
          url: string
          image: string
          summary: string
          placeholder: string
          clicks: number
          category: string
          category_color: string
        }[]
      }
      get_user_resources: {
        Args: {
          rows_per_page: number
          page_number: number
          u_id: string
        }
        Returns: {
          id: string
          title: string
          url: string
          image: string
          summary: string
          placeholder: string
          category: string
        }[]
      }
      get_user_resources_by_slug: {
        Args: {
          rows_per_page: number
          page_number: number
          cat_slug: string
          u_id: string
        }
        Returns: {
          id: string
          title: string
          url: string
          image: string
          summary: string
          placeholder: string
          category: string
        }[]
      }
      increment_clicks: {
        Args: {
          resource_id: string
        }
        Returns: undefined
      }
      query_embeddings: {
        Args: {
          embed: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          title: string
          url: string
          summary: string
          image: string
          category: string
          placeholder: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
