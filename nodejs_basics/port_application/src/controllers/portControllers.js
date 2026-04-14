const portsData = require('../data/ports.data')

const getAllPortData = (req, res) => {
    res.status(200).json({
        success: true,
        message: "All port data fetched successfully",
        data: portsData
    })
}

const getPortDataById = (req, res) => {
    const { id } = req.params;
    const port = portsData.find(port => port.unlocode === id);
    if (!port) {
        return res.status(404).json({
            success: false,
            message: "Port not found",
            data: null
        })
    }
    res.status(200).json({
        success: true,
        message: "Port data fetched successfully",
        data: port
    })
}

const deletePortDataById = (req, res) => {
    const { id } = req.params;
    const port = portsData.find(port => port.unlocode === id);
    if (!port) {
        return res.status(404).json({
            success: false,
            message: "Port not found",
            data: null
        })
    }
    portsData.splice(portsData.indexOf(port), 1);
    res.status(200).json({
        success: true,
        message: "Port data deleted successfully",
        data: port
    })
}

const createPortData = (req, res) => {
    const { unlocode, country, name, port_role, status } = req.body;
    const port = portsData.find(port => port.unlocode === unlocode);
    if (port) {
        return res.status(400).json({
            success: false,
            message: "Port already exists",
            data: null
        })
    }
    portsData.push({ unlocode, country, name, port_role, status });
    res.status(201).json({
        success: true,
        message: "Port data created successfully",
        data: { unlocode, country, name, port_role, status }
    })
}
module.exports = {
    getAllPortData,
    getPortDataById,
    deletePortDataById,
    createPortData
}