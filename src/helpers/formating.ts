export const formatDate = (timestamp: number) => {
    const date = timestamp ? new Date(timestamp) : null;
    return timestamp
        ? new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
          }).format(date!)
        : null;
};
