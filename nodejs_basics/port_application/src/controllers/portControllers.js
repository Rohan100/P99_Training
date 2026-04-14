const portsData = require('../data/ports.data')

const getAllPortData = (req, res) => {
    let { country, status, port_role, page, limit } = req.query;
    page = page || 1;
    limit = limit || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const filteredData = portsData.filter(port => {
        if (country && port.country !== country) return false;
        if (status && port.status !== status) return false;
        if (port_role && port.port_role !== port_role) return false;
        return true;
    });

    let pagedData = filteredData.slice(skip, endIndex)
    let total = pagedData.length;
    res.status(200).json({
        success: true,
        message: "Port data filtered successfully",
        data: pagedData,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(filteredData.length / limit)
        }
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
    if (!unlocode || !country || !name || !port_role || !status) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
            data: null
        })
    }
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
    createPortData,

}