const pantryModel=require('../models/pantryModel');
const basketModel=require('../models/basketModel');

const { isValidString, isValidRequestBody} = require('../validations/validator.js');

//creating basket in a pantry
const createBasket=async function(req,res){
    try{

        const requestBody = req.body;
        const id=req.params.pantryId;
        const name=req.params.basketName;

        if (!isValidRequestBody(requestBody)) return res.status(400).send({status: false, message: "Empty request body. Please provide details" });

        const { item } = requestBody;

        let future = new Date();
        future.setDate(future.getDate() + 30);

        if (!isValidString(item)) {
        return res.status(400).send({ status: false, message: "Please provide data" });
        }
        requestBody.pantryId=req.params.pantryId

        requestBody.basketName=req.params.basketName
    
        requestBody.ttl=future
      
        const basketList=await basketModel.findOneAndUpdate({pantryId:id,basketName:name},{item:item},{new:true});
        
        if(basketList){
            return res.status(200).send({ status: true, message: 'basket is already created',data:basketList})
        }
        

        const basket=await basketModel.create(requestBody);

        await pantryModel.findOneAndUpdate({_id:req.params.pantryId},{$inc:{ percentfull:1}});

        return res.status(201).send({ status: true, message: 'sucessfull', data: basket });

    }catch(error){
        res.status(500).send({ status: false, message: error.message })
    }
}


//updating content of basket
const updateBasket=async function(req,res){

    try{
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, message: 'Empty request body. Please provide details' });

        const { item } = req.body;
        
        const basket=await basketModel.findOne({pantryId:req.params.pantryId,basketName:req.params.basketName});

        if(!basket){
            return res.status(404).send({status: false, message:"basket not exist"})
        }

        let newItemKeyArray=Object.keys(item);
        
         for(let i=0;i<newItemKeyArray.length;i++){

              if( basket.item.hasOwnProperty(newItemKeyArray[i])){
                
                basket.item[newItemKeyArray[i]]=item[newItemKeyArray[i]]

             }else{
                 basket.item[newItemKeyArray[i]]=item[newItemKeyArray[i]]
            }
         }
        
            const updatedBasket=await  basketModel.findOneAndUpdate({pantryId:req.params.pantryId,basketName:req.params.basketName},{item:basket.item},{new:true});
            
            return  res.status(200).send({ status: true, message: "basket update succssesfully",data:updatedBasket })

    }catch(error){
        res.status(500).send({ status: false, message: error.message })
    }
}

//details of basket content
const getBasketDetails=async function (req,res){
    try{
        const pId=req.params.pantryId

        const bName=req.params.basketName

        const details=await basketModel.findOne({pantryId:pId,basketName:bName})

         if(!details){
             return res.status(404).send({status:false,message:"Basket not found"})
         }
      
        return res.status(200).send({status:true,data:details.item})
         
    }catch(error){
        res.status(500).send({ status: false, message: error.message })
    }
}

//remove basket from pantry
const deleteBasket=async function (req,res){
    try{
        const pId=req.params.pantryId

        const bName=req.params.basketName

        const deletedBasket=await basketModel.deleteOne({pantryId:pId,basketName:bName})
       
        if(deletedBasket.deletedCount===0){

            return res.status(404).send({status:false,message:"Basket not found"})
        }

        await pantryModel.findOneAndUpdate({_id:pId},{$inc:{ percentfull:-1}});

        return res.status(200).send({status:true,message:"Basket deleted successfully"})

    }catch(error){
        res.status(500).send({ status: false, message: error.message })
    }
}

//extra
const getBasket = async function (req, res) {
    let list = await basketModel.find();
    res.send({ msg: list});
  };

module.exports={
    createBasket,
    updateBasket,
    getBasketDetails,
    deleteBasket,
    getBasket
}
