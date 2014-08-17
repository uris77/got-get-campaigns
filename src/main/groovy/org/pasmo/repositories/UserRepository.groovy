package org.pasmo.repositories

import org.pasmo.repositories.entities.UserEntity

public interface UserRepository {

    UserEntity create(String json)
    UserEntity findByEmail(String email)
    List<UserEntity> findAll()
    UserEntity findById(String id)
    UserEntity update(String id, Map params)
    void remove(String id)

}