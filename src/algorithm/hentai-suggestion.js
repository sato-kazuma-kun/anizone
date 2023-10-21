"use server"

import { hentaiDataAPI } from '@/api/api'
// import userDataAPI from '@/api/api'

const userDataAPI = "https://aniflex-beta.vercel.app/test-json/user-pref.json"

var hentai = []
var userPreferences = []

async function fetchHentai() {
    const datas = await hentaiDataAPI();
    hentai = datas;
}

async function fetchUserPreferences() {
    try {
        const response = await fetch(userDataAPI);
        if (!response.ok) {
            throw new Error("Failed to fetch user preferences");
        }

        const data = await response.json();
        userPreferences = data
    } catch (error) {
        console.error("Error fetching user preferences:", error);
    }
}

// async function fetchUserPreferences() {
//     const datas = await userDataAPI()
//     userPreferences = datas
//     calcUserPref();
// }

export async function calcUserPref() {
    await fetchHentai();
    await fetchUserPreferences();
    console.log("Function called!")
    console.log("hentai:", hentai, "\n", "User pref:", userPreferences)

    if (hentai.length === 0 || userPreferences.length === 0) {
        // Wait until both data sets are fetched
        return;
    }

    var suggestions = [];

    for (var i = 0; i < hentai.length; i++) {
        var hentaiGenres = hentai[i].genre;

        for (var j = 0; j < userPreferences.length; j++) {
            var userPrefGenre = userPreferences[j].genre;
            if (hentaiGenres.includes(userPrefGenre)) {
                suggestions.push(hentai[i]);
                break; // Break the loop once a match is found
            }
        }
    }

    // Shuffle the suggestions
    shuffleArray(suggestions);

    console.table(suggestions)
    return (suggestions);
}

// Function to shuffle an array in place
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}