FROM emilrais/speciale-tool

COPY validation /api/validation
COPY mongo-lookup /api/mongo-lookup
COPY mongo-update /api/mongo-update
COPY mongo-delete-one /api/mongo-delete-one
COPY response /api/response
COPY beta-api.json /api/beta-api.json

COPY remove-payment-option.json /api/remove-payment-option.json
COPY remove-type.json /api/remove-type.json

ENTRYPOINT ["node", "/speciale-tool", "/api/beta-api.json"]
