var printer = require("node-thermal-printer");
    printer.init({
        type: 'epson',                                     // Printer type: 'star' or 'epson'
        interface: '/dev/usb/lp0',                        // Printer interface
        characterSet: 'SLOVENIA',                         // Printer character set
        removeSpecialCharacters: false,                   // Removes special characters - default: false
        replaceSpecialCharacters: true,                   // Replaces special characters listed in config files - default: true
        extraSpecialCharacters:{'£':163}                  // Adds additional special characters to those listed in the config files
    });
exports.printData = function(data){
    
    
      printer.isPrinterConnected( function(isConnected){ console.log(isConnected)} )     // Check if printer is connected, callback passes bool of status
    
        printer.alignCenter();
        printer.invert(true);                               // Background/text color inversion
        printer.bold(true);
        printer.setTextDoubleHeight();                      // Set text to double height
        printer.setTextDoubleWidth();                       // Set text to double width
        printer.setTextQuadArea();                          // Set text to quad area
        printer.println('  Poshwear-studio  ');
        printer.invert(false);                               // Background/text color inversion
        printer.bold(false);
        printer.setTextNormal();
        printer.newLine();
        printer.println(new Date());
        printer.newLine();
        printer.newLine();
        printer.drawLine();                                 // Draws a line                            // Underline text (1 dot thickness)
        printer.leftRight("Item", "Price");                 // Prints text left and right
        printer.drawLine();                                 // Draws a line                            // Underline text (1 dot thickness)
        printer.leftRight("Item", "Price");                 // Prints text left and right
        printer.drawLine();                                 // Draws a line                            // Underline text (1 dot thickness)
        printer.leftRight("Item", "Price");              // Draws a line                            // Underline text (1 dot thickness)
        printer.drawLine();
        printer.alignRight();                                  // Prints text left and right
        printer.println('Total : 10000');
        printer.newLine();
        printer.newLine();
        printer.alignCenter();
        printer.println('  *** developed and maintained by NerdWare Tech pvt ltd ***  ');    
        printer.partialCut();
        
      printer.execute(function(err){
          if (err) {
              console.error("Print failed", err);
            } else {
                console.log("Print done");
            }
      });
}

