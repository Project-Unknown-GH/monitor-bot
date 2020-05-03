// @ts-nocheck

// Sorry about ts-nochecking, but this is a module file that I had to make some edits to

const request = require('request').defaults({
    //timeout: 30000
});
const cheerio = require("cheerio");
const fs = require("fs")

const apiUrl = 'http://www.supremenewyork.com';

String.prototype.capitalizeEachWord = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

const getItems = (category, callback) => {

    let getURL = apiUrl + '/shop/all/' + category;
    if (category == 'all') {
        getURL = apiUrl + '/shop/all';
    } else if (category == 'new') {
        getURL = apiUrl + '/shop/new';
    }

    console.log(`Requesting: ${getURL}`);

    request({headers: {Origin: "https://cors-anywhere.herokuapp.com/https://www.supremenewyork.com/shop/all/"}, uri: getURL}, (err, resp, html) => {

        if (!err) {
            if (err) {
                console.log('err');
                return callback(`No response from website: ${err}`, null);
            } else {
                var $ = cheerio.load(html);
                console.log(`Site responded:`, resp._httpMessage );
                fs.writeFile("lehtml.html", html, (err) => {
                    if (err) throw err;
                })
            }

            let count = $('img').length;
            console.log(`Amount: ${count}`);

            if ($('.shop-closed').length > 0) {
                return callback('Store Closed', null);
            } else if (count === 0) {
                return callback('No imagse', null);
            }

            const parsedResults = [];

            // console.log(len);
            $('img').each(function(i, element) {
                // console.log("i: " + i, this.parent);
                const nextElement = $(this).next();
                const prevElement = $(this).prev();
                const image = "https://" + $(this).attr('src').substring(2);
                const title = $(this).attr('alt');
                let availability = nextElement.text().capitalizeEachWord();
                const link = apiUrl + this.parent.attribs.href;
                let sizesAvailable;

                // console.log(`Link: ${link}`, this.parent.attribs)

                if (availability == "") availability = "Available";

                request(link, function(err, resp, html, rrr, body) {

                    if (err) {
                        return callback(`No response from website: ${err}`, null);
                    } else {
                        var $ = cheerio.load(html);
                    }

                    let addCartURL = apiUrl + $('form[id="cart-addf"]').attr('action');

                    if (availability == "Sold Out") {
                        addCartURL = null;
                    }

                    const sizeOptionsAvailable = [];
                    if ($('option')) {
                        $('option').each(function(i, elem) {
                            const size = {
                                id: parseInt($(this).attr('value')),
                                size: $(this).text(),
                            };
                            sizeOptionsAvailable.push(size);
                        });

                        if (sizeOptionsAvailable.length > 0) {
                            sizesAvailable = sizeOptionsAvailable
                        } else {
                            sizesAvailable = null
                        }
                    } else {
                        sizesAvailable = null;
                    }

                    const priceRaw = $('.price')[0];
                    const price = priceRaw ? parseInt((priceRaw.children[0].children[0].data).replace('$', '').replace(',', '')) : NaN;

                    const metadata = {
                        title: $('#img-main').attr('alt'),
                        style: $('.style').attr('itemprop', 'model').text(),
                        link: link,
                        description: $('.description').text(),
                        addCartURL: addCartURL,
                        price: price,
                        image: image,
                        sizesAvailable: sizesAvailable,
                        images: [],
                        availability: availability,
                    };

                    // Some items don't have extra images (like some of the skateboards)
                    if ($('.styles').length > 0) {
                        const styles = $('.styles')[0].children;
                        for (const li in styles) {
                            for (const a in styles[li].children) {
                                if (styles[li].children[a].attribs['data-style-name'] == metadata.style) {
                                    metadata.images.push('https:' + JSON.parse(styles[li].children[a].attribs['data-images']).zoomed_url)
                                }
                            }
                        }
                    } else if (title.indexOf('Skateboard') != -1) {
                        // Because fuck skateboards
                        metadata.images.push('https:' + $('#img-main').attr('src'))
                    }

                    parsedResults.push(metadata);

                    if (!--count) {
                        callback(parsedResults, null);
                    }

                })

            });
        } else {
            return callback(`No response from website: ${err}`, null);
        }
    });
};

const watchAllItems = (interval, category, callback) => {
    console.log('Now watching for all items');
    const watchOnAllItems = setInterval(function() {
        getItems(category, function(items) {
            callback(items, null);
        });
    }, 1000 * interval); // Every xx sec
};

export { getItems, watchAllItems }
