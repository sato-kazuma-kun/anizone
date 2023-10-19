import { animeDataAPI } from '@/api/api'
// import userDataAPI from '@/api/api'

var animes = []
var userPreferences = []

async function fetchAnimes() {
    const datas = await animeDataAPI();
    animes = datas;
    calcUserPref();
}

function fetchUserPreferences() {
    fetch('/test-json/user-pref.json')
        .then(response => response.json())
        .then(data => {
            userPreferences = data;
            calcUserPref();
        })
        .catch(error => {
            console.error('Error fetching user preferences:', error);
        });
}

// function fetchUserPreferences() {
//     const datas = userDataAPI()
//     userPreferences = datas
//     calcUserPref();
// }

export async function calcUserPref() {
    await Promise.all([fetchAnimes(), fetchUserPreferences()]);

    if (animes.length === 0 || userPreferences.length === 0) {
        // Wait until both data sets are fetched
        return;
    }

    var suggestions = [];

    for (var i = 0; i < animes.length; i++) {
        var animeGenres = animes[i].genre;

        for (var j = 0; j < userPreferences.length; j++) {
            var userPrefGenre = userPreferences[j].genre;
            if (animeGenres.includes(userPrefGenre)) {
                suggestions.push(animes[i]);
                break; // Break the loop once a match is found
            }
        }
    }

    // Shuffle the suggestions
    shuffleArray(suggestions);

    console.table(suggestions)
    return(suggestions);
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
