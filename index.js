console.clear();
import app from "./src/app.js";
import { PORT } from "./src/config.js";
import { connectToDataBase } from "./src/connection.js";

await connectToDataBase();
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
});