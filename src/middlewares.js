

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        res.status(400).send(error.message);
    } else if (error.name === "NotFound") {
        res.status(404).send(error.message);
    } else if (error.name === "Forbiden") {
        res.status(401).send(error.message);
    } else {
        console.log("name", error.name);
        console.log(JSON.stringify(error, null, 2));
        console.log(error);
        res.sendStatus(500);
    }
};