package com.goldenk.product_list.service;
import com.goldenk.product_list.entities.Category;
import com.goldenk.product_list.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        if(id == null)
            return null;
        return categoryRepository.findById(id).orElse(null);
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public void updateCategory(Category category) {
        Category categoryToUpdate = getCategoryById(category.getId());
        categoryToUpdate.setDescription(category.getDescription());
        saveCategory(categoryToUpdate);
    }
}
