const { Notices } = require("../../models");


const createNotices = async (req, res, next) => {
    const {user, body, params, file} = req
    const {_id: owner} = user
    const {category} = params
    const lower = category.toLowerCase()
    const fullData = !!file
    ? { ...body, category: lower, owner, imageUrl: file.path }
    : { ...body, category: lower, owner };
    
    const notices = await Notices.create(fullData);
    res.status(201).json(notices)

}

module.exports = createNotices;