export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-300";
    case "in progress":
      return "bg-blue-300";
    case "cancelled":
      return "bg-red-300";
    default:
      return "bg-orange-300";
  }
};

export const capitalizeString = (text) => {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
};

export const ITEM_PER__PAGE = 20; //Maximu number of services items to be fetched from API at a go
