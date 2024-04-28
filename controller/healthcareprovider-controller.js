const HealthcareProvider = require("../model/HealthCareProvider");

const getAllHealthcareProviders = async (req, res, next) => {
  try {
    const healthcareProviders = await HealthcareProvider.find();
    res.status(200).json({ healthcareProviders });
  } catch (err) {
    next(err);
  }
};

const addHealthcareProvider = async (req, res, next) => {
  try {
    const newHealthcareProvider = new HealthcareProvider(req.body);
    const savedHealthcareProvider = await newHealthcareProvider.save();
    res.status(201).json({ healthcareProvider: savedHealthcareProvider });
  } catch (err) {
    next(err);
  }
};

const updateHealthcareProvider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedHealthcareProvider = await HealthcareProvider.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedHealthcareProvider) {
      return res.status(404).json({ message: "Healthcare Provider not found." });
    }
    res.status(200).json({ healthcareProvider: updatedHealthcareProvider });
  } catch (err) {
    next(err);
  }
};

const deleteHealthcareProvider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedHealthcareProvider = await HealthcareProvider.findByIdAndDelete(id);
    if (!deletedHealthcareProvider) {
      return res.status(404).json({ message: "Healthcare Provider not found." });
    }
    res.status(200).json({ message: "Healthcare Provider deleted successfully." });
  } catch (err) {
    next(err);
  }
};

const getHealthcareProviderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const healthcareProvider = await HealthcareProvider.findById(id);
    if (!healthcareProvider) {
      return res.status(404).json({ message: "Healthcare Provider not found." });
    }
    res.status(200).json({ healthcareProvider });
  } catch (err) {
    next(err);
  }
};

exports.getAllHealthcareProviders = getAllHealthcareProviders;
exports.addHealthcareProvider = addHealthcareProvider;
exports.updateHealthcareProvider = updateHealthcareProvider;
exports.deleteHealthcareProvider = deleteHealthcareProvider;
exports.getHealthcareProviderById = getHealthcareProviderById;
