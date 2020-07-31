import * as fs from "fs";

const getProxyUrl = async () => {
    const proxies: string[] = await ((): Promise<string[]> => {
        return new Promise(res => {
            fs.readFile("proxies.txt", "utf8", (err, data: string) => {
                if (err) throw err;
                res(data.split("\n"));
            })
        })
    })();
    return proxyToUrl(proxies[Math.floor(Math.random() * proxies.length)]);
}

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
}

export default getProxyUrl;
