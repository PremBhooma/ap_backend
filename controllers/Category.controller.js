const Category = require("../models/Category.model");

exports.createCategory = async (req, res) => {
    try {
        let { name } = req.body;

        let CategoryExist = await Category.findOne({ name: name });
        if (CategoryExist)
            return res.status(203).json({
                errorcode: 2,
                status: false,
                message: "Category Already Exists",
                data: null,
            });

        let category = new Category({
            // image: req.file && req.file.location ? req.file.location : null,
            name,
        });

        category = await category.save();

        return res.status(201).json({
            errorcode: 0,
            status: true,
            message: "Category Added Successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error,
        });
    }
};


exports.getAllCategory = async (req, res) => {
    try {
        let CategoryList = await Category.find({}).sort({ created_ts: -1 })
        return res.status(200).json({
            errorcode: 0,
            status: true,
            Count: CategoryList.length,
            message: "Get All Catyrgories Successfully",
            data: CategoryList
        })
    } catch (error) {
        return res.status(500).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        let { id } = req.params
        if (!id) return res.status(403).json({
            errorcode: 1,
            status: false,
            message: "Id Should Be Present",
            data: null
        })
        let CategoryId = await Category.findById({ _id: id })
        if (!CategoryId) return res.status(404).json({
            errorcode: 2,
            status: false,
            message: "Category Not Found",
            data: null
        })
        await Category.deleteOne({ _id: id })
        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "Category Deleted Successfully",
            data: null
        })

    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.editCategory = async (req, res) => {
    try {
        let { id, name } = req.body
        if (!id) return res.status(403).json({
            errorcode: 1,
            status: false,
            message: "Id Should Be Present",
            data: null
        })
        let editCategory = await Category.findById(id)
        if (!editCategory) return res.status(404).json({
            errorcode: 2,
            status: false,
            message: "Category Not Found",
            data: null
        })

        editCategory.name = name ? name : editCategory.name
        // editCategory.image = req.file && req.file.location ? req.file.location : editCategory.image

        await editCategory.save()

        return res.status(200).json({
            errorcode: 0,
            status: false,
            message: "Category Edit Successfully",
            data: editCategory
        })
    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}