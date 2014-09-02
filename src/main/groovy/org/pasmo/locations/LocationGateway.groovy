package org.pasmo.locations

interface LocationGateway {

    long countByType(String locationType)
    List<LocationEntity> findAllByType(String locationType)
    List<LocationEntity> findByName(String locationName)
    List<LocationSurvey> findSurveys(String locationId)
    LocationEntity findById(String locationId)
}
