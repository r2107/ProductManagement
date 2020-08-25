# Product-Management
This is for managing products.

Api Listing ->

1. User Sign-up
@PostMapping(“/auth/signup”)
Signature => public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {}

2. User Sign-in
@PostMapping(“/auth/signin”)
Signature => public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {}

3. Adding a Product
@PostMapping("/users/productList/createProduct")
Signature => public Product createProduct(@RequestBody Product product){}

4. List of All Products
@GetMapping("/users/productList/fetch")
Signature => public List<Product> getAllProducts(){}
  
5. List of Costly Products
@GetMapping("/users/productList/costlyProducts/{price}")
Signature => publicList<Product> getAllProductsCostlierThanGivenPrice(@ PathVariable double price) {}
  
6. List of products Not Available
@GetMapping("/users/productList/notAvailable")
Signature : public List<Product> getAllProductsNotAvailabile() {}
  
7. Search By Title(Word)
@GetMapping("/users/productList/searchByTitle/{title}")
Signature => public List<Product> getAllProductsBasedOnWord (@PathVariable String title) {}
  
8. Updating a Product
@PutMapping("/users/productList/updateProduct")
Signature => public Product updateProduct(@RequestBody Product product) {}

9. Deleting a Product
@DeleteMapping("/users/productList/deleteProduct/{productId}")
Signature => public void deleteProduct(@PathVariable String productId) {}

10. Sort By Price
@GetMapping("/users/productList/sortByPrice")
Signature => public List<Product> getAllProductsSorted() {}



