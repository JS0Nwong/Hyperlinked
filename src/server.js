import puppeteer from "puppeteer";

const isValidUrl = (url) => {
  // Regular expression to check if the URL starts with https:// or www.
  const regex = /^(https:\/\/|www\.)/i;
  return regex.test(url);
};

const fetchSitePreview = async(url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  await page.screenshot()
  await browser.close()
}

const fetchMetadata = async (url) => {
  const res = await fetch(url);
  const html = await res.text();
  const favIcon = await fetch(
    `http://www.google.com/s2/favicons?domain=${url}`
  );

  const metaData = {
    favIcon: favIcon.url,
    link: url,
  };
  const metaTagRegex = /<meta[^>]+>/gi;
  const matches = html.match(metaTagRegex) || [];
  const match = html.match(/<title>([^<]*)<\/title>/i);
  const titleMatch = match ? match[1] : "No title found";

  matches.forEach((tag) => {
    const nameMatch = tag.match(/name=["']([^"']+)["']/i);
    const propertyMatch = tag.match(/property=["']([^"']+)["']/i);
    const contentMatch = tag.match(/content=["']([^"']+)["']/i);

    console.log(contentMatch)
    if (contentMatch) {
      const name = nameMatch
        ? nameMatch[1]
        : propertyMatch
        ? propertyMatch[1]
        : null;
      const content = contentMatch[1];

      if (name) {
        metaData[name] = content;
      }
      metaData['title'] = titleMatch
    }
  });
  console.log(metaData)
  return metaData
};

const server = Bun.serve({
  port: 8000,
  fetch: async (req) => {
    const url = new URL(req.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("URL parameter is required", { status: 400 });
    }

    if (!isValidUrl(targetUrl)) {
      return new Response(
        "Invalid URL. URL must start with 'https://' or 'www.'",
        { status: 400 }
      );
    }

    try {
      const metadata = await fetchMetadata(targetUrl);
      return new Response(JSON.stringify(metadata), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Allow any origin
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific methods
          "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
        },
      });
    } catch (error) {
      return new Response("Failed to fetch metadata", { status: 500 });
    }
  },
});

console.log(`Listening on ${server.url}`);
