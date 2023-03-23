const { Notices } = require("../../models");


const get = async (req, res, next) => {
    const {search, isFavorites, myAdds, findtext} = req.query
    const category = req.params.category
   
    if(req.user) {
        const {_id} = req.user
        if (isFavorites && myAdds) {
        //error400
        }

        if (isFavorites !== 'false') {
          const result = await Notices.find({category})
          return res.status(200).json(result)
        }  
   
        if (myAdds !== 'false') {
            if(findtext) {
                const result = await Notices.find({category, owner: _id, 'title': { $regex: findtext, $options: "i" }})
                return res.status(200).json(result)
            }
          const result= await Notices.find({category, owner: _id})
          return res.status(200).json(result)
        }
    }
  
    if (findtext) {
        const notices = await Notices.find({category: category, 'title': { $regex: findtext, $options: "i" }})
        res.status(200).json(notices)
    } else {
        const notices = await Notices.find({'category': {$regex: category, $options: "i"}})
        res.status(200).json(notices)
    };
}

module.exports = get;