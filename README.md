# Product-Management
This is for managing products.

Api Listing ->

1. Adding a product

@PostMapping("/users/{userType}/productList/createProduct")

Signature : public ResponseEntity<Void> createProduct(@PathVariable String userType, @RequestBody Product product){}

2. List of all products

@GetMapping("/users/{userType}/productList/fetch")

Signature : public List<Product> getAllProducts(@PathVariable String userType) {}

3. List of costly products

@GetMapping("/users/{userType}/productList/costlyProducts/{price}")

Signature : public List<Product> getAllProductsBasedOnPrice(@PathVariable String userType, @PathVariable double price) {}

4. List of products not available

@GetMapping("/users/{userType}/productList/notAvailable")

Signature : public List<Product> getAllProductsNotAvailabile(@PathVariable String userType) {}

5. Filtered product list based on category

@GetMapping("/users/{userType}/productList/searchByCategory/{listOfCategory}")

Signature : public List<Product> getAllProductsBasedOnCategory(@PathVariable String userType,	@PathVariable String listOfCategory) {}

6. Updating a product

@PutMapping("/users/{userType}/productList/updateProduct/{productId}")

Signature : public ResponseEntity<Product> updateProduct(@PathVariable String userType, @PathVariable long productId,	@RequestBody Product product) {}

7. Deleting a product

@DeleteMapping("/users/{userType}/productList/deleteProduct/{productId}")

Signature : public ResponseEntity<Void> deleteProduct(@PathVariable String userType, @PathVariable long productId) {}



