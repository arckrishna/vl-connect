import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mkoveyrsioxvcnffzgok.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_xXPgsUxvvKHRZ_Uhpvw3mA_O3qy9ZIO";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type SupabaseProject = {
  id?: string;
  group_number: number;
  original_group?: string;
  title: string;
  students: string[];
  virtual_lab?: string;
  feasibility?: string;
  architecture?: string;
  report?: string;
  created_at?: string;
  updated_at?: string;
};
