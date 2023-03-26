const { News } = require('./models');

const dataConvert = async () => {
  const inData = await News.aggregate([
    {
      $project: {
        date: {
          $dateFromString: {
            dateString: '$date',
          },
        },
      },
    },
  ]);

  console.log('inData: ', inData);

  for (const item of inData) {
    console.log(item._id);
    // const updateData = await News.updateOne(item._id, { date: item.date });
    const newItem = await News.findByIdAndUpdate(
      { _id: item._id },
      { date: item.date },
      { new: true }
    );
    console.log('!!!New Item: ', newItem);
  }
};

// dataConvert();
module.exports = dataConvert;
