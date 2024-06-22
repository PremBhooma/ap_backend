const AiTool = require("../models/AiTool.model");

exports.CreateAiTool = async (req, res) => {
  try {
    let { category, name, shortDescription, subscriptionTier, price, tags } = req.body;

    if (!category)
      return res.status(203).json({
        errorcode: 1,
        status: false,
        message: "Category Should Be Present",
        data: null,
      });

    let newAiTool = new AiTool({
      image: req.file && req.file.location ? req.file.location : null,
      category,
      name,
      shortDescription,
      subscriptionTier,
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
    let { id, category, name, shortDescription, subscriptionTier, price, tags } = req.body;

    if (!id)
      return res.status(403).json({
        errorcode: 2,
        status: false,
        message: "AiTool Id should be present",
        data: null,
      });

    let editAiTool = await AiTool.findById(id);
    if (!editAiTool)
      return res.status(404).json({
        errorcode: 3,
        status: false,
        message: "AiTool not found",
        data: null,
      });

    editAiTool.category = category || editAiTool.category;
    editAiTool.name = name || editAiTool.name;
    editAiTool.shortDescription = shortDescription || editAiTool.shortDescription;
    editAiTool.subscriptionTier = subscriptionTier || editAiTool.subscriptionTier;
    editAiTool.price = price || editAiTool.price;

    try {
      editAiTool.tags = tags ? JSON.parse(tags) : editAiTool.tags;
    } catch (error) {
      console.error("Errorrrrrr parsing tags:", error.message);
      editAiTool.tags = editAiTool.tags;
    }

    editAiTool.image = req.file && req.file.location ? req.file.location : editAiTool.image;

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

exports.getSingleAiTool = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID", id);

    let aiToolList = await AiTool.findById({ _id: id }).populate([
      {
        path: "category",
        model: "Category",
        select: "name",
      },
    ]);
    return res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Get single ai tools successfully",
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

exports.delete = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id)
      return res.status(403).json({
        errorcode: 1,
        status: false,
        message: "Id Should Be Present",
        data: null,
      });
    let aiToolId = await AiTool.findById({ _id: id });
    if (!aiToolId)
      return res.status(404).json({
        errorcode: 2,
        status: false,
        message: "Ai Tool Not Found",
        data: null,
      });
    await AiTool.deleteOne({ _id: id });
    return res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Ai Tool Deleted Successfully",
      data: null,
    });
  } catch (error) {
    return res.status(204).json({
      errorcode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};
