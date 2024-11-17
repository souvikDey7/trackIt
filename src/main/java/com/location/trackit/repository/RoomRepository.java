package com.location.trackit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.location.trackit.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room,String>{

}
