
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://mgfumnmbermfrjqefbcm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZnVtbm1iZXJtZnJqcWVmYmNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTA5NDAsImV4cCI6MjA4MjQ4Njk0MH0.VqpIc_XPpHQwf5rHFcVS98AE6eztc_L_u7Te472FJoc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Data Access Layer
 * These functions interact with the 'event' table.
 */

export async function fetchAllEvents() {
  try {
    // Select all columns to be safe and avoid "column does not exist" errors
    const { data, error } = await supabase
      .from('event')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase fetch error details:', error);
      throw new Error(error.message || 'Unknown database error');
    }
    return data || [];
  } catch (err: any) {
    console.error('fetchAllEvents caught error:', err.message);
    throw err;
  }
}

export async function createNewEvent(payload: any) {
  try {
    const { data, error } = await supabase
      .from('event')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase insert error details:', error);
      throw new Error(error.message);
    }
    return data;
  } catch (err: any) {
    console.error('createNewEvent caught error:', err.message);
    throw err;
  }
}

export async function updateEvent(id: string, payload: any) {
  try {
    const { data, error } = await supabase
      .from('event')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase update error details:', error);
      throw new Error(error.message);
    }
    return data;
  } catch (err: any) {
    console.error('updateEvent caught error:', err.message);
    throw err;
  }
}

export async function deleteEventFromDb(id: string) {
  try {
    const { error } = await supabase
      .from('event')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error details:', error);
      throw new Error(error.message);
    }
  } catch (err: any) {
    console.error('deleteEventFromDb caught error:', err.message);
    throw err;
  }
}
