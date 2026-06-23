const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

dns.resolveSrv(
    '_mongodb._tcp.stdentsdetails.qoj4ma8.mongodb.net',
    (err, addresses) => {
        if (err) {
            console.error(err);
        } else {
            console.log(addresses);
        }
    }
);