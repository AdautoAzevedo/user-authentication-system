const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const allowCredentials = require('./middleware/allowCredentials');

const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(allowCredentials);
app.use(cors(corsOptions));


app.use('/', require('./routes/root'));
app.use('/register', require('./routes/root'));
app.use('/api', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout'));

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));

