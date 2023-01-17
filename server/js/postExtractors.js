// handle extracting hashtags or mentions of posts

function extractHashtags(text) {
  const hashtags = [];
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (words[i].startsWith('#')) {
      hashtags.push(words[i].slice(1, words[i].length));
    }
  }
  return hashtags;
}

function extractMentions(text) {
  const hashtags = [];
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (words[i].startsWith('@')) {
      hashtags.push(words[i].slice(1, words[i].length));
    }
  }
  return hashtags;
}

module.exports = {
  extractHashtags,
  extractMentions
}