export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      waitlist_signups: {
        Row: {
          confirmation_email_id: string | null;
          confirmation_sent_at: string | null;
          consented_at: string;
          created_at: string;
          email: string;
          id: string;
          marketing_consent: boolean;
          role: string;
          source: string;
        };
        Insert: {
          confirmation_email_id?: string | null;
          confirmation_sent_at?: string | null;
          consented_at?: string;
          created_at?: string;
          email: string;
          id?: string;
          marketing_consent: boolean;
          role?: string;
          source?: string;
        };
        Update: {
          confirmation_email_id?: string | null;
          confirmation_sent_at?: string | null;
          consented_at?: string;
          created_at?: string;
          email?: string;
          id?: string;
          marketing_consent?: boolean;
          role?: string;
          source?: string;
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
