const model = require('../models/model.js');
//post req
async function create_categories(req, res) {
    const Create = new model.Categories({
        type: "Investment",
        color: '#FCBE44'
    });

    try {
        await Create.save();
        return res.json(Create);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories: ${err}` });
    }
}

//get req

async function get_categories(req,res){
    let data=await model.Categories.find({})
    let filter=await data.map(v=>Object.assign({},{type: v.type,color: v.color}));
    return res.json(filter);

  
}


// post transaction
async function create_transaction(req, res) {
    if (!req.body) return res.status(400).json("Post HTTP Data not provided");

    const { name, type, amount } = req.body;

    try {
        const create = new model.Transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        await create.save();
        return res.json(create);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating transaction: ${err}` });
    }
}

//get transaction

async function get_transaction(req,res){
    let data=await model.Transaction.find({});
    return res.json(data);

}

//delete transaction
async function delete_Transaction(req, res) {
    try {
        if (!req.body) return res.status(400).json({ message: "Request body not found" });

        const result = await model.Transaction.deleteOne({ _id: req.body._id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        return res.json("Record Deleted");
    } catch (err) {
        return res.status(500).json({ message: "Error while deleting record", error: err });
    }
}

       
//get labels

async function get_labels(req,res){
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"

        }
    ]).then(result=>{
        let data=result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}))
        res.json(data);
    }).catch(error=>{
        res.status(400).json("Loopup Collection error")
    })

}




module.exports = {
    create_categories,
    get_categories,
    create_transaction,
    get_transaction,
    delete_Transaction,
    get_labels
};
