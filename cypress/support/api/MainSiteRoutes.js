const MainSiteRoutes = {
    STAGING: {
        token: 'https://zorms.zfwhospitality.in/api/1/mainsite/token',
        createShipment: 'https://zorms.zfwhospitality.in/api/1/mainsite/shipment/create'
    },
    PROD: {
        token: 'https://zorms.zippee.delivery/api/1/mainsite/token',
        createShipment: 'https://zorms.zippee.delivery/api/1/mainsite/shipment/create'
    },
    PREPROD: {
        token: 'https://preprod.zorms.zfwhospitality.in/api/1/mainsite/token',
        createShipment: 'https://preprod.zorms.zfwhospitality.in/api/1/mainsite/shipment/create'
    }
};

module.exports = MainSiteRoutes;
