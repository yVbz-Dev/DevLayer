const { createClient } = require('@supabase/supabase-js')
require('dotenv').config();

const DB_URL = process.env.DB_URL
const DB_API_KEY = process.env.API_KEY

const supabase = createClient(DB_URL, DB_API_KEY)

module.exports = supabase