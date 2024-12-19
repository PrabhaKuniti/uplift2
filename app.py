from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)  # Enable CORS for cross-origin requests

# Mock Product Database
MOCK_PRODUCTS = [
    {"id": 1, "name": "Wireless Mouse", "category": "Electronics", "price": 25.99, "stock": 50},
    {"id": 2, "name": "Gaming Keyboard", "category": "Electronics", "price": 49.99, "stock": 30},
    {"id": 3, "name": "Bluetooth Speaker", "category": "Electronics", "price": 19.99, "stock": 20},
    {"id": 4, "name": "Smartphone Case", "category": "Accessories", "price": 9.99, "stock": 100},
    {"id": 5, "name": "USB-C Charger", "category": "Accessories", "price": 14.99, "stock": 75},
]

# API Resource: Search Products
class SearchProducts(Resource):
    def get(self):
        query = request.args.get('query', '').lower()
        filtered_products = [product for product in MOCK_PRODUCTS if query in product["name"].lower()]
        return jsonify(filtered_products)

# API Resource: Product Details
class ProductDetails(Resource):
    def get(self, product_id):
        product = next((p for p in MOCK_PRODUCTS if p["id"] == product_id), None)
        if product:
            return jsonify(product)
        return jsonify({"error": "Product not found"}), 404

# API Resource: Purchase Product
class PurchaseProduct(Resource):
    def post(self, product_id):
        product = next((p for p in MOCK_PRODUCTS if p["id"] == product_id), None)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        if product["stock"] > 0:
            product["stock"] -= 1
            return jsonify({"message": f"Purchase successful for {product['name']}. Remaining stock: {product['stock']}"})
        else:
            return jsonify({"error": "Out of stock"}), 400

# Add API Routes
api.add_resource(SearchProducts, '/api/products/search')
api.add_resource(ProductDetails, '/api/products/<int:product_id>')
api.add_resource(PurchaseProduct, '/api/products/<int:product_id>/purchase')

# Run the App
if __name__ == '__main__':
    app.run(debug=True)
