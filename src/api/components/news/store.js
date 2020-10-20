const Model = require("../../../db/models/new");

const getAllNews = async (page) => {
    const news = await Model.paginate({}, {page, limit:50});
    return news;
}

const createNews = async (newToAdd) => {
    const myNew = new Model(newToAdd);
    return await myNew.save();
}

const deleteNew = async (id) => {
    const removed = await Model.findByIdAndDelete({_id:id});
    return removed;
}

const multipleInserts = async (news) => {
    // eslint-disable-next-line no-unused-vars
    Model.insertMany(news, { ordered: false }, (err, docs) =>{
        if (err) {
            const code = err.message.split(" ")[0];
            if(code !== "E11000") console.error(err.message);
        } else {
            console.log("Everything new add success! 🥰🥰🥰");
        }
    })
}

module.exports = {
    getAllNews,
    createNews,
    deleteNew,
    multipleInserts
};