const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use(express.static(path.join(__dirname,'/public')));    //This serve the static files that, in this case, the html file will use

app.use('/', require('./routes/root'));
app.use('/api', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));

