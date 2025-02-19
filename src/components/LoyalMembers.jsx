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
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

export default function LoyalMembers({ setShowMembers, handleClear }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const submissions = JSON.parse(sessionStorage.getItem('loyaltySubmissions') || '[]');

  return (
    <Box sx={{ mt: 4, width: '100%', px: isMobile ? 1 : 3 }}>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            minWidth: 600,
            maxHeight: '70vh',
            border: 'none',
            borderRadius: '12px',
            boxShadow: theme.shadows[3],
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: '4px',
            },
          }}
        >
          <Table stickyHeader aria-label="loyal members table">
            <TableHead>
              <TableRow>
                {['ID', 'Name', 'Membership', 'Country', 'Phone'].map((header) => (
                  <TableCell 
                    key={header}
                    sx={{ 
                      fontWeight: '600', 
                      backgroundColor: 'primary.main', 
                      color: 'common.white',
                      py: 2,
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
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
                      '&:hover': { backgroundColor: 'action.selected' },
                      '&:last-child td': { border: 0 }
                    }}
                  >
                    <TableCell sx={{ fontSize: isMobile ? '0.875rem' : '1rem', py: 1.5 }}>
                      {submission.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? '0.875rem' : '1rem', py: 1.5 }}>
                      {submission.firstName} {submission.lastName}
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: '500', 
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      py: 1.5,
                      color: 'primary.main'
                    }}>
                      {submission.membershipType}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? '0.875rem' : '1rem', py: 1.5 }}>
                      {submission.country}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? '0.875rem' : '1rem', py: 1.5 }}>
                      +{submission.phoneCode} {submission.phone}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      <Box sx={{ 
        mt: 3,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        px: isMobile ? 1 : 0
      }}>
        <Button 
          variant="contained" 
          onClick={() => {
            handleClear();
            setShowMembers(false);
          }}
          sx={{ 
            minWidth: isMobile ? '120px' : '200px',
            fontSize: isMobile ? '0.875rem' : '1rem',
            py: 1,
            textTransform: 'none',
            borderRadius: '8px',
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
              backgroundColor: 'primary.dark'
            }
          }}
        >
          Create Loyalty
        </Button>
      </Box>
    </Box>
  );
}