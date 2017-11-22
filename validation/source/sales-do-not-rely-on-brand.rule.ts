import { All, Array, NotValue, OptionalFields } from "paradise";

export const SalesDoNotRelyOnBrandRule = (brandId: string) => {
    return All([
        Array([
            OptionalFields({
                brand: [OptionalFields({
                    _id: [NotValue([brandId])]
                })]
            })
        ])
    ]);
};
