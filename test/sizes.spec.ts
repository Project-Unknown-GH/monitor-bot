import { areSizesInArr, Size } from "../src/helpers";
import { expect } from "chai";

describe('Sizes in array', () => {
    describe('Returning true', () => {
        describe('One size to match', () => {
            const sizes = ["small"];
            const available: Size[] = [
                {
                    id: 123,
                    size: "Small",
                },
                {
                    id: 125,
                    size: "Medium",
                },
            ];
            it('Should return true', () => {
                expect(areSizesInArr(sizes, available)).to.equal(true);
            });
        });
        describe('Multiple sizes to match', () => {
            const sizes = ["small", "xlarge"];
            const available: Size[] = [
                {
                    id: 123,
                    size: "Small",
                },
                {
                    id: 125,
                    size: "Medium",
                },
                {
                    id: 436,
                    size: "Large",
                }
            ];
            it('Should return true', () => {
                expect(areSizesInArr(sizes, available)).to.equal(true);
            });
        });
    });
    describe('Returning false', () => {
        describe('One size to match', () => {
            const sizes = ["large"];
            const available: Size[] = [
                {
                    id: 123,
                    size: "Small",
                },
                {
                    id: 125,
                    size: "Medium",
                },
            ];
            it('Should return true', () => {
                expect(areSizesInArr(sizes, available)).to.equal(false);
            });
        });
        describe('Multiple sizes to match', () => {
            const sizes = ["xsmall", "xlarge"];
            const available: Size[] = [
                {
                    id: 123,
                    size: "Small",
                },
                {
                    id: 125,
                    size: "Medium",
                },
                {
                    id: 436,
                    size: "Large",
                }
            ];
            it('Should return true', () => {
                expect(areSizesInArr(sizes, available)).to.equal(false);
            });
        });
    });
});
