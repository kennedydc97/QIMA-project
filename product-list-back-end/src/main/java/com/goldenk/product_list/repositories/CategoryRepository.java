package com.goldenk.product_list.repositories;

import com.goldenk.product_list.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category, Long> {

}
