const ValkyrieRoutes = {
    shipementsView: /\/app\/api\/shipments\/.*/,
    tripsView: /\/app\/api\/trip\/\?status=.*/,
    waybillsView: /\/app\/api\/shipping-labels\/.*/,
    ExpressHubShipments: /\/app\/api\/express-hub\/shipments\/.*/,
    ExppressHubRiders: /\/app\/api\/express-hub\/riders\/.*/,
    overrideStatus: /\/app\/api\/valkyrie\/status\/.*/,
    shipmentLogs: /\/app\/api\/shipment\/logs\/\?shipment_id=\d+/,
    shipmentdetails: /\/app\/api\/items\/details\/\?shipment_id=.*/,
}

module.exports = ValkyrieRoutes;