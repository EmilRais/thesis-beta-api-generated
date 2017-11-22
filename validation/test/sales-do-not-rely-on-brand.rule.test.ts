import * as chai from "chai";
const should = chai.should;

import { SalesDoNotRelyOnBrandRule } from "../source/sales-do-not-rely-on-brand.rule";

describe("SalesDoNotRelyOnBrandRule", () => {

    it("should fail if sales are not an array", () => {
        const sales: any = 42;
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales)
            .then(() => Promise.reject("Expected failure"))
            .catch(error => error.should.deep.equal(['"$" was not an array']));
    });

    it("should fail if individual sales has the specified brand", () => {
        const sales: any = [
            { brand: { _id: "some-other-id" } },
            { brand: { _id: "some-id" } }
        ];
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales)
            .then(() => Promise.reject("Expected failure"))
            .catch(error => error.should.deep.equal(['"$[1].brand._id" was some-id but should not be some-id']));
    });

    it("should succeed if sales are missing", () => {
        const sales: any = null;
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales);
    });

    it("should succeed if individual sales are missing", () => {
        const sales: any = [null];
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales);
    });

    it("should succeed if individual sales are not objects", () => {
        const sales: any = [42];
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales);
    });

    it("should succeed if individual sales are missing brand", () => {
        const sales: any = [{}];
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales);
    });

    it("should succeed if individual sales are missing brand id", () => {
        const sales: any = [{ brand: {} }];
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales);
    });

    it("should succeed if individual sales do not have specified brand", () => {
        const sales: any = [
            { brand: { _id: "some-id-1" } },
            { brand: { _id: "some-id-2" } }
        ];
        return SalesDoNotRelyOnBrandRule("some-id").guard(sales);
    });
});
