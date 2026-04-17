const express = require('express')
const supabase = require('../db/supabaseclient');
const bcrypt = require('bcrypt');
const Router = express.Router();

Router.post('/', async (req, res) => {
    const  { username, password } = req.body;
    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle()

    // checks
    if (error) {
        return res.status(500).json({ error : error.message })
    }
    if (data) {
        return res.status(400).json({ error: 'User already exists' })
    }
    if (username.length < 4 || username.length > 30) {
        return res.status(400).json({ error : 'User name must be between 4 and 30 characters!' })
    }
    if (password.length < 6 || password.length > 50) {
        return res.status(400).json({ error: 'Password must be between 4 and 50 characters!' })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // save to db
    const { userData, userError } = await supabase
        .from('profiles')
        .insert([{
            username : username,
            password : hashedPassword
        }])
        .select();
    if (userError) {
        return res.status(500).json({ error : userError.message })
    }

    // sucess (yay :D)
    return res.status(200).json({ message: 'sucess!'})
})

module.exports = Router