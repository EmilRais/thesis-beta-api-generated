import * as chai from "chai";
const should = chai.should;

import { SalesDoNotRelyOnPaymentOptionRule } from "../source/sales-do-not-rely-on-payment-option.rule";

describe("SalesDoNotRelyOnPaymentOptionRule", () => {

    it("should fail if sales are not an array", () => {
        const sales: any = 42;
        return SalesDoNotRelyOnPaymentOptionRule("some-id").guard(sales)
            .then(() => Promise.reject("Expected failure"))
            .catch(error => error.should.deep.equal(['"$" was not an array']));
    });

    it("should fail if individual sales depend on payment option", () => {
        const sales: any = [{ paymentOptions: [{ _id: "some-id" }] }];
        return SalesDoNotRelyOnPaymentOptionRule("some-id").guard(sales)
            .then(() => Promise.reject("Expected failure"))
            .catch(error => error.should.deep.equal([
                '"$[0].paymentOptions" contained 1 elements but should contain more than 1',
                '"$[0].paymentOptions[0]._id" was some-id but should not be some-id'
            ]));
    });

    it("should succeed if individual sales do not contain payment options", () => {
        const sales: any = [{}];
        return SalesDoNotRelyOnPaymentOptionRule("some-id").guard(sales);
    });

    it("should succeed if individual payment options do not contain payment option id", () => {
        const sales: any = [{ paymentOptions: ["some-id"] }];
        return SalesDoNotRelyOnPaymentOptionRule("some-id").guard(sales);
    });

    it("should succeed if individual sales contain more than 1 payment option", () => {
        const sales: any = [{ paymentOptions: [{ _id: "some-id" }, { _id: "some-other-id" }] }];
        return SalesDoNotRelyOnPaymentOptionRule("some-id").guard(sales);
    });

    it("should succeed if individual sales do not depend on payment option", () => {
        const sales: any = [{ paymentOptions: [{ _id: "some-other-id" }] }];
        return SalesDoNotRelyOnPaymentOptionRule("some-id").guard(sales);
    });

});
