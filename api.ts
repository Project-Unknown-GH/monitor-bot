const supreme = require("supreme-api");
const fs = require('fs');

supreme.getItems('all', (items, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(items.length);
    fs.writeFile("items.json", JSON.stringify(items), (err) => {
        if (err) throw err;
        console.log("File written!");
    });
});

// supreme.getItem('http://www.supremenewyork.com/shop/jackets/fman5r0xy/aw5dopam2', (item, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(item);
// });

// check every 5 seconds
// supreme.watchAllItems(5, 'shoes', (items, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(items);
// });
//
// // Cancel Item watch
// supreme.stopWatchingAllItems((status, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(status);
// });

// Look for a new item every 5 seconds
// supreme.onNewItem(5, (product, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log('New Release: ' + item.name);
// });

// Find items based on specific keywords

// const category = 'jackets';
// const keywords = "UNDERCOVER";
// const style = 'Burgundy';
//
// supreme.seek(category, keywords, style, (product, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(product);
//     console.log(product.title); // example => Supreme®/UNDERCOVER Wool Overcoat
// });
