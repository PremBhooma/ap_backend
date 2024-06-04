const AiTool = require("../models/AiTool.model");

exports.CreateAiTool = async (req, res) => {
  try {
    let { category, name, shortDescription, SubscriptionTier, price, tags } = req.body;

    if (!category)
      return res.status(203).json({
        errorcode: 1,
        status: false,
        message: "Category Should Be Present",
        data: null,
      });

    let newAiTool = new AiTool({
      image: req.file && req.file.location ? req.file.location : null,
      //   image: req.file && req.file.image && req.file.image[0].location ? req.file.image[0] : null,
      category,
      name,
      shortDescription,
      SubscriptionTier,
      price,
      tags: tags ? JSON.parse(tags) : [],
    });

    newAiTool = await newAiTool.save();

    return res.status(201).json({
      errorcode: 0,
      status: true,
      message: "AiTool Added Successfully",
      data: newAiTool,
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({
      errorcode: 5,
      status: false,
      message: "Internal server error",
      data: error,
    });
  }
};

exports.editAiTool = async (req, res) => {
  try {
    let { aiToolId, category, name, shortDescription, SubscriptionTier, price, tags } = req.body;

    if (!aiToolId)
      return res.status(403).json({
        errorcode: 2,
        status: false,
        message: "AiTool Id should be present",
        data: null,
      });

    let editAiTool = await AiTool.findById(aiToolId);
    if (!editAiTool)
      return res.status(404).json({
        errorcode: 2,
        status: false,
        message: "AiTool not found",
        data: null,
      });

    editAiTool.category = category || editAiTool.category;
    editAiTool.name = name || editAiTool.name;
    editAiTool.shortDescription = shortDescription || editAiTool.shortDescription;
    editAiTool.SubscriptionTier = SubscriptionTier || editAiTool.SubscriptionTier;
    editAiTool.price = price || editAiTool.price;

    try {
      editAiTool.tags = tags ? JSON.parse(tags) : editAiTool.tags;
    } catch (error) {
      console.error("Error parsing tags:", error.message);
      editAiTool.tags = editAiTool.tags;
    }

    await editAiTool.save();

    return res.status(200).json({
      errorcode: 0,
      status: false,
      message: "AiTool Upadte Successfully",
      data: editAiTool,
    });
  } catch (error) {
    return res.status(500).json({
      errorcode: 5,
      status: false,
      message: "Internal server error",
      data: error,
    });
  }
};

exports.getAllAiTool = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page

    const skip = (page - 1) * limit;

    let aiToolList = await AiTool.find({})
      .populate([
        {
          path: "category",
          model: "Category",
          select: "name ",
        },
      ])
      .sort({ created_ts: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Get all ai tools successfully",
      pageInfo: {
        page,
        limit,
      },
      data: aiToolList,
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({
      errorcode: 5,
      status: false,
      message: "Internal server error",
      data: error,
    });
  }
};
