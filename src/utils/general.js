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
