FROM emilrais/speciale-tool

COPY validation /api/validation
COPY mongo-lookup /api/mongo-lookup
COPY mongo-delete-one /api/mongo-delete-one
COPY response /api/response
COPY beta-api.json /api/beta-api.json

ENTRYPOINT ["node", "/speciale-tool", "/api/beta-api.json"]
