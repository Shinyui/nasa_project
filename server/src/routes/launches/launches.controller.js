const { getAllLaunches, existsLaunchWithId, abortLaunchById, scheduleNewLaunch } = require('../../models/launches.model');
const { getPagination } = require("../../services/query");

const httpGetAllLaunches = async (req, res) => {
    const { skip, limit } = getPagination(req.query);
    console.log(skip, limit);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

const httpAddNewLaunch = async (req, res) => {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }

    launch.launchDate = new Date(launch.launchDate);

    if (launch.launchDate.toString() === "Invalid Date") {
        return res.status(400).json({
            error: "Invalid launch date"
        })
    }

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

const httpAbortLaunch = async (req, res) => {
    const launchId = Number(req.params.id);

    const existsLaunch = await existsLaunchWithId(launchId);

    if (!existsLaunch) {
        return  res.status(404).json({
            error: "Launch not found"
        });
    }

    const aborted = await abortLaunchById(launchId);

    console.log("asddas", aborted);
    
    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted"
        });
    }

    return res.status(200).json({ok: true});
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}