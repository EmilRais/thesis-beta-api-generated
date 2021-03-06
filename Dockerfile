FROM emilrais/thesis-loom

COPY modules /modules
COPY beta-api-generated/validation /api/validation
COPY beta-api-generated/beta-api.json /api/beta-api.json

COPY beta-api-generated/remove-payment-option.json /api/remove-payment-option.json
COPY beta-api-generated/remove-type.json /api/remove-type.json
COPY beta-api-generated/delete-by-id.json /api/delete-by-id.json
COPY beta-api-generated/all-documents.json /api/all-documents.json

ENTRYPOINT ["node", "/speciale-tool", "/api/beta-api.json"]
