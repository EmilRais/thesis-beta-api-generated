FROM emilrais/speciale-tool

COPY validation /api/validation
COPY mongo-lookup /api/mongo-lookup
COPY response /api/response
COPY beta-api.json /api/beta-api.json

ENTRYPOINT ["node", "/speciale-tool", "/api/beta-api.json"]
