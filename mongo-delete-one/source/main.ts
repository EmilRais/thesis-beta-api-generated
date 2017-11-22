import { RequestHandler } from "express";
import { MongoClient } from "mongodb";

export interface AbstractOperation {
    module: string;
    host?: string;
}

export const prepareOperation = (abstractOperation: AbstractOperation) => {
    const host = abstractOperation.host || "mongo";

    return MongoClient.connect(`mongodb://${host}:27017/database`)
        .then(database => {

            const concreteOperation: RequestHandler = (request, response, next) => {
                const selector = { _id: request.params.id };
                database.collection("Brands").remove(selector)
                    .then(status => {
                        if ( status.result.n === 0 )
                            return response.status(400).end("Kunne ikke slette brand");

                        next();
                    })
                    .catch(next);
            };

            (concreteOperation as any).database = database;

            return concreteOperation;
        });
};
