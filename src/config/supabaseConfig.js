import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ' https://yljhhtgzlmmqldhdbgjq.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsamhodGd6bG1tcWxkaGRiZ2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTAwMzIsImV4cCI6MjA0ODM2NjAzMn0.tmfFXvoR0ppwcBj-bVmZq0sgOq4vpCE7owNdyjAXmYc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);








// url  =====     https://yljhhtgzlmmqldhdbgjq.supabase.co

//anon ======  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsamhodGd6bG1tcWxkaGRiZ2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTAwMzIsImV4cCI6MjA0ODM2NjAzMn0.tmfFXvoR0ppwcBj-bVmZq0sgOq4vpCE7owNdyjAXmYc
