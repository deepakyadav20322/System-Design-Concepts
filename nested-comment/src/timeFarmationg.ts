export const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, "minute");
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return rtf.format(-diffInHours, "hour");
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return rtf.format(-diffInDays, "day");
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return rtf.format(-diffInMonths, "month");
  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(-diffInYears, "year");
};

//   // Example Usage
//   console.log(getRelativeTime("2024-06-16T10:00:00Z"));
