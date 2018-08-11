var qz = require("qz-tray");
var config = qz.configs.create("Farhan");

exports.printData = function(items,bill,discount,retrn){
    
    
    var date = new Date();
    var data = [
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x4D' + '\x31', // small text
        date + '\x0A'+'\x0A','\x0A',
        '\x1B' + '\x61' + '\x31', 
        '\x1B' + '\x4D' + '\x30', // normal text
        '\x1D' + '\x21' + '\x11', // double font size
        '\x1B' + '\x45' + '\x0D', // bold on
        'PSOHWEAR STUDIO',
        '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1D' + '\x21' + '\x00', // standard font size
        
        '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
        '\x1B' + '\x61' + '\x30', // left align
        '\x1B' + '\x45' + '\x0D', // bold on
        'Store Name :',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        'Al-Rehman Center Multan Road Burewala',
        '\x0A',
        '\x1B' + '\x45' + '\x0D', // bold on
        'Store ID : ',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '61010',
        '\x0A' + '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        'Name'+'                          '+'price',
        '\x0A',
        '------------------------------------------' + '\x0A',
        items.map((item)=>{
            return (
                item.item_name
                +'                          '
                +item.price+'\x0A'
                 )}) + '\x0A',
        '------------------------------------------' + '\x0A',
        '\x0A','\x0A',
        '   Total'+'                          '+bill,
        '\x0A',
        'Discount'+'                          '+discount,
        '\x0A',
        '\x1B' + '\x45' + '\x0D', // bold on
        'New Bill'+'                          '+retrn,
        '\x1B' + '\x45' + '\x0A', // bold off
        
        '\x0A',
        '\x0A',
        '\x0A',

        '\x1B' + '\x45' + '\x0D', //bold on
        '\x1B' + '\x61' + '\x31', // center align
        'TERMS & CONDITIONS',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        //'Thank You for visting us',
        '1- Please Note that the products purchased are ',
        '\x0A',
        'Non-Refundable.',
        '\x0A',
        '2- You may exchange the product within 7 days of purchase only on presenting original sales',
        '\x0A',
        'invoice.',
        '\x0A',
        '3- Exchange will be entertained at the current price only',
        '\x0A',
        '4- Exchange/Replacement of the product purchased during SALE or used/Damaged when brought in ',
        '\x0A',
        'will not be entertained.',
        '\x0A',
        '5- Claims of defective articles can be entertained only within 30 Days of purchase on showing the original sales invoice',
        '\x0A',
        '6- Company decision regarding claims with respect to repair or replacement will be final.',
        '\x0A',
        '\x0A',
        '\x1B' + '\x45' + '\x0D', //bold on
        '\x1B' + '\x61' + '\x31', // center align
        'THANK YOU FOR SHOPPING',
        '\x0A',
        '\x1B' + '\x61' + '\x31', // center align
        '---CUSTOMER CARE CONTACT---',
        '\x0A',
        '\x1B' + '\x61' + '\x31', // center align
        '0321-7010930',
        '\x1B' + '\x45' + '\x0A', //bold off
        '\x0A',
        '\x1B' + '\x61' + '\x31', // left align
        '\x1B' + '\x4D' + '\x31', // small text
        '\x0A',
        'POWERED BY NERDWARE TECH Pvt. Ltd',
        '\x0A',
        'Contact #03038126439  03327074327',
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
     ];
    // Start promise chain
    
    qz.websocket.connect().then(function() {
       return qz.printers.find();
    }).then(function(printers) {
        console.log(printers);
        return qz.print(config, data).catch(function(e) { console.error(e); });
    });
}

