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
          created_at: string
          description: string | null
          id: number
          isActive: boolean
          name: string
          slug: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          isActive?: boolean
          name: string
          slug?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          isActive?: boolean
          name?: string
          slug?: string | null
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
