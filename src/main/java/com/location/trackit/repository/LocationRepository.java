package com.location.trackit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.location.trackit.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, String> {
	public Location findByUserId(String userId);
	
	public List<Location> findByUserIdIn(List<String> userId);
}
