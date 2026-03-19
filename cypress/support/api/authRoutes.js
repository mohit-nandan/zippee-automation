const AuthRoutes = {
    STAGING: {
        login: "https://api.zfwhospitality.in/api/1/auth/login/"
    },
    PROD: {
        login: "https://backend.zippee.delivery/api/1/auth/login/"
    },
    PREPROD: {
        login: "https://preprod.api.zfwhospitality.in/api/1/auth/login/"
    }
};

module.exports = AuthRoutes;
