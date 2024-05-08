const AiTool = require("../models/AiTool.model");

exports.CreateAiTool = async (req, res) => {
    try {
        let { category, name, shortDescription, SubscriptionTier, price, tags } = req.body;

        if (!category) return res.status(203).json({
            errorcode: 1,
            status: false,
            message: "Category Should Be Present",
            data: null
        })

        let newAiTool = new AiTool({
            image: req.file && req.file.location ? req.file.location : null,
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
}

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

// exports.getAllProduct = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1; // default to page 1
//         const limit = parseInt(req.query.limit) || 10; // default to 10 items per page

//         const skip = (page - 1) * limit;

//         let productList = await Product.find({ isPublish: true })
//             .populate([
//                 {
//                     path: "superCategory",
//                     model: "SuperCategory",
//                     select: "name image isPopular",
//                 },
//                 {
//                     path: "mainCategory",
//                     model: "MainCategory",
//                     select: "superCategory name image isPopular slug",
//                 },
//                 {
//                     path: "category",
//                     model: "Category",
//                     select: "superCategory mainCategory name image isPopular slug",
//                 },
//                 {
//                     path: "subCategory",
//                     model: "SubCategory",
//                     select: "superCategory mainCategory category name image isPopular slug",
//                 },
//             ])
//             .sort({ created_ts: -1 })
//             .skip(skip)
//             .limit(limit);
//         return res.status(200).json({
//             errorcode: 0,
//             status: true,
//             message: "Get all sub category successfully",
//             data: productList,
//             // pageInfo: {
//             //     page,
//             //     limit,
//             // },
//         });
//     } catch (error) {
//         console.log("error", error.message);
//         return res.status(500).json({
//             errorcode: 5,
//             status: false,
//             message: "Internal server error",
//             data: error,
//         });
//     }
// };

// exports.getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const getData = await Product.findById(id)
//             .populate([
//                 {
//                     path: "superCategory",
//                     model: "SuperCategory",
//                     select: "name image isPopular",
//                 },

//                 {
//                     path: "mainCategory",
//                     model: "MainCategory",
//                     select: "superCategory name image isPopular slug",
//                 },
//                 {
//                     path: "category",
//                     model: "Category",
//                     select: "superCategory mainCategory name image isPopular slug",
//                 },
//                 {
//                     path: "subCategory",
//                     model: "SubCategory",
//                     select: "superCategory mainCategory cayegory name image isPopular slug",
//                 }
//             ])
//             .sort({ created_ts: -1 });
//         return res.status(200).json({
//             errorcode: 0,
//             status: true,
//             message: "Successfully retrieved Product Detail",
//             data: getData,
//         });
//     } catch (error) {
//         console.log("error", error.message);
//         return res.status(500).json({
//             errorcode: 5,
//             status: false,
//             message: "Internal server error",
//             data: error,
//         });
//     }
// }

// exports.getProductByCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const getData = await Product.find({ category: id })
//             .populate([
//                 {
//                     path: "superCategory",
//                     model: "SuperCategory",
//                     select: "name image isPopular slug",
//                 },

//                 {
//                     path: "mainCategory",
//                     model: "MainCategory",
//                     select: "superCategory name image isPopular slug",
//                 },
//                 {
//                     path: "category",
//                     model: "Category",
//                     select: "superCategory mainCategory name image isPopular slug",
//                 },
//                 {
//                     path: "subCategory",
//                     model: "SubCategory",
//                     select: "superCategory mainCategory cayegory name image isPopular slug",
//                 }
//             ])
//             .sort({ created_ts: -1 });
//         return res.status(200).json({
//             errorcode: 0,
//             status: true,
//             message: "Successfully retrieved Product Detail",
//             data: getData,
//         });
//     } catch (error) {
//         console.log("error", error.message);
//         return res.status(500).json({
//             errorcode: 5,
//             status: false,
//             message: "Internal server error",
//             data: error,
//         });
//     }
// }

// exports.getTopOfTheWeekProduct = async (req, res) => {
//     try {
//         const product = await Product.find({ topOfTheWeek: true })
//             .populate([
//                 {
//                     path: "superCategory",
//                     model: "SuperCategory",
//                     select: "name image isPopular",
//                 },

//                 {
//                     path: "mainCategory",
//                     model: "MainCategory",
//                     select: "superCategory name image isPopular slug",
//                 },
//                 {
//                     path: "category",
//                     model: "Category",
//                     select: "superCategory mainCategory name image isPopular slug",
//                 },
//                 {
//                     path: "subCategory",
//                     model: "SubCategory",
//                     select: "superCategory mainCategory cayegory name image isPopular slug",
//                 }
//             ])
//             .sort({ created_ts: -1 });
//         return res.status(200).json({
//             errorcode: 0,
//             status: true,
//             message: "Get all product by Top Of The Week successfully",
//             data: product,
//         });
//     } catch (error) {
//         console.log("error", error.message);
//         return res.status(204).json({
//             errorcode: 5,
//             status: false,
//             message: error.message,
//             data: error,
//         });
//     }
// };

// exports.deleteProduct = async (req, res) => {
//     try {
//         let { id } = req.params;
//         if (!id)
//             return res.status(403).json({
//                 errorcode: 2,
//                 status: false,
//                 message: "Product id should be present",
//                 data: null,
//             });

//         let product = await Product.findById({ _id: id });
//         if (!product)
//             return res.status(404).json({
//                 errorcode: 2,
//                 status: false,
//                 message: "Category not found",
//                 data: null,
//             });

//         await Product.deleteOne({ _id: id });
//         return res.status(200).json({
//             errorcode: 0,
//             status: true,
//             message: "Product deleted successfully",
//             data: null,
//         });
//     } catch (error) {
//         console.log("error", error.message);
//         return res.status(204).json({
//             errorcode: 5,
//             status: false,
//             message: error.message,
//             data: error,
//         });
//     }
// };

