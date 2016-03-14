/*
* Created by Victor Magno on 03.14.2016 
*/

var blocksAmountInFichaComp = 8,
    blocksAmountInConcess = 4;

setEventListener();

function setEventListener(){

  var blocks = document.getElementsByClassName("mp6Code");

  for(var i=0; i < blocks.length; i++){

      blocks[i].addEventListener("paste", function(event){

        splitBarcode(event.clipboardData.getData('text/plain'), blocks);

    });
  }
}

function splitBarcode(barCode, blocks){

    var barcodeInBlocks;

    switch(blocks.length){
        case blocksAmountInConcess:
            barcodeInBlocks = splitConcessionariaBarcode(barCode);
            break;
        case blocksAmountInFichaComp:
            barcodeInBlocks = splitFichaCompensacaoBarcode(barCode);
            break;
        default:
          return "";
    }

    if(barcodeInBlocks.length > 0) {

      for (var i = 0; i < blocks.length; i++) {
        blocks[i].value = barcodeInBlocks[i];
      }
    }
}

function splitConcessionariaBarcode(barCode){

  var barcodeInBlocks = removeNonNumeric(barCode).match(/\d{12}/g);

  if(barcodeInBlocks.length == blocksAmountInConcess){
    return barcodeInBlocks;
  }
  return [];
}

function splitFichaCompensacaoBarcode(barCode){

  var lastBlockSize = 15;
  var barCodeInBlocks = removeNonNumeric(barCode).match(/(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d)(\d*)/);

  if(barCodeInBlocks){

      barCodeInBlocks = barCodeInBlocks.slice(1);

      if(barCodeInBlocks.length == blocksAmountInFichaComp &&
         barCodeInBlocks[blocksAmountInFichaComp - 1].length <= lastBlockSize) {

          if (barCodeInBlocks[blocksAmountInFichaComp - 1].length < lastBlockSize) {
              barCodeInBlocks[blocksAmountInFichaComp - 1] =
                  barCodeInBlocks[blocksAmountInFichaComp - 1] + Array(lastBlockSize - barCodeInBlocks[blocksAmountInFichaComp - 1].length).join("0");
          }
          return barCodeInBlocks;
      }

  }
  return [];
}

function removeNonNumeric(barCode){

  var barCodeOnlyNumbers = barCode.replace(/[^\d]/g, "");

  if(barCodeOnlyNumbers)
    return barCodeOnlyNumbers;

  return "";
}



