import axios from "axios";

const getProxyUrl = async () => {
    const response = await axios({
        method: "GET",
        url: "https://api.projectunkn.com/api/proxies/"
    });
    const proxies = response.data.map((l: {proxy: string}) => l.proxy);
    return proxyToUrl(proxies[Math.floor(Math.random() * proxies.length)]);
}

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
}

export default getProxyUrl;
