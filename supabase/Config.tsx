import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://uvvamqhjydbtzqtbcsik.supabase.co',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dmFtcWhqeWRidHpxdGJjc2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTg3NjMsImV4cCI6MjA2NzA3NDc2M30._URQcFbBRS6O017FH_RkNhhw-Xr2d2xIdPD5nBfR6yE'
    )