const { db } = require("../helpers/admin.js");
const { sortStations } = require("../util/methods");

/**
 * Get all of the stations
 */
exports.getAllStations = (req, res) => {
    db.collection("stations").get().then(data => {
        let stations = [];
        data.forEach(doc => {
            stations.push({ ...doc.data(), playing: false });
        });
        let responseStation = sortStations(stations);
        return res.json(responseStation);
    }).catch(err => {
        console.error(err);
        return res.json({ error: "Something wrong." });
    });
}

exports.storeStation = (req, res) => {
    db.doc(`/stations/${req.body.path}`).create(req.body)
        .then(() => res.json({ massage: "Successfully stored." }))
        .catch(err => res.json(err));
}

exports.addViews = (req, res) => {
    let ref = db.doc(`/matadata/views`);
    let counts;
    ref.get().then(doc => {
        counts = doc.data().counts + 1;
        return ref.set({ counts });
    }).then(() => {
        return res.json(counts);
    }).catch(err => res.json({ error: err.code }));
}