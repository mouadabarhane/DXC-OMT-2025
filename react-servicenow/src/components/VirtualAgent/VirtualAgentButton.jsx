import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import VirtualAgent from './VirtualAgent'; // Assuming this component already exists

export default function VirtualAgentButton() {
  const [isVirtualAgentVisible, setVirtualAgentVisible] = useState(false);

  const toggleVirtualAgent = () => {
    setVirtualAgentVisible(!isVirtualAgentVisible);
  };

  return (
    <>
      {/* Virtual Agent Button */}
      {!isVirtualAgentVisible && (
        <button
          onClick={toggleVirtualAgent}
          className="fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-transform duration-300 flex items-center justify-center group"
          title="Need help?"
        >
          <FaRobot className="text-2xl group-hover:animate-bounce" />
        </button>
      )}

      {/* Render VirtualAgent component when the button is clicked */}
      {isVirtualAgentVisible && (
        <VirtualAgent onClose={toggleVirtualAgent} />
      )}
    </>
  );
}
