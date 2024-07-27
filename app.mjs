import express from "express";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

// Créez une variable __filename à partir de l'URL du module
const __filename = fileURLToPath(import.meta.url);
// Créez une variable __dirname à partir de __filename
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const port = 3003;

const logFilePath = path.join(__dirname, "app.log");

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const log = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: duration,
            timestamp: new Date().toISOString(),
            clientIp: req.ip || req.connection.remoteAddress,
            userAgent: req.headers["user-agent"],
            requestBody: req.body,
            queryParams: req.query,
        };
        // Crée le fichier s'il n'existe pas encore et écrit les logs
        fs.appendFileSync(logFilePath, JSON.stringify(log) + "\n");
    });
    next();
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/add", (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) {
        return res.status(400).send("Missing parameters a or b");
    }
    const sum = parseFloat(a) + parseFloat(b);
    res.send(`The sum of ${a} and ${b} is ${sum}`);
});

// Démarrer le serveur
if (import.meta.url === new URL(import.meta.url).href) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;
