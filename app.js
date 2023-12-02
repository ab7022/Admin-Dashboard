const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const dotenv = require("dotenv")
const router = express.Router()
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");
app.use(express.json());
dotenv.config({
  path:"./data/config.env"
})
//hola
app.get("/a",(req,res) {

  res.render("index")
})
app.get("/", (req, res) => {
  http
    .get(
      "http://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
      (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            const members = JSON.parse(data);
            members.forEach(member => {
              names = member.name
              ids = member.id
              emails = member.email
              roles = member.role
            });
            const page = parseInt(req.query.page) || 1;
            const pageSize = 10; 
            const startIdx = (page - 1) * pageSize;
            const endIdx = startIdx + pageSize;
            const paginatedMembers = members.slice(startIdx, endIdx);
            const totalPages = Math.ceil(members.length / pageSize);

            res.render("index", {
              members: paginatedMembers,
              currentPage: page,
              totalPages: totalPages,
            });
          } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
          }
        });
      }
    )
    .on("error", (error) => {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    });
});
// app.use("/.netlify/functions/api",router)
// // app.listen(3000);
// module.exports.handler = serverless(app) 
app.listen(process.env.PORT,() =>{
  console.log(`server is running on ${process.env.PORT}`)
})