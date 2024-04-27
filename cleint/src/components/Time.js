export const calculateTimePassed = (timestamp) => {
  const currentTime = new Date();
  const uploadTime = new Date(timestamp);
  const difference = Math.abs(currentTime - uploadTime);
  const minutes = Math.floor(difference / 60000);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else {
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(hours / 24);
      if (days === 1) {
        return `${days} day ago`;
      } else {
        return `${days} days ago`;
      }
    }
  }
};