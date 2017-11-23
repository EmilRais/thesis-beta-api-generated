import { RequestHandler } from "express";
import { Rule } from "paradise";

import { SalesDoNotRelyOnBrandRule } from "./sales-do-not-rely-on-brand.rule";
import { SalesDoNotRelyOnPaymentOptionRule } from "./sales-do-not-rely-on-payment-option.rule";

export interface AbstractOperation {
    module: string;
    schema: Schema;
}

type Schema = "sales-don't-rely-on-brand" | "sales-don't-rely-on-payment-option";

function selectStrategy(schema: Schema): RequestHandler {
    return (request, response, next) => {
        switch ( schema ) {

            case "sales-don't-rely-on-brand":
                return SalesDoNotRelyOnBrandRule(request.params.id).guard(response.locals.boards)
                    .then(() => next())
                    .catch(error => response.status(400).end("Brand er i brug hos et udsalg og kan ikke slettes"));

            case "sales-don't-rely-on-payment-option":
                return SalesDoNotRelyOnPaymentOptionRule(request.params.id).guard(response.locals.boards)
                    .then(() => next())
                    .catch(error => response.status(400).end("Betalingsmulighed er i brug hos et udsalg og kan ikke slettes"));

            default: throw new Error(`validation could not recognise schema "${schema}"`);
        }
    };
}

export const prepareOperation = (abstractOperation: AbstractOperation) => {
    if ( !abstractOperation.schema ) return Promise.reject("validation expected a schema");
    const strategy = selectStrategy(abstractOperation.schema);

    const concreteOperation: RequestHandler = (request, response, next) => {
        strategy(request, response, next);
    };

    return Promise.resolve(concreteOperation);
};
