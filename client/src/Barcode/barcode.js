import barcodeGenerator from 'pdf417';

function generateBarcode(data){
    return barcodeGenerator(data, 2, 1);
}

export default generateBarcode;