import httpStatus from "http-status";
import Product from "../models/product.model";
import catchAsync from "../utils/catchAsync";

const getAll = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const match: any = {}

    if (req.query.category) {
        match.category = req.query.category
    }


    const products = await Product.find({
        ...match
    }).limit(limit).skip(skip).sort({ createdAt: -1 })


    const total = await Product.countDocuments({
        ...match
    });

    res.status(httpStatus.OK).send({ data: products, total, page });
});


const changeStatus = catchAsync(async (req, res) => {
    const { approval_status } = req.body;
    const { id } = req.params;
    const record = await Product.findOneAndUpdate({ _id: id }, {
        approval_status: approval_status
    }, { new: true });

    // TODO  send notification to the vendor

    res.status(httpStatus.OK).send({ data: record, msg: "Status Updated" });

})

const deleteStatus = catchAsync(async (req, res) => {
    const { id } = req.params;

    await Product.deleteOne({ _id: id.toString() })

    // TODO Clean up files

    res.status(httpStatus.OK).send({ msg: "Product Remove" });

})




export {
    getAll,
    changeStatus,
    deleteStatus
};
