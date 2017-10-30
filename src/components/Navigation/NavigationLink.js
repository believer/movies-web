import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const activeClassName = 'nav-item-active'

const NavigationLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: #333;
  font-size: 16px;
  text-decoration: none;

  &.${activeClassName} {
    color: #e77587;
  }
`

export default NavigationLink
