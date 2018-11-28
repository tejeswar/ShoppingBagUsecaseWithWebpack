import {headerPart,startingBillingPart,endingBillingPart,helpSection}  from "./constants";

function makeTableHeaders(noOfItems){
    return  `
    <h3 style="text-align:center;margin-top:2%">YOUR SHOPPING BAG </h3> 
    <hr id="underline">
    <div id="tableHeaders">
    <div>${noOfItems} ITEMS</div>
    <div></div>
    <div>Size</div>
    <div>Quantity</div>
    <div>Price</div>
    </div>
    <hr>
    `;
}
function makeTableContent(arrOfItems){

    var itemsContainer = `<div id="itemsContainer">`;
var itemsContainerEnding = `</div>`;
var allItems = "";
for(var itemCount = 0;itemCount < arrOfItems.length; itemCount++){
var singleItem = arrOfItems[itemCount];
allItems = allItems+`
<div class="singleItem">
<div id="imagePart"><img src="${singleItem.img}" alt=""></div>
<div>
${singleItem.name}<br>
    Style#:${singleItem.style}<br>
    Color:${singleItem.color}
    <br><br><br><br><br>
   <ul>
       <li><a id="${singleItem.id}" class="edit" href="#myModal" data-toggle="modal">Edit</a></li>
       <li><a  id="remove_${singleItem.id}" class="removeItem" href="#";">Remove</a></li>
       <li><a  href="javascript:void(0);">Save for later</a></li>
   </ul>
</div>
<div style="margin-left:3rem">${singleItem.size}</div>
<div><input type="number" style="width:40px" min=1 value="${singleItem.qty}" readonly></div>
<div><small><sup>$</sup></small>${singleItem.qty*singleItem.price}</div>
</div>
<hr >
`;

}
var allContents = itemsContainer+allItems+itemsContainerEnding;
return allContents;     
     

}
function calculateTotalPrice(arrOfItems){
    var totalAmount = 0;
    for(var itemCount = 0;itemCount < arrOfItems.length; itemCount++){
        var singleItem = arrOfItems[itemCount];
        totalAmount = totalAmount+singleItem.qty*singleItem.price
    }
    console.log("totalAmount:"+totalAmount);
    return totalAmount;
}
function promoCodePrice(arrOfItems){
var promoCodePrice = arrOfItems.promotioncode.value;
return promoCodePrice;
}
function renderHtml(arrOfItems){
var theWholeContent = makeTableHeaders(arrOfItems.length)+makeTableContent(arrOfItems);
//console.log(theWholeContent);
document.getElementById("itemsHolder").innerHTML = theWholeContent;
//calculateTotalPrice(arrOfItems);

}
//////////////////////////////////////////////
/*
function constructBillingSectionTemplateCode(wholeData){
 var billingPart = `
 <div id="billingPart">
 <div style="margin-left:3%;margin-top:3%;margin-right: 3%">
    <div id="promoSection">
       <div>
           ENTER PROMOTION CODE <br>OR GIFT CARD
          
       </div>
       <div>
           <input type="text"/><input type="button" value="APPLY">
       </div>
   </div>
   <hr id="underline">
   <table style="width:100%">
       <tbody><tr>
         <td ><span>SUBTOTAL</span></td>
         <td align="center"><span> ${calculateTotalPrice(wholeData.items)}</span></td>
       </tr>
       <tr>
       <td ><span>PROMOTION CODE JF10 APPLIED</span></td>
       <td align="center"><span>-${wholeData.promotioncode.JF10}</span></td>
       </tr>
       <tr>
       <td ><span> ESTIMATED SHIPPINGS* <br>
        </span></td>
       <td align="center"><span>FREE</span></td>
       </tr>
      
       </tbody>
       </table>
       You qualify for free shipping <br>
       because your order is over      
            
  
  
   <hr>
   <table style="width:100%">
       <tbody>
       <tr>
         <td ><span>ESTIMATED TOTAL</span></td>
         <td align="center"><span>${calculateTotalPrice(wholeData.items)-wholeData.promotioncode.JF10}</span></td>
       </tr>
       </tbody>
   </table>
    
   Tax will be applied during checkout

   <hr id="underline">
  <p style="padding-left:70%">
     <u>CONTINUE SHOPPING</u>
       <input type="button" value="CHECKOUT"> 
  </p>
 </div>
</div>
 `;
return billingPart;
}
function renderBillingHtml(wholeData){

    var totalTempCode =startingBillingPart+helpSection+constructBillingSectionTemplateCode(wholeData)+endingBillingPart;
    document.getElementById("priceHolder").innerHTML = totalTempCode;
    }
*/
function constructBillingSectionTemplateCode1(data,promo){
    
    var promoValue = promo[0].value;
    var billingPart = `
    <div id="billingPart">
    <div style="margin-left:3%;margin-top:3%;margin-right: 3%">
       <div id="promoSection">
          <div>
              ENTER PROMOTION CODE <br>OR GIFT CARD
             
          </div>
          <div>
              <input type="text"/><input type="button" value="APPLY">
          </div>
      </div>
      <hr id="underline">
      <table style="width:100%">
          <tbody><tr>
            <td ><b><span>SUBTOTAL</span></b></td>
            <td align="center"><small><sup>$</sup></small><span>${calculateTotalPrice(data)}</span></td>
          </tr>
          <tr>
          <td ><b><span>PROMOTION CODE JF10 APPLIED</span></b></td>
          <td align="center">-<small><sup>$<span></sup></small>${promoValue}</span></td>
          </tr>
          <tr>
          <td ><b><span> ESTIMATED SHIPPINGS* <br>
           </span></b></td>
          <td align="center"><span>FREE</span></td>
          </tr>
         
          </tbody>
          </table>
          You qualify for free shipping <br>
          because your order is over      
               
     
     
      <hr>
      <table style="width:100%">
          <tbody>
          <tr>
            <td ><b><span>ESTIMATED TOTAL</span></b></td>
            <td align="center"><small><sup>$<span></sup></small>${calculateTotalPrice(data)-promoValue}</span></td>
          </tr>
          </tbody>
      </table>
       
      Tax will be applied during checkout
   
      <hr id="underline">
     <p style="padding-left:70%">
        <u>CONTINUE SHOPPING</u>
          <input type="button" value="CHECKOUT"> 
     </p>
    </div>
   </div>
    `;
   return billingPart;
   }

function renderBillingHtml1(data,promo){
console.log(promo);
    var totalTempCode =startingBillingPart+helpSection+constructBillingSectionTemplateCode1(data,promo)+endingBillingPart;
    document.getElementById("priceHolder").innerHTML = totalTempCode;
    }

    export {makeTableHeaders,makeTableContent,calculateTotalPrice,promoCodePrice,renderHtml,constructBillingSectionTemplateCode1,renderBillingHtml1} ;