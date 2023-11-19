import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ambacyda1!",
    database: "apartment"
})

// db.connect((err) => {
//     if (err) {
//       console.error("Error connecting to the database:", err);
//     } else {
//       console.log("Connected to the database!");
//     }
// });
