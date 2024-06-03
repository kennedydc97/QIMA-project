package com.goldenk.product_list.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goldenk.product_list.entities.Product;
import com.goldenk.product_list.service.CategoryService;
import com.goldenk.product_list.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/products")
public class ProductListController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("/test")
    public ResponseEntity<?> getServerStatus() {
        return new ResponseEntity<>("the server is online", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        List<Product> allProducts = new ArrayList<>();
        allProducts = productService.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Product product) throws JsonProcessingException {
        Product productToSave = objectMapper.readValue(objectMapper.writeValueAsString(product), Product.class);;
        productToSave = productService.saveProduct(productToSave);

        return new ResponseEntity<>(productToSave, HttpStatus.CREATED);
    }

    @PostMapping("/save-all")
    public ResponseEntity<?> createFromAList(@RequestBody List<Product> products) throws JsonProcessingException {
        List<Product> productsSaved = new ArrayList<>();
        for(Product product : products) {
//            Product productToSave = objectMapper.readValue(objectMapper.writeValueAsString(product), Product.class);
            productsSaved.add(productService.saveProduct(product));
        }

        return new ResponseEntity<>(productsSaved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Product product,
                         @PathVariable Long id) throws JsonProcessingException {
        Product productToUpdate = productService.getProductById(id);
        if(productToUpdate != null) {
            productToUpdate = product;
            productService.saveProduct(productToUpdate);
        }
        return new ResponseEntity<>(productToUpdate, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
