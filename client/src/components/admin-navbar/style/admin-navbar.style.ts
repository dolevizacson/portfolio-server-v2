import styled from 'styled-components';
import SelectableButton from '../../selectable-button/SelectableButton.component';

export const AdminNavbar = styled.nav`
  ${(props) => props.theme.mixins.centerContent}
  flex-wrap: wrap;
  flex: 1;
  gap: 1rem;
`;

export const AdminNavbarButton = styled(SelectableButton)`
  width: 20rem;
`;
