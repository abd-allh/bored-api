// import { response } from "express"
import https from "https"

app.get("/", (req, res) => {
  const options = {
    hostname: "bored-api.appbrewery.com", // Base URL
    path: "/random", // Endpoint
    method: "GET",
  }

  const request = https.request(options, (response) => {
    let data = ""
    response.on("data", (chunk) => {
      data += chunk
    })

    response.on("end", () => {
      try {
        const result = JSON.parse(data)
        res.render("index.ejs", { activity: data })
      } catch (error) {
        console.error("Field to parse response:", error.message)
        res.status(500).send("Failed to fetch activity. Please try again.")
      }
    })
  })

  request.on("error", (error) => {
    console.error("Field to make request:", error.message)
    res.status(500).send("Failed to fetch activity. Please try again.")
  })

  request.end()
})

/*********** Axios ***********/

import axios from "axios"

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random")
    res.render("index.ejs", { activity: response.data })
  } catch (error) {
    console.error("Field to make request:", error.message)
    res.status(500).send("Failed to fetch activity. Please try again.")
  }
})
