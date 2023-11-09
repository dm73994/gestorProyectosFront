import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { InputType } from '..';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: '0.15rem solid',
  borderColor: alpha(theme.palette.info.main, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface Props {
  value: string | number;
  handleFilter(value: string | number): void;
  placeholder: string;
  type?: InputType
}

export function SearchField({ value, handleFilter, placeholder, type = InputType.TEXT }: Props) {
  return (
    <Search sx={{ display: 'flex', justifyContent: 'space-between', height: '40px',  }}>
      <Box sx={{ width: '100%', paddingTop: 1, paddingBottom: 1, display: 'flex', alignItems: 'center' }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeholder}
          value={value || ''}
          onChange={event => handleFilter(event.target.value)}
          sx={{ width: '100%' }}
          type={type}
          inputProps={{ 
            'aria-label': 'search',
            min: 0,
            max: 9999999999, 
            maxLength: 10,
          }}
        />
      </Box>
      <IconButton onClick={() => handleFilter('')}>
        <CloseIcon />
      </IconButton>
    </Search>
  );
}
