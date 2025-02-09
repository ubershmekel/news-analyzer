import { Storage } from "@google-cloud/storage";
import path from "path";

// Initialize storage client
const storage = new Storage({
  keyFilename: path.join(__dirname, "secrets-gcp.json"), // Or set GOOGLE_APPLICATION_CREDENTIALS env variable
});

// Function to upload a file to GCP bucket
async function uploadFile(
  bucketName: string,
  filePath: string,
  destinationFileName?: string
) {
  try {
    const bucket = storage.bucket(bucketName);
    const fileName = destinationFileName || path.basename(filePath);

    await bucket.upload(filePath, {
      destination: fileName,
      // resumable: true,
      // gzip: true, // Compress file
      metadata: {
        cacheControl: "public, max-age=60",
      },
    });

    console.log(`File ${filePath} uploaded to ${bucketName} as ${fileName}`);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

// Usage example
// const bucketName = "your-bucket-name";
// const localFilePath = "./example.txt"; // Path to the file
// uploadFile(bucketName, localFilePath);
export async function uploadNewsJson() {
  const bucketName = "uberbuck/";
  const localFilePath = "./data/news.json"; // Path to the file
  await uploadFile(bucketName, localFilePath, "news-analyzer/news.json");
}

if (require.main === module) {
  uploadNewsJson();
}
