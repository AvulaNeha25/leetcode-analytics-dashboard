const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/leetcode/:username", async (req, res) => {
    const username = req.params.username;

    const query = {
        query: `
        query userSessionProgress($username: String!) {
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
        }
        `,
        variables: { username }
    };

    try {
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });

        const result = await response.json();

        const stats = result.data.matchedUser.submitStats.acSubmissionNum;

        const easy = stats.find(s => s.difficulty === "Easy").count;
        const medium = stats.find(s => s.difficulty === "Medium").count;
        const hard = stats.find(s => s.difficulty === "Hard").count;

        res.json({
            easy,
            medium,
            hard,
            total: easy + medium + hard
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});