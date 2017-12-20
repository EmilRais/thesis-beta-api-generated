import { RequestHandler } from "express";
import { Rule } from "paradise";

import { SalesDoNotRelyOnBrandRule } from "./sales-do-not-rely-on-brand.rule";
import { SalesDoNotRelyOnPaymentOptionRule } from "./sales-do-not-rely-on-payment-option.rule";
import { SalesDoNotRelyOnTypeRule } from "./sales-do-not-rely-on-type.rule";

export interface Operation {
    module: string;
    schema: "sales-don't-rely-on-brand" | "sales-don't-rely-on-payment-option" | "sales-don't-rely-on-type";
}

const brandHandler: RequestHandler = (request, response, next) => {
    SalesDoNotRelyOnBrandRule(request.params.id).guard(response.locals.boards)
        .then(() => next())
        .catch(error => response.status(400).end("Brand er i brug hos et udsalg og kan ikke slettes"));
};

const paymentOptionHandler: RequestHandler = (request, response, next) => {
    SalesDoNotRelyOnPaymentOptionRule(request.params.id).guard(response.locals.boards)
        .then(() => next())
        .catch(error => response.status(400).end("Betalingsmulighed er i brug hos et udsalg og kan ikke slettes"));
};

const typeHandler: RequestHandler = (request, response, next) => {
    SalesDoNotRelyOnTypeRule(request.params.id).guard(response.locals.boards)
        .then(() => next())
        .catch(error => response.status(400).end("Type er i brug hos et udsalg og kan ikke slettes"));
};

export const prepareOperation = (operation: Operation) => {
    if ( !operation.schema ) return Promise.reject("validation expected a schema");

    switch ( operation.schema ) {
        case "sales-don't-rely-on-brand": return Promise.resolve(brandHandler);
        case "sales-don't-rely-on-payment-option": return Promise.resolve(paymentOptionHandler);
        case "sales-don't-rely-on-type": return Promise.resolve(typeHandler);
        default: Promise.reject(`validation could not recognise schema "${operation.schema}"`);
    }
};
