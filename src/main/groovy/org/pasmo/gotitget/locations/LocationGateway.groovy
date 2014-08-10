package org.pasmo.gotitget.locations

interface LocationGateway {

    long countBySurvey(String month, String year)
    long countByType(String locationType)
    List<LocationEntity> findAllByType(String locationType)

}
