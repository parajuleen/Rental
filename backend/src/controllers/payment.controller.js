const { Item } = require("../models/item.model");
const stripe = require("stripe")(process.env.Stripe_Secret_Key);

const createCheckout = async (req, res) => {
  try {
    const{id}=req.user

    const productData = req.body;
  

    const lineItems=[]

    if (productData.length) {
      for (const item of productData) {
        const itemData = await Item.findById({
          _id: item.id,
        });

        if (itemData) {
          if (
            itemData.unitPrice != item.price ||
            item.quantity > itemData.availableQuantity
          ) {
            return res
              .status(400)
              .json({ message: "Invalid item price or quantity" });
          }
          lineItems.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: itemData.itemName,
                images: [itemData.productImages[0]],
              },
              unit_amount: itemData.unitPrice * 100,
            },
            quantity: item.quantity,
          });
        }
      }
    } 
    else if(Object.keys(productData).length) //if only one item is sent//
    {
        const itemData = await Item.findById({
            _id: productData.id,
          });

  
          if (itemData) {
            if (
              itemData.unitPrice != productData.price ||
              productData.quantity > itemData.availableQuantity
            ) {
              return res
                .status(400)
                .json({ message: "Invalid item price or quantity" });
            }
            lineItems.push({
              price_data: {
                currency: "usd",
                product_data: {
                  name: itemData.itemName,
                  images: [itemData.productImages[0]],
                },
                unit_amount: itemData.unitPrice * 100,
              },
              quantity: productData.quantity,
            });
          }
        

    }

        const session= await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:5173/posts",
            cancel_url:"http://localhost:5173/cart",
            metadata:{
              userID:id
            }

        })

        return res.status(200).json({
            id:session.id
        })
  } catch (error) {
    console.log(error);
  }
};

module.exports = createCheckout;
