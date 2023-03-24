const { Notices } = require("../../models");


const createNotices = async (req, res, next) => {
    const {user, body, params, file} = req
    const {_id} = user
    const {category} = params
    const lower = category.toLowerCase()
    const fullData = !!file
    ? { ...body, category: lower, owner: _id, imageUrl: file.path }
    : { ...body, category: lower, owner: _id };
    
    const notices = await Notices.create(fullData);
    res.status(201).json(notices)

}

module.exports = createNotices;