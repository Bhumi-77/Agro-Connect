// Very simple Nepali calendar-based seasonal mapping (placeholder)
export function getSeasonalTags(cropName, monthIndex /* 0-11 */) {
  const m = monthIndex + 1;
  const tags = [];
 if (['cauliflower','cabbage','radish'].includes(cropName.toLowerCase()) && (m >= 10 || m <= 2)) { {
    tags.push('winter');
  }
  if (['mango','litchi','cucumber'].includes(cropName.toLowerCase()) && (m>=4 && m<=7)) {
    tags.push('summer');
  }
  return tags;
}
}