module.exports = {
    db: {
        host: process.env.REACT_APP_HOST,
        user: process.env.REACT_APP_USER,
        password: process.env.REACT_APP_PASSWORD,
        database: process.env.REACT_APP_DATABASE
    },
    email: {
        host: process.env.REACT_APP_HOST,
        port: 465,
        secure: true,
        user: process.env.REACT_APP_EMAILUSER,
        pass: process.env.REACT_APP_EMAILPASSWORD
    }
}; 