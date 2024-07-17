import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import ActionMenu from './ActionMenu'; // Ensure you import ActionMenu from the correct path

// Define a styled component for the SpeedDial
const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439;
    &:hover {
      background-color: #440080;
    }
  }
`;

const MyComponent = ({ row, actions }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileDevice);
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Initialize the value on the first render
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <ActionMenu row={row} actions={actions} />
      ) : (
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction="right"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </StyledSpeedDial>
      )}
    </>
  );
};

export default MyComponent;
