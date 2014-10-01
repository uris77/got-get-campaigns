package org.pasmo.locations

import org.pasmo.surveys.outlets.OutletSurvey

interface LocationGateway {

    long countByType(String locationType)
    List<LocationEntity> findAllByType(String locationType)
    List<LocationEntity> findByName(String locationName)
    List<OutletSurvey> findSurveys(String locationId)
    LocationEntity findById(String locationId)
}
