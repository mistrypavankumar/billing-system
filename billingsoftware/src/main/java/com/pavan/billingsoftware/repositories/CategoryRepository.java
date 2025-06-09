package com.pavan.billingsoftware.repositories;

import com.pavan.billingsoftware.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByCategoryId(String categoryId);

    Category findByName(String name);
}
