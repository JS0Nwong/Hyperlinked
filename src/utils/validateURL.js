function validateUrl(url) {
  return new Promise((resolve, reject) => {
    // Check if the URL is empty
    if (!url) {
      reject("Please enter a URL");
    }

    // // Check if the URL has a domain extension
    // if (
    //   !/\.(com|org|net|edu|gov|mil|int|biz|info|mobi|name|aero|asia|jobs|museum|[a-z]{2})$/i.test(
    //     url
    //   )
    // ) {
    //   reject("Invalid URL");
    // }

    // Check if the URL starts with 'http://' or 'https://'
    if (!/^https?:\/\//i.test(url)) {
      // If not, prepend 'https://'
      url = "https://" + url;
    }

    try {
      // Check if the URL already contains 'www.'
      const urlObj = new URL(url);
      if (!/^www\./i.test(urlObj.hostname)) {
        // If not, prepend 'www.' to the hostname
        urlObj.hostname = "www." + urlObj.hostname;
      }
      resolve(urlObj.toString());
    } catch (error) {
      reject(new Error("Invalid URL"));
    }

  })
}

export { validateUrl };
