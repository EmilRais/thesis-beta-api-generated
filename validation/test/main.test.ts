import * as chai from "chai";
const should = chai.should();

import { RequestHandler } from "express";
import * as express from "express";
import { Server } from "http";
import * as agent from "superagent";

import { AbstractOperation, prepareOperation } from "../source/main";

describe("operation", () => {

    it("should reject with 400 if sales contain brand", () => {
        const sales = [
            { name: "some-name", brand: { _id: "some-brand" } }
        ];
        const abstractOperation: AbstractOperation = { module: "validation", schema: "sales-don't-rely-on-brand" };
        return prepareOperation(abstractOperation)
            .then(operation => {
                return new Promise((resolve, reject) => {
                    express()
                        .use(updateBoards(sales))
                        .use("/:id", operation)
                        .use(success())
                        .listen(3030, function() {
                            const runningServer: Server = this;
                            agent.post("localhost:3030/some-brand")
                                .catch(error => error.response)
                                .then(response => {
                                    runningServer.close();

                                    response.status.should.equal(400);
                                    response.text.should.equal("Brand er i brug hos et udsalg og kan ikke slettes");
                                    resolve();
                                })
                                .catch(reject);
                        });
                });
            });
    });

    it("should continue to next operation if sales do not contain brand", () => {
        const sales = [
            { name: "some-name", brand: { _id: "some-other-brand" } }
        ];
        const abstractOperation: AbstractOperation = { module: "validation", schema: "sales-don't-rely-on-brand" };
        return prepareOperation(abstractOperation)
            .then(operation => {
                return new Promise((resolve, reject) => {
                    express()
                        .use(updateBoards(sales))
                        .use("/:id", operation)
                        .use(success())
                        .listen(3030, function() {
                            const runningServer: Server = this;
                            agent.post("localhost:3030/some-brand")
                                .catch(error => error.response)
                                .then(response => {
                                    runningServer.close();
                                    response.status.should.equal(200);
                                    resolve();
                                })
                                .catch(reject);
                        });
                });
            });
    });

    it("should reject with 400 if sales depend on payment option", () => {
        const sales = [
            { name: "some-name", paymentOptions: [{ _id: "some-payment-option" }] }
        ];
        const abstractOperation: AbstractOperation = { module: "validation", schema: "sales-don't-rely-on-payment-option" };
        return prepareOperation(abstractOperation)
            .then(operation => {
                return new Promise((resolve, reject) => {
                    express()
                        .use(updateBoards(sales))
                        .use("/:id", operation)
                        .use(success())
                        .listen(3030, function() {
                            const runningServer: Server = this;
                            agent.post("localhost:3030/some-payment-option")
                                .catch(error => error.response)
                                .then(response => {
                                    runningServer.close();

                                    response.status.should.equal(400);
                                    response.text.should.equal("Betalingsmulighed er i brug hos et udsalg og kan ikke slettes");
                                    resolve();
                                })
                                .catch(reject);
                        });
                });
            });
    });

    it("should continue to next operation if sales do not depend on payment option", () => {
        const sales = [
            { name: "some-name", paymentOptions: [{ _id: "some-other-payment-option" }] }
        ];
        const abstractOperation: AbstractOperation = { module: "validation", schema: "sales-don't-rely-on-payment-option" };
        return prepareOperation(abstractOperation)
            .then(operation => {
                return new Promise((resolve, reject) => {
                    express()
                        .use(updateBoards(sales))
                        .use("/:id", operation)
                        .use(success())
                        .listen(3030, function() {
                            const runningServer: Server = this;
                            agent.post("localhost:3030/some-payment-option")
                                .catch(error => error.response)
                                .then(response => {
                                    runningServer.close();
                                    response.status.should.equal(200);
                                    resolve();
                                })
                                .catch(reject);
                        });
                });
            });
    });
});

const updateBoards: (boards: any) => RequestHandler = (boards) => {
    return (request, response, next) => {
        response.locals.boards = boards;
        next();
    };
};

const success: () => RequestHandler = () => {
    return (request, response, next) => {
        response.status(200).end();
    };
};
