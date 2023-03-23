const { Notices } = require("../../models");


const getId = async (req, res, next) => {
    const {search, isFavorites, myAdds, findtext} = req.query
    const id = req.params.id
   
    const notices = await Notices.findById({_id: id});
    
    res.status(200).json(notices)
}

module.exports = getId;