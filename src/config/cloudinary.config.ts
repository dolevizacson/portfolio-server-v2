import { ConfigOptions } from 'cloudinary';

export default (): { cloudinaryConfigOptions: ConfigOptions } => ({
  cloudinaryConfigOptions: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  },
});
