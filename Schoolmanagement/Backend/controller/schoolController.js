const db = require('../db/db.js');

// Add School Controller
exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Check if a school with the same name, latitude, and longitude exists
        const [existingSchool] = await db.query(
            "SELECT * FROM schools WHERE name = ? AND latitude = ? AND longitude = ?",
            [name, parseFloat(latitude), parseFloat(longitude)]
        );

        if (existingSchool.length > 0) {
            return res.status(400).json({ error: "School with the same name and location already exists." });
        }

        // Insert new school
        await db.query(
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
            [name, address, parseFloat(latitude), parseFloat(longitude)]
        );

        res.status(201).json({ message: "School added successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

// List Schools Controller
exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    // Validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const [schools] = await db.query("SELECT * FROM schools");

        // Calculate distances
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const toRadians = (deg) => deg * (Math.PI / 180);
            const R = 6371; // Radius of Earth in km
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a = Math.sin(dLat / 2) ** 2 +
                      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
            return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        };

        const sortedSchools = schools.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

// Update School Controller
exports.updateSchool = async (req, res) => {
    const { id } = req.params;
    const { name, address, latitude, longitude } = req.body;

    if (!id || !name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const result = await db.query(
            "UPDATE schools SET name = ?, address = ?, latitude = ?, longitude = ? WHERE id = ?",
            [name, address, parseFloat(latitude), parseFloat(longitude), id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "School not found." });
        }

        res.status(200).json({ message: "School updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

// Delete School Controller
exports.deleteSchool = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "School ID is required." });
    }

    try {
        const result = await db.query("DELETE FROM schools WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "School not found." });
        }

        res.status(200).json({ message: "School deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};
