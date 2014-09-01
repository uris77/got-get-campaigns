package org.pasmo.locations

interface LocationGateway {

    long countByType(String locationType)
    List<LocationEntity> findAllByType(String locationType)
    List<LocationSurvey> findSurveys(String locationId)
}
