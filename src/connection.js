import { Sequelize } from "sequelize";
import { URI } from "./config.js";
import { SequelizeStorage, Umzug } from "umzug";

export const sequelize = new Sequelize(URI);

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
            glob: "src/migrations/*.cjs"
        },
        storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
        context: sequelize.getQueryInterface(),
        logger: console
    });
    const migration = await migrator.up();
    console.log("Migrations are up to date", {
        files: migration.map((e) => (e.name))
    });
};

export const connectToDataBase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log("Connection to database successful");
    } catch (error) {
        console.log(error);
        throw Error("Error while connecting to database");
    }
};