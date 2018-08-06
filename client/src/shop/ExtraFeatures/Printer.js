var qz = require("qz-tray");
var config = qz.configs.create("zebra1");

exports.printData = function(bill,sale){
    
    
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
        'THE FILLI',
        '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1D' + '\x21' + '\x00', // standard font size
        
        '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
        '\x0A' + '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        '------------------------------------------' + '\x0A',
        bill.map((item)=>{
            return (
                item.item_name
                +'     '
                +item.retail_price+'\x0A'
                +'------------------------------------------\x0A' )}) + '\x0A',
        'Total:    '+sale,
        '\x0A',
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        'Thank You for visting us',
        '\x0A',
        '\x1B' + '\x61' + '\x31', // left align
        '\x1B' + '\x4D' + '\x31', // small text
        '\x0A',
        'POWERED BY X-ZONE',
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

