import { toast } from "@/components/ui/use-toast"; // Adjust import path as needed

// Define icons for different toast types
const icons = {
  success: "✔️", // Or use an icon component if available
  error: "❌",
  info: "ℹ️",
};

// Define a function to show toast notifications with different types
const showToast = (type, title, description) => {
  console.log(type, title, description);
  const icon = icons[type] || ""; // Default to no icon if type is not recognized

  toast({
    title: title || "Notification",
    description: description || "An event occurred",
    icon: icon, // Include the icon
    style: {
      backgroundColor: type == "success" ? "#4caf50" : type == "error" ? "#f44336" : "#2196f3", // Example colors
      color: "#fff",
    },
    duration: 1500, // 30 seconds

  });
};

export default showToast;
