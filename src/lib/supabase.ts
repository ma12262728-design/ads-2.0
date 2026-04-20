import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fallback to hardcoded defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ppfbgytltcxljiufzgzh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZmJneXRsdGN4bGppdWZ6Z3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1ODI4NDksImV4cCI6MjA5MjE1ODg0OX0.0_wIqeRObWZi57btg9pkdhn7XpPNXSH6AvLTHcD9Jzk';

// Initialize the Supabase client
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn("Supabase Warning: VITE_SUPABASE_URL is missing from environment variables. Using hardcoded fallback. Please set this in AI Studio Secrets.");
}
console.log("Supabase Engine: Connecting to", supabaseUrl);
export { supabaseUrl };
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
