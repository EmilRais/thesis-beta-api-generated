import { All, Array, Boolean, MandatoryFields, NotValue, Number, Object, Required, Size, String } from "paradise";

export const SalesDoNotRelyOnBrandRule = (brandId: string) => {
    return All([
        Required(),
        Array([
            Required(),
            Object(),
            MandatoryFields({
                brand: [Required(), NotValue([brandId])]
            })
        ])
    ]);
};
