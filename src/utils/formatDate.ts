export const formatDate = (isoDateString: string) => {
    try {
      const date = new Date(isoDateString);
      if (isNaN(date.getTime())) {
        return "-";
      }
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return "-";
    }
  };
export default formatDate;