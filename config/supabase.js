// config/supabase.js
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yoxeqvlbtdsxvwanukav.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveGVxdmxidGRzeHZ3YW51a2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MDExODYsImV4cCI6MjA3NTA3NzE4Nn0.JO-8m9gaD7qr0R_RpJY91RkUinF9XBT5js3KjBsLXU8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});