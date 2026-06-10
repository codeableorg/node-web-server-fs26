export function parseUrlEncoded(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // body: "name=Carlos&email=carlos%40mail.com&message=Hola+%28%3A"

    req.on("end", () => {
      try {
        const params = new URLSearchParams(body);
        const result = Object.fromEntries(params);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (err) => reject(err));
  });
}
