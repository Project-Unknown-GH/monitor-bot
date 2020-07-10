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

const getShopData = (proxy: string) => {
    return new Promise ((res, rej) => {
        const url = `${apiUrl}/shop.json`;
        request({
            url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
                Connection: "keep-alive"
            },
            proxy: proxy
        }, (err, resp) => {
	    if (err) { rej(err) };
	    const data = JSON.parse(resp.body);
	    res(Object.values(data["products_and_categories"]).flat())
	});
    })
}

const getItems = async (category, proxy, callback) => {
    console.log("Proxy: ", proxy);

    let getURL = apiUrl + '/shop/all/' + category;
    if (category == 'all') {
        getURL = apiUrl + '/shop/all';
    } else if (category == 'new') {
        getURL = apiUrl + '/shop/new';
    }

    const shopData = await getShopData(proxy);

    console.log(`Requesting: ${getURL}`);

    request({
        url: getURL,
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
            Connection: "keep-alive"
        },
        proxy: proxy
    }, (err, resp, html) => {
        if (!err) {
            if (err) {
                console.log(err);
                return callback(`No response from website: ${err}`, null);
            } else {
                var $ = cheerio.load(html);
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

                request({
                    url: link,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
                        Connection: "keep-alive"
                    },
                    proxy: proxy
                }, function(err, resp, html, rrr, body) {

                    if (err) {
                        console.log(err);
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

                    // const priceRaw = $('.price')[0];
                    // const price = priceRaw ? parseInt((priceRaw.children[0].children[0].data).replace('$', '').replace(',', '')) : NaN;

		    const imageEnding = image.split("/")[image.split("/").length - 1];

                    const data = html.split('$("title").html')[1].slice(2, html.split('$("title").html')[1].length - 3).split("Supreme: ")[1];

		    const price = shopData.find(l => {
			    const lEnding = l["image_url"].split("/")[l["image_url"].split("/").length - 1];
			    //console.log(`${l.name.toLowerCase().trim()}|${data.split("-")[0].toLowerCase().trim()}`);
			    return lEnding === imageEnding || l.name.toLowerCase().trim() === data.split("-")[0].toLowerCase().trim();
		    })?.price;


                    const metadata = {
                        title: data.split("-")[0],
                        style: data.split("-")[1],
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
            console.log(err);
            console.log("pooa")
            return callback(`No response from website: ${err}`, null);
        }
    });
};

export { getItems }
