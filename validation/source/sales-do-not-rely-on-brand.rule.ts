import { All, Array, NotValue, OptionalFields } from "paradise";

export const SalesDoNotRelyOnBrandRule = (brandId: string) => {
    return All([
        Array([
            OptionalFields({
                brand: [NotValue([brandId])]
            })
        ])
    ]);
};
