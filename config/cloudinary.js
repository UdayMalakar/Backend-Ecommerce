const cloudinary = require("cloudinary").v2; //! Cloudinary is being required
require("dotenv").config();
exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			// Configuring the Cloudinary to Upload MEDIA ########
			CLOUD_NAME: process.env.CLOUD_NAME,
			API_KEY: process.env.API_KEY,
			API_SECRET: process.env.API_SECRET,
		});
	} catch (error) {
		console.log(error);
	}
};