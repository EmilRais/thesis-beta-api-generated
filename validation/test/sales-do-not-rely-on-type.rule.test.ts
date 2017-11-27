import * as chai from "chai";
const should = chai.should;

import { SalesDoNotRelyOnTypeRule } from "../source/sales-do-not-rely-on-type.rule";

describe("SalesDoNotRelyOnTypeRule", () => {

    it("should fail if sales are not an array", () => {
        const sales: any = 42;
        return SalesDoNotRelyOnTypeRule("some-id").guard(sales)
            .then(() => Promise.reject("Expected failure"))
            .catch(error => error.should.deep.equal(['"$" was not an array']));
    });

    it("should fail if individual sales depend on type", () => {
        const sales: any = [{ types: [{ _id: "some-id" }] }];
        return SalesDoNotRelyOnTypeRule("some-id").guard(sales)
            .then(() => Promise.reject("Expected failure"))
            .catch(error => error.should.deep.equal([
                '"$[0].types" contained 1 elements but should contain more than 1',
                '"$[0].types[0]._id" was some-id but should not be some-id'
            ]));
    });

    it("should succeed if individual sales do not contain types", () => {
        const sales: any = [{}];
        return SalesDoNotRelyOnTypeRule("some-id").guard(sales);
    });

    it("should succeed if individual types do not contain type id", () => {
        const sales: any = [{ types: ["some-id"] }];
        return SalesDoNotRelyOnTypeRule("some-id").guard(sales);
    });

    it("should succeed if individual sales contain more than 1 type", () => {
        const sales: any = [{ types: [{ _id: "some-id" }, { _id: "some-other-id" }] }];
        return SalesDoNotRelyOnTypeRule("some-id").guard(sales);
    });

    it("should succeed if individual sales do not depend on type", () => {
        const sales: any = [{ types: [{ _id: "some-other-id" }] }];
        return SalesDoNotRelyOnTypeRule("some-id").guard(sales);
    });

});
