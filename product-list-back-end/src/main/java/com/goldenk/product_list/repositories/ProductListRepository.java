package com.goldenk.product_list.repositories;

import com.goldenk.product_list.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductListRepository extends JpaRepository<Product, Long> {

}
