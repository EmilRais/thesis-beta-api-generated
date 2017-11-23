import { All, Any, Array, NotValue, OptionalFields, Size } from "paradise";

export const SalesDoNotRelyOnPaymentOptionRule = (paymentOptionId: string) => {
    return All([
        Array([
            OptionalFields({
                paymentOptions: [
                    Any([
                        Size({ above: 1 }),
                        Array([
                            OptionalFields({ _id: [NotValue([paymentOptionId])]}
                        )])
                    ])
                ]
            })
        ])
    ]);
};
