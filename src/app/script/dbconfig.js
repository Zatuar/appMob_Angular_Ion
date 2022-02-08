module.exports = {
user : process.env.NODE_ORACLEDB_USER || "TEST",

password : process.env.NODE_ORACLEDB_PASSWORD || "PST4",

connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/xe",

externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};