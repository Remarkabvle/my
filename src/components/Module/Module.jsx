import React from "react";
import { IoMdClose } from "react-icons/io";
import { Box, IconButton } from "@mui/material";

const Module = ({ children, width, close, bg }) => {
  return (
    <>
      <Box
        onClick={() => close(false)}
        sx={{
          backgroundColor: bg,
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: 0,
          animation: 'overlay 0.3s forwards',
          cursor: 'pointer',
          '@keyframes overlay': {
            to: { opacity: 1 },
          },
        }}
      ></Box>

      <Box
        sx={{
          width: width,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -80%) scale(0.9)',
          borderRadius: 1,
          padding: 3,
          backgroundColor: '#fff',
          opacity: 0,
          animation: 'model 0.3s forwards',
          overflow: 'auto',
          zIndex: 200,
          '@keyframes model': {
            to: { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 1 },
          },
        }}
      >
        <IconButton onClick={() => close(false)} sx={{ position: 'absolute', top: 1, right: 1 }}>
          <IoMdClose />
        </IconButton>
        {children}
      </Box>
    </>
  );
};

export default Module;
