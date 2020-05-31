var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube'];
var TOKEN_DIR = 'credentials/';//(process.env.HOME || process.env.HOMEPATH ||
    //process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

var youtube = google.youtube("v3");
var VIDEO_ID = "p3Hs76LAhiM";

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  authorize(JSON.parse(content), makeAuthCall);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannel(auth) {
  var service = google.youtube('v3');
  service.channels.list({
    auth: auth,
    part: 'snippet,contentDetails,statistics',
    forUsername: 'GoogleDevelopers'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var channels = response.data.items;
    if (channels.length == 0) {
      console.log('No channel found.');
    } else {
      console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                  'it has %s views.',
                  channels[0].id,
                  channels[0].snippet.title,
                  channels[0].statistics.viewCount);
    }
  });
}

const makeAuthCall = (auth) => {
  /* youtube.videos.list(
    {
      auth: auth,
      id: VIDEO_ID,
      part: "id,snippet,statistics",
    },
    (err, response) => {
      if (err) {
        console.log(`some shit went wrong ${err}`);
        return;
      }

      if (response.data.items[0]) {
        // We have found the video and the details
        console.log(`We found the video, now updating...`);
        updateVideoTitle(response.data.items[0], auth);
      }
    }
  ); */

  var kanVideoId = 'EKKyqF1_63M';
  var malVideoId = 'OJfa-KA5a70';
  var tamVideoId = 'zHy_LpvgFpg';
  var telVideoId = 'dW761eppWXg';
  var hinVideoId = 'WrlBJs06WZQ';

  youtube.videos.list(
    {
      auth: auth,
      id: kanVideoId,
      part: "id,snippet,statistics",
    },
    (err, response) => {
      if (err) {
        console.log(`some shit went wrong ${err}`);
        return;
      }

      if (response.data.items[0]) {
        // We have found the video and the details
        console.log(`We found the video, now updating...`);
        updateVideoTitleKan(response.data.items[0], auth);
      }
    }
  );

  youtube.videos.list(
    {
      auth: auth,
      id: malVideoId,
      part: "id,snippet,statistics",
    },
    (err, response) => {
      if (err) {
        console.log(`some shit went wrong ${err}`);
        return;
      }

      if (response.data.items[0]) {
        // We have found the video and the details
        console.log(`We found the video, now updating...`);
        updateVideoTitleMal(response.data.items[0], auth);
      }
    }
  );

  youtube.videos.list(
    {
      auth: auth,
      id: tamVideoId,
      part: "id,snippet,statistics",
    },
    (err, response) => {
      if (err) {
        console.log(`some shit went wrong ${err}`);
        return;
      }

      if (response.data.items[0]) {
        // We have found the video and the details
        console.log(`We found the video, now updating...`);
        updateVideoTitleTam(response.data.items[0], auth);
      }
    }
  );

  youtube.videos.list(
    {
      auth: auth,
      id: telVideoId,
      part: "id,snippet,statistics",
    },
    (err, response) => {
      if (err) {
        console.log(`some shit went wrong ${err}`);
        return;
      }

      if (response.data.items[0]) {
        // We have found the video and the details
        console.log(`We found the video, now updating...`);
        updateVideoTitleTel(response.data.items[0], auth);
      }
    }
  );

  youtube.videos.list(
    {
      auth: auth,
      id: hinVideoId,
      part: "id,snippet,statistics",
    },
    (err, response) => {
      if (err) {
        console.log(`some shit went wrong ${err}`);
        return;
      }

      if (response.data.items[0]) {
        // We have found the video and the details
        console.log(`We found the video, now updating...`);
        updateVideoTitleHin(response.data.items[0], auth);
      }
    }
  );
};

const updateVideoTitle = (video, auth) => {
  // get the number of views
  let views = video.statistics.viewCount;
  let likes = video.statistics.likeCount;
  let commentCount = video.statistics.commentCount;

  video.snippet.title = `This video has ${views} views, ${likes} likes and ${commentCount} comments`;

  console.log(`Updating title to ${video.snippet.title}`);

  youtube.videos.update(
    {
      auth: auth,
      part: "snippet,statistics",
      resource: video,
    },
    (err, response) => {
      console.log(response);
      if (err) {
        console.log(`There was an error updating ${err}`);
        return;
      }
      if (response.data.items) {
        console.log("Done");
      }
    }
  );
};

const updateVideoTitleKan = (video, auth) => {
  // get the number of views
  let views = video.statistics.viewCount;
  let likes = video.statistics.likeCount;
  let commentCount = video.statistics.commentCount;

  video.snippet.title = `ಈ ವೀಡಿಯೊ ಹೊಂದಿದೆ ${views} views, ${likes} likes and ${commentCount} comments`;

  console.log(`Updating title to ${video.snippet.title}`);

  youtube.videos.update(
    {
      auth: auth,
      part: "snippet,statistics",
      resource: video,
    },
    (err, response) => {
      console.log(response);
      if (err) {
        console.log(`There was an error updating ${err}`);
        return;
      }
      if (response.data.items) {
        console.log("Done");
      }
    }
  );
};

const updateVideoTitleMal = (video, auth) => {
  // get the number of views
  let views = video.statistics.viewCount;
  let likes = video.statistics.likeCount;
  let commentCount = video.statistics.commentCount;

  video.snippet.title = `ഈ വീഡിയോ ഇന് ${views} views, ${likes} likes and ${commentCount} comments`;

  console.log(`Updating title to ${video.snippet.title}`);

  youtube.videos.update(
    {
      auth: auth,
      part: "snippet,statistics",
      resource: video,
    },
    (err, response) => {
      console.log(response);
      if (err) {
        console.log(`There was an error updating ${err}`);
        return;
      }
      if (response.data.items) {
        console.log("Done");
      }
    }
  );
};

const updateVideoTitleTam = (video, auth) => {
  // get the number of views
  let views = video.statistics.viewCount;
  let likes = video.statistics.likeCount;
  let commentCount = video.statistics.commentCount;

  video.snippet.title = `இந்த வீடியோ வுக்கு ${views} views, ${likes} likes and ${commentCount} comments`;

  console.log(`Updating title to ${video.snippet.title}`);

  youtube.videos.update(
    {
      auth: auth,
      part: "snippet,statistics",
      resource: video,
    },
    (err, response) => {
      console.log(response);
      if (err) {
        console.log(`There was an error updating ${err}`);
        return;
      }
      if (response.data.items) {
        console.log("Done");
      }
    }
  );
};

const updateVideoTitleTel = (video, auth) => {
  // get the number of views
  let views = video.statistics.viewCount;
  let likes = video.statistics.likeCount;
  let commentCount = video.statistics.commentCount;

  video.snippet.title = `ఈ వీడియో ఉంది ${views} views, ${likes} likes and ${commentCount} comments`;

  console.log(`Updating title to ${video.snippet.title}`);

  youtube.videos.update(
    {
      auth: auth,
      part: "snippet,statistics",
      resource: video,
    },
    (err, response) => {
      console.log(response);
      if (err) {
        console.log(`There was an error updating ${err}`);
        return;
      }
      if (response.data.items) {
        console.log("Done");
      }
    }
  );
};

const updateVideoTitleHin = (video, auth) => {
  // get the number of views
  let views = video.statistics.viewCount;
  let likes = video.statistics.likeCount;
  let commentCount = video.statistics.commentCount;

  video.snippet.title = `इस वीडियो में ${views} views, ${likes} likes and ${commentCount} comments`;

  console.log(`Updating title to ${video.snippet.title}`);

  youtube.videos.update(
    {
      auth: auth,
      part: "snippet,statistics",
      resource: video,
    },
    (err, response) => {
      console.log(response);
      if (err) {
        console.log(`There was an error updating ${err}`);
        return;
      }
      if (response.data.items) {
        console.log("Done");
      }
    }
  );
};