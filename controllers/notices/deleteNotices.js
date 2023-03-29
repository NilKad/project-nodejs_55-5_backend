const { Notices } = require("../../models");


const deleteNotices = async (req, res, next) => {

    try {
    const { user, params } = req;
    const _id = params.id;

    const notices = await Notices.deleteOne({_id, owner: user._id})
    if(notices.deletedCount === 0) {
        return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    res.status(201).json({ message: 'Success deleted' });
    } catch (error) {
        res.status(400).json({ message: `Bad request (id incorrect)` });
    }

};

module.exports = deleteNotices;
