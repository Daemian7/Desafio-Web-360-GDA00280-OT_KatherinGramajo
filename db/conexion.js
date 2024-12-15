const sql = require("msnodesqlv8");

const connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-FQPU69F;Database=Tienda_GDA00280_OT_KatherinGramajo;Trusted_Connection=Yes;Encrypt=yes;TrustServerCertificate=yes;";

module.exports = {
    query: (query, params = [], callback) => {
        sql.query(connectionString, query, params, callback);
    },
};
