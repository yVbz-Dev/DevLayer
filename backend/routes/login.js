const express = require('express');
const supabase = require('../db/supabaseclient');
const bcrypt = require('bcrypt');
const Router = express.Router();
const JWT = require('jsonwebtoken')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

Router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    const { data: userData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle()

    if (error) {
        return res.status(500).json({ error : error})
    }
    if (!userData) {
        return res.status(400).json({ error : "User doesn't exist, try creating an account!"})
    }
    if (!await bcrypt.compare(password, userData.password)) {
        return res.status(400).json({ error: 'Wrong password'})
    }
    
    try {
        const token = JWT.sign({
            id : userData.id,
            username : username
        }, JWT_SECRET,
            { expiresIn : '30d' }
        )
        return res.status(200).json({
            token : token
        })
    } catch (error) {
        return res.status(500).json({ error : error })
    }
})

module.exports = Router