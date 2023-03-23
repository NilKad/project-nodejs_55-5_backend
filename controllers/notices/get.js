const { Notices } = require("../../models");


const get = async (req, res, next) => {
    
    const category = req.params.category
    console.log(category)
    // if(req.user) {
    //     if (isFavorites && isMyAdds) {
    //     //error400
    //     }
        
    //     if (isfavorites) {
    //       const result = await Notices.find({category})
    //       return res.status(200).json({code: 200, message: 'success, notices: result'})
    //     }
    //     if (isMyAdds) {
    //       const result= await Notices.find({category})
    //       return res.status(200).json({code: 200, message: 'success, notices: result'})
    // } 
    // }
    console.log('da', category)
    const notices = await Notices.find({category});
    console.log(notices)
    return res.status(200).json({notices})

}

module.exports = get;