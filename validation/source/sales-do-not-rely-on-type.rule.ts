import { All, Any, Array, NotValue, OptionalFields, Size } from "paradise";

export const SalesDoNotRelyOnTypeRule = (typeId: string) => {
    return All([
        Array([
            OptionalFields({
                types: [
                    Any([
                        Size({ above: 1 }),
                        Array([
                            OptionalFields({ _id: [NotValue([typeId])]}
                        )])
                    ])
                ]
            })
        ])
    ]);
};
