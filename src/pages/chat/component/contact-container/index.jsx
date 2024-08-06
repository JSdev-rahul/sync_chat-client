import React from "react";
import Logo from "../Logo"; // Assuming you have a Logo component

const contacts = [
  {
    id: "66b0ef8b4fdb7b27cd6aa588",
    firstName: "test11@gmai",
    lastName: "choudhary",
    lastSeen: "2 hours ago",
  },
  {
    id: "66b08d4864f3e5c82000920a",
    firstName: "rahul.choudhary7813",
    lastName: "Smith",
    lastSeen: "5 minutes ago",
  },
  {
    id: "66b079809ddb4fec29ed8eab",
    firstName: "test@sync",
    lastName: "testSync",
    lastSeen: "1 day ago",
  },
  { id: 4, firstName: "Alice", lastName: "Brown", lastSeen: "30 minutes ago" },
  // Add more contacts as needed
];

const ContactContainer = ({ setSelectedUser }) => {
  return (
    <div className="text-white text-opacity-90 border-b-2 p-4 flex flex-col">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center mb-4 gap-5 cursor-pointer"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
            <div className="text-lg font-semibold">VR</div>
          </div>
          <div onClick={() => setSelectedUser(contact)}>
            <div className="font-semibold">
              {contact.firstName} {contact.lastName}
            </div>
            <div className="text-sm text-gray-400">{contact.lastSeen}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactContainer;
