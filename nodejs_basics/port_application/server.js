const app = require('./src/app');


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(' Failed to connect to the database:', err.message);
        process.exit(1);
    }
};

startServer();
