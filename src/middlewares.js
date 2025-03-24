import { ValidationError } from "yup";

export const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        res.status(400).send(error.message)
    } else {
        console.log("\x1b[31m")
        console.log("name", error.name)
        console.log(JSON.stringify(error, null, 2))
        console.log("\x1b[0m")
        res.sendStatus(500)
    }
}