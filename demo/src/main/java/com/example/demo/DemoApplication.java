package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        String sql = "INSERT INTO \"user\" (name, email) VALUES ('alpbaba', 'nam@codejava.net')";
//        String sql1 = "SELECT name FROM \"user\" WHERE user_id = 1;\n";
//        int rows = jdbcTemplate.update(sql);
//        if (rows > 0) {
//            System.out.println("A new row has been inserted.");
//        }
//        String name = jdbcTemplate.queryForObject(sql1, String.class);
//        System.out.println("Name: " + name);
    }

}