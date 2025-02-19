// src/components/LoyalMembers.jsx
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box,
  Typography
} from '@mui/material';

export default function LoyalMembers({ setShowMembers, handleClear }) {
  const submissions = JSON.parse(sessionStorage.getItem('loyaltySubmissions') || '[]');

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: '70vh',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Table stickyHeader aria-label="loyal members table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                backgroundColor: 'primary.main', 
                color: 'common.white' 
              }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'common.white' }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'common.white' }}>
                Membership
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'common.white' }}>
                Country
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'common.white' }}>
                Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No loyal members found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission, index) => (
                <TableRow 
                  key={submission.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell>{submission.id}</TableCell>
                  <TableCell>{submission.firstName} {submission.lastName}</TableCell>
                  <TableCell sx={{ fontWeight: '500' }}>{submission.membershipType}</TableCell>
                  <TableCell>{submission.country}</TableCell>
                  <TableCell>+{submission.phoneCode} {submission.phone}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Button 
        variant="contained" 
        onClick={() => {
          handleClear();
          setShowMembers(false);
        }}
        sx={{ 
          mt: 3,
          minWidth: '200px',
          float: 'right'
        }}
      >
        Create Loyalty
      </Button>
    </Box>
  );
}