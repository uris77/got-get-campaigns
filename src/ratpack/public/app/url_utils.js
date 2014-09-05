( function(ng) {
    function urlUtils($window, $location) {
        return {
            redirectHome: function() {
                        $window.location.href = "http://" + $location.host()  + ":" + $location.port();
            }
        };
    }

    ng.module("url_utils", [])
        .factory("urlUtils", urlUtils);

}(angular));