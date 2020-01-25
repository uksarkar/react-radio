exports.sortStations = (data) => {
    let stations = data;
    stations.sort(function (a, b) {
        if (a.rating < b.rating) {
            return 1;
        }
        if (a.rating > b.rating) {
            return -1;
        }
        return 0;
    });
    return stations;
}