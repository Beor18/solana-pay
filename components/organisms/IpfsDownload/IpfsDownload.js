import { Box } from '@chakra-ui/react'
import React from 'react'
import useIPFS from '../../../hooks/useIPFS'

const IPFSDownload = ({ hash, filename }) => {
  const file = useIPFS(hash, filename)

  return (
    <Box pt={2}>
      {file ? (
        <div className="download-component">
          <a className="download-button" href={file} download={filename}>
            Print Ticket (?)
          </a>
        </div>
      ) : (
        <p>Downloading file...</p>
      )}
    </Box>
  )
}

export default IPFSDownload
