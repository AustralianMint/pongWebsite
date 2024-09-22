// Contains core of express app.
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express ();

//Serve static files from the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

//Helper function to read the current image from data.json

function getCurrentImage() {
	const data = fs.readFileSync('data.json');
	const parsedData = JSON.parse(data);
	return parsedData.currentImage;
}

//Helper function to update teh current image in data.json
function setCurrentImage(image) {
	const data = {currentImage: image};
	fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

//route for the homepage.
app.get('/', (req, res) => {
	const winnerImage = getCurrentImage();
	res.send(`
		<html>
			<head>
				<title> Ping Pong loser  </title>
			</head>
			<body>
				<h1> He is gei </h1>
				<img src="${winnerImage}" alt="Winner Picture" style="width:300px;height:300px;">
			</body>
		</html>
		`);
	});

//route for the admin page.
app.get('/admin', (req, res) => {
	const currentImage = getCurrentImage();

	//Toggle between thomasLoser.png and mikelLoser.png
	const newImage = currentImage === 'thomasLost.png' ? 'mikelLost.png' : 'thomasLost.png';
	
	//Update the current image
	setCurrentImage(newImage);

	//Notify the admin that the image has been updated
	res.send(`
		<html>
			<head>
				<title>Admin - Change Winner</title>
			</head>
			<body>
				<h1> Loser Changed </h1>
				<p> The new loser is now displayed. </p>
				<a href="/">Go Back to Home</a>
			</body>
		</html>
	`);
});


//Start the server
const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
