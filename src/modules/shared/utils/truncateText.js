export default function truncateText(text) {
  const textWithoutSpacing = text.split(' ').join();
  const textLength = textWithoutSpacing.length;

  return textLength > 50 ? text.substr(0, 50) + '...' : text;
}
