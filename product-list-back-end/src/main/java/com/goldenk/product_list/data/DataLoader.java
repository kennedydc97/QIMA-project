package com.goldenk.product_list.data;

import com.goldenk.product_list.entities.Category;
import com.goldenk.product_list.entities.Product;
import com.goldenk.product_list.entities.Role;
import com.goldenk.product_list.entities.User;
import com.goldenk.product_list.repositories.RoleRepository;
import com.goldenk.product_list.repositories.UserRepository;
import com.goldenk.product_list.service.CategoryService;
import com.goldenk.product_list.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @Override
    public void run(String... args) throws Exception {
        Role adminRole = new Role();
        adminRole.setName("ROLE_ADMIN");
        roleRepository.save(adminRole);

        Role userRole = new Role();
        userRole.setName("ROLE_USER");
        roleRepository.save(userRole);

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setEnabled(true);
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        admin.setRoles(adminRoles);
        userRepository.save(admin);

        User user = new User();
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("user"));
        user.setEnabled(true);
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRoles(userRoles);
        userRepository.save(user);

        createInitialProductsAndCategories();
    }

    private void createInitialProductsAndCategories() {
        Category beerCategory = new Category("Beer");
        Category snackCategory = new Category("Snack");
        categoryService.saveCategory(beerCategory);
        categoryService.saveCategory(snackCategory);

        Product product1 = new Product();
        product1.setName("Heineken");
        product1.setDescription("Beer 330ml");
        product1.setPrice(12.99);
        product1.setCategory(beerCategory);
        product1.setAvailable(true);

        Product product2 = new Product();
        product2.setName("Pepsi");
        product2.setDescription("Soft drink 355ml");
        product2.setPrice(1.99);
        product2.setCategory(new Category("Soft Drink"));
        product2.setAvailable(true);

        Product product3 = new Product();
        product3.setName("Lay's Chips");
        product3.setDescription("Potato chips 200g");
        product3.setPrice(3.99);
        product3.setCategory(snackCategory);
        product3.setAvailable(true);

        productService.saveProduct(product1);
        productService.saveProduct(product2);
        productService.saveProduct(product3);
    }
}
