import {makeTableHeaders,makeTableContent,calculateTotalPrice,promoCodePrice,renderBillingHtml1,renderHtml ,constructBillingSectionTemplateCode1} from "./utils";

function getAllItems(){
console.log("Inside getAllItems");
    //var url = "http://localhost:3004/allItems"
    var url = "http://localhost:3004/items"
    var res = fetch(url)
      .then(resp => {
        console.log(resp.status);
        //console.log(resp.json());
        console.log("=====");
        if (resp.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            resp.status);
          return;
        }
       
       return resp.json();
      })
      .then(data => {
       // console.log(data);
       renderHtml(data);
       var url1 = "http://localhost:3004/promotioncodes";
       fetch(url1).then(resp1=>{
         
        return resp1.json();
       })
       .then(promo =>{
         console.log(data);
         console.log(promo);
            renderBillingHtml1(data,promo);
       })
     
       
       
        return data
      })
      .catch(error => {
        console.log("Something wrong happened:"+error)
      })
   
}

function getSpecificItem(id) {
  /*
  const result = await $.ajax({
    url: 'http://localhost:3004/allItems',
    type: 'GET',
    // data: {varName : varValue},
  });
  return result;
  */
 return new Promise(function (resolve, reject) {
  $.ajax({
      url: 'http://localhost:3004/items',
      success: function (data) {
         
         //resolve(data.items[id-1]);
         resolve(data[id-1]);
      }
  });
});
}
function updateSpecificItem(body,url){

  return new Promise(function(resolve,reject){
    $.ajax({
        type:'PUT',
        url:url,
        data:body,
        success:function(res){
            console.log("Response for Update:");

            console.table(res);
            getAllItems();

        },
        error:function(){
            console.log("Error occured while updataing the record");
        }
    })
  });

}

function deleteSpecificItem(itemId){

  $.ajax({
    type:'DELETE',
    url:'http://localhost:3004/items/'+itemId,
    success:function(res){
      console.log("Item got removed successfully...");

      console.table(res);
      getAllItems();

  },
  error:function(){
      console.log("Error occured while deleting  the item");
  }
})
}

export {getAllItems,getSpecificItem,updateSpecificItem,deleteSpecificItem} ;
