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

      document.getElementsByClassName("btn_center")[0].focus();
    }
}

function splitConcessionariaBarcode(barCode){

  var barcodeInBlocks,
      patternConcessionaria = /\d{12}/g;

  barcodeInBlocks = removeNonNumeric(barCode).match(patternConcessionaria);

  if(barcodeInBlocks.length == blocksAmountInConcess){
    return barcodeInBlocks;
  }
  return [];
}

function splitFichaCompensacaoBarcode(barCode){

  var barCodeInBlocks,
      lastBlockSize = 15;
      lastIndex = blocksAmountInFichaComp - 1,
      patternFichaCompensacao = /(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d)(\d*)/;

  barCodeInBlocks = removeNonNumeric(barCode).match(patternFichaCompensacao);

  if(barCodeInBlocks){

      //Getting only the groups
      barCodeInBlocks = barCodeInBlocks.slice(1);

      if(barCodeInBlocks.length == blocksAmountInFichaComp &&
         barCodeInBlocks[lastIndex].length <= lastBlockSize) {

          if (barCodeInBlocks[lastIndex].length < lastBlockSize) {
              barCodeInBlocks[lastIndex] += Array(lastBlockSize - barCodeInBlocks[lastIndex].length).join("0");
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
