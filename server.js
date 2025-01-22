const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', // Allow only requests from Angular's dev server (localhost:4200)
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'], // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow the Content-Type header
    preflightContinue: false,  // Invia una risposta automatica alla richiesta preflight
    optionsSuccessStatus: 200,  // Status per la risposta OPTIONS
  }));


// Connessione a MongoDB
mongoose
async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connesso a MongoDB con successo!');
    } catch (err) {
      console.error('Errore nella connessione a MongoDB:', err);
    }
  }
  connectDB();

  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });
  
// Configurazione di Swagger
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Gestione Frigo API',
        version: '1.0.0',
        description: 'API per la gestione di prodotti nel frigo',
      },
      basePath: '/',
    },
    apis: ['./routes/*.js'], // Percorso dei file dove Swagger può trovare le rotte e i commenti
  };
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  
  // Usa Swagger UI per esporre la documentazione
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotte
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
