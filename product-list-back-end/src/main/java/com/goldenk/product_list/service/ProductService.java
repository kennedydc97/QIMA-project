package com.goldenk.product_list.service;
import com.goldenk.product_list.entities.Category;
import com.goldenk.product_list.entities.Product;
import com.goldenk.product_list.repositories.ProductListRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductListRepository productListRepository;

    @Autowired
    private CategoryService categoryService;

    public List<Product> getAllProducts() {
        return productListRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productListRepository.findById(id).orElse(null);
    }

    @Transactional
    public Product saveProduct(Product product) {
        Category category = categoryService.getCategoryById(product.getCategory().getId());
        if(category == null) {
            Category newCategory = categoryService.saveCategory(product.getCategory());
            product.setCategory(newCategory);
            productListRepository.save(product);
            newCategory.getProductList().add(product);
            categoryService.saveCategory(newCategory);
        } else {
            categoryService.updateCategory(product.getCategory());
            productListRepository.save(product);
        }
        return productListRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productListRepository.deleteById(id);
    }
}
