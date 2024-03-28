const cloudinary = require("cloudinary").v2; //! Cloudinary is being required
require("dotenv").config();


exports.cloudinaryConnect = () => {
	try {
		
		cloudinary.config({
			// Configuring the Cloudinary to Upload MEDIA ########
			
			cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
		});
		//console.log(cloud_name,api_key,api_secret)
	} catch (error) {
		console.log("BABBA KA DABHAA",process.env.CLOUD_NAME);
		console.log("jajajjjjjjjjjj",error);
	}
};