const dataService = require( '../services/dataService' );

module.exports = () => {
    const dataController = new Object();

    const save = ( method, req, res, next ) => {

        const data = req.body;
        data.userId = parseInt( req.decodedToken.sub );

        method( req.body )
            .then( result => {
                return res.json( result );
            } )
            .catch( err => {
                return next( err );
            } );
    };

    const get = ( method, filter, req, res, next ) => {

        method( filter )
            .then( data => {
                return res.json( data );
            } )
            .catch( err => {
                if ( err.name === 'DocumentNotFoundError' ) {
                    return res.json( {} );
                } else {
                    return next( err );
                }
            } );
    };

    const lPad = ( number, width, z ) => {
        z = z || '0';
        number = number + '';
        return number.length >= width ? number : new Array( width - number.length + 1 ).join( z ) + number;
    };

    // FavoriteBusLines
    dataController.saveFavoriteBusLines = ( req, res, next ) => {
        save( dataService().saveFavoriteBusLines, req, res, next );
    };

    dataController.getFavoriteBusLines = ( req, res, next ) => {
        get( dataService().getFavoriteBusLines, parseInt( req.decodedToken.sub ), req, res, next );
    };

    // Settings
    dataController.saveSettings = ( req, res, next ) => {
        save( dataService().saveSettings, req, res, next );
    };

    dataController.getSettings = ( req, res, next ) => {
        get( dataService().getSettings, parseInt( req.decodedToken.sub ), req, res, next );
    };

    // Vehicles
    dataController.saveVehicles = ( req, res, next ) => {
        save( dataService().saveVehicles, req, res, next );
    };

    dataController.getVehicles = ( req, res, next ) => {
        get( dataService().getVehicles, parseInt( req.decodedToken.sub ), req, res, next );
    };

    // FavoriteSepProtocol
    dataController.saveFavoriteSepProtocol = ( req, res, next ) => {
        save( dataService().saveFavoriteSepProtocol, req, res, next );
    };

    dataController.getFavoriteSepProtocol = ( req, res, next ) => {
        get( dataService().getFavoriteSepProtocol, parseInt( req.decodedToken.sub ), req, res, next );
    };

    dataController.getUsersByFavoriteSepProtocol = ( req, res, next ) => {
        const lpadNumber = lPad( req.params.number, 8 );
        get( dataService().getUsersByFavoriteSepProtocol, lpadNumber, req, res, next );
    };

    return dataController;
};
