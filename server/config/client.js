import ftp from "ftp";

const client = new ftp();

client.on("ready", () => {
  client.socket.setTimeout(0);
  console.log("Connected to Hostinger FTP server");
});

client.on("error", (err) => {
  console.error("FTP error:", err);
});

export default client;
