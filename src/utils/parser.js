function parser(data) {
  const regex =
    /<DT><A HREF=\"(.*?)(?=\")\" ADD_DATE=\"(\d+)\".*?(?: LAST_MODIFIED=\"(\d+)\".*?|)(?: ICON_URI=\"(.*?)\"|)(?: ICON=\"(.*)\"|)(?:>([\s\S]+?))<\/A>/g;

  const links = [];
  let match;
  while ((match = regex.exec(data)) !== null) {
    links.push({
      url: match[1],
      add_date: match[2],
      icon: match[5],
      title: match[6],
    });
  }

  return links;
}

export { parser };
