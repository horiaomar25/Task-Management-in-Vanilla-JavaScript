import { app }  from "../server/app.js"



const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
