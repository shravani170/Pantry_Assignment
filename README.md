

## Pantry and Basket APIs
## tech used
Node.js,Express,Mongodb and JS
## How to start 
1.install dependencies look it into package.json
2.go to src folder and run node index.js

### Models
# Pantry Model
```
{  pantryName:{
         type:String
     },
     description:{
         type:String
     },
     error:{
         type:Array
     },
     notifications:{
         type:Boolean,
         default:true
     },
     percentfull:{
         type:Number,
         default:0
     },
     email:{
        type:String
     } }
```
# Basket Model
```
{  basketName:{
            type:String,
            unique:true
        },
        ttl:{
            type:Date
        },
        pantryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Pantry1'
        },
        item:new mongoose.Schema.Types.Mixed}
```

### POST /pantry
- Create pantry by giving email and pantry name in request body of postman
- response is pantry id
-example:request body
```
{ 
    "email":"abc@xyz.com",
    "pantryName":"example"
}

```
  `Endpoint: BASE_URL/pantry`

## GET /pantry/:pantryId 
- Give pantryId from url path param
- response is detail of pantry with Baskets

## POST /pantry/:pantryId/basket/:basketName
- create basket by giving key value pair in "item" variable from request body of postman
-example:request body
```
{ 
    "item":{
        key:value
    }
}

```
-response is all details of basket

## PUT /pantry/:pantryId/basket/:basketName
-Give pantryId and basketName from url as path params and 
-"item" from request body of postman
-example:request body
```
{ 
    "item":{
        key:value
    }
}

```

## GET /pantry/:pantryId/basket/:basketName
-Give pantryId and basketName from url as path params
-response is only content(i.e key - value pairs ) store in basket

## DELETE /pantry/:pantryId/basket/:basketName
-Give pantryId and basketName from url as path params
-it deletes basket from particular pantry .



