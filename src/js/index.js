import {headerPart,startingBillingPart,endingBillingPart,helpSection}  from "./constants";
import {makeTableHeaders,makeTableContent,calculateTotalPrice,promoCodePrice,renderHtml,constructBillingSectionTemplateCode1} from "./utils";
import {getAllItems,getSpecificItem,updateSpecificItem,deleteSpecificItem} from "./services";

console.log("Hello world");
window.onload = function(){
    
   

   
    addDyanaicEventHandler();
    
 };
 function addDyanaicEventHandler(){
    console.log("adding dyanamic event listener");
    $("html").on("click",".removeItem",function(){
      
      var itemId = this.id.split("_")[1];
      console.log("remove button got clicked:"+itemId);
      deleteSpecificItem(itemId);
    })
///////////////////////////
$("html").on("click",".updateItem",function(){
  console.log("Uupdate button got clicked:"+this.id);
  //$('#myModal').modal('hide');//it will also work
  //setTimeout( function(){$("#myModal").modal('hide')}, 300 );
  var itemId = this.id.split("_")[1];
  getSpecificItem(itemId).then(data=>{
    var shirtSize = document.getElementById("shirtSize").value;
    var shirtQnty = document.getElementById("qnty").value.split(":")[1] ;
    console.log(shirtSize);
    console.log(shirtQnty);
    data.qty = shirtQnty;
    data.size = shirtSize;
    console.log(data);
    var updateItemUrl = "http://localhost:3004/items/"+data.id;
    updateSpecificItem(data,updateItemUrl);
  })
  $("#closeButn").click();
  
});
    $("#itemsHolder").on("click",".edit",function(event){

        console.log("edit got clicked");
    
        //console.dir(event);
        console.log(this);
        getSpecificItem(this.id).then(data=>{
            console.log(data);
           // renderModal(data);
            //document.getElementById("myModal").classList.remove("fade");
           // $("#myModal").modal("show");
           document.getElementById("shirtName").innerHTML = data.name;
           document.getElementById("price").innerHTML = data.price;
           document.getElementById("image").src = data.img;
           document.getElementById("shirtSize").value = data.size;
           document.getElementById("qnty").value = "Qty:"+data.qty;
           var updateButn = document.getElementsByClassName("updateItem");
           console.dir(updateButn);
           updateButn[0].setAttribute("id","edit_"+data.id) ;
        })
    })
}

getAllItems();

function renderModal(data){
var content = `
<div class="modal fade" id="myModal" role="dialog">
<div class="modal-dialog">

  <!-- Modal content-->
  <div class="modal-content">
    <div class="modal-header">
            <h4 class="modal-title">Modal Header</h4>
      <button type="button" class="close" data-dismiss="modal">&times;</button>
    
    </div>
    <div class="modal-body">
            <div class="container">
                    <div class="row">
                      <div class="col-sm" style="text-align: center">
                            <hr >
                            PAISEL JEAN<br>
                            $21
                            <br>
                            <br><br>
                            PAISLEY <br>
                            <select name="size">
                                    <option value="Size">Size</option>
                                    <option value="M">M</option>
                                    <option value="S">S</option>
                                  
                                  </select>
                                 <input type="number" style="width:40px; height:25px;" min=1 />
                                 <br><br> <span id="editItem"><input type="button" value="EDIT" id="" /></span>
                      </div>
                      <div class="col-sm">
                        <img src="images/shirt1.jpg" alt="">
                      </div>
                     
                    </div>
                  </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    </div>
  </div>
  
</div>
</div>
`;
document.getElementById("modalHolder").innerHTML = content;
}

