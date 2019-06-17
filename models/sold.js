var  db = require('../db');
var ObjectId = require('mongodb').ObjectID;

//Get list sold ensure: update choose
exports.getListProductSold = function(passDate, cb){

    var passDateNumber = parseFloat(passDate);
    console.log(passDateNumber);
    // var collection = db.get().collection('Sold');
    // collection.find({"update": passDateNumber}).toArray(function(err, result){
    //     cb(err, result);
    // })
    var date = new Date();
    date.setHours(0,0,0,0);
    var currentDateNumber = date.getTime();
    console.log("current", currentDateNumber);
    
    //get data from yesterday: only yesterday
    if(passDateNumber == date.setDate(date.getDate() - 1)){
        currentDateNumber=passDateNumber;
    }
    
    var collection = db.get().collection('Sold');
    collection.find({
        update:{
            $gte:  passDateNumber,
            $lt:   currentDateNumber+1
        }
    }).toArray(function(err, result){
        cb(err, result);
    })
}


exports.saveDataSold = function(numberSold,priceSold,_id, name,category, image,
    qty,price, update,cb){
    var collection = db.get().collection('Sold');
    
    collection.findOne({idProduct:_id, update:update},function (err, result) {
        cb(err, result)
        console.log("sp da ban",result);
        //update
        if(result != null){
                var qtyCurrent = result.qty;
                var qtyUpdate = qtyCurrent + qty;
                collection.updateOne({_id : ObjectId(result._id)}, {
                    $set: {
                        qty: qtyUpdate,
                    }
                }, function(err, result){
                cb(err, result);
                });
        }//insert
        else{
            collection.insert({
                idProduct: _id,
                name,
                category,
                image,
                qty,
                price,
                numberSold,
                priceSold,
                update
            },function(err,result){
                cb(err,result)
            })
        }
    });
}


const countSoldByCategory = async(code, cb)=>{
    var collectionSold = db.get().collection('Sold');
    const numberCount = await collectionSold.find({category: code}).count();
    return numberCount;
}
exports.countSoldByCategory = countSoldByCategory;

const getAllCategory = async(cb)=>{
    var collectionCategory = db.get().collection('Category');
    const listCategores = await collectionCategory.find({}).toArray();
    return listCategores;
}
exports.getAllCategory = getAllCategory;


exports.getDataChart = async function(cb){
    const data = [];
    // const listCategores = await getAllCategory();
    // console.log(listCategores)
    //listCategores.forEach(function(e){
        const numberMX = await countSoldByCategory("MX");data.push(numberMX);
        const numberMH = await countSoldByCategory("MH");data.push(numberMH);
        const numberMT = await countSoldByCategory("MT");data.push(numberMT);
        const numberMĐ = await countSoldByCategory("MĐ");data.push(numberMĐ);
        console.log(data)
        //set number of min and max product sold
        data.push(0);
        cb(null, data)
   //})
    //console.log(data)
}
