const express = require('express');
const supabase = require('../db/supabaseclient')
const Router = express.Router();

Router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    const { data: userData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle()

    if (error) {
        res.status(500).json({ error : error})
    }
    if (!userData) {
        res.status(400).json({ error : "User doesn't exist, try creating an account!"})
    }
    console.log(userData)
})

module.exports = Router